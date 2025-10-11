import { NextRequest, NextResponse } from 'next/server'
import { sendBookDelivery } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email address required' },
        {
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        }
      )
    }

    // Generate a test download token
    const testToken = `TEST_${Date.now()}`
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now

    // Send the actual book delivery email
    await sendBookDelivery(
      email,
      'Test User',
      testToken,
      'PREMIUM',
      expiresAt
    )

    const downloadUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/download?token=${testToken}&format=pdf`

    return NextResponse.json(
      {
        success: true,
        message: 'Test purchase email sent successfully',
        downloadUrl: downloadUrl,
        note: 'Check your email at ' + email,
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    )
  } catch (error) {
    console.error('Test purchase error:', error)
    return NextResponse.json(
      {
        error: 'Failed to send test purchase email',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    )
  }
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
