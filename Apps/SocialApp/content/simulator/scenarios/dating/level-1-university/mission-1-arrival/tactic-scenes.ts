// Mission 1: The Arrival - TACTIC-BASED VERSION
// Uses TacticScene and TacticChoice for new UI
// Immersion: Professional mood with key character themes

import type { TacticScene, AnyScene } from '../../types';
import type { Scene, TacticChoice, TacticType } from '../../../../types';

// ============================================
// SCENE 1A: The Dorm Check-In (TACTIC VERSION)
// ============================================

export const tacticScene1a: TacticScene = {
  id: 'tactic-scene-1a-dorm-checkin',
  backgroundId: 'apartment',
  useTacticUI: true,
  activeCharacterId: 'jordan',
  controlScore: 0, // Starting neutral
  mood: 'professional', // Calm introduction scene

  yourRead: {
    personalityType: 'Authority Figure (The Gatekeeper)',
    currentMove: 'Screening new arrival',
    theirGoal: 'Assess if you\'ll be a problem or asset',
    weakness: 'Respects maturity. Dismisses neediness.',
  },

  dialog: [
    {
      text: 'You\'re standing in the dorm lobby with your suitcases. The RA is checking students in at a desk—friendly but professional, mid-20s, clearly used to managing new students.',
    },
    {
      text: '"Hey, welcome! I\'m Jordan, the RA for this floor. Let me get you checked in. First time away from home?"',
      speakerId: 'jordan',
      emotion: 'happy',
    },
  ],

  tacticChoices: [
    {
      id: 'tactic-1a-strategic-empathy',
      tactic: 'strategic-empathy' as TacticType,
      label: 'Acknowledge & redirect',
      description: 'Mirror their warmth without revealing vulnerability',
      execution: '"Thanks. I\'ll read the rules and reach out if I have questions. I\'m sure I\'ll figure it out."',
      innerVoice: 'Don\'t chase their approval. Show you don\'t need hand-holding.',
      feedback: 'OPTIMAL: You demonstrated self-sufficiency. Jordan respects you. They\'ll actually help you if you ask.',
      controlDelta: 15,
      nextSceneId: 'scene-1a-optimal-result',
      isOptimal: true,
      xpBonus: 15,
    },
    {
      id: 'tactic-1a-cold-withdrawal',
      tactic: 'cold-withdrawal' as TacticType,
      label: 'Minimal engagement',
      description: 'Don\'t give them anything to work with',
      execution: '"Thanks. I\'m good."',
      innerVoice: 'Gray rock. They get nothing.',
      feedback: 'CLOSE: You didn\'t overshare, but you came off cold. Jordan will leave you alone—but won\'t help either.',
      controlDelta: 5,
      nextSceneId: 'scene-1a-subtle-result',
      xpBonus: 5,
    },
    {
      id: 'tactic-1a-feigned-confusion',
      tactic: 'feigned-confusion' as TacticType,
      label: 'Play curious',
      description: 'Ask questions to make them invest',
      execution: '"Thanks for the welcome. I can tell you actually care about this job. That\'s rare. What\'s the vibe on this floor?"',
      innerVoice: 'Compliment sincerely. Make them feel seen.',
      feedback: 'CLOSE: You complimented them genuinely. Jordan sees you as someone who pays attention. Slight edge.',
      controlDelta: 10,
      nextSceneId: 'scene-1a-close-result',
      xpBonus: 10,
    },
    {
      id: 'tactic-1a-deflect-flip',
      tactic: 'deflect-flip' as TacticType,
      label: 'Seek validation',
      description: 'Show excitement and ask for reassurance',
      execution: '"Yeah, I\'m so excited! This is going to be amazing. I\'m really nervous though. Do you think I\'ll fit in?"',
      innerVoice: 'Wait—why are you asking them for permission to belong?',
      feedback: 'TRAP: You came across as needy and uncertain. Jordan will be friendly but won\'t invest in you.',
      controlDelta: -10,
      nextSceneId: 'scene-1a-trap-result',
      xpBonus: 0,
    },
  ],
};

// ============================================
// SCENE 1B: The Roommate (TACTIC VERSION)
// ============================================

