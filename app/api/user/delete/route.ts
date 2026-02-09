import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyAccessToken } from '@/lib/auth/jwt'
import { prisma } from '@/lib/prisma'

export async function DELETE(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value

    if (!accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let payload
    try {
      payload = verifyAccessToken(accessToken)
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const body = await request.json()
    const { confirmEmail } = body

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { email: true },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    if (confirmEmail !== user.email) {
      return NextResponse.json({ error: 'Email does not match' }, { status: 400 })
    }

    await prisma.user.delete({
      where: { id: payload.userId },
    })

    cookieStore.delete('accessToken')
    cookieStore.delete('refreshToken')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
