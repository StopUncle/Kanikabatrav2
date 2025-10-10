import { Metadata } from 'next'
import BackgroundEffects from '@/components/BackgroundEffects'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import BookShowcase from '@/components/BookShowcase'
import CoachingTiers from '@/components/CoachingTiers'
import Testimonial from '@/components/Testimonial'
import NewsletterForm from '@/components/NewsletterForm'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} - ${SITE_CONFIG.title}`,
  description: SITE_CONFIG.description,
  keywords: [
    'Kanika Batra',
    'sociopath',
    'dark psychology',
    'beauty queen',
    'manipulation tactics',
    'dark feminine energy',
    'personal transformation',
    'psychological warfare',
    'ASPD',
    'antisocial personality disorder',
  ],
  authors: [{ name: SITE_CONFIG.name }],
  openGraph: {
    title: `${SITE_CONFIG.name} - ${SITE_CONFIG.title}`,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - ${SITE_CONFIG.title}`,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.name} - ${SITE_CONFIG.title}`,
    description: SITE_CONFIG.description,
    images: ['/og-image.jpg'],
  },
}

export default function Home() {
  return (
    <>
      {/* Background Effects - Aurora, Orbs, and Particles */}
      <BackgroundEffects />

      {/* Header Navigation */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10 pt-20">
        {/* Hero Section */}
        <Hero />
        
        {/* Book Showcase Section */}
        <BookShowcase />
        
        {/* Testimonial Section */}
        <section id="testimonials">
          <Testimonial />
        </section>
        
        {/* Coaching Section */}
        <section id="coaching" className="py-32 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-light mb-6">
                <span className="gradient-text">Elite Transformation</span>
              </h2>
              <p className="text-text-gray text-lg md:text-xl max-w-3xl mx-auto italic">
                Personal mentorship from the master of manipulation
              </p>
            </div>
            
            {/* Coaching Tiers Component */}
            <CoachingTiers />
            
            {/* CTA for Coaching */}
            <div className="text-center mt-12">
              <p className="text-text-gray mb-6">
                Ready to transform your darkness into your greatest asset?
              </p>
              <a
                href="/coaching"
                className="btn-primary rounded-full inline-block text-white px-8 py-4"
              >
                Explore All Coaching Options
              </a>
            </div>
          </div>
        </section>
        
        {/* Social Proof Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-transparent via-deep-burgundy/5 to-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-4xl font-light gradient-text-gold">500K+</div>
                <p className="text-text-gray">Followers</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-light gradient-text-gold">5.9M+</div>
                <p className="text-text-gray">TikTok Likes</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-light gradient-text-gold">20.6M+</div>
                <p className="text-text-gray">YouTube Views</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Final CTA Section */}
        <section className="py-32 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-light mb-6">
                <span className="text-text-light">Ready to Embrace Your</span>
                <br />
                <span className="gradient-text">Dark Side?</span>
              </h2>
              <p className="text-text-gray text-lg mb-8 max-w-2xl mx-auto">
                Join thousands who have discovered the power of understanding and wielding 
                their darkness. Your transformation begins with a single decision.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/book"
                  className="btn-primary rounded-full text-white px-8 py-4 inline-block"
                >
                  Get &ldquo;Sociopathic Dating Bible&rdquo;
                </a>
                <a
                  href="/coaching"
                  className="btn-secondary rounded-full px-8 py-4 inline-block"
                >
                  Private Coaching
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="py-20 px-4 border-t border-accent-gold/10">
          <div className="max-w-3xl mx-auto text-center">
            <div>
              <h3 className="text-2xl font-light mb-4 gradient-text-gold">
                Stay Connected with the Darkness
              </h3>
              <p className="text-text-gray mb-8">
                Get exclusive insights, manipulation tactics, and dark psychology tips delivered to your inbox.
              </p>
              <NewsletterForm />
              <p className="text-text-gray text-sm mt-4">
                No spam. Only darkness. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}