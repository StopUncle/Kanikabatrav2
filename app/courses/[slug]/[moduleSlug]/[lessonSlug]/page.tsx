import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { verifyAccessToken } from '@/lib/auth/jwt'
import LessonPageClient from './LessonPageClient'
import prisma from '@/lib/prisma'

interface Props {
  params: Promise<{
    slug: string
    moduleSlug: string
    lessonSlug: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, moduleSlug, lessonSlug } = await params

  const lesson = await prisma.courseLesson.findFirst({
    where: {
      slug: lessonSlug,
      module: {
        slug: moduleSlug,
        course: { slug }
      }
    },
    include: {
      module: {
        include: { course: true }
      }
    }
  })

  if (!lesson) {
    return { title: 'Lesson Not Found' }
  }

  return {
    title: `${lesson.title} | ${lesson.module.course.title}`,
    description: lesson.description || `Watch ${lesson.title}`,
    robots: { index: false, follow: false }
  }
}

async function getLessonData(slug: string, moduleSlug: string, lessonSlug: string) {
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
              isFree: true
            }
          }
        }
      }
    }
  })

  if (!course) return null

  const courseModule = course.modules.find(m => m.slug === moduleSlug)
  if (!courseModule) return null

  const lesson = await prisma.courseLesson.findFirst({
    where: {
      slug: lessonSlug,
      moduleId: courseModule.id
    }
  })

  if (!lesson) return null

  return { course, module: courseModule, lesson }
}

async function getUserAccess(userId: string, courseId: string, lessonId: string) {
  const enrollment = await prisma.courseEnrollment.findUnique({
    where: {
      courseId_userId: { courseId, userId },
      status: 'ACTIVE'
    },
    include: {
      progress: {
        where: { lessonId }
      }
    }
  })

  return enrollment
}

function getAdjacentLessons(
  modules: { slug: string; lessons: { slug: string; title: string; isFree: boolean }[] }[],
  currentModuleSlug: string,
  currentLessonSlug: string,
  hasAccess: boolean
) {
  const allLessons: { moduleSlug: string; lessonSlug: string; title: string; isFree: boolean }[] = []

  modules.forEach(module => {
    module.lessons.forEach(lesson => {
      allLessons.push({
        moduleSlug: module.slug,
        lessonSlug: lesson.slug,
        title: lesson.title,
        isFree: lesson.isFree
      })
    })
  })

  const currentIndex = allLessons.findIndex(
    l => l.moduleSlug === currentModuleSlug && l.lessonSlug === currentLessonSlug
  )

  let prevLesson = null
  let nextLesson = null

  for (let i = currentIndex - 1; i >= 0; i--) {
    if (hasAccess || allLessons[i].isFree) {
      prevLesson = allLessons[i]
      break
    }
  }

  for (let i = currentIndex + 1; i < allLessons.length; i++) {
    if (hasAccess || allLessons[i].isFree) {
      nextLesson = allLessons[i]
      break
    }
  }

  return { prevLesson, nextLesson }
}

export default async function LessonPage({ params }: Props) {
  const { slug, moduleSlug, lessonSlug } = await params

  const data = await getLessonData(slug, moduleSlug, lessonSlug)
  if (!data) {
    notFound()
  }

  const { course, module, lesson } = data

  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  let userId: string | null = null
  let enrollment = null
  let hasAccess = lesson.isFree

  if (accessToken) {
    const payload = verifyAccessToken(accessToken)
    if (payload) {
      userId = payload.userId
      enrollment = await getUserAccess(payload.userId, course.id, lesson.id)
      hasAccess = !!enrollment || lesson.isFree
    }
  }

  if (!hasAccess) {
    redirect(`/courses/${slug}?locked=true`)
  }

  const modulesForNav = course.modules.map(m => ({
    id: m.id,
    title: m.title,
    slug: m.slug,
    lessons: m.lessons.map(l => ({
      ...l,
      isCompleted: false
    }))
  }))

  if (enrollment) {
    const allProgress = await prisma.lessonProgress.findMany({
      where: { enrollmentId: enrollment.id }
    })

    modulesForNav.forEach(m => {
      m.lessons.forEach(l => {
        const progress = allProgress.find(p => p.lessonId === l.id)
        if (progress) {
          l.isCompleted = progress.isCompleted
        }
      })
    })
  }

  const { prevLesson, nextLesson } = getAdjacentLessons(
    modulesForNav,
    moduleSlug,
    lessonSlug,
    !!enrollment
  )

  const currentProgress = enrollment?.progress[0]

  return (
    <LessonPageClient
      course={{
        id: course.id,
        title: course.title,
        slug: course.slug,
        tier: course.tier
      }}
      module={{
        id: module.id,
        title: module.title,
        slug: module.slug
      }}
      lesson={{
        id: lesson.id,
        title: lesson.title,
        slug: lesson.slug,
        description: lesson.description,
        videoUrl: lesson.videoUrl,
        textContent: lesson.textContent,
        duration: lesson.duration,
        isFree: lesson.isFree
      }}
      modules={modulesForNav}
      hasAccess={!!enrollment}
      isLoggedIn={!!userId}
      enrollmentId={enrollment?.id}
      initialProgress={{
        watchedSeconds: currentProgress?.watchedSeconds || 0,
        isCompleted: currentProgress?.isCompleted || false
      }}
      prevLesson={prevLesson}
      nextLesson={nextLesson}
    />
  )
}
