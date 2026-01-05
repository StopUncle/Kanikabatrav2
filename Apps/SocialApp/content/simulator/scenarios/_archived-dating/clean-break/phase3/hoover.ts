// Phase 3: The Hoover
// Scenes 20-25: The "I've changed" attempt weeks later

import type { Scene } from '../../../types';

export const hooverScenes: Scene[] = [
  // SCENE 20: TWO WEEKS LATER
  {
    id: 'scene-20-two-weeks',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "Two weeks of relative silence. A few texts you ignored. Then nothing. You're starting to feel normal again. The constant anxiety is fading.",
      },
      {
        text: "Your phone buzzes. Unknown number. But you know who it is.",
      },
      {
        
        text: "Here it comes.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-20a',
        text: 'Block without reading.',
        nextSceneId: 'ending-clean-break',
        xpBonus: 15,
        isOptimal: true,
        feedback: "You don't need to know what they said. You know the pattern.",
        tactic: 'preemptive_block',
      },
      {
        id: 'choice-20b',
        text: 'Read it. Just to know.',
        nextSceneId: 'scene-21-hoover',
        xpBonus: 5,
        feedback: 'Curiosity. The hook they count on.',
        tactic: 'read_hoover',
      },
    ],
  },

  // SCENE 21: THE HOOVER
  {
    id: 'scene-21-hoover',
    backgroundId: 'text-screen',
    dialog: [
      {
        text: "The message is exactly what you expected. Maybe that makes it worse.",
        speakerId: 'drew',
        emotion: 'sad',
      },
      {
        text: '"Hey. I know you don\'t want to hear from me. I\'ve been doing a lot of thinking. Working on myself. I\'m not asking for anything. I just wanted to say I\'m sorry. For everything. I miss my best friend."',
        speakerId: 'drew',
        emotion: 'sad',
      },
      {
        
        text: "The hoover. Exactly what you read about. Exactly what {bestfriend} warned you about.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-21a',
        text: 'Block this number too.',
        nextSceneId: 'ending-clean-break',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'You recognized it. You didn\'t engage. That\'s growth.',
        tactic: 'block_hoover',
      },
      {
        id: 'choice-21b',
        text: 'Leave it on read. Let them wonder.',
        nextSceneId: 'scene-22-silence',
        xpBonus: 8,
        feedback: "You didn't engage. But you read it. Something's still pulling.",
        tactic: 'read_no_respond',
      },
      {
        id: 'choice-21c',
        text: '"I wish you well, but please don\'t contact me again."',
        nextSceneId: 'scene-22-response',
        xpBonus: 3,
        feedback: "You responded. They'll view that as a crack in the wall.",
        tactic: 'polite_decline',
      },
      {
        id: 'choice-21d',
        text: '"Maybe... they really have changed?"',
        nextSceneId: 'scene-22-temptation',
        xpBonus: 0,
        feedback: 'This is exactly what the hoover is designed to do. Make you doubt.',
        tactic: 'doubt',
      },
    ],
  },

  // SCENE 22: SILENCE
  {
    id: 'scene-22-silence',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "Days pass. They send another message. Then another. Each one carefully crafted to pull at something.",
      },
      {
        text: '"I drove past the restaurant we used to go to." ... "I keep your hoodie on my chair." ... "I just want you to know I\'m getting help."',
        speakerId: 'drew',
        emotion: 'sad',
      },
      {
        
        text: "They're patient. They think persistence will pay off.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-22sil-a',
        text: 'Block. End the slow drip.',
        nextSceneId: 'ending-clean-break',
        xpBonus: 12,
        feedback: "Each message is a hook. Stop reading them.",
        tactic: 'block_drip',
      },
      {
        id: 'choice-22sil-b',
        text: 'Keep reading. Don\'t respond.',
        nextSceneId: 'ending-open-window',
        xpBonus: 5,
        feedback: "You're not going back. But you're not fully closing the door either.",
        tactic: 'perpetual_reader',
      },
      {
        id: 'choice-22sil-c',
        text: 'One of those messages hits. Respond.',
        nextSceneId: 'scene-22-response',
        xpBonus: 0,
        feedback: 'They found your weakness.',
        tactic: 'weakness_found',
      },
    ],
  },

  // SCENE 22: RESPONSE
  {
    id: 'scene-22-response',
    backgroundId: 'text-screen',
    dialog: [
      {
        text: "You told them to stop. Their response is immediate. The door just cracked open and they're pushing.",
        speakerId: 'drew',
        emotion: 'happy',
      },
      {
        text: '"You responded! I knew you still cared. I\'m not asking for us to get back together. Just... coffee? To talk? I need closure. Please."',
        speakerId: 'drew',
        emotion: 'sad',
      },
      {
        
        text: "'Closure' is the new bait. They don't want closure. They want another chance.",
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'choice-22resp-a',
        text: 'Block. No more engagement.',
        nextSceneId: 'ending-support-system',
        xpBonus: 10,
        feedback: 'Learning that any response is fuel.',
        tactic: 'learn_block',
      },
      {
        id: 'choice-22resp-b',
        text: '"Just coffee. Public place. That\'s it."',
        nextSceneId: 'scene-24-coffee',
        xpBonus: 0,
        feedback: "TRAP: 'Just coffee' is never just coffee with them.",
        tactic: 'just_coffee',
      },
      {
        id: 'choice-22resp-c',
        text: 'Call {bestfriend}. Get a reality check.',
        nextSceneId: 'scene-23-morgan-check',
        xpBonus: 8,
        feedback: 'Smart. Use your support system.',
        tactic: 'reality_check',
      },
    ],
  },

  // SCENE 22: TEMPTATION
  {
    id: 'scene-22-temptation',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "You're thinking about responding. About meeting for coffee. \"Just to talk.\" The words keep replaying: \"I've changed.\" \"I miss my best friend.\"",
      },
      {
        text: "What if they really have changed? What if you're throwing away something real? Your phone shows {bestfriend}'s contact. You could call. Get a reality check.",
      },
      {
        
        text: "You know what {bestfriend} will say. Is that why you're hesitating to call?",
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'choice-22temp-a',
        text: 'Call {bestfriend}. "Talk me out of something."',
        nextSceneId: 'scene-23-morgan-check',
        xpBonus: 10,
        feedback: 'You asked for help. Smart.',
        tactic: 'ask_help',
      },
      {
        id: 'choice-22temp-b',
        text: 'Respond: "Okay. Coffee. Just to talk."',
        nextSceneId: 'scene-24-coffee',
        xpBonus: 0,
        feedback: "You're walking back into the trap.",
        tactic: 'walk_back',
      },
      {
        id: 'choice-22temp-c',
        text: 'Sit with the feeling. Don\'t act.',
        nextSceneId: 'scene-25-resist',
        xpBonus: 8,
        feedback: "The urge is real. So is your power to not act on it.",
        tactic: 'sit_with_it',
      },
      {
        id: 'choice-22temp-d',
        text: 'Write a response. Delete it without sending.',
        nextSceneId: 'scene-25-resist',
        xpBonus: 8,
        feedback: 'You got it out. Without giving them anything.',
        tactic: 'write_delete',
      },
    ],
  },

  // SCENE 23: MORGAN'S REALITY CHECK
  {
    id: 'scene-23-morgan-check',
    backgroundId: 'phone-call',
    dialog: [
      {
        text: "You called {bestfriend}. They answer on the first ring.",
        speakerId: 'morgan',
        emotion: 'concerned',
      },
      {
        text: '"Tell me you\'re not thinking about going back." You explain the text. The "I\'ve changed." The "I miss my best friend." Their voice goes flat: "That\'s the playbook. That\'s literally the playbook. They always \'change\' during the hoover."',
        speakerId: 'morgan',
        emotion: 'neutral',
      },
      {
        text: '"You know what happens if you go back, right? Three months of good behavior, then the same shit. I\'ve seen this movie."',
        speakerId: 'morgan',
        emotion: 'concerned',
      },
      {
        
        text: "They're right. You know they're right.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-23-a',
        text: '"You\'re right. I\'m not going to respond."',
        nextSceneId: 'ending-support-system',
        xpBonus: 12,
        feedback: "Support system worked. That's what they're for.",
        tactic: 'listen_friend',
      },
      {
        id: 'choice-23-b',
        text: '"What if they really have changed though?"',
        nextSceneId: 'scene-23-morgan-harder',
        xpBonus: 3,
        feedback: "You're looking for permission. {bestfriend} won't give it.",
        tactic: 'push_back',
      },
      {
        id: 'choice-23-c',
        text: '"Can you check on me tomorrow? Make sure I don\'t do anything stupid?"',
        nextSceneId: 'ending-support-system',
        xpBonus: 10,
        feedback: 'Building in accountability. Smart.',
        tactic: 'accountability',
      },
      {
        id: 'choice-23-d',
        text: '"I know it\'s stupid. But I miss them too sometimes."',
        nextSceneId: 'scene-23-morgan-honest',
        xpBonus: 5,
        feedback: "Honest. The missing is real. Doesn't mean going back is right.",
        tactic: 'honest_missing',
      },
    ],
  },

  // SCENE 23 VARIANT: Morgan harder
  {
    id: 'scene-23-morgan-harder',
    backgroundId: 'phone-call',
    dialog: [
      {
        text: "{bestfriend} sighs. You can feel the frustration.",
        speakerId: 'morgan',
        emotion: 'angry',
      },
      {
        text: '"Changed? In two weeks? People don\'t change in two weeks. They perform in two weeks. And the moment they have you back, the performance ends."',
        speakerId: 'morgan',
        emotion: 'neutral',
      },
      {
        text: '"Look, I can\'t make you not go back. But if you do, I can\'t watch it again. That\'s my boundary."',
        speakerId: 'morgan',
        emotion: 'sad',
      },
      {
        
        text: "They're drawing a line. For their own protection.",
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'choice-23hard-a',
        text: '"You\'re right. I hear you. I won\'t go back."',
        nextSceneId: 'ending-support-system',
        xpBonus: 10,
        feedback: 'The hard truth landed.',
        tactic: 'accept_truth',
      },
      {
        id: 'choice-23hard-b',
        text: '"I need to find out for myself."',
        nextSceneId: 'scene-24-coffee',
        xpBonus: 0,
        feedback: "You're choosing the lesson the hard way.",
        tactic: 'go_anyway',
      },
    ],
  },

  // SCENE 23 VARIANT: Morgan honest response
  {
    id: 'scene-23-morgan-honest',
    backgroundId: 'phone-call',
    dialog: [
      {
        text: "{bestfriend}'s voice softens.",
        speakerId: 'morgan',
        emotion: 'sad',
      },
      {
        text: '"I know you miss them. Of course you do. Eight months isn\'t nothing. But missing someone isn\'t the same as them being good for you."',
        speakerId: 'morgan',
        emotion: 'concerned',
      },
      {
        text: '"You\'re not missing THEM. You\'re missing who they pretended to be in the beginning. That person was a costume."',
        speakerId: 'morgan',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'ending-support-system',
  },

  // SCENE 24: COFFEE (BAD PATH)
  {
    id: 'scene-24-coffee',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "You're at the coffee shop. {ex} is already there. They look different - softer, more vulnerable. They've dressed carefully. Their eyes light up when they see you.",
        speakerId: 'drew',
        emotion: 'happy',
      },
      {
        text: '"You came." They reach across the table but stop short of touching you. "I wasn\'t sure you would. Thank you."',
        speakerId: 'drew',
        emotion: 'sad',
      },
      {
        
        text: "Watch. Just watch.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-24-a',
        text: 'Stay guarded. "Say what you need to say."',
        nextSceneId: 'scene-24-guarded',
        xpBonus: 5,
        feedback: "Armor up. You're going to need it.",
        tactic: 'stay_guarded',
      },
      {
        id: 'choice-24-b',
        text: 'Soften. "How have you been?"',
        nextSceneId: 'scene-24-soften',
        xpBonus: 0,
        feedback: "You're already lowering defenses.",
        tactic: 'lower_guard',
      },
    ],
  },

  // SCENE 24 VARIANT: Guarded
  {
    id: 'scene-24-guarded',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "{ex} nods, accepting the coldness. They take a breath.",
        speakerId: 'drew',
        emotion: 'sad',
      },
      {
        text: '"I know I hurt you. I know I did things that were wrong. I\'ve been in therapy. Actual therapy. I\'m working on why I do what I do."',
        speakerId: 'drew',
        emotion: 'neutral',
      },
      {
        text: '"I\'m not asking you to come back. I just... I needed you to know that I\'m trying to be better. Even if it\'s too late for us."',
        speakerId: 'drew',
        emotion: 'sad',
      },
      {
        
        text: "Perfect words. Too perfect? Or genuine?",
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'choice-24guard-a',
        text: '"I hope that\'s true. Goodbye." Leave.',
        nextSceneId: 'ending-long-goodbye',
        xpBonus: 10,
        feedback: "You gave nothing. You took nothing. That's as clean as this gets.",
        tactic: 'goodbye_leave',
      },
      {
        id: 'choice-24guard-b',
        text: '"Maybe we could try being friends..."',
        nextSceneId: 'ending-cycle',
        xpBonus: 0,
        feedback: "TRAP: 'Friends' is the slow route back together.",
        tactic: 'friends_offer',
      },
    ],
  },

  // SCENE 24 VARIANT: Soften
  {
    id: 'scene-24-soften',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "Two hours. Coffee turned cold. They've been talking about changes, about therapy, about how much they've grown. It sounds good. It sounds real.",
        speakerId: 'drew',
        emotion: 'happy',
      },
      {
        text: '"I know I can\'t undo what I did. But I want to try. Slowly. No pressure. Just... see if we can find what we had."',
        speakerId: 'drew',
        emotion: 'sad',
      },
      {
        
        text: "You're being pulled back in. Can you feel it?",
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'choice-24soft-a',
        text: '"I can\'t. I have to go." Leave.',
        nextSceneId: 'ending-long-goodbye',
        xpBonus: 8,
        feedback: 'Last chance exit. Take it.',
        tactic: 'last_exit',
      },
      {
        id: 'choice-24soft-b',
        text: '"Maybe... we could try again. Slowly."',
        nextSceneId: 'ending-cycle',
        xpBonus: 0,
        feedback: 'The hoover worked. The cycle continues.',
        tactic: 'hoover_worked',
      },
    ],
  },

  // SCENE 25: RESIST
  {
    id: 'scene-25-resist',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "The urge passes. Not immediately - it takes a few hours, a long walk, too much coffee. But it passes.",
      },
      {
        text: "You didn't respond. You didn't go back. You sat with the discomfort and survived it.",
      },
      {
        
        text: "Every time you resist, it gets a little easier. Not easy. Easier.",
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'ending-closed-door',
  },
];
