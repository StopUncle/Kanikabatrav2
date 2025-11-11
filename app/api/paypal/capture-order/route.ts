import { NextRequest, NextResponse } from 'next/server'
import { paypalService } from '@/lib/paypal'
import { prisma } from '@/lib/prisma'
import { sendBookDelivery } from '@/lib/email'
import crypto from 'crypto'

interface CaptureOrderRequest {
  orderId: string
}

interface OrderDetails {
  orderId: string
  status: string
  paymentId?: string
  amount?: string
  currency?: string
  payerEmail?: string
  payerName?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: CaptureOrderRequest = await request.json()

    // Validate input
    if (!body.orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      )
    }

    // Validate order ID format (PayPal order IDs are typically 17 characters)
    if (typeof body.orderId !== 'string' || body.orderId.length < 10) {
      return NextResponse.json(
        { error: 'Invalid order ID format' },
        { status: 400 }
      )
    }

    // First, get order details to verify it exists and is in correct state
    let orderDetails
    try {
      orderDetails = await paypalService.getOrderDetails(body.orderId)
    } catch (error) {
      console.error('Failed to get order details:', error)
      return NextResponse.json(
        { error: 'Invalid order ID or order not found' },
        { status: 404 }
      )
    }

    console.log('Order status before capture:', orderDetails.status)

    // Check if order is already completed (credit/debit cards may auto-complete)
    if (orderDetails.status === 'COMPLETED') {
      console.log('Order already completed, skipping capture')
      // Extract payment details from already completed order
      const orderData: OrderDetails = {
        orderId: orderDetails.id,
        status: orderDetails.status
      }

      if (orderDetails.purchase_units && orderDetails.purchase_units.length > 0) {
        const purchaseUnit = orderDetails.purchase_units[0]
        orderData.amount = purchaseUnit.amount.value
        orderData.currency = purchaseUnit.amount.currency_code
      }

      const responsePayer = orderDetails.payer
      if (responsePayer) {
        orderData.payerEmail = responsePayer.email_address
        orderData.payerName = responsePayer.name?.given_name && responsePayer.name?.surname
          ? `${responsePayer.name.given_name} ${responsePayer.name.surname}`
          : responsePayer.email_address
      }

      // Generate download token for already completed orders
      const downloadToken = crypto.randomBytes(32).toString('hex')
      const expiresAt = new Date()
      expiresAt.setDate(expiresAt.getDate() + 30)

      // Check if this order was already processed in our database
      const existingPurchase = await prisma.purchase.findFirst({
        where: { paypalOrderId: body.orderId }
      })

      if (existingPurchase) {
        console.log('Order already exists in database:', existingPurchase.id)
        return NextResponse.json({
          success: true,
          paymentId: existingPurchase.paypalCaptureId || body.orderId,
          purchaseId: existingPurchase.id,
          status: 'COMPLETED',
          amount: existingPurchase.amount.toString(),
          currency: 'USD',
          downloadUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/download?token=${existingPurchase.downloadToken}`,
          downloadToken: existingPurchase.downloadToken,
          expiresAt: existingPurchase.expiresAt?.toISOString(),
          message: 'Payment already processed successfully.'
        }, { status: 200 })
      }

      // Save new purchase for already completed order
      const purchase = await prisma.purchase.create({
        data: {
          type: 'BOOK',
          customerEmail: orderData.payerEmail || 'unknown@email.com',
          customerName: orderData.payerName || 'Unknown',
          amount: parseFloat(orderData.amount || '0'),
          status: 'COMPLETED',
          paypalOrderId: orderData.orderId,
          paypalCaptureId: body.orderId,
          downloadToken,
          expiresAt,
          metadata: {
            currency: orderData.currency,
            autoCompleted: true,
            ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
          }
        }
      })

      return NextResponse.json({
        success: true,
        paymentId: body.orderId,
        purchaseId: purchase.id,
        status: 'COMPLETED',
        amount: orderData.amount,
        currency: orderData.currency,
        downloadUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/download?token=${downloadToken}`,
        downloadToken,
        expiresAt: expiresAt.toISOString(),
        message: 'Payment completed successfully.'
      }, { status: 200 })
    }

    // Check if order is in capturable state (APPROVED or PAYER_ACTION_REQUIRED)
    if (orderDetails.status !== 'APPROVED' && orderDetails.status !== 'PAYER_ACTION_REQUIRED') {
      console.error('Order not in capturable state:', orderDetails.status)
      return NextResponse.json(
        { error: `Order cannot be captured. Current status: ${orderDetails.status}. Please try again or contact support.` },
        { status: 400 }
      )
    }

    // Capture the payment
    const captureResponse = await paypalService.captureOrder(body.orderId)

    // Extract payment details
    const orderData: OrderDetails = {
      orderId: captureResponse.id,
      status: captureResponse.status
    }

    if (captureResponse.purchase_units && captureResponse.purchase_units.length > 0) {
      const purchaseUnit = captureResponse.purchase_units[0]
      if (purchaseUnit.payments && purchaseUnit.payments.captures && purchaseUnit.payments.captures.length > 0) {
        const capture = purchaseUnit.payments.captures[0]
        orderData.paymentId = capture.id
        orderData.amount = capture.amount.value
        orderData.currency = capture.amount.currency_code
      }
    }

    // Get payer info from top-level payer object
    const responsePayer = (captureResponse as { payer?: { email_address?: string; name?: { given_name?: string; surname?: string } } }).payer
    if (responsePayer) {
      orderData.payerEmail = responsePayer.email_address
      orderData.payerName = responsePayer.name?.given_name && responsePayer.name?.surname
        ? `${responsePayer.name.given_name} ${responsePayer.name.surname}`
        : responsePayer.email_address
    }

    // Log successful payment for debugging and record keeping
    console.log('PayPal payment captured:', {
      orderId: orderData.orderId,
      paymentId: orderData.paymentId,
      amount: orderData.amount,
      currency: orderData.currency,
      status: orderData.status,
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    })

    // Handle successful payment completion
    if (captureResponse.status === 'COMPLETED') {
      // Extract product details from order metadata
      const purchaseUnit = captureResponse.purchase_units[0]
      const customId = (purchaseUnit as { custom_id?: string }).custom_id || ''
      const description = (purchaseUnit as { description?: string }).description || ''

      // Determine product type and variant from order details
      let productType: 'BOOK' | 'COACHING' | 'COURSE' = 'BOOK'
      let productVariant: string | null = null

      if (description.toLowerCase().includes('premium')) {
        productVariant = 'PREMIUM'
      } else if (description.toLowerCase().includes('kdp') || parseFloat(orderData.amount || '0') <= 18) {
        productVariant = 'KDP'
      }

      if (description.toLowerCase().includes('coaching')) {
        productType = 'COACHING'
      }

      // Generate secure download token
      const downloadToken = crypto.randomBytes(32).toString('hex')

      // Set download expiry (30 days from now)
      const expiresAt = new Date()
      expiresAt.setDate(expiresAt.getDate() + 30)

      // Save purchase to database
      const purchase = await prisma.purchase.create({
        data: {
          type: productType,
          productVariant,
          customerEmail: orderData.payerEmail || 'unknown@email.com',
          customerName: orderData.payerName || 'Unknown',
          amount: parseFloat(orderData.amount || '0'),
          status: 'COMPLETED',
          paypalOrderId: orderData.orderId,
          paypalCaptureId: orderData.paymentId,
          downloadToken,
          expiresAt,
          metadata: {
            currency: orderData.currency,
            customId,
            ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
            userAgent: request.headers.get('user-agent') || 'unknown'
          }
        }
      })

      console.log('Purchase saved to database:', {
        purchaseId: purchase.id,
        type: productType,
        variant: productVariant,
        email: orderData.payerEmail
      })

      // Generate download URL for response
      const downloadUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/download?token=${downloadToken}`

      // Send email with download token (async, don't wait)
      if (productType === 'BOOK') {
        sendBookDelivery(
          orderData.payerEmail || 'unknown@email.com',
          orderData.payerName || 'Customer',
          downloadToken,
          productVariant,
          expiresAt
        ).catch(error => {
          console.error('Failed to send book delivery email:', error)
        })
      }

      return NextResponse.json({
        success: true,
        paymentId: orderData.paymentId,
        purchaseId: purchase.id,
        status: orderData.status,
        amount: orderData.amount,
        currency: orderData.currency,
        downloadUrl,
        downloadToken,
        expiresAt: expiresAt.toISOString(),
        message: 'Payment completed successfully. Check your email for download instructions.'
      }, { status: 200 })
    } else {
      // Handle other statuses - save as PENDING
      await prisma.purchase.create({
        data: {
          type: 'BOOK',
          customerEmail: orderData.payerEmail || 'unknown@email.com',
          customerName: orderData.payerName || 'Unknown',
          amount: parseFloat(orderData.amount || '0'),
          status: 'PENDING',
          paypalOrderId: orderData.orderId,
          metadata: {
            captureStatus: orderData.status
          }
        }
      })

      return NextResponse.json({
        success: false,
        status: orderData.status,
        message: 'Payment processing incomplete'
      }, { status: 202 })
    }

  } catch (error: unknown) {
    console.error('PayPal capture error:', error)

    // Handle specific PayPal errors
    if (error instanceof Error) {
      if (error.message.includes('PayPal')) {
        return NextResponse.json(
          {
            error: 'Payment capture failed. Please contact support if you were charged.',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
          },
          { status: 503 }
        )
      }

      if (error.message.includes('already')) {
        return NextResponse.json(
          { error: 'This payment has already been processed' },
          { status: 409 }
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