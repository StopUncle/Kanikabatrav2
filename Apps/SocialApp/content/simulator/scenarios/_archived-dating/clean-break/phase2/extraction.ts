// Phase 2: The Aftermath - Extraction & Safety
// Scenes 14-17: Getting belongings and securing your space

import type { Scene } from '../../../types';

export const extractionScenes: Scene[] = [
  // SCENE 14: GETTING YOUR STUFF BACK
  {
    id: 'scene-14-extraction',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "There's still a box of your stuff at {ex}'s place. Clothes. That one photo. Your extra keys. You need it back. But going there alone feels risky.",
      },
      {
        text: "{bestfriend} texts: \"Want me to come with you to get your stuff?\"",
        speakerId: 'morgan',
        emotion: 'concerned',
      },
      {
        
        text: "Don't go alone.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-14a',
        text: '"Yes. Please come with me."',
        nextSceneId: 'scene-14-with-morgan',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'Witness. Protection. Smart.',
        tactic: 'backup',
      },
      {
        id: 'choice-14b',
        text: 'Go alone but during daytime.',
        nextSceneId: 'scene-14-alone',
        xpBonus: 5,
        feedback: "Daytime is safer. But you're still alone.",
        tactic: 'daytime_alone',
      },
      {
        id: 'choice-14c',
        text: '"Can you leave my things in the lobby?" (text {ex})',
        nextSceneId: 'scene-14-lobby-request',
        xpBonus: 12,
        feedback: 'No contact. Clean attempt.',
        tactic: 'no_contact',
      },
      {
        id: 'choice-14d',
        text: 'Write it off. Start fresh.',
        nextSceneId: 'scene-16-safety',
        xpBonus: 8,
        feedback: "Sometimes belongings aren't worth the risk.",
        tactic: 'abandon_stuff',
      },
    ],
  },

  // SCENE 14 VARIANT: With Morgan
  {
    id: 'scene-14-with-morgan',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "{bestfriend} is with you. {ex} opens the door, sees both of you. Their face tightens.",
        speakerId: 'drew',
        emotion: 'angry',
      },
      {
        text: '"Seriously? You brought backup?" {ex} steps aside. "Fine. Get your stuff."',
        speakerId: 'drew',
        emotion: 'cold',
      },
      {
        text: "{bestfriend} doesn't engage. Just helps you pack. In and out in ten minutes. Clean. {ex} watches from the doorway, arms crossed, but says nothing else.",
        speakerId: 'morgan',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'scene-16-safety',
  },

  // SCENE 14 VARIANT: Alone
  {
    id: 'scene-14-alone',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "You're at {ex}'s door. Alone. Daytime. Heart pounding. They open it slowly.",
        speakerId: 'drew',
        emotion: 'sad',
      },
      {
        text: '"You came." They look hopeful. Too hopeful. "Come in. Your stuff is... I kept it. All of it."',
        speakerId: 'drew',
        emotion: 'sad',
      },
      {
        
        text: "In and out. Don't get pulled into conversation.",
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'choice-14alone-a',
        text: 'Quick. Grab it. Leave.',
        nextSceneId: 'scene-14-quick-exit',
        xpBonus: 10,
        feedback: 'Focused. Efficient.',
        tactic: 'quick_grab',
      },
      {
        id: 'choice-14alone-b',
        text: 'Let yourself get pulled into conversation.',
        nextSceneId: 'scene-14-conversation-trap',
        xpBonus: 0,
        feedback: "You're alone with them. They have the home advantage.",
        tactic: 'engage',
      },
    ],
  },

  // SCENE 14 VARIANT: Quick exit
  {
    id: 'scene-14-quick-exit',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "You move fast. Box in hand. Heading for the door. {ex} tries to block.",
        speakerId: 'drew',
        emotion: 'sad',
      },
      {
        text: '"Wait. Please. Just five minutes. Just talk to me."',
        speakerId: 'drew',
        emotion: 'sad',
      },
      {
        
        text: "Keep moving.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-14quick-a',
        text: 'Walk around them. "Goodbye."',
        nextSceneId: 'scene-16-safety',
        xpBonus: 12,
        feedback: 'Clean exit.',
        tactic: 'walk_past',
      },
      {
        id: 'choice-14quick-b',
        text: '"Five minutes. That\'s it."',
        nextSceneId: 'scene-14-conversation-trap',
        xpBonus: 0,
        feedback: 'TRAP: Five minutes becomes an hour. An hour becomes confusion.',
        tactic: 'give_time',
      },
    ],
  },

  // SCENE 14 VARIANT: Conversation trap
  {
    id: 'scene-14-conversation-trap',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "An hour later. You're sitting on the couch. {ex} has been crying, apologizing, promising. The box is still by the door. You haven't left.",
        speakerId: 'drew',
        emotion: 'sad',
      },
      {
        text: '"I know I messed up. But we can fix this. We can start fresh. Please."',
        speakerId: 'drew',
        emotion: 'sad',
      },
      {
        
        text: "You came for a box. You're getting the full treatment.",
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'choice-14conv-a',
        text: 'Stand up. "I need to go."',
        nextSceneId: 'scene-16-safety',
        xpBonus: 10,
        feedback: 'Breaking free. Better late than never.',
        tactic: 'break_free',
      },
      {
        id: 'choice-14conv-b',
        text: 'Stay. Listen more.',
        nextSceneId: 'ending-cycle',
        xpBonus: 0,
        feedback: "The cycle restarts. You're back.",
        tactic: 'stay_trapped',
      },
    ],
  },

  // SCENE 14 VARIANT: Lobby request
  {
    id: 'scene-14-lobby-request',
    backgroundId: 'text-screen',
    dialog: [
      {
        text: "You asked them to leave your stuff in the lobby. Their response comes quickly.",
        speakerId: 'drew',
        emotion: 'angry',
      },
      {
        text: '"Really? You won\'t even see me? I\'m not going to leave your stuff in a lobby like you\'re a stranger. If you want your things, you can come get them like an adult."',
        speakerId: 'drew',
        emotion: 'cold',
      },
      {
        
        text: "They're using your stuff as leverage.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-14lobby-a',
        text: '"I\'ll be there Saturday at 2pm with a friend."',
        nextSceneId: 'scene-14-with-morgan',
        xpBonus: 12,
        feedback: "You're not asking permission. You're informing them.",
        tactic: 'inform_backup',
      },
      {
        id: 'choice-14lobby-b',
        text: '"Fine. I\'ll come by tomorrow."',
        nextSceneId: 'scene-14-alone',
        xpBonus: 3,
        feedback: 'They got what they wanted - you, alone, in their space.',
        tactic: 'cave_alone',
      },
      {
        id: 'choice-14lobby-c',
        text: '"If you won\'t put them in the lobby, I\'ll have {bestfriend} pick them up."',
        nextSceneId: 'scene-14-morgan-solo',
        xpBonus: 10,
        feedback: 'Taking yourself out of the equation.',
        tactic: 'send_morgan',
      },
      {
        id: 'choice-14lobby-d',
        text: '"Keep it. I don\'t need it."',
        nextSceneId: 'scene-16-safety',
        xpBonus: 8,
        feedback: "You're free of the trap. But they still have your things.",
        tactic: 'let_go',
      },
    ],
  },

  // SCENE 14 VARIANT: Morgan goes solo
  {
    id: 'scene-14-morgan-solo',
    backgroundId: 'text-screen',
    dialog: [
      {
        text: "{bestfriend} texts you an hour later: \"Got your stuff. They tried to get me to pass along a message. I said no.\"",
        speakerId: 'morgan',
        emotion: 'smirking',
      },
      {
        text: "\"They looked rough. I almost felt bad. Almost. Your box is at my place whenever you want it.\"",
        speakerId: 'morgan',
        emotion: 'concerned',
      },
      {
        
        text: "Good friend. Keep them.",
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'scene-16-safety',
  },

  // SCENE 16: SAFETY PLANNING
  {
    id: 'scene-16-safety',
    backgroundId: 'phone-call',
    dialog: [
      {
        text: "You're home. Processing. {bestfriend} calls to check in.",
        speakerId: 'morgan',
        emotion: 'concerned',
      },
      {
        text: '"Hey. How are you doing? Seriously." You talk about the last few days. Then: "Do they still have a key to your place?"',
        speakerId: 'morgan',
        emotion: 'neutral',
      },
      {
        
        text: "They do. Shit.",
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'choice-16a',
        text: '"I need to call my landlord. Tomorrow."',
        nextSceneId: 'scene-17-locks-changed',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'Smart. Take control of your space.',
        tactic: 'change_locks',
      },
      {
        id: 'choice-16b',
        text: '"Maybe I should just ask them to return it."',
        nextSceneId: 'scene-17-key-request',
        xpBonus: 3,
        feedback: "You're trusting them to respect boundaries. They haven't so far.",
        tactic: 'ask_key',
      },
      {
        id: 'choice-16c',
        text: '"They wouldn\'t actually use it... right?"',
        nextSceneId: 'scene-17-hope',
        xpBonus: 0,
        feedback: 'Hope is not a safety plan.',
        tactic: 'hope',
      },
      {
        id: 'choice-16d',
        text: '"Can I crash with you? Until I sort this out?"',
        nextSceneId: 'scene-17-at-morgans',
        xpBonus: 12,
        feedback: 'Creating distance. Wise.',
        tactic: 'stay_morgan',
      },
    ],
  },

  // SCENE 17: Locks changed
  {
    id: 'scene-17-locks-changed',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "Two days later. New locks. New key. The old key won't work anymore. It feels like a small victory.",
      },
      {
        text: "{bestfriend} texts: \"Proud of you. That took guts.\"",
        speakerId: 'morgan',
        emotion: 'happy',
      },
    ],
    nextSceneId: 'scene-20-two-weeks',
  },

  // SCENE 17 VARIANT: Key request
  {
    id: 'scene-17-key-request',
    backgroundId: 'text-screen',
    dialog: [
      {
        text: "You texted asking for your key back. Their response:",
        speakerId: 'drew',
        emotion: 'sad',
      },
      {
        text: '"I\'ll give it back. But can I bring it in person? I just want to see you\'re okay."',
        speakerId: 'drew',
        emotion: 'sad',
      },
      {
        
        text: "It's always about seeing you. Always about getting another chance.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-17key-a',
        text: '"No. Mail it or leave it with {bestfriend}."',
        nextSceneId: 'scene-17-key-refused',
        xpBonus: 10,
        feedback: 'No contact. Clean.',
        tactic: 'mail_key',
      },
      {
        id: 'choice-17key-b',
        text: '"Fine. Quick handoff. That\'s it."',
        nextSceneId: 'scene-17-key-meeting',
        xpBonus: 3,
        feedback: "Every meeting is a chance for them to work you.",
        tactic: 'meet_key',
      },
      {
        id: 'choice-17key-c',
        text: 'Just change the locks instead.',
        nextSceneId: 'scene-17-locks-changed',
        xpBonus: 12,
        feedback: "Don't negotiate. Just act.",
        tactic: 'skip_to_locks',
      },
    ],
  },

  // SCENE 17 VARIANT: Hope (bad choice)
  {
    id: 'scene-17-hope',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "{bestfriend} pauses on the phone. \"Really? You're trusting them with a key to your place?\"",
        speakerId: 'morgan',
        emotion: 'concerned',
      },
      {
        text: "\"After everything? Come on. Change the locks or stay here until you do. I'm not joking.\"",
        speakerId: 'morgan',
        emotion: 'neutral',
      },
      {
        
        text: "They're right. Hope isn't protection.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-17hope-a',
        text: '"You\'re right. I\'ll call the landlord."',
        nextSceneId: 'scene-17-locks-changed',
        xpBonus: 10,
        feedback: 'Course correction. Good friend.',
        tactic: 'accept_advice',
      },
      {
        id: 'choice-17hope-b',
        text: '"I\'ll deal with it if it becomes a problem."',
        nextSceneId: 'ending-lingering',
        xpBonus: 0,
        feedback: "It's already a problem. You're just not ready to see it.",
        tactic: 'denial',
      },
    ],
  },

  // SCENE 17 VARIANT: At Morgan's
  {
    id: 'scene-17-at-morgans',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "You're at {bestfriend}'s place. A few days turn into a week. It feels safe here. Normal.",
        speakerId: 'morgan',
        emotion: 'happy',
      },
      {
        text: '"Stay as long as you need," they say. "But at some point, you should change those locks. Reclaim your space."',
        speakerId: 'morgan',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'scene-20-two-weeks',
  },

  // SCENE 17 VARIANT: Key refused
  {
    id: 'scene-17-key-refused',
    backgroundId: 'text-screen',
    dialog: [
      {
        text: "{ex} didn't like that. The messages get angry.",
        speakerId: 'drew',
        emotion: 'angry',
      },
      {
        text: '"Fine. I\'ll mail it. But this is exactly what I was talking about. You won\'t even see me. You\'ve completely shut me out."',
        speakerId: 'drew',
        emotion: 'cold',
      },
      {
        text: "The key arrives three days later. You change the locks anyway.",
      },
    ],
    nextSceneId: 'scene-20-two-weeks',
  },

  // SCENE 17 VARIANT: Key meeting
  {
    id: 'scene-17-key-meeting',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "Quick handoff at a coffee shop. Public. Safe. Except they're not making it quick.",
        speakerId: 'drew',
        emotion: 'sad',
      },
      {
        text: '"I keep thinking about what went wrong. What I could have done differently. I can\'t sleep."',
        speakerId: 'drew',
        emotion: 'sad',
      },
      {
        
        text: "The key handoff is becoming a therapy session.",
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'choice-17meet-a',
        text: 'Take the key. "I have to go." Leave.',
        nextSceneId: 'scene-20-two-weeks',
        xpBonus: 10,
        feedback: 'Mission accomplished. Exit.',
        tactic: 'take_and_leave',
      },
      {
        id: 'choice-17meet-b',
        text: 'Stay and listen.',
        nextSceneId: 'scene-17-key-trap',
        xpBonus: 0,
        feedback: "You're getting drawn back in. Again.",
        tactic: 'stay_listen',
      },
    ],
  },

  // SCENE 17 VARIANT: Key trap
  {
    id: 'scene-17-key-trap',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "Two hours. Coffee went cold. {ex} has been crying, talking, remembering good times. You're exhausted.",
        speakerId: 'drew',
        emotion: 'sad',
      },
      {
        text: '"Maybe we could try again. Slowly. Just as friends at first."',
        speakerId: 'drew',
        emotion: 'happy',
      },
      {
        
        text: "'Friends' is the new trap. They don't want friendship.",
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'choice-17trap-a',
        text: '"No. Goodbye." Leave.',
        nextSceneId: 'scene-20-two-weeks',
        xpBonus: 10,
        feedback: 'Finally. Took too long, but you got out.',
        tactic: 'final_exit',
      },
      {
        id: 'choice-17trap-b',
        text: '"Maybe... as friends..."',
        nextSceneId: 'ending-cycle',
        xpBonus: 0,
        feedback: "'Friends' becomes dating becomes cycle. You know this.",
        tactic: 'friends_trap',
      },
    ],
  },
];
