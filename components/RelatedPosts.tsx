import Link from 'next/link'
import Image from 'next/image'

interface RelatedPost {
  slug: string
  title: string
  excerpt: string
  coverImage?: string
  category?: string
  publishedAt: string
}

interface RelatedPostsProps {
  posts: RelatedPost[]
  title?: string
  className?: string
}

export default function RelatedPosts({ posts, title = 'Related Articles', className = '' }: RelatedPostsProps) {
  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <section className={`${className}`}>
      <h2 className="text-xl md:text-2xl font-light text-white mb-6">{title}</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {posts.slice(0, 3).map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block bg-deep-navy/30 border border-gray-800 rounded-lg overflow-hidden hover:border-accent-burgundy/50 transition-colors"
          >
            {post.coverImage && (
              <div className="relative aspect-video bg-gray-900">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {post.category && (
                  <span className="absolute top-2 left-2 text-xs px-2 py-1 bg-accent-burgundy/80 rounded text-white">
                    {post.category}
                  </span>
                )}
              </div>
            )}

            <div className="p-4">
              <h3 className="font-medium text-white group-hover:text-accent-gold transition-colors line-clamp-2 mb-2">
                {post.title}
              </h3>
              <p className="text-sm text-gray-400 line-clamp-2">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

interface PostNavigationProps {
  previousPost?: { slug: string; title: string } | null
  nextPost?: { slug: string; title: string } | null
  className?: string
}

export function PostNavigation({ previousPost, nextPost, className = '' }: PostNavigationProps) {
  if (!previousPost && !nextPost) {
    return null
  }

  return (
    <nav className={`flex justify-between gap-4 ${className}`} aria-label="Post navigation">
      {previousPost ? (
        <Link
          href={`/blog/${previousPost.slug}`}
          className="flex-1 group p-4 bg-deep-navy/30 border border-gray-800 rounded-lg hover:border-accent-burgundy/50 transition-colors"
        >
          <span className="text-xs text-gray-500 uppercase tracking-wide">Previous</span>
          <p className="text-white group-hover:text-accent-gold transition-colors line-clamp-1 mt-1">
            &larr; {previousPost.title}
          </p>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {nextPost ? (
        <Link
          href={`/blog/${nextPost.slug}`}
          className="flex-1 group p-4 bg-deep-navy/30 border border-gray-800 rounded-lg hover:border-accent-burgundy/50 transition-colors text-right"
        >
          <span className="text-xs text-gray-500 uppercase tracking-wide">Next</span>
          <p className="text-white group-hover:text-accent-gold transition-colors line-clamp-1 mt-1">
            {nextPost.title} &rarr;
          </p>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  )
}

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `${process.env.NEXT_PUBLIC_BASE_URL || 'https://kanikarose.com'}${item.href}` : undefined,
    })),
  }

  return (
    <nav aria-label="Breadcrumb" className={`${className}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <ol className="flex items-center gap-2 text-sm text-gray-400">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && (
              <span className="text-gray-600">/</span>
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-accent-gold transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-300">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
