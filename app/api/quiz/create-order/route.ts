import { NextRequest, NextResponse } from 'next/server'
import { paypalService, createQuizOrder } from '@/lib/paypal'
import { QUIZ_INFO, PersonalityType, QuizScores } from '@/lib/quiz-data'
import { prisma } from '@/lib/prisma'
import { SITE_CONFIG } from '@/lib/constants'

interface CreateQuizOrderRequest {
  email: string
  scores: QuizScores
  primaryType: PersonalityType
  secondaryType: PersonalityType
  answers: Record<number, PersonalityType>
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateQuizOrderRequest = await request.json()

    if (!body.email || !body.scores || !body.primaryType) {
      return NextResponse.json(
        { error: 'Missing required fields: email, scores, primaryType' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    const quizResult = await prisma.quizResult.create({
      data: {
        email: body.email,
        scores: JSON.parse(JSON.stringify(body.scores)),
        primaryType: body.primaryType,
        secondaryType: body.secondaryType,
        answers: JSON.parse(JSON.stringify(body.answers)),
        paid: false,
        emailSent: false,
        shared: false
      }
    })

    const baseUrl = SITE_CONFIG.url
    const returnUrl = `${baseUrl}/quiz/success?quiz_id=${quizResult.id}`
    const cancelUrl = `${baseUrl}/quiz/results`

    const paypalOrder = createQuizOrder(
      QUIZ_INFO.price,
      QUIZ_INFO.name,
      returnUrl,
      cancelUrl
    )

    const orderResponse = await paypalService.createOrder(paypalOrder)

    await prisma.quizResult.update({
      where: { id: quizResult.id },
      data: { paypalOrderId: orderResponse.id }
    })

    const approveUrl = orderResponse.links.find(link => link.rel === 'approve')?.href

    if (!approveUrl) {
      return NextResponse.json(
        { error: 'Failed to get PayPal approval URL' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      quizResultId: quizResult.id,
      orderId: orderResponse.id,
      approveUrl
    }, { status: 201 })

  } catch (error: unknown) {
    console.error('Quiz order creation error:', error)

    if (error instanceof Error) {
      if (error.message.includes('PayPal')) {
        return NextResponse.json(
          {
            error: 'Payment system temporarily unavailable. Please try again later.',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
          },
          { status: 503 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

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
