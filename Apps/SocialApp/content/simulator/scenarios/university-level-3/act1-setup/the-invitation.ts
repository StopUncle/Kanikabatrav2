import type { ForkScene } from '../../../types';

/**
 * Act 1: The Invitation
 * Kai's formal invite arrives - bridge from Level 2
 */
export const invitationScenes: ForkScene[] = [
  {
    id: 'gala-invitation-arrives',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'setup',
    chapter: { name: 'The Invitation', index: 1, total: 5 },
    dialog: [
      {
        text: 'Three weeks since the restaurant. Three weeks of silence.',
      },
      {
        text: 'Then the envelope arrives. Heavy paper. No return address.',
      },
      {
        text: '"The Whitmore Foundation Annual Charity Gala. Your presence is requested."',
      },
      {
        text: 'Handwritten at the bottom: "I vouched for you. Don\'t make me regret it. - K"',
      },
      {
        text: 'Kai. She actually did it.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'gala-blake-reaction',
  },
  {
    id: 'gala-blake-reaction',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: 'Blake sees the invitation. Whistles.',
      },
      {
        text: '"The Whitmore Gala? That\'s old money. Like, really old money. How did you—"',
        speakerId: 'blake',
        emotion: 'curious',
      },
      {
        text: '"I know someone."',
      },
      {
        text: '"Someone serious, apparently." He studies the paper. "This is the real deal. Victoria Ashworth runs this. She doesn\'t let just anyone in."',
        speakerId: 'blake',
        emotion: 'serious',
      },
      {
        text: 'The name registers. Victoria Ashworth. Old money.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'invite-trap',
        text: '"Should I be worried? What\'s she like?"',
        nextSceneId: 'gala-blake-warns',
        isOptimal: false,
        tactic: 'seeking-reassurance',
        reaction: {
          text: '"Worried? Yes. She\'s... territorial. Old families don\'t like new faces."',
          emotion: 'concerned',
          bodyLanguage: 'You showed anxiety. He\'ll remember that.',
          scoreImpact: -5,
        },
      },
      {
        id: 'invite-subtle',
        text: '"It\'s just a party, Blake."',
        nextSceneId: 'gala-blake-warns',
        isOptimal: false,
        tactic: 'dismissive',
        reaction: {
          text: '"It\'s never just a party at that level. Everything is a test."',
          emotion: 'serious',
          bodyLanguage: 'You underestimated. He noticed.',
          scoreImpact: 0,
        },
      },
      {
        id: 'invite-close',
        text: '"Tell me everything you know about these people."',
        nextSceneId: 'gala-blake-intel',
        isOptimal: false,
        tactic: 'information-gathering',
        reaction: {
          text: '"Now we\'re talking." He pulls out his phone. "Let me show you who\'s who."',
          emotion: 'happy',
          bodyLanguage: 'Good instinct. But he only knows the surface.',
          scoreImpact: 10,
        },
      },
      {
        id: 'invite-optimal',
        text: '"I need a plus-one. Someone who won\'t embarrass me."',
        nextSceneId: 'gala-blake-ally',
        isOptimal: true,
        tactic: 'alliance-building',
        reaction: {
          text: 'He grins. "I thought you\'d never ask. I\'ll keep my mouth shut and my ears open."',
          emotion: 'happy',
          bodyLanguage: 'You secured an ally. He\'s loyal, if out of his depth.',
          scoreImpact: 15,
        },
      },
    ],
  },
  {
    id: 'gala-blake-warns',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: '"Victoria Ashworth is old Seattle money. Her husband Charles is the figurehead, but she runs everything."',
        speakerId: 'blake',
        emotion: 'serious',
      },
      {
        text: '"And there\'s this younger crowd that\'s been infiltrating these events. New money. Tech money. They\'re playing a different game."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: '"Your friend Kai... she runs with that crowd. Just... be careful whose side you\'re on."',
        speakerId: 'blake',
        emotion: 'serious',
      },
      {
        text: 'Sides. There are already sides.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'gala-kai-call',
  },
  {
    id: 'gala-blake-intel',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: 'Blake scrolls through photos. Names. Connections.',
      },
      {
        text: '"Charles Whitmore - host, harmless. Victoria - his wife, not harmless. Harrison Cole - nobody knows exactly what he does, but everyone defers to him."',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: '"Elena Vance - information broker. Her brother Tyler, you know him. And..."',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: 'He pauses at a photo.',
      },
      {
        text: '"Maris Caldwell. She\'ll be there."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: 'Of course she will.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'gala-kai-call',
  },
  {
    id: 'gala-blake-ally',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: '"I\'ve got your back. Whatever happens in there, I\'m with you."',
        speakerId: 'blake',
        emotion: 'serious',
      },
      {
        text: '"But fair warning - I don\'t know this world. I can watch, I can listen, but if things get complicated..."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: '"I\'ll handle complicated. You handle keeping me grounded."',
      },
      {
        text: 'He nods. A real alliance. Worth having.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'gala-kai-call',
  },
  {
    id: 'gala-kai-call',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: 'Your phone buzzes. Kai.',
      },
      {
        text: '"You got it." Not a question.',
        speakerId: 'kai',
        emotion: 'neutral',
      },
      {
        text: '"I got it."',
      },
      {
        text: '"Good. Listen carefully. This isn\'t a party. It\'s an audition. Everyone there is either evaluating you or being evaluated."',
        speakerId: 'kai',
        emotion: 'serious',
      },
      {
        text: '"Including you?"',
      },
      {
        text: 'Long pause.',
      },
      {
        text: 'She didn\'t say no.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'kai-trap',
        text: '"What exactly am I being evaluated for?"',
        nextSceneId: 'gala-kai-cryptic',
        isOptimal: false,
        tactic: 'direct-question',
        reaction: {
          text: '"If I told you, it wouldn\'t be a real test." Click.',
          emotion: 'cold',
          bodyLanguage: 'She hung up. You showed too much need to know.',
          scoreImpact: -10,
        },
      },
      {
        id: 'kai-subtle',
        text: '"I can handle myself."',
        nextSceneId: 'gala-kai-cryptic',
        isOptimal: false,
        tactic: 'confidence',
        reaction: {
          text: '"We\'ll see. Wear black. Arrive at 8:15. Not before, not after."',
          emotion: 'neutral',
          bodyLanguage: 'She\'s testing if you can follow instructions.',
          scoreImpact: 5,
        },
      },
      {
        id: 'kai-close',
        text: '"Who should I avoid? Who should I approach?"',
        nextSceneId: 'gala-kai-advice',
        isOptimal: false,
        tactic: 'strategic-question',
        reaction: {
          text: '"Avoid Dana Morrison. She\'s there. And she\'s been asking about you."',
          emotion: 'concerned',
          bodyLanguage: 'Useful intel. But she\'s watching how you react to it.',
          scoreImpact: 10,
        },
      },
      {
        id: 'kai-optimal',
        text: '"I assume you didn\'t vouch for me out of kindness. What do you get?"',
        nextSceneId: 'gala-kai-honest',
        isOptimal: true,
        tactic: 'leverage-awareness',
        reaction: {
          text: 'A laugh. Genuine. "Smart. If you succeed, I look good. If you fail..."',
          emotion: 'smirking',
          bodyLanguage: 'You understand the game. She respects that.',
          scoreImpact: 20,
        },
      },
    ],
  },
  {
    id: 'gala-kai-cryptic',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: 'The line goes dead. Kai doesn\'t waste words.',
      },
      {
        text: 'You stare at the invitation. Heavy paper. Heavy implications.',
      },
      {
        text: 'Whatever this is, it\'s bigger than a party.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'gala-preparation-intro',
  },
  {
    id: 'gala-kai-advice',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: '"Dana\'s been talking to Victoria. Positioning herself. Whatever happened between you two... she hasn\'t forgotten."',
        speakerId: 'kai',
        emotion: 'serious',
      },
      {
        text: '"And Maris?"',
      },
      {
        text: '"Maris... she asked about you specifically. That could be good. Or very, very bad."',
        speakerId: 'kai',
        emotion: 'neutral',
      },
      {
        text: 'Maris asked about me. Why does that feel like being circled by a shark?',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'gala-preparation-intro',
  },
  {
    id: 'gala-kai-honest',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: '"If you fail, I take the hit. But I don\'t think you\'ll fail."',
        speakerId: 'kai',
        emotion: 'smirking',
      },
      {
        text: '"That\'s not an answer."',
      },
      {
        text: '"It\'s the only one you\'re getting. Be there. Be sharp. And whatever happens with Maris... don\'t blink first."',
        speakerId: 'kai',
        emotion: 'serious',
      },
      {
        text: 'She knows something. But she won\'t say what.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'gala-preparation-intro',
  },
];
