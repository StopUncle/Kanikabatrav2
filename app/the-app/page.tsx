import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Brain,
  ClipboardCheck,
  Crown,
  Droplet,
  Flame,
  Gauge,
  MessageSquare,
  Mic,
  Radar,
  Ruler,
  ScrollText,
  Smartphone,
  Swords,
  Timer,
  Trophy,
  Video,
  type LucideIcon,
} from "lucide-react";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import JsonLd from "@/components/JsonLd";
import { QUIZ_REGISTRY } from "@/lib/quiz-registry";
import { SITE_CONFIG, MEMBERSHIP, BOOK_INFO } from "@/lib/constants";
import {
  PACT_PRICING,
  PACT_PRESETS,
  PACT_CYCLE_WEEKS,
  PACT_GOAL_SLOTS,
} from "@/lib/pact/presets";
import { PACT_OPENS, CONSILIUM_ROOMS, TRUST_LINE } from "@/lib/upgrade/benefits";
import {
  generateBreadcrumbSchema,
  generatePersonSchema,
} from "@/lib/schema";

/**
 * The public, indexable page about the app.
 *
 * The app itself lives at /app (rewritten onto app/hub/**) and every one of
 * its surfaces is behind a login, so Google and the AI crawlers have never
 * been able to see a single word of it. Nine paid and free surfaces, eight
 * quizzes and two subscription rungs existed with no crawlable description
 * anywhere on the site. This page is that description: one URL that answers
 * "what is in the app, what does it cost, what do I get", answer-first, so
 * it is extractable by search and by assistants.
 *
 * It renders from the same sources the product does (QUIZ_REGISTRY,
 * MEMBERSHIP, PACT_PRICING, PACT_PRESETS, the benefit lists), so it cannot
 * advertise a feature set or a price the app does not honour.
 */

const BASE_URL = SITE_CONFIG.url;
const PAGE_URL = `${BASE_URL}/the-app`;

const OG_IMAGE =
  "/api/og?title=The%20App&subtitle=Train%20the%20read.%20Keep%20the%20pact.%20Measure%20the%20change.";

export const metadata: Metadata = {
  title: "The App: Dark Psychology Training, Quizzes and the Blood Pact | Kanika Batra",
  description:
    "Everything inside Kanika Batra's app: the Simulator, Speed Drill, the Daily Tell, the Lab, Receipts, eight calibrated quizzes, the Mark, leaderboards, the 12 Week Transformation, the Blood Pact at $4.99 a week, and the Consilium at $29 a month. Free to start.",
  keywords:
    "dark psychology app, manipulation detection app, sociopath training app, psychology simulator, personality quiz app, blood pact, kanika batra app, social skills training app, read people app, consilium membership",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "The App. Train the Read, Keep the Pact, Measure the Change.",
    description:
      "Branching scenarios, timed drills, a freeform AI sparring room, message analysis, eight clinical-grade quizzes, and a weekly commitment that keeps a permanent record. Free to start.",
    type: "website",
    url: PAGE_URL,
    siteName: SITE_CONFIG.name,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "The App by Kanika Batra",
    description:
      "Simulator, drills, the Lab, Receipts, eight quizzes, the Mark, and the Blood Pact. Free to start.",
    images: [OG_IMAGE],
  },
};

/* ------------------------------------------------------------------ data */

interface Surface {
  name: string;
  icon: LucideIcon;
  rung: "Free" | "Pact" | "Consilium";
  what: string;
}

