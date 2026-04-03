import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { timeline } from '../../data/timeline.js'
import { RevealWrapper } from '../ui/RevealWrapper.jsx'
import { GlassCard } from '../ui/GlassCard.jsx'

function Entry({ item, side }) {
  return (
    <div className="relative grid md:grid-cols-12">
      <div className={side === 'left' ? 'md:col-span-5 md:col-start-1' : 'md:col-span-5 md:col-start-8'}>
        <GlassCard className="p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-muted">
              {item.range}
            </span>
            {item.current ? (
              <span className="rounded-full bg-emerald-500/15 border border-emerald-400/20 px-3 py-1 text-xs text-emerald-200">
                Current
              </span>
            ) : null}
          </div>
          <div className="mt-3 text-lg font-semibold text-text">{item.title}</div>
          <div className="mt-1 text-sm text-muted">{item.org}</div>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {item.bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300/80" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>
    </div>
  )
}

export function Timeline() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })

  return (
    <section id="timeline" className="relative z-10 mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
      <RevealWrapper>
        <h2
          className="font-heading font-bold text-text"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}
        >
          Experience & Education
        </h2>
      </RevealWrapper>

      <div ref={ref} className="relative mt-12">
        <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-white/10 md:block" />
        <motion.div
          className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-indigo-400 to-cyan-400 md:block origin-top"
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="space-y-8">
          {timeline.map((t, i) => {
            const side = i % 2 === 0 ? 'left' : 'right'
            return (
              <div key={t.id} className="relative">
                <div className="absolute left-1/2 top-10 hidden -translate-x-1/2 md:block">
                  <div className="relative">
                    <div className="h-4 w-4 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400 shadow-[0_0_0_10px_rgba(99,102,241,0.12)]" />
                    <div className="absolute inset-0 h-4 w-4 rounded-full ring-1 ring-cyan-400/35" />
                  </div>
                </div>
                <RevealWrapper
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Entry item={t} side={side} />
                </RevealWrapper>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

