'use client'

import { motion } from 'framer-motion'

interface KBSpinLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animate?: boolean
  className?: string
}

const KBSpinLogo = ({ size = 'md', animate = false, className = '' }: KBSpinLogoProps) => {
  const dimensions = {
    sm: { container: 'w-10 h-10', text: 'text-sm', dotSize: 'w-1 h-1' },
    md: { container: 'w-12 h-12', text: 'text-base', dotSize: 'w-1.5 h-1.5' },
    lg: { container: 'w-16 h-16', text: 'text-xl', dotSize: 'w-2 h-2' },
    xl: { container: 'w-20 h-20', text: 'text-2xl', dotSize: 'w-2 h-2' },
  }

  const { container, text, dotSize } = dimensions[size]

  const content = (
    <div className={`relative ${container} ${className}`}>
      {/* Outer spinning circle */}
      <div
        className={`absolute inset-0 rounded-full border-2 border-accent-gold ${animate ? 'animate-spin' : ''}`}
        style={{ animationDuration: animate ? '3s' : undefined }}
      >
        {/* Top dot */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className={`${dotSize} bg-accent-gold rounded-full`} />
        </div>
      </div>

      {/* Inner reverse spinning circle */}
      <div
        className={`absolute inset-2 rounded-full border border-accent-gold/50 ${animate ? 'animate-spin' : ''}`}
        style={{
          animationDuration: animate ? '2s' : undefined,
          animationDirection: animate ? 'reverse' : undefined
        }}
      />

      {/* Center KB text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`${text} font-serif gradient-text-gold font-bold`}>KB</span>
      </div>
    </div>
  )

  if (animate && size === 'xl') {
    // For XL size with animation, wrap in motion for smooth rotation
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="inline-block"
      >
        {content}
      </motion.div>
    )
  }

  return content
}

export default KBSpinLogo