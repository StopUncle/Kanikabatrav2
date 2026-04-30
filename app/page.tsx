import { Metadata } from "next";
import Link from "next/link";
import BackgroundEffects from "@/components/BackgroundEffects";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BookShowcase from "@/components/BookShowcase";
import CoachingSection from "@/components/CoachingSection";
import Testimonial from "@/components/Testimonial";
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
        url: "/og-image.jpg",
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
    images: ["/og-image.jpg"],
  },
};

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <BackgroundEffects />
      <Header />

      {/*
        Homepage flow. Book sits immediately after Hero as the first
        tangible offer (concrete, single-price, skimmable), then the
        Consilium teaser follows as the interactive flagship. This order
        matches how cold traffic actually converts: the book is the easy
        yes; the Consilium is the deeper commitment the demo earns.

        1. Hero             , two primary CTAs, set the stakes
        2. Book showcase    . PRIMARY #1. Concrete field guide.
        3. Consilium teaser . PRIMARY #2. Live SimulatorPreview with a
                               "Try it free" dual CTA hitting /try.
        4. Testimonial
        5. Coaching         , premium tier
        6. SocialHub
        7. Blog             , conditional
        8. Final CTA        , blended Book + Consilium, coaching tertiary
        9. Newsletter

        Removed: AskKanika (Q&A), standalone Quiz CTA section, standalone
        stats section (redundant with SocialHub). The quiz still exists
        as a product, just not a homepage tile.
      */}
      <main className="relative z-10 pt-20">
        <Hero />

        {/* PRIMARY #1. Book (the tangible field guide) */}
        <BookShowcase />

        {/* PRIMARY #2. Consilium overview. Plain-English pitch of what
            the membership IS so cold traffic can answer "what does
            $29/mo get me?" in one glance. Lives ABOVE the simulator
            teaser so visitors understand the product before being
            asked to feel one feature of it. */}
        <ConsiliumOverview />

        {/* PRIMARY #2 (continued). Live simulator demo. Now framed as
            the flagship feature inside the Consilium, not a separate
            offer. Eyebrow updated accordingly. */}
        <ConsiliumSimulatorTeaser variant="homepage" />

        <section id="testimonials">
          <Testimonial />
        </section>

        {/* Premium tier */}
        <CoachingSection />

        <SocialHub />

        {latestPosts.length > 0 && (
          <section className="py-24 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <p className="text-accent-gold uppercase tracking-[0.3em] text-sm mb-4">
                  Latest Insights
                </p>
                <h2 className="text-3xl md:text-4xl font-extralight text-white mb-4 tracking-wide">
                  From the <span className="text-accent-gold">Blog</span>
                </h2>
                <p className="text-text-gray max-w-lg mx-auto">
                  Dark psychology, power dynamics, and the strategic
                  influence they won&apos;t teach you.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                {latestPosts.map((post, index) => (
                  <PostCard key={post.slug} post={post} index={index} />
                ))}
              </div>
              <div className="text-center mt-12">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-3 px-8 py-3 text-sm font-medium uppercase tracking-wider text-accent-gold border border-accent-gold/30 rounded-full hover:bg-accent-gold/10 hover:border-accent-gold/50 transition-all duration-300"
                >
                  View All Articles
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Final CTA, blended.
            Book + Consilium get equal visual weight as two primary cards.
            Coaching sits beneath as a small tertiary link. The previous
            version buried Consilium entirely and forced a binary pick
            between Book and Coaching. This blends them the way the
            funnel actually works: book is the field guide, Consilium
            is the practice ground, coaching is the personal upgrade. */}
        <section className="py-28 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-accent-gold uppercase tracking-[0.3em] text-sm mb-4">
                Two ways in
              </p>
              <h2 className="text-4xl md:text-5xl font-light mb-4">
                <span className="text-text-light">
                  Ready to See What&apos;s
                </span>{" "}
                <span className="gradient-text">Behind the Mask?</span>
              </h2>
              <p className="text-text-gray text-lg max-w-2xl mx-auto font-light">
                Read the book. Practice inside the Consilium. The two pair —
                most members do both.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Book card */}
              <Link
                href="/book"
                className="group relative overflow-hidden rounded-2xl border border-accent-gold/25 bg-gradient-to-br from-deep-black/80 via-deep-burgundy/20 to-deep-black/80 p-8 hover:border-accent-gold/50 hover:shadow-[0_20px_60px_-20px_rgba(212,175,55,0.35)] transition-all duration-300"
              >
                <div className="flex items-baseline justify-between mb-4">
                  <p className="text-accent-gold/80 uppercase tracking-[0.3em] text-xs">
                    The Field Guide
                  </p>
                  <p className="text-accent-gold text-lg font-light tabular-nums">
                    $24.99
                  </p>
                </div>
                <h3 className="text-2xl md:text-3xl font-extralight text-text-light mb-3 tracking-wide leading-tight">
                  Sociopathic Dating Bible
                </h3>
                <p className="text-text-gray text-sm font-light leading-relaxed mb-6">
                  70,000 words. 15 chapters plus two bonus chapters on
                  narcissists and avoidants. The pattern book that pairs
                  with the simulator.
                </p>
                <div className="inline-flex items-center gap-2 text-accent-gold text-sm font-medium uppercase tracking-wider">
                  Get the book
                  <span className="transition-transform group-hover:translate-x-1">
                    &rarr;
                  </span>
                </div>
              </Link>

              {/* Consilium card */}
              <Link
                href="/consilium"
                className="group relative overflow-hidden rounded-2xl border border-warm-gold/30 bg-gradient-to-br from-deep-burgundy/30 via-deep-navy/30 to-deep-black/80 p-8 hover:border-warm-gold/60 hover:shadow-[0_20px_60px_-20px_rgba(212,175,55,0.45)] transition-all duration-300"
              >
                <div className="flex items-baseline justify-between mb-4">
                  <p className="text-warm-gold uppercase tracking-[0.3em] text-xs">
                    The Practice Ground
                  </p>
                  <p className="text-warm-gold text-lg font-light tabular-nums">
                    $29<span className="text-text-gray/70 text-xs">/mo</span>
                  </p>
                </div>
                <h3 className="text-2xl md:text-3xl font-extralight text-text-light mb-3 tracking-wide leading-tight">
                  The Consilium
                </h3>
                <p className="text-text-gray text-sm font-light leading-relaxed mb-6">
                  {catalogueStats.scenarios} branching scenarios. {catalogueStats.scenes} scenes. {catalogueStats.tacticsTaught} manipulation tactics
                  to spot. Plus voice notes, forum, and courses.
                </p>
                <div className="inline-flex items-center gap-2 text-warm-gold text-sm font-medium uppercase tracking-wider">
                  Step inside
                  <span className="transition-transform group-hover:translate-x-1">
                    &rarr;
                  </span>
                </div>
              </Link>
            </div>

            <p className="text-center text-text-gray/60 text-sm mt-10 font-light">
              Want direct 1:1 access?{" "}
              <Link
                href="/coaching"
                className="text-accent-gold hover:text-accent-gold/80 transition-colors"
              >
                Explore Private Coaching &rarr;
              </Link>
            </p>
          </div>
        </section>

        <section className="py-20 px-4 border-t border-accent-gold/10">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-light mb-4 gradient-text-gold">
              Psychology of Power. Weekly
            </h3>
            <p className="text-text-gray mb-8">
              Strategic psychology, power dynamics, and the insights they
              don&apos;t teach in school.
            </p>
            <NewsletterForm />
            <p className="text-text-gray text-sm mt-4">
              No spam. Only power. Unsubscribe anytime.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
