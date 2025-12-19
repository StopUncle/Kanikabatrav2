'use client'

import { ReactNode } from 'react'
import CommunitySidebar from './CommunitySidebar'

interface CommunityLayoutProps {
  children: ReactNode
}

export default function CommunityLayout({ children }: CommunityLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-deep-black via-deep-navy to-deep-black">
      <div className="flex">
        <CommunitySidebar />
        <main className="flex-1 ml-0 lg:ml-64">
          <div className="max-w-5xl mx-auto px-4 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
