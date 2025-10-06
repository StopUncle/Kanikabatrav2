import KBSpinLogo from '@/components/KBSpinLogo'

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-deep-black flex items-center justify-center z-50">
      <div className="text-center">
        <div className="mb-8">
          {/* KB Spinning Logo Animation */}
          <KBSpinLogo size="xl" animate={true} />
        </div>
        <div className="space-y-2">
          <div className="w-48 h-1 bg-gradient-to-r from-transparent via-accent-gold to-transparent mx-auto animate-pulse" />
          <p className="text-accent-gold text-sm uppercase tracking-[0.3em] animate-shimmer">
            Loading
          </p>
        </div>
      </div>
    </div>
  )
}