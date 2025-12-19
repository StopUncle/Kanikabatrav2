import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth/middleware'
import { checkAccessTier } from '@/lib/community/access'

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .substring(0, 100)
}

export async function POST(request: NextRequest) {
  return requireAuth(request, async (_req, user) => {
    try {
      const body = await request.json()
      const { categoryId, title, content } = body

      if (!categoryId || !title || !content) {
        return NextResponse.json(
          { error: 'Category, title, and content are required' },
          { status: 400 }
        )
      }

      if (title.length < 3 || title.length > 200) {
        return NextResponse.json(
          { error: 'Title must be between 3 and 200 characters' },
          { status: 400 }
        )
      }

      if (content.length < 10) {
        return NextResponse.json(
          { error: 'Content must be at least 10 characters' },
          { status: 400 }
        )
      }

      // Check category exists and user has access
      const category = await prisma.forumCategory.findUnique({
        where: { id: categoryId }
      })

      if (!category) {
        return NextResponse.json(
          { error: 'Category not found' },
          { status: 404 }
        )
      }

      const access = await checkAccessTier(user.id, category.accessTier)
      if (!access.hasAccess) {
        return NextResponse.json(
          { error: access.reason },
          { status: 403 }
        )
      }

      // Generate unique slug
      let slug = generateSlug(title)
      const existingPost = await prisma.forumPost.findUnique({
        where: {
          categoryId_slug: {
            categoryId,
            slug
          }
        }
      })

      if (existingPost) {
        slug = `${slug}-${Date.now()}`
      }

      // Create post
      const post = await prisma.forumPost.create({
        data: {
          categoryId,
          authorId: user.id,
          title,
          slug,
          content
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              displayName: true,
              avatarUrl: true
            }
          },
          category: {
            select: {
              name: true,
              slug: true
            }
          }
        }
      })

      return NextResponse.json({
        success: true,
        post
      }, { status: 201 })
    } catch (error) {
      console.error('Create post error:', error)
      return NextResponse.json(
        { error: 'Failed to create post' },
        { status: 500 }
      )
    }
  })
}
