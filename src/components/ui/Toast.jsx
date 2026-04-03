import { AnimatePresence, motion } from 'framer-motion'

export function Toast({ open, tone = 'error', title, message, onClose }) {
  const toneClasses =
    tone === 'success'
      ? 'border-emerald-400/25 bg-emerald-500/10 text-emerald-100'
      : 'border-rose-400/25 bg-rose-500/10 text-rose-100'

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className={`fixed bottom-6 left-6 z-[90] max-w-sm rounded-2xl border px-4 py-3 backdrop-blur ${toneClasses}`}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 14 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          role="status"
          aria-live="polite"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm font-semibold">{title}</div>
              {message ? <div className="mt-1 text-xs opacity-90">{message}</div> : null}
            </div>
            <button
              type="button"
              className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-current hover:bg-white/10 transition"
              onClick={onClose}
              aria-label="Dismiss notification"
              data-cursor="active"
            >
              Close
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

