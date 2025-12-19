import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { PERSONALITY_PROFILES, PersonalityType, QuizScores } from '@/lib/quiz-data'

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

    const primaryType = quizResult.primaryType as PersonalityType
    const secondaryType = quizResult.secondaryType as PersonalityType | null
    const scores = quizResult.scores as unknown as QuizScores

    const primaryProfile = PERSONALITY_PROFILES[primaryType]
    const secondaryProfile = secondaryType ? PERSONALITY_PROFILES[secondaryType] : null

    return NextResponse.json({
      id: quizResult.id,
      email: quizResult.email,
      primaryType,
      secondaryType,
      scores,
      primaryProfile,
      secondaryProfile,
      paid: quizResult.paid,
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
