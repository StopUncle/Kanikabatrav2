// Example: University Level Configuration
// Shows how to configure the relationship engine for the university cast

import {
  createRelationshipEngine,
  RelationshipEngineConfig,
  RelationshipCharacter,
  BetrayalConfig,
  createConvergencePoint,
} from '../index';

// ============================================
// UNIVERSITY CAST - CHARACTER DEFINITIONS
// ============================================

const universityCharacters: RelationshipCharacter[] = [
  {
    id: 'morgan',
    name: 'Morgan',
    archetype: 'narcissist',
    secondaryTraits: ['insecure', 'smart', 'vindictive'],
    relationships: [
      { targetCharacterId: 'taylor', relationshipType: 'dating', rippleEffect: 0.5 },
      { targetCharacterId: 'riley', relationshipType: 'rival', rippleEffect: -0.3 },
    ],
    possiblePresentations: ['cold', 'warm', 'vulnerable', 'charming'],
    memoryTriggers: {
      positive: ['gave_attention', 'supported_publicly', 'shared_enemy'],
      negative: ['embarrassed_public', 'outshone_them', 'rejected_invite'],
    },
  },
  {
    id: 'taylor',
    name: 'Taylor',
    archetype: 'avoidant',
    secondaryTraits: ['smart', 'charismatic'],
    relationships: [
      { targetCharacterId: 'morgan', relationshipType: 'dating', rippleEffect: 0.3 },
      { targetCharacterId: 'casey', relationshipType: 'friend', rippleEffect: 0.4 },
    ],
    possiblePresentations: ['cold', 'neutral', 'charming'],
    memoryTriggers: {
      positive: ['kept_secret', 'gave_space', 'didnt_chase'],
      negative: ['chased_too_hard', 'got_close_to_morgan', 'outshone_public'],
    },
  },
  {
    id: 'casey',
    name: 'Casey',
    archetype: 'genuine',
    secondaryTraits: ['loyal', 'passive'],
    relationships: [
      { targetCharacterId: 'taylor', relationshipType: 'friend', rippleEffect: 0.5 },
    ],
    possiblePresentations: ['warm', 'neutral'],
    memoryTriggers: {
      positive: ['noticed_them', 'genuine_interest', 'defended_them'],
      negative: ['ignored_them', 'used_them', 'dismissed_public'],
    },
  },
  {
    id: 'jordan',
    name: 'Jordan',
    archetype: 'secure',
    secondaryTraits: ['ambitious'],
    relationships: [],
    possiblePresentations: ['warm', 'neutral', 'cold'],
    memoryTriggers: {
      positive: ['followed_rules', 'showed_respect'],
      negative: ['broke_rules', 'disrespected_authority'],
    },
  },
  {
    id: 'alex',
    name: 'Alex',
    archetype: 'anxious',
    secondaryTraits: ['ambitious', 'charismatic'],
    relationships: [],
    possiblePresentations: ['warm', 'vulnerable', 'aggressive'],
    memoryTriggers: {
      positive: ['included_them', 'reassured_them'],
      negative: ['excluded_them', 'criticized_them'],
    },
  },
  {
    id: 'riley',
    name: 'Riley',
    archetype: 'manipulator',
    secondaryTraits: ['charismatic', 'smart'],
    relationships: [
      { targetCharacterId: 'morgan', relationshipType: 'rival', rippleEffect: -0.4 },
      { targetCharacterId: 'sam', relationshipType: 'acquaintance', rippleEffect: 0.2 },
    ],
    possiblePresentations: ['warm', 'charming', 'cold'],
    memoryTriggers: {
      positive: ['useful_to_them', 'boosted_status'],
      negative: ['threatened_status', 'aligned_with_morgan'],
    },
  },
  {
    id: 'sam',
    name: 'Sam',
    archetype: 'secure',
    secondaryTraits: ['passive'],
    relationships: [
      { targetCharacterId: 'riley', relationshipType: 'acquaintance', rippleEffect: 0.3 },
    ],
    possiblePresentations: ['neutral', 'warm'],
    memoryTriggers: {
      positive: ['social_proof', 'friendly'],
      negative: ['low_status', 'antisocial'],
    },
  },
];

// ============================================
// TAYLOR BETRAYAL CONFIGURATION
// The key relationship with hidden loyalty
// ============================================

