import Link from "next/link";
import { catalogueStats } from "@/lib/simulator/stats";
import FocusReveal from "./FocusReveal";

/**
 * Act III — the membership, the recurring-revenue sell.
 *
 * Restructured to lead with the flagship: a featured Simulator card with
 * the four big live counts, then the rest of the membership as a numbered
 * list, then an offer panel that anchors the standalone value (~$490)
 * before dropping to $29. No live member ticker, by request. Server
 * component, so the scenario stats never reach the client bundle.
 */
const fmt = (n: number) => n.toLocaleString("en-US");

export default function V3Consilium() {
  const { scenarios, scenes, tacticsTaught, redFlagsTaught } = catalogueStats;

  const stats = [
    { value: fmt(scenarios), label: "Scenarios" },
    { value: fmt(scenes), label: "Scenes" },
    { value: fmt(tacticsTaught), label: "Tactics" },
    { value: fmt(redFlagsTaught), label: "Red flags" },
  ];

  const inside = [
    {
      title: "Ask Kanika",
      detail: "One question a day, answered by voice or video in your feed",
    },
    {
      title: "Daily Psychology Drops",
      detail: "A rotating bank of insight, fresh every morning",
    },
    {
      title: "Voice Notes from Kanika",
      detail: "Raw, unfiltered, dropped when something needs to be said",
    },
    {
      title: "Forum, Chat & Discussion",
      detail: "Members reading the same patterns you are",
    },
    {
      title: "Member Book Pricing",
      detail: "The Sociopathic Dating Bible at $9.99, normally $24.99",
    },
  ];

  const valueStack = [
    { name: "Weekly voice-note debriefs", price: "$200/yr" },
    { name: "The Dark Mirror Simulator", price: "$97" },
    { name: "Daily insight cards", price: "$47" },
    { name: "Ask Kanika queue", price: "$147" },
  ];

  return (
    <section id="consilium" className="relative px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        {/* Header with a small concentric emblem echoing the cover's ring. */}
        <div className="text-center">
          <FocusReveal className="mb-6 flex justify-center">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-warm-gold/40">
              <span className="h-5 w-5 rounded-full border border-warm-gold/70" />
            </span>
          </FocusReveal>
          <FocusReveal className="mb-5 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.4em] text-slate-400/80">
            <span className="font-serif text-base italic text-warm-gold/80">
              III
            </span>
            <span className="h-px w-8 bg-slate-400/30" />
            The Membership
          </FocusReveal>
          <FocusReveal
            as="h2"
            delay={0.08}
            className="font-serif text-4xl font-light leading-[1.05] tracking-tight text-text-light sm:text-5xl"
          >
            Where it stops being theory
          </FocusReveal>
          <FocusReveal
            as="p"
            delay={0.16}
            className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-text-gray"
          >
            The book teaches the patterns. The Consilium is the private room
            where you practice them, every day, with people reading the same
            situations you are.
          </FocusReveal>
        </div>

        {/* Flagship: the Simulator, with the four big counts. */}
        <FocusReveal className="mt-14">
          <div className="relative overflow-hidden rounded-3xl border border-warm-gold/25 bg-gradient-to-b from-warm-gold/[0.07] via-white/[0.02] to-transparent p-8 shadow-[0_30px_80px_-40px_rgba(212,175,55,0.4)] sm:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] max-w-full -translate-x-1/2 rounded-full blur-[90px]"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(212,175,55,0.14), transparent)",
              }}
            />
            <div className="relative">
              <p className="text-[11px] uppercase tracking-[0.35em] text-warm-gold/80">
                The flagship
              </p>
              <h3 className="mt-3 font-serif text-3xl font-light text-text-light sm:text-4xl">
                The Dark Mirror Simulator
              </h3>
              <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-text-gray sm:text-base">
                Every message has a tell. You practice reading them across
                branching scenarios, with consequences, until it becomes
                reflex.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="font-serif text-3xl font-light tabular-nums text-warm-gold sm:text-4xl">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-slate-400/70">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FocusReveal>

        {/* The rest of the membership. */}
        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-x-12 gap-y-0 sm:grid-cols-2">
          {inside.map((item, i) => (
            <FocusReveal
              key={item.title}
              index={i}
              className="flex gap-5 border-t border-white/10 py-5"
            >
              <span className="pt-0.5 font-serif text-sm italic tabular-nums text-warm-gold/70">
                {String(i + 2).padStart(2, "0")}
              </span>
              <div>
                <h4 className="text-base font-medium text-text-light">
                  {item.title}
                </h4>
                <p className="mt-1 text-sm font-light leading-relaxed text-text-gray">
                  {item.detail}
                </p>
              </div>
            </FocusReveal>
          ))}
        </div>

        {/* Offer panel: anchor the standalone value, then drop to $29. */}
        <FocusReveal className="mx-auto mt-14 max-w-xl">
          <div className="relative overflow-hidden rounded-3xl border border-warm-gold/30 bg-[#0b0b13]/85 p-8 shadow-[0_0_60px_-20px_rgba(212,175,55,0.35)] sm:p-10">
            <p className="text-center text-[11px] uppercase tracking-[0.35em] text-slate-400/80">
              What you&apos;d pay separately
            </p>
            <div className="mx-auto mt-5 max-w-sm space-y-2.5">
              {valueStack.map((row) => (
                <div
                  key={row.name}
                  className="flex items-baseline justify-between gap-4 text-sm"
                >
                  <span className="font-light text-text-gray">{row.name}</span>
                  <span className="tabular-nums text-warm-gold/80">
                    {row.price}
                  </span>
                </div>
              ))}
              <div className="flex items-baseline justify-between gap-4 border-t border-white/10 pt-3 text-sm">
                <span className="uppercase tracking-[0.2em] text-text-gray">
                  Standalone value
                </span>
                <span className="font-light tabular-nums text-warm-gold">
                  ~$490
                </span>
              </div>
            </div>

            <div className="mt-7 text-center">
              <div className="flex items-baseline justify-center gap-2">
                <span className="font-serif text-6xl font-light leading-none text-warm-gold">
                  $29
                </span>
                <span className="text-sm text-text-gray">/ month</span>
              </div>
              <p className="mt-2 text-[11px] uppercase tracking-[0.25em] text-slate-400/70">
                or $290 / year · two months free
              </p>
            </div>

            <Link
              href="/consilium/apply"
              className="v3-pill mt-8 block w-full px-10 py-4 text-center text-xs font-medium uppercase tracking-[0.25em]"
            >
              Join the Consilium
            </Link>

            <p className="mx-auto mt-5 max-w-sm text-center text-xs font-light leading-relaxed text-text-gray/80">
              Spend 7 days inside. If it&apos;s not the most useful $29
              you&apos;ve spent, full refund. Instant access, cancel anytime.
            </p>
            <div className="mt-5 text-center">
              <Link
                href="/consilium"
                className="text-[11px] uppercase tracking-[0.25em] text-warm-gold/90"
              >
                <span className="v3-link">See everything inside</span>
              </Link>
            </div>
          </div>
        </FocusReveal>
      </div>
    </section>
  );
}
