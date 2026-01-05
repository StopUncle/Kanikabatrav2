import type { ForkScene } from '../../../types';

/**
 * Mission 15: The Moment of Truth - Setup
 * The gala reaches its climax
 */
export const climaxSetupScenes: ForkScene[] = [
  {
    id: 'climax-setup',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    chapter: { name: 'The Moment of Truth', index: 5, total: 5 },
    mood: 'tense',
    dialog: [
      {
        text: 'The night winds down. Midnight approaches.',
      },
      {
        text: 'Kai appears out of nowhere. Grabs your arm. Hard.',
      },
      {
        text: '"Don\'t leave. Don\'t you dare leave yet."',
        speakerId: 'kai',
        emotion: 'pleading',
      },
      {
        text: 'Her grip is shaking. Her eyes are too bright.',
      },
      {
        text: 'Something broke. She\'s not performing anymore.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'climax-revelation',
  },
  {
    id: 'climax-revelation',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    mood: 'tense',
    dialog: [
      {
        text: '"Victoria is making a move. Tonight. Against the Caldwells." The words tumble out fast, desperate.',
        speakerId: 'kai',
        emotion: 'pleading',
      },
      {
        text: '"Kai, slow down. What kind of—"',
      },
      {
        text: '"I don\'t have TIME to slow down!" She catches herself. Breathes. Then, softer: "I\'m sorry. I\'m sorry. I just—I need you to understand."',
        speakerId: 'kai',
        emotion: 'sad',
      },
      {
        text: 'The whiplash. From desperate to apologetic in two seconds.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
      {
        text: '"Public humiliation. She has information. About Millicent. About something old. The suicide."',
        speakerId: 'kai',
        emotion: 'serious',
      },
      {
        text: '"Victoria\'s husband."',
      },
      {
        text: '"You know about that?" Her face shifts—relief, then suspicion, then relief again. "Of course you do. You\'re smart. That\'s why I came to you. You\'re the only one I can trust."',
        speakerId: 'kai',
        emotion: 'hopeful',
      },
    ],
    nextSceneId: 'climax-stakes',
  },
  {
    id: 'climax-stakes',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    mood: 'tense',
    dialog: [
      {
        text: '"If Victoria makes this public, the Caldwells are finished. Maris. Millicent. Everyone connected to them."',
        speakerId: 'kai',
        emotion: 'serious',
      },
      {
        text: '"Including you."',
      },
      {
        text: '"Including me. Including you. If you\'re seen as their ally."',
        speakerId: 'kai',
        emotion: 'concerned',
      },
      {
        text: '"So what do we do?"',
      },
      {
        text: '"That\'s why I found you. You\'ve been talking to everyone tonight. You might be the only one who can stop this."',
        speakerId: 'kai',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'stakes-trap',
        text: '"Not my fight. I barely know these people."',
        nextSceneId: 'climax-retreat',
        isOptimal: false,
        tactic: 'avoidance',
        reaction: {
          text: 'Her face crumples. Then hardens. "I came to YOU. I trusted YOU. And you\'re just going to—" She stops. Swallows. "Fine. Fine. I should\'ve known. Everyone always—" She can\'t finish.',
          emotion: 'angry',
          bodyLanguage: 'Hurt wrapped in rage. Classic split.',
          scoreImpact: -15,
        },
      },
      {
        id: 'stakes-subtle',
        text: '"Why me? You\'ve been here longer."',
        nextSceneId: 'climax-why-you',
        isOptimal: false,
        tactic: 'deflection',
        reaction: {
          text: '"Because I\'m compromised. You\'re still... flexible."',
          emotion: 'neutral',
          bodyLanguage: 'She needs you because she can\'t act herself.',
          scoreImpact: 5,
        },
      },
      {
        id: 'stakes-close',
        text: '"What exactly do you need me to do?"',
        nextSceneId: 'climax-mission',
        isOptimal: false,
        tactic: 'practical',
        reaction: {
          text: '"Talk to Victoria. Find out when. Find out what exactly."',
          emotion: 'serious',
          bodyLanguage: 'She needs intelligence. You\'re her asset.',
          scoreImpact: 10,
        },
      },
      {
        id: 'stakes-optimal',
        text: '"I\'ll help. But not for free. What do I get if I pull this off?"',
        nextSceneId: 'climax-negotiate',
        isOptimal: true,
        tactic: 'negotiation',
        reaction: {
          text: 'A flash of respect. "Now you\'re thinking like us."',
          emotion: 'smirking',
          bodyLanguage: 'You asked for payment. That\'s the game.',
          scoreImpact: 25,
        },
      },
    ],
  },
  {
    id: 'climax-retreat',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    dialog: [
      {
        text: 'Kai pulls back like you slapped her. Something breaks behind her eyes.',
      },
      {
        text: '"I thought you were different." Her voice is hollow. "I thought we had something. A connection. Was that nothing to you?"',
        speakerId: 'kai',
        emotion: 'sad',
      },
      {
        text: '"Kai, I just said—"',
      },
      {
        text: '"No. No, I understand now." The sadness hardens into something else. "You\'re just like everyone else. Using me for access. Pretending to care."',
        speakerId: 'kai',
        emotion: 'cold',
      },
      {
        text: 'You didn\'t say any of that. She\'s rewriting the whole relationship.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
      {
        text: '"When this is over, I\'ll remember. Who helped. Who didn\'t."',
        speakerId: 'kai',
        emotion: 'angry',
      },
    ],
    nextSceneId: 'climax-forced-choice',
  },
  {
    id: 'climax-why-you',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    dialog: [
      {
        text: '"I\'ve been here too long. I\'m known. My loyalties are documented."',
        speakerId: 'kai',
        emotion: 'neutral',
      },
      {
        text: '"You\'re new. Unaligned. You can talk to anyone without suspicion."',
        speakerId: 'kai',
        emotion: 'knowing',
      },
      {
        text: '"So I\'m useful because I\'m disposable."',
      },
      {
        text: '"Useful because you\'re unpredictable. Different thing."',
        speakerId: 'kai',
        emotion: 'serious',
      },
    ],
    nextSceneId: 'climax-mission',
  },
  {
    id: 'climax-negotiate',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    dialog: [
      {
        text: '"What do you want?"',
        speakerId: 'kai',
        emotion: 'neutral',
      },
      {
        text: '"Full sponsorship. Not as a project. As a partner. Access to everything."',
      },
      {
        text: 'She considers. A long moment.',
      },
      {
        text: '"If you pull this off, done. Maris herself will vouch for you."',
        speakerId: 'kai',
        emotion: 'serious',
      },
      {
        text: 'The price is set. Now deliver.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'climax-mission',
  },
  {
    id: 'climax-forced-choice',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    mood: 'tense',
    dialog: [
      {
        text: 'Kai walks away. Decision made for her.',
      },
      {
        text: 'Blake appears. "What was that about?"',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: '"Politics. The violent kind."',
      },
      {
        text: '"Should we... leave?"',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: 'Too late for that.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'forced-stay',
        text: '"No. We see this through."',
        nextSceneId: 'climax-mission',
        isOptimal: false,
        tactic: 'commitment',
        reaction: {
          text: '"Okay." Blake swallows. "Your call."',
          emotion: 'concerned',
          bodyLanguage: 'He trusts you. Hope you\'re right.',
          scoreImpact: 10,
        },
      },
      {
        id: 'forced-leave',
        text: '"Yes. Let them fight their own battles."',
        nextSceneId: 'ending-bad-retreat',
        isOptimal: false,
        tactic: 'retreat',
        reaction: {
          text: 'You head for the exit. The night ends. But the consequences are just beginning.',
          emotion: 'neutral',
          bodyLanguage: 'You chose safety. But there\'s no safety here.',
          scoreImpact: -25,
        },
      },
    ],
  },
  {
    id: 'climax-mission',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    mood: 'tense',
    dialog: [
      {
        text: 'Time to move. Victoria is across the room. Preparing.',
      },
      {
        text: 'Maris is near the stage. Unaware. Or appearing so.',
      },
      {
        text: 'Harrison stands by the bar. His eyes find yours. Brief. Assessing.',
      },
      {
        text: 'The board is set. Your move.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'mission-victoria',
        text: 'Approach Victoria. Learn her plan.',
        nextSceneId: 'final-victoria',
        isOptimal: false,
        tactic: 'intelligence',
        reaction: {
          text: 'You move toward Victoria. She sees you coming. Curious.',
          emotion: 'neutral',
          bodyLanguage: 'Direct approach. Risky but potentially revealing.',
          scoreImpact: 10,
        },
      },
      {
        id: 'mission-maris',
        text: 'Warn Maris directly. Let her handle it.',
        nextSceneId: 'final-maris',
        isOptimal: false,
        tactic: 'loyalty',
        reaction: {
          text: 'You move toward Maris. She sees you. Acknowledges.',
          emotion: 'neutral',
          bodyLanguage: 'Loyal move. She\'ll remember.',
          scoreImpact: 15,
        },
      },
      {
        id: 'mission-harrison',
        text: 'Find Harrison. He\'s the wild card.',
        nextSceneId: 'final-harrison',
        isOptimal: false,
        tactic: 'strategic',
        reaction: {
          text: 'You move toward Harrison. He nods. Unsurprised.',
          emotion: 'neutral',
          bodyLanguage: 'Smart choice. He\'s been waiting.',
          scoreImpact: 20,
        },
      },
      {
        id: 'mission-both',
        text: 'Create a diversion. Buy time for everyone to reposition.',
        nextSceneId: 'final-diversion',
        isOptimal: true,
        tactic: 'chaos',
        reaction: {
          text: 'You don\'t pick a side. You change the game.',
          emotion: 'knowing',
          bodyLanguage: 'Unpredictable. The most dangerous move.',
          scoreImpact: 25,
        },
      },
    ],
  },
];
