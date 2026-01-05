import type { ForkScene } from '../../../types';

export const badBragEnding: ForkScene = {
  id: 'ending-brag-fail',
  backgroundId: 'apartment',
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'Word Travels Fast',
  endingSummary: 'You bragged about your connection to Maris. By evening, the story had grown, twisted, and reached her ears. You\'ve been marked as someone who talks too much. That reputation will cost you.',
  dialog: [
    {
      speakerId: null,
      text: 'Maris\'s text burns in your memory.',
      emotion: 'neutral',
    },
    {
      speakerId: null,
      text: '"Heard you\'ve been telling people we\'re close friends. Interesting."',
      emotion: 'neutral',
    },
    {
      speakerId: 'inner-voice',
      text: 'You wanted to feel important. Now you feel exposed.',
      emotion: 'sad',
    },
    {
      speakerId: null,
      text: 'The doors that opened last night just slammed shut.',
      emotion: 'neutral',
    },
  ],
};
