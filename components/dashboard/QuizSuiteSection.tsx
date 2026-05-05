"use client";

import Link from "next/link";
import {
  Snowflake,
  Crown,
  EyeOff,
  Skull,
  Activity,
  Heart,
  Users,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import {
  ADDITIONAL_QUIZZES,
  type QuizRegistryEntry,
} from "@/lib/quiz-registry";

// QuizSuiteSection — the dashboard's "clinic lobby."
//
// Renders the six post-Dark-Mirror quizzes as a card grid. The Dark
// Mirror itself has its own dedicated dashboard card (QuizDashboardCard,
// which surfaces the radar chart + clinical breakdown for the
// already-completed result), so this section is the "what else is on
// offer" view: a row of doors the member can walk through next.
//
// Phase 1 is presentation-only — each card links to its quiz's
// landing page, no per-quiz "completed" state surfaced. The new six
// quizzes persist results to sessionStorage rather than the DB, so a
// dashboard render cannot (yet) know which the user has taken.
// A Phase 2 enhancement (DB-side multi-quiz save + a per-user
// completion map) would let this section surface a "Your last
// score" pill on the cards the user has finished. Out of scope for
// this commit; the lobby works without it.

const ICONS: Record<QuizRegistryEntry["iconKey"], LucideIcon> = {
  snowflake: Snowflake,
  crown: Crown,
  "eye-off": EyeOff,
  skull: Skull,
  activity: Activity,
  heart: Heart,
  family: Users,
  // The Dark Mirror's icon is registered for completeness; this
  // section never renders the mirror entry, but a future hub page
  // might.
  mirror: Crown,
};

const TONES: Record<
  QuizRegistryEntry["tone"],
  { iconBg: string; iconText: string; chipText: string; chipBorder: string }
> = {
  blue: {
    iconBg: "bg-blue-400/10",
    iconText: "text-blue-300",
    chipText: "text-blue-300/80",
    chipBorder: "border-blue-300/25",
  },
  amber: {
    iconBg: "bg-amber-400/10",
    iconText: "text-amber-300",
    chipText: "text-amber-300/80",
    chipBorder: "border-amber-300/25",
  },
  rose: {
    iconBg: "bg-rose-400/10",
    iconText: "text-rose-300",
    chipText: "text-rose-300/80",
    chipBorder: "border-rose-300/25",
  },
  indigo: {
    iconBg: "bg-indigo-400/10",
    iconText: "text-indigo-300",
    chipText: "text-indigo-300/80",
    chipBorder: "border-indigo-300/25",
  },
  emerald: {
    iconBg: "bg-emerald-400/10",
    iconText: "text-emerald-300",
    chipText: "text-emerald-300/80",
    chipBorder: "border-emerald-300/25",
  },
  purple: {
    iconBg: "bg-purple-400/10",
    iconText: "text-purple-300",
    chipText: "text-purple-300/80",
    chipBorder: "border-purple-300/25",
  },
  gold: {
    iconBg: "bg-accent-gold/10",
    iconText: "text-accent-gold",
    chipText: "text-accent-gold/80",
    chipBorder: "border-accent-gold/25",
  },
};

export default function QuizSuiteSection() {
  return (
    <div>
      <p className="text-text-gray text-sm leading-relaxed mb-5">
        Six more calibrated assessments. Each one built on a
        published research instrument; each one with the result page
        written from the inside.
      </p>
      <div className="grid sm:grid-cols-2 gap-3">
        {ADDITIONAL_QUIZZES.map((quiz) => {
          const Icon = ICONS[quiz.iconKey];
          const tone = TONES[quiz.tone];
          return (
            <Link
              key={quiz.slug}
              href={quiz.href}
              className="group block p-4 rounded-xl border border-accent-gold/15 bg-deep-black/40 hover:border-accent-gold/40 hover:bg-deep-black/60 transition-all duration-300"
            >
              <div className="flex items-start gap-3 mb-3">
                <div
                  className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${tone.iconBg}`}
                >
                  <Icon size={16} className={tone.iconText} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-white text-sm font-light group-hover:text-accent-gold transition-colors leading-snug">
                    {quiz.title}
                  </h3>
                  <p className="text-text-gray/70 text-[11px] uppercase tracking-wider mt-0.5">
                    {quiz.caption}
                  </p>
                </div>
                <ArrowRight
                  size={14}
                  strokeWidth={1.5}
                  className="text-text-gray/40 group-hover:text-accent-gold group-hover:translate-x-0.5 transition-all shrink-0 mt-1"
                />
              </div>
              <p className="text-text-gray text-[12px] leading-relaxed mb-3">
                {quiz.blurb}
              </p>
              <div className="flex items-center justify-between">
                <span
                  className={`inline-block px-2 py-0.5 text-[10px] uppercase tracking-wider rounded-full border ${tone.chipText} ${tone.chipBorder}`}
                >
                  {quiz.instrument}
                </span>
                <span className="text-text-gray/50 text-[11px] tabular-nums">
                  {quiz.itemCount} items · ~{quiz.minutes} min
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
