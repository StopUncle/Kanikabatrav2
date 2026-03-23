export const SITE_CONFIG = {
  name: "Kanika Batra",
  fullName: "Kanika Batra-Matheson",
  title: "The Psychology of Power",
  tagline: "The psychology they don't teach you.",
  description:
    "Psychology of power expert with 670K+ followers. Author, speaker, and clinically diagnosed sociopath teaching strategic psychology that builds obsession and commands authority.",
  url: process.env.NEXT_PUBLIC_BASE_URL || "https://kanikarose.com",
  email: "Kanika@kanikarose.com",
  birthdate: "1995-09-11",
  location: "Barcelona, Spain",
  nationality: "Australian",
  birthplace: "New Zealand",
  credentials: [
    "Miss World Australia Finalist (2018, 2020)",
    "Miss Universe New Zealand Top 10 (2019)",
    "Miss Aura Australia 2022",
    "Miss India Australia Finalist",
    "Clinically Diagnosed ASPD (Age 21)",
  ],
  viralQuotes: [
    "I stopped chasing. Now they chase me. The book showed me how.",
    "Everyone's playing a game. Most people just don't know the rules.",
    "I read people before they finish their first sentence.",
    "The one who cares less has all the power. Learn to care strategically.",
    "I used to overthink every text. Now I control the conversation.",
  ],
};

export const BOOK_INFO = {
  title: "Sociopathic Dating Bible",
  subtitle: "A Cure For Empathy",
  price: 24.99, // SALE PRICE - Limited time
  originalPrice: 34.99, // Original price (crossed out)
  kdpPrice: 9.99, // Amazon KDP version (LIVE)
  kdpLink: "https://www.amazon.com/dp/B0FWKJLT6F", // Clean Amazon link
  wordCount: "70,000", // Updated word count
  chapters: 17,
  isPresale: false,
  expectedLaunchDate: "2026-02-14T00:00:00-05:00", // Valentine's Day 2026
  description:
    "You've been playing by rules that were designed to make you lose. While you're agonizing over a text, the person across from you is following a playbook you've never seen. This is that playbook — written by a clinically diagnosed sociopath who sees the game for what it actually is.",
  features: [
    "Stop being the one who cares more — in every relationship, forever",
    "Know exactly what someone wants before they say a word",
    "Never sit by the phone wondering why they haven't texted back",
    "Walk away so cleanly they spend months wondering what they lost",
    "Turn 'Why does this keep happening to me?' into 'I saw that coming'",
    "Build the kind of confidence that makes people obsess over you",
  ],
  premiumBonuses: [
    { name: "The Full Playbook", desc: "15 chapters of strategic frameworks that rewire how you date", value: 24.99 },
    { name: "Bonus: Understanding Narcissists", desc: "How to spot, disarm, and outplay the people who drain you", value: 29 },
    { name: "Bonus: The Avoidant Playbook", desc: "Why they pull away — and exactly how to make it stop", value: 29 },
    { name: "Exclusive Addendum", desc: "Advanced strategies too raw for Amazon's guidelines", value: 19 },
  ],
};

