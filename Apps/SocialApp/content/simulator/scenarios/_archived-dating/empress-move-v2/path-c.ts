import type { Scene } from '../../types';

// PATH C: THE UPGRADE
// When you level up and he can't handle it
// Teaching: Some men want a queen until they get one

export const upgradeScenes: Scene[] = [
  {
    id: 'upgrade-1',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'The promotion.' Cate's eyes light up. 'Director level? That's huge.' You nod, but the excitement is muted. 'So why don't you look happy?'",
        speakerId: 'cate',
        emotion: 'happy',
      },
      {
        text: "'Marcus has been... weird. When I told him, he said 'That's great, babe' and changed the subject. Last night he made a joke about me being the breadwinner now. It didn't sound like a joke.'",
      },
      {
        speakerId: 'inner-voice',
        text: "You outgrew his comfort zone. Now you're paying for it.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'upgrade-1a',
        text: '"Maybe I should downplay it. Not make him feel bad."',
        nextSceneId: 'upgrade-2-shrink',
        feedback: 'Shrinking yourself so he doesn\'t feel small. Classic.',
      },
      {
        id: 'upgrade-1b',
        text: '"His insecurity isn\'t my problem to manage."',
        nextSceneId: 'upgrade-2-clarity',
        isOptimal: true,
        xpBonus: 15,
        feedback: 'Correct. You don\'t dim your light to make someone else comfortable.',
      },
    ],
  },
  {
    id: 'upgrade-2-shrink',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Downplay it?' Cate sets her coffee down hard. 'You worked for this. Years of late nights. Politics. Proving yourself twice as hard. And you're going to minimize it for his ego?'",
        speakerId: 'cate',
        emotion: 'angry',
      },
      {
        text: "'A partner who can't celebrate your wins isn't a partner. He's an anchor.'",
        speakerId: 'cate',
        emotion: 'serious',
      },
    ],
    nextSceneId: 'upgrade-2-clarity',
  },
  {
    id: 'upgrade-2-clarity',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'The question is: what does he actually want?' Cate muses. 'Does he want you to succeed? Or does he want you to succeed just enough that he still feels superior?'",
        speakerId: 'cate',
        emotion: 'knowing',
      },
      {
        speakerId: 'inner-voice',
        text: "Some men want a queen until they actually get one.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'upgrade-2a',
        text: '"He said he wanted an ambitious woman. That\'s what attracted him."',
        nextSceneId: 'upgrade-3-test',
        isOptimal: true,
        xpBonus: 15,
        feedback: 'Then let\'s see if he meant it.',
      },
      {
        id: 'upgrade-2b',
        text: '"Maybe I changed too much. I\'m not the same person he met."',
        nextSceneId: 'upgrade-3-doubt',
        feedback: 'You grew. That\'s not a flaw. That\'s the point.',
      },
    ],
  },
  {
    id: 'upgrade-3-doubt',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'You're not the same person. Good.' Cate leans back. 'The person he met didn't have a director title. You leveled up. If he can't level up with you, that's not your problem. That's information.'",
        speakerId: 'cate',
        emotion: 'serious',
      },
      {
        text: "'The right partner celebrates your growth. The wrong one resents it. Time to find out which one you have.'",
        speakerId: 'cate',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'upgrade-3-test',
  },
  {
    id: 'upgrade-3-test',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "Your company celebration dinner. You're being honored. Marcus is your plus-one. Across the room, your CEO is talking about your achievements. Marcus's jaw is tight.",
      },
      {
        text: "Someone approaches. 'Hi, I'm Alexander. VP at our partner firm. I've heard amazing things about your work.' He's looking at you, not through you.",
        speakerId: 'new-guy',
        emotion: 'seductive',
      },
      {
        speakerId: 'inner-voice',
        text: "He sees you as an equal. That's... different.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'upgrade-3a',
        text: 'Introduce Marcus. Watch his reaction.',
        nextSceneId: 'upgrade-4-watch',
        isOptimal: true,
        xpBonus: 20,
        feedback: 'Data collection. How does he handle you being the prize?',
      },
      {
        id: 'upgrade-3b',
        text: 'Cut the conversation short to check on Marcus.',
        nextSceneId: 'upgrade-4-shrink',
        feedback: 'Managing his feelings instead of enjoying your moment.',
      },
    ],
  },
  {
    id: 'upgrade-4-shrink',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "You excuse yourself and find Marcus by the bar. 'You okay?' 'Fine.' One word. Cold. He's punishing you for your success, and you just abandoned your moment to soothe him.",
      },
      {
        text: "The rest of the night, you're managing his mood instead of celebrating your win. This pattern will repeat every time you succeed. Is that what you want?",
      },
    ],
    nextSceneId: 'upgrade-neutral-ending',
  },
  {
    id: 'upgrade-4-watch',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "'This is Marcus, my boyfriend.' Alexander shakes his hand warmly. Marcus's grip is a little too firm. His smile a little too tight. 'Great party. Your girlfriend's quite impressive.'",
        speakerId: 'new-guy',
        emotion: 'neutral',
      },
      {
        text: "'Yeah. She is.' Marcus's arm goes around you. Possessive. Not proud—territorial. Alexander nods gracefully and moves on. You saw what you needed to see.",
        speakerId: 'marcus',
        emotion: 'cold',
      },
      {
        speakerId: 'inner-voice',
        text: "He's not celebrating you. He's guarding you. Big difference.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'upgrade-4a',
        text: 'Pull away gently. Reclaim your space.',
        nextSceneId: 'upgrade-5-reclaim',
        isOptimal: true,
        xpBonus: 20,
        feedback: 'Your body isn\'t a territory to be claimed.',
      },
      {
        id: 'upgrade-4b',
        text: 'Lean into him. Keep the peace.',
        nextSceneId: 'upgrade-5-submit',
        feedback: 'You just rewarded his possessiveness.',
      },
    ],
  },
  {
    id: 'upgrade-5-submit',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "You stay close. He relaxes. For the rest of the night, you dim yourself just enough to keep him comfortable. People approach you less. You network less. Your moment becomes... smaller.",
      },
      {
        text: "On the way home: 'That guy was hitting on you.' 'He was being professional.' 'Right.' Silence. The resentment is thick. Your success has become a threat.",
      },
    ],
    nextSceneId: 'upgrade-bad-ending',
  },
  {
    id: 'upgrade-5-reclaim',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "You step forward slightly. Subtle. But clear. 'I need to mingle. This is my night.' His arm drops. A flash of something in his eyes. Hurt? Anger? Both?",
        speakerId: 'marcus',
        emotion: 'cold',
      },
      {
        text: "You work the room. Your room. People want to talk to YOU. And you're not dimming yourself to make anyone comfortable. This is what you worked for.",
      },
      {
        speakerId: 'inner-voice',
        text: "This is your kingdom. Let him decide if he can live in it.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'upgrade-5a',
        text: 'Check on Marcus occasionally. Balance.',
        nextSceneId: 'upgrade-6-balanced',
        isOptimal: true,
        xpBonus: 15,
        feedback: 'You can be successful AND considerate. Both are power.',
      },
      {
        id: 'upgrade-5b',
        text: 'Ignore him completely. Make a point.',
        nextSceneId: 'upgrade-6-revenge',
        feedback: 'That\'s not power. That\'s spite.',
      },
    ],
  },
  {
    id: 'upgrade-6-revenge',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "You ignore him all night. Payback for his coldness. By the end, he's disappeared. Later, a text: 'Taking an Uber. Enjoy your party.' The sarcasm drips.",
      },
      {
        text: "You won the battle. But the war just escalated. Revenge isn't power. It's fuel for more conflict.",
      },
    ],
    nextSceneId: 'upgrade-neutral-ending',
  },
  {
    id: 'upgrade-6-balanced',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "You check on him between conversations. Include him when it's natural. But you're not managing his feelings—you're being a partner. He notices the balance.",
      },
      {
        text: "Later, in the car: 'I was being a jerk earlier. I'm sorry.' You wait. 'Your success... I don't know. It makes me feel like I'm falling behind.'",
        speakerId: 'marcus',
        emotion: 'sad',
      },
      {
        speakerId: 'inner-voice',
        text: "He named it. That's more than most men can do.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'upgrade-6a',
        text: '"I don\'t want you behind me. I want you beside me."',
        nextSceneId: 'upgrade-good-ending',
        isOptimal: true,
        xpBonus: 25,
        feedback: 'Perfect framing. Partnership, not competition.',
      },
      {
        id: 'upgrade-6b',
        text: '"Maybe you should work on that feeling."',
        nextSceneId: 'upgrade-neutral-ending',
        feedback: 'True. But cold. You missed a connection moment.',
      },
    ],
  },
];
