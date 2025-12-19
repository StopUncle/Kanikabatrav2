import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAccessTier } from '@/lib/community/access'
import { verifyAccessToken } from '@/lib/auth/jwt'
import { cookies } from 'next/headers'

export async function GET(_request: NextRequest) {
  try {
    // Get user ID if logged in
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value
    let userId: string | null = null

    if (accessToken) {
      const payload = verifyAccessToken(accessToken)
      if (payload) {
        userId = payload.userId
      }
    }

    // Get all categories
    const categories = await prisma.forumCategory.findMany({
      orderBy: { sortOrder: 'asc' },
      include: {
        _count: {
          select: {
            posts: true,
            chatRooms: true
          }
        }
      }
    })

    // Filter based on user access
    const accessibleCategories = await Promise.all(
      categories.map(async (category) => {
        const access = await checkAccessTier(userId, category.accessTier)
        return {
          ...category,
          postCount: category._count.posts,
          chatRoomCount: category._count.chatRooms,
          hasAccess: access.hasAccess,
          accessReason: access.reason,
          _count: undefined
        }
      })
    )

    return NextResponse.json({
      success: true,
      categories: accessibleCategories
    })
  } catch (error) {
    console.error('Categories fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}