const taylorBetrayal: BetrayalConfig = {
  characterId: 'taylor',
  loyaltyThreshold: 40, // Below 40 = betrayal
  climaxSceneId: 'scene-gala-moment-of-truth',
  betrayalOutcome: {
    sceneId: 'scene-taylor-betrays',
    description: 'Taylor leads you into the trap. They were never really on your side.',
  },
  warningOutcome: {
    sceneId: 'scene-taylor-warns',
    description: 'Taylor pulls you aside and warns you about what\'s coming.',
  },
  foreshadowingMessages: {
    dropping: [
      'Taylor seemed quiet when you got that compliment.',
      'She didn\'t invite you to the pre-party.',
      'You notice her talking to Morgan more lately.',
    ],
    rising: [
      'Taylor smiled at you across the room. It felt real.',
      'She mentioned your name to her friends positively.',
    ],
    critical: [
      'Something feels off with Taylor. But you can\'t put your finger on it.',
      'Taylor\'s been distant. Or maybe you\'re imagining it.',
    ],
  },
};

// ============================================
// CONVERGENCE POINTS
// Key story beats all paths must reach
// ============================================

const convergencePoints = [
  createConvergencePoint(
    'level-1-party',
    'scene-party-arrival',
    [
      {
        pathId: 'manipulated-way-in',
        flavor: 'You used Casey to get the invite. They looked hurt but said nothing.',
        flagsSet: ['used_casey'],
      },
      {
        pathId: 'earned-invite-riley',
        flavor: 'Riley brought you. You\'re in their orbit now.',
        minRapport: { characterId: 'riley', value: 60 },
      },
      {
        pathId: 'earned-invite-jordan',
        flavor: 'Jordan put in a good word. Playing by the rules paid off.',
        minRapport: { characterId: 'jordan', value: 65 },
      },
      {
        pathId: 'plus-one',
        flavor: 'Alex brought you as their plus-one. Roommate solidarity.',
        minRapport: { characterId: 'alex', value: 70 },
      },
    ]
  ),
  createConvergencePoint(
    'level-2-gala-invite',
    'scene-gala-invitation',
    [
      {
        pathId: 'morgan-invite',
        flavor: 'Morgan invited you personally. That means something. Or they want something.',
        minRapport: { characterId: 'morgan', value: 55 },
      },
      {
        pathId: 'taylor-invite',
        flavor: 'Taylor casually mentioned you\'re on the list. Cool. Detached. Classic.',
        minRapport: { characterId: 'taylor', value: 50 },
      },
      {
        pathId: 'riley-invite',
        flavor: 'Riley made sure you were invited. You\'re valuable to them.',
        minRapport: { characterId: 'riley', value: 60 },
      },
      {
        pathId: 'earned-invite',
        flavor: 'Your reputation preceded you. The invite came naturally.',
        flagsSet: ['high_reputation'],
      },
    ]
  ),
];

// ============================================
// FULL CONFIGURATION
// ============================================

export const universityEngineConfig: RelationshipEngineConfig = {
  scenarioId: 'university-level-1',
  characters: universityCharacters,
  betrayals: [taylorBetrayal],
  convergencePoints,
  initialRelationships: [
    // Everyone starts neutral except...
    { characterId: 'alex', rapport: 55 }, // Roommate has slight positive bias
    { characterId: 'morgan', loyalty: 30 }, // Morgan has low loyalty by default
  ],
};

// ============================================
// USAGE EXAMPLE
// ============================================

export function createUniversityEngine() {
  const engine = createRelationshipEngine(universityEngineConfig);

  // Set up foreshadowing listener
  engine.tracker.onForeshadowing((characterId, message) => {
    console.log(`[FORESHADOWING] ${characterId}: ${message}`);
    // In real app, this would inject into next scene or show as subtle narration
  });

  return engine;
}

/*
// Example game loop integration:

const engine = createUniversityEngine();

// When player makes a choice:
engine.handleChoice(
  'scene-common-room',
  'choice-impress-morgan',
  'morgan',
  'tried to impress Morgan',
  { rapport: 5, respect: -5, loyalty: -10 } // They like it but don't respect it
);

// When reaching convergence point:
const entry = engine.getConvergenceEntry('level-1-party');
if (entry) {
  console.log(`Arriving via: ${entry.pathId}`);
  console.log(`Flavor: ${entry.flavor}`);
}

// At climax:
const outcome = engine.checkBetrayal('taylor');
if (outcome === 'betrayal') {
  // Load betrayal scene
  const teaching = engine.getPostBetrayalTeaching('taylor');
  // Show teaching after betrayal
}

// Get UI stats:
const taylorStats = engine.getVisibleStats('taylor');
console.log(`Taylor - Rapport: ${taylorStats?.rapport}, Respect: ${taylorStats?.respect}`);

// Get character mood for scene resolution:
const morganMood = engine.getCharacterMood('morgan');
console.log(`Morgan is ${engine.getMoodDescription('morgan')}`);
*/
