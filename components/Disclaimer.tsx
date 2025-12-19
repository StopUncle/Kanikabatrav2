'use client'

interface DisclaimerProps {
  variant?: 'full' | 'compact'
  className?: string
}

export default function Disclaimer({ variant = 'compact', className = '' }: DisclaimerProps) {
  if (variant === 'full') {
    return (
      <div className={`bg-deep-navy/50 border border-gray-800 rounded-lg p-6 ${className}`}>
        <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wide mb-3">
          Important Disclaimer
        </h3>
        <div className="space-y-3 text-sm text-gray-400 leading-relaxed">
          <p>
            The content on this website is for <strong className="text-gray-300">educational and entertainment purposes only</strong>.
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
          <div className="pt-3 border-t border-gray-800">
            <p className="text-xs text-gray-500">
              <strong>Crisis Resources:</strong> National Suicide Prevention Lifeline: 988 |
              Crisis Text Line: Text HOME to 741741 |
              International Association for Suicide Prevention: <a href="https://www.iasp.info/resources/Crisis_Centres/" target="_blank" rel="noopener noreferrer" className="text-accent-gold hover:underline">Find a crisis center</a>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <p className={`text-xs text-gray-500 italic ${className}`}>
      This content is for educational and entertainment purposes only and is not a substitute for professional mental health advice.
      <a href="/terms" className="text-accent-gold hover:underline ml-1">Read full disclaimer</a>
    </p>
  )
}
