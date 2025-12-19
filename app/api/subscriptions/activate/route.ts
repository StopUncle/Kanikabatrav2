import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth/middleware'
import { paypalSubscriptionService } from '@/lib/paypal-subscriptions'
import prisma from '@/lib/prisma'

export async function POST(request: NextRequest) {
  return requireAuth(request, async (_req, user) => {
    try {
      const { subscriptionId, courseId } = await request.json()

      if (!subscriptionId || !courseId) {
        return NextResponse.json(
          { success: false, error: 'Subscription ID and Course ID are required' },
          { status: 400 }
        )
      }

      const paypalSubscription = await paypalSubscriptionService.getSubscription(subscriptionId)

      if (paypalSubscription.status !== 'ACTIVE' && paypalSubscription.status !== 'APPROVED') {
        return NextResponse.json(
          { success: false, error: `Subscription is not active. Status: ${paypalSubscription.status}` },
          { status: 400 }
        )
      }

      const course = await prisma.course.findUnique({
        where: { id: courseId }
      })

      if (!course) {
        return NextResponse.json(
          { success: false, error: 'Course not found' },
          { status: 404 }
        )
      }

      const subscription = await prisma.subscription.upsert({
        where: {
          paypalSubscriptionId: subscriptionId
        },
        create: {
          userId: user.id,
          courseId,
          paypalSubscriptionId: subscriptionId,
          paypalPlanId: paypalSubscription.plan_id,
          status: 'ACTIVE',
          currentPeriodStart: paypalSubscription.start_time
            ? new Date(paypalSubscription.start_time)
            : new Date(),
          currentPeriodEnd: paypalSubscription.billing_info?.next_billing_time
            ? new Date(paypalSubscription.billing_info.next_billing_time)
            : undefined
        },
        update: {
          status: 'ACTIVE',
          currentPeriodStart: paypalSubscription.start_time
            ? new Date(paypalSubscription.start_time)
            : undefined,
          currentPeriodEnd: paypalSubscription.billing_info?.next_billing_time
            ? new Date(paypalSubscription.billing_info.next_billing_time)
            : undefined
        }
      })

      await prisma.courseEnrollment.upsert({
        where: {
          courseId_userId: {
            courseId,
            userId: user.id
          }
        },
        create: {
          courseId,
          userId: user.id,
          subscriptionId: subscription.id,
          status: 'ACTIVE',
          startedAt: new Date()
        },
        update: {
          subscriptionId: subscription.id,
          status: 'ACTIVE'
        }
      })

      return NextResponse.json({
        success: true,
        subscription: {
          id: subscription.id,
          status: subscription.status,
          courseId: subscription.courseId,
          currentPeriodEnd: subscription.currentPeriodEnd
        }
      })
    } catch (error) {
      console.error('Subscription activation error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to activate subscription' },
        { status: 500 }
      )
    }
  })
}
