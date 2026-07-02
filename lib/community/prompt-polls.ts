/**
 * Poll options for the daily discussion prompts, keyed by theme.
 *
 * The prompts are open storytelling questions; typing a story is the
 * highest-friction ask in the product (4% lifetime comment rate). The
 * poll is the participation floor: one tap casts a stance, reveals how
 * the council splits, and warms the member up to comment. Options are
 * authored per THEME (stable across the 4 weekly variations), so a new
 * prompt variation needs no new options.
 *
 * Voice rules apply (see docs/INTEL): declarative, specific, recognition
 * over deployment, no em dashes.
 */

export interface PromptPoll {
  question: string;
  options: string[];
}

const THEME_POLLS: Record<string, PromptPoll> = {
  "manipulation-monday": {
    question: "Where does manipulation find you most?",
    options: [
      "Dating and romance",
      "Work and career",
      "Family",
      "I rarely catch it in time",
    ],
  },
  "toxic-tuesday": {
    question: "The red flag you are most likely to excuse?",
    options: [
      "Charm that moves too fast",
      "Jealousy dressed up as care",
      "Small lies that never quite add up",
      "How they treat people beneath them",
    ],
  },
  "wisdom-wednesday": {
    question: "What taught you to see people clearly?",
    options: [
      "A relationship that cost me",
      "Watching someone else get played",
      "A book, podcast, or this community",
      "Still learning, honestly",
    ],
  },
  "throwback-thursday": {
    question: "Looking back, what would you change first?",
    options: [
      "Trusting my gut sooner",
      "Leaving earlier",
      "Saying it to their face",
      "Choosing differently from the start",
    ],
  },
  "freedom-friday": {
    question: "What did holding your ground look like this week?",
    options: [
      "A boundary held under pressure",
      "Contact cut or kept cut",
      "A pattern spotted before it landed",
      "Quiet week. Watching and learning",
    ],
  },
  "situation-saturday": {
    question: "In a grey-area situation, your first move is",
    options: [
      "Watch and gather",
      "Name it to their face",
      "Test them quietly",
      "Distance first, decide later",
    ],
  },
  "strategy-sunday": {
    question: "Your default under social pressure?",
    options: [
      "Grey rock",
      "Direct confrontation",
      "Strategic retreat",
      "Play along while planning the exit",
    ],
  },
};

export function pollForTheme(theme: string): PromptPoll | null {
  return THEME_POLLS[theme] ?? null;
}
