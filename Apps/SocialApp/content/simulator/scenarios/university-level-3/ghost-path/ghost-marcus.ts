import type { ForkScene } from '../../../types';

/**
 * Mission 14: Ghosts of the Past - Marcus Chen
 * The mentor from Level 2 has his own agenda
 * (Appears if player took the mentor path in L2)
 */
export const ghostMarcusScenes: ForkScene[] = [
  {
    id: 'ghost-marcus-appears',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    chapter: { name: 'Ghosts of the Past', index: 5, total: 5 },
    mood: 'professional',
    dialog: [
      {
        text: 'Marcus Chen. Your mentor from the university. Here.',
      },
      {
        text: 'He looks... different. More polished. More powerful.',
      },
      {
        text: '"I had a feeling you\'d make it here eventually."',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: 'The mentor who guided you. Now standing as an equal. Or competitor.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ghost-marcus-approach',
  },
  {
    id: 'ghost-marcus-approach',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    mood: 'professional',
    dialog: [
      {
        text: '"The Caldwells. Impressive start."',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: '"I had good teachers."',
      },
      {
        text: '"Flattery. Still using the basics." He almost smiles.',
        speakerId: 'marcus',
        emotion: 'smirking',
      },
      {
        text: '"But the basics work. That\'s why they\'re basics."',
        speakerId: 'marcus',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'marcus-trap',
        text: '"Are you checking up on me?"',
        nextSceneId: 'ghost-marcus-defensive',
        isOptimal: false,
        tactic: 'suspicious',
        reaction: {
          text: '"Always. You\'re an investment. Investments need monitoring."',
          emotion: 'cold',
          bodyLanguage: 'Defensive. He expected more growth.',
          scoreImpact: -5,
        },
      },
      {
        id: 'marcus-subtle',
        text: '"What brings you to this particular event?"',
        nextSceneId: 'ghost-marcus-honest',
        isOptimal: false,
        tactic: 'curious',
        reaction: {
          text: '"The same thing that brings everyone. Opportunity."',
          emotion: 'neutral',
          bodyLanguage: 'Neutral probe. Neutral response.',
          scoreImpact: 5,
        },
      },
      {
        id: 'marcus-close',
        text: '"I\'ve grown beyond the basics. Let me show you."',
        nextSceneId: 'ghost-marcus-prove',
        isOptimal: false,
        tactic: 'confidence',
        reaction: {
          text: '"Confidence. Good. Overconfidence. Dangerous."',
          emotion: 'knowing',
          bodyLanguage: 'He\'s still teaching. Whether you want it or not.',
          scoreImpact: 10,
        },
      },
      {
        id: 'marcus-optimal',
        text: '"You positioned me here deliberately. This was always the plan."',
        nextSceneId: 'ghost-marcus-revealed',
        isOptimal: true,
        tactic: 'pattern-recognition',
        reaction: {
          text: 'A pause. Then a genuine smile. "Now you\'re thinking."',
          emotion: 'happy',
          bodyLanguage: 'You saw the long game. He\'s proud.',
          scoreImpact: 25,
        },
      },
    ],
  },
  {
    id: 'ghost-marcus-defensive',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"Monitoring can feel like checking. It\'s not."',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: '"It\'s ensuring my time wasn\'t wasted."',
        speakerId: 'marcus',
        emotion: 'cold',
      },
      {
        text: 'Cold. But honest. He values results.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'ghost-marcus-advice',
  },
  {
    id: 'ghost-marcus-honest',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"Opportunity. And reconnaissance. The Caldwells are moving."',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: '"Moving?"',
      },
      {
        text: '"Expanding. Consolidating. They need people. Good people."',
        speakerId: 'marcus',
        emotion: 'knowing',
      },
      {
        text: '"People like me?"',
      },
      {
        text: '"People exactly like you."',
        speakerId: 'marcus',
        emotion: 'serious',
      },
    ],
    nextSceneId: 'ghost-marcus-advice',
  },
  {
    id: 'ghost-marcus-prove',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"Show me." He crosses his arms. Waiting.',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: 'You walk him through the evening. The moves. The countermoves.',
      },
      {
        text: '"Competent." He nods. "Not exceptional. But competent."',
        speakerId: 'marcus',
        emotion: 'knowing',
      },
      {
        text: 'High praise. From him.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ghost-marcus-advice',
  },
  {
    id: 'ghost-marcus-revealed',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"The plan." He tilts his head. "Partially."',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: '"I needed someone inside. The Caldwell orbit requires... specific credentials."',
        speakerId: 'marcus',
        emotion: 'knowing',
      },
      {
        text: '"And I have them now."',
      },
      {
        text: '"You\'re building them. Which is why we need to talk. About what comes next."',
        speakerId: 'marcus',
        emotion: 'serious',
      },
    ],
    nextSceneId: 'ghost-marcus-proposition',
  },
  {
    id: 'ghost-marcus-advice',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"A piece of advice. Free of charge."',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: '"The Caldwells and Victoria are heading toward collision. When it happens, everyone will have to choose."',
        speakerId: 'marcus',
        emotion: 'serious',
      },
      {
        text: '"Choose wisely."',
        speakerId: 'marcus',
        emotion: 'knowing',
      },
      {
        text: 'A warning. From someone who\'s seen these wars before.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ghost-complete',
  },
  {
    id: 'ghost-marcus-proposition',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    mood: 'professional',
    dialog: [
      {
        text: '"What comes next is this: you continue building trust with Maris. With Millicent."',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: '"And when the time is right, you\'ll have access to things I need."',
        speakerId: 'marcus',
        emotion: 'serious',
      },
      {
        text: '"You want me to spy for you."',
      },
      {
        text: '"I want you to gather intelligence. For both of us. Mutual benefit."',
        speakerId: 'marcus',
        emotion: 'knowing',
      },
      {
        text: 'The mentor becomes the handler. New dynamic.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'spy-trap',
        text: '"I won\'t betray them."',
        nextSceneId: 'ghost-marcus-disappointed',
        isOptimal: false,
        tactic: 'loyalty',
        reaction: {
          text: '"Loyalty. Admirable. But in this world? A liability."',
          emotion: 'cold',
          bodyLanguage: 'You showed weakness. He\'s disappointed.',
          scoreImpact: -10,
        },
      },
      {
        id: 'spy-subtle',
        text: '"What\'s in it for me?"',
        nextSceneId: 'ghost-marcus-terms',
        isOptimal: false,
        tactic: 'pragmatic',
        reaction: {
          text: '"Access. Information. Protection when the war starts."',
          emotion: 'neutral',
          bodyLanguage: 'Practical question. He respects it.',
          scoreImpact: 10,
        },
      },
      {
        id: 'spy-close',
        text: '"I\'ll consider it. No promises."',
        nextSceneId: 'ghost-marcus-patient',
        isOptimal: false,
        tactic: 'noncommittal',
        reaction: {
          text: '"Take your time. But not too much. Events are accelerating."',
          emotion: 'knowing',
          bodyLanguage: 'He\'ll wait. But not forever.',
          scoreImpact: 5,
        },
      },
      {
        id: 'spy-optimal',
        text: '"I gather intelligence for myself first. You get what serves my interests."',
        nextSceneId: 'ghost-marcus-proud',
        isOptimal: true,
        tactic: 'self-interest',
        reaction: {
          text: 'A real smile. "Now you\'re thinking like a player. Not a pawn."',
          emotion: 'happy',
          bodyLanguage: 'You put yourself first. That\'s the lesson.',
          scoreImpact: 25,
        },
      },
    ],
  },
  {
    id: 'ghost-marcus-disappointed',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"Loyalty to people who would discard you without hesitation."',
        speakerId: 'marcus',
        emotion: 'cold',
      },
      {
        text: '"Think about that."',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: 'He walks away. Disappointed. But not done with you.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'ghost-complete',
  },
  {
    id: 'ghost-marcus-terms',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"Protection. When Victoria makes her move, you\'ll want allies outside the blast radius."',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: '"And information flows both ways. What I know, you\'ll know."',
        speakerId: 'marcus',
        emotion: 'knowing',
      },
      {
        text: '"Fair exchange."',
      },
      {
        text: '"The only kind worth making."',
        speakerId: 'marcus',
        emotion: 'serious',
      },
    ],
    nextSceneId: 'ghost-complete',
  },
  {
    id: 'ghost-marcus-patient',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"Consider. But consider quickly."',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: 'He pulls out a card. Different from the others. Simpler.',
      },
      {
        text: '"When you\'re ready. If you\'re ready."',
        speakerId: 'marcus',
        emotion: 'knowing',
      },
      {
        text: 'Another door. Another choice. The weight is building.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'ghost-complete',
  },
  {
    id: 'ghost-marcus-proud',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"Self-interest. The foundation of everything sustainable."',
        speakerId: 'marcus',
        emotion: 'happy',
      },
      {
        text: '"You\'ve learned the real lesson. Not the tactics. The philosophy."',
        speakerId: 'marcus',
        emotion: 'knowing',
      },
      {
        text: '"We\'ll work well together. When you\'re ready."',
        speakerId: 'marcus',
        emotion: 'serious',
      },
      {
        text: 'The student becomes the partner. Evolution complete.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ghost-complete',
  },
];
