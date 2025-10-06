'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  gradient?: boolean
  popular?: boolean
}

const Card = ({ 
  children, 
  className,
  hover = true,
  gradient = false,
  popular = false
}: CardProps) => {
  return (
    <motion.div
      whileHover={hover ? { y: -10, scale: 1.02 } : undefined}
      transition={{ duration: 0.3 }}
      className={cn(
        'relative rounded-lg overflow-hidden',
        gradient 
          ? 'bg-gradient-to-br from-deep-navy/50 to-burgundy-dark/30' 
          : 'bg-deep-navy/40',
        'backdrop-blur-sm',
        'border border-gold/20',
        hover && 'transition-all duration-300 hover:shadow-[0_30px_60px_rgba(114,9,33,0.3)]',
        className
      )}
    >
      {/* Popular badge */}
      {popular && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="bg-gradient-to-r from-gold to-gold-dark text-deep-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
            Most Popular
          </div>
        </div>
      )}
      
      {/* Gradient border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-burgundy via-sapphire to-gold opacity-0 hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}

export default Card