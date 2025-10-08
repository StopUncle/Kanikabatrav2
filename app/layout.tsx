import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true
})

export const metadata: Metadata = {
  title: 'Kanika Batra - The Beautiful Sociopath',
  description: 'Diagnosed sociopath, beauty queen, and dark psychology expert. Learn the forbidden psychology that creates obsession and commands power.',
  keywords: 'Kanika Batra, sociopath, dark psychology, beauty queen, manipulation tactics, dark feminine energy',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Kanika Batra - The Beautiful Sociopath',
    description: 'Diagnosed sociopath, beauty queen, and dark psychology expert.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kanika Batra - The Beautiful Sociopath',
    description: 'Diagnosed sociopath, beauty queen, and dark psychology expert.',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#050511',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <link rel="dns-prefetch" href="https://www.paypal.com" />
        <link rel="preconnect" href="https://www.paypal.com" />
        <link rel="preconnect" href="https://www.paypalobjects.com" />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}