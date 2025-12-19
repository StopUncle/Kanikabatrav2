import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth/middleware'
import { paypalSubscriptionService } from '@/lib/paypal-subscriptions'
import prisma from '@/lib/prisma'

export async function POST(request: NextRequest) {
  return requireAuth(request, async (_req, user) => {
    try {
      const { courseId, planId } = await request.json()

      if (!courseId) {
        return NextResponse.json(
          { success: false, error: 'Course ID is required' },
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

      const existingSubscription = await prisma.subscription.findFirst({
        where: {
          userId: user.id,
          courseId,
          status: 'ACTIVE'
        }
      })

      if (existingSubscription) {
        return NextResponse.json(
          { success: false, error: 'Already subscribed to this course' },
          { status: 400 }
        )
      }

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
      const returnUrl = `${baseUrl}/courses/${course.slug}/subscribe/success?course_id=${course.id}`
      const cancelUrl = `${baseUrl}/courses/${course.slug}/subscribe/cancel`

      const effectivePlanId = planId || process.env[`PAYPAL_PLAN_${course.tier.toUpperCase()}`]

      if (!effectivePlanId) {
        return NextResponse.json(
          { success: false, error: 'No PayPal plan configured for this course tier' },
          { status: 500 }
        )
      }

      const subscription = await paypalSubscriptionService.createSubscription(
        effectivePlanId,
        returnUrl,
        cancelUrl,
        `user:${user.id}:course:${course.id}`
      )

      const approvalLink = subscription.links?.find(link => link.rel === 'approve')?.href

      if (!approvalLink) {
        throw new Error('No approval link returned from PayPal')
      }

      return NextResponse.json({
        success: true,
        subscriptionId: subscription.id,
        approvalUrl: approvalLink,
        status: subscription.status
      })
    } catch (error) {
      console.error('Subscription creation error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to create subscription' },
        { status: 500 }
      )
    }
  })
}
