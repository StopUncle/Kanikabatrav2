"use client";

import { m } from "framer-motion";
import { Lock } from "lucide-react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

/**
 * Ending-collection tracker shown on the ending screen. Lists every
 * ending a scenario has: the ones the player has already reached read
 * at full strength with a gold "SEEN" tag, the rest stay dimmed and
 * title-masked so a replayer knows how many paths remain without being
 * spoiled on what they are. Turns "already completed" into a hunt.
 */

export type EndingEntry = { id: string; title: string };

export default function EndingsCatalog({
  endings,
  seenIds,
  delay = 0,
}: {
  endings: EndingEntry[];
  seenIds: string[];
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  if (endings.length === 0) return null;

  const seen = new Set(seenIds);
  const foundCount = endings.filter((e) => seen.has(e.id)).length;

  return (
    <m.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="mb-12 flex flex-col items-center gap-3"
    >
      <p className="text-accent-gold/70 text-[10px] uppercase tracking-[0.35em]">
        Endings found ·{" "}
        <span className="text-accent-gold tabular-nums">
          {foundCount} of {endings.length}
        </span>
      </p>
      <div className="w-full max-w-md flex flex-col gap-2">
        {endings.map((e) => {
          const isSeen = seen.has(e.id);
          return (
            <div
              key={e.id}
              className={`flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg border ${
                isSeen
                  ? "bg-deep-black/60 border-accent-gold/30"
                  : "bg-deep-black/30 border-white/5 opacity-45"
              }`}
            >
              <span
                className={`text-sm font-light text-left ${
                  isSeen ? "text-white" : "text-text-gray"
                }`}
              >
                {isSeen ? e.title : "???"}
              </span>
              {isSeen ? (
                <span className="shrink-0 text-accent-gold text-[9px] uppercase tracking-[0.3em]">
                  Seen
                </span>
              ) : (
                <Lock
                  size={13}
                  strokeWidth={1.5}
                  className="shrink-0 text-text-gray/50"
                  aria-label="Not yet found"
                />
              )}
            </div>
          );
        })}
      </div>
    </m.div>
  );
}
