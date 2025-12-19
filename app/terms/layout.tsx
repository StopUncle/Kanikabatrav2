import { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Terms of Service | Kanika Batra',
  description: 'Terms and conditions for using Kanika Batra\'s website, coaching services, and digital products including the Sociopathic Dating Bible.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/terms`,
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: 'Terms of Service | Kanika Batra',
    description: 'Terms and conditions for using Kanika Batra\'s website, coaching services, and digital products.',
    url: `${SITE_CONFIG.url}/terms`,
    type: 'website',
  },
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
