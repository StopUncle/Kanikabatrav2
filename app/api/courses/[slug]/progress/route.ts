import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth/middleware'
import prisma from '@/lib/prisma'

interface RouteParams {
  params: Promise<{ slug: string }>
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  return requireAuth(request, async (_req, user) => {
    try {
      const { slug } = await params
      const { lessonId, watchedSeconds, isCompleted } = await request.json()

      if (!lessonId) {
        return NextResponse.json(
          { success: false, error: 'Lesson ID is required' },
          { status: 400 }
        )
      }

      const course = await prisma.course.findUnique({
        where: { slug }
      })

      if (!course) {
        return NextResponse.json(
          { success: false, error: 'Course not found' },
          { status: 404 }
        )
      }

      const enrollment = await prisma.courseEnrollment.findUnique({
        where: {
          courseId_userId: {
            courseId: course.id,
            userId: user.id
          },
          status: 'ACTIVE'
        }
      })

      if (!enrollment) {
        return NextResponse.json(
          { success: false, error: 'Not enrolled in this course' },
          { status: 403 }
        )
      }

      const lesson = await prisma.courseLesson.findUnique({
        where: { id: lessonId }
      })

      if (!lesson) {
        return NextResponse.json(
          { success: false, error: 'Lesson not found' },
          { status: 404 }
        )
      }

      const progress = await prisma.lessonProgress.upsert({
        where: {
          enrollmentId_lessonId: {
            enrollmentId: enrollment.id,
            lessonId
          }
        },
        create: {
          enrollmentId: enrollment.id,
          lessonId,
          watchedSeconds: watchedSeconds || 0,
          isCompleted: isCompleted || false,
          lastWatchedAt: new Date()
        },
        update: {
          watchedSeconds: watchedSeconds || undefined,
          isCompleted: isCompleted || undefined,
          lastWatchedAt: new Date()
        }
      })

      await prisma.courseEnrollment.update({
        where: { id: enrollment.id },
        data: { lastAccessedAt: new Date() }
      })

      return NextResponse.json({
        success: true,
        progress: {
          watchedSeconds: progress.watchedSeconds,
          isCompleted: progress.isCompleted,
          lastWatchedAt: progress.lastWatchedAt
        }
      })
    } catch (error) {
      console.error('Progress update error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to update progress' },
        { status: 500 }
      )
    }
  })
}
