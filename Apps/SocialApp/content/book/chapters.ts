// Book Chapter Summaries
// The Honeytrap Doctrine - Chapter by Chapter Breakdown

export interface ChapterSummary {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  summary: string;
  keyConcepts: string[];
  coreLessons: string[];
  practicalApplications: string[];
  warningSign?: string;
  tier: 'free' | 'premium' | 'vip';
}

export const bookChapters: ChapterSummary[] = [
  {
    id: 'chapter-1',
    number: 1,
    title: 'The Doctrine of Cold',
    subtitle: 'The Four Pillars of Strategic Detachment',
    summary: 'This foundational chapter introduces the core framework: emotional detachment as a survival mechanism, not cruelty. It establishes that those who operate without emotional interference have an inherent advantage over those guided by feelings. The four pillars - emotional sovereignty, strategic patience, information control, and calculated withdrawal - form the basis for everything that follows.',
    keyConcepts: [
      'Emotional Sovereignty - ruling your feelings rather than being ruled by them',
      'The Cold Calculator - observing without absorbing',
      'Predator vs Prey mindset',
      'The cost of emotional reactivity',
    ],
    coreLessons: [
      'Emotions are data, not directives',
      'Detachment is not absence of feeling but mastery of response',
      'The coldest calculations come from the warmest presentations',
      'Vulnerability is a weapon when deployed strategically',
    ],
    practicalApplications: [
      'Practice the 24-hour response delay on emotional triggers',
      'Document your emotional patterns for a week',
      'Identify your top 3 reactive triggers',
    ],
    tier: 'free',
  },
  {
    id: 'chapter-2',
    number: 2,
    title: 'The Holy Grail Doctrine',
    subtitle: 'The Economics of Attention and Value',
    summary: 'This chapter reframes relationships through an economic lens. Attention is currency, scarcity creates value, and your position depends on supply and demand dynamics. It introduces the concept of manufactured scarcity - how to be the limited resource rather than the eager buyer.',
    keyConcepts: [
      'Attention Economics - treating attention as finite currency',
      'Manufactured Scarcity - artificial limitation as value driver',
      'The Value Perception Gap - worth is assigned, not inherent',
      'Supply/Demand dynamics in relationships',
    ],
    coreLessons: [
      'What\'s abundant is taken for granted',
      'The person with fewer options appears to have more options',
      'Availability kills value faster than flaws',
      'Being needed beats being wanted',
    ],
    practicalApplications: [
      'Audit your current availability to key relationships',
      'Implement strategic unavailability this week',
      'Identify where you\'ve positioned yourself as abundant',
    ],
    tier: 'free',
  },
  {
    id: 'chapter-3',
    number: 3,
    title: 'The Rotation',
    subtitle: 'Strategic Non-Exclusivity and Option Cultivation',
    summary: 'A controversial chapter on maintaining options as leverage and self-protection. Not about deception but about never becoming completely dependent on a single source of validation or connection. The rotation creates genuine abundance that translates to authentic confidence.',
    keyConcepts: [
      'Option Theory - options as psychological insurance',
      'The Desperation Detector - how neediness broadcasts',
      'Abundance Reality vs Abundance Illusion',
      'The Safety of Diversification',
    ],
    coreLessons: [
      'Exclusivity is earned over time, not assumed',
      'Having options doesn\'t mean exercising them',
      'Genuine abundance eliminates desperation signals',
      'Competition creates clarity of intent',
    ],
    practicalApplications: [
      'Build at least 3 independent social circles',
      'Never cancel other plans for new interests',
      'Practice saying "I have plans" without elaboration',
    ],
    warningSign: 'This chapter is descriptive, not prescriptive. Understanding how this works helps you recognize when it\'s being used against you.',
    tier: 'premium',
  },
  {
    id: 'chapter-4',
    number: 4,
    title: 'The Transformation Protocol',
    subtitle: 'Engineering Personal Magnetism',
    summary: 'Moving from theory to physical application, this chapter covers the external signals that communicate status and value. Presence, body language, voice modulation, and the psychology of first impressions. How to become magnetic rather than desperate.',
    keyConcepts: [
      'The Halo Effect - how one trait colors all perceptions',
      'Status Signaling - nonverbal communication of value',
      'Presence Engineering - commanding space and attention',
      'The Magnetism Formula - attraction through subtraction',
    ],
    coreLessons: [
      'Presence is felt before it\'s understood',
      'Slow movements signal status; fast movements signal anxiety',
      'Less enthusiasm often creates more attraction',
      'The energy you project is the energy you attract',
    ],
    practicalApplications: [
      'Record yourself in conversation - analyze pacing',
      'Practice comfortable silence in conversations',
      'Reduce nodding and verbal fillers by 50%',
    ],
    tier: 'premium',
  },
  {
    id: 'chapter-5',
    number: 5,
    title: 'The Predator\'s Gaze',
    subtitle: 'Advanced Weakness Detection',
    summary: 'The art of seeing through social masks. This chapter teaches systematic observation - identifying tells, incongruences, and the wounds people try to hide. The four horsemen of vulnerability (approval-seeking, abandonment fear, validation hunger, and control needs) and how to spot them.',
    keyConcepts: [
      'The Four Horsemen of Vulnerability',
      'Baseline Behavior vs Deviation Signals',
      'The Wound Beneath the Armor',
      'Pattern Recognition in Human Behavior',
    ],
    coreLessons: [
      'Everyone wears a mask; few know their mask has holes',
      'Watch what people protect, not what they project',
      'Insecurities hide behind overcompensation',
      'The best predictor of behavior is past behavior',
    ],
    practicalApplications: [
      'For one week, note what topics make people defensive',
      'Identify the wound behind your own armor',
      'Practice silence after questions to observe full responses',
    ],
    warningSign: 'This knowledge cuts both ways. You\'re learning what predators look for so you can protect these vulnerabilities in yourself.',
    tier: 'vip',
  },
  {
    id: 'chapter-6',
    number: 6,
    title: 'The Architecture of Control',
    subtitle: 'How Psychological Prisons Are Built',
    summary: 'The mechanics of manipulation laid bare: how dependency is engineered, reality is distorted, and isolation is achieved. Understanding the architecture so you can recognize when walls are being built around you.',
    keyConcepts: [
      'Dependency Engineering - creating need',
      'Reality Distortion - controlling the narrative',
      'Isolation Tactics - cutting supply lines',
      'The Boiling Frog - gradual escalation',
    ],
    coreLessons: [
      'Control is built brick by brick, not all at once',
      'Isolation starts as "us against the world"',
      'Reality distortion begins with small reframes',
      'Dependency is created through intermittent reinforcement',
    ],
    practicalApplications: [
      'Map your current dependencies - who controls what',
      'Maintain at least one relationship outside your primary',
      'Document your reality when you feel certain of it',
    ],
    warningSign: 'If you recognize these patterns in your current situation, this chapter may be difficult to read. That discomfort is important data.',
    tier: 'vip',
  },
  {
    id: 'chapter-7',
    number: 7,
    title: 'Advanced Tactical Operations',
    subtitle: 'Digital Warfare and Mask Weaponization',
    summary: 'Modern manipulation has moved online. This chapter covers digital hunting grounds, text game psychology, social media as intelligence gathering, and how the masks we wear can be turned against us.',
    keyConcepts: [
      'Digital Hunting Grounds - where predators operate',
      'Text Game Psychology - the art of digital tension',
      'Social Media Intelligence - what profiles reveal',
      'The Mask Collection - strategic persona deployment',
    ],
    coreLessons: [
      'Every text is a test; respond accordingly',
      'Social media is a curated lie - read between the lines',
      'Digital availability is the new desperation',
      'The best mask is the one that feels like no mask',
    ],
    practicalApplications: [
      'Audit your digital footprint as an outsider would',
      'Implement the 12-hour text delay rule',
      'Identify which mask you wear most often',
    ],
    tier: 'vip',
  },
  {
    id: 'chapter-8',
    number: 8,
    title: 'Family Colonisation',
    subtitle: 'Social Network Infiltration',
    summary: 'How manipulators embed themselves in your support network, turning allies into spies and creating the illusion of universal approval. Understanding this pattern is essential for maintaining independent support structures.',
    keyConcepts: [
      'Network Mapping - identifying key relationships',
      'Alliance Cultivation - turning friends into advocates',
      'The Mutual Friend Gambit - third-party influence',
      'Support Structure Erosion - gradual isolation',
    ],
    coreLessons: [
      'Charm campaigns toward your friends are data points',
      'When everyone loves them, question who\'s feeding the narrative',
      'Your support network is a strategic asset',
      'Healthy partners don\'t need your friends\' votes',
    ],
    practicalApplications: [
      'Notice who your partner cultivates relationships with',
      'Maintain at least one friend they don\'t know well',
      'Trust friends who express concerns even once',
    ],
    tier: 'vip',
  },
  {
    id: 'chapter-9',
    number: 9,
    title: 'The Long Game',
    subtitle: 'Patience as a Weapon',
    summary: 'Most people play checkers; this chapter teaches chess. The long game involves strategic patience, delayed gratification, and understanding that the best moves often look like nothing is happening.',
    keyConcepts: [
      'Strategic Patience - waiting as active choice',
      'Compound Interest of Consistency',
      'The Slow Burn vs The Quick Hit',
      'Timing as Tactical Advantage',
    ],
    coreLessons: [
      'The urgent is rarely important; the important is rarely urgent',
      'Patience isn\'t passive - it\'s strategic positioning',
      'Those who can wait always have the advantage',
      'The long game beats the fast play every time',
    ],
    practicalApplications: [
      'Identify one situation where patience would serve you',
      'Practice delayed response to non-urgent requests',
      'Set one goal with a 12-month timeline',
    ],
    tier: 'premium',
  },
  {
    id: 'chapter-10',
    number: 10,
    title: 'The Beige Protocol',
    subtitle: 'Strategic Exit Methodology',
    summary: 'How to leave without creating enemies. The beige rock strategy - becoming so boring that you\'re released rather than escaped. Protecting your reputation while executing a clean break.',
    keyConcepts: [
      'The Beige Rock Method - strategic boredom',
      'Exit Strategy Architecture - planning the departure',
      'Reputation Protection - leaving without scorching earth',
      'The Clean Break Formula',
    ],
    coreLessons: [
      'The best exits are the ones no one fights',
      'Being boring is a superpower in hostile situations',
      'Never give them ammunition for the narrative war',
      'Your reputation outlasts any single relationship',
    ],
    practicalApplications: [
      'Draft an exit plan for any situation that feels trapped',
      'Practice the beige response: "Okay" "Sure" "Fine"',
      'Secure important documents before they\'re needed',
    ],
    warningSign: 'If you need this chapter right now, take it slowly. Safety first.',
    tier: 'premium',
  },
  {
    id: 'chapter-11',
    number: 11,
    title: 'Case Studies',
    subtitle: 'Real-World Applications',
    summary: 'Theory meets reality through detailed case studies. Anonymous real-world examples of the patterns in action - both successful applications and cautionary tales.',
    keyConcepts: [
      'Pattern Recognition in Practice',
      'Multi-Variable Tactical Analysis',
      'Success Factors and Failure Points',
      'Adaptation to Context',
    ],
    coreLessons: [
      'Theory without application is useless',
      'Every situation has unique variables',
      'Learning from others\' mistakes is cheaper than your own',
      'Patterns repeat but contexts differ',
    ],
    practicalApplications: [
      'Identify which case study resonates with your situation',
      'Analyze a past situation using chapter frameworks',
      'Write your own case study for learning',
    ],
    tier: 'vip',
  },
  {
    id: 'chapter-12',
    number: 12,
    title: 'The Closing Doctrine',
    subtitle: 'Integration and Ethics',
    summary: 'The final chapter addresses integration of these tools into a coherent philosophy. The ethical use of psychological knowledge, the difference between defense and offense, and how to remain human while being strategic.',
    keyConcepts: [
      'Knowledge Integration - building your system',
      'Ethical Boundaries - where power meets principle',
      'Defense vs Offense - knowing which you\'re playing',
      'The Human Element - strategy with soul',
    ],
    coreLessons: [
      'Power without ethics becomes predation',
      'Know these things to protect yourself, not to harm others',
      'The best use of these tools is never needing them',
      'Strength is knowing you could and choosing not to',
    ],
    practicalApplications: [
      'Define your personal ethical boundaries',
      'Identify situations where defense is appropriate',
      'Commit to using knowledge for protection first',
    ],
    tier: 'free',
  },
];

