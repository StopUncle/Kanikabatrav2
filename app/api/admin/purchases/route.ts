import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const purchases = await prisma.purchase.findMany({
      where: { type: 'BOOK' },
      select: {
        id: true,
        customerEmail: true,
        customerName: true,
        amount: true,
        status: true,
        productVariant: true,
        downloadCount: true,
        maxDownloads: true,
        createdAt: true,
        expiresAt: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 50 // Limit to 50 most recent
    })

    const stats = {
      total: purchases.length,
      premium: purchases.filter(p => p.productVariant === 'PREMIUM').length,
      standard: purchases.filter(p => p.productVariant !== 'PREMIUM').length,
      revenue: purchases.reduce((sum, p) => sum + (p.amount || 0), 0)
    }

    return NextResponse.json({
      success: true,
      purchases,
      stats
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    })

  } catch (error) {
    console.error('Error fetching purchases:', error)
    return NextResponse.json(
      { error: 'Failed to fetch purchases' },
      { status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      }
    )
  } finally {
    await prisma.$disconnect()
  }
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
