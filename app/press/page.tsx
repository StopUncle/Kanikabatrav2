import Link from "next/link";
import type { Metadata } from "next";
import BackgroundEffects from "@/components/BackgroundEffects";
import Header from "@/components/Header";
import { SITE_CONFIG, BOOK_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Press Kit | Kanika Batra",
  description:
    "Press kit, biographies, key facts, pull quotes, and contact for journalists, podcasters, and producers covering Kanika Batra and Mirror-Bonding.",
  openGraph: {
    title: "Press Kit | Kanika Batra",
    description:
      "Bios, key facts, quotes, and press contact for Kanika Batra.",
    type: "profile",
    url: "https://kanikarose.com/press",
    images: [{ url: "https://kanikarose.com/og-image.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Press Kit | Kanika Batra",
    description: "Bios, key facts, quotes, and press contact.",
  },
  alternates: { canonical: "https://kanikarose.com/press" },
};

const PRESS_EMAIL = "Kanika@kanikarose.com";

const ONE_LINER =
  "Kanika Batra is a clinically diagnosed sociopath, author, and former pageant finalist whose work on the psychology of power reaches more than 670,000 followers across TikTok, Instagram, and YouTube.";

const SHORT_BIO =
  "Kanika Batra is the author of the Sociopathic Dating Bible and the founder of The Consilium, a private community where she teaches strategic psychology to a paying audience of more than a thousand. Diagnosed with antisocial personality disorder in her twenties, she has spent the last several years translating that diagnosis into a body of work the rest of the internet calls dark psychology, with more than 37 million views across her channels.";

const LONG_BIO =
  "Kanika Batra is the author of the Sociopathic Dating Bible (A Cure For Empathy), the founder of The Consilium, and one of the most-watched voices on the psychology of power online. Diagnosed with antisocial personality disorder in her twenties after a series of psychiatric hospitalisations, she chose to make the diagnosis public and turn it into a teaching practice rather than a secret. Her central thesis, which she calls Mirror-Bonding, reframes most modern relationship advice as an instruction manual written by people who do not understand what is actually happening in the room. A former Miss World Australia finalist and Miss Universe New Zealand Top 10, she now writes, coaches, and produces interactive simulators that train readers to recognise manipulation in real time. Her audience spans more than 670,000 followers across TikTok, Instagram, and YouTube, with cumulative views above 37 million.";

const KEY_FACTS: Array<{ label: string; value: string }> = [
  { label: "Full name", value: "Kanika Batra-Matheson" },
  { label: "Pen name", value: "Kanika Batra" },
  { label: "Based", value: "Barcelona, Spain" },
  { label: "Nationality", value: "Australian" },
  { label: "Born", value: "New Zealand" },
  { label: "Diagnosis", value: "Antisocial personality disorder (ASPD)" },
  {
    label: "Audience",
    value: "670,000+ followers, 37M+ cumulative views",
  },
  {
    label: "Books",
    value: "Sociopathic Dating Bible (A Cure For Empathy), 70,000 words, 17 chapters",
  },
  {
    label: "Community",
    value: "The Consilium, paid private community at kanikarose.com/consilium",
  },
  {
    label: "Available for",
    value:
      "Long-form interviews, documentary, podcast, expert commentary on dark psychology, ASPD, manipulation, and dating",
  },
];

const PULL_QUOTES: string[] = [
  "Most people are not playing the game badly. They do not know there is a game.",
  "Empathy is a tool, not an identity. The mistake is letting it run the room when it should be in your pocket.",
  "I was not taught how to read people. I was forced to, because I could not feel them the way you do.",
  "Mirror-Bonding is the moment you realise the person across from you has been showing you a version of you, not a version of them.",
  "I do not teach women to be cold. I teach them to be accurate.",
  "Diagnosis was not the end of my life. It was the first honest description of it.",
];

const MIRROR_BONDING_DEFINITION =
  "Mirror-Bonding (n.): the early-relationship dynamic in which one party studies the other and reflects them back at high resolution, producing a sense of being deeply known. The bond is real to the person being mirrored and a strategy to the person mirroring. Most modern dating advice optimises for being mirrored more efficiently.";

const TALKING_POINTS: string[] = [
  "Why ASPD is misunderstood by both clinical and pop-psychology audiences, and what the diagnosis actually predicts",
  "How dating advice in the 2020s trains the wrong reflexes, and what to do instead",
  "What pageant culture taught Kanika about reading rooms before she had the language for it",
  "Why the most dangerous people in your life are not strangers, and the three early tells most adults still miss",
  "Building a paid community around a personality the internet was supposed to reject",
  "The pipeline from psychiatric hospitalisation to a 670k-person audience, and what survived the hospitalisation that her career did not",
];

const CONTACT_TEMPLATE = `Subject: Press / [outlet name] / [topic]

Hi Kanika,

I'm [name] at [outlet]. I'm working on [piece] about [topic].

I'd like to:
- [interview / quote / record / film / book a slot]
- Timing: [date or window]
- Format: [phone / video / in-person / written]
- Length: [minutes or word count]
- Deadline: [date]

A short note on angle: [2-3 lines so Kanika can decide quickly].

Thanks,
[name]
[outlet] | [phone] | [email]`;

export default function PressPage() {
  return (
    <>
      <BackgroundEffects />
      <Header />
      <main className="min-h-screen pt-32 pb-24 px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <header className="mb-16">
            <p className="text-accent-gold/70 text-[11px] uppercase tracking-[0.4em] mb-4">
              Press Kit
            </p>
            <h1 className="text-4xl md:text-6xl font-extralight tracking-wider uppercase text-white mb-6">
              For Journalists, Podcasters, and Producers
            </h1>
            <p className="text-text-gray text-base md:text-lg max-w-3xl leading-relaxed">
              Everything you need to write, book, or pitch a piece on Kanika
              Batra. If you need something not on this page, email{" "}
              <a
                className="text-accent-gold hover:underline"
                href={`mailto:${PRESS_EMAIL}?subject=Press%20enquiry`}
              >
                {PRESS_EMAIL}
              </a>{" "}
              with the subject line <span className="text-white">Press</span>{" "}
              and a deadline.
            </p>
          </header>

          <Section title="One-line bio">
            <Copyable text={ONE_LINER} />
          </Section>

          <Section title="Short bio (50 words)">
            <Copyable text={SHORT_BIO} />
          </Section>

          <Section title="Long bio (150 words)">
            <Copyable text={LONG_BIO} />
          </Section>

          <Section title="Key facts">
            <dl className="grid sm:grid-cols-2 gap-x-10 gap-y-4">
              {KEY_FACTS.map((fact) => (
                <div
                  key={fact.label}
                  className="border-b border-gray-800 pb-3"
                >
                  <dt className="text-[10px] uppercase tracking-[0.3em] text-accent-gold/70 mb-1">
                    {fact.label}
                  </dt>
                  <dd className="text-text-light font-light">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section title="Mirror-Bonding (definition)">
            <p className="text-text-light font-light leading-relaxed">
              {MIRROR_BONDING_DEFINITION}
            </p>
          </Section>

          <Section title="Pull quotes (cleared for use)">
            <ul className="space-y-4">
              {PULL_QUOTES.map((q) => (
                <li
                  key={q}
                  className="border-l-2 border-accent-gold/50 pl-5 text-text-light italic font-light leading-relaxed"
                >
                  &ldquo;{q}&rdquo;
                </li>
              ))}
            </ul>
            <p className="text-text-gray text-sm mt-6 leading-relaxed">
              All quotes above are pre-cleared for verbatim print, broadcast,
              and online use, with attribution to Kanika Batra. New quotes
              from interviews follow standard fact-check rules.
            </p>
          </Section>

          <Section title="Suggested talking points">
            <ul className="space-y-3">
              {TALKING_POINTS.map((point) => (
                <li
                  key={point}
                  className="text-text-light font-light leading-relaxed flex gap-3"
                >
                  <span className="text-accent-gold/60 mt-[2px]">›</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Visual assets">
            <div className="grid sm:grid-cols-2 gap-6">
              <AssetCard
                title="Brand logo"
                meta="PNG, transparent, 1024px"
                href="/images/kanikarose-logo.png"
              />
              <AssetCard
                title="Book cover, Sociopathic Dating Bible"
                meta="JPG, hi-res"
                href="/books/book-cover.jpg"
              />
            </div>
            <p className="text-text-gray text-sm mt-6 leading-relaxed">
              Headshots, behind-the-scenes stills, and 90-second sizzle reel
              available on request, email{" "}
              <a
                className="text-accent-gold hover:underline"
                href={`mailto:${PRESS_EMAIL}?subject=Press%20assets%20request`}
              >
                {PRESS_EMAIL}
              </a>
              . Please specify the outlet and intended use so the right cut
              can be sent.
            </p>
          </Section>

          <Section title="Book details">
            <div className="text-text-light font-light leading-relaxed space-y-2">
              <p>
                <span className="text-accent-gold/80">Title:</span>{" "}
                {BOOK_INFO.title}: {BOOK_INFO.subtitle}
              </p>
              <p>
                <span className="text-accent-gold/80">Length:</span>{" "}
                {BOOK_INFO.wordCount} words, {BOOK_INFO.chapters} chapters
                including bonus addenda
              </p>
              <p>
                <span className="text-accent-gold/80">Formats:</span> EPUB and
                PDF (premium edition, kanikarose.com), Amazon Kindle (KDP
                edition)
              </p>
              <p>
                <span className="text-accent-gold/80">Premium edition:</span>{" "}
                <Link
                  href="/book"
                  className="text-accent-gold hover:underline"
                >
                  kanikarose.com/book
                </Link>
              </p>
              <p>
                <span className="text-accent-gold/80">Amazon edition:</span>{" "}
                <a
                  href={BOOK_INFO.kdpLink}
                  className="text-accent-gold hover:underline"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {BOOK_INFO.kdpLink.replace("https://www.", "")}
                </a>
              </p>
            </div>
          </Section>

          <Section title="Press contact">
            <p className="text-text-light font-light leading-relaxed mb-6">
              Direct line to Kanika, no agency in between. For fastest reply,
              put your deadline in the subject line.
            </p>
            <a
              href={`mailto:${PRESS_EMAIL}?subject=Press%20enquiry`}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-accent-gold text-deep-black font-medium tracking-wider uppercase text-sm hover:bg-accent-gold/90 transition-all"
            >
              {PRESS_EMAIL}
            </a>
            <div className="mt-10">
              <p className="text-[10px] uppercase tracking-[0.3em] text-accent-gold/70 mb-3">
                Suggested email template
              </p>
              <pre className="bg-deep-black/60 border border-gray-800 rounded-lg p-5 text-text-gray text-sm font-mono whitespace-pre-wrap leading-relaxed">
                {CONTACT_TEMPLATE}
              </pre>
            </div>
          </Section>

          <p className="text-center text-text-gray/60 text-xs uppercase tracking-[0.3em] mt-16">
            Page maintained by {SITE_CONFIG.name} &middot; Updated regularly
          </p>
        </div>
      </main>
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-14">
      <h2 className="text-[11px] uppercase tracking-[0.4em] text-accent-gold/80 mb-5 pb-3 border-b border-gray-800">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Copyable({ text }: { text: string }) {
  return (
    <p className="text-text-light font-light leading-relaxed bg-deep-black/40 border border-gray-800 rounded-lg p-5">
      {text}
    </p>
  );
}

function AssetCard({
  title,
  meta,
  href,
}: {
  title: string;
  meta: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-deep-black/40 border border-gray-800 rounded-lg p-5 hover:border-accent-gold/50 transition-colors"
    >
      <p className="text-text-light font-light mb-1">{title}</p>
      <p className="text-text-gray text-xs uppercase tracking-[0.2em]">
        {meta}
      </p>
      <p className="text-accent-gold text-xs mt-3 uppercase tracking-[0.3em]">
        Open / download &rarr;
      </p>
    </a>
  );
}
