import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { calculateScores, getPersonalityTypes, PersonalityType } from '@/lib/quiz-data'

export async function POST(request: NextRequest) {
  try {
    const { answers, email } = await request.json()

    if (!answers || typeof answers !== 'object') {
      return NextResponse.json(
        { error: 'Invalid answers format' },
        { status: 400 }
      )
    }

    const scores = calculateScores(answers as Record<number, PersonalityType>)
    const types = getPersonalityTypes(scores)

    const quizResult = await prisma.quizResult.create({
      data: {
        email: email || null,
        primaryType: types.primary,
        secondaryType: types.secondary,
        scores: JSON.parse(JSON.stringify(scores)),
        answers: JSON.parse(JSON.stringify(answers)),
        paid: false,
        emailSent: false,
        shared: false
      },
    })

    return NextResponse.json({
      resultId: quizResult.id,
      primaryType: types.primary,
      secondaryType: types.secondary,
      scores
    })
  } catch (error) {
    console.error('Error submitting quiz:', error)
    return NextResponse.json(
      { error: 'Failed to submit quiz' },
      { status: 500 }
    )
  }
}
