'use client'

import { useState } from 'react'
import { Settings, User, Shield, Bell, Trash2, LogOut, ChevronRight } from 'lucide-react'
import DashboardCard from './DashboardCard'
import SettingsModal from './SettingsModal'

interface AccountSectionProps {
  email: string
  userId: string
  name: string | null
  memberSince: Date
  onProfileUpdate: (name: string | null) => void
  onPasswordChange: () => void
  onSuccess: (message: string) => void
}

export default function AccountSection({
  email,
  userId,
  name,
  memberSince,
  onProfileUpdate,
  onPasswordChange,
  onSuccess,
}: AccountSectionProps) {
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [activeSettingsTab, setActiveSettingsTab] = useState<'profile' | 'security' | 'preferences' | 'danger'>('profile')

  const openSettings = (tab: 'profile' | 'security' | 'preferences' | 'danger') => {
    setActiveSettingsTab(tab)
    setShowSettingsModal(true)
  }

  const menuItems = [
    {
      icon: User,
      label: 'Profile',
      description: 'Name, display picture',
      tab: 'profile' as const,
    },
    {
      icon: Shield,
      label: 'Security',
      description: 'Password, sessions',
      tab: 'security' as const,
    },
    {
      icon: Bell,
      label: 'Notifications',
      description: 'Email preferences',
      tab: 'preferences' as const,
    },
  ]

  return (
    <>
      <DashboardCard
        title="Account"
        subtitle="Manage your settings"
        icon={Settings}
      >
        <div className="space-y-4">
          {/* User Info Summary */}
          <div className="flex items-center gap-3 pb-4 border-b border-gray-800">
            <div className="w-12 h-12 rounded-full bg-accent-gold/20 flex items-center justify-center">
              <span className="text-accent-gold font-medium text-lg">
                {(name || email.charAt(0)).charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate">{name || 'Set your name'}</p>
              <p className="text-gray-400 text-sm truncate">{email}</p>
            </div>
          </div>

          {/* Settings Menu */}
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.tab}
                onClick={() => openSettings(item.tab)}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors group"
              >
                <div className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                  <item.icon className="w-4 h-4 text-gray-400 group-hover:text-accent-gold transition-colors" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-white text-sm font-medium">{item.label}</p>
                  <p className="text-gray-500 text-xs">{item.description}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors" />
              </button>
            ))}
          </div>

          {/* Quick Info */}
          <div className="pt-4 border-t border-gray-800 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Member since</span>
              <span className="text-gray-300">{memberSince.toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">User ID</span>
              <span className="text-gray-400 font-mono text-xs truncate max-w-[120px]">{userId.slice(0, 8)}...</span>
            </div>
          </div>

          {/* Danger Zone & Logout */}
          <div className="pt-4 border-t border-gray-800 space-y-2">
            <button
              onClick={() => openSettings('danger')}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-900/20 transition-colors group"
            >
              <div className="w-9 h-9 rounded-full bg-red-900/30 flex items-center justify-center">
                <Trash2 className="w-4 h-4 text-red-400" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-red-400 text-sm font-medium">Delete Account</p>
                <p className="text-gray-600 text-xs">Permanently delete your data</p>
              </div>
            </button>

            <form action="/api/auth/logout" method="POST">
              <button
                type="submit"
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors group"
              >
                <div className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center">
                  <LogOut className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-gray-300 text-sm font-medium">Sign Out</p>
                  <p className="text-gray-600 text-xs">Log out of your account</p>
                </div>
              </button>
            </form>
          </div>
        </div>
      </DashboardCard>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        activeTab={activeSettingsTab}
        onTabChange={setActiveSettingsTab}
        email={email}
        name={name}
        onProfileUpdate={onProfileUpdate}
        onPasswordChange={onPasswordChange}
        onSuccess={onSuccess}
      />
    </>
  )
}
