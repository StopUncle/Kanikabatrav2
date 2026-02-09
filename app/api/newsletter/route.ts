import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { email, name, source = 'newsletter', quizResultId, tags = [] } = await request.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const existingSubscriber = await prisma.subscriber.findUnique({
      where: { email: email.toLowerCase() }
    })

    if (existingSubscriber) {
      const existingTags = existingSubscriber.tags || []
      const newTags = Array.from(new Set([...existingTags, ...tags]))

      await prisma.subscriber.update({
        where: { email: email.toLowerCase() },
        data: {
          tags: newTags,
          ...(quizResultId && { quizResultId })
        }
      })

      return NextResponse.json({
        success: true,
        message: 'Subscription updated',
        isNew: false
      })
    }

    await prisma.subscriber.create({
      data: {
        email: email.toLowerCase(),
        name: name || null,
        source,
        quizResultId: quizResultId || null,
        tags,
        verified: true
      }
    })

    // Send welcome email (fire and forget — don't block the response)
    sendEmail({
      to: email.toLowerCase(),
      subject: 'Welcome to The Psychology of Power — Kanika Batra',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1a0d11 0%, #0a1628 100%); padding: 30px; border-radius: 10px 10px 0 0;">
            <h1 style="color: #d4af37; margin: 0; font-size: 24px;">Welcome</h1>
          </div>
          <div style="background: #050511; padding: 30px; border: 1px solid #d4af37; border-top: none; border-radius: 0 0 10px 10px;">
            <p style="color: #f5f0ed; font-size: 16px; line-height: 1.6;">
              ${name ? `Hey ${name},` : 'Hey,'}
            </p>
            <p style="color: #94a3b8; line-height: 1.6;">
              Thanks for subscribing. You're now on the inside.
            </p>
            <p style="color: #94a3b8; line-height: 1.6;">
              I'll be sharing insights on power dynamics, strategic psychology, and the patterns most people miss — directly to your inbox.
            </p>
            <p style="color: #94a3b8; line-height: 1.6;">
              No fluff. No filler. Just the stuff that actually moves the needle.
            </p>
            <p style="color: #d4af37; font-style: italic; margin-top: 30px;">
              — Kanika Batra<br>
              <span style="color: #666; font-size: 12px;">The Psychology of Power</span>
            </p>
          </div>
        </div>
      `,
    }).catch((err) => console.error('Welcome email failed:', err))

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed',
      isNew: true
    })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  const adminSecret = process.env.ADMIN_SECRET

  if (!adminSecret || authHeader !== `Bearer ${adminSecret}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const subscribers = await prisma.subscriber.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100
    })

    const stats = await prisma.subscriber.groupBy({
      by: ['source'],
      _count: { id: true }
    })

    const total = await prisma.subscriber.count()

    return NextResponse.json({
      total,
      bySource: stats.reduce((acc, item) => {
        acc[item.source] = item._count.id
        return acc
      }, {} as Record<string, number>),
      recentSubscribers: subscribers.map((s) => ({
        email: s.email,
        source: s.source,
        tags: s.tags,
        createdAt: s.createdAt
      }))
    })
  } catch (error) {
    console.error('Error fetching subscribers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    )
  }
}
