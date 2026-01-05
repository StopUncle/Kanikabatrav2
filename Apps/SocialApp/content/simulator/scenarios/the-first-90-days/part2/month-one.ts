// Part 2: Month One
// Scenes: Building relationships, finding wins, avoiding traps

import type { Scene } from '../../../types';

export const monthOneScenes: Scene[] = [
  // Scene 1: The Predecessor Question
  {
    id: 'predecessor-1',
    backgroundId: 'office',
    chapter: { name: 'Month One', index: 2, total: 3 },
    dialog: [
      {
        text: 'Week three. Team meeting.',
      },
      {
        text: 'Someone mentions "the old way Riley did things."',
      },
      {
        text: '"Yeah, but Riley\'s gone for a reason."',
        speakerId: 'devon',
        emotion: 'neutral',
      },
      {
        text: 'Awkward silence. Eyes flick to you.',
      },
      {
        text: 'Danger zone. Whatever you say about Riley defines you.',
        
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'predecessor-1-a',
        text: '"I\'d love to learn what worked and what didn\'t."',
        nextSceneId: 'predecessor-2',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'OPTIMAL: Neutral curiosity. No judgment, no alignment. Perfect.',
      },
      {
        id: 'predecessor-1-b',
        text: '"I\'m focused on what we\'re building now, not the past."',
        nextSceneId: 'predecessor-2',
        xpBonus: 10,
        feedback: 'Professional distance. Some nod approvingly.',
      },
      {
        id: 'predecessor-1-c',
        text: '"Sounds like Riley did good work."',
        nextSceneId: 'predecessor-2',
        xpBonus: 3,
        feedback: 'You just aligned with someone who left for a reason. Risky.',
      },
      {
        id: 'predecessor-1-d',
        text: '"I\'ve already seen some things I\'d do differently."',
        nextSceneId: 'predecessor-2',
        xpBonus: 0,
        feedback: 'TRAP: Arrogance before proof. The room goes cold.',
      },
    ],
  },

  // Scene 2: Transition
  {
    id: 'predecessor-2',
    backgroundId: 'office',
    chapter: { name: 'Month One', index: 2, total: 3 },
    dialog: [
      {
        text: 'The meeting moves on. But you can feel the calculation in the room.',
      },
      {
        text: 'How you handled that just got filed away in everyone\'s mental notes.',
      },
    ],
    nextSceneId: 'first-win-1',
  },

  // Scene 3: Finding Your First Win
  {
    id: 'first-win-1',
    backgroundId: 'office',
    chapter: { name: 'Month One', index: 2, total: 3 },
    dialog: [
      {
        text: 'Week three. You need a win. Not a big win. A visible win.',
      },
      {
        text: 'You notice a small but annoying problem: the weekly report takes hours to compile manually. Everyone hates it. No one has fixed it.',
      },
      {
        text: 'Low-hanging fruit. Solve this, and you\'re the hero.',
        
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'first-win-1-a',
        text: 'Fix it and share credit with the team.',
        nextSceneId: 'first-win-2',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'OPTIMAL: Win + team player. Leadership noticed, peers grateful.',
      },
      {
        id: 'first-win-1-b',
        text: 'Fix it and make sure Victor knows YOU did it.',
        nextSceneId: 'first-win-2',
        xpBonus: 10,
        feedback: 'Victor\'s impressed. But peers resent the credit grab.',
      },
      {
        id: 'first-win-1-c',
        text: 'Suggest the idea and let others lead the fix.',
        nextSceneId: 'first-win-2',
        xpBonus: 5,
        feedback: 'Too passive. Someone else takes your idea and runs with it.',
      },
      {
        id: 'first-win-1-d',
        text: 'Wait for a bigger opportunity. This is too small.',
        nextSceneId: 'first-win-2',
        xpBonus: 0,
        feedback: 'TRAP: You missed the easy one. What else will you miss?',
      },
    ],
  },

  // Scene 4: Win Result
  {
    id: 'first-win-2',
    backgroundId: 'office',
    chapter: { name: 'Month One', index: 2, total: 3 },
    dialog: [
      {
        text: 'The fix works. Time saved. Frustration eliminated.',
      },
      {
        text: 'Harper mentions it in the next team sync.',
      },
      {
        text: '"Good initiative on the report automation. Exactly what we need."',
        speakerId: 'harper',
        emotion: 'happy',
      },
      {
        text: 'First wins matter more than big wins. You just proved you can deliver.',
      },
    ],
    nextSceneId: 'morgan-intel-1',
  },

  // Scene 5: Morgan's Intel
  {
    id: 'morgan-intel-1',
    backgroundId: 'office',
    chapter: { name: 'Month One', index: 2, total: 3 },
    dialog: [
      {
        text: 'Coffee break. Morgan, the executive assistant, is in the kitchen.',
      },
      {
        text: '"You\'re doing good so far."',
        speakerId: 'morgan',
        emotion: 'neutral',
      },
      {
        text: 'Morgan glances around, voice lowering.',
      },
      {
        text: '"Keep your head down with Victor until after the budget review. Every year, he cuts someone\'s headcount after budget. Don\'t stand out until that\'s over."',
        speakerId: 'morgan',
        emotion: 'concerned',
      },
      {
        text: 'Gold. This is the intel that keeps you alive.',
        
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'morgan-intel-1-a',
        text: 'Thank Morgan sincerely. Remember everything.',
        nextSceneId: 'morgan-intel-2',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'OPTIMAL: You just made a powerful ally. Morgan will remember this.',
      },
      {
        id: 'morgan-intel-1-b',
        text: '"Who else should I watch out for?"',
        nextSceneId: 'morgan-intel-2',
        xpBonus: 12,
        feedback: 'Smart follow-up. Morgan gives you two more names.',
      },
      {
        id: 'morgan-intel-1-c',
        text: '"Thanks, but I can handle myself."',
        nextSceneId: 'morgan-intel-2',
        xpBonus: 0,
        feedback: 'TRAP: You just brushed off the most connected person on the floor.',
      },
    ],
  },

  // Scene 6: Morgan Continues
  {
    id: 'morgan-intel-2',
    backgroundId: 'office',
    chapter: { name: 'Month One', index: 2, total: 3 },
    dialog: [
      {
        text: 'Morgan pauses at the door.',
      },
      {
        text: '"Also—Cameron? Watch your back with that one."',
        speakerId: 'morgan',
        emotion: 'neutral',
      },
      {
        text: 'Morgan walks away with their coffee.',
      },
      {
        text: 'The admin knows everything. Always befriend the admin.',
      },
    ],
    nextSceneId: 'project-assignment-1',
  },

  // Scene 7: The Project Assignment
  {
    id: 'project-assignment-1',
    backgroundId: 'office',
    chapter: { name: 'Month One', index: 2, total: 3 },
    dialog: [
      {
        text: 'Month one, week four. Harper calls you into their office.',
      },
      {
        text: '"Good news. I\'m putting you on the Mitchell account. High visibility. Victor\'s watching this one."',
        speakerId: 'harper',
        emotion: 'happy',
      },
      {
        text: 'High visibility means high risk. But also high reward.',
      },
      {
        text: 'Harper continues.',
      },
      {
        text: '"Cameron will be supporting. You\'ll lead."',
        speakerId: 'harper',
        emotion: 'neutral',
      },
      {
        text: 'The person who wanted your job is now reporting to you on a high-stakes project.',
        
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'project-1-a',
        text: '"I want Cameron\'s input—they know the history."',
        nextSceneId: 'project-assignment-2',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'OPTIMAL: Inclusive leadership. Reduces threat, builds ally.',
      },
      {
        id: 'project-1-b',
        text: '"Thanks. I\'ll set direction and loop them in."',
        nextSceneId: 'project-assignment-2',
        xpBonus: 10,
        feedback: 'Clear authority. Harper nods. Cameron might bristle.',
      },
      {
        id: 'project-1-c',
        text: '"Maybe Cameron should lead—they have more context?"',
        nextSceneId: 'project-assignment-2',
        xpBonus: 0,
        feedback: 'TRAP: You just gave up your first leadership opportunity. Weak.',
      },
      {
        id: 'project-1-d',
        text: '"I\'ll keep Cameron close and document everything."',
        nextSceneId: 'project-assignment-2',
        xpBonus: 12,
        feedback: 'Strategically paranoid. Smart if Cameron is indeed a threat.',
      },
    ],
  },

  // Scene 8: Project Begins
  {
    id: 'project-assignment-2',
    backgroundId: 'office',
    chapter: { name: 'Month One', index: 2, total: 3 },
    dialog: [
      {
        text: 'The Mitchell project kicks off. Long hours. High pressure.',
      },
      {
        text: 'Cameron is helpful. Professional. Nothing overt.',
      },
      {
        text: 'But you notice small things. Emails CC\'d to people who don\'t need to know. Questions that feel like tests.',
      },
      {
        text: 'Maybe it\'s nothing. Maybe it\'s everything.',
      },
      {
        text: 'Trust the pattern, not the words.',
      },
    ],
    nextSceneId: 'month-one-end',
  },

  // Scene 9: Month One Complete
  {
    id: 'month-one-end',
    backgroundId: 'office',
    chapter: { name: 'Month One', index: 2, total: 3 },
    dialog: [
      {
        text: 'Month one complete.',
      },
      {
        text: 'You\'ve delivered an early win. Built key relationships. Navigated the predecessor trap.',
      },
      {
        text: 'The Mitchell project is underway. Victor knows your name.',
      },
      {
        text: 'Day 90 is coming. The review that sets your trajectory.',
      },
    ],
    nextSceneId: 'victor-attention-1',
  },
];
