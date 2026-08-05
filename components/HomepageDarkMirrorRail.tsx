import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Slim pill row surfacing the Dark Mirror entry points on the homepage,
 * directly below the Hero. Three pills side by side, left to right: no
 * cards, no icons, no heading block, so the Book showcase below stays
 * visible above the fold.
 *
 * Why it lives here: the Mini quiz + Starter Pack are the only $0
 * email-capture surfaces on the site. Without a homepage tile, organic
 * and bio-link traffic lands on a page that immediately asks for the
 * book or the membership with no $0 next step.
 *
 * Order matches /dark-mirror: free, free, paid.
 */

const PATHS = [
  {
    href: "/dark-mirror/mini",
    meta: "Free · 90 sec",
    title: "Mini Dark Mirror",
  },
  {
    href: "/dark-mirror/starter-pack",
    meta: "Free · email",
    title: "Starter Pack",
  },
  {
    href: "/quiz",
    meta: "Free to take",
    title: "Full Assessment",
  },
];

export default function HomepageDarkMirrorRail() {
  return (
    <section className="py-8 sm:py-10 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <p className="text-center text-warm-gold/60 uppercase tracking-[0.35em] text-[10px] mb-3">
          Or start free. Find your axis
        </p>
        <div
          className="flex items-center gap-2.5 overflow-x-auto sm:justify-center px-1 pb-1"
          style={{ scrollbarWidth: "none" }}
        >
          {PATHS.map((path) => (
            <Link
              key={path.href}
              href={path.href}
              className="group inline-flex items-center gap-2 rounded-full border border-warm-gold/25 bg-deep-black/40 backdrop-blur-sm px-4 py-2 sm:px-5 hover:border-warm-gold/60 hover:bg-warm-gold/[0.06] transition-all duration-300"
            >
              <span className="text-[13px] font-light text-text-light whitespace-nowrap">
                {path.title}
              </span>
              <span className="text-[9px] uppercase tracking-[0.18em] text-warm-gold/70 whitespace-nowrap">
                {path.meta}
              </span>
              <ArrowRight
                size={12}
                strokeWidth={1.8}
                className="text-warm-gold opacity-0 -ml-1 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:ml-0 transition-all duration-300"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
