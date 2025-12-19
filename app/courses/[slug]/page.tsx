import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { verifyAccessToken } from '@/lib/auth/jwt'
import CourseDetailClient from './CourseDetailClient'
import prisma from '@/lib/prisma'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const course = await prisma.course.findUnique({
    where: { slug },
    select: { title: true, description: true }
  })

  if (!course) {
    return { title: 'Course Not Found' }
  }

  return {
    title: `${course.title} | Kanika Batra Courses`,
    description: course.description || `Learn ${course.title} with Kanika Batra`,
    openGraph: {
      title: course.title,
      description: course.description || `Learn ${course.title}`,
      type: 'website',
    },
  }
}

async function getCourse(slug: string) {
  const course = await prisma.course.findUnique({
    where: { slug, isActive: true },
    include: {
      modules: {
        orderBy: { sortOrder: 'asc' },
        include: {
          lessons: {
            orderBy: { sortOrder: 'asc' },
            select: {
              id: true,
              title: true,
              slug: true,
              description: true,
              duration: true,
              isFree: true
            }
          }
        }
      }
    }
  })

  return course
}

async function getUserAccess(userId: string, courseId: string) {
  const enrollment = await prisma.courseEnrollment.findUnique({
    where: {
      courseId_userId: {
        courseId,
        userId
      },
      status: 'ACTIVE'
    },
    include: {
      subscription: true,
      progress: true
    }
  })

  return enrollment
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params
  const course = await getCourse(slug)

  if (!course) {
    notFound()
  }

  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  let userId: string | null = null
  let enrollment = null

  if (accessToken) {
    const payload = verifyAccessToken(accessToken)
    if (payload) {
      userId = payload.userId
      enrollment = await getUserAccess(payload.userId, course.id)
    }
  }

  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0)
  const completedLessons = enrollment?.progress.filter(p => p.isCompleted).length || 0
  const progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

  const modulesWithProgress = course.modules.map(module => ({
    ...module,
    lessons: module.lessons.map(lesson => {
      const lessonProgress = enrollment?.progress.find(p => p.lessonId === lesson.id)
      return {
        ...lesson,
        isCompleted: lessonProgress?.isCompleted || false,
        watchedSeconds: lessonProgress?.watchedSeconds || 0
      }
    })
  }))

  return (
    <CourseDetailClient
      course={{
        id: course.id,
        title: course.title,
        slug: course.slug,
        description: course.description,
        thumbnailUrl: course.thumbnailUrl,
        price: course.price,
        tier: course.tier
      }}
      modules={modulesWithProgress}
      hasAccess={!!enrollment}
      subscriptionStatus={enrollment?.subscription?.status}
      progress={progress}
      isLoggedIn={!!userId}
      totalLessons={totalLessons}
      completedLessons={completedLessons}
    />
  )
}
