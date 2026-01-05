// Red Flag Detection
// Behavioral patterns that indicate problematic dynamics

import { RedFlag, GreenFlag } from './types';

export const redFlags: RedFlag[] = [
  // Avoidant Patterns
  {
    id: 'avoidant_walls',
    name: 'Emotional Walls',
    description: 'Deflects deeper connection or vulnerability',
    category: 'avoidant',
    severity: 2,
    patterns: [
      /i don't (do|like) (labels|feelings|drama)/i,
      /let('s| us) not (get|be) (too )?serious/i,
      /i('m| am) not (good|great) (at|with) (this|emotions|feelings)/i,
      /why do (we|you) (need|have) to talk about/i,
    ],
    defense: 'Avoidants need space but will come back if interested. Don\'t chase - focus on yourself.',
  },
  {
    id: 'avoidant_distance',
    name: 'Creating Distance',
    description: 'Pulling away after moments of closeness',
    category: 'avoidant',
    severity: 2,
    patterns: [
      /i need (some )?space/i,
      /i('m| am) feeling (overwhelmed|suffocated)/i,
      /this is (too )?much/i,
      /i need (time|to think|to process)/i,
      /slow(ing)? down/i,
    ],
    defense: 'Give them space without chasing. If they don\'t return, they showed you the answer.',
  },

  // Narcissistic Patterns
  {
    id: 'narc_devalue',
    name: 'Subtle Devaluation',
    description: 'Backhanded compliments or subtle put-downs',
    category: 'narcissist',
    severity: 3,
    patterns: [
      /you('re| are) (pretty|smart|good)( looking)?,? (for|but)/i,
      /i (usually|normally) (don't|wouldn't) (date|go for)/i,
      /you('d| would) be (perfect|great) if/i,
      /at least you('re| are)/i,
      /not (bad|terrible) for/i,
    ],
    defense: 'This is a power play. Someone genuinely interested builds you up, not down.',
  },
  {
    id: 'narc_center',
    name: 'Conversation Hijacking',
    description: 'Always redirects conversation back to themselves',
    category: 'narcissist',
    severity: 2,
    patterns: [
      /enough about (you|that),? (what about me|let me tell)/i,
      /that('s| is) nothing,? (i|my|when i)/i,
      /oh that reminds me,? (i|my)/i,
      /yeah but (i|my|mine)/i,
    ],
    defense: 'Notice if they ever ask about you and listen to your answers.',
  },
  {
    id: 'narc_compare',
    name: 'Triangulation',
    description: 'Mentioning exes or others to create jealousy',
    category: 'narcissist',
    severity: 3,
    patterns: [
      /my ex (used to|would|was)/i,
      /(she|he|they) (always|never|would)/i,
      /this (girl|guy|person) (at|from|I know)/i,
      /(someone|people) (always|keep) (hitting on|texting)/i,
    ],
    defense: 'Secure people don\'t need to make you jealous. This is manipulation.',
  },

  // Player Patterns
  {
    id: 'player_vague',
    name: 'Vague About Intentions',
    description: 'Avoids defining what this is',
    category: 'player',
    severity: 2,
    patterns: [
      /let('s| us) (just )?see where (this|it) goes/i,
      /i (don't|hate) like(s)? labels/i,
      /why do we (need|have) to define/i,
      /can('t| not) we just (enjoy|have fun)/i,
      /i('m| am) not (looking|ready) for anything serious/i,
    ],
    defense: 'Clarity is kind. Someone who wants you will make it known.',
  },
  {
    id: 'player_late_night',
    name: 'Late Night Only',
    description: 'Only reaches out late at night',
    category: 'player',
    severity: 2,
    patterns: [
      /you up\??/i,
      /what('re| are) you doing (tonight|rn|right now)/i,
      /come over/i,
      /want (some )?company/i,
      /can('t| not) sleep/i,
    ],
    defense: 'If they only want you after midnight, you\'re an option, not a priority.',
  },

  // Low Interest Patterns
  {
    id: 'low_effort',
    name: 'Minimal Effort Responses',
    description: 'One-word or low-effort replies',
    category: 'low_interest',
    severity: 2,
    patterns: [
      /^(ok|k|cool|nice|lol|haha|yeah|yep|sure)\.?$/i,
      /^(sounds good|that('s| is) cool|interesting)\.?$/i,
    ],
    defense: 'Match their energy. Don\'t write paragraphs to someone sending single words.',
  },
  {
    id: 'low_plans',
    name: 'Never Makes Plans',
    description: 'Doesn\'t initiate or confirm concrete plans',
    category: 'low_interest',
    severity: 2,
    patterns: [
      /i('ll| will) (try|see)/i,
      /maybe/i,
      /we('ll| will) see/i,
      /not sure (yet|if)/i,
      /i('ll| will) let you know/i,
      /depends/i,
    ],
    defense: 'People make time for what they want. "Maybe" usually means no.',
  },
  {
    id: 'low_questions',
    name: 'Never Asks Questions',
    description: 'Shows no curiosity about your life',
    category: 'low_interest',
    severity: 2,
    patterns: [
      // This is detected by analyzing question frequency, not patterns
    ],
    defense: 'Interest shows through curiosity. If they never ask, they don\'t want to know.',
  },

  // Breadcrumbing Patterns
  {
    id: 'breadcrumb_sporadic',
    name: 'Sporadic Contact',
    description: 'Disappears and reappears unpredictably',
    category: 'breadcrumb',
    severity: 2,
    patterns: [
      /hey stranger/i,
      /long time/i,
      /i('ve| have) been (meaning|wanting) to (text|reach out)/i,
      /been thinking about you/i,
      /miss(ed)? you/i,
    ],
    defense: 'Consistency matters. Someone who only texts when bored is keeping you as a backup.',
  },
  {
    id: 'breadcrumb_future',
    name: 'Future Faking',
    description: 'Makes promises about future plans that never happen',
    category: 'breadcrumb',
    severity: 3,
    patterns: [
      /we should (definitely|totally) (hang|meet|do)/i,
      /i('ll| will) (definitely|for sure) (hit|text|call) you/i,
      /next (time|week|month) for sure/i,
      /i('m| am) going to (take|show|bring) you/i,
    ],
    defense: 'Judge by actions, not words. If they wanted to, they would.',
  },
  {
    id: 'breadcrumb_flirty',
    name: 'Flirty But No Action',
    description: 'Sends flirty messages but never follows through',
    category: 'breadcrumb',
    severity: 2,
    patterns: [
      /wish you were here/i,
      /thinking about you/i,
      /can('t| not) wait to see you/i,
      /i want to/i,
    ],
    defense: 'Words without action are just entertainment. Look for follow-through.',
  },
];

export const greenFlags: GreenFlag[] = [
  {
    id: 'consistent_contact',
    name: 'Consistent Communication',
    description: 'Regular, reliable contact patterns',
    category: 'consistency',
    weight: 8,
    patterns: [
      /good (morning|night)/i,
      /how was your (day|night|weekend)/i,
      /just (wanted|checking) to see/i,
    ],
  },
  {
    id: 'concrete_plans',
    name: 'Makes Concrete Plans',
    description: 'Suggests specific times and places',
    category: 'effort',
    weight: 9,
    patterns: [
      /how about (monday|tuesday|wednesday|thursday|friday|saturday|sunday)/i,
      /let('s| us) (do|go) (to )?.+ (at|on|this)/i,
      /i (made|got|booked) (reservations|tickets)/i,
      /pick you up at/i,
    ],
  },
  {
    id: 'remembers_details',
    name: 'Remembers Details',
    description: 'References things you\'ve told them',
    category: 'investment',
    weight: 8,
    patterns: [
      /you (mentioned|said|told me)/i,
      /i remember you (said|like|mentioned)/i,
      /how did .+ go/i,
    ],
  },
  {
    id: 'asks_questions',
    name: 'Shows Genuine Interest',
    description: 'Asks meaningful questions about your life',
    category: 'investment',
    weight: 7,
    patterns: [
      /tell me (more )?about/i,
      /what do you think about/i,
      /how do you feel about/i,
      /what('s| is) your (favorite|opinion)/i,
    ],
  },
  {
    id: 'respectful_boundaries',
    name: 'Respects Boundaries',
    description: 'Accepts no gracefully',
    category: 'respect',
    weight: 10,
    patterns: [
      /no (worries|problem),? (i )?understand/i,
      /take your time/i,
      /whenever you('re| are) (ready|free)/i,
      /no pressure/i,
    ],
  },
  {
    id: 'emotional_availability',
    name: 'Emotionally Available',
    description: 'Opens up and is receptive',
    category: 'investment',
    weight: 8,
    patterns: [
      /i('d| would) love to (share|tell you|show you)/i,
      /i feel (like|that)/i,
      /honestly,? i/i,
      /i want you to know/i,
    ],
  },
  {
    id: 'includes_future',
    name: 'Includes You in Future',
    description: 'Plans ahead with you in mind',
    category: 'investment',
    weight: 9,
    patterns: [
      /we should (go|try|do) .+ (together|sometime)/i,
      /i('d| would) love (to|for us to)/i,
      /next (time|month|year) we/i,
      /when we/i,
    ],
  },
];

export const flagColors = {
  1: '#F59E0B', // Yellow/amber
  2: '#F97316', // Orange
  3: '#EF4444', // Red
};

export const categoryDescriptions = {
  avoidant: {
    name: 'Avoidant Attachment',
    description: 'Fear of intimacy and emotional closeness',
    advice: 'Avoidants need space but can commit if they feel safe. Don\'t chase - create mystery.',
  },
  narcissist: {
    name: 'Narcissistic Traits',
    description: 'Excessive self-focus and need for admiration',
    advice: 'Run. Narcissists rarely change and the cycle only gets worse.',
  },
  player: {
    name: 'Player Behavior',
    description: 'Keeping options open without commitment',
    advice: 'You can\'t make someone ready. Focus on people who know what they want.',
  },
  low_interest: {
    name: 'Low Interest',
    description: 'Minimal investment or effort in the connection',
    advice: 'When someone wants you, you\'ll know. When they don\'t, you\'ll be confused.',
  },
  breadcrumb: {
    name: 'Breadcrumbing',
    description: 'Giving just enough attention to keep you interested',
    advice: 'Stop accepting crumbs. You deserve the whole cake.',
  },
};
