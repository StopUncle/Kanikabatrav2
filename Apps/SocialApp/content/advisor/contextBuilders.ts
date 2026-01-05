// Context builders for Pocket Kanika AI
// Extracts relevant user data to personalize AI responses

import { useAuthStore } from '../../stores/authStore';
import { useGamificationStore } from '../../stores/gamificationStore';
import type { UserContext } from './systemPrompts';

/**
 * Build user context from current app state
 */
export function buildUserContext(): UserContext {
  const authState = useAuthStore.getState();
  const gamificationState = useGamificationStore.getState();

  return {
    tier: authState.tier || 'free',
    userName: authState.user?.full_name?.split(' ')[0] || undefined,
    currentStreak: gamificationState.currentStreak,
    totalXp: gamificationState.totalXp,
    // Quiz scores and courses would be fetched from their respective services
    // For now we'll add these as optional extensions
  };
}

/**
 * Extract quiz results from stored data
 */
export async function getQuizContext(): Promise<UserContext['darkTriadScores'] | undefined> {
  // This would query quizService for the user's Dark Triad scores
  // For now, return undefined (will be populated in Phase A1.8)
  return undefined;
}

/**
 * Extract completed courses from stored data
 */
export async function getCompletedCourses(): Promise<string[] | undefined> {
  // This would query courseService for completed courses
  // For now, return undefined (will be populated in Phase A1.8)
  return undefined;
}

/**
 * Build full context with async data
 */
export async function buildFullUserContext(): Promise<UserContext> {
  const baseContext = buildUserContext();
  const [darkTriadScores, completedCourses] = await Promise.all([
    getQuizContext(),
    getCompletedCourses(),
  ]);

  return {
    ...baseContext,
    darkTriadScores,
    completedCourses,
  };
}

/**
 * Format context for display in UI (debugging/transparency)
 */
export function formatContextForDisplay(context: UserContext): string[] {
  const items: string[] = [];

  if (context.tier !== 'free') {
    items.push(`${context.tier.charAt(0).toUpperCase() + context.tier.slice(1)} member`);
  }

  if (context.currentStreak && context.currentStreak > 0) {
    items.push(`${context.currentStreak}-day streak`);
  }

  if (context.darkTriadScores) {
    const dominant = Object.entries(context.darkTriadScores)
      .sort(([, a], [, b]) => b - a)[0];
    if (dominant[1] >= 60) {
      items.push(`High ${dominant[0]}`);
    }
  }

  if (context.completedCourses && context.completedCourses.length > 0) {
    items.push(`${context.completedCourses.length} courses`);
  }

  return items;
}
