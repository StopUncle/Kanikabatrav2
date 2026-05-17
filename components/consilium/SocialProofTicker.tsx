import { getCommunityStats } from "@/lib/community/stats";

interface Props {
  /** Layout variant. "inline" sits in flow as a single line; "card"
   *  renders as a stand-alone stat block on the page. */
  variant?: "inline" | "card";
  /** Optional override class for the wrapping element. */
  className?: string;
}

/**
 * Public-facing social proof ticker. Renders three live numbers:
 * total active members, members who joined this week, voice notes
 * Kanika posted this month. All derived from the prod DB on a
 * 5-minute cache (see lib/community/stats.ts).
 *
 * Numbers gate themselves: if a count is zero the ticker drops that
 * line silently rather than render "0 members joined this week"
 * (which signals dead, not credible). When everything is zero, the
 * component returns null and the page reflows around it.
 *
 * Server component on purpose, so the numbers are baked into the
 * initial HTML for SEO + perceived performance. Cache invalidation
 * runs naturally as the unstable_cache TTL elapses.
 *
 * Evidence base: real-time activity tickers lift conversion 10-15%
 * (ProveSrc); the rationale is loss aversion + bandwagon. The
 * design choice here is restraint: gold dot, small text, no
 * exclamation points. Premium audience does not need to be sold to.
 */
export default async function SocialProofTicker({
  variant = "inline",
  className = "",
}: Props) {
  const { activeMembers, joinedThisWeek, voiceNotesThisMonth } =
    await getCommunityStats();

  const lines: string[] = [];
  if (activeMembers > 0) {
    lines.push(`${activeMembers} active member${activeMembers === 1 ? "" : "s"}`);
  }
  if (joinedThisWeek > 0) {
    lines.push(
      `${joinedThisWeek} joined this week`,
    );
  }
  if (voiceNotesThisMonth > 0) {
    lines.push(
      `${voiceNotesThisMonth} voice note${voiceNotesThisMonth === 1 ? "" : "s"} this month`,
    );
  }

  if (lines.length === 0) return null;

  if (variant === "card") {
    return (
      <div
        className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 p-5 bg-deep-black/40 border border-warm-gold/15 rounded-2xl ${className}`}
        aria-label="Community activity"
      >
        {lines.map((line, i) => (
          <div key={line} className="flex items-center gap-2">
            {i === 0 && (
              <span
                className="relative flex h-2 w-2"
                aria-hidden="true"
              >
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400/60 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
            )}
            <span className="text-text-light/90 text-sm font-light tabular-nums">
              {line}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <p
      className={`flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-text-gray/80 ${className}`}
      aria-label="Community activity"
    >
      <span
        className="relative flex h-1.5 w-1.5"
        aria-hidden="true"
      >
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400/60 opacity-75" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
      </span>
      {lines.map((line, i) => (
        <span key={line} className="tabular-nums">
          {line}
          {i < lines.length - 1 && (
            <span className="ml-3 text-warm-gold/40">·</span>
          )}
        </span>
      ))}
    </p>
  );
}
