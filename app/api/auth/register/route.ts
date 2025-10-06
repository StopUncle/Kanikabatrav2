import { NextRequest, NextResponse } from 'next/server'
import { PrismaUserDatabase } from '@/lib/auth/prisma-database'
import { generateTokenPair } from '@/lib/auth/jwt'
import { CreateUserData } from '@/lib/auth/types'

export async function POST(request: NextRequest) {
  try {
    const body: CreateUserData = await request.json()

    // Validate input
    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Password strength validation
    if (body.password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      )
    }

    // Create user
    const user = await PrismaUserDatabase.createUser({
      email: body.email.toLowerCase().trim(),
      password: body.password,
      name: body.name
    })

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
    }, { status: 201 })

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
    console.error('Registration error:', error)

    if (error instanceof Error && error.message === 'User already exists') {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}