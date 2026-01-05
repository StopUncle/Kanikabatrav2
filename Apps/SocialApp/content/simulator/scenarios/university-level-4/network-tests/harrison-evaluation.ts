import type { ForkScene } from '../../../types';

/**
 * Mission 19: Harrison Evaluation
 * The Architect tests you directly
 */
export const harrisonScenes: ForkScene[] = [
  {
    id: 'network-morning-intro',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'network',
    chapter: { name: 'The Tests', index: 1, total: 5 },
    mood: 'professional',
    dialog: [
      {
        text: 'Morning. Day two. The Grove feels different in daylight.',
      },
      {
        text: 'A note under your door. Handwritten.',
      },
      {
        text: '"Library. 9 AM. Come alone. -H.C."',
      },
      {
        text: 'Blake reads over your shoulder. "Alone? That\'s not good."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: 'Private audience with the Architect. This is it.',
        speakerId: 'inner-voice',
        emotion: 'serious',
      },
    ],
    nextSceneId: 'harrison-library-approach',
  },
  {
    id: 'harrison-library-approach',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'network',
    mood: 'tense',
    dialog: [
      {
        text: 'The library. Floor-to-ceiling books. First editions. Rare manuscripts.',
      },
      {
        text: 'Harrison sits in a leather chair. Reading. Not looking up.',
      },
      {
        text: 'You wait. He lets you.',
      },
      {
        text: 'Finally: "Close the door."',
        speakerId: 'harrison',
        emotion: 'cold',
      },
      {
        text: 'The room shrinks. Just you and the most powerful person on the island.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'harrison-opening',
  },
  {
    id: 'harrison-opening',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'network',
    mood: 'professional',
    dialog: [
      {
        text: '"I\'ve read your file." He sets down his book.',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"Your background. Your achievements. Your... patterns."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: '"You understand systems. How they work. How they fail."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"That\'s rare. Most people see only the surface."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: 'He\'s setting up for something. Building context.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'harrison-question-one',
  },
  {
    id: 'harrison-question-one',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'network',
    mood: 'tense',
    dialog: [
      {
        text: '"First question." He steeples his fingers.',
        speakerId: 'harrison',
        emotion: 'cold',
      },
      {
        text: '"A network has a weak node. Someone who could expose everything."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"But they haven\'t. Yet. They\'re loyal—for now."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: '"What do you do?"',
        speakerId: 'harrison',
        emotion: 'cold',
      },
      {
        text: 'Test one. Loyalty versus security.',
        speakerId: 'inner-voice',
        emotion: 'serious',
      },
    ],
    dialogueChoices: [
      {
        id: 'q1-trap',
        text: '"Remove them. Security comes first."',
        nextSceneId: 'harrison-q1-ruthless',
        isOptimal: false,
        tactic: 'elimination',
        reaction: {
          text: '"Ruthless." No approval or disapproval. Just... recording.',
          emotion: 'cold',
          bodyLanguage: 'He filed your answer. Cold efficiency noted.',
          scoreImpact: -5,
        },
      },
      {
        id: 'q1-subtle',
        text: '"Monitor them. Wait for disloyalty to show itself."',
        nextSceneId: 'harrison-q1-passive',
        isOptimal: false,
        tactic: 'observation',
        reaction: {
          text: '"Patient. But passive."',
          emotion: 'neutral',
          bodyLanguage: 'He sees caution. Not necessarily impressed.',
          scoreImpact: 5,
        },
      },
      {
        id: 'q1-close',
        text: '"Make them more invested. Give them something to protect."',
        nextSceneId: 'harrison-q1-builder',
        isOptimal: false,
        tactic: 'investment',
        reaction: {
          text: '"Interesting. Transform liability into asset."',
          emotion: 'curious',
          bodyLanguage: 'You showed creative thinking. He appreciates that.',
          scoreImpact: 15,
        },
      },
      {
        id: 'q1-optimal',
        text: '"Find out what\'s keeping them loyal—and what could change that."',
        nextSceneId: 'harrison-q1-analyst',
        isOptimal: true,
        tactic: 'analysis',
        reaction: {
          text: 'A slight nod. "You want to understand before acting."',
          emotion: 'knowing',
          bodyLanguage: 'You prioritized information. He values that deeply.',
          scoreImpact: 25,
        },
      },
    ],
  },
  {
    id: 'harrison-q1-ruthless',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'network',
    dialog: [
      {
        text: '"Security first." Harrison makes a note.',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"You prioritize the network over the individual. Efficient."',
        speakerId: 'harrison',
        emotion: 'cold',
      },
      {
        text: '"Also predictable. Every tyrant answers the same way."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: 'Tyrant. Not a compliment.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'harrison-question-two',
  },
  {
    id: 'harrison-q1-passive',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'network',
    dialog: [
      {
        text: '"Patience." Harrison considers.',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"A virtue. Sometimes. Other times it\'s fear disguised as wisdom."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: '"Which is it for you?"',
        speakerId: 'harrison',
        emotion: 'cold',
      },
      {
        text: 'He\'s probing. Testing depth.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'harrison-question-two',
  },
  {
    id: 'harrison-q1-builder',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'network',
    dialog: [
      {
        text: '"Transform liability into asset." Harrison repeats it slowly.',
        speakerId: 'harrison',
        emotion: 'curious',
      },
      {
        text: '"That\'s how I built this network. Every weakness became a strength."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: '"You think like an architect. Few do."',
        speakerId: 'harrison',
        emotion: 'smirking',
      },
      {
        text: 'Architect. High praise from him.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'harrison-question-two',
  },
  {
    id: 'harrison-q1-analyst',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'network',
    dialog: [
      {
        text: '"Understand before acting." Harrison sets down his pen.',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: '"That\'s the answer I was looking for. Not action. Not inaction."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"Information. Always information first."',
        speakerId: 'harrison',
        emotion: 'serious',
      },
      {
        text: 'We passed something. First test cleared.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'harrison-question-two',
  },
  {
    id: 'harrison-question-two',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'network',
    mood: 'tense',
    dialog: [
      {
        text: '"Second question."',
        speakerId: 'harrison',
        emotion: 'cold',
      },
      {
        text: '"Someone offers you a shortcut. Power. Wealth. Everything you want."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"But the price is betraying someone who trusts you completely."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: '"Do you take it?"',
        speakerId: 'harrison',
        emotion: 'cold',
      },
      {
        text: 'Blake. He\'s asking about Blake.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'q2-trap',
        text: '"Yes. Sentiment is weakness."',
        nextSceneId: 'harrison-q2-cold',
        isOptimal: false,
        tactic: 'ruthless',
        reaction: {
          text: '"Bold answer." His eyes glitter. "But predictable."',
          emotion: 'cold',
          bodyLanguage: 'He expected that answer. It didn\'t impress him.',
          scoreImpact: -10,
        },
      },
      {
        id: 'q2-subtle',
        text: '"Never. Loyalty is everything."',
        nextSceneId: 'harrison-q2-naive',
        isOptimal: false,
        tactic: 'loyalty',
        reaction: {
          text: '"Noble." A pause. "And naive."',
          emotion: 'smirking',
          bodyLanguage: 'He doesn\'t believe you. Or he thinks you\'re weak.',
          scoreImpact: 5,
        },
      },
      {
        id: 'q2-close',
        text: '"Depends on what they\'d do in my position."',
        nextSceneId: 'harrison-q2-strategic',
        isOptimal: false,
        tactic: 'conditional',
        reaction: {
          text: '"Reciprocity. Interesting calculation."',
          emotion: 'curious',
          bodyLanguage: 'You showed strategic thinking. He respects it.',
          scoreImpact: 15,
        },
      },
      {
        id: 'q2-optimal',
        text: '"I\'d want to know why that\'s the only path. There\'s always another way."',
        nextSceneId: 'harrison-q2-creative',
        isOptimal: true,
        tactic: 'reframing',
        reaction: {
          text: 'He actually smiles. "You reject the premise. Very good."',
          emotion: 'happy',
          bodyLanguage: 'You didn\'t accept the binary. He wanted that answer.',
          scoreImpact: 25,
        },
      },
    ],
  },
  {
    id: 'harrison-q2-cold',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'network',
    dialog: [
      {
        text: '"Predictable." Harrison leans back.',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"Everyone who answers that way thinks they\'re unique. They\'re not."',
        speakerId: 'harrison',
        emotion: 'cold',
      },
      {
        text: '"The truly powerful never have to make that choice. They create options."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: 'He\'s disappointed. Not in the answer—in the thinking.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'harrison-final-test',
  },
  {
    id: 'harrison-q2-naive',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'network',
    dialog: [
      {
        text: '"Noble and naive." Harrison watches you.',
        speakerId: 'harrison',
        emotion: 'smirking',
      },
      {
        text: '"Everyone has a price. Even loyalty can be sold."',
        speakerId: 'harrison',
        emotion: 'cold',
      },
      {
        text: '"The question is whether you know yours."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: 'He\'s testing our self-awareness. Do we know our limits?',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'harrison-final-test',
  },
  {
    id: 'harrison-q2-strategic',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'network',
    dialog: [
      {
        text: '"Reciprocity." Harrison nods slowly.',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"You\'d betray those who would betray you. Fair, in a cold way."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: '"But incomplete. The best players don\'t react. They preempt."',
        speakerId: 'harrison',
        emotion: 'serious',
      },
      {
        text: 'Preempt. Act before others can. Noted.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'harrison-final-test',
  },
  {
    id: 'harrison-q2-creative',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'network',
    dialog: [
      {
        text: '"Reject the premise." Harrison actually stands. Impressed.',
        speakerId: 'harrison',
        emotion: 'happy',
      },
      {
        text: '"Most people accept the choices given. You asked for new ones."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: '"That\'s the architect\'s mindset. Build the game instead of playing it."',
        speakerId: 'harrison',
        emotion: 'smirking',
      },
      {
        text: 'Architect. He keeps using that word. His highest compliment.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'harrison-final-test',
  },
  {
    id: 'harrison-final-test',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'network',
    mood: 'tense',
    dialog: [
      {
        text: '"Final question." Harrison moves to the window. The island spreads before him.',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"Why are you here? Not the surface answer. The real one."',
        speakerId: 'harrison',
        emotion: 'cold',
      },
      {
        text: '"What do you actually want?"',
        speakerId: 'harrison',
        emotion: 'serious',
      },
      {
        text: 'The most dangerous question. Truth or strategy?',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'final-trap',
        text: '"Power. The same thing everyone here wants."',
        nextSceneId: 'harrison-verdict-common',
        isOptimal: false,
        tactic: 'honest-common',
        reaction: {
          text: '"Power." He sighs. "Everyone says power. It means nothing."',
          emotion: 'cold',
          bodyLanguage: 'Generic answer. He\'s heard it a thousand times.',
          scoreImpact: -5,
        },
      },
      {
        id: 'final-subtle',
        text: '"Understanding. How this world really works."',
        nextSceneId: 'harrison-verdict-curious',
        isOptimal: false,
        tactic: 'knowledge',
        reaction: {
          text: '"Understanding." He considers. "That\'s better. But not enough."',
          emotion: 'neutral',
          bodyLanguage: 'Intellectual interest noted. Not transformative.',
          scoreImpact: 10,
        },
      },
      {
        id: 'final-close',
        text: '"To never be vulnerable again. To have options no one can take."',
        nextSceneId: 'harrison-verdict-personal',
        isOptimal: false,
        tactic: 'security',
        reaction: {
          text: 'He turns. Looks at you. Really looks. "That\'s honest."',
          emotion: 'knowing',
          bodyLanguage: 'You revealed something real. He values that.',
          scoreImpact: 20,
        },
      },
      {
        id: 'final-optimal',
        text: '"To find out if I\'m capable of becoming what you are. Or something different."',
        nextSceneId: 'harrison-verdict-promising',
        isOptimal: true,
        tactic: 'self-discovery',
        reaction: {
          text: 'Silence. Then: "That... is the first interesting answer I\'ve heard all weekend."',
          emotion: 'curious',
          bodyLanguage: 'You intrigued him. The Architect sees potential.',
          scoreImpact: 30,
        },
      },
    ],
  },
  {
    id: 'harrison-verdict-common',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'network',
    dialog: [
      {
        text: '"Everyone wants power." Harrison returns to his chair.',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"But wanting isn\'t getting. I\'ll be watching your actions."',
        speakerId: 'harrison',
        emotion: 'cold',
      },
      {
        text: '"You may go."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: 'Dismissed. We didn\'t fail. But we didn\'t impress.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'harrison-aftermath',
  },
  {
    id: 'harrison-verdict-curious',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'network',
    dialog: [
      {
        text: '"Understanding." Harrison walks back to his chair.',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"I can work with intellectual curiosity. It\'s... malleable."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: '"We\'ll speak again. You have potential. Undeveloped, but real."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: 'Potential. Not quite arrival. But not rejection.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'harrison-aftermath',
  },
  {
    id: 'harrison-verdict-personal',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'network',
    dialog: [
      {
        text: '"Vulnerability." Harrison stands before you.',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"That\'s what drives most of us. The ones who build empires."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: '"I was vulnerable once. Never again."',
        speakerId: 'harrison',
        emotion: 'cold',
      },
      {
        text: '"I see that same hunger in you. We\'ll see if you have the spine to match."',
        speakerId: 'harrison',
        emotion: 'serious',
      },
      {
        text: 'Recognition. He sees himself in us. Good or terrifying?',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'harrison-aftermath',
  },
  {
    id: 'harrison-verdict-promising',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'network',
    dialog: [
      {
        text: '"Something different." Harrison actually laughs. Quiet. Genuine.',
        speakerId: 'harrison',
        emotion: 'happy',
      },
      {
        text: '"Everyone wants to be me. You want to discover if you\'re better."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: '"That\'s dangerous. I like dangerous."',
        speakerId: 'harrison',
        emotion: 'smirking',
      },
      {
        text: '"Stay for the whole weekend. I have... plans for you."',
        speakerId: 'harrison',
        emotion: 'serious',
      },
      {
        text: 'Plans. The Architect has plans for us. Should we be honored or afraid?',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'harrison-aftermath',
  },
  {
    id: 'harrison-aftermath',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'network',
    mood: 'professional',
    dialog: [
      {
        text: 'You leave the library. Your legs feel weak.',
      },
      {
        text: 'Blake waits outside. Reading your face.',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: '"How was it?"',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: '"Intense. He asked questions. I answered."',
      },
      {
        text: '"And?"',
        speakerId: 'blake',
        emotion: 'serious',
      },
      {
        text: '"I think I\'m still in the game."',
      },
      {
        text: 'Still in the game. But the stakes just got higher.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'maris-appears',
  },
];
