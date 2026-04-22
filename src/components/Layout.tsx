import { ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Home, BookOpen, Code2, ChevronLeft } from 'lucide-react'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const navigate = useNavigate()

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col shrink-0">
        {/* Logo */}
        <div className="p-4 border-b border-slate-700">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Code2 className="text-blue-400" size={24} />
            <span className="text-xl font-bold text-white">LetsGoCpp</span>
          </Link>
          <p className="text-xs text-slate-400 mt-1">C++ Interactive Tutorial</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors text-sm"
          >
            <Home size={16} />
            Dashboard
          </Link>
          <Link
            to="/module/basics"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors text-sm"
          >
            <BookOpen size={16} />
            C++ Basics
          </Link>
          <Link
            to="/module/oop"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors text-sm"
          >
            <BookOpen size={16} />
            OOP
          </Link>
          <Link
            to="/module/memory"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors text-sm"
          >
            <BookOpen size={16} />
            Memory Management
          </Link>
          <Link
            to="/module/stl"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors text-sm"
          >
            <BookOpen size={16} />
            STL
          </Link>
          <Link
            to="/module/templates"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors text-sm"
          >
            <BookOpen size={16} />
            Templates
          </Link>
          <Link
            to="/module/modern-cpp"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors text-sm"
          >
            <BookOpen size={16} />
            Modern C++
          </Link>
          <Link
            to="/module/testing"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors text-sm"
          >
            <BookOpen size={16} />
            Testing (Catch2)
          </Link>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors"
          >
            <ChevronLeft size={14} />
            Go back
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
