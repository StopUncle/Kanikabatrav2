import type { ForkScene } from '../../../types';

/**
 * Mission 11: The Entrance - Gatekeepers
 * Guest list dynamics, proving you belong
 */
export const gatekeepersScenes: ForkScene[] = [
  {
    id: 'gala-checkin',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'entrance',
    chapter: { name: 'The Entrance', index: 2, total: 5 },
    dialog: [
      {
        text: 'You give your name. She scans the list.',
      },
      {
        text: 'A pause. Longer than comfortable.',
      },
      {
        text: '"Ah. Yes. You\'re on the... supplemental list."',
      },
      {
        text: 'Supplemental. Translation: not the A-list.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'checkin-trap',
        text: '"Is there a problem?"',
        nextSceneId: 'gala-checkin-defensive',
        isOptimal: false,
        tactic: 'defensive',
        reaction: {
          text: '"No problem at all." Her smile is ice. "Please proceed."',
          emotion: 'cold',
          bodyLanguage: 'You showed insecurity. She filed it away.',
          scoreImpact: -10,
        },
      },
      {
        id: 'checkin-subtle',
        text: 'Wait silently. Let her do her job.',
        nextSceneId: 'gala-checkin-patient',
        isOptimal: false,
        tactic: 'patience',
        reaction: {
          text: 'She hands you a name badge. Standard issue.',
          emotion: 'neutral',
          bodyLanguage: 'You didn\'t engage. No points lost. None gained.',
          scoreImpact: 0,
        },
      },
      {
        id: 'checkin-close',
        text: '"Kai Chen\'s guest. She should have mentioned."',
        nextSceneId: 'gala-checkin-namedrop',
        isOptimal: false,
        tactic: 'name-dropping',
        reaction: {
          text: 'Her eyebrow lifts slightly. "I see. Right this way."',
          emotion: 'neutral',
          bodyLanguage: 'You used Kai\'s name. Now you owe her.',
          scoreImpact: 5,
        },
      },
      {
        id: 'checkin-optimal',
        text: '"Supplemental means Victoria added me personally. I presume that\'s higher, not lower."',
        nextSceneId: 'gala-checkin-confident',
        isOptimal: true,
        tactic: 'reframe',
        reaction: {
          text: 'A flicker of respect. "Of course. My apologies. Right this way."',
          emotion: 'neutral',
          bodyLanguage: 'You rewrote the narrative. She adjusted.',
          scoreImpact: 15,
        },
      },
    ],
  },
  {
    id: 'gala-checkin-defensive',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'entrance',
    dialog: [
      {
        text: 'Blake follows, badge in hand.',
      },
      {
        text: '"That was a little tense."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: '"It\'s fine."',
      },
      {
        text: '"Sure." He doesn\'t sound sure.',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: 'Already making enemies. Slow down.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'gala-inner-entrance',
  },
  {
    id: 'gala-checkin-patient',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'entrance',
    dialog: [
      {
        text: 'Badge attached. Anonymous among the guests.',
      },
      {
        text: '"Well, we\'re in." Blake looks around.',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: '"We\'re in the lobby. The party\'s through there."',
      },
      {
        text: 'You point to the double doors. Light and music beyond.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'gala-inner-entrance',
  },
  {
    id: 'gala-checkin-namedrop',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'entrance',
    dialog: [
      {
        text: 'The treatment improves slightly. Not dramatically.',
      },
      {
        text: '"Miss Chen is already inside. She asked me to tell you to find her when you arrived."',
      },
      {
        text: '"Thank you."',
      },
      {
        text: 'Kai is watching. Managing. You\'re her project tonight.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'gala-inner-entrance',
  },
  {
    id: 'gala-checkin-confident',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'entrance',
    dialog: [
      {
        text: 'Better treatment. A real smile, even.',
      },
      {
        text: '"Mrs. Ashworth takes a personal interest in her special guests. Please, let me escort you."',
      },
      {
        text: 'She walks ahead. Blake whispers.',
      },
      {
        text: '"What was that? You just... rewrote reality."',
        speakerId: 'blake',
        emotion: 'curious',
      },
      {
        text: 'Perception is reality. She perceived what I told her to.',
        speakerId: 'inner-voice',
        emotion: 'smirking',
      },
    ],
    nextSceneId: 'gala-inner-entrance',
  },
  {
    id: 'gala-inner-entrance',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'entrance',
    mood: 'professional',
    dialog: [
      {
        text: 'The double doors open. The ballroom.',
      },
      {
        text: 'Hundreds of guests. String quartet. Champagne towers. Laughter that sounds like money.',
      },
      {
        text: 'And everywhere, eyes. Evaluating. Calculating. Judging.',
      },
      {
        text: 'A man in a crisp tuxedo approaches. Silver hair. Warm smile. Charles Whitmore. The host.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'gala-charles-greet',
  },
  {
    id: 'gala-charles-greet',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'entrance',
    dialog: [
      {
        text: '"Welcome, welcome! Always wonderful to see new faces."',
        speakerId: 'charles',
        emotion: 'happy',
      },
      {
        text: 'His handshake is genuine. His smile is genuine. He might be the only genuine thing here.',
      },
      {
        text: '"I don\'t believe we\'ve met. I\'m Charles. This is my home. Our home, tonight."',
        speakerId: 'charles',
        emotion: 'happy',
      },
      {
        text: 'Harmless. Oblivious. The perfect front for whatever\'s really happening.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'charles-trap',
        text: '"Such a beautiful home. You must be so proud."',
        nextSceneId: 'gala-charles-flattered',
        isOptimal: false,
        tactic: 'flattery',
        reaction: {
          text: '"Oh, it\'s really Victoria\'s vision. I just sign the checks!" He laughs.',
          emotion: 'happy',
          bodyLanguage: 'He revealed the power structure. Accidentally.',
          scoreImpact: 5,
        },
      },
      {
        id: 'charles-subtle',
        text: '"Thank you for having us. Kai Chen spoke highly of your events."',
        nextSceneId: 'gala-charles-connection',
        isOptimal: false,
        tactic: 'connection',
        reaction: {
          text: '"Kai! Wonderful girl. Any friend of Kai\'s, you know."',
          emotion: 'happy',
          bodyLanguage: 'Safe play. You used a known quantity.',
          scoreImpact: 5,
        },
      },
      {
        id: 'charles-close',
        text: '"I\'d love to learn more about the foundation\'s work."',
        nextSceneId: 'gala-charles-charity',
        isOptimal: false,
        tactic: 'interest',
        reaction: {
          text: '"Oh, that\'s Victoria\'s department. I just show up and smile!"',
          emotion: 'happy',
          bodyLanguage: 'He deflects to his wife. Always.',
          scoreImpact: 0,
        },
      },
      {
        id: 'charles-optimal',
        text: '"Charles, I\'ve heard you\'re the heart of these events. The real host."',
        nextSceneId: 'gala-charles-touched',
        isOptimal: true,
        tactic: 'genuine-recognition',
        reaction: {
          text: 'He pauses. Something softer in his eyes. "That\'s... that\'s very kind."',
          emotion: 'happy',
          bodyLanguage: 'You saw him. Not the role. He\'ll remember that.',
          scoreImpact: 15,
        },
      },
    ],
  },
  {
    id: 'gala-charles-flattered',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'entrance',
    dialog: [
      {
        text: '"Victoria should be around here somewhere. Ah! There she is."',
        speakerId: 'charles',
        emotion: 'happy',
      },
      {
        text: 'He waves toward a woman across the room. Elegant. Cold. Watching.',
      },
      {
        text: '"She\'ll want to meet you. She always wants to meet the new ones."',
        speakerId: 'charles',
        emotion: 'neutral',
      },
      {
        text: 'The new ones. How many have there been?',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'gala-room-scan',
  },
  {
    id: 'gala-charles-connection',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'entrance',
    dialog: [
      {
        text: '"Oh yes, Kai is a treasure. Intense, but talented. You\'ll go far with her as a friend."',
        speakerId: 'charles',
        emotion: 'happy',
      },
      {
        text: '"Or as an enemy?"',
      },
      {
        text: 'He laughs, but his eyes flicker. "Let\'s hope it never comes to that."',
        speakerId: 'charles',
        emotion: 'neutral',
      },
      {
        text: 'Even he knows. Kai is dangerous. He just won\'t say it directly.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'gala-room-scan',
  },
  {
    id: 'gala-charles-charity',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'entrance',
    dialog: [
      {
        text: '"The Whitmore Foundation supports education initiatives. Scholarships mostly."',
        speakerId: 'charles',
        emotion: 'neutral',
      },
      {
        text: '"But between us..." He leans in. "Most people are here for the networking."',
        speakerId: 'charles',
        emotion: 'smirking',
      },
      {
        text: 'At least he\'s honest about it.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'gala-room-scan',
  },
  {
    id: 'gala-charles-touched',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'entrance',
    dialog: [
      {
        text: '"You know, not many people notice. They see the house, the money. But this? This is about bringing people together."',
        speakerId: 'charles',
        emotion: 'happy',
      },
      {
        text: 'He grips your shoulder. Genuine warmth.',
      },
      {
        text: '"If you need anything tonight. Anything at all. You come find me."',
        speakerId: 'charles',
        emotion: 'serious',
      },
      {
        text: 'An ally. An unexpected one. Hold onto that.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'gala-room-scan',
  },
];