const TRAIN_SURFACES: Surface[] = [
  {
    name: "The Simulator",
    icon: Swords,
    rung: "Free",
    what: "Branching scenarios you play a line at a time. Every choice scores, optimal reads build a streak, and the debrief tells you what the other person was actually doing. Two modes: Story runs the authored options as tappable cards, Gauntlet hides them, takes your own words, puts a 30 second clock on every turn and pays 50% more XP. Free accounts get the first chapter of every track.",
  },
  {
    name: "Speed Drill",
    icon: Timer,
    rung: "Free",
    what: "Ten reads against the clock, full screen, no chrome. Built for the two minutes you have rather than the hour you do not.",
  },
  {
    name: "The Daily Tell",
    icon: Radar,
    rung: "Free",
    what: "One behavioural tell a day, scored, with a streak that breaks if you skip. Your accuracy accumulates into an Instinct Hex across six axes, with the full history kept.",
  },
  {
    name: "Adventures",
    icon: ScrollText,
    rung: "Free",
    what: "Multi-chapter arcs rather than single scenes. The same engine as the Simulator, over a longer story with consequences that carry between chapters.",
  },
  {
    name: "The Lab",
    icon: Brain,
    rung: "Pact",
    what: "Freeform sparring with an AI opponent that plays a real personality rather than a script. Say what you would actually say and find out what it costs you. One session a day.",
  },
  {
    name: "Receipts",
    icon: MessageSquare,
    rung: "Pact",
    what: "Paste a real message and get the read: what the tactic is, what it is aimed at, and what a reply that does not concede would look like. A free, no-signup version lives at /receipts.",
  },
];

const MEASURE_SURFACES: Surface[] = [
  {
    name: "The Mark",
    icon: Ruler,
    rung: "Pact",
    what: "Your reads, measured. Every scenario, drill, Tell and Lab session adds to one record, so improvement is a number rather than a feeling.",
  },
  {
    name: "The Baseline Read",
    icon: ClipboardCheck,
    rung: "Pact",
    what: "Taken once when you arrive, then monthly. The fixed point everything else is measured against.",
  },
  {
    name: "Your progress",
    icon: Gauge,
    rung: "Free",
    what: "Rank, standing, streaks and badges in one place, plus the Mark panel once you are training.",
  },
  {
    name: "Leaderboards",
    icon: Trophy,
    rung: "Free",
    what: "Standing and Simulator XP behind one toggle. Earned in the open, nobody is placed there.",
  },
];

const KANIKA_SURFACES: Surface[] = [
  {
    name: "The feed",
    icon: Flame,
    rung: "Consilium",
    what: "Kanika's posts, a daily psychology card and a discussion prompt every morning. Members comment and react.",
  },
  {
    name: "Ask Kanika",
    icon: MessageSquare,
    rung: "Consilium",
    what: "One question every 24 hours, anonymous if you want it to be. Upvote what other members asked. You get an email and a notification when she answers.",
  },
  {
    name: "Voice notes",
    icon: Mic,
    rung: "Consilium",
    what: "Her voice, members only. Usually the answer to a question somebody in the room asked.",
  },
  {
    name: "Videos",
    icon: Video,
    rung: "Consilium",
    what: "Kanika on camera, inside the app, not on a platform that decides what she is allowed to say.",
  },
];

interface Purchasable {
  name: string;
  price: string;
  billing: string;
  what: string;
  href: string;
}

const PURCHASABLES: Purchasable[] = [
  {
    name: "The Blood Pact",
    price: PACT_PRICING.weeklyDisplay,
    billing: `or ${PACT_PRICING.annualDisplay}, ${PACT_PRICING.annualSaveLine}`,
    what: "The training rung. Every chapter of every track, the Lab, Receipts, the Mark, the 12 week program, and the weekly challenge with a record that never forgets.",
    href: "/app/pact",
  },
  {
    name: "The Consilium",
    price: MEMBERSHIP.monthly,
    billing: `or ${MEMBERSHIP.annual}, ${MEMBERSHIP.monthsFreeOnAnnual} months free`,
    what: "Everything the Pact opens, plus Kanika herself: the feed, Ask Kanika, voice notes, videos, direct messages, and the book at the member price.",
    href: "/consilium",
  },
  {
    name: "The Sociopathic Dating Bible",
    price: `$${BOOK_INFO.price}`,
    billing: "Consilium members pay $9.99",
    what: `${BOOK_INFO.wordCount} words, ${BOOK_INFO.chapters} chapters, EPUB and PDF. Assigned as required reading by the 12 week program.`,
    href: "/book",
  },
  {
    name: "The Dark Mirror unlock",
    price: "$9.99",
    billing: "one time, earns a credit",
    what: "Your full six-axis quiz result, unredacted. The purchase generates a single-use $9.99 credit against your first month of the Consilium.",
    href: "/quiz",
  },
  {
    name: "1:1 coaching",
    price: "from $297",
    billing: "single sessions to retainers",
    what: "A call with Kanika. Every coaching package includes the book.",
    href: "/coaching",
  },
];

