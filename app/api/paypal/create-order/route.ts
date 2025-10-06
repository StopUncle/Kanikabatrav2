import { NextRequest, NextResponse } from 'next/server'
import { paypalService, createBookOrder, createCoachingOrder } from '@/lib/paypal'
import { BOOK_INFO, COACHING_PACKAGES } from '@/lib/constants'
import { logger } from '@/lib/logger'

interface CreateOrderRequest {
  type: 'book' | 'coaching'
  itemId?: string // For coaching packages
}

export async function POST(request: NextRequest) {
  try {
    logger.apiRequest('POST', '/api/paypal/create-order')
    const body: CreateOrderRequest = await request.json()

    // Validate input
    if (!body.type || (body.type !== 'book' && body.type !== 'coaching')) {
      logger.warn('Invalid order type requested', { type: body.type })
      return NextResponse.json(
        { error: 'Invalid order type. Must be "book" or "coaching"' },
        { status: 400 }
      )
    }

    let paypalOrder

    if (body.type === 'book') {
      // Create book order
      paypalOrder = createBookOrder(BOOK_INFO.price, BOOK_INFO.title)
      logger.paymentAttempt('book', BOOK_INFO.price, { title: BOOK_INFO.title })
    } else if (body.type === 'coaching') {
      // Find coaching package
      if (!body.itemId) {
        logger.warn('Coaching order without package ID')
        return NextResponse.json(
          { error: 'Coaching package ID is required' },
          { status: 400 }
        )
      }

      // Handle bundle packages (itemId ends with '-bundle')
      const isBundle = body.itemId.endsWith('-bundle')
      const packageId = isBundle ? body.itemId.replace('-bundle', '') : body.itemId

      const coachingPackage = COACHING_PACKAGES.find(pkg => pkg.id === packageId)
      if (!coachingPackage) {
        logger.warn('Invalid coaching package requested', { itemId: body.itemId, packageId })
        return NextResponse.json(
          { error: 'Invalid coaching package ID' },
          { status: 400 }
        )
      }

      const price = isBundle ? coachingPackage.bundlePrice : coachingPackage.price
      const name = isBundle ? `${coachingPackage.name} - Bundle (${coachingPackage.bundleSessions} sessions)` : coachingPackage.name
      const description = isBundle
        ? `${coachingPackage.description} - Bundle package with ${coachingPackage.bundleSessions} sessions and exclusive benefits.`
        : coachingPackage.description

      paypalOrder = createCoachingOrder(price, name, description)
      logger.paymentAttempt('coaching', price, {
        packageId: body.itemId,
        packageName: name,
        isBundle
      })
    } else {
      return NextResponse.json(
        { error: 'Invalid order type' },
        { status: 400 }
      )
    }

    // Create order with PayPal
    const orderResponse = await paypalService.createOrder(paypalOrder)

    logger.info('PayPal order created successfully', {
      orderId: orderResponse.id,
      status: orderResponse.status,
      type: body.type,
      itemId: body.itemId
    })

    return NextResponse.json({
      success: true,
      orderId: orderResponse.id,
      status: orderResponse.status,
      links: orderResponse.links
    }, { status: 201 })

  } catch (error: unknown) {
    console.error('PayPal order creation error:', error)

    // Handle specific PayPal errors
    if (error instanceof Error) {
      if (error.message.includes('PayPal')) {
        return NextResponse.json(
          {
            error: 'Payment system temporarily unavailable. Please try again later.',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
          },
          { status: 503 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Handle OPTIONS request for CORS
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