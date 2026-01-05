import type { ForkScene } from '../../../types';

/**
 * Mission 17: Room Assignment
 * The walk to dinner reveals social hierarchy
 */
export const roomScenes: ForkScene[] = [
  {
    id: 'room-escort',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'arrival',
    chapter: { name: 'The Island', index: 6, total: 6 },
    mood: 'mysterious',
    dialog: [
      {
        text: 'A young man in a crisp uniform waits at the door. Early twenties. Staff, not guest.',
      },
      {
        text: '"I\'m here to escort you to dinner. If you\'d prefer to walk alone, the path is marked."',
      },
      {
        text: 'Blake glances at you. Another choice. Even this matters.',
      },
      {
        text: 'Independence versus guidance. They\'re measuring everything.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'escort-trap',
        text: '"We\'ll take the escort. Thank you."',
        nextSceneId: 'room-escorted-walk',
        isOptimal: false,
        tactic: 'compliance',
        reaction: {
          text: 'He nods. No judgment visible. But noted.',
          emotion: 'neutral',
          bodyLanguage: 'You chose the safe option. Some see that as weakness.',
          scoreImpact: 0,
        },
      },
      {
        id: 'escort-subtle',
        text: '"We\'ll find our own way. Thank you."',
        nextSceneId: 'room-independent-walk',
        isOptimal: false,
        tactic: 'independence',
        reaction: {
          text: 'A flicker of respect. "The main house is lit. Follow the lanterns."',
          emotion: 'neutral',
          bodyLanguage: 'Independence noted. Confidence displayed.',
          scoreImpact: 10,
        },
      },
      {
        id: 'escort-close',
        text: '"Walk with us. Tell us about the island on the way."',
        nextSceneId: 'room-intel-walk',
        isOptimal: false,
        tactic: 'information-gathering',
        reaction: {
          text: 'Surprise. "I... yes. Of course."',
          emotion: 'curious',
          bodyLanguage: 'You turned protocol into opportunity. Staff see things.',
          scoreImpact: 15,
        },
      },
      {
        id: 'escort-optimal',
        text: '"What do most guests choose?"',
        nextSceneId: 'room-meta-walk',
        isOptimal: true,
        tactic: 'meta-information',
        reaction: {
          text: 'He hesitates. "The confident ones walk alone. The new ones... don\'t."',
          emotion: 'knowing',
          bodyLanguage: 'You extracted how guests are categorized. Valuable.',
          scoreImpact: 20,
        },
      },
    ],
  },
  {
    id: 'room-escorted-walk',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'arrival',
    mood: 'peaceful',
    dialog: [
      {
        text: 'The escort leads. Silent. Professional.',
      },
      {
        text: 'The path winds through sculpted gardens. Every plant placed with intention.',
      },
      {
        text: 'Blake walks beside you. "This feels like a museum. Beautiful but..."',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: '"Curated?"',
      },
      {
        text: '"Yeah. Exactly."',
        speakerId: 'blake',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'room-main-house-approach',
  },
  {
    id: 'room-independent-walk',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'arrival',
    mood: 'mysterious',
    dialog: [
      {
        text: 'You walk the lantern-lit path alone. Blake beside you.',
      },
      {
        text: '"Feels like a test." He says quietly.',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: '"Everything here is a test."',
      },
      {
        text: 'Other paths branch off. Unmarked. Private.',
      },
      {
        text: 'Secrets in every direction. But we stay on the lit path. For now.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'room-main-house-approach',
  },
  {
    id: 'room-intel-walk',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'arrival',
    mood: 'professional',
    dialog: [
      {
        text: 'The escort—his name is Thomas—walks with you. Speaking in careful phrases.',
      },
      {
        text: '"The island has been in the Whitmore family for three generations."',
        speakerId: 'thomas',
        emotion: 'neutral',
      },
      {
        text: '"Mr. Cole acquired it through... a partnership."',
        speakerId: 'thomas',
        emotion: 'neutral',
      },
      {
        text: 'Blake catches your eye. Partnership. Interesting word choice.',
      },
      {
        text: '"The Grove is one of the outer houses. The closest ones... those are for different guests."',
        speakerId: 'thomas',
        emotion: 'knowing',
      },
      {
        text: 'Hierarchy in architecture. We\'re on the periphery.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'room-main-house-approach',
  },
  {
    id: 'room-meta-walk',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'arrival',
    mood: 'mysterious',
    dialog: [
      {
        text: '"New ones don\'t." You repeat his words. "And we\'re in the Grove. The outer ring."',
      },
      {
        text: 'He shifts. Uncomfortable now. "I shouldn\'t have—"',
      },
      {
        text: '"It\'s fine. We appreciate the context."',
      },
      {
        text: 'Blake nods. "We know where we stand. That\'s useful."',
        speakerId: 'blake',
        emotion: 'knowing',
      },
      {
        text: 'The escort walks you to the house. More careful now. You learned something.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'room-main-house-approach',
  },
  {
    id: 'room-main-house-approach',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'arrival',
    mood: 'professional',
    dialog: [
      {
        text: 'The main house rises before you. Glass and stone. Understated power.',
      },
      {
        text: 'Through the windows: figures moving. Silhouettes of influence.',
      },
      {
        text: 'Blake straightens his jacket. "Ready?"',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: '"As we\'ll ever be."',
      },
      {
        text: 'The doors open. Light and sound spill out. The weekend begins.',
      },
      {
        text: 'No turning back now.',
        speakerId: 'inner-voice',
        emotion: 'serious',
      },
    ],
    nextSceneId: 'room-entrance',
  },
  {
    id: 'room-entrance',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'arrival',
    mood: 'professional',
    dialog: [
      {
        text: 'The foyer. Double-height ceiling. Art on every wall. Money made manifest.',
      },
      {
        text: 'Voices from deeper in. The dinner gathering.',
      },
      {
        text: 'A woman approaches. Familiar face from your research.',
      },
      {
        text: 'Victoria Ashworth. Old money. Cold eyes.',
      },
      {
        text: '"The new blood arrives." She doesn\'t smile.',
        speakerId: 'victoria',
        emotion: 'cold',
      },
      {
        text: '"I\'ve heard about you. The one who caught Maris\'s attention."',
        speakerId: 'victoria',
        emotion: 'smirking',
      },
    ],
    nextSceneId: 'room-victoria-intro',
  },
  {
    id: 'room-victoria-intro',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'arrival',
    mood: 'cold',
    dialog: [
      {
        text: '"Maris doesn\'t usually notice... newcomers." Victoria circles you slowly.',
        speakerId: 'victoria',
        emotion: 'cold',
      },
      {
        text: '"Neither does Harrison. Yet here you are."',
        speakerId: 'victoria',
        emotion: 'knowing',
      },
      {
        text: '"Makes one wonder what you did. Or what you are."',
        speakerId: 'victoria',
        emotion: 'smirking',
      },
      {
        text: 'She\'s threatened. Interesting.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'victoria-trap',
        text: '"I\'m just lucky, I guess."',
        nextSceneId: 'room-victoria-dismissive',
        isOptimal: false,
        tactic: 'deflection',
        reaction: {
          text: '"Luck." She laughs. Cold. "There\'s no luck here. Only strategy."',
          emotion: 'cold',
          bodyLanguage: 'She dismissed you. Weak opening.',
          scoreImpact: -10,
        },
      },
      {
        id: 'victoria-subtle',
        text: '"I imagine you made an impression yourself, once."',
        nextSceneId: 'room-victoria-annoyed',
        isOptimal: false,
        tactic: 'redirect',
        reaction: {
          text: 'Her eyes narrow. "I\'m an Ashworth. We don\'t make impressions. We set standards."',
          emotion: 'angry',
          bodyLanguage: 'You touched a nerve. She\'s defensive now.',
          scoreImpact: 5,
        },
      },
      {
        id: 'victoria-close',
        text: '"I\'m still figuring that out myself. Maybe you can tell me."',
        nextSceneId: 'room-victoria-intrigued',
        isOptimal: false,
        tactic: 'curiosity',
        reaction: {
          text: 'A pause. "Interesting approach. Playing naive."',
          emotion: 'curious',
          bodyLanguage: 'She can\'t read your angle. That\'s valuable.',
          scoreImpact: 10,
        },
      },
      {
        id: 'victoria-optimal',
        text: '"Harrison collects assets. Maris identifies potential. I\'m neither lucky nor mysterious—just useful."',
        nextSceneId: 'room-victoria-impressed',
        isOptimal: true,
        tactic: 'clarity',
        reaction: {
          text: 'She stops. Reassesses. "You understand how this works."',
          emotion: 'knowing',
          bodyLanguage: 'You spoke her language. Network. Utility. Strategy.',
          scoreImpact: 25,
        },
      },
    ],
  },
  {
    id: 'room-victoria-dismissive',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'arrival',
    dialog: [
      {
        text: '"Strategy." Victoria turns away. "Something you might want to develop."',
        speakerId: 'victoria',
        emotion: 'cold',
      },
      {
        text: 'She walks toward the dining room. Dismissed.',
      },
      {
        text: 'Blake exhales. "She\'s terrifying."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: 'And we just showed weakness. Not ideal.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'day-one-dinner-intro',
  },
  {
    id: 'room-victoria-annoyed',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'arrival',
    dialog: [
      {
        text: '"Standards." Victoria repeats. Composing herself.',
        speakerId: 'victoria',
        emotion: 'cold',
      },
      {
        text: '"Enjoy dinner. We\'ll see how long the Caldwell fascination lasts."',
        speakerId: 'victoria',
        emotion: 'smirking',
      },
      {
        text: 'She walks away. Blake lets out a breath.',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: 'Defensive. We found a pressure point. Useful.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'day-one-dinner-intro',
  },
  {
    id: 'room-victoria-intrigued',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'arrival',
    dialog: [
      {
        text: '"Playing naive." Victoria considers this. "Or actually naive."',
        speakerId: 'victoria',
        emotion: 'curious',
      },
      {
        text: '"I\'ll be watching to see which."',
        speakerId: 'victoria',
        emotion: 'knowing',
      },
      {
        text: 'She gestures toward the dining room. An invitation. Of sorts.',
      },
      {
        text: 'Curiosity is better than dismissal. We\'re on her radar now.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'day-one-dinner-intro',
  },
  {
    id: 'room-victoria-impressed',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'arrival',
    dialog: [
      {
        text: '"How this works." Victoria almost smiles. "Maris was right about you."',
        speakerId: 'victoria',
        emotion: 'smirking',
      },
      {
        text: '"We should talk more. After dinner. The Ashworths have... options."',
        speakerId: 'victoria',
        emotion: 'knowing',
      },
      {
        text: 'She walks toward the dining room. Blake stares.',
        speakerId: 'blake',
        emotion: 'confused',
      },
      {
        text: '"Did you just... recruit her?"',
        speakerId: 'blake',
        emotion: 'curious',
      },
      {
        text: 'Or she\'s recruiting us. Either way, we have options.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'day-one-dinner-intro',
  },
];
