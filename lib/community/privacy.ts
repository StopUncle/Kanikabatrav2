/**
 * Privacy helpers for member-facing content.
 *
 * Inner Circle members discuss sensitive topics (manipulation, dark
 * psychology, relationship patterns). A malicious actor with a paid
 * membership could harvest real identities if the API leaks them.
 *
 * Rules:
 *   - MEMBER posts/comments/messages shown to other members → displayName
 *     only. Never the real `name`. Fallback to "Member" so nothing leaks
 *     even if displayName is null (migration safety).
 *   - ADMIN posts (Kanika) can show her real name since that's the brand.
 *   - Admin routes (admin panel) can show real names for moderation.
 *
 * Use `memberSafeName()` for any author field returned in API responses
 * that other members can see.
 */

export interface SafeNameUser {
  name?: string | null;
  displayName?: string | null;
  role?: string | null;
}

export function memberSafeName(user: SafeNameUser | null | undefined): string {
  if (!user) return "Member";
  // Admin is public-facing — Kanika's name is her brand.
  if (user.role === "ADMIN" || user.role === "MODERATOR") {
    return user.displayName || user.name || "Kanika";
  }
  // Members: never leak real name. Prefer displayName, fall back to
  // a generic label. Legacy users without a displayName will show as
  // "Member" until they set one — protects privacy during rollout.
  return user.displayName || "Member";
}
