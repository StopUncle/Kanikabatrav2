'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  animate?: boolean
  gradient?: 'royal' | 'fire' | 'ocean' | 'gold'
}

const GradientText = ({ 
  children, 
  className,
  animate = true,
  gradient = 'royal'
}: GradientTextProps) => {
  const gradients = {
    royal: 'from-text-light via-burgundy to-sapphire',
    fire: 'from-burgundy via-gold to-burgundy',
    ocean: 'from-sapphire via-sapphire-light to-text-light',
    gold: 'from-gold via-text-light to-gold',
  }

  return (
    <motion.span
      className={cn(
        'bg-gradient-to-r bg-clip-text text-transparent',
        gradients[gradient],
        animate && 'animate-gradient-shift',
        className
      )}
      initial={animate ? { opacity: 0 } : undefined}
      animate={animate ? { opacity: 1 } : undefined}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.span>
  )
}

export default GradientText