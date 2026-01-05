import type { ForkScene } from '../../../types';

/**
 * Mission 14: Ghosts of the Past - Dana Morrison
 * The rival from Level 2 has climbed higher
 */
export const ghostDanaScenes: ForkScene[] = [
  {
    id: 'ghost-dana-appears',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    chapter: { name: 'Ghosts of the Past', index: 5, total: 5 },
    mood: 'tense',
    dialog: [
      {
        text: 'Dana Morrison. Here. In this world.',
      },
      {
        text: 'She\'s dressed differently now. Expensive. Confident. She\'s climbed too.',
      },
      {
        text: '"Well, well." Her voice carries across the distance. "Small world."',
        speakerId: 'dana',
        emotion: 'smirking',
      },
      {
        text: 'The rival who pushed you. Made you stronger. And now she\'s here.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ghost-dana-approach',
  },
  {
    id: 'ghost-dana-approach',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    mood: 'tense',
    dialog: [
      {
        text: 'She walks over. The same confident stride. The same calculating eyes.',
      },
      {
        text: '"I heard you were making waves. Didn\'t believe it until now."',
        speakerId: 'dana',
        emotion: 'neutral',
      },
      {
        text: '"Waves. One word for it."',
      },
      {
        text: '"The Caldwells. Harrison Cole. Victoria Ashworth." She lists them.',
        speakerId: 'dana',
        emotion: 'knowing',
      },
      {
        text: '"You\'ve been busy. Or reckless. Hard to tell which."',
        speakerId: 'dana',
        emotion: 'smirking',
      },
    ],
    dialogueChoices: [
      {
        id: 'dana-trap',
        text: '"What are you doing here, Dana?"',
        nextSceneId: 'ghost-dana-defensive',
        isOptimal: false,
        tactic: 'defensive',
        reaction: {
          text: '"Same as you. Climbing. Did you think you were special?"',
          emotion: 'cold',
          bodyLanguage: 'Defensive question. She smells weakness.',
          scoreImpact: -10,
        },
      },
      {
        id: 'dana-subtle',
        text: '"Still keeping track of me. Flattering."',
        nextSceneId: 'ghost-dana-parry',
        isOptimal: false,
        tactic: 'deflection',
        reaction: {
          text: '"Don\'t flatter yourself. The grapevine talks."',
          emotion: 'neutral',
          bodyLanguage: 'Decent counter. Neither gains ground.',
          scoreImpact: 5,
        },
      },
      {
        id: 'dana-close',
        text: '"Competition breeds excellence. You taught me that."',
        nextSceneId: 'ghost-dana-acknowledgment',
        isOptimal: false,
        tactic: 'credit',
        reaction: {
          text: 'She blinks. Surprised. "That\'s... unexpectedly gracious."',
          emotion: 'curious',
          bodyLanguage: 'You acknowledged her. Threw her off balance.',
          scoreImpact: 15,
        },
      },
      {
        id: 'dana-optimal',
        text: '"Good. Now we can compete on a real stage."',
        nextSceneId: 'ghost-dana-respect',
        isOptimal: true,
        tactic: 'escalation',
        reaction: {
          text: 'A real smile. First genuine one. "Finally. Someone who gets it."',
          emotion: 'smirking',
          bodyLanguage: 'You elevated the game. She respects that.',
          scoreImpact: 25,
        },
      },
    ],
  },
  {
    id: 'ghost-dana-defensive',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"I\'ve been here longer than you think. Different circles. Same destination."',
        speakerId: 'dana',
        emotion: 'neutral',
      },
      {
        text: '"Victoria is a friend. We have... history."',
        speakerId: 'dana',
        emotion: 'knowing',
      },
      {
        text: 'Victoria. Of course. Birds of a feather.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'ghost-dana-warning',
  },
  {
    id: 'ghost-dana-parry',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"The grapevine says you\'re playing a dangerous game. Multiple sides."',
        speakerId: 'dana',
        emotion: 'neutral',
      },
      {
        text: '"The grapevine says a lot of things."',
      },
      {
        text: '"Usually true. In my experience."',
        speakerId: 'dana',
        emotion: 'knowing',
      },
      {
        text: 'She\'s fishing. Don\'t give her more than she has.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ghost-dana-warning',
  },
  {
    id: 'ghost-dana-acknowledgment',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"Gracious." She rolls the word around. "You\'ve changed."',
        speakerId: 'dana',
        emotion: 'neutral',
      },
      {
        text: '"So have you."',
      },
      {
        text: '"We both had to. This world doesn\'t accept anything less."',
        speakerId: 'dana',
        emotion: 'serious',
      },
      {
        text: 'Common ground. Unexpected. But real.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ghost-dana-offer',
  },
  {
    id: 'ghost-dana-respect',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"A real stage." She nods slowly.',
        speakerId: 'dana',
        emotion: 'smirking',
      },
      {
        text: '"The university was practice. This is the game."',
        speakerId: 'dana',
        emotion: 'serious',
      },
      {
        text: '"And we\'re both here to win."',
      },
      {
        text: '"Obviously. The question is whether we win together or against each other."',
        speakerId: 'dana',
        emotion: 'knowing',
      },
      {
        text: 'A pivot. From rival to potential ally. Interesting.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ghost-dana-offer',
  },
  {
    id: 'ghost-dana-warning',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    mood: 'tense',
    dialog: [
      {
        text: '"A word of advice. Since we have... history."',
        speakerId: 'dana',
        emotion: 'neutral',
      },
      {
        text: '"Victoria is building something. Against the Caldwells. And she wants soldiers."',
        speakerId: 'dana',
        emotion: 'serious',
      },
      {
        text: '"She approached you?"',
      },
      {
        text: '"She approached everyone worth approaching. You included, I assume."',
        speakerId: 'dana',
        emotion: 'knowing',
      },
      {
        text: 'A war coming. Dana knows which side she\'s on.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'ghost-dana-sides',
  },
  {
    id: 'ghost-dana-offer',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    mood: 'professional',
    dialog: [
      {
        text: '"I have a proposition."',
        speakerId: 'dana',
        emotion: 'neutral',
      },
      {
        text: '"We were rivals. Maybe we should be allies."',
        speakerId: 'dana',
        emotion: 'serious',
      },
      {
        text: '"What changed?"',
      },
      {
        text: '"The stakes. In school, we competed for grades. Here, we compete for survival."',
        speakerId: 'dana',
        emotion: 'knowing',
      },
      {
        text: 'An alliance with your former rival. Stranger things have happened.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'alliance-trap',
        text: '"Why should I trust you?"',
        nextSceneId: 'ghost-dana-distrust',
        isOptimal: false,
        tactic: 'suspicion',
        reaction: {
          text: '"You shouldn\'t. That\'s not the point. The point is mutual benefit."',
          emotion: 'cold',
          bodyLanguage: 'Valid question. Cold response.',
          scoreImpact: 0,
        },
      },
      {
        id: 'alliance-subtle',
        text: '"What would this alliance look like?"',
        nextSceneId: 'ghost-dana-details',
        isOptimal: false,
        tactic: 'practical',
        reaction: {
          text: '"Information sharing. Strategic coordination. No backstabbing."',
          emotion: 'neutral',
          bodyLanguage: 'Practical approach. She respects that.',
          scoreImpact: 10,
        },
      },
      {
        id: 'alliance-close',
        text: '"Former rivals make the best allies. They know each other\'s weaknesses."',
        nextSceneId: 'ghost-dana-smart',
        isOptimal: false,
        tactic: 'insight',
        reaction: {
          text: '"Exactly. We\'ve already stress-tested this relationship."',
          emotion: 'smirking',
          bodyLanguage: 'You understand the dynamic. Good.',
          scoreImpact: 15,
        },
      },
      {
        id: 'alliance-optimal',
        text: '"Alliance implies equality. Are you offering that, or am I joining your team?"',
        nextSceneId: 'ghost-dana-terms',
        isOptimal: true,
        tactic: 'negotiation',
        reaction: {
          text: 'She laughs. "Partnership. True partnership. No hierarchy."',
          emotion: 'happy',
          bodyLanguage: 'You negotiated terms upfront. Smart.',
          scoreImpact: 25,
        },
      },
    ],
  },
  {
    id: 'ghost-dana-sides',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"I\'m telling you this because... well. Old times."',
        speakerId: 'dana',
        emotion: 'neutral',
      },
      {
        text: '"Choose carefully. This war is coming whether you want it or not."',
        speakerId: 'dana',
        emotion: 'serious',
      },
      {
        text: 'She walks away. A warning delivered.',
      },
      {
        text: 'Dana Morrison. Still a rival. But at least an honest one.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ghost-complete',
  },
  {
    id: 'ghost-dana-distrust',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"Mutual benefit. The only honest basis for any relationship."',
        speakerId: 'dana',
        emotion: 'neutral',
      },
      {
        text: 'She pulls out a card. Plain. Professional.',
      },
      {
        text: '"When you decide. Either way. Let me know."',
        speakerId: 'dana',
        emotion: 'knowing',
      },
      {
        text: 'A door opened. Whether to walk through is another question.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'ghost-complete',
  },
  {
    id: 'ghost-dana-details',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"Information sharing. I hear things from Victoria\'s side. You hear things from... wherever you are."',
        speakerId: 'dana',
        emotion: 'neutral',
      },
      {
        text: '"We compare notes. Fill in gaps. Both benefit."',
        speakerId: 'dana',
        emotion: 'knowing',
      },
      {
        text: '"And when our interests conflict?"',
      },
      {
        text: '"We negotiate. Like adults."',
        speakerId: 'dana',
        emotion: 'smirking',
      },
    ],
    nextSceneId: 'ghost-complete',
  },
  {
    id: 'ghost-dana-smart',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"Stress-tested. I like that framing."',
        speakerId: 'dana',
        emotion: 'smirking',
      },
      {
        text: '"We know what we\'re getting into. No illusions."',
        speakerId: 'dana',
        emotion: 'neutral',
      },
      {
        text: '"Just mutual benefit."',
      },
      {
        text: '"Just mutual benefit." She extends her hand.',
        speakerId: 'dana',
        emotion: 'serious',
      },
      {
        text: 'A handshake with your former rival. The universe has a sense of humor.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ghost-complete',
  },
  {
    id: 'ghost-dana-terms',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"True partnership. Equal standing. Shared risk, shared reward."',
        speakerId: 'dana',
        emotion: 'serious',
      },
      {
        text: '"And if one of us has to choose between the other and something bigger?"',
      },
      {
        text: '"Then we discuss. Openly. No surprises."',
        speakerId: 'dana',
        emotion: 'knowing',
      },
      {
        text: 'She extends her hand. A pact.',
      },
      {
        text: '"Deal?"',
        speakerId: 'dana',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'ghost-complete',
  },
  {
    id: 'ghost-complete',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    chapter: { name: 'Mission Complete: Ghosts of the Past', index: 5, total: 5 },
    mood: 'professional',
    dialog: [
      {
        text: 'Dana disappears back into the crowd.',
      },
      {
        text: 'Blake exhales. "Was that who I think it was?"',
        speakerId: 'blake',
        emotion: 'curious',
      },
      {
        text: '"From the university. Dana Morrison."',
      },
      {
        text: '"The rival? Here? This night keeps getting stranger."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: 'The past caught up. Now the future beckons.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'climax-setup',
  },
];
