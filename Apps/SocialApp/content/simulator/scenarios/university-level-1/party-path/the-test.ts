import type { ForkScene } from '../../../types';

/**
 * Party Path - Scene 3: The Public Test
 * Maris plays a "game" with the player in front of everyone
 * Her games feel intimate but are actually calculated assessments
 */
export const testScenes: ForkScene[] = [
  {
    id: 'party-the-test',
    backgroundId: 'party',
    sceneType: 'dialogue',
    pathId: 'party',
    mood: 'tense',
    chapter: {
      name: 'The Party',
      index: 3,
      total: 5,
    },
    dialog: [
      {
        text: 'The music fades. Maris claps her hands lightly, and somehow the whole room turns to listen.',
      },
      {
        text: '"I\'m bored of small talk. Let\'s play a game. Who wants to play Truth or Dare—minus the dares?"',
        speakerId: 'maris',
        emotion: 'seductive',
      },
      {
        text: 'Nervous laughter. Some people edge closer. Others suddenly need drinks.',
      },
      {
        text: 'Her eyes find you. "You. You look like you have secrets worth knowing."',
        speakerId: 'maris',
        emotion: 'seductive',
      },
      {
        text: 'Spotlight. Ready or not.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'test-accept-cool',
        text: '"Depends. You any good at this?"',
        reaction: {
          text: 'Maris beams. "I like you already." She pats the seat next to her. "Come. Sit. Let\'s get to know each other."',
          emotion: 'seductive',
          bodyLanguage: 'The crowd forms a circle. You\'re in her orbit now.',
          scoreImpact: 10,
        },
        nextSceneId: 'party-question-one',
        isOptimal: true,
      },
      {
        id: 'test-decline',
        text: '"Pass." Smile like you\'re kidding. You\'re not.',
        reaction: {
          text: 'Maris tilts her head, disappointed but understanding. "That\'s okay. Some people need more time to open up." She turns to someone else. You\'ve been dismissed—gently.',
          emotion: 'neutral',
          bodyLanguage: 'Warm rejection. Still rejection. The crowd\'s attention moves past you.',
          scoreImpact: -20,
        },
        nextSceneId: 'party-declined-recovery',
      },
      {
        id: 'test-counter',
        text: '"Wait—you have to answer too, right?"',
        reaction: {
          text: 'Her eyes widen with delight. "Ooh. Someone who plays fair." She extends her hand. "Deal. This is going to be fun."',
          emotion: 'happy',
          bodyLanguage: 'You\'ve changed the game. She seems genuinely pleased—or she wants you to think she is.',
          scoreImpact: 15,
        },
        nextSceneId: 'party-question-one',
        isOptimal: true,
        tactic: 'frame-control',
      },
    ],
  },
  {
    id: 'party-question-one',
    backgroundId: 'party',
    sceneType: 'dialogue',
    pathId: 'party',
    mood: 'tense',
    shakeOnEntry: 'threat',
    dialog: [
      {
        text: 'Maris turns to face you fully. The party seems to fade. It\'s just the two of you now.',
      },
      {
        text: '"First question." She tucks her legs under herself. "What do you really want? Not the polite answer. The real one."',
        speakerId: 'maris',
        emotion: 'curious',
      },
      {
        text: 'She\'s not asking casually. She\'s evaluating.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'q1-honest-ambition',
        text: '"Same thing everyone here wants. I\'m just not pretending otherwise."',
        reaction: {
          text: 'Maris leans back, impressed. "Self-awareness. That\'s rare." She nods slowly. "I can respect honesty."',
          emotion: 'curious',
          bodyLanguage: 'You admitted what others hide. She files this information away.',
          scoreImpact: 15,
        },
        nextSceneId: 'party-question-two',
        isOptimal: true,
      },
      {
        id: 'q1-deflect',
        text: '"World peace? A puppy?" Smile like you\'re kidding. Mostly.',
        reaction: {
          text: 'Maris\'s smile stays perfectly warm, but her eyes dim. "Cute. But I asked for truth." She\'s already less interested.',
          emotion: 'neutral',
          bodyLanguage: 'The warmth is still there. The connection isn\'t.',
          scoreImpact: -10,
        },
        nextSceneId: 'party-question-two',
      },
      {
        id: 'q1-challenge',
        text: '"Why—what do you want?"',
        reaction: {
          text: 'She laughs, delighted. "Because want is everything. People lie about what they think. They never lie about what they want." She leans closer. "And now I know you\'re strategic."',
          emotion: 'smirking',
          bodyLanguage: 'You\'ve shown you think before you answer. That interests her.',
          scoreImpact: 10,
        },
        nextSceneId: 'party-question-two',
        tactic: 'meta-awareness',
      },
    ],
  },
  {
    id: 'party-question-two',
    backgroundId: 'party',
    sceneType: 'dialogue',
    pathId: 'party',
    mood: 'tense',
    dialog: [
      {
        text: '"Question two." She traces a finger along the rim of her glass. "Tell me your biggest flaw. The real one. The one that actually costs you."',
        speakerId: 'maris',
        emotion: 'curious',
      },
      {
        text: 'Careful. Give something real enough to seem honest. Not real enough to be used.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'q2-strategic-honest',
        text: '"I let people disappoint me twice. Sometimes three times."',
        reaction: {
          text: 'Maris nods, something flickering in her expression. "Loyalty. That\'s not really a flaw." She pauses. "But I understand why it feels like one."',
          emotion: 'neutral',
          bodyLanguage: 'Real but not exploitable. She seems almost... sympathetic.',
          scoreImpact: 10,
        },
        nextSceneId: 'party-question-three',
        isOptimal: true,
        tactic: 'strategic-vulnerability',
      },
      {
        id: 'q2-fake-humble',
        text: '"Oh god, uh... I work too hard?" Cringe at yourself.',
        reaction: {
          text: 'Maris\'s smile freezes for just a moment. "That\'s what you say in job interviews." Her voice is still sweet. Her interest is not.',
          emotion: 'neutral',
          bodyLanguage: 'Fake vulnerability gets fake warmth. You\'ve lost authenticity points.',
          scoreImpact: -10,
        },
        nextSceneId: 'party-question-three',
      },
      {
        id: 'q2-flip',
        text: '"Show me yours first."',
        reaction: {
          text: 'She laughs. "Fair\'s fair." She glances down, perfectly timed. "I get bored. With things. With people." She looks up, eyes soft. "Everyone leaves eventually. I just leave first."',
          emotion: 'neutral',
          bodyLanguage: 'Rehearsed. The pause, the eye contact—all of it. Beautiful performance.',
          scoreImpact: 15,
        },
        nextSceneId: 'party-question-three',
        isOptimal: true,
        tactic: 'reciprocity-demand',
      },
    ],
  },
  {
    id: 'party-question-three',
    backgroundId: 'party',
    sceneType: 'dialogue',
    pathId: 'party',
    mood: 'tense',
    dialog: [
      {
        text: '"Last question." Maris leans forward. Her voice drops so only you can hear.',
        speakerId: 'maris',
        emotion: 'seductive',
      },
      {
        text: '"Why should I bring you to the gala? The real answer."',
        speakerId: 'maris',
        emotion: 'serious',
      },
      {
        text: 'She knew. Of course she knew. The whole game was leading here.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'q3-value-prop',
        text: '"Because you\'re bored of people who agree with everything you say."',
        reaction: {
          text: 'She considers this, head tilted. "Interesting. Low maintenance. Socially competent." She smiles. "Those are good selling points."',
          emotion: 'curious',
          bodyLanguage: 'You positioned yourself as an asset, not a favor.',
          scoreImpact: 20,
        },
        nextSceneId: 'party-escalation',
        isOptimal: true,
        tactic: 'value-positioning',
      },
      {
        id: 'q3-beg',
        text: '"I\'m not gonna lie—this would mean a lot. Huge favor. I know."',
        reaction: {
          text: 'Maris\'s expression softens—pityingly. "I hate owing people. And I hate when people owe me." She pats your hand. "Good luck out there."',
          emotion: 'neutral',
          bodyLanguage: 'Dismissed. With kindness. Still dismissed.',
          scoreImpact: -25,
        },
        nextSceneId: 'party-failed',
      },
      {
        id: 'q3-honest-bold',
        text: '"Maybe you shouldn\'t." Pause. "Unless you want someone who\'ll actually tell you the truth."',
        reaction: {
          text: 'She blinks. Then laughs—genuinely surprised. "Everyone at these things is so careful around me." Her eyes sparkle. "That was refreshing."',
          emotion: 'happy',
          bodyLanguage: 'You said what no one else dares. She\'s intrigued.',
          scoreImpact: 25,
        },
        nextSceneId: 'party-escalation',
        isOptimal: true,
        tactic: 'bold-honesty',
      },
    ],
  },
  {
    id: 'party-declined-recovery',
    backgroundId: 'party',
    sceneType: 'dialogue',
    pathId: 'party',
    mood: 'cold',
    dialog: [
      {
        text: 'The party continues, but you\'re on the periphery now. Maris\'s attention is elsewhere.',
      },
      {
        text: 'She\'s playing the game with someone else. They\'re struggling—giving bad answers, looking nervous. Maris\'s smile is patient, but her eyes are bored.',
      },
      {
        text: 'Then—for half a second—you catch it. When the other person looks down, Maris\'s face goes completely still. Blank. The warmth vanishes like it was never there. Her eyes track them like a cat watching a mouse tire itself out.',
      },
      {
        text: 'Then they look up, and the smile snaps back. Perfect. Warm. Like nothing happened.',
      },
      {
        text: 'What was that?',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
      {
        text: 'There\'s an opening. If you can rescue them gracefully, she might notice you again.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'recovery-help',
        text: 'Jump in. Rescue them with a joke.',
        reaction: {
          text: 'The other person laughs, relieved. Maris raises an eyebrow at you. "Playing hero?" There\'s something like interest in her voice.',
          emotion: 'curious',
          bodyLanguage: 'She\'s reassessing. You showed social grace, not just fear.',
          scoreImpact: 10,
        },
        nextSceneId: 'party-escalation',
      },
      {
        id: 'recovery-leave',
        text: 'Slip out. This party\'s done.',
        reaction: {
          text: 'You slip away while everyone is distracted. The common room awaits.',
          emotion: 'neutral',
          bodyLanguage: 'Sometimes changing battlefields is the smart move.',
          scoreImpact: 0,
        },
        nextSceneId: 'study-hall-arrival',
      },
      {
        id: 'recovery-wait',
        text: 'Stay invisible. Wait it out.',
        reaction: {
          text: 'You watch from the sidelines. Maris never looks your way again. You\'ve faded from her awareness.',
          emotion: 'neutral',
          bodyLanguage: 'Invisible. Safe, but invisible.',
          scoreImpact: -5,
        },
        nextSceneId: 'party-ticket-moment',
      },
    ],
  },
];
