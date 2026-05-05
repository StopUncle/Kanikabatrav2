"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Mic } from "lucide-react";

interface VoiceNotePlayerProps {
  src: string;
}

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function VoiceNotePlayer({ src }: VoiceNotePlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);

    // MediaRecorder webm/opus blobs (and some iOS audio/mp4 recordings)
    // ship without duration metadata in their container header. The
    // browser reports audio.duration === Infinity until the stream is
    // walked. The fix: when metadata loads with non-finite duration,
    // seek past plausible end. Browser walks the file to find the
    // actual length and fires `durationchange`. Then reset currentTime
    // to 0 so playback starts at the beginning, not at our probe seek.
    const onLoadedMetadata = () => {
      if (!isFinite(audio.duration) || audio.duration === 0) {
        try {
          audio.currentTime = 1e10;
        } catch {
          // Some browsers throw on extreme seek before any data is
          // loaded. The durationchange path still kicks in once
          // playback starts, so the recovery is automatic.
        }
      } else {
        setDuration(audio.duration);
      }
    };

    const onDurationChange = () => {
      if (isFinite(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
        // Reset to start if we triggered the probe seek. The check
        // is safe even for legitimate playback because
        // currentTime > duration is otherwise impossible.
        if (audio.currentTime > audio.duration) {
          audio.currentTime = 0;
        }
      }
    };

    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * duration;
  };

  const toggleSpeed = () => {
    const speeds = [1, 1.5, 2];
    const next = speeds[(speeds.indexOf(speed) + 1) % speeds.length];
    setSpeed(next);
    if (audioRef.current) audioRef.current.playbackRate = next;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bg-deep-black/30 border border-accent-gold/10 rounded-xl p-4">
      <div className="flex items-center gap-1.5 text-accent-gold/70 text-xs mb-3">
        <Mic className="w-3 h-3" />
        <span className="uppercase tracking-wider font-medium">Voice Note</span>
      </div>

      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="flex items-center gap-3">
        <button
          onClick={togglePlay}
          className="w-9 h-9 rounded-full bg-accent-gold/10 text-accent-gold flex items-center justify-center hover:bg-accent-gold/20 transition-colors shrink-0"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>

        <div className="flex-1 min-w-0">
          <div
            onClick={handleSeek}
            className="h-1.5 bg-white/10 rounded-full cursor-pointer group"
          >
            <div
              className="h-full bg-accent-gold rounded-full transition-[width] duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <span className="text-xs text-text-gray tabular-nums shrink-0">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>

        <button
          onClick={toggleSpeed}
          className="text-xs text-text-gray hover:text-accent-gold px-2 py-1 rounded transition-colors shrink-0"
        >
          {speed}x
        </button>
      </div>
    </div>
  );
}
