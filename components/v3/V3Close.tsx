import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";
import FocusReveal from "./FocusReveal";

/**
 * The close. A final, unhurried decision point and the newsletter.
 * Coaching is one quiet line, not a wall. NewsletterForm is reused as a
 * functional primitive (it owns the capture logic), like the nav.
 */
export default function V3Close() {
  return (
    <section className="relative px-5 py-28 sm:py-36">
      <div className="mx-auto max-w-2xl text-center">
        <FocusReveal className="mb-5 text-[11px] uppercase tracking-[0.4em] text-slate-400/80">
          Two ways in
        </FocusReveal>
        <FocusReveal
          as="h2"
          delay={0.08}
          className="font-serif text-4xl font-light leading-[1.05] tracking-tight text-text-light sm:text-6xl"
        >
          Ready to see behind the mask?
        </FocusReveal>
        <FocusReveal
          as="p"
          delay={0.16}
          className="mx-auto mt-6 max-w-md text-base font-light leading-relaxed text-text-gray"
        >
          Read the book. Practice inside the Consilium. Most members do both.
        </FocusReveal>

        <FocusReveal
          delay={0.24}
          className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row"
        >
          <Link
            href="/book"
            className="v3-pill px-9 py-4 text-xs font-medium uppercase tracking-[0.25em]"
          >
            Read the Book
          </Link>
          <Link
            href="/consilium"
            className="group inline-flex items-center gap-2 py-2 text-xs font-medium uppercase tracking-[0.25em] text-slate-200 transition-colors hover:text-white"
          >
            <span className="v3-link">Enter the Consilium</span>
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </FocusReveal>

        <FocusReveal
          as="p"
          delay={0.3}
          className="mt-7 text-[11px] uppercase tracking-[0.25em] text-slate-500/70"
        >
          Want direct 1:1 access?{" "}
          <Link href="/coaching" className="text-warm-gold/80">
            <span className="v3-link">Explore private coaching</span>
          </Link>
        </FocusReveal>

        <FocusReveal delay={0.1} className="mt-20 border-t border-white/10 pt-12">
          <h3 className="font-serif text-2xl font-light text-text-light">
            Psychology of Power. Weekly.
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm font-light leading-relaxed text-text-gray">
            Strategic psychology and power dynamics they don&apos;t teach in
            school.
          </p>
          <div className="mt-6">
            <NewsletterForm />
          </div>
          <p className="mt-4 text-[10px] uppercase tracking-[0.25em] text-slate-500/70">
            No spam. Only power.
          </p>
        </FocusReveal>
      </div>
    </section>
  );
}
