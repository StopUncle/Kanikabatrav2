'use client'

interface ProgressBarProps {
  progress: number
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function ProgressBar({
  progress,
  showLabel = true,
  size = 'md',
  className = ''
}: ProgressBarProps) {
  const heights = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  }

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between text-xs text-text-muted mb-1">
          <span>Progress</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
      )}
      <div className={`${heights[size]} bg-deep-black/60 rounded-full overflow-hidden`}>
        <div
          className="h-full bg-gradient-to-r from-accent-burgundy to-accent-sapphire transition-all duration-500 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  )
}
