import type { ForkScene } from '../../../types';

/**
 * Club Path - Arrival scenes
 * How you enter sets your frame
 */
export const arrivalScenes: ForkScene[] = [
  {
    id: 'club-arrival',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'club',
    chapter: { name: 'Mission 1: The Club', index: 1, total: 5 },
    mood: 'party',
    dialog: [
      {
        text: 'The Velvet Room. Bass thumps through the walls. A line wraps around the block.',
      },
      {
        text: 'Blake\'s already inside. He texted: "VIP section. Tyler\'s corner. Come find me."',
      },
      {
        text: 'The bouncer looks you over. Arms crossed. Face unreadable.',
      },
    ],
    nextSceneId: 'club-bouncer',
  },
  {
    id: 'club-bouncer',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'club',
    mood: 'tense',
    dialog: [
      {
        text: '"Name?"',
        speakerId: 'bouncer',
        emotion: 'neutral',
      },
      {
        text: 'He doesn\'t look up from his list.',
      },
      {
        text: 'Frame check. How you handle this sets the tone for everything after.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'bouncer-trap',
        text: '"I\'m on Tyler\'s list! He personally invited me. Check again, please?"',
        nextSceneId: 'club-bouncer-dismissed',
        isOptimal: false,
        tactic: 'supplication',
        reaction: {
          text: 'His eyes flick up. Then back down. Disinterest.',
          emotion: 'cold',
          bodyLanguage: 'He\'s already looking past you.',
          scoreImpact: -15,
        },
      },
      {
        id: 'bouncer-subtle',
        text: '"I\'m meeting Blake Rivera. He\'s already inside."',
        nextSceneId: 'club-bouncer-standard',
        isOptimal: false,
        tactic: 'social-proof',
        reaction: {
          text: '"Blake. Sure." He checks. Nods. Steps aside.',
          emotion: 'neutral',
          bodyLanguage: 'Functional, not impressed.',
          scoreImpact: 0,
        },
      },
      {
        id: 'bouncer-close',
        text: '"Tyler Vance is expecting me."',
        nextSceneId: 'club-bouncer-noticed',
        isOptimal: false,
        tactic: 'name-drop',
        reaction: {
          text: 'His eyebrow raises slightly. "Tyler\'s expecting a lot of people."',
          emotion: 'smirking',
          bodyLanguage: 'Testing you now.',
          scoreImpact: 5,
        },
      },
      {
        id: 'bouncer-optimal',
        text: 'Give your name. Wait. Don\'t explain.',
        nextSceneId: 'club-bouncer-respect',
        isOptimal: true,
        tactic: 'frame-control',
        reaction: {
          text: 'He checks. Pauses. Looks up properly for the first time. "Go ahead."',
          emotion: 'neutral',
          bodyLanguage: 'The confidence registered.',
          scoreImpact: 10,
        },
      },
    ],
  },
  // Branch scenes based on bouncer interaction
  {
    id: 'club-bouncer-dismissed',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'club',
    dialog: [
      {
        text: '"End of the line."',
        speakerId: 'bouncer',
        emotion: 'cold',
      },
      {
        text: 'He\'s already looking at the next person. You\'ve been categorized: desperate.',
      },
      {
        text: 'You wait. Twenty minutes. Finally get in. The frame is already set against you.',
      },
    ],
    nextSceneId: 'club-floor-low-status',
  },
  {
    id: 'club-bouncer-standard',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'club',
    dialog: [
      {
        text: 'Inside. The bass hits your chest. Lights strobe across the crowd.',
      },
      {
        text: 'You\'re in, but you\'re one of many. Nothing special. Nothing memorable.',
      },
    ],
    nextSceneId: 'club-floor-normal',
  },
  {
    id: 'club-bouncer-noticed',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'club',
    dialog: [
      {
        text: '"If Tyler\'s expecting you, he\'ll come find you. Bar\'s that way."',
        speakerId: 'bouncer',
        emotion: 'smirking',
      },
      {
        text: 'Not VIP. But not dismissed either. Interesting middle ground.',
      },
    ],
    nextSceneId: 'club-floor-normal',
  },
  {
    id: 'club-bouncer-respect',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'club',
    dialog: [
      {
        text: 'Inside. He didn\'t just let you in. He noted you. That matters.',
      },
      {
        text: 'The Velvet Room opens up. Crimson lights. Gold accents. The VIP section elevated above the crowd like a throne room.',
      },
      {
        text: 'Tyler\'s there. Holding court. Gesturing dramatically. Everyone\'s watching him.',
      },
    ],
    nextSceneId: 'club-floor-high-status',
  },
];
