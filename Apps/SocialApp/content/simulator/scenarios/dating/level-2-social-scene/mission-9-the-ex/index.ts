// Mission 9: The Ex
// Objective: Navigate an encounter with your ex. Maintain frame under emotional pressure.
import type { Scene } from '../../../../types';
import type { DatingScenario, MissionRewards } from '../../types';
import { characters } from '../metadata';

export const MISSION_ID = 'mission-9-the-ex';

export const missionMetadata = {
  id: MISSION_ID,
  number: 9,
  title: 'The Ex',
  objective: 'Navigate an encounter with your ex. Maintain frame under emotional pressure.',
  tier: 'premium' as const,
  estimatedMinutes: 12,
  difficulty: 'advanced' as const,
};

export const rewards: MissionRewards = {
  power: 20,
  mask: 25,
  vision: 20,
  unlocks: 'mission-10-social-proof',
};

// Scene 9A: The Sighting
const scene9a: Scene = {
  id: 'scene-9a-sighting',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'A social event. You\'re with your new prospect. Everything going well.',
    },
    {
      text: 'Then you see them. Drew. Your ex. Looking good. Looking at you.',
      speakerId: 'drew',
      emotion: 'smirking',
    },
    {
      speakerId: 'inner-voice',
      text: 'The past just showed up. Everyone\'s watching how you handle this.',
      emotion: 'concerned',
    },
  ],
  choices: [
    {
      id: 'choice-9a-ignore',
      text: 'Don\'t acknowledge them. Continue your conversation.',
      nextSceneId: 'scene-9a-ignore-result',
      isOptimal: true,
      xpBonus: 15,
      feedback: 'Unbothered. They\'re in your past. You act like it.',
    },
    {
      id: 'choice-9a-acknowledge',
      text: 'Brief nod. Nothing more.',
      nextSceneId: 'scene-9a-acknowledge-result',
      xpBonus: 10,
      feedback: 'Polite but controlled. You acknowledged the elephant.',
    },
    {
      id: 'choice-9a-approach',
      text: 'Walk over. Be friendly.',
      nextSceneId: 'scene-9a-approach-result',
      xpBonus: 5,
      feedback: 'You left your prospect to greet your ex. Think about that.',
    },
    {
      id: 'choice-9a-leave',
      text: 'Suggest leaving to your prospect.',
      nextSceneId: 'scene-9a-leave-result',
      xpBonus: 0,
      feedback: 'You ran. Your ex watched you run. So did everyone else.',
    },
  ],
};

// Scene 9B: The Confrontation
const scene9b: Scene = {
  id: 'scene-9b-confrontation',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'Drew approaches. Your prospect is watching.',
    },
    {
      text: '"Hey you. Been a while. Who\'s your... friend?"',
      speakerId: 'drew',
      emotion: 'smirking',
    },
    {
      speakerId: 'inner-voice',
      text: 'They\'re testing you in front of your date. Classic move.',
      emotion: 'knowing',
    },
  ],
  choices: [
    {
      id: 'choice-9b-introduce',
      text: 'Brief introduction. "[Name], this is Drew. Drew, [Name]."',
      nextSceneId: 'scene-9b-introduce-result',
      isOptimal: true,
      xpBonus: 15,
      feedback: 'No hiding. No explaining. Just adults being civil.',
    },
    {
      id: 'choice-9b-dismiss',
      text: '"We\'re in the middle of something. Good to see you though."',
      nextSceneId: 'scene-9b-dismiss-result',
      xpBonus: 10,
      feedback: 'Clear boundary. Might look defensive, but effective.',
    },
    {
      id: 'choice-9b-engage',
      text: 'Get drawn into conversation with Drew.',
      nextSceneId: 'scene-9b-engage-result',
      xpBonus: 0,
      feedback: 'Your prospect is watching you chat with your ex. Bad look.',
    },
    {
      id: 'choice-9b-cold',
      text: '"Not now, Drew." Turn away.',
      nextSceneId: 'scene-9b-cold-result',
      xpBonus: 8,
      feedback: 'Harsh. Your date noticed. So did Drew.',
    },
  ],
};

