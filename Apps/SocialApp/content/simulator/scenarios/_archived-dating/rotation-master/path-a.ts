import type { Scene } from '../../types';

// PATH A: STARTING FRESH
// Breaking fixation by building options from scratch
// Teaching: Options eliminate desperation. Three minimum.

export const buildScenes: Scene[] = [
  {
    id: 'build-1',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Let me guess. Marcus.' Sarah doesn't even wait for confirmation. 'Babe. You only call me when you're spiraling about him. How many times has he texted this week?'",
        speakerId: 'sarah',
        emotion: 'knowing',
      },
      {
        text: "You count. Once. Tuesday. Four words. You're embarrassed to admit how many times you checked.",
      },
      {
        speakerId: 'inner-voice',
        text: "She's right. This is pathetic.",
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'build-1a',
        text: '"It\'s different with him. When it\'s good, it\'s really good."',
        nextSceneId: 'build-2-excuse',
        xpBonus: 5,
        feedback: 'That\'s intermittent reinforcement talking. The highs make the lows feel worth it.',
      },
      {
        id: 'build-1b',
        text: '"I know. I hate it. How do I stop?"',
        nextSceneId: 'build-2-ready',
        isOptimal: true,
        xpBonus: 15,
        feedback: 'First step: admitting the pattern. Ready to build.',
      },
      {
        id: 'build-1c',
        text: '"Maybe I should just text him. See where it goes."',
        nextSceneId: 'build-2-chase',
        feedback: 'Chasing the inconsistent. He already knows you\'ll reach out.',
      },
    ],
  },
  {
    id: 'build-2-excuse',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'That's the trap, babe. It's called intermittent reinforcement. Slot machines use it. Abusers use it. That unpredictability you're hooked on? It's not chemistry. It's anxiety dressed up as excitement.'",
        speakerId: 'sarah',
        emotion: 'serious',
      },
      {
        text: "You want to argue but can't. The dopamine hits when he texts. The crash when he doesn't. She's describing you exactly.",
      },
    ],
    nextSceneId: 'build-3-plan',
  },
  {
    id: 'build-2-ready',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Options. You need options. Not to play games—to break the fixation. When you have three people interested, one going cold doesn't ruin your week.'",
        speakerId: 'sarah',
        emotion: 'neutral',
      },
      {
        text: "'What about David? He asked you out like three times. And Chris from Jake's party?' She has a point. You have their numbers.",
      },
    ],
    nextSceneId: 'build-3-plan',
  },
  {
    id: 'build-2-chase',
    backgroundId: 'text-screen',
    dialog: [
      {
        text: "You text Marcus: 'Hey, how's your week?' Delivered. You check. And check. And check. Eighteen hours later: 'Good. Busy. You?' Two words.",
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: "You feel sick. This isn't love. This is waiting to exist.",
      },
    ],
    nextSceneId: 'build-3-plan',
  },
  {
    id: 'build-3-plan',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Here's the plan. Text David and Chris tonight. Real plans, not small talk. Get two dates on the calendar this week. Three options breaks fixation completely.'",
        speakerId: 'sarah',
        emotion: 'neutral',
      },
      {
        speakerId: 'inner-voice',
        text: "Three options. Not games. Freedom.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'build-3a',
        text: '"Both tonight? That feels like a lot."',
        nextSceneId: 'build-4-slow',
        xpBonus: 5,
        feedback: 'Hesitation is fixation fighting back.',
      },
      {
        id: 'build-3b',
        text: '"You\'re right. I\'m texting them now."',
        nextSceneId: 'build-4-action',
        isOptimal: true,
        xpBonus: 20,
        feedback: 'Action over anxiety. This is the way.',
      },
    ],
  },
  {
    id: 'build-4-slow',
    backgroundId: 'text-screen',
    dialog: [
      {
        text: "You text just David. 'Hey! Is that Italian place offer still open?' He responds in three minutes. 'Absolutely! Friday at 7?' Done. One option secured.",
        speakerId: 'david',
        emotion: 'happy',
      },
      {
        text: "Chris's number sits there. You could text him too. Two options is fragile. Three is freedom.",
      },
      {
        speakerId: 'inner-voice',
        text: "One option is better than none. But two is still fragile.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'build-4a',
        text: 'Text Chris too: "Saturday drinks?"',
        nextSceneId: 'build-5-full',
        isOptimal: true,
        xpBonus: 15,
        feedback: 'Full rotation activated. This is abundance.',
      },
      {
        id: 'build-4b',
        text: 'One at a time. See how David goes.',
        nextSceneId: 'build-5-fragile',
        xpBonus: 5,
        feedback: 'Progress. But fragile.',
      },
    ],
  },
  {
    id: 'build-4-action',
    backgroundId: 'text-screen',
    dialog: [
      {
        text: "Two texts sent. David: 'Friday Italian place?' Chris: 'Saturday drinks, you pick the spot.' Both respond within ten minutes. Both excited. Both making actual plans.",
      },
      {
        text: "Marcus still hasn't texted. Funny how that matters less now.",
      },
    ],
    nextSceneId: 'build-5-full',
  },
  {
    id: 'build-5-fragile',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "Friday dinner with David. He's attentive. Present. Asks real questions. Your phone lights up. Marcus: 'What are you up to tonight?' Of course. NOW he texts.",
        speakerId: 'marcus',
        emotion: 'seductive',
      },
      {
        speakerId: 'inner-voice',
        text: "David is here. Marcus is not.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'build-5a',
        text: 'Flip the phone face down. Stay present.',
        nextSceneId: 'build-good-ending',
        isOptimal: true,
        xpBonus: 20,
        feedback: 'Real investment beats crumbs.',
      },
      {
        id: 'build-5b',
        text: '"Excuse me." Text Marcus back.',
        nextSceneId: 'build-bad-ending',
        feedback: 'You left the present for someone who gives you nothing.',
      },
    ],
  },
  {
    id: 'build-5-full',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "Friday: David. Italian restaurant, pulled out your chair, asked about your dreams. Saturday: Chris. Cocktail bar, made you laugh until you cried. Sunday: Marcus finally texts. 'Wanna hang?'",
      },
      {
        text: "You stare at the message. Two amazing dates this weekend. Real effort. Real presence. And Marcus wants to 'hang.'",
      },
      {
        speakerId: 'inner-voice',
        text: "The contrast is clear now.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'build-full-a',
        text: 'Reply to David and Chris first. Marcus can wait.',
        nextSceneId: 'build-good-ending',
        isOptimal: true,
        xpBonus: 20,
        feedback: 'Attention goes to those who earn it.',
      },
      {
        id: 'build-full-b',
        text: '"Sure! When?"',
        nextSceneId: 'build-neutral-ending',
        xpBonus: 5,
        feedback: 'Old habits die hard.',
      },
    ],
  },
];
