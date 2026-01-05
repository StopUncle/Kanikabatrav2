// Good Endings for The Layoff Lottery

import type { Scene } from '../../../types';

export const goodEndings: Scene[] = [
  // The Protected - survived because someone advocated
  {
    id: 'ending-protected',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Later, you learn what happened.',
      },
      {
        text: 'Your name was on the initial list. Marcus took it off.',
      },
      {
        text: 'He said, "We need them for Q4." End of discussion.',
        speakerId: 'chen',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'ending-protected-b',
  },
  {
    id: 'ending-protected-b',
    backgroundId: 'office',
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Protected',
    endingSummary: 'Your sponsor made the difference. In layoffs, protection beats performance.',
    dialog: [
      {
        text: 'The sponsor made the difference. Not your work. Not your tenure.',
      },
      {
        text: 'A powerful person said your name in a room. That\'s what saved you.',
      },
      {
        text: 'Build those relationships before you need them.',
        
      },
    ],
  },

  // The Promoted - survived and moved up
  {
    id: 'ending-promoted',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Two months after the layoffs.',
      },
      {
        text: 'Director position opens—created by the restructure.',
      },
      {
        text: 'You impressed me during the downsizing. You handled pressure well. I want you for this.',
        speakerId: 'marcus',
        emotion: 'happy',
      },
    ],
    nextSceneId: 'ending-promoted-b',
  },
  {
    id: 'ending-promoted-b',
    backgroundId: 'meeting-room',
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Promoted',
    endingSummary: 'Layoffs created vacuums. You filled them. Those who survive with reputation intact often rise faster than before.',
    dialog: [
      {
        text: 'Layoffs create vacuums. Vacuums create opportunities.',
      },
      {
        text: 'Those who survive with reputation intact often rise faster than before.',
        
      },
    ],
  },

  // The Graceful Exit - cut, but handled well
  {
    id: 'ending-graceful',
    backgroundId: 'apartment',
    dialog: [
      {
        text: 'Three months later. New job. 20% raise.',
      },
      {
        text: 'Your former colleague reaches out.',
      },
      {
        text: 'I heard you landed well. Good for you.',
        speakerId: 'colleague',
        emotion: 'happy',
      },
    ],
    nextSceneId: 'ending-graceful-b',
  },
  {
    id: 'ending-graceful-b',
    backgroundId: 'apartment',
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Graceful Exit',
    endingSummary: 'Getting cut wasn\'t failure. It was redirection. How you leave matters—graceful exits become future opportunities.',
    dialog: [
      {
        text: 'Getting cut wasn\'t failure. It was redirection.',
      },
      {
        text: 'How you leave matters. Graceful exits become future opportunities.',
        
      },
    ],
  },
];
