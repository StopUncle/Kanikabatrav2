import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || 'Kanika Batra'
  const subtitle = searchParams.get('subtitle') || 'The Beautiful Sociopath'

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          backgroundImage: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a14 50%, #0f172a 100%)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 30% 20%, rgba(114, 33, 57, 0.3) 0%, transparent 50%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 70% 80%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 60px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 120,
              height: 120,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #d4af37 0%, #722139 100%)',
              marginBottom: 40,
              fontSize: 48,
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            KB
          </div>

          <div
            style={{
              fontSize: 56,
              fontWeight: 300,
              color: 'white',
              marginBottom: 16,
              lineHeight: 1.2,
              maxWidth: 900,
            }}
          >
            {title}
          </div>

          <div
            style={{
              fontSize: 28,
              background: 'linear-gradient(90deg, #d4af37, #722139)',
              backgroundClip: 'text',
              color: 'transparent',
              fontWeight: 400,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            {subtitle}
          </div>

          <div
            style={{
              marginTop: 40,
              fontSize: 20,
              color: '#a0a0a0',
            }}
          >
            kanikarose.com
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
