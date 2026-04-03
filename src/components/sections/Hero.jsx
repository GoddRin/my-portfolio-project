import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { site } from '../../data/site.js'
import profilePhoto from '../../assets/profile.jpg'
import { Badge } from '../ui/Badge.jsx'
import { Button } from '../ui/Button.jsx'

function TechIcon({ kind }) {
  if (kind === 'react') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="1.8" fill="#22d3ee" />
        <ellipse cx="12" cy="12" rx="9" ry="3.8" fill="none" stroke="#22d3ee" strokeWidth="1.6" />
        <ellipse
          cx="12"
          cy="12"
          rx="9"
          ry="3.8"
          fill="none"
          stroke="#22d3ee"
          strokeWidth="1.6"
          transform="rotate(60 12 12)"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="9"
          ry="3.8"
          fill="none"
          stroke="#22d3ee"
          strokeWidth="1.6"
          transform="rotate(120 12 12)"
        />
      </svg>
    )
  }
  if (kind === 'node') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="6.5" fill="#22c55e" />
      </svg>
    )
  }
  if (kind === 'mongo') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 3c3 3.4 4.9 6.1 4.9 9.4 0 4.1-2.2 7.6-4.9 8.6-2.7-1-4.9-4.5-4.9-8.6C7.1 9.1 9 6.4 12 3Z"
          fill="#4ade80"
        />
        <path d="M12 5.1v14.8" stroke="#14532d" strokeWidth="1.3" />
      </svg>
    )
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 16a8 8 0 0 1 16 0" fill="none" stroke="#6366f1" strokeWidth="1.8" />
      <path d="M7 16a5 5 0 0 1 10 0" fill="none" stroke="#6366f1" strokeWidth="1.8" />
      <circle cx="12" cy="16" r="1.8" fill="#6366f1" />
    </svg>
  )
}

export function Hero() {
  const navigate = useNavigate()
  const reduced = useReducedMotion()
  const [imageError, setImageError] = useState(false)

  const techBadges = [
    { id: 'react', label: 'React', accent: '#22d3ee', tooltip: 'React: Advanced' },
    { id: 'node', label: 'Node.js', accent: '#22c55e', tooltip: 'Node.js: Intermediate' },
    { id: 'mongo', label: 'MongoDB', accent: '#4ade80', tooltip: 'MongoDB: Intermediate' },
    { id: 'mikrotik', label: 'MikroTik', accent: '#6366f1', tooltip: 'MikroTik: Hands-on' },
  ]

  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden">
      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-center px-4 pb-20 pt-28 md:px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
          }}
          className="grid items-center gap-10 md:grid-cols-12"
        >
          <div className="md:col-span-7 text-center md:text-left">
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
                <Badge dot>Open to Work</Badge>
                <Badge>⚡ MERN Stack</Badge>
                <Badge>🌐 MikroTik Certified</Badge>
              </div>
            </motion.div>

            <motion.div
              className="mt-6"
              variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
            >
              <motion.h1
                className="font-heading font-extrabold tracking-[-0.03em] text-text"
                style={{ fontSize: 'clamp(3.2rem, 7.2vw, 6.2rem)', lineHeight: 1.05 }}
                initial={reduced ? false : 'hidden'}
                animate={reduced ? undefined : 'visible'}
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
              >
                {`I Don't Just Build Apps.`.split(' ').map((word, idx) => (
                  <motion.span
                    key={`line1-${idx}-${word}`}
                    className="mr-[0.24em] inline-block"
                    variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    {word}
                  </motion.span>
                ))}
                <br />
                {`I Build Infrastructure.`.split(' ').map((word, idx) => (
                  <motion.span
                    key={`line2-${idx}-${word}`}
                    className="mr-[0.24em] inline-block"
                    variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }}
              className="mt-4 text-base font-semibold text-gradient md:text-xl"
            >
              Full-Stack Developer × Network Engineer
            </motion.div>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              className="mt-5 text-base text-muted md:text-lg"
            >
              Most developers stop at the browser. I go all the way down
              <br />
              to the network layer - VLANs, firewalls, and everything
              <br />
              in between.
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row md:justify-start"
            >
              <Button variant="primary" size="lg" onClick={() => navigate('/work')}>
                See What I Build <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="lg" onClick={() => navigate('/skills')}>
                View My Stack
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="relative hidden md:col-span-5 md:block"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            <div className="hero-photo-wrap mx-auto">
              <div className="hero-aura-circle aura-indigo" />
              <div className="hero-aura-circle aura-cyan" />
              <div className="hero-photo-glow" />

              <svg className="hero-connector-lines" viewBox="0 0 320 320" aria-hidden="true">
                <path d="M160 35 L72 24" className="connector-line" />
                <path d="M285 122 L302 58" className="connector-line" />
                <path d="M56 252 L22 262" className="connector-line" />
                <path d="M246 286 L286 306" className="connector-line" />
              </svg>

              <div className="hero-photo-frame">
                <div className="hero-photo-inner">
                  {!imageError ? (
                    <img
                      src={profilePhoto}
                      alt={`${site.name} hero portrait`}
                      className="hero-photo-img"
                      onError={() => setImageError(true)}
                      loading="lazy"
                    />
                  ) : (
                    <div className="grid h-full w-full place-items-center bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-cyan-500/20">
                      <div className="text-5xl font-heading font-extrabold text-gradient">{site.initials}</div>
                    </div>
                  )}
                </div>
              </div>

              {techBadges.map((b, idx) => (
                <motion.div
                  key={b.id}
                  className={`hero-tech-pill pill-${b.id}`}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.4 + idx * 0.2 }}
                  style={{ '--accent': b.accent }}
                >
                  <span className="hero-tech-icon">
                    <TechIcon kind={b.id} />
                  </span>
                  <span>{b.label}</span>
                  <span className="hero-tech-tooltip">{b.tooltip}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.5 }}
        >
          <motion.button
            type="button"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="group inline-flex flex-col items-center gap-2"
            aria-label="Scroll to about section"
            data-cursor="active"
          >
            <span className="grid h-10 w-6 place-items-center rounded-full border border-white/10 bg-white/5">
              <motion.span
                className="h-2 w-2 rounded-full bg-white/60"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </span>
            <ChevronDown className="h-4 w-4 opacity-70 group-hover:opacity-100 transition" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

