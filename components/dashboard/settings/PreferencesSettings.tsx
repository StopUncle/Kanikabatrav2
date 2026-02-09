'use client'

import { useState, useEffect } from 'react'
import { Mail, Bell, BookOpen, Calendar, Megaphone } from 'lucide-react'

interface PreferencesSettingsProps {
  onSave: () => void
  setLoading: (loading: boolean) => void
}

interface EmailPreferences {
  marketing: boolean
  productUpdates: boolean
  sessionReminders: boolean
  weeklyDigest: boolean
}

export default function PreferencesSettings({ onSave, setLoading }: PreferencesSettingsProps) {
  const [preferences, setPreferences] = useState<EmailPreferences>({
    marketing: true,
    productUpdates: true,
    sessionReminders: true,
    weeklyDigest: false,
  })
  const [hasChanges, setHasChanges] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await fetch('/api/user/settings')
        if (response.ok) {
          const data = await response.json()
          if (data.emailPreferences) {
            setPreferences(data.emailPreferences)
          }
        }
      } catch {
        // Use defaults if fetch fails
      }
    }
    fetchPreferences()
  }, [])

  const togglePreference = (key: keyof EmailPreferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }))
    setHasChanges(true)
  }

  const handleSave = async () => {
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/user/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailPreferences: preferences }),
      })

      if (!response.ok) {
        const result = await response.json()
        throw new Error(result.error || 'Failed to save preferences')
      }

      setHasChanges(false)
      onSave()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save preferences')
      setLoading(false)
    }
  }

  const emailOptions = [
    {
      key: 'marketing' as const,
      icon: Megaphone,
      title: 'Marketing Emails',
      description: 'New products, courses, and special offers',
    },
    {
      key: 'productUpdates' as const,
      icon: BookOpen,
      title: 'Product Updates',
      description: 'Updates to books and courses you own',
    },
    {
      key: 'sessionReminders' as const,
      icon: Calendar,
      title: 'Session Reminders',
      description: 'Coaching session reminders and follow-ups',
    },
    {
      key: 'weeklyDigest' as const,
      icon: Mail,
      title: 'Weekly Digest',
      description: 'Weekly summary of new content and updates',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <Bell className="w-5 h-5 text-accent-gold" />
        <h3 className="text-white font-medium">Email Notifications</h3>
      </div>
      <p className="text-gray-400 text-sm mb-4">Choose which emails you&apos;d like to receive</p>

      {error && (
        <div className="p-3 bg-red-900/50 border border-red-500 rounded-lg text-red-200 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-3">
        {emailOptions.map((option) => (
          <div
            key={option.key}
            className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                <option.icon className="w-5 h-5 text-gray-400" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">{option.title}</p>
                <p className="text-gray-500 text-xs">{option.description}</p>
              </div>
            </div>
            <button
              onClick={() => togglePreference(option.key)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                preferences[option.key] ? 'bg-accent-gold' : 'bg-gray-600'
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  preferences[option.key] ? 'left-6' : 'left-1'
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        disabled={!hasChanges}
        className={`w-full px-4 py-3 rounded-lg font-medium transition-colors ${
          hasChanges
            ? 'bg-accent-gold hover:bg-accent-gold/90 text-deep-black'
            : 'bg-gray-700 text-gray-400 cursor-not-allowed'
        }`}
      >
        {hasChanges ? 'Save Preferences' : 'No Changes'}
      </button>
    </div>
  )
}
