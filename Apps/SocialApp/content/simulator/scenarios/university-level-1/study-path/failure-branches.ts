import type { ForkScene } from '../../../types';

/**
 * Study Hall Path - Failure Branches
 * Casey exit scenes when player makes obviously bad choices
 */
export const failureBranchScenes: ForkScene[] = [
  // ============================================
  // INSULT EXIT - From meeting-casey (meet-insult)
  // ============================================
  {
    id: 'casey-insult-exit',
    backgroundId: 'common-room',
    sceneType: 'dialogue',
    pathId: 'study-hall',
    mood: 'tense',
    dialog: [
      {
        text: 'Casey doesn\'t even look at you. Her books go into her bag with practiced speed.',
      },
      {
        text: '"You know what\'s actually sad?" She finally meets your eyes. "People like you."',
        speakerId: 'casey',
        emotion: 'cold',
      },
      {
        text: 'She\'s gone before you can respond. The common room feels emptier than before.',
      },
      {
        text: 'You insulted someone who was already fragile. What did you expect?',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'ending-casey-insult',
  },
  {
    id: 'ending-casey-insult',
    backgroundId: 'common-room',
    sceneType: 'ending',
    pathId: 'study-hall',
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'Cruelty Costs',
    endingSummary: 'You insulted someone who was already struggling. Casey was looking for connection, and you gave her another reason to stay guarded. The gala ticket vanishes with her, but more importantly, so does any chance of a genuine relationship.',
    dialog: [
      {
        text: 'The common room door swings shut. Through the window, you watch Casey disappear into the night.',
      },
      {
        text: 'You came for a ticket and left with nothing but the memory of someone else\'s pain.',
      },
    ],
  },

  // ============================================
  // GREEDY EXIT - From discovery (info-greedy)
  // ============================================
  {
    id: 'casey-greedy-exit',
    backgroundId: 'common-room',
    sceneType: 'dialogue',
    pathId: 'study-hall',
    mood: 'tense',
    dialog: [
      {
        text: 'Casey\'s chair scrapes back. She\'s standing now, hands pressed flat on the table.',
      },
      {
        text: '"Five people. FIVE." Her voice is shaking. "I spend hours talking to you, and that\'s what you want to know? How many TICKETS I can get you?"',
        speakerId: 'casey',
        emotion: 'angry',
      },
      {
        text: '"I\'m not a vending machine. I\'m a person. Or did you miss that part?"',
        speakerId: 'casey',
        emotion: 'angry',
      },
      {
        text: 'You showed her exactly what you valued. And it wasn\'t her.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'ending-casey-greedy',
  },
  {
    id: 'ending-casey-greedy',
    backgroundId: 'common-room',
    sceneType: 'ending',
    pathId: 'study-hall',
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'Exposed',
    endingSummary: 'Your greed was too obvious. Casey spent an evening thinking she\'d found someone genuine, and you confirmed her worst fears about people. The tickets are gone, and so is any trust she might have given you.',
    dialog: [
      {
        text: 'Casey storms out, bag clutched to her chest like armor.',
      },
      {
        text: 'Later, you hear she gave both her plus-one spots to study group friends. People who actually cared.',
      },
    ],
  },

  // ============================================
  // MOCK EXIT - From rapport (open-mock)
  // ============================================
  {
    id: 'casey-mock-exit',
    backgroundId: 'common-room',
    sceneType: 'dialogue',
    pathId: 'study-hall',
    mood: 'tense',
    dialog: [
      {
        text: 'The silence is worse than anger. Casey\'s hands move mechanically—notebook, pens, highlighters—each item placed in her bag with precision.',
      },
      {
        text: 'She doesn\'t look at you. She doesn\'t need to.',
      },
      {
        text: 'When she finally speaks, her voice is flat. Empty.',
      },
      {
        text: '"I actually thought you were different."',
        speakerId: 'casey',
        emotion: 'cold',
      },
      {
        text: 'She opened up. You mocked her for it. That\'s not a mistake. That\'s a choice.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'ending-casey-mock',
  },
  {
    id: 'ending-casey-mock',
    backgroundId: 'common-room',
    sceneType: 'ending',
    pathId: 'study-hall',
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'Vulnerability Weaponized',
    endingSummary: 'Casey shared something real with you—her struggles, her loneliness—and you used it against her. Some wounds don\'t heal. She\'ll think twice before opening up to anyone again, and you\'ll never know what could have been.',
    dialog: [
      {
        text: 'Casey leaves without another word. The common room door doesn\'t slam—it just... closes.',
      },
      {
        text: 'Somehow, that\'s worse.',
      },
    ],
  },

  // ============================================
  // BETRAY EXIT - From the-ask (offer-betray)
  // ============================================
  {
    id: 'casey-betray-exit',
    backgroundId: 'common-room',
    sceneType: 'dialogue',
    pathId: 'study-hall',
    mood: 'tense',
    dialog: [
      {
        text: 'Casey\'s smile doesn\'t fade immediately. It freezes first. Then, slowly, it crumbles.',
      },
      {
        text: '"Someone else." She repeats it like she\'s testing the words. "Of course. Someone else."',
        speakerId: 'casey',
        emotion: 'sad',
      },
      {
        text: 'She pulls out her phone. Types something quickly.',
      },
      {
        text: '"There. You\'re on the list. Plus one." A hollow laugh. "Bring whoever you want. I clearly don\'t matter."',
        speakerId: 'casey',
        emotion: 'cold',
      },
      {
        text: 'She offered you herself, not a ticket. And you picked the ticket.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'ending-casey-betray',
  },
  {
    id: 'ending-casey-betray',
    backgroundId: 'common-room',
    sceneType: 'ending',
    pathId: 'study-hall',
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Hollow Victory',
    endingSummary: 'You got what you wanted. A ticket to the gala. But you rejected Casey\'s offer of companionship—the first time she\'d reached out in months. She\'ll remember this. And at the gala, you\'ll see her at the registration desk, alone, while you party with "someone else."',
    dialog: [
      {
        text: 'Casey packs up quickly now. No more hesitation.',
      },
      {
        text: '"Have fun at the gala." The words are perfectly polite. Perfectly empty.',
      },
      {
        text: 'You won. So why does it feel like losing?',
      },
    ],
  },
];
