'use client'

import { Heart } from 'lucide-react'

interface LikeButtonProps {
  liked: boolean
  count: number
  onClick: () => void
  disabled?: boolean
}

export default function LikeButton({ liked, count, onClick, disabled }: LikeButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center gap-2 transition-colors
        ${disabled
          ? 'text-gray-600 cursor-not-allowed'
          : liked
            ? 'text-red-500 hover:text-red-400'
            : 'text-gray-400 hover:text-red-500'
        }
      `}
    >
      <Heart
        className={`w-5 h-5 ${liked ? 'fill-current' : ''}`}
      />
      <span>{count}</span>
    </button>
  )
}
