import { NextRequest, NextResponse } from 'next/server'
import { PrismaUserDatabase } from '@/lib/auth/prisma-database'
import { generateTokenPair } from '@/lib/auth/jwt'
import { LoginCredentials } from '@/lib/auth/types'

export async function POST(request: NextRequest) {
  try {
    const body: LoginCredentials = await request.json()

    // Validate input
    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Validate user credentials
    const user = await PrismaUserDatabase.validateUser(body.email, body.password)
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }


    // Generate tokens
    const tokens = generateTokenPair({
      userId: user.id,
      email: user.email
    })

    // Create response
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email
      }
    })

    // Set cookies
    response.cookies.set('accessToken', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60, // 15 minutes
      path: '/'
    })

    response.cookies.set('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/'
    })

    return response
  } catch (error: unknown) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}