import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js'

function isFinePointer() {
  return window.matchMedia?.('(hover: hover) and (pointer: fine)')?.matches
}

export function CustomCursor() {
  const reduced = usePrefersReducedMotion()
  const [fine, setFine] = useState(() => (typeof window === 'undefined' ? false : isFinePointer()))
  const [active, setActive] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  const ringX = useSpring(x, { mass: 0.5, stiffness: 350, damping: 32 })
  const ringY = useSpring(y, { mass: 0.5, stiffness: 350, damping: 32 })

  useEffect(() => {
    const onResize = () => setFine(isFinePointer())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const enabled = fine && !reduced

  useLayoutEffect(() => {
    const root = document.documentElement
    if (enabled) {
      root.classList.add('custom-cursor-active')
    } else {
      root.classList.remove('custom-cursor-active')
    }
    return () => root.classList.remove('custom-cursor-active')
  }, [enabled])

  useEffect(() => {
    if (!enabled) return

    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }

    const onOver = (e) => {
      const el = e.target
      if (!(el instanceof Element)) return
      if (el.closest('a,button,[role="button"],input,textarea,select,[data-cursor="active"]')) {
        setActive(true)
      }
    }

    const onOut = () => setActive(false)

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    window.addEventListener('mouseout', onOut, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mouseout', onOut)
    }
  }, [enabled, x, y])

  const ringSize = useMemo(() => (active ? 48 : 32), [active])

  if (!enabled || reduced) return null

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed left-0 top-0 z-[999] h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90 shadow-[0_0_0_1px_rgba(0,0,0,0.35),0_0_12px_rgba(99,102,241,0.45)] pointer-events-none"
        style={{ x, y }}
      />
      <motion.div
        aria-hidden="true"
        className="fixed left-0 top-0 z-[998] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-white/5 shadow-[0_0_0_1px_rgba(0,0,0,0.2)] pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          width: ringSize,
          height: ringSize,
          opacity: active ? 0.9 : 0.55,
        }}
      />
    </>
  )
}

