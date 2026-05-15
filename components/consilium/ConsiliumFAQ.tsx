"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

export const CONSILIUM_FAQ: FaqItem[] = [
  {
    q: "Can I cancel?",
    a: "Yes. One click on the billing page. No email, no survey, no retention call. Your membership stops at the end of your current cycle and we don't touch your card again. We'll email you a week before each renewal so the charge never surprises you.",
  },
  {
    q: "What if it's not for me?",
    a: "Spend 7 days inside. If the Consilium isn't the most useful $29 you've spent this year, message us at Kanika@kanikarose.com and we'll refund you in full. No form, no survey, no friction. We'd rather you leave clean than stay resenting it.",
  },
  {
    q: "Is this only for women?",
    a: "No. Most members are women navigating dating, family, and workplace dynamics, so the language often leans that way, but the framework names moves, not people. The simulator, the voice notes, the daily drops, the forum, all apply regardless of who's running the move on you and who you're running it against.",
  },
  {
    q: "How is this different from the Sociopathic Dating Bible?",
    a: "The book gives you the framework. The Consilium is where you practice it. Reading a chapter on mirror-bonding and recognising it in real time, in a real exchange, with stakes, are two different skills. The simulator builds the second one. The book is sold separately, $24.99 standalone or $9.99 for active members.",
  },
  {
    q: "How is it different from 1:1 coaching?",
    a: "Coaching is direct, personal, and $297 per session. The Consilium is daily, structured practice plus a private council of members running the same patterns you are. Different tools for different needs. Some members do both. One coaching session covers ten months inside the Consilium.",
  },
  {
    q: "How private is the community?",
    a: "Member-only. You choose your display name and gender visibility. Every comment is human-reviewed before it lands so the troll surface is zero. Your name and email are never indexed by search engines, and the member-only areas are blocked from crawlers. Bad actors are removed fast.",
  },
  {
    q: "What if I just want to read, not post?",
    a: "Lurking is encouraged. Many of our most active members never post in the feed; they watch voice notes, run simulator scenarios, and read the forum. The work happens inside you, not in a comment box. The Consilium is not a performance.",
  },
  {
    q: "How often does Kanika actually show up?",
    a: "Weekly voice notes from Kanika, plus video answers to top-voted Ask Kanika questions, plus daily psychology drops and discussion prompts she's written. She also reads the feed and replies in comments when something catches her eye. This is not a course she set up and walked away from.",
  },
];

interface Props {
  /** Whether the JSON-LD schema script is emitted by the page wrapper
   *  (true) or by this component itself (false). Pages that already
   *  call JsonLd for other reasons should set this to true and emit
   *  the schema themselves to avoid duplication. */
  schemaEmittedExternally?: boolean;
}

/**
 * The Consilium landing-page FAQ. Renders an accordion of objection-
 * busting Q&As, sized between the value stack and the comparison
 * anchor. Each item is independently collapsible so the page weight
 * stays low on initial paint.
 *
 * Also emits Schema.org FAQPage structured data (by default) so Google
 * can pull featured snippets. The schema mirrors the visible answers
 * exactly; do not let them drift.
 */
export default function ConsiliumFAQ({
  schemaEmittedExternally = false,
}: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: CONSILIUM_FAQ.map((entry) => ({
      "@type": "Question",
      name: entry.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.a,
      },
    })),
  };

  return (
    <section className="mb-20">
      {!schemaEmittedExternally && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-warm-gold/70 text-[11px] uppercase tracking-[0.35em] mb-3">
            Before you decide
          </p>
          <h2 className="text-3xl font-extralight tracking-wider uppercase text-text-light">
            Common Questions
          </h2>
        </div>

        <div className="rounded-2xl border border-warm-gold/20 bg-deep-black/40 overflow-hidden">
          {CONSILIUM_FAQ.map((item, i) => {
            const isOpen = openIndex === i;
            const isLast = i === CONSILIUM_FAQ.length - 1;
            return (
              <div
                key={item.q}
                className={isLast ? "" : "border-b border-warm-gold/10"}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-5 sm:px-7 py-5 text-left hover:bg-warm-gold/[0.03] transition-colors"
                >
                  <span className="text-text-light font-light text-sm sm:text-base leading-snug">
                    {item.q}
                  </span>
                  <span
                    aria-hidden
                    className="shrink-0 w-6 h-6 rounded-full bg-warm-gold/10 border border-warm-gold/30 flex items-center justify-center text-warm-gold transition-transform"
                  >
                    {isOpen ? <Minus size={12} /> : <Plus size={12} />}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-7 pb-5 -mt-1">
                    <p className="text-text-gray font-light text-sm sm:text-base leading-relaxed max-w-prose">
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
