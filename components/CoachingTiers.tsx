"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { COACHING_PACKAGES } from "@/lib/constants";

interface CoachingTiersProps {
  showButton?: boolean;
  onSelect?: (packageId: string) => void;
}

const CoachingTiers = ({ showButton = true, onSelect }: CoachingTiersProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
      {COACHING_PACKAGES.map((pkg, index) => {
        const badge = pkg.badge;
        const ctaLabel =
          pkg.ctaLabel || `Book ${pkg.name}`;

        return (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative group"
          >
            {pkg.popular && (
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-accent-gold/25 via-accent-gold/8 to-transparent" />
            )}

            <div
              className={`relative rounded-2xl bg-[#0a0a18] border h-full flex flex-col ${
                pkg.popular
                  ? "border-accent-gold/20"
                  : "border-white/[0.06]"
              }`}
            >
              {badge && (
                <div
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 z-10 px-4 py-1 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase whitespace-nowrap ${
                    pkg.popular
                      ? "bg-accent-gold text-deep-black"
                      : "bg-white/[0.06] text-text-gray border border-white/[0.06]"
                  }`}
                >
                  {badge}
                </div>
              )}

              <div className="p-6 sm:p-7 flex flex-col h-full">
                <div className="mb-6">
                  <h3 className="text-2xl font-light text-text-light mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-text-gray/60 text-sm leading-relaxed">
                    {pkg.description}
                  </p>
                </div>

                <div className="mb-6">
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-text-gray text-xs uppercase tracking-wider">
                        {pkg.duration}
                      </span>
                      <span className="text-2xl font-light text-accent-gold">
                        ${pkg.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-2.5 mb-6 flex-1">
                  {pkg.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-text-gray/70"
                    >
                      <Check
                        size={14}
                        className="text-accent-gold mt-0.5 flex-shrink-0"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                {showButton && (
                  <div className="mt-auto">
                    <button
                      onClick={() => onSelect?.(pkg.id)}
                      className="w-full py-3.5 rounded-lg text-sm font-medium tracking-wider uppercase bg-gradient-to-r from-[#720921] to-[#4a0616] text-white hover:shadow-lg transition-all"
                    >
                      {ctaLabel}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default CoachingTiers;
