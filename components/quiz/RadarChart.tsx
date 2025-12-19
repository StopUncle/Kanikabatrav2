'use client'

import { QuizScores, PersonalityType } from '@/lib/quiz-data'

interface RadarChartProps {
  scores: QuizScores
  size?: number
  showLabels?: boolean
  showValues?: boolean
}

const TYPES: { key: PersonalityType; label: string; shortLabel: string }[] = [
  { key: 'psychopathic', label: 'Psychopathic', shortLabel: 'PSY' },
  { key: 'sociopathic', label: 'Sociopathic', shortLabel: 'SOC' },
  { key: 'narcissistic', label: 'Narcissistic', shortLabel: 'NAR' },
  { key: 'borderline', label: 'Borderline', shortLabel: 'BOR' },
  { key: 'histrionic', label: 'Histrionic', shortLabel: 'HIS' },
  { key: 'neurotypical', label: 'Neurotypical', shortLabel: 'NT' },
]

export default function RadarChart({
  scores,
  size = 300,
  showLabels = true,
  showValues = false
}: RadarChartProps) {
  const centerX = size / 2
  const centerY = size / 2
  const radius = size * 0.35
  const numPoints = 6
  const angleStep = (2 * Math.PI) / numPoints
  const startAngle = -Math.PI / 2 // Start from top

  // Calculate point positions for each score
  const getPoint = (index: number, value: number) => {
    const angle = startAngle + index * angleStep
    const normalizedRadius = (value / 100) * radius
    return {
      x: centerX + normalizedRadius * Math.cos(angle),
      y: centerY + normalizedRadius * Math.sin(angle)
    }
  }

  // Generate polygon points for the data
  const dataPoints = TYPES.map((type, i) => {
    const value = scores[type.key]
    return getPoint(i, value)
  })

  const dataPath = dataPoints
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ') + ' Z'

  // Generate grid lines (20%, 40%, 60%, 80%, 100%)
  const gridLevels = [20, 40, 60, 80, 100]

  // Generate axis lines and labels
  const axisPoints = TYPES.map((_, i) => {
    const angle = startAngle + i * angleStep
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
      labelX: centerX + (radius + 25) * Math.cos(angle),
      labelY: centerY + (radius + 25) * Math.sin(angle)
    }
  })

  return (
    <div className="flex justify-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#722139" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="radarStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#e8c4c4" />
          </linearGradient>
        </defs>

        {/* Grid hexagons */}
        {gridLevels.map((level) => {
          const r = (level / 100) * radius
          const gridPoints = TYPES.map((_, i) => {
            const angle = startAngle + i * angleStep
            return {
              x: centerX + r * Math.cos(angle),
              y: centerY + r * Math.sin(angle)
            }
          })
          const gridPath = gridPoints
            .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
            .join(' ') + ' Z'

          return (
            <path
              key={level}
              d={gridPath}
              fill="none"
              stroke="#d4af37"
              strokeWidth="0.5"
              strokeOpacity="0.2"
            />
          )
        })}

        {/* Axis lines */}
        {axisPoints.map((point, i) => (
          <line
            key={`axis-${i}`}
            x1={centerX}
            y1={centerY}
            x2={point.x}
            y2={point.y}
            stroke="#d4af37"
            strokeWidth="0.5"
            strokeOpacity="0.3"
          />
        ))}

        {/* Data polygon */}
        <path
          d={dataPath}
          fill="url(#radarGradient)"
          stroke="url(#radarStroke)"
          strokeWidth="2"
        />

        {/* Data points */}
        {dataPoints.map((point, i) => (
          <circle
            key={`point-${i}`}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="#d4af37"
            stroke="#0a0a0a"
            strokeWidth="2"
          />
        ))}

        {/* Labels */}
        {showLabels && axisPoints.map((point, i) => {
          const type = TYPES[i]
          const value = scores[type.key]

          // Adjust text anchor based on position
          let textAnchor: 'start' | 'middle' | 'end' = 'middle'
          if (point.labelX < centerX - 10) textAnchor = 'end'
          else if (point.labelX > centerX + 10) textAnchor = 'start'

          // Adjust vertical position
          let dy = '0.35em'
          if (point.labelY < centerY - 20) dy = '0em'
          else if (point.labelY > centerY + 20) dy = '0.7em'

          return (
            <g key={`label-${i}`}>
              <text
                x={point.labelX}
                y={point.labelY}
                textAnchor={textAnchor}
                dy={dy}
                className="text-xs fill-text-gray"
                style={{ fontSize: '10px' }}
              >
                {type.label}
              </text>
              {showValues && (
                <text
                  x={point.labelX}
                  y={point.labelY + 12}
                  textAnchor={textAnchor}
                  className="text-xs fill-accent-gold font-medium"
                  style={{ fontSize: '9px' }}
                >
                  {value}%
                </text>
              )}
            </g>
          )
        })}

        {/* Center point */}
        <circle
          cx={centerX}
          cy={centerY}
          r="3"
          fill="#d4af37"
          fillOpacity="0.5"
        />
      </svg>
    </div>
  )
}
