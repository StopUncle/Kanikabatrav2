"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { safeMediaUrl } from "@/lib/security/safe-media-url";

interface VideoPlayerProps {
  src: string;
  poster?: string | null;
  durationSeconds?: number | null;
}

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return "";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/**
 * Native HTML5 video player with a click-to-play poster overlay.
 *
 * Why no autoplay: a feed of autoplaying videos would compete for audio
 * and burn mobile data. Members opt in per video by tapping the poster.
 *
 * Why preload="metadata": we want the duration badge to populate without
 * downloading the whole 60-90s clip up front. Once the user taps play, the
 * browser starts fetching the rest.
 *
 * Why playsInline: prevents iOS Safari from forcing fullscreen the moment
 * play() fires, which would yank members out of the feed.
 */
export default function VideoPlayer({
  src,
  poster,
  durationSeconds,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  // Whitelist before either URL touches the DOM. A bad src would let
  // someone smuggle javascript:/data: payloads through the admin upload
  // flow; a bad poster would do the same via CSS background-image.
  const safeSrc = safeMediaUrl(src);
  const safePoster = safeMediaUrl(poster);

  if (!safeSrc) {
    return (
      <div className="w-full aspect-video rounded-xl border border-accent-gold/15 bg-deep-black/60 flex items-center justify-center text-text-gray text-sm font-light">
        Video unavailable
      </div>
    );
  }

  const handleStart = () => {
    setStarted(true);
    // Fire play() on the next tick, by then the controls are mounted
    // and the play() promise won't be interrupted by React's transition.
    requestAnimationFrame(() => {
      videoRef.current?.play().catch(() => {
        /* Autoplay blocked or user navigated away, fall back to the
           native controls, which are already visible. */
      });
    });
  };

  const durationLabel = durationSeconds ? formatTime(durationSeconds) : "";

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-accent-gold/15 bg-deep-black">
      {/* The poster overlay only renders before first play. Once play
          starts we hand control entirely to the native <video> element so
          scrubbing, fullscreen, and AirPlay all behave normally. */}
      {!started && (
        <button
          type="button"
          onClick={handleStart}
          aria-label="Play video"
          className="group absolute inset-0 z-10 flex items-center justify-center bg-deep-black/40 hover:bg-deep-black/30 transition-colors"
          style={
            safePoster
              ? {
                  backgroundImage: `url(${safePoster})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : undefined
          }
        >
          <span className="absolute inset-0 bg-gradient-to-t from-deep-black/70 via-transparent to-transparent" />
          <span className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-warm-gold/90 group-hover:bg-warm-gold flex items-center justify-center shadow-2xl transition-transform group-hover:scale-105">
            <Play
              className="w-7 h-7 sm:w-9 sm:h-9 text-deep-black ml-1"
              fill="currentColor"
              strokeWidth={0}
            />
          </span>
          {durationLabel && (
            <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-deep-black/80 text-text-light text-xs font-light tabular-nums">
              {durationLabel}
            </span>
          )}
        </button>
      )}

      <video
        ref={videoRef}
        src={safeSrc}
        poster={safePoster ?? undefined}
        controls={started}
        playsInline
        preload="metadata"
        className="w-full h-auto block bg-deep-black aspect-video"
      />
    </div>
  );
}
