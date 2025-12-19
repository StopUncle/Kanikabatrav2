import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateDiagnosis, PersonalityType } from '@/lib/quiz-data'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Missing quiz result ID' },
        { status: 400 }
      )
    }

    const quizResult = await prisma.quizResult.findUnique({
      where: { id }
    })

    if (!quizResult) {
      return NextResponse.json(
        { error: 'Quiz result not found' },
        { status: 404 }
      )
    }

    if (!quizResult.paid) {
      return NextResponse.json(
        { error: 'Payment required to view full results' },
        { status: 403 }
      )
    }

    const answers = quizResult.answers as Record<number, PersonalityType>
    const diagnosis = generateDiagnosis(answers)

    return NextResponse.json({
      id: quizResult.id,
      email: quizResult.email,
      scores: quizResult.scores,
      primaryType: quizResult.primaryType,
      secondaryType: quizResult.secondaryType,
      diagnosis,
      paid: quizResult.paid,
      createdAt: quizResult.createdAt
    })

  } catch (error) {
    console.error('Error fetching quiz result:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