export const tacticScene1b: TacticScene = {
  id: 'tactic-scene-1b-roommate',
  backgroundId: 'apartment',
  useTacticUI: true,
  activeCharacterId: 'alex',
  controlScore: 0,
  mood: 'tense', // Territory being established

  yourRead: {
    personalityType: 'Friendly Competitor (The Eager One)',
    currentMove: 'Territory claim + dominance test',
    theirGoal: 'Establish who leads the dynamic',
    weakness: 'Wants to be liked. Will fold if you stay cool.',
  },

  dialog: [
    {
      text: 'You enter your dorm room. Your roommate is already there, unpacking. Friendly-looking, athletic build, seems confident.',
    },
    {
      text: '"Hey! You must be my roommate. I\'m Alex. I got here early to grab the better desk. Hope you don\'t mind."',
      speakerId: 'alex',
      emotion: 'happy',
    },
  ],

  tacticChoices: [
    {
      id: 'tactic-1b-strategic-empathy',
      tactic: 'strategic-empathy' as TacticType,
      label: 'Graceful acceptance',
      description: 'Show you\'re above petty battles',
      execution: '"Looks good. I\'m not picky about desks. Where should I put my stuff?"',
      innerVoice: 'Let them have the battle. You\'re playing for the war.',
      feedback: 'OPTIMAL: You demonstrated maturity. Alex feels slightly in your debt. They\'ll like and respect you.',
      controlDelta: 15,
      nextSceneId: 'scene-1b-optimal-result',
      isOptimal: true,
      xpBonus: 15,
    },
    {
      id: 'tactic-1b-deflect-flip',
      tactic: 'deflect-flip' as TacticType,
      label: 'Flip with humor',
      description: 'Call out the move, propose fair solution',
      execution: '"Ha, nice try. But I like your confidence. Tell you what—we can rotate who gets the better desk each semester. Fair?"',
      innerVoice: 'Acknowledge the play. Counter with fairness.',
      feedback: 'CLOSE: You showed you\'re not a pushover while keeping it friendly. Alex respects you as an equal.',
      controlDelta: 10,
      nextSceneId: 'scene-1b-close-result',
      xpBonus: 10,
    },
    {
      id: 'tactic-1b-feigned-confusion',
      tactic: 'feigned-confusion' as TacticType,
      label: 'Defer completely',
      description: 'Let them set all the terms',
      execution: '"No problem at all. Thanks for unpacking. Which side do you prefer for the room setup?"',
      innerVoice: 'You just gave them the frame.',
      feedback: 'You were accommodating, but you let them set the terms. Power dynamic tilted in their favor.',
      controlDelta: -5,
      nextSceneId: 'scene-1b-subtle-result',
      xpBonus: 5,
    },
    {
      id: 'tactic-1b-cold-withdrawal',
      tactic: 'cold-withdrawal' as TacticType,
      label: 'Demand your rights',
      description: 'Claim what\'s technically yours',
      execution: '"Actually, I do mind. I got here first in terms of the room assignment. That\'s my desk."',
      innerVoice: 'You won the desk. But at what cost?',
      feedback: 'TRAP: You won the battle but lost the war. Alex will be distant. Living together will be awkward.',
      controlDelta: -15,
      nextSceneId: 'scene-1b-trap-result',
      xpBonus: 0,
    },
  ],
};

// ============================================
// SCENE 1C: The Hallway (TACTIC VERSION)
// ============================================

