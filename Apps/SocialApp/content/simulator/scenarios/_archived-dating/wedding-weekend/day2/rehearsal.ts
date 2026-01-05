// Day 2: The Rehearsal
// Scenes 15-18 - The pairing dig and Danielle confrontation

import type { Scene } from '../../../types';

export const rehearsalScenes: Scene[] = [
  {
    id: 'scene-15-rehearsal',
    backgroundId: 'park',
    dialog: [
      {
        text: "The venue. Perfect. Everyone's walking through positions. Groomsmen with bridesmaids. {boyfriend} will walk with {ex}.",
      },
      {
        text: "You're in the audience section. Watching. Waiting. {bride} is in her element - directing, arranging, controlling. She catches your eye and smiles. It's not friendly.",
      },
    ],
    nextSceneId: 'scene-16-pairing-dig',
  },
  {
    id: 'scene-16-pairing-dig',
    backgroundId: 'park',
    dialog: [
      {
        text: "{bride} claps her hands. \"Okay, processional! {ex} and {boyfriend}, you two walk together so naturally. Almost muscle memory, right?\" She laughs. Everyone laughs.",
        speakerId: 'sophia',
        emotion: 'smirking',
      },
      {
        text: "Except you. {ex} looks uncomfortable. Or does she? Hard to tell from here. {boyfriend} glances your way but doesn't say anything.",
        speakerId: 'danielle',
        emotion: 'confused',
      },
      {
        
        text: "In front of everyone too.",
        emotion: 'cold',
      },
    ],
    choices: [
      {
        id: 'choice-16-1',
        text: 'Force a smile. Play along.',
        nextSceneId: 'scene-16-absorb',
        feedback: 'You passed the "cool girl" test. They know they can do this again.',
        tactic: 'cool_girl',
      },
      {
        id: 'choice-16-2',
        text: 'Stone face. Watch.',
        nextSceneId: 'scene-16-stone',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'The room feels the tension. You held it.',
        tactic: 'stoic_response',
      },
      {
        id: 'choice-16-3',
        text: '"I need to take a call."',
        nextSceneId: 'scene-16-exit',
        xpBonus: 5,
        feedback: 'You removed yourself. {ex} noticed.',
        tactic: 'tactical_exit',
      },
      {
        id: 'choice-16-4',
        text: '"Muscle memory from three years ago? Things atrophy."',
        nextSceneId: 'scene-16-counter',
        xpBonus: 10,
        feedback: '{groom} laughs, {bride} is furious. Satisfying. But you showed your hand early. She knows you bite now.',
        tactic: 'counter_attack',
      },
    ],
  },
  {
    id: 'scene-16-absorb',
    backgroundId: 'park',
    dialog: [
      {
        text: "You smile. You play along. It costs something - a piece of dignity you won't get back. But you've survived another moment.",
      },
      {
        text: "{sister} appears beside you. \"That was garbage,\" she murmurs. \"You didn't have to take that.\" But you did. And everyone knows it.",
        speakerId: 'lily',
        emotion: 'angry',
      },
    ],
    nextSceneId: 'scene-17-rehearsal-continues',
  },
  {
    id: 'scene-16-stone',
    backgroundId: 'park',
    dialog: [
      {
        text: "You say nothing. Your face says nothing. The silence stretches until {bride}'s smile falters. She expected a reaction. She didn't get one.",
        speakerId: 'sophia',
        emotion: 'confused',
      },
      {
        text: "{groom} is watching you now. Something like respect in his eyes. \"Alright, people. From the top.\" He claps his hands, ending the moment. You won this round.",
        speakerId: 'marcus',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'scene-17-rehearsal-continues',
  },
  {
    id: 'scene-16-exit',
    backgroundId: 'park',
    dialog: [
      {
        text: "You walk away before anyone can see your face. Phone to your ear, nobody on the other end. Just breathing.",
      },
      {
        text: "Footsteps behind you. {ex}. \"Hey.\" Her voice is gentle. \"That was shitty. What she said. I'm sorry.\"",
        speakerId: 'danielle',
        emotion: 'sad',
      },
      {
        
        text: "Is she genuine? Or is this another move?",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-16-exit-1',
        text: '"It\'s not your fault."',
        nextSceneId: 'scene-16b-danielle-truce',
        xpBonus: 5,
        feedback: 'Grace. Maybe she deserves it.',
        tactic: 'gracious_response',
      },
      {
        id: 'choice-16-exit-2',
        text: '"Are you still in love with him?"',
        nextSceneId: 'scene-16b-danielle-truth',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'Direct. No more games.',
        tactic: 'direct_question',
      },
      {
        id: 'choice-16-exit-3',
        text: '"I don\'t need your pity."',
        nextSceneId: 'scene-16b-danielle-cold',
        feedback: 'Walls up. She backs off.',
        tactic: 'rejection',
      },
    ],
  },
  {
    id: 'scene-16-counter',
    backgroundId: 'park',
    dialog: [
      {
        text: "The silence after is worse. {groom} actually laughs - loud and surprised. {bride}'s face goes white, then red. {ex} looks at her feet.",
        speakerId: 'marcus',
        emotion: 'happy',
      },
      {
        text: "{boyfriend} is staring at you. Shocked. Maybe proud. Maybe terrified. {bride} recovers first: \"Cute.\" She's not smiling anymore. But {groom} is looking at you like you're interesting now. That might matter.",
        speakerId: 'sophia',
        emotion: 'angry',
      },
    ],
    nextSceneId: 'scene-17-rehearsal-continues',
  },
  {
    id: 'scene-16b-danielle-truce',
    backgroundId: 'park',
    dialog: [
      {
        text: "{ex} nods. \"I just wanted you to know... I'm not trying to make this harder. {bride} is...\" She trails off. \"We've been friends a long time. But what she did wasn't okay.\"",
        speakerId: 'danielle',
        emotion: 'neutral',
      },
      {
        text: "\"For what it's worth, I think you're handling this better than I would.\" She heads back to the group. Truce established. Maybe.",
        speakerId: 'danielle',
        emotion: 'sad',
      },
    ],
    nextSceneId: 'scene-17-rehearsal-continues',
  },
  {
    id: 'scene-16b-danielle-truth',
    backgroundId: 'park',
    dialog: [
      {
        text: "{ex} freezes. The question sits there between you both. \"I...\" She swallows. \"Part of me will always love him. I'm not going to lie about that.\"",
        speakerId: 'danielle',
        emotion: 'sad',
      },
      {
        text: "\"But I'm not trying to get him back. I ended it. I had my reasons.\" She looks at you directly. \"He's different with you. Softer. I've noticed. That's not nothing.\"",
        speakerId: 'danielle',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'scene-17-rehearsal-continues',
  },
  {
    id: 'scene-16b-danielle-cold',
    backgroundId: 'park',
    dialog: [
      {
        text: "{ex} steps back. \"Right. Sorry.\" Her voice is flat now. \"I was trying to be nice. Won't make that mistake again.\"",
        speakerId: 'danielle',
        emotion: 'cold',
      },
      {
        text: "She walks away. You burned that bridge. Maybe it needed burning. Maybe not.",
      },
    ],
    nextSceneId: 'scene-17-rehearsal-continues',
  },
  {
    id: 'scene-17-rehearsal-continues',
    backgroundId: 'park',
    dialog: [
      {
        text: "The rehearsal continues. Walk-throughs. Positions. Timing. You watch {boyfriend} walk with {ex}, their bodies remembering a rhythm that has nothing to do with you.",
      },
      {
        text: "When it's over, {bride} announces dinner. \"Everyone freshen up. Rehearsal dinner at 7. It's going to be a night to remember.\" She looks at you when she says it. Warning or threat. Probably both.",
      },
    ],
    nextSceneId: 'scene-18-rehearsal-dinner',
  },
];
