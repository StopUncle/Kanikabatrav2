'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-deep-black text-white">
      <div className="text-center p-8 max-w-2xl">
        <h2 className="text-3xl font-bold mb-6">Something went wrong!</h2>
        <p className="text-xl text-text-muted mb-8">
          An unexpected error occurred while loading this page.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => reset()}>
            Try again
          </Button>
          <Link href="/">
            <Button variant="outline">Go Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}