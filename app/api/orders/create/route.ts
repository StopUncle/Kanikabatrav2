import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { paypalService } from '@/lib/paypal'
import { sendOrderConfirmation, sendBookDelivery, sendCoachingScheduling } from '@/lib/email'
import { BOOK_INFO, COACHING_PACKAGES } from '@/lib/constants'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, type, packageId } = body

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      )
    }

    // Verify the order with PayPal
    const orderDetails = await paypalService.getOrderDetails(orderId)

    if (orderDetails.status !== 'COMPLETED') {
      return NextResponse.json(
        { error: 'Order is not completed' },
        { status: 400 }
      )
    }

    // Get user from JWT token if available
    let userId: string | null = null
    const token = request.cookies.get('auth-token')?.value
    
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as { userId: string }
        userId = decoded.userId
      } catch (_error) {
        console.log('No valid auth token, proceeding as guest purchase')
      }
    }

    // Extract purchase details from PayPal order
    const purchaseUnit = orderDetails.purchase_units?.[0]
    const amount = parseFloat(purchaseUnit?.amount?.value || '0')
    const payerEmail = orderDetails.payer?.email_address || ''
    const payerName = `${orderDetails.payer?.name?.given_name || ''} ${orderDetails.payer?.name?.surname || ''}`.trim()

    // Create purchase record
    const purchase = await prisma.purchase.create({
      data: {
        paypalOrderId: orderId,
        type: type === 'coaching' ? 'COACHING' : 'BOOK',
        amount,
        status: 'COMPLETED',
        customerEmail: payerEmail,
        customerName: payerName,
        userId: userId,
        metadata: {
          packageId: packageId,
          timestamp: new Date().toISOString(),
        },
      },
    })

    // Handle book purchase
    if (type === 'book') {
      // Generate secure download URL
      const downloadToken = jwt.sign(
        { purchaseId: purchase.id, type: 'book' },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '7d' }
      )
      const downloadUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/download?token=${downloadToken}`

      // Send order confirmation
      await sendOrderConfirmation({
        customerEmail: payerEmail,
        customerName: payerName,
        orderNumber: orderId,
        purchaseType: 'book',
        amount,
        itemName: BOOK_INFO.title,
      })

      // Send book delivery email
      const expiresAt = new Date()
      expiresAt.setDate(expiresAt.getDate() + 30)
      await sendBookDelivery(payerEmail, payerName, downloadUrl, null, expiresAt)

      return NextResponse.json({
        success: true,
        purchaseId: purchase.id,
        downloadUrl,
        message: 'Book purchase successful. Check your email for download instructions.',
      })
    }

    // Handle coaching purchase
    if (type === 'coaching' && packageId) {
      const coachingPackage = COACHING_PACKAGES.find(pkg => pkg.id === packageId)
      
      if (!coachingPackage) {
        return NextResponse.json(
          { error: 'Invalid coaching package' },
          { status: 400 }
        )
      }

      // Create coaching session record
      const session = await prisma.coachingSession.create({
        data: {
          purchaseId: purchase.id,
          packageName: coachingPackage.name,
          sessionCount: coachingPackage.sessions || 1,
          status: 'PENDING_SCHEDULING',
          userId: userId,
        },
      })

      // Generate scheduling URL
      const schedulingToken = jwt.sign(
        { sessionId: session.id, purchaseId: purchase.id },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '30d' }
      )
      const schedulingUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/coaching/schedule?token=${schedulingToken}`

      // Send order confirmation
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

      // Send scheduling email
      await sendCoachingScheduling(
        payerEmail,
        payerName,
        coachingPackage.name,
        schedulingUrl
      )

      return NextResponse.json({
        success: true,
        purchaseId: purchase.id,
        sessionId: session.id,
        schedulingUrl,
        message: 'Coaching package purchased successfully. Check your email to schedule your sessions.',
      })
    }

    return NextResponse.json({
      success: true,
      purchaseId: purchase.id,
      message: 'Purchase completed successfully.',
    })
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json(
      { error: 'Failed to process order' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}