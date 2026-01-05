// Daily rotating content for engagement
// Changes based on day of week

export interface DailyInsight {
  quote: string;
  author: string;
  category: 'influence' | 'psychology' | 'strategy' | 'mindset';
}

const dailyInsights: DailyInsight[] = [
  {
    quote: "The greatest power is simple patience.",
    author: "Robert Greene",
    category: 'strategy',
  },
  {
    quote: "Know your enemy and know yourself; in a hundred battles, you will never be defeated.",
    author: "Sun Tzu",
    category: 'strategy',
  },
  {
    quote: "The ability to observe without evaluating is the highest form of intelligence.",
    author: "Jiddu Krishnamurti",
    category: 'psychology',
  },
  {
    quote: "People are not lazy. They simply have impotent goals.",
    author: "Tony Robbins",
    category: 'mindset',
  },
  {
    quote: "The key to persuasion is never to persuade, but to understand first.",
    author: "Chris Voss",
    category: 'influence',
  },
  {
    quote: "Your perception of me is a reflection of you; my reaction to you is an awareness of me.",
    author: "Bobbi Chegwyn",
    category: 'psychology',
  },
  {
    quote: "Mastery is not a function of genius, but of time and intense focus.",
    author: "Robert Greene",
    category: 'mindset',
  },
];

// Additional insights for variety (used for weekly rotation)
const extendedInsights: DailyInsight[] = [
  {
    quote: "In the realm of ideas, everything depends on enthusiasm.",
    author: "Walter Benjamin",
    category: 'mindset',
  },
  {
    quote: "The wise win before the fight, while the ignorant fight to win.",
    author: "Zhuge Liang",
    category: 'strategy',
  },
  {
    quote: "To know what people really think, pay attention to what they do, not what they say.",
    author: "René Descartes",
    category: 'psychology',
  },
  {
    quote: "Power is not revealed by striking hard or often, but by striking true.",
    author: "Honoré de Balzac",
    category: 'influence',
  },
  {
    quote: "The most dangerous person is the one who listens, thinks and observes.",
    author: "Bruce Lee",
    category: 'psychology',
  },
  {
    quote: "Never interrupt your enemy when he is making a mistake.",
    author: "Napoleon Bonaparte",
    category: 'strategy',
  },
  {
    quote: "A man who has committed a mistake and doesn't correct it is committing another mistake.",
    author: "Confucius",
    category: 'mindset',
  },
  // Additional insights from dark psychology themes
  {
    quote: "The best way to predict behavior is to understand the wound behind it.",
    author: "The Honeytrap Doctrine",
    category: 'psychology',
  },
  {
    quote: "Scarcity is manufactured. Value is perception. Control both.",
    author: "The Honeytrap Doctrine",
    category: 'strategy',
  },
  {
    quote: "The coldest calculations come from the warmest presentations.",
    author: "The Honeytrap Doctrine",
    category: 'influence',
  },
  {
    quote: "Your triggers are your vulnerabilities. Know them before others do.",
    author: "The Honeytrap Doctrine",
    category: 'psychology',
  },
  {
    quote: "Attention is currency. Spend it like you're poor.",
    author: "The Honeytrap Doctrine",
    category: 'strategy',
  },
  {
    quote: "The mask that becomes too comfortable eventually replaces the face.",
    author: "The Honeytrap Doctrine",
    category: 'psychology',
  },
  {
    quote: "Information asymmetry is the foundation of all advantage.",
    author: "The Honeytrap Doctrine",
    category: 'strategy',
  },
  {
    quote: "Emotional detachment isn't cruelty - it's clarity.",
    author: "The Honeytrap Doctrine",
    category: 'mindset',
  },
  {
    quote: "The most effective manipulation feels like free will.",
    author: "The Honeytrap Doctrine",
    category: 'influence',
  },
  {
    quote: "What they need to believe matters more than what's true.",
    author: "The Honeytrap Doctrine",
    category: 'psychology',
  },
  {
    quote: "Never react. Respond strategically or not at all.",
    author: "The Honeytrap Doctrine",
    category: 'strategy',
  },
  {
    quote: "Dependency is designed. Nothing addictive happens by accident.",
    author: "The Honeytrap Doctrine",
    category: 'psychology',
  },
  {
    quote: "Your exit should be planned before your entrance.",
    author: "The Honeytrap Doctrine",
    category: 'strategy',
  },
  {
    quote: "The void you leave should be harder to fill than you were to acquire.",
    author: "The Honeytrap Doctrine",
    category: 'influence',
  },
  {
    quote: "Reality is whatever can be made to stick.",
    author: "The Honeytrap Doctrine",
    category: 'psychology',
  },
  {
    quote: "Pain remembered controls future behavior. Use it wisely.",
    author: "The Honeytrap Doctrine",
    category: 'strategy',
  },
  {
    quote: "The beige rock doesn't get kicked. Become unremarkable when necessary.",
    author: "The Honeytrap Doctrine",
    category: 'strategy',
  },
  {
    quote: "Trust the process of strategic withdrawal. Absence manufactures presence.",
    author: "The Honeytrap Doctrine",
    category: 'influence',
  },
  {
    quote: "They don't need to know your hand. They need to fear it.",
    author: "The Honeytrap Doctrine",
    category: 'strategy',
  },
  {
    quote: "The best defense is being too expensive to attack.",
    author: "The Honeytrap Doctrine",
    category: 'mindset',
  },
];

