export const SITE_CONFIG = {
  name: 'Kanika Batra',
  fullName: 'Kanika Batra-Matheson',
  title: 'The Psychology of Power',
  tagline: 'Stop being the victim. Start being the villain.',
  description: 'Psychology of power expert with 670K+ followers. Author, speaker, and clinically diagnosed sociopath teaching strategic psychology that builds obsession and commands authority.',
  url: process.env.NEXT_PUBLIC_BASE_URL || 'https://kanikarose.com',
  email: 'Kanika@kanikarose.com',
  birthdate: '1995-09-11',
  location: 'Barcelona, Spain',
  nationality: 'Australian',
  birthplace: 'New Zealand',
  credentials: [
    'Miss World Australia Finalist (2018, 2020)',
    'Miss Universe New Zealand Top 10 (2019)',
    'Miss Aura Australia 2022',
    'Miss India Australia Finalist',
    'Clinically Diagnosed ASPD (Age 21)',
  ],
  viralQuotes: [
    'Stop being the victim. Start being the villain.',
    'Everyone plays. Few win. Be the one who wins.',
    'If you have lots of options, you have all the power.',
    'With enough information, I can be anyone\'s soulmate.',
    'Your darkness is not your weakness. It\'s your untapped power.',
  ],
}

export const BOOK_INFO = {
  title: 'Sociopathic Dating Bible',
  subtitle: 'A Cure For Empathy',
  price: 24.99, // SALE PRICE - Limited time
  originalPrice: 34.99, // Original price (crossed out)
  kdpPrice: 9.99, // Amazon KDP version (LIVE)
  kdpLink: 'https://www.amazon.com/dp/B0FWKJLT6F', // Clean Amazon link
  wordCount: '70,000', // Updated word count
  chapters: 15,
  isPresale: false,
  expectedLaunchDate: '2026-02-14T00:00:00-05:00', // Valentine's Day 2026
  description: 'The first dating guide written by a clinically diagnosed sociopath. Learn the cold, strategic methods that create irresistible attraction while others struggle with heartbreak. This isn\'t another "love yourself" manifesto—it\'s a tactical manual for winning at modern romance.',
  features: [
    '15 chapters of strategic dating frameworks',
    'Real case studies from a diagnosed sociopath',
    'Psychological tactics that create obsession',
    'How to build unshakeable confidence and control',
    'The Rotation System for managing multiple interests',
    'Exit strategies that leave them wanting more',
  ],
  premiumBonuses: [
    '15 chapters + 3 bonus chapters to come',
    'Early access',
  ],
}

