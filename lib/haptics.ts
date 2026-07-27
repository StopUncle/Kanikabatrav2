/**
 * Haptics: named vibration patterns for the app shell.
 *
 * `navigator.vibrate` is an Android and Chromium feature. iOS Safari does not
 * implement it at all, so every call there is a silent no-op. Nothing in the
 * UI may depend on a haptic firing: it is seasoning, never signal.
 *
 * Reduced motion suppresses haptics by default. Someone asking the OS for less
 * sensory stimulation is served better by a quiet phone, and the explicit
 * preference below still overrides it either way.
 */

export type HapticPattern =
  | "tick" // a card flips, a value ticks over
  | "select" // a choice locks in
  | "success" // a correct call
  | "warn" // the clock is running out
  | "fail" // a wrong call
  | "moment"; // the ceremony lands

const PATTERNS: Record<HapticPattern, number | number[]> = {
  tick: 8,
  select: 12,
  success: [18, 40, 26],
  warn: [24, 60, 24],
  fail: 40,
  moment: [10, 30, 18, 40, 40],
};

const STORAGE_KEY = "app.haptics";

/** "on" | "off" | null (null means follow the reduced-motion default). */
type Preference = "on" | "off" | null;

function readPreference(): Preference {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw === "on" || raw === "off" ? raw : null;
  } catch {
    return null;
  }
}

function prefersReducedMotion(): boolean {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

/**
 * True when the device can vibrate at all.
 *
 * Client-only: this answers false during server rendering and true on a
 * capable device, so calling it in a render body hydration-mismatches. Read it
 * inside an effect and keep the result in state.
 */
export function hapticsSupported(): boolean {
  return (
    typeof navigator !== "undefined" &&
    typeof navigator.vibrate === "function"
  );
}

/** Whether a haptic would actually fire right now. */
export function hapticsEnabled(): boolean {
  if (typeof window === "undefined" || !hapticsSupported()) return false;
  const preference = readPreference();
  if (preference === "on") return true;
  if (preference === "off") return false;
  return !prefersReducedMotion();
}

/** Persist an explicit choice, which wins over the reduced-motion default. */
export function setHapticsEnabled(on: boolean): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, on ? "on" : "off");
  } catch {
    /* private mode: the setting simply does not persist */
  }
}

/**
 * Fire a named pattern. Never throws: some embedded webviews expose
 * `vibrate` and then reject the call, and a buzz is never worth an error
 * boundary.
 */
export function haptic(pattern: HapticPattern): void {
  if (!hapticsEnabled()) return;
  try {
    navigator.vibrate(PATTERNS[pattern]);
  } catch {
    /* ignored by design */
  }
}
