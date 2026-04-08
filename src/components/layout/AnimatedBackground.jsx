import { useEffect, useMemo, useState } from 'react'
import Particles from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

function useBackgroundPrefs() {
  const [state, setState] = useState({ reduced: false, mobile: false, mounted: false })

  useEffect(() => {
    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mobileQuery = window.matchMedia('(max-width: 767px)')

    const update = () =>
      setState({
        reduced: reducedQuery.matches,
        mobile: mobileQuery.matches,
        mounted: true,
      })

    update()
    reducedQuery.addEventListener?.('change', update)
    mobileQuery.addEventListener?.('change', update)
    return () => {
      reducedQuery.removeEventListener?.('change', update)
      mobileQuery.removeEventListener?.('change', update)
    }
  }, [])

  return state
}

export function AnimatedBackground() {
  const { reduced, mobile, mounted } = useBackgroundPrefs()

  if (mobile) return null; // Nuke TSParticles completely on mobile to eliminate stutters

  const particleCount = reduced ? 20 : 60
  const orbClass = reduced ? 'bg-orbs reduced' : 'bg-orbs'

  const options = useMemo(
    () => ({
      fullScreen: { enable: false },
      detectRetina: !mobile,
      fpsLimit: mobile ? 30 : 60,
      particles: {
        number: { value: particleCount, density: { enable: true, area: 1000 } },
        size: { value: { min: 1, max: 2 } },
        color: { value: ['#6366f1', '#22d3ee', '#8b5cf6'] },
        opacity: { value: { min: 0.2, max: 0.5 } },
        move: {
          enable: !reduced,
          speed: reduced ? 0 : mobile ? 0.3 : 0.6,
          direction: 'none',
          random: true,
          outModes: { default: 'out' },
        },
        links: {
          enable: !mobile,
          color: '#6366f1',
          distance: 130,
          opacity: 0.15,
          width: 0.8,
        },
      },
      interactivity: {
        events: {
          onHover: { enable: !reduced && !mobile, mode: 'repulse' },
          onClick: { enable: !reduced && !mobile, mode: 'push' },
        },
        modes: {
          repulse: { distance: 80, duration: 0.4 },
          push: { quantity: 3 },
        },
      },
    }),
    [particleCount, reduced, mobile],
  )

  return (
    <div
      className={`animated-bg-root${reduced ? ' reduced-motion' : ''}${mobile ? ' is-mobile' : ''}`}
      aria-hidden="true"
    >
      {/* Layer 1: fixed floating orbs */}
      <div className={orbClass}>
        <span className="bg-orb orb-1" />
        <span className="bg-orb orb-2" />
        <span className="bg-orb orb-3" />
        <span className="bg-orb orb-4" />
        <span className="bg-orb orb-5" />
        <span className="bg-orb orb-6" />
      </div>

      {/* Layer 2: particles */}
      <div className="bg-particles">
        {mounted ? (
          <Particles id="global-particles" init={async (engine) => loadSlim(engine)} options={options} />
        ) : null}
      </div>

      {/* Layer 3: subtle dot-grid */}
      <div className="bg-dot-grid" />

      {/* Layer 5: aurora sweep */}
      {!reduced ? <div className="bg-aurora" /> : null}

      {/* Layer 4: grain/noise */}
      <svg className="bg-grain-svg" aria-hidden="true">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div className="bg-grain" />
    </div>
  )
}

