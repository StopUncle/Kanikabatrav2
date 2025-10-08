import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAccessToken } from '@/lib/auth/jwt'
import { cookies } from 'next/headers'

// Force dynamic rendering to prevent static generation errors
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Get email from query params (for non-auth users) or from token
    const searchParams = request.nextUrl.searchParams
    const email = searchParams.get('email')

    let customerEmail = email

    // If no email provided, try to get from auth token
    if (!customerEmail) {
      const cookieStore = cookies()
      const accessToken = cookieStore.get('accessToken')?.value

      if (!accessToken) {
        return NextResponse.json(
          { error: 'Email required or must be authenticated' },
          { status: 401 }
        )
      }

      try {
        const payload = verifyAccessToken(accessToken)
        customerEmail = payload.email
      } catch (_error) {
        return NextResponse.json(
          { error: 'Invalid or expired token' },
          { status: 401 }
        )
      }
    }

    // Fetch purchases for this email
    const purchases = await prisma.purchase.findMany({
      where: {
        customerEmail,
        status: 'COMPLETED'
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        type: true,
        productVariant: true,
        amount: true,
        downloadToken: true,
        downloadCount: true,
        maxDownloads: true,
        expiresAt: true,
        createdAt: true,
        lastDownloadAt: true
      }
    })

    // Generate download URLs for book purchases
    const purchasesWithUrls = purchases.map(purchase => ({
      ...purchase,
      downloadUrl: purchase.type === 'BOOK' && purchase.downloadToken
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/download?token=${purchase.downloadToken}`
        : null,
      isExpired: purchase.expiresAt ? purchase.expiresAt < new Date() : false,
      remainingDownloads: purchase.maxDownloads - purchase.downloadCount
    }))

    return NextResponse.json({
      success: true,
      purchases: purchasesWithUrls
    }, { status: 200 })

  } catch (error: unknown) {
    console.error('Purchases fetch error:', error)

    return NextResponse.json(
      { error: 'Failed to fetch purchases' },
      { status: 500 }
    )
  }
}