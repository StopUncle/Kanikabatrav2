'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward, Settings } from 'lucide-react'

interface LessonPlayerProps {
  videoUrl: string | null
  title: string
  onProgress?: (seconds: number) => void
  onComplete?: () => void
  initialPosition?: number
  duration?: number
}

export default function LessonPlayer({
  videoUrl,
  title: _title,
  onProgress,
  onComplete,
  initialPosition = 0,
  duration
}: LessonPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(initialPosition)
  const [videoDuration, setVideoDuration] = useState(duration || 0)
  const [showControls, setShowControls] = useState(true)
  const [_isFullscreen, setIsFullscreen] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [showSettings, setShowSettings] = useState(false)
  const controlsTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
      if (onProgress && Math.floor(video.currentTime) % 5 === 0) {
        onProgress(Math.floor(video.currentTime))
      }
    }

    const handleDurationChange = () => {
      setVideoDuration(video.duration)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      if (onComplete) {
        onComplete()
      }
    }

    const handleLoadedMetadata = () => {
      if (initialPosition > 0) {
        video.currentTime = initialPosition
      }
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('durationchange', handleDurationChange)
    video.addEventListener('ended', handleEnded)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('durationchange', handleDurationChange)
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
    }
  }, [initialPosition, onProgress, onComplete])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false)
      }
    }, 3000)
  }

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const toggleFullscreen = () => {
    const container = containerRef.current
    if (!container) return

    if (!document.fullscreenElement) {
      container.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current
    if (!video) return

    const time = parseFloat(e.target.value)
    video.currentTime = time
    setCurrentTime(time)
  }

  const skip = (seconds: number) => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = Math.max(0, Math.min(videoDuration, video.currentTime + seconds))
  }

  const changePlaybackRate = (rate: number) => {
    const video = videoRef.current
    if (!video) return

    video.playbackRate = rate
    setPlaybackRate(rate)
    setShowSettings(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!videoUrl) {
    return (
      <div className="aspect-video bg-deep-black/60 rounded-xl flex items-center justify-center">
        <p className="text-text-muted">Video not available</p>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="relative aspect-video bg-black rounded-xl overflow-hidden group"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-contain"
        onClick={togglePlay}
        playsInline
      />

      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={togglePlay}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-accent-gold/90 hover:bg-accent-gold transition-colors flex items-center justify-center"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 text-deep-black" />
            ) : (
              <Play className="w-8 h-8 text-deep-black ml-1" fill="currentColor" />
            )}
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="mb-3">
            <input
              type="range"
              min={0}
              max={videoDuration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent-gold"
              style={{
                background: `linear-gradient(to right, #d4af37 ${(currentTime / videoDuration) * 100}%, rgba(255,255,255,0.3) ${(currentTime / videoDuration) * 100}%)`
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={togglePlay}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-white" />
                ) : (
                  <Play className="w-5 h-5 text-white" fill="currentColor" />
                )}
              </button>

              <button
                onClick={() => skip(-10)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors hidden sm:block"
              >
                <SkipBack className="w-5 h-5 text-white" />
              </button>

              <button
                onClick={() => skip(10)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors hidden sm:block"
              >
                <SkipForward className="w-5 h-5 text-white" />
              </button>

              <button
                onClick={toggleMute}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-white" />
                ) : (
                  <Volume2 className="w-5 h-5 text-white" />
                )}
              </button>

              <span className="text-xs sm:text-sm text-white/80">
                {formatTime(currentTime)} / {formatTime(videoDuration)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Settings className="w-5 h-5 text-white" />
                </button>

                {showSettings && (
                  <div className="absolute bottom-full right-0 mb-2 bg-deep-black/95 border border-accent-gold/20 rounded-lg overflow-hidden min-w-[120px]">
                    <div className="px-3 py-2 text-xs text-text-muted border-b border-accent-gold/10">
                      Playback Speed
                    </div>
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map(rate => (
                      <button
                        key={rate}
                        onClick={() => changePlaybackRate(rate)}
                        className={`w-full px-3 py-2 text-left text-sm hover:bg-accent-gold/10 transition-colors ${
                          playbackRate === rate ? 'text-accent-gold' : 'text-white'
                        }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={toggleFullscreen}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Maximize className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
