'use client'

import { useState, useEffect, ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

interface CollapsibleCardProps {
  id: string
  title: string
  icon?: ReactNode
  children: ReactNode
  defaultOpen?: boolean
  className?: string
  headerClassName?: string
}

export default function CollapsibleCard({
  id,
  title,
  icon,
  children,
  defaultOpen = true,
  className = '',
  headerClassName = '',
}: CollapsibleCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(`dashboard-card-${id}`)
    if (stored !== null) {
      setIsOpen(stored === 'true')
    }
    setIsHydrated(true)
  }, [id])

  const handleToggle = () => {
    const newState = !isOpen
    setIsOpen(newState)
    localStorage.setItem(`dashboard-card-${id}`, String(newState))
  }

  return (
    <div className={`bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden ${className}`}>
      <button
        onClick={handleToggle}
        className={`w-full flex items-center justify-between p-4 md:p-5 text-left transition-colors hover:bg-gray-800/30 ${headerClassName}`}
      >
        <div className="flex items-center gap-3">
          {icon && <span className="text-accent-gold">{icon}</span>}
          <h3 className="text-white font-medium text-sm md:text-base">{title}</h3>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 md:hidden ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`transition-all duration-200 ease-out ${
          isHydrated
            ? isOpen
              ? 'max-h-[2000px] opacity-100'
              : 'max-h-0 opacity-0 md:max-h-[2000px] md:opacity-100'
            : 'max-h-[2000px] opacity-100'
        }`}
      >
        <div className="px-4 pb-4 md:px-5 md:pb-5">
          {children}
        </div>
      </div>
    </div>
  )
}
