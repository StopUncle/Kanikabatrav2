// Rotation Tracker Suggestions
// Pre-defined options and strategic guidance

// Platform options
export const PLATFORMS = [
  { id: 'tinder', label: 'Tinder', icon: 'Flame' },
  { id: 'hinge', label: 'Hinge', icon: 'Heart' },
  { id: 'bumble', label: 'Bumble', icon: 'MessageCircle' },
  { id: 'instagram', label: 'Instagram', icon: 'Instagram' },
  { id: 'irl', label: 'In Real Life', icon: 'Users' },
  { id: 'other', label: 'Other', icon: 'Globe' },
] as const;

// Common red flags to quick-add
export const COMMON_RED_FLAGS = [
  { text: 'Only texts late at night', severity: 2 as const },
  { text: 'Inconsistent communication', severity: 2 as const },
  { text: 'Mentions ex frequently', severity: 2 as const },
  { text: 'Avoids making plans', severity: 2 as const },
  { text: 'Love bombing early', severity: 3 as const },
  { text: 'Gaslighting behavior', severity: 3 as const },
  { text: 'Disrespectful comments', severity: 3 as const },
  { text: 'Hot and cold behavior', severity: 2 as const },
  { text: 'Never asks questions about me', severity: 1 as const },
  { text: 'Only wants to "hang out" at their place', severity: 2 as const },
  { text: 'Still on dating apps while "exclusive"', severity: 3 as const },
  { text: 'Breadcrumbing - sporadic contact', severity: 2 as const },
  { text: 'Future faking - big promises, no action', severity: 2 as const },
  { text: 'Triangulation - mentions other options', severity: 3 as const },
];

// Common green flags to quick-add
export const COMMON_GREEN_FLAGS = [
  { text: 'Consistent communication' },
  { text: 'Makes concrete plans' },
  { text: 'Remembers details I shared' },
  { text: 'Asks meaningful questions' },
  { text: 'Respects my boundaries' },
  { text: 'Follows through on promises' },
  { text: 'Introduces me to friends' },
  { text: 'Makes time for me' },
  { text: 'Open about their life' },
  { text: 'Initiates contact regularly' },
  { text: 'Shows genuine interest' },
  { text: 'Emotionally available' },
];

// Suggested conversation topics to remember
export const TOPIC_SUGGESTIONS = [
  { category: 'Personal', topics: [
    'Their family/siblings',
    'Childhood memories',
    'Best friend stories',
    'Embarrassing moments',
    'Proudest achievements',
  ]},
  { category: 'Interests', topics: [
    'Favorite shows/movies',
    'Music taste',
    'Hobbies they mentioned',
    'Books they like',
    'Sports/fitness',
  ]},
  { category: 'Dreams', topics: [
    'Travel bucket list',
    'Career goals',
    'Dream home/lifestyle',
    'Things on their bucket list',
    'Skills they want to learn',
  ]},
  { category: 'Experiences', topics: [
    'Recent trips',
    'Funny stories',
    'Work drama',
    'Weekend plans',
    'Upcoming events',
  ]},
];

// Status descriptions
export const STATUS_INFO = {
  active: {
    label: 'Active',
    description: 'Currently talking/dating',
    color: '#22C55E',
  },
  on_hold: {
    label: 'On Hold',
    description: 'Paused for now, might revisit',
    color: '#F59E0B',
  },
  archived: {
    label: 'Archived',
    description: 'No longer pursuing',
    color: '#6B7280',
  },
  blocked: {
    label: 'Blocked',
    description: 'Cut off - do not contact',
    color: '#EF4444',
  },
};

// Interest level descriptions
export const INTEREST_LEVELS = [
  { level: 1, label: 'Very Low', description: 'Not really feeling it', color: '#6B7280' },
  { level: 2, label: 'Low', description: 'Meh, keeping options open', color: '#9CA3AF' },
  { level: 3, label: 'Medium', description: 'Interested, seeing where it goes', color: '#F59E0B' },
  { level: 4, label: 'High', description: 'Really into them', color: '#22C55E' },
  { level: 5, label: 'Very High', description: 'Top priority prospect', color: '#C9A961' },
];

// Threat level info
export const THREAT_LEVELS = {
  green: {
    label: 'Safe',
    description: 'Seems genuine and available',
    color: '#22C55E',
  },
  yellow: {
    label: 'Caution',
    description: 'Some concerns, proceed carefully',
    color: '#F59E0B',
  },
  red: {
    label: 'Danger',
    description: 'Major red flags, high risk',
    color: '#EF4444',
  },
};

// Contact event types
export const CONTACT_TYPES = [
  { id: 'text', label: 'Text', icon: 'MessageSquare' },
  { id: 'call', label: 'Call', icon: 'Phone' },
  { id: 'date', label: 'Date', icon: 'Calendar' },
  { id: 'dm', label: 'DM', icon: 'Send' },
  { id: 'other', label: 'Other', icon: 'MoreHorizontal' },
] as const;

// Strategic tips for rotation management
export const ROTATION_TIPS = [
  {
    title: 'Abundance Mindset',
    tip: 'Having multiple options reduces desperation. You negotiate better from a position of strength.',
  },
  {
    title: 'Mirror Energy',
    tip: 'Match their investment level. If they\'re lukewarm, you should be too.',
  },
  {
    title: 'Rotate Attention',
    tip: 'Don\'t put all your energy into one person until they\'ve earned exclusivity.',
  },
  {
    title: 'Track Patterns',
    tip: 'Behavior over time reveals character. One instance is data, multiple is a pattern.',
  },
  {
    title: 'Regular Pruning',
    tip: 'Remove dead weight. If someone\'s not progressing, archive them.',
  },
  {
    title: 'Quality Over Quantity',
    tip: '3-5 quality prospects beats 20 lukewarm ones. Focus your energy.',
  },
];

// Export suggestions for encrypted backup
export const EXPORT_INFO = {
  title: 'Encrypted Export',
  description: 'Export your rotation data with password protection. Only you can decrypt it.',
  warning: 'If you forget your password, the backup cannot be recovered.',
  tips: [
    'Use a strong, unique password',
    'Store the password somewhere safe',
    'Export regularly to prevent data loss',
    'Keep exports in a secure location',
  ],
};