interface Faq {
  q: string;
  a: string;
}

const FAQS: Faq[] = [
  {
    q: "What is the Kanika Batra app?",
    a: "It is a training app for reading and handling people. You practise on branching scenarios, timed drills and a freeform AI sparring room, you paste real messages in for analysis, you take calibrated psychology assessments, and the app measures whether your reads are actually getting better. The paid tier adds a weekly commitment, the Blood Pact, that keeps a permanent record of every week you kept and every week you missed.",
  },
  {
    q: "Is the app free?",
    a: "Yes, to start. A free account gets the first chapter of every training track, the Speed Drill, the Daily Tell, all eight quizzes, your progress and the leaderboards. Paid rungs open the rest: the Blood Pact at $4.99 a week for all training, and the Consilium at $29 a month for training plus Kanika herself.",
  },
  {
    q: "What is the Blood Pact?",
    a: `A paid weekly commitment. You pick a track, tick a four-line oath, write three goals in your own words, draw your signature, and from then on you get one challenge a week. Keep it and it is on your record forever. Miss it and you take a permanent scar. Challenges run on a ${PACT_CYCLE_WEEKS} week cycle, so a full quarter passes before anything repeats. It costs ${PACT_PRICING.weeklyDisplay} or ${PACT_PRICING.annualDisplay}, and active Consilium members already have it at no extra cost.`,
  },
  {
    q: "What is the difference between the Blood Pact and the Consilium?",
    a: "They are rungs, not alternatives. The Pact buys the training: every scenario, the Lab, Receipts, the Mark, the 12 week program and the weekly challenge. The Consilium buys everything the Pact does plus Kanika herself: her feed, Ask Kanika, voice notes, videos and the member book price. The Consilium includes the Pact, so nobody needs both.",
  },
  {
    q: "What quizzes are in the app?",
    a: "Eight. The Dark Mirror across six axes, the Sociopath Test (LSRP-26), the Narcissist Test (NPI-40), the Covert Narcissist Test (HSNS), the Dark Triad Test (SD3), the BPD screen (MSI-BPD), the partner-detection quiz from the book, and the Daughter Pattern Assessment. All are free to take and calibrated against published clinical norms. None of them diagnose anybody.",
  },
  {
    q: "Do I need to download anything?",
    a: "No. The app runs in a browser and installs to your home screen as a progressive web app, so there is no app store and no download. Once installed it can send notifications: when Kanika answers your question, when a new voice note lands, when your streak is at risk, and when your pact week opens. On iPhone, notifications need the app added to the home screen and iOS 16.4 or later.",
  },
  {
    q: "Does the app replace therapy?",
    a: "No. Kanika is not a licensed therapist and nothing in the app treats a mental health condition. The quizzes are calibrated instruments, not diagnoses, and the training is skills practice. If something you are dealing with needs clinical help, get clinical help.",
  },
  {
    q: "Can I cancel?",
    a: "Yes, at any time, from inside the app. Cancelling the Pact breaks it: your record is sealed and kept read-only, and if you sign again it starts as a new pact numbered beside the old scars rather than erasing them. There is a 7-day money-back guarantee on both rungs.",
  },
];

