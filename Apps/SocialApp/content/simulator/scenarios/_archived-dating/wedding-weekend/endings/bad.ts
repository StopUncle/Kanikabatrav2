// Bad Endings (4)
// Walk Away, Reset, Survivor, Early Exit

import type { Scene } from '../../../types';

export const badEndings: Scene[] = [
  {
    id: 'ending-walk-away',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "You find {boyfriend} on the dance floor. \"We need to talk.\" His face falls. He knows what's coming.",
      },
      {
        text: "\"I can't do this,\" you tell him. \"Not the weekend. This. Us. I deserve someone who fights for me.\" He doesn't argue. That tells you everything.",
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Walk Away',
    endingSummary: "You left. It hurt, but it was the right call. A partner who won't defend you at a wedding won't defend you anywhere. Some lessons you learn the hard way. But at least you learned.",
  },
  {
    id: 'ending-reset',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "You find {boyfriend}. \"I need you to see what almost happened this weekend. What you almost lost.\"",
        speakerId: 'ethan',
        emotion: 'confused',
      },
      {
        text: "His face crumbles. \"I know. I know.\" He pulls you close. \"I'm sorry. I'm so sorry.\" It's a start. Maybe it's enough. Maybe it isn't. But he's finally paying attention.",
        speakerId: 'ethan',
        emotion: 'sad',
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Reset',
    endingSummary: "You showed him the cliff edge. How close he came to losing you. Whether he remembers that lesson depends on what comes next. The real test starts tomorrow, back in real life.",
  },
  {
    id: 'ending-survivor',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "{sister} walks you back to the reception. You've cried. You've broken. But you're still here.",
        speakerId: 'lily',
        emotion: 'concerned',
      },
      {
        text: "\"Sometimes surviving is the victory,\" she says. \"You made it through the worst weekend of your relationship. Everything after this is easier.\" You hope she's right.",
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Survivor',
    endingSummary: "You broke down. You almost gave up. But you're still standing. {sister} saw you at your lowest and didn't flinch. That bond is real. The scars will heal. Probably.",
  },
  {
    id: 'ending-early-exit',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "You pack your bags Sunday morning. {boyfriend} watches you. \"I wish you'd stay,\" he says.",
      },
      {
        text: "\"I wish you'd given me a reason to.\" The Uber to the airport is the longest ride of your life. Lighter with every mile. Sometimes walking away is winning.",
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Early Exit',
    endingSummary: "You left before the wedding. It felt like defeat then. Now it feels like survival. A partner who can't prioritize you over his friends isn't a partner at all.",
  },
];
