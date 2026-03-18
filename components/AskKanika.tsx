"use client";

import { motion } from "framer-motion";
import { MessageCircle, Mic } from "lucide-react";
import Link from "next/link";

const tiers = [
  {
    icon: MessageCircle,
    label: "Written Answer",
    description: "A detailed, personal written response from Kanika",
    single: { price: 39.99, label: "1 Question" },
    pack: { price: 99, label: "3 Questions", savings: "Save $20" },
  },
  {
    icon: Mic,
    label: "Voice Answer",
    description: "A personal voice memo response — raw, unfiltered, direct",
    single: { price: 59.99, label: "1 Question" },
    pack: { price: 129, label: "3 Questions", savings: "Save $50" },
  },
];

export default function AskKanika() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deep-navy/30 to-transparent" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-block mb-6 px-4 py-2 border border-accent-burgundy/40 rounded-full">
            <span className="text-accent-burgundy text-xs sm:text-sm tracking-[0.2em] uppercase">
              Direct Access
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-4 sm:mb-6">
            <span className="text-text-light">Ask Kanika</span>
            <br />
            <span className="gradient-text-gold">Get an Answer</span>
          </h2>
          <p className="text-text-gray text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Relationships, power dynamics, dark psychology, or anything
            you&apos;ve been afraid to ask. One question. One honest answer from
            someone who doesn&apos;t sugarcoat.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-gradient-to-b from-deep-burgundy/20 to-deep-navy/20 border border-accent-gold/10 rounded-2xl p-6 sm:p-8 hover:border-accent-gold/25 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent-burgundy/20 flex items-center justify-center">
                  <tier.icon className="text-accent-gold" size={20} />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-light text-text-light">
                    {tier.label}
                  </h3>
                  <p className="text-text-gray text-xs sm:text-sm">
                    {tier.description}
                  </p>
                </div>
              </div>

              <div className="space-y-3 mt-6">
                <Link
                  href={`/ask?format=${tier.label === "Written Answer" ? "written" : "voice"}&count=1`}
                  className="flex items-center justify-between w-full p-4 rounded-xl border border-accent-gold/15 hover:border-accent-gold/40 hover:bg-accent-gold/5 transition-all group"
                >
                  <div>
                    <div className="text-text-light text-sm sm:text-base font-medium">
                      {tier.single.label}
                    </div>
                  </div>
                  <div className="text-xl sm:text-2xl font-light gradient-text-gold group-hover:scale-105 transition-transform">
                    ${tier.single.price}
                  </div>
                </Link>

                <Link
                  href={`/ask?format=${tier.label === "Written Answer" ? "written" : "voice"}&count=3`}
                  className="flex items-center justify-between w-full p-4 rounded-xl border border-accent-gold/15 hover:border-accent-gold/40 hover:bg-accent-gold/5 transition-all group relative"
                >
                  <div className="absolute -top-2.5 right-4 bg-accent-burgundy text-white text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {tier.pack.savings}
                  </div>
                  <div>
                    <div className="text-text-light text-sm sm:text-base font-medium">
                      {tier.pack.label}
                    </div>
                  </div>
                  <div className="text-xl sm:text-2xl font-light gradient-text-gold group-hover:scale-105 transition-transform">
                    ${tier.pack.price}
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center text-text-gray/60 text-xs sm:text-sm mt-8"
        >
          Responses within 48 hours. All questions are confidential.
        </motion.p>
      </div>
    </section>
  );
}