export const COACHING_PACKAGES = [
  {
    id: 'mind-architecture',
    name: 'Mind Architecture',
    price: 797,
    bundlePrice: 1997,
    duration: '40-60 minutes',
    bundleDuration: '3 sessions',
    sessions: 1,
    bundleSessions: 3,
    description: 'Rebuild your psychological operating system. Access the headspace where fear doesn\'t vote, decisions come fast, and you operate with clarity when others spiral.',
    longDescription: 'There\'s a version of you that doesn\'t flinch. Doesn\'t negotiate with fear. Doesn\'t ask permission from anxiety before acting. You\'ve met them in crisis moments—when everything was on the line and you just moved. This program teaches you to access that headspace on demand. Not through suffering. Through understanding how your mind actually works and rewiring the patterns that keep most people stuck in hesitation.',
    features: [
      'Identify when emotion is hijacking your decisions',
      'The Observer Shift: watch feelings without being owned by them',
      'Decision velocity training—move while others freeze',
      'Pressure inoculation techniques',
      'Kill the replay: end rumination instantly',
      'Custom protocols for your specific triggers',
    ],
    bundleFeatures: [
      'Everything in single session',
      '2x reinforcement sessions to lock in new patterns',
      'Real-scenario practice with feedback',
      '30-day direct access for in-the-moment support',
      'Personal psychological toolkit',
    ],
    popular: false,
  },
  {
    id: 'presence-influence',
    name: 'Presence & Influence',
    price: 997,
    bundlePrice: 2497,
    duration: '60 minutes',
    bundleDuration: '3 sessions',
    sessions: 1,
    bundleSessions: 3,
    description: 'Become the person everyone watches but can\'t read. Master presence that commands respect, read people in minutes, and control any room without saying a word.',
    longDescription: 'High performers don\'t chase attention—they command it. This program teaches you to cultivate the kind of presence that makes people lean in, the situational awareness to read any room in minutes, and the unshakeable frame that earns respect automatically. You\'ll learn to project calm authority while everyone else broadcasts their insecurities.',
    features: [
      'Presence architecture: fill a room without trying',
      'Read anyone in 5 minutes: patterns, tells, motivations',
      'Frame control: never lose your center in any interaction',
      'Strategic silence and when words matter',
      'The unreadable advantage: control what you reveal',
      'High-stakes social calibration',
    ],
    bundleFeatures: [
      'Everything in single session',
      '2x advanced sessions for real-world refinement',
      '60-day direct messaging support',
      'Custom presence development plan',
      'Manipulation detection and countermeasures',
    ],
    popular: true,
  },
  {
    id: 'empire-psychology',
    name: 'Empire Psychology',
    price: 1497,
    bundlePrice: 3997,
    duration: '90 minutes',
    bundleDuration: '3 sessions',
    sessions: 1,
    bundleSessions: 3,
    description: 'Stop reacting to life. Start designing it. Build the psychology, systems, and leverage of someone who creates circumstances instead of responding to them.',
    longDescription: 'Most people are passengers in their own lives—reacting to whatever happens, managed by their environment, controlled by other people\'s agendas. This program is for those ready to operate differently. You\'ll develop the psychology of someone who builds rather than reacts, learn to create systems and leverage that compound, and design a life where you\'re pulling strings—not being pulled by them.',
    features: [
      'High agency psychology: stop waiting, start building',
      'Systems thinking: create leverage, not just effort',
      'Influence architecture: become the node others orbit',
      'Strategic positioning: be where opportunities flow',
      'Criticism immunity: detach outcomes from identity',
      'Long-game thinking: compound advantages over time',
    ],
    bundleFeatures: [
      'Everything in single session',
      '2x strategy sessions for execution refinement',
      '90-day mentorship access',
      'Custom empire blueprint',
      'Network access and strategic introductions',
    ],
    popular: false,
  },
]

export const COACHING_BUNDLE_BENEFITS = [
  'Significant savings vs single sessions',
  'Lock in new patterns with reinforcement sessions',
  'Direct access when you need it most',
  'Custom protocols for your specific situation',
  'Priority scheduling and ongoing support',
]

export const TESTIMONIALS = [
  {
    id: 1,
    text: "She doesn't teach you to play nice—she teaches you to play smart. This book fundamentally changed how I navigate power dynamics in every aspect of my life.",
    author: 'Verified Reader',
    rating: 5,
  },
  {
    id: 2,
    text: "The most honest exploration of sociopathy I've ever encountered. Kanika's insights into human psychology are both terrifying and invaluable.",
    author: 'Psychology Professional',
    rating: 5,
  },
  {
    id: 3,
    text: "Her coaching transformed me from invisible to unforgettable. I finally understand the power games everyone else was playing.",
    author: 'Coaching Client',
    rating: 5,
  },
]

export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/kanikabatra',
  youtube: 'https://www.youtube.com/@KanikaBatra',
  tiktok: 'https://tiktok.com/@ogkanikabatra',
  email: 'mailto:Kanika@kanikarose.com',
}

export const SOCIAL_METRICS = {
  tiktok: {
    handle: '@ogkanikabatra',
    url: 'https://tiktok.com/@ogkanikabatra',
    followers: '238K',
    likes: '5.9M+',
    bio: 'THE Diagnosed Sociopath (ASPD) | Banned @ 500K',
    previousPeak: '500K (account hacked)',
  },
  youtube: {
    handle: '@KanikaBatra',
    url: 'https://www.youtube.com/@KanikaBatra',
    subscribers: '155K',
    totalViews: '31.7M+',
    videos: 251,
    dailyGrowth: '+34 subscribers/day',
  },
  instagram: {
    handle: '@kanikabatra',
    url: 'https://instagram.com/kanikabatra',
    followers: '278K',
    posts: 725,
    engagementRate: '1.59%',
    avgLikes: '3.3K',
    avgComments: 111,
  },
  combined: {
    totalFollowers: '670K+',
    totalViews: '37M+',
    platforms: 3,
  },
}

