"use client";

import { motion } from "framer-motion";
import { MessageCircle, Mic, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AskKanika() {
  return (
    <section className="relative py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background — strong visual break from surrounding sections */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-[#0c0618] to-deep-black" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent-burgundy/8 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14 sm:mb-20"
        >
          <p className="text-accent-gold/60 text-xs tracking-[0.3em] uppercase mb-5">
            Direct Access
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.1] mb-6">
            <span className="text-text-light">Ask Kanika.</span>
            <br />
            <span className="gradient-text-gold">Get an Answer.</span>
          </h2>
          <p className="text-text-gray text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
            One question. One honest answer from someone who doesn&apos;t
            sugarcoat. Written or voice — your choice.
          </p>
        </motion.div>

        {/* Two Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {/* Written Answer Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-accent-gold/20 via-accent-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative rounded-2xl bg-[#0a0a18] border border-white/[0.06] p-7 sm:p-8 h-full flex flex-col">
              {/* Icon + Title */}
              <div className="mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-burgundy/30 to-accent-burgundy/10 border border-accent-burgundy/20 flex items-center justify-center mb-5">
                  <MessageCircle className="text-accent-gold" size={24} />
                </div>
                <h3 className="text-xl sm:text-2xl font-light text-text-light mb-1.5">
                  Written Answer
                </h3>
                <p className="text-text-gray/70 text-sm">
                  A detailed, personal written response delivered to your inbox.
                </p>
              </div>

              {/* Pricing */}
              <div className="space-y-3 mt-auto">
                <Link
                  href="/ask?format=written&count=1"
                  className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-accent-gold/[0.04] hover:border-accent-gold/20 transition-all group/link"
                >
                  <span className="text-text-light text-sm font-medium">
                    1 Question
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-2xl font-light text-accent-gold">
                      $39.99
                    </span>
                    <ArrowRight
                      size={14}
                      className="text-accent-gold/0 group-hover/link:text-accent-gold/60 transition-colors"
                    />
                  </span>
                </Link>

                <Link
                  href="/ask?format=written&count=3"
                  className="relative flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-accent-gold/[0.04] hover:border-accent-gold/20 transition-all group/link"
                >
                  <span className="absolute -top-2 right-3 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-accent-burgundy text-white">
                    Save $20
                  </span>
                  <span className="text-text-light text-sm font-medium">
                    3 Questions
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-2xl font-light text-accent-gold">
                      $99
                    </span>
                    <ArrowRight
                      size={14}
                      className="text-accent-gold/0 group-hover/link:text-accent-gold/60 transition-colors"
                    />
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Voice Answer Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative group"
          >
            {/* Popular badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 px-4 py-1 rounded-full bg-accent-gold text-deep-black text-[10px] font-bold tracking-[0.15em] uppercase">
              Most Personal
            </div>
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-accent-gold/25 via-accent-gold/8 to-transparent" />
            <div className="relative rounded-2xl bg-[#0a0a18] border border-accent-gold/15 p-7 sm:p-8 h-full flex flex-col">
              {/* Icon + Title */}
              <div className="mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-gold/20 to-accent-gold/5 border border-accent-gold/15 flex items-center justify-center mb-5">
                  <Mic className="text-accent-gold" size={24} />
                </div>
                <h3 className="text-xl sm:text-2xl font-light text-text-light mb-1.5">
                  Voice Answer
                </h3>
                <p className="text-text-gray/70 text-sm">
                  A personal voice memo — raw, unfiltered, and direct to you.
                </p>
              </div>

              {/* Pricing */}
              <div className="space-y-3 mt-auto">
                <Link
                  href="/ask?format=voice&count=1"
                  className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-accent-gold/[0.04] hover:border-accent-gold/20 transition-all group/link"
                >
                  <span className="text-text-light text-sm font-medium">
                    1 Question
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-2xl font-light text-accent-gold">
                      $59.99
                    </span>
                    <ArrowRight
                      size={14}
                      className="text-accent-gold/0 group-hover/link:text-accent-gold/60 transition-colors"
                    />
                  </span>
                </Link>

                <Link
                  href="/ask?format=voice&count=3"
                  className="relative flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-accent-gold/[0.04] hover:border-accent-gold/20 transition-all group/link"
                >
                  <span className="absolute -top-2 right-3 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-accent-burgundy text-white">
                    Save $50
                  </span>
                  <span className="text-text-light text-sm font-medium">
                    3 Questions
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-2xl font-light text-accent-gold">
                      $129
                    </span>
                    <ArrowRight
                      size={14}
                      className="text-accent-gold/0 group-hover/link:text-accent-gold/60 transition-colors"
                    />
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center text-text-gray/40 text-xs tracking-wider mt-10"
        >
          Responses within 48 hours &middot; All questions are confidential
        </motion.p>
      </div>
    </section>
  );
}
