import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Monitor,
  Server,
  Database,
  ArrowRight,
  ClipboardList,
  Hammer,
  FlaskConical,
  Rocket,
  ChevronRight,
} from 'lucide-react'
import { RevealWrapper } from '../ui/RevealWrapper.jsx'

/* ── Architecture flow nodes ─────────────────────────────────────── */
const archNodes = [
  { icon: Monitor, label: 'Frontend', sub: 'React / Vite', color: '#6366f1' },
  { icon: Server, label: 'API', sub: 'Node / Express', color: '#8b5cf6' },
  { icon: Database, label: 'Database', sub: 'MongoDB', color: '#22d3ee' },
]

/* ── Development workflow steps ─────────────────────────────────── */
const workflowSteps = [
  { icon: ClipboardList, label: 'Plan', desc: 'Define scope & architecture', color: '#6366f1' },
  { icon: Hammer, label: 'Build', desc: 'Develop features iteratively', color: '#8b5cf6' },
  { icon: FlaskConical, label: 'Test', desc: 'Validate & debug thoroughly', color: '#a78bfa' },
  { icon: Rocket, label: 'Deploy', desc: 'Ship to production', color: '#22d3ee' },
]

/* ── Tools grid ─────────────────────────────────────────────────── */
const tools = [
  { name: 'React', category: 'Frontend', color: '#61dafb' },
  { name: 'Node.js', category: 'Backend', color: '#68a063' },
  { name: 'MongoDB', category: 'Database', color: '#4db33d' },
  { name: 'Express', category: 'Backend', color: '#f1f5f9' },
  { name: 'Vercel', category: 'Deploy', color: '#f1f5f9' },
  { name: 'Render', category: 'Deploy', color: '#46e3b7' },
]

