import { ImageResponse } from 'next/og'
import { prisma } from '@/lib/prisma'
import { resultProfiles, ResultType } from '@/lib/quiz-questions'

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

    const profile = resultProfiles[quizResult.resultType as ResultType]
    const scores = quizResult.scores as { narcissism: number; machiavellianism: number; psychopathy: number }

    const maxScore = 75
    const percentages = {
      narcissism: Math.round((scores.narcissism / maxScore) * 100),
      machiavellianism: Math.round((scores.machiavellianism / maxScore) * 100),
      psychopathy: Math.round((scores.psychopathy / maxScore) * 100),
    }

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
              Dark Triad Quiz Result
            </div>

            <div
              style={{
                fontSize: '72px',
                fontWeight: '200',
                color: '#ffffff',
                marginBottom: '10px',
              }}
            >
              {profile.title}
            </div>

            <div
              style={{
                fontSize: '28px',
                color: profile.color,
                marginBottom: '50px',
              }}
            >
              {profile.subtitle}
            </div>

            <div
              style={{
                display: 'flex',
                gap: '40px',
                marginBottom: '40px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: '36px',
                    fontWeight: '600',
                    color: '#fbbf24',
                  }}
                >
                  {percentages.narcissism}%
                </div>
                <div
                  style={{
                    fontSize: '14px',
                    color: '#a0a0a0',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                  }}
                >
                  Narcissism
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: '36px',
                    fontWeight: '600',
                    color: '#dc2626',
                  }}
                >
                  {percentages.machiavellianism}%
                </div>
                <div
                  style={{
                    fontSize: '14px',
                    color: '#a0a0a0',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                  }}
                >
                  Machiavellianism
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: '36px',
                    fontWeight: '600',
                    color: '#7c3aed',
                  }}
                >
                  {percentages.psychopathy}%
                </div>
                <div
                  style={{
                    fontSize: '14px',
                    color: '#a0a0a0',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                  }}
                >
                  Psychopathy
                </div>
              </div>
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
