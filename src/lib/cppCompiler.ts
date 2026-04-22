export interface TestResult {
  name: string
  passed: boolean
  message?: string
}

export interface CompileResult {
  output: string
  errors: string[]
  success: boolean
  testResults?: TestResult[]
}

const API_URL = import.meta.env.DEV ? 'http://localhost:3001' : '/api'

export async function compileCpp(code: string, mode: 'run' | 'test' = 'run'): Promise<CompileResult> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 60000)

    const response = await fetch(`${API_URL}/api/compile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, mode }),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      return { output: '', errors: [`Server error: ${response.status}`], success: false }
    }

    const data = await response.json() as CompileResult

    if (data.errors && data.errors.length > 0) {
      return { output: data.output ?? '', errors: data.errors, success: false, testResults: data.testResults }
    }

    return { output: data.output ?? '', errors: [], success: true, testResults: data.testResults }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    if (message.includes('abort')) {
      return {
        output: '',
        errors: ['Request timed out. Make sure the C++ compiler server is running.'],
        success: false,
      }
    }
    return {
      output: '',
      errors: [`Failed to compile: ${message}. Is the C++ compiler server running?`],
      success: false,
    }
  }
}