/* --------------------------------------------------------------- schemas */

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "The Kanika Batra App",
  applicationCategory: "LifestyleApplication",
  applicationSubCategory: "Psychology training",
  operatingSystem: "Web, iOS, Android",
  url: PAGE_URL,
  description:
    "A dark psychology training app: branching scenarios, timed drills, freeform AI sparring, message analysis, eight calibrated assessments, and a weekly commitment with a permanent record.",
  author: {
    "@type": "Person",
    name: "Kanika Batra",
    url: BASE_URL,
  },
  offers: [
    {
      "@type": "Offer",
      name: "Free tier",
      price: 0,
      priceCurrency: "USD",
      description:
        "The first chapter of every training track, the Speed Drill, the Daily Tell, all eight quizzes, progress and leaderboards.",
    },
    {
      "@type": "Offer",
      name: "The Blood Pact",
      price: 4.99,
      priceCurrency: "USD",
      description:
        "All training: every chapter, the Lab, Receipts, the Mark, the 12 week program, and one challenge a week.",
    },
    {
      "@type": "Offer",
      name: "The Consilium",
      price: MEMBERSHIP.price,
      priceCurrency: "USD",
      description:
        "Everything the Pact opens, plus the feed, Ask Kanika, voice notes, videos and the member book price.",
    },
  ],
  featureList: [
    "Branching scenario simulator with Story and Gauntlet modes",
    "Timed speed drills",
    "A daily behavioural tell with a streak",
    "Freeform AI sparring (the Lab)",
    "Real message analysis (Receipts)",
    "Eight calibrated psychology assessments",
    "Measured progress (the Mark and the Baseline Read)",
    "Leaderboards, ranks, streaks and badges",
    "The 12 Week Transformation program",
    "The Blood Pact: a weekly commitment with a permanent record",
    "Installable progressive web app with push notifications",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: BASE_URL },
  { name: "The App", url: PAGE_URL },
]);

/* ---------------------------------------------------------------- render */

const RUNG_STYLE: Record<Surface["rung"], string> = {
  Free: "text-emerald-300/80 border-emerald-300/25",
  Pact: "text-rose-300/80 border-rose-300/25",
  Consilium: "text-warm-gold/80 border-warm-gold/25",
};

