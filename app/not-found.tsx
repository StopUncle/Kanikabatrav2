import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center p-8">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl mb-6">Page Not Found</h2>
        <p className="text-gray-400 mb-8">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link 
          href="/" 
          className="bg-gold text-black px-6 py-3 rounded-md hover:bg-gold/80 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}