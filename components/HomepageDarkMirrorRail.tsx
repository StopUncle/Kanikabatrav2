import Link from "next/link";
import { ArrowRight, Sparkles, FileText, Eye } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Reveal from "@/components/motion/Reveal";

/**
 * The free way in. A single segmented band, directly below the Hero,
 * surfacing the three Dark Mirror entry points (two free, one $9.99).
 *
 * Why it exists: the Mini quiz and Starter Pack are the only $0
 * email-capture surfaces on the site. Without a homepage slot, branded
 * and bio-link traffic lands on a page that immediately asks for
 * $25/$29 with no zero-cost next step. This band catches the curious-
 * but-not-ready visitor and routes them into the funnel.
 *
 * v2 collapses the old three-card grid into one connected, bordered
 * band split into three cells. It reads as a single quiet strip between
 * the Hero and the Book rather than three offers competing for the eye,
 * and it takes far less vertical room. Free-first ordering is preserved
 * so phone visitors meet the $0 paths before the upsell.
 */
interface FreePath {
  href: string;
  icon: LucideIcon;
  tag: string;
  title: string;
  blurb: string;
  cta: string;
  paid?: boolean;
}

const PATHS: FreePath[] = [
  {
    href: "/dark-mirror/mini",
    icon: Sparkles,
    tag: "Free · 90 sec",
    title: "Mini Dark Mirror",
    blurb: "Seven scenarios. Your dominant axis, named.",
    cta: "Take the quiz",
  },
  {
    href: "/dark-mirror/starter-pack",
    icon: FileText,
    tag: "Free · inbox",
    title: "Starter Pack",
    blurb: "Five named manipulator tactics. Read once, recognise forever.",
    cta: "Get the pack",
  },
  {
    href: "/quiz",
    icon: Eye,
    tag: "$9.99",
    title: "Full Assessment",
    blurb: "20 scenarios. 6-axis radar. Functioning analysis.",
    cta: "Take the full version",
    paid: true,
  },
];

export default function HomepageDarkMirrorRail() {
  return (
    <section className="relative px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-8 text-center">
          <p className="mb-3 text-[11px] uppercase tracking-[0.35em] text-warm-gold/70">
            Start free
          </p>
          <h2 className="mb-2 text-2xl font-extralight tracking-wide text-text-light sm:text-3xl">
            Find your <span className="gradient-text">axis</span>
          </h2>
          <p className="mx-auto max-w-xl text-sm font-light leading-relaxed text-text-gray">
            A clinical-grade read on which of six personality patterns you sit
            closest to. Three ways in.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid divide-y divide-warm-gold/10 overflow-hidden rounded-2xl border border-warm-gold/20 bg-gradient-to-br from-deep-burgundy/15 to-deep-navy/15 backdrop-blur-sm md:grid-cols-3 md:divide-x md:divide-y-0">
            {PATHS.map((path) => {
              const Icon = path.icon;
              return (
                <Link
                  key={path.href}
                  href={path.href}
                  className="sheen group relative flex flex-col p-6 transition-colors hover:bg-warm-gold/[0.04]"
                >
                  <div className="mb-3 flex items-center gap-2.5">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-warm-gold/40 bg-warm-gold/15">
                      <Icon
                        size={14}
                        strokeWidth={1.6}
                        className="text-warm-gold"
                      />
                    </span>
                    <span
                      className={`text-[10px] uppercase tracking-[0.3em] ${
                        path.paid ? "text-warm-gold" : "text-warm-gold/70"
                      }`}
                    >
                      {path.tag}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-extralight uppercase tracking-wider text-text-light">
                    {path.title}
                  </h3>
                  <p className="mb-4 flex-1 text-sm font-light leading-relaxed text-text-gray">
                    {path.blurb}
                  </p>
                  <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-warm-gold transition-all group-hover:gap-3">
                    {path.cta}
                    <ArrowRight size={14} strokeWidth={1.8} />
                  </span>
                </Link>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
