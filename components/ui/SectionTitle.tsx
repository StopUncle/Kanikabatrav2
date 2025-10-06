'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionTitleProps {
  label?: string
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}

const SectionTitle = ({ 
  label, 
  title, 
  subtitle, 
  centered = true,
  className 
}: SectionTitleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn(
        centered && 'text-center',
        'mb-12',
        className
      )}
    >
      {label && (
        <p className="text-gold text-sm font-medium tracking-[0.3em] uppercase mb-4 opacity-80">
          {label}
        </p>
      )}
      
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-4 bg-gradient-to-r from-text-light via-burgundy to-sapphire bg-clip-text text-transparent">
        {title}
      </h2>
      
      {subtitle && (
        <p className="text-text-muted text-lg md:text-xl max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

export default SectionTitle