import type { ForkScene } from '../../../types';

/**
 * Party Path - Scene 2: First Encounter with Maris
 * The player is now in Maris's orbit. She's assessing them with calculated charm.
 */
export const firstEncounterScenes: ForkScene[] = [
  {
    id: 'party-first-encounter',
    backgroundId: 'party',
    sceneType: 'dialogue',
    pathId: 'party',
    mood: 'party',
    chapter: {
      name: 'The Party',
      index: 2,
      total: 5,
    },
    dialog: [
      {
        text: 'Maris turns her full attention to you. It\'s like being caught in a warm spotlight—welcoming and inescapable.',
      },
      {
        text: '"Hi. I\'m Maris." She extends her hand. The touch is soft, lingering just a moment longer than polite. "I don\'t think we\'ve met, which means you\'re either new or very good at hiding."',
        speakerId: 'maris',
        emotion: 'seductive',
      },
      {
        text: 'Her smile is perfect. Almost too perfect.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'encounter-match',
        text: '"Good at hiding, apparently." Hold her gaze.',
        reaction: {
          text: 'Her eyes widen—delighted, predatory. "Oh, we\'re going to have fun together." She squeezes your hand, pulls you slightly closer. "You GET it. Most people here are so... predictable."',
          emotion: 'seductive',
          bodyLanguage: 'She\'s claiming you already. Future tense. Possession disguised as connection.',
          scoreImpact: 15,
        },
        nextSceneId: 'party-maris-interested',
        isOptimal: true,
        tactic: 'frame-matching',
        interactionType: 'neutral',
        obsessionImpact: 5,
      },
      {
        id: 'encounter-defer',
        text: '"Great party." Smile. Keep it simple.',
        reaction: {
          text: '"Thanks! Make yourself at home." Her smile is warm, but her eyes are already drifting past you. You\'ve been filed and dismissed.',
          emotion: 'happy',
          bodyLanguage: 'Sweet as honey. And just as sticky—you can\'t tell if you\'ve been welcomed or escaped.',
          scoreImpact: -5,
        },
        nextSceneId: 'party-need-hook',
      },
      {
        id: 'encounter-challenge',
        text: '"I\'ve heard things." Let that hang.',
        reaction: {
          text: 'Her smile sharpens, but her eyes stay warm. "All true, I hope. The good ones and the bad ones." She leans closer. "The bad ones are more fun."',
          emotion: 'smirking',
          bodyLanguage: 'She\'s intrigued. You just became a game worth playing.',
          scoreImpact: 10,
        },
        nextSceneId: 'party-maris-interested',
        tactic: 'controlled-provocation',
      },
      {
        id: 'encounter-disrespect',
        text: '"So this is what trust fund money looks like." Glance around.',
        reaction: {
          text: 'For a split second—so fast you almost miss it—her jaw tightens. Her pupils contract. Then the mask snaps back. "Isn\'t it?" She pats your arm like you\'re a confused child. "Enjoy the party."',
          emotion: 'cold',
          bodyLanguage: 'She turns away. You cease to exist. But that microsecond? That was real.',
          scoreImpact: -50,
        },
        nextSceneId: 'maris-disrespect-exit',
      },
    ],
  },
  {
    id: 'party-maris-interested',
    backgroundId: 'party',
    sceneType: 'dialogue',
    pathId: 'party',
    mood: 'party',
    dialog: [
      {
        text: 'Maris links her arm through yours like you\'ve been friends for years. The crowd parts as she guides you through the room. People watch.',
      },
      {
        text: '"I never meet anyone interesting anymore." Her hand squeezes your arm. "And then you appear. Where have you been hiding?"',
        speakerId: 'maris',
        emotion: 'seductive',
      },
      {
        text: 'She\'s known you for ninety seconds. She\'s talking like you\'re soulmates.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
      {
        text: '"Tell me everything. I want to know all of it. The real you."',
        speakerId: 'maris',
        emotion: 'curious',
      },
    ],
    dialogueChoices: [
      {
        id: 'interested-honest-strength',
        text: '"Grades. A lot of coffee. No one pulling strings for me."',
        reaction: {
          text: 'She stops walking. Studies you. "Self-made." Her voice drops, almost reverent. "That\'s rare. Most people here were born on third base thinking they hit a triple."',
          emotion: 'curious',
          bodyLanguage: 'Something flickers in her eyes. Respect? Or just a new angle to work?',
          scoreImpact: 10,
        },
        nextSceneId: 'party-the-test',
        isOptimal: true,
        claimType: 'no-connections',
        interactionType: 'neutral',
      },
      {
        id: 'interested-deflect',
        text: '"Does it matter?" Shrug. "Clean slate, right?"',
        reaction: {
          text: 'Her smile stays fixed, but the warmth leaves her eyes. "Mysterious. I can work with mysterious." She sounds less interested now.',
          emotion: 'neutral',
          bodyLanguage: 'She\'s pulled back slightly. The spotlight has dimmed.',
          scoreImpact: -10,
        },
        nextSceneId: 'party-the-test',
      },
      {
        id: 'interested-flip',
        text: '"What about you? Being a Caldwell as fun as it looks?"',
        reaction: {
          text: 'She laughs—rich and genuine-sounding. "God, no. It\'s worse." She leans in conspiratorially. "But I\'ll tell you about that later. When I know you better."',
          emotion: 'happy',
          bodyLanguage: 'She\'s shared something. Or pretended to. Either way, you feel closer.',
          scoreImpact: 15,
        },
        nextSceneId: 'party-the-test',
        isOptimal: true,
        tactic: 'deflect-flip',
      },
    ],
  },
  {
    id: 'party-need-hook',
    backgroundId: 'party',
    sceneType: 'dialogue',
    pathId: 'party',
    mood: 'party',
    dialog: [
      {
        text: 'Maris has already moved on, leaving behind only the faint trace of her perfume. You\'re at the edge again, invisible.',
      },
      {
        text: 'You need something. A hook. A reason for her to see you.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
      {
        text: 'You overhear her mention the upcoming business case competition to someone. She sounds bored. "My team is all flash and no substance. I need someone who can actually run numbers."',
      },
    ],
    dialogueChoices: [
      {
        id: 'hook-skills',
        text: '"Sorry—did you say analytics? I\'m actually pretty good with numbers."',
        reaction: {
          text: 'Maris turns. Her eyes light up like you just solved a problem she\'d been worrying about. "Are you? Because I\'ve been looking for someone exactly like you."',
          emotion: 'seductive',
          bodyLanguage: 'You\'ve become useful. That\'s a currency she values.',
          scoreImpact: 15,
        },
        nextSceneId: 'party-the-test',
        isOptimal: true,
        claimType: 'has-analytics-skills',
        interactionType: 'supply',
        obsessionImpact: 8,
      },
      {
        id: 'hook-compliment',
        text: '"Sounds stressful. You okay?"',
        reaction: {
          text: 'Maris gives you a patient smile. "I don\'t really do stress." She turns back to her conversation. You offered sympathy. She wanted solutions.',
          emotion: 'neutral',
          bodyLanguage: 'Polite dismissal. Wrapped in kindness. Still a dismissal.',
          scoreImpact: -5,
        },
        nextSceneId: 'party-ally-intel',
      },
      {
        id: 'hook-wait',
        text: 'Hang back. Keep listening.',
        reaction: {
          text: 'The conversation shifts. Maris mentions the gala casually—who she\'s inviting, who she\'s "not sure about yet." You file away names.',
          emotion: 'neutral',
          bodyLanguage: 'Information gathered. But you\'re still on the outside looking in.',
          scoreImpact: 5,
        },
        nextSceneId: 'party-the-test',
      },
    ],
  },
  {
    id: 'party-ally-intel',
    backgroundId: 'party',
    sceneType: 'dialogue',
    pathId: 'party',
    mood: 'party',
    dialog: [
      {
        text: 'The frustrated girl introduces herself as Priya. She\'s been trying to crack Maris\'s circle for weeks.',
      },
      {
        text: '"She\'s something else, isn\'t she? Makes you feel like the most special person in the room. Until she moves on to the next one."',
        speakerId: 'priya',
        emotion: 'knowing',
      },
      {
        text: 'Priya leans closer. "Here\'s what I\'ve figured out. When she\'s charming—she wants something. When she shares a secret—she\'s creating false intimacy. And when she goes quiet..." She shudders. "Just agree with whatever she says."',
      },
      {
        text: 'A roadmap. From someone who\'s been burned.',
      },
    ],
    nextSceneId: 'party-second-chance',
  },
  {
    id: 'party-second-chance',
    backgroundId: 'party',
    sceneType: 'dialogue',
    pathId: 'party',
    mood: 'party',
    dialog: [
      {
        text: 'Something shifts in the room. Someone made a joke at Maris\'s expense—about a startup she invested in failing spectacularly.',
      },
      {
        text: 'Maris is laughing along, good-natured, but you notice her fingers have gone white around her glass. Her smile is exactly the same as before. Her eyes are not.',
      },
      {
        text: 'Crack in the mask. She needs someone to remind her she\'s still perfect.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'second-validate',
        text: '"Market timing. Wasn\'t her fault." Say it loud enough for her to hear.',
        reaction: {
          text: 'Maris turns to you like you\'ve said something profound. "Exactly. Finally, someone who actually understands business." Her hand finds your arm. "I knew I liked you."',
          emotion: 'seductive',
          bodyLanguage: 'You\'ve given her what she needed. She\'ll remember this.',
          scoreImpact: 20,
        },
        nextSceneId: 'party-the-test',
        isOptimal: true,
        tactic: 'strategic-validation',
        interactionType: 'validation',
        obsessionImpact: 15,
        triggersLoveBomb: true,
      },
      {
        id: 'second-sympathy',
        text: '"That was harsh. You okay?"',
        reaction: {
          text: 'The warmth vanishes from her eyes like a light being switched off. "Failure?" Her voice is still pleasant. Her expression is not. "That was a learning experience. And I don\'t need pity."',
          emotion: 'cold',
          bodyLanguage: 'You offered weakness when she needed validation. Mistake.',
          scoreImpact: -15,
        },
        nextSceneId: 'party-the-test',
        interactionType: 'rejection',
        triggersMaskSlip: true,
      },
      {
        id: 'second-ignore',
        text: 'Don\'t move. Not your problem.',
        reaction: {
          text: 'You maintain your position. Eventually, Maris\'s eyes find you across the room. You didn\'t pile on. You didn\'t fawn. Both are noted.',
          emotion: 'neutral',
          bodyLanguage: 'Not the best move. But not a mistake either.',
          scoreImpact: 5,
        },
        nextSceneId: 'party-the-test',
      },
    ],
  },
];
