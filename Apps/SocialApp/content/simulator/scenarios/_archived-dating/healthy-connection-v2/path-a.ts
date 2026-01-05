import type { Scene } from '../../types';

// PATH A: EARLY DATING
// Learning to recognize green flags and not mistake stability for boredom
// Teaching: Consistent effort isn't boring. Chaos isn't chemistry.

export const earlyScenes: Scene[] = [
  {
    id: 'early-1',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Not exciting?' Maya tilts her head. 'Like how? Does he not plan dates? Not text back? Not remember things about you?'",
        speakerId: 'maya',
        emotion: 'neutral',
      },
      {
        text: "'No, he does all that. Maybe too much? There's no... mystery. No wondering. He just shows up.'",
      },
      {
        speakerId: 'inner-voice',
        text: "When did 'showing up' become suspicious?",
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'early-1a',
        text: '"Maybe I\'m just used to guys who keep me guessing."',
        nextSceneId: 'early-2-aware',
        isOptimal: true,
        xpBonus: 15,
        feedback: 'Self-awareness. That\'s the first step.',
      },
      {
        id: 'early-1b',
        text: '"I think I need more of a spark. Chemistry, you know?"',
        nextSceneId: 'early-2-spark',
        xpBonus: 5,
        feedback: 'Chemistry is real. But anxiety isn\'t chemistry.',
      },
      {
        id: 'early-1c',
        text: '"Maybe he\'s just boring. Some people are."',
        nextSceneId: 'early-2-dismiss',
        feedback: 'Dismissing him before examining your patterns.',
      },
    ],
  },
  {
    id: 'early-2-aware',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Bingo.' Maya snaps her fingers. 'You're wired for chaos. Hot and cold. Waiting by the phone. That adrenaline spike when they finally text. Michael doesn't give you that because he's not playing games.'",
        speakerId: 'maya',
        emotion: 'knowing',
      },
      {
        text: "'Stability feels boring when you're addicted to uncertainty. Give it time. See if the boring becomes... peaceful.'",
        speakerId: 'maya',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'early-3-date',
  },
  {
    id: 'early-2-spark',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Let me ask you something.' Maya leans forward. 'The guys who gave you that \"spark\"—how did those relationships end?'",
        speakerId: 'maya',
        emotion: 'neutral',
      },
      {
        text: "You think. Marcus. Ghosted. Jake. Cheated. Chris. Breadcrumbed for six months. The 'spark' was anxiety. You just didn't know it.",
      },
    ],
    nextSceneId: 'early-3-date',
  },
  {
    id: 'early-2-dismiss',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Really? Boring?' Maya's not buying it. 'He plans creative dates. Remembers what you said three weeks ago. Texts to check in without needing anything. That's not boring. That's effort.'",
        speakerId: 'maya',
        emotion: 'serious',
      },
      {
        text: "'Maybe boring is just what healthy feels like when you're used to chaos.'",
        speakerId: 'maya',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'early-3-date',
  },
  {
    id: 'early-3-date',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "Third date. Michael picked a Thai place you mentioned loving three weeks ago. He remembered. He's present. Asking real questions. Not checking his phone once.",
        speakerId: 'michael',
        emotion: 'happy',
      },
      {
        text: "'I booked us a cooking class next week. If you're interested. No pressure.' He's planning ahead. Thinking about the future. Checking if you want to be included.",
        speakerId: 'michael',
        emotion: 'hopeful',
      },
      {
        speakerId: 'inner-voice',
        text: "He planned ahead. He asked. This is what trying looks like.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'early-3a',
        text: '"I\'d love that. You\'re really thoughtful."',
        nextSceneId: 'early-4-open',
        isOptimal: true,
        xpBonus: 20,
        feedback: 'Acknowledging effort. Letting yourself receive.',
      },
      {
        id: 'early-3b',
        text: '"Maybe. Let me check my schedule and get back to you."',
        nextSceneId: 'early-4-guard',
        xpBonus: 10,
        feedback: 'Protecting yourself. But from what?',
      },
      {
        id: 'early-3c',
        text: '"That\'s really soon. Are you always this intense?"',
        nextSceneId: 'early-4-push',
        feedback: 'You called effort "intense." He\'ll remember that.',
      },
    ],
  },
  {
    id: 'early-4-open',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "His face lights up. Not performative—genuine. 'I'm glad. I was worried I was coming on too strong. I just really like spending time with you.'",
        speakerId: 'michael',
        emotion: 'happy',
      },
      {
        text: "Honest. Vulnerable. Not playing it cool. This is what secure attachment looks like. It feels different because it IS different.",
      },
    ],
    nextSceneId: 'early-good-ending',
  },
  {
    id: 'early-4-guard',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "'Of course.' He nods. No disappointment in his voice. No pressure. 'Just let me know. I'm flexible.'",
        speakerId: 'michael',
        emotion: 'neutral',
      },
      {
        text: "He didn't push. Didn't sulk. Just... accepted. You're waiting for the other shoe to drop. What if there is no other shoe?",
      },
    ],
    nextSceneId: 'early-neutral-ending',
  },
  {
    id: 'early-4-push',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "His face falls slightly. 'I... sorry. I didn't mean to be intense. I just thought you might enjoy it.' He's pulling back now. Your walls pushed him away.",
        speakerId: 'michael',
        emotion: 'sad',
      },
      {
        text: "The rest of dinner is fine. But something shifted. He's less open. More careful. You taught him your patterns.",
      },
    ],
    nextSceneId: 'early-bad-ending',
  },
];
