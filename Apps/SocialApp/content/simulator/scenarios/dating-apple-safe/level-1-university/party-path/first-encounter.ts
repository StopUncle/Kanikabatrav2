import type { ForkScene } from '../../../../types';

/**
 * Party Path - Scene 2: First Encounter with Maris
 * The player is now in Maris's orbit. She's assessing them with calculated charm.
 * DEFENSIVE VERSION: Learning to recognize love-bombing and calculated intensity
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
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'encounter-match',
        text: '"Good at hiding, apparently." Hold her gaze.',
        reaction: {
          text: 'Her eyes widen—delighted. "Oh, we\'re going to have fun together." She squeezes your hand, pulls you slightly closer. "You GET it. Most people here are so... predictable."',
          emotion: 'seductive',
          bodyLanguage: '"We\'re going to have fun together." Future tense. Already claiming ownership.',
          scoreImpact: 5,
        },
        nextSceneId: 'party-maris-interested',
      },
      {
        id: 'encounter-neutral',
        text: '"Nice to meet you." Keep it simple.',
        reaction: {
          text: '"Nice to meet you too!" Her smile stays warm, but her eyes are already scanning. You haven\'t given her anything to work with.',
          emotion: 'happy',
          bodyLanguage: 'She wanted a hook. You didn\'t give her one. Smart.',
          scoreImpact: 10,
        },
        nextSceneId: 'party-maris-testing',
        isOptimal: true,
        tactic: 'gray-rock',
      },
      {
        id: 'encounter-flattered',
        text: '"Everyone knows who you are. Great party."',
        reaction: {
          text: '"Thanks! Make yourself at home." His smile is warm, but his eyes are already drifting past you. You\'ve been filed and dismissed.',
          emotion: 'happy',
          bodyLanguage: 'You gave him supply—flattery—but no challenge. He\'s bored.',
          scoreImpact: -10,
        },
        nextSceneId: 'party-need-hook',
      },
      {
        id: 'encounter-challenge',
        text: '"I\'ve heard things about you." Let that hang.',
        reaction: {
          text: 'Her smile sharpens, but her eyes stay calculating. "All true, I hope. The good ones and the bad ones." She leans closer. "The bad ones are more fun."',
          emotion: 'smirking',
          bodyLanguage: 'She\'s intrigued. But be careful—challenge without backup can backfire.',
          scoreImpact: 5,
        },
        nextSceneId: 'party-maris-interested',
        tactic: 'controlled-provocation',
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
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'interested-honest',
        text: '"We literally just met. Let\'s slow down."',
        reaction: {
          text: 'Something flickers in her eyes—surprise, then respect. "Fair enough. I can come on strong." She releases your arm. "I just felt a connection."',
          emotion: 'neutral',
          bodyLanguage: 'You called out the intensity. She backed off. Healthy people accept boundaries.',
          scoreImpact: 20,
        },
        nextSceneId: 'party-the-test',
        isOptimal: true,
        tactic: 'boundary-setting',
        interactionType: 'neutral',
      },
      {
        id: 'interested-flattered',
        text: '"I felt it too." Lean into the connection.',
        reaction: {
          text: 'Her smile widens. "I knew it." She pulls you closer to her inner circle. "You\'re one of us now."',
          emotion: 'seductive',
          bodyLanguage: 'She claimed you. Fast. Too fast. This is love-bombing.',
          scoreImpact: -15,
        },
        nextSceneId: 'party-the-test',
        interactionType: 'supply',
      },
      {
        id: 'interested-deflect',
        text: '"Tell me about yourself instead."',
        reaction: {
          text: 'She laughs—rich and genuine-sounding. "God, no. I\'m boring." She waves dismissively. "You\'re the interesting one. I can tell."',
          emotion: 'happy',
          bodyLanguage: 'She deflected. Narcissists often avoid real self-disclosure.',
          scoreImpact: 5,
        },
        nextSceneId: 'party-the-test',
        tactic: 'deflect-flip',
      },
    ],
  },
  {
    id: 'party-maris-testing',
    backgroundId: 'party',
    sceneType: 'dialogue',
    pathId: 'party',
    mood: 'party',
    dialog: [
      {
        text: 'Maris studies you for a moment. You gave her nothing to work with, and now she\'s recalibrating.',
      },
      {
        text: '"So what brings you to my humble gathering?" She gestures around with false modesty. "Besides the free drinks, obviously."',
        speakerId: 'maris',
        emotion: 'smirking',
      },
      {
        text: 'Testing. Looking for what you want.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'testing-honest',
        text: '"Someone mentioned it. Seemed like a good way to meet people."',
        reaction: {
          text: '"Meet people." She nods slowly. "That\'s refreshingly honest. Most people here have agendas." She doesn\'t mention that she\'s included.',
          emotion: 'curious',
          bodyLanguage: 'She respects directness. But she\'s still evaluating you.',
          scoreImpact: 10,
        },
        nextSceneId: 'party-the-test',
        isOptimal: true,
      },
      {
        id: 'testing-flattery',
        text: '"I heard you know everyone worth knowing."',
        reaction: {
          text: 'Her smile sharpens. "That\'s sweet. But I don\'t just KNOW them." She leans in conspiratorially. "I made most of them."',
          emotion: 'smirking',
          bodyLanguage: 'Grandiosity. She just told you she sees people as projects.',
          scoreImpact: -5,
        },
        nextSceneId: 'party-the-test',
      },
      {
        id: 'testing-mysterious',
        text: '"Does it matter?"',
        reaction: {
          text: 'Her eyes narrow—intrigued. "Mysterious. I can work with mysterious." The warmth leaves her voice slightly.',
          emotion: 'cold',
          bodyLanguage: 'She doesn\'t like not knowing. Control is important to her.',
          scoreImpact: 5,
        },
        nextSceneId: 'party-the-test',
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
          bodyLanguage: 'You just became useful. That\'s a currency she values. But useful isn\'t the same as respected.',
          scoreImpact: 10,
        },
        nextSceneId: 'party-the-test',
        interactionType: 'supply',
      },
      {
        id: 'hook-observant',
        text: 'Wait. Watch. Learn more before making a move.',
        reaction: {
          text: 'The conversation shifts. Maris mentions a gala casually—who she\'s inviting, who she\'s "not sure about yet." You file away names.',
          emotion: 'neutral',
          bodyLanguage: 'Information gathered. Patience can be power.',
          scoreImpact: 15,
        },
        nextSceneId: 'party-the-test',
        isOptimal: true,
        tactic: 'strategic-patience',
      },
      {
        id: 'hook-sympathy',
        text: '"Sounds stressful. You okay?"',
        reaction: {
          text: 'Maris gives you a patient smile. "I don\'t really do stress." She turns back to her conversation. You offered sympathy. She wanted solutions.',
          emotion: 'neutral',
          bodyLanguage: 'She doesn\'t want care. She wants utility. Note that.',
          scoreImpact: -10,
        },
        nextSceneId: 'party-ally-intel',
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
        text: 'Priya leans closer. "Here\'s what I\'ve figured out. When she\'s charming—she wants something. When she shares a \'secret\'—she\'s creating false intimacy. And when she goes quiet..." She shudders. "Just agree with whatever she says."',
      },
      {
        text: 'A roadmap. From someone who\'s been burned.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'ally-listen',
        text: '"What else have you noticed?"',
        reaction: {
          text: 'Priya\'s eyes light up. Someone\'s actually listening. "The people closest to her? They all look exhausted. Grateful, but exhausted."',
          emotion: 'neutral',
          bodyLanguage: 'Intel is power. She\'s giving you the playbook.',
          scoreImpact: 15,
        },
        nextSceneId: 'party-second-chance',
        isOptimal: true,
        tactic: 'gather-intel',
      },
      {
        id: 'ally-dismiss',
        text: '"Maybe you just weren\'t her type."',
        reaction: {
          text: 'Priya\'s face hardens. "Sure. That\'s probably it." She turns away. You just closed a door.',
          emotion: 'cold',
          bodyLanguage: 'You dismissed her experience. That was cruel.',
          scoreImpact: -20,
        },
        nextSceneId: 'party-second-chance',
      },
      {
        id: 'ally-skeptical',
        text: '"Sounds like you\'re just bitter she moved on."',
        reaction: {
          text: 'She laughs, but there\'s no humor in it. "Maybe. But watch her. Really watch. Then tell me I\'m wrong."',
          emotion: 'sad',
          bodyLanguage: 'She\'s been through this. You should listen.',
          scoreImpact: -5,
        },
        nextSceneId: 'party-second-chance',
      },
    ],
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
        text: 'Crack in the mask. She\'s furious.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'second-validate',
        text: '"Market timing. Wasn\'t her fault." Say it loud enough for her to hear.',
        reaction: {
          text: 'Maris turns to you like you\'ve said something profound. "Exactly. Finally, someone who actually understands business." Her hand finds your arm. "I knew I liked you."',
          emotion: 'seductive',
          bodyLanguage: 'You gave her what she needed—validation. She\'ll remember this. But now you\'re supply.',
          scoreImpact: -10,
        },
        nextSceneId: 'party-the-test',
        interactionType: 'validation',
      },
      {
        id: 'second-observe',
        text: 'Don\'t move. Just watch.',
        reaction: {
          text: 'You maintain your position. Eventually, Maris\'s eyes find you across the room. You didn\'t pile on. You didn\'t fawn. Both are noted.',
          emotion: 'neutral',
          bodyLanguage: 'You saw the mask slip. She doesn\'t know if you noticed. Good position.',
          scoreImpact: 15,
        },
        nextSceneId: 'party-the-test',
        isOptimal: true,
        tactic: 'strategic-observation',
      },
      {
        id: 'second-press',
        text: '"That startup thing sounds rough. What happened?"',
        reaction: {
          text: 'The warmth vanishes from her eyes like a light being switched off. "Learning experience." Her voice is still pleasant. Her expression is not. "We don\'t dwell."',
          emotion: 'cold',
          bodyLanguage: 'You poked the wound. She won\'t forget that.',
          scoreImpact: -15,
        },
        nextSceneId: 'party-the-test',
      },
    ],
  },
];
