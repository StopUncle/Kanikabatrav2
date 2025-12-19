import { SITE_CONFIG, BOOK_INFO, COACHING_PACKAGES, SOCIAL_LINKS } from '@/lib/constants'

interface StructuredDataProps {
  type: 'website' | 'person' | 'product' | 'service' | 'article' | 'faq'
  data?: Record<string, unknown>
}

export function PersonSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Kanika Batra',
    alternateName: 'The Beautiful Sociopath',
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    image: `${SITE_CONFIG.url}/images/kanika-batra.jpg`,
    sameAs: [
      SOCIAL_LINKS.instagram,
      SOCIAL_LINKS.youtube,
      SOCIAL_LINKS.tiktok
    ],
    jobTitle: 'Dark Psychology Expert',
    knowsAbout: [
      'Dark Psychology',
      'Manipulation Tactics',
      'Power Dynamics',
      'Seduction Psychology',
      'Dark Triad Personality'
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    alternateName: SITE_CONFIG.title,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    publisher: {
      '@type': 'Person',
      name: 'Kanika Batra'
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_CONFIG.url}/blog?search={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function BookProductSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: BOOK_INFO.title,
    description: BOOK_INFO.description,
    image: `${SITE_CONFIG.url}/images/book-cover.jpg`,
    brand: {
      '@type': 'Brand',
      name: 'Kanika Batra'
    },
    author: {
      '@type': 'Person',
      name: 'Kanika Batra'
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'Premium Edition',
        price: BOOK_INFO.price,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: `${SITE_CONFIG.url}/book`,
        seller: {
          '@type': 'Person',
          name: 'Kanika Batra'
        }
      },
      {
        '@type': 'Offer',
        name: 'Kindle Edition',
        price: BOOK_INFO.kdpPrice,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: BOOK_INFO.kdpLink,
        seller: {
          '@type': 'Organization',
          name: 'Amazon'
        }
      }
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1'
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function CoachingServiceSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Private Coaching',
    name: 'Dark Psychology Coaching',
    description: 'One-on-one coaching sessions with a diagnosed sociopath. Transform your psychology and master power dynamics.',
    provider: {
      '@type': 'Person',
      name: 'Kanika Batra',
      url: SITE_CONFIG.url
    },
    offers: COACHING_PACKAGES.map(pkg => ({
      '@type': 'Offer',
      name: pkg.name,
      description: pkg.description,
      price: pkg.price,
      priceCurrency: 'USD',
      eligibleDuration: {
        '@type': 'QuantitativeValue',
        value: parseInt(pkg.duration),
        unitText: 'minutes'
      }
    })),
    areaServed: {
      '@type': 'Country',
      name: 'Worldwide'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Coaching Packages',
      itemListElement: COACHING_PACKAGES.map((pkg, index) => ({
        '@type': 'OfferCatalogItem',
        position: index + 1,
        itemOffered: {
          '@type': 'Service',
          name: pkg.name,
          description: pkg.description
        }
      }))
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface ArticleSchemaProps {
  title: string
  description: string
  publishedAt: string
  author?: string
  image?: string
  slug: string
}

export function ArticleSchema({ title, description, publishedAt, author = 'Kanika Batra', image, slug }: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: image || `${SITE_CONFIG.url}/images/blog-default.jpg`,
    author: {
      '@type': 'Person',
      name: author,
      url: SITE_CONFIG.url
    },
    publisher: {
      '@type': 'Person',
      name: 'Kanika Batra',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/logo.png`
      }
    },
    datePublished: publishedAt,
    dateModified: publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_CONFIG.url}/blog/${slug}`
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface FAQItem {
  question: string
  answer: string
}

interface FAQSchemaProps {
  faqs: FAQItem[]
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function QuizSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: 'Dark Triad Personality Quiz',
    description: 'Discover which Dark Triad personality type dominates your psychology. Are you a Narcissist, Machiavellian, or Psychopath?',
    educationalLevel: 'All',
    about: {
      '@type': 'Thing',
      name: 'Dark Triad Personality',
      description: 'The Dark Triad is a psychological construct that describes three personality traits: narcissism, Machiavellianism, and psychopathy.'
    },
    creator: {
      '@type': 'Person',
      name: 'Kanika Batra'
    },
    numberOfQuestions: 15
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  switch (type) {
    case 'website':
      return <WebsiteSchema />
    case 'person':
      return <PersonSchema />
    case 'product':
      return <BookProductSchema />
    case 'service':
      return <CoachingServiceSchema />
    case 'article':
      if (!data) return null
      return <ArticleSchema {...(data as unknown as ArticleSchemaProps)} />
    case 'faq':
      if (!data) return null
      return <FAQSchema {...(data as unknown as FAQSchemaProps)} />
    default:
      return null
  }
}
