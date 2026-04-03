import { motion } from 'framer-motion'
import clsx from 'clsx'
import { forwardRef } from 'react'

export const GlassCard = forwardRef(function GlassCard(
  { className, hover = true, children, ...props },
  ref,
) {
  return (
    <motion.div
      ref={ref}
      className={clsx(
        'glass rounded-2xl p-6',
        'shadow-[0_10px_40px_rgba(0,0,0,0.25)]',
        hover && 'gradient-border',
        className,
      )}
      whileHover={hover ? { y: -6, boxShadow: '0 20px 60px rgba(99,102,241,0.3)' } : undefined}
      transition={{ type: 'spring', stiffness: 260, damping: 28 }}
      {...props}
    >
      {children}
    </motion.div>
  )
})

