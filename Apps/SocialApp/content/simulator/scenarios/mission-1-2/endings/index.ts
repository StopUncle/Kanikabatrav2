import type { ForkScene } from '../../../types';

export const goodEnding: ForkScene = {
  id: 'ending-success',
  backgroundId: 'apartment',
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'Currents Read',
  endingSummary: 'You\'re learning to read the social currents. Dana is on your radar now—and you\'re on hers. Alex\'s jealousy is contained for now. Priya and Jordan are potential allies. The landscape is clearer.',
  dialog: [
    { speakerId: null, text: 'Back in your dorm, you review the day. Dana. Alex. The whispers.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'The gala put you in play. Now you\'re learning the game.', emotion: 'knowing' },
  ],
};

export const danaWinsEnding: ForkScene = {
  id: 'ending-dana-wins',
  backgroundId: 'restaurant',
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'Dana\'s Source',
  endingSummary: 'You gave Dana what she wanted. Within a week, distorted versions of what you shared are campus gossip. Dana acts sympathetic while you deal with the fallout. You\'ve become her unwitting source.',
  dialog: [
    { speakerId: null, text: 'Days later, you hear your own words repeated back to you. Twisted.', emotion: 'neutral' },
    { speakerId: 'dana', text: '"Oh no, that\'s terrible! Who would spread rumors like that?"', emotion: 'sad' },
    { speakerId: 'inner-voice', text: 'Her. She would. And you handed her the ammunition.', emotion: 'angry' },
  ],
};

export const alexSceneEnding: ForkScene = {
  id: 'ending-alex-scene',
  backgroundId: 'park',
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'Public Spectacle',
  endingSummary: 'Alex made a scene. Phones were out. Within hours, everyone has their version of what happened—and you\'re the villain in all of them.',
  dialog: [
    { speakerId: null, text: 'People are staring. Phones are out. Someone is definitely recording.', emotion: 'neutral' },
    { speakerId: null, text: 'By evening, the video has 200 shares. Comments calling you fake. Toxic. Clout chaser.', emotion: 'neutral' },
    { speakerId: null, text: 'Maris\'s assistant texts: "Given recent events, the invitation has been reconsidered."', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'The gala doesn\'t matter now. Nobody remembers that part.', emotion: 'sad' },
  ],
};

export const allEndings: ForkScene[] = [goodEnding, danaWinsEnding, alexSceneEnding];
