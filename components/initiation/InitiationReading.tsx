"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
  MINI_QUIZ_QUESTIONS,
  buildMiniResult,
  type MiniDarkMirrorResult,
} from "@/lib/mini-quiz";
import type { PersonalityType } from "@/lib/quiz-data";
import DarkMirrorRadar from "@/components/dark-mirror/DarkMirrorRadar";

/**
 * The Reading: Initiation step 2. The abbreviated Dark Mirror (the same
 * 12 questions the public mini quiz uses), followed by a live hex
 * reveal. No email gate and no funnel tiles here: the member has
 * already paid. The full Dark Mirror stays available later; members
 * who already hold a QuizResult skip this step entirely (the flow
 * decides that, not this component).
 */

type Props = {
  onDone: (result: MiniDarkMirrorResult) => void;
};

export default function InitiationReading({ onDone }: Props) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, PersonalityType>>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [result, setResult] = useState<MiniDarkMirrorResult | null>(null);

  const question = MINI_QUIZ_QUESTIONS[currentQ];
  const total = MINI_QUIZ_QUESTIONS.length;

  function handleAnswer(answerId: string, axis: PersonalityType) {
    if (selectedId) return;
    setSelectedId(answerId);
    const next = { ...answers, [question.id]: axis };
    setAnswers(next);
    setTimeout(() => {
      setSelectedId(null);
      if (currentQ + 1 < total) {
        setCurrentQ(currentQ + 1);
      } else {
        setResult(buildMiniResult(next));
      }
    }, 280);
  }

  if (result) {
    return (
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center"
      >
        <p className="text-warm-gold text-[10px] uppercase tracking-[0.35em] mb-6">
          Your reading
        </p>
        <DarkMirrorRadar
          scores={result.scores}
          dominantType={result.dominantType}
          secondaryType={result.secondaryType}
          size={300}
        />
        <p className="mt-6 text-text-light text-lg font-light">
          {result.dominantName}
        </p>
        <p className="mt-1 text-text-gray text-sm italic">
          {result.dominantTagline}
        </p>
        <p className="mt-6 text-text-gray text-sm max-w-sm leading-relaxed">
          This is your instrument panel. It will change as you train.
        </p>
        <button
          type="button"
          onClick={() => onDone(result)}
          className="mt-8 px-8 py-3 rounded-full border border-warm-gold/40 text-warm-gold uppercase tracking-[0.3em] text-xs hover:bg-warm-gold/10 transition-colors"
        >
          Continue
        </button>
      </m.div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-6">
        <p className="text-text-gray text-[10px] uppercase tracking-[0.3em]">
          The Reading
        </p>
        <p className="text-text-gray text-[10px] tabular-nums">
          {currentQ + 1} / {total}
        </p>
      </div>
      <div className="h-px w-full bg-white/10 mb-8 overflow-hidden">
        <div
          className="h-px bg-warm-gold transition-all duration-300"
          style={{ width: `${((currentQ + 1) / total) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <m.div
          key={question.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          <p className="text-warm-gold/70 text-[10px] uppercase tracking-[0.25em] mb-2">
            {question.title}
          </p>
          <p className="text-text-light text-base font-light leading-relaxed mb-6">
            {question.scenario}
          </p>
          <div className="space-y-2.5">
            {question.answers.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => handleAnswer(a.id, a.axis)}
                className={`w-full text-left px-4 py-3 rounded-lg border text-sm font-light leading-relaxed transition-all ${
                  selectedId === a.id
                    ? "border-warm-gold bg-warm-gold/10 text-warm-gold"
                    : "border-white/10 bg-white/[0.02] text-text-gray hover:border-warm-gold/30 hover:text-text-light"
                }`}
              >
                {a.text}
              </button>
            ))}
          </div>
        </m.div>
      </AnimatePresence>
    </div>
  );
}