// Get chapter by ID
export function getChapter(chapterId: string): ChapterSummary | null {
  return bookChapters.find(c => c.id === chapterId) || null;
}

// Get chapter by number
export function getChapterByNumber(number: number): ChapterSummary | null {
  return bookChapters.find(c => c.number === number) || null;
}

// Get chapters by tier
export function getChaptersByTier(tier: 'free' | 'premium' | 'vip'): ChapterSummary[] {
  return bookChapters.filter(c => c.tier === tier);
}

// Get available chapters for user tier
export function getAvailableChapters(userTier: 'free' | 'premium' | 'vip'): ChapterSummary[] {
  const tierHierarchy = { free: 0, premium: 1, vip: 2 };
  const userLevel = tierHierarchy[userTier];

  return bookChapters.filter(c => tierHierarchy[c.tier] <= userLevel);
}

// Chapter metadata for UI
export const chapterMetadata = {
  colors: {
    free: '#10B981',     // Green
    premium: '#F59E0B',  // Amber
    vip: '#8B5CF6',      // Purple
  },
  icons: {
    'chapter-1': 'Snowflake',
    'chapter-2': 'Crown',
    'chapter-3': 'Shuffle',
    'chapter-4': 'Sparkles',
    'chapter-5': 'Eye',
    'chapter-6': 'Building2',
    'chapter-7': 'Smartphone',
    'chapter-8': 'Users',
    'chapter-9': 'Clock',
    'chapter-10': 'DoorOpen',
    'chapter-11': 'FileText',
    'chapter-12': 'Scale',
  } as Record<string, string>,
};

// Total chapters available
export const totalChapters = bookChapters.length;

// Chapter completion tracking types (for integration with user progress)
export interface ChapterProgress {
  chapterId: string;
  completed: boolean;
  completedAt?: string;
  notesCount?: number;
}
