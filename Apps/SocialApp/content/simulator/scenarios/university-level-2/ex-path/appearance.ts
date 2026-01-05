import type { ForkScene } from '../../../types';

/**
 * Ex Path - The Appearance
 * Marcus enters the scene and triangulation begins
 */
export const appearanceScenes: ForkScene[] = [
  {
    id: 'ex-appearance-intro',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ex',
    chapter: { name: 'Mission 4: The Ex Returns', index: 4, total: 5 },
    mood: 'party',
    dialog: [
      {
        text: 'Friday night. Industry mixer. Blake insisted you come.',
      },
      {
        text: '"Everyone who matters is here tonight. Plus, I need a wingman."',
        speakerId: 'blake',
        emotion: 'happy',
      },
      {
        text: 'The room is full. Important people. Loud music. And then—',
      },
    ],
    nextSceneId: 'ex-marcus-enters',
  },
  {
    id: 'ex-marcus-enters',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ex',
    mood: 'tense',
    dialog: [
      {
        text: 'Someone walks in. The room shifts. Eyes track him.',
      },
      {
        text: 'Tall. Dark. That effortless confidence that says "I don\'t need anyone."',
      },
      {
        text: 'Blake tenses. "Oh shit. That\'s Marcus."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'ex-marcus-context',
  },
  {
    id: 'ex-marcus-context',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ex',
    dialog: [
      {
        text: '"My ex. Well, everyone\'s ex. He cycles through people like seasons."',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: '"Pulls you in, pushes you away, then acts confused when you\'re hurt."',
        speakerId: 'blake',
        emotion: 'sad',
      },
      {
        text: 'Dismissive avoidant. The ones who never need you until you stop needing them.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ex-marcus-approaches',
  },
  {
    id: 'ex-marcus-approaches',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ex',
    mood: 'tense',
    dialog: [
      {
        text: 'Marcus spots Blake. Starts walking over. Blake stiffens.',
      },
      {
        text: '"Hey. Been a while."',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: 'His eyes drift to you. Assessing. Interested.',
      },
      {
        text: '"And who\'s this?"',
        speakerId: 'marcus',
        emotion: 'curious',
      },
    ],
    dialogueChoices: [
      {
        id: 'approach-trap',
        text: 'Look to Blake to introduce you.',
        nextSceneId: 'ex-blake-introduces',
        isOptimal: false,
        tactic: 'defer',
        reaction: {
          text: 'Marcus\'s eyes flicker. You needed permission. Noted.',
          emotion: 'neutral',
          bodyLanguage: 'Power assessment: you\'re not the lead.',
          scoreImpact: -10,
        },
      },
      {
        id: 'approach-subtle',
        text: 'Introduce yourself. Keep it simple.',
        nextSceneId: 'ex-simple-intro',
        isOptimal: false,
        tactic: 'basic',
        reaction: {
          text: '"Nice to meet you." Standard. Nothing memorable.',
          emotion: 'neutral',
          bodyLanguage: 'You exist. That\'s all he knows.',
          scoreImpact: 0,
        },
      },
      {
        id: 'approach-close',
        text: '"The one Blake won\'t shut up about. Nice to finally meet the legend."',
        nextSceneId: 'ex-knowing-intro',
        isOptimal: false,
        tactic: 'playful',
        reaction: {
          text: 'His eyebrow raises. Slight smile. "Legend, huh?"',
          emotion: 'smirking',
          bodyLanguage: 'Interest sparked. But he knows you know.',
          scoreImpact: 5,
        },
      },
      {
        id: 'approach-optimal',
        text: 'Extend hand. Firm shake. "You\'re interrupting our conversation. But hi."',
        nextSceneId: 'ex-frame-set',
        isOptimal: true,
        tactic: 'frame-control',
        reaction: {
          text: 'Something shifts in his eyes. Surprise. Interest.',
          emotion: 'curious',
          bodyLanguage: 'He\'s used to people accommodating him. You didn\'t.',
          scoreImpact: 15,
        },
      },
    ],
  },
  // Branch scenes
  {
    id: 'ex-blake-introduces',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ex',
    dialog: [
      {
        text: '"This is my friend. We were just—"',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: '"I see." Marcus cuts him off. Already bored.',
        speakerId: 'marcus',
        emotion: 'cold',
      },
      {
        text: 'He turns to you. Evaluating if you\'re worth the effort.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'ex-marcus-test',
  },
  {
    id: 'ex-simple-intro',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ex',
    dialog: [
      {
        text: '"Likewise." He barely looks at you. Eyes scanning the room.',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: 'You\'re already forgotten. Part of the background.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'ex-marcus-test',
  },
  {
    id: 'ex-knowing-intro',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ex',
    dialog: [
      {
        text: 'Blake shifts uncomfortably. Marcus notices.',
        speakerId: 'marcus',
        emotion: 'smirking',
      },
      {
        text: '"Whatever Blake told you... it\'s probably true."',
        speakerId: 'marcus',
        emotion: 'smirking',
      },
      {
        text: 'Self-aware villain. The most dangerous kind.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ex-marcus-test',
  },
  {
    id: 'ex-frame-set',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ex',
    dialog: [
      {
        text: 'Marcus pauses. Recalibrates. Actually looks at you now.',
        speakerId: 'marcus',
        emotion: 'curious',
      },
      {
        text: '"Fair enough. I\'ll wait my turn."',
        speakerId: 'marcus',
        emotion: 'smirking',
      },
      {
        text: 'He steps back. Doesn\'t leave. Watches.',
      },
      {
        text: 'You didn\'t fawn. He\'s curious now.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ex-marcus-waits',
  },
  {
    id: 'ex-marcus-test',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ex',
    dialog: [
      {
        text: '"So. Are you one of Blake\'s projects, or something interesting?"',
        speakerId: 'marcus',
        emotion: 'cold',
      },
      {
        text: 'The condescension is quiet. Almost charming. But it\'s there.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'test-trap',
        text: '"I like to think I\'m interesting! What makes you ask?"',
        nextSceneId: 'ex-marcus-dismisses',
        isOptimal: false,
        tactic: 'qualify',
        reaction: {
          text: '"We\'ll see." He\'s already looking elsewhere.',
          emotion: 'neutral',
          bodyLanguage: 'You tried to prove yourself. He lost interest.',
          scoreImpact: -15,
        },
      },
      {
        id: 'test-subtle',
        text: '"Blake doesn\'t have projects. He has friends."',
        nextSceneId: 'ex-marcus-considers',
        isOptimal: false,
        tactic: 'defend',
        reaction: {
          text: '"If you say so." Dismissive. But a flicker of reconsideration.',
          emotion: 'neutral',
          bodyLanguage: 'You defended Blake. That says something.',
          scoreImpact: 0,
        },
      },
      {
        id: 'test-close',
        text: '"I don\'t know. You tell me. You seem to have opinions."',
        nextSceneId: 'ex-marcus-engaged',
        isOptimal: false,
        tactic: 'redirect',
        reaction: {
          text: 'His lip twitches. "I do. Usually right."',
          emotion: 'smirking',
          bodyLanguage: 'You\'re playing his game now.',
          scoreImpact: 5,
        },
      },
      {
        id: 'test-optimal',
        text: 'Just smile. Don\'t answer. Turn back to Blake.',
        nextSceneId: 'ex-marcus-hooked',
        isOptimal: true,
        tactic: 'disengagement',
        reaction: {
          text: 'His expression shifts. Confusion. Then something like respect.',
          emotion: 'curious',
          bodyLanguage: 'You didn\'t play. DAs are fascinated by people who don\'t chase.',
          scoreImpact: 20,
        },
      },
    ],
  },
  {
    id: 'ex-marcus-waits',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ex',
    dialog: [
      {
        text: 'You continue talking to Blake. Marcus hovers nearby.',
      },
      {
        text: 'Five minutes. Ten. He keeps glancing over.',
      },
      {
        text: '"He never waits for anyone." Blake whispers, amazed.',
        speakerId: 'blake',
        emotion: 'curious',
      },
    ],
    nextSceneId: 'ex-marcus-reapproach',
  },
  {
    id: 'ex-marcus-dismisses',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ex',
    dialog: [
      {
        text: 'Marcus nods. Already moving away.',
      },
      {
        text: '"Catch you later, Blake." He\'s gone.',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: 'Blake sighs. "Don\'t feel bad. He does that to everyone."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'ex-history-lesson',
  },
  {
    id: 'ex-marcus-considers',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ex',
    dialog: [
      {
        text: 'He pauses. Something in his expression softens, briefly.',
      },
      {
        text: '"Blake\'s lucky then."',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: 'He moves away. But looks back once.',
      },
    ],
    nextSceneId: 'ex-history-lesson',
  },
  {
    id: 'ex-marcus-engaged',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ex',
    dialog: [
      {
        text: '"You know what? Let me get you a drink."',
        speakerId: 'marcus',
        emotion: 'smirking',
      },
      {
        text: 'Blake tenses. Protective.',
      },
      {
        text: '"Marcus..."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: '"Relax. I\'m just being friendly."',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'ex-drink-offer',
  },
  {
    id: 'ex-marcus-hooked',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ex',
    dialog: [
      {
        text: 'You turn away. Fully. Like he doesn\'t exist.',
      },
      {
        text: 'A minute later: "Wait."',
        speakerId: 'marcus',
        emotion: 'curious',
      },
      {
        text: 'He steps closer. Drops the arrogance.',
      },
      {
        text: '"That was rude of me. Let me start over."',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: 'Dismissive avoidants only pursue what retreats.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ex-fresh-start',
  },
];
