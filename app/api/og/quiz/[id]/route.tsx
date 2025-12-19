import { ImageResponse } from 'next/og'
import { prisma } from '@/lib/prisma'
import { PERSONALITY_PROFILES, PersonalityType, QuizScores } from '@/lib/quiz-data'

export const runtime = 'edge'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params

  try {
    const quizResult = await prisma.quizResult.findUnique({
      where: { id },
    })

    if (!quizResult) {
      return new Response('Not found', { status: 404 })
    }

    const primaryType = quizResult.primaryType as PersonalityType
    const profile = PERSONALITY_PROFILES[primaryType]
    const scores = quizResult.scores as unknown as QuizScores

    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #0a0a0a 0%, #0f172a 50%, #1a0a14 100%)',
            fontFamily: 'system-ui',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '60px',
            }}
          >
            <div
              style={{
                fontSize: '24px',
                color: '#d4af37',
                textTransform: 'uppercase',
                letterSpacing: '4px',
                marginBottom: '20px',
              }}
            >
              Dark Mirror Assessment
            </div>

            <div
              style={{
                fontSize: '72px',
                fontWeight: '200',
                color: '#ffffff',
                marginBottom: '10px',
              }}
            >
              {profile.name}
            </div>

            <div
              style={{
                fontSize: '28px',
                color: '#d4af37',
                marginBottom: '50px',
                fontStyle: 'italic',
              }}
            >
              {profile.tagline}
            </div>

            <div
              style={{
                display: 'flex',
                gap: '30px',
                marginBottom: '40px',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {Object.entries(scores).map(([type, score]) => (
                <div
                  key={type}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      fontSize: '32px',
                      fontWeight: '600',
                      color: type === primaryType ? '#d4af37' : '#a0a0a0',
                    }}
                  >
                    {score}%
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: '#a0a0a0',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                    }}
                  >
                    {type.slice(0, 3).toUpperCase()}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                fontSize: '18px',
                color: '#a0a0a0',
                marginTop: '20px',
              }}
            >
              kanikabatra.com/quiz
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch {
    return new Response('Error generating image', { status: 500 })
  }
}