export const tacticScene1c: TacticScene = {
  id: 'tactic-scene-1c-hallway',
  backgroundId: 'apartment',
  useTacticUI: true,
  activeCharacterId: 'riley',
  controlScore: 0,
  mood: 'mysterious', // Social dynamics at play

  yourRead: {
    personalityType: 'Social Status Holder (The Magnet)',
    currentMove: 'Passive observation - waiting to be approached',
    theirGoal: 'Filter who\'s worth their time',
    weakness: 'Bored by chasers. Intrigued by indifference.',
  },

  dialog: [
    {
      text: 'You step into the hallway. Three people are hanging out near the common area.',
    },
    {
      text: 'Riley—attractive, confident, clearly popular. Casey—quiet, sitting alone. Sam—friendly, neutral energy, talking to both.',
    },
  ],

  tacticChoices: [
    {
      id: 'tactic-1c-cold-withdrawal',
      tactic: 'cold-withdrawal' as TacticType,
      label: 'Walk past, stay busy',
      description: 'Don\'t chase—let them come to you',
      execution: 'Walk past. Make brief eye contact with all three. Stop to look at a bulletin board nearby.',
      innerVoice: 'You don\'t need them. Let that energy speak for itself.',
      feedback: 'OPTIMAL: You didn\'t chase. Your indifference made you interesting. The high-status one approached you.',
      controlDelta: 20,
      nextSceneId: 'tactic-scene-1d-common-room',
      isOptimal: true,
      xpBonus: 15,
    },
    {
      id: 'tactic-1c-strategic-empathy',
      tactic: 'strategic-empathy' as TacticType,
      label: 'Invest in the overlooked',
      description: 'Build alliance with the undervalued one',
      execution: 'Approach Casey. "Hey, I\'m new here. Mind if I sit for a second?"',
      innerVoice: 'The lonely one will remember kindness. Loyalty compounds.',
      feedback: 'CLOSE: You invested in someone undervalued. Casey is grateful. Others notice you\'re friendly but not desperate.',
      controlDelta: 10,
      nextSceneId: 'tactic-scene-1d-common-room',
      xpBonus: 10,
    },
    {
      id: 'tactic-1c-feigned-confusion',
      tactic: 'feigned-confusion' as TacticType,
      label: 'Generic introduction',
      description: 'Polite but unremarkable approach',
      execution: '"Hi, I\'m moving in down the hall. Nice to meet you all."',
      innerVoice: 'Safe, but forgettable.',
      feedback: 'You introduced yourself politely. They acknowledge you but don\'t invite you in. You\'re on the map but not memorable.',
      controlDelta: 0,
      nextSceneId: 'tactic-scene-1d-common-room',
      xpBonus: 5,
    },
    {
      id: 'tactic-1c-deflect-flip',
      tactic: 'deflect-flip' as TacticType,
      label: 'Eager approach',
      description: 'Ask to join enthusiastically',
      execution: '"Hey everyone! I\'m new here. Can I hang out with you guys?"',
      innerVoice: 'You just broadcast that you need them more than they need you.',
      feedback: 'TRAP: You came across as desperate and needy. They\'ll be polite but won\'t remember you.',
      controlDelta: -15,
      nextSceneId: 'tactic-scene-1d-common-room',
      xpBonus: 0,
    },
  ],
};

// ============================================
// SCENE 1D: The Common Room (TACTIC VERSION)
// Meet Morgan - the covert narcissist
// ============================================

export const tacticScene1d: TacticScene = {
  id: 'tactic-scene-1d-common-room',
  backgroundId: 'apartment',
  useTacticUI: true,
  activeCharacterId: 'morgan',
  controlScore: 0,
  mood: 'mysterious', // First hint of danger

  yourRead: {
    personalityType: 'Covert Narcissist (The Strategist)',
    currentMove: 'Subtle status display - testing your reaction',
    theirGoal: 'Establish superiority without being obvious',
    weakness: 'Needs to feel superior. Crumbles when ignored.',
  },

  dialog: [
    {
      text: 'The common room. A few students scattered around. One person holds court in the center—Morgan. Connected family, designer everything, talking just loud enough for everyone to hear.',
    },
    {
      text: '"Yeah, my family\'s foundation is sponsoring the new library wing. It\'s exhausting being so involved, but someone has to give back."',
      speakerId: 'morgan',
      emotion: 'cold',
    },
    {
      text: 'Morgan notices you. The gaze is appraising. Calculating.',
    },
    {
      text: '"You\'re new. Welcome to campus. I basically run the social scene here."',
      speakerId: 'morgan',
      emotion: 'smirking',
    },
  ],

  tacticChoices: [
    {
      id: 'tactic-1d-cold-withdrawal',
      tactic: 'cold-withdrawal' as TacticType,
      label: 'Brief acknowledgment',
      description: 'Polite but don\'t seek their approval',
      execution: 'Nod. "Cool." Then continue to the vending machine like you had somewhere to be.',
      innerVoice: 'They expected you to orbit. Your indifference registered.',
      feedback: 'OPTIMAL: You didn\'t feed their ego. Morgan will remember you—not as a fan, but as someone worth watching.',
      controlDelta: 20,
      nextSceneId: 'tactic-scene-1e-study-lounge',
      isOptimal: true,
      xpBonus: 15,
    },
    {
      id: 'tactic-1d-feigned-confusion',
      tactic: 'feigned-confusion' as TacticType,
      label: 'Polite interest',
      description: 'Ask a neutral question',
      execution: '"That sounds like a lot of responsibility. What made you get into philanthropy?"',
      innerVoice: 'You gave them attention. Not too much, but attention nonetheless.',
      feedback: 'CLOSE: You were polite without being sycophantic. Morgan sees you as someone worth cultivating—or testing.',
      controlDelta: 5,
      nextSceneId: 'tactic-scene-1e-study-lounge',
      xpBonus: 8,
    },
    {
      id: 'tactic-1d-strategic-empathy',
      tactic: 'strategic-empathy' as TacticType,
      label: 'Show genuine interest',
      description: 'Compliment their involvement',
      execution: '"That\'s really impressive. I\'d love to hear more about the foundation sometime."',
      innerVoice: 'You just gave them exactly what they wanted. Supply delivered.',
      feedback: 'You became another admirer in Morgan\'s orbit. They\'ll be friendly but won\'t respect you.',
      controlDelta: -5,
      nextSceneId: 'tactic-scene-1e-study-lounge',
      xpBonus: 5,
    },
    {
      id: 'tactic-1d-deflect-flip',
      tactic: 'deflect-flip' as TacticType,
      label: 'Try to impress back',
      description: 'Share your own achievements',
      execution: '"Nice. My family does some charity work too. We sponsored a scholarship program."',
      innerVoice: 'You just entered their arena on their terms. Mistake.',
      feedback: 'TRAP: You tried to compete on their turf. Morgan will either dismiss you or see you as a threat to crush.',
      controlDelta: -15,
      nextSceneId: 'tactic-scene-1e-study-lounge',
      xpBonus: 0,
    },
  ],
};

