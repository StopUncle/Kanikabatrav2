import Link from "next/link";
import {
  Check,
  ShieldCheck,
  ArrowRight,
  Brain,
  HelpCircle,
  Sparkles,
  Mic,
  Users,
  BookOpen,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import FloatingConsiliumSeal from "@/components/consilium/FloatingConsiliumSeal";
import Reveal from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import { catalogueStats } from "@/lib/simulator/stats";

/**
 * Pillar Two, the Consilium. The homepage's recurring-revenue sell.
 *
 * v2 is a server component on purpose. It reads catalogueStats straight
 * from the single source of truth (no more hardcoded numbers, and no
 * prop drilling), and it can render the live SocialProofTicker, which is
 * itself an async server component and therefore cannot live inside a
 * client component. The only client pieces are the animated seal and the
 * Reveal / Magnetic wrappers, all rendered as islands.
 *
 * Structure: a bracketed Pillar Two header, an intro pairing the animated
 * seal with the transformation headline, a full-width six-card "what's
 * inside" grid (each feature with its own icon and a live count where one
 * exists), and a focused offer card with anchor pricing, the live member
 * ticker, the guarantee, and one strong Join CTA straight to checkout.
 */
interface InsideItem {
  icon: LucideIcon;
  title: string;
  detail: string;
  value: string;
}

export default function ConsiliumOverview() {
  const { scenarios, scenes, tacticsTaught, redFlagsTaught } = catalogueStats;

  const inside: InsideItem[] = [
    {
      icon: Brain,
      title: "The Dark Mirror Simulator",
      detail: `${scenarios} branching scenarios · ${scenes} scenes · ${tacticsTaught} manipulation tactics · ${redFlagsTaught} red flags catalogued`,
      value: "Members only",
    },
    {
      icon: HelpCircle,
      title: "Ask Kanika",
      detail:
        "Submit one question a day. Top-voted get answered by Kanika, by voice or video, in your feed.",
      value: "Members only",
    },
    {
      icon: Sparkles,
      title: "Daily Psychology Drops",
      detail:
        "A 60-card rotating bank. Fresh insight every morning: new tactics, power dynamics, real patterns.",
      value: "$19/mo elsewhere",
    },
    {
      icon: Mic,
      title: "Voice Notes from Kanika",
      detail:
        "Raw, unfiltered audio dropped when something needs to be said. Not on a schedule, when it matters.",
      value: "Members only",
    },
    {
      icon: Users,
      title: "Discussion, Forum & Chat",
      detail:
        "28 themed weekday prompts, 6 forum categories, live chat with members reading the same patterns.",
      value: "Community access",
    },
    {
      icon: BookOpen,
      title: "Member-Only Book Pricing",
      detail:
        "Want the book too? Members get the Sociopathic Dating Bible at $9.99 (normally $24.99).",
      value: "Save 60%",
    },
  ];

  return (
    <section
      id="consilium"
      className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        {/* Pillar Two header. Warm-gold, no repeat of the field-guide line. */}
        <Reveal className="mb-12 text-center sm:mb-16">
          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-warm-gold/50 sm:w-24" />
            <span className="whitespace-nowrap text-[10px] font-light uppercase tracking-[0.4em] text-warm-gold/80 sm:text-xs">
              Pillar Two · The Membership
            </span>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-warm-gold/50 sm:w-24" />
          </div>
          <p className="mx-auto max-w-2xl text-sm font-light italic text-text-gray/80 sm:text-base">
            The private room where the book gets used. Every day, with members
            reading the same situations you are.
          </p>
        </Reveal>

        {/* Intro: animated seal + transformation headline. */}
        <div className="mb-14 grid grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal noScale className="flex justify-center">
            <FloatingConsiliumSeal label="Private Membership" />
          </Reveal>

          <Reveal delay={0.1} className="space-y-6">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-warm-gold sm:text-sm">
                The Consilium · Private Community
              </p>
              <h2 className="text-3xl font-light leading-tight sm:text-4xl lg:text-5xl">
                <span className="text-text-light">Where Dark Psychology</span>
                <br />
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #f3d98a 0%, #d4af37 50%, #9c7a1f 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Stops Being Theory
                </span>
              </h2>
            </div>
            <p className="text-base leading-relaxed text-text-gray sm:text-lg">
              The book teaches you the patterns. The Consilium is where you{" "}
              <strong className="text-text-light">practice them</strong>.
              Private. Moderated. Built for women done being the ones who get
              played.
            </p>
            <div className="glass-card border-l-4 border-warm-gold p-4">
              <p className="text-base italic leading-relaxed text-text-light sm:text-lg">
                &ldquo;Life changing.&rdquo;
              </p>
              <p className="mt-2 text-sm text-warm-gold">Inner Circle member</p>
            </div>
          </Reveal>
        </div>

        {/* What's inside, full-width six-card grid. */}
        <Reveal className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-warm-gold/80">
            What&apos;s inside the membership
          </p>
        </Reveal>

        <div className="mb-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {inside.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal
                key={item.title}
                index={index}
                className="sheen group relative flex h-full flex-col rounded-2xl border border-warm-gold/15 bg-gradient-to-br from-deep-burgundy/25 to-deep-navy/15 p-5 transition-colors hover:border-warm-gold/35"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-warm-gold/30 bg-warm-gold/10">
                    <Icon size={16} strokeWidth={1.6} className="text-warm-gold" />
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-text-gray/70">
                    {item.value}
                  </span>
                </div>
                <h3 className="mb-1.5 text-base font-medium text-text-light">
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed text-text-gray">
                  {item.detail}
                </p>
              </Reveal>
            );
          })}
        </div>

        {/* Offer card. Anchor price, live ticker, guarantee, Join CTA. */}
        <Reveal>
          <div className="sheen relative mx-auto max-w-2xl rounded-2xl border border-warm-gold/30 bg-gradient-to-br from-deep-burgundy/30 via-deep-black/70 to-deep-navy/40 p-6 sm:p-8">
            <div className="mb-6 flex flex-col items-center gap-3 sm:flex-row sm:items-baseline sm:justify-between">
              <div className="text-center sm:text-left">
                <p className="text-xs uppercase tracking-[0.2em] text-warm-gold">
                  Full membership
                </p>
                <p className="mt-1 text-sm text-text-gray">
                  Everything above. One price.
                </p>
              </div>
              <div className="text-center sm:text-right">
                <span className="gradient-text-gold text-4xl font-light tabular-nums">
                  $29
                </span>
                <span className="ml-1 text-sm font-light text-text-gray/70">
                  /mo
                </span>
                <p className="mt-1 text-[11px] text-text-gray/70">
                  or $290/year · 2 months free
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <Magnetic className="block">
                <Link
                  href="/consilium/apply"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-warm-gold px-6 py-4 text-sm font-semibold tracking-wide text-deep-black transition-all hover:bg-warm-gold/90 hover:shadow-[0_14px_44px_-12px_rgba(212,175,55,0.6)] sm:text-base"
                >
                  Join the Consilium, $29/mo
                  <ArrowRight size={16} />
                </Link>
              </Magnetic>

              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-text-gray/70">
                <span>Instant access</span>
                <span className="text-warm-gold/40">·</span>
                <span>Cancel anytime</span>
                <span className="text-warm-gold/40">·</span>
                <span>No application</span>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-text-gray">
                <ShieldCheck size={14} className="shrink-0 text-warm-gold" />
                <span>
                  Spend 7 days inside. If it&apos;s not the most useful $29
                  you&apos;ve spent, full refund.
                </span>
              </div>

              <div className="flex flex-col items-center gap-2 border-t border-white/5 pt-4 text-center sm:flex-row sm:justify-between">
                <Link
                  href="/consilium"
                  className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-warm-gold transition-colors hover:text-warm-gold/80"
                >
                  See everything inside
                  <ArrowRight size={13} />
                </Link>
                <p className="text-[11px] text-text-gray/60">
                  Or start with the{" "}
                  <Link
                    href="/book"
                    className="text-warm-gold/90 underline-offset-2 transition-colors hover:text-warm-gold hover:underline"
                  >
                    book + 1 month for $39
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
