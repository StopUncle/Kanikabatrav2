import { NextRequest, NextResponse } from 'next/server'
import { paypalService } from '@/lib/paypal'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId } = body

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      )
    }

    // Verify the order with PayPal
    const orderDetails = await paypalService.getOrderDetails(orderId)

    // Check if order is completed
    if (orderDetails.status === 'COMPLETED') {
      return NextResponse.json({
        success: true,
        status: 'COMPLETED',
        orderId: orderDetails.id,
        amount: orderDetails.purchase_units?.[0]?.amount?.value,
        currency: orderDetails.purchase_units?.[0]?.amount?.currency_code,
      })
    }

    // Check if order needs approval
    if (orderDetails.status === 'APPROVED') {
      // Capture the payment
      const captureResult = await paypalService.captureOrder(orderId)
      
      if (captureResult.status === 'COMPLETED') {
        return NextResponse.json({
          success: true,
          status: 'COMPLETED',
          orderId: captureResult.id,
          captureId: captureResult.purchase_units?.[0]?.payments?.captures?.[0]?.id,
          amount: captureResult.purchase_units?.[0]?.payments?.captures?.[0]?.amount?.value,
          currency: captureResult.purchase_units?.[0]?.payments?.captures?.[0]?.amount?.currency_code,
        })
      }
    }

    return NextResponse.json({
      success: false,
      status: orderDetails.status,
      message: 'Order is not yet completed',
    })
  } catch (error) {
    console.error('Order verification error:', error)
    return NextResponse.json(
      { error: 'Failed to verify order' },
      { status: 500 }
    )
  }
}