import { Route, Routes } from 'react-router-dom'
import { AnimatedBackground } from './components/layout/AnimatedBackground.jsx'
import HomePage from './pages/HomePage.jsx'
import ProjectsPage from './pages/ProjectsPage.jsx'

export default function App() {
  return (
    <>
      <AnimatedBackground />
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/*" element={<HomePage />} />
        </Routes>
      </div>
    </>
  )
}
