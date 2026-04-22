import { useState } from 'react'
import Editor from '@monaco-editor/react'
import { Play, RotateCcw, Terminal } from 'lucide-react'
import { compileCpp } from '../lib/cppCompiler'

const DEFAULT_CODE = `#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers = {5, 2, 8, 1, 9, 3, 7, 4, 6};

    std::sort(numbers.begin(), numbers.end());

    std::cout << "Sorted: ";
    for (const auto& n : numbers) {
        std::cout << n << " ";
    }
    std::cout << "\\n";

    return 0;
}
`

export function CodePlayground() {
  const [code, setCode] = useState(DEFAULT_CODE)
  const [output, setOutput] = useState('')
  const [errors, setErrors] = useState<string[]>([])
  const [isRunning, setIsRunning] = useState(false)

  async function handleRun() {
    setIsRunning(true)
    setOutput('')
    setErrors([])

    const result = await compileCpp(code, 'run')
    setOutput(result.output)
    setErrors(result.errors)
    setIsRunning(false)
  }

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <span className="text-sm font-medium text-slate-300 flex items-center gap-2">
          <Terminal size={16} className="text-blue-400" />
          C++ Playground
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setCode(DEFAULT_CODE); setOutput(''); setErrors([]) }}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-300 transition-colors"
          >
            <RotateCcw size={12} />
            Reset
          </button>
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-medium rounded-lg transition-colors"
          >
            <Play size={12} />
            {isRunning ? 'Running...' : 'Run'}
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 min-h-0">
        <Editor
          height="100%"
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

      {/* Output panel */}
      <div className="h-40 border-t border-slate-700 bg-slate-950 p-3 overflow-y-auto">
        {!output && errors.length === 0 && (
          <p className="text-slate-500 text-xs">Output will appear here after running...</p>
        )}
        {errors.length > 0 && (
          <pre className="text-red-400 text-xs font-mono whitespace-pre-wrap">{errors.join('\n')}</pre>
        )}
        {output && (
          <pre className="text-green-300 text-xs font-mono whitespace-pre-wrap">{output}</pre>
        )}
      </div>
    </div>
  )
}
