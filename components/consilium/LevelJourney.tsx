"use client";

import Link from "next/link";
import { m } from "framer-motion";
import {
  Lock,
  Play,
  CheckCircle2,
  RotateCw,
  Crown,
  Diamond,
  Clock,
  Target,
  ArrowRight,
  Sparkles,
  Star,
} from "lucide-react";
import type { Scenario } from "@/lib/simulator/types";

/**
 * Game-feel catalog for the Dark Mirror Simulator.
 *
 * Replaces the flat grid that came before. Reads as an ascending
 * journey: each level a chapter, each scenario a card on the path,
 * locked nodes silhouetted with a "REQUIRES" hint, the next-up card
 * pulses, completed cards wear their badge metal, boss levels (5
 * and 10) get a haloed treatment with a "BOSS" banner.
 *
 * Pure presentational component. The catalog page does the data
 * fetching + status calculation upstream and passes one ready-to-
 * render array of LevelGroup objects in.
 */

export type ScenarioStatus =
  | "locked"
  | "available"
  | "in-progress"
  | "completed-good"
  | "completed-neutral"
  | "completed-bad";

export interface ScenarioNode {
  scenario: Scenario;
  status: ScenarioStatus;
  /** Set when status is "in-progress", the next scene to resume. */
  resumeSceneId?: string;
  /** XP earned on this scenario so far (running total for in-progress,
   *  final total for completed). */
  xpEarned: number;
  /** Star rating earned on the player's BEST run of this scenario.
   *  0 = not yet completed. 1 = completed. 2 = passed. 3 = mastered.
   *  Drives the at-a-glance Clash-style ★/★★/★★★ on each card. */
  stars: 0 | 1 | 2 | 3;
  /** Endings the player has reached on this scenario (set, not log). */
  endingsFound: number;
  /** Total endings in this scenario (count of scenes with isEnding=true). */
  endingsTotal: number;
  /** Names of scenarios that gate this one, shown when locked. */
  prerequisiteTitles: string[];
}

export interface LevelGroup {
  level: number;
  title: string;
  blurb: string;
  scenarios: ScenarioNode[];
  /** True when all scenarios in this level's prereq chain are complete. */
  isUnlocked: boolean;
  /** True for L5 (Mastery) + L10 (Endgame), render with boss treatment. */
  isBoss: boolean;
}

interface LevelJourneyProps {
  levels: LevelGroup[];
  /** The single scenario the player should hit next, used for the
   *  hero "Play Next" card at the top. Null if everything's done or
   *  nothing is yet available. */
  nextUp: ScenarioNode | null;
  /** Top-of-track summary numbers. */
  totalScenarios: number;
  unlockedCount: number;
  completedCount: number;
  trackXp: number;
}

/**
 * The 3-star rating shown on each completed scenario card. Always
 * renders 3 slots so the empty ones serve as goalposts, the player
 * sees what they're missing at a glance and replays to fill them.
 *
 * Compact (10px stars) so it fits on the card header next to the
 * status tag without crowding the title.
 */
function StarRow({ earned }: { earned: 0 | 1 | 2 | 3 }) {
  return (
    <span
      className="inline-flex items-center gap-0.5"
      aria-label={`${earned} of 3 stars`}
    >
      {[0, 1, 2].map((i) => (
        <Star
          key={i}
          size={10}
          strokeWidth={1.8}
          fill={i < earned ? "#d4af37" : "transparent"}
          color={i < earned ? "#d4af37" : "rgba(212,175,55,0.3)"}
        />
      ))}
    </span>
  );
}

// Map status → visual treatment (icon, ring colour, tag label).
function statusVisual(status: ScenarioStatus) {
  switch (status) {
    case "locked":
      return {
        Icon: Lock,
        ring: "border-warm-gold/8 bg-deep-black/40",
        glow: "",
        tag: "Locked",
        tagClass:
          "text-text-gray/40 bg-white/[0.02] border-white/5",
        iconClass: "text-text-gray/30",
      };
    case "available":
      return {
        Icon: Play,
        ring:
          "border-warm-gold/30 bg-deep-black/55 hover:border-warm-gold/70 hover:shadow-[0_8px_40px_-8px_rgba(212,175,55,0.35)]",
        glow: "",
        tag: "New",
        tagClass:
          "text-warm-gold bg-warm-gold/10 border-warm-gold/30",
        iconClass: "text-warm-gold",
      };
    case "in-progress":
      return {
        Icon: RotateCw,
        ring:
          "border-amber-400/40 bg-deep-black/55 hover:border-amber-400/70 hover:shadow-[0_8px_40px_-8px_rgba(251,191,36,0.3)]",
        glow: "",
        tag: "In Progress",
        tagClass:
          "text-amber-300 bg-amber-400/10 border-amber-400/30",
        iconClass: "text-amber-300",
      };
    case "completed-good":
      return {
        Icon: CheckCircle2,
        ring:
          "border-warm-gold/55 bg-gradient-to-br from-warm-gold/[0.06] to-deep-black/55 hover:border-warm-gold/80",
        glow: "shadow-[0_0_24px_-6px_rgba(212,175,55,0.45)]",
        tag: "Mastered",
        tagClass:
          "text-warm-gold bg-warm-gold/15 border-warm-gold/40",
        iconClass: "text-warm-gold",
      };
    case "completed-neutral":
      return {
        Icon: CheckCircle2,
        ring:
          "border-text-gray/35 bg-deep-black/50 hover:border-text-gray/55",
        glow: "",
        tag: "Completed",
        tagClass:
          "text-text-gray bg-white/[0.04] border-white/10",
        iconClass: "text-text-gray",
      };
    case "completed-bad":
      return {
        Icon: RotateCw,
        ring:
          "border-red-400/30 bg-deep-black/55 hover:border-red-400/55",
        glow: "",
        tag: "Replay",
        tagClass:
          "text-red-300/90 bg-red-500/8 border-red-400/25",
        iconClass: "text-red-300/90",
      };
  }
}

