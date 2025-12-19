'use client'

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  items: FAQItem[]
  title?: string
  className?: string
}

export default function FAQSection({ items, title = 'Frequently Asked Questions', className = '' }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <section className={`${className}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {title && (
        <h2 className="text-2xl md:text-3xl font-light text-white mb-8">{title}</h2>
      )}

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="border border-gray-800 rounded-lg overflow-hidden bg-deep-navy/30 hover:border-gray-700 transition-colors"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center gap-4"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span className="font-medium text-white">{item.question}</span>
              <span
                className={`text-accent-gold flex-shrink-0 transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </button>
            <div
              id={`faq-answer-${index}`}
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="px-6 pb-4 text-gray-400 leading-relaxed">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function generateFAQSchema(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}
