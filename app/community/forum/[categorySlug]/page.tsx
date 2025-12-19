import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { verifyAccessToken } from '@/lib/auth/jwt'
import { prisma } from '@/lib/prisma'
import { checkAccessTier } from '@/lib/community/access'
import PostCard from '@/components/community/forum/PostCard'
import AccessGate from '@/components/community/access/AccessGate'
import { Plus, ArrowLeft } from 'lucide-react'

interface Props {
  params: Promise<{ categorySlug: string }>
  searchParams: Promise<{ sort?: string }>
}

export async function generateMetadata({ params }: Props) {
  const { categorySlug } = await params
  const category = await prisma.forumCategory.findUnique({
    where: { slug: categorySlug }
  })

  if (!category) {
    return { title: 'Category Not Found' }
  }

  return {
    title: `${category.name} | Forum | Kanika Batra`,
    description: category.description || `Browse posts in ${category.name}`
  }
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { categorySlug } = await params
  const { sort = 'latest' } = await searchParams

  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value
  let userId: string | null = null

  if (accessToken) {
    const payload = verifyAccessToken(accessToken)
    if (payload) {
      userId = payload.userId
    }
  }

  const category = await prisma.forumCategory.findUnique({
    where: { slug: categorySlug }
  })

  if (!category) {
    notFound()
  }

  const access = await checkAccessTier(userId, category.accessTier)

  if (!access.hasAccess) {
    return (
      <AccessGate
        hasAccess={false}
        requiredTier={category.accessTier}
        reason={access.reason}
        upgradeUrl={access.upgradeUrl}
      />
    )
  }

  const orderBy = sort === 'popular'
    ? { likeCount: 'desc' as const }
    : sort === 'active'
      ? { lastReplyAt: 'desc' as const }
      : { createdAt: 'desc' as const }

  const posts = await prisma.forumPost.findMany({
    where: { categoryId: category.id },
    orderBy: [
      { isPinned: 'desc' },
      orderBy
    ],
    include: {
      author: {
        select: {
          id: true,
          name: true,
          displayName: true,
          avatarUrl: true
        }
      },
      _count: {
        select: { replies: true }
      }
    },
    take: 20
  })

  const formattedPosts = posts.map(post => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    content: post.content,
    isPinned: post.isPinned,
    viewCount: post.viewCount,
    likeCount: post.likeCount,
    replyCount: post._count.replies,
    createdAt: post.createdAt.toISOString(),
    author: post.author
  }))

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/community/forum"
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Forum
        </Link>

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              {category.icon && <span className="text-3xl">{category.icon}</span>}
              <h1 className="text-3xl font-bold text-white">{category.name}</h1>
            </div>
            {category.description && (
              <p className="text-gray-400 mt-2">{category.description}</p>
            )}
          </div>

          {userId && (
            <Link
              href={`/community/forum/${categorySlug}/new`}
              className="flex items-center gap-2 px-4 py-2 bg-accent-gold text-deep-black rounded-lg font-medium hover:bg-accent-gold/90"
            >
              <Plus className="w-5 h-5" />
              New Post
            </Link>
          )}
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {['latest', 'popular', 'active'].map((sortOption) => (
          <Link
            key={sortOption}
            href={`/community/forum/${categorySlug}?sort=${sortOption}`}
            className={`
              px-4 py-2 rounded-lg text-sm transition-colors
              ${sort === sortOption
                ? 'bg-accent-burgundy/30 text-accent-gold'
                : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800'
              }
            `}
          >
            {sortOption.charAt(0).toUpperCase() + sortOption.slice(1)}
          </Link>
        ))}
      </div>

      {formattedPosts.length === 0 ? (
        <div className="text-center py-16 bg-deep-navy/30 border border-gray-800 rounded-xl">
          <p className="text-gray-500 mb-4">No posts yet in this category</p>
          {userId && (
            <Link
              href={`/community/forum/${categorySlug}/new`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent-gold text-deep-black rounded-lg font-medium hover:bg-accent-gold/90"
            >
              <Plus className="w-5 h-5" />
              Create the First Post
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {formattedPosts.map((post) => (
            <PostCard key={post.id} post={post} categorySlug={categorySlug} />
          ))}
        </div>
      )}
    </div>
  )
}
