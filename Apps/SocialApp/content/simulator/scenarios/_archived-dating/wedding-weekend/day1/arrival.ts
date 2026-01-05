// Day 1: The Arrival
// Scene 1 - First impressions with Lily

import type { Scene } from '../../../types';

export const arrivalScenes: Scene[] = [
  {
    id: 'scene-1-arrival',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "The hotel lobby is all marble and fresh flowers. Destination wedding energy. {boyfriend}'s grip on your hand is tight - he's been tense the whole drive. This weekend matters to him. These people matter to him. The question is whether you will.",
      },
      {
        text: "A woman approaches - mid-twenties, messy ponytail, bridesmaid dress bag over her shoulder. She's studying you before she even says hello. {boyfriend}'s sister. \"So you're the new one.\"",
        speakerId: 'lily',
        emotion: 'neutral',
      },
      {
        
        text: "Sizing you up.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-1a',
        text: '"He\'s told me so much about you - I feel like I already know you."',
        nextSceneId: 'scene-1a-eager',
        feedback: 'You claimed intimacy you haven\'t earned. She\'ll test that.',
        tactic: 'false_intimacy',
      },
      {
        id: 'choice-1b',
        text: '"I\'ve been looking forward to this. He says you\'re the honest one."',
        nextSceneId: 'scene-1b-casual',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'Warm. Unthreatening. She files you as harmless. Exactly where you want to be.',
        tactic: 'strategic_warmth',
      },
      {
        id: 'choice-1c',
        text: 'Touch {boyfriend}\'s arm. "Babe, introduce us properly."',
        nextSceneId: 'scene-1c-confident',
        xpBonus: 5,
        feedback: 'Ownership display, first meeting. She clocks you as territorial. Now she\'s watching.',
        tactic: 'force_investment',
      },
      {
        id: 'choice-1d',
        text: '"So you\'re the one who taught him his terrible taste in music."',
        nextSceneId: 'scene-1d-joke',
        xpBonus: 10,
        feedback: 'High risk, high reward. You got lucky - she has a sense of humor.',
        tactic: 'humor_gambit',
      },
    ],
  },
  {
    id: 'scene-1a-eager',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "{sister}'s smile doesn't change, but something in her eyes does. \"Has he now.\" It's not a question. {boyfriend} shifts uncomfortably beside you.",
        speakerId: 'lily',
        emotion: 'cold',
      },
      {
        text: "\"The welcome drinks are in the bar. Try not to be too... enthusiastic.\" She walks off toward the elevators.",
      },
    ],
    nextSceneId: 'scene-2-welcome-drinks',
  },
  {
    id: 'scene-1b-casual',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "{sister} nods once. \"He mentions a lot of girlfriends.\" That one's aimed at you. But she doesn't walk away.",
        speakerId: 'lily',
        emotion: 'neutral',
      },
      {
        text: "\"Welcome drinks are in the bar. {bride}'s already holding court. Good luck.\" A warning or advice? Hard to tell.",
      },
    ],
    nextSceneId: 'scene-2-welcome-drinks',
  },
  {
    id: 'scene-1c-confident',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "You say nothing. Just meet her eyes with a slight smile. {boyfriend} fumbles through an introduction, but {sister} isn't looking at him.",
        speakerId: 'lily',
        emotion: 'neutral',
      },
      {
        text: "\"Huh.\" She tilts her head. \"You're not what I expected.\" She turns to go, then pauses. \"Bar's downstairs. {bride}'s in rare form tonight. Fair warning.\"",
        speakerId: 'lily',
        emotion: 'smirking',
      },
    ],
    nextSceneId: 'scene-2-welcome-drinks',
  },
  {
    id: 'scene-1d-joke',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "{sister} blinks. A beat passes. Then she laughs - short, surprised, real. \"Oh, you mean the sad indie phase? That was all him.\"",
        speakerId: 'lily',
        emotion: 'happy',
      },
      {
        text: "{boyfriend} groans. \"It wasn't a phase.\" \"It was absolutely a phase,\" {sister} says. For a moment, they're just siblings. You're not the outsider. \"Drinks are downstairs. Try not to let {bride} eat you alive.\"",
        speakerId: 'lily',
        emotion: 'smirking',
      },
    ],
    nextSceneId: 'scene-2-welcome-drinks',
  },
];