// ============================================
// SCENE 1E: The Study Lounge (TACTIC VERSION)
// Casey - building alliance with the undervalued
// ============================================

export const tacticScene1e: TacticScene = {
  id: 'tactic-scene-1e-study-lounge',
  backgroundId: 'apartment',
  useTacticUI: true,
  activeCharacterId: 'casey',
  controlScore: 0,
  mood: 'peaceful', // Quieter moment

  yourRead: {
    personalityType: 'Undervalued Asset (The Wallflower)',
    currentMove: 'Keeping to themselves - expecting rejection',
    theirGoal: 'Avoid disappointment by not engaging',
    weakness: 'Starved for genuine connection. Loyalty for acknowledgment.',
  },

  dialog: [
    {
      text: 'The study lounge is quiet. Casey sits alone in the corner with a stack of books, clearly avoiding eye contact with everyone.',
    },
    {
      text: 'Something about the way they look up briefly—then quickly look away—suggests they\'re not invisible by choice.',
    },
  ],

  tacticChoices: [
    {
      id: 'tactic-1e-strategic-empathy',
      tactic: 'strategic-empathy' as TacticType,
      label: 'Genuine brief connection',
      description: 'Acknowledge without overwhelming',
      execution: 'Sit nearby. After a moment: "Good spot. I\'m hiding from the social chaos too." Then go back to your phone.',
      innerVoice: 'You showed you\'re not a threat. And that you\'re not desperate for their approval either.',
      feedback: 'OPTIMAL: You acknowledged them as an equal. Casey relaxes. A potential ally in the making.',
      controlDelta: 15,
      nextSceneId: 'tactic-scene-1f-night-walk',
      isOptimal: true,
      xpBonus: 15,
    },
    {
      id: 'tactic-1e-feigned-confusion',
      tactic: 'feigned-confusion' as TacticType,
      label: 'Friendly distraction',
      description: 'Make light conversation',
      execution: '"Mind if I sit here? The common room is too loud. What are you reading?"',
      innerVoice: 'Friendly enough. But you gave more than you received.',
      feedback: 'CLOSE: Casey appreciates the kindness but isn\'t sure if you\'re genuine. A tentative connection.',
      controlDelta: 5,
      nextSceneId: 'tactic-scene-1f-night-walk',
      xpBonus: 8,
    },
    {
      id: 'tactic-1e-deflect-flip',
      tactic: 'deflect-flip' as TacticType,
      label: 'Overly helpful',
      description: 'Offer to help with their work',
      execution: '"Hey, you look stressed. Want me to help you with that? I\'m pretty good at studying."',
      innerVoice: 'Why are you trying so hard? They can sense it.',
      feedback: 'You came on too strong. Casey accepts politely but puts up a wall. They\'ve seen this movie before.',
      controlDelta: -5,
      nextSceneId: 'tactic-scene-1f-night-walk',
      xpBonus: 5,
    },
    {
      id: 'tactic-1e-cold-withdrawal',
      tactic: 'cold-withdrawal' as TacticType,
      label: 'Ignore completely',
      description: 'Walk past without acknowledging',
      execution: 'Grab a seat across the room. Don\'t even glance their way.',
      innerVoice: 'Cold. But was it strategic or just rude?',
      feedback: 'TRAP: You missed an opportunity. The undervalued one could have become your most loyal ally.',
      controlDelta: -10,
      nextSceneId: 'tactic-scene-1f-night-walk',
      xpBonus: 0,
    },
  ],
};

