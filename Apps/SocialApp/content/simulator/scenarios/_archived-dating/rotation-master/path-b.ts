import type { Scene } from '../../types';

// PATH B: ONE GETTING SERIOUS
// Managing when one guy wants exclusivity before you're ready
// Teaching: Don't cave to pressure. Your timeline matters.

export const seriousScenes: Scene[] = [
  {
    id: 'serious-1',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'David wants to be exclusive? How many dates?' 'Six.' 'And the others?' 'Chris—we've been out twice. Marcus is... complicated.'",
        speakerId: 'sarah',
        emotion: 'neutral',
      },
      {
        text: "Sarah leans back. 'So David's moving fast, Chris is fresh, and Marcus is still in the picture. What's your gut say?'",
        speakerId: 'sarah',
        emotion: 'neutral',
      },
      {
        speakerId: 'inner-voice',
        text: "Too soon. But saying that might lose him.",
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'serious-1a',
        text: '"David is great. But I\'m not ready to close options yet."',
        nextSceneId: 'serious-2-honest',
        isOptimal: true,
        xpBonus: 15,
        feedback: 'Honest. Your timeline matters.',
      },
      {
        id: 'serious-1b',
        text: '"Maybe I should just say yes? He\'s a good guy."',
        nextSceneId: 'serious-2-cave',
        xpBonus: 5,
        feedback: 'Exclusivity from obligation isn\'t real commitment.',
      },
      {
        id: 'serious-1c',
        text: '"I don\'t want to hurt him. But I also don\'t want to lie."',
        nextSceneId: 'serious-2-middle',
        xpBonus: 10,
        feedback: 'You can be honest without being cruel.',
      },
    ],
  },
  {
    id: 'serious-2-honest',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Good. You're not ready. So tell him that. Not 'no forever'—just 'not yet.' A man who actually wants you will wait for genuine readiness, not pressure you into premature commitment.'",
        speakerId: 'sarah',
        emotion: 'neutral',
      },
      {
        text: "That night, you meet David for drinks. He brings it up before you can. 'So... I've been thinking. About us.'",
        speakerId: 'david',
        emotion: 'hopeful',
      },
    ],
    nextSceneId: 'serious-3-convo',
  },
  {
    id: 'serious-2-cave',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Don't you dare.' Sarah's voice sharpens. 'Saying yes when you mean not yet isn't kindness—it's a time bomb. You'll resent him. He'll sense it. The whole thing will collapse. Be honest now or be cruel later.'",
        speakerId: 'sarah',
        emotion: 'serious',
      },
      {
        text: "She's right. You're not ready. Pretending won't change that.",
      },
    ],
    nextSceneId: 'serious-3-convo',
  },
  {
    id: 'serious-2-middle',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Here's the thing,' Sarah says. 'You don't owe him exclusivity after six dates. You DO owe him honesty. Those aren't the same thing. Tell him where you are. Let him decide.'",
        speakerId: 'sarah',
        emotion: 'neutral',
      },
      {
        text: "That night, you meet David. He looks hopeful. Nervous. 'Can we talk about where this is going?'",
        speakerId: 'david',
        emotion: 'hopeful',
      },
    ],
    nextSceneId: 'serious-3-convo',
  },
  {
    id: 'serious-3-convo',
    backgroundId: 'bar',
    dialog: [
      {
        text: "'I really like what we have,' David says. 'I'm not seeing anyone else. I'd like it if... we were on the same page.' He looks vulnerable. This is real to him.",
        speakerId: 'david',
        emotion: 'hopeful',
      },
      {
        speakerId: 'inner-voice',
        text: "He's being honest. You owe him the same.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'serious-3a',
        text: '"I really like you too. But I\'m not ready to be exclusive yet. I want to keep getting to know you."',
        nextSceneId: 'serious-4-honest',
        isOptimal: true,
        xpBonus: 20,
        feedback: 'Honest, kind, clear. Let him decide.',
      },
      {
        id: 'serious-3b',
        text: '"You\'re right. Let\'s be exclusive."',
        nextSceneId: 'serious-4-regret',
        feedback: 'You said yes to avoid discomfort. That never works.',
      },
      {
        id: 'serious-3c',
        text: '"I need more time to think about it."',
        nextSceneId: 'serious-4-stall',
        xpBonus: 8,
        feedback: 'Buys time but doesn\'t give him information.',
      },
    ],
  },
  {
    id: 'serious-4-honest',
    backgroundId: 'bar',
    dialog: [
      {
        text: "David takes a breath. Processes. 'Can I ask... are you seeing other people?' You could lie. But what's the point?",
        speakerId: 'david',
        emotion: 'neutral',
      },
      {
        speakerId: 'inner-voice',
        text: "Honesty or games. Choose.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'serious-4a',
        text: '"I\'ve been on a couple dates. Nothing serious. But I want to be honest with you."',
        nextSceneId: 'serious-5-truth',
        isOptimal: true,
        xpBonus: 20,
        feedback: 'Full transparency. He can handle it or he can\'t.',
      },
      {
        id: 'serious-4b',
        text: '"Nothing you need to worry about."',
        nextSceneId: 'serious-5-vague',
        xpBonus: 10,
        feedback: 'Not a lie. Not the full truth. Gray zone.',
      },
    ],
  },
  {
    id: 'serious-4-regret',
    backgroundId: 'bar',
    dialog: [
      {
        text: "David's face lights up. 'Really? That's amazing.' He leans in and kisses you. It should feel good. It feels like a trap you set for yourself.",
      },
      {
        text: "Later, you text Chris to cancel Saturday. Tell Marcus you're 'busy.' You chose from pressure, not readiness. That feeling in your chest? That's the beginning of resentment.",
      },
    ],
    nextSceneId: 'serious-bad-ending',
  },
  {
    id: 'serious-4-stall',
    backgroundId: 'bar',
    dialog: [
      {
        text: "'Okay.' David looks uncertain. 'How much time?' 'I don't know. A few weeks?' He nods but his energy shifts. The ask is on the table. The clock is ticking.",
        speakerId: 'david',
        emotion: 'sad',
      },
      {
        text: "You bought time but not clarity. This conversation isn't over. It's just postponed.",
      },
    ],
    nextSceneId: 'serious-neutral-ending',
  },
  {
    id: 'serious-5-truth',
    backgroundId: 'bar',
    dialog: [
      {
        text: "David is quiet for a moment. 'I appreciate you telling me. I'm not going to pretend I love hearing it. But I'd rather know where I stand.'",
        speakerId: 'david',
        emotion: 'neutral',
      },
      {
        text: "'If you're not ready, I can wait. But I need to know there's a path to something real. Is there?'",
        speakerId: 'david',
        emotion: 'hopeful',
      },
      {
        speakerId: 'inner-voice',
        text: "He's handling this like an adult. That's rare.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'serious-5a',
        text: '"Yes. I just need a little more time. You\'re at the top of my list."',
        nextSceneId: 'serious-good-ending',
        isOptimal: true,
        xpBonus: 20,
        feedback: 'Honest, kind, and gives him hope. This is how adults date.',
      },
      {
        id: 'serious-5b',
        text: '"I don\'t know. I\'m figuring it out."',
        nextSceneId: 'serious-neutral-ending',
        xpBonus: 10,
        feedback: 'Honest but doesn\'t give him much to hold onto.',
      },
    ],
  },
  {
    id: 'serious-5-vague',
    backgroundId: 'bar',
    dialog: [
      {
        text: "'Okay...' David looks like he wants to push but doesn't. The rest of the night is slightly off. He knows you didn't fully answer. You know you didn't fully answer.",
        speakerId: 'david',
        emotion: 'confused',
      },
      {
        text: "The conversation will come up again. It always does. You bought time, not resolution.",
      },
    ],
    nextSceneId: 'serious-neutral-ending',
  },
];
