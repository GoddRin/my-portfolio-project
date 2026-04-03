import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

export function TypewriterText({ items, intervalMs = 2200, className }) {
  const reduced = useReducedMotion()
  const safeItems = useMemo(() => (Array.isArray(items) && items.length ? items : ['']), [items])
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (reduced) return
    const t = window.setInterval(() => setIdx((i) => (i + 1) % safeItems.length), intervalMs)
    return () => window.clearInterval(t)
  }, [intervalMs, reduced, safeItems.length])

  const text = safeItems[idx]

  if (reduced) return <span className={className}>{text}</span>

  return (
    <span className={className}>
      <AnimatePresence mode="wait">
        <motion.span
          key={text}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

