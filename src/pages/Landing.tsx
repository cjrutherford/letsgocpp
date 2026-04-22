import { Link } from 'react-router-dom'
import { Code2, BookOpen, FlaskConical, Zap, ArrowRight, Terminal } from 'lucide-react'
import { modules } from '../lib/modules'
import { challenges } from '../lib/challenges'

export function Landing() {
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0)
  const testChallenges = challenges.filter(c => c.testCode).length

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Code2 className="text-blue-400" size={28} />
          <span className="text-xl font-bold">LetsGoCpp</span>
        </div>
        <Link
          to="/dashboard"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors"
        >
          Start Learning <ArrowRight size={16} />
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-8 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/30 rounded-full px-4 py-1.5 text-blue-400 text-sm mb-6">
          <FlaskConical size={14} />
          Powered by Catch2 Testing Framework
        </div>
        <h1 className="text-6xl font-extrabold mb-6 leading-tight">
          Learn C++ the{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            Modern Way
          </span>
        </h1>
        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
          A comprehensive, interactive C++ tutorial with real Catch2 testing assertions.
          Write code. Run tests. See results instantly.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors text-lg"
          >
            Start Learning <ArrowRight size={20} />
          </Link>
          <Link
            to="/module/basics/hello-world"
            className="px-8 py-3 border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-semibold rounded-xl transition-colors text-lg"
          >
            First Lesson →
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-8 py-16">
        <div className="grid grid-cols-3 gap-6">
          <FeatureCard
            icon={<BookOpen size={24} className="text-blue-400" />}
            title={`${totalLessons} Interactive Lessons`}
            description="Comprehensive lessons covering C++ basics through modern features like move semantics and concurrency."
          />
          <FeatureCard
            icon={<FlaskConical size={24} className="text-green-400" />}
            title={`${testChallenges} Catch2 Challenges`}
            description="Challenges validated by real Catch2 test assertions — your code passes when the tests pass."
          />
          <FeatureCard
            icon={<Terminal size={24} className="text-purple-400" />}
            title="Live Compiler"
            description="g++ compiles and runs your C++ code directly in the browser with instant feedback."
          />
        </div>
      </section>

      {/* Modules grid */}
      <section className="max-w-6xl mx-auto px-8 py-16 border-t border-slate-800">
        <h2 className="text-3xl font-bold text-center mb-10">
          7 Comprehensive Modules
        </h2>
        <div className="grid grid-cols-4 gap-4">
          {modules.map(m => (
            <Link
              key={m.id}
              to={`/module/${m.id}`}
              className="bg-slate-800 border border-slate-700 rounded-xl p-4 hover:border-blue-500 transition-colors group"
            >
              <span className="text-3xl mb-3 block">{m.icon}</span>
              <h3 className="font-semibold text-white group-hover:text-blue-300 transition-colors mb-1">
                {m.title}
              </h3>
              <p className="text-xs text-slate-400">{m.lessons.length} lessons</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Catch2 Highlight */}
      <section className="max-w-6xl mx-auto px-8 py-16 border-t border-slate-800">
        <div className="bg-gradient-to-br from-blue-900/30 to-slate-800 border border-blue-500/30 rounded-2xl p-8">
          <div className="flex items-start gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-3">
                <span className="text-blue-400">Catch2-Powered</span> Challenge Validation
              </h2>
              <p className="text-slate-400 mb-4">
                Unlike other tutorials that check output strings, LetsGoCpp uses real{' '}
                <strong className="text-white">Catch2 test assertions</strong> to validate your solutions.
                Your code is compiled with g++ and run against actual tests — just like professional C++ development.
              </p>
              <ul className="space-y-2 text-sm text-slate-300">
                {[
                  'REQUIRE(add(2, 3) == 5) — exact value checking',
                  'REQUIRE_THROWS_AS(stack.pop(), std::underflow_error) — exception testing',
                  'REQUIRE(val == Catch::Approx(3.14)) — floating point comparison',
                  'Sections and test case organization just like real projects',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Zap size={14} className="text-blue-400 mt-0.5 shrink-0" />
                    <code className="text-blue-300 text-xs">{item}</code>
                  </li>
                ))}
              </ul>
            </div>
            <div className="shrink-0 bg-slate-900 border border-slate-700 rounded-xl p-4 font-mono text-sm max-w-xs">
              <div className="text-slate-500 mb-2">// Your implementation:</div>
              <div className="text-green-300">int add(int a, int b) {'{'}</div>
              <div className="text-slate-300 ml-4">return a + b;</div>
              <div className="text-green-300">{'}'}</div>
              <div className="mt-3 text-slate-500">// Catch2 tests validate it:</div>
              <div className="text-blue-300">TEST_CASE("add works") {'{'}</div>
              <div className="text-slate-300 ml-4">REQUIRE(add(2,3) == 5);</div>
              <div className="text-slate-300 ml-4">REQUIRE(add(-1,1) == 0);</div>
              <div className="text-blue-300">{'}'}</div>
              <div className="mt-3 text-green-400 text-xs">✓ All tests passed</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-20 border-t border-slate-800">
        <h2 className="text-3xl font-bold mb-4">Ready to master C++?</h2>
        <p className="text-slate-400 mb-8">Start with Hello World and work your way to modern C++ mastery.</p>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors text-lg"
        >
          Get Started <ArrowRight size={20} />
        </Link>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
      <div className="mb-3">{icon}</div>
      <h3 className="font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-400">{description}</p>
    </div>
  )
}
