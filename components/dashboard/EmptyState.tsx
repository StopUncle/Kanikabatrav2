'use client'

import Link from 'next/link'
import { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    href?: string
    onClick?: () => void
  }
  className?: string
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-8 px-4 text-center ${className}`}>
      <div className="w-16 h-16 rounded-full bg-gray-800/50 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-gray-500" />
      </div>

      <h4 className="text-white font-medium text-sm mb-2">{title}</h4>
      <p className="text-gray-400 text-xs max-w-[200px] mb-4">{description}</p>

      {action && (
        action.href ? (
          <Link
            href={action.href}
            className="inline-flex items-center px-4 py-2 text-xs font-medium text-accent-gold border border-accent-gold/30 rounded-full hover:bg-accent-gold/10 transition-colors"
          >
            {action.label}
          </Link>
        ) : (
          <button
            onClick={action.onClick}
            className="inline-flex items-center px-4 py-2 text-xs font-medium text-accent-gold border border-accent-gold/30 rounded-full hover:bg-accent-gold/10 transition-colors"
          >
            {action.label}
          </button>
        )
      )}
    </div>
  )
}
