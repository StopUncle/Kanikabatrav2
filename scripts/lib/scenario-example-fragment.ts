/**
 * Hand-written example fragment passed to the LLM as a few-shot anchor.
 *
 * Intentionally small: one branching scene with two choices, one
 * auto-advance scene, and one ending scene. Demonstrates the shape
 * without trying to capture an entire scenario. Avoiding loading any
 * real scenario file (each is 600+ lines of prose) into the prompt
 * keeps the context window tight and the example uniform across runs.
 */

export const EXAMPLE_SCENE_FRAGMENT = `
// Example shape, edit IDs and content for the target scenario. This is
// a fragment, not a complete scenarios array.

{
  id: "opening",
  mood: "tense",
  dialog: [
    {
      speakerId: "marc",
      emotion: "smirking",
      text: "Walk me through how you got the number to fourteen million.",
    },
    {
      speakerId: "inner-voice",
      tone: "tactical",
      text: "He is anchoring on context, not on price. Stay in the context.",
    },
  ],
  choices: [
    {
      id: "answer-the-context",
      text: "Talk through the growth curve, not the multiple.",
      isOptimal: true,
      nextSceneId: "marc-counters",
      tactic: "context-over-price",
      feedback: "Anchor on the story that produced the number, not the number.",
    },
    {
      id: "give-the-multiple",
      text: "Say the ARR multiple out loud.",
      isOptimal: false,
      nextSceneId: "marc-pounces",
      feedback: "Multiples are how the buyer compresses the price. Do not hand them the lever.",
    },
  ],
},
{
  id: "marc-counters",
  mood: "professional",
  dialog: [
    {
      speakerId: "marc",
      emotion: "neutral",
      text: "Fair. The curve is the story. Tell me about retention.",
    },
  ],
  // Auto-advance: no choices, falls through to the next scene.
  nextSceneId: "retention-question",
},
{
  id: "ending-clean-counter",
  isEnding: true,
  outcomeType: "good",
  endingTitle: "The Counter Held",
  endingSummary:
    "You counter-anchored without bluster. The deal moves to a written term sheet at the number you wanted, not the number Marc opened with.",
  dialog: [
    {
      speakerId: "inner-voice",
      tone: "tactical",
      text: "Silence works because it shifts the cost of the next move onto the other side of the table.",
    },
  ],
},
`.trim();
