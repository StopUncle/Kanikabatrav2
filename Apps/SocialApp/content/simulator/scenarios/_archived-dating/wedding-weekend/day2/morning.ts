// Day 2: Saturday Morning
// Scenes 13-14 - Recovery and ally check-in

import type { Scene } from '../../../types';

export const morningScenes: Scene[] = [
  {
    id: 'scene-13-morning',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "Morning light through hotel curtains. {boyfriend} is already in the shower. Your phone shows three texts - one from {sister}: \"Coffee? Just us. 9am lobby.\" One from {bestfriend}: \"Call me when you can.\" One from {bride}: \"Rehearsal at 2. Don't be late.\"",
      },
      {
        text: "The events of last night hang in the air. The toast. The looks. He didn't defend you. Everyone saw that.",
      },
      {
        
        text: "Today is the rehearsal. Tomorrow is the wedding. Pick your battles.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-13-1',
        text: 'Meet {sister} for coffee. Build that alliance.',
        nextSceneId: 'scene-14-lily-coffee',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'Intel and allies. Smart priorities.',
        tactic: 'alliance_building',
      },
      {
        id: 'choice-13-2',
        text: 'Call {bestfriend}. Get grounded before facing them.',
        nextSceneId: 'scene-13-priya-call',
        xpBonus: 10,
        feedback: 'Outside perspective. Sometimes that\'s what you need.',
        tactic: 'support_seeking',
      },
      {
        id: 'choice-13-3',
        text: 'Stay with {boyfriend}. Make him see you.',
        nextSceneId: 'scene-13-ethan-morning',
        xpBonus: 5,
        feedback: 'Focus on the relationship. But will he engage?',
        tactic: 'partner_focus',
      },
    ],
  },
  {
    id: 'scene-13-priya-call',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "{bestfriend} picks up on the first ring. \"Tell me everything.\" So you do. The toast. The seating. The looks. She listens without interrupting.",
        speakerId: 'priya',
        emotion: 'concerned',
      },
      {
        text: "When you're done: \"Babe, that is not normal friend group behavior.\" A pause. \"You do not have to prove anything to these people. The question is whether {boyfriend} is worth the war.\"",
        speakerId: 'priya',
        emotion: 'neutral',
      },
      {
        
        text: "Is he?",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-priya-1',
        text: '"He is. I think. I hope."',
        nextSceneId: 'scene-15-rehearsal',
        xpBonus: 5,
        feedback: 'Uncertain but committed. She hears it.',
        tactic: 'honest_uncertainty',
      },
      {
        id: 'choice-priya-2',
        text: '"I\'m not fighting for them. I\'m fighting for me."',
        nextSceneId: 'scene-15-rehearsal',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'Self-respect first. She approves.',
        tactic: 'self_priority',
      },
      {
        id: 'choice-priya-3',
        text: '"Maybe I should just leave."',
        nextSceneId: 'scene-13-priya-pushback',
        feedback: 'She pushes back. Hard.',
        tactic: 'flight_response',
      },
    ],
  },
  {
    id: 'scene-13-priya-pushback',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "\"No.\" {bestfriend}'s voice is sharp. \"You do not run. Not from these people.\" She takes a breath. \"Look, if you leave, you're the one who couldn't handle it. Is that what you want?\"",
        speakerId: 'priya',
        emotion: 'angry',
      },
      {
        text: "\"Stay. Survive. See what {boyfriend} is made of. Then decide.\" She's right and you both know it. \"Call me tonight. I want updates.\"",
        speakerId: 'priya',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'scene-15-rehearsal',
  },
  {
    id: 'scene-13-ethan-morning',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "{boyfriend} comes out of the bathroom, towel around his waist. He sees your face. \"Hey. You okay?\" He sits on the edge of the bed.",
        speakerId: 'ethan',
        emotion: 'concerned',
      },
      {
        text: "\"Last night was... I know it was a lot.\" He takes your hand. \"It'll be different today. I promise.\"",
        speakerId: 'ethan',
        emotion: 'happy',
      },
      {
        
        text: "Just watch.",
        emotion: 'cold',
      },
    ],
    choices: [
      {
        id: 'choice-ethan-morning-1',
        text: '"I need you to actually be on my side today."',
        nextSceneId: 'scene-13-ethan-commits',
        xpBonus: 10,
        feedback: 'Clear ask. Now he has to deliver.',
        tactic: 'clear_request',
      },
      {
        id: 'choice-ethan-morning-2',
        text: '"We\'ll see."',
        nextSceneId: 'scene-15-rehearsal',
        feedback: 'Skeptical. He has to earn it now.',
        tactic: 'trust_extension',
      },
      {
        id: 'choice-ethan-morning-3',
        text: '"Don\'t promise. Just do."',
        nextSceneId: 'scene-15-rehearsal',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'No more words. Time for action.',
        tactic: 'action_demand',
      },
    ],
  },
  {
    id: 'scene-13-ethan-commits',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "{boyfriend} nods slowly. \"Okay. I hear you.\" He squeezes your hand. \"If {groom} says anything today... if {bride} does anything... I'll say something. I will.\"",
        speakerId: 'ethan',
        emotion: 'neutral',
      },
      {
        text: "Words. Finally.",
      },
    ],
    nextSceneId: 'scene-15-rehearsal',
  },
  // Lily coffee
  {
    id: 'scene-14-lily-coffee',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "{sister} is already there, two lattes on the table, sunglasses hiding what looks like a hangover. \"You look like you didn't sleep.\" \"Neither did you.\" She smiles grimly. \"Fair.\"",
        speakerId: 'lily',
        emotion: 'smirking',
      },
      {
        text: "She slides a coffee toward you. \"Okay, here's the deal. I'm going to give you the playbook. What I know about these people. What you need to survive today.\"",
        speakerId: 'lily',
        emotion: 'neutral',
      },
      {
        
        text: "Good. Finally someone saying it out loud.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-14-1',
        text: '"Tell me about {ex}. How serious were they?"',
        nextSceneId: 'scene-14-intel-danielle',
        xpBonus: 10,
        feedback: 'Know your competition.',
        tactic: 'intel_ex',
      },
      {
        id: 'choice-14-2',
        text: '"Why does {bride} hate me specifically?"',
        nextSceneId: 'scene-14-intel-sophia',
        xpBonus: 10,
        feedback: 'Know your enemy.',
        tactic: 'intel_bride',
      },
      {
        id: 'choice-14-3',
        text: '"How do I survive this weekend?"',
        nextSceneId: 'scene-14-strategy',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'Strategy first. Smart.',
        tactic: 'strategy_request',
      },
      {
        id: 'choice-14-4',
        text: '"Why are you helping me?"',
        nextSceneId: 'scene-14-lily-motivation',
        xpBonus: 5,
        feedback: 'Fair question.',
        tactic: 'motive_check',
      },
    ],
  },
  {
    id: 'scene-14-intel-danielle',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "{sister} leans back. \"Three years. They almost got engaged. She's the one who ended it - said he wasn't ready for commitment.\" She sips her coffee. \"She wasn't wrong.\"",
        speakerId: 'lily',
        emotion: 'neutral',
      },
      {
        text: "\"She still texts him. Not constantly, but... birthdays. Holidays. Little things that keep the door cracked open.\" A pause. \"I don't think she's trying to get him back. I think she just can't let go.\"",
        speakerId: 'lily',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'scene-14-strategy',
  },
  {
    id: 'scene-14-intel-sophia',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "{sister} laughs. \"Oh, {bride} hates everyone {boyfriend} dates. It's not personal.\" A pause. \"Okay, it's a little personal. You're actually pretty. And you're not kissing her ass.\"",
        speakerId: 'lily',
        emotion: 'smirking',
      },
      {
        text: "\"She liked {ex} because {ex} played the game. Deferred to her. Made her feel like queen of the group. You don't do that.\" She shrugs. \"Threat detected.\"",
        speakerId: 'lily',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'scene-14-strategy',
  },
  {
    id: 'scene-14-strategy',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "{sister} sets down her coffee. \"Okay. Survival guide.\" She ticks off her fingers. \"One: Stop apologizing. Stop explaining. They can smell weakness.\"",
        speakerId: 'lily',
        emotion: 'neutral',
      },
      {
        text: "\"Two: {groom} respects strength. Don't try to be liked by him. Be interesting. Three: {bride} is trying to make you react. Don't give her the satisfaction.\" She meets your eyes. \"Four: Watch how my brother acts today. That'll tell you everything you need to know.\"",
        speakerId: 'lily',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'scene-15-rehearsal',
  },
  {
    id: 'scene-14-lily-motivation',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "{sister} is quiet for a moment. \"Because I've watched three girlfriends get chewed up by these people. Because my brother is an idiot who doesn't know a good thing when he sees it.\"",
        speakerId: 'lily',
        emotion: 'sad',
      },
      {
        text: "\"And because you're the first one who didn't try to be my friend.\" She almost smiles. \"Everyone wants to get close to the sister. You just... existed. I respect that.\"",
        speakerId: 'lily',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'scene-14-strategy',
  },
];
