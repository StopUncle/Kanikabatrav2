import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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
        verified: false
      }
    })

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
