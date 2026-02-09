import { SITE_CONFIG, BOOK_INFO, COACHING_PACKAGES, SOCIAL_LINKS } from './constants'

const BASE_URL = 'https://kanikarose.com'

export interface BreadcrumbItem {
  name: string
  url: string
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: BASE_URL,
    logo: `${BASE_URL}/og-image.jpg`,
    description: SITE_CONFIG.description,
    sameAs: [
      SOCIAL_LINKS.instagram,
      SOCIAL_LINKS.youtube,
      SOCIAL_LINKS.tiktok,
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: SITE_CONFIG.email,
      contactType: 'customer service',
    },
  }
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: BASE_URL,
    description: SITE_CONFIG.description,
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
    },
  }
}

export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_CONFIG.name,
    alternateName: 'The Psychology of Power',
    description: SITE_CONFIG.description,
    url: `${BASE_URL}/about`,
    image: `${BASE_URL}/og-image.jpg`,
    jobTitle: 'Psychology of Power Expert & Author',
    sameAs: [
      SOCIAL_LINKS.instagram,
      SOCIAL_LINKS.youtube,
      SOCIAL_LINKS.tiktok,
    ],
    knowsAbout: [
      'Dark Psychology',
      'Dating Strategy',
      'Personal Branding',
      'Power Dynamics',
      'Manipulation Psychology',
    ],
  }
}

export function generateBookSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: BOOK_INFO.title,
    alternateName: BOOK_INFO.subtitle,
    description: BOOK_INFO.description,
    author: {
      '@type': 'Person',
      name: SITE_CONFIG.name,
    },
    url: `${BASE_URL}/book`,
    bookFormat: 'https://schema.org/EBook',
    numberOfPages: 250,
    genre: ['Self-Help', 'Psychology', 'Dating'],
    inLanguage: 'en',
    offers: [
      {
        '@type': 'Offer',
        price: BOOK_INFO.kdpPrice,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: BOOK_INFO.kdpLink,
        name: 'Amazon Kindle Edition',
      },
      {
        '@type': 'Offer',
        price: BOOK_INFO.price,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: `${BASE_URL}/book`,
        name: 'Premium Website Edition',
      },
    ],
  }
}

export function generateProductSchema(productType: 'book' | 'coaching', coachingId?: string) {
  if (productType === 'book') {
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: BOOK_INFO.title,
      description: BOOK_INFO.description,
      image: `${BASE_URL}/og-image.jpg`,
      brand: {
        '@type': 'Brand',
        name: SITE_CONFIG.name,
      },
      offers: {
        '@type': 'AggregateOffer',
        lowPrice: BOOK_INFO.kdpPrice,
        highPrice: BOOK_INFO.price,
        priceCurrency: 'USD',
        offerCount: 2,
      },
    }
  }

  const coaching = COACHING_PACKAGES.find((p) => p.id === coachingId) || COACHING_PACKAGES[0]
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: coaching.name,
    description: coaching.description,
    image: `${BASE_URL}/og-image.jpg`,
    brand: {
      '@type': 'Brand',
      name: SITE_CONFIG.name,
    },
    offers: {
      '@type': 'Offer',
      price: coaching.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  }
}

export function generateServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Coaching',
    provider: {
      '@type': 'Person',
      name: SITE_CONFIG.name,
    },
    url: `${BASE_URL}/coaching`,
    description: 'Premium strategic psychology coaching sessions for personal transformation',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Coaching Packages',
      itemListElement: COACHING_PACKAGES.map((pkg) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: pkg.name,
          description: pkg.description,
        },
        price: pkg.price,
        priceCurrency: 'USD',
      })),
    },
  }
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateArticleSchema(article: {
  title: string
  description: string
  publishedAt: string
  author?: string
  slug: string
  coverImage?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    author: {
      '@type': 'Person',
      name: article.author || SITE_CONFIG.name,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/og-image.jpg`,
      },
    },
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${article.slug}`,
    },
    image: article.coverImage || `${BASE_URL}/og-image.jpg`,
  }
}
