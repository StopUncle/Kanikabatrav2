"use client";

import { useState } from "react";

/**
 * Tier one: CSS only. No JavaScript drives a single pixel here.
 *
 * Everything in this block animates `transform` and `opacity` and nothing
 * else, which is the whole reason it is free: those two properties are
 * handed to the compositor and never touch layout or paint. The moment an
 * animation reaches for width, top, or box-shadow it leaves this tier and
 * starts costing a frame budget.
 *
 * This is the tier most of the app should live in and largely does not.
 */

const CSS = `
@keyframes ml-rise {
  from { opacity: 0; transform: translate3d(0, 14px, 0); }
  to   { opacity: 1; transform: translate3d(0, 0, 0); }
}
.ml-rise {
  opacity: 0;
  animation: ml-rise 620ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes ml-breathe {
  0%, 100% { opacity: 0.35; transform: scale(1); }
  50%      { opacity: 1;    transform: scale(1.012); }
}
.ml-breathe { animation: ml-breathe 3.4s ease-in-out infinite; }

/* Two offset flickers beat one: a single sine reads as a pulse, and a
   flame does not pulse. The second layer runs at a prime-ish multiple so
   the pair never visibly repeats. */
@keyframes ml-flame-a {
  0%, 100% { transform: scaleY(1) translate3d(0, 0, 0); }
  30%      { transform: scaleY(1.09) translate3d(0.4px, -0.6px, 0); }
  55%      { transform: scaleY(0.95) translate3d(-0.3px, 0.3px, 0); }
  78%      { transform: scaleY(1.05) translate3d(0.2px, -0.3px, 0); }
}
@keyframes ml-flame-b {
  0%, 100% { opacity: 0.55; transform: scale(1); }
  40%      { opacity: 0.95; transform: scale(1.13); }
  70%      { opacity: 0.7;  transform: scale(0.94); }
}
.ml-flame-a { animation: ml-flame-a 1.9s ease-in-out infinite; transform-origin: 50% 100%; }
.ml-flame-b { animation: ml-flame-b 1.37s ease-in-out infinite; transform-origin: 50% 100%; }

/* The bar is a scaled child, never an animated width, so the fill costs
   nothing to run and nothing to interrupt. */
@keyframes ml-fill {
  from { transform: scaleX(0); }
  to   { transform: scaleX(var(--ml-fill, 1)); }
}
.ml-fill {
  transform-origin: left center;
  animation: ml-fill 1100ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes ml-shimmer {
  from { transform: translate3d(-100%, 0, 0); }
  to   { transform: translate3d(220%, 0, 0); }
}
.ml-shimmer { animation: ml-shimmer 1800ms 900ms ease-in-out infinite; }

/* Press wants overshoot on the way back, not on the way down. Going down
   is the finger and should feel instant; coming back is the material and
   should feel sprung. Two different curves, one property. */
.ml-press {
  transition: transform 380ms cubic-bezier(0.16, 1.5, 0.4, 1);
}
.ml-press:active {
  transform: scale(0.965);
  transition: transform 90ms cubic-bezier(0.4, 0, 1, 1);
}

@media (prefers-reduced-motion: reduce) {
  .ml-rise, .ml-breathe, .ml-flame-a, .ml-flame-b,
  .ml-fill, .ml-shimmer { animation: none; }
  .ml-rise { opacity: 1; }
  .ml-fill { transform: scaleX(var(--ml-fill, 1)); }
  .ml-press { transition: none; }
}
`;

const ROWS = [
  { label: "The Unsent Text", meta: "Chapter 3" },
  { label: "The Apology That Was Not One", meta: "Chapter 4" },
  { label: "Three Weeks Of Nothing", meta: "Chapter 5" },
  { label: "The Friend Who Reports Back", meta: "Chapter 6" },
];

