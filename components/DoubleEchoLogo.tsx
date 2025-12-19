'use client'

interface DoubleEchoLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animate?: boolean
  className?: string
}

export default function DoubleEchoLogo({ size = 'md', animate = false, className = '' }: DoubleEchoLogoProps) {
  const sizeMap = {
    sm: { width: 40, height: 32 },
    md: { width: 56, height: 44 },
    lg: { width: 72, height: 56 },
    xl: { width: 120, height: 94 },
  }

  const { width, height } = sizeMap[size]

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 56 44"
      className={`overflow-visible ${className}`}
    >
      <defs>
        <linearGradient id="echoGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#d4af37" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="echoRose" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e8c4c4" />
          <stop offset="100%" stopColor="#e8c4c4" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {/* First K - Main gold */}
      <path
        d="M 8 10 L 8 34 M 8 22 Q 18 12, 26 22 Q 34 32, 42 20"
        fill="none"
        stroke="url(#echoGold)"
        strokeWidth="1.5"
        strokeLinecap="round"
        className={animate ? 'animate-draw-path' : ''}
        style={animate ? {
          strokeDasharray: 100,
          animation: 'drawPath 2s ease-in-out infinite'
        } : {}}
      />

      {/* Second K - Rose gold echo */}
      <path
        d="M 14 8 L 14 32 M 14 20 Q 24 10, 32 20 Q 40 30, 48 18"
        fill="none"
        stroke="url(#echoRose)"
        strokeWidth="1"
        strokeLinecap="round"
        opacity={animate ? undefined : 0.5}
        className={animate ? 'animate-draw-path-delayed' : ''}
        style={animate ? {
          strokeDasharray: 100,
          animation: 'drawPathDelayed 2s ease-in-out infinite',
          opacity: 0.6
        } : {}}
      />

      {/* Connecting flourish */}
      <path
        d="M 42 20 Q 50 14, 52 22 Q 54 30, 48 36"
        fill="none"
        stroke="#d4af37"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity={animate ? undefined : 0.6}
        className={animate ? 'animate-flourish' : ''}
        style={animate ? {
          strokeDasharray: 40,
          animation: 'flourish 2s ease-in-out infinite 0.5s'
        } : {}}
      />

      {animate && (
        <style>{`
          @keyframes drawPath {
            0% {
              stroke-dashoffset: 100;
              opacity: 0.3;
            }
            50% {
              stroke-dashoffset: 0;
              opacity: 1;
            }
            100% {
              stroke-dashoffset: -100;
              opacity: 0.3;
            }
          }
          @keyframes drawPathDelayed {
            0% {
              stroke-dashoffset: 100;
              opacity: 0.2;
            }
            50% {
              stroke-dashoffset: 0;
              opacity: 0.6;
            }
            100% {
              stroke-dashoffset: -100;
              opacity: 0.2;
            }
          }
          @keyframes flourish {
            0% {
              stroke-dashoffset: 40;
              opacity: 0;
            }
            50% {
              stroke-dashoffset: 0;
              opacity: 0.6;
            }
            100% {
              stroke-dashoffset: -40;
              opacity: 0;
            }
          }
        `}</style>
      )}
    </svg>
  )
}
