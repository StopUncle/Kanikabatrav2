"use client";

import { useEffect, useState } from "react";
import { m } from "framer-motion";
import Link from "next/link";
import { RotateCcw, ArrowRight, Award, BookOpen, Star } from "lucide-react";
import type { Scene, Scenario, SimulatorState } from "@/lib/simulator/types";
import { BADGE_BY_KEY } from "@/lib/simulator/badges";
import { computeStars, masteryPercent } from "@/lib/simulator/stars";

/**
 * Count-up hook. Animates a number from 0 → target over ~1.2s using
 * requestAnimationFrame for smooth 60fps ticking. Delays start so it
 * fires after the title reveal.
 */
function useCountUp(target: number, delayMs = 1700) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const delay = setTimeout(() => {
      const start = performance.now();
      const duration = 1200;
      let raf = 0;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - t, 3);
        setValue(Math.round(target * eased));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, delayMs);
    return () => clearTimeout(delay);
  }, [target, delayMs]);
  return value;
}

type Props = {
  scenario: Scenario;
  scene: Scene;
  state: SimulatorState;
  /** Badge keys earned by this run (deduped against prior badges server-side). */
  badgesEarned?: string[];
  /** Hook for "next scenario", pass null to hide the next CTA. */
  nextScenarioHref?: string | null;
  /**
   * Custom CTA block rendered in place of the "Next Scenario" button.
   * When provided, this wins over nextScenarioHref. Used by the public
   * /try route to convert finishers into Consilium members.
   */
  customCta?: React.ReactNode;
  /**
   * When true, suppress the "Understand what happened" failure-blog
   * CTA on losing endings. The public /try demo sets this because a
   * cold visitor on a free demo should see one thing at the loss
   * screen, the conversion CTA, not a tangent to a blog post.
   */
  hideFailureBlog?: boolean;
  /**
   * If the player has a prior completion of this scenario, this is
   * the summary of it. Drives the "NEW BEST" / "prior best: N XP"
   * comparison shown next to the XP counter.
   */
  previousBest?: {
    xpEarned: number;
    outcome: import("@/lib/simulator/types").OutcomeType | null;
    completedAt: string;
  } | null;
  onRestart: () => void;
};

function XpCounter({ target }: { target: number }) {
  const value = useCountUp(target, 1700);
  return (
    <m.div
      initial={{ opacity: 0, y: 12, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 1.7 }}
      className="inline-flex flex-col items-center gap-1 px-6 py-3 rounded-full border border-accent-gold/30 mb-6"
    >
      <p className="text-accent-gold/70 text-[10px] uppercase tracking-[0.35em]">
        XP Earned
      </p>
      <p
        className="text-accent-gold text-3xl font-light tabular-nums"
        style={{ textShadow: "0 0 20px rgba(212,175,55,0.4)" }}
      >
        +{value}
      </p>
    </m.div>
  );
}

