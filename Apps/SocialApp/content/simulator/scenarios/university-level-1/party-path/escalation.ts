import type { ForkScene } from '../../../types';

/**
 * Party Path - Scene 4: Escalation
 * Maris creates a moment of false intimacy. The dynamic shifts.
 */
export const escalationScenes: ForkScene[] = [
  {
    id: 'party-escalation',
    backgroundId: 'party',
    sceneType: 'dialogue',
    pathId: 'party',
    mood: 'tense',
    chapter: {
      name: 'The Party',
      index: 4,
      total: 5,
    },
    dialog: [
      {
        text: 'The game ends. The crowd disperses to refill drinks and whisper about what just happened. But Maris stays still.',
      },
      {
        text: 'She watches you. Her expression is unreadable.',
      },
      {
        text: '"Come with me." She touches your arm lightly. "Somewhere quieter."',
        speakerId: 'maris',
        emotion: 'seductive',
      },
      {
        text: 'She leads you through a side door to the balcony. The noise of the party fades to a distant hum.',
      },
    ],
    nextSceneId: 'party-balcony',
  },
  {
    id: 'party-balcony',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'party',
    mood: 'mysterious',
    dialog: [
      {
        text: 'The city lights glitter below. Maris leans against the railing, her drink forgotten.',
      },
      {
        text: '"You know what\'s exhausting?" She doesn\'t look at you. "Everyone wanting something. Every smile with an agenda. Every compliment with a price tag."',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: 'Her voice is soft, confiding. But her posture is controlled. Rehearsed.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
      {
        text: '"You\'re different. I haven\'t figured out your angle yet." She turns to face you. Her eyes are sharp, assessing. "That\'s rare."',
        speakerId: 'maris',
        emotion: 'smirking',
      },
    ],
    dialogueChoices: [
      {
        id: 'balcony-honest',
        text: '"I want access. I\'m just not going to become a different person to get it."',
        reaction: {
          text: 'Her head tilts. The calculation is visible for a split second. "Honest." She says it like she\'s tasting something unexpected. "I can work with honest."',
          emotion: 'smirking',
          bodyLanguage: 'She\'s not charmed. She\'s assessing your utility.',
          scoreImpact: 20,
        },
        nextSceneId: 'party-real-maris',
        isOptimal: true,
        tactic: 'authentic-directness',
      },
      {
        id: 'balcony-sympathize',
        text: '"That sounds... really lonely."',
        reaction: {
          text: 'Her nostril flares—barely perceptible. "Sympathy." The word drips with contempt. "That\'s what weak people offer when they have nothing else."',
          emotion: 'cold',
          bodyLanguage: 'You just became less interesting to her.',
          scoreImpact: -15,
        },
        nextSceneId: 'party-cold-maris',
      },
      {
        id: 'balcony-strategic',
        text: '"I\'m not here to use you." Leave it there.',
        reaction: {
          text: 'Maris studies you. "Everyone uses everyone." A smile that doesn\'t reach her eyes. "The question is whether the exchange is worth it."',
          emotion: 'neutral',
          bodyLanguage: 'She\'s framing this as a transaction. Not intimacy.',
          scoreImpact: 10,
        },
        nextSceneId: 'party-real-maris',
      },
      {
        id: 'balcony-challenge',
        text: '"This is a performance too. Isn\'t it?"',
        reaction: {
          text: 'The warmth drains from her face like water from a sink. Her smile stays, but her eyes go flat.',
          emotion: 'cold',
          bodyLanguage: 'You called her bluff. She doesn\'t like that.',
          scoreImpact: -50,
        },
        nextSceneId: 'maris-challenge-exit',
      },
    ],
  },
  {
    id: 'party-real-maris',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'party',
    mood: 'mysterious',
    dialog: [
      {
        text: 'Maris sets her drink on the railing. The city hums below. Her posture shifts—more relaxed, more intimate.',
      },
      {
        text: '"Everyone thinks the Caldwell name is a gift." She laughs softly. "But gifts come with strings. Expectations. Obligations."',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: '"Millie gets to be the wild one. I have to be the one who manages everything."',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: 'Millie? Twin sister. She offered that information deliberately.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
      {
        text: 'She turns to look at you directly. Her eyes are calculating, even as her voice stays soft.',
        speakerId: 'maris',
        emotion: 'smirking',
      },
      {
        text: 'This is a performance. But what is she buying with it?',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'real-acknowledge',
        text: '"But you\'ve built a whole system around it. The parties. The games."',
        reaction: {
          text: 'Something flickers across her face—assessment, not emotion. "You think seeing is the same as understanding." Her smile sharpens. "Observation without leverage is just... watching."',
          emotion: 'smirking',
          bodyLanguage: 'She pivoted. You called out the game; she reframed it as weakness.',
          scoreImpact: 15,
        },
        nextSceneId: 'party-ticket-moment',
        isOptimal: true,
        tactic: 'accurate-observation',
      },
      {
        id: 'real-comfort',
        text: '"I\'m sorry. That\'s... a lot."',
        reaction: {
          text: 'Her expression doesn\'t change, but her eyes go flat. "Sympathy." She tastes the word like something sour. "That\'s what boring people offer when they run out of ideas."',
          emotion: 'cold',
          bodyLanguage: 'Contempt. Barely hidden.',
          scoreImpact: -15,
        },
        nextSceneId: 'party-ticket-moment',
      },
      {
        id: 'real-relate',
        text: '"I get the mask thing. Different reasons, but... yeah."',
        reaction: {
          text: 'She tilts her head, studying you. "Interesting." A pause. "Most people try to fix me. You just... acknowledged." Her hand brushes your arm. "I can work with that."',
          emotion: 'curious',
          bodyLanguage: 'Transactional. She\'s deciding if you\'re useful.',
          scoreImpact: 10,
        },
        nextSceneId: 'party-ticket-moment',
        tactic: 'calibrated-relating',
      },
    ],
  },
  {
    id: 'party-cold-maris',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'party',
    mood: 'cold',
    dialog: [
      {
        text: 'The warmth evaporates. Her smile stays, but it\'s frozen now—a beautiful mask with nothing behind it.',
      },
      {
        text: '"You know what\'s funny? I thought you might be different." Her voice is still pleasant. Her eyes are not. "But you\'re just like everyone else. Soft."',
        speakerId: 'maris',
        emotion: 'cold',
      },
      {
        text: 'The temperature just dropped twenty degrees.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'cold-stay-calm',
        text: '"Okay." Don\'t blink.',
        reaction: {
          text: 'Maris pauses. Something flickers across her face—surprise, maybe. You didn\'t crumble. You didn\'t apologize.',
          emotion: 'neutral',
          bodyLanguage: 'She expected a reaction. Your calm throws her.',
          scoreImpact: 10,
        },
        nextSceneId: 'party-ticket-moment',
        isOptimal: true,
        tactic: 'gray-rock',
      },
      {
        id: 'cold-apologize',
        text: '"I—sorry, I didn\'t mean—"',
        reaction: {
          text: 'Maris waves her hand, dismissive. "It\'s fine." It\'s clearly not fine. You\'ve lost ground.',
          emotion: 'cold',
          bodyLanguage: 'Apologies are blood in the water with her.',
          scoreImpact: -15,
        },
        nextSceneId: 'party-ticket-moment',
      },
      {
        id: 'cold-push-back',
        text: '"If that makes me soft, then sure. I\'m soft."',
        reaction: {
          text: 'Her eyes narrow. For a moment, you think she\'s going to walk away. Then something like respect crosses her face. "Fair."',
          emotion: 'neutral',
          bodyLanguage: 'Risky. But she respects people who don\'t fold.',
          scoreImpact: 5,
        },
        nextSceneId: 'party-ticket-moment',
      },
    ],
  },
  {
    id: 'party-failed',
    backgroundId: 'party',
    sceneType: 'dialogue',
    pathId: 'party',
    mood: 'cold',
    dialog: [
      {
        text: 'Maris has turned away. The conversation is over. The opportunity is gone.',
      },
      {
        text: 'You drift back into the party, but you can feel it—her circle has closed. You\'re on the outside now.',
      },
      {
        text: 'The party feels hollow. Like a party you\'re not really at.',
        speakerId: 'inner-voice',
        emotion: 'sad',
      },
    ],
    dialogueChoices: [
      {
        id: 'failed-leave',
        text: 'Leave. Cut your losses.',
        reaction: {
          text: 'The night air is sharp. You walk toward the dorms, replaying what went wrong.',
          emotion: 'neutral',
          bodyLanguage: 'Maybe Casey is still in the common room.',
          scoreImpact: 0,
        },
        nextSceneId: 'study-hall-arrival',
      },
      {
        id: 'failed-stay',
        text: 'Stay. Try to salvage something.',
        reaction: {
          text: 'You work the edges of the party, but everyone saw Maris dismiss you. You\'re marked.',
          emotion: 'sad',
          bodyLanguage: 'Sometimes you need to know when you\'ve lost.',
          scoreImpact: -10,
        },
        nextSceneId: 'ending-party-fail',
      },
    ],
  },
];
