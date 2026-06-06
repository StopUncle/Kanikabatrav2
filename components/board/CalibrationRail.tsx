import Link from "next/link";
import type { CalibrationAnchor } from "@/lib/board/types";
import EditorialPhoto from "./EditorialPhoto";

/**
 * The calibration key, as a fixed reference rail. Serial killers are the
 * ruler's tick marks, NOT entries on the ranked board, so this is styled
 * and placed apart from the ranking at all times. Floor anchor + ceiling
 * anchor, with the teaching line that makes the Factor 1 distinction
 * concrete.
 */
export default function CalibrationRail({
  anchors,
}: {
  anchors: CalibrationAnchor[];
}) {
  if (anchors.length === 0) return null;
  const floor = anchors[0];
  const ceiling = anchors[anchors.length - 1];

  return (
    <section className="rounded-sm border border-warm-gold/15 bg-gradient-to-b from-accent-burgundy/[0.07] to-transparent p-4">
      <h2 className="mb-1 text-[11px] uppercase tracking-[0.25em] text-warm-gold/70">
        The ruler
      </h2>
      <p className="mb-4 text-xs leading-relaxed text-text-gray/70">
        Reference anchors, not rankings. They define the floor and ceiling
        the board is measured against.
      </p>

      <div className="space-y-3">
        {[
          { anchor: floor, tag: "Floor" },
          { anchor: ceiling, tag: "Ceiling" },
        ].map(({ anchor, tag }) => (
          <Link
            key={anchor.id}
            href={`/board/${anchor.slug}`}
            className="flex items-center gap-3 rounded-sm px-1 py-1 transition-colors hover:bg-white/[0.03]"
          >
            <EditorialPhoto name={anchor.name} photoUrl={anchor.photoUrl} size="sm" />
            <div className="min-w-0 flex-1">
              <div className="text-[9px] uppercase tracking-[0.2em] text-text-gray/50">
                {tag}
              </div>
              <div className="truncate font-serif text-sm text-text-light">
                {anchor.name}
              </div>
            </div>
            <span className="font-serif text-lg text-text-gray tabular-nums">
              {anchor.composite}
            </span>
          </Link>
        ))}
      </div>

      <Link
        href="/board/scale"
        className="mt-4 block text-center text-[10px] uppercase tracking-[0.25em] text-warm-gold/70 transition-colors hover:text-warm-gold"
      >
        How to read the scale &rarr;
      </Link>
    </section>
  );
}
