import type { ForkScene } from '../../../types';

/**
 * Party Path - Failure Branches
 * Maris rejection scenes when player makes obviously bad choices
 * Note: Maris doesn't rage like a narcissist - she dismisses with grace, then destroys quietly
 */
export const failureBranchScenes: ForkScene[] = [
  // ============================================
  // DISRESPECT EXIT - From first-encounter (encounter-disrespect)
  // ============================================
  {
    id: 'maris-disrespect-exit',
    backgroundId: 'party',
    sceneType: 'dialogue',
    pathId: 'party',
    mood: 'cold',
    dialog: [
      {
        text: 'Maris\'s smile doesn\'t waver. If anything, it becomes more perfect. More fixed.',
      },
      {
        text: '"Daddy\'s money." She tilts her head, curious. "That\'s what you think this is?"',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: 'She laughs—light, musical, completely empty.',
      },
      {
        text: '"Sweetie. I\'ve built more connections in three years than most people build in a lifetime. With my own charm. My own work."',
        speakerId: 'maris',
        emotion: 'cold',
      },
      {
        text: 'She\'s not angry. That\'s worse. Anger you can work with. This is... nothing.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'ending-maris-disrespect',
  },
  {
    id: 'ending-maris-disrespect',
    backgroundId: 'party',
    sceneType: 'ending',
    pathId: 'party',
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'Erased',
    endingSummary: 'You tried to reduce Maris to her family money. She didn\'t get angry—she just stopped seeing you. Within minutes, you notice people avoiding eye contact. Conversations end when you approach. You haven\'t been kicked out. You\'ve been erased. That\'s worse.',
    dialog: [
      {
        text: 'Maris pats your arm gently. The way you\'d comfort a confused child.',
      },
      {
        text: '"Enjoy the party. What\'s left of it for you." She glides away, already laughing with someone else.',
        speakerId: 'maris',
        emotion: 'happy',
      },
      {
        text: 'You haven\'t been thrown out. You just... stopped existing.',
      },
    ],
  },

  // ============================================
  // CHALLENGE EXIT - From escalation (balcony-challenge)
  // ============================================
  {
    id: 'maris-challenge-exit',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'party',
    mood: 'cold',
    shakeOnEntry: 'threat',
    dialog: [
      {
        text: 'Maris goes very still. Her smile stays. Her eyes empty.',
      },
      {
        text: '"A performance." She repeats it. Considers it. "You think you\'ve figured me out."',
        speakerId: 'maris',
        emotion: 'cold',
      },
      {
        text: 'She sets down her drink carefully. Each movement precise.',
      },
      {
        text: '"Here\'s what I see. Someone who spent all night trying to get close to me. And when they realized they weren\'t special enough..." Her smile sharpens. "They got mean."',
        speakerId: 'maris',
        emotion: 'cold',
      },
      {
        text: 'You called her out. She just made you look bitter.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'ending-maris-challenge',
  },
  {
    id: 'ending-maris-challenge',
    backgroundId: 'apartment',
    sceneType: 'ending',
    pathId: 'party',
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'Reframed',
    endingSummary: 'You tried to expose Maris\'s manipulation. She turned it around in seconds—now you\'re the one who looks jealous and bitter. By tomorrow, the story won\'t be about what you saw. It\'ll be about the new student who couldn\'t handle rejection gracefully.',
    dialog: [
      {
        text: 'Maris opens the balcony door. The party noise floods back.',
      },
      {
        text: '"I hope you find what you\'re looking for." Her voice is kind. Pitying. "Just... not here. Not with me."',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: 'She steps inside without looking back. The door closes softly. Final.',
      },
    ],
  },

  // ============================================
  // EXPOSE EXIT - From ticket-moment (ticket-expose)
  // ============================================
  {
    id: 'maris-expose-exit',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'party',
    mood: 'cold',
    dialog: [
      {
        text: 'For one fraction of a second, something flickers behind Maris\'s eyes. Recognition. Then it\'s gone.',
      },
      {
        text: 'Her smile stays perfectly warm. But she\'s stopped breathing for just a moment.',
      },
      {
        text: '"Classic manipulation." She laughs softly. "That\'s very... observant of you."',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: 'The envelope disappears back into her clutch. She doesn\'t seem angry. She seems... curious.',
      },
      {
        text: '"You know what\'s funny? I was actually going to give it to you." She tilts her head. "I wonder if that was true. Now we\'ll never know."',
        speakerId: 'maris',
        emotion: 'cold',
      },
      {
        text: 'You were right. You saw through her. And now she\'ll never forgive you for it.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'ending-maris-expose',
  },
  {
    id: 'ending-maris-expose',
    backgroundId: 'apartment',
    sceneType: 'ending',
    pathId: 'party',
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'Marked',
    endingSummary: 'You saw through Maris Caldwell. You named her tactics. And that\'s the one thing she\'ll never forgive. She won\'t come after you publicly—that\'s not her style. But every door will start closing. Every opportunity will just miss. You won\'t be able to prove it was her. That\'s the point.',
    dialog: [
      {
        text: 'Maris studies you for a long moment. Something calculating behind her eyes.',
      },
      {
        text: '"You\'re interesting." She sounds almost genuine. "Most people don\'t see clearly. You do."',
        speakerId: 'maris',
        emotion: 'curious',
      },
      {
        text: 'She steps closer. Close enough to whisper.',
      },
      {
        text: '"That\'s going to make your life here... complicated."',
        speakerId: 'maris',
        emotion: 'cold',
      },
      {
        text: 'She walks away. You won this battle. You just lost the war.',
      },
    ],
  },
];
