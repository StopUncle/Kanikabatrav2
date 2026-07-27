import BackgroundEffects from "@/components/BackgroundEffects";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import Link from "next/link";
import {
  generatePersonSchema,
  generateArticleSchema,
  generateBreadcrumbSchema,
} from "@/lib/schema";
import type { Metadata } from "next";

const BASE_URL = "https://kanikarose.com";

// NOTE FOR KANIKA: this is the scaffold. Replace every [bracketed] line with
// your own words. Keep each tenet to ONE bold, standalone sentence: each one is
// a quote a journalist can lift and an AI can cite, so it has to stand alone.
// Aim for about 1,000 words total, 7 to 12 tenets. Do not add em dashes
// anywhere except the signature line at the bottom.

export const metadata: Metadata = {
  title: "The Manifesto | Kanika Batra",
  description:
    "The Kanika Batra manifesto: what a diagnosed sociopath, clinically assessed as Factor 1 psychopathy, believes about power, manipulation, and the psychology they never taught you.",
  keywords:
    "kanika batra manifesto, dark psychology manifesto, factor 1 psychopathy, diagnosed sociopath, psychology of power",
  openGraph: {
    title: "The Kanika Batra Manifesto",
    description:
      "What a diagnosed sociopath, clinically assessed as Factor 1, believes about power and the psychology they never taught you.",
    type: "article",
    url: `${BASE_URL}/manifesto`,
    images: [
      {
        url: "/api/og?title=The%20Manifesto&subtitle=Kanika%20Batra",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Kanika Batra Manifesto",
    description:
      "What a diagnosed sociopath, clinically assessed as Factor 1, believes about power.",
    images: ["/api/og?title=The%20Manifesto&subtitle=Kanika%20Batra"],
  },
  alternates: {
    canonical: `${BASE_URL}/manifesto`,
  },
};

// KANIKA: one bold belief per line, one sentence each, each quotable on its own.
// Delete the brackets and write your real tenets. Keep 7 to 12. Cut any that are
// not sharp.
const TENETS: string[] = [
  "[Tenet 1: your single strongest belief, one sentence. This is the one most likely to get quoted, put your best line here.]",
  "[Tenet 2: one bold belief, one sentence.]",
  "[Tenet 3: one bold belief, one sentence.]",
  "[Tenet 4: one bold belief, one sentence.]",
  "[Tenet 5: one bold belief, one sentence.]",
  "[Tenet 6: one bold belief, one sentence.]",
  "[Tenet 7: one bold belief, one sentence.]",
  "[Tenet 8: one bold belief, one sentence.]",
  "[Tenet 9: one bold belief, one sentence.]",
  "[Tenet 10: one bold belief, one sentence. Optional, cut down to 7 if the weaker ones do not earn their place.]",
];

export default function ManifestoPage() {
  const personSchema = generatePersonSchema();
  const articleSchema = generateArticleSchema({
    title: "The Kanika Batra Manifesto",
    description:
      "The Kanika Batra manifesto on power, manipulation, and the psychology they never taught you, from a diagnosed sociopath clinically assessed as Factor 1 psychopathy.",
    publishedAt: "2026-06-18",
    slug: "manifesto",
    category: "Manifesto",
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: BASE_URL },
    { name: "Manifesto", url: `${BASE_URL}/manifesto` },
  ]);

  return (
    <>
      <JsonLd data={[personSchema, articleSchema, breadcrumbSchema]} />
      <BackgroundEffects />
      <Header />

      <main className="relative z-10 pt-28 pb-24 px-4">
        <article className="max-w-3xl mx-auto">
          {/* Eyebrow */}
          <p className="text-center text-accent-gold text-sm tracking-[0.3em] uppercase mb-8">
            The Manifesto
          </p>

          {/* OPENING DECLARATION
              KANIKA: 2 to 3 sentences that state your core thesis. This is the
              single most important part, it gets quoted in every article and
              screenshotted by your audience. The Factor 1 reframe belongs here.
              Replace the bracketed text below. */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extralight leading-snug text-white text-center mb-10">
            [Opening declaration: 2 to 3 sentences stating your core thesis. The
            most-quoted lines on the whole site. Make every word earn its place.]
          </h1>

          <div className="mx-auto w-16 h-px bg-accent-gold/40 mb-14" />

          {/* TENETS */}
          <ol className="space-y-8">
            {TENETS.map((tenet, i) => (
              <li key={i} className="flex gap-5">
                <span className="text-accent-gold/70 font-extralight text-xl tabular-nums pt-0.5 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-lg sm:text-xl font-light text-text-light leading-relaxed">
                  {tenet}
                </p>
              </li>
            ))}
          </ol>

          <div className="mx-auto w-16 h-px bg-accent-gold/40 my-14" />

          {/* CLOSING STATEMENT
              KANIKA: 1 to 2 sentences. The line you want to own, the one people
              remember. Then the signature stays as-is. */}
          <p className="text-xl sm:text-2xl font-light text-white text-center leading-snug mb-8">
            [Closing statement: 1 to 2 sentences. The line you want to be known
            for.]
          </p>

          <p className="text-center text-accent-gold text-lg tracking-wide">
            &mdash; Kanika Batra
          </p>

          {/* Quiet CTA, does not compete with the manifesto */}
          <div className="mt-20 pt-10 border-t border-gray-800 text-center">
            <p className="text-text-gray text-sm mb-5">
              If this is how you see the world, the rest is here.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center text-sm">
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-accent-gold/40 text-accent-gold uppercase tracking-[0.15em] hover:bg-accent-gold/10 transition-colors"
              >
                Take the Dark Mirror quiz
              </Link>
              <Link
                href="/book"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-gray-700 text-text-gray uppercase tracking-[0.15em] hover:text-white hover:border-gray-500 transition-colors"
              >
                Read the book
              </Link>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
