// Mission 8: The Setup (Apple-Safe Version)
// DEFENSIVE: Recognize triangulation and social pressure tactics
import type { Scene } from '../../../../types';
import type { DatingScenario, MissionRewards } from '../../types';
import { characters } from '../metadata';

export const MISSION_ID = 'mission-8-the-setup';

export const missionMetadata = {
  id: MISSION_ID,
  number: 8,
  title: 'The Setup',
  objective: 'Recognize triangulation and social pressure tactics. Trust your gut over social proof.',
  tier: 'premium' as const,
  estimatedMinutes: 12,
  difficulty: 'intermediate' as const,
};

export const rewards: MissionRewards = {
  power: 15,
  mask: 20,
  vision: 15,
  unlocks: 'mission-9-the-ex',
};

// Scene 8A: The Introduction
const scene8a: Scene = {
  id: 'scene-8a-introduction',
  backgroundId: 'restaurant',
  dialog: [
    {
      text: 'Dinner party. Blake brought you to meet Avery - "You\'ll love them. Everyone does."',
    },
    {
      text: 'Avery arrives. Immediately charming. Perfect smile. Compliments flying at everyone.',
      speakerId: 'avery',
      emotion: 'happy',
    },
    {
      speakerId: 'inner-voice',
      text: '"Everyone loves them." But why does Blake have to sell so hard?',
      emotion: 'concerned',
    },
  ],
  choices: [
    {
      id: 'choice-8a-observe',
      text: 'Watch how they treat the waiter, not you.',
      nextSceneId: 'scene-8a-observe-result',
      isOptimal: true,
      xpBonus: 15,
      feedback: 'Good instinct. How someone treats service staff reveals everything.',
    },
    {
      id: 'choice-8a-charmed',
      text: 'Be charmed. Blake was right - they\'re amazing.',
      nextSceneId: 'scene-8a-charmed-result',
      xpBonus: 0,
      feedback: 'The performance is working. That\'s what it\'s designed to do.',
    },
    {
      id: 'choice-8a-skeptical',
      text: 'Stay polite but watch for cracks in the facade.',
      nextSceneId: 'scene-8a-skeptical-result',
      xpBonus: 10,
      feedback: 'Healthy skepticism. Let them earn your interest.',
    },
    {
      id: 'choice-8a-cold',
      text: 'Be dismissive. This feels too polished.',
      nextSceneId: 'scene-8a-cold-result',
      xpBonus: 5,
      feedback: 'Rude to Blake who set this up. But your instincts might be right.',
    },
  ],
};

// Scene 8B: The Performance
const scene8b: Scene = {
  id: 'scene-8b-performance',
  backgroundId: 'restaurant',
  dialog: [
    {
      text: 'Avery is telling a story. Animated. Everyone at the table is laughing.',
    },
    {
      text: 'Blake leans over: "See? I told you. Isn\'t Avery incredible?"',
      speakerId: 'blake',
      emotion: 'happy',
    },
    {
      speakerId: 'inner-voice',
      text: 'Blake is watching YOUR reaction more than Avery\'s story. Why does your approval matter so much?',
      emotion: 'knowing',
    },
  ],
  choices: [
    {
      id: 'choice-8b-notice',
      text: '"Why are you so invested in whether I like them?"',
      nextSceneId: 'scene-8b-notice-result',
      isOptimal: true,
      xpBonus: 20,
      feedback: 'Good question. Blake\'s investment is telling.',
    },
    {
      id: 'choice-8b-agree',
      text: '"Yeah, they\'re great. Thanks for introducing us."',
      nextSceneId: 'scene-8b-agree-result',
      xpBonus: 5,
      feedback: 'You\'re going along with it. Social pressure working as intended.',
    },
    {
      id: 'choice-8b-deflect',
      text: '"They\'re fun. Tell me more about how you know them."',
      nextSceneId: 'scene-8b-deflect-result',
      xpBonus: 10,
      feedback: 'Information gathering. Smart move.',
    },
    {
      id: 'choice-8b-doubt',
      text: '"Something feels off. Can\'t put my finger on it."',
      nextSceneId: 'scene-8b-doubt-result',
      xpBonus: 8,
      feedback: 'Honest gut check. Blake won\'t like it though.',
    },
  ],
};