export default function TierOne() {
  const [run, setRun] = useState(0);

  return (
    <section>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <Head
        tier="Tier one"
        title="Free"
        note="Pure CSS, no JavaScript, no dependency. Compositor only, so it holds 60fps on a phone that cannot afford anything else."
        onReplay={() => setRun((n) => n + 1)}
      />

      {/* 1. Staggered entrance */}
      <Label>Staggered entrance</Label>
      <div key={run} className="flex flex-col gap-2">
        {ROWS.map((row, i) => (
          <div
            key={row.label}
            className="ml-rise ml-press flex items-center justify-between rounded-2xl border border-[var(--app-line)] bg-[var(--app-card)] px-4 py-3.5"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <span className="text-app-lead">{row.label}</span>
            <span className="text-app-caption text-[var(--app-dim)]">
              {row.meta}
            </span>
          </div>
        ))}
      </div>
      <Aside>
        70ms apart. Under 50 and it reads as one block arriving; over 100 and
        the last row feels late.
      </Aside>

      {/* 2. Breathing border */}
      <Label>Breathing border, on the thing that wants you</Label>
      <div className="relative overflow-hidden rounded-[20px] bg-[var(--app-card)] px-5 py-5">
        <span
          aria-hidden
          className="ml-breathe pointer-events-none absolute inset-0 rounded-[20px] border border-[var(--app-gold)]"
        />
        <p className="text-app-eyebrow uppercase tracking-app-label text-[var(--app-gold)]">
          Your next read
        </p>
        <p
          className="mt-1.5 text-app-title"
          style={{ fontFamily: "var(--font-display)" }}
        >
          The Voice Note At 1am
        </p>
      </div>
      <Aside>
        3.4s cycle. Slower than a resting breath on purpose: matched to
        breathing it reads as urgency, and this card is an invitation.
      </Aside>

      {/* 3. Flame */}
      <Label>An idle that stays alive</Label>
      <div className="flex items-center gap-6 rounded-[20px] border border-[var(--app-line)] bg-[var(--app-card)] px-5 py-5">
        <div className="flex items-center gap-2">
          <span className="relative block h-7 w-7">
            <svg viewBox="0 0 16 16" className="ml-flame-a absolute inset-0 h-7 w-7">
              <path
                d="M8 1c1 2.6 4 3.8 4 7.2A4.2 4.2 0 0 1 8 12.5 4.2 4.2 0 0 1 4 8.2C4 6.4 5.2 5.4 5.6 4c.9.8 1.2 1.5 1.2 2.6C7.8 5.4 8 3.4 8 1z"
                fill="var(--app-gold)"
              />
            </svg>
            <svg viewBox="0 0 16 16" className="ml-flame-b absolute inset-0 h-7 w-7">
              <path
                d="M8 5.6c.5 1.3 1.9 1.8 1.9 3.4A1.95 1.95 0 0 1 8 11a1.95 1.95 0 0 1-1.9-2c0-.9.6-1.4.8-2 .4.4.5.7.5 1.2.2-.8.6-1.8.6-2.6z"
                fill="var(--app-rose)"
              />
            </svg>
          </span>
          <span className="text-app-display" style={{ fontFamily: "var(--font-display)" }}>
            14
          </span>
        </div>
        <p className="text-app-caption leading-relaxed text-[var(--app-muted)]">
          Two flickers at 1.9s and 1.37s. Coprime-ish periods, so the loop
          never lands on itself and the eye never finds the seam.
        </p>
      </div>

      {/* 4. Fill + shimmer */}
      <Label>A bar that fills without touching layout</Label>
      <div key={`bar-${run}`} className="rounded-[20px] border border-[var(--app-line)] bg-[var(--app-card)] px-5 py-5">
        <div className="mb-2.5 flex items-baseline justify-between">
          <span className="text-app-eyebrow uppercase tracking-app-label text-[var(--app-gold-soft)]">
            Chapter 4
          </span>
          <span className="text-app-caption text-[var(--app-dim)]">7 of 11</span>
        </div>
        <span className="relative block h-[5px] overflow-hidden rounded-full bg-[var(--app-line)]">
          <span
            className="ml-fill block h-full w-full rounded-full bg-[var(--app-gold)]"
            style={{ ["--ml-fill" as string]: 0.64 }}
          />
          <span
            aria-hidden
            className="ml-shimmer absolute inset-y-0 left-0 w-1/3"
            style={{
              backgroundImage:
                "linear-gradient(90deg, transparent, rgba(236,231,222,0.5), transparent)",
            }}
          />
        </span>
      </div>
      <Aside>
        A scaled child, not an animated width. Width reflows every frame;
        scale does not touch layout at all.
      </Aside>
    </section>
  );
}

export function Head({
  tier,
  title,
  note,
  onReplay,
}: {
  tier: string;
  title: string;
  note: string;
  onReplay?: () => void;
}) {
  return (
    <div className="mb-5">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-app-eyebrow uppercase tracking-app-label text-[var(--app-gold)]">
          {tier}
        </p>
        {onReplay && (
          <button
            type="button"
            onClick={onReplay}
            className="shrink-0 rounded-full border border-[var(--app-line)] px-3 py-1.5 text-app-micro uppercase tracking-app-label text-[var(--app-muted)]"
          >
            Replay
          </button>
        )}
      </div>
      <h2
        className="mt-1 text-app-hero font-light"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h2>
      <p className="mt-2 text-app-caption leading-relaxed text-[var(--app-muted)]">
        {note}
      </p>
    </div>
  );
}

export function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2.5 mt-7 text-app-eyebrow uppercase tracking-app-label text-[var(--app-dim)]">
      {children}
    </p>
  );
}

export function Aside({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-2.5 text-app-caption leading-relaxed text-[var(--app-dim)]">
      {children}
    </p>
  );
}
