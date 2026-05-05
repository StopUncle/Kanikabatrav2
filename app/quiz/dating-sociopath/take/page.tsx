"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import {
  DATING_ITEMS,
  DATING_RESPONSE_OPTIONS,
  generateDatingDiagnosis,
  calculateDatingScores,
  DATING_QUIZ_INFO,
} from "@/lib/quiz-dating-sociopath-data";
import KanikaroseLogo from "@/components/KanikaroseLogo";
import { ChevronLeft, ShieldAlert } from "lucide-react";

export default function DatingSociopathTakePage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 0 | 1 | 2>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedValue, setSelectedValue] = useState<0 | 1 | 2 | null>(null);

  const item = DATING_ITEMS[currentIndex];
  const progress = (currentIndex / DATING_ITEMS.length) * 100;

  const handleAnswer = (value: 0 | 1 | 2) => {
    if (!item) return;
    setSelectedValue(value);
    const newAnswers = { ...answers, [item.id]: value };
    setAnswers(newAnswers);
    setTimeout(() => {
      if (currentIndex < DATING_ITEMS.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedValue(null);
      } else {
        setIsProcessing(true);
        const scores = calculateDatingScores(newAnswers);
        const diagnosis = generateDatingDiagnosis(newAnswers);
        sessionStorage.setItem(
          "datingSociopathQuizResults",
          JSON.stringify({
            scores,
            diagnosis,
            answers: newAnswers,
            completedAt: new Date().toISOString(),
          }),
        );
        setTimeout(() => {
          router.push("/quiz/dating-sociopath/results");
        }, 2800);
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
              Reading the Configuration…
            </h2>
            <p className="text-text-gray mb-8">
              Mapping the visible against the felt
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

  const axisChipClass =
    item.axis === "behavioural"
      ? "text-rose-300 border-rose-300/30 bg-rose-300/5"
      : "text-amber-300 border-amber-300/30 bg-amber-300/5";

  const axisLabel =
    item.axis === "behavioural"
      ? "Behavioural · Visible"
      : "Internal · Felt";

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
            <span> / {DATING_ITEMS.length}</span>
          </div>
        </div>
        <div className="text-text-gray text-xs uppercase tracking-wider">
          {DATING_QUIZ_INFO.shortName}
        </div>
      </div>

      <div className="px-4 pt-3">
        <div className="max-w-2xl mx-auto flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-accent-burgundy/70 justify-center">
          <ShieldAlert size={11} strokeWidth={1.5} />
          <span>
            Educational only · Not a diagnosis · Crisis resources on results
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

              <h2 className="text-base sm:text-lg font-light text-white text-center leading-relaxed mb-10 px-2 max-w-2xl mx-auto">
                {item.scenario}
              </h2>

              <div className="space-y-3">
                {DATING_RESPONSE_OPTIONS.map((opt, index) => (
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

      <div className="pb-6 px-4 text-center">
        <p className="text-text-gray/50 text-xs">
          Your responses are private. Honest answers produce a useful read.
        </p>
      </div>
    </div>
  );
}
