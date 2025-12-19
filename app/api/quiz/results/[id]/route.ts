import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { resultProfiles, ResultType } from '@/lib/quiz-questions'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

    const quizResult = await prisma.quizResult.findUnique({
      where: { id },
    })

    if (!quizResult) {
      return NextResponse.json(
        { error: 'Result not found' },
        { status: 404 }
      )
    }

    const profile = resultProfiles[quizResult.resultType as ResultType]
    const scores = quizResult.scores as { narcissism: number; machiavellianism: number; psychopathy: number }

    const maxScore = 75
    const percentages = {
      narcissism: Math.round((scores.narcissism / maxScore) * 100),
      machiavellianism: Math.round((scores.machiavellianism / maxScore) * 100),
      psychopathy: Math.round((scores.psychopathy / maxScore) * 100),
    }

    return NextResponse.json({
      id: quizResult.id,
      type: quizResult.resultType,
      scores,
      percentages,
      profile,
      shared: quizResult.shared,
      createdAt: quizResult.createdAt,
    })
  } catch (error) {
    console.error('Error fetching quiz result:', error)
    return NextResponse.json(
      { error: 'Failed to fetch result' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const { email, shared } = await request.json()

    const updateData: { email?: string; shared?: boolean } = {}
    if (email !== undefined) updateData.email = email
    if (shared !== undefined) updateData.shared = shared

    const quizResult = await prisma.quizResult.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({ success: true, result: quizResult })
  } catch (error) {
    console.error('Error updating quiz result:', error)
    return NextResponse.json(
      { error: 'Failed to update result' },
      { status: 500 }
    )
  }
}
