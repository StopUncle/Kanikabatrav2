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
 *
 * Begin stamps arrivalAt server-side for every tier, which is what ticks
 * the Day-0 row. Members go on to the Baseline Read; free accounts go
 * straight into their first scenario, picked by the gender ask below
 * (members answered the same question in the Initiation).
 */

const SEEN_KEY = "consilium-arrival-seen-v1";

type Props = {
  /** Kanika's welcome video, when one is configured. */
  videoUrl: string | null;
  /** Where Begin sends a member. Currently the Baseline Read. */
  beginHref: string;
  firstName: string | null;
  /** Free tier: Begin routes to the first spine scenario instead. */
  freeTier?: boolean;
  /** Ask the two-option gender question (free accounts without one). */
  askGender?: boolean;
  /** Gender the server already knows (when the ask is skipped), so a
   *  returning male account is not routed down the female spine. */
  knownGender?: "MALE" | "FEMALE" | null;
};

const FREE_BEGIN: Record<string, string> = {
  FEMALE: "/app/train/mission-1-1",
  MALE: "/app/train/d1-frame-challenge",
};

export default function Arrival({
  videoUrl,
  beginHref,
  firstName,
  freeTier = false,
  askGender = false,
  knownGender = null,
}: Props) {
  const router = useRouter();
  const [playing, setPlaying] = useState(false);
  const [gender, setGender] = useState<"MALE" | "FEMALE" | null>(null);
  const [leaving, setLeaving] = useState(false);

  async function begin() {
    if (leaving) return;
    setLeaving(true);
    try {
      window.localStorage.setItem(SEEN_KEY, String(Date.now()));
    } catch {
      /* private mode: the server stamp below still governs */
    }
    // Await the stamp: arrivalAt is what stops Home redirecting back
    // here, so navigating before it lands turned a dropped request into
    // an Arrival that reappears on every visit for seven days.
    try {
      await fetch("/api/arrival/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gender ? { gender } : {}),
      });
    } catch {
      /* still navigate; the next Begin press retries the stamp */
    }
    const resolved = gender ?? knownGender ?? "FEMALE";
    const target = freeTier ? FREE_BEGIN[resolved] : beginHref;
    router.push(target);
  }

  return (
    <div className="relative flex min-h-full flex-col bg-[radial-gradient(120%_70%_at_50%_-10%,rgba(183,110,121,0.12),transparent_60%),radial-gradient(140%_90%_at_50%_115%,rgba(212,175,55,0.1),transparent_55%)]">
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
              className="app-rise mt-3.5 max-w-[17rem] text-app-lead leading-relaxed text-[var(--app-muted)]"
              style={{ animationDelay: "0.85s" }}
            >
              This is not a quick fix. Give it time and you will start reading
              people you used to misread.
            </p>

            {askGender && (
              <div
                className="app-rise mt-8"
                style={{ animationDelay: "1s" }}
              >
                <p className="text-app-eyebrow uppercase tracking-app-label text-[var(--app-dim)]">
                  I am
                </p>
                <div className="mt-3 flex justify-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setGender("FEMALE")}
                    aria-pressed={gender === "FEMALE"}
                    className={`rounded-full border px-6 py-2.5 text-app-body transition-colors ${
                      gender === "FEMALE"
                        ? "border-[var(--app-gold)] bg-[var(--app-gold)]/10 text-[var(--app-gold)]"
                        : "border-[var(--app-line)] text-[var(--app-muted)]"
                    }`}
                  >
                    Woman
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender("MALE")}
                    aria-pressed={gender === "MALE"}
                    className={`rounded-full border px-6 py-2.5 text-app-body transition-colors ${
                      gender === "MALE"
                        ? "border-[var(--app-gold)] bg-[var(--app-gold)]/10 text-[var(--app-gold)]"
                        : "border-[var(--app-line)] text-[var(--app-muted)]"
                    }`}
                  >
                    Man
                  </button>
                </div>
                {/* "The default" told the reader there was one without
                    saying which, on the one screen where the choice is
                    actually being made. Name it, and say what the choice
                    changes, because the answer shows up later as a bare
                    FEMININE stamped on the Simulator. */}
                <p className="mt-2 text-app-micro leading-relaxed text-[var(--app-dim)]">
                  Sets which version of each scenario you get. Skip and you
                  get the feminine track.
                </p>
              </div>
            )}

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
        className="app-rise mx-7 mb-10 rounded-full bg-[var(--app-gold)] py-[17px] text-app-lead font-semibold tracking-[0.04em] text-[var(--app-on-gold)] shadow-[0_8px_30px_rgba(212,175,55,0.25)]"
        style={{ animationDelay: playing ? "0s" : "1.15s" }}
      >
        Begin
      </button>

      <InstallSheet />
    </div>
  );
}
