import { Metadata } from "next";
import Link from "next/link";
import BackgroundEffects from "@/components/BackgroundEffects";
import GrainOverlay from "@/components/motion/GrainOverlay";
import GoldDivider from "@/components/motion/GoldDivider";
import Reveal from "@/components/motion/Reveal";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HomepageDarkMirrorRail from "@/components/HomepageDarkMirrorRail";
import BookShowcase from "@/components/BookShowcase";
import NewsletterForm from "@/components/NewsletterForm";
import SocialHub from "@/components/SocialHub";
import PostCard from "@/components/blog/PostCard";
import ConsiliumSimulatorTeaser from "@/components/consilium/ConsiliumSimulatorTeaser";
import ConsiliumOverview from "@/components/consilium/ConsiliumOverview";
import { getAllPosts } from "@/lib/mdx";
import { SITE_CONFIG } from "@/lib/constants";
import { catalogueStats } from "@/lib/simulator/stats";

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} - ${SITE_CONFIG.title}`,
  description: SITE_CONFIG.description,
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  keywords: [
    "Kanika Batra",
    "psychology of power",
    "dark psychology",
    "strategic thinking",
    "power dynamics",
    "social strategy",
    "manipulation defense",
    "dark triad",
    "ASPD",
    "Under the Mask podcast",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  openGraph: {
    title: `${SITE_CONFIG.name} - ${SITE_CONFIG.title}`,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - ${SITE_CONFIG.title}`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} - ${SITE_CONFIG.title}`,
    description: SITE_CONFIG.description,
    images: ["/api/og"],
  },
};

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <BackgroundEffects />
      <GrainOverlay />
      <Header />

      {/*
        Homepage v2, "The Mirror". Two flagship pillars sold in full, the
        rest demoted to links. The order walks cold traffic the way it
        actually converts:

        1. Hero            , the promise + two co-equal CTAs
        2. Free band       , the $0 / $9.99 entry points (email funnel)
        3. Book (Pillar 1) , the tangible field guide, full sell
        4. Simulator demo  , the live flagship feature, played before sold
        5. Consilium (P2)  , the membership the demo earns, full sell
        6. SocialHub       , 670K / 37M reach as proof
        7. Blog            , latest insights, conditional
        8. Final recap     , short two-pillar chooser + coaching link
        9. Newsletter

        Removed vs v1: the five-tier coaching wall (now a single link in
        the recap, full menu lives on /coaching), the standalone
        testimonial (the book and Consilium each carry their own), and the
        repeated "field guide / practice ground" line. GoldDividers mark
        the act breaks; GrainOverlay textures the whole field.
      */}
      <main className="relative z-10 pt-20">
        <Hero />

        <HomepageDarkMirrorRail />

        <GoldDivider className="my-2" />

        {/* Pillar One */}
        <BookShowcase />

        <GoldDivider className="my-2" />

        {/* Flagship feature demo, then the membership it belongs to. */}
        <ConsiliumSimulatorTeaser variant="homepage" />
        <ConsiliumOverview />

        <GoldDivider className="my-2" />

        <SocialHub />

        {latestPosts.length > 0 && (
          <section className="px-4 py-24">
            <div className="mx-auto max-w-7xl">
              <Reveal className="mb-16 text-center">
                <p className="mb-4 text-sm uppercase tracking-[0.3em] text-accent-gold">
                  Latest Insights
                </p>
                <h2 className="mb-4 text-3xl font-extralight tracking-wide text-white md:text-4xl">
                  From the <span className="text-accent-gold">Blog</span>
                </h2>
                <p className="mx-auto max-w-lg text-text-gray">
                  Dark psychology, power dynamics, and the strategic influence
                  they won&apos;t teach you.
                </p>
              </Reveal>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
                {latestPosts.map((post, index) => (
                  <PostCard key={post.slug} post={post} index={index} />
                ))}
              </div>
              <div className="mt-12 text-center">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-3 rounded-full border border-accent-gold/30 px-8 py-3 text-sm font-medium uppercase tracking-wider text-accent-gold transition-all duration-300 hover:border-accent-gold/50 hover:bg-accent-gold/10"
                >
                  View All Articles
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Final recap. A decision point, not another full sell. Book and
            Consilium as two slim cards; coaching is the tertiary link. */}
        <section className="px-4 py-28">
          <div className="mx-auto max-w-5xl">
            <Reveal className="mb-14 text-center">
              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-accent-gold">
                Two ways in
              </p>
              <h2 className="mb-4 text-4xl font-light md:text-5xl">
                <span className="text-text-light">
                  Ready to See What&apos;s
                </span>{" "}
                <span className="gradient-text">Behind the Mask?</span>
              </h2>
              <p className="mx-auto max-w-2xl text-lg font-light text-text-gray">
                Read the book. Practice inside the Consilium. Most members do
                both.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Reveal index={0}>
                <Link
                  href="/book"
                  className="sheen group relative block h-full overflow-hidden rounded-2xl border border-accent-gold/25 bg-gradient-to-br from-deep-black/80 via-deep-burgundy/20 to-deep-black/80 p-8 transition-all duration-300 hover:border-accent-gold/50 hover:shadow-[0_20px_60px_-20px_rgba(212,175,55,0.35)]"
                >
                  <div className="mb-4 flex items-baseline justify-between">
                    <p className="text-xs uppercase tracking-[0.3em] text-accent-gold/80">
                      The Field Guide
                    </p>
                    <p className="text-lg font-light tabular-nums text-accent-gold">
                      $24.99
                    </p>
                  </div>
                  <h3 className="mb-3 text-2xl font-extralight leading-tight tracking-wide text-text-light md:text-3xl">
                    Sociopathic Dating Bible
                  </h3>
                  <p className="mb-6 text-sm font-light leading-relaxed text-text-gray">
                    70,000 words. 15 chapters plus two bonus chapters on
                    narcissists and avoidants. The pattern book that pairs with
                    the simulator.
                  </p>
                  <div className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-accent-gold">
                    Get the book
                    <span className="transition-transform group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </div>
                </Link>
              </Reveal>

              <Reveal index={1}>
                <Link
                  href="/consilium"
                  className="sheen group relative block h-full overflow-hidden rounded-2xl border border-warm-gold/30 bg-gradient-to-br from-deep-burgundy/30 via-deep-navy/30 to-deep-black/80 p-8 transition-all duration-300 hover:border-warm-gold/60 hover:shadow-[0_20px_60px_-20px_rgba(212,175,55,0.45)]"
                >
                  <div className="mb-4 flex items-baseline justify-between">
                    <p className="text-xs uppercase tracking-[0.3em] text-warm-gold">
                      The Practice Ground
                    </p>
                    <p className="text-lg font-light tabular-nums text-warm-gold">
                      $29
                      <span className="text-xs text-text-gray/70">/mo</span>
                    </p>
                  </div>
                  <h3 className="mb-3 text-2xl font-extralight leading-tight tracking-wide text-text-light md:text-3xl">
                    The Consilium
                  </h3>
                  <p className="mb-6 text-sm font-light leading-relaxed text-text-gray">
                    {catalogueStats.scenarios} branching scenarios.{" "}
                    {catalogueStats.scenes} scenes. {catalogueStats.tacticsTaught}{" "}
                    manipulation tactics to spot. Plus voice notes, forum, and
                    courses.
                  </p>
                  <div className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-warm-gold">
                    Step inside
                    <span className="transition-transform group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </div>
                </Link>
              </Reveal>
            </div>

            <p className="mt-10 text-center text-sm font-light text-text-gray/60">
              Want direct 1:1 access?{" "}
              <Link
                href="/coaching"
                className="text-accent-gold transition-colors hover:text-accent-gold/80"
              >
                Explore Private Coaching &rarr;
              </Link>
            </p>
          </div>
        </section>

        <section className="border-t border-accent-gold/10 px-4 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="mb-4 text-2xl font-light gradient-text-gold">
              Psychology of Power. Weekly
            </h3>
            <p className="mb-8 text-text-gray">
              Strategic psychology, power dynamics, and the insights they
              don&apos;t teach in school.
            </p>
            <NewsletterForm />
            <p className="mt-4 text-sm text-text-gray">
              No spam. Only power. Unsubscribe anytime.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
