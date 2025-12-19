import { cookies } from 'next/headers'
import { verifyAccessToken } from '@/lib/auth/jwt'
import { prisma } from '@/lib/prisma'
import { checkAccessTier } from '@/lib/community/access'
import CategoryCard from '@/components/community/forum/CategoryCard'

export const metadata = {
  title: 'Forum | Community | Kanika Batra',
  description: 'Browse forum categories and join discussions'
}

export default async function ForumPage() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value
  let userId: string | null = null

  if (accessToken) {
    const payload = verifyAccessToken(accessToken)
    if (payload) {
      userId = payload.userId
    }
  }

  const categories = await prisma.forumCategory.findMany({
    orderBy: { sortOrder: 'asc' },
    include: {
      _count: {
        select: { posts: true }
      }
    }
  })

  const categoriesWithAccess = await Promise.all(
    categories.map(async (category) => {
      const access = await checkAccessTier(userId, category.accessTier)
      return {
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        icon: category.icon,
        accessTier: category.accessTier,
        postCount: category._count.posts,
        hasAccess: access.hasAccess,
        accessReason: access.reason
      }
    })
  )

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Forum</h1>
        <p className="text-gray-400">
          Browse categories and join discussions on topics that interest you
        </p>
      </div>

      {categoriesWithAccess.length === 0 ? (
        <div className="text-center py-16 bg-deep-navy/30 border border-gray-800 rounded-xl">
          <p className="text-gray-500">No forum categories yet</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {categoriesWithAccess.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  )
}
