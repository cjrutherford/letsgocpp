import express from 'express'
import cors from 'cors'
import { exec, execSync } from 'child_process'
import { tmpdir } from 'os'
import { join, dirname } from 'path'
import { writeFile, mkdir, access } from 'fs/promises'
import { createHash } from 'crypto'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()
app.use(cors())
app.use(express.json({ limit: '10mb' }))

interface CompileRequest {
  code: string
  mode?: 'run' | 'test'
}

interface CompileResponse {
  output: string
  errors: string[]
  success: boolean
  testResults?: TestResult[]
}

interface TestResult {
  name: string
  passed: boolean
  message?: string
}

const CATCH2_DIR = join(__dirname, 'catch2')
const CATCH2_INCLUDE = CATCH2_DIR
const CATCH2_OBJ = join(CATCH2_DIR, 'catch_amalgamated.o')

/**
 * Pre-compile the Catch2 amalgamated .cpp into an object file once at startup.
 * This avoids recompiling 400KB+ of test framework code on every challenge run.
 */
async function ensureCatch2Built(): Promise<void> {
  try {
    await access(CATCH2_OBJ)
    console.log('Catch2 object already built.')
    return
  } catch {
    // Need to build
  }

  console.log('Pre-compiling Catch2 amalgamated library...')
  const cpp = join(CATCH2_DIR, 'catch_amalgamated.cpp')
  const cmd = `g++ -std=c++17 -O1 -I${CATCH2_INCLUDE} -c ${cpp} -o ${CATCH2_OBJ}`

  try {
    execSync(cmd, { stdio: 'pipe', timeout: 120000 })
    console.log('Catch2 compiled successfully.')
  } catch (err) {
    console.error('Failed to pre-compile Catch2:', err)
  }
}

/**
 * Parse Catch2 output into structured test results.
 * Catch2 compact reporter format: "filename:line: FAILED\n  expression"
 */
function parseCatch2Output(output: string): { results: TestResult[]; allPassed: boolean } {
  const results: TestResult[] = []
  const lines = output.split('\n')

  // Look for test case results from Catch2
  for (const line of lines) {
    const failLine = line.match(/FAILED:?\s*(.+)?/)
    if (failLine) {
      results.push({ name: failLine[1]?.trim() ?? 'Assertion failed', passed: false, message: line.trim() })
    }
  }

  const summaryLine = lines.find(l => /test cases?/.test(l) && /passed/.test(l))
  const allPassedMatch = summaryLine?.match(/(\d+) passed/)
  const failedMatch = summaryLine?.match(/(\d+) failed/)

  const allPassed = !!summaryLine && !failedMatch && !!allPassedMatch
  return { results, allPassed }
}

async function compileCpp(code: string, isTest: boolean): Promise<CompileResponse> {
  const hash = createHash('sha256').update(code).digest('hex').slice(0, 8)
  const tmpDir = join(tmpdir(), `cpp_${hash}`)
  const srcPath = join(tmpDir, 'main.cpp')
  const binPath = join(tmpDir, 'main')

  try {
    await mkdir(tmpDir, { recursive: true })
    await writeFile(srcPath, code, 'utf-8')

    const includeFlag = `-I${CATCH2_INCLUDE}`
    const compileCmd = isTest
      ? `g++ -std=c++17 ${includeFlag} -o ${binPath} ${srcPath} ${CATCH2_OBJ} 2>&1`
      : `g++ -std=c++17 -o ${binPath} ${srcPath} 2>&1`

    return new Promise((resolve) => {
      exec(compileCmd, { timeout: 30000 }, (compileErr, compileOut) => {
        if (compileErr) {
          const errors = compileOut
            .split('\n')
            .filter(l => l.trim())
            .map(l => l.replace(srcPath, 'main.cpp').replace(tmpDir + '/', ''))
          resolve({ output: '', errors, success: false })
          cleanup(tmpDir)
          return
        }

        // Run the compiled binary
        const runCmd = isTest
          ? `${binPath} 2>&1`
          : `${binPath} 2>&1`

        exec(runCmd, { timeout: 15000, maxBuffer: 1024 * 1024 }, (runErr, runOut) => {
          cleanup(tmpDir)

          if (runErr?.killed) {
            resolve({
              output: '',
              errors: ['Execution timed out. Your code took too long to run.'],
              success: false
            })
            return
          }

          if (isTest) {
            // Catch2 returns exit code 0 on all-pass, non-zero (typically 42) on failure
            const allPassed = !runErr
            const { results } = parseCatch2Output(runOut)
            resolve({
              output: runOut,
              errors: allPassed ? [] : ['Some tests failed. See output for details.'],
              success: allPassed,
              testResults: results.length > 0 ? results : undefined
            })
          } else {
            if (runErr) {
              resolve({
                output: runOut,
                errors: [runOut || runErr.message],
                success: false
              })
            } else {
              resolve({ output: runOut, errors: [], success: true })
            }
          }
        })
      })
    })
  } catch (err) {
    cleanup(tmpDir)
    return {
      output: '',
      errors: [`Failed to write code: ${err instanceof Error ? err.message : 'Unknown error'}`],
      success: false
    }
  }
}

async function cleanup(dir: string) {
  try {
    const { rm } = await import('fs/promises')
    await rm(dir, { recursive: true, force: true })
  } catch { /* ignore */ }
}

app.post('/api/compile', async (req, res) => {
  const { code, mode } = req.body as CompileRequest

  if (!code) {
    res.status(400).json({ error: 'No code provided' })
    return
  }

  const result = await compileCpp(code, mode === 'test')
  res.json(result)
})

app.get('/health', (_, res) => {
  res.json({ status: 'ok', compiler: 'g++' })
})

const PORT = process.env.PORT || 3001

ensureCatch2Built().then(() => {
  app.listen(PORT, () => {
    console.log(`C++ compiler server running on http://localhost:${PORT}`)
  })
})