export const CONTENT_THEMES = [
  {
    name: 'Dark Psychology',
    description: 'Teaching strategic dominance and calculated thinking',
    icon: '🖤',
  },
  {
    name: 'Strategic Psychology',
    description: 'Power dynamics, social strategy, and calculated thinking',
    icon: '♟️',
  },
  {
    name: 'ASPD Education',
    description: 'Understanding Cluster B personality disorders',
    icon: '🧠',
  },
  {
    name: 'Power & Influence',
    description: 'Building authority and strategic positioning',
    icon: '⚔️',
  },
]

export const VIRAL_TOPICS = [
  'What your body language reveals about your power level',
  'What sociopaths think ABOUT YOU during a relationship',
  'How to spot people like me',
  'How CEOs think differently',
  'The psychology behind why you can\'t say no',
  'Emotional detachment techniques',
  'Identifying manipulation tactics',
  'The idealization phase and love bombing',
]

export const FEATURED_VIDEOS = {
  categories: [
    {
      id: 'understanding-aspd',
      title: 'Understanding Sociopathy',
      description: 'Educational content about ASPD and Cluster B personality disorders',
    },
    {
      id: 'dating-strategy',
      title: 'Dating & Relationships',
      description: 'Strategic dating advice from a sociopathic perspective',
    },
    {
      id: 'dark-psychology',
      title: 'Dark Psychology',
      description: 'Empowerment content for those who refuse to be victims',
    },
    {
      id: 'manipulation',
      title: 'Manipulation Tactics',
      description: 'How to spot and defend against psychological manipulation',
    },
  ],
  videos: [
    {
      id: 'R-SsbAUdgKk',
      title: "It's Your Fault The Narcissist Cheated",
      description: 'Why you shouldn\'t blame yourself for getting manipulated',
      views: '500K+',
      category: 'manipulation',
      duration: '12:34',
    },
    {
      id: 'interview-sociopath',
      title: 'Interview with a Sociopath',
      description: 'The viral video that started it all - 269K+ views',
      views: '269K+',
      category: 'understanding-aspd',
      duration: '15:00',
    },
    {
      id: 'love-bombing',
      title: 'The Love Bombing Phase Explained',
      description: 'How we create obsession through calculated affection',
      views: '1.2M+',
      category: 'dating-strategy',
      duration: '10:45',
    },
    {
      id: 'spot-sociopath',
      title: 'How to Spot People Like Me',
      description: 'Warning signs you\'re dealing with a sociopath',
      views: '800K+',
      category: 'understanding-aspd',
      duration: '14:20',
    },
    {
      id: 'win-crush',
      title: 'Sociopathic Ways to Win Your Crush',
      description: 'Strategic attraction techniques that actually work',
      views: '2.1M+',
      category: 'dating-strategy',
      duration: '11:15',
    },
    {
      id: 'relationship-thoughts',
      title: 'What Sociopaths Think About YOU',
      description: 'Inside the mind of someone who sees you strategically',
      views: '1.8M+',
      category: 'manipulation',
      duration: '13:00',
    },
    {
      id: 'work-pros-cons',
      title: 'Pros and Cons of Being a Sociopath at Work',
      description: 'How ASPD affects professional life and career success',
      views: '600K+',
      category: 'understanding-aspd',
      duration: '16:30',
    },
    {
      id: 'dark-psychology-intro',
      title: 'What is Dark Psychology?',
      description: 'Embracing your shadow side for power and control',
      views: '1.5M+',
      category: 'dark-psychology',
      duration: '12:00',
    },
  ],
}

export const PAYPAL_CONFIG = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'not-configured',
  currency: 'USD',
  intent: 'capture' as const,
}

export const ANIMATION_CONFIG = {
  levitate: {
    duration: 8,
    ease: 'easeInOut',
    repeat: Infinity,
  },
  aurora: {
    duration: 15,
    ease: 'easeInOut',
    repeat: Infinity,
  },
  gradient: {
    duration: 5,
    ease: 'linear',
    repeat: Infinity,
  },
  fadeIn: {
    duration: 0.6,
    ease: 'easeOut',
  },
}