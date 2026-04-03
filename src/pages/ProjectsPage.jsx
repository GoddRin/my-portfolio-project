import { ThemeProvider } from '../hooks/useTheme.jsx'
import { BackToTop } from '../components/layout/BackToTop.jsx'
import { CustomCursor } from '../components/layout/CustomCursor.jsx'
import { Footer } from '../components/layout/Footer.jsx'
import { Navbar } from '../components/layout/Navbar.jsx'
import { ReadingProgress } from '../components/layout/ReadingProgress.jsx'
import { TerminalEgg } from '../components/layout/TerminalEgg.jsx'
import { Projects } from '../components/sections/Projects.jsx'

export default function ProjectsPage() {
  return (
    <ThemeProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <ReadingProgress />
      <Navbar />
      <CustomCursor />
      <BackToTop />
      <TerminalEgg />

      <main id="main" className="relative pt-24">
        <Projects />
      </main>

      <Footer />
    </ThemeProvider>
  )
}

