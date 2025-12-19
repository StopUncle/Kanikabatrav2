import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Coaching Session Cancelled | Kanika Batra',
  description: 'Your coaching session was cancelled.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function CoachingCancelLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
