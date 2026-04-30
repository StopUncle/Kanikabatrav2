"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Eye,
  Film,
  AudioLines,
  UserCircle2,
  MessageCircle,
  Check,
  X,
} from "lucide-react";

/**
 * "Your first moves" checklist strip, rendered above the feed for new
 * Consilium members. Five tiles covering the highest-leverage first
 * actions: take the quiz, run a simulator scenario, listen to a voice
 * note, pick a display name, leave a comment.
 *
 * Four of the five tiles read their checked state from DB-backed
 * server signals (passed in via `signals`). The fifth ("Voice Notes —
 * visited?") is purely client-side localStorage since we don't track
 * per-user audio plays. It's decorative, a nudge to open the surface
 * at least once.
 *
 * Auto-hides when every tile is checked OR the member dismisses it
 * via the top-right X. Dismissal is per-device (localStorage) and
 * permanent. Once hidden it stays hidden even if fresh items go
 * unchecked later. The server-rendered initial state is the
 * authoritative "completed" signal; localStorage only layers on top.
 */

interface ServerSignals {
  hasDisplayName: boolean;
  hasQuizResult: boolean;
  hasSimulatorProgress: boolean;
  hasComment: boolean;
}

const DISMISSED_KEY = "consilium:firstMovesDismissed";
const VOICE_NOTES_SEEN_KEY = "consilium:visitedVoiceNotes";

export default function FirstMovesChecklist({
  signals,
}: {
  signals: ServerSignals;
}) {
  const [hydrated, setHydrated] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [voiceNotesSeen, setVoiceNotesSeen] = useState(false);

  useEffect(() => {
    try {
      setDismissed(
        window.localStorage.getItem(DISMISSED_KEY) === "1",
      );
      setVoiceNotesSeen(
        window.localStorage.getItem(VOICE_NOTES_SEEN_KEY) === "1",
      );
    } catch {
      /* private mode / quota, defaults are fine */
    }
    setHydrated(true);
  }, []);

  const tiles = [
    {
      key: "quiz",
      label: "Take the Dark Mirror",
      href: "/consilium/quiz",
      icon: Eye,
      done: signals.hasQuizResult,
    },
    {
      key: "simulator",
      label: "Play Simulator L1",
      href: "/consilium/simulator",
      icon: Film,
      done: signals.hasSimulatorProgress,
    },
    {
      key: "voice",
      label: "Open voice notes",
      href: "/consilium/voice-notes",
      icon: AudioLines,
      done: voiceNotesSeen,
      // Stamp localStorage on click, the route visit itself is enough
      // signal for a decorative tile.
      onClick: () => {
        try {
          window.localStorage.setItem(VOICE_NOTES_SEEN_KEY, "1");
        } catch {
          /* decorative, safe to ignore */
        }
      },
    },
    {
      key: "name",
      label: "Pick a display name",
      href: "/consilium/profile",
      icon: UserCircle2,
      done: signals.hasDisplayName,
    },
    {
      key: "comment",
      label: "Leave a comment",
      href: "#feed",
      icon: MessageCircle,
      done: signals.hasComment,
    },
  ];

  const completed = tiles.filter((t) => t.done).length;
  const allDone = completed === tiles.length;

  // Hide entirely when everything is done, the strip has served its
  // purpose. Also hide before hydration if the server says everything's
  // done; post-hydration we factor in the localStorage-only tile.
  if (!hydrated) {
    const serverCompleted = tiles.filter(
      (t) => t.key !== "voice" && t.done,
    ).length;
    // Pre-hydration, we don't know about voiceNotesSeen. Render the
    // strip unless the 4 server tiles are ALL done (in which case
    // there's nothing left to nudge and a server-only render is safe).
    if (serverCompleted === 4) return null;
  }
  if (hydrated && (allDone || dismissed)) return null;

  const handleDismiss = () => {
    try {
      window.localStorage.setItem(DISMISSED_KEY, "1");
    } catch {
      /* nothing we can do, hide in-memory */
    }
    setDismissed(true);
  };

  return (
    <div className="relative mb-6 rounded-2xl border border-warm-gold/25 bg-gradient-to-br from-deep-burgundy/15 via-deep-black/40 to-deep-navy/20 p-4 sm:p-5 overflow-hidden">
      <button
        onClick={handleDismiss}
        aria-label="Dismiss first moves checklist"
        className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-text-gray/50 hover:text-text-light hover:bg-white/5 transition-colors"
      >
        <X size={14} strokeWidth={1.8} />
      </button>

      <div className="flex items-baseline gap-3 mb-3 pr-8">
        <p className="text-warm-gold text-[10px] uppercase tracking-[0.25em]">
          Your first moves
        </p>
        <p className="text-text-gray/60 text-[10px] uppercase tracking-[0.2em] tabular-nums">
          {completed} of {tiles.length}
        </p>
      </div>

      {/* Scrollable row on mobile, 5-column grid on md+. The horizontal
          scroll is important on phones, forcing a 5-column grid at 375px
          would squash the labels past readability. */}
      <div className="flex gap-2.5 overflow-x-auto md:grid md:grid-cols-5 md:overflow-visible -mx-1 px-1 pb-1 scrollbar-thin">
        {tiles.map((tile) => {
          const Icon = tile.icon;
          return (
            <Link
              key={tile.key}
              href={tile.href}
              onClick={tile.onClick}
              className={`group shrink-0 md:shrink w-[44%] sm:w-[30%] md:w-auto min-h-[96px] rounded-xl border px-3 py-3 flex flex-col items-start gap-2 transition-all duration-200 ${
                tile.done
                  ? "border-warm-gold/30 bg-warm-gold/[0.06]"
                  : "border-white/10 bg-white/[0.02] hover:border-warm-gold/40 hover:bg-warm-gold/[0.04]"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                    tile.done
                      ? "bg-warm-gold/20 border border-warm-gold/40"
                      : "bg-white/[0.04] border border-white/10 group-hover:border-warm-gold/30"
                  }`}
                >
                  {tile.done ? (
                    <Check
                      size={13}
                      strokeWidth={2.5}
                      className="text-warm-gold"
                    />
                  ) : (
                    <Icon
                      size={13}
                      strokeWidth={1.6}
                      className="text-text-gray group-hover:text-warm-gold transition-colors"
                    />
                  )}
                </div>
              </div>
              <p
                className={`text-xs leading-snug font-light ${
                  tile.done
                    ? "text-text-gray/60 line-through decoration-warm-gold/30"
                    : "text-text-light"
                }`}
              >
                {tile.label}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
