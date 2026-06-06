import type { Tier } from "@prisma/client";
import { tierMeta } from "@/lib/board/tiers";

/**
 * A quiet tier label. Never garish: restraint is the credibility signal.
 * Top-tier bands (Elevated, High) get a faint accent ring so they read as
 * "over the line" without shouting.
 */
export default function TierBadge({
  tier,
  full = false,
}: {
  tier: Tier;
  full?: boolean;
}) {
  const meta = tierMeta(tier);
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-[0.18em] ${
        meta.isTopTier
          ? "border-warm-gold/40 text-warm-gold/90"
          : "border-white/15 text-text-gray"
      }`}
    >
      {full ? meta.label : meta.badge}
    </span>
  );
}
