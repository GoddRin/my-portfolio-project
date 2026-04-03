import { useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ThemeProvider } from '../hooks/useTheme.jsx'
import { BackToTop } from '../components/layout/BackToTop.jsx'
import { CustomCursor } from '../components/layout/CustomCursor.jsx'
import { Footer } from '../components/layout/Footer.jsx'
import { Navbar } from '../components/layout/Navbar.jsx'
import { ReadingProgress } from '../components/layout/ReadingProgress.jsx'
import { SectionDots } from '../components/layout/SectionDots.jsx'
import { TerminalEgg } from '../components/layout/TerminalEgg.jsx'
import { About } from '../components/sections/About.jsx'
import { Contact } from '../components/sections/Contact.jsx'
import { Certifications } from '../components/sections/Certifications.jsx'
import { Hero } from '../components/sections/Hero.jsx'
import { Projects } from '../components/sections/Projects.jsx'
import { Skills } from '../components/sections/Skills.jsx'
import { Timeline } from '../components/sections/Timeline.jsx'
import { RevealWrapper } from '../components/ui/RevealWrapper.jsx'

const EASE = [0.25, 0.46, 0.45, 0.94]

const sectionRoutes = new Map([
  ['/', 'home'],
  ['/about', 'about'],
  ['/skills', 'skills'],
  ['/certifications', 'certifications'],
  ['/work', 'projects'],
  ['/timeline', 'timeline'],
  ['/contact', 'contact'],
])

export default function HomePage() {
  const location = useLocation()
  const navigate = useNavigate()

  const targetId = useMemo(() => sectionRoutes.get(location.pathname) ?? 'home', [location.pathname])

  const scrollToSectionWithOffset = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.setTimeout(() => window.scrollBy({ top: -80, behavior: 'smooth' }), 0)
  }

  useEffect(() => {
    const id = targetId
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    scrollToSectionWithOffset(id)
  }, [targetId])

  return (
    <ThemeProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <ReadingProgress />
      <Navbar />
      <CustomCursor />
      <SectionDots />
      <BackToTop />
      <TerminalEgg />

      <main id="main" className="relative">
        <RevealWrapper
          forceMotion
          variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <Hero />
        </RevealWrapper>
        <RevealWrapper
          forceMotion
          margin="-80px 0px -20% 0px"
          amount={0.12}
          variants={{ hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <About />
        </RevealWrapper>
        <RevealWrapper
          forceMotion
          margin="-80px 0px -20% 0px"
          amount={0.12}
          variants={{ hidden: { opacity: 0, y: 60, scale: 0.96 }, visible: { opacity: 1, y: 0, scale: 1 } }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <Skills />
        </RevealWrapper>
        <RevealWrapper
          forceMotion
          margin="-80px 0px -20% 0px"
          amount={0.12}
          variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <Certifications />
        </RevealWrapper>
        <RevealWrapper
          forceMotion
          margin="-80px 0px -20% 0px"
          amount={0.12}
          variants={{ hidden: { opacity: 0, y: 70, rotate: -2 }, visible: { opacity: 1, y: 0, rotate: 0 } }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <Projects />
        </RevealWrapper>
        <RevealWrapper
          forceMotion
          margin="-80px 0px -20% 0px"
          amount={0.12}
          variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <Timeline />
        </RevealWrapper>
        <RevealWrapper
          forceMotion
          margin="-80px 0px -20% 0px"
          amount={0.12}
          variants={{ hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <Contact />
        </RevealWrapper>
      </main>

      <Footer />

      {/* Catch invalid home-section routes */}
      {location.pathname !== '/' && !sectionRoutes.has(location.pathname) && location.pathname !== '/projects' ? (
        <div className="sr-only">
          <button type="button" onClick={() => navigate('/')}>
            Go home
          </button>
        </div>
      ) : null}
    </ThemeProvider>
  )
}

