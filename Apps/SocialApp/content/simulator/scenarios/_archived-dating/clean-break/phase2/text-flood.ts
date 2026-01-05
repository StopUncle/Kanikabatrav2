// Phase 2: The Aftermath - Text Flood
// Scenes 8-9: The message bombardment

import type { Scene } from '../../../types';

export const textFloodScenes: Scene[] = [
  // SCENE 8: THE TEXT FLOOD
  {
    id: 'scene-8-text-flood',
    backgroundId: 'text-screen',
    dialog: [
      {
        text: "You're at {bestfriend}'s place. Safe. Your phone won't stop buzzing. The messages pile up:",
      },
      {
        text: '"Please come back" ... "I didn\'t mean what I said" ... "I\'m so sorry" ... "Can we please talk?" ... "I love you" ... "Why won\'t you answer me?" ... "Fine. Ignore me." ... "You\'re really going to do this to me?"',
        speakerId: 'drew',
        emotion: 'sad',
      },
      {
        
        text: "The cycle. In text form.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-8a',
        text: 'Block their number. Breathe.',
        nextSceneId: 'scene-10-flying-monkey',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'Clean cut. The silence will be strange. Then it will be peace.',
        tactic: 'block',
      },
      {
        id: 'choice-8b',
        text: 'Mute notifications. Don\'t block. Just in case.',
        nextSceneId: 'scene-9-temptation',
        xpBonus: 8,
        feedback: "You're keeping a door cracked. Why?",
        tactic: 'mute_only',
      },
      {
        id: 'choice-8c',
        text: '"Please don\'t contact me. It\'s over. I need space."',
        nextSceneId: 'scene-9-response',
        xpBonus: 5,
        feedback: "You gave them a response. They'll view that as an opening.",
        tactic: 'respond_once',
      },
      {
        id: 'choice-8d',
        text: 'Read them all. Don\'t respond. But read.',
        nextSceneId: 'scene-9-temptation',
        xpBonus: 3,
        feedback: "You're still tethered. Each message pulls at you.",
        tactic: 'read_all',
      },
    ],
  },

  // SCENE 9: TEMPTATION
  {
    id: 'scene-9-temptation',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "It's 2am. You can't sleep. The messages are still there, unblocked. Some part of you wants to look again.",
      },
      {
        text: "The latest one came an hour ago: \"I can't sleep without you. Please. Just call me.\"",
        speakerId: 'drew',
        emotion: 'sad',
      },
      {
        
        text: "You know what happens if you respond. You know.",
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'choice-9a',
        text: 'Block the number. Finally.',
        nextSceneId: 'scene-10-flying-monkey',
        xpBonus: 12,
        feedback: 'Better late than never. The temptation will fade.',
        tactic: 'block_late',
      },
      {
        id: 'choice-9b',
        text: 'Keep reading but don\'t respond.',
        nextSceneId: 'scene-10-flying-monkey',
        xpBonus: 5,
        feedback: "You're torturing yourself. But you're not engaging.",
        tactic: 'passive_torture',
      },
      {
        id: 'choice-9c',
        text: 'Call them. Just to hear their voice.',
        nextSceneId: 'ending-cycle',
        xpBonus: 0,
        feedback: "TRAP: One call becomes two. Two becomes 'let's talk.' And you're back.",
        tactic: 'call_back',
      },
    ],
  },

  // SCENE 9 VARIANT: Response sent
  {
    id: 'scene-9-response',
    backgroundId: 'text-screen',
    dialog: [
      {
        text: 'You told them to stop contacting you. Their response comes in seconds.',
        speakerId: 'drew',
        emotion: 'happy',
      },
      {
        text: '"You responded! I knew you still cared. Please, can we just talk? Five minutes. That\'s all I\'m asking."',
        speakerId: 'drew',
        emotion: 'sad',
      },
      {
        
        text: "You gave an inch. They're taking a mile.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-9resp-a',
        text: 'Block. No more responses.',
        nextSceneId: 'scene-10-flying-monkey',
        xpBonus: 10,
        feedback: 'Learning the hard way that engagement is fuel.',
        tactic: 'block_after_response',
      },
      {
        id: 'choice-9resp-b',
        text: '"I said no. Stop."',
        nextSceneId: 'scene-9-escalate',
        xpBonus: 3,
        feedback: 'Another response. They\'ll keep pushing.',
        tactic: 'respond_again',
      },
    ],
  },

  // SCENE 9 VARIANT: Escalation after second response
  {
    id: 'scene-9-escalate',
    backgroundId: 'text-screen',
    dialog: [
      {
        text: "The messages keep coming. Faster now. They know you're reading.",
        speakerId: 'drew',
        emotion: 'angry',
      },
      {
        text: '"Why are you being so cold?" ... "This isn\'t you." ... "Someone got in your head, didn\'t they?" ... "Was it {bestfriend}? I knew they never liked me."',
        speakerId: 'drew',
        emotion: 'angry',
      },
      {
        
        text: "Now they're attacking your friends. Classic move.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-9esc-a',
        text: 'Block. Don\'t defend anyone. Just block.',
        nextSceneId: 'scene-10-flying-monkey',
        xpBonus: 10,
        feedback: "You don't owe explanations. You owe yourself peace.",
        tactic: 'final_block',
      },
      {
        id: 'choice-9esc-b',
        text: '"Leave {bestfriend} out of this. This is my decision."',
        nextSceneId: 'scene-9-defend',
        xpBonus: 3,
        feedback: "Still engaging. Still feeding the beast.",
        tactic: 'defend_friend',
      },
    ],
  },

  // SCENE 9 VARIANT: Defending Morgan
  {
    id: 'scene-9-defend',
    backgroundId: 'text-screen',
    dialog: [
      {
        text: "You defended {bestfriend}. {ex} pivots instantly.",
        speakerId: 'drew',
        emotion: 'sad',
      },
      {
        text: '"I\'m sorry. I didn\'t mean that. I\'m just hurting so much. Please. I need you."',
        speakerId: 'drew',
        emotion: 'sad',
      },
      {
        
        text: "Attack, then sweet. Attack, then sweet. See the pattern?",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-9def-a',
        text: 'Block. Pattern recognized.',
        nextSceneId: 'scene-10-flying-monkey',
        xpBonus: 12,
        feedback: "You see it now. That's enough engagement.",
        tactic: 'pattern_recognized',
      },
      {
        id: 'choice-9def-b',
        text: 'Keep responding.',
        nextSceneId: 'ending-lingering',
        xpBonus: 0,
        feedback: 'This becomes your life now. Message after message. Never free.',
        tactic: 'never_block',
      },
    ],
  },
];
