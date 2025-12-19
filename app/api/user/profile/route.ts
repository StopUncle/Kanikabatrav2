import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth/middleware'

export async function PUT(request: NextRequest) {
  return requireAuth(request, async (_req, user) => {
    try {
      const body = await request.json()
      const { name } = body

      if (name !== undefined && typeof name !== 'string') {
        return NextResponse.json(
          { error: 'Invalid name format' },
          { status: 400 }
        )
      }

      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: { name: name || null },
        select: { id: true, email: true, name: true },
      })

      return NextResponse.json({
        success: true,
        user: updatedUser,
      })
    } catch (error) {
      console.error('Profile update error:', error)
      return NextResponse.json(
        { error: 'Failed to update profile' },
        { status: 500 }
      )
    }
  })
}

export async function GET(request: NextRequest) {
  return requireAuth(request, async (_req, user) => {
    try {
      const userData = await prisma.user.findUnique({
        where: { id: user.id },
        select: { id: true, email: true, name: true, createdAt: true },
      })

      if (!userData) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        user: userData,
      })
    } catch (error) {
      console.error('Profile fetch error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch profile' },
        { status: 500 }
      )
    }
  })
}
