import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes so the caller's wins.
 *
 * Not decoration. A primitive that pastes `${base} ${className}` together
 * loses any argument between two classes in the same family, because the
 * winner is decided by the order Tailwind emitted them in the stylesheet
 * rather than the order they appear in the attribute. The first version of
 * the loading skeleton proved it: `rounded-full` on an avatar placeholder was
 * beaten by the base `rounded-md` and computed to 6px, so a circle rendered
 * as a soft square and nothing anywhere reported an error.
 *
 * The same helper exists in lib/utils.ts, which cannot be used here: that
 * module re-exports a "use client" file, so importing it would pull the auth
 * client into the server tree behind every card on the screen.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
