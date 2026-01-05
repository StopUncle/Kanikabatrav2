import type { Scene } from '../../types';

// PATH A: THE WALK AWAY
// Leaving when you're ahead - strategic withdrawal from strength
// Teaching: The power to leave is the power to stay on your terms

export const walkAwayScenes: Scene[] = [
  {
    id: 'walk-1',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Four years.' Cate's eyes narrow. 'And he hasn't proposed? What's his excuse?' You've heard them all. Timing. Finances. Wanting it to be 'perfect.' The perfect proposal that never comes.",
        speakerId: 'cate',
        emotion: 'cold',
      },
      {
        text: "'He says he loves me. He acts like we're forever. But he won't commit.' The words taste bitter.",
      },
      {
        speakerId: 'inner-voice',
        text: "Actions, not words. You've been teaching yourself this for years.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'walk-1a',
        text: '"Maybe I should give him more time?"',
        nextSceneId: 'walk-2-weak',
        feedback: 'More time? You\'ve given four years. Time isn\'t the issue.',
      },
      {
        id: 'walk-1b',
        text: '"I\'m starting to feel like I\'m auditioning for a role I\'ll never get."',
        nextSceneId: 'walk-2-clarity',
        isOptimal: true,
        xpBonus: 15,
        feedback: 'Clear-eyed. You see the pattern.',
      },
    ],
  },
  {
    id: 'walk-2-weak',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Time?' Cate laughs, but not kindly. 'Babe. If a man wants you, he locks it down. Fast. Four years means he's comfortable. You're a girlfriend. Convenient. Not a priority.'",
        speakerId: 'cate',
        emotion: 'serious',
      },
      {
        text: "The words sting because they're true. You've been a sure thing. No urgency. No competition. No risk.",
      },
    ],
    nextSceneId: 'walk-2-clarity',
  },
  {
    id: 'walk-2-clarity',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Here's the question.' Cate leans in. 'Do you want marriage? Or do you want him?' Because if you want marriage and he can't give it, you're in the wrong relationship.",
        speakerId: 'cate',
        emotion: 'serious',
      },
      {
        speakerId: 'inner-voice',
        text: "Can you picture your life without him? Really picture it?",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'walk-2a',
        text: '"I want a partner who chooses me. Fully. Publicly. Legally."',
        nextSceneId: 'walk-3-decision',
        isOptimal: true,
        xpBonus: 20,
        feedback: 'Clarity. You know what you want. That\'s power.',
      },
      {
        id: 'walk-2b',
        text: '"I don\'t know if I can find someone else."',
        nextSceneId: 'walk-3-fear',
        feedback: 'Fear is talking. Fear keeps you stuck.',
      },
    ],
  },
  {
    id: 'walk-3-fear',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Listen to yourself.' Cate's voice is gentle but firm. 'You're staying because you're scared to leave. Not because you're happy. That's a hostage situation, not a relationship.'",
        speakerId: 'cate',
        emotion: 'concerned',
      },
      {
        text: "'The right man will SPRINT to commit. If he's walking slowly, he's not sure. And you deserve someone who's sure.'",
        speakerId: 'cate',
        emotion: 'serious',
      },
    ],
    nextSceneId: 'walk-3-decision',
  },
  {
    id: 'walk-3-decision',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "That night. Marcus comes home late. 'Hey babe.' Same greeting. Same energy. Like you're furniture he's fond of. You've made your decision. The question is how.",
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        speakerId: 'inner-voice',
        text: "This is it. The walk away. Do it with power, not pain.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'walk-3a',
        text: '"We need to talk. I\'ve thought about this for a long time."',
        nextSceneId: 'walk-4-composed',
        isOptimal: true,
        xpBonus: 25,
        feedback: 'Calm. Certain. This is how you leave from strength.',
      },
      {
        id: 'walk-3b',
        text: 'Start crying. Let the emotions take over.',
        nextSceneId: 'walk-4-emotional',
        feedback: 'Emotions are valid. But they make you easier to manipulate.',
      },
      {
        id: 'walk-3c',
        text: '"Why don\'t you love me enough to marry me?"',
        nextSceneId: 'walk-4-beg',
        feedback: 'You just asked him to explain why you\'re not enough. Don\'t.',
      },
    ],
  },
  {
    id: 'walk-4-beg',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "His face shifts. Something like pity. 'Babe, it's not about loving you enough. I just need more time to—' The same script. You've heard it before. You're begging for what should be freely given.",
        speakerId: 'marcus',
        emotion: 'sad',
      },
      {
        text: "He's comfortable because you've shown you'll wait forever. Why would he rush?",
      },
    ],
    nextSceneId: 'walk-bad-ending',
  },
  {
    id: 'walk-4-emotional',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "The tears come fast. 'I can't do this anymore. Four years and you still won't commit!' He reaches for you. 'Baby, calm down. Let's talk about this. I didn't know you felt this way.'",
        speakerId: 'marcus',
        emotion: 'concerned',
      },
      {
        text: "He soothes you. Makes promises. By morning, you're in his arms and nothing has changed. He learned that emotional outbursts pass. Just wait them out.",
      },
    ],
    nextSceneId: 'walk-neutral-ending',
  },
  {
    id: 'walk-4-composed',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "'I love you. But I want a partner who's certain about me. After four years, you should know. If you don't, that tells me everything I need to know.' Your voice is steady. No tears. Just truth.",
      },
      {
        text: "His face goes pale. 'Wait—what are you saying?' 'I'm saying I deserve someone who doesn't need more time. I hope you find what you're looking for.'",
        speakerId: 'marcus',
        emotion: 'confused',
      },
      {
        speakerId: 'inner-voice',
        text: "You're not asking. You're informing. This is power.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'walk-4a',
        text: 'Start packing. You already have an apartment lined up.',
        nextSceneId: 'walk-5-exit',
        isOptimal: true,
        xpBonus: 25,
        feedback: 'You planned ahead. You weren\'t bluffing. Real power.',
      },
      {
        id: 'walk-4b',
        text: 'Wait to see if he fights for you.',
        nextSceneId: 'walk-5-wait',
        feedback: 'Still hoping he\'ll chase. That\'s not leaving from strength.',
      },
    ],
  },
  {
    id: 'walk-5-wait',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "He sits there, processing. 'Let's just... sleep on this. We can talk tomorrow.' He's not fighting. He's not panicking. He's waiting for you to calm down. Again.",
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: "You realize: waiting for him to fight means you're still hoping. And hope keeps you trapped.",
      },
    ],
    nextSceneId: 'walk-neutral-ending',
  },
  {
    id: 'walk-5-exit',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "'Wait—you have an apartment?' Now he's panicking. 'You already planned this?' 'I made sure I could leave. That's not the same as planning to.' You're calm. Prepared. Powerful.",
      },
      {
        text: "'Please. Just give me another chance. I'll propose—this week. Tomorrow. Right now.' Too late. This isn't about the ring. It's about the four years of not being chosen.",
        speakerId: 'marcus',
        emotion: 'pleading',
      },
      {
        speakerId: 'inner-voice',
        text: "He could propose any time. He chose not to. Until you left.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'walk-5a',
        text: '"I don\'t want a proposal because I\'m leaving. I wanted one because you wanted me."',
        nextSceneId: 'walk-good-ending',
        isOptimal: true,
        xpBonus: 25,
        feedback: 'The truth. A panicked proposal isn\'t love. It\'s loss aversion.',
      },
      {
        id: 'walk-5b',
        text: '"You really mean it? Right now?"',
        nextSceneId: 'walk-trapped-ending',
        feedback: 'And just like that, you lost all your power.',
      },
    ],
  },
];
