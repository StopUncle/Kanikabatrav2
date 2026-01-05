// Neutral Endings (4)
// Grudging Respect, Campaign Continues, Long Road, Uncertain

import type { Scene } from '../../../types';

export const neutralEndings: Scene[] = [
  {
    id: 'ending-grudging-respect',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "They don't love you. They probably never will. But there's something in the way {groom} nods at you now. The way {bride} doesn't openly attack.",
      },
      {
        text: "It's not acceptance. It's acknowledgment. You exist. You're not going anywhere. They'll have to deal with that. It's not a victory. But it's not a loss either.",
      },
    ],
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'Grudging Respect',
    endingSummary: "You didn't win their hearts, but you earned their respect - or at least their resignation. They know you're not going anywhere. That'll have to be enough for now.",
  },
  {
    id: 'ending-campaign-continues',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "{sister} laughs. \"Oh god. Mom is a whole other war.\" But she's game. She likes you - that's new for her. She's never liked one of {boyfriend}'s girlfriends before.",
        speakerId: 'lily',
        emotion: 'smirking',
      },
      {
        text: "The wedding was just the first battle. The family is next. Holidays. Dinners. The long campaign for acceptance. But you have an ally now. That changes the math.",
      },
    ],
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'The Campaign Continues',
    endingSummary: "You survived the friend group. Now comes the family. {sister} texts you: 'Christmas strategy meeting next week? We need to prep for Mom.' The war for belonging continues.",
  },
  {
    id: 'ending-long-road',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "The drive home is quiet. {boyfriend} knows something is different but he doesn't know what. You took hits this weekend that you shouldn't have taken.",
      },
      {
        text: "The relationship survived. Something broke along the way. Something needs to change.",
      },
    ],
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'The Long Road',
    endingSummary: "You made it through. But at what cost? The relationship continues, but something fundamental has shifted. You need to decide what you're willing to accept. That conversation is coming.",
  },
  {
    id: 'ending-uncertain',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "\"I don't know if trying is enough.\" The words hang between you. {boyfriend}'s face falls. \"What does that mean?\"",
        speakerId: 'ethan',
        emotion: 'sad',
      },
      {
        text: "\"It means... I need to think. After this weekend.\" He nods slowly. You dance anyway. The closeness is gone.",
      },
    ],
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'The Uncertain Path',
    endingSummary: "You told him the truth. Trying isn't enough anymore. Now comes the hard work of figuring out what is. The relationship isn't over - but it needs to become something new. Or it won't survive.",
  },
  {
    id: 'ending-honest-start',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "\"I'm not good at letting go of people.\" {boyfriend} says it like a confession. \"But I'm trying. For you.\"",
        speakerId: 'ethan',
        emotion: 'sad',
      },
      {
        text: "It's not perfect. It's not a guarantee. But it's honest. And maybe that's where real relationships start. With the truth, even when it's ugly.",
      },
    ],
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'The Honest Start',
    endingSummary: "The wedding weekend stripped away pretense. Now you see each other clearly - flaws and all. What you build from here will be real. Whether it's enough remains to be seen.",
  },
  {
    id: 'ending-full-picture',
    backgroundId: 'bar',
    dialog: [
      {
        text: "{groom} finishes his drink. \"He's different now. Because of you.\" It's the closest thing to a blessing you'll get from him.",
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: "You have the full picture now. The history. The patterns. The possibilities. What you do with that information is up to you. But at least you're not guessing anymore.",
      },
    ],
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'The Full Picture',
    endingSummary: "You finally understand everything - the history with {ex}, the group dynamics, what you're really fighting for. Knowledge is power. Now you can make real choices.",
  },
];
