import type { ForkScene } from '../../../types';

/**
 * Study Hall Path - Scene 2: Meeting Casey
 * Building initial connection with an insecure NPC
 */
export const meetingCaseyScenes: ForkScene[] = [
  {
    id: 'study-meeting-casey',
    backgroundId: 'common-room',
    sceneType: 'dialogue',
    pathId: 'study-hall',
    mood: 'peaceful',
    chapter: {
      name: 'The Common Room',
      index: 2,
      total: 5,
    },
    dialog: [
      {
        text: 'Up close, you notice the dark circles under her eyes. The nervous way she adjusts her glasses. The slight tremble in her hands as she closes her notebook.',
      },
      {
        text: '"I\'m Casey. I don\'t think we\'ve met?" Her voice lilts up at the end, turning the statement into a question.',
        speakerId: 'casey',
        emotion: 'neutral',
      },
      {
        text: 'She\'s already uncertain. This is someone who doesn\'t expect to be remembered.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'meet-warm',
        text: 'Smile genuinely. "We haven\'t. But I noticed you\'re one of the few people actually studying during the first week."',
        reaction: {
          text: 'She ducks her head, but you catch a small smile. "I like to stay ahead. Is that weird?"',
          emotion: 'happy',
          bodyLanguage: 'Complimenting her work ethic. Safe territory for her.',
          scoreImpact: 10,
        },
        nextSceneId: 'study-small-talk',
        isOptimal: true,
        interactionType: 'validation',
        obsessionImpact: 10, // Anxious-attached responds strongly to validation
      },
      {
        id: 'meet-neutral',
        text: '"I\'m new. Just looking for somewhere quiet to think."',
        reaction: {
          text: 'She nods, understanding. "The common room is the best spot. Most people don\'t know it\'s open this late."',
          emotion: 'neutral',
          bodyLanguage: 'She\'s sharing a small secret. Good sign.',
          scoreImpact: 5,
        },
        nextSceneId: 'study-small-talk',
        claimType: 'just-looking-for-quiet', // Player claims no agenda
        interactionType: 'neutral',
      },
      {
        id: 'meet-direct',
        text: '"Someone mentioned you work the gala registration. That must be interesting."',
        reaction: {
          text: 'Her expression shifts—guarded now. "Who told you that?" A hint of suspicion.',
          emotion: 'concerned',
          bodyLanguage: 'Too direct. She smells an agenda.',
          scoreImpact: -10,
        },
        nextSceneId: 'study-defensive',
        claimType: 'knows-about-gala', // Player reveals agenda
        interactionType: 'supply', // Seeking what she can provide
      },
      {
        id: 'meet-insult',
        text: '"Studying alone on a Friday? That\'s kind of sad, isn\'t it?"',
        reaction: {
          text: 'Casey\'s face goes blank. She starts packing her books without a word.',
          emotion: 'cold',
          bodyLanguage: 'You just proved you\'re like everyone else.',
          scoreImpact: -50,
        },
        nextSceneId: 'casey-insult-exit',
        interactionType: 'rejection',
        triggersMaskSlip: true, // Causes emotional shutdown
      },
    ],
  },
  {
    id: 'study-small-talk',
    backgroundId: 'common-room',
    sceneType: 'dialogue',
    pathId: 'study-hall',
    mood: 'peaceful',
    dialog: [
      {
        text: 'The conversation flows easier than expected. Casey talks about her classes, her professors, the quirks of the dining hall schedule.',
      },
      {
        text: 'She\'s smart—really smart—but every opinion comes with a qualifier. "I think..." "Maybe I\'m wrong, but..." "This might be stupid..."',
      },
      {
        text: 'Constant hedging. Afraid of being judged.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
      {
        text: '"What about you?" she asks, genuinely curious. "What brings you to Whitmore?"',
        speakerId: 'casey',
        emotion: 'curious',
      },
    ],
    dialogueChoices: [
      {
        id: 'talk-honest',
        text: '"Fresh start, I guess. See where it takes me."',
        reaction: {
          text: 'Casey nods slowly. "That\'s... refreshing. Most people here already have their whole lives mapped out."',
          emotion: 'hopeful',
          bodyLanguage: 'She appreciates the honesty without the pretension.',
          scoreImpact: 10,
        },
        nextSceneId: 'study-rapport',
        isOptimal: true,
        claimType: 'here-for-fresh-start',
        interactionType: 'neutral',
        obsessionImpact: 5,
      },
      {
        id: 'talk-humble',
        text: '"Same as everyone, I guess. Trying to figure things out."',
        reaction: {
          text: 'She nods, relating. "Yeah. It\'s overwhelming sometimes, isn\'t it?" She seems more comfortable with shared uncertainty.',
          emotion: 'neutral',
          bodyLanguage: 'Finding common ground through shared struggle.',
          scoreImpact: 5,
        },
        nextSceneId: 'study-rapport',
        interactionType: 'neutral',
        obsessionImpact: 3,
      },
      {
        id: 'talk-redirect',
        text: '"Enough about me. Tell me more about your work with the gala."',
        reaction: {
          text: 'Her expression closes off slightly. "It\'s just an admin job. Nothing interesting."',
          emotion: 'sad',
          bodyLanguage: 'She\'s testing if you\'re here for her or for what she can offer.',
          scoreImpact: -5,
        },
        nextSceneId: 'study-defensive',
        contradicts: ['just-looking-for-quiet', 'here-for-fresh-start'], // Contradicts earlier claims
        interactionType: 'supply',
      },
    ],
  },
  {
    id: 'study-defensive',
    backgroundId: 'common-room',
    sceneType: 'dialogue',
    pathId: 'study-hall',
    mood: 'tense',
    dialog: [
      {
        text: 'Something shifts in Casey\'s demeanor. She pulls her books closer, creating a physical barrier.',
      },
      {
        text: '"You know, people only ever talk to me when they want something. Usually it\'s the gala thing."',
        speakerId: 'casey',
        emotion: 'sad',
      },
      {
        text: '"Everyone knows I have access to spare tickets. It\'s why they\'re nice to me."',
        speakerId: 'casey',
        emotion: 'sad',
      },
      {
        text: 'She\'s been burned before. This is the test.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'def-acknowledge',
        text: '"That sounds exhausting. Being valued for what you can provide, not who you are."',
        reaction: {
          text: 'Casey\'s eyes go wet for a moment. "Yeah. It is." She doesn\'t look away.',
          emotion: 'sad',
          bodyLanguage: 'You named the wound. That takes courage.',
          scoreImpact: 15,
        },
        nextSceneId: 'study-rapport',
        isOptimal: true,
        tactic: 'accurate-empathy',
        interactionType: 'validation',
        obsessionImpact: 15, // Deep validation triggers strong attachment
        triggersLoveBomb: true, // Casey will idealize you now
      },
      {
        id: 'def-deny',
        text: '"I didn\'t know about the tickets. I was just looking for someone to talk to."',
        reaction: {
          text: 'She searches your face. "Really?" The disbelief is palpable but not hostile.',
          emotion: 'confused',
          bodyLanguage: 'She wants to believe you. Give her a reason.',
          scoreImpact: 0,
        },
        nextSceneId: 'study-rapport',
        claimType: 'no-ticket-interest', // Player claims no interest in tickets
        interactionType: 'neutral',
      },
      {
        id: 'def-honest',
        text: '"I\'ll be honest—I did hear about the gala. But that\'s not why I sat down."',
        reaction: {
          text: 'Casey tilts her head. "Then why did you?" The question is genuine.',
          emotion: 'curious',
          bodyLanguage: 'Honest about the context but redirecting to something real.',
          scoreImpact: 5,
        },
        nextSceneId: 'study-rapport',
        claimType: 'gala-not-main-reason', // Acknowledges gala but claims other interest
        interactionType: 'neutral',
        obsessionImpact: 5,
      },
    ],
  },
];
