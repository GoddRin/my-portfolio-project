import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { useCountUp } from '../../hooks/useCountUp.js'

export function CountUp({ to, className, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const value = useCountUp(to, { durationMs: 1500, startOn: inView })

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  )
}

