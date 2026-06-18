/**
 * Public, PII-free getter for a shared quiz result.
 *
 * The shareable surface is the personality type + the 6-axis scores, which
 * is exactly what the OG card (/api/og/quiz/[id]) already renders publicly.
 * We never expose the taker's email or raw answers here. Wrapped in React
 * cache() so generateMetadata and the page body share one query per request.
 */

import { cache } from "react";
import { prisma } from "@/lib/prisma";
import type { PersonalityType, QuizScores } from "@/lib/quiz-data";

export interface PublicQuizResult {
  id: string;
  primaryType: PersonalityType;
  secondaryType: PersonalityType | null;
  scores: QuizScores;
}

export const getPublicQuizResult = cache(
  async (id: string): Promise<PublicQuizResult | null> => {
    const row = await prisma.quizResult.findUnique({
      where: { id },
      select: {
        id: true,
        primaryType: true,
        secondaryType: true,
        scores: true,
      },
    });
    if (!row) return null;
    return {
      id: row.id,
      primaryType: row.primaryType as PersonalityType,
      secondaryType: (row.secondaryType as PersonalityType | null) ?? null,
      scores: row.scores as unknown as QuizScores,
    };
  },
);
