// Mission 10: Social Proof (Apple-Safe Version)
// DEFENSIVE: Recognize when YOU are being targeted by preselection tactics
import type { Scene } from '../../../../types';
import type { DatingScenario, MissionRewards } from '../../types';
import { characters } from '../metadata';

export const MISSION_ID = 'mission-10-social-proof';

export const missionMetadata = {
  id: MISSION_ID,
  number: 10,
  title: 'Social Proof',
  objective: 'Recognize preselection tactics. See through manufactured scarcity and competition.',
  tier: 'premium' as const,
  estimatedMinutes: 15,
  difficulty: 'advanced' as const,
};

export const rewards: MissionRewards = {
  power: 25,
  mask: 30,
  vision: 25,
  unlocks: 'level-3-gala',
};

// Scene 10A: The Event
const scene10a: Scene = {
  id: 'scene-10a-event',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'High-end networking event. Skyler is here. The one everyone wants.',
    },
    {
      text: 'They\'re working the room. Touching arms. Laughing. A different person every few minutes.',
      speakerId: 'skyler',
      emotion: 'seductive',
    },
    {
      speakerId: 'inner-voice',
      text: 'Watch the pattern. They\'re not connecting—they\'re creating demand. Everyone sees everyone else wanting them.',
      emotion: 'knowing',
    },
  ],
  choices: [
    {
      id: 'choice-10a-observe',
      text: 'Watch their pattern. Learn how the game works.',
      nextSceneId: 'scene-10a-observe-result',
      isOptimal: true,
      xpBonus: 15,
      feedback: 'Good. Study the technique before you become a target.',
    },
    {
      id: 'choice-10a-compete',
      text: 'Feel the pull. Want to be the one they choose.',
      nextSceneId: 'scene-10a-compete-result',
      xpBonus: 0,
      feedback: 'The scarcity is working. You want what everyone else wants.',
    },
    {
      id: 'choice-10a-ignore',
      text: 'Focus on other conversations. Not interested in games.',
      nextSceneId: 'scene-10a-ignore-result',
      xpBonus: 10,
      feedback: 'Smart. But they might pivot to you now. Watch for it.',
    },
    {
      id: 'choice-10a-approach',
      text: 'Walk over and introduce yourself.',
      nextSceneId: 'scene-10a-approach-result',
      xpBonus: 5,
      feedback: 'You became contestant twelve. Just like everyone else.',
    },
  ],
};

// Scene 10B: The Pivot (KEY SCENE FOR SECRET UNLOCK)
const scene10b: Scene = {
  id: 'scene-10b-pivot',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'Skyler notices you haven\'t approached. They start walking toward you.',
    },
    {
      text: '"You\'re the only person who hasn\'t tried to talk to me tonight. That\'s... interesting."',
      speakerId: 'skyler',
      emotion: 'curious',
    },
    {
      speakerId: 'inner-voice',
      text: 'There it is. The pivot. When the game doesn\'t work, they flip the script. Now YOU\'RE the challenge.',
      emotion: 'knowing',
    },
  ],
  choices: [
    {
      id: 'choice-10b-recognize',
      text: '"You noticed who didn\'t approach. That\'s a tell."',
      nextSceneId: 'scene-10b-recognize-result',
      isOptimal: true,
      xpBonus: 20,
      feedback: 'You called out the pattern. Their mask flickered.',
      tactic: 'preselection',
    },
    {
      id: 'choice-10b-flattered',
      text: '"I was hoping you\'d notice." Smile back.',
      nextSceneId: 'scene-10b-flattered-result',
      xpBonus: 5,
      feedback: 'You took the bait. Now they know their pivot worked.',
    },
    {
      id: 'choice-10b-honest',
      text: '"I was busy having real conversations."',
      nextSceneId: 'scene-10b-honest-result',
      xpBonus: 15,
      feedback: 'Boundary without hostility. Let\'s see how they handle it.',
    },
    {
      id: 'choice-10b-eager',
      text: '"I didn\'t think I had a chance. Everyone wants to talk to you."',
      nextSceneId: 'scene-10b-eager-result',
      xpBonus: 0,
      feedback: 'You fed their ego and confirmed their game works.',
    },
  ],
};

