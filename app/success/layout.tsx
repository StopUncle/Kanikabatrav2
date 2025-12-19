import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Payment Successful | Kanika Batra',
  description: 'Your payment was processed successfully.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function SuccessLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
