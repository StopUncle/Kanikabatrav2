import { NextRequest, NextResponse } from 'next/server'
import { paypalService } from '@/lib/paypal'
import { prisma } from '@/lib/prisma'

interface CaptureQuizOrderRequest {
  orderId: string
  quizResultId: string
}

export async function POST(request: NextRequest) {
  try {
    const body: CaptureQuizOrderRequest = await request.json()

    if (!body.orderId || !body.quizResultId) {
      return NextResponse.json(
        { error: 'Missing required fields: orderId, quizResultId' },
        { status: 400 }
      )
    }

    const quizResult = await prisma.quizResult.findUnique({
      where: { id: body.quizResultId }
    })

    if (!quizResult) {
      return NextResponse.json(
        { error: 'Quiz result not found' },
        { status: 404 }
      )
    }

    if (quizResult.paid) {
      return NextResponse.json({
        success: true,
        message: 'Payment already captured',
        quizResultId: quizResult.id
      })
    }

    const captureResponse = await paypalService.captureOrder(body.orderId)

    if (captureResponse.status !== 'COMPLETED') {
      return NextResponse.json(
        { error: `Payment not completed. Status: ${captureResponse.status}` },
        { status: 400 }
      )
    }

    await prisma.quizResult.update({
      where: { id: body.quizResultId },
      data: {
        paid: true,
        paypalOrderId: body.orderId
      }
    })

    return NextResponse.json({
      success: true,
      quizResultId: quizResult.id,
      captureId: captureResponse.purchase_units[0]?.payments?.captures[0]?.id
    })

  } catch (error: unknown) {
    console.error('Quiz order capture error:', error)

    if (error instanceof Error) {
      if (error.message.includes('PayPal')) {
        return NextResponse.json(
          {
            error: 'Payment capture failed. Please contact support.',
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
