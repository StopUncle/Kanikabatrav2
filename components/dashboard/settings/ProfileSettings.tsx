'use client'

import { useState } from 'react'
import { Camera } from 'lucide-react'

interface ProfileSettingsProps {
  email: string
  name: string | null
  onSave: (name: string | null) => void
  setLoading: (loading: boolean) => void
}

export default function ProfileSettings({ email, name, onSave, setLoading }: ProfileSettingsProps) {
  const [displayName, setDisplayName] = useState(name || '')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: displayName.trim() || null }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update profile')
      }

      onSave(result.user.name)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile')
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Avatar Section */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-accent-gold/20 flex items-center justify-center">
            <span className="text-accent-gold font-medium text-2xl">
              {(displayName || email.charAt(0)).charAt(0).toUpperCase()}
            </span>
          </div>
          <button
            type="button"
            className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-gray-700 border-2 border-gray-900 flex items-center justify-center hover:bg-gray-600 transition-colors"
            title="Coming soon"
          >
            <Camera className="w-4 h-4 text-gray-300" />
          </button>
        </div>
        <div>
          <p className="text-white font-medium">{displayName || 'No name set'}</p>
          <p className="text-gray-400 text-sm">{email}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-900/50 border border-red-500 rounded-lg text-red-200 text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm text-gray-400 mb-2">Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent-gold/50 transition-colors"
          />
          <p className="text-gray-500 text-xs mt-2">This is how you&apos;ll appear on the site</p>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Email Address</label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-400 cursor-not-allowed"
          />
          <p className="text-gray-500 text-xs mt-2">Email cannot be changed</p>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-3 bg-accent-gold hover:bg-accent-gold/90 rounded-lg text-deep-black font-medium transition-colors"
        >
          Save Changes
        </button>
      </form>
    </div>
  )
}
