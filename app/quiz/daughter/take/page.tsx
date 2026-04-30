"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import {
  DAUGHTER_QUESTIONS,
  calculateDaughterScores,
  getDaughterTypes,
  generateDaughterDiagnosis,
  DAUGHTER_QUIZ_INFO,
} from "@/lib/quiz-daughter-data";
import KanikaroseLogo from "@/components/KanikaroseLogo";
import { ChevronLeft, ShieldAlert } from "lucide-react";

// Mirror of the Dark Mirror /quiz/take page, swapping data source. Keeps
// the same UI pattern (progress bar, AnimatePresence per question, 400ms
// feedback delay, processing screen) so the two assessments feel like
// siblings, not strangers.
//
// Two changes from the Dark Mirror version:
// 1. Storage key is `daughterQuizResults` not `quizResults` so the two
//    quizzes don't collide if a user takes both in the same session.
// 2. Disclaimer chip surfaces in the header. Daisy required disclaimers
//    visible on every page, including the take flow itself.
export default function DaughterQuizTakePage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // Daughter quiz answer values are answer IDs (e.g. "1a") rather than the
  // type slug, because each answer carries both a type AND a motherSignal
  // weight. The scoring functions in quiz-daughter-data.ts look the answer
  // up by ID inside each question and read both fields.
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const question = DAUGHTER_QUESTIONS[currentQuestion];
  const progress = (currentQuestion / DAUGHTER_QUESTIONS.length) * 100;

  const handleAnswer = (answerId: string) => {
    setSelectedAnswer(answerId);
    const newAnswers = { ...answers, [question.id]: answerId };
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestion < DAUGHTER_QUESTIONS.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
      } else {
        // Quiz complete, calculate, persist to sessionStorage, redirect.
        // No DB save in Phase 1 of the daughter quiz; Phase 2 will add the
        // /api/quiz/save call with quizType="daughter" once the Prisma
        // discriminator + API routes are in place.
        setIsProcessing(true);

        const scores = calculateDaughterScores(newAnswers);
        const types = getDaughterTypes(scores);
        const diagnosis = generateDaughterDiagnosis(newAnswers);

        sessionStorage.setItem(
          "daughterQuizResults",
          JSON.stringify({
            scores,
            primaryType: types.primary,
            secondaryType: types.secondary,
            diagnosis,
            answers: newAnswers,
            completedAt: new Date().toISOString(),
          }),
        );

        setTimeout(() => {
          router.push("/quiz/daughter/results");
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
              Reading Your Pattern...
            </h2>
            <p className="text-text-gray mb-8">
              Mapping your daughter profile and the household signal
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

  return (
    <div className="min-h-screen bg-deep-black flex flex-col">
      {/* Progress Bar */}
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
          {currentQuestion > 0 && !isProcessing && (
            <button
              onClick={() => {
                setCurrentQuestion((prev) => prev - 1);
                setSelectedAnswer(null);
              }}
              className="text-text-gray hover:text-accent-gold transition-colors text-sm flex items-center gap-1"
            >
              <ChevronLeft size={16} />
              Back
            </button>
          )}
          <div className="text-text-gray text-sm">
            <span className="text-accent-gold">{currentQuestion + 1}</span>
            <span> / {DAUGHTER_QUESTIONS.length}</span>
          </div>
        </div>
        <div className="text-text-gray text-xs uppercase tracking-wider">
          {DAUGHTER_QUIZ_INFO.name}
        </div>
      </div>

      {/* Disclaimer chip, fixed presence in the take flow per the Daisy
          requirement that disclaimers must be visible at every step. Compact
          enough not to interrupt the quiz cadence, prominent enough to be
          read. */}
      <div className="px-4 pt-3">
        <div className="max-w-2xl mx-auto flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-accent-burgundy/70 justify-center">
          <ShieldAlert size={11} strokeWidth={1.5} />
          <span>
            Educational only · Not medical advice · Not a clinical diagnosis
          </span>
        </div>
      </div>

      {/* Question Container */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <m.div
              key={question.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Question Title */}
              <div className="text-center mb-8">
                <span className="inline-block px-3 py-1 text-xs uppercase tracking-wider text-accent-gold border border-accent-gold/30 rounded-full mb-4">
                  {question.title}
                </span>
                <h2 className="text-xl sm:text-2xl font-light text-white leading-relaxed">
                  {question.scenario}
                </h2>
              </div>

              {/* Answer Options */}
              <div className="space-y-3">
                {question.answers.map((answer, index) => (
                  <m.button
                    key={answer.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleAnswer(answer.id)}
                    disabled={selectedAnswer !== null}
                    className={`w-full p-4 text-left rounded-lg border transition-all duration-300 ${
                      selectedAnswer === answer.id
                        ? "bg-accent-gold/20 border-accent-gold text-white"
                        : selectedAnswer !== null
                          ? "bg-deep-black/30 border-accent-gold/10 text-text-gray/50 cursor-not-allowed"
                          : "bg-deep-black/30 border-accent-gold/20 text-text-gray hover:border-accent-gold/50 hover:bg-accent-gold/5"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center text-sm ${
                          selectedAnswer === answer.id
                            ? "border-accent-gold bg-accent-gold text-deep-black"
                            : "border-accent-gold/30 text-accent-gold/60"
                        }`}
                      >
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="pt-1">{answer.text}</span>
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
