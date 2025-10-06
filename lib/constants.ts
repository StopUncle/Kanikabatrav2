export const SITE_CONFIG = {
  name: 'Kanika Batra',
  title: 'The Beautiful Sociopath',
  description: 'Diagnosed sociopath, beauty queen, and dark psychology expert',
  url: process.env.NEXT_PUBLIC_BASE_URL || 'https://kanikabatra.com',
  email: 'Kanika@kanikarose.com',
}

export const BOOK_INFO = {
  title: 'Sociopathic Dating Bible',
  subtitle: 'A Cure For Empathy',
  price: 34.99, // Premium website version
  kdpPrice: 17.99, // Amazon KDP version
  wordCount: '70,000', // Updated word count
  chapters: 15,
  isPresale: true,
  expectedLaunchDate: '2025-10-07T08:00:00-04:00', // October 7, 2025 8am EDT (10pm AEST)
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
    'Exclusive bonus chapter: Advanced Dark Triad Tactics',
    'Video masterclass: Reading Micro-expressions',
    'Email templates for psychological warfare',
    '30-min consultation discount ($100 value)',
  ],
}

export const COACHING_PACKAGES = [
  {
    id: 'mind-architecture',
    name: 'Mind Architecture',
    price: 297,
    bundlePrice: 797,
    duration: '40 minutes',
    bundleDuration: '3 sessions',
    sessions: 1,
    bundleSessions: 3,
    description: 'Rebuild your psychological framework. Learn to think like a sociopath, read people instantly, and control any social dynamic.',
    longDescription: 'This intensive psychological reconstruction program dismantles your existing mental framework and rebuilds it from the ground up. You\'ll learn to process information without emotional interference, identify manipulation tactics instantly, and develop the cold analytical thinking that gives sociopaths their edge in every interaction.',
    features: [
      'Complete psychological profile and assessment',
      'Dark triad personality optimization techniques',
      'Advanced manipulation detection and deflection',
      'Power dynamics mastery and control strategies',
      'Custom psychological strategies for your goals',
      'Emotional detachment training protocols',
    ],
    bundleFeatures: [
      'Everything in single session',
      'Follow-up reinforcement sessions (2x)',
      'Personalized practice scenarios',
      'Direct messaging support for 30 days',
      'Custom psychological toolkit creation',
    ],
    popular: false,
  },
  {
    id: 'dark-feminine',
    name: 'Dark Feminine Mastery',
    price: 447,
    bundlePrice: 1197,
    duration: '60 minutes',
    bundleDuration: '3 sessions',
    sessions: 1,
    bundleSessions: 3,
    description: 'Become the woman who haunts their thoughts. Master seduction, create obsession, and wield your femininity as a weapon.',
    longDescription: 'Transform into the femme fatale who commands attention and devotion without effort. This program teaches you to weaponize your femininity, create magnetic attraction, and build the kind of dangerous allure that makes people obsess over you while you remain completely in control.',
    features: [
      'Complete feminine archetype reconstruction',
      'Advanced seduction psychology and techniques',
      'Charisma and magnetic presence amplification',
      'Emotional detachment and manipulation immunity',
      'Strategic relationship architecture and control',
      'Dark feminine energy cultivation and projection',
      'Obsession creation and maintenance strategies',
    ],
    bundleFeatures: [
      'Everything in single session',
      'Advanced technique refinement (2 sessions)',
      'Real-world scenario practice and feedback',
      '60-day direct messaging support',
      'Custom dark feminine persona development',
      'Exclusive manipulation countermeasure training',
    ],
    popular: true,
  },
  {
    id: 'empire-building',
    name: 'Empire Building',
    price: 597,
    bundlePrice: 1597,
    duration: '90 minutes',
    bundleDuration: '3 sessions',
    sessions: 1,
    bundleSessions: 3,
    description: 'Transform controversy into currency. Build a personal brand that thrives on your darkness and converts haters into followers.',
    longDescription: 'Learn the art of turning your darkness into profit. This program reveals how to build a magnetic personal brand that thrives on controversy, converts critics into customers, and creates a devoted following that will defend and support you no matter what. Perfect for entrepreneurs ready to embrace their shadow side.',
    features: [
      'Viral psychology and content strategy development',
      'Advanced controversy monetization techniques',
      'Cult-like following development and maintenance',
      'Dark personal brand architecture and positioning',
      'Social media domination and algorithm manipulation',
      'Hater conversion and criticism immunity strategies',
      'Revenue generation from controversy and chaos',
    ],
    bundleFeatures: [
      'Everything in single session',
      'Brand strategy refinement sessions (2x)',
      'Content calendar and strategy development',
      '90-day business mentoring support',
      'Custom brand voice and messaging guide',
      'Exclusive network access and partnerships',
    ],
    popular: false,
  },
]

export const COACHING_BUNDLE_BENEFITS = [
  'Save $300+ vs individual sessions',
  'Deeper transformation with follow-up sessions',
  'Direct messaging support included',
  'Custom materials and resources',
  'Priority scheduling and support',
]

export const TESTIMONIALS = [
  {
    id: 1,
    text: "She doesn't teach you to hide your darkness—she teaches you to weaponize it. This book fundamentally changed how I navigate power dynamics in every aspect of my life.",
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