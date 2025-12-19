import { Metadata } from 'next'
import { getAllPosts, getAllCategories } from '@/lib/mdx'
import BlogClient from './BlogClient'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Blog | Kanika Batra - Dark Psychology Insights',
  description: 'Explore dark psychology, manipulation tactics, dating strategy, and power dynamics. Learn the forbidden knowledge that creates obsession and commands respect.',
  keywords: 'dark psychology blog, manipulation tactics, dating strategy, power dynamics, dark feminine energy, sociopath insights',
  alternates: {
    canonical: `${SITE_CONFIG.url}/blog`,
  },
  openGraph: {
    title: 'Blog | Kanika Batra - Dark Psychology Insights',
    description: 'Explore dark psychology, manipulation tactics, and power dynamics.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Kanika Batra',
    description: 'Dark psychology insights and dating strategy from a diagnosed sociopath.',
  },
}

export default function BlogPage() {
  const posts = getAllPosts()
  const categories = getAllCategories()

  return <BlogClient initialPosts={posts} categories={categories} />
}
