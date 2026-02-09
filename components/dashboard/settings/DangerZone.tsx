'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AlertTriangle, Trash2 } from 'lucide-react'

interface DangerZoneProps {
  email: string
  setLoading: (loading: boolean) => void
}

export default function DangerZone({ email, setLoading }: DangerZoneProps) {
  const router = useRouter()
  const [confirmEmail, setConfirmEmail] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [error, setError] = useState('')

  const handleDeleteAccount = async () => {
    if (confirmEmail !== email) {
      setError('Email does not match your account email')
      return
    }

    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/user/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirmEmail }),
      })

      if (!response.ok) {
        const result = await response.json()
        throw new Error(result.error || 'Failed to delete account')
      }

      router.push('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete account')
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-red-400 font-medium mb-1">Delete Account</h3>
            <p className="text-gray-400 text-sm">
              Once you delete your account, there is no going back. This action is permanent and will:
            </p>
            <ul className="text-gray-400 text-sm mt-2 space-y-1 list-disc list-inside">
              <li>Delete all your personal data</li>
              <li>Remove access to your purchases</li>
              <li>Cancel any active subscriptions</li>
              <li>Delete your coaching session history</li>
            </ul>
          </div>
        </div>
      </div>

      {!showConfirmation ? (
        <button
          onClick={() => setShowConfirmation(true)}
          className="w-full px-4 py-3 bg-red-600/20 hover:bg-red-600/30 border border-red-500/50 rounded-lg text-red-400 font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Delete My Account
        </button>
      ) : (
        <div className="space-y-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          <p className="text-white text-sm">
            To confirm, type your email address: <span className="text-accent-gold">{email}</span>
          </p>

          {error && (
            <div className="p-3 bg-red-900/50 border border-red-500 rounded-lg text-red-200 text-sm">
              {error}
            </div>
          )}

          <input
            type="email"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 transition-colors"
          />

          <div className="flex gap-3">
            <button
              onClick={() => {
                setShowConfirmation(false)
                setConfirmEmail('')
                setError('')
              }}
              className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteAccount}
              disabled={confirmEmail !== email}
              className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-500 disabled:bg-gray-700 disabled:text-gray-500 rounded-lg text-white text-sm font-medium transition-colors disabled:cursor-not-allowed"
            >
              Permanently Delete
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