function SurfaceGrid({ items }: { items: Surface[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {items.map((s) => {
        const Icon = s.icon;
        return (
          <div
            key={s.name}
            className="p-6 bg-deep-black/40 border border-warm-gold/15 rounded-2xl"
          >
            <div className="flex items-start gap-4 mb-3">
              <div className="shrink-0 w-11 h-11 rounded-full bg-warm-gold/10 flex items-center justify-center">
                <Icon size={20} className="text-warm-gold" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-light text-lg leading-snug">
                  {s.name}
                </h3>
                <span
                  className={`inline-block mt-1 px-2 py-0.5 rounded-full border text-[10px] uppercase tracking-[0.2em] ${RUNG_STYLE[s.rung]}`}
                >
                  {s.rung === "Free" ? "Free tier" : `${s.rung} and up`}
                </span>
              </div>
            </div>
            <p className="text-text-gray text-sm leading-relaxed">{s.what}</p>
          </div>
        );
      })}
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <div className="mb-8">
      <p className="text-warm-gold/90 uppercase tracking-[0.3em] text-xs mb-3">
        {eyebrow}
      </p>
      <h2 className="text-3xl md:text-4xl font-extralight tracking-wide uppercase text-white mb-3">
        {title}
      </h2>
      {lede ? (
        <p className="text-text-gray font-light leading-relaxed max-w-3xl">
          {lede}
        </p>
      ) : null}
    </div>
  );
}

export default function TheAppPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={generatePersonSchema()} />
      <BackgroundEffects />
      <Header />

      <main className="min-h-screen pt-28 pb-20 relative z-10">
        <div className="max-w-5xl mx-auto px-4">
          {/* ------------------------------------------------------ hero */}
          <div className="text-center mb-14">
            <p className="text-warm-gold/90 uppercase tracking-[0.3em] text-xs sm:text-sm mb-4">
              The App
            </p>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-extralight tracking-wider uppercase mb-6"
              style={{
                background:
                  "linear-gradient(135deg, #f3d98a 0%, #d4af37 50%, #9c7a1f 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Train the Read
            </h1>
            <p className="text-text-gray text-lg lg:text-xl font-light max-w-2xl mx-auto leading-relaxed">
              Reading people is a skill, and skills answer to practice. This is
              where the practice happens: scenarios you play, drills against a
              clock, an AI that argues back, and a record that says whether any
              of it is working.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-warm-gold text-deep-black font-medium tracking-wider uppercase text-sm transition-all hover:bg-warm-gold/90"
              >
                Start free
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/try"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-warm-gold/30 text-warm-gold font-light tracking-wider uppercase text-sm transition-all hover:border-warm-gold/60"
              >
                Play a scenario first
              </Link>
            </div>
            <p className="mt-4 text-xs text-text-gray/60 font-light">
              {TRUST_LINE}
            </p>
          </div>

          {/* --------------------------------------- answer-first key facts */}
          <section className="mb-20 p-8 rounded-2xl border border-warm-gold/20 bg-gradient-to-br from-deep-burgundy/25 to-deep-navy/10">
            <h2 className="text-warm-gold text-[11px] uppercase tracking-[0.3em] mb-5">
              In short
            </h2>
            <ul className="space-y-3 text-text-gray font-light leading-relaxed">
              <li>
                <strong className="text-white font-normal">What it is</strong>{" "}
                &mdash; a psychology training app built by Kanika Batra, a
                clinically diagnosed sociopath, teaching the reads and moves
                most people only learn by being on the wrong end of them.
              </li>
              <li>
                <strong className="text-white font-normal">
                  What you actually do in it
                </strong>{" "}
                &mdash; play branching scenarios, run timed drills, spar with
                an AI in your own words, paste real messages in for analysis,
                and take calibrated assessments.
              </li>
              <li>
                <strong className="text-white font-normal">
                  What makes it different
                </strong>{" "}
                &mdash; it measures you. The Mark turns every session into one
                score, so progress is evidence rather than a feeling.
              </li>
              <li>
                <strong className="text-white font-normal">
                  The commitment product
                </strong>{" "}
                &mdash; the Blood Pact: one challenge a week, kept weeks
                recorded permanently, missed weeks scarred permanently.
              </li>
              <li>
                <strong className="text-white font-normal">Cost</strong>{" "}
                &mdash; free to start. {PACT_PRICING.weeklyDisplay} for all
                training, {MEMBERSHIP.monthly} for training plus Kanika
                herself.
              </li>
              <li>
                <strong className="text-white font-normal">Where</strong>{" "}
                &mdash; in the browser, installable to your home screen. No app
                store, no download.
              </li>
            </ul>
          </section>

          {/* ------------------------------------------------ the three rungs */}
          <section className="mb-20">
            <SectionHeading
              eyebrow="What it costs"
              title="Three rungs"
              lede="Not three versions of the same room. Each rung buys something the one below it does not have, and the top rung contains the middle one."
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className="p-6 rounded-2xl border border-emerald-300/20 bg-deep-black/40">
                <p className="text-emerald-300/80 text-[11px] uppercase tracking-[0.25em] mb-2">
                  Free
                </p>
                <p className="text-white text-3xl font-extralight mb-4">$0</p>
                <ul className="space-y-2 text-text-gray text-sm font-light leading-relaxed">
                  <li>The first chapter of every training track</li>
                  <li>The Speed Drill and the Daily Tell, every day</li>
                  <li>All eight quizzes</li>
                  <li>Your rank, streaks, badges and the leaderboards</li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl border border-rose-300/30 bg-gradient-to-b from-deep-burgundy/30 to-deep-black/40">
                <p className="text-rose-300/80 text-[11px] uppercase tracking-[0.25em] mb-2">
                  The Blood Pact
                </p>
                <p className="text-white text-3xl font-extralight mb-1">
                  {PACT_PRICING.weeklyDisplay}
                </p>
                <p className="text-text-gray/70 text-xs font-light mb-4">
                  or {PACT_PRICING.annualDisplay},{" "}
                  {PACT_PRICING.annualSaveLine}
                </p>
                <ul className="space-y-2 text-text-gray text-sm font-light leading-relaxed">
                  {PACT_OPENS.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-2xl border border-warm-gold/30 bg-gradient-to-b from-deep-navy/30 to-deep-black/40">
                <p className="text-warm-gold/90 text-[11px] uppercase tracking-[0.25em] mb-2">
                  The Consilium
                </p>
                <p className="text-white text-3xl font-extralight mb-1">
                  {MEMBERSHIP.monthly}
                </p>
                <p className="text-text-gray/70 text-xs font-light mb-4">
                  or {MEMBERSHIP.annual},{" "}
                  {MEMBERSHIP.monthsFreeOnAnnual} months free
                </p>
                <ul className="space-y-2 text-text-gray text-sm font-light leading-relaxed">
                  <li className="text-white/80">
                    Everything the Blood Pact opens, included.
                  </li>
                  {CONSILIUM_ROOMS.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* ---------------------------------------------------- training */}
          <section className="mb-20">
            <SectionHeading
              eyebrow="Train"
              title="Six ways to practise"
              lede="Practice reads people faster than theory ever will. Every surface here is a different way of putting you in the room before you feel ready."
            />
            <SurfaceGrid items={TRAIN_SURFACES} />
          </section>

          {/* ----------------------------------------------------- measure */}
          <section className="mb-20">
            <SectionHeading
              eyebrow="Measure"
              title="Proof, not vibes"
              lede="The claim this app makes is measured progress, so the measuring is a first-class surface rather than a stat buried in a settings page."
            />
            <SurfaceGrid items={MEASURE_SURFACES} />
          </section>

          {/* ----------------------------------------------------- quizzes */}
          <section className="mb-20">
            <SectionHeading
              eyebrow="Test yourself"
              title="Eight assessments"
              lede="Calibrated against published clinical norms, free to take, and written by an author who holds the diagnosis half of them are built to detect. They are instruments, not diagnoses."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {QUIZ_REGISTRY.map((q) => (
                <Link
                  key={q.slug}
                  href={q.href}
                  className="group block p-5 bg-deep-black/40 border border-warm-gold/15 rounded-2xl hover:border-warm-gold/40 transition-all"
                >
                  <h3 className="text-white font-light text-base mb-1 group-hover:text-warm-gold transition-colors">
                    {q.title}
                  </h3>
                  <p className="text-text-gray text-sm leading-relaxed mb-3">
                    {q.blurb}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-text-gray/50">
                    {q.minutes} min · {q.itemCount} items · {q.instrument}
                  </p>
                </Link>
              ))}
            </div>

            <p className="mt-5 text-sm text-text-gray/70 font-light">
              The Dark Mirror is the wide map, and its full six-axis result
              unlocks for $9.99 (or free with the book, or with a Consilium
              membership). The other seven are free end to end.{" "}
              <Link
                href="/quizzes"
                className="text-warm-gold/90 hover:text-warm-gold underline underline-offset-4"
              >
                See the whole suite
              </Link>
              .
            </p>
          </section>

          {/* --------------------------------------------------- the pact */}
          <section className="mb-20">
            <SectionHeading
              eyebrow="The hero product"
              title="The Blood Pact"
              lede="All the benefits of psychopathy, and none of the liabilities. For those committed to ruthless transformation."
            />

            <div className="p-8 rounded-2xl border border-rose-300/25 bg-gradient-to-br from-deep-burgundy/30 to-deep-black/40 mb-6">
              <div className="flex items-center gap-3 mb-5">
                <Droplet size={22} className="text-rose-300" strokeWidth={1.5} />
                <p className="text-rose-300/90 text-[11px] uppercase tracking-[0.25em]">
                  How the signing works
                </p>
              </div>
              <ol className="space-y-4 text-text-gray font-light leading-relaxed">
                <li>
                  <strong className="text-white font-normal">
                    1. Pick a track.
                  </strong>{" "}
                  {PACT_PRESETS.map((p) => p.label).join(", ")}. The track
                  decides which challenge lands on your week.
                </li>
                <li>
                  <strong className="text-white font-normal">
                    2. Tick the oath.
                  </strong>{" "}
                  Four lines, all required. Nobody signs this by accident.
                </li>
                <li>
                  <strong className="text-white font-normal">
                    3. Write three goals.
                  </strong>{" "}
                  {PACT_GOAL_SLOTS.map((s) => s.label.toLowerCase()).join(
                    ", ",
                  )}
                  . In your own words, set once, and shown to you again on the
                  day you try to break the pact.
                </li>
                <li>
                  <strong className="text-white font-normal">
                    4. Draw your signature.
                  </strong>{" "}
                  With your finger. It is kept on the record and on every
                  screen the record renders.
                </li>
              </ol>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-6 rounded-2xl border border-warm-gold/15 bg-deep-black/40">
                <h3 className="text-white font-light text-lg mb-2">
                  One challenge a week
                </h3>
                <p className="text-text-gray text-sm leading-relaxed">
                  Written for your track, on a {PACT_CYCLE_WEEKS} week cycle,
                  so a full quarter passes before anything repeats. Intensity
                  ramps in four-week waves inside it.
                </p>
              </div>
              <div className="p-6 rounded-2xl border border-warm-gold/15 bg-deep-black/40">
                <h3 className="text-white font-light text-lg mb-2">
                  A private journal
                </h3>
                <p className="text-text-gray text-sm leading-relaxed">
                  Private by default. A separate optional box posts a short
                  note to the feed under your name or anonymously, if you want
                  the room to see it.
                </p>
              </div>
              <div className="p-6 rounded-2xl border border-warm-gold/15 bg-deep-black/40">
                <h3 className="text-white font-light text-lg mb-2">
                  A record that scars
                </h3>
                <p className="text-text-gray text-sm leading-relaxed">
                  Kept weeks are recorded. Missed weeks are scarred, and the
                  scar is permanent. Break the pact and it is sealed read-only;
                  sign again and the new pact stands beside the old scars.
                </p>
              </div>
            </div>
          </section>

          {/* ------------------------------------------------- the twelve */}
          <section className="mb-20">
            <SectionHeading
              eyebrow="The long form"
              title="The 12 Week Transformation"
              lede="A structured video program that pairs each week's lessons with assigned reading from the book, plus an AI layer: a personal Read from a four-question intake, weekly Thresholds, and a journal that answers back."
            />
            <div className="p-6 rounded-2xl border border-warm-gold/15 bg-deep-black/40 flex items-start gap-4">
              <BookOpen
                size={22}
                className="text-warm-gold shrink-0 mt-1"
                strokeWidth={1.5}
              />
              <p className="text-text-gray font-light leading-relaxed">
                All {BOOK_INFO.chapters} chapters of the Sociopathic Dating
                Bible are assigned across the twelve weeks, exactly once. An
                advanced six-week course re-reads the same chapters at depth
                and is gated on finishing week 12, so nothing in it is ever
                somebody&apos;s first exposure to the material. Included with
                the Blood Pact and above.
              </p>
            </div>
          </section>

          {/* -------------------------------------------- kanika's rooms */}
          <section className="mb-20">
            <SectionHeading
              eyebrow="From Kanika"
              title="The Consilium"
              lede="The training rung teaches the skills. This rung is the room Kanika is actually in."
            />
            <SurfaceGrid items={KANIKA_SURFACES} />
          </section>

          {/* ------------------------------------------------ purchasables */}
          <section className="mb-20">
            <SectionHeading
              eyebrow="Everything you can buy"
              title="The full list"
              lede="Two subscriptions and three one-time purchases. Nothing else in the app costs money, and nothing is priced per action."
            />

            <div className="space-y-4">
              {PURCHASABLES.map((p) => (
                <Link
                  key={p.name}
                  href={p.href}
                  className="group flex flex-col sm:flex-row sm:items-center gap-4 p-6 rounded-2xl border border-warm-gold/15 bg-deep-black/40 hover:border-warm-gold/40 transition-all"
                >
                  <div className="sm:w-52 shrink-0">
                    <h3 className="text-white font-light text-lg group-hover:text-warm-gold transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-warm-gold/90 text-sm font-light">
                      {p.price}
                    </p>
                    <p className="text-text-gray/60 text-[11px] font-light">
                      {p.billing}
                    </p>
                  </div>
                  <p className="text-text-gray text-sm leading-relaxed flex-1">
                    {p.what}
                  </p>
                  <ArrowRight
                    size={16}
                    className="text-warm-gold/50 group-hover:text-warm-gold transition-colors shrink-0 hidden sm:block"
                  />
                </Link>
              ))}
            </div>
          </section>

          {/* ------------------------------------------------- install/PWA */}
          <section className="mb-20">
            <SectionHeading
              eyebrow="Getting in"
              title="No app store"
              lede="The app runs in the browser and installs to your home screen. That is the whole install process."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-6 rounded-2xl border border-warm-gold/15 bg-deep-black/40 flex items-start gap-4">
                <Smartphone
                  size={22}
                  className="text-warm-gold shrink-0 mt-1"
                  strokeWidth={1.5}
                />
                <div>
                  <h3 className="text-white font-light text-lg mb-2">
                    Install it
                  </h3>
                  <p className="text-text-gray text-sm leading-relaxed">
                    Open the site on your phone and add it to your home screen.
                    It opens full screen, keeps you signed in, and works like
                    any other icon on the device.
                  </p>
                </div>
              </div>
              <div className="p-6 rounded-2xl border border-warm-gold/15 bg-deep-black/40 flex items-start gap-4">
                <Crown
                  size={22}
                  className="text-warm-gold shrink-0 mt-1"
                  strokeWidth={1.5}
                />
                <div>
                  <h3 className="text-white font-light text-lg mb-2">
                    Notifications, if you want them
                  </h3>
                  <p className="text-text-gray text-sm leading-relaxed">
                    When your question gets answered, when a voice note lands,
                    when your streak is about to break, and when your pact week
                    opens. Each category is a separate switch. On iPhone this
                    needs the home screen install and iOS 16.4 or later.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ---------------------------------------------------------- faq */}
          <section className="mb-16">
            <SectionHeading eyebrow="Questions" title="Frequently Asked Questions" />
            <div className="space-y-5">
              {FAQS.map((f) => (
                <div
                  key={f.q}
                  className="p-6 rounded-2xl border border-warm-gold/15 bg-deep-black/40"
                >
                  <h3 className="text-white font-light text-lg mb-2">{f.q}</h3>
                  <p className="text-text-gray text-sm leading-relaxed">
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ---------------------------------------------------------- cta */}
          <section className="max-w-3xl mx-auto p-8 rounded-2xl border border-warm-gold/20 bg-gradient-to-br from-deep-burgundy/25 to-deep-navy/10 text-center">
            <p className="text-warm-gold text-[11px] uppercase tracking-[0.3em] mb-3">
              Start where it is free
            </p>
            <h2 className="text-white text-2xl md:text-3xl font-light mb-3">
              The first chapter of everything is open
            </h2>
            <p className="text-text-gray font-light max-w-xl mx-auto leading-relaxed mb-6">
              Take a quiz, play a scenario, run a drill, and see whether any of
              it lands before you pay for a thing. Everything you do on the
              free tier carries over to whichever rung you take.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-warm-gold text-deep-black font-medium tracking-wider uppercase text-sm transition-all hover:bg-warm-gold/90"
              >
                Create a free account
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/quizzes"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-warm-gold/30 text-warm-gold font-light tracking-wider uppercase text-sm transition-all hover:border-warm-gold/60"
              >
                Take a quiz first
              </Link>
            </div>
            <p className="mt-5 text-xs text-text-gray/60 font-light">
              {TRUST_LINE}
            </p>
            <p className="mt-3 text-xs text-text-gray/60 font-light">
              Already have an account?{" "}
              <Link
                href="/start"
                className="text-warm-gold/90 hover:text-warm-gold underline underline-offset-4"
              >
                Open the app
              </Link>
              .
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
