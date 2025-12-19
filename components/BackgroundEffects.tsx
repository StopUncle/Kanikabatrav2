'use client'

import { useEffect, useRef, useState } from 'react'

export default function BackgroundEffects() {
  const particlesRef = useRef<HTMLDivElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)

    // Skip particles on mobile or when user prefers reduced motion
    const isMobile = window.innerWidth <= 768
    if (particlesRef.current && !isMobile && !mediaQuery.matches) {
      const particleCount = window.innerWidth > 1024 ? 3 : 2
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div')
        particle.className = 'particle'
        particle.style.left = `${Math.random() * 100}%`
        particle.style.animationDelay = `${Math.random() * 20}s`
        particle.style.animationDuration = `${15 + Math.random() * 10}s`
        particle.style.willChange = 'transform'
        particlesRef.current.appendChild(particle)
      }
    }

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return (
    <>
      {/* Cosmic background gradient */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-deep-burgundy to-deep-navy" />
      </div>

      {/* Aurora effect - reduced on prefers-reduced-motion */}
      <div className="fixed inset-0 z-0 opacity-40">
        <div className={`absolute inset-0 ${prefersReducedMotion ? '' : 'animate-aurora'}`}>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-burgundy/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-sapphire/20 rounded-full blur-3xl" />
        </div>
      </div>

      {/* Floating orbs - static when prefers-reduced-motion */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className={`absolute -top-32 -left-32 w-64 h-64 bg-accent-burgundy/20 rounded-full blur-3xl ${prefersReducedMotion ? '' : 'animate-float-element'}`} />
        <div className={`absolute -bottom-32 -right-32 w-80 h-80 bg-accent-sapphire/20 rounded-full blur-3xl ${prefersReducedMotion ? '' : 'animate-float-element animation-delay-5000'}`} />
        <div className={`absolute top-1/2 left-1/2 w-60 h-60 bg-accent-gold/10 rounded-full blur-3xl ${prefersReducedMotion ? '' : 'animate-float-element animation-delay-10000'}`} />
      </div>

      {/* Particle field */}
      <div ref={particlesRef} className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <style jsx>{`
          .particle {
            position: absolute;
            width: 2px;
            height: 2px;
            background: #d4af37;
            border-radius: 50%;
            opacity: 0;
            animation: drift 20s infinite linear;
          }

          @keyframes drift {
            0% {
              transform: translateY(100vh) translateX(0);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              transform: translateY(-100vh) translateX(100px);
              opacity: 0;
            }
          }

          .animation-delay-5000 {
            animation-delay: 5s;
          }

          .animation-delay-10000 {
            animation-delay: 10s;
          }
        `}</style>
      </div>
    </>
  )
}