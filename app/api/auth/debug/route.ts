import { NextResponse } from 'next/server'
import { UserDatabase } from '@/lib/auth/database'

export async function GET() {
  try {
    const userCount = await UserDatabase.getUserCount()

    return NextResponse.json({
      success: true,
      userCount,
      message: 'Debug endpoint working'
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Debug endpoint error', details: error },
      { status: 500 }
    )
  }
}