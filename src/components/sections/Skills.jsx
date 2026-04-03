import { motion, useInView } from 'framer-motion'
import { useMemo, useRef, useState } from 'react'
import { marqueeTech, skillCategories, skills } from '../../data/skills.js'
import { RevealWrapper } from '../ui/RevealWrapper.jsx'
import { GlassCard } from '../ui/GlassCard.jsx'
import { SkillsRadar } from '../ui/SkillsRadar.jsx'

function SkillCard({ skill }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const Icon = skill.icon

  return (
    <GlassCard ref={ref} className="p-5">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 border border-white/10">
          <Icon className="h-5 w-5 text-cyan-300" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-text">{skill.name}</div>
          <div className="mt-1 h-2 w-full rounded-full bg-white/8 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400"
              initial={{ width: 0 }}
              animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      </div>
    </GlassCard>
  )
}

export function Skills() {
  const [filter, setFilter] = useState('all')

  const filtered = useMemo(() => {
    if (filter === 'all') return skills
    return skills.filter((s) => s.category === filter)
  }, [filter])

  const radarData = useMemo(() => {
    const by = (cat) => {
      const items = skills.filter((s) => s.category === cat)
      if (items.length === 0) return 0
      return Math.round(items.reduce((a, b) => a + b.level, 0) / items.length)
    }
    return [
      { label: 'Frontend', value: by('frontend') },
      { label: 'Backend', value: by('backend') },
      { label: 'Networking', value: by('networking') },
      { label: 'Tools', value: by('tools') },
    ]
  }, [])

  return (
    <section id="skills" className="relative z-10 mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
      <RevealWrapper>
        <h2
          className="font-heading font-bold text-text"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}
        >
          My Toolkit
        </h2>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          {skillCategories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setFilter(c.id)}
              className={[
                'rounded-full px-4 py-2 text-sm border transition',
                filter === c.id
                  ? 'bg-white/10 border-white/15 text-text'
                  : 'bg-white/5 border-white/10 text-muted hover:text-text hover:bg-white/8',
              ].join(' ')}
              aria-pressed={filter === c.id}
              data-cursor="active"
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((s) => (
                <SkillCard key={s.id} skill={s} />
              ))}
            </div>
          </div>
          <div className="lg:col-span-4">
            <SkillsRadar data={radarData} />
          </div>
        </div>

        {/* Marquee */}
        <div className="mt-14 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <div className="py-4">
            <div className="flex gap-6 whitespace-nowrap [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="flex gap-6 animate-marquee will-change-transform">
                {marqueeTech.concat(marqueeTech).map((t, i) => (
                  <span
                    key={`${t}-${i}`}
                    className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-3 flex gap-6 whitespace-nowrap [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="flex gap-6 animate-marquee-reverse will-change-transform">
                {marqueeTech.concat(marqueeTech).map((t, i) => (
                  <span
                    key={`${t}-b-${i}`}
                    className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </RevealWrapper>
    </section>
  )
}

