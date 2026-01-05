// SECRET LEVEL 5: Pattern Mastery - THE TRUE ENDING (Apple-Safe Version)
import type { Scene } from '../../../../types';
import type { DatingScenario, MissionRewards } from '../../types';
import { characters } from '../metadata';

export const MISSION_ID = 'secret-pattern-mastery';
export const rewards: MissionRewards = { power: 100, mask: 80, vision: 70, unlocks: 'ultimate-ending' };

const sceneS5a: Scene = {
  id: 'scene-s5a-revelation',
  backgroundId: 'restaurant',
  dialog: [
    { text: 'The truth unfolds. Every interaction was a lesson in human behavior.' },
    { text: 'You see patterns now where others see chaos.' },
    { speakerId: 'inner-voice', text: 'You\'ve learned to read people. To protect yourself. To understand.', emotion: 'knowing' },
  ],
  choices: [
    { id: 'choice-s5a-1', text: '"I understand now."', nextSceneId: 'scene-s5a-result', isOptimal: true, xpBonus: 25, feedback: 'OPTIMAL: Clarity achieved.' },
    { id: 'choice-s5a-2', text: '"Show me what I learned."', nextSceneId: 'scene-s5a-result', xpBonus: 15, feedback: 'Reviewing your growth.' },
    { id: 'choice-s5a-3', text: '"What happens now?"', nextSceneId: 'scene-s5a-result', xpBonus: 10, feedback: 'Looking forward.' },
    { id: 'choice-s5a-4', text: '"This was overwhelming."', nextSceneId: 'scene-s5a-result', xpBonus: 5, feedback: 'Growth often is.' },
  ],
};

const sceneS5aResult: Scene = {
  id: 'scene-s5a-result',
  backgroundId: 'restaurant',
  dialog: [{ text: 'Every pattern you recognized, every boundary you set, every manipulation you avoided - it all adds up.' }],
  nextSceneId: 'scene-s5b-mastery',
};

const sceneS5b: Scene = {
  id: 'scene-s5b-mastery',
  backgroundId: 'restaurant',
  dialog: [
    { text: 'The final lesson: true strength isn\'t about control. It\'s about awareness.' },
    { text: 'You can\'t be manipulated when you see the patterns.' },
    { speakerId: 'inner-voice', text: 'What will you do with this knowledge?', emotion: 'neutral' },
  ],
  choices: [
    { id: 'choice-s5b-1', text: 'Use it to protect myself', nextSceneId: 'scene-s5b-result', isOptimal: true, xpBonus: 30, feedback: 'OPTIMAL: Self-protection is wisdom.' },
    { id: 'choice-s5b-2', text: 'Use it to help others recognize danger', nextSceneId: 'scene-s5b-result', xpBonus: 25, feedback: 'Noble. Protecting your community.' },
    { id: 'choice-s5b-3', text: 'Keep observing and learning', nextSceneId: 'scene-s5b-result', xpBonus: 20, feedback: 'Growth never ends.' },
    { id: 'choice-s5b-4', text: 'Walk away from these situations entirely', nextSceneId: 'scene-s5b-result', xpBonus: 15, feedback: 'Valid. Sometimes avoidance is protection.' },
  ],
};

const sceneS5bResult: Scene = {
  id: 'scene-s5b-result',
  backgroundId: 'restaurant',
  dialog: [{ text: 'You\'ve reached a level of awareness few achieve. The patterns are clear now.' }],
  nextSceneId: 'scene-s5c-mastery',
};

const sceneS5c: Scene = {
  id: 'scene-s5c-mastery',
  backgroundId: 'restaurant',
  dialog: [
    { text: 'The journey is complete. You see what you couldn\'t before.' },
    { speakerId: 'inner-voice', text: 'What did you become?', emotion: 'knowing' },
  ],
  choices: [
    { id: 'choice-s5c-1', text: '"Someone who can\'t be fooled."', nextSceneId: 'scene-s5c-ultimate', isOptimal: true, xpBonus: 50, feedback: 'OPTIMAL: Pattern awareness complete.' },
    { id: 'choice-s5c-2', text: '"A better judge of character."', nextSceneId: 'scene-s5c-ultimate', xpBonus: 30, feedback: 'Practical wisdom.' },
    { id: 'choice-s5c-3', text: '"Still learning."', nextSceneId: 'scene-s5c-ultimate', xpBonus: 20, feedback: 'Humble. Growth mindset.' },
    { id: 'choice-s5c-4', text: '"Someone who understands people."', nextSceneId: 'scene-s5c-ultimate', xpBonus: 25, feedback: 'Empathy with awareness.' },
  ],
};

const sceneS5cUltimate: Scene = {
  id: 'scene-s5c-ultimate',
  backgroundId: 'restaurant',
  dialog: [{ text: 'You started as someone learning to recognize patterns. Now you see them instantly. Red flags, manipulation tactics, genuine vs. performative behavior - you read it all.' }],
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'PATTERN MASTERY - ULTIMATE ENDING',
  endingSummary: 'You\'ve achieved complete pattern awareness. You can recognize manipulation, set boundaries, and protect yourself from harmful dynamics. You started with awareness. You ended with mastery. +100 Awareness. ULTIMATE ACHIEVEMENT.',
};

export const secretScenes: Scene[] = [sceneS5a, sceneS5aResult, sceneS5b, sceneS5bResult, sceneS5c, sceneS5cUltimate];

export const secretScenario: DatingScenario = {
  id: MISSION_ID,
  levelId: 'private-island',
  missionNumber: 25,
  title: 'Pattern Mastery',
  tagline: 'The ultimate awareness.',
  description: 'Achieve complete pattern recognition and awareness.',
  objective: 'Achieve complete pattern recognition and awareness.',
  tier: 'vip',
  estimatedMinutes: 15,
  difficulty: 'advanced',
  characters,
  scenes: secretScenes,
  rewards,
  startSceneId: 'scene-s5a-revelation',
  isSecret: true,
  secretUnlockCondition: 'OPTIMAL at Mission 24 Scenes 24B + 24C',
};

export default secretScenario;
