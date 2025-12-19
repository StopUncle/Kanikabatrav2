import { ResultType, resultProfiles } from './quiz-questions'

export interface QuizScores {
  narcissism: number
  machiavellianism: number
  psychopathy: number
}

export interface QuizResultData {
  type: ResultType
  scores: QuizScores
  percentages: {
    narcissism: number
    machiavellianism: number
    psychopathy: number
  }
  profile: typeof resultProfiles[ResultType]
}

const MAX_SCORE_PER_TRAIT = 75

export function calculateResults(answers: number[][]): QuizResultData {
  const totals: QuizScores = {
    narcissism: 0,
    machiavellianism: 0,
    psychopathy: 0
  }

  answers.forEach(([_questionIndex, _answerIndex, ...scores]) => {
    if (scores.length === 3) {
      totals.narcissism += scores[0]
      totals.machiavellianism += scores[1]
      totals.psychopathy += scores[2]
    }
  })

  const percentages = {
    narcissism: Math.round((totals.narcissism / MAX_SCORE_PER_TRAIT) * 100),
    machiavellianism: Math.round((totals.machiavellianism / MAX_SCORE_PER_TRAIT) * 100),
    psychopathy: Math.round((totals.psychopathy / MAX_SCORE_PER_TRAIT) * 100)
  }

  const type = determineType(totals, percentages)

  return {
    type,
    scores: totals,
    percentages,
    profile: resultProfiles[type]
  }
}

function determineType(scores: QuizScores, percentages: { narcissism: number; machiavellianism: number; psychopathy: number }): ResultType {
  const highThreshold = 60
  const lowThreshold = 30

  const highTraits = [
    percentages.narcissism >= highThreshold,
    percentages.machiavellianism >= highThreshold,
    percentages.psychopathy >= highThreshold
  ].filter(Boolean).length

  const allLow =
    percentages.narcissism < lowThreshold &&
    percentages.machiavellianism < lowThreshold &&
    percentages.psychopathy < lowThreshold

  if (allLow) {
    return 'balanced'
  }

  if (highTraits >= 2) {
    return 'hybrid'
  }

  const max = Math.max(scores.narcissism, scores.machiavellianism, scores.psychopathy)

  if (scores.narcissism === max) return 'narcissist'
  if (scores.machiavellianism === max) return 'machiavellian'
  if (scores.psychopathy === max) return 'psychopath'

  return 'balanced'
}

export function generateShareText(result: QuizResultData): string {
  const { type, percentages } = result
  const profile = resultProfiles[type]

  return `I just took the Dark Triad Personality Quiz and I'm ${profile.title}!

My scores:
Narcissism: ${percentages.narcissism}%
Machiavellianism: ${percentages.machiavellianism}%
Psychopathy: ${percentages.psychopathy}%

Think you can handle the truth? Take the quiz:`
}
