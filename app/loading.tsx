import DoubleEchoLogo from '@/components/DoubleEchoLogo'

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-deep-black flex items-center justify-center z-50">
      <div className="text-center">
        <div className="mb-8">
          <DoubleEchoLogo size="xl" animate={true} />
        </div>
        <div className="space-y-3">
          <p className="text-accent-gold text-lg font-light uppercase tracking-[0.3em]">
            Kanika Batra
          </p>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-accent-gold/50 to-transparent mx-auto animate-pulse" />
        </div>
      </div>
    </div>
  )
}
