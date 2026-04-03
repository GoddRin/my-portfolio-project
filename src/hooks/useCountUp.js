import { useEffect, useMemo, useRef, useState } from 'react'

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}

export function useCountUp(target, { durationMs = 1500, startOn = true } = {}) {
  const [value, setValue] = useState(0)
  const raf = useRef(0)
  const startAt = useRef(0)

  const safeTarget = useMemo(() => {
    const n = Number(target)
    return Number.isFinite(n) ? n : 0
  }, [target])

  useEffect(() => {
    if (!startOn) return
    cancelAnimationFrame(raf.current)
    startAt.current = performance.now()

    const tick = (now) => {
      const t = Math.min(1, (now - startAt.current) / durationMs)
      const eased = easeOutCubic(t)
      setValue(Math.round(safeTarget * eased))
      if (t < 1) raf.current = requestAnimationFrame(tick)
    }

    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [durationMs, safeTarget, startOn])

  return value
}