/* ── Connector arrow (SVG) ───────────────────────────────────────── */
function FlowArrow() {
  return (
    <div className="hidden md:flex items-center justify-center px-2">
      <svg width="48" height="24" viewBox="0 0 48 24" fill="none" className="opacity-40">
        <line x1="0" y1="12" x2="38" y2="12" stroke="url(#arrowGrad)" strokeWidth="2" strokeDasharray="4 3" />
        <polygon points="38,6 48,12 38,18" fill="url(#arrowGrad)" />
        <defs>
          <linearGradient id="arrowGrad" x1="0" y1="12" x2="48" y2="12">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

/* Vertical arrow for mobile */
function FlowArrowVertical() {
  return (
    <div className="flex md:hidden items-center justify-center py-1">
      <svg width="24" height="36" viewBox="0 0 24 36" fill="none" className="opacity-40">
        <line x1="12" y1="0" x2="12" y2="28" stroke="url(#arrowGradV)" strokeWidth="2" strokeDasharray="4 3" />
        <polygon points="6,28 12,36 18,28" fill="url(#arrowGradV)" />
        <defs>
          <linearGradient id="arrowGradV" x1="12" y1="0" x2="12" y2="36">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

/* ── Animated line for workflow ───────────────────────────────────── */
function WorkflowLine() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })

  return (
    <div ref={ref} className="hidden md:block absolute top-8 left-0 right-0 h-[2px] z-0">
      <div className="absolute inset-0 bg-white/5 rounded-full" />
      <motion.div
        className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 via-purple-400 to-cyan-400 rounded-full"
        initial={{ width: '0%' }}
        animate={inView ? { width: '100%' } : { width: '0%' }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}

export function SystemsApproach() {
  return (
    <section
      id="systems"
      className="systems-section relative z-10 mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28"
    >
      {/* ── Optional subtle top/bottom dividers ─── */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <RevealWrapper>
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="systems-mono-label inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-mono tracking-widest text-muted uppercase mb-5">
            Process &amp; Architecture
          </span>
          <h2
            className="font-heading font-bold text-text"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}
          >
            How I Build Systems
          </h2>
          <p className="mt-4 text-muted text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            A clean, structured approach — from architecture to deployment — ensuring every layer is reliable and production-ready.
          </p>
        </div>

        {/* ════════════  Architecture Diagram  ════════════ */}
        <div className="mt-14">
          <div className="text-xs font-mono tracking-wider text-muted/70 uppercase mb-4 text-center md:text-left">
            System Architecture
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-0">
            {archNodes.map((node, i) => {
              const Icon = node.icon
              return (
                <div key={node.label} className="flex flex-col md:flex-row items-center">
                  <motion.div
                    className="systems-arch-node group relative flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.03] px-6 py-5 backdrop-blur-sm transition-colors hover:border-white/15 hover:bg-white/[0.06] w-full md:w-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: i * 0.12 }}
                  >
                    {/* Glow dot */}
                    <div
                      className="absolute -top-1 -right-1 h-2 w-2 rounded-full opacity-60"
                      style={{ background: node.color, boxShadow: `0 0 8px ${node.color}` }}
                    />
                    <div
                      className="grid h-12 w-12 place-items-center rounded-xl shrink-0"
                      style={{ background: `${node.color}14`, border: `1px solid ${node.color}30` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: node.color }} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-text">{node.label}</div>
                      <div className="text-xs text-muted font-mono">{node.sub}</div>
                    </div>
                  </motion.div>

                  {/* Arrow between nodes */}
                  {i < archNodes.length - 1 && (
                    <>
                      <FlowArrow />
                      <FlowArrowVertical />
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* ════════════  Development Workflow  ════════════ */}
        <div className="mt-16 md:mt-20">
          <div className="text-xs font-mono tracking-wider text-muted/70 uppercase mb-8 text-center md:text-left">
            Development Workflow
          </div>

          <div className="relative">
            <WorkflowLine />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 relative z-10">
              {workflowSteps.map((step, i) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={step.label}
                    className="systems-workflow-step group text-center"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.45, delay: i * 0.1 }}
                  >
                    {/* Circle */}
                    <div className="relative mx-auto">
                      <div
                        className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-white/10 bg-white/[0.04] transition-all group-hover:border-white/20 group-hover:bg-white/[0.07]"
                        style={{
                          boxShadow: `0 0 0 0 ${step.color}00`,
                          transition: 'box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 24px ${step.color}30` }}
                        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = `0 0 0 0 ${step.color}00` }}
                      >
                        <Icon className="h-6 w-6 transition-transform group-hover:scale-110" style={{ color: step.color }} />
                      </div>

                      {/* Step number */}
                      <span
                        className="absolute -top-1 -right-1 grid h-5 w-5 place-items-center rounded-full text-[10px] font-bold text-white"
                        style={{ background: step.color }}
                      >
                        {i + 1}
                      </span>
                    </div>

                    <div className="mt-3 text-sm font-semibold text-text">{step.label}</div>
                    <div className="mt-1 text-xs text-muted leading-relaxed">{step.desc}</div>

                    {/* Mobile connector */}
                    {i < workflowSteps.length - 1 && i % 2 === 1 && (
                      <div className="md:hidden col-span-2 flex justify-center py-1">
                        <ChevronRight className="h-4 w-4 text-white/20 rotate-90" />
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ════════════  Tools Used  ════════════ */}
        <div className="mt-16 md:mt-20">
          <div className="text-xs font-mono tracking-wider text-muted/70 uppercase mb-6 text-center md:text-left">
            Tools &amp; Stack
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.name}
                className="systems-tool-chip group flex items-center gap-2.5 rounded-full border border-white/8 bg-white/[0.03] px-5 py-2.5 backdrop-blur-sm transition-all hover:border-white/15 hover:bg-white/[0.06]"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                whileHover={{ y: -2 }}
              >
                <span
                  className="h-2 w-2 rounded-full shrink-0 transition-shadow"
                  style={{
                    background: tool.color,
                    boxShadow: `0 0 0 0 ${tool.color}00`,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 10px ${tool.color}60` }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = `0 0 0 0 ${tool.color}00` }}
                />
                <span className="text-sm font-medium text-text">{tool.name}</span>
                <span className="text-[10px] font-mono text-muted/60 uppercase tracking-wider">{tool.category}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </RevealWrapper>
    </section>
  )
}
