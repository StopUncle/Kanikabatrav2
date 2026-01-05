import type { ForkScene } from '../../../types';

/**
 * The Morning After - Opening scene establishing context from Level 1
 * Sets up the new social landscape post-university
 */
export const morningAfterScenes: ForkScene[] = [
  {
    id: 'morning-after-intro',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'setup',
    chapter: { name: 'Act 1: The Morning After', index: 1, total: 5 },
    dialog: [
      {
        text: 'Three months since the Caldwell Gala.',
      },
      {
        text: 'You got the ticket. Made the impression. Graduated with connections most people spend years building.',
      },
      {
        text: 'But university was the tutorial. This? This is the real game.',
      },
      {
        text: 'Your phone buzzes. Three notifications.',
      },
    ],
    nextSceneId: 'morning-notifications',
  },
  {
    id: 'morning-notifications',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: 'First: Blake. "Tonight. Velvet Room. Tyler\'s hosting. You in?"',
      },
      {
        text: 'Second: A dating app. Three new matches waiting.',
      },
      {
        text: 'Third: Dana Morrison. "Hey! Coffee soon? I know someone PERFECT for you. Promise I\'ll behave. 😇"',
      },
      {
        text: 'The social scene. Everyone wants something. Everyone\'s playing an angle.',
      },
    ],
    nextSceneId: 'morning-blake-context',
  },
  {
    id: 'morning-blake-context',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: 'Blake. Your wingman since freshman year. Loyal, supportive... and subtly competitive when it matters.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'morning-blake-intro',
  },
  {
    id: 'morning-blake-intro',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: '"Tyler Vance. Club promoter. Lives for the spotlight."',
        speakerId: 'blake',
        emotion: 'happy',
      },
      {
        text: '"Gets you into VIP if you stroke his ego right. Melts down if you ignore him. Classic."',
        speakerId: 'blake',
        emotion: 'smirking',
      },
      {
        text: '"But his parties? That\'s where the real players show up. Interested?"',
        speakerId: 'blake',
        emotion: 'curious',
      },
    ],
    nextSceneId: 'morning-dana-context',
  },
  {
    id: 'morning-dana-context',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: 'Dana. Met her at a networking event last month. Sweet. Helpful. Always offering to "connect" you with people.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'morning-dana-text',
  },
  {
    id: 'morning-dana-text',
    backgroundId: 'text-screen',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: '"Seriously, this guy is AMAZING. Smart, successful, exactly your type."',
        speakerId: 'dana',
        emotion: 'happy',
      },
      {
        text: '"I just want to see you happy! Let me set it up? Pretty please? 🙏"',
        speakerId: 'dana',
        emotion: 'happy',
      },
      {
        text: 'Something about her eagerness...',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'morning-app-context',
  },
  {
    id: 'morning-app-context',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: 'The dating apps. Three matches. Three question marks.',
      },
      {
        text: 'Jordan. Too good to be true profile. Model photos. Vague answers.',
      },
      {
        text: 'Sam. Earnest. Awkward. Messages too fast.',
      },
      {
        text: 'Riley. Direct. No games. Refreshingly straightforward.',
      },
      {
        text: 'One of them isn\'t who they claim to be. You can feel it.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'morning-decision',
  },
  {
    id: 'morning-decision',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: 'The social hunting grounds await. Clubs. Apps. Frenemies. Exes.',
      },
      {
        text: 'Everyone wants something from you. The question is what you want from them.',
      },
      {
        text: 'And somewhere out there, Maris Caldwell is watching. She always is.',
      },
    ],
    nextSceneId: 'level-2-fork',
  },
];
