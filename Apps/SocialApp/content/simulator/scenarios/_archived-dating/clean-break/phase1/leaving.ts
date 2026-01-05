// Phase 1: The Decision - Leaving
// Scenes 5-7: The anger phase and getting out

import type { Scene } from '../../../types';

export const leavingScenes: Scene[] = [
  // SCENE 5: DREW'S ANGER
  {
    id: 'scene-5-anger',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "Nothing has worked. The mask slips. You watch their face transform - the tears are gone, replaced by something colder.",
        speakerId: 'drew',
        emotion: 'cold',
      },
      {
        text: '"Fine. You want to go? Go." Their voice is flat now. "But you\'re making a huge mistake. You\'ll never find anyone who loved you like I did."',
        speakerId: 'drew',
        emotion: 'angry',
      },
      {
        text: '"Good luck finding someone who puts up with your shit."',
        speakerId: 'drew',
        emotion: 'cold',
      },
      {
        
        text: "There it is. The real them.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-5a',
        text: '"I\'m going to get my things."',
        nextSceneId: 'scene-6-packing',
        xpBonus: 15,
        isOptimal: true,
        feedback: "You're not engaging with the anger. You're leaving.",
        tactic: 'disengage',
      },
      {
        id: 'choice-5b',
        text: '"That\'s not fair. I never said—"',
        nextSceneId: 'scene-5-escalation',
        xpBonus: 3,
        feedback: "You're defending yourself to someone attacking you. They want to hurt, not understand.",
        tactic: 'defend',
      },
      {
        id: 'choice-5c',
        text: 'Match their energy. Fire back.',
        nextSceneId: 'scene-5-fight',
        xpBonus: 0,
        feedback: 'Escalation. This could get dangerous.',
        tactic: 'escalate',
      },
      {
        id: 'choice-5d',
        text: '"I\'m leaving. I\'ll get my things another time."',
        nextSceneId: 'scene-7-out',
        xpBonus: 12,
        feedback: 'Safety first. Smart. But your stuff is still there.',
        tactic: 'leave_now',
      },
    ],
  },

  // SCENE 5 VARIANT: Fast anger (after calling out manipulation)
  {
    id: 'scene-5-anger-fast',
    backgroundId: 'apartment',
    dialog: [
      {
        text: 'Being called out flips a switch. Their eyes go flat.',
        speakerId: 'drew',
        emotion: 'cold',
      },
      {
        text: '"Guilt you? GUILT you?" They stand up. "You\'re the one throwing away everything we built. Don\'t you dare put that on me."',
        speakerId: 'drew',
        emotion: 'angry',
      },
      {
        text: '"You want to leave? Fine. But remember this moment. Remember you chose this."',
        speakerId: 'drew',
        emotion: 'cold',
      },
      {
        
        text: "That's a threat dressed as a prediction. Note it.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-5fast-a',
        text: '"I will. Goodbye." Start packing.',
        nextSceneId: 'scene-6-packing',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'Clean exit. No engagement with the threat.',
        tactic: 'clean_exit',
      },
      {
        id: 'choice-5fast-b',
        text: '"What does that mean? Is that a threat?"',
        nextSceneId: 'scene-5-escalation',
        xpBonus: 5,
        feedback: 'Calling it out, but also staying in it.',
        tactic: 'confront_threat',
      },
      {
        id: 'choice-5fast-c',
        text: 'Leave immediately without your stuff.',
        nextSceneId: 'scene-7-out',
        xpBonus: 10,
        feedback: 'Your safety matters more than belongings.',
        tactic: 'immediate_exit',
      },
    ],
  },

  // SCENE 5 VARIANT: Escalation
  {
    id: 'scene-5-escalation',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "Your defense gives them more to attack. They're pacing now, voice rising.",
        speakerId: 'drew',
        emotion: 'angry',
      },
      {
        text: '"You never said? You never SAID? You\'ve been pulling away for weeks. Don\'t act like this is out of nowhere."',
        speakerId: 'drew',
        emotion: 'angry',
      },
      {
        text: "Their hand hits the wall. Not a punch, but close. A warning.",
      },
      {
        
        text: "Time to go. Now.",
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'choice-5esc-a',
        text: 'Stop talking. Head for the door.',
        nextSceneId: 'scene-7-out',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'Reading the room. Getting out.',
        tactic: 'exit_danger',
      },
      {
        id: 'choice-5esc-b',
        text: '"I need to get my things first."',
        nextSceneId: 'scene-6-packing-tense',
        xpBonus: 5,
        feedback: "Risky. But you don't want to leave your stuff.",
        tactic: 'quick_pack',
      },
    ],
  },

  // SCENE 5 VARIANT: Full fight
  {
    id: 'scene-5-fight',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "You match their energy. Voices rise. This isn't a breakup anymore - it's a battlefield.",
        speakerId: 'drew',
        emotion: 'angry',
      },
      {
        text: 'Twenty minutes of screaming. Both of you saying things you can\'t take back. Things that will echo in your head for months.',
      },
      {
        
        text: "This isn't helping. This is just pain.",
        emotion: 'sad',
      },
    ],
    choices: [
      {
        id: 'choice-5fight-a',
        text: 'Stop. "I\'m done. I\'m leaving."',
        nextSceneId: 'scene-7-out',
        xpBonus: 10,
        feedback: 'Better late than never.',
        tactic: 'stop_fighting',
      },
      {
        id: 'choice-5fight-b',
        text: 'Keep fighting until something breaks.',
        nextSceneId: 'scene-5-aftermath',
        xpBonus: 0,
        feedback: 'You both will regret this.',
        tactic: 'burn_it_down',
      },
    ],
  },

  // SCENE 5 VARIANT: Fight aftermath
  {
    id: 'scene-5-aftermath',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "Silence. Both of you, drained. {ex} is crying again - real tears this time. So are you.",
      },
      {
        text: "Something in the room has shifted. It's broken now. Both of you know it.",
        speakerId: 'drew',
        emotion: 'sad',
      },
      {
        
        text: "The hard way. You chose the hard way.",
        emotion: 'sad',
      },
    ],
    nextSceneId: 'scene-7-out',
  },

  // SCENE 6: GETTING YOUR STUFF
  {
    id: 'scene-6-packing',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "You're pulling clothes from the closet. Your charger from the nightstand. {ex} stands in the doorway, watching.",
        speakerId: 'drew',
        emotion: 'sad',
      },
      {
        text: '"So that\'s it? You\'re really doing this?" A long pause. "Can we at least talk about this tomorrow? When we\'ve both calmed down?"',
        speakerId: 'drew',
        emotion: 'sad',
      },
      {
        
        text: "Don't leave anything behind. You don't want to have to come back.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-6a',
        text: '"No. I\'ve said what I needed to say."',
        nextSceneId: 'scene-7-out',
        xpBonus: 15,
        isOptimal: true,
        feedback: "Focused. Don't get drawn back in.",
        tactic: 'stay_focused',
      },
      {
        id: 'choice-6b',
        text: '"Fine. We can talk tomorrow."',
        nextSceneId: 'scene-6-tomorrow-trap',
        xpBonus: 0,
        feedback: "TRAP: Tomorrow they'll be calm, sweet, promising change.",
        tactic: 'tomorrow',
      },
      {
        id: 'choice-6c',
        text: 'Grab essentials. Leave the rest.',
        nextSceneId: 'scene-7-out',
        xpBonus: 10,
        feedback: "You got out. But your stuff is still there - a tie that binds.",
        tactic: 'quick_exit',
      },
      {
        id: 'choice-6d',
        text: '"My friend is going to help me get the rest."',
        nextSceneId: 'scene-6-morgan',
        xpBonus: 12,
        feedback: 'Witness. Backup. Smart.',
        tactic: 'bring_backup',
      },
    ],
  },

  // SCENE 6 VARIANT: Tense packing
  {
    id: 'scene-6-packing-tense',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "You're moving fast, grabbing what you can. {ex} is watching, arms crossed. The energy is dangerous.",
        speakerId: 'drew',
        emotion: 'cold',
      },
      {
        text: '"Take it all. Take everything. See if I care."',
        speakerId: 'drew',
        emotion: 'angry',
      },
      {
        
        text: "Quick. In and out. Don't engage.",
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'choice-6tense-a',
        text: 'Grab essentials only. Get out fast.',
        nextSceneId: 'scene-7-out',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'Speed over completeness. Smart read.',
        tactic: 'quick_safe',
      },
      {
        id: 'choice-6tense-b',
        text: 'Be thorough. Get everything.',
        nextSceneId: 'scene-6-thorough-risk',
        xpBonus: 5,
        feedback: "Taking your time in a tense situation. Risky.",
        tactic: 'thorough_risky',
      },
    ],
  },

  // SCENE 6 VARIANT: Thorough but risky
  {
    id: 'scene-6-thorough-risk',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "You're taking your time, making sure you have everything. {ex}'s patience is wearing thin.",
        speakerId: 'drew',
        emotion: 'angry',
      },
      {
        text: '"Just go already. Get out of my sight." They grab a photo of you two from the shelf and throws it in the trash. "There. Take that too."',
        speakerId: 'drew',
        emotion: 'cold',
      },
    ],
    nextSceneId: 'scene-7-out',
  },

  // SCENE 6 VARIANT: Tomorrow trap
  {
    id: 'scene-6-tomorrow-trap',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "{ex}'s whole energy shifts. Relief floods their face. You just gave them a lifeline.",
        speakerId: 'drew',
        emotion: 'happy',
      },
      {
        text: '"Tomorrow. Okay. We\'ll talk tomorrow. Get some sleep. I love you."',
        speakerId: 'drew',
        emotion: 'happy',
      },
      {
        
        text: "Tomorrow they'll be calm and loving. And you'll question everything.",
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'choice-6tom-a',
        text: '"Wait. No. I\'m not coming back."',
        nextSceneId: 'scene-7-out',
        xpBonus: 10,
        feedback: 'Catching yourself. Good.',
        tactic: 'catch_self',
      },
      {
        id: 'choice-6tom-b',
        text: 'Leave. See what tomorrow brings.',
        nextSceneId: 'ending-cycle',
        xpBonus: 0,
        feedback: 'Tomorrow brings the cycle. You know this.',
        tactic: 'wait_tomorrow',
      },
    ],
  },

  // SCENE 6 VARIANT: Morgan comes
  {
    id: 'scene-6-morgan',
    backgroundId: 'apartment',
    dialog: [
      {
        text: 'You text {bestfriend}. Fifteen minutes later, they\'re at the door. {ex} stiffens at the sight of them.',
        speakerId: 'drew',
        emotion: 'angry',
      },
      {
        text: '"Really? You brought backup?" {ex} laughs, but it\'s hollow. "Fine. Get your stuff. Both of you."',
        speakerId: 'drew',
        emotion: 'cold',
      },
      {
        text: '{bestfriend} doesn\'t engage. Just helps you pack. In and out in ten minutes. Clean.',
        speakerId: 'morgan',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'scene-7-out',
  },

  // SCENE 7: OUT THE DOOR
  {
    id: 'scene-7-out',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "The door closes behind you. The hallway is quiet. You did it.",
      },
      {
        text: "Your phone is already buzzing. You don't have to look to know who it is. The hard part is supposed to be over.",
      },
      {
        text: "It's not.",
      },
    ],
    nextSceneId: 'scene-8-text-flood',
  },
];
