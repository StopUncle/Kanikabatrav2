import { cookies } from 'next/headers'
import Link from 'next/link'
import { verifyAccessToken } from '@/lib/auth/jwt'
import { prisma } from '@/lib/prisma'
import { checkAccessTier } from '@/lib/community/access'
import { Users, Lock, Crown, MessageSquare } from 'lucide-react'

export const metadata = {
  title: 'Chat Rooms | Community | Kanika Batra',
  description: 'Join chat rooms and connect with the community in real-time'
}

export default async function ChatRoomsPage() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value
  let userId: string | null = null

  if (accessToken) {
    const payload = verifyAccessToken(accessToken)
    if (payload) {
      userId = payload.userId
    }
  }

  const rooms = await prisma.chatRoom.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'asc' },
    include: {
      category: {
        select: {
          id: true,
          name: true,
          slug: true
        }
      },
      _count: {
        select: { members: true, messages: true }
      }
    }
  })

  const roomsWithAccess = await Promise.all(
    rooms.map(async (room) => {
      const access = await checkAccessTier(userId, room.accessTier)
      return {
        id: room.id,
        name: room.name,
        slug: room.slug,
        description: room.description,
        accessTier: room.accessTier,
        category: room.category,
        memberCount: room._count.members,
        messageCount: room._count.messages,
        hasAccess: access.hasAccess,
        accessReason: access.reason
      }
    })
  )

  const publicRooms = roomsWithAccess.filter(r => r.accessTier === 'PUBLIC' || r.accessTier === 'REGISTERED')
  const premiumRooms = roomsWithAccess.filter(r => r.accessTier !== 'PUBLIC' && r.accessTier !== 'REGISTERED')

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Chat Rooms</h1>
        <p className="text-gray-400">
          Join live discussions and connect with community members in real-time
        </p>
      </div>

      {!userId && (
        <div className="bg-accent-burgundy/10 border border-accent-burgundy/30 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">Login to chat</h3>
              <p className="text-gray-400 text-sm">Create an account to join conversations</p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/login"
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 bg-accent-gold text-deep-black rounded-lg font-medium hover:bg-accent-gold/90"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}

      {publicRooms.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-accent-gold" />
            Community Rooms
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {publicRooms.map((room) => (
              <Link
                key={room.id}
                href={room.hasAccess ? `/community/chat/${room.slug}` : '#'}
                className={`
                  p-6 rounded-xl border transition-all
                  ${room.hasAccess
                    ? 'bg-deep-navy/50 border-gray-800 hover:border-accent-gold/50 hover:bg-deep-navy/70'
                    : 'bg-gray-900/30 border-gray-800/50 cursor-not-allowed opacity-75'
                  }
                `}
                onClick={(e) => !room.hasAccess && e.preventDefault()}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-accent-burgundy/20 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-accent-gold" />
                  </div>
                  {!room.hasAccess && <Lock className="w-5 h-5 text-gray-500" />}
                </div>

                <h3 className="font-semibold text-white mb-1">{room.name}</h3>
                {room.description && (
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">{room.description}</p>
                )}

                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>{room.memberCount} members</span>
                  <span>{room.messageCount} messages</span>
                </div>

                {!room.hasAccess && room.accessReason && (
                  <p className="text-xs text-accent-burgundy mt-2">{room.accessReason}</p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {premiumRooms.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Crown className="w-5 h-5 text-accent-gold" />
            Premium Rooms
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {premiumRooms.map((room) => (
              <Link
                key={room.id}
                href={room.hasAccess ? `/community/chat/${room.slug}` : '#'}
                className={`
                  p-6 rounded-xl border transition-all
                  ${room.hasAccess
                    ? 'bg-gradient-to-br from-accent-burgundy/20 to-deep-navy/50 border-accent-gold/30 hover:border-accent-gold/50'
                    : 'bg-gray-900/30 border-gray-800/50 cursor-not-allowed opacity-75'
                  }
                `}
                onClick={(e) => !room.hasAccess && e.preventDefault()}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-accent-gold/20 flex items-center justify-center">
                    <Crown className="w-6 h-6 text-accent-gold" />
                  </div>
                  {!room.hasAccess && <Lock className="w-5 h-5 text-gray-500" />}
                </div>

                <h3 className="font-semibold text-white mb-1">{room.name}</h3>
                {room.description && (
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">{room.description}</p>
                )}

                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>{room.memberCount} members</span>
                  <span>{room.messageCount} messages</span>
                </div>

                {!room.hasAccess && (
                  <p className="text-xs text-accent-gold mt-2">
                    {room.accessTier === 'BOOK_OWNER' ? 'Book owners only' :
                     room.accessTier === 'COACHING_CLIENT' ? 'Coaching clients only' :
                     'Premium access required'}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {roomsWithAccess.length === 0 && (
        <div className="text-center py-16 bg-deep-navy/30 border border-gray-800 rounded-xl">
          <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500">No chat rooms available yet</p>
        </div>
      )}
    </div>
  )
}