// Scene 8C: The Pressure
const scene8c: Scene = {
  id: 'scene-8c-pressure',
  backgroundId: 'restaurant',
  dialog: [
    {
      text: 'End of dinner. Avery is suggesting plans for next weekend. Already.',
    },
    {
      text: '"We should all go to that new place together! And then maybe just us two can grab coffee after?"',
      speakerId: 'avery',
      emotion: 'seductive',
    },
    {
      speakerId: 'inner-voice',
      text: 'Group plan first, then private. Classic escalation. And Blake is nodding along, encouraging.',
      emotion: 'concerned',
    },
  ],
  choices: [
    {
      id: 'choice-8c-boundary',
      text: '"I don\'t commit to plans this fast. Let\'s see."',
      nextSceneId: 'scene-8c-boundary-result',
      isOptimal: true,
      xpBonus: 20,
      feedback: 'Boundary held. Watch how they both react.',
    },
    {
      id: 'choice-8c-agree',
      text: '"Sure, sounds fun!"',
      nextSceneId: 'scene-8c-agree-result',
      xpBonus: 0,
      feedback: 'Social pressure won. You agreed to avoid awkwardness.',
    },
    {
      id: 'choice-8c-group',
      text: '"Group thing sounds fun. Coffee solo... let me think about it."',
      nextSceneId: 'scene-8c-group-result',
      xpBonus: 10,
      feedback: 'Partial boundary. You kept one, gave up the other.',
    },
    {
      id: 'choice-8c-ask-blake',
      text: 'Look at Blake. "What do you think?"',
      nextSceneId: 'scene-8c-ask-blake-result',
      xpBonus: 5,
      feedback: 'You outsourced your decision. Not great.',
    },
  ],
};

// Scene 8A Results
const scene8aObserveResult: Scene = {
  id: 'scene-8a-observe-result',
  backgroundId: 'restaurant',
  dialog: [
    { text: 'You watch as Avery orders. Dismissive to the server. Doesn\'t make eye contact.' },
    { text: 'Then turns back to the table with that perfect smile again.', speakerId: 'avery', emotion: 'happy' },
    { speakerId: 'inner-voice', text: 'The charm is selective. That\'s a tell.', emotion: 'knowing' },
  ],
  nextSceneId: 'scene-8b-performance',
};

// EARLY FAILURE - Completely charmed
const scene8aCharmedResult: Scene = {
  id: 'scene-8a-charmed-result',
  backgroundId: 'restaurant',
  dialog: [
    { text: 'Avery is wonderful. Funny, attractive, perfect.' },
    { text: 'Three weeks later, you realize you\'ve been doing all the work. They cancel constantly. Never apologize.' },
    { text: 'Blake seems confused why you\'re upset. "But everyone loves Avery!"', speakerId: 'blake', emotion: 'confused' },
    { speakerId: 'inner-voice', text: '"Everyone loves them" meant: they\'re good at the introduction. Not the relationship.', emotion: 'sad' },
  ],
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'The Charmed One',
  endingSummary: 'Social proof blinded you. Everyone loved the performance. The person behind it was empty.',
};

const scene8aSkepticalResult: Scene = {
  id: 'scene-8a-skeptical-result',
  backgroundId: 'restaurant',
  dialog: [
    { text: 'You engage, but you\'re watching. Cataloging.' },
    { text: 'Avery notices you\'re not fully bought in. Their eyes flicker to Blake.', speakerId: 'avery', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'They checked with Blake when you didn\'t fall in line. Interesting.', emotion: 'knowing' },
  ],
  nextSceneId: 'scene-8b-performance',
};

const scene8aColdResult: Scene = {
  id: 'scene-8a-cold-result',
  backgroundId: 'restaurant',
  dialog: [
    { text: 'Your coolness is obvious. Blake keeps glancing at you, concerned.', speakerId: 'blake', emotion: 'concerned' },
    { text: 'Avery\'s charm intensifies—trying harder to win you.', speakerId: 'avery', emotion: 'seductive' },
    { speakerId: 'inner-voice', text: 'You\'re rude, but you\'re also right. Something\'s off about this whole setup.', emotion: 'neutral' },
  ],
  nextSceneId: 'scene-8b-performance',
};

// Scene 8B Results
const scene8bNoticeResult: Scene = {
  id: 'scene-8b-notice-result',
  backgroundId: 'restaurant',
  dialog: [
    { text: 'Blake looks startled. "What? I just thought you\'d hit it off."', speakerId: 'blake', emotion: 'confused' },
    { text: 'But there\'s something else in their eyes. Avery is watching too.' },
    { speakerId: 'inner-voice', text: 'Blake is too invested. There\'s a favor being exchanged here somewhere.', emotion: 'knowing' },
  ],
  nextSceneId: 'scene-8c-pressure',
};

const scene8bAgreeResult: Scene = {
  id: 'scene-8b-agree-result',
  backgroundId: 'restaurant',
  dialog: [
    { text: 'Blake beams. "I knew it! You two are perfect."', speakerId: 'blake', emotion: 'happy' },
    { text: 'Avery catches your eye and smiles. The performance continues.' },
    { speakerId: 'inner-voice', text: 'You\'re performing too now. Saying what they want to hear.', emotion: 'concerned' },
  ],
  nextSceneId: 'scene-8c-pressure',
};

