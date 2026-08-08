/**
 * The one list of email preference keys.
 *
 * This existed in four places and one of them disagreed:
 * `components/dashboard/settings/PreferencesSettings.tsx` knew four of the
 * five keys, read the stored object, and wrote it back wholesale. Because
 * `/api/user/settings` replaced rather than merged, saving from that modal
 * DELETED `questionAnswered` from the row. And because every read site in
 * the codebase treats an absent key as opted-IN (a strict `=== false`
 * check, deliberately, so new keys default on), deleting a key silently
 * RE-SUBSCRIBED someone who had opted out. A compliance bug wearing the
 * costume of a typo.
 *
 * So: one list, one set of defaults, one merge helper that whitelists.
 * Anything that reads or writes `User.emailPreferences` imports from here.
 */

export const EMAIL_PREFERENCE_KEYS = [
  "marketing",
  "productUpdates",
  "sessionReminders",
  "weeklyDigest",
  "questionAnswered",
] as const;

export type EmailPreferenceKey = (typeof EMAIL_PREFERENCE_KEYS)[number];

export type EmailPreferences = Record<EmailPreferenceKey, boolean>;

/**
 * Applied when a user has never saved. Everything is opt-OUT (default
 * true): members are auto-enrolled and leave via the toggle or the
 * one-click link in the email itself.
 */
export const DEFAULT_EMAIL_PREFERENCES: EmailPreferences = {
  marketing: true,
  productUpdates: true,
  sessionReminders: true,
  weeklyDigest: true,
  questionAnswered: true,
};

/**
 * Member-facing copy for each toggle. Lives here so the app skin, the
 * marketing profile, and the dashboard modal cannot describe the same
 * switch three different ways.
 *
 * Note `questionAnswered` also exists as an independent PUSH category in
 * `User.pushPreferences`. The wording says "email" so the two are
 * distinguishable when both are on screen.
 */
export const EMAIL_PREFERENCE_COPY: Record<
  EmailPreferenceKey,
  { title: string; description: string }
> = {
  marketing: {
    title: "Marketing and promotions",
    description: "New products, launches, and offers from Kanika.",
  },
  productUpdates: {
    title: "Product updates",
    description:
      "When the simulator, courses, or Consilium gains new content.",
  },
  weeklyDigest: {
    title: "Weekly digest",
    description: "What happened in the Consilium this week.",
  },
  sessionReminders: {
    title: "Coaching session reminders",
    description: "Pre-call prep and follow-ups for booked coaching.",
  },
  questionAnswered: {
    title: "Your question gets answered",
    description: "One email when Kanika answers something you asked.",
  },
};

/** Display order. Marketing first: it is the one most people came to switch off. */
export const EMAIL_PREFERENCE_ORDER: readonly EmailPreferenceKey[] = [
  "marketing",
  "productUpdates",
  "weeklyDigest",
  "sessionReminders",
  "questionAnswered",
];

export function isEmailPreferenceKey(
  value: unknown,
): value is EmailPreferenceKey {
  return (
    typeof value === "string" &&
    (EMAIL_PREFERENCE_KEYS as readonly string[]).includes(value)
  );
}

/**
 * Coerce whatever is in the column into a usable object.
 *
 * The column is `Json?` and has historically held null, a real object, or
 * a JSON string (the raw-SQL writer and Prisma disagreed at some point).
 * All three land here.
 */
function toRecord(raw: unknown): Record<string, unknown> {
  if (!raw) return {};
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object"
        ? (parsed as Record<string, unknown>)
        : {};
    } catch {
      return {};
    }
  }
  return typeof raw === "object" ? (raw as Record<string, unknown>) : {};
}

/**
 * The read convention, stated once: a key is opted OUT only when it is
 * explicitly `false`. Absent, null, and undefined all mean opted IN.
 *
 * Every existing gate in the codebase already does this
 * (`lib/questions/notify-asker.ts`, the queue processor's
 * `marketingPreflight`, the weekly-digest cron, `lib/email-campaigns.ts`).
 * Keeping the convention identical here means adopting this module changes
 * no live behaviour for existing rows.
 */
export function isOptedIn(raw: unknown, key: EmailPreferenceKey): boolean {
  return toRecord(raw)[key] !== false;
}

/** Fill in every key so the caller never has to think about absence. */
export function normalizeEmailPreferences(raw: unknown): EmailPreferences {
  const record = toRecord(raw);
  const out = { ...DEFAULT_EMAIL_PREFERENCES };
  for (const key of EMAIL_PREFERENCE_KEYS) {
    if (record[key] === false) out[key] = false;
    else if (record[key] === true) out[key] = true;
  }
  return out;
}

/**
 * Merge a partial update over what is stored, keeping only known keys and
 * only booleans. Returns the COMPLETE object, so every write leaves all
 * five keys present and the absent-key re-subscribe cannot happen again
 * no matter which surface saved.
 *
 * Unknown keys are dropped rather than rejected: a stale client that still
 * posts a retired key should save the keys it got right, not 400.
 */
export function mergeEmailPreferences(
  stored: unknown,
  incoming: unknown,
): EmailPreferences {
  const base = normalizeEmailPreferences(stored);
  const patch = toRecord(incoming);
  for (const key of EMAIL_PREFERENCE_KEYS) {
    if (typeof patch[key] === "boolean") base[key] = patch[key] as boolean;
  }
  return base;
}
