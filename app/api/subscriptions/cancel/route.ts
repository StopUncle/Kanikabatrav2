import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth/middleware'
import { paypalSubscriptionService } from '@/lib/paypal-subscriptions'
import prisma from '@/lib/prisma'

export async function POST(request: NextRequest) {
  return requireAuth(request, async (_req, user) => {
    try {
      const { subscriptionId, reason } = await request.json()

      if (!subscriptionId) {
        return NextResponse.json(
          { success: false, error: 'Subscription ID is required' },
          { status: 400 }
        )
      }

      const subscription = await prisma.subscription.findFirst({
        where: {
          id: subscriptionId,
          userId: user.id
        }
      })

      if (!subscription) {
        return NextResponse.json(
          { success: false, error: 'Subscription not found' },
          { status: 404 }
        )
      }

      if (subscription.status === 'CANCELLED') {
        return NextResponse.json(
          { success: false, error: 'Subscription is already cancelled' },
          { status: 400 }
        )
      }

      await paypalSubscriptionService.cancelSubscription(
        subscription.paypalSubscriptionId,
        reason || 'User requested cancellation'
      )

      const updatedSubscription = await prisma.subscription.update({
        where: { id: subscriptionId },
        data: {
          status: 'CANCELLED',
          cancelledAt: new Date()
        }
      })

      return NextResponse.json({
        success: true,
        subscription: {
          id: updatedSubscription.id,
          status: updatedSubscription.status,
          cancelledAt: updatedSubscription.cancelledAt,
          currentPeriodEnd: updatedSubscription.currentPeriodEnd
        },
        message: 'Subscription cancelled. You will have access until the end of your billing period.'
      })
    } catch (error) {
      console.error('Subscription cancellation error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to cancel subscription' },
        { status: 500 }
      )
    }
  })
}
