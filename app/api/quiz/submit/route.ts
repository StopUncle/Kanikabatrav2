import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { calculateResults } from '@/lib/quiz-scoring'

export async function POST(request: NextRequest) {
  try {
    const { answers, email } = await request.json()

    if (!answers || !Array.isArray(answers)) {
      return NextResponse.json(
        { error: 'Invalid answers format' },
        { status: 400 }
      )
    }

    const results = calculateResults(answers)

    const quizResult = await prisma.quizResult.create({
      data: {
        email: email || null,
        resultType: results.type,
        scores: JSON.parse(JSON.stringify(results.scores)),
        answers: answers,
      },
    })

    return NextResponse.json({
      resultId: quizResult.id,
      type: results.type,
    })
  } catch (error) {
    console.error('Error submitting quiz:', error)
    return NextResponse.json(
      { error: 'Failed to submit quiz' },
      { status: 500 }
    )
  }
}