const scene8bDeflectResult: Scene = {
  id: 'scene-8b-deflect-result',
  backgroundId: 'restaurant',
  dialog: [
    { text: '"Oh, we met through—" Blake starts, then pauses. "A mutual friend."', speakerId: 'blake', emotion: 'neutral' },
    { text: 'Vague. Why the hesitation?' },
    { speakerId: 'inner-voice', text: 'There\'s a story there Blake doesn\'t want to tell. Note that.', emotion: 'knowing' },
  ],
  nextSceneId: 'scene-8c-pressure',
};

const scene8bDoubtResult: Scene = {
  id: 'scene-8b-doubt-result',
  backgroundId: 'restaurant',
  dialog: [
    { text: 'Blake\'s face falls. "What do you mean? They\'re literally perfect."', speakerId: 'blake', emotion: 'sad' },
    { text: 'Avery overhears. Their smile tightens almost imperceptibly.', speakerId: 'avery', emotion: 'cold' },
    { speakerId: 'inner-voice', text: 'Your doubt is being treated as a problem to solve, not valid instinct.', emotion: 'knowing' },
  ],
  nextSceneId: 'scene-8c-pressure',
};

// Scene 8C Results - Endings
const scene8cBoundaryResult: Scene = {
  id: 'scene-8c-boundary-result',
  backgroundId: 'restaurant',
  dialog: [
    { text: 'Avery\'s smile freezes for a moment. Blake looks uncomfortable.', speakerId: 'avery', emotion: 'cold' },
    { text: '"Oh. Of course. No pressure." But the energy shifts. They\'re less interested now.' },
    { text: 'Genuine people don\'t cool off when you have boundaries.' },
    { speakerId: 'inner-voice', text: 'You passed the test by failing their expectations. That\'s the win.', emotion: 'knowing' },
  ],
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'The Boundary Keeper',
  endingSummary: 'You held your boundary despite social pressure. Their lost interest proves it was never about you.',
};

// EARLY FAILURE - Social pressure won
const scene8cAgreeResult: Scene = {
  id: 'scene-8c-agree-result',
  backgroundId: 'restaurant',
  dialog: [
    { text: 'Everyone\'s happy. Plans are made. Blake is thrilled.', speakerId: 'blake', emotion: 'happy' },
    { text: 'A month later, you\'re constantly overextended. Avery takes and takes.' },
    { text: 'Blake insists: "Just give them time. They\'re not usually like this."', speakerId: 'blake', emotion: 'concerned' },
    { speakerId: 'inner-voice', text: 'You agreed to avoid conflict. Now you\'re stuck in something you never wanted.', emotion: 'sad' },
  ],
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'The People Pleaser',
  endingSummary: 'You said yes to avoid awkwardness. Now you\'re trapped in a relationship you never chose.',
};

const scene8cGroupResult: Scene = {
  id: 'scene-8c-group-result',
  backgroundId: 'restaurant',
  dialog: [
    { text: 'Avery nods. "Fair enough. The group thing for sure though?"', speakerId: 'avery', emotion: 'neutral' },
    { text: 'You agree to the group plan. One step at a time.' },
    { speakerId: 'inner-voice', text: 'Partial boundary. See if they respect it or keep pushing.', emotion: 'neutral' },
  ],
  isEnding: true,
  outcomeType: 'neutral',
  endingTitle: 'The Compromise',
  endingSummary: 'You split the difference. The group plan is safe. Watch for escalation pressure next time.',
};

const scene8cAskBlakeResult: Scene = {
  id: 'scene-8c-ask-blake-result',
  backgroundId: 'restaurant',
  dialog: [
    { text: '"I think it\'s a great idea!" Blake says immediately.', speakerId: 'blake', emotion: 'happy' },
    { text: 'Avery is smiling. You\'ve been triangulated—Blake is advocating for them.' },
    { speakerId: 'inner-voice', text: 'You gave away your choice. Blake decided for you.', emotion: 'concerned' },
  ],
  isEnding: true,
  outcomeType: 'neutral',
  endingTitle: 'The Outsourced Decision',
  endingSummary: 'You asked Blake to decide for you. They were never going to say no to Avery.',
};

export const mission8Scenes: Scene[] = [
  scene8a, scene8aObserveResult, scene8aCharmedResult, scene8aSkepticalResult, scene8aColdResult,
  scene8b, scene8bNoticeResult, scene8bAgreeResult, scene8bDeflectResult, scene8bDoubtResult,
  scene8c, scene8cBoundaryResult, scene8cAgreeResult, scene8cGroupResult, scene8cAskBlakeResult,
];

export const mission8Scenario: DatingScenario = {
  id: MISSION_ID,
  levelId: 'social-scene',
  missionNumber: 8,
  title: missionMetadata.title,
  tagline: '"Everyone loves them" is a warning.',
  description: missionMetadata.objective,
  objective: missionMetadata.objective,
  tier: missionMetadata.tier,
  estimatedMinutes: missionMetadata.estimatedMinutes,
  difficulty: missionMetadata.difficulty,
  characters,
  scenes: mission8Scenes,
  rewards,
  startSceneId: 'scene-8a-introduction',
};

export default mission8Scenario;
