import type { ForkScene } from '../../../types';

/**
 * Mission 14: Ghosts of the Past - Introduction
 * The setup before the ghost appears
 */
export const ghostIntroScenes: ForkScene[] = [
  {
    id: 'ghost-intro',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    chapter: { name: 'Ghosts of the Past', index: 5, total: 5 },
    mood: 'mysterious',
    dialog: [
      {
        text: 'The night deepens. The crowd thins. The real players remain.',
      },
      {
        text: 'Blake checks his phone. "Kai texted. She wants to meet up later. Debrief."',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: '"She\'s checking on her investment."',
      },
      {
        text: '"Probably. Still. Good to have friends."',
        speakerId: 'blake',
        emotion: 'happy',
      },
    ],
    nextSceneId: 'ghost-sensation',
  },
  {
    id: 'ghost-sensation',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    mood: 'tense',
    dialog: [
      {
        text: 'And then. A sensation. Eyes on you.',
      },
      {
        text: 'Not calculating like Maris. Not territorial like Victoria.',
      },
      {
        text: 'Something else. Something familiar.',
      },
      {
        text: 'You turn.',
      },
      {
        text: 'Someone from the past. Standing right there. In this world.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'ghost-branch-point',
  },
  {
    id: 'ghost-branch-point',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    mood: 'tense',
    dialog: [
      {
        text: 'Blake follows your gaze. "What is it? You look like you\'ve seen a—"',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: '"Ghost."',
      },
      {
        text: 'The past doesn\'t stay buried. It waits. And then it appears.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    // Dynamic routing based on L2 flag would go here
    // For now, default to Dana (rival path in L2)
    nextSceneId: 'ghost-dana-appears',
  },
];
