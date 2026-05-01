import Link from "next/link";
import { ArrowRight, Sparkles, FileText, Eye } from "lucide-react";

/**
 * Slim 3-tile rail surfacing the Dark Mirror entry points on the
 * homepage, directly below the Hero. Compressed version of the full
 * /dark-mirror hub — same three paths, smaller footprint, so the
 * Book showcase below is still visible above the fold on mid-tier
 * viewports.
 *
 * Why it lives here: the Mini quiz + Starter Pack are the only $0
 * email-capture surfaces on the site. Without a homepage tile,
 * organic / branded traffic (the cohort that types the URL or comes
 * from the IG bio link) lands on a page that immediately asks for
 * $25 or $29/mo with no $0 next step. This rail catches the curious-
 * but-not-ready visitor and routes them into the email funnel.
 *
 * Visual ranking matches /dark-mirror: free, free, paid. Mobile
 * stacks free-first so phone visitors hit the email-capture options
 * before the upsell.
 */
export default function HomepageDarkMirrorRail() {
  return (
    <section className="py-16 sm:py-20 px-4 relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-warm-gold/70 uppercase tracking-[0.35em] text-[11px] mb-3">
            Or start free
          </p>
          <h2 className="text-3xl sm:text-4xl font-extralight text-text-light tracking-wide mb-3">
            Find your <span className="gradient-text">axis</span>
          </h2>
          <p className="text-text-gray text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed">
            A clinical-grade read on which of six personality patterns you
            sit closest to. Three ways in.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* PATH 1 — Mini Dark Mirror, free */}
          <Link
            href="/dark-mirror/mini"
            className="group bg-gradient-to-br from-deep-burgundy/10 to-deep-navy/15 backdrop-blur-sm border border-warm-gold/25 rounded-2xl p-5 hover:border-warm-gold/50 hover:shadow-[0_12px_40px_-12px_rgba(212,175,55,0.35)] transition-all duration-300 flex flex-col"
          >
            <div className="flex items-center gap-2.5 mb-3">
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-warm-gold/15 border border-warm-gold/40">
                <Sparkles size={14} strokeWidth={1.6} className="text-warm-gold" />
              </div>
              <p className="text-warm-gold/70 text-[10px] uppercase tracking-[0.3em]">
                Free, 90 sec
              </p>
            </div>
            <h3 className="text-lg font-extralight tracking-wider uppercase text-text-light mb-2">
              Mini Dark Mirror
            </h3>
            <p className="text-text-gray font-light text-sm leading-relaxed mb-4 flex-1">
              Seven scenarios. Your dominant axis, named.
            </p>
            <div className="inline-flex items-center gap-2 text-warm-gold text-xs font-medium uppercase tracking-wider group-hover:gap-3 transition-all">
              Take the quiz
              <ArrowRight size={14} strokeWidth={1.8} />
            </div>
          </Link>

          {/* PATH 2 — Starter Pack, free */}
          <Link
            href="/dark-mirror/starter-pack"
            className="group bg-gradient-to-br from-deep-burgundy/10 to-deep-navy/15 backdrop-blur-sm border border-warm-gold/25 rounded-2xl p-5 hover:border-warm-gold/50 hover:shadow-[0_12px_40px_-12px_rgba(212,175,55,0.35)] transition-all duration-300 flex flex-col"
          >
            <div className="flex items-center gap-2.5 mb-3">
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-warm-gold/15 border border-warm-gold/40">
                <FileText size={14} strokeWidth={1.6} className="text-warm-gold" />
              </div>
              <p className="text-warm-gold/70 text-[10px] uppercase tracking-[0.3em]">
                Free, in your inbox
              </p>
            </div>
            <h3 className="text-lg font-extralight tracking-wider uppercase text-text-light mb-2">
              Starter Pack
            </h3>
            <p className="text-text-gray font-light text-sm leading-relaxed mb-4 flex-1">
              Five named manipulator tactics. Read once, recognise forever.
            </p>
            <div className="inline-flex items-center gap-2 text-warm-gold text-xs font-medium uppercase tracking-wider group-hover:gap-3 transition-all">
              Get the pack
              <ArrowRight size={14} strokeWidth={1.8} />
            </div>
          </Link>

          {/* PATH 3 — Full Assessment, paid */}
          <Link
            href="/quiz"
            className="group bg-gradient-to-br from-deep-burgundy/20 to-deep-navy/25 backdrop-blur-sm border border-warm-gold/35 rounded-2xl p-5 hover:border-warm-gold/65 hover:shadow-[0_12px_40px_-12px_rgba(212,175,55,0.4)] transition-all duration-300 flex flex-col relative overflow-hidden"
          >
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.07), transparent 60%)",
              }}
            />
            <div className="relative flex flex-col flex-1">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-warm-gold/20 border border-warm-gold/50">
                  <Eye size={14} strokeWidth={1.6} className="text-warm-gold" />
                </div>
                <p className="text-warm-gold text-[10px] uppercase tracking-[0.3em]">
                  $9.99
                </p>
              </div>
              <h3 className="text-lg font-extralight tracking-wider uppercase text-text-light mb-2">
                Full Assessment
              </h3>
              <p className="text-text-gray font-light text-sm leading-relaxed mb-4 flex-1">
                20 scenarios. 6-axis radar. Functioning analysis.
              </p>
              <div className="inline-flex items-center gap-2 text-warm-gold text-xs font-medium uppercase tracking-wider group-hover:gap-3 transition-all">
                Take the full version
                <ArrowRight size={14} strokeWidth={1.8} />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