export default function EndingScreen({
  scene,
  state,
  badgesEarned = [],
  nextScenarioHref,
  customCta,
  hideFailureBlog = false,
  previousBest = null,
  onRestart,
}: Props) {
  const outcome = state.outcome ?? scene.outcomeType ?? "neutral";

  // Stars are the new verdict. ★/★★/★★★ replaces the old text pill
  // because pass/fail alone leaves no replay incentive once a player
  // has technically completed a scenario. Stars give them something
  // to chase: "I 2-starred this, let me 3-star it."
  //
  // Earned 0  → loss with no completion (rare; we usually still show 1)
  // Earned 1  → reached an ending, even a losing one
  // Earned 2  → won (good or passed)
  // Earned 3  → won AND optimal-choice ratio ≥ 80%
  const earnedStars = computeStars({
    outcome,
    choicesMade: state.choicesMade,
  });
  const mastery = masteryPercent(state.choicesMade);
  const optimalCount = state.choicesMade.filter((c) => c.wasOptimal).length;
  const totalChoices = state.choicesMade.length;

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20 overflow-y-auto"
    >
      <div className="max-w-2xl w-full text-center">
        {/* The 3-star verdict display.
            Three slots ALWAYS render so the player sees what's possible
            even on a loss, empty slots are the goalposts for the next
            replay. Stars fill in sequence with a stagger so it lands
            like a Clash-style reveal: ★ … ★★ … ★★★ rather than all at once. */}
        <m.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-3 flex justify-center"
        >
          <div className="flex items-center gap-3 px-7 py-3 rounded-full border border-accent-gold/30 bg-deep-black/60">
            {[0, 1, 2].map((i) => {
              const filled = i < earnedStars;
              return (
                <m.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.4, rotate: -30 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: 0.5 + i * 0.25,
                    type: "spring",
                    stiffness: 280,
                    damping: 14,
                  }}
                  className="inline-flex"
                  aria-label={filled ? "Star earned" : "Star not earned"}
                >
                  <Star
                    size={i === 1 ? 36 : 30}
                    strokeWidth={1.5}
                    fill={filled ? "#d4af37" : "transparent"}
                    color={filled ? "#d4af37" : "rgba(212,175,55,0.25)"}
                    style={{
                      filter: filled
                        ? "drop-shadow(0 0 12px rgba(212,175,55,0.55))"
                        : undefined,
                    }}
                  />
                </m.span>
              );
            })}
          </div>
        </m.div>

        {/* Mastery readout, "X / Y optimal · Z%". Gives the player a
            concrete number to chase on replay. The third star is keyed
            off this percent vs the 80% threshold, so showing it here
            makes the gap explicit ("I got 73%, need 80%"). */}
        <m.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.4 }}
          className="text-text-gray/70 text-[11px] uppercase tracking-[0.3em] mb-8"
        >
          {totalChoices > 0 ? (
            <>
              <span className="tabular-nums text-accent-gold/90">
                {optimalCount} / {totalChoices}
              </span>{" "}
              optimal ·{" "}
              <span className="tabular-nums text-accent-gold/90">{mastery}%</span>
              {earnedStars === 3 && (
                <span className="ml-2 text-accent-gold">· Mastered</span>
              )}
            </>
          ) : (
            <span>Run complete</span>
          )}
        </m.p>

        <m.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-5xl sm:text-6xl font-extralight text-white mb-8 tracking-wide"
        >
          {scene.endingTitle ?? "Scene Complete"}
        </m.h1>

        <m.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="w-24 h-px bg-accent-gold mx-auto mb-10 origin-center"
        />

        {scene.endingSummary && (
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="text-text-gray text-lg sm:text-xl font-light leading-relaxed mb-12 max-w-xl mx-auto"
          >
            {scene.endingSummary}
          </m.p>
        )}

        {/* XP earned, count-up animation */}
        <XpCounter target={state.xpEarned} />

        {/* Previous-best comparison. Only on replays. Calls out a new
            record with a gold "NEW BEST" badge, otherwise shows the
            prior best XP so the run feels meaningful even when the
            player didn't improve. */}
        {previousBest && (
          <m.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.9 }}
            className="inline-flex items-center gap-2 mb-8 -mt-2 text-[10px] uppercase tracking-[0.3em]"
          >
            {state.xpEarned > previousBest.xpEarned ? (
              <span className="px-3 py-1 rounded-full bg-accent-gold/15 border border-accent-gold/50 text-accent-gold">
                New best · +{state.xpEarned - previousBest.xpEarned} XP
              </span>
            ) : state.xpEarned === previousBest.xpEarned ? (
              <span className="px-3 py-1 rounded-full border border-accent-gold/25 text-accent-gold/70">
                Matched your best
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full border border-white/10 text-text-gray/70">
                Best:{" "}
                <span className="text-accent-gold/70 tabular-nums">
                  {previousBest.xpEarned}
                </span>{" "}
                XP
              </span>
            )}
          </m.div>
        )}

        {/* Failure → blog post CTA.
            Only shown on defeat endings that declare a `failureBlogSlug`.
            The pedagogy: when a player loses to a manipulation tactic, hand
            them the blog post that teaches the pattern. Links to the member
            preview route (`/consilium/previews/<slug>`) rather than the
            public `/blog/<slug>`, many referenced posts are future-dated
            in their MDX frontmatter and the public route 404s on them.
            The preview route uses `getPostBySlug` (not `getPublicPostBySlug`)
            so members can read them immediately, and redirects to `/blog/`
            once a post has gone public. Opens in a new tab so players
            don't lose the ending screen state. Suppressed on the public
            /try demo (hideFailureBlog=true), cold visitors on a free
            demo should see one thing on the loss screen: the conversion
            CTA. */}
        {scene.failureBlogSlug &&
          !hideFailureBlog &&
          (outcome === "bad" || outcome === "failed") && (
            <m.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.1 }}
              className="mb-12 flex justify-center"
            >
              <Link
                href={`/consilium/previews/${scene.failureBlogSlug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-6 py-4 rounded-xl border border-accent-gold/30 bg-deep-black/60 hover:border-accent-gold/60 hover:bg-accent-gold/5 transition-all max-w-md text-left"
              >
                <BookOpen
                  size={20}
                  className="text-accent-gold shrink-0"
                  strokeWidth={1.5}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-accent-gold/70 text-[10px] uppercase tracking-[0.3em] mb-1">
                    Understand what happened
                  </p>
                  <p className="text-white text-sm font-light leading-snug">
                    {scene.failureBlogTitle ?? "Read the pattern breakdown"}
                  </p>
                </div>
                <ArrowRight
                  size={16}
                  className="text-accent-gold/50 group-hover:text-accent-gold group-hover:translate-x-1 transition-all shrink-0"
                  strokeWidth={1.5}
                />
              </Link>
            </m.div>
          )}

        {/* Badges earned this run */}
        {badgesEarned.length > 0 && (
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.0 }}
            className="mb-12 flex flex-col items-center gap-3"
          >
            <p className="text-accent-gold/70 text-[10px] uppercase tracking-[0.35em]">
              Badge{badgesEarned.length > 1 ? "s" : ""} Earned
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {badgesEarned.map((key) => {
                const b = BADGE_BY_KEY[key];
                if (!b) return null;
                return (
                  <div
                    key={key}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-deep-black/60 border border-accent-gold/30"
                  >
                    <Award
                      size={16}
                      className="text-accent-gold"
                      strokeWidth={1.5}
                    />
                    <div className="text-left">
                      <p className="text-white text-sm font-light">{b.title}</p>
                      <p className="text-text-gray/60 text-[10px] italic">
                        {b.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </m.div>
        )}

        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.4 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <button
            onClick={onRestart}
            className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-accent-gold/40 text-accent-gold hover:bg-accent-gold/10 font-medium tracking-wider uppercase text-sm rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 focus-visible:ring-offset-deep-black"
          >
            <RotateCcw size={16} strokeWidth={1.5} />
            Replay
          </button>
          {customCta ? (
            customCta
          ) : nextScenarioHref ? (
            <NextScenarioButton
              href={nextScenarioHref}
              autoAdvance={outcome === "good" || outcome === "passed"}
            />
          ) : null}
        </m.div>
      </div>
    </m.div>
  );
}

/**
 * Next-scenario CTA with optional 5-second auto-advance.
 *
 * On winning outcomes (good / passed), starts a ~6.5s countdown that
 * fills a progress bar inside the button. The user can:
 *   - Click Next at any time (immediate advance)
 *   - Hover the button to pause the countdown (gives them reading time)
 *   - Click "Stay on this screen" to cancel auto-advance entirely
 *
 * Doesn't fire on losing outcomes, auto-advancing into another scenario
 * after a loss is punishment, not retention. Players need a beat.
 */
function NextScenarioButton({
  href,
  autoAdvance,
}: {
  href: string;
  autoAdvance: boolean;
}) {
  const [paused, setPaused] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    if (!autoAdvance || cancelled || paused) return;
    const timer = setTimeout(() => {
      window.location.href = href;
    }, 6500);
    return () => clearTimeout(timer);
  }, [autoAdvance, cancelled, paused, href]);

  const showAutoUI = autoAdvance && !cancelled;

  return (
    <div className="inline-flex flex-col items-center gap-2">
      <Link
        href={href}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="relative inline-flex items-center justify-center gap-2 px-8 py-3 bg-accent-gold text-deep-black font-medium tracking-wider uppercase text-sm rounded-full hover:bg-accent-gold/90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 focus-visible:ring-offset-deep-black overflow-hidden"
      >
        {/* Progress fill, sweeps left-to-right behind the label.
            Pure CSS animation so pause is a one-line attribute change. */}
        {showAutoUI && (
          <span
            aria-hidden
            className="absolute inset-y-0 left-0 right-0 bg-deep-black/15 origin-left"
            style={{
              animation: "ending-autoadvance-fill 6500ms linear forwards",
              animationPlayState: paused ? "paused" : "running",
            }}
          />
        )}
        <span className="relative">Next Scenario</span>
        <ArrowRight size={16} strokeWidth={1.5} className="relative" />
      </Link>
      {showAutoUI && (
        <button
          onClick={() => setCancelled(true)}
          className="text-text-gray/60 hover:text-text-gray text-[10px] uppercase tracking-[0.25em] transition-colors"
        >
          Stay on this screen
        </button>
      )}
      <style>{`
        @keyframes ending-autoadvance-fill {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}
