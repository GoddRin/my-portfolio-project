import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function ReadingProgress() {
  const reduced = useReducedMotion()
  const [p, setP] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const max = Math.max(1, doc.scrollHeight - doc.clientHeight)
      const v = Math.min(1, Math.max(0, (window.scrollY || 0) / max))
      setP(v)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (reduced) {
    return (
      <div className="fixed left-0 top-0 z-[80] h-[2px] w-full bg-white/10">
        <div className="h-full bg-gradient-to-r from-indigo-400 to-cyan-400" style={{ width: `${p * 100}%` }} />
      </div>
    )
  }

  return (
    <div className="fixed left-0 top-0 z-[80] h-[2px] w-full bg-white/10">
      <motion.div
        className="h-full bg-gradient-to-r from-indigo-400 to-cyan-400"
        animate={{ width: `${p * 100}%` }}
        transition={{ duration: 0.15, ease: 'linear' }}
      />
    </div>
  )
}

