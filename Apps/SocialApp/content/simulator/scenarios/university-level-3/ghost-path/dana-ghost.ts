import type { ForkScene } from '../../../types';

/**
 * Mission 14: The Ghost Returns - Dana Variant
 * Dana Morrison seeks revenge. She has evidence. She wants public humiliation.
 * Triggered if: Player betrayed Dana in L2 Setup Path
 */
export const danaGhostScenes: ForkScene[] = [
  {
    id: 'ghost-appearance-intro',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    chapter: { name: 'Mission 14: The Ghost Returns', index: 1, total: 4 },
    mood: 'tense',
    dialog: [
      {
        text: 'Dana Morrison. Here. Walking directly toward you.',
      },
      {
        text: 'She looks different. Sharper. Hungrier. Her smile doesn\'t reach her eyes.',
        speakerId: 'dana',
        emotion: 'cold',
      },
      {
        text: 'Blake tenses. "Isn\'t that—"',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: '"The one you outmaneuvered? Yes. And she remembers."',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'dana-confrontation',
  },
  {
    id: 'dana-confrontation',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    mood: 'tense',
    dialog: [
      {
        text: '"Well, well. Look who climbed the ladder."',
        speakerId: 'dana',
        emotion: 'smirking',
      },
      {
        text: '"I\'ve been watching you tonight. Making friends. Impressing people."',
        speakerId: 'dana',
        emotion: 'cold',
      },
      {
        text: 'She moves closer. Close enough that others can hear.',
      },
      {
        text: '"I wonder if they know how you got here. What you did to get noticed."',
        speakerId: 'dana',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'dana-history',
  },
  {
    id: 'dana-history',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    mood: 'cold',
    dialog: [
      {
        text: '"You played me. Used my connections. Then left me to clean up the mess."',
        speakerId: 'dana',
        emotion: 'angry',
      },
      {
        text: '"Do you know what that cost me? My reputation. My position. Everything."',
        speakerId: 'dana',
        emotion: 'cold',
      },
      {
        text: 'People are starting to notice the tension.',
      },
      {
        text: '"I\'ve had three months to think about what I\'d say when I saw you again."',
        speakerId: 'dana',
        emotion: 'knowing',
      },
      {
        text: 'She\'s not just angry. She planned this.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'dana-history-trap',
        text: '"Dana, that\'s not what happened. You misunderstood—"',
        nextSceneId: 'dana-leverage',
        isOptimal: false,
        tactic: 'denial',
        reaction: {
          text: '"Misunderstood?" Her voice rises. People turn. "I have receipts."',
          emotion: 'angry',
          bodyLanguage: 'Denial made it worse. She\'s got an audience now.',
          scoreImpact: -20,
        },
      },
      {
        id: 'dana-history-subtle',
        text: '"We both made choices. Mine worked out better. That\'s business."',
        nextSceneId: 'dana-leverage',
        isOptimal: false,
        tactic: 'cold-pragmatic',
        reaction: {
          text: '"Business." Her jaw tightens. "You destroyed my career."',
          emotion: 'cold',
          bodyLanguage: 'Callous. She expected more. You gave her ammunition.',
          scoreImpact: -5,
        },
      },
      {
        id: 'dana-history-close',
        text: '"You\'re right. I played dirty. And I\'m sorry it hurt you."',
        nextSceneId: 'dana-leverage',
        isOptimal: false,
        tactic: 'apologize',
        reaction: {
          text: '"Sorry." She laughs, brittle. "Sorry doesn\'t rebuild what you broke."',
          emotion: 'sad',
          bodyLanguage: 'Honest, but she doesn\'t want apologies. She wants blood.',
          scoreImpact: 5,
        },
      },
      {
        id: 'dana-history-optimal',
        text: '"You\'re right. I did what I did. The question is: what do you want now?"',
        nextSceneId: 'dana-leverage',
        isOptimal: true,
        tactic: 'cut-to-chase',
        reaction: {
          text: 'She pauses. Recalculates. "Finally. Someone who speaks my language."',
          emotion: 'knowing',
          bodyLanguage: 'You acknowledged without groveling. She respects directness.',
          scoreImpact: 15,
        },
      },
    ],
  },
  {
    id: 'dana-leverage',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    mood: 'cold',
    dialog: [
      {
        text: '"I\'ve been talking to Victoria. Sharing... observations about your methods."',
        speakerId: 'dana',
        emotion: 'smirking',
      },
      {
        text: '"She\'s very interested in how you networked your way in here. The manipulation. The strategic lies."',
        speakerId: 'dana',
        emotion: 'knowing',
      },
      {
        text: 'Victoria. Of course. She\'s been playing both sides.',
      },
      {
        text: '"I could make things very uncomfortable for you. One conversation with the right people."',
        speakerId: 'dana',
        emotion: 'cold',
      },
      {
        text: 'She\'s holding a bomb. Question is: will she light the fuse?',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'dana-leverage-trap',
        text: '"Please, Dana. Don\'t do this. I\'ll make it up to you somehow."',
        nextSceneId: 'dana-reckoning',
        isOptimal: false,
        tactic: 'beg',
        reaction: {
          text: '"Begging. How the mighty have fallen." She savors it.',
          emotion: 'seductive',
          bodyLanguage: 'You showed weakness. She feeds on weakness.',
          scoreImpact: -25,
        },
      },
      {
        id: 'dana-leverage-subtle',
        text: '"Do what you need to do. I\'ll handle the consequences."',
        nextSceneId: 'dana-reckoning',
        isOptimal: false,
        tactic: 'accept-fate',
        reaction: {
          text: '"That\'s... not the reaction I expected." She hesitates.',
          emotion: 'confused',
          bodyLanguage: 'You didn\'t fight. She\'s thrown off.',
          scoreImpact: 5,
        },
      },
      {
        id: 'dana-leverage-close',
        text: '"You could burn me. But then what? We both lose."',
        nextSceneId: 'dana-reckoning',
        isOptimal: false,
        tactic: 'mutual-destruction',
        reaction: {
          text: '"Maybe I don\'t care about winning anymore. Maybe I just want you to lose."',
          emotion: 'cold',
          bodyLanguage: 'Scorched earth. She\'s past logic.',
          scoreImpact: 0,
        },
      },
      {
        id: 'dana-leverage-optimal',
        text: '"Before you burn me—ask yourself what Maris Caldwell would do if you embarrassed her guest."',
        nextSceneId: 'dana-reckoning',
        isOptimal: true,
        tactic: 'counter-leverage',
        reaction: {
          text: 'Her confidence wavers. "Maris... you\'re with Maris?"',
          emotion: 'concerned',
          bodyLanguage: 'You invoked the bigger predator. She\'s recalculating.',
          scoreImpact: 20,
        },
      },
    ],
  },
  {
    id: 'dana-reckoning',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    mood: 'tense',
    dialog: [
      {
        text: 'A long moment. Dana weighs her options.',
      },
      {
        text: '"This isn\'t over. But... not here. Not tonight."',
        speakerId: 'dana',
        emotion: 'cold',
      },
      {
        text: '"Victoria will hear what I have to say. Whether it matters is up to you."',
        speakerId: 'dana',
        emotion: 'knowing',
      },
      {
        text: 'She walks away. The bomb didn\'t explode. But it\'s still live.',
      },
      {
        text: 'Blake exhales. "What the hell was that?"',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: 'The past catching up. Like it always does.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'climax-convergence-intro',
  },
];