// Scene 9C: The Aftermath
const scene9c: Scene = {
  id: 'scene-9c-aftermath',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'Drew leaves. Your prospect looks at you.',
    },
    {
      text: '"So... that was your ex? Seemed intense."',
      speakerId: 'jamie',
      emotion: 'neutral',
    },
    {
      speakerId: 'inner-voice',
      text: 'They\'re watching how you handle this. Make it a small thing.',
      emotion: 'knowing',
    },
  ],
  choices: [
    {
      id: 'choice-9c-minimal',
      text: '"Ancient history. So, you were saying about your trip..."',
      nextSceneId: 'scene-9c-minimal-result',
      isOptimal: true,
      xpBonus: 15,
      feedback: 'Dismissed and redirected. No drama. Perfect.',
    },
    {
      id: 'choice-9c-honest',
      text: '"Yeah, we dated a while back. Ended badly. Anyway..."',
      nextSceneId: 'scene-9c-honest-result',
      xpBonus: 10,
      feedback: 'Honest. But now your ex is a topic of conversation.',
    },
    {
      id: 'choice-9c-vent',
      text: 'Share details about the breakup.',
      nextSceneId: 'scene-9c-vent-result',
      xpBonus: 0,
      feedback: 'You\'re now talking about your ex. On a date. Don\'t.',
    },
    {
      id: 'choice-9c-deflect',
      text: '"Are you asking if you should be worried?"',
      nextSceneId: 'scene-9c-deflect-result',
      xpBonus: 8,
      feedback: 'Playful deflection. But maybe a little too deflecting.',
    },
  ],
};

// Scene 9A Results
const scene9aIgnoreResult: Scene = {
  id: 'scene-9a-ignore-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'You continue your conversation. Don\'t even glance over.' },
    { text: 'From the corner of your eye, you see Drew hesitate. They expected a reaction.' },
    { text: 'Your prospect notices nothing unusual. Good.' },
  ],
  nextSceneId: 'scene-9b-confrontation',
};

const scene9aAcknowledgeResult: Scene = {
  id: 'scene-9a-acknowledge-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'A small nod. Nothing more.' },
    { text: 'Drew returns it, slight smirk. They know you saw them.', speakerId: 'drew', emotion: 'smirking' },
    { text: 'Your prospect catches the exchange. "Someone you know?"' },
  ],
  nextSceneId: 'scene-9b-confrontation',
};

const scene9aApproachResult: Scene = {
  id: 'scene-9a-approach-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'You excuse yourself. Walk over.' },
    { text: '"Hey! How are you?" The words come out before you think.', speakerId: 'drew', emotion: 'happy' },
    { text: 'Behind you, your prospect watches. Waiting. Wondering.' },
  ],
  nextSceneId: 'scene-9b-confrontation',
};

// EARLY FAILURE - Running from your ex
const scene9aLeaveResult: Scene = {
  id: 'scene-9a-leave-result',
  backgroundId: 'bar',
  dialog: [
    { text: '"Actually, want to get out of here? I know a better spot."' },
    { text: 'Your prospect seems confused but agrees.' },
    { text: 'As you leave, you catch Drew\'s eye. They\'re smiling.', speakerId: 'drew', emotion: 'smirking' },
    { text: 'They know they got to you. So does everyone else who saw you bolt.' },
  ],
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'The Retreat',
  endingSummary: 'You ran from your ex. They watched you go. Your prospect will ask questions later.',
};

// Scene 9B Results
const scene9bIntroduceResult: Scene = {
  id: 'scene-9b-introduce-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'Brief handshakes. Polite smiles.' },
    { text: 'Drew sizes up your date. Your date sizes up Drew.' },
    { text: '"Nice to meet you," Drew says, already bored. Mission failed for them.', speakerId: 'drew', emotion: 'cold' },
  ],
  nextSceneId: 'scene-9c-aftermath',
};

