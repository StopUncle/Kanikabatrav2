import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import fs from 'fs/promises'
import path from 'path'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json(
        { error: 'Download token is required' },
        { status: 400 }
      )
    }

    // Find purchase by download token
    const purchase = await prisma.purchase.findUnique({
      where: { downloadToken: token },
    })

    if (!purchase) {
      return NextResponse.json(
        { error: 'Invalid download token' },
        { status: 404 }
      )
    }

    // Check if purchase is completed
    if (purchase.status !== 'COMPLETED') {
      return NextResponse.json(
        { error: 'Purchase is not completed' },
        { status: 400 }
      )
    }

    // Check if download has expired
    if (purchase.expiresAt && purchase.expiresAt < new Date()) {
      return NextResponse.json(
        { error: 'Download link has expired. Please contact support.' },
        { status: 410 }
      )
    }

    // Check download limit
    if (purchase.downloadCount >= purchase.maxDownloads) {
      return NextResponse.json(
        { error: `Maximum download limit (${purchase.maxDownloads}) reached. Please contact support.` },
        { status: 429 }
      )
    }

    // Only allow book downloads
    if (purchase.type !== 'BOOK') {
      return NextResponse.json(
        { error: 'This purchase is not for a downloadable book' },
        { status: 400 }
      )
    }

    // Track download attempt
    await prisma.purchase.update({
      where: { id: purchase.id },
      data: {
        downloadCount: {
          increment: 1,
        },
        lastDownloadAt: new Date(),
      },
    })

    // Determine which book file to serve based on variant
    let bookFilename = 'sociopathic-dating-bible-premium.pdf'
    let displayName = 'Sociopathic_Dating_Bible_Premium_Edition_Kanika_Batra.pdf'

    if (purchase.productVariant === 'KDP') {
      bookFilename = 'sociopathic-dating-bible-kdp.pdf'
      displayName = 'Sociopathic_Dating_Bible_Kanika_Batra.pdf'
    }

    const bookPath = path.join(process.cwd(), 'private', 'books', bookFilename)

    try {
      // Check if file exists
      await fs.access(bookPath)

      // Read the file
      const fileBuffer = await fs.readFile(bookPath)

      console.log('Book download:', {
        purchaseId: purchase.id,
        variant: purchase.productVariant,
        email: purchase.customerEmail,
        downloadCount: purchase.downloadCount + 1
      })

      // Return the file as a download
      return new NextResponse(fileBuffer as BodyInit, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${displayName}"`,
          'Content-Length': fileBuffer.length.toString(),
          'Cache-Control': 'private, no-cache, no-store, must-revalidate',
        },
      })
    } catch (_fileError) {
      console.error('Book file not found:', bookPath)

      // Return a placeholder response for development
      return NextResponse.json({
        success: false,
        message: 'Book file is being prepared. Please check back in a few minutes or contact support.',
        purchaseId: purchase.id,
        variant: purchase.productVariant,
        downloadCount: purchase.downloadCount,
        remainingDownloads: purchase.maxDownloads - purchase.downloadCount,
        note: `Place ${purchase.productVariant || 'book'} file at: ${bookPath}`,
      }, { status: 503 })
    }
  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json(
      { error: 'Failed to process download request' },
      { status: 500 }
    )
  }
}