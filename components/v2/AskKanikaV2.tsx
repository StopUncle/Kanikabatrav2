import { MessageCircle, Mic, ArrowRight } from "lucide-react";
import Link from "next/link";

type Tier = {
  href: string;
  label: string;
  price: string;
  saveLabel?: string;
};

type Card = {
  icon: React.ReactNode;
  title: string;
  description: string;
  tiers: Tier[];
  accent: "burgundy" | "gold";
  badge?: string;
};

const CARDS: Card[] = [
  {
    icon: <MessageCircle className="text-accent-gold" size={24} />,
    title: "Written Answer",
    description:
      "A detailed, personal written response delivered to your inbox.",
    accent: "burgundy",
    tiers: [
      {
        href: "/ask?format=written&count=1",
        label: "1 Question",
        price: "$49",
      },
      {
        href: "/ask?format=written&count=3",
        label: "3 Questions",
        price: "$129",
        saveLabel: "Save $18",
      },
    ],
  },
  {
    icon: <Mic className="text-accent-gold" size={24} />,
    title: "Voice Answer",
    description:
      "A personal voice memo — raw, unfiltered, and direct to you.",
    accent: "gold",
    badge: "Most Personal",
    tiers: [
      {
        href: "/ask?format=voice&count=1",
        label: "1 Question",
        price: "$89",
      },
      {
        href: "/ask?format=voice&count=3",
        label: "3 Questions",
        price: "$229",
        saveLabel: "Save $38",
      },
    ],
  },
];

export default function AskKanikaV2() {
  return (
    <section className="relative py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-[#0c0618] to-deep-black" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent-burgundy/8 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-14 sm:mb-20">
          <p className="text-accent-gold/60 text-xs tracking-[0.3em] uppercase mb-5">
            Direct Access — Between Book & Coaching
          </p>
          <h2 className="font-serif font-light text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-6 tracking-tight">
            <span className="text-text-light">Ask Kanika.</span>
            <br />
            <span className="gradient-text-gold">Get an Answer.</span>
          </h2>
          <p className="text-text-gray text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
            One question. One honest answer from someone who doesn&apos;t
            sugarcoat. Written or voice — your choice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {CARDS.map((card) => (
            <div key={card.title} className="relative group">
              {card.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 px-4 py-1 rounded-full bg-accent-gold text-deep-black text-[10px] font-bold tracking-[0.15em] uppercase">
                  {card.badge}
                </div>
              )}

              <div
                className={`absolute -inset-px rounded-2xl bg-gradient-to-b ${
                  card.accent === "gold"
                    ? "from-accent-gold/25 via-accent-gold/8 to-transparent"
                    : "from-accent-gold/20 via-accent-gold/5 to-transparent opacity-0 group-hover:opacity-100"
                } transition-opacity duration-500`}
              />

              <div
                className={`relative rounded-2xl bg-[#0a0a18] border ${
                  card.accent === "gold"
                    ? "border-accent-gold/15"
                    : "border-white/[0.06]"
                } p-7 sm:p-8 h-full flex flex-col`}
              >
                <div className="mb-8">
                  <div
                    className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-5 ${
                      card.accent === "gold"
                        ? "bg-gradient-to-br from-accent-gold/20 to-accent-gold/5 border-accent-gold/15"
                        : "bg-gradient-to-br from-accent-burgundy/30 to-accent-burgundy/10 border-accent-burgundy/20"
                    }`}
                  >
                    {card.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-light text-text-light mb-1.5">
                    {card.title}
                  </h3>
                  <p className="text-text-gray/70 text-sm">
                    {card.description}
                  </p>
                </div>

                <div className="space-y-3 mt-auto">
                  {card.tiers.map((tier) => (
                    <Link
                      key={tier.label}
                      href={tier.href}
                      className="relative flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-accent-gold/[0.04] hover:border-accent-gold/20 transition-all group/link"
                    >
                      {tier.saveLabel && (
                        <span className="absolute -top-2 right-3 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-accent-burgundy text-white">
                          {tier.saveLabel}
                        </span>
                      )}
                      <span className="text-text-light text-sm font-medium">
                        {tier.label}
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="text-2xl font-light text-accent-gold">
                          {tier.price}
                        </span>
                        <ArrowRight
                          size={14}
                          className="text-accent-gold/0 group-hover/link:text-accent-gold/60 transition-colors"
                        />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-text-gray/40 text-xs tracking-wider mt-10">
          Responses within 48 hours · All questions are confidential
        </p>
      </div>
    </section>
  );
}
