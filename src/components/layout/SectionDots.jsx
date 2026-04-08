import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useActiveSection } from '../../hooks/useActiveSection.js'

const sections = [
  { id: 'home', label: 'Home', to: '/' },
  { id: 'about', label: 'About', to: '/about' },
  { id: 'skills', label: 'Skills', to: '/skills' },
  { id: 'certifications', label: 'Certifications', to: '/certifications' },
  { id: 'systems', label: 'How I Build', to: '/systems' },
  { id: 'projects', label: 'Projects', to: '/work' },
  { id: 'timeline', label: 'Timeline', to: '/timeline' },
  { id: 'contact', label: 'Contact', to: '/contact' },
]

export function SectionDots() {
  const navigate = useNavigate()
  const active = useActiveSection(sections.map((s) => s.id))

  return (
    <aside className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 md:block" aria-label="Section indicators">
      <div className="flex flex-col gap-3">
        {sections.map((s) => {
          const isActive = active === s.id
          return (
            <button
              key={s.id}
              type="button"
              className="group relative grid h-4 w-4 place-items-center"
              onClick={() => {
                navigate(s.to)
                const el = document.getElementById(s.id)
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              aria-label={`Go to ${s.label}`}
              data-cursor="active"
            >
              <span className="absolute right-6 whitespace-nowrap rounded-full bg-black/70 px-2 py-1 text-[11px] text-muted opacity-0 transition group-hover:opacity-100">
                {s.label}
              </span>
              <span
                className={[
                  'h-2.5 w-2.5 rounded-full border',
                  isActive
                    ? 'border-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 shadow-[0_0_0_6px_rgba(99,102,241,0.12)]'
                    : 'border-white/20 bg-white/10',
                ].join(' ')}
              />
              {isActive ? (
                <motion.span
                  layoutId="dot-ring"
                  className="absolute h-4 w-4 rounded-full border border-cyan-400/40"
                  transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                />
              ) : null}
            </button>
          )
        })}
      </div>
    </aside>
  )
}

