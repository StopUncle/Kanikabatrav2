import { prisma } from "@/lib/prisma";
import { sendQuizResults } from "@/lib/email";
import { QUIZ_CREDIT } from "@/lib/stripe-credits";
import {
  PERSONALITY_PROFILES,
  PersonalityType,
  QuizScores,
  generateDiagnosis,
  getPersonalityTypes,
} from "@/lib/quiz-data";

export type QuizResultsEmailStatus =
  | "sent"
  | "already_sent"
  | "not_found"
  | "not_paid"
  | "no_email"
  | "failed";

/**
 * Send the full Dark Mirror results email for a paid quiz result and
 * stamp emailSent so retries (webhook redelivery, manual resend) are
 * no-ops. Shared by the Stripe webhook (instant post-purchase send)
 * and /api/quiz/send-results.
 */
export async function sendQuizResultsEmailForResult(
  quizResultId: string,
): Promise<QuizResultsEmailStatus> {
  const quizResult = await prisma.quizResult.findUnique({
    where: { id: quizResultId },
  });

  if (!quizResult) return "not_found";
  if (!quizResult.paid) return "not_paid";
  if (!quizResult.email) return "no_email";
  if (quizResult.emailSent) return "already_sent";

  const scores = quizResult.scores as unknown as QuizScores;
  const answers = quizResult.answers as Record<number, PersonalityType>;

  const primaryType = quizResult.primaryType as PersonalityType;
  // secondaryType is nullable in the schema; recompute from scores
  // rather than crashing on a profile lookup with null.
  const secondaryType =
    (quizResult.secondaryType as PersonalityType | null) ??
    getPersonalityTypes(scores).secondary;

  const primaryProfile = PERSONALITY_PROFILES[primaryType];
  const secondaryProfile = PERSONALITY_PROFILES[secondaryType];
  if (!primaryProfile || !secondaryProfile) return "failed";

  const diagnosis = generateDiagnosis(answers);

  const emailSent = await sendQuizResults({
    email: quizResult.email,
    primaryType,
    secondaryType,
    scores: scores as unknown as Record<string, number>,
    diagnosis: {
      clinicalLabel: diagnosis.clinicalLabel,
      functioningLevel: diagnosis.functioningLevel,
      functioningScore: diagnosis.functioningScore,
      description: diagnosis.description,
    },
    primaryProfile: {
      name: primaryProfile.name,
      tagline: primaryProfile.tagline,
      description: primaryProfile.description,
      traits: primaryProfile.traits,
      strengths: primaryProfile.strengths,
      blindSpots: primaryProfile.blindSpots,
      relationshipPattern: primaryProfile.relationshipPattern,
    },
    secondaryProfile: {
      name: secondaryProfile.name,
      tagline: secondaryProfile.tagline,
      description: secondaryProfile.description,
    },
    consiliumCredit:
      quizResult.consiliumCreditCode && quizResult.consiliumCreditExpiresAt
        ? {
            code: quizResult.consiliumCreditCode,
            amount: QUIZ_CREDIT.discount,
            expiresAt: quizResult.consiliumCreditExpiresAt,
          }
        : undefined,
  });

  if (!emailSent) return "failed";

  await prisma.quizResult.update({
    where: { id: quizResultId },
    data: { emailSent: true },
  });

  return "sent";
}
