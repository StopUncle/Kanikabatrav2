'use client'

import { motion } from 'framer-motion'

interface KBLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  animate?: boolean
}

const KBLogo = ({ size = 'md', className = '', animate = false }: KBLogoProps) => {
  const dimensions = {
    sm: { width: 32, height: 32, strokeWidth: 1.5 },
    md: { width: 40, height: 40, strokeWidth: 2 },
    lg: { width: 56, height: 56, strokeWidth: 2 },
    xl: { width: 80, height: 80, strokeWidth: 2.5 },
  }

  const { width, height, strokeWidth } = dimensions[size]

  const logoContent = (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer circle - seal border */}
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="url(#goldGradient)"
        strokeWidth={strokeWidth}
        fill="none"
      />

      {/* Inner circle */}
      <circle
        cx="50"
        cy="50"
        r="38"
        stroke="url(#goldGradient)"
        strokeWidth={strokeWidth * 0.5}
        opacity="0.6"
        fill="none"
      />

      {/* Background circle with subtle gradient */}
      <circle
        cx="50"
        cy="50"
        r="37"
        fill="url(#bgGradient)"
        opacity="0.1"
      />

      {/* KB Monogram */}
      <g transform="translate(50, 50)">
        {/* Letter K */}
        <path
          d="M -18 -20 L -18 20 M -18 0 L 2 -20 M -18 0 L 2 20"
          stroke="url(#textGradient)"
          strokeWidth={strokeWidth * 1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Letter B */}
        <path
          d="M 8 -20 L 8 20 M 8 -20 L 20 -20 Q 28 -20 28 -12 Q 28 -4 20 -4 L 8 -4 M 8 -4 L 22 -4 Q 30 -4 30 4 Q 30 12 22 12 Q 18 12 14 12 L 8 12 M 8 12 L 8 20 L 20 20 Q 28 20 28 12"
          stroke="url(#textGradient)"
          strokeWidth={strokeWidth * 1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>

      {/* Top accent stars */}
      <circle cx="50" cy="10" r="1.5" fill="url(#goldGradient)" />
      <circle cx="40" cy="12" r="1" fill="url(#goldGradient)" opacity="0.7" />
      <circle cx="60" cy="12" r="1" fill="url(#goldGradient)" opacity="0.7" />

      {/* Bottom accent stars */}
      <circle cx="50" cy="90" r="1.5" fill="url(#goldGradient)" />
      <circle cx="40" cy="88" r="1" fill="url(#goldGradient)" opacity="0.7" />
      <circle cx="60" cy="88" r="1" fill="url(#goldGradient)" opacity="0.7" />

      {/* Gradient definitions */}
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4af37" />
          <stop offset="50%" stopColor="#f4e4bc" />
          <stop offset="100%" stopColor="#d4af37" />
        </linearGradient>

        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d4af37" />
          <stop offset="50%" stopColor="#fff5d6" />
          <stop offset="100%" stopColor="#d4af37" />
        </linearGradient>

        <radialGradient id="bgGradient" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#722139" />
        </radialGradient>
      </defs>
    </svg>
  )

  if (animate) {
    return (
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="inline-block"
      >
        {logoContent}
      </motion.div>
    )
  }

  return logoContent
}

export default KBLogo