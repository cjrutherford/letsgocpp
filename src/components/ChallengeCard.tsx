import { useState } from 'react'
import Editor from '@monaco-editor/react'
import { Play, CheckCircle, XCircle, Lightbulb, ChevronDown, ChevronUp, FlaskConical } from 'lucide-react'
import { compileCpp } from '../lib/cppCompiler'
import type { CodeChallenge } from '../lib/challenges'
import { buildTestCode } from '../lib/challenges'

interface ChallengeCardProps {
  challenge: CodeChallenge
}

const DIFFICULTY_COLORS = {
  easy: 'text-green-400 bg-green-400/10 border-green-400/30',
  medium: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  hard: 'text-red-400 bg-red-400/10 border-red-400/30',
}

export function ChallengeCard({ challenge }: ChallengeCardProps) {
  const [code, setCode] = useState(challenge.starterCode)
  const [output, setOutput] = useState('')
  const [errors, setErrors] = useState<string[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [passed, setPassed] = useState<boolean | null>(null)
  const [showHints, setShowHints] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const isTestChallenge = !!challenge.testCode

  async function handleRun() {
    setIsRunning(true)
    setOutput('')
    setErrors([])
    setPassed(null)

    try {
      if (isTestChallenge) {
        const fullCode = buildTestCode(challenge, code)
        const result = await compileCpp(fullCode, 'test')
        setOutput(result.output)
        setErrors(result.errors)
        setPassed(result.success)
      } else {
        const result = await compileCpp(code, 'run')
        setOutput(result.output)
        setErrors(result.errors)
        setPassed(result.success && result.errors.length === 0)
      }
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
      {/* Header */}
      <div
        className="flex items-start justify-between p-4 cursor-pointer hover:bg-slate-750 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-medium px-2 py-0.5 rounded border ${DIFFICULTY_COLORS[challenge.difficulty]}`}>
              {challenge.difficulty}
            </span>
            <span className="text-xs text-slate-400">{challenge.points} pts</span>
            {isTestChallenge && (
              <span className="flex items-center gap-1 text-xs text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded border border-blue-400/30">
                <FlaskConical size={10} />
                Catch2 Tests
              </span>
            )}
            {passed === true && <CheckCircle size={16} className="text-green-400" />}
            {passed === false && <XCircle size={16} className="text-red-400" />}
          </div>
          <h3 className="font-semibold text-white">{challenge.title}</h3>
          <p className="text-sm text-slate-400 mt-1">{challenge.description}</p>
        </div>
        <div className="ml-4 text-slate-400">
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-slate-700">
          {/* Code Editor */}
          <div className="border-b border-slate-700">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900">
              <span className="text-xs text-slate-400 font-mono">main.cpp</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowHints(!showHints)}
                  className="flex items-center gap-1 text-xs text-yellow-400 hover:text-yellow-300 transition-colors"
                >
                  <Lightbulb size={12} />
                  {showHints ? 'Hide' : 'Hints'} ({challenge.hints.length})
                </button>
              </div>
            </div>
            <Editor
              height="240px"
              language="cpp"
              value={code}
              onChange={v => setCode(v ?? '')}
              theme="vs-dark"
              options={{
                fontSize: 13,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                lineNumbers: 'on',
                tabSize: 4,
              }}
            />
          </div>

          {/* Hints */}
          {showHints && (
            <div className="bg-yellow-400/5 border-b border-yellow-400/20 px-4 py-3">
              <ul className="space-y-1">
                {challenge.hints.map((hint, i) => (
                  <li key={i} className="text-sm text-yellow-300 flex items-start gap-2">
                    <span className="text-yellow-500 font-bold shrink-0">{i + 1}.</span>
                    {hint}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Test code preview */}
          {isTestChallenge && (
            <div className="bg-blue-400/5 border-b border-blue-400/20 px-4 py-3">
              <p className="text-xs text-blue-400 font-semibold mb-2 flex items-center gap-1">
                <FlaskConical size={12} />
                Test harness (appended automatically):
              </p>
              <pre className="text-xs text-slate-400 font-mono overflow-x-auto">
                {challenge.testCode}
              </pre>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 px-4 py-3 bg-slate-900">
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Play size={14} />
              {isRunning ? 'Running...' : isTestChallenge ? 'Run Tests' : 'Run Code'}
            </button>
            <button
              onClick={() => { setCode(challenge.starterCode); setOutput(''); setErrors([]); setPassed(null) }}
              className="text-xs text-slate-400 hover:text-slate-300 transition-colors"
            >
              Reset
            </button>
          </div>

          {/* Output */}
          {(output || errors.length > 0) && (
            <div className="border-t border-slate-700 p-4 bg-slate-950">
              {passed !== null && (
                <div className={`flex items-center gap-2 mb-3 text-sm font-semibold ${passed ? 'text-green-400' : 'text-red-400'}`}>
                  {passed ? <CheckCircle size={16} /> : <XCircle size={16} />}
                  {passed ? 'All tests passed! ✓' : 'Tests failed'}
                </div>
              )}
              {errors.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs text-red-400 font-semibold mb-1">Errors:</p>
                  <pre className="text-xs text-red-300 font-mono whitespace-pre-wrap">{errors.join('\n')}</pre>
                </div>
              )}
              {output && (
                <div>
                  <p className="text-xs text-slate-400 font-semibold mb-1">Output:</p>
                  <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap">{output}</pre>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
