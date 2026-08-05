"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { BookOpen, Check } from "lucide-react";
import { BOOK_INFO } from "@/lib/constants";

interface BookPromoProps {
  variant?: "full" | "compact";
  className?: string;
}

/**
 * Blog-post book promo. The Premium edition leads and the gold CTA points
 * at /book: the blog is the SEO top of the funnel, and a sale on our own
 * checkout is worth ~$24 plus the buyer's email, the welcome sequence,
 * and the quiz auto-unlock, against ~$3.50 in Kindle royalty. Amazon
 * stays available as a quiet text link for Kindle loyalists, the same
 * demotion the /book page uses.
 */
export default function BookPromo({
  variant = "full",
  className = "",
}: BookPromoProps) {
  if (variant === "compact") {
    return (
      <div
        className={`bg-gradient-to-r from-accent-burgundy/20 to-deep-navy/40 rounded-xl p-6 border border-accent-gold/20 ${className}`}
      >
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1">
            <p className="text-white font-medium mb-1">
              Get the {BOOK_INFO.title}
            </p>
            <p className="text-text-gray text-sm">
              ${BOOK_INFO.price} with exclusive bonuses
            </p>
          </div>
          <Link
            href="/book"
            className="px-6 py-2.5 bg-gradient-to-r from-accent-gold to-accent-burgundy text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Get the Book
          </Link>
        </div>
      </div>
    );
  }

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`bg-gradient-to-br from-deep-navy/50 to-accent-burgundy/20 rounded-2xl p-8 border border-white/10 ${className}`}
    >
      <div className="flex items-start gap-3 mb-4">
        <BookOpen className="w-7 h-7 text-accent-gold shrink-0 mt-1" />
        <div>
          <h3 className="text-2xl font-light text-white">{BOOK_INFO.title}</h3>
          <p className="text-accent-gold text-sm uppercase tracking-wider">
            {BOOK_INFO.subtitle}
          </p>
        </div>
      </div>

      <p className="text-text-gray mb-6 leading-relaxed">
        {BOOK_INFO.description}
      </p>

      <div className="bg-white/5 rounded-xl p-5 border border-accent-gold/20 mb-4">
        <div className="flex items-baseline gap-2 mb-1">
          <p className="text-3xl font-light text-accent-gold">
            ${BOOK_INFO.price}
          </p>
          <p className="text-text-gray text-sm line-through">
            ${BOOK_INFO.originalPrice}
          </p>
        </div>
        <p className="text-text-gray text-sm mb-4">
          Premium edition with exclusive bonus chapters, instant download
        </p>
        <Link
          href="/book"
          className="block w-full py-3 bg-gradient-to-r from-accent-gold to-accent-burgundy text-white text-sm font-medium rounded-lg text-center hover:opacity-90 transition-opacity"
        >
          Get the Book
        </Link>
      </div>

      <p className="text-text-gray/70 text-sm mb-4 text-center">
        Prefer Kindle?{" "}
        <a
          href={BOOK_INFO.kdpLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-gray underline underline-offset-2 hover:text-accent-gold transition-colors"
        >
          Also on Amazon
        </a>{" "}
        (without the bonuses)
      </p>

      <div className="flex items-center gap-2 text-sm text-text-gray">
        <Check className="w-4 h-4 text-accent-gold" />
        <span>Written by a clinically diagnosed sociopath</span>
      </div>
    </m.div>
  );
}
