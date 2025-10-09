'use client'

import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'

interface CountdownTimerProps {
  targetDate: string
  className?: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function CountdownTimer({ targetDate, className = '' }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const now = new Date().getTime()
      const target = new Date(targetDate).getTime()
      const difference = target - now

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      }
    }

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    setTimeLeft(calculateTimeLeft())

    return () => clearInterval(timer)
  }, [targetDate])

  if (!mounted) {
    return null
  }

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ]

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <Clock className="text-accent-gold" size={20} />
      <div className="flex gap-2 sm:gap-4">
        {timeUnits.map((unit, index) => (
          <div key={unit.label} className="flex items-center gap-2">
            <div className="flex flex-col items-center">
              <div className="bg-gradient-to-br from-accent-burgundy/30 to-deep-burgundy/20 border border-accent-gold/30 rounded-lg px-2 sm:px-3 py-1 sm:py-2 min-w-[40px] sm:min-w-[60px]">
                <span className="text-xl sm:text-2xl md:text-3xl font-light gradient-text-gold tabular-nums">
                  {String(unit.value).padStart(2, '0')}
                </span>
              </div>
              <span className="text-[10px] sm:text-xs text-text-gray mt-1 uppercase tracking-wider">
                {unit.label}
              </span>
            </div>
            {index < timeUnits.length - 1 && (
              <span className="text-accent-gold text-lg sm:text-xl font-light self-start mt-1">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
