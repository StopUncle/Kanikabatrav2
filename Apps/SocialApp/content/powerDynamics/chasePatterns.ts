// Chase Pattern Detection
// Identifies who is pursuing whom in the dynamic

import { ChasePattern, PowerIndicator } from './types';

// Patterns that indicate YOU are chasing (power loss)
export const chasingPatterns: ChasePattern[] = [
  {
    id: 'double_texting',
    name: 'Double/Triple Texting',
    description: 'Sending multiple messages without response',
    type: 'chasing',
    severity: 'moderate',
    patterns: [
      /\?\s*\n.*\?/i, // Multiple questions in sequence
      /hey\s*\n.*hey/i,
      /you there\??/i,
      /hello\?+/i,
    ],
    recommendation: 'Mirror their energy. If they don\'t respond, wait at least 24 hours before reaching out again.',
  },
  {
    id: 'over_explaining',
    name: 'Over-Explaining',
    description: 'Justifying yourself or your actions excessively',
    type: 'chasing',
    severity: 'mild',
    patterns: [
      /i (just|only) (wanted|meant|thought)/i,
      /i('m| am) sorry,? (but )?i (was|didn't|just)/i,
      /let me explain/i,
      /what i meant was/i,
      /i hope you understand/i,
      /please don't (think|be)/i,
    ],
    recommendation: 'State your position once, clearly. Over-explaining signals insecurity.',
  },
  {
    id: 'seeking_validation',
    name: 'Seeking Validation',
    description: 'Asking for reassurance or approval',
    type: 'chasing',
    severity: 'moderate',
    patterns: [
      /do you (still )?like me/i,
      /are we (still )?okay/i,
      /did i do something wrong/i,
      /are you (mad|upset) (at|with) me/i,
      /you('re| are) not (mad|upset),? right/i,
      /please (tell|let) me/i,
      /i need to know/i,
      /what('s| is) wrong/i,
    ],
    recommendation: 'Assume positive intent. Constant reassurance-seeking is unattractive.',
  },
  {
    id: 'over_availability',
    name: 'Over-Availability',
    description: 'Always being immediately available',
    type: 'chasing',
    severity: 'mild',
    patterns: [
      /i('m| am) free (whenever|anytime)/i,
      /just (let|tell) me when/i,
      /i('ll| will) (clear|cancel|move) my/i,
      /whatever works for you/i,
      /i can make (it|time) (work|happen)/i,
      /my schedule is (open|flexible|free)/i,
    ],
    recommendation: 'Have your own life. Don\'t rearrange everything for them.',
  },
  {
    id: 'emotional_flooding',
    name: 'Emotional Flooding',
    description: 'Overwhelming them with feelings or intensity',
    type: 'chasing',
    severity: 'severe',
    patterns: [
      /i (can't|cannot) (stop|quit) thinking about you/i,
      /i('ve| have) never felt this way/i,
      /you mean (so|everything)/i,
      /i need you/i,
      /i('m| am) (so|really) (into|crazy about) you/i,
      /you('re| are) (all i think about|my everything)/i,
    ],
    recommendation: 'Match their emotional investment. Intensity this early creates pressure.',
  },
];

// Patterns that indicate THEY are chasing (power gain)
export const beingChasedPatterns: ChasePattern[] = [
  {
    id: 'they_initiate',
    name: 'They Initiate',
    description: 'They reach out first consistently',
    type: 'being_chased',
    severity: 'mild',
    patterns: [
      /i('ve| have) been thinking about you/i,
      /i miss(ed)? you/i,
      /when can i see you/i,
      /i want(ed)? to (see|hear)/i,
      /can we (talk|hang|meet)/i,
    ],
    recommendation: 'Good sign. Respond warmly but don\'t over-invest in return.',
  },
  {
    id: 'they_invest',
    name: 'They Invest Effort',
    description: 'Making concrete plans and following through',
    type: 'being_chased',
    severity: 'mild',
    patterns: [
      /i (made|got|booked) (reservations|tickets|plans)/i,
      /i('ll| will) pick you up/i,
      /i planned (something|this)/i,
      /let me (take|treat) you/i,
      /i want to (show|take|bring) you/i,
    ],
    recommendation: 'Reciprocate effort, but let them lead the pursuit.',
  },
  {
    id: 'they_qualify',
    name: 'They Qualify Themselves',
    description: 'Trying to impress or prove worth',
    type: 'being_chased',
    severity: 'moderate',
    patterns: [
      /i('m| am) not like (other|those)/i,
      /i would never/i,
      /i('m| am) different/i,
      /i promise i/i,
      /you can trust me/i,
      /i('ll| will) (prove|show) (you|it)/i,
    ],
    recommendation: 'Let them prove through actions, not words.',
  },
];

// Push patterns (creating distance, can be strategic or problematic)
export const pushPatterns: ChasePattern[] = [
  {
    id: 'delayed_response',
    name: 'Delayed Responses',
    description: 'Taking long to respond (can be intentional or sign of low interest)',
    type: 'push',
    severity: 'mild',
    patterns: [
      /sorry,? (i was|been) busy/i,
      /just saw this/i,
      /sorry for the late/i,
    ],
    recommendation: 'Match their energy. If consistently slow, they may have low interest.',
  },
  {
    id: 'vague_plans',
    name: 'Vague Plans',
    description: 'Non-committal about meeting up',
    type: 'push',
    severity: 'moderate',
    patterns: [
      /we should (hang|meet|chill) sometime/i,
      /maybe (we can|let's)/i,
      /i('ll| will) let you know/i,
      /we('ll| will) see/i,
      /not sure yet/i,
      /depends on/i,
    ],
    recommendation: 'Vague plans are no plans. If interested, they make concrete plans.',
  },
  {
    id: 'hot_cold',
    name: 'Hot and Cold',
    description: 'Inconsistent attention and engagement',
    type: 'push',
    severity: 'severe',
    patterns: [
      /i need (some )?space/i,
      /i('m| am) not (ready|sure)/i,
      /this is (moving|going) (too )?fast/i,
      /i need (time|to think)/i,
    ],
    recommendation: 'Create distance. Don\'t chase someone who\'s pulling away.',
  },
];

// Pull patterns (creating connection)
export const pullPatterns: ChasePattern[] = [
  {
    id: 'future_planning',
    name: 'Future Planning',
    description: 'Including you in future plans',
    type: 'pull',
    severity: 'mild',
    patterns: [
      /we should (go|try|visit)/i,
      /next (time|week|month) (we|let's)/i,
      /i('d| would) love to (take|show|bring) you/i,
      /when (we|you) (meet|come|visit)/i,
    ],
    recommendation: 'Positive sign of investment. Mirror appropriately.',
  },
  {
    id: 'personal_sharing',
    name: 'Personal Sharing',
    description: 'Opening up about deeper topics',
    type: 'pull',
    severity: 'mild',
    patterns: [
      /i('ve| have) never told anyone/i,
      /can i tell you something/i,
      /i want you to know/i,
      /between (us|you and me)/i,
    ],
    recommendation: 'Create safety for vulnerability. Don\'t exploit shared secrets.',
  },
];

// Power indicators (affect your power score)
export const powerIndicators: PowerIndicator[] = [
  // Positive (increase YOUR power)
  {
    id: 'outcome_independence',
    name: 'Outcome Independence',
    description: 'Not needing a specific outcome',
    category: 'frame',
    direction: 'positive',
    weight: 8,
    patterns: [
      /no (worries|problem)/i,
      /it('s| is) (all )?good/i,
      /that('s| is) fine/i,
      /i understand/i,
      /another time/i,
    ],
  },
  {
    id: 'boundary_setting',
    name: 'Setting Boundaries',
    description: 'Clearly stating limits',
    category: 'frame',
    direction: 'positive',
    weight: 9,
    patterns: [
      /i('m| am) not (okay|comfortable) with/i,
      /that doesn't work for me/i,
      /i need you to/i,
      /that('s| is) not acceptable/i,
    ],
  },
  {
    id: 'self_focus',
    name: 'Self-Focused Language',
    description: 'Talking about your own life and interests',
    category: 'frame',
    direction: 'positive',
    weight: 6,
    patterns: [
      /i('m| am) (going|doing|working)/i,
      /my (work|project|friends|hobby)/i,
      /i('ve| have) been (busy with|focused on)/i,
    ],
  },
  // Negative (decrease YOUR power)
  {
    id: 'excessive_questions',
    name: 'Excessive Questions',
    description: 'Asking too many questions without reciprocation',
    category: 'investment',
    direction: 'negative',
    weight: 5,
    patterns: [
      /\?.*\?.*\?/i, // Multiple questions in one message
    ],
  },
  {
    id: 'apology_overuse',
    name: 'Excessive Apologizing',
    description: 'Saying sorry too often',
    category: 'frame',
    direction: 'negative',
    weight: 6,
    patterns: [
      /sorry.*sorry/i,
      /i('m| am) (so )?sorry (if|that|for)/i,
    ],
  },
  {
    id: 'pedestaling',
    name: 'Putting Them on a Pedestal',
    description: 'Excessive compliments or worship',
    category: 'frame',
    direction: 'negative',
    weight: 7,
    patterns: [
      /you('re| are) (so|too) (perfect|amazing|beautiful|gorgeous)/i,
      /i('m| am) (so )?(lucky|blessed) to/i,
      /you('re| are) out of my league/i,
      /what did i do to deserve/i,
    ],
  },
];

export const allChasePatterns = [
  ...chasingPatterns,
  ...beingChasedPatterns,
  ...pushPatterns,
  ...pullPatterns,
];