// ============================================
// SCENE 1F: The Night Walk (TACTIC VERSION)
// Taylor - the dismissive avoidant test
// ============================================

export const tacticScene1f: TacticScene = {
  id: 'tactic-scene-1f-night-walk',
  backgroundId: 'park',
  useTacticUI: true,
  activeCharacterId: 'taylor',
  controlScore: 0,
  mood: 'romantic', // Tension and attraction

  yourRead: {
    personalityType: 'Dismissive Avoidant (The Prize)',
    currentMove: 'Testing your frame with attention withdrawal',
    theirGoal: 'See if you\'ll chase like everyone else',
    weakness: 'Only respects boundaries. Tests everyone.',
  },

  dialog: [
    {
      text: 'Evening on campus. You\'re walking back to the dorm when you spot Taylor outside, phone in hand, looking impossibly attractive in the streetlight glow.',
    },
    {
      text: 'They look up. Eyes meet. A slight smile that says "I know you\'re looking."',
      speakerId: 'taylor',
      emotion: 'seductive',
    },
    {
      text: '"Nice night. You\'re the new one, right?"',
      speakerId: 'taylor',
      emotion: 'smirking',
    },
  ],

  tacticChoices: [
    {
      id: 'tactic-1f-cold-withdrawal',
      tactic: 'cold-withdrawal' as TacticType,
      label: 'Casual, unaffected',
      description: 'Brief response, keep moving',
      execution: '"Yeah. You too." Keep walking with a slight smile. Don\'t stop.',
      innerVoice: 'Perfect. You didn\'t chase. Now they have to wonder.',
      feedback: 'OPTIMAL: You passed the test. Taylor watches you walk away—intrigued, not dismissed.',
      controlDelta: 25,
      nextSceneId: 'scene-mission-1-complete',
      isOptimal: true,
      xpBonus: 20,
    },
    {
      id: 'tactic-1f-feigned-confusion',
      tactic: 'feigned-confusion' as TacticType,
      label: 'Friendly but brief',
      description: 'Short exchange, then excuse yourself',
      execution: '"That\'s me. Just getting settled in. Anyway, have a good night." Smile and keep walking.',
      innerVoice: 'Close. You didn\'t pursue, but you gave a bit more than you got.',
      feedback: 'CLOSE: You didn\'t chase, but you were slightly too friendly. Taylor files you as "maybe interesting."',
      controlDelta: 10,
      nextSceneId: 'scene-mission-1-complete',
      xpBonus: 10,
    },
    {
      id: 'tactic-1f-strategic-empathy',
      tactic: 'strategic-empathy' as TacticType,
      label: 'Show interest',
      description: 'Stop and engage in conversation',
      execution: '"Yeah, just moved in. What\'s your name? Maybe we could grab coffee sometime?"',
      innerVoice: 'You stopped. You asked. You chased.',
      feedback: 'You chased. Taylor now knows you\'re like everyone else. They\'ll be polite but distant.',
      controlDelta: -10,
      nextSceneId: 'scene-mission-1-complete',
      xpBonus: 5,
    },
    {
      id: 'tactic-1f-deflect-flip',
      tactic: 'deflect-flip' as TacticType,
      label: 'Try to extend conversation',
      description: 'Ask questions to keep them engaged',
      execution: '"Yeah, nice to meet you! Hey, do you know any good spots around here? I\'m still figuring out the area."',
      innerVoice: 'You just asked them to help you. Power handed over.',
      feedback: 'TRAP: You gave away your power completely. Taylor will answer politely but has already lost interest.',
      controlDelta: -20,
      nextSceneId: 'scene-mission-1-complete',
      xpBonus: 0,
    },
  ],
};

// Export all tactic scenes
export const tacticMission1Scenes: AnyScene[] = [
  tacticScene1a,
  tacticScene1b,
  tacticScene1c,
  tacticScene1d,
  tacticScene1e,
  tacticScene1f,
];

// Map from old scene IDs to new tactic scene IDs
export const TACTIC_SCENE_MAP: Record<string, string> = {
  'scene-1a-dorm-checkin': 'tactic-scene-1a-dorm-checkin',
  'scene-1b-roommate': 'tactic-scene-1b-roommate',
  'scene-1c-hallway': 'tactic-scene-1c-hallway',
};