// Scene 10C: The Close (KEY SCENE FOR SECRET UNLOCK)
const scene10c: Scene = {
  id: 'scene-10c-close',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'The conversation continues. Skyler is intrigued by your resistance.',
    },
    {
      text: '"This is the most interesting conversation I\'ve had tonight. What are you doing after this?"',
      speakerId: 'skyler',
      emotion: 'seductive',
    },
    {
      speakerId: 'inner-voice',
      text: 'The close. After working the whole room, they\'re offering you the "special" spot. Is it special? Or are you just the last attempt?',
      emotion: 'concerned',
    },
  ],
  choices: [
    {
      id: 'choice-10c-question',
      text: '"How many people have you said that to tonight?"',
      nextSceneId: 'scene-10c-question-result',
      isOptimal: true,
      xpBonus: 25,
      feedback: 'Direct hit. They weren\'t expecting you to question the special treatment.',
      tactic: 'scarcity',
    },
    {
      id: 'choice-10c-accept',
      text: '"Nothing concrete. What did you have in mind?"',
      nextSceneId: 'scene-10c-accept-result',
      xpBonus: 10,
      feedback: 'You\'re interested. But are you interested in them, or the validation?',
    },
    {
      id: 'choice-10c-decline',
      text: '"I have plans. But it was nice meeting you."',
      nextSceneId: 'scene-10c-decline-result',
      xpBonus: 15,
      feedback: 'You walked away from the "prize." That takes clarity.',
    },
    {
      id: 'choice-10c-eager',
      text: '"I\'m free! Whatever you want to do."',
      nextSceneId: 'scene-10c-eager-result',
      xpBonus: 0,
      feedback: 'All your resistance collapsed. They know they won.',
    },
  ],
};

// Scene 10A Results
const scene10aObserveResult: Scene = {
  id: 'scene-10a-observe-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'You watch Skyler work. Touch this arm. Laugh at that joke. Move on before interest peaks.' },
    { text: 'They never stay long enough to be known. Just long enough to be wanted.' },
    { speakerId: 'inner-voice', text: 'Manufacturing scarcity. Everyone gets a sample, nobody gets the meal.', emotion: 'knowing' },
  ],
  nextSceneId: 'scene-10b-pivot',
};

// EARLY FAILURE - Caught in competition
const scene10aCompeteResult: Scene = {
  id: 'scene-10a-compete-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'You find yourself tracking Skyler\'s movement. Waiting for your moment.' },
    { text: 'When they finally glance your way, your heart jumps. They smile and look away.' },
    { text: 'You spent the whole night in their orbit. They barely remember your name.' },
    { speakerId: 'inner-voice', text: 'Manufactured scarcity works. You competed for someone you don\'t even know.', emotion: 'sad' },
  ],
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'The Competitor',
  endingSummary: 'You fell for the scarcity game. Spent all night wanting what everyone else wanted. They never saw you.',
};

const scene10aIgnoreResult: Scene = {
  id: 'scene-10a-ignore-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'You talk to other people. Real conversations. Actually learning names.' },
    { text: 'From the corner of your eye, you notice Skyler glancing your way.', speakerId: 'skyler', emotion: 'curious' },
    { speakerId: 'inner-voice', text: 'You didn\'t play the game. Now you\'re the interesting one.', emotion: 'knowing' },
  ],
  nextSceneId: 'scene-10b-pivot',
};

const scene10aApproachResult: Scene = {
  id: 'scene-10a-approach-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'You walk over. Introduce yourself. Skyler smiles politely.' },
    { text: '"Nice to meet you. I was just heading to talk to—" They\'re already looking past you.', speakerId: 'skyler', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'One of many. You approached. They didn\'t have to work for it.', emotion: 'concerned' },
  ],
  nextSceneId: 'scene-10b-pivot',
};

// Scene 10B Results
const scene10bRecognizeResult: Scene = {
  id: 'scene-10b-recognize-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'Skyler\'s smile freezes for a microsecond. Then resets.', speakerId: 'skyler', emotion: 'cold' },
    { text: '"Wow. Observant. Most people don\'t... see that."' },
    { text: 'Their interest sharpens. But it\'s different now. Calculating.' },
    { speakerId: 'inner-voice', text: 'You called out the game. They\'re recalibrating. You\'re either a threat or a challenge now.', emotion: 'knowing' },
  ],
  nextSceneId: 'scene-10c-close',
};

const scene10bFlatteredResult: Scene = {
  id: 'scene-10b-flattered-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'Skyler\'s eyes light up. Got one.', speakerId: 'skyler', emotion: 'seductive' },
    { text: '"Playing hard to get? I like that."' },
    { speakerId: 'inner-voice', text: 'You weren\'t playing hard to get. But now you\'re playing their game.', emotion: 'concerned' },
  ],
  nextSceneId: 'scene-10c-close',
};

const scene10bHonestResult: Scene = {
  id: 'scene-10b-honest-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'Skyler tilts their head. Processing.', speakerId: 'skyler', emotion: 'curious' },
    { text: '"Real conversations? At a networking event? How novel."' },
    { text: 'Sarcasm, but they didn\'t leave. You have their attention.' },
    { speakerId: 'inner-voice', text: 'Boundary held. Now they have to decide if you\'re worth real effort.', emotion: 'neutral' },
  ],
  nextSceneId: 'scene-10c-close',
};

