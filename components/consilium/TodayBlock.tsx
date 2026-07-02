import Link from "next/link";
import { Check, ArrowRight, Eye, Sparkles } from "lucide-react";
import DailyMissionCard from "./DailyMissionCard";
import type {
  DailyMission,
  MissionCouncilToday,
} from "@/lib/streak/daily-mission";

/**
 * "Today at the Council": the single front door for the daily loop at the
 * top of the feed. Composes the shared Daily Mission (the hero), the Daily
 * Tell, and a freshly published generated scenario (when there is one) so
 * a returning member sees everything today asks of them in one glance
 * instead of hunting across surfaces. Server component, pure data + links.
 *
 * One streak number policy: the unified daily streak renders inside the
 * mission card (and the sidebar identity tile). Per-surface streaks
 * (tells, games) stay on their own pages.
 */
interface Props {
  mission: DailyMission | null;
  missionDone: boolean;
  streakCurrent: number;
  atRisk: boolean;
  tellDoneToday: boolean;
  freshDrop: { scenarioId: string; title: string; tagline: string } | null;
  council: MissionCouncilToday | null;
}

function TodayRow({
  href,
  icon,
  label,
  detail,
  done,
  cta,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  detail: string;
  done?: boolean;
  cta: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-warm-gold/[0.04]"
    >
      <span className="shrink-0 text-warm-gold/80">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-light text-text-light truncate">
          {label}
        </span>
        <span className="block text-[11px] text-text-gray/65 truncate">
          {detail}
        </span>
      </span>
      {done ? (
        <span className="shrink-0 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] text-emerald-300">
          <Check size={13} strokeWidth={2} />
          Done
        </span>
      ) : (
        <span className="shrink-0 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] text-warm-gold/80 group-hover:text-warm-gold">
          {cta}
          <ArrowRight size={13} strokeWidth={1.6} />
        </span>
      )}
    </Link>
  );
}

export default function TodayBlock({
  mission,
  missionDone,
  streakCurrent,
  atRisk,
  tellDoneToday,
  freshDrop,
  council,
}: Props) {
  return (
    <section aria-label="Today at the Council" className="mb-6">
      <p className="px-1 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-text-gray/50">
        Today at the Council
      </p>

      {mission && (
        <DailyMissionCard
          mission={mission}
          doneToday={missionDone}
          streakCurrent={streakCurrent}
          atRisk={atRisk}
          council={council}
        />
      )}

      <div className="mt-2 rounded-2xl border border-warm-gold/15 divide-y divide-warm-gold/10 overflow-hidden">
        <TodayRow
          href="/consilium/instincts/today"
          icon={<Eye size={15} strokeWidth={1.6} />}
          label="Daily Tell"
          detail="Sixty seconds. Read the moment, spot the tell."
          done={tellDoneToday}
          cta="Read it"
        />
        {freshDrop && (
          <TodayRow
            href={`/consilium/simulator/${freshDrop.scenarioId}`}
            icon={<Sparkles size={15} strokeWidth={1.6} />}
            label={`Fresh drop: ${freshDrop.title}`}
            detail={freshDrop.tagline}
            cta="Play it"
          />
        )}
      </div>
    </section>
  );
}
