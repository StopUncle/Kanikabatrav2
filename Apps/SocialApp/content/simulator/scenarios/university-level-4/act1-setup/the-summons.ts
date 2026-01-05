import type { ForkScene } from '../../../types';

/**
 * The Summons - Harrison's invitation arrives in detail
 */
export const summonsScenes: ForkScene[] = [
  {
    id: 'summons-intro',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'setup',
    chapter: { name: 'The Summons', index: 2, total: 6 },
    mood: 'mysterious',
    dialog: [
      {
        text: 'Blake stares at your phone. "Harrison Cole? The tech billionaire Harrison Cole?"',
        speakerId: 'blake',
        emotion: 'confused',
      },
      {
        text: '"The one who built the network everyone at the gala was terrified of?"',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: 'A knock at the door. Not the buzzer. The door itself.',
      },
      {
        text: 'Someone bypassed building security.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'summons-envelope',
  },
  {
    id: 'summons-envelope',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'setup',
    mood: 'mysterious',
    dialog: [
      {
        text: 'You open the door. No one there. Just an envelope on the mat.',
      },
      {
        text: 'Heavy paper. No return address. Your name in elegant calligraphy.',
      },
      {
        text: 'Inside: an invitation. Gold-embossed. A private island coordinates.',
      },
      {
        text: '"The Whitmore Foundation Annual Retreat. Your presence is expected."',
      },
      {
        text: 'Handwritten at the bottom: "Bring your friend. I\'d like to meet him. - H.C."',
      },
      {
        text: 'Blake. He specifically mentioned Blake.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'summons-blake-reaction',
  },
  {
    id: 'summons-blake-reaction',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'setup',
    mood: 'tense',
    dialog: [
      {
        text: 'Blake reads over your shoulder. Goes pale.',
      },
      {
        text: '"He mentioned me specifically. By name. How does he know who I am?"',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: '"This is... this is a lot. A private island? With billionaires?"',
        speakerId: 'blake',
        emotion: 'confused',
      },
      {
        text: 'He wants to say no. You can see it.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'blake-trap',
        text: '"You don\'t have to come. I can go alone."',
        nextSceneId: 'summons-blake-hurt',
        isOptimal: false,
        tactic: 'offering-out',
        reaction: {
          text: '"And leave you alone with those people?" He looks hurt. "I\'m not abandoning you."',
          emotion: 'angry',
          bodyLanguage: 'You offered him an exit. He took it as abandonment.',
          scoreImpact: -5,
        },
      },
      {
        id: 'blake-subtle',
        text: '"What do you think we should do?"',
        nextSceneId: 'summons-blake-uncertain',
        isOptimal: false,
        tactic: 'deferring',
        reaction: {
          text: '"I think..." He hesitates. "I think I\'m scared."',
          emotion: 'sad',
          bodyLanguage: 'He wanted you to lead. You asked him to.',
          scoreImpact: 5,
        },
      },
      {
        id: 'blake-close',
        text: '"They\'re testing us. Turning down Harrison Cole isn\'t an option."',
        nextSceneId: 'summons-blake-resigned',
        isOptimal: false,
        tactic: 'reality-check',
        reaction: {
          text: '"No choice then." He nods slowly. "At least we know what we\'re walking into."',
          emotion: 'neutral',
          bodyLanguage: 'Honest. He respects that.',
          scoreImpact: 10,
        },
      },
      {
        id: 'blake-optimal',
        text: '"He specifically invited you. That means you impressed someone. Use it."',
        nextSceneId: 'summons-blake-empowered',
        isOptimal: true,
        tactic: 'reframing',
        reaction: {
          text: 'He blinks. "I... impressed someone?" The fear shifts to curiosity.',
          emotion: 'curious',
          bodyLanguage: 'You transformed his anxiety into opportunity.',
          scoreImpact: 20,
        },
      },
    ],
  },
  {
    id: 'summons-blake-hurt',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: '"I\'m coming. End of discussion."',
        speakerId: 'blake',
        emotion: 'angry',
      },
      {
        text: '"But remember—you offered to leave me behind. I won\'t forget that."',
        speakerId: 'blake',
        emotion: 'cold',
      },
      {
        text: 'Crack in the foundation. Small but real.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'preparation-intro',
  },
  {
    id: 'summons-blake-uncertain',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: '"I\'m scared." He admits it. "But I\'m more scared of what happens if we don\'t go."',
        speakerId: 'blake',
        emotion: 'sad',
      },
      {
        text: '"So... we go. Together."',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: 'Together. For now.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'preparation-intro',
  },
  {
    id: 'summons-blake-resigned',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: '"No choice." He repeats it. Processing.',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: '"Okay. If we\'re doing this, we do it smart. Research. Preparation."',
        speakerId: 'blake',
        emotion: 'serious',
      },
      {
        text: 'He\'s adapting. Good sign.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'preparation-intro',
  },
  {
    id: 'summons-blake-empowered',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: '"Impressed someone." He turns the card over. Thinking.',
        speakerId: 'blake',
        emotion: 'curious',
      },
      {
        text: '"Maybe I wasn\'t as invisible as I thought."',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: '"Okay. Let\'s figure out what we\'re walking into. And who."',
        speakerId: 'blake',
        emotion: 'serious',
      },
      {
        text: 'He\'s focused now. Fear transformed into purpose.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'preparation-intro',
  },
];