/**
 * Get today's insight based on the day of the year
 * Rotates through all insights over ~2 weeks
 */
export function getTodaysInsight(): DailyInsight {
  const allInsights = [...dailyInsights, ...extendedInsights];
  const dayOfYear = getDayOfYear();
  const index = dayOfYear % allInsights.length;
  return allInsights[index];
}

/**
 * Get insight for a specific day (for testing/preview)
 */
export function getInsightForDay(dayOffset: number): DailyInsight {
  const allInsights = [...dailyInsights, ...extendedInsights];
  const dayOfYear = getDayOfYear() + dayOffset;
  const index = Math.abs(dayOfYear) % allInsights.length;
  return allInsights[index];
}

/**
 * Get day of year (1-366)
 */
function getDayOfYear(): number {
  const now = new Date();
  // Start of year: Jan 1 00:00:00
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  // Add 1 because Jan 1 should be day 1, not day 0
  return Math.floor(diff / oneDay) + 1;
}

// Category colors for UI
export const categoryColors: Record<DailyInsight['category'], string> = {
  influence: '#9C27B0',    // Purple
  psychology: '#2196F3',   // Blue
  strategy: '#FF9800',     // Orange
  mindset: '#4CAF50',      // Green
};

// Category icons (lucide-react-native names)
export const categoryIcons: Record<DailyInsight['category'], string> = {
  influence: 'Users',
  psychology: 'Brain',
  strategy: 'Target',
  mindset: 'Sparkles',
};

// Daily Tactical Briefs - Actionable psychology insights
export interface TacticalBrief {
  title: string;
  tactic: string;
  howToUse: string;
  example: string;
  category: 'influence' | 'psychology' | 'strategy' | 'mindset';
}

