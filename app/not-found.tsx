import Link from 'next/link'
import DoubleEchoLogo from '@/components/DoubleEchoLogo'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-deep-black">
      <div className="text-center p-8">
        <div className="mb-8 flex justify-center">
          <DoubleEchoLogo size="xl" />
        </div>
        <h1 className="text-6xl font-extralight text-accent-gold mb-4">404</h1>
        <h2 className="text-xl font-light text-white mb-6">Page Not Found</h2>
        <p className="text-text-gray mb-8">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-gradient-to-r from-burgundy to-sapphire rounded-lg text-white font-medium hover:shadow-lg hover:shadow-burgundy/20 transition-all"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
