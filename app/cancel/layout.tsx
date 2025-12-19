import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Payment Cancelled | Kanika Batra',
  description: 'Your payment was cancelled.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function CancelLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
