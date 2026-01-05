import type { Scene } from '../../../types';

export const badEndings: Scene[] = [
  {
    id: 'ending-forgettable',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "The dinner ends. You played it safe all night, never venturing an opinion, never taking a risk.",
      },
      {
        text: "Victor barely remembers your name as he says goodbye. You were background noise.",
      },
      {
        text: "Safe is forgettable at this level. These people take calculated risks every day. They respect those who do the same.",
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Forgettable Guest',
    endingSummary: "You were so focused on not making mistakes that you failed to make any impression at all. In rooms like this, being forgettable is worse than being controversial.",
  },
  {
    id: 'ending-over-reached',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "The room has grown cold. Your attempt to impress backfired spectacularly.",
      },
      {
        text: "Alexandra's smirk says it all. You tried to punch above your weight and got knocked down.",
      },
      {
        text: '"I think we should call it an evening."',
        speakerId: 'victor',
        emotion: 'cold',
      },
      {
        text: "Ambition without calibration. You aimed high but missed the target entirely.",
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Over-Reach',
    endingSummary: "You pushed too hard, too fast. These people can smell desperation, and you reeked of it. The doors that might have opened are now firmly closed.",
  },
  {
    id: 'ending-embarrassment',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "The silence is deafening. You've said something unforgivable.",
      },
      {
        text: "Victoria's face is a mask of polite horror. James has suddenly found his napkin fascinating.",
      },
      {
        text: '"I think we are done here."',
        speakerId: 'victor',
        emotion: 'cold',
      },
      {
        text: "The dinner is not just over. Your reputation in these circles might never recover.",
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Social Catastrophe',
    endingSummary: "You committed a fatal social error that cannot be walked back. Word travels fast in elite circles. This dinner will follow you for years.",
  },
];
