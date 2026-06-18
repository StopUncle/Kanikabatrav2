export const SITE_CONFIG = {
  name: "Kanika Batra",
  fullName: "Kanika Batra-Matheson",
  title: "The Psychology of Power",
  tagline: "The psychology they don't teach you.",
  description:
    "Psychology of power expert with 670K+ followers. Author, speaker, and clinically diagnosed sociopath teaching strategic psychology that builds obsession and commands authority.",
  url: process.env.NEXT_PUBLIC_BASE_URL || "https://kanikarose.com",
  email: "Kanika@kanikarose.com",
  location: "Barcelona, Spain",
  nationality: "Australian",
  birthplace: "New Zealand",
  credentials: [
    "Miss World Australia Finalist (2018, 2020)",
    "Miss Universe New Zealand Top 10 (2019)",
    "Miss Aura Australia 2022",
    "Miss India Australia Finalist",
    "Clinically Diagnosed with ASPD",
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
    "Learn dark psychology and the inner workings of manipulation from a clinically diagnosed sociopath. Never feel helpless or vulnerable again. This is the playbook you were never meant to see — the one being used on you right now.",
  features: [
    "Understand how manipulation actually works — so nobody can use it on you",
    "Learn dark psychology tactics used in dating, work, and everyday life",
    "Know exactly what someone wants before they say a word",
    "Never feel helpless or vulnerable in a relationship again",
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
    id: "single-session",
    name: "Single Session",
    price: 297,
    bundlePrice: 297,
    duration: "40 minutes",
    bundleDuration: "40 minutes",
    sessions: 1,
    bundleSessions: 1,
    badge: null,
    description:
      "One 40-minute call. You bring the problem, you leave with clarity. Includes the Sociopathic Dating Bible.",
    longDescription:
      "One call. You bring what's keeping you up at night — a relationship, a decision, a pattern you can't break. I tell you what I see and what I'd do. No fluff. You leave with clarity.",
    features: [
      "40-minute 1:1 video call",
      "Bring any situation — personal, professional, or both",
      "No softening, no filtering",
      "Includes the Sociopathic Dating Bible",
    ],
    bundleFeatures: [],
    popular: false,
    hasBundle: false,
    ctaLabel: "Book a Session",
  },
  {
    id: "clarity",
    name: "Clarity Pack",
    price: 497,
    bundlePrice: 497,
    duration: "2 sessions over 2 weeks",
    bundleDuration: "2 sessions over 2 weeks",
    sessions: 2,
    bundleSessions: 2,
    badge: null,
    description:
      "Two calls, two weeks apart. One to unpack the pattern, one to apply the fix. For when a single session isn't enough and a full intensive is more than you need.",
    longDescription:
      "Two 50-minute sessions spaced two weeks apart. The first call diagnoses what's actually going on — the pattern you keep falling into, the conversation that keeps going sideways. You leave with a specific move. The second call is the debrief: what happened when you tried it, what to do differently. Includes the Sociopathic Dating Bible.",
    features: [
      "2 × 50-minute 1:1 video calls",
      "Diagnose the pattern + test a fix",
      "Two weeks of space between calls to apply what we discuss",
      "Voice note follow-up between sessions",
      "Includes the Sociopathic Dating Bible",
    ],
    bundleFeatures: [],
    popular: false,
    hasBundle: false,
    ctaLabel: "Book Clarity Pack",
  },
  {
    id: "intensive",
    name: "Intensive",
    price: 1497,
    bundlePrice: 1497,
    duration: "3 sessions over 4 weeks",
    bundleDuration: "3 sessions over 4 weeks",
    sessions: 3,
    bundleSessions: 3,
    badge: "Most Popular",
    description:
      "Deep work on the patterns running your life — anxiety, people-pleasing, emotional dependency. Each session builds on the last.",
    longDescription:
      "Three sessions over four weeks. We go deep on the patterns that keep you stuck — the anxiety, the people-pleasing, the emotional dependency. Each session builds on the last. You don't just understand what's wrong — you change it.",
    features: [
      "3 × 60-minute sessions over 4 weeks",
      "Break anxiety, depression, and people-pleasing patterns",
      "Dark psychology tactics applied to your real life",
      "Each session builds on the last",
      "Includes the Sociopathic Dating Bible",
    ],
    bundleFeatures: [],
    popular: true,
    hasBundle: false,
    ctaLabel: "Book Intensive",
  },
  {
    id: "career",
    name: "Career",
    price: 2997,
    bundlePrice: 2997,
    duration: "4 weekly sessions + voice note support",
    bundleDuration: "4 weekly sessions + voice note support",
    sessions: 4,
    bundleSessions: 4,
    badge: null,
    description:
      "For professionals who want the promotion, the raise, or the better offer. Positioning, negotiation, office politics, interview psychology.",
    longDescription:
      "Four weekly sessions plus voice note support between calls. We work on how you position yourself at work — the negotiation, the office politics, the resume, the interview psychology. The dark psychology of getting ahead.",
    features: [
      "4 × 60-minute weekly sessions",
      "Voice note support between sessions",
      "Negotiation, positioning, and office politics",
      "Resume and interview psychology",
      "Includes the Sociopathic Dating Bible",
    ],
    bundleFeatures: [],
    popular: false,
    hasBundle: false,
    ctaLabel: "Book Career",
  },
  {
    id: "retainer",
    name: "Retainer",
    price: 4997,
    bundlePrice: 4997,
    duration: "Weekly sessions + direct voice note access",
    bundleDuration: "Weekly sessions + direct voice note access",
    sessions: 4,
    bundleSessions: 4,
    badge: "Limited",
    description:
      "Weekly 60-minute calls plus direct voice note access. The full picture — every situation, every decision, covered.",
    longDescription:
      "Weekly sessions plus direct voice note access between calls. Everything in your life gets covered — relationships, career, family, the difficult conversations. Ongoing, for as long as you need it.",
    features: [
      "Weekly 60-minute calls",
      "Direct voice note access between sessions",
      "Covers everything — personal, professional, family",
      "Ongoing — for as long as you need it",
      "Includes the Sociopathic Dating Bible",
    ],
    bundleFeatures: [],
    popular: false,
    hasBundle: false,
    ctaLabel: "Apply",
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

export interface FeaturedVideo {
  id: string;
  title: string;
  description: string;
  views: string;
  category: string;
  // Optional fields are only populated when verified. duration and uploadDate
  // are omitted rather than guessed, so the sitemap never emits fabricated data.
  duration?: string;
  uploadDate?: string;
}

export const FEATURED_VIDEOS: {
  categories: { id: string; title: string; description: string }[];
  videos: FeaturedVideo[];
} = {
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
      id: "0LauT7jWlQg",
      title: "Sociopath Reacts to Dr. Ramani",
      description:
        "A diagnosed sociopath responds to the internet's best-known narcissism expert.",
      views: "380K",
      category: "manipulation",
    },
    {
      id: "WMYnt78tmVU",
      title: "Interview With a Sociopath: How It Relates to Me",
      description: "The reaction video that broke her into the mainstream.",
      views: "352K",
      category: "understanding-aspd",
      uploadDate: "2021-11-23",
    },
    {
      id: "Zz5CX5q2osU",
      title: "How to Control and Destroy a Narcissist",
      description: "A diagnosed sociopath on out-maneuvering a narcissist.",
      views: "324K",
      category: "manipulation",
    },
    {
      id: "4nufVvvtfs4",
      title: "The Most Bizarre Thoughts I Have as a Sociopath",
      description: "An unfiltered look inside an ASPD mind.",
      views: "137K",
      category: "understanding-aspd",
    },
    {
      id: "y_E96c1DGYg",
      title: "A Sociopath's Secrets on Seduction",
      description: "Strategic attraction from someone who feels none of it.",
      views: "117K",
      category: "dating-strategy",
    },
    {
      id: "WihdqUhH-HQ",
      title: "7 Reasons Sociopaths Hurt You",
      description: "Storytime on why the damage happens, from the other side.",
      views: "111K",
      category: "dating-strategy",
    },
    {
      id: "YZOOhB7rf4M",
      title: "Sociopath Answers Unhinged Questions",
      description: "The questions people only dare ask anonymously.",
      views: "99K",
      category: "understanding-aspd",
    },
    {
      id: "PZLwUoy5-DA",
      title: "How I Manipulate People",
      description: "A diagnosed sociopath breaks down her own playbook.",
      views: "96K",
      category: "dark-psychology",
    },
    {
      id: "RDUkXAzACYc",
      title: "Low vs High Functioning Sociopaths",
      description: "The difference between the two presentations of ASPD.",
      views: "68K",
      category: "understanding-aspd",
    },
    {
      id: "FVHRb9aE7R4",
      title: "How to Win Your Crush",
      description: "Sociopathic attraction tactics that actually work.",
      views: "49K",
      category: "dating-strategy",
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
