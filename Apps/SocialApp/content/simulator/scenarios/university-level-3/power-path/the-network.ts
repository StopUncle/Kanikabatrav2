import type { ForkScene } from '../../../types';

/**
 * Mission 13: The Power Play - The Network
 * Meeting Harrison Cole. Information is currency.
 */
export const networkScenes: ForkScene[] = [
  {
    id: 'power-network-intro',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    chapter: { name: 'Mission 13: The Power Play', index: 1, total: 5 },
    mood: 'professional',
    dialog: [
      {
        text: 'Harrison Cole. Silver hair. Immaculate suit. The still center around which the party orbits.',
      },
      {
        text: 'He\'s at the bar. Alone. No one approaches without invitation.',
      },
      {
        text: 'Blake grabs your arm. "Are you seriously going over there? He looks like he eats people."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: 'Maris said don\'t wait for him to initiate. Don\'t be boring.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'harrison-trap',
        text: 'Approach and wait for him to acknowledge you. Show respect.',
        nextSceneId: 'harrison-waiting',
        isOptimal: false,
        tactic: 'deferential',
        reaction: {
          text: 'He glances at you. Looks away. A minute passes. Two. He doesn\'t speak.',
          emotion: 'cold',
          bodyLanguage: 'You\'re invisible. You waited. He never speaks first.',
          scoreImpact: -20,
        },
      },
      {
        id: 'harrison-subtle',
        text: '"Mr. Cole. I\'m told you never speak first. I can work with that."',
        nextSceneId: 'harrison-acknowledged',
        isOptimal: false,
        tactic: 'direct-humble',
        reaction: {
          text: 'He turns. Studies you. "Told by whom?"',
          emotion: 'neutral',
          bodyLanguage: 'He\'s engaged, but testing if you\'ll name your source.',
          scoreImpact: 5,
        },
      },
      {
        id: 'harrison-close',
        text: '"Maris Caldwell sent me. She said you might find me... not boring."',
        nextSceneId: 'harrison-interested',
        isOptimal: false,
        tactic: 'name-drop',
        reaction: {
          text: 'Something flickers in his eyes. "Maris vouched for you. That\'s unusual."',
          emotion: 'knowing',
          bodyLanguage: 'Maris\'s name carries weight. But now you\'re her responsibility.',
          scoreImpact: 10,
        },
      },
      {
        id: 'harrison-optimal',
        text: '"The view from here is interesting. You can see everyone but they can\'t approach. Intentional?"',
        nextSceneId: 'harrison-engaged',
        isOptimal: true,
        tactic: 'observation',
        reaction: {
          text: 'He actually smiles. Barely. "You noticed. Most people don\'t."',
          emotion: 'smirking',
          bodyLanguage: 'You saw his strategy. That\'s rare. He\'s interested.',
          scoreImpact: 20,
        },
      },
    ],
  },
  {
    id: 'harrison-waiting',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    mood: 'cold',
    dialog: [
      {
        text: 'Three minutes. The longest three minutes of your life.',
      },
      {
        text: 'Finally, he speaks. "Do you always wait to be noticed?"',
        speakerId: 'harrison',
        emotion: 'cold',
      },
      {
        text: '"Waiting is for people who don\'t know what they want."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: 'Lesson learned. Painfully.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'harrison-conversation',
  },
  {
    id: 'harrison-acknowledged',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    mood: 'professional',
    dialog: [
      {
        text: '"Told by someone who knows me." You don\'t name Maris. He\'ll figure it out.',
      },
      {
        text: '"Discretion. Interesting." He signals the bartender. "What do you drink?"',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: 'A drink. He\'s offering time, not just alcohol.',
      },
      {
        text: '"Whatever you\'re having."',
      },
    ],
    nextSceneId: 'harrison-conversation',
  },
  {
    id: 'harrison-interested',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    mood: 'professional',
    dialog: [
      {
        text: '"Maris has... particular taste. In people, in projects."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: '"If she vouched for you, there\'s a reason. She doesn\'t waste resources."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: 'He signals for a drink. Doesn\'t ask what you want—orders something amber.',
      },
      {
        text: '"The question is: what resource does she think you are?"',
        speakerId: 'harrison',
        emotion: 'cold',
      },
    ],
    nextSceneId: 'harrison-conversation',
  },
  {
    id: 'harrison-engaged',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    mood: 'professional',
    dialog: [
      {
        text: '"Design psychology. People approach what seems accessible. I\'m not accessible."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"You read the room in under a minute. That\'s a useful skill."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: 'He signals the bartender. Two drinks appear.',
      },
      {
        text: '"I assume Maris sent you. She has good instincts about potential."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'harrison-conversation',
  },
  {
    id: 'harrison-conversation',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    mood: 'professional',
    dialog: [
      {
        text: 'The drink is single malt. Expensive. A test of its own.',
      },
      {
        text: '"I run a network. Unofficial. People who solve problems for people who have them."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"Not charity work. Not exactly legal. But necessary."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: 'He\'s being remarkably direct. That\'s either trust or a trap.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'harrison-offer',
  },
  {
    id: 'harrison-offer',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    mood: 'cold',
    dialog: [
      {
        text: '"Every gala is a recruiting ground. Most people here don\'t know that."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"Maris and Victoria run competing... talent evaluations. Old money versus new methods."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: 'He looks at you. Really looks.',
      },
      {
        text: '"The question I ask everyone: what would you do if no one would ever find out?"',
        speakerId: 'harrison',
        emotion: 'cold',
      },
      {
        text: 'Careful. This is the real test.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'harrison-test-trap',
        text: '"I... I don\'t know. I\'ve never really thought about it."',
        nextSceneId: 'harrison-dismissed',
        isOptimal: false,
        tactic: 'uncertain',
        reaction: {
          text: '"Everyone who says that is lying. Or boring." He returns to his drink.',
          emotion: 'cold',
          bodyLanguage: 'You failed. Uncertainty is weakness.',
          scoreImpact: -20,
        },
      },
      {
        id: 'harrison-test-subtle',
        text: '"Nothing different. My ethics don\'t depend on getting caught."',
        nextSceneId: 'harrison-noted',
        isOptimal: false,
        tactic: 'moral-high-ground',
        reaction: {
          text: '"Virtue signaling. Admirable, if true. Usually false."',
          emotion: 'smirking',
          bodyLanguage: 'He doesn\'t believe you. Or he doesn\'t care.',
          scoreImpact: 0,
        },
      },
      {
        id: 'harrison-test-close',
        text: '"Redistribute power. Take from those who abuse it, give to those who deserve it."',
        nextSceneId: 'harrison-interested-more',
        isOptimal: false,
        tactic: 'robin-hood',
        reaction: {
          text: '"A vigilante streak. That can be useful. Or dangerous."',
          emotion: 'knowing',
          bodyLanguage: 'He\'s seen this type before. You\'re categorized.',
          scoreImpact: 10,
        },
      },
      {
        id: 'harrison-test-optimal',
        text: '"I\'d want to find out what I\'m actually capable of. Without the safety net of consequences."',
        nextSceneId: 'harrison-impressed',
        isOptimal: true,
        tactic: 'honest-dark',
        reaction: {
          text: 'He goes still. "Now that\'s an interesting answer."',
          emotion: 'curious',
          bodyLanguage: 'You didn\'t moralize or fantasize. You told the truth.',
          scoreImpact: 25,
        },
      },
    ],
  },
  {
    id: 'harrison-dismissed',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    mood: 'cold',
    dialog: [
      {
        text: 'The conversation is over. You can feel it.',
      },
      {
        text: '"Enjoy the party. The champagne is excellent."',
        speakerId: 'harrison',
        emotion: 'cold',
      },
      {
        text: 'Dismissal. Polite. Final.',
      },
      {
        text: 'You failed his test. But the night isn\'t over.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'elena-approach',
  },
  {
    id: 'harrison-noted',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    mood: 'professional',
    dialog: [
      {
        text: '"Noted." He finishes his drink.',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"Elena Vance is circulating. She knows everyone\'s business. Might be useful."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: 'He\'s pointing you toward another test. Or opportunity.',
      },
      {
        text: '"I\'ll be watching."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'elena-approach',
  },
  {
    id: 'harrison-interested-more',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    mood: 'professional',
    dialog: [
      {
        text: '"Redistribution. That requires knowing who deserves what."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: '"Elena Vance. My information specialist. Talk to her. She\'ll teach you how judgment really works."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: 'He\'s sending you deeper into the network. Deliberately.',
      },
      {
        text: '"Don\'t disappoint Maris. She has... consequences."',
        speakerId: 'harrison',
        emotion: 'cold',
      },
    ],
    nextSceneId: 'elena-approach',
  },
  {
    id: 'harrison-impressed',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    mood: 'professional',
    dialog: [
      {
        text: '"Most people lie. They say \'help others\' or \'punish the wicked.\' Noble. False."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: '"You admitted curiosity about your own capacity. That\'s rare. And useful."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: 'He hands you a card. Blank except for a phone number.',
      },
      {
        text: '"Talk to Elena. When you\'re ready for the next conversation, call."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: 'A card. You just got a card.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'elena-approach',
  },
  {
    id: 'elena-approach',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    mood: 'party',
    dialog: [
      {
        text: 'Elena Vance finds you before you find her.',
      },
      {
        text: '"You survived Harrison. That\'s more than most manage."',
        speakerId: 'elena',
        emotion: 'seductive',
      },
      {
        text: 'She\'s stunning. Dangerously so. Every movement calculated for impact.',
      },
      {
        text: '"I\'m Elena. Tyler\'s sister. And I know everything about everyone here. Including you."',
        speakerId: 'elena',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'power-leverage-intro',
  },
];
