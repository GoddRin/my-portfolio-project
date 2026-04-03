import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, Code2, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Button } from './Button.jsx'

export function ProjectModal({ project, open, onClose }) {
  const [idx, setIdx] = useState(0)

  const shots = useMemo(() => project?.screenshots ?? [], [project])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.()
      if (e.key === 'ArrowLeft') setIdx((i) => Math.max(0, i - 1))
      if (e.key === 'ArrowRight') setIdx((i) => Math.min(shots.length - 1, i + 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, open, shots.length])

  return (
    <AnimatePresence>
      {open && project ? (
        <>
          <motion.div
            className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            className="fixed left-1/2 top-1/2 z-[90] w-[94%] max-w-5xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-white/10 bg-black/75 shadow-[0_30px_100px_rgba(0,0,0,0.55)]"
            initial={{ opacity: 0, y: 16, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.99 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.name} details`}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="min-w-0">
                <div className="text-xs text-muted">{project.category}</div>
                <div className="truncate text-lg font-semibold text-text">{project.name}</div>
              </div>
              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 border border-white/10 text-text hover:bg-white/10 transition"
                onClick={onClose}
                aria-label="Close project modal"
                data-cursor="active"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid max-h-[80vh] gap-6 overflow-auto p-6 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface">
                  <img
                    src={shots[idx] || project.image}
                    alt={`${project.name} screenshot`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>

                {shots.length > 1 ? (
                  <div className="mt-3 flex items-center gap-2">
                    {shots.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        className={[
                          'h-2.5 w-2.5 rounded-full border transition',
                          i === idx
                            ? 'border-transparent bg-gradient-to-r from-indigo-400 to-cyan-400'
                            : 'border-white/20 bg-white/10',
                        ].join(' ')}
                        onClick={() => setIdx(i)}
                        aria-label={`Go to screenshot ${i + 1}`}
                        data-cursor="active"
                      />
                    ))}
                    <div className="ml-auto text-xs text-muted">
                      <span className="font-mono">←/→</span> to navigate
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="lg:col-span-5">
                <div className="text-sm text-muted">{project.longDescription}</div>

                <div className="mt-5">
                  <div className="text-xs font-mono text-muted">// features</div>
                  <ul className="mt-3 space-y-2 text-sm text-text">
                    {(project.features ?? []).map((f) => (
                      <li key={f} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300/80" />
                        <span className="text-muted">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <div className="text-xs font-mono text-muted">// stack</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(project.stack ?? []).map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Button as="a" href={project.liveUrl} target="_blank" rel="noreferrer" variant="primary">
                    View Live <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button as="a" href={project.githubUrl} target="_blank" rel="noreferrer" variant="ghost">
                    GitHub <Code2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  )
}

