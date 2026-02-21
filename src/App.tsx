import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Landing } from './pages/Landing'
import { LessonView, ModuleView } from './components/LessonView'

function LessonViewWrapper() {
  const { moduleId, lessonSlug } = useParams()
  const key = `${moduleId}-${lessonSlug}`
  return <LessonView key={key} />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Layout><Home /></Layout>} />
        <Route path="/module/:moduleId" element={<Layout><ModuleView /></Layout>} />
        <Route path="/module/:moduleId/:lessonSlug" element={<Layout><LessonViewWrapper /></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
