import type { Scene } from '../../types';

// PATH B: CONFLICT TEST
// First disagreement reveals everything about how they handle tension
// Teaching: Healthy partners fight fair. Watch for repair, not perfection.

export const conflictScenes: Scene[] = [
  {
    id: 'conflict-1',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'First disagreement. Okay, what happened?' Maya's interested now. First fights are data.",
        speakerId: 'maya',
        emotion: 'neutral',
      },
      {
        text: "'He was late to dinner. Didn't text. I was frustrated. When I said something, he...' You pause, trying to remember exactly.",
      },
      {
        speakerId: 'inner-voice',
        text: "What happened next tells you everything.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'conflict-1a',
        text: '"He apologized immediately. Said I was right to be upset."',
        nextSceneId: 'conflict-2-apologize',
        isOptimal: true,
        xpBonus: 15,
        feedback: 'Accountability without defensiveness. Green flag.',
      },
      {
        id: 'conflict-1b',
        text: '"He got defensive. Said I was overreacting."',
        nextSceneId: 'conflict-2-defensive',
        xpBonus: 5,
        feedback: 'Defensiveness is data. But is it a pattern or a moment?',
      },
      {
        id: 'conflict-1c',
        text: '"He shut down. Went quiet. I didn\'t know what to do."',
        nextSceneId: 'conflict-2-shutdown',
        xpBonus: 5,
        feedback: 'Stonewalling. Needs addressing, but not always fatal.',
      },
    ],
  },
  {
    id: 'conflict-2-apologize',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Wait—he just apologized? No excuses? No turning it around on you?' Maya looks impressed.",
        speakerId: 'maya',
        emotion: 'neutral',
      },
      {
        text: "'He said, \"You're right. I should have texted. That was disrespectful of your time.\" Then he asked how we could prevent it next time.'",
      },
      {
        text: "'Babe. That's... rare. Most guys get defensive. He took responsibility AND problem-solved. Don't mess this up.'",
        speakerId: 'maya',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'conflict-3-test',
  },
  {
    id: 'conflict-2-defensive',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Hmm. That's less great.' Maya frowns. 'But here's the thing—did he stay defensive? Or did he eventually hear you?'",
        speakerId: 'maya',
        emotion: 'neutral',
      },
      {
        text: "You think back. He was defensive at first. But then... he paused. Said 'You're right, that wasn't fair of me.' The repair came. Just not instantly.",
      },
    ],
    nextSceneId: 'conflict-3-test',
  },
  {
    id: 'conflict-2-shutdown',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Stonewalling. That's tricky.' Maya thinks. 'Some people shut down because they're flooded—overwhelmed. Not because they don't care. What happened after?'",
        speakerId: 'maya',
        emotion: 'neutral',
      },
      {
        text: "'He texted an hour later. Said he needed time to process but he wanted to talk about it.' He came back. He didn't disappear.",
      },
    ],
    nextSceneId: 'conflict-3-test',
  },
  {
    id: 'conflict-3-test',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "Next date. You're at his place. Cooking together. Then—he gets a call. Work emergency. 'I'm so sorry. I need to handle this. Can we reschedule the movie?'",
        speakerId: 'michael',
        emotion: 'concerned',
      },
      {
        speakerId: 'inner-voice',
        text: "Another test. Watch what he does next.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'conflict-3a',
        text: '"Of course. Handle it. We can finish cooking when you\'re done."',
        nextSceneId: 'conflict-4-grace',
        isOptimal: true,
        xpBonus: 20,
        feedback: 'Grace under pressure. This is partnership.',
      },
      {
        id: 'conflict-3b',
        text: '"Again? This keeps happening."',
        nextSceneId: 'conflict-4-test',
        xpBonus: 10,
        feedback: 'If it\'s a pattern, naming it is fair. If it\'s not, you\'re testing him.',
      },
      {
        id: 'conflict-3c',
        text: 'Sigh heavily. Say nothing.',
        nextSceneId: 'conflict-4-passive',
        feedback: 'Passive aggression. He knows you\'re upset but can\'t address it.',
      },
    ],
  },
  {
    id: 'conflict-4-grace',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "'Thank you. Really.' He looks relieved. Takes the call—twenty minutes. Comes back, apologizes again. Then: 'I blocked off next Saturday. Whole day. No work. Just us.'",
        speakerId: 'michael',
        emotion: 'happy',
      },
      {
        text: "He made up for it before you asked. Unprompted repair. That's what effort looks like.",
      },
    ],
    nextSceneId: 'conflict-good-ending',
  },
  {
    id: 'conflict-4-test',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "'This is actually the first time.' His voice is careful. Not defensive—explaining. 'But I hear you. If it becomes a pattern, call me on it. That's fair.'",
        speakerId: 'michael',
        emotion: 'serious',
      },
      {
        text: "He didn't get defensive at being challenged. He acknowledged your concern and committed to accountability. That's healthy.",
      },
    ],
    nextSceneId: 'conflict-good-ending',
  },
  {
    id: 'conflict-4-passive',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "He notices your sigh. 'Are you upset?' 'I'm fine.' 'You don't seem fine.' 'I said I'm fine.' The tension hangs there. He can't address what you won't name.",
        speakerId: 'michael',
        emotion: 'confused',
      },
      {
        text: "He finishes the call. You eat in near-silence. Later, you wish you'd just said what you felt. He can't fix what he doesn't know about.",
      },
    ],
    nextSceneId: 'conflict-neutral-ending',
  },
];