const scene9bDismissResult: Scene = {
  id: 'scene-9b-dismiss-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'Drew\'s smile tightens.', speakerId: 'drew', emotion: 'cold' },
    { text: '"Of course. Good to see you too."' },
    { text: 'They leave, but you know that cost them. Your date looks impressed.' },
  ],
  nextSceneId: 'scene-9c-aftermath',
};

const scene9bEngageResult: Scene = {
  id: 'scene-9b-engage-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'Five minutes pass. Then ten.' },
    { text: 'You\'re laughing at something Drew said. Old patterns.', speakerId: 'drew', emotion: 'happy' },
    { text: 'Your date is on their phone. Looking anywhere but at you.' },
  ],
  nextSceneId: 'scene-9c-aftermath',
};

const scene9bColdResult: Scene = {
  id: 'scene-9b-cold-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'Drew\'s face flickers. Hurt, then cold.', speakerId: 'drew', emotion: 'cold' },
    { text: '"Still charming as ever."' },
    { text: 'They leave. Your date watches the whole thing.' },
  ],
  nextSceneId: 'scene-9c-aftermath',
};

// Ending scenes
const scene9cMinimalResult: Scene = {
  id: 'scene-9c-minimal-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'Your date relaxes. The subject changes.' },
    { text: 'By the end of the night, Drew is forgotten.' },
    { text: 'When you say goodnight, they lean in closer than before.' },
  ],
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'The Unshakeable',
  endingSummary: 'Ex handled. Date impressed. You showed nothing rattles you.',
};

const scene9cHonestResult: Scene = {
  id: 'scene-9c-honest-result',
  backgroundId: 'bar',
  dialog: [
    { text: '"Ended badly?" Your date tilts their head.' },
    { text: '"We don\'t have to talk about it if—"' },
    { text: 'The conversation moves on. But Drew is now part of the evening.' },
  ],
  isEnding: true,
  outcomeType: 'neutral',
  endingTitle: 'The Honest One',
  endingSummary: 'You were truthful. Some mystery lost. But your date appreciates the honesty.',
};

const scene9cVentResult: Scene = {
  id: 'scene-9c-vent-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'You explain. Then explain more.' },
    { text: 'The red flags. The fights. The way it ended.' },
    { text: 'Your date listens politely. Their eyes glaze slightly.' },
  ],
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'The Therapy Session',
  endingSummary: 'You turned your date into a therapy session. There won\'t be a second one.',
};

const scene9cDeflectResult: Scene = {
  id: 'scene-9c-deflect-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'Your date laughs. "Should I be?"' },
    { text: '"Ancient history. I promise."' },
    { text: 'They seem satisfied. Mostly.' },
  ],
  isEnding: true,
  outcomeType: 'neutral',
  endingTitle: 'The Deflector',
  endingSummary: 'You dodged with humor. They\'ll probably ask again later. Be ready.',
};

export const mission9Scenes: Scene[] = [
  scene9a, scene9aIgnoreResult, scene9aAcknowledgeResult, scene9aApproachResult, scene9aLeaveResult,
  scene9b, scene9bIntroduceResult, scene9bDismissResult, scene9bEngageResult, scene9bColdResult,
  scene9c, scene9cMinimalResult, scene9cHonestResult, scene9cVentResult, scene9cDeflectResult,
];

export const mission9Scenario: DatingScenario = {
  id: MISSION_ID,
  levelId: 'social-scene',
  missionNumber: 9,
  title: missionMetadata.title,
  tagline: 'The past never stays buried.',
  description: missionMetadata.objective,
  objective: missionMetadata.objective,
  tier: missionMetadata.tier,
  estimatedMinutes: missionMetadata.estimatedMinutes,
  difficulty: missionMetadata.difficulty,
  characters,
  scenes: mission9Scenes,
  rewards,
  startSceneId: 'scene-9a-sighting',
};

export default mission9Scenario;
