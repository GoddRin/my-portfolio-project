import { useEffect } from 'react'

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

export function useKonami(onTrigger) {
  useEffect(() => {
    let idx = 0
    const onKeyDown = (e) => {
      const key = e.key
      const expected = KONAMI[idx]
      if (key === expected) {
        idx += 1
        if (idx === KONAMI.length) {
          idx = 0
          onTrigger?.()
        }
        return
      }
      idx = key === KONAMI[0] ? 1 : 0
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onTrigger])
}

