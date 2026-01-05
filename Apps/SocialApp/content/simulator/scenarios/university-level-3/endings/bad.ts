import type { ForkScene } from '../../../types';

/**
 * Bad Endings - Failure outcomes
 */
export const badEndings: ForkScene[] = [
  {
    id: 'ending-bad-retreat',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'ending',
    mood: 'cold',
    dialog: [
      {
        text: 'One week later. Your apartment. Silence.',
      },
      {
        text: 'Kai hasn\'t called. Blake is distant. The door closed.',
      },
      {
        text: 'You left when it mattered. Everyone knows.',
      },
      {
        text: 'Phone rings. Unknown number. You don\'t answer.',
      },
      {
        text: 'Retreat. The safest choice. The end of opportunity.',
        speakerId: 'inner-voice',
        emotion: 'sad',
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Retreat',
    endingSummary: 'You left when things got dangerous. Safe? Yes. But the doors are closed now. Trust broken. Opportunity lost. The game continues without you.',
  },
  {
    id: 'ending-bad-burned',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'ending',
    mood: 'tense',
    dialog: [
      {
        text: 'Two days later. Kai\'s voicemail.',
      },
      {
        text: '"Victoria knows you were playing both sides. She told Maris. Maris is... not pleased."',
        speakerId: 'kai',
        emotion: 'concerned',
      },
      {
        text: '"I\'d lay low if I were you. Very low. For a long time."',
        speakerId: 'kai',
        emotion: 'serious',
      },
      {
        text: 'Click. The call ends. The silence is deafening.',
      },
      {
        text: 'Both sides. Neither side. Alone.',
        speakerId: 'inner-voice',
        emotion: 'cold',
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Double Agent',
    endingSummary: 'You tried to play both sides. They found out. Both factions now see you as a threat. Not an asset. A problem. And problems get solved.',
  },
  {
    id: 'ending-bad-exposed',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ending',
    mood: 'tense',
    dialog: [
      {
        text: 'The morning after. Headlines.',
      },
      {
        text: '"Gala Confrontation: Unknown Guest Causes Scene"',
      },
      {
        text: 'Your face. Your name. In the society pages. For the wrong reasons.',
      },
      {
        text: 'Phone buzzes. Text from Kai: "We need to talk. This is serious."',
      },
      {
        text: 'Public. Permanent. The wrong kind of famous.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Spectacle',
    endingSummary: 'You made a scene. The wrong kind. Everyone remembers you now. Not as a player. As a problem. Reputation destroyed before it was built.',
  },
  {
    id: 'ending-bad-enemy',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'ending',
    mood: 'cold',
    dialog: [
      {
        text: 'One month later. A letter arrives.',
      },
      {
        text: 'Heavy paper. No return address. Inside: a single card.',
      },
      {
        text: '"We remember what you did. - V.A."',
      },
      {
        text: 'Victoria Ashworth. A promise. Not a threat. Worse than a threat.',
      },
      {
        text: 'An enemy for life. The most dangerous kind.',
        speakerId: 'inner-voice',
        emotion: 'cold',
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Enemy',
    endingSummary: 'You made a powerful enemy. Victoria Ashworth doesn\'t forget. Doesn\'t forgive. The game continues. But now you\'re playing defense. Forever.',
  },
];
