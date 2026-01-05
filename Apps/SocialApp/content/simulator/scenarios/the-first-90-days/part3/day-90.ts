// Part 3: Day 90
// Scenes: Establishing position, delivering wins, setting trajectory

import type { Scene } from '../../../types';

export const day90Scenes: Scene[] = [
  // Scene 1: Victor's Attention
  {
    id: 'victor-attention-1',
    backgroundId: 'office',
    chapter: { name: 'Day 90', index: 3, total: 3 },
    dialog: [
      {
        text: 'Day 85. Walking through the office. Victor stops you.',
      },
      {
        text: '"The Mitchell report. That was your work?"',
        speakerId: 'victor',
        emotion: 'neutral',
      },
      {
        text: 'Two levels up is asking about your work. Be precise.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'victor-1-a',
        text: '"Yes. With support from the team."',
        nextSceneId: 'victor-attention-2',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'OPTIMAL: Owns the work, shares credit. Perfect executive response.',
      },
      {
        id: 'victor-1-b',
        text: '"It was a team effort."',
        nextSceneId: 'victor-attention-2',
        xpBonus: 5,
        feedback: 'Too humble. Victor doesn\'t know who to credit.',
      },
      {
        id: 'victor-1-c',
        text: '"Yes, I led that project."',
        nextSceneId: 'victor-attention-2',
        xpBonus: 10,
        feedback: 'Direct ownership. Victor respects it, but peers heard.',
      },
    ],
  },

  // Scene 2: Victor's Verdict
  {
    id: 'victor-attention-2',
    backgroundId: 'office',
    chapter: { name: 'Day 90', index: 3, total: 3 },
    dialog: [
      {
        text: 'Victor nods slowly.',
      },
      {
        text: '"Harper was right about you."',
        speakerId: 'victor',
        emotion: 'neutral',
      },
      {
        text: 'He walks on. Two sentences. Massive impact.',
      },
      {
        text: 'Victor just told the floor he\'s watching you.',
      },
    ],
    nextSceneId: 'political-test-1',
  },

  // Scene 3: The Political Test
  {
    id: 'political-test-1',
    backgroundId: 'office',
    chapter: { name: 'Day 90', index: 3, total: 3 },
    dialog: [
      {
        text: 'Day 88. Department meeting. Two VPs disagree on direction.',
      },
      {
        text: '"We should prioritize the Alpha project."',
        speakerId: 'victor',
        emotion: 'neutral',
      },
      {
        text: 'Another VP pushes back.',
      },
      {
        text: '"Beta has better ROI metrics."',
        speakerId: 'devon',
        emotion: 'neutral',
      },
      {
        text: 'Harper looks at you.',
      },
      {
        text: '"You\'ve been on both. What\'s your take?"',
        speakerId: 'harper',
        emotion: 'neutral',
      },
      {
        text: 'They\'re asking you to take sides. In public. In front of Victor.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'political-test-1-a',
        text: 'Side with Victor: "Alpha has strategic value that isn\'t in the numbers."',
        nextSceneId: 'political-test-2-victor',
        xpBonus: 12,
        feedback: 'Aligned with power. Victor notices. The other VP notes it too.',
      },
      {
        id: 'political-test-1-b',
        text: 'Side with the data: "The numbers support Beta."',
        nextSceneId: 'political-test-2-data',
        xpBonus: 8,
        feedback: 'Honest but risky. Victor\'s expression flickers.',
      },
      {
        id: 'political-test-1-c',
        text: 'Diplomatic: "Both have merit. What if we phased the approach?"',
        nextSceneId: 'political-test-2-diplomatic',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'OPTIMAL: Showed thinking without picking enemies. Well played.',
      },
      {
        id: 'political-test-1-d',
        text: '"I don\'t have enough context to say."',
        nextSceneId: 'political-test-2-defer',
        xpBonus: 0,
        feedback: 'TRAP: You were asked directly. Deferring looks weak.',
      },
    ],
  },

  // Scene 4a: Victor Path
  {
    id: 'political-test-2-victor',
    backgroundId: 'office',
    chapter: { name: 'Day 90', index: 3, total: 3 },
    dialog: [
      {
        text: 'Victor gives you a small nod. The other VP makes a note.',
      },
      {
        text: 'You\'ve picked a side. It might be the right one. Time will tell.',
      },
    ],
    nextSceneId: 'review-prep-1',
  },

  // Scene 4b: Data Path
  {
    id: 'political-test-2-data',
    backgroundId: 'office',
    chapter: { name: 'Day 90', index: 3, total: 3 },
    dialog: [
      {
        text: 'The other VP looks pleased. Victor\'s expression is unreadable.',
      },
      {
        text: 'You told the truth. Whether that was smart depends on what happens next.',
      },
    ],
    nextSceneId: 'review-prep-1',
  },

  // Scene 4c: Diplomatic Path
  {
    id: 'political-test-2-diplomatic',
    backgroundId: 'office',
    chapter: { name: 'Day 90', index: 3, total: 3 },
    dialog: [
      {
        text: 'Both VPs consider your suggestion. The tension in the room eases slightly.',
      },
      {
        text: '"Interesting approach,"',
        speakerId: 'victor',
        emotion: 'neutral',
      },
      {
        text: 'Victor says. Not agreement. Not dismissal. Respect.',
      },
    ],
    nextSceneId: 'review-prep-1',
  },

  // Scene 4d: Defer Path
  {
    id: 'political-test-2-defer',
    backgroundId: 'office',
    chapter: { name: 'Day 90', index: 3, total: 3 },
    dialog: [
      {
        text: 'Harper\'s smile tightens. Victor moves on without acknowledging you.',
      },
      {
        text: 'You were asked directly and had nothing to say. That got noticed.',
      },
    ],
    nextSceneId: 'review-prep-1',
  },

  // Scene 5: Review Prep
  {
    id: 'review-prep-1',
    backgroundId: 'office',
    chapter: { name: 'Day 90', index: 3, total: 3 },
    dialog: [
      {
        text: 'Day 89. Tomorrow is your 90-day review with Harper.',
      },
      {
        text: 'The meeting that sets your trajectory for the next year.',
      },
      {
        text: 'What you say tomorrow defines how they see you going forward.',
      },
    ],
    nextSceneId: 'the-review-1',
  },

  // Scene 6: The 90-Day Review
  {
    id: 'the-review-1',
    backgroundId: 'office',
    chapter: { name: 'Day 90', index: 3, total: 3 },
    dialog: [
      {
        text: 'Day 90. Harper\'s office.',
      },
      {
        text: '"Ninety days. Let\'s talk about how it\'s going."',
        speakerId: 'harper',
        emotion: 'neutral',
      },
      {
        text: 'Harper has notes. Your future is in that folder.',
      },
      {
        text: '"Overall, I\'m pleased. The Mitchell work was solid. Victor mentioned you specifically."',
        speakerId: 'harper',
        emotion: 'happy',
      },
      {
        text: 'Harper pauses.',
      },
      {
        text: '"Where do you see yourself in the next year?"',
        speakerId: 'harper',
        emotion: 'neutral',
      },
      {
        text: 'This is the trajectory question. What you say now sets their expectations.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'review-1-a',
        text: '"Growing here, taking on more responsibility, making the team stronger."',
        nextSceneId: 'the-review-2',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'OPTIMAL: Ambitious but team-focused. Perfect positioning.',
      },
      {
        id: 'review-1-b',
        text: '"I want to lead a major project within the year. I\'m ready."',
        nextSceneId: 'the-review-2',
        xpBonus: 10,
        feedback: 'Clear ambition. Harper notes it. High expectations set.',
      },
      {
        id: 'review-1-c',
        text: '"Just want to keep learning and contributing."',
        nextSceneId: 'the-review-2',
        xpBonus: 3,
        feedback: 'Too passive. Harper expected more vision.',
      },
      {
        id: 'review-1-d',
        text: '"I\'d love your guidance on the best path here."',
        nextSceneId: 'the-review-2',
        xpBonus: 12,
        feedback: 'Strategic deference. Harper appreciates being consulted.',
      },
    ],
  },

  // Scene 7: Review Conclusion
  {
    id: 'the-review-2',
    backgroundId: 'office',
    chapter: { name: 'Day 90', index: 3, total: 3 },
    dialog: [
      {
        text: 'Harper closes the folder.',
      },
      {
        text: '"Good first 90 days. Let\'s keep the momentum."',
        speakerId: 'harper',
        emotion: 'happy',
      },
      {
        text: 'You shake hands. The review is over.',
      },
      {
        text: 'Ninety days. You survived. Now the real game begins.',
      },
    ],
    nextSceneId: 'ending-router',
  },


  // Scene 8: Ending Router - Transition to ending
  {
    id: 'ending-router',
    backgroundId: 'office',
    chapter: { name: 'Day 90', index: 3, total: 3 },
    dialog: [
      {
        text: 'You walk back to your desk. The floor looks different now.',
      },
      {
        text: 'You know the players. The politics. The traps.',
      },
      {
        text: 'The first 90 days weren\'t about doing work. They were about positioning.',
      },
    ],
    nextSceneId: 'ending-rising-star',
  },
];
