import type { ForkScene } from '../../../types';

/**
 * App Path - Conclusion
 * What you learned from digital dynamics
 */
export const appEndingScenes: ForkScene[] = [
  {
    id: 'app-conclusion',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'app',
    chapter: { name: 'Mission Complete: Dating Apps', index: 2, total: 5 },
    dialog: [
      {
        text: 'Phone down. Coffee cold. Lessons learned.',
      },
      {
        text: 'The catfish tells you: always verify. Too smooth means too fake.',
      },
      {
        text: 'The anxious one teaches: nervousness isn\'t weakness. Sometimes it\'s just excitement.',
      },
      {
        text: 'The direct one shows: secure people don\'t play games. They don\'t need to.',
      },
    ],
    nextSceneId: 'app-mission-complete',
  },
  {
    id: 'app-mission-complete',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'app',
    dialog: [
      {
        text: 'Digital dynamics decoded. But the real tests are face-to-face.',
      },
      {
        text: 'Your phone buzzes. Dana again.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
      {
        text: '"Still on for that coffee? I REALLY want you to meet this guy. Trust me. 💕"',
        speakerId: 'dana',
        emotion: 'happy',
      },
      {
        text: 'That word again. "Trust me." The covert\'s favorite weapon.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'setup-dana-coffee',
  },
];
