import Link from "next/link";
import { BOOK_INFO } from "@/lib/constants";
import FocusReveal from "./FocusReveal";
import FloatingBookV3 from "./FloatingBookV3";

/**
 * Act I — the book. Editorial two-column: the floating cover on one
 * side, a Didot pitch with a roman-numeral act marker on the other.
 * Server component; the only client island is the floating book itself.
 */
export default function V3Book() {
  return (
    <section id="book" className="relative px-5 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <FocusReveal className="order-1 flex justify-center">
          <FloatingBookV3 />
        </FocusReveal>

        <div className="order-2">
          <FocusReveal className="mb-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-slate-400/80">
            <span className="font-serif text-base italic text-warm-gold/80">
              I
            </span>
            <span className="h-px w-8 bg-slate-400/30" />
            The Field Guide
          </FocusReveal>

          <FocusReveal
            as="h2"
            delay={0.08}
            className="font-serif text-4xl font-light leading-[1.05] tracking-tight text-text-light sm:text-5xl"
          >
            The playbook you were never meant to see
          </FocusReveal>

          <FocusReveal
            as="p"
            delay={0.16}
            className="mt-6 max-w-md text-base font-light leading-relaxed text-text-gray"
          >
            Dark psychology and the inner workings of manipulation, written by
            a clinically diagnosed sociopath. Learn how the game is played so no
            one can play it on you.
          </FocusReveal>

          <FocusReveal delay={0.24} className="mt-8 space-y-3">
            {[
              "How manipulation actually works, so nobody can use it on you",
              "Read intent before a word is spoken",
              "Never feel helpless in a relationship again",
            ].map((line) => (
              <div
                key={line}
                className="flex items-start gap-3 text-sm text-slate-200/90"
              >
                <span className="mt-2 h-px w-5 shrink-0 bg-warm-gold/70" />
                <span>{line}</span>
              </div>
            ))}
          </FocusReveal>

          <FocusReveal
            delay={0.32}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <Link
              href="/book"
              className="v3-pill px-8 py-3.5 text-xs font-medium uppercase tracking-[0.25em]"
            >
              Read the Book · ${BOOK_INFO.price}
            </Link>
            <span className="text-[11px] uppercase tracking-[0.25em] text-slate-400/70">
              {BOOK_INFO.wordCount} words · {BOOK_INFO.chapters} chapters
            </span>
          </FocusReveal>

          <FocusReveal
            as="p"
            delay={0.4}
            className="mt-6 text-[10px] uppercase tracking-[0.3em] text-slate-500/70"
          >
            As featured on LADbible · Unilad · Yahoo
          </FocusReveal>
        </div>
      </div>
    </section>
  );
}
