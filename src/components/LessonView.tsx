import { useParams, Link } from 'react-router-dom'
import { ChevronRight, BookOpen, FlaskConical } from 'lucide-react'
import { lessonContent } from '../lib/content'
import { findModule, findLesson, modules } from '../lib/modules'
import { getChallengesForLesson } from '../lib/challenges'
import { Markdown } from './SyntaxHighlight'
import { ChallengeCard } from './ChallengeCard'

export function LessonView() {
  const { moduleId = '', lessonSlug = '' } = useParams()
  const module_ = findModule(moduleId)
  const lesson = findLesson(moduleId, lessonSlug)
  const content = lessonContent[lessonSlug]
  const challenges = getChallengesForLesson(lessonSlug)

  if (!module_ || !lesson) {
    return (
      <div className="flex items-center justify-center h-full text-slate-400">
        <p>Lesson not found.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
        <ChevronRight size={14} />
        <Link to={`/module/${moduleId}`} className="hover:text-white transition-colors">{module_.title}</Link>
        <ChevronRight size={14} />
        <span className="text-white">{lesson.title}</span>
      </nav>

      {/* Lesson content */}
      {content ? (
        <Markdown content={content} />
      ) : (
        <div className="bg-slate-800 rounded-xl p-8 text-center text-slate-400">
          <BookOpen size={32} className="mx-auto mb-3 opacity-50" />
          <p>Content for this lesson is coming soon.</p>
        </div>
      )}

      {/* Challenges */}
      {challenges.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <FlaskConical className="text-blue-400" size={24} />
            Challenges
          </h2>
          <p className="text-slate-400 text-sm mb-6">
            Test your understanding with these hands-on coding challenges. Challenges marked with
            <span className="inline-flex items-center gap-1 text-blue-400 mx-1 text-xs bg-blue-400/10 px-1.5 py-0.5 rounded border border-blue-400/30">
              <FlaskConical size={10} /> Catch2 Tests
            </span>
            use the Catch2 testing framework to validate your implementation.
          </p>
          <div className="space-y-4">
            {challenges.map(c => (
              <ChallengeCard key={c.id} challenge={c} />
            ))}
          </div>
        </div>
      )}

      {/* Lesson navigation */}
      <div className="mt-12 pt-6 border-t border-slate-700">
        <LessonNav moduleId={moduleId} currentSlug={lessonSlug} />
      </div>
    </div>
  )
}

function LessonNav({ moduleId, currentSlug }: { moduleId: string; currentSlug: string }) {
  const module_ = findModule(moduleId)
  if (!module_) return null

  const lessons = module_.lessons
  const currentIndex = lessons.findIndex(l => l.slug === currentSlug)
  const prev = lessons[currentIndex - 1]
  const next = lessons[currentIndex + 1]

  return (
    <div className="flex justify-between">
      {prev ? (
        <Link
          to={`/module/${moduleId}/${prev.slug}`}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          ← {prev.title}
        </Link>
      ) : <div />}
      {next ? (
        <Link
          to={`/module/${moduleId}/${next.slug}`}
          className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          {next.title} →
        </Link>
      ) : <div />}
    </div>
  )
}

export function ModuleView() {
  const { moduleId = '' } = useParams()
  const module_ = findModule(moduleId)

  if (!module_) {
    return (
      <div className="flex items-center justify-center h-full text-slate-400">
        <div className="text-center">
          <p className="text-xl mb-4">Module not found</p>
          <Link to="/dashboard" className="text-blue-400 hover:text-blue-300">← Back to dashboard</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
        <ChevronRight size={14} />
        <span className="text-white">{module_.title}</span>
      </nav>

      {/* Module header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">{module_.icon}</span>
          <h1 className="text-3xl font-bold text-white">{module_.title}</h1>
        </div>
        <p className="text-slate-400">{module_.description}</p>
      </div>

      {/* Lesson list */}
      <div className="space-y-3">
        {module_.lessons.map((lesson, i) => {
          const lessonChallenges = getChallengesForLesson(lesson.slug)
          return (
            <Link
              key={lesson.slug}
              to={`/module/${moduleId}/${lesson.slug}`}
              className="flex items-center gap-4 p-4 bg-slate-800 border border-slate-700 rounded-xl hover:border-blue-500 hover:bg-slate-750 transition-all group"
            >
              <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-semibold text-sm shrink-0">
                {i + 1}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                  {lesson.title}
                </h3>
                <p className="text-sm text-slate-400">{lesson.description}</p>
              </div>
              {lessonChallenges.length > 0 && (
                <span className="text-xs text-blue-400 bg-blue-400/10 px-2 py-1 rounded border border-blue-400/20 shrink-0">
                  {lessonChallenges.length} challenge{lessonChallenges.length !== 1 ? 's' : ''}
                </span>
              )}
              <ChevronRight size={16} className="text-slate-400 group-hover:text-blue-400 shrink-0" />
            </Link>
          )
        })}
      </div>

      {/* Other modules */}
      <div className="mt-12">
        <h2 className="text-lg font-semibold text-slate-300 mb-4">Other Modules</h2>
        <div className="grid grid-cols-2 gap-3">
          {modules.filter(m => m.id !== moduleId).map(m => (
            <Link
              key={m.id}
              to={`/module/${m.id}`}
              className="flex items-center gap-3 p-3 bg-slate-800 border border-slate-700 rounded-lg hover:border-slate-500 transition-colors"
            >
              <span className="text-xl">{m.icon}</span>
              <span className="text-sm text-slate-300 hover:text-white transition-colors">{m.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