const tacticalBriefs: TacticalBrief[] = [
  {
    title: 'The Power of Strategic Silence',
    tactic: 'When negotiating or in conflict, pause for 5-7 seconds before responding to pressure.',
    howToUse: 'After someone makes a demand or accusation, remain silent while maintaining eye contact. Most people will fill the silence with concessions or reveal more information.',
    example: 'When they say "That\'s our final offer," stay silent. They\'ll often revise their position.',
    category: 'strategy',
  },
  {
    title: 'The Mirroring Technique',
    tactic: 'Repeat the last 1-3 key words someone says, with an upward inflection.',
    howToUse: 'This makes people feel heard and encourages them to elaborate. It builds rapport without you revealing your position.',
    example: 'Them: "We need this done by Friday." You: "By Friday?" They\'ll explain their reasoning.',
    category: 'influence',
  },
  {
    title: 'The Door-in-the-Face',
    tactic: 'Start with an unreasonably large request, then follow with your actual (smaller) request.',
    howToUse: 'The contrast makes your real request seem reasonable. The other person feels they\'ve "won" a concession.',
    example: 'Ask for a $20K raise first, then "settle" for the $5K you actually wanted.',
    category: 'influence',
  },
  {
    title: 'The Benjamin Franklin Effect',
    tactic: 'Ask someone for a small favor to make them like you more.',
    howToUse: 'People justify helping you by convincing themselves they must like you. This creates cognitive consistency.',
    example: 'Ask a colleague to borrow their pen. They\'ll subconsciously warm to you.',
    category: 'psychology',
  },
  {
    title: 'Strategic Vulnerability',
    tactic: 'Share a controlled weakness to appear more trustworthy.',
    howToUse: 'Revealing a minor, relatable flaw makes you seem authentic. People lower their guard.',
    example: '"I\'m terrible with names, so please remind me" - creates instant rapport.',
    category: 'influence',
  },
  {
    title: 'The Anchoring Effect',
    tactic: 'Establish the first number in any negotiation.',
    howToUse: 'The first number mentioned becomes the reference point. All subsequent numbers are judged relative to it.',
    example: 'Start high when selling, low when buying. The final number will gravitate toward your anchor.',
    category: 'strategy',
  },
  {
    title: 'The Labeling Technique',
    tactic: 'Name the emotion you observe in others: "It seems like you\'re frustrated."',
    howToUse: 'When you correctly label emotions, people feel understood. This diffuses tension and builds trust.',
    example: '"It sounds like you\'re feeling undervalued in this situation."',
    category: 'psychology',
  },
  {
    title: 'The Foot-in-the-Door',
    tactic: 'Get a small "yes" before asking for the big "yes."',
    howToUse: 'Once someone commits to a small action, they\'re more likely to agree to larger requests to stay consistent.',
    example: 'Get them to agree to a 5-minute call before asking for an hour meeting.',
    category: 'influence',
  },
  {
    title: 'The Scarcity Play',
    tactic: 'Frame opportunities as limited or exclusive.',
    howToUse: 'People value what\'s rare more than what\'s abundant. Create urgency through genuine scarcity.',
    example: '"I can only take on 3 more clients this quarter."',
    category: 'strategy',
  },
  {
    title: 'Controlled Information Release',
    tactic: 'Never reveal everything you know at once.',
    howToUse: 'Withhold non-essential information to maintain leverage. Information is power only when others don\'t have it.',
    example: 'Share your weakest points first; save your strongest for when they\'re needed.',
    category: 'strategy',
  },
  {
    title: 'The Contrast Principle',
    tactic: 'Present an unfavorable option before your preferred one.',
    howToUse: 'Comparison shapes perception. Anything looks better next to something worse.',
    example: 'Show the overpriced option first, then your actual recommendation seems like a deal.',
    category: 'influence',
  },
  {
    title: 'Strategic Praise',
    tactic: 'Praise the specific behavior you want to see repeated.',
    howToUse: 'General praise is forgotten. Specific praise reinforces exact behaviors and creates loyalty.',
    example: '"The way you handled that client objection was masterful" vs just "Good job."',
    category: 'influence',
  },
  {
    title: 'The Curiosity Gap',
    tactic: 'Give partial information to create irresistible curiosity.',
    howToUse: 'The human brain craves closure. An incomplete story is more engaging than a complete one.',
    example: '"There\'s something about your situation I need to tell you, but not here..."',
    category: 'psychology',
  },
  {
    title: 'Reading Micro-Expressions',
    tactic: 'Watch for face-touching, eye-darting, or foot-pointing when someone speaks.',
    howToUse: 'These involuntary signals often reveal discomfort, deception, or true interest. Trust the body over words.',
    example: 'If feet point toward the door during conversation, they want to leave.',
    category: 'psychology',
  },
  // Additional tactical briefs from the book
  {
    title: 'The Confessional Probe',
    tactic: 'Share a small, calculated secret to extract larger ones in return.',
    howToUse: 'Vulnerability triggers reciprocity. When you share something personal, others feel compelled to match your disclosure level.',
    example: '"I probably shouldn\'t tell you this, but..." then share something minor. They\'ll often one-up with something significant.',
    category: 'influence',
  },
  {
    title: 'The Hypothetical Probe',
    tactic: 'Frame invasive questions as hypotheticals to bypass defenses.',
    howToUse: 'Hypotheticals feel safe because they\'re "not real." But the answers reveal real preferences and intentions.',
    example: '"Hypothetically, if you could get away with anything, what would it be?" reveals character without triggering defensiveness.',
    category: 'psychology',
  },
  {
    title: 'The 12-Hour Text Delay',
    tactic: 'Respond to non-urgent messages 12+ hours later to establish value.',
    howToUse: 'Instant responses signal availability and eagerness. Delayed responses signal a full life and scarcity of your attention.',
    example: 'Read the message, wait until the next morning to respond. Your time becomes more valuable.',
    category: 'strategy',
  },
  {
    title: 'The Love-Bomb Defense',
    tactic: 'When overwhelmed with attention early, slow everything down.',
    howToUse: 'Excessive early investment is a red flag. Healthy connections build gradually. Fast intimacy often precedes manipulation.',
    example: 'If someone says "I\'ve never felt this before" on date two, that\'s a withdrawal setup, not romance.',
    category: 'psychology',
  },
  {
    title: 'The Cancellation Gambit',
    tactic: 'Occasionally cancel plans you initiated to create uncertainty.',
    howToUse: 'Unpredictability increases interest. When people can\'t fully count on you, they invest more mental energy.',
    example: 'Cancel 1 in 5 plans with a vague excuse. "Something came up." Don\'t over-explain.',
    category: 'strategy',
  },
  {
    title: 'The Attention Lottery',
    tactic: 'Vary the warmth of your interactions unpredictably.',
    howToUse: 'Consistent warmth is comfortable but forgettable. Variable warmth creates psychological investment.',
    example: 'Be engaging one conversation, slightly distant the next. They\'ll analyze what changed.',
    category: 'influence',
  },
  {
    title: 'Reality Distortion Defense',
    tactic: 'Document important conversations in writing immediately after.',
    howToUse: 'Gaslighters rewrite history. Your notes are your reality anchor. Review them when you start doubting yourself.',
    example: 'After any significant conversation, text a friend or write in your notes app: "Today they said X about Y."',
    category: 'psychology',
  },
  {
    title: 'The Read Receipt Weapon',
    tactic: 'Use read receipts strategically - turn them on for power moves.',
    howToUse: 'Leaving someone "on read" is a statement. Responding instantly is a statement. Control which message you send.',
    example: 'Read their message, don\'t respond. They\'ll know you saw it. The silence speaks.',
    category: 'strategy',
  },
  {
    title: 'The Grandmother Gambit',
    tactic: 'Before sending an emotional message, ask: "Would I show this to my grandmother?"',
    howToUse: 'Heated messages become leverage later. Anything written can be screenshot. Maintain composure in text.',
    example: 'Write the angry message, read it, delete it. Then write what you actually want documented.',
    category: 'mindset',
  },
  {
    title: 'The Social Proof Audit',
    tactic: 'Analyze someone\'s social media for what they\'re actually selling you.',
    howToUse: 'People curate their image. Look for gaps between the presentation and reality. The curation itself reveals values.',
    example: 'Constant posts about being "real" and "authentic" often indicate the opposite.',
    category: 'psychology',
  },
  {
    title: 'The Strategic Compliment',
    tactic: 'Compliment what people are insecure about, not what they\'re confident in.',
    howToUse: 'Praising obvious strengths is forgettable. Validating secret insecurities creates deep connection and loyalty.',
    example: 'The beautiful person who\'s told they\'re smart. The successful person who\'s told they\'re kind.',
    category: 'influence',
  },
  {
    title: 'The Reverse Sell',
    tactic: 'When someone resists, agree with their objection and add to it.',
    howToUse: 'Arguing triggers resistance. Agreeing and amplifying forces them to argue against their own position.',
    example: '"You\'re right, this probably isn\'t for you. It takes a lot of commitment." Now they prove they\'re committed.',
    category: 'influence',
  },
  {
    title: 'The Pattern Interrupt',
    tactic: 'In heated moments, do something unexpected to reset the interaction.',
    howToUse: 'Arguments follow predictable scripts. Breaking the pattern creates a cognitive pause you can use.',
    example: 'Mid-argument, say "Hold on, I need water" and walk away for 30 seconds. Return calmer, restart.',
    category: 'strategy',
  },
  {
    title: 'The Exit Interview',
    tactic: 'When leaving any relationship, conduct your own internal exit analysis.',
    howToUse: 'Every ending teaches something. What red flags did you miss? What patterns repeat? Document for next time.',
    example: 'Write down the first 5 red flags you ignored. You\'ll recognize them faster next time.',
    category: 'mindset',
  },
  {
    title: 'The Beige Rock Protocol',
    tactic: 'When dealing with difficult people, become incredibly boring.',
    howToUse: 'Drama seekers need reaction. Remove emotional responses, give neutral answers, become uninteresting.',
    example: '"How was your day?" "Fine." "What did you do?" "Not much." Eventually they seek entertainment elsewhere.',
    category: 'strategy',
  },
];

/**
 * Get today's tactical brief
 */
export function getTodaysTacticalBrief(): TacticalBrief {
  const dayOfYear = getDayOfYear();
  const index = dayOfYear % tacticalBriefs.length;
  return tacticalBriefs[index];
}

/**
 * Get tactical brief for notification
 */
export function getTacticalBriefNotification(): { title: string; body: string } {
  const brief = getTodaysTacticalBrief();
  return {
    title: `Today's Tactic: ${brief.title}`,
    body: brief.tactic,
  };
}

/**
 * Get all tactical briefs (for premium users to browse)
 */
export function getAllTacticalBriefs(): TacticalBrief[] {
  return [...tacticalBriefs];
}
