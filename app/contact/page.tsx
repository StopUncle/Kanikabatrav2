import { Metadata } from 'next'
import ContactPageClient from './ContactPageClient'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Contact | Kanika Batra - Dark Psychology Expert',
  description: 'Get in touch with Kanika Batra for coaching inquiries, media requests, or business collaborations. Transform your psychology with expert guidance.',
  keywords: 'contact kanika batra, dark psychology coaching inquiry, media request, business collaboration',
  alternates: {
    canonical: `${SITE_CONFIG.url}/contact`,
  },
  openGraph: {
    title: 'Contact Kanika Batra',
    description: 'Ready to transform your psychology? Get in touch for coaching, media, or collaborations.',
    url: `${SITE_CONFIG.url}/contact`,
    type: 'website',
    images: [{
      url: `${SITE_CONFIG.url}/og-image.jpg`,
      width: 1200,
      height: 630,
      alt: 'Contact Kanika Batra',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Kanika Batra',
    description: 'Get in touch for coaching inquiries, media requests, or business collaborations.',
    images: [`${SITE_CONFIG.url}/og-image.jpg`],
  },
}

export default function ContactPage() {
  return <ContactPageClient />
}
