"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import {
  SOCIOPATH_ITEMS,
  LIKERT_OPTIONS,
  generateSociopathDiagnosis,
  calculateSociopathScores,
  SOCIOPATH_QUIZ_INFO,
} from "@/lib/quiz-sociopath-data";
import KanikaroseLogo from "@/components/KanikaroseLogo";
import { ChevronLeft, ShieldAlert } from "lucide-react";

// Take flow for the Sociopath Test.
//
// Mirrors /quiz/daughter/take's UI grammar (progress bar, AnimatePresence
// per question, processing screen, disclaimer chip), but swaps the
// scenario-based MCQ for a Likert (Disagree strongly → Agree strongly)
// because the LSRP is a Likert instrument and changing the response
// format would invalidate the calibration to Levenson 1995 norms.
//
// Storage key is `sociopathQuizResults` so this assessment doesn't
// collide with the Dark Mirror or Daughter session-storage payloads
// if a user takes more than one in a single browser session.

export default function SociopathTakePage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 1 | 2 | 3 | 4>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedValue, setSelectedValue] = useState<1 | 2 | 3 | 4 | null>(
    null,
  );

  const item = SOCIOPATH_ITEMS[currentIndex];
  const progress = (currentIndex / SOCIOPATH_ITEMS.length) * 100;

  const handleAnswer = (value: 1 | 2 | 3 | 4) => {
    if (!item) return;
    setSelectedValue(value);
    const newAnswers = { ...answers, [item.id]: value };
    setAnswers(newAnswers);

    // Brief feedback delay (matches the Daughter quiz cadence) so the
    // selection registers visually before transitioning to the next
    // item. 400 ms is the sweet spot, fast enough to feel snappy on
    // mobile, slow enough that the chosen option's gold flash is
    // perceived as confirmation rather than a flicker.
    setTimeout(() => {
      if (currentIndex < SOCIOPATH_ITEMS.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedValue(null);
      } else {
        // All 26 answered. Compute, persist to sessionStorage,
        // redirect to the results page. No DB save in Phase 1; the
        // results page renders entirely from session state. A future
        // /api/quiz/save call can be added with quizSlug='sociopath'
        // once the Prisma discriminator is ready, mirroring the
        // pattern Daisy described for the Daughter quiz.
        setIsProcessing(true);

        const scores = calculateSociopathScores(newAnswers);
        const diagnosis = generateSociopathDiagnosis(newAnswers);

        sessionStorage.setItem(
          "sociopathQuizResults",
          JSON.stringify({
            scores,
            diagnosis,
            answers: newAnswers,
            completedAt: new Date().toISOString(),
          }),
        );

        // Three-second hold on the processing screen. Long enough to
        // read as "calculating against published norms," short enough
        // not to test patience. The bar animation gives perceived
        // progress so it doesn't feel like a stall.
        setTimeout(() => {
          router.push("/quiz/sociopath/results");
        }, 3000);
      }
    }, 400);
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-deep-black flex items-center justify-center">
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center px-4"
        >
          <div className="mb-8 flex justify-center">
            <KanikaroseLogo size="xl" animate />
          </div>
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-light text-white mb-4">
              Scoring Against Published Norms…
            </h2>
            <p className="text-text-gray mb-8">
              Computing primary and secondary psychopathy subscales
            </p>

            <div className="flex justify-center gap-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <m.div
                  key={i}
                  className="w-2 h-2 bg-accent-gold rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </m.div>
        </m.div>
      </div>
    );
  }

  if (!item) {
    // Defensive, should never happen since the take flow gates on
    // currentIndex < length, but TypeScript wants it and a graceful
    // fallback is cheap.
    return null;
  }

  return (
    <div className="min-h-screen bg-deep-black flex flex-col">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-deep-black/50">
        <m.div
          className="h-full bg-gradient-to-r from-accent-gold to-accent-gold/60"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Header */}
      <div className="pt-6 px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          {currentIndex > 0 && !isProcessing && (
            <button
              onClick={() => {
                setCurrentIndex((prev) => prev - 1);
                setSelectedValue(null);
              }}
              className="text-text-gray hover:text-accent-gold transition-colors text-sm flex items-center gap-1"
            >
              <ChevronLeft size={16} />
              Back
            </button>
          )}
          <div className="text-text-gray text-sm">
            <span className="text-accent-gold">{currentIndex + 1}</span>
            <span> / {SOCIOPATH_ITEMS.length}</span>
          </div>
        </div>
        <div className="text-text-gray text-xs uppercase tracking-wider">
          {SOCIOPATH_QUIZ_INFO.name}
        </div>
      </div>

      {/* Disclaimer chip, matches the Daughter quiz's permanent in-flow
          disclaimer presence. Disclaimers visible at every step. */}
      <div className="px-4 pt-3">
        <div className="max-w-2xl mx-auto flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-accent-burgundy/70 justify-center">
          <ShieldAlert size={11} strokeWidth={1.5} />
          <span>
            Educational only · LSRP-calibrated · Not a clinical diagnosis
          </span>
        </div>
      </div>

      {/* Item container */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <m.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Subscale chip, surfaces which axis the item loads on,
                  so users get a feel for the two-subscale structure as
                  they go. Quietly educational. */}
              <div className="text-center mb-6">
                <span
                  className={`inline-block px-3 py-1 text-[10px] uppercase tracking-wider rounded-full ${
                    item.subscale === "primary"
                      ? "text-blue-300 border border-blue-300/30 bg-blue-300/5"
                      : "text-amber-300 border border-amber-300/30 bg-amber-300/5"
                  }`}
                >
                  {item.subscale === "primary" ? "Primary · Cold core" : "Secondary · Hot wire"}
                </span>
              </div>

              {/* Item statement */}
              <h2 className="text-xl sm:text-2xl font-light text-white text-center leading-relaxed mb-10 px-2">
                &ldquo;{item.statement}&rdquo;
              </h2>

              {/* Likert options, vertical stack so labels never truncate
                  on mobile. Order is Disagree strongly → Agree strongly,
                  matching the LSRP's published response format. */}
              <div className="space-y-3">
                {LIKERT_OPTIONS.map((opt, index) => (
                  <m.button
                    key={opt.value}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    onClick={() => handleAnswer(opt.value)}
                    disabled={selectedValue !== null}
                    className={`w-full p-4 text-left rounded-lg border transition-all duration-300 ${
                      selectedValue === opt.value
                        ? "bg-accent-gold/20 border-accent-gold text-white"
                        : selectedValue !== null
                          ? "bg-deep-black/30 border-accent-gold/10 text-text-gray/50 cursor-not-allowed"
                          : "bg-deep-black/30 border-accent-gold/20 text-text-gray hover:border-accent-gold/50 hover:bg-accent-gold/5"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center text-sm font-light ${
                          selectedValue === opt.value
                            ? "border-accent-gold bg-accent-gold text-deep-black"
                            : "border-accent-gold/30 text-accent-gold/60"
                        }`}
                      >
                        {opt.value}
                      </span>
                      <span className="text-sm sm:text-base">{opt.label}</span>
                    </div>
                  </m.button>
                ))}
              </div>
            </m.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <div className="pb-6 px-4 text-center">
        <p className="text-text-gray/50 text-xs">
          Your responses are private. Choose honestly for an accurate read.
        </p>
      </div>
    </div>
  );
}
