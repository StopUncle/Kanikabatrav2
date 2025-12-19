import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { paypalService } from '@/lib/paypal'
import { sendOrderConfirmation, sendBookDelivery, sendCoachingScheduling } from '@/lib/email'
import { BOOK_INFO, COACHING_PACKAGES } from '@/lib/constants'
import jwt from 'jsonwebtoken'

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
async function verifyWebhookSignature(
  body: string,
  headers: Headers
): Promise<boolean> {
  const webhookId = process.env.PAYPAL_WEBHOOK_ID
  const transmissionId = headers.get('paypal-transmission-id')
  const transmissionTime = headers.get('paypal-transmission-time')
  const certUrl = headers.get('paypal-cert-url')
  const authAlgo = headers.get('paypal-auth-algo')
  const transmissionSig = headers.get('paypal-transmission-sig')

  // In development without webhook ID, allow for testing
  if (process.env.NODE_ENV === 'development' && !webhookId) {
    console.warn('DEVELOPMENT MODE: Webhook verification bypassed - set PAYPAL_WEBHOOK_ID to enable')
    return true
  }

  // In production, ALL required fields must be present
  if (!webhookId || !transmissionId || !transmissionTime || !transmissionSig || !certUrl || !authAlgo) {
    console.error('Missing required PayPal webhook headers or PAYPAL_WEBHOOK_ID')
    return false
  }

  try {
    // Verify webhook signature using PayPal API
    const accessToken = await paypalService.getAccessToken()
    const verifyUrl = process.env.NODE_ENV === 'production'
      ? 'https://api-m.paypal.com/v1/notifications/verify-webhook-signature'
      : 'https://api-m.sandbox.paypal.com/v1/notifications/verify-webhook-signature'

    const response = await fetch(verifyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        auth_algo: authAlgo,
        cert_url: certUrl,
        transmission_id: transmissionId,
        transmission_sig: transmissionSig,
        transmission_time: transmissionTime,
        webhook_id: webhookId,
        webhook_event: JSON.parse(body),
      }),
    })

    if (!response.ok) {
      console.error('PayPal verification API error:', response.status)
      return false
    }

    const result = await response.json()
    const verified = result.verification_status === 'SUCCESS'

    if (!verified) {
      console.error('PayPal webhook signature verification failed:', result.verification_status)
    }

    return verified
  } catch (error) {
    console.error('PayPal webhook verification error:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const event = JSON.parse(body)

    // Verify webhook signature (required in production)
    const isValid = await verifyWebhookSignature(body, request.headers)
    if (!isValid) {
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
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET not configured - cannot generate download token')
      return
    }
    // Generate secure download token
    const downloadToken = jwt.sign(
      { purchaseId: purchase.id, type: 'book' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

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
    await sendBookDelivery(payerEmail, payerName, downloadToken, null, expiresAt)
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
      if (!process.env.JWT_SECRET) {
        console.error('JWT_SECRET not configured - cannot generate scheduling token')
        return
      }
      const schedulingToken = jwt.sign(
        { sessionId: session.id, purchaseId: purchase.id },
        process.env.JWT_SECRET,
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