// Good Endings (4)
// Clean Win, Inside Woman, Unexpected Alliance, Stronger

import type { Scene } from '../../../types';

export const goodEndings: Scene[] = [
  {
    id: 'ending-clean-win',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "The reception winds down. {groom} respects you. {bride} has been neutralized. You didn't win them over - you won despite them.",
      },
      {
        text: "{boyfriend} watched you hold your own all weekend. He's looking at you differently now. Like he's seeing you for the first time. This group will never love you. But they can't dismiss you either. And that's enough.",
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Clean Win',
    endingSummary: "You survived the wedding weekend with your dignity and relationship intact. {groom} respects you. {bride} knows she lost. Most importantly, {boyfriend} finally saw what you're made of.",
  },
  {
    id: 'ending-inside-woman',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "{sister} is your foothold in this family now. As the reception ends, she squeezes your arm. \"Thanksgiving is going to be interesting. Mom already has opinions about you. Want help?\"",
        speakerId: 'lily',
        emotion: 'smirking',
      },
      {
        text: "You have an ally in hostile territory. That changes everything. The wedding was just the first battle. The family is the war. And now you have inside intel.",
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Inside Woman',
    endingSummary: "{sister} is your ally now. She texts you the next week: 'Mom's already asking about you. Want the playbook?' The friend group was hard. The family might be harder. But you won't face it alone.",
  },
  {
    id: 'ending-unexpected-alliance',
    backgroundId: 'bar',
    dialog: [
      {
        text: "You and {groom} close out the bar. Champagne turns to whiskey. Stories get traded. By 2am, he's showing you photos of his ex before {bride}. \"Don't tell her I showed you this.\"",
        speakerId: 'marcus',
        emotion: 'happy',
      },
      {
        text: "He's not your friend. But he's not your enemy anymore either. That might be the biggest win of the weekend.",
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Unexpected Alliance',
    endingSummary: "You won {groom}'s respect the hard way. He'll never be your best friend, but he told {boyfriend} the next day: 'Don't let this one go.' Coming from him, that's everything.",
  },
  {
    id: 'ending-stronger',
    backgroundId: 'park',
    dialog: [
      {
        text: "\"I almost broke.\" You tell {sister}. \"The toast. The slideshow. I almost walked out.\"",
        speakerId: 'lily',
        emotion: 'neutral',
      },
      {
        text: "\"But you didn't.\" She raises her champagne glass. \"That's not nothing. You're tougher than you look. I didn't know that before. Now I do.\"",
        speakerId: 'lily',
        emotion: 'happy',
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'Stronger Than Before',
    endingSummary: "You almost didn't make it. Each moment hurt. But you're still standing. You didn't know you had this in you. Now you do.",
  },
];
