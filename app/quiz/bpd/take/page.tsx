"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import {
  BPD_ITEMS,
  generateBPDDiagnosis,
  calculateBPDScores,
  BPD_QUIZ_INFO,
} from "@/lib/quiz-bpd-data";
import KanikaroseLogo from "@/components/KanikaroseLogo";
import { ChevronLeft, ShieldAlert, Check, X } from "lucide-react";

export default function BPDTakePage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, "yes" | "no">>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedKey, setSelectedKey] = useState<"yes" | "no" | null>(null);

  const item = BPD_ITEMS[currentIndex];
  const progress = (currentIndex / BPD_ITEMS.length) * 100;

  const handleAnswer = (key: "yes" | "no") => {
    if (!item) return;
    setSelectedKey(key);
    const newAnswers = { ...answers, [item.id]: key };
    setAnswers(newAnswers);
    setTimeout(() => {
      if (currentIndex < BPD_ITEMS.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedKey(null);
      } else {
        setIsProcessing(true);
        const scores = calculateBPDScores(newAnswers);
        const diagnosis = generateBPDDiagnosis(newAnswers);
        sessionStorage.setItem(
          "bpdQuizResults",
          JSON.stringify({
            scores,
            diagnosis,
            answers: newAnswers,
            completedAt: new Date().toISOString(),
          }),
        );
        setTimeout(() => {
          router.push("/quiz/bpd/results");
        }, 2500);
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
              Scoring Against the Zanarini Cutoff…
            </h2>
            <p className="text-text-gray mb-8">
              Mapping your responses against the DSM-5 BPD criteria
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
                setSelectedKey(null);
              }}
              className="text-text-gray hover:text-accent-gold transition-colors text-sm flex items-center gap-1"
            >
              <ChevronLeft size={16} />
              Back
            </button>
          )}
          <div className="text-text-gray text-sm">
            <span className="text-accent-gold">{currentIndex + 1}</span>
            <span> / {BPD_ITEMS.length}</span>
          </div>
        </div>
        <div className="text-text-gray text-xs uppercase tracking-wider">
          {BPD_QUIZ_INFO.name}
        </div>
      </div>

      <div className="px-4 pt-3">
        <div className="max-w-2xl mx-auto flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-accent-burgundy/70 justify-center">
          <ShieldAlert size={11} strokeWidth={1.5} />
          <span>
            Educational only · MSI-BPD · Not a clinical diagnosis
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
                <span className="inline-block px-3 py-1 text-[10px] uppercase tracking-wider rounded-full text-accent-gold border border-accent-gold/30 bg-accent-gold/5">
                  DSM-5 · {item.dsmCriterion}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-light text-white text-center leading-relaxed mb-10 px-2">
                {item.statement}
              </h2>

              <div className="grid grid-cols-2 gap-3">
                <m.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0 }}
                  onClick={() => handleAnswer("yes")}
                  disabled={selectedKey !== null}
                  className={`p-6 text-center rounded-lg border transition-all duration-300 ${
                    selectedKey === "yes"
                      ? "bg-accent-gold/20 border-accent-gold text-white"
                      : selectedKey !== null
                        ? "bg-deep-black/30 border-accent-gold/10 text-text-gray/50 cursor-not-allowed"
                        : "bg-deep-black/30 border-accent-gold/20 text-text-gray hover:border-accent-gold/50 hover:bg-accent-gold/5"
                  }`}
                >
                  <Check
                    size={20}
                    className={`mx-auto mb-2 ${
                      selectedKey === "yes" ? "text-accent-gold" : "text-accent-gold/60"
                    }`}
                  />
                  <span className="text-base font-light tracking-wider uppercase">
                    Yes
                  </span>
                </m.button>
                <m.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 }}
                  onClick={() => handleAnswer("no")}
                  disabled={selectedKey !== null}
                  className={`p-6 text-center rounded-lg border transition-all duration-300 ${
                    selectedKey === "no"
                      ? "bg-accent-gold/20 border-accent-gold text-white"
                      : selectedKey !== null
                        ? "bg-deep-black/30 border-accent-gold/10 text-text-gray/50 cursor-not-allowed"
                        : "bg-deep-black/30 border-accent-gold/20 text-text-gray hover:border-accent-gold/50 hover:bg-accent-gold/5"
                  }`}
                >
                  <X
                    size={20}
                    className={`mx-auto mb-2 ${
                      selectedKey === "no" ? "text-accent-gold" : "text-accent-gold/60"
                    }`}
                  />
                  <span className="text-base font-light tracking-wider uppercase">
                    No
                  </span>
                </m.button>
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
