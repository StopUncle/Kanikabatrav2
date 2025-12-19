import Link from 'next/link'

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
      <h2 className="text-xl md:text-2xl font-light text-white mb-8">{title}</h2>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {posts.slice(0, 3).map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block bg-gradient-to-br from-deep-black/80 to-deep-navy/40 border border-white/10 rounded-xl overflow-hidden hover:border-accent-gold/30 transition-all duration-300"
          >
            {post.coverImage && (
              <div className="relative h-40 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url(${post.coverImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-black to-transparent" />
                {post.category && (
                  <span className="absolute bottom-3 left-3 text-xs px-3 py-1 bg-accent-gold/90 rounded-full text-deep-black font-medium">
                    {post.category}
                  </span>
                )}
              </div>
            )}

            <div className="p-5">
              <h3 className="font-light text-lg text-white group-hover:text-accent-gold transition-colors line-clamp-2 mb-3 leading-snug">
                {post.title}
              </h3>
              <p className="text-sm text-text-gray line-clamp-2 leading-relaxed">{post.excerpt}</p>
              <time className="block text-xs text-text-gray/70 mt-4">
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
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
    <nav className={`grid md:grid-cols-2 gap-4 ${className}`} aria-label="Post navigation">
      {previousPost ? (
        <Link
          href={`/blog/${previousPost.slug}`}
          className="group p-6 bg-gradient-to-br from-deep-black/80 to-deep-navy/40 border border-white/10 rounded-xl hover:border-accent-gold/30 transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-3">
            <svg className="w-4 h-4 text-accent-gold group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-xs text-text-gray uppercase tracking-wider">Previous Article</span>
          </div>
          <p className="text-white group-hover:text-accent-gold transition-colors line-clamp-2 font-light">
            {previousPost.title}
          </p>
        </Link>
      ) : (
        <div />
      )}

      {nextPost ? (
        <Link
          href={`/blog/${nextPost.slug}`}
          className="group p-6 bg-gradient-to-br from-deep-black/80 to-deep-navy/40 border border-white/10 rounded-xl hover:border-accent-gold/30 transition-all duration-300 text-right"
        >
          <div className="flex items-center justify-end gap-3 mb-3">
            <span className="text-xs text-text-gray uppercase tracking-wider">Next Article</span>
            <svg className="w-4 h-4 text-accent-gold group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <p className="text-white group-hover:text-accent-gold transition-colors line-clamp-2 font-light">
            {nextPost.title}
          </p>
        </Link>
      ) : (
        <div />
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

      <ol className="flex flex-wrap items-center gap-2 text-sm text-text-gray">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && (
              <svg className="w-3 h-3 text-text-gray/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-accent-gold transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-text-gray/70 truncate max-w-[200px]">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