export const COACHING_PACKAGES = [
  {
    id: "the-read",
    name: "The Read",
    price: 247,
    bundlePrice: 247,
    duration: "30 minutes",
    bundleDuration: "30 minutes",
    sessions: 1,
    bundleSessions: 1,
    badge: "Start Here",
    description:
      "You bring me one situation — a person, a relationship, a dynamic at work. I tell you exactly what's happening and what I'd do.",
    longDescription:
      "One situation. One call. I tell you what I see — the pattern, the dynamic, the thing everyone else is too polite to point out. You leave with clarity and a move.",
    features: [
      "30-minute 1:1 video call",
      "Bring one situation, person, or dynamic",
      "Direct read — no softening, no filtering",
      "Walk away with a concrete next move",
    ],
    bundleFeatures: [],
    popular: false,
    hasBundle: false,
    ctaLabel: "Book The Read",
  },
  {
    id: "pattern-reset",
    name: "Pattern Reset",
    price: 897,
    bundlePrice: 2297,
    duration: "60 minutes",
    bundleDuration: "3 sessions",
    sessions: 1,
    bundleSessions: 3,
    badge: "Most Popular",
    description:
      "For when it's not just one situation — it's a pattern. We find the root, map it, and break it.",
    longDescription:
      "You keep ending up in the same place with different people. That's not bad luck — that's a pattern. We find it, map it, and break it so you stop repeating the cycle.",
    features: [
      "60-minute 1:1 video call",
      "Deep pattern identification across relationships",
      "Root cause analysis — not surface-level advice",
      "Custom strategy to break the cycle",
    ],
    bundleFeatures: [
      "Everything in single session",
      "2 additional 60-minute sessions",
      "Track progress and refine between sessions",
      "Priority scheduling",
    ],
    popular: true,
    hasBundle: true,
    ctaLabel: "Book Pattern Reset",
  },
  {
    id: "private-retainer",
    name: "Private Retainer",
    price: 4997,
    bundlePrice: 4997,
    duration: "3 × 90 minutes + async access",
    bundleDuration: "3 × 90 minutes + async access",
    sessions: 3,
    bundleSessions: 3,
    badge: "Limited Availability",
    description:
      "Before the date. Before the negotiation. Before the difficult conversation. You send me the situation, I send you the read — in real time.",
    longDescription:
      "Three 90-minute sessions plus 30 days of direct voice note access between sessions. When you're about to walk into something — a date, a meeting, a confrontation — you send me the context, I send you the read. In real time.",
    features: [
      "Three 90-minute intensive sessions",
      "30 days of direct voice note access between sessions",
      "Real-time reads before critical moments",
      "The closest thing to having a sociopath on retainer",
    ],
    bundleFeatures: [],
    popular: false,
    hasBundle: false,
    ctaLabel: "Apply for Retainer",
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    text: "She doesn't teach you to play nice—she teaches you to play smart. This book fundamentally changed how I navigate power dynamics in every aspect of my life.",
    author: "Verified Reader",
    rating: 5,
  },
  {
    id: 2,
    text: "The most honest exploration of sociopathy I've ever encountered. Kanika's insights into human psychology are both terrifying and invaluable.",
    author: "Psychology Professional",
    rating: 5,
  },
  {
    id: 3,
    text: "Her coaching transformed me from invisible to unforgettable. I finally understand the power games everyone else was playing.",
    author: "Coaching Client",
    rating: 5,
  },
];

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/kanikabatra",
  youtube: "https://www.youtube.com/@KanikaBatra",
  tiktok: "https://tiktok.com/@ogkanikabatra",
  email: "mailto:Kanika@kanikarose.com",
};

export const SOCIAL_METRICS = {
  tiktok: {
    handle: "@ogkanikabatra",
    url: "https://tiktok.com/@ogkanikabatra",
    followers: "238K",
    likes: "5.9M+",
    bio: "THE Diagnosed Sociopath (ASPD) | Banned @ 500K",
    previousPeak: "500K (account hacked)",
  },
  youtube: {
    handle: "@KanikaBatra",
    url: "https://www.youtube.com/@KanikaBatra",
    subscribers: "155K",
    totalViews: "31.7M+",
    videos: 251,
    dailyGrowth: "+34 subscribers/day",
  },
  instagram: {
    handle: "@kanikabatra",
    url: "https://instagram.com/kanikabatra",
    followers: "278K",
    posts: 725,
    engagementRate: "1.59%",
    avgLikes: "3.3K",
    avgComments: 111,
  },
  combined: {
    totalFollowers: "670K+",
    totalViews: "37M+",
    platforms: 3,
  },
};

export const CONTENT_THEMES = [
  {
    name: "Dark Psychology",
    description: "Teaching strategic dominance and calculated thinking",
    icon: "🖤",
  },
  {
    name: "Strategic Psychology",
    description: "Power dynamics, social strategy, and calculated thinking",
    icon: "♟️",
  },
  {
    name: "ASPD Education",
    description: "Understanding Cluster B personality disorders",
    icon: "🧠",
  },
  {
    name: "Power & Influence",
    description: "Building authority and strategic positioning",
    icon: "⚔️",
  },
];

