import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { stepHref } from "@/lib/path/curriculum";
import type { PathState } from "@/lib/path/progress";

/**
 * The Chamber's Path zone (plan §5.3): exactly ONE card, current chapter,
 * next step, one button. The full map lives at /consilium/path; this
 * card never shows the curriculum, only the next action.
 * Server component, no client JS.
 */

type Props = {
  state: PathState;
  gender: "MALE" | "FEMALE" | null;
};

export default function PathCard({ state, gender }: Props) {
  const { current } = state;

  if (!current) {
    return (
      <div className="mb-6 rounded-xl border border-warm-gold/20 bg-warm-gold/[0.03] p-4 sm:p-5">
        <p className="text-warm-gold text-[10px] uppercase tracking-[0.25em] mb-2">
          The Path
        </p>
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-warm-gold shrink-0" strokeWidth={1.5} />
          <p className="text-text-light text-sm font-light">
            All twelve chapters sealed. The seasonal chapters arrive next.
          </p>
        </div>
      </div>
    );
  }

  const { chapter, step } = current;
  const doneInChapter =
    state.chapters.find((c) => c.chapter.id === chapter.id)?.completedSteps ?? 0;

  return (
    <div className="mb-6 rounded-xl border border-warm-gold/20 bg-warm-gold/[0.03] p-4 sm:p-5">
      <div className="flex items-baseline justify-between gap-3 mb-3">
        <p className="text-warm-gold text-[10px] uppercase tracking-[0.25em]">
          The Path · Chapter {chapter.number}
        </p>
        <Link
          href="/consilium/path"
          className="text-text-gray/60 hover:text-text-gray text-[10px] uppercase tracking-[0.2em] transition-colors shrink-0"
        >
          The map
        </Link>
      </div>

      <p className="text-text-light text-base font-light mb-1">{chapter.title}</p>
      <p className="text-text-gray text-sm font-light leading-relaxed mb-4">
        {step.framing}
      </p>

      <div className="flex items-center justify-between gap-3">
        <Link
          href={stepHref(step, gender)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-warm-gold text-deep-black text-sm font-medium hover:bg-warm-gold/90 transition-colors"
        >
          {step.label} <ArrowRight size={15} />
        </Link>
        <div className="flex items-center gap-1.5 shrink-0" aria-label={`${doneInChapter} of ${chapter.steps.length} steps complete`}>
          {chapter.steps.map((s, i) => (
            <span
              key={s.id}
              className={`h-1.5 w-1.5 rounded-full ${
                i < doneInChapter ? "bg-warm-gold" : "bg-white/15"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
