import { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { generateServiceSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Dark Psychology Coaching | Transform Your Mind | Kanika Batra',
  description: 'One-on-one coaching sessions with a diagnosed sociopath. Mind Architecture, Presence & Influence, and Empire Psychology programs. Learn to think without emotion and wield power with precision.',
  keywords: 'dark psychology coaching, sociopath coaching, mind architecture, strategic psychology coaching, empire psychology, psychological transformation, kanika batra coaching',
  openGraph: {
    title: 'Dark Psychology Coaching - Transform Your Mind',
    description: 'One-on-one coaching sessions with a diagnosed sociopath. Learn to think without emotion and wield power with precision.',
    type: 'website',
    url: 'https://kanikarose.com/coaching',
    images: [{ url: 'https://kanikarose.com/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dark Psychology Coaching - Transform Your Mind',
    description: 'One-on-one coaching sessions with a diagnosed sociopath.',
    images: ['https://kanikarose.com/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://kanikarose.com/coaching',
  },
}

export default function CoachingLayout({ children }: { children: React.ReactNode }) {
  const serviceSchema = generateServiceSchema()

  return (
    <>
      <JsonLd data={serviceSchema} />
      {children}
    </>
  )
}
