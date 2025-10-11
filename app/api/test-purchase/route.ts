import { NextRequest, NextResponse } from 'next/server'
import { sendBookDeliveryEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json({ error: 'Email address required' }, { status: 400 })
    }

    // Generate a test purchase ID
    const testPurchaseId = `TEST_${Date.now()}`
    const downloadUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/download?purchase_id=${testPurchaseId}&type=book`

    // Send the actual book delivery email
    await sendBookDeliveryEmail({
      customerEmail: email,
      customerName: 'Test User',
      purchaseId: testPurchaseId,
      downloadUrl: downloadUrl,
      bookTitle: 'Sociopathic Dating Bible - Premium Edition',
      amount: 34.99,
    })

    return NextResponse.json({
      success: true,
      message: 'Test purchase email sent successfully',
      downloadUrl: downloadUrl,
      note: 'Check your email at ' + email,
    })
  } catch (error) {
    console.error('Test purchase error:', error)
    return NextResponse.json(
      {
        error: 'Failed to send test purchase email',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
