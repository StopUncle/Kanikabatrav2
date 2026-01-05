import type { ForkScene } from '../../../types';

/**
 * Mission 14: The Ghost Returns - Marcus Variant
 * Marcus Webb wants acknowledgment of his worth. Threatens to expose tactics.
 * Triggered if: Player humiliated Marcus in L2 Ex Path
 */
export const marcusGhostScenes: ForkScene[] = [
  {
    id: 'marcus-ghost-appearance',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    chapter: { name: 'Mission 14: The Ghost Returns', index: 1, total: 4 },
    mood: 'tense',
    dialog: [
      {
        text: 'Marcus Webb. Of all the people...',
      },
      {
        text: 'He\'s dressed better than you\'ve ever seen. New money confidence. New arm candy.',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: 'Blake notices. "Isn\'t that your—"',
        speakerId: 'blake',
        emotion: 'confused',
      },
      {
        text: '"Ex. Yes. And he\'s coming this way."',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'marcus-confrontation',
  },
  {
    id: 'marcus-confrontation',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    mood: 'cold',
    dialog: [
      {
        text: '"Well. Look who made it to the big leagues."',
        speakerId: 'marcus',
        emotion: 'smirking',
      },
      {
        text: '"I heard you were coming. Couldn\'t believe it at first."',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: 'His date hangs back. Watching. Evaluating.',
      },
      {
        text: '"You know, after everything... I thought I\'d be angrier seeing you. But I\'m not."',
        speakerId: 'marcus',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'marcus-history',
  },
  {
    id: 'marcus-history',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    mood: 'cold',
    dialog: [
      {
        text: '"You taught me something. That\'s the funny part."',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: '"You showed me that people will use whatever tools work. Emotions. Vulnerabilities. Trust."',
        speakerId: 'marcus',
        emotion: 'cold',
      },
      {
        text: 'He\'s different. Harder.',
      },
      {
        text: '"I was soft when we met. You... cured that."',
        speakerId: 'marcus',
        emotion: 'smirking',
      },
      {
        text: 'You made him. This version of him.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'marcus-history-trap',
        text: '"Marcus, I never meant to hurt you. I cared about you."',
        nextSceneId: 'marcus-leverage',
        isOptimal: false,
        tactic: 'emotional-appeal',
        reaction: {
          text: '"Cared." He laughs. "Cared is what you told yourself. Control is what you did."',
          emotion: 'cold',
          bodyLanguage: 'He\'s past emotional manipulation. Immune.',
          scoreImpact: -15,
        },
      },
      {
        id: 'marcus-history-subtle',
        text: '"We both made mistakes. I hope you\'ve moved on."',
        nextSceneId: 'marcus-leverage',
        isOptimal: false,
        tactic: 'mutual-blame',
        reaction: {
          text: '"Moved on?" He gestures at the room. "I\'d say so. Question is: have you?"',
          emotion: 'smirking',
          bodyLanguage: 'Deflection. He expected that.',
          scoreImpact: 0,
        },
      },
      {
        id: 'marcus-history-close',
        text: '"I was strategic. You were genuine. That doesn\'t make either of us wrong."',
        nextSceneId: 'marcus-leverage',
        isOptimal: false,
        tactic: 'honest-framing',
        reaction: {
          text: '"Strategic. Nice word for what you did." But he\'s listening.',
          emotion: 'neutral',
          bodyLanguage: 'You acknowledged without apologizing. He respects that.',
          scoreImpact: 10,
        },
      },
      {
        id: 'marcus-history-optimal',
        text: '"You deserved better. I knew that then. I know it now. But I made my choice."',
        nextSceneId: 'marcus-leverage',
        isOptimal: true,
        tactic: 'accountable-cold',
        reaction: {
          text: 'Something shifts in his face. "At least you\'re honest about it now."',
          emotion: 'sad',
          bodyLanguage: 'You owned it without groveling. He wasn\'t expecting that.',
          scoreImpact: 20,
        },
      },
    ],
  },
  {
    id: 'marcus-leverage',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    mood: 'tense',
    dialog: [
      {
        text: '"Here\'s the thing. I\'ve been talking to people. Learning about how you operate."',
        speakerId: 'marcus',
        emotion: 'knowing',
      },
      {
        text: '"The pattern. Find someone useful. Extract what you need. Discard when done."',
        speakerId: 'marcus',
        emotion: 'cold',
      },
      {
        text: '"I could share that pattern. With the right people. It might change how they see you."',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: 'He has leverage. The question is: what does he want?',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'marcus-leverage-trap',
        text: '"Please don\'t do this. I know I hurt you, but—"',
        nextSceneId: 'marcus-reckoning',
        isOptimal: false,
        tactic: 'plead',
        reaction: {
          text: '"There it is. The manipulation. \'Please\' when cornered. Classic."',
          emotion: 'smirking',
          bodyLanguage: 'He\'s studied you. Pleading confirms his theory.',
          scoreImpact: -20,
        },
      },
      {
        id: 'marcus-leverage-subtle',
        text: '"Everyone has patterns. Including you. Glass houses, Marcus."',
        nextSceneId: 'marcus-reckoning',
        isOptimal: false,
        tactic: 'counter-threat',
        reaction: {
          text: '"Maybe. But I\'m not the one trying to impress Maris Caldwell tonight."',
          emotion: 'cold',
          bodyLanguage: 'He knows you need this more than he does.',
          scoreImpact: 0,
        },
      },
      {
        id: 'marcus-leverage-close',
        text: '"What would it take? To not share that pattern?"',
        nextSceneId: 'marcus-reckoning',
        isOptimal: false,
        tactic: 'negotiate',
        reaction: {
          text: '"Now we\'re talking." A glint of satisfaction. "Acknowledgment. Public."',
          emotion: 'knowing',
          bodyLanguage: 'He wants to be seen as your equal. In front of everyone.',
          scoreImpact: 10,
        },
      },
      {
        id: 'marcus-leverage-optimal',
        text: '"You\'re not here to destroy me. If you were, you\'d have done it already. What do you really want?"',
        nextSceneId: 'marcus-reckoning',
        isOptimal: true,
        tactic: 'see-through',
        reaction: {
          text: 'He pauses. The mask slips. "I want you to admit I mattered. That it wasn\'t all fake."',
          emotion: 'sad',
          bodyLanguage: 'Under the armor, he\'s still hurt. You saw that.',
          scoreImpact: 25,
        },
      },
    ],
  },
  {
    id: 'marcus-reckoning',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    mood: 'cold',
    dialog: [
      {
        text: 'A long moment. Marcus looks at you. Really looks.',
      },
      {
        text: '"I used to think about this moment. What I\'d say. How I\'d make you feel small."',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: '"But seeing you here, playing the same games at a bigger table..."',
        speakerId: 'marcus',
        emotion: 'sad',
      },
      {
        text: '"I think you\'re already smaller than you know."',
        speakerId: 'marcus',
        emotion: 'cold',
      },
      {
        text: 'He walks away. His date follows.',
      },
      {
        text: 'Blake stares. "That was... intense."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: 'Ghosts don\'t stay buried. Remember that.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'climax-convergence-intro',
  },
];
