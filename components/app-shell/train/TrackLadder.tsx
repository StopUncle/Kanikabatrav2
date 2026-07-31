"use client";

import { useState } from "react";
import type { TrackSummary } from "@/lib/simulator/train-data";
import { sealedLine } from "@/lib/simulator/track-gates";
import ChapterTrail from "./ChapterTrail";

/**
 * The tracks as a climb, not a list.
 *
 * The old version was a stack of identical rows: same size, same weight,
 * no sense that one came before another or that anything was earned. A
 * ladder says three things a list cannot. Where you are. What is behind
 * you. What is still shut, and what opens it.
 *
 * A track opens in place rather than linking out. That is the point:
 * handing the member to the old catalog to pick a scenario was the last
 * thing routing anybody out of the app.
 */

type State = "done" | "open" | "sealed";

function stateOf(t: TrackSummary): State {
  if (!t.access.open) return "sealed";
  if (t.total > 0 && t.completed >= t.total) return "done";
  return "open";
}

function Node({ state, active }: { state: State; active: boolean }) {
  const gold = "var(--app-gold)";
  if (state === "done")
    return (
      <span
        className="relative z-10 flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full"
        style={{ background: gold }}
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5">
          <path
            d="M5 12.5l4.5 4.5L19 7.5"
            fill="none"
            stroke="#0a0908"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  if (state === "sealed")
    return (
      <span
        className="relative z-10 flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border"
        style={{ borderColor: "var(--app-line-soft)", background: "var(--app-black)" }}
      >
        <svg viewBox="0 0 24 24" className="h-3 w-3">
          <rect
            x="5"
            y="11"
            width="14"
            height="9"
            rx="2"
            fill="none"
            stroke="var(--app-dim)"
            strokeWidth="1.8"
          />
          <path
            d="M8 11V7.5a4 4 0 0 1 8 0V11"
            fill="none"
            stroke="var(--app-dim)"
            strokeWidth="1.8"
          />
        </svg>
      </span>
    );
  return (
    <span
      className="relative z-10 flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border-2"
      style={{
        borderColor: gold,
        background: "var(--app-black)",
        boxShadow: active ? `0 0 0 5px rgba(212,175,55,0.10)` : undefined,
      }}
    >
      <span
        className="h-[7px] w-[7px] rounded-full"
        style={{ background: gold }}
      />
    </span>
  );
}

export default function TrackLadder({ tracks }: { tracks: TrackSummary[] }) {
  // The first unfinished open track is where the member actually is, so it
  // starts expanded. Everything else is one tap away.
  const current = tracks.find((t) => stateOf(t) === "open");
  const [openTrack, setOpenTrack] = useState<string | null>(
    current?.track ?? null,
  );

  return (
    <div className="relative">
      {/* The spine. Runs behind the nodes, stops short of the last one so
          the climb reads as ending rather than being cut off. */}
      <span
        aria-hidden
        className="absolute left-[13px] top-3 w-px"
        style={{
          bottom: 18,
          background:
            "linear-gradient(180deg, rgba(212,175,55,0.45), rgba(212,175,55,0.10) 55%, rgba(236,231,222,0.05))",
        }}
      />

      <ul className="flex flex-col gap-1">
        {tracks.map((t) => {
          const state = stateOf(t);
          const isOpen = openTrack === t.track;
          const isCurrent = current?.track === t.track;

          return (
            <li key={t.track} className="relative">
              <button
                type="button"
                disabled={state === "sealed"}
                onClick={() => setOpenTrack(isOpen ? null : t.track)}
                className="flex w-full items-start gap-3.5 py-2.5 text-left disabled:cursor-default"
              >
                <Node state={state} active={isCurrent} />

                <span className="min-w-0 flex-1 pt-[1px]">
                  <span className="flex items-baseline gap-2">
                    <span
                      className={`truncate text-app-lead ${
                        state === "sealed" ? "text-[var(--app-dim)]" : ""
                      }`}
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {t.label}
                    </span>
                    {t.newCount > 0 && state !== "sealed" && (
                      <span className="shrink-0 text-app-micro uppercase tracking-app-wide text-[var(--app-rose)]">
                        {t.newCount} new
                      </span>
                    )}
                  </span>

                  <span className="mt-0.5 block truncate text-app-eyebrow text-[var(--app-dim)]">
                    {state === "sealed"
                      ? sealedLine(t.access.opensAtRing ?? 3)
                      : `${t.completed} of ${t.total}`}
                  </span>

                  {/* Progress hairline, open tracks only. A bar under a
                      locked door is just noise. */}
                  {state !== "sealed" && t.total > 0 && (
                    <span className="mt-2 block h-[2px] w-full overflow-hidden rounded-full bg-[rgba(212,175,55,0.12)]">
                      <span
                        className="block h-full rounded-full"
                        style={{
                          width: `${(t.completed / t.total) * 100}%`,
                          background: "var(--app-gold)",
                        }}
                      />
                    </span>
                  )}
                </span>

                {state !== "sealed" && (
                  <span className="shrink-0 pt-1 text-app-eyebrow text-[var(--app-dim)]">
                    {isOpen ? "−" : "+"}
                  </span>
                )}
              </button>

              {isOpen && state !== "sealed" && (
                <div className="ml-[39px] border-l border-[var(--app-line-soft)] pl-3 pr-1">
                  <ChapterTrail track={t} />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
