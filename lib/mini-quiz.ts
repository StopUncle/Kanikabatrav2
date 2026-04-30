// The Mini Dark Mirror, free email-gated 7-question version of the
// Dark Mirror Assessment. Top-of-funnel asset for cold IG / TikTok
// traffic. Members get a single-axis result on the page; full 6-axis
// breakdown delivered to email post-submit.
//
// Questions are sampled from the full 20-question quiz at lib/quiz-data.ts
// to give:
//   - All 5 cluster-B axes covered + neurotypical baseline
//   - Histrionic represented in 3 of 7 questions (the underweighted
//     axis in the broader question pool)
//   - Punchy, memorable scenarios that read well on mobile-first UI
//
// Per the multimillion-roadmap (research/multimillion-roadmap/
// 11-phase-1-detailed.md week 4): purpose is owned-email capture, not
// product redesign. The full $9.99 quiz remains the upsell.

import {
  QUIZ_QUESTIONS,
  PERSONALITY_PROFILES,
  type PersonalityType,
  type QuizQuestion,
  type QuizScores,
} from "@/lib/quiz-data";

// Selected question IDs from the master 20-question pool.
// Coverage matrix: each row marks which axes are tested.
//
//   Q  | NT | Psy | Soc | Nar | Bor | His
//   1  |  ✓ |  ✓  |  ✓  |  ✓  |  ✓  |
//   3  |  ✓ |  ✓  |  ✓  |  ✓  |     |  ✓
//   5  |  ✓ |  ✓  |  ✓  |  ✓  |  ✓  |
//   7  |  ✓ |  ✓  |  ✓  |  ✓  |  ✓  |
//   8  |  ✓ |  ✓  |  ✓  |  ✓  |  ✓  |
//   9  |  ✓ |  ✓  |  ✓  |  ✓  |     |  ✓
//   15 |  ✓ |  ✓  |  ✓  |  ✓  |     |  ✓
//
// All 6 axes can be the dominant result. Histrionic gets 3 chances,
// Borderline gets 4, the other four cluster B + NT each get 7.
const MINI_QUIZ_QUESTION_IDS = [1, 3, 5, 7, 8, 9, 15];

export const MINI_QUIZ_QUESTIONS: QuizQuestion[] = MINI_QUIZ_QUESTION_IDS.map(
  (id) => {
    const q = QUIZ_QUESTIONS.find((x) => x.id === id);
    if (!q) {
      throw new Error(`Mini quiz: question id ${id} missing from master pool`);
    }
    return q;
  },
);

/** Score a 7-answer record into 6-axis percentages, mirroring the
 *  full-quiz scoring in lib/quiz-data.ts but for the 7-question subset. */
export function scoreMiniQuiz(
  answers: Record<number, PersonalityType>,
): QuizScores {
  const scores: QuizScores = {
    psychopathic: 0,
    sociopathic: 0,
    narcissistic: 0,
    borderline: 0,
    histrionic: 0,
    neurotypical: 0,
  };
  Object.values(answers).forEach((type) => {
    scores[type] += 1;
  });
  const total = Object.values(scores).reduce((s, v) => s + v, 0);
  if (total === 0) return scores;
  return {
    psychopathic: Math.round((scores.psychopathic / total) * 100),
    sociopathic: Math.round((scores.sociopathic / total) * 100),
    narcissistic: Math.round((scores.narcissistic / total) * 100),
    borderline: Math.round((scores.borderline / total) * 100),
    histrionic: Math.round((scores.histrionic / total) * 100),
    neurotypical: Math.round((scores.neurotypical / total) * 100),
  };
}

/** Pick the dominant axis, with deterministic tiebreaks favouring the
 *  more-discriminating (cluster B) axes over neurotypical, then by
 *  cluster severity (psychopathic > sociopathic > narcissistic >
 *  borderline > histrionic). Tiebreak only matters in even splits. */
export function pickDominantType(scores: QuizScores): PersonalityType {
  const order: PersonalityType[] = [
    "psychopathic",
    "sociopathic",
    "narcissistic",
    "borderline",
    "histrionic",
    "neurotypical",
  ];
  let best: PersonalityType = "neurotypical";
  let bestScore = -1;
  for (const t of order) {
    if (scores[t] > bestScore) {
      best = t;
      bestScore = scores[t];
    }
  }
  return best;
}

export interface MiniDarkMirrorResult {
  scores: QuizScores;
  dominantType: PersonalityType;
  dominantName: string;
  dominantTagline: string;
  /** Short paragraph shown on the page (no email required). */
  teaser: string;
}

/** Derive the on-page result from a 7-answer record. Email-gated full
 *  description is delivered via sendMiniDarkMirrorResult; the teaser
 *  here is enough to make the visitor want the full read. */
export function buildMiniResult(
  answers: Record<number, PersonalityType>,
): MiniDarkMirrorResult {
  const scores = scoreMiniQuiz(answers);
  const dominantType = pickDominantType(scores);
  const profile = PERSONALITY_PROFILES[dominantType];
  // The teaser is one sentence + one trait, NOT the full description.
  // The point is to make the visitor hand over their email to read
  // the rest. Show enough that they trust the diagnosis; hold back
  // enough that the full description feels like a payoff.
  const firstTrait = profile.traits[0] ?? "";
  const teaser = `${profile.tagline} ${firstTrait}`;
  return {
    scores,
    dominantType,
    dominantName: profile.name,
    dominantTagline: profile.tagline,
    teaser,
  };
}
