'use client'

import { useState, useCallback } from 'react'
import { Mail } from 'lucide-react'
import dynamic from 'next/dynamic'

// Lazy load heavy components
const BackgroundEffects = dynamic(() => import('@/components/BackgroundEffects'), {
  ssr: false
})
const Header = dynamic(() => import('@/components/Header'), {
  ssr: false
})

// Optimize icon imports - only load what we need
const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
    <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

const YouTubeIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)

const TikTokIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
)

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (_error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <BackgroundEffects />
      <Header />
      <div className="min-h-screen pt-32 pb-16 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-light mb-6">
            <span className="gradient-text">Get In Touch</span>
          </h1>
          <p className="text-text-gray text-lg md:text-xl max-w-3xl mx-auto">
            Ready to transform your psychology? Have questions about my methods?
            Let&apos;s discuss how I can help you sharpen your mindset.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-deep-black/30 backdrop-blur-sm border border-accent-gold/10 rounded-lg p-8">
            <h2 className="text-2xl font-light gradient-text-gold mb-6">Send a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-light text-text-gray mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-deep-black/50 border border-accent-gold/20 rounded-lg text-text-light placeholder-text-gray/50 focus:outline-none focus:border-accent-gold/50 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-light text-text-gray mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-deep-black/50 border border-accent-gold/20 rounded-lg text-text-light placeholder-text-gray/50 focus:outline-none focus:border-accent-gold/50 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-light text-text-gray mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-deep-black/50 border border-accent-gold/20 rounded-lg text-text-light focus:outline-none focus:border-accent-gold/50 transition-colors"
                >
                  <option value="">Select a subject</option>
                  <option value="coaching">Coaching Inquiry</option>
                  <option value="book">Book Related</option>
                  <option value="media">Media/Interview Request</option>
                  <option value="collaboration">Business Collaboration</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-light text-text-gray mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-deep-black/50 border border-accent-gold/20 rounded-lg text-text-light placeholder-text-gray/50 focus:outline-none focus:border-accent-gold/50 transition-colors resize-none"
                  placeholder="Tell me about your situation and what you're looking to achieve..."
                />
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-900/20 border border-green-600/30 rounded-lg text-green-400">
                  Message sent successfully! I&apos;ll get back to you within 24-48 hours.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-deep-burgundy/20 border border-deep-burgundy/30 rounded-lg text-red-400">
                  Failed to send message. Please try again or email me directly.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary rounded-full text-white py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Direct Contact */}
            <div className="bg-deep-black/30 backdrop-blur-sm border border-accent-gold/10 rounded-lg p-8">
              <h3 className="text-xl font-light gradient-text-gold mb-4">Direct Contact</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent-gold to-accent-gold/50 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-deep-black" />
                  </div>
                  <div>
                    <p className="text-text-light font-light">Email</p>
                    <a
                      href="mailto:Kanika@kanikarose.com"
                      className="text-text-gray hover:text-accent-gold transition-colors"
                    >
                      Kanika@kanikarose.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-deep-black/30 backdrop-blur-sm border border-accent-gold/10 rounded-lg p-8">
              <h3 className="text-xl font-light gradient-text-gold mb-4">Follow Me</h3>
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="https://instagram.com/kanikabatra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-deep-black/30 hover:bg-deep-black/50 transition-colors group"
                >
                  <InstagramIcon />
                  <span className="text-text-gray group-hover:text-text-light transition-colors">
                    Instagram
                  </span>
                </a>
                <a
                  href="https://www.youtube.com/@KanikaBatra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-deep-black/30 hover:bg-deep-black/50 transition-colors group"
                >
                  <YouTubeIcon />
                  <span className="text-text-gray group-hover:text-text-light transition-colors">
                    YouTube
                  </span>
                </a>
                <a
                  href="https://tiktok.com/@ogkanikabatra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-deep-black/30 hover:bg-deep-black/50 transition-colors group"
                >
                  <TikTokIcon />
                  <span className="text-text-gray group-hover:text-text-light transition-colors">
                    TikTok
                  </span>
                </a>
                <a
                  href="mailto:Kanika@kanikarose.com"
                  className="flex items-center gap-3 p-3 rounded-lg bg-deep-black/30 hover:bg-deep-black/50 transition-colors group"
                >
                  <Mail className="w-5 h-5 text-text-gray group-hover:text-accent-gold" />
                  <span className="text-text-gray group-hover:text-text-light transition-colors">
                    Email
                  </span>
                </a>
              </div>
            </div>

            {/* Response Times */}
            <div className="bg-deep-black/30 backdrop-blur-sm border border-accent-gold/10 rounded-lg p-8">
              <h3 className="text-xl font-light gradient-text-gold mb-4">Response Times</h3>
              <div className="space-y-3 text-text-gray">
                <div className="flex justify-between">
                  <span>Coaching Inquiries</span>
                  <span className="text-text-light">24 hours</span>
                </div>
                <div className="flex justify-between">
                  <span>General Questions</span>
                  <span className="text-text-light">48 hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Media Requests</span>
                  <span className="text-text-light">72 hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Collaboration</span>
                  <span className="text-text-light">1 week</span>
                </div>
              </div>
            </div>

            {/* Coaching Note */}
            <div className="bg-deep-black/30 backdrop-blur-sm border border-accent-gold/20 rounded-lg p-8">
              <h3 className="text-xl font-light gradient-text-gold mb-4">Coaching Availability</h3>
              <p className="text-text-gray leading-relaxed mb-4">
                Due to high demand, I&apos;m currently booking coaching sessions 2-3 weeks in advance.
              </p>
              <p className="text-text-gray leading-relaxed">
                For urgent psychological strategy needs, mention &ldquo;PRIORITY&rdquo; in your subject line—I reserve a few slots monthly for time-sensitive situations.
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}