'use client'

interface DoubleEchoLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animate?: boolean
  className?: string
}

export default function DoubleEchoLogo({ size = 'md', className = '' }: DoubleEchoLogoProps) {
  const sizeMap = {
    sm: { width: 28, height: 28, fontSize: '11px' },
    md: { width: 36, height: 36, fontSize: '14px' },
    lg: { width: 48, height: 48, fontSize: '18px' },
    xl: { width: 64, height: 64, fontSize: '24px' },
  }

  const { width, height, fontSize } = sizeMap[size]

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 36 36"
      className={className}
    >
      <rect
        x="1"
        y="1"
        width="34"
        height="34"
        rx="4"
        fill="none"
        stroke="#d4af37"
        strokeWidth="1.5"
      />
      <text
        x="18"
        y="19"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#d4af37"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="700"
        fontSize={fontSize}
        letterSpacing="1"
      >
        KB
      </text>
    </svg>
  )
}
