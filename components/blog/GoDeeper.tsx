import Link from "next/link";
import type { ContextualLinks } from "@/lib/internal-links";

export default function GoDeeper({ links }: { links: ContextualLinks }) {
  const { pillar, quizzes } = links;

  if (!pillar && quizzes.length === 0) {
    return null;
  }

  return (
    <section aria-label="Go deeper">
      <h2 className="text-xl md:text-2xl font-light text-white mb-8">
        Go Deeper
      </h2>

      {pillar && (
        <Link
          href={`/guide/${pillar.slug}`}
          className="group block mb-4 p-6 rounded-xl bg-gradient-to-br from-deep-navy/50 to-accent-burgundy/20 border border-white/10 hover:border-accent-gold/30 transition-all duration-300"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-accent-gold">
            Complete Guide
          </span>
          <p className="mt-2 text-lg font-light text-white group-hover:text-accent-gold transition-colors leading-snug">
            {pillar.title}
          </p>
        </Link>
      )}

      {quizzes.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-4">
          {quizzes.map((quiz) => (
            <Link
              key={quiz.href}
              href={quiz.href}
              className="group block p-5 rounded-xl bg-gradient-to-br from-deep-black/80 to-deep-navy/40 border border-white/10 hover:border-accent-gold/30 transition-all duration-300"
            >
              <span className="text-xs uppercase tracking-wider text-accent-gold/70">
                Take the test
              </span>
              <p className="mt-2 text-white font-light group-hover:text-accent-gold transition-colors leading-snug">
                {quiz.title}
              </p>
              <p className="mt-1 text-sm text-text-gray line-clamp-1">
                {quiz.caption}
              </p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
