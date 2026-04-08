"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import BackgroundEffects from "@/components/BackgroundEffects";
import Header from "@/components/Header";
import PayPalButton from "@/components/PayPalButton";
import { Heart, CheckCircle } from "lucide-react";

const PRESET_AMOUNTS = [5, 10, 25, 50, 100];

export default function DonatePage() {
  const [amount, setAmount] = useState<number>(10);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPayPal, setShowPayPal] = useState(false);
  const [donated, setDonated] = useState(false);

  const handlePresetClick = (preset: number) => {
    setAmount(preset);
    setIsCustom(false);
    setCustomAmount("");
    setShowPayPal(false);
  };

  const handleCustomChange = (value: string) => {
    setCustomAmount(value);
    setIsCustom(true);
    const parsed = parseFloat(value);
    if (!isNaN(parsed) && parsed >= 1) {
      setAmount(parsed);
    }
    setShowPayPal(false);
  };

  const handleProceed = () => {
    if (amount >= 1 && agreedToTerms) {
      setShowPayPal(true);
    }
  };

  const handleSuccess = () => {
    setDonated(true);
    setShowPayPal(false);
  };

  if (donated) {
    return (
      <>
        <BackgroundEffects />
        <Header />
        <div className="min-h-screen pt-32 pb-16 px-4 relative z-10 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full text-center"
          >
            <CheckCircle className="w-20 h-20 text-accent-gold mx-auto mb-8" />
            <h1 className="text-4xl font-light mb-4">
              <span className="gradient-text-gold">Thank You</span>
            </h1>
            <p className="text-text-gray text-lg mb-8">
              Your generosity means everything. Every dollar fuels more content,
              more truth, and more people waking up.
            </p>
            <Link
              href="/"
              className="inline-block px-8 py-3 rounded-lg bg-gradient-to-r from-[#720921] to-[#4a0616] text-white text-sm font-medium tracking-wider uppercase hover:shadow-lg transition-all"
            >
              Back to Home
            </Link>
            <div className="mt-6 flex flex-col gap-2">
              <Link href="/quiz" className="text-accent-gold hover:text-accent-gold/80 text-sm transition-colors">
                Take the Dark Mirror Assessment →
              </Link>
              <Link href="/book" className="text-text-gray hover:text-accent-gold text-sm transition-colors">
                Get the Sociopathic Dating Bible →
              </Link>
            </div>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <BackgroundEffects />
      <Header />
      <div className="min-h-screen pt-24 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Heart className="w-12 h-12 text-accent-gold mx-auto mb-6 opacity-60" />
            <h1 className="text-4xl sm:text-5xl font-light leading-[1.1] mb-4">
              <span className="gradient-text">Support the Mission</span>
            </h1>
            <p className="text-text-gray text-lg max-w-md mx-auto">
              Your support keeps the content free, the truth unfiltered, and the
              mission alive.
            </p>
          </motion.div>

          {/* Donation Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-[#0a0a18] border border-white/[0.06] rounded-2xl p-6 sm:p-8"
          >
            {/* Amount Selection */}
            <div className="mb-8">
              <label className="block text-sm text-text-gray mb-4">
                Select an amount (USD)
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-4">
                {PRESET_AMOUNTS.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => handlePresetClick(preset)}
                    className={`py-3 rounded-xl text-sm font-medium transition-all ${
                      amount === preset && !isCustom
                        ? "bg-accent-gold text-deep-black"
                        : "bg-white/[0.03] border border-white/[0.06] text-text-light hover:border-accent-gold/30"
                    }`}
                  >
                    ${preset}
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-accent-gold text-lg">
                  $
                </span>
                <input
                  type="number"
                  min="1"
                  max="10000"
                  step="0.01"
                  value={isCustom ? customAmount : ""}
                  onChange={(e) => handleCustomChange(e.target.value)}
                  onFocus={() => {
                    setIsCustom(true);
                    setShowPayPal(false);
                  }}
                  placeholder="Custom amount"
                  className="w-full pl-10 pr-4 py-3.5 bg-deep-black/50 border border-accent-gold/20 rounded-xl text-text-light placeholder-text-gray/40 focus:outline-none focus:border-accent-gold/50 transition-colors text-lg"
                />
              </div>

              {isCustom && customAmount && parseFloat(customAmount) < 1 && (
                <p className="text-red-400 text-xs mt-2">
                  Minimum donation is $1.00
                </p>
              )}
            </div>

            {/* Amount Display */}
            <div className="text-center mb-6 py-4 border-t border-b border-white/[0.06]">
              <p className="text-text-gray text-sm mb-1">Your donation</p>
              <p className="text-4xl font-light text-accent-gold">
                ${amount.toFixed(2)}
              </p>
            </div>

            {/* Terms Agreement */}
            <div className="mb-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => {
                    setAgreedToTerms(e.target.checked);
                    if (!e.target.checked) setShowPayPal(false);
                  }}
                  className="rounded border-accent-gold/20 text-accent-gold focus:ring-accent-gold/50 mt-0.5"
                />
                <span className="text-sm text-text-gray">
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    target="_blank"
                    className="text-accent-gold hover:text-accent-gold/80 underline"
                  >
                    Terms & Conditions
                  </Link>
                  . I understand that donations are non-refundable.
                </span>
              </label>
            </div>

            {/* Proceed / PayPal */}
            <AnimatePresence mode="wait">
              {!showPayPal ? (
                <motion.button
                  key="proceed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={handleProceed}
                  disabled={!agreedToTerms || amount < 1}
                  className="w-full py-4 rounded-xl text-sm font-medium tracking-wider uppercase bg-gradient-to-r from-[#720921] to-[#4a0616] text-white hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  Donate ${amount.toFixed(2)}
                </motion.button>
              ) : (
                <motion.div
                  key="paypal"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <PayPalButton
                    type="donation"
                    amount={amount}
                    itemName={`Donation — $${amount.toFixed(2)}`}
                    onSuccess={handleSuccess}
                    onError={(error) => {
                      console.error("Donation error:", error);
                      setShowPayPal(false);
                    }}
                    onCancel={() => setShowPayPal(false)}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Trust Signals */}
            <p className="text-center text-text-gray/40 text-xs mt-6">
              Secure payment via PayPal &middot; SSL encrypted
            </p>
          </motion.div>

          {/* Why Donate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 text-center"
          >
            <p className="text-text-gray/50 text-sm leading-relaxed max-w-md mx-auto">
              Every contribution helps create more free content, reach more
              people, and keep the message uncompromised. No sponsors. No
              filters. Just truth.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}
