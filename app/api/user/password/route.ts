import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth/middleware'
import { verifyPassword, hashPassword } from '@/lib/auth/password'

export async function PUT(request: NextRequest) {
  return requireAuth(request, async (_req, user) => {
    try {
      const body = await request.json()
      const { currentPassword, newPassword } = body

      if (!currentPassword || !newPassword) {
        return NextResponse.json(
          { error: 'Current password and new password are required' },
          { status: 400 }
        )
      }

      if (newPassword.length < 8) {
        return NextResponse.json(
          { error: 'New password must be at least 8 characters' },
          { status: 400 }
        )
      }

      const fullUser = await prisma.user.findUnique({
        where: { id: user.id },
      })

      if (!fullUser) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        )
      }

      const isValid = await verifyPassword(currentPassword, fullUser.password)
      if (!isValid) {
        return NextResponse.json(
          { error: 'Current password is incorrect' },
          { status: 401 }
        )
      }

      const hashedNewPassword = await hashPassword(newPassword)
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedNewPassword },
      })

      return NextResponse.json({
        success: true,
        message: 'Password updated successfully',
      })
    } catch (error) {
      console.error('Password change error:', error)
      return NextResponse.json(
        { error: 'Failed to change password' },
        { status: 500 }
      )
    }
  })
}
