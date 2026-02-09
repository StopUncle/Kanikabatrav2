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

    // Get requested format from query params (defaults to pdf)
    const format = searchParams.get('format') || 'pdf'

    // Check if requesting bonus content - requires PREMIUM purchase
    if (format.startsWith('bonus-') && purchase.productVariant !== 'PREMIUM') {
      return NextResponse.json(
        { error: 'Bonus chapters are only available with Premium Edition purchase' },
        { status: 403 }
      )
    }

    // Determine which file to serve based on format
    let bookFilename: string
    let displayName: string
    let contentType = 'application/pdf'

    switch (format) {
      case 'epub':
        bookFilename = 'FINAL_BOOK.epub'
        displayName = 'Sociopathic_Dating_Bible_Kanika_Batra.epub'
        contentType = 'application/epub+zip'
        break
      case 'bonus-narcissists':
        bookFilename = 'Addendum_Narcissists.pdf'
        displayName = 'Bonus_Chapter_Understanding_Narcissists.pdf'
        break
      case 'bonus-avoidants':
        bookFilename = 'Addendum_Avoidants.pdf'
        displayName = 'Bonus_Chapter_The_Avoidant_Playbook.pdf'
        break
      default:
        bookFilename = 'FINAL_BOOK.pdf'
        displayName = 'Sociopathic_Dating_Bible_Kanika_Batra.pdf'
    }

    // Try public folder first (for Railway deployment), fallback to private
    let bookPath = path.join(process.cwd(), 'public', 'books', bookFilename)
    try {
      await fs.access(bookPath)
    } catch {
      // Fallback to private folder
      bookPath = path.join(process.cwd(), 'private', 'books', bookFilename)
    }

    try {
      // Check if file exists
      await fs.access(bookPath)

      // Read the file
      const fileBuffer = await fs.readFile(bookPath)

      console.log('Book download:', {
        purchaseId: purchase.id,
        variant: purchase.productVariant,
        email: purchase.customerEmail,
        format,
        downloadCount: purchase.downloadCount + 1
      })

      // Return the file as a download
      return new NextResponse(fileBuffer as BodyInit, {
        status: 200,
        headers: {
          'Content-Type': contentType,
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