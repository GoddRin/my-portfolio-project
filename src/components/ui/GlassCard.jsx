import { motion } from 'framer-motion'
import clsx from 'clsx'
import { forwardRef, useEffect, useState } from 'react'

/* Detect touch-primary device once so we can skip hover animations that cause flicker */
function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(hover: none) and (pointer: coarse)')
    setIsTouch(mq.matches)
    const handler = (e) => setIsTouch(e.matches)
    mq.addEventListener?.('change', handler)
    return () => mq.removeEventListener?.('change', handler)
  }, [])
  return isTouch
}

export const GlassCard = forwardRef(function GlassCard(
  { className, hover = true, children, ...props },
  ref,
) {
  const isTouch = useIsTouchDevice()

  return (
    <motion.div
      ref={ref}
      className={clsx(
        'glass rounded-2xl p-6',
        'shadow-[0_10px_40px_rgba(0,0,0,0.25)]',
        hover && !isTouch && 'gradient-border',
        className,
      )}
      whileHover={hover && !isTouch ? { y: -6, boxShadow: '0 20px 60px rgba(99,102,241,0.3)' } : undefined}
      transition={{ type: 'spring', stiffness: 260, damping: 28 }}
      {...props}
    >
      {children}
    </motion.div>
  )
})


