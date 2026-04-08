"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Mic,
  ChevronRight,
  ChevronLeft,
  Check,
  Lock,
} from "lucide-react";
import { ASK_KANIKA_PACKAGES } from "@/lib/constants";
import LemonSqueezyButton from "@/components/LemonSqueezyButton";

type Format = "written" | "voice";
type QuestionCount = 1 | 3;

const ASK_VARIANT_IDS: Record<string, string> = {
  "written-1": "1503028",
  "written-3": "1503033",
  "voice-1": "1503035",
  "voice-3": "1503042",
};

const steps = ["Choose Format", "Your Question", "Payment"];

export default function AskPageClient() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(0);
  const [format, setFormat] = useState<Format>(
    (searchParams.get("format") as Format) || "written",
  );
  const [questionCount, setQuestionCount] = useState<QuestionCount>(
    searchParams.get("count") === "3" ? 3 : 1,
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [questions, setQuestions] = useState<string[]>([""]);
  const [isComplete, setIsComplete] = useState(false);

  const selectedPackage = ASK_KANIKA_PACKAGES.find(
    (p) => p.format === format && p.questions === questionCount,
  );

  // Adjust questions array when count changes
  useEffect(() => {
    setQuestions((prev) => {
      if (questionCount === 1) return [prev[0] || ""];
      return [prev[0] || "", prev[1] || "", prev[2] || ""];
    });
  }, [questionCount]);

  const updateQuestion = (index: number, value: string) => {
    setQuestions((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const canProceedToPayment =
    email.includes("@") &&
    questions.slice(0, questionCount).every((q) => q.trim().length > 10);

  // Check for successful return from Lemon Squeezy
  useEffect(() => {
    if (step === 2 && typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (url.searchParams.get("checkout") === "success") {
        setIsComplete(true);
      }
    }
  }, [step]);

  if (isComplete) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 rounded-full bg-accent-gold/20 flex items-center justify-center mx-auto mb-8">
            <Check className="text-accent-gold" size={40} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-light mb-4 gradient-text-gold">
            Question Submitted
          </h1>
          <p className="text-text-gray text-lg mb-4 leading-relaxed">
            Your {format === "voice" ? "voice" : "written"} answer will be
            delivered to <strong className="text-text-light">{email}</strong>{" "}
            within 48 hours.
          </p>
          <p className="text-text-gray/60 text-sm mb-8">
            Check your inbox for a confirmation email with your question
            details.
          </p>
          <a
            href="/"
            className="btn-secondary rounded-full inline-block px-8 py-3"
          >
            Return Home
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10 sm:mb-14">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-3">
          <span className="text-text-light">Ask Kanika</span>{" "}
          <span className="gradient-text-gold">a Question</span>
        </h1>
        <p className="text-text-gray text-base sm:text-lg max-w-xl mx-auto">
          One question. One honest answer from someone who doesn&apos;t
          sugarcoat.
        </p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {steps.map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <button
              onClick={() => {
                if (i < step) setStep(i);
              }}
              disabled={i > step}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm transition-colors ${
                i === step
                  ? "bg-accent-gold/15 text-accent-gold border border-accent-gold/30"
                  : i < step
                    ? "text-accent-gold/60 cursor-pointer hover:text-accent-gold"
                    : "text-text-gray/40"
              }`}
            >
              {i < step ? (
                <Check size={14} />
              ) : (
                <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">
                  {i + 1}
                </span>
              )}
              <span className="hidden sm:inline">{label}</span>
            </button>
            {i < steps.length - 1 && (
              <ChevronRight size={14} className="text-text-gray/30" />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        {/* Step 1: Choose Format */}
        {step === 0 && (
          <motion.div
            key="step-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Format Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <button
                onClick={() => setFormat("written")}
                className={`p-6 rounded-2xl border text-left transition-all ${
                  format === "written"
                    ? "border-accent-gold/40 bg-accent-gold/5"
                    : "border-accent-gold/10 hover:border-accent-gold/25"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-accent-burgundy/20 flex items-center justify-center">
                    <MessageCircle className="text-accent-gold" size={18} />
                  </div>
                  <h3 className="text-lg font-light text-text-light">
                    Written Answer
                  </h3>
                </div>
                <p className="text-text-gray text-sm">
                  A detailed, personal written response delivered to your email.
                </p>
              </button>

              <button
                onClick={() => setFormat("voice")}
                className={`p-6 rounded-2xl border text-left transition-all ${
                  format === "voice"
                    ? "border-accent-gold/40 bg-accent-gold/5"
                    : "border-accent-gold/10 hover:border-accent-gold/25"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-accent-burgundy/20 flex items-center justify-center">
                    <Mic className="text-accent-gold" size={18} />
                  </div>
                  <h3 className="text-lg font-light text-text-light">
                    Voice Answer
                  </h3>
                </div>
                <p className="text-text-gray text-sm">
                  A personal voice memo — raw, unfiltered, and direct.
                </p>
              </button>
            </div>

            {/* Question Count */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {([1, 3] as const).map((count) => {
                const pkg = ASK_KANIKA_PACKAGES.find(
                  (p) => p.format === format && p.questions === count,
                );
                if (!pkg) return null;

                const singlePrice = ASK_KANIKA_PACKAGES.find(
                  (p) => p.format === format && p.questions === 1,
                )?.price;
                const savings =
                  count === 3 && singlePrice
                    ? (singlePrice * 3 - pkg.price).toFixed(0)
                    : null;

                return (
                  <button
                    key={count}
                    onClick={() => setQuestionCount(count)}
                    className={`p-5 rounded-xl border transition-all text-left relative ${
                      questionCount === count
                        ? "border-accent-gold/40 bg-accent-gold/5"
                        : "border-accent-gold/10 hover:border-accent-gold/25"
                    }`}
                  >
                    {savings && (
                      <span className="absolute -top-2.5 right-4 bg-accent-burgundy text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        Save ${savings}
                      </span>
                    )}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-text-light font-medium">
                          {count} Question{count > 1 ? "s" : ""}
                        </p>
                        <p className="text-text-gray text-xs mt-1">
                          {count === 3
                            ? "Best value — ask everything"
                            : "Single focused question"}
                        </p>
                      </div>
                      <p className="text-2xl font-light gradient-text-gold">
                        ${pkg.price}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setStep(1)}
                className="btn-primary rounded-full text-white px-8 py-3 flex items-center gap-2"
              >
                Continue
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Questions */}
        {step === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-6 mb-10">
              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-text-gray text-xs uppercase tracking-wider mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Optional"
                    className="w-full bg-deep-navy/30 border border-accent-gold/15 rounded-xl px-4 py-3 text-text-light placeholder:text-text-gray/40 focus:outline-none focus:border-accent-gold/40 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-text-gray text-xs uppercase tracking-wider mb-2">
                    Your Email <span className="text-accent-burgundy">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Where to send your answer"
                    required
                    className="w-full bg-deep-navy/30 border border-accent-gold/15 rounded-xl px-4 py-3 text-text-light placeholder:text-text-gray/40 focus:outline-none focus:border-accent-gold/40 transition-colors"
                  />
                </div>
              </div>

              {/* Questions */}
              {Array.from({ length: questionCount }).map((_, i) => (
                <div key={i}>
                  <label className="block text-text-gray text-xs uppercase tracking-wider mb-2">
                    {questionCount > 1 ? `Question ${i + 1}` : "Your Question"}{" "}
                    <span className="text-accent-burgundy">*</span>
                  </label>
                  <textarea
                    value={questions[i] || ""}
                    onChange={(e) => updateQuestion(i, e.target.value)}
                    placeholder="Ask about relationships, power dynamics, dark psychology, or anything you've been afraid to ask..."
                    rows={4}
                    className="w-full bg-deep-navy/30 border border-accent-gold/15 rounded-xl px-4 py-3 text-text-light placeholder:text-text-gray/40 focus:outline-none focus:border-accent-gold/40 transition-colors resize-none"
                  />
                  <p className="text-text-gray/40 text-xs mt-1 text-right">
                    {(questions[i] || "").trim().length < 10
                      ? "Minimum 10 characters"
                      : ""}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setStep(0)}
                className="text-text-gray hover:text-text-light transition-colors flex items-center gap-1 text-sm"
              >
                <ChevronLeft size={16} />
                Back
              </button>
              <button
                onClick={() => setStep(2)}
                disabled={!canProceedToPayment}
                className="btn-primary rounded-full text-white px-8 py-3 flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:transform-none"
              >
                Continue to Payment
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Payment */}
        {step === 2 && (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Order Summary */}
            <div className="bg-gradient-to-b from-deep-burgundy/20 to-deep-navy/20 border border-accent-gold/10 rounded-2xl p-6 sm:p-8 mb-8">
              <h3 className="text-sm text-text-gray uppercase tracking-wider mb-4">
                Order Summary
              </h3>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {format === "voice" ? (
                    <Mic className="text-accent-gold" size={20} />
                  ) : (
                    <MessageCircle className="text-accent-gold" size={20} />
                  )}
                  <div>
                    <p className="text-text-light">
                      {format === "voice" ? "Voice" : "Written"} Answer
                    </p>
                    <p className="text-text-gray text-sm">
                      {questionCount} question{questionCount > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
                <p className="text-2xl font-light gradient-text-gold">
                  ${selectedPackage?.price}
                </p>
              </div>

              {/* Preview questions */}
              <div className="space-y-2 pt-4 border-t border-accent-gold/10">
                {questions.slice(0, questionCount).map((q, i) => (
                  <div
                    key={i}
                    className="text-sm text-text-gray bg-deep-black/30 rounded-lg px-4 py-3"
                  >
                    <span className="text-accent-gold/60 text-xs uppercase">
                      Q{questionCount > 1 ? i + 1 : ""}:
                    </span>{" "}
                    {q.trim().length > 100
                      ? q.trim().substring(0, 100) + "..."
                      : q.trim()}
                  </div>
                ))}
              </div>

              {email && (
                <p className="text-text-gray/60 text-xs mt-4">
                  Response will be sent to: {email}
                </p>
              )}
            </div>

            {/* Payment */}
            <div className="mb-6">
              {selectedPackage && ASK_VARIANT_IDS[selectedPackage.id] && (
                <LemonSqueezyButton
                  variantId={ASK_VARIANT_IDS[selectedPackage.id]}
                  label={`Pay $${selectedPackage.price}`}
                  price={`$${selectedPackage.price}`}
                  email={email}
                  name={name}
                  customData={{
                    customerName: name,
                    customerEmail: email,
                    questions: questions.slice(0, questionCount).map((q) => q.trim()).join("|||"),
                    packageId: selectedPackage.id,
                  }}
                  redirectUrl={`${typeof window !== "undefined" ? window.location.origin : ""}/ask?checkout=success`}
                />
              )}
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="text-text-gray hover:text-text-light transition-colors flex items-center gap-1 text-sm"
              >
                <ChevronLeft size={16} />
                Back
              </button>
              <div className="flex items-center gap-2 text-text-gray/40 text-xs">
                <Lock size={12} />
                Secure payment via Lemon Squeezy
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
