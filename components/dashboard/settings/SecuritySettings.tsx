'use client'

import { useState } from 'react'
import { Eye, EyeOff, Shield, Clock } from 'lucide-react'

interface SecuritySettingsProps {
  onPasswordChanged: () => void
  setLoading: (loading: boolean) => void
}

export default function SecuritySettings({ onPasswordChanged, setLoading }: SecuritySettingsProps) {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPasswords, setShowPasswords] = useState(false)
  const [error, setError] = useState('')

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/user/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to change password')
      }

      onPasswordChanged()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to change password')
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Password Change Form */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-accent-gold" />
          <h3 className="text-white font-medium">Change Password</h3>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-900/50 border border-red-500 rounded-lg text-red-200 text-sm">
              {error}
            </div>
          )}

          <div className="relative">
            <label className="block text-sm text-gray-400 mb-2">Current Password</label>
            <input
              type={showPasswords ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent-gold/50 transition-colors pr-12"
            />
          </div>

          <div className="relative">
            <label className="block text-sm text-gray-400 mb-2">New Password</label>
            <input
              type={showPasswords ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={8}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent-gold/50 transition-colors pr-12"
            />
          </div>

          <div className="relative">
            <label className="block text-sm text-gray-400 mb-2">Confirm New Password</label>
            <div className="relative">
              <input
                type={showPasswords ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent-gold/50 transition-colors pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPasswords(!showPasswords)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPasswords ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 bg-accent-gold hover:bg-accent-gold/90 rounded-lg text-deep-black font-medium transition-colors"
          >
            Update Password
          </button>
        </form>
      </div>

      {/* Active Sessions */}
      <div className="pt-6 border-t border-gray-800">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-accent-gold" />
          <h3 className="text-white font-medium">Active Sessions</h3>
        </div>

        <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm font-medium">Current Session</p>
              <p className="text-gray-400 text-xs">This device • Active now</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-green-500" />
          </div>
        </div>

        <p className="text-gray-500 text-xs mt-3">
          Signing out will end this session and require you to log in again.
        </p>
      </div>
    </div>
  )
}
