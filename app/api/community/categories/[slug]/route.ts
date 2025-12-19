import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAccessTier } from '@/lib/community/access'
import { verifyAccessToken } from '@/lib/auth/jwt'
import { cookies } from 'next/headers'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const { searchParams } = new URL(request.url)
    const cursor = searchParams.get('cursor')
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50)
    const sort = searchParams.get('sort') || 'latest'

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

    // Get category
    const category = await prisma.forumCategory.findUnique({
      where: { slug }
    })

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }

    // Check access
    const access = await checkAccessTier(userId, category.accessTier)
    if (!access.hasAccess) {
      return NextResponse.json(
        {
          error: access.reason,
          requiredTier: category.accessTier,
          upgradeUrl: access.upgradeUrl
        },
        { status: 403 }
      )
    }

    // Determine sort order
    const orderBy = sort === 'popular'
      ? { likeCount: 'desc' as const }
      : sort === 'active'
        ? { lastReplyAt: 'desc' as const }
        : { createdAt: 'desc' as const }

    // Get posts with pagination
    const posts = await prisma.forumPost.findMany({
      where: { categoryId: category.id },
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: [
        { isPinned: 'desc' },
        orderBy
      ],
      include: {
        author: {
          select: {
            id: true,
            name: true,
            displayName: true,
            avatarUrl: true
          }
        },
        _count: {
          select: { replies: true }
        }
      }
    })

    const hasMore = posts.length > limit
    const results = hasMore ? posts.slice(0, -1) : posts
    const nextCursor = hasMore ? results[results.length - 1].id : null

    return NextResponse.json({
      success: true,
      category: {
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        icon: category.icon,
        accessTier: category.accessTier
      },
      posts: results.map(post => ({
        ...post,
        replyCount: post._count.replies,
        _count: undefined
      })),
      nextCursor,
      hasMore
    })
  } catch (error) {
    console.error('Category posts fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch category posts' },
      { status: 500 }
    )
  }
}
