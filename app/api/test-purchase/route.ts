import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { sendBookDelivery } from '@/lib/email'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, isPremium } = body

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

    const customerName = name || 'Valued Customer'
    const variant = isPremium === false ? null : 'PREMIUM'
    const amount = isPremium === false ? 17.99 : 34.99

    // Calculate expiration date (30 days from now)
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 30)

    // Generate REAL secure download token (valid for 30 days)
    const downloadToken = jwt.sign(
      { purchaseId: Date.now(), type: 'book', email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '30d' }
    )

    // Create REAL purchase record in database with downloadToken
    const purchase = await prisma.purchase.create({
      data: {
        paypalOrderId: `MANUAL_${Date.now()}`,
        type: 'BOOK',
        amount,
        status: 'COMPLETED',
        customerEmail: email,
        customerName: customerName,
        productVariant: variant,
        downloadToken: downloadToken,
        expiresAt: expiresAt,
        metadata: {
          source: 'admin-manual',
          timestamp: new Date().toISOString(),
        },
      },
    })

    // Send the actual book delivery email with REAL download link
    await sendBookDelivery(
      email,
      customerName,
      downloadToken,
      variant,
      expiresAt
    )

    const downloadUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/download?token=${downloadToken}&format=pdf`

    return NextResponse.json(
      {
        success: true,
        message: 'Download link sent successfully',
        purchaseId: purchase.id,
        downloadUrl: downloadUrl,
        customerName: customerName,
        customerEmail: email,
        downloadCount: purchase.downloadCount,
        maxDownloads: purchase.maxDownloads,
        expiresAt: expiresAt.toISOString(),
        note: `Real purchase created for ${customerName}`,
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
