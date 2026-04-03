import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Children, isValidElement, useMemo, useRef } from 'react'

const EASE = [0.25, 0.46, 0.45, 0.94]

export function RevealWrapper({
  children,
  className,
  once = true,
  margin = '-100px',
  amount = 0.12,
  stagger = 0.16,
  delayChildren = 0.08,
  transition = { duration: 0.6, ease: EASE },
  variants,
  forceMotion = false,
  ...props
}) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const inView = useInView(ref, { once, margin, amount })
  const wrapperRevealOff = props?.['data-reveal'] === 'off'
  const shouldReduce = reduced && !forceMotion

  const baseVariants = useMemo(
    () =>
      variants ?? {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
      },
    [variants],
  )

  const containerVariants = useMemo(
    () => ({
      hidden: baseVariants.hidden,
      visible: {
        ...baseVariants.visible,
        transition: {
          ...transition,
          delayChildren,
          staggerChildren: stagger,
        },
      },
    }),
    [baseVariants.hidden, baseVariants.visible, delayChildren, stagger, transition],
  )

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
    }),
    [],
  )

  if (shouldReduce || wrapperRevealOff) {
    return (
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
      style={{ willChange: 'transform, opacity' }}
      {...props}
    >
      {Children.map(children, (child) => {
        if (isValidElement(child) && child.props?.['data-reveal'] === 'off') return child

        if (!isValidElement(child)) {
          return (
            <motion.div variants={itemVariants} style={{ willChange: 'transform, opacity' }}>
              {child}
            </motion.div>
          )
        }
        return (
          <motion.div variants={itemVariants} style={{ willChange: 'transform, opacity' }}>
            {child}
          </motion.div>
        )
      })}
    </motion.div>
  )
}

