"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import {
  DARK_TRIAD_ITEMS,
  SD3_LIKERT_OPTIONS,
  generateDarkTriadDiagnosis,
  calculateDarkTriadScores,
  DARK_TRIAD_QUIZ_INFO,
} from "@/lib/quiz-dark-triad-data";
import KanikaroseLogo from "@/components/KanikaroseLogo";
import { ChevronLeft, ShieldAlert } from "lucide-react";

export default function DarkTriadTakePage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<
    Record<number, 1 | 2 | 3 | 4 | 5>
  >({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedValue, setSelectedValue] = useState<
    1 | 2 | 3 | 4 | 5 | null
  >(null);

  const item = DARK_TRIAD_ITEMS[currentIndex];
  const progress = (currentIndex / DARK_TRIAD_ITEMS.length) * 100;

  const handleAnswer = (value: 1 | 2 | 3 | 4 | 5) => {
    if (!item) return;
    setSelectedValue(value);
    const newAnswers = { ...answers, [item.id]: value };
    setAnswers(newAnswers);
    setTimeout(() => {
      if (currentIndex < DARK_TRIAD_ITEMS.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedValue(null);
      } else {
        setIsProcessing(true);
        const scores = calculateDarkTriadScores(newAnswers);
        const diagnosis = generateDarkTriadDiagnosis(newAnswers);
        sessionStorage.setItem(
          "darkTriadQuizResults",
          JSON.stringify({
            scores,
            diagnosis,
            answers: newAnswers,
            completedAt: new Date().toISOString(),
          }),
        );
        setTimeout(() => {
          router.push("/quiz/dark-triad/results");
        }, 3000);
      }
    }, 350);
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
              Mapping the Three Axes…
            </h2>
            <p className="text-text-gray mb-8">
              Calibrating against the SD3 reference norms
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

  if (!item) return null;

  const axisLabel =
    item.axis === "machiavellianism"
      ? "Machiavellianism · Strategy"
      : item.axis === "narcissism"
        ? "Narcissism · Stage"
        : "Psychopathy · Cold";

  const axisChipClass =
    item.axis === "machiavellianism"
      ? "text-indigo-300 border-indigo-300/30 bg-indigo-300/5"
      : item.axis === "narcissism"
        ? "text-amber-300 border-amber-300/30 bg-amber-300/5"
        : "text-blue-300 border-blue-300/30 bg-blue-300/5";

  return (
    <div className="min-h-screen bg-deep-black flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-deep-black/50">
        <m.div
          className="h-full bg-gradient-to-r from-accent-gold to-accent-gold/60"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

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
            <span> / {DARK_TRIAD_ITEMS.length}</span>
          </div>
        </div>
        <div className="text-text-gray text-xs uppercase tracking-wider">
          {DARK_TRIAD_QUIZ_INFO.name}
        </div>
      </div>

      <div className="px-4 pt-3">
        <div className="max-w-2xl mx-auto flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-accent-burgundy/70 justify-center">
          <ShieldAlert size={11} strokeWidth={1.5} />
          <span>
            Educational only · SD3-calibrated · Not a clinical diagnosis
          </span>
        </div>
      </div>

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
              <div className="text-center mb-6">
                <span
                  className={`inline-block px-3 py-1 text-[10px] uppercase tracking-wider rounded-full border ${axisChipClass}`}
                >
                  {axisLabel}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-light text-white text-center leading-relaxed mb-10 px-2">
                &ldquo;{item.statement}&rdquo;
              </h2>

              <div className="space-y-3">
                {SD3_LIKERT_OPTIONS.map((opt, index) => (
                  <m.button
                    key={opt.value}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.06 }}
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

      <div className="pb-6 px-4 text-center">
        <p className="text-text-gray/50 text-xs">
          Your responses are private. Choose honestly for an accurate read.
        </p>
      </div>
    </div>
  );
}
