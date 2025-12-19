import { MetadataRoute } from 'next'

const BASE_URL = 'https://kanikarose.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard',
          '/login',
          '/register',
          '/success',
          '/cancel',
          '/coaching/success',
          '/coaching/cancel',
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
