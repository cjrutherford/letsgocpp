import { Link } from 'react-router-dom'
import { modules } from '../lib/modules'
import { challenges } from '../lib/challenges'
import { CodePlayground } from '../components/CodePlayground'
import { BookOpen, FlaskConical, Code2 } from 'lucide-react'

export function Home() {
  const totalChallenges = challenges.length
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0)
  const testChallenges = challenges.filter(c => c.testCode).length

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">C++ Learning Dashboard</h1>
        <p className="text-slate-400">Master modern C++ through interactive lessons and Catch2-powered challenges.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <BookOpen size={18} className="text-blue-400" />
            <span className="text-slate-400 text-sm">Lessons</span>
          </div>
          <p className="text-3xl font-bold text-white">{totalLessons}</p>
          <p className="text-xs text-slate-500 mt-1">across {modules.length} modules</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Code2 size={18} className="text-green-400" />
            <span className="text-slate-400 text-sm">Challenges</span>
          </div>
          <p className="text-3xl font-bold text-white">{totalChallenges}</p>
          <p className="text-xs text-slate-500 mt-1">hands-on coding exercises</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <FlaskConical size={18} className="text-purple-400" />
            <span className="text-slate-400 text-sm">Catch2 Tests</span>
          </div>
          <p className="text-3xl font-bold text-white">{testChallenges}</p>
          <p className="text-xs text-slate-500 mt-1">real assertions validate your code</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Module list */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Learning Modules</h2>
          <div className="space-y-3">
            {modules.map(module_ => (
              <Link
                key={module_.id}
                to={`/module/${module_.id}`}
                className="flex items-center gap-3 p-4 bg-slate-800 border border-slate-700 rounded-xl hover:border-blue-500 hover:bg-slate-750 transition-all group"
              >
                <span className="text-2xl">{module_.icon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-white group-hover:text-blue-300 transition-colors">
                    {module_.title}
                  </h3>
                  <p className="text-xs text-slate-400 truncate">{module_.description}</p>
                </div>
                <span className="text-xs text-slate-500 shrink-0">
                  {module_.lessons.length} lessons
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Playground */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Code Playground</h2>
          <div className="h-[500px]">
            <CodePlayground />
          </div>
        </div>
      </div>
    </div>
  )
}
