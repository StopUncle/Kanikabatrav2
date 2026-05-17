"use client";

import { useRef, useState } from "react";
import { Play, Quote } from "lucide-react";
import type { PublicTestimonial } from "@/lib/testimonials";

interface Props {
  testimonial: PublicTestimonial;
  /** "wall" renders larger with thumbnail + play overlay; "compact" is the
   *  smaller variant used on the landing-page embed. */
  variant?: "wall" | "compact";
}

/**
 * One testimonial card. Renders a video player if videoUrl exists, otherwise
 * a quote card. Both shapes carry the author name + optional role.
 *
 * Video is intentionally lazy: the <video> element is only mounted when the
 * user clicks the poster, so the landing page doesn't pull megabytes for
 * three testimonials a visitor may never watch.
 */
export default function TestimonialCard({ testimonial, variant = "wall" }: Props) {
  const { videoUrl, posterUrl, quoteText, transcript, authorName, authorRole } =
    testimonial;
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function startPlayback() {
    setPlaying(true);
    // Wait for the next frame so the <video> element mounts before we ask
    // it to play. Without this, the play() call no-ops.
    requestAnimationFrame(() => {
      void videoRef.current?.play().catch(() => {
        // Autoplay restrictions can reject the programmatic play; the
        // native controls render in that case so the user can hit play.
      });
    });
  }

  const cardClass =
    variant === "wall"
      ? "bg-deep-black/50 border border-warm-gold/15 rounded-2xl overflow-hidden"
      : "bg-deep-black/40 border border-warm-gold/10 rounded-xl overflow-hidden";

  if (videoUrl) {
    return (
      <div className={cardClass}>
        <div className="relative aspect-video bg-deep-black">
          {playing ? (
            <video
              ref={videoRef}
              src={videoUrl}
              poster={posterUrl ?? undefined}
              controls
              className="w-full h-full object-cover"
            />
          ) : (
            <button
              onClick={startPlayback}
              className="absolute inset-0 group flex items-center justify-center bg-cover bg-center"
              style={{
                backgroundImage: posterUrl
                  ? `url(${posterUrl})`
                  : "linear-gradient(135deg, #0a0a0a, #1a0a14)",
              }}
              aria-label={`Play testimonial from ${authorName}`}
            >
              <div className="w-16 h-16 rounded-full bg-warm-gold/90 group-hover:bg-warm-gold flex items-center justify-center transition-all shadow-2xl">
                <Play size={26} className="text-deep-black ml-1" strokeWidth={2} />
              </div>
            </button>
          )}
        </div>
        <div className="p-5">
          <div className="text-text-light font-light text-sm">{authorName}</div>
          {authorRole && (
            <div className="text-text-gray/70 text-xs mt-1">{authorRole}</div>
          )}
          {transcript && variant === "wall" && (
            <p className="text-text-gray/85 text-xs leading-relaxed mt-3 line-clamp-4">
              {transcript}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Text-only quote variant.
  return (
    <div className={`${cardClass} p-6`}>
      <Quote size={20} className="text-warm-gold/40 mb-3" strokeWidth={1.5} />
      <p className="text-text-light font-light text-base leading-relaxed">
        {quoteText || "—"}
      </p>
      <div className="mt-5 pt-4 border-t border-warm-gold/10">
        <div className="text-text-light font-light text-sm">{authorName}</div>
        {authorRole && (
          <div className="text-text-gray/70 text-xs mt-1">{authorRole}</div>
        )}
      </div>
    </div>
  );
}
