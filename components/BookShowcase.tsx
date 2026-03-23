"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ShieldCheck, Bell } from "lucide-react";
import PayPalButton from "./PayPalButton";
import PresaleModal from "./PresaleModal";
import CountdownTimer from "./CountdownTimer";
import { BOOK_INFO } from "@/lib/constants";

export default function BookShowcase() {
  const [showPayPal, setShowPayPal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [showPresaleModal, setShowPresaleModal] = useState(false);

  const handlePaymentSuccess = (details: {
    id: string;
    status: string;
    downloadToken?: string;
  }) => {
    setPaymentStatus("success");
    const tokenParam = details.downloadToken
      ? `&download_token=${details.downloadToken}`
      : "";
    window.location.href = `/success?payment_id=${details.id}&type=book&amount=${BOOK_INFO.price}${tokenParam}`;
  };

  const handlePaymentError = (error: string) => {
    setPaymentStatus("error");
    console.error("Payment failed:", error);
  };

  const handlePresaleSignup = async (
    email: string,
    option: "kdp" | "premium" | "both",
  ) => {
    const response = await fetch("/api/presale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, option }),
    });

    if (!response.ok) {
      throw new Error("Failed to join presale list");
    }

    return response.json();
  };

  const launchDate = new Date(BOOK_INFO.expectedLaunchDate);
  const formattedDate = launchDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  const totalValue = BOOK_INFO.premiumBonuses.reduce((sum, b) => sum + b.value, 0);

  return (
    <section
      id="book"
      className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Book 3D Display */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative w-64 sm:w-72 md:w-80 max-w-full h-[360px] sm:h-[400px] md:h-[450px] animate-levitate mx-auto">
              <div className="absolute inset-0 book-3d">
                <div className="absolute inset-0 book-cover-gradient rounded-r-2xl shadow-2xl flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 transform translateZ-20">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-light text-center text-text-light mb-2 sm:mb-4 leading-tight">
                    SOCIOPATHIC
                    <br />
                    DATING
                    <br />
                    BIBLE
                  </h3>
                  <div className="w-12 sm:w-16 md:w-20 h-0.5 bg-gradient-to-r from-transparent via-accent-gold to-transparent mb-2 sm:mb-4" />
                  <p className="text-text-gray text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] mb-2 sm:mb-4 italic">
                    A Cure For Empathy
                  </p>
                  <p className="gradient-text-gold text-sm sm:text-base md:text-lg tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] uppercase">
                    Kanika Batra
                  </p>
                </div>

                <div className="absolute left-0 top-0 w-8 sm:w-10 md:w-12 h-full bg-gradient-to-r from-deep-black to-deep-burgundy transform rotateY-90 translateZ-24 rounded-l-md">
                  <div className="h-full flex items-center justify-center">
                    <span className="text-accent-gold text-[10px] sm:text-xs tracking-[0.1em] sm:tracking-[0.2em] transform rotate-90 whitespace-nowrap">
                      SOCIOPATHIC DATING BIBLE
                    </span>
                  </div>
                </div>

                <div className="absolute inset-0 bg-black/50 transform translateZ-10 rounded-r-2xl blur-xl" />
              </div>
            </div>
          </motion.div>

          {/* Book Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <p className="text-accent-burgundy uppercase tracking-[0.2em] text-xs sm:text-sm mb-3">
                As featured on LADbible, Unilad &amp; Yahoo
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-4 sm:mb-6">
                <span className="gradient-text">
                  The Dating Playbook
                </span>
                <br />
                <span className="text-text-light">You Were Never Meant to See</span>
              </h2>
              <p className="text-text-gray text-base sm:text-lg leading-relaxed">
                {BOOK_INFO.description}
              </p>
            </div>

            <div className="space-y-3">
              {BOOK_INFO.features.slice(0, 4).map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gradient-to-r from-accent-burgundy/10 to-accent-sapphire/5 border-l-2 sm:border-l-4 border-accent-gold hover:translate-x-1 sm:hover:translate-x-2 transition-transform"
                >
                  <Check className="text-accent-gold mt-0.5 shrink-0" size={20} />
                  <span className="text-text-light">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Social proof snippet */}
            <div className="glass-card p-4 border-l-4 border-accent-gold">
              <p className="text-text-light italic text-sm sm:text-base">
                &ldquo;This book decoded the game I didn&apos;t even know I was losing. Within 3 weeks I went from being overlooked to being pursued.&rdquo;
              </p>
              <p className="text-accent-gold text-sm mt-2">— Sarah K., Investment Banker</p>
            </div>

            {/* Offer Card */}
            <div className="bg-gradient-to-r from-burgundy/20 to-sapphire/10 p-4 sm:p-6 lg:p-8 rounded-lg border border-gold/20">
              {BOOK_INFO.isPresale && (
                <div className="mb-6 space-y-4">
                  <div className="p-3 bg-accent-gold/10 rounded-lg border border-accent-gold/30">
                    <div className="flex items-center gap-2 text-accent-gold mb-2">
                      <Bell size={20} />
                      <span className="font-semibold">
                        Presale - Launching {formattedDate}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <CountdownTimer targetDate={BOOK_INFO.expectedLaunchDate} />
                  </div>
                </div>
              )}

              <p className="text-accent-gold uppercase tracking-[0.2em] text-xs mb-4">
                Premium Edition — What You Get
              </p>

              {/* Value Stack */}
              <div className="space-y-3 mb-6">
                {BOOK_INFO.premiumBonuses.map((bonus, i) => (
                  <div key={i} className="flex items-start justify-between gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                    <div className="flex items-start gap-3">
                      <Check className="text-accent-gold mt-0.5 shrink-0" size={16} />
                      <div>
                        <p className="text-text-light text-sm font-medium">{bonus.name}</p>
                        <p className="text-text-gray text-xs mt-0.5">{bonus.desc}</p>
                      </div>
                    </div>
                    <span className="text-text-gray text-sm whitespace-nowrap">${bonus.value}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-baseline justify-between mb-6 pt-4 border-t border-white/10">
                <div>
                  <span className="text-text-gray text-sm">Total value: </span>
                  <span className="text-text-gray text-sm line-through">${totalValue.toFixed(2)}</span>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-light gradient-text-gold">${BOOK_INFO.price}</span>
                </div>
              </div>

              {paymentStatus === "success" ? (
                <div className="text-center py-4">
                  <div className="text-green-400 text-lg font-semibold mb-2">
                    Purchase Successful
                  </div>
                  <p className="text-text-muted">
                    Check your email for download instructions.
                  </p>
                </div>
              ) : paymentStatus === "error" ? (
                <div className="text-center py-4">
                  <div className="text-red-400 text-lg font-semibold mb-2">
                    Payment Failed
                  </div>
                  <p className="text-text-muted mb-4">
                    Please try again or contact support.
                  </p>
                  <button
                    onClick={() => {
                      setPaymentStatus("idle");
                      setShowPayPal(false);
                    }}
                    className="btn-primary rounded-full text-white px-6 py-2 text-sm"
                  >
                    Try Again
                  </button>
                </div>
              ) : BOOK_INFO.isPresale ? (
                <div className="space-y-4">
                  <button
                    onClick={() => setShowPresaleModal(true)}
                    className="w-full btn-primary rounded-full text-white text-center py-3 sm:py-4 font-semibold tracking-wide text-sm sm:text-base"
                  >
                    Join Presale List
                  </button>
                  <p className="text-xs text-center text-text-muted">
                    Get notified when the book launches + exclusive presale pricing
                  </p>
                </div>
              ) : showPayPal ? (
                <div>
                  <PayPalButton
                    type="book"
                    amount={BOOK_INFO.price}
                    itemName={BOOK_INFO.title}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                    onCancel={() => setShowPayPal(false)}
                  />
                  <div className="text-center mt-4">
                    <button
                      onClick={() => setShowPayPal(false)}
                      className="text-text-muted hover:text-text-light text-sm"
                    >
                      &larr; Back
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <button
                    onClick={() => setShowPayPal(true)}
                    className="w-full btn-primary rounded-full text-white text-center py-3 sm:py-4 font-semibold tracking-wide text-sm sm:text-base"
                  >
                    Get Instant Access — ${BOOK_INFO.price}
                  </button>

                  {/* Guarantee */}
                  <div className="flex items-center justify-center gap-2 text-text-gray text-xs">
                    <ShieldCheck size={14} className="text-accent-gold" />
                    <span>Read 3 chapters. If it doesn&apos;t change how you see dating, full refund.</span>
                  </div>

                  {/* Amazon secondary */}
                  <div className="text-center pt-2 border-t border-white/5">
                    <a
                      href={BOOK_INFO.kdpLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-gray hover:text-text-light text-xs transition-colors"
                    >
                      Prefer Kindle? Get it on Amazon for ${BOOK_INFO.kdpPrice} &rarr;
                    </a>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <PresaleModal
        isOpen={showPresaleModal}
        onClose={() => setShowPresaleModal(false)}
        onEmailSubmit={handlePresaleSignup}
      />
    </section>
  );
}