function ScenarioCard({
  node,
  isNextUp,
}: {
  node: ScenarioNode;
  isNextUp: boolean;
}) {
  const v = statusVisual(node.status);
  const { scenario: s, status, prerequisiteTitles } = node;

  const inner = (
    <div
      className={`relative rounded-2xl border p-5 transition-all duration-300 ${v.ring} ${v.glow} ${
        isNextUp && status !== "locked"
          ? "ring-2 ring-warm-gold/40 ring-offset-2 ring-offset-deep-black"
          : ""
      }`}
    >
      {isNextUp && status !== "locked" && (
        <m.span
          initial={{ opacity: 0.6 }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          className="absolute -top-2 -right-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-warm-gold text-deep-black text-[9px] uppercase tracking-[0.2em] font-medium"
        >
          <Sparkles size={10} strokeWidth={2.5} />
          Up Next
        </m.span>
      )}

      <div className="flex items-start gap-4">
        <div
          className={`shrink-0 w-11 h-11 rounded-full flex items-center justify-center border ${v.tagClass} ${v.iconClass}`}
        >
          <v.Icon size={16} strokeWidth={1.8} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className={`inline-flex items-center px-1.5 py-0.5 rounded-md text-[9px] uppercase tracking-[0.18em] border ${v.tagClass}`}
            >
              {v.tag}
            </span>
            {node.stars > 0 && <StarRow earned={node.stars} />}
            {node.xpEarned > 0 && (
              <span className="text-warm-gold/70 text-[10px] tabular-nums">
                +{node.xpEarned} XP
              </span>
            )}
            {/* Endings counter, only shows once the player has reached
                at least one. Hides on scenarios with a single ending so
                we don't render a tautology like "1 / 1 endings". */}
            {node.endingsFound > 0 && node.endingsTotal > 1 && (
              <span
                className={`text-[10px] tabular-nums ${
                  node.endingsFound === node.endingsTotal
                    ? "text-accent-gold"
                    : "text-text-gray/70"
                }`}
                title={
                  node.endingsFound === node.endingsTotal
                    ? "All endings discovered"
                    : `${node.endingsTotal - node.endingsFound} more ending${node.endingsTotal - node.endingsFound === 1 ? "" : "s"} to find`
                }
              >
                {node.endingsFound} / {node.endingsTotal} endings
              </span>
            )}
          </div>

          <h3
            className={`text-lg font-light tracking-wide mb-1 ${
              status === "locked" ? "text-text-gray/50" : "text-white"
            }`}
          >
            {status === "locked" ? "—" : s.title}
          </h3>

          {status === "locked" ? (
            <p className="text-text-gray/40 text-xs italic font-light">
              {prerequisiteTitles.length > 0
                ? `Complete ${prerequisiteTitles.join(", ")} to unlock`
                : "Complete prior level to unlock"}
            </p>
          ) : (
            <>
              <p className="text-warm-gold/80 text-xs italic font-light mb-3">
                {s.tagline}
              </p>
              <p className="text-text-gray text-sm font-light leading-relaxed line-clamp-2 mb-3">
                {s.description}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-text-gray/60 text-[11px] pt-3 border-t border-white/5">
                <span className="inline-flex items-center gap-1">
                  <Clock size={10} strokeWidth={1.5} />
                  {s.estimatedMinutes} min
                </span>
                <span className="inline-flex items-center gap-1 capitalize">
                  <Target size={10} strokeWidth={1.5} />
                  {s.difficulty}
                </span>
                <span className="ml-auto text-warm-gold/60">
                  +{s.xpReward} XP
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  if (status === "locked") {
    return <div aria-disabled>{inner}</div>;
  }
  return (
    <Link href={`/consilium/simulator/${s.id}`} className="group block">
      {inner}
    </Link>
  );
}

function LevelHeader({ group }: { group: LevelGroup }) {
  return (
    <div className="relative my-8 first:mt-0">
      {/* Connector line through the middle */}
      <span
        aria-hidden
        className="absolute left-1/2 top-0 bottom-0 -translate-x-px w-px bg-gradient-to-b from-transparent via-warm-gold/20 to-transparent"
      />
      <div className="relative flex items-center justify-center">
        <div
          className={`px-6 py-2.5 rounded-full border backdrop-blur-sm flex items-center gap-3 ${
            group.isBoss
              ? "border-warm-gold/55 bg-gradient-to-r from-deep-burgundy/40 via-warm-gold/[0.08] to-deep-burgundy/40 shadow-[0_0_30px_-10px_rgba(212,175,55,0.5)]"
              : group.isUnlocked
                ? "border-warm-gold/30 bg-deep-black/80"
                : "border-white/8 bg-deep-black/80"
          }`}
        >
          {group.isBoss && (
            <Crown
              size={14}
              className="text-warm-gold"
              strokeWidth={1.8}
            />
          )}
          <span
            className={`text-[10px] uppercase tracking-[0.35em] font-medium ${
              group.isBoss
                ? "text-warm-gold"
                : group.isUnlocked
                  ? "text-warm-gold/70"
                  : "text-text-gray/40"
            }`}
          >
            Level {group.level}
          </span>
          <span
            className={`text-sm font-light tracking-wide ${
              group.isUnlocked ? "text-white" : "text-text-gray/50"
            }`}
          >
            {group.title}
          </span>
          {group.isBoss && (
            <span className="text-[9px] uppercase tracking-[0.25em] px-1.5 py-0.5 rounded-md bg-warm-gold/20 text-warm-gold border border-warm-gold/40">
              Boss
            </span>
          )}
        </div>
      </div>
      {group.isUnlocked && group.blurb && (
        <p className="text-center text-text-gray/55 text-xs italic font-light mt-2.5">
          {group.blurb}
        </p>
      )}
    </div>
  );
}

export default function LevelJourney({
  levels,
  nextUp,
  totalScenarios,
  unlockedCount,
  completedCount,
  trackXp,
}: LevelJourneyProps) {
  const completionPct = Math.round((completedCount / totalScenarios) * 100);

  return (
    <div className="space-y-10">
      {/* Track progress + Play Next hero */}
      <div className="rounded-2xl border border-warm-gold/25 bg-gradient-to-br from-deep-burgundy/15 via-deep-black/60 to-deep-navy/20 p-6 sm:p-7">
        <div className="grid sm:grid-cols-[1fr_auto] gap-6 items-center">
          <div className="min-w-0">
            <p className="text-warm-gold/70 uppercase tracking-[0.3em] text-[10px] mb-2">
              Track Progress
            </p>
            <div className="flex items-baseline gap-3 mb-3">
              <span className="text-3xl font-extralight text-white tabular-nums">
                {completedCount}
              </span>
              <span className="text-text-gray/60 text-sm font-light">
                of {totalScenarios} mastered · {unlockedCount} unlocked ·{" "}
                {trackXp.toLocaleString()} XP
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
              <m.div
                initial={{ width: 0 }}
                animate={{ width: `${completionPct}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-warm-gold/70 to-warm-gold rounded-full"
              />
            </div>
          </div>
          {nextUp && nextUp.status !== "locked" && (
            <Link
              href={`/consilium/simulator/${nextUp.scenario.id}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-warm-gold text-deep-black font-medium text-sm tracking-wider uppercase transition-all hover:bg-warm-gold/90 hover:shadow-[0_8px_24px_-4px_rgba(212,175,55,0.55)] shrink-0"
            >
              {nextUp.status === "in-progress" ? "Resume" : "Play Next"}
              <ArrowRight size={16} />
            </Link>
          )}
        </div>
        {nextUp && nextUp.status !== "locked" && (
          <p className="text-text-gray/65 text-xs font-light mt-3 sm:mt-4">
            Up next:{" "}
            <span className="text-text-light">{nextUp.scenario.title}</span>{" "}
            <span className="text-warm-gold/60">·</span>{" "}
            <span className="italic">{nextUp.scenario.tagline}</span>
          </p>
        )}
      </div>

      {/* Journey */}
      <div>
        {levels.map((group) => (
          <section key={group.level}>
            <LevelHeader group={group} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {group.scenarios.map((node) => (
                <ScenarioCard
                  key={node.scenario.id}
                  node={node}
                  isNextUp={!!nextUp && nextUp.scenario.id === node.scenario.id}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* End-of-journey marker */}
      <div className="text-center pt-6">
        <Diamond
          size={20}
          className="mx-auto text-warm-gold/40"
          strokeWidth={1.4}
        />
        <p className="text-warm-gold/50 text-[10px] uppercase tracking-[0.35em] mt-2">
          End of Track
        </p>
      </div>
    </div>
  );
}
