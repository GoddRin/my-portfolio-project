import { motion } from 'framer-motion'
import clsx from 'clsx'

export function Button({
  as: Comp = 'button',
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50 disabled:pointer-events-none'

  const sizes = {
    sm: 'h-10 px-4 text-sm',
    md: 'h-11 px-5 text-sm',
    lg: 'h-12 px-6 text-base',
  }

  const variants = {
    primary:
      'bg-accent-gradient text-black shadow-[0_18px_50px_rgba(99,102,241,0.25)] hover:shadow-[0_24px_70px_rgba(34,211,238,0.25)]',
    ghost:
      'bg-white/5 text-text border border-white/10 hover:bg-white/8 hover:border-white/15',
    subtle: 'bg-white/6 text-text hover:bg-white/10',
  }

  const motionProps = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
    transition: { type: 'spring', stiffness: 350, damping: 24 },
  }

  /* Let the wrapper stretch when flex-1 / w-full is passed */
  const needsStretch = className?.includes('flex-1') || className?.includes('w-full')

  return (
    <motion.div className={needsStretch ? 'flex flex-1' : 'inline-flex'} {...motionProps}>
      <Comp className={clsx(base, sizes[size], variants[variant], className)} {...props}>
        {children}
      </Comp>
    </motion.div>
  )
}

