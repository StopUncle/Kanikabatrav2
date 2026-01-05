import type { ForkScene } from '../../../types';

/**
 * Climax - The Bridge
 * Connection to Level 3 established
 */
export const bridgeScenes: ForkScene[] = [
  {
    id: 'climax-the-bridge',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    dialog: [
      {
        text: 'The night winds down. You\'ve made connections. Learned lessons. Survived.',
      },
      {
        text: 'Blake finds you near the exit.',
      },
      {
        text: '"So. What\'s the verdict on the social scene?"',
        speakerId: 'blake',
        emotion: 'curious',
      },
    ],
    nextSceneId: 'climax-reflection',
  },
  {
    id: 'climax-reflection',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    dialog: [
      {
        text: 'Tyler. The validation-seeker who opens doors if you stroke his ego right.',
      },
      {
        text: 'Dana. The covert saboteur with a sweet smile and a hidden knife.',
      },
      {
        text: 'Marcus. The dismissive avoidant who only chases what retreats.',
      },
      {
        text: 'And somewhere in this room... Maris. You feel her gaze before you see it.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'climax-kai-approach',
  },
  {
    id: 'climax-kai-approach',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    mood: 'mysterious',
    dialog: [
      {
        text: 'A new face approaches. Intense eyes. Curious expression.',
      },
      {
        text: '"You\'re the one who stared down Maris Caldwell. That takes guts."',
        speakerId: 'kai',
        emotion: 'curious',
      },
      {
        text: '"I\'m Kai. I run with... a different crowd. We noticed you tonight."',
        speakerId: 'kai',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'kai-trap',
        text: '"Noticed me? What does that mean?"',
        nextSceneId: 'climax-kai-explains',
        isOptimal: false,
        tactic: 'curious',
        reaction: {
          text: '"It means you\'re interesting. And we\'re always looking for interesting."',
          emotion: 'smirking',
          bodyLanguage: 'Vague. Enticing. Classic recruitment.',
          scoreImpact: 0,
        },
      },
      {
        id: 'kai-subtle',
        text: '"Different crowd how?"',
        nextSceneId: 'climax-kai-hints',
        isOptimal: false,
        tactic: 'inquiry',
        reaction: {
          text: '"The kind that doesn\'t show up on guest lists. The kind that makes guest lists."',
          emotion: 'smirking',
          bodyLanguage: 'Power players. Underground networks.',
          scoreImpact: 5,
        },
      },
      {
        id: 'kai-close',
        text: '"I don\'t chase invitations. If you have something to offer, say it."',
        nextSceneId: 'climax-kai-direct',
        isOptimal: false,
        tactic: 'frame',
        reaction: {
          text: 'Kai laughs. "Oh, I like you. Level 3 material for sure."',
          emotion: 'happy',
          bodyLanguage: 'Level 3. What does that mean?',
          scoreImpact: 10,
        },
      },
      {
        id: 'kai-optimal',
        text: '"I don\'t know you. But I\'m listening."',
        nextSceneId: 'climax-kai-perfect',
        isOptimal: true,
        tactic: 'open-cautious',
        reaction: {
          text: '"Smart. Most people either jump in or run away. You\'re in the middle. That\'s rare."',
          emotion: 'happy',
          bodyLanguage: 'The right balance of interest and boundaries.',
          scoreImpact: 15,
        },
      },
    ],
  },
  // Kai branches
  {
    id: 'climax-kai-explains',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    dialog: [
      {
        text: '"There\'s a party next month. Very exclusive. The kind where careers are made."',
        speakerId: 'kai',
        emotion: 'neutral',
      },
      {
        text: '"Maris\'s family is hosting. And someone put your name on the maybe list."',
        speakerId: 'kai',
        emotion: 'smirking',
      },
      {
        text: 'Maybe list. Which means someone has to vouch for you.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'climax-invitation',
  },
  {
    id: 'climax-kai-hints',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    dialog: [
      {
        text: '"The Caldwell Inner Circle. Old money. Real power. The kind that doesn\'t need Instagram."',
        speakerId: 'kai',
        emotion: 'neutral',
      },
      {
        text: '"Maris is the gatekeeper. But there are others. People who run things from the shadows."',
        speakerId: 'kai',
        emotion: 'smirking',
      },
      {
        text: 'The next level. Literally.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'climax-invitation',
  },
  {
    id: 'climax-kai-direct',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    dialog: [
      {
        text: '"Fine. Direct it is."',
        speakerId: 'kai',
        emotion: 'neutral',
      },
      {
        text: '"The Caldwell Estate. One month from now. Invitation only. Someone wants you there."',
        speakerId: 'kai',
        emotion: 'neutral',
      },
      {
        text: '"Who? Can\'t say. But you handled tonight well. That counts for something."',
        speakerId: 'kai',
        emotion: 'smirking',
      },
    ],
    nextSceneId: 'climax-invitation',
  },
  {
    id: 'climax-kai-perfect',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    dialog: [
      {
        text: '"Here\'s the deal. There\'s an event. The real one. Not this."',
        speakerId: 'kai',
        emotion: 'neutral',
      },
      {
        text: '"Maris\'s inner circle. The actual power players. And someone—maybe Maris herself—wants to see what you\'re made of."',
        speakerId: 'kai',
        emotion: 'neutral',
      },
      {
        text: 'The next level of the game. The Caldwell Estate.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'climax-invitation',
  },
  {
    id: 'climax-invitation',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    mood: 'mysterious',
    dialog: [
      {
        text: 'Kai hands you a card. Matte black. One line of text: an address.',
      },
      {
        text: '"Show up. Don\'t show up. Your choice."',
        speakerId: 'kai',
        emotion: 'neutral',
      },
      {
        text: '"But between you and me? Maris doesn\'t invite people twice."',
        speakerId: 'kai',
        emotion: 'smirking',
      },
      {
        text: 'Kai disappears into the crowd. Blake stares at the card.',
      },
    ],
    nextSceneId: 'climax-ending',
  },
  {
    id: 'climax-ending',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Hunting Grounds Complete',
    endingSummary: 'You navigated clubs, apps, frenemies, and exes. Tyler respects you. Dana fears you. Marcus is intrigued. And Maris... is watching. The Caldwell Estate awaits.',
    dialog: [
      {
        text: '"What was that about?"',
        speakerId: 'blake',
        emotion: 'confused',
      },
      {
        text: '"The next level."',
      },
      {
        text: 'Blake looks at the card. Then at you.',
      },
      {
        text: '"You\'re really going, aren\'t you?"',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: 'You pocket the card.',
      },
      {
        text: '"Maris doesn\'t invite people twice."',
      },
      {
        text: 'Level 2 complete. The Caldwell Estate beckons.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
  },
];
