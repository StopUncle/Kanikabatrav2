/**
 * App-wide constants
 */

// Deep link scheme
export const DEEP_LINK_SCHEME = 'darkmirror://';

// Deep link paths
export const DEEP_LINKS = {
  resetPassword: `${DEEP_LINK_SCHEME}reset-password`,
  paymentSuccess: `${DEEP_LINK_SCHEME}payment/success`,
  paymentCancel: `${DEEP_LINK_SCHEME}payment/cancel`,
  subscriptionSuccess: `${DEEP_LINK_SCHEME}subscription/success`,
  subscriptionCancel: `${DEEP_LINK_SCHEME}subscription/cancel`,
  quizPurchaseSuccess: `${DEEP_LINK_SCHEME}payment/quiz-success`,
  quizPurchaseCancel: `${DEEP_LINK_SCHEME}payment/quiz-cancel`,
  bookingSuccess: `${DEEP_LINK_SCHEME}booking/success`,
  bookPurchaseSuccess: `${DEEP_LINK_SCHEME}book/success`,
  bookPurchaseCancel: `${DEEP_LINK_SCHEME}book/cancel`,
} as const;

// Timing constants (in milliseconds)
export const TIMINGS = {
  // Polling intervals
  emailVerificationPoll: 3000,

  // Auto-hide delays
  videoControlsHide: 3000,
  copiedFeedbackDuration: 2000,

  // Auto-save intervals
  videoProgressAutoSave: 10000,

  // Modal delays
  emailCaptureModalDelay: 2000,

  // Animation durations
  glowAnimationDuration: 2000,

  // Debounce/throttle
  searchDebounce: 300,
  typingThrottle: 300,
} as const;

// App branding
export const APP_NAME = 'The Dark Mirror';
export const APP_TAGLINE = 'See Yourself Clearly';

// API timeouts
export const API_TIMEOUT = 30000;

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const ACTIVITY_FEED_LIMIT = 5;

// Book Info - Sociopathic Dating Bible
export const BOOK_INFO = {
  title: 'Sociopathic Dating Bible',
  subtitle: 'A Cure For Empathy',
  amazonPrice: 9.99,
  premiumPrice: 24.99,
  amazonLink: 'https://www.amazon.com/dp/B0FWKJLT6F',
  premiumBonusMonths: 1,
  description: 'The complete guide that powers all our courses. 15 chapters of strategic dating frameworks from a clinically diagnosed sociopath.',
  features: [
    '15 chapters of strategic dating frameworks',
    'Real case studies from a diagnosed sociopath',
    'Psychological tactics that create obsession',
    'The Rotation System for managing multiple interests',
  ],
} as const;
