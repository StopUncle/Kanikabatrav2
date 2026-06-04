import { SOCIAL_METRICS } from "@/lib/constants";
import FocusReveal from "./FocusReveal";

/**
 * A quiet reach strip. v2 counted these up; v3 keeps them still and
 * lets the numbers carry their own weight. Editorial restraint.
 */
const STATS = [
  { value: SOCIAL_METRICS.combined.totalFollowers, label: "Followers" },
  { value: SOCIAL_METRICS.combined.totalViews, label: "Views" },
  { value: "3", label: "Platforms" },
];

export default function V3Proof() {
  return (
    <section className="relative px-5 py-16">
      <FocusReveal className="mx-auto max-w-3xl">
        <div className="grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/[0.02] py-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="px-3 text-center">
              <div className="font-serif text-3xl font-light tabular-nums text-text-light sm:text-5xl">
                {stat.value}
              </div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.3em] text-slate-400/70">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </FocusReveal>
    </section>
  );
}
