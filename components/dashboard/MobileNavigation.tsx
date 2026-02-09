'use client'

import { LayoutDashboard, TrendingUp, Trophy, Settings } from 'lucide-react'

interface MobileNavigationProps {
  activeTab: 'overview' | 'progress' | 'achievements' | 'account'
  onTabChange: (tab: 'overview' | 'progress' | 'achievements' | 'account') => void
}

const tabs = [
  { id: 'overview' as const, label: 'Overview', icon: LayoutDashboard },
  { id: 'progress' as const, label: 'Progress', icon: TrendingUp },
  { id: 'achievements' as const, label: 'Achieve', icon: Trophy },
  { id: 'account' as const, label: 'Account', icon: Settings },
]

export default function MobileNavigation({ activeTab, onTabChange }: MobileNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-deep-black/95 backdrop-blur-sm border-t border-gray-800 safe-area-bottom">
      <div className="flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center w-full h-full py-2 px-1 transition-colors ${
                isActive
                  ? 'text-accent-gold'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.5]'}`} />
              <span className={`text-[10px] tracking-wide ${isActive ? 'font-medium' : 'font-light'}`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute bottom-1 w-8 h-0.5 bg-accent-gold rounded-full" />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
