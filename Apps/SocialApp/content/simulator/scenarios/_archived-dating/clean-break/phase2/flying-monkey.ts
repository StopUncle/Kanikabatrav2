// Phase 2: The Aftermath - Flying Monkey
// Scenes 10-11: Quinn's intervention

import type { Scene } from '../../../types';

export const flyingMonkeyScenes: Scene[] = [
  // SCENE 10: THE FLYING MONKEY
  {
    id: 'scene-10-flying-monkey',
    backgroundId: 'text-screen',
    dialog: [
      {
        text: "Two days later. A text from {flyingmonkey}, {ex}'s friend. You barely know them.",
      },
      {
        text: '"Hey, can we talk? I\'m worried about {ex}." A pause. Then: "They\'re really struggling. I just want to understand what happened."',
        speakerId: 'quinn',
        emotion: 'concerned',
      },
      {
        
        text: "They've been recruited.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-10a',
        text: '"I\'d rather not discuss my relationship. It\'s between me and {ex}."',
        nextSceneId: 'scene-14-extraction',
        xpBonus: 15,
        isOptimal: true,
        feedback: "Clean boundary. This isn't their business.",
        tactic: 'boundary',
      },
      {
        id: 'choice-10b',
        text: 'Agree to meet. Tell them what really happened.',
        nextSceneId: 'scene-10-coffee',
        xpBonus: 3,
        feedback: "You're now relitigating through a third party. Anything you say goes back to {ex}.",
        tactic: 'explain_to_third',
      },
      {
        id: 'choice-10c',
        text: '"What did {ex} say happened?"',
        nextSceneId: 'scene-10-version',
        xpBonus: 8,
        feedback: "Good to know what narrative is being spun.",
        tactic: 'gather_intel',
      },
      {
        id: 'choice-10d',
        text: "Don't respond. Delete.",
        nextSceneId: 'scene-14-extraction',
        xpBonus: 10,
        feedback: "You don't owe explanations to flying monkeys.",
        tactic: 'ignore',
      },
    ],
  },

  // SCENE 10 VARIANT: Drew's version
  {
    id: 'scene-10-version',
    backgroundId: 'text-screen',
    dialog: [
      {
        text: "You asked what {ex} said. {flyingmonkey} tells you.",
        speakerId: 'quinn',
        emotion: 'concerned',
      },
      {
        text: '"They said you just left without warning. No explanation. They said you\'d been pulling away for weeks and then just blindsided them. They\'re devastated. They don\'t understand what they did wrong."',
        speakerId: 'quinn',
        emotion: 'sad',
      },
      {
        
        text: "That's not what happened. But of course that's what they said.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-10v-a',
        text: '"That\'s not what happened. I was very clear about why I was leaving."',
        nextSceneId: 'scene-11-quinn-push',
        xpBonus: 5,
        feedback: "You're on record. But will {flyingmonkey} believe you?",
        tactic: 'correct_record',
      },
      {
        id: 'choice-10v-b',
        text: '"I\'m not going to argue about {ex}\'s version. The relationship is over."',
        nextSceneId: 'scene-14-extraction',
        xpBonus: 12,
        feedback: "You're not playing this game.",
        tactic: 'refuse_game',
      },
      {
        id: 'choice-10v-c',
        text: '"I appreciate your concern, but this is between me and {ex}."',
        nextSceneId: 'scene-14-extraction',
        xpBonus: 10,
        feedback: 'Boundary set.',
        tactic: 'polite_boundary',
      },
      {
        id: 'choice-10v-d',
        text: '"Of COURSE that\'s what they said. They\'re lying."',
        nextSceneId: 'scene-11-quinn-push',
        xpBonus: 0,
        feedback: "You sound bitter. {flyingmonkey} might report this back as 'unstable.'",
        tactic: 'bitter_response',
      },
    ],
  },

  // SCENE 10 VARIANT: Coffee with Quinn
  {
    id: 'scene-10-coffee',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "You're at a coffee shop. {flyingmonkey} is across from you, looking sympathetic. But they're here for {ex}, not for you.",
        speakerId: 'quinn',
        emotion: 'concerned',
      },
      {
        text: '"I just don\'t understand. {ex} said everything was fine, and then you just... left." They lean forward. "What really happened?"',
        speakerId: 'quinn',
        emotion: 'neutral',
      },
      {
        
        text: "Anything you say here goes straight back to {ex}. Choose carefully.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-10c-a',
        text: 'Give them the full truth.',
        nextSceneId: 'scene-11-quinn-truth',
        xpBonus: 5,
        feedback: "You told your story. Now it's {flyingmonkey}'s move.",
        tactic: 'full_truth',
      },
      {
        id: 'choice-10c-b',
        text: '"It\'s complicated. I don\'t think this is productive."',
        nextSceneId: 'scene-11-quinn-push',
        xpBonus: 8,
        feedback: 'Non-answer. But at least you\'re not feeding the machine.',
        tactic: 'deflect',
      },
      {
        id: 'choice-10c-c',
        text: '"Why are you really here, {flyingmonkey}?"',
        nextSceneId: 'scene-11-quinn-exposed',
        xpBonus: 10,
        feedback: 'Turning the tables.',
        tactic: 'call_out_role',
      },
    ],
  },

  // SCENE 11: Quinn pushes
  {
    id: 'scene-11-quinn-push',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "{flyingmonkey} isn't giving up. They push harder.",
        speakerId: 'quinn',
        emotion: 'neutral',
      },
      {
        text: '"I think {ex} deserves a conversation at least. You owe them that much." They pull out their phone. "They asked me to give you this letter. Please just read it."',
        speakerId: 'quinn',
        emotion: 'sad',
      },
      {
        
        text: "A letter. The manipulation goes analog.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-11push-a',
        text: '"I don\'t owe them anything. And I\'m not reading that."',
        nextSceneId: 'scene-14-extraction',
        xpBonus: 12,
        feedback: "Clear. {flyingmonkey} can report back that you're firm.",
        tactic: 'refuse_letter',
      },
      {
        id: 'choice-11push-b',
        text: 'Take the letter. Don\'t promise to read it.',
        nextSceneId: 'scene-11-letter',
        xpBonus: 5,
        feedback: "You took it. Now you have to decide what to do with it.",
        tactic: 'take_letter',
      },
      {
        id: 'choice-11push-c',
        text: '"I\'ve said everything I need to say. Please tell them to move on."',
        nextSceneId: 'scene-14-extraction',
        xpBonus: 10,
        feedback: 'Message delivered. Through their own messenger.',
        tactic: 'send_message',
      },
    ],
  },

  // SCENE 11 VARIANT: Quinn truth
  {
    id: 'scene-11-quinn-truth',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "You told them everything. The manipulation. The guilt trips. The way {ex} made you feel small. {flyingmonkey} listens.",
        speakerId: 'quinn',
        emotion: 'confused',
      },
      {
        text: '"I... didn\'t know all that." They look uncomfortable. "That\'s not what {ex} told me. They made it sound like..."',
        speakerId: 'quinn',
        emotion: 'concerned',
      },
      {
        
        text: "They're hearing a different story. Whether they believe you is another matter.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-11t-a',
        text: '"You can believe what you want. I just told you my truth."',
        nextSceneId: 'scene-14-extraction',
        xpBonus: 10,
        feedback: "No need to convince them. You said your piece.",
        tactic: 'truth_spoken',
      },
      {
        id: 'choice-11t-b',
        text: '"Maybe ask {ex} about it. See what they say."',
        nextSceneId: 'scene-14-extraction',
        xpBonus: 8,
        feedback: 'Planting a seed. {flyingmonkey} might start asking questions.',
        tactic: 'plant_doubt',
      },
    ],
  },

  // SCENE 11 VARIANT: Quinn exposed
  {
    id: 'scene-11-quinn-exposed',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "{flyingmonkey} blinks, caught off guard. The facade slips for a moment.",
        speakerId: 'quinn',
        emotion: 'confused',
      },
      {
        text: '"I\'m... I\'m just trying to help. {ex} is my friend. They\'re hurting." They shift in their seat. "They asked me to talk to you. To see if there\'s any chance..."',
        speakerId: 'quinn',
        emotion: 'concerned',
      },
      {
        
        text: "There it is. They're not here to understand. They're here to negotiate.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-11exp-a',
        text: '"There isn\'t. Please tell them to stop sending people."',
        nextSceneId: 'scene-14-extraction',
        xpBonus: 12,
        feedback: 'Message sent. Through the messenger.',
        tactic: 'stop_messengers',
      },
      {
        id: 'choice-11exp-b',
        text: '"I get that you\'re trying to help. But this isn\'t your situation."',
        nextSceneId: 'scene-14-extraction',
        xpBonus: 10,
        feedback: 'Acknowledging their intent while shutting it down.',
        tactic: 'kind_shutdown',
      },
    ],
  },

  // SCENE 11 VARIANT: The letter
  {
    id: 'scene-11-letter',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "You're home. The letter is on the table. Unopened. You've been staring at it for an hour.",
      },
      {
        text: "You know what's in it. Apologies. Promises. Memories of good times. All the things designed to pull you back.",
      },
      {
        
        text: "You can throw it away without reading it. That's an option.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-11let-a',
        text: 'Throw it away. Unopened.',
        nextSceneId: 'scene-14-extraction',
        xpBonus: 12,
        feedback: "You don't need to read their words to know your decision.",
        tactic: 'trash_unopened',
      },
      {
        id: 'choice-11let-b',
        text: 'Read it. Just to know.',
        nextSceneId: 'scene-11-letter-read',
        xpBonus: 3,
        feedback: "Curiosity. It's human. But it has costs.",
        tactic: 'read_letter',
      },
    ],
  },

  // SCENE 11 VARIANT: Reading the letter
  {
    id: 'scene-11-letter-read',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "Exactly what you expected. \"I can't stop thinking about you.\" \"Remember when we...\" \"I know I wasn't perfect, but...\" \"Please give me one more chance.\"",
      },
      {
        text: "The handwriting is shaky in places. They were crying when they wrote this. Part of you hurts for them.",
      },
      {
        
        text: "The pain is real. Their feelings are real. That doesn't mean you should go back.",
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'choice-11read-a',
        text: 'Put it down. Stay the course.',
        nextSceneId: 'scene-14-extraction',
        xpBonus: 10,
        feedback: 'You acknowledged the emotion. You\'re still leaving.',
        tactic: 'acknowledge_stay_firm',
      },
      {
        id: 'choice-11read-b',
        text: 'Maybe one conversation...',
        nextSceneId: 'ending-cycle',
        xpBonus: 0,
        feedback: "The letter did its job. You're being pulled back.",
        tactic: 'letter_worked',
      },
    ],
  },
];
