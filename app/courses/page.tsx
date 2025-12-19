import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { verifyAccessToken } from '@/lib/auth/jwt'
import CoursesPageClient from './CoursesPageClient'
import prisma from '@/lib/prisma'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Courses | Kanika Batra - Dark Psychology Mastery',
  description: 'Master dark psychology with exclusive video courses. Learn manipulation detection, power dynamics, and psychological warfare from a diagnosed sociopath.',
  keywords: 'dark psychology course, manipulation course, power dynamics training, kanika batra courses',
  alternates: {
    canonical: `${SITE_CONFIG.url}/courses`,
  },
  openGraph: {
    title: 'Dark Psychology Courses | Kanika Batra',
    description: 'Exclusive video courses on dark psychology, manipulation, and power dynamics.',
    url: `${SITE_CONFIG.url}/courses`,
    type: 'website',
    images: [{
      url: `${SITE_CONFIG.url}/og-image.jpg`,
      width: 1200,
      height: 630,
      alt: 'Dark Psychology Courses',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dark Psychology Courses | Kanika Batra',
    description: 'Master manipulation detection and power dynamics from a diagnosed sociopath.',
    images: [`${SITE_CONFIG.url}/og-image.jpg`],
  },
}

async function getCourses() {
  const courses = await prisma.course.findMany({
    where: { isActive: true },
    include: {
      modules: {
        include: {
          lessons: {
            select: { id: true }
          }
        }
      }
    },
    orderBy: { sortOrder: 'asc' }
  })

  return courses.map(course => ({
    id: course.id,
    title: course.title,
    slug: course.slug,
    description: course.description,
    thumbnailUrl: course.thumbnailUrl,
    price: course.price,
    tier: course.tier,
    moduleCount: course.modules.length,
    lessonCount: course.modules.reduce((acc, m) => acc + m.lessons.length, 0)
  }))
}

async function getUserEnrollments(userId: string) {
  const enrollments = await prisma.courseEnrollment.findMany({
    where: {
      userId,
      status: 'ACTIVE'
    },
    include: {
      progress: true,
      course: {
        include: {
          modules: {
            include: {
              lessons: {
                select: { id: true }
              }
            }
          }
        }
      }
    }
  })

  return enrollments.map(enrollment => {
    const totalLessons = enrollment.course.modules.reduce(
      (acc, m) => acc + m.lessons.length,
      0
    )
    const completedLessons = enrollment.progress.filter(p => p.isCompleted).length
    const progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

    return {
      courseId: enrollment.courseId,
      progress
    }
  })
}

export default async function CoursesPage() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  let userId: string | null = null
  if (accessToken) {
    const payload = verifyAccessToken(accessToken)
    if (payload) {
      userId = payload.userId
    }
  }

  const courses = await getCourses()
  const enrollments = userId ? await getUserEnrollments(userId) : []

  return (
    <CoursesPageClient
      courses={courses}
      enrollments={enrollments}
      isLoggedIn={!!userId}
    />
  )
}