// EARLY FAILURE - Fed the ego
const scene10bEagerResult: Scene = {
  id: 'scene-10b-eager-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'Skyler laughs. Warm but not quite reaching their eyes.', speakerId: 'skyler', emotion: 'smirking' },
    { text: '"That\'s sweet. You seem nice."' },
    { text: 'They chat for three minutes. Then excuse themselves. You\'re not a challenge.' },
    { speakerId: 'inner-voice', text: 'You confirmed their value and revealed yours. Game over.', emotion: 'sad' },
  ],
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'The Nice One',
  endingSummary: 'You put them on a pedestal. They saw no challenge. Three minutes of polite dismissal.',
};

// Scene 10C Results - Endings
const scene10cQuestionResult: Scene = {
  id: 'scene-10c-question-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'Skyler\'s mask cracks. Just for a second.', speakerId: 'skyler', emotion: 'cold' },
    { text: '"That\'s... a weird thing to ask."' },
    { text: '"Is it? You\'ve talked to everyone here. I\'m curious if I\'m special or just next."' },
    { text: 'Long silence. Then they laugh. Real this time. "Okay. Fair. You\'re different."', speakerId: 'skyler', emotion: 'smirking' },
    { speakerId: 'inner-voice', text: 'You didn\'t fall for the manufactured scarcity. If there\'s something real here, you\'ll find out now.', emotion: 'knowing' },
  ],
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'The Pattern Breaker',
  endingSummary: 'You saw through the preselection game. When you called it out, they had to drop the act. Whatever comes next is real.',
};

const scene10cAcceptResult: Scene = {
  id: 'scene-10c-accept-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'Skyler smiles. "There\'s a place I know. Come on."', speakerId: 'skyler', emotion: 'seductive' },
    { text: 'You leave together. The prize everyone wanted chose you.' },
    { text: 'Or did they just find the one who would say yes?' },
    { speakerId: 'inner-voice', text: 'You got what everyone wanted. But do you want it? Or just the validation?', emotion: 'neutral' },
  ],
  isEnding: true,
  outcomeType: 'neutral',
  endingTitle: 'The Selected',
  endingSummary: 'You accepted the offer. Maybe it\'s real. Maybe you\'re just tonight\'s winner. Time will tell.',
};

const scene10cDeclineResult: Scene = {
  id: 'scene-10c-decline-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'Skyler blinks. Not the answer they expected.', speakerId: 'skyler', emotion: 'confused' },
    { text: '"Oh. Okay. Well... another time maybe."' },
    { text: 'They drift away. Slightly thrown. You were supposed to say yes.' },
    { speakerId: 'inner-voice', text: 'You walked away from manufactured desire. That takes real clarity.', emotion: 'happy' },
  ],
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'The Walk Away',
  endingSummary: 'Everyone wanted Skyler. You didn\'t. That\'s power they can\'t manufacture.',
};

// EARLY FAILURE - Complete collapse
const scene10cEagerResult: Scene = {
  id: 'scene-10c-eager-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'Skyler\'s smile widens. Too easy.', speakerId: 'skyler', emotion: 'smirking' },
    { text: '"Perfect. I love enthusiasm."' },
    { text: 'Two hours later, they\'ve barely asked about you. You\'re an audience, not a partner.' },
    { speakerId: 'inner-voice', text: 'All that game, and you gave it away for free. The scarcity was manufactured. Your interest was real.', emotion: 'sad' },
  ],
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'The Eager One',
  endingSummary: 'You collapsed into availability. They got what everyone else couldn\'t give them—easy validation. That\'s all you were.',
};

export const mission10Scenes: Scene[] = [
  scene10a, scene10aObserveResult, scene10aCompeteResult, scene10aIgnoreResult, scene10aApproachResult,
  scene10b, scene10bRecognizeResult, scene10bFlatteredResult, scene10bHonestResult, scene10bEagerResult,
  scene10c, scene10cQuestionResult, scene10cAcceptResult, scene10cDeclineResult, scene10cEagerResult,
];

export const mission10Scenario: DatingScenario = {
  id: MISSION_ID,
  levelId: 'social-scene',
  missionNumber: 10,
  title: missionMetadata.title,
  tagline: 'Everyone wants them. Do you?',
  description: missionMetadata.objective,
  objective: missionMetadata.objective,
  tier: missionMetadata.tier,
  estimatedMinutes: missionMetadata.estimatedMinutes,
  difficulty: missionMetadata.difficulty,
  characters,
  scenes: mission10Scenes,
  rewards,
  startSceneId: 'scene-10a-event',
};

export default mission10Scenario;
