import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { useKonami } from '../../hooks/useKonami.js'

const frames = [
  '[boot] initializing developer environment…',
  '[net] acquiring IP…',
  '[pkg] installing coffee…',
  '[ui] rendering cinematic pixels…',
  '[ok] developer loaded ✓',
]

export function TerminalEgg() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)

  useKonami(() => {
    setOpen(true)
    setStep(0)
  })

  const lines = useMemo(() => frames.slice(0, Math.max(1, step + 1)), [step])

  useEffect(() => {
    if (!open) return
    const timers = frames.map((_, i) => window.setTimeout(() => setStep(i), 260 + i * 420))
    return () => timers.forEach((t) => window.clearTimeout(t))
  }, [open])

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <motion.div
            className="fixed left-1/2 top-1/2 z-[80] w-[92%] max-w-xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-white/10 bg-black/80 shadow-[0_30px_100px_rgba(0,0,0,0.55)]"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            role="dialog"
            aria-modal="true"
            aria-label="Terminal easter egg"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="text-xs font-semibold text-muted">portfolio://console</div>
              <button
                type="button"
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs text-text hover:bg-white/10 transition"
                onClick={() => setOpen(false)}
                data-cursor="active"
              >
                Close
              </button>
            </div>

            <div className="p-5 font-mono text-sm text-emerald-200">
              <div className="mb-4 text-emerald-300/90">
                {String.raw`
   ____            __  _ _       ____  ____ 
  / __ \____ _____/ /_(_) |     / __ \/ __ \
 / /_/ / __ '/ __  / / /| | /| / / / / /_/ /
/ ____/ /_/ / /_/ / / / | |/ |/ / /_/ / _, _/ 
/_/    \__,_/\__,_/_/_/  |__/|__/\____/_/ |_|`}
              </div>
              <div className="space-y-2">
                {lines.map((l) => (
                  <motion.div
                    key={l}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <span className="text-emerald-400">$</span> {l}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  )
}

