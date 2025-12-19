'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  MessageSquare,
  Users,
  Home,
  Menu,
  X,
  ChevronRight,
  Lock,
  Crown
} from 'lucide-react'

interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  icon: string | null
  accessTier: string
  postCount: number
  chatRoomCount: number
  hasAccess: boolean
}

interface ChatRoom {
  id: string
  name: string
  slug: string
  accessTier: string
  hasAccess: boolean
  memberCount: number
}

export default function CommunitySidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [catRes, roomRes] = await Promise.all([
          fetch('/api/community/categories'),
          fetch('/api/community/chat/rooms')
        ])

        if (catRes.ok) {
          const catData = await catRes.json()
          setCategories(catData.categories || [])
        }

        if (roomRes.ok) {
          const roomData = await roomRes.json()
          setChatRooms(roomData.rooms || [])
        }
      } catch (error) {
        console.error('Failed to fetch sidebar data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const isActive = (path: string) => pathname === path

  const getTierIcon = (tier: string, hasAccess: boolean) => {
    if (!hasAccess) {
      return <Lock className="w-3 h-3 text-gray-500" />
    }
    if (tier === 'PREMIUM' || tier === 'COACHING_CLIENT') {
      return <Crown className="w-3 h-3 text-accent-gold" />
    }
    return null
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-20 left-4 z-50 p-2 bg-deep-navy rounded-lg border border-gray-800"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-deep-black/95 border-r border-gray-800
          transform transition-transform duration-300 z-40 overflow-y-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="p-4">
          <Link
            href="/community"
            className={`
              flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
              ${isActive('/community')
                ? 'bg-accent-burgundy/20 text-accent-gold'
                : 'hover:bg-gray-800/50 text-gray-300'
              }
            `}
            onClick={() => setIsOpen(false)}
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Community Home</span>
          </Link>

          <div className="mt-6">
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Forums
            </h3>
            {loading ? (
              <div className="px-3 py-2 text-sm text-gray-500">Loading...</div>
            ) : categories.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500">No forums yet</div>
            ) : (
              <nav className="space-y-1">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/community/forum/${category.slug}`}
                    className={`
                      flex items-center justify-between px-3 py-2 rounded-lg transition-colors group
                      ${isActive(`/community/forum/${category.slug}`)
                        ? 'bg-accent-burgundy/20 text-accent-gold'
                        : category.hasAccess
                          ? 'hover:bg-gray-800/50 text-gray-300'
                          : 'text-gray-500 cursor-not-allowed'
                      }
                    `}
                    onClick={(e) => {
                      if (!category.hasAccess) {
                        e.preventDefault()
                      }
                      setIsOpen(false)
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-sm">{category.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getTierIcon(category.accessTier, category.hasAccess)}
                      <span className="text-xs text-gray-500">{category.postCount}</span>
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Link>
                ))}
              </nav>
            )}
          </div>

          <div className="mt-6">
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Chat Rooms
            </h3>
            {loading ? (
              <div className="px-3 py-2 text-sm text-gray-500">Loading...</div>
            ) : chatRooms.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500">No rooms yet</div>
            ) : (
              <nav className="space-y-1">
                {chatRooms.map((room) => (
                  <Link
                    key={room.id}
                    href={`/community/chat/${room.slug}`}
                    className={`
                      flex items-center justify-between px-3 py-2 rounded-lg transition-colors group
                      ${isActive(`/community/chat/${room.slug}`)
                        ? 'bg-accent-burgundy/20 text-accent-gold'
                        : room.hasAccess
                          ? 'hover:bg-gray-800/50 text-gray-300'
                          : 'text-gray-500 cursor-not-allowed'
                      }
                    `}
                    onClick={(e) => {
                      if (!room.hasAccess) {
                        e.preventDefault()
                      }
                      setIsOpen(false)
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{room.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getTierIcon(room.accessTier, room.hasAccess)}
                      <span className="text-xs text-gray-500">{room.memberCount}</span>
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Link>
                ))}
              </nav>
            )}
          </div>

          <div className="mt-8 px-3">
            <Link
              href="/dashboard"
              className="block w-full text-center py-2 px-4 bg-accent-burgundy/20 hover:bg-accent-burgundy/30 text-accent-gold rounded-lg transition-colors text-sm"
              onClick={() => setIsOpen(false)}
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </aside>
    </>
  )
}
