import type { Scene } from '../../types';

// PATH A: THE VICTIM PLAYER
// Uses vulnerability and suffering as manipulation
// Teaching: Their pain is real. Their use of it is strategic.

export const victimScenes: Scene[] = [
  {
    id: 'victim-1',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "Maya nods slowly. 'So they're always the victim. Always going through something. Let me guess—when you try to share YOUR problems, suddenly theirs are worse?'",
        speakerId: 'maya',
        emotion: 'knowing',
      },
      {
        text: "You think back. Last week you mentioned a rough day at work. Within two minutes, Alex was crying about their childhood trauma. Again.",
      },
      {
        speakerId: 'inner-voice',
        text: "When was the last time a conversation stayed about you for more than a minute?",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'victim-1a',
        text: '"I feel guilty even thinking this. They\'re actually suffering."',
        nextSceneId: 'victim-2-guilt',
        xpBonus: 5,
        feedback: 'Their suffering may be real. Using it to control you is the problem.',
      },
      {
        id: 'victim-1b',
        text: '"How do I know if it\'s real pain or manipulation?"',
        nextSceneId: 'victim-2-test',
        isOptimal: true,
        xpBonus: 15,
        feedback: 'The right question. Watch what happens when you have needs.',
      },
      {
        id: 'victim-1c',
        text: '"Maybe I\'m just not being supportive enough."',
        nextSceneId: 'victim-2-trap',
        feedback: 'They\'ve trained you to blame yourself for their patterns.',
      },
    ],
  },
  {
    id: 'victim-2-guilt',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Here's the thing,' Maya says. 'Their pain can be real AND they can still be using it. Both things can be true. The question is—do they ever show up for YOUR pain?'",
        speakerId: 'maya',
        emotion: 'neutral',
      },
      {
        text: "You try to remember a time Alex held space for you without redirecting to themselves. You can't find one.",
      },
    ],
    nextSceneId: 'victim-3-strategy',
  },
  {
    id: 'victim-2-test',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Simple test,' Maya says. 'Next time you're together, share something vulnerable. See how long before it becomes about them. Time it if you have to.'",
        speakerId: 'maya',
        emotion: 'neutral',
      },
      {
        text: "That night, you're with Alex. You take a breath. 'I've been feeling really anxious about work lately. Like I might get laid off.'",
      },
    ],
    nextSceneId: 'victim-3-test',
  },
  {
    id: 'victim-2-trap',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Stop.' Maya holds up her hand. 'Listen to yourself. You're exhausted, you've been their emotional support for months, and your first instinct is to blame yourself? That's not supportive. That's trained.'",
        speakerId: 'maya',
        emotion: 'serious',
      },
      {
        text: "The word hits you. Trained. Like a reflex they've installed in you.",
      },
    ],
    nextSceneId: 'victim-3-strategy',
  },
  {
    id: 'victim-3-test',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "Alex's eyes widen. 'Oh no, babe. That's so scary.' A pause. 'You know what's crazy? My old job was SO toxic. Let me tell you about when I almost got fired...'",
        speakerId: 'alex',
        emotion: 'sad',
      },
      {
        text: "Forty-five seconds. That's how long your fear got to exist before it became their story.",
      },
      {
        speakerId: 'inner-voice',
        text: "Forty-five seconds. That's your limit in their world.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'victim-3a',
        text: '"Hold on—I wasn\'t finished. I really need to talk about this."',
        nextSceneId: 'victim-4-confront',
        isOptimal: true,
        xpBonus: 20,
        tactic: 'boundary_in_moment',
        feedback: 'Call it out in real time. This is evidence.',
      },
      {
        id: 'victim-3b',
        text: 'Let them talk. You got your answer.',
        nextSceneId: 'victim-4-observe',
        xpBonus: 10,
        feedback: 'Silent conclusion. Now you know the pattern.',
      },
      {
        id: 'victim-3c',
        text: '"Oh wow, that sounds terrible. Tell me more."',
        nextSceneId: 'victim-bad-ending',
        feedback: 'You erased your own needs before they had to ask.',
      },
    ],
  },
  {
    id: 'victim-3-strategy',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'So what do I do?' you ask Maya. She leans back. 'Two options. You can become boring—stop being their emotional supply. Or you can set a real boundary and watch them lose it.'",
        speakerId: 'maya',
        emotion: 'neutral',
      },
      {
        speakerId: 'inner-voice',
        text: "Boring or boundary. Both will reveal who they really are.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'victim-strat-a',
        text: '"Boring. I\'ll just... stop reacting."',
        nextSceneId: 'victim-4-boring',
        xpBonus: 10,
        tactic: 'strategic_narcolepsy',
        feedback: 'Strategic Narcolepsy. Become beige. Watch what happens.',
      },
      {
        id: 'victim-strat-b',
        text: '"Boundary. I need to say something directly."',
        nextSceneId: 'victim-4-boundary',
        isOptimal: true,
        xpBonus: 15,
        tactic: 'direct_boundary',
        feedback: 'Honest and clear. Their reaction will tell you everything.',
      },
    ],
  },
  {
    id: 'victim-4-confront',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "Alex stops. Blinks. 'What? I was just relating to you. I was trying to HELP.' Their voice has an edge now. You having needs just became an attack on them.",
        speakerId: 'alex',
        emotion: 'angry',
      },
      {
        speakerId: 'inner-voice',
        text: "You asked for space. Now YOU'RE the problem.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'victim-4a',
        text: '"I\'m not attacking you. I just need to finish a thought sometimes."',
        nextSceneId: 'victim-good-ending',
        isOptimal: true,
        xpBonus: 20,
        feedback: 'Stay calm. Name what you need without apologizing.',
      },
      {
        id: 'victim-4b',
        text: '"Sorry, I didn\'t mean it like that."',
        nextSceneId: 'victim-neutral-ending',
        xpBonus: 5,
        feedback: 'You apologized for having needs. The pattern holds.',
      },
    ],
  },
  {
    id: 'victim-4-observe',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "You let Alex talk for twenty more minutes about their old job. Their toxic coworkers. Their unsupportive family. Your fear about layoffs never comes back up. They don't notice.",
      },
      {
        text: "Later, you text Maya: 'Forty-five seconds. Then it was all about them for an hour.'",
      },
    ],
    nextSceneId: 'victim-good-ending',
  },
  {
    id: 'victim-4-boring',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "That night, Alex is spiraling about their mother again. You try the boring approach. 'Mmhmm.' 'That sounds hard.' 'I'm sorry.' No questions. No energy. Just... flat.",
      },
      {
        text: "Alex stops mid-sentence. 'Are you even listening? You're being so COLD right now. I needed you and you're just sitting there.' You stopped performing. Now YOU'RE the problem.",
        speakerId: 'alex',
        emotion: 'angry',
      },
      {
        speakerId: 'inner-voice',
        text: "Interesting. Without your energy, they have nothing.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'victim-boring-a',
        text: '"I\'m here. I\'m just tired tonight."',
        nextSceneId: 'victim-good-ending',
        isOptimal: true,
        xpBonus: 15,
        feedback: 'Stay boring. Give them nothing to work with.',
      },
      {
        id: 'victim-boring-b',
        text: '"You\'re right, I\'m sorry. Tell me everything."',
        nextSceneId: 'victim-bad-ending',
        feedback: 'You caved at the first pushback. The strategy only works if you commit.',
      },
    ],
  },
  {
    id: 'victim-4-boundary',
    backgroundId: 'text-screen',
    dialog: [
      {
        text: "You text Alex: 'I care about you. But I'm realizing I can't be your only support system. Have you thought about therapy?' Read immediately. No response. Ten minutes. Twenty.",
      },
      {
        text: "Finally: 'Wow. I come to you at my lowest and you tell me to see a therapist. Nice. I thought you were different.'",
        speakerId: 'alex',
        emotion: 'angry',
      },
      {
        speakerId: 'inner-voice',
        text: "You set a boundary. Now you're 'everyone who leaves.'",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'victim-bound-a',
        text: '"I\'m not leaving. I\'m setting a boundary. There\'s a difference."',
        nextSceneId: 'victim-good-ending',
        isOptimal: true,
        xpBonus: 20,
        tactic: 'hold_boundary',
        feedback: 'Perfect. Name what you\'re doing. Don\'t let them reframe it.',
      },
      {
        id: 'victim-bound-b',
        text: '"I\'m sorry, that came out wrong. I didn\'t mean to hurt you."',
        nextSceneId: 'victim-neutral-ending',
        xpBonus: 5,
        feedback: 'You apologized for a reasonable request. The boundary softens.',
      },
      {
        id: 'victim-bound-c',
        text: '"Maybe you\'re right. I should come over."',
        nextSceneId: 'victim-bad-ending',
        feedback: 'You abandoned your boundary at the first pushback.',
      },
    ],
  },
];
