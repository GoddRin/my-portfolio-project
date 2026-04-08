import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useActiveSection } from '../../hooks/useActiveSection.js'
import { useScrollPosition } from '../../hooks/useScrollPosition.js'
import { useTheme } from '../../hooks/useTheme.jsx'
import { site } from '../../data/site.js'

const links = [
  { id: 'home', label: 'Home', to: '/' },
  { id: 'about', label: 'About', to: '/about' },
  { id: 'skills', label: 'Skills', to: '/skills' },
  { id: 'systems', label: 'Process', to: '/systems' },
  { id: 'certifications', label: 'Certifications', to: '/certifications' },
  { id: 'projects', label: 'Projects', to: '/work' },
  { id: 'contact', label: 'Contact', to: '/contact' },
]

function isHomeSectionRoute(pathname) {
  return (
    pathname === '/' ||
    pathname === '/about' ||
    pathname === '/skills' ||
    pathname === '/systems' ||
    pathname === '/certifications' ||
    pathname === '/work' ||
    pathname === '/timeline' ||
    pathname === '/contact'
  )
}

export function Navbar() {
  const y = useScrollPosition()
  const scrolled = y > 80
  const [open, setOpen] = useState(false)
  const { theme, toggle } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const activeObserved = useActiveSection(['home', 'about', 'skills', 'systems', 'certifications', 'projects', 'timeline', 'contact'])

  const activeId = useMemo(() => {
    if (isHomeSectionRoute(location.pathname)) {
      if (activeObserved === 'timeline') return 'projects'
      if (activeObserved) return activeObserved
      return 'home'
    }
    if (location.pathname === '/') return 'home'
    const slug = location.pathname.replace('/', '')
    if (slug === 'work') return 'projects'
    return slug
  }, [activeObserved, location.pathname])

  const scrollToSectionWithOffset = (id) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.setTimeout(() => window.scrollBy({ top: -80, behavior: 'smooth' }), 0)
  }

  const underline = (
    <motion.div
      layoutId="nav-underline"
      className="absolute -bottom-[10px] left-0 right-0 mx-auto h-[2px] w-full bg-gradient-to-r from-indigo-400 to-cyan-400"
    />
  )

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        className={[
          'mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6',
          scrolled ? 'glass bg-white/70 dark:bg-black/60' : 'bg-transparent',
          'transition-[background,backdrop-filter] duration-300',
        ].join(' ')}
        aria-label="Primary"
      >
        <button
          type="button"
          className="group inline-flex items-center gap-3"
          onClick={() => {
            setOpen(false)
            navigate('/')
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          aria-label="Go to home"
          data-cursor="active"
        >
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 border border-white/10">
            <span className="text-sm font-extrabold tracking-tight text-gradient">{site.initials}</span>
          </span>
          <span className="hidden text-sm font-semibold text-text md:block">
            {site.name} <span className="text-muted font-normal">/ Portfolio Profile</span>
          </span>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          <div className="flex items-center gap-6 text-sm text-muted">
            {links.map((l) => {
              const isActive = activeId === l.id || (l.id === 'home' && activeId === 'home')
              const to = l.to
              return (
                <div key={l.id} className="relative">
                  <NavLink
                    to={to}
                    className={({ isActive: rrActive }) =>
                      [
                        'relative px-1 py-1 transition-colors hover:text-text',
                        rrActive || isActive ? 'text-text' : 'text-muted',
                      ].join(' ')
                    }
                    onClick={(e) => {
                      if (isHomeSectionRoute(location.pathname) || location.pathname === '/') {
                        e.preventDefault()
                        navigate(l.to)
                        scrollToSectionWithOffset(l.id)
                      }
                    }}
                  >
                    {l.label}
                  </NavLink>
                  {isActive ? underline : null}
                </div>
              )
            })}
          </div>

          <button
            type="button"
            onClick={toggle}
            className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 border border-white/10 text-text hover:bg-white/10 transition"
            aria-label="Toggle dark/light mode"
            data-cursor="active"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggle}
            className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 border border-white/10 text-text"
            aria-label="Toggle dark/light mode"
            data-cursor="active"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 border border-white/10 text-text"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            data-cursor="active"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {open ? (
          <motion.aside
            className="fixed right-0 top-0 z-[60] h-full w-[86%] max-w-sm glass bg-black/70 p-6"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
            aria-label="Mobile menu"
          >
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-text">{site.name}</div>
              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 border border-white/10 text-text"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                data-cursor="active"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <motion.div
              className="mt-8 flex flex-col gap-4"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.06 } },
              }}
            >
              {links.map((l) => (
                <motion.button
                  key={l.id}
                  type="button"
                  className="text-left text-lg font-semibold text-text"
                  variants={{ hidden: { opacity: 0, x: 12 }, visible: { opacity: 1, x: 0 } }}
                  onClick={() => {
                    setOpen(false)
                    navigate(l.to)
                    window.setTimeout(() => scrollToSectionWithOffset(l.id), 0)
                  }}
                  data-cursor="active"
                >
                  {l.label}
                </motion.button>
              ))}
            </motion.div>

            <div className="mt-10 text-sm text-muted">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Open to opportunities
              </div>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

