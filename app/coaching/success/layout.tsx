import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Coaching Session Confirmed | Kanika Batra',
  description: 'Your coaching session has been confirmed.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function CoachingSuccessLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
