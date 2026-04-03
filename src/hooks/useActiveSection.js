import { useEffect, useState } from 'react'

export function useActiveSection(sectionIds, { rootMargin = '-80px 0px -55% 0px' } = {}) {
  const [activeId, setActiveId] = useState(sectionIds?.[0] ?? 'home')

  useEffect(() => {
    if (!Array.isArray(sectionIds) || sectionIds.length === 0) return
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (els.length === 0) return

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length === 0) return
        // Pick the section whose top is closest to the viewport's content start.
        visible.sort((a, b) => {
          const da = Math.abs(a.boundingClientRect.top - 110)
          const db = Math.abs(b.boundingClientRect.top - 110)
          return da - db
        })
        const id = visible[0]?.target?.getAttribute('id')
        if (id) setActiveId(id)
      },
      { root: null, threshold: [0, 0.1, 0.2, 0.35, 0.5], rootMargin },
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [rootMargin, sectionIds])

  return activeId
}

