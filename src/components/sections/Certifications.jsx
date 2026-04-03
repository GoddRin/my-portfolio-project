import { motion, useInView } from 'framer-motion'
import { BadgeCheck, Brain, Clock, Shield } from 'lucide-react'
import { useMemo, useRef } from 'react'
import { certifications } from '../../data/certifications.js'

const EASE = [0.25, 0.46, 0.45, 0.94]

const iconMap = {
  Shield,
  BadgeCheck,
  Brain,
  Clock,
}

function StatusBadge({ status }) {
  const isPursuing = status === 'pursuing'
  const isDone = status === 'completed' || status === 'passed'
  const label = isPursuing ? 'PURSUING' : isDone ? (status === 'passed' ? 'PASSED' : 'COMPLETED') : status

  return (
    <span className={`cert-status ${isPursuing ? 'amber' : 'green'}`}>
      <span className="cert-status-dot" />
      {label}
    </span>
  )
}

function CompletionBar({ inView }) {
  return (
    <div className="mt-3">
      <div className="flex items-center justify-between text-xs text-muted">
        <span>Completion</span>
        <span>100%</span>
      </div>
      <div className="mt-2 h-1 rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500"
          initial={{ width: 0 }}
          animate={inView ? { width: '100%' } : { width: 0 }}
          transition={{ duration: 1.4, delay: 0.5, ease: EASE }}
        />
      </div>
    </div>
  )
}

export function Certifications() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [civil, google, dict, mtcna] = useMemo(
    () => [
      certifications.find((c) => c.id === 1),
      certifications.find((c) => c.id === 2),
      certifications.find((c) => c.id === 3),
      certifications.find((c) => c.id === 4),
    ],
    [],
  )

  const ringCirc = 2 * Math.PI * 42
  const ringOffset = ringCirc * 0.6

  const CivilIcon = iconMap[civil.icon]
  const GoogleIcon = iconMap[google.icon]
  const DictIcon = iconMap[dict.icon]
  const MtcnaIcon = iconMap[mtcna.icon]

  return (
    <section id="certifications" className="relative overflow-hidden py-[120px]">
      <div className="certifications-bg-glow" />

      <div ref={ref} className="relative z-10 mx-auto max-w-6xl px-4 md:px-6">
        <motion.header
          className="mx-auto mb-16 max-w-[600px] text-center"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.h2
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, ease: EASE }}
            className="font-heading"
          >
            <span className="block text-[clamp(2rem,4vw,3rem)] font-light italic text-text">Verified</span>
            <span className="block text-gradient text-[clamp(2rem,4vw,3rem)] font-extrabold">Achievements.</span>
          </motion.h2>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mt-4 text-[15px] text-[#64748b]"
          >
            Certifications and eligibilities that back the work.
          </motion.p>
        </motion.header>

        <div className="cert-bento-grid">
          <motion.article
            className="cert-card cert-card-indigo cert-wide"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
            whileHover={{ y: -8, transition: { duration: 0.35, ease: EASE } }}
            style={{ '--card-accent': civil.accent }}
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="cert-icon-wrap cert-icon-indigo">
                  <CivilIcon size={28} color="#818cf8" />
                </div>
                <div className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-400">
                  {civil.level}
                </div>
                <div className="mt-1 text-[22px] font-bold leading-[1.2] text-text">{civil.title}</div>
                <div className="mt-1.5 text-[13px] text-[#64748b]">{civil.issuer}</div>
              </div>
              <div className="flex flex-col items-end text-right">
                <div className="mb-1 pr-1 text-[52px] font-extrabold leading-none tracking-tight text-indigo-400/30">{civil.year}</div>
                <StatusBadge status={civil.status} />
              </div>
            </div>
            <div className="cert-card-orb" />
          </motion.article>

          <motion.article
            className="cert-card cert-card-cyan"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.22, ease: EASE }}
            whileHover={{ y: -8, transition: { duration: 0.35, ease: EASE } }}
            style={{ '--card-accent': google.accent }}
          >
            <div className="cert-icon-wrap cert-icon-cyan">
              <GoogleIcon size={28} color="#22d3ee" />
            </div>
            <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300">{google.category}</div>
            <div className="mt-2 text-[19px] font-bold text-text">IT Support Professional</div>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="cert-mini-pill"><span className="cert-mini-dot bg-cyan-400" />Google</span>
              <span className="cert-mini-pill"><span className="cert-mini-dot bg-violet-400" />Coursera</span>
            </div>
            <div className="mt-3 text-[40px] font-extrabold leading-none text-cyan-300/20">{google.year}</div>
            <div className="my-4 h-px bg-white/10" />
            <CompletionBar inView={inView} />
            <div className="mt-4">
              <StatusBadge status={google.status} />
            </div>
          </motion.article>

          <motion.article
            className="cert-card cert-card-purple"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.34, ease: EASE }}
            whileHover={{ y: -8, transition: { duration: 0.35, ease: EASE } }}
            style={{ '--card-accent': dict.accent }}
            title="Artificial Intelligence & Prompt Engineering in Digital Literacy"
          >
            <div className="cert-icon-wrap cert-icon-purple">
              <DictIcon size={28} color="#a78bfa" />
            </div>
            <div className="mt-4 inline-flex rounded-full border border-purple-400/30 bg-purple-500/10 px-3 py-1 text-[11px] font-mono text-purple-300">
              Artificial Intelligence
            </div>
            <div className="mt-3 text-[19px] font-bold text-text">AI & Prompt Engineering</div>
            <div className="mt-2 text-[13px] text-[#64748b]">{dict.issuer} · {dict.year}</div>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="cert-ai-tag">AI</span>
              <span className="cert-ai-tag">Prompt Eng.</span>
              <span className="cert-ai-tag">Digital Literacy</span>
            </div>
            <div className="mt-5">
              <StatusBadge status={dict.status} />
            </div>
          </motion.article>

          <motion.article
            className="cert-card cert-card-amber cert-wide cert-dashed"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.46, ease: EASE }}
            whileHover={{ y: -8, transition: { duration: 0.35, ease: EASE } }}
            style={{ '--card-accent': mtcna.accent }}
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="cert-icon-wrap cert-icon-amber">
                  <MtcnaIcon size={28} color="#f59e0b" />
                </div>
                <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-amber-400">In Progress</div>
                <div className="mt-2 text-[20px] font-bold text-text">{mtcna.title}</div>
                <div className="mt-1.5 text-[13px] text-[#64748b]">{mtcna.level} · {mtcna.issuer}</div>
                <div className="mt-4">
                  <StatusBadge status={mtcna.status} />
                </div>
              </div>
              <div className="text-center">
                <svg viewBox="0 0 100 100" width="100" height="100" aria-hidden="true">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(245,158,11,0.15)" strokeWidth="6" />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={ringCirc}
                    initial={{ strokeDashoffset: ringCirc }}
                    animate={inView ? { strokeDashoffset: ringOffset } : { strokeDashoffset: ringCirc }}
                    transition={{ duration: 1.6, delay: 0.4, ease: 'easeOut' }}
                    transform="rotate(-90 50 50)"
                  />
                  <text x="50" y="48" textAnchor="middle" fontSize="18" fontWeight="700" fill="#f59e0b">
                    {mtcna.progress}%
                  </text>
                  <text x="50" y="62" textAnchor="middle" fontSize="9" fill="#64748b">
                    progress
                  </text>
                </svg>
                <div className="mt-2 text-xs text-[#64748b]">Target: 2026</div>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  )
}

