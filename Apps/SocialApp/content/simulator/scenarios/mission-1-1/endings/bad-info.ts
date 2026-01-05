import type { ForkScene } from '../../../types';

export const badInfoEnding: ForkScene = {
  id: 'ending-info-fail',
  backgroundId: 'coffee-shop',
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'Information Weaponized',
  endingSummary: 'You shared private information with someone who shouldn\'t have it. Whether it was the unknown texter or Dana Morrison, the result is the same—your words have been twisted and spread. You\'re now known as someone who can\'t keep secrets.',
  dialog: [
    {
      speakerId: null,
      text: 'Within days, a distorted version of what you said is campus gossip.',
      emotion: 'neutral',
    },
    {
      speakerId: null,
      text: 'People look at you differently now. Not with respect—with caution.',
      emotion: 'neutral',
    },
    {
      speakerId: null,
      text: 'Dana texts with fake sympathy: "OMG I heard! That\'s SO unfair."',
      emotion: 'neutral',
    },
    {
      speakerId: null,
      text: 'Maris unfollowed you. Three months of careful positioning—gone.',
      emotion: 'neutral',
    },
    {
      speakerId: 'inner-voice',
      text: 'You handed them the knife. They didn\'t hesitate.',
      emotion: 'sad',
    },
  ],
};
