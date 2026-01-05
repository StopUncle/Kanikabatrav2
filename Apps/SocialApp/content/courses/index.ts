// Course Content Index
// All course content organized by tier

import { darkPsychology101 } from './dark-psychology-101';
import { transformationProtocol } from './transformation-protocol';
import { artOfInfluence } from './art-of-influence';
import { predatorsGaze } from './predators-gaze';
import { advancedPowerDynamics } from './advanced-power-dynamics';
import { empressEndgame } from './empress-endgame';
import { emotionalArmor } from './emotional-armor';
import { readingBetweenLines } from './reading-between-lines';
import { advancedTactics } from './advanced-tactics';

// Export types from one source only (avoid duplicates)
export type { Lesson, LessonContent, Exercise, Quiz, QuizQuestion } from './dark-psychology-101';

// Export course content
export { darkPsychology101 } from './dark-psychology-101';
export { transformationProtocol } from './transformation-protocol';
export { artOfInfluence } from './art-of-influence';
export { predatorsGaze } from './predators-gaze';
export { advancedPowerDynamics } from './advanced-power-dynamics';
export { empressEndgame } from './empress-endgame';
export { emotionalArmor } from './emotional-armor';
export { readingBetweenLines } from './reading-between-lines';
export { advancedTactics } from './advanced-tactics';

// Course Registry
export const courses = {
  'dark-psychology-101': darkPsychology101,
  'transformation-protocol': transformationProtocol,
  'art-of-influence': artOfInfluence,
  'predators-gaze': predatorsGaze,
  'advanced-power-dynamics': advancedPowerDynamics,
  'empress-endgame': empressEndgame,
  'emotional-armor': emotionalArmor,
  'reading-between-lines': readingBetweenLines,
  'advanced-tactics': advancedTactics,
} as const;

export type CourseId = keyof typeof courses;

// Get courses by tier
export function getCoursesByTier(tier: 'free' | 'premium' | 'vip') {
  return Object.values(courses).filter((course) => course.tier === tier);
}

// Get all courses available to a user based on their tier
export function getAvailableCourses(userTier: 'free' | 'premium' | 'vip') {
  const tierHierarchy = { free: 0, premium: 1, vip: 2 };
  const userLevel = tierHierarchy[userTier];

  return Object.values(courses).filter((course) => {
    const courseLevel = tierHierarchy[course.tier];
    return courseLevel <= userLevel;
  });
}

// Get a specific course by ID
export function getCourse(courseId: string) {
  return courses[courseId as CourseId] || null;
}

// Get total lesson count for a course
export function getLessonCount(courseId: string): number {
  const course = getCourse(courseId);
  return course?.lessons.length || 0;
}

// Get estimated total duration for a course
export function getCourseDuration(courseId: string): string {
  const course = getCourse(courseId);
  if (!course) return '0 min';

  let totalMinutes = 0;
  for (const lesson of course.lessons) {
    const match = lesson.duration.match(/(\d+)/);
    if (match) {
      totalMinutes += parseInt(match[1], 10);
    }
  }

  if (totalMinutes >= 60) {
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  }
  return `${totalMinutes} min`;
}

// Course metadata for UI display
export const courseMetadata = {
  'dark-psychology-101': {
    icon: 'Brain',
    color: '#8B5CF6',
    tag: 'Fundamentals',
  },
  'transformation-protocol': {
    icon: 'Sparkles',
    color: '#C9A961',
    tag: 'Evolution',
  },
  'art-of-influence': {
    icon: 'Users',
    color: '#F59E0B',
    tag: 'Persuasion',
  },
  'predators-gaze': {
    icon: 'Eye',
    color: '#DC2626',
    tag: 'Detection',
  },
  'advanced-power-dynamics': {
    icon: 'Crown',
    color: '#7C3AED',
    tag: 'Domination',
  },
  'empress-endgame': {
    icon: 'Gem',
    color: '#C9A961',
    tag: 'Sovereignty',
  },
  'emotional-armor': {
    icon: 'Shield',
    color: '#10B981',
    tag: 'Protection',
  },
  'reading-between-lines': {
    icon: 'Search',
    color: '#EC4899',
    tag: 'Analysis',
  },
  'advanced-tactics': {
    icon: 'Target',
    color: '#EF4444',
    tag: 'Mastery',
  },
} as const;
