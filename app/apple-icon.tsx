import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 180,
  height: 180,
}

export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 80,
          background: 'linear-gradient(135deg, #050511 0%, #1a0d11 50%, #050511 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Outer circle */}
        <div
          style={{
            position: 'absolute',
            width: '160px',
            height: '160px',
            border: '3px solid #d4af37',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Inner circle */}
          <div
            style={{
              width: '140px',
              height: '140px',
              border: '1px solid #d4af37',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, rgba(114,33,57,0.1) 100%)',
            }}
          >
            <span
              style={{
                background: 'linear-gradient(135deg, #d4af37, #fff5d6, #d4af37)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                fontFamily: 'serif',
                fontWeight: 'bold',
                letterSpacing: '-2px',
              }}
            >
              KB
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}