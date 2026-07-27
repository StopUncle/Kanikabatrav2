"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Play } from "lucide-react";
import InstallSheet from "./InstallSheet";

/**
 * The Arrival: the first screen after joining. The sigil draws itself, Kanika
 * says what this is in her own voice, and the install sheet slides up.
 *
 * The welcome video is the highest-leverage asset in the flow, so the screen
 * is built to hold it the moment it exists and to stay honest when it does
 * not: no video, no dead player, just the door.
 */

const SEEN_KEY = "consilium-arrival-seen-v1";

type Props = {
  /** Kanika's welcome video, when one is configured. */
  videoUrl: string | null;
  /** Where Begin sends them. Currently the Baseline Read. */
  beginHref: string;
  firstName: string | null;
};

export default function Arrival({ videoUrl, beginHref, firstName }: Props) {
  const router = useRouter();
  const [playing, setPlaying] = useState(false);

  function begin() {
    try {
      window.localStorage.setItem(SEEN_KEY, String(Date.now()));
    } catch {
      /* private mode: the server flag still governs the gate */
    }
    router.push(beginHref);
  }

  return (
    <div className="relative flex min-h-[100dvh] flex-col bg-[radial-gradient(120%_70%_at_50%_-10%,rgba(183,110,121,0.12),transparent_60%),radial-gradient(140%_90%_at_50%_115%,rgba(212,175,55,0.1),transparent_55%)]">
      <div className="flex flex-1 flex-col items-center justify-center px-9 text-center">
        {playing && videoUrl ? (
          <video
            src={videoUrl}
            controls
            autoPlay
            playsInline
            className="w-full rounded-2xl border border-[var(--app-line)]"
          />
        ) : (
          <>
            <svg
              className="app-sigil mb-9"
              width="96"
              height="96"
              viewBox="0 0 96 96"
              aria-hidden
            >
              <circle
                cx="48"
                cy="48"
                r="44"
                stroke="var(--app-gold)"
                strokeWidth="1"
                fill="none"
                style={{ animationDelay: "0.1s" }}
              />
              <circle
                cx="48"
                cy="48"
                r="33"
                stroke="var(--app-gold)"
                strokeWidth="1"
                fill="none"
                style={{ animationDelay: "0.22s" }}
              />
              <circle
                cx="48"
                cy="48"
                r="22"
                stroke="var(--app-gold)"
                strokeWidth="1"
                fill="none"
                style={{ animationDelay: "0.34s" }}
              />
              <circle
                cx="48"
                cy="48"
                r="11"
                stroke="var(--app-gold)"
                strokeWidth="1"
                fill="none"
                style={{ animationDelay: "0.46s" }}
              />
              <circle
                cx="48"
                cy="48"
                r="3"
                fill="var(--app-gold)"
                style={{ animationDelay: "0.62s" }}
              />
            </svg>

            <h1
              className="app-rise text-[34px] font-light leading-tight"
              style={{ fontFamily: "var(--font-display)", animationDelay: "0.7s" }}
            >
              {firstName ? `You're in, ${firstName}.` : "You're in."}
            </h1>
            <p
              className="app-rise mt-3.5 max-w-[17rem] text-[15px] leading-relaxed text-[var(--app-muted)]"
              style={{ animationDelay: "0.85s" }}
            >
              This is not a quick fix. Give it time and you will start reading
              people you used to misread.
            </p>

            {videoUrl && (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="app-rise mt-8 inline-flex items-center gap-2.5 rounded-full border border-[var(--app-line)] px-5 py-3 text-sm text-[var(--app-gold)]"
                style={{ animationDelay: "1s" }}
              >
                <Play size={15} fill="currentColor" />
                Watch Kanika&apos;s welcome
              </button>
            )}
          </>
        )}
      </div>

      <button
        type="button"
        onClick={begin}
        className="app-rise mx-7 mb-10 rounded-full bg-[var(--app-gold)] py-[17px] text-[15px] font-semibold tracking-[0.04em] text-[#17130a] shadow-[0_8px_30px_rgba(212,175,55,0.25)]"
        style={{ animationDelay: playing ? "0s" : "1.15s" }}
      >
        Begin
      </button>

      <InstallSheet />
    </div>
  );
}