export const VIRAL_TOPICS = [
  "What your body language reveals about your power level",
  "What sociopaths think ABOUT YOU during a relationship",
  "How to spot people like me",
  "How CEOs think differently",
  "The psychology behind why you can't say no",
  "Emotional detachment techniques",
  "Identifying manipulation tactics",
  "The idealization phase and love bombing",
];

export const FEATURED_VIDEOS = {
  categories: [
    {
      id: "understanding-aspd",
      title: "Understanding Sociopathy",
      description:
        "Educational content about ASPD and Cluster B personality disorders",
    },
    {
      id: "dating-strategy",
      title: "Dating & Relationships",
      description: "Strategic dating advice from a sociopathic perspective",
    },
    {
      id: "dark-psychology",
      title: "Dark Psychology",
      description: "Empowerment content for those who refuse to be victims",
    },
    {
      id: "manipulation",
      title: "Manipulation Tactics",
      description: "How to spot and defend against psychological manipulation",
    },
  ],
  videos: [
    {
      id: "R-SsbAUdgKk",
      title: "It's Your Fault The Narcissist Cheated",
      description: "Why you shouldn't blame yourself for getting manipulated",
      views: "500K+",
      category: "manipulation",
      duration: "12:34",
    },
    {
      id: "interview-sociopath",
      title: "Interview with a Sociopath",
      description: "The viral video that started it all - 269K+ views",
      views: "269K+",
      category: "understanding-aspd",
      duration: "15:00",
    },
    {
      id: "love-bombing",
      title: "The Love Bombing Phase Explained",
      description: "How we create obsession through calculated affection",
      views: "1.2M+",
      category: "dating-strategy",
      duration: "10:45",
    },
    {
      id: "spot-sociopath",
      title: "How to Spot People Like Me",
      description: "Warning signs you're dealing with a sociopath",
      views: "800K+",
      category: "understanding-aspd",
      duration: "14:20",
    },
    {
      id: "win-crush",
      title: "Sociopathic Ways to Win Your Crush",
      description: "Strategic attraction techniques that actually work",
      views: "2.1M+",
      category: "dating-strategy",
      duration: "11:15",
    },
    {
      id: "relationship-thoughts",
      title: "What Sociopaths Think About YOU",
      description: "Inside the mind of someone who sees you strategically",
      views: "1.8M+",
      category: "manipulation",
      duration: "13:00",
    },
    {
      id: "work-pros-cons",
      title: "Pros and Cons of Being a Sociopath at Work",
      description: "How ASPD affects professional life and career success",
      views: "600K+",
      category: "understanding-aspd",
      duration: "16:30",
    },
    {
      id: "dark-psychology-intro",
      title: "What is Dark Psychology?",
      description: "Embracing your shadow side for power and control",
      views: "1.5M+",
      category: "dark-psychology",
      duration: "12:00",
    },
  ],
};

export const ASK_KANIKA_PACKAGES = [
  {
    id: "written-1",
    format: "written" as const,
    label: "Written Answer",
    description: "1 Question",
    questions: 1,
    price: 39.99,
  },
  {
    id: "written-3",
    format: "written" as const,
    label: "Written Answer",
    description: "3 Questions",
    questions: 3,
    price: 99,
  },
  {
    id: "voice-1",
    format: "voice" as const,
    label: "Voice Answer",
    description: "1 Question",
    questions: 1,
    price: 59.99,
  },
  {
    id: "voice-3",
    format: "voice" as const,
    label: "Voice Answer",
    description: "3 Questions",
    questions: 3,
    price: 129,
  },
];

export const PAYPAL_CONFIG = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "not-configured",
  currency: "USD",
  intent: "capture" as const,
};

export const ANIMATION_CONFIG = {
  levitate: {
    duration: 8,
    ease: "easeInOut",
    repeat: Infinity,
  },
  aurora: {
    duration: 15,
    ease: "easeInOut",
    repeat: Infinity,
  },
  gradient: {
    duration: 5,
    ease: "linear",
    repeat: Infinity,
  },
  fadeIn: {
    duration: 0.6,
    ease: "easeOut",
  },
};
