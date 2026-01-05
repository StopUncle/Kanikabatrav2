// Part 3: The Exit
// Scenes 9-13: Executing exit strategies and getting out

import type { Scene } from '../../../types';

export const exitScenes: Scene[] = [
  // SCENE 9: THE FAKE EMERGENCY
  {
    id: 'scene-9-fake-emergency',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: 'Your phone rings. {friend}, right on cue. You answer.',
      },
      {
        text: '"Oh my god, are you okay??" Loud enough {date} might hear.',
        speakerId: 'friend',
        emotion: 'concerned',
      },
      {
        text: '"What? What happened?" You hang up, face arranged in concern. "I\'m so sorry. Friend emergency. I have to go."',
      },
      {
        
        text: "Clean extraction. Well executed.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-9a',
        text: '"I have to go. Right now. I\'m so sorry."',
        nextSceneId: 'scene-12-outside',
        xpBonus: 12,
        isOptimal: true,
        feedback: "Clean extraction. Well executed.",
        tactic: 'immediate_leave',
      },
      {
        id: 'choice-9b',
        text: '"We\'ll have to do this again. I\'m really sorry."',
        nextSceneId: 'scene-12-outside',
        xpBonus: 5,
        feedback: "You're out. But you left a door cracked.",
        tactic: 'leave_door_open',
      },
      {
        id: 'choice-9c',
        text: 'Watch {date}\'s reaction.',
        nextSceneId: 'scene-9-reaction',
        xpBonus: 8,
        feedback: "Their reaction tells you everything.",
        tactic: 'observe_reaction',
      },
    ],
  },

  // SCENE 9B: BLAKE'S REACTION TO EMERGENCY
  {
    id: 'scene-9-reaction',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: 'You said you have to leave. {date}\'s face shifts. They\'re not buying it. Or they are and they\'re pissed anyway.',
        speakerId: 'blake',
        emotion: 'cold',
      },
      {
        text: '"Seriously? Right now? That\'s... really convenient timing."',
        speakerId: 'blake',
        emotion: 'angry',
      },
      {
        text: '"Fine. But you\'re really going to leave me here?"',
        speakerId: 'blake',
        emotion: 'cold',
      },
      {
        
        text: "A normal person would say 'I hope your friend is okay.'",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-9r-a',
        text: '"I\'m sorry. I have to go." Start walking.',
        nextSceneId: 'scene-12-outside',
        xpBonus: 12,
        isOptimal: true,
        feedback: "You don't owe them an argument.",
        tactic: 'no_engage',
      },
      {
        id: 'choice-9r-b',
        text: '"You didn\'t ask if my friend was okay."',
        nextSceneId: 'scene-9-mask-slips',
        xpBonus: 10,
        feedback: "You named it. The mask slips further.",
        tactic: 'call_out',
      },
      {
        id: 'choice-9r-c',
        text: '"I\'m SO sorry, I\'ll make it up to you, I promise."',
        nextSceneId: 'scene-12-outside',
        xpBonus: 3,
        feedback: "You're out. But you're apologizing for leaving an uncomfortable situation.",
        tactic: 'over_apologize',
      },
    ],
  },

  // SCENE 9C: MASK SLIPS
  {
    id: 'scene-9-mask-slips',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: 'You called it out. {date}\'s composure cracks completely.',
        speakerId: 'blake',
        emotion: 'angry',
      },
      {
        text: '"Wow. You\'re really going to be like that? After I drove thirty minutes to meet you?"',
        speakerId: 'blake',
        emotion: 'angry',
      },
      {
        text: '"Good luck finding someone who puts up with your attitude."',
        speakerId: 'blake',
        emotion: 'cold',
      },
      {
        
        text: "There. That's who they really are.",
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'scene-12-outside',
  },

  // SCENE 10: THE DIRECT EXIT
  {
    id: 'scene-10-direct',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "No fake emergency. No bathroom call. You're just telling them you're leaving.",
      },
      {
        text: '"I\'m going to head out. This isn\'t working for me."',
      },
      {
        text: "{date}'s face shifts. Surprise. Then something else.",
        speakerId: 'blake',
        emotion: 'confused',
      },
      {
        
        text: "Don't explain. Don't negotiate. Just go.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-10a',
        text: 'Stand up. Reach for your jacket.',
        nextSceneId: 'scene-11-standing',
        xpBonus: 12,
        isOptimal: true,
        feedback: "Clean. Clear. You don't owe explanations.",
        tactic: 'stand_leave',
      },
      {
        id: 'choice-10b',
        text: '"The interrupting, the touching, the comments. It\'s too much."',
        nextSceneId: 'scene-10-explain',
        xpBonus: 10,
        feedback: "You told them. They probably won't hear it. But you said it.",
        tactic: 'explain_why',
      },
      {
        id: 'choice-10c',
        text: 'Pause. See what they do.',
        nextSceneId: 'scene-10-reaction',
        xpBonus: 8,
        feedback: "Their response will confirm everything.",
        tactic: 'wait_reaction',
      },
    ],
  },

  // SCENE 10B: WAITING FOR FRIEND
  {
    id: 'scene-10-waiting',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: 'You return to the table. {friend} is on their way. You just have to wait 20 minutes.',
        speakerId: 'blake',
        emotion: 'seductive',
      },
      {
        text: '"Everything okay? You were gone a while."',
        speakerId: 'blake',
        emotion: 'smirking',
      },
      {
        
        text: "Help is coming. Just run out the clock.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-10w-a',
        text: '"Actually, I need to go. My friend is picking me up."',
        nextSceneId: 'scene-10-reaction',
        xpBonus: 10,
        feedback: "Direct. No hiding it.",
        tactic: 'announce_pickup',
      },
      {
        id: 'choice-10w-b',
        text: '"Fine. Just tired."',
        nextSceneId: 'scene-10-wait-out',
        xpBonus: 5,
        feedback: "Running out the clock.",
        tactic: 'wait_quietly',
      },
    ],
  },

  // SCENE 10C: WAITING OUT THE CLOCK
  {
    id: 'scene-10-wait-out',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: 'Twenty minutes. {date} keeps talking. You keep nodding. Your phone buzzes.',
        speakerId: 'friend',
        emotion: 'neutral',
      },
      {
        text: '{friend}: "Outside. Black car. Move."',
        speakerId: 'friend',
        emotion: 'neutral',
      },
      {
        text: '"I have to go. Thanks for dinner." You\'re already standing.',
      },
    ],
    nextSceneId: 'scene-12-outside',
  },

  // SCENE 10D: EXPLAIN WHY
  {
    id: 'scene-10-explain',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: 'You told them why. {date} stares at you.',
        speakerId: 'blake',
        emotion: 'confused',
      },
      {
        text: '"Are you serious right now? I was being NICE. I was trying to show you I\'m interested."',
        speakerId: 'blake',
        emotion: 'angry',
      },
      {
        text: '"You know what? Fine. Good luck out there. You\'re going to need it."',
        speakerId: 'blake',
        emotion: 'cold',
      },
    ],
    nextSceneId: 'scene-11-standing',
  },

  // SCENE 10E: BLAKE'S REACTION TO DIRECT EXIT
  {
    id: 'scene-10-reaction',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: 'You said you\'re leaving. {date} tries charm first.',
        speakerId: 'blake',
        emotion: 'seductive',
      },
      {
        text: '"Wait, wait. I\'m sorry if I came on too strong. Just stay for one more drink. I\'ll dial it back."',
        speakerId: 'blake',
        emotion: 'sad',
      },
      {
        
        text: "Too late. Trust the pattern, not the promise.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-10r-a',
        text: '"I wish you well. Goodbye."',
        nextSceneId: 'scene-12-outside',
        xpBonus: 12,
        isOptimal: true,
        feedback: "You're not negotiating. You're gone.",
        tactic: 'firm_goodbye',
      },
      {
        id: 'choice-10r-b',
        text: '"I appreciate that, but I\'ve made my decision."',
        nextSceneId: 'scene-12-outside',
        xpBonus: 10,
        feedback: "You heard them. You're still leaving.",
        tactic: 'acknowledge_stay_firm',
      },
    ],
  },

  // SCENE 11: STANDING UP
  {
    id: 'scene-11-standing',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "You're up. Jacket in hand. The table feels like a boundary now.",
        speakerId: 'blake',
        emotion: 'confused',
      },
      {
        text: '"So that\'s it?"',
        speakerId: 'blake',
        emotion: 'cold',
      },
      {
        text: "Other diners might be looking. You don't care.",
      },
      {
        
        text: "Walk to the door. Don't look back.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-11a',
        text: '"Goodbye." Walk to the door.',
        nextSceneId: 'scene-12-outside',
        xpBonus: 12,
        isOptimal: true,
        feedback: "You're out.",
        tactic: 'walk_out',
      },
      {
        id: 'choice-11b',
        text: 'Stop at the server station. "Could you call me a cab?"',
        nextSceneId: 'scene-12-outside',
        xpBonus: 10,
        feedback: "Smart. Safe. Staff can help.",
        tactic: 'server_cab',
      },
      {
        id: 'choice-11c',
        text: 'Glance back. Is {date} following or staying seated?',
        nextSceneId: 'scene-11-follows',
        xpBonus: 8,
        feedback: "Situational awareness.",
        tactic: 'check_behind',
      },
    ],
  },

  // SCENE 11B: BLAKE FOLLOWS
  {
    id: 'scene-11-follows',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "You glance back. {date} is getting up. They're following you.",
        speakerId: 'blake',
        emotion: 'angry',
      },
      {
        
        text: "Move. Public space. Witnesses.",
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'choice-11f-a',
        text: 'Keep walking. Get outside. Don\'t engage.',
        nextSceneId: 'scene-13-blake-follows',
        xpBonus: 10,
        feedback: "Distance is safety.",
        tactic: 'keep_moving',
      },
      {
        id: 'choice-11f-b',
        text: 'Stop at the host stand. Stay in the restaurant.',
        nextSceneId: 'scene-12-stay-inside',
        xpBonus: 12,
        isOptimal: true,
        feedback: "Public space. Witnesses. Smart.",
        tactic: 'stay_public',
      },
    ],
  },

  // SCENE 12: THE EXIT - OUTSIDE
  {
    id: 'scene-12-outside',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "You're out. The night air hits you. Cool. Clean. Your heart is pounding.",
      },
      {
        text: "You pull out your phone. Rideshare. Friend pickup. Something.",
      },
      {
        
        text: "You did it. You trusted yourself. You got out.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-12a',
        text: 'Order a rideshare. Wait in a well-lit area.',
        nextSceneId: 'ending-trusted-gut',
        xpBonus: 12,
        isOptimal: true,
        feedback: "You're handling it.",
        tactic: 'rideshare',
      },
      {
        id: 'choice-12b',
        text: 'Go back inside to wait. Safer than outside alone.',
        nextSceneId: 'scene-12-stay-inside',
        xpBonus: 10,
        feedback: "Public space. Witnesses. Smart.",
        tactic: 'wait_inside',
      },
      {
        id: 'choice-12c',
        text: 'Start walking. Put distance between you and this.',
        nextSceneId: 'ending-stayed-too-long',
        xpBonus: 5,
        feedback: "You want away from here. Just stay aware.",
        tactic: 'walk_away',
      },
    ],
  },

  // SCENE 12B: STAY INSIDE
  {
    id: 'scene-12-stay-inside',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "You stay near the host stand. Public. Safe. The server catches your eye, nods. They understand.",
        speakerId: 'server',
        emotion: 'concerned',
      },
      {
        text: '"Car on the way?"',
        speakerId: 'server',
        emotion: 'neutral',
      },
      {
        text: 'You nod. They stand nearby, casual but present. A silent ally.',
      },
    ],
    nextSceneId: 'ending-support-system',
  },

  // SCENE 13: BLAKE FOLLOWS OUTSIDE
  {
    id: 'scene-13-blake-follows',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "{date} has followed you outside. They're not done.",
        speakerId: 'blake',
        emotion: 'angry',
      },
      {
        text: '"Okay, wait. Can we talk about this? I drove you here. At least let me drive you home."',
        speakerId: 'blake',
        emotion: 'seductive',
      },
      {
        text: "They're between you and the street now.",
      },
      {
        
        text: "Don't get in that car.",
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'choice-13a',
        text: '"I\'m getting my own ride. Thank you."',
        nextSceneId: 'scene-13-persist',
        xpBonus: 10,
        feedback: "Clear. Final.",
        tactic: 'refuse_ride',
      },
      {
        id: 'choice-13b',
        text: 'Turn around. Go back into the restaurant.',
        nextSceneId: 'ending-trusted-gut',
        xpBonus: 12,
        isOptimal: true,
        feedback: "You removed yourself from the isolated space.",
        tactic: 'go_back_inside',
      },
      {
        id: 'choice-13c',
        text: '"You\'re blocking my exit. Please move."',
        nextSceneId: 'scene-13-called-out',
        xpBonus: 10,
        feedback: "You named the threat behavior.",
        tactic: 'call_out_blocking',
      },
      {
        id: 'choice-13d',
        text: '"I AM LEAVING. MY FRIEND IS PICKING ME UP."',
        nextSceneId: 'ending-direct-done',
        xpBonus: 12,
        feedback: "Volume is a tool. Other people are now watching.",
        tactic: 'loud_exit',
      },
    ],
  },

  // SCENE 13B: BLAKE PERSISTS
  {
    id: 'scene-13-persist',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "{date} doesn't move.",
        speakerId: 'blake',
        emotion: 'cold',
      },
      {
        text: '"Come on. Don\'t be dramatic. I was just trying to have a nice night. Let me at least make sure you get home safe."',
        speakerId: 'blake',
        emotion: 'seductive',
      },
      {
        
        text: "They're not concerned about your safety. They want control.",
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'choice-13p-a',
        text: 'Go back inside. Now.',
        nextSceneId: 'ending-trusted-gut',
        xpBonus: 12,
        isOptimal: true,
        feedback: "You're not negotiating with someone blocking your path.",
        tactic: 'retreat_to_safety',
      },
      {
        id: 'choice-13p-b',
        text: 'Get loud. "MOVE. PLEASE."',
        nextSceneId: 'ending-direct-done',
        xpBonus: 12,
        feedback: "Creating witnesses. Smart.",
        tactic: 'get_loud',
      },
      {
        id: 'choice-13p-c',
        text: '"Fine. Just take me home."',
        nextSceneId: 'ending-car-ride',
        xpBonus: 0,
        feedback: "TRAP: You knew it was wrong. You got in anyway.",
        tactic: 'get_in_car',
      },
    ],
  },

  // SCENE 13C: CALLED OUT BLOCKING
  {
    id: 'scene-13-called-out',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "You named what they're doing. {date}'s face twists.",
        speakerId: 'blake',
        emotion: 'angry',
      },
      {
        text: '"Blocking your— I\'m not BLOCKING anything. God, you\'re paranoid."',
        speakerId: 'blake',
        emotion: 'angry',
      },
      {
        text: 'They step aside, hands up in mock surrender. "Fine. Go. Good luck."',
        speakerId: 'blake',
        emotion: 'cold',
      },
    ],
    nextSceneId: 'ending-direct-done',
  },
];
