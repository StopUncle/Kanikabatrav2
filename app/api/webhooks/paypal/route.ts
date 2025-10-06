import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { paypalService } from '@/lib/paypal'
import { sendOrderConfirmation, sendBookDelivery, sendCoachingScheduling } from '@/lib/email'
import { BOOK_INFO, COACHING_PACKAGES } from '@/lib/constants'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

// PayPal webhook event interfaces
interface PayPalWebhookEvent {
  id: string
  event_type: string
  resource?: {
    id?: string
    supplementary_data?: {
      related_ids?: {
        order_id?: string
      }
    }
  }
}

// Verify PayPal webhook signature
function verifyWebhookSignature(
  body: string,
  headers: Headers
): boolean {
  // In production, implement PayPal webhook signature verification
  // This requires webhook ID from PayPal dashboard
  const webhookId = process.env.PAYPAL_WEBHOOK_ID
  const transmissionId = headers.get('paypal-transmission-id')
  const transmissionTime = headers.get('paypal-transmission-time')
  const _certUrl = headers.get('paypal-cert-url')
  const _authAlgo = headers.get('paypal-auth-algo')
  const transmissionSig = headers.get('paypal-transmission-sig')

  if (!webhookId || !transmissionId || !transmissionTime || !transmissionSig) {
    console.warn('Missing PayPal webhook headers')
    // In development, allow webhooks without verification
    return process.env.NODE_ENV === 'development'
  }

  // TODO: Implement full signature verification
  // For now, return true in development
  return process.env.NODE_ENV === 'development'
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const event = JSON.parse(body)

    // Verify webhook signature
    if (!verifyWebhookSignature(body, request.headers)) {
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 401 }
      )
    }

    console.log('PayPal Webhook Event:', event.event_type)

    // Handle different event types
    switch (event.event_type) {
      case 'CHECKOUT.ORDER.COMPLETED':
      case 'PAYMENT.CAPTURE.COMPLETED':
        await handleOrderCompleted(event)
        break

      case 'PAYMENT.CAPTURE.DENIED':
      case 'PAYMENT.CAPTURE.REFUNDED':
        await handlePaymentFailed(event)
        break

      default:
        console.log('Unhandled webhook event:', event.event_type)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

async function handleOrderCompleted(event: PayPalWebhookEvent) {
  const orderId = event.resource?.id || event.resource?.supplementary_data?.related_ids?.order_id
  
  if (!orderId) {
    console.error('No order ID in webhook event')
    return
  }

  // Check if we've already processed this order
  const existingPurchase = await prisma.purchase.findFirst({
    where: { paypalOrderId: orderId },
  })

  if (existingPurchase) {
    console.log('Order already processed:', orderId)
    return
  }

  // Get full order details from PayPal
  const orderDetails = await paypalService.getOrderDetails(orderId)

  if (orderDetails.status !== 'COMPLETED') {
    console.log('Order not completed:', orderDetails.status)
    return
  }

  // Extract purchase details
  const purchaseUnit = orderDetails.purchase_units?.[0]
  const amount = parseFloat(purchaseUnit?.amount?.value || '0')
  const payerEmail = orderDetails.payer?.email_address || ''
  const payerName = `${orderDetails.payer?.name?.given_name || ''} ${orderDetails.payer?.name?.surname || ''}`.trim()
  const referenceId = purchaseUnit?.reference_id || ''

  // Determine purchase type from reference ID or amount
  const isBookPurchase = referenceId === 'book-purchase' || amount === BOOK_INFO.price
  const purchaseType = isBookPurchase ? 'BOOK' : 'COACHING'

  // Create purchase record
  const purchase = await prisma.purchase.create({
    data: {
      paypalOrderId: orderId,
      type: purchaseType,
      amount,
      status: 'COMPLETED',
      customerEmail: payerEmail,
      customerName: payerName,
      metadata: {
        webhookEventId: event.id,
        webhookEventType: event.event_type,
        timestamp: new Date().toISOString(),
      },
    },
  })

  // Handle book purchase
  if (purchaseType === 'BOOK') {
    // Generate secure download URL
    const downloadToken = jwt.sign(
      { purchaseId: purchase.id, type: 'book' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    )
    const downloadUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/download?token=${downloadToken}`

    // Send emails
    await sendOrderConfirmation({
      customerEmail: payerEmail,
      customerName: payerName,
      orderNumber: orderId,
      purchaseType: 'book',
      amount,
      itemName: BOOK_INFO.title,
    })

    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 30)
    await sendBookDelivery(payerEmail, payerName, downloadUrl, null, expiresAt)
  }

  // Handle coaching purchase
  if (purchaseType === 'COACHING') {
    // Try to determine which package based on amount
    const coachingPackage = COACHING_PACKAGES.find(pkg => pkg.price === amount)
    
    if (coachingPackage) {
      // Create coaching session record
      const session = await prisma.coachingSession.create({
        data: {
          purchaseId: purchase.id,
          packageName: coachingPackage.name,
          sessionCount: coachingPackage.sessions || 1,
          status: 'PENDING_SCHEDULING',
        },
      })

      // Generate scheduling URL
      const schedulingToken = jwt.sign(
        { sessionId: session.id, purchaseId: purchase.id },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '30d' }
      )
      const schedulingUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/coaching/schedule?token=${schedulingToken}`

      // Send emails
      await sendOrderConfirmation({
        customerEmail: payerEmail,
        customerName: payerName,
        orderNumber: orderId,
        purchaseType: 'coaching',
        amount,
        itemName: coachingPackage.name,
        packageDetails: {
          sessions: coachingPackage.sessions,
          duration: coachingPackage.duration,
        },
      })

      await sendCoachingScheduling(
        payerEmail,
        payerName,
        coachingPackage.name,
        schedulingUrl
      )
    }
  }

  console.log('Order processed successfully:', orderId)
}

async function handlePaymentFailed(event: PayPalWebhookEvent) {
  const orderId = event.resource?.id || event.resource?.supplementary_data?.related_ids?.order_id
  
  if (!orderId) {
    console.error('No order ID in webhook event')
    return
  }

  // Update purchase record if it exists
  const purchase = await prisma.purchase.findFirst({
    where: { paypalOrderId: orderId },
  })

  if (purchase) {
    await prisma.purchase.update({
      where: { id: purchase.id },
      data: {
        status: 'FAILED',
        metadata: {
          ...(purchase.metadata as Record<string, unknown> || {}),
          failedEventId: event.id,
          failedEventType: event.event_type,
          failedAt: new Date().toISOString(),
        },
      },
    })
  }

  console.log('Payment failed for order:', orderId)
}