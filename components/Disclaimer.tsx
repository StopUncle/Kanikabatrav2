'use client'

import Link from 'next/link'

interface DisclaimerProps {
  variant?: 'full' | 'compact'
  className?: string
}

export default function Disclaimer({ variant = 'compact', className = '' }: DisclaimerProps) {
  if (variant === 'full') {
    return (
      <div className={`bg-gradient-to-br from-deep-black/80 to-deep-navy/40 border border-white/10 rounded-2xl p-8 ${className}`}>
        <div className="flex items-start gap-4 mb-5">
          <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-light text-white">
            Important Disclaimer
          </h3>
        </div>
        <div className="space-y-4 text-text-gray leading-relaxed">
          <p>
            The content on this website is for <strong className="text-text-light">educational and entertainment purposes only</strong>.
            It is not intended as a substitute for professional medical advice, diagnosis, or treatment.
          </p>
          <p>
            Kanika Batra is not a licensed mental health professional, therapist, or medical doctor.
            The perspectives shared are based on personal lived experience with Antisocial Personality Disorder (ASPD)
            and should not be considered clinical advice.
          </p>
          <p>
            If you are struggling with mental health issues, please seek help from a qualified
            healthcare provider. In case of emergency, contact your local emergency services or
            crisis hotline.
          </p>
          <div className="pt-5 mt-5 border-t border-white/10">
            <p className="text-xs text-text-gray/70">
              <strong className="text-text-gray">Crisis Resources:</strong> National Suicide Prevention Lifeline: 988 |
              Crisis Text Line: Text HOME to 741741 |
              International Association for Suicide Prevention: <a href="https://www.iasp.info/resources/Crisis_Centres/" target="_blank" rel="noopener noreferrer" className="text-accent-gold hover:underline">Find a crisis center</a>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex items-start gap-3 p-5 bg-white/5 border border-white/10 rounded-xl ${className}`}>
      <svg className="w-4 h-4 text-accent-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p className="text-sm text-text-gray leading-relaxed">
        This content is for educational and entertainment purposes only and is not a substitute for professional mental health advice.{' '}
        <Link href="/terms" className="text-accent-gold hover:text-accent-gold/80 transition-colors">
          Read full disclaimer
        </Link>
      </p>
    </div>
  )
}
