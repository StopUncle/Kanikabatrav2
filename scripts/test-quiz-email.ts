import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables FIRST
const envPath = path.resolve(process.cwd(), '.env.local')
console.log('Loading env from:', envPath)
dotenv.config({ path: envPath })
console.log('SMTP_USER loaded:', process.env.SMTP_USER ? 'Yes' : 'No')
console.log('SMTP_HOST:', process.env.SMTP_HOST)

async function testQuizEmail() {
  // Dynamic import AFTER env is loaded
  const { sendQuizResults } = await import('../lib/email')
  const { PERSONALITY_PROFILES } = await import('../lib/quiz-data')

  console.log('Sending test quiz results email to sdmatheson@outlook.com...')

  const testScores = {
    psychopathic: 72,
    sociopathic: 58,
    narcissistic: 45,
    borderline: 23,
    histrionic: 31,
    neurotypical: 15
  }

  const primaryType = 'psychopathic' as const
  const secondaryType = 'sociopathic' as const

  const primaryProfile = PERSONALITY_PROFILES[primaryType]
  const secondaryProfile = PERSONALITY_PROFILES[secondaryType]

  const emailResult = await sendQuizResults({
    email: 'sdmatheson@outlook.com',
    primaryType,
    secondaryType,
    scores: testScores,
    diagnosis: {
      clinicalLabel: 'Primary: Psychopathic (72%) - High Adaptive Function',
      functioningLevel: 'high',
      functioningScore: 85,
      description: 'Your profile indicates highly adaptive functioning. You demonstrate strong impulse control, consistent success patterns, and sophisticated self-awareness. This suggests you effectively channel your psychological patterns into productive outcomes while maintaining stable interpersonal relationships.'
    },
    primaryProfile: {
      name: primaryProfile.name,
      tagline: primaryProfile.tagline,
      description: primaryProfile.description,
      traits: primaryProfile.traits,
      strengths: primaryProfile.strengths,
      blindSpots: primaryProfile.blindSpots,
      relationshipPattern: primaryProfile.relationshipPattern
    },
    secondaryProfile: {
      name: secondaryProfile.name,
      tagline: secondaryProfile.tagline,
      description: secondaryProfile.description
    }
  })

  if (emailResult) {
    console.log('✅ Test email sent successfully to sdmatheson@outlook.com')
  } else {
    console.log('❌ Failed to send test email')
  }
}

testQuizEmail().catch(console.error)
