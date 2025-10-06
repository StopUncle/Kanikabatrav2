'use client'

import { ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'

interface DashboardCardProps {
  title: string
  subtitle?: string
  icon?: LucideIcon
  children: ReactNode
  className?: string
  headerAction?: ReactNode
}

const DashboardCard = ({ 
  title, 
  subtitle, 
  icon: Icon, 
  children, 
  className = '',
  headerAction 
}: DashboardCardProps) => {
  return (
    <div className={`bg-deep-black/30 backdrop-blur-sm rounded-lg border border-accent-gold/10 overflow-hidden ${className}`}>
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-4">
            {Icon && (
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-deep-burgundy to-royal-sapphire flex items-center justify-center flex-shrink-0">
                <Icon size={24} className="text-white" />
              </div>
            )}
            <div>
              <h2 className="text-xl sm:text-2xl font-light gradient-text-gold">
                {title}
              </h2>
              {subtitle && (
                <p className="text-text-gray mt-1 text-sm sm:text-base">{subtitle}</p>
              )}
            </div>
          </div>
          {headerAction && (
            <div className="flex-shrink-0">{headerAction}</div>
          )}
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default DashboardCard