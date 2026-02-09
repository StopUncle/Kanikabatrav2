'use client'

import { useState } from 'react'
import { X, User, Shield, Bell, AlertTriangle, Loader2 } from 'lucide-react'
import ProfileSettings from './settings/ProfileSettings'
import SecuritySettings from './settings/SecuritySettings'
import PreferencesSettings from './settings/PreferencesSettings'
import DangerZone from './settings/DangerZone'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  activeTab: 'profile' | 'security' | 'preferences' | 'danger'
  onTabChange: (tab: 'profile' | 'security' | 'preferences' | 'danger') => void
  email: string
  name: string | null
  onProfileUpdate: (name: string | null) => void
  onPasswordChange: () => void
  onSuccess: (message: string) => void
}

const tabs = [
  { id: 'profile' as const, label: 'Profile', icon: User },
  { id: 'security' as const, label: 'Security', icon: Shield },
  { id: 'preferences' as const, label: 'Notifications', icon: Bell },
  { id: 'danger' as const, label: 'Danger Zone', icon: AlertTriangle },
]

export default function SettingsModal({
  isOpen,
  onClose,
  activeTab,
  onTabChange,
  email,
  name,
  onProfileUpdate,
  onPasswordChange,
  onSuccess,
}: SettingsModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  if (!isOpen) return null

  const handleClose = () => {
    if (!isLoading) {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-lg font-medium text-white">Settings</h2>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="p-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-800 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? tab.id === 'danger'
                    ? 'text-red-400 border-b-2 border-red-400'
                    : 'text-accent-gold border-b-2 border-accent-gold'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <tab.icon size={16} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-140px)]">
          {isLoading && (
            <div className="absolute inset-0 bg-gray-900/80 flex items-center justify-center z-10">
              <Loader2 className="w-8 h-8 text-accent-gold animate-spin" />
            </div>
          )}

          {activeTab === 'profile' && (
            <ProfileSettings
              email={email}
              name={name}
              onSave={(newName) => {
                onProfileUpdate(newName)
                onSuccess('Profile updated successfully!')
                onClose()
              }}
              setLoading={setIsLoading}
            />
          )}

          {activeTab === 'security' && (
            <SecuritySettings
              onPasswordChanged={() => {
                onPasswordChange()
                onSuccess('Password changed successfully!')
                onClose()
              }}
              setLoading={setIsLoading}
            />
          )}

          {activeTab === 'preferences' && (
            <PreferencesSettings
              onSave={() => {
                onSuccess('Preferences saved!')
                onClose()
              }}
              setLoading={setIsLoading}
            />
          )}

          {activeTab === 'danger' && (
            <DangerZone
              email={email}
              setLoading={setIsLoading}
            />
          )}
        </div>
      </div>
    </div>
  )
}
