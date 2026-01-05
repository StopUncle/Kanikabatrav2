import type { ForkScene } from '../../../types';

export const goodEnding: ForkScene = {
  id: 'ending-success',
  backgroundId: 'apartment',
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'Balance Maintained',
  endingSummary: 'You navigated the study group successfully. Your notes are yours, you made no promises you can\'t keep, and Casey is proving to be a genuine friend. Midterms will be fine.',
  dialog: [
    { speakerId: null, text: 'Later, you review your notes. All intact. All yours.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Collaboration doesn\'t mean exploitation. You know the difference now.', emotion: 'knowing' },
  ],
};

export const stolenEnding: ForkScene = {
  id: 'ending-stolen',
  backgroundId: 'office',
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'Notes Borrowed Permanently',
  endingSummary: 'Marcus submitted an essay that looks remarkably like your notes. Same examples. Same structure. You can\'t prove anything, but you know. Next time, protect your work.',
  dialog: [
    { speakerId: null, text: 'After the midterm, you see Marcus\'s graded essay. It\'s familiar.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'He didn\'t borrow your notes. He copied your thoughts.', emotion: 'angry' },
  ],
};

export const promiseEnding: ForkScene = {
  id: 'ending-promise',
  backgroundId: 'text-screen',
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'Promises Have Costs',
  endingSummary: 'Lisa keeps texting about when she\'ll meet Maris. You can\'t deliver. Eventually she tells others you\'re "all talk." Your reputation shifts—someone who promises but doesn\'t deliver.',
  dialog: [
    { speakerId: null, text: 'Lisa\'s texts get more frequent. More demanding.', emotion: 'neutral' },
    { speakerId: null, text: '"So when is the introduction? You said you\'d help..."', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'You promised something that wasn\'t yours to give.', emotion: 'sad' },
  ],
};

export const allEndings: ForkScene[] = [goodEnding, stolenEnding, promiseEnding];
