import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useMemo, useRef } from 'react'

export function ScrollReveal({
  children,
  className,
  as: Comp = motion.div,
  once = true,
  amount = 0.25,
  variants,
  ...props
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, amount })
  const reduced = useReducedMotion()

  const v = useMemo(
    () =>
      variants ?? {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
      },
    [variants],
  )

  if (reduced) {
    return (
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    )
  }

  return (
    <Comp
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={v}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      {...props}
    >
      {children}
    </Comp>
  )
}

