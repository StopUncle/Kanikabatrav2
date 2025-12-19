import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { verifyAccessToken } from '@/lib/auth/jwt'
import prisma from '@/lib/prisma'
import { checkAccessTier } from '@/lib/community/access'
import CommunityPageClient from './CommunityPageClient'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://kanikarose.com'

export const metadata: Metadata = {
  title: 'Community Forum | Kanika Batra',
  description: 'Join the dark psychology community. Connect with like-minded individuals, share insights on manipulation tactics, and discuss relationship strategy with fellow students.',
  keywords: ['dark psychology community', 'manipulation tactics forum', 'relationship strategy community', 'Kanika Batra community'],
  alternates: {
    canonical: `${baseUrl}/community`,
  },
  openGraph: {
    title: 'Community Forum | Kanika Batra',
    description: 'Join the dark psychology community. Connect with like-minded individuals and discuss manipulation tactics.',
    url: `${baseUrl}/community`,
    type: 'website',
    images: [{
      url: `${baseUrl}/og-image.jpg`,
      width: 1200,
      height: 630,
      alt: 'Kanika Batra Community Forum',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Community Forum | Kanika Batra',
    description: 'Join the dark psychology community. Connect with like-minded individuals.',
    images: [`${baseUrl}/og-image.jpg`],
  },
}

async function getCategories(userId: string | null) {
  const categories = await prisma.forumCategory.findMany({
    orderBy: { sortOrder: 'asc' },
    include: {
      _count: {
        select: { posts: true }
      }
    }
  })

  return Promise.all(
    categories.map(async (category) => {
      const access = await checkAccessTier(userId, category.accessTier)
      return {
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        icon: category.icon,
        accessTier: category.accessTier,
        postCount: category._count.posts,
        hasAccess: access.hasAccess,
        accessReason: access.reason
      }
    })
  )
}

async function getChatRooms(userId: string | null) {
  const rooms = await prisma.chatRoom.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'asc' },
    include: {
      _count: {
        select: { members: true }
      }
    },
    take: 4
  })

  return Promise.all(
    rooms.map(async (room) => {
      const access = await checkAccessTier(userId, room.accessTier)
      return {
        id: room.id,
        name: room.name,
        slug: room.slug,
        accessTier: room.accessTier,
        memberCount: room._count.members,
        hasAccess: access.hasAccess
      }
    })
  )
}

async function checkUserSubscription(userId: string | null) {
  if (!userId) return false

  const subscription = await prisma.subscription.findFirst({
    where: {
      userId,
      status: 'ACTIVE'
    }
  })

  return !!subscription
}

export default async function CommunityPage() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value
  let userId: string | null = null
  let userName: string | null = null

  if (accessToken) {
    const payload = verifyAccessToken(accessToken)
    if (payload) {
      userId = payload.userId
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { name: true, displayName: true }
      })
      userName = user?.displayName || user?.name || null
    }
  }

  const [categories, chatRooms, hasSubscription] = await Promise.all([
    getCategories(userId),
    getChatRooms(userId),
    checkUserSubscription(userId)
  ])

  return (
    <CommunityPageClient
      categories={categories}
      chatRooms={chatRooms}
      isLoggedIn={!!userId}
      userName={userName}
      hasSubscription={hasSubscription}
    />
  )
}
