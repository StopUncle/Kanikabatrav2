# Task Plan — Weekly Digest Opt-Out (one-click unsubscribe)

## Goal
Wire the **already-existing** email preferences UI into the **already-shipped** weekly-digest cron, and add a **one-click unsubscribe** link to the digest email so members can opt out without logging in. This closes the loop on the weekly-digest feature shipped earlier in `audit/round-3-polish`.

## Why this scope (not "build the UI")
The earlier session summary said "email preferences UI is half-wired — JSON field exists but no UI." That turned out to be wrong:
- `User.emailPreferences` JSON field exists ✓
- `GET/PUT /api/user/settings` endpoints exist ✓
- `PreferencesSettings.tsx` component exists with 4 toggles (marketing, productUpdates, sessionReminders, weeklyDigest) ✓
- Mounted in `SettingsModal.tsx` → `AccountSection.tsx` → reachable from the dashboard ✓

The **actual** gap is:
1. The new `weekly-digest` cron sends to **every** active member regardless of `emailPreferences.weeklyDigest`. The comment in the file even claims "members can opt out via email preferences" but the code never checks.
2. The default for `weeklyDigest` is `false` — meaning the API tells new users they're opted out, but the cron sends them the digest anyway. Contradictory.
3. The digest email has **no unsubscribe link**. Opt-out requires logging in → dashboard → settings modal → notifications tab → toggle. CAN-SPAM and GDPR both expect a one-click link in the email itself.

---

## Phase 1: Honor the existing preference
- [ ] **1.1** Flip `DEFAULT_PREFERENCES.weeklyDigest` from `false` to `true` in `app/api/user/settings/route.ts`. New users without saved prefs are treated as opted-in (matches what the cron currently does anyway, and unifies the contradictory state).
- [ ] **1.2** In `app/api/cron/weekly-digest/route.ts`, after fetching active memberships, **filter out** any user whose `emailPreferences.weeklyDigest === false`. Treat `null`/missing as opted-in.

## Phase 2: One-click unsubscribe
- [ ] **2.1** Create `lib/email/unsubscribe-token.ts` — HMAC-SHA256-signed token containing `{ userId, type, exp }`. Sign with `JWT_SECRET`. 1-year expiry (unsubscribe links must work on old emails).
- [ ] **2.2** Build `GET /api/unsubscribe?token=xxx` — verifies the token, sets `emailPreferences[type] = false` for that user via raw SQL (matches existing pattern in `/api/user/settings`), returns a styled HTML confirmation page. No login required — the signed token IS the auth.
- [ ] **2.3** In `lib/email.ts` `sendWeeklyDigest`, accept `unsubscribeUrl` in `WeeklyDigestData` and render a low-emphasis footer link in the email shell.
- [ ] **2.4** In `app/api/cron/weekly-digest/route.ts`, generate a per-member unsubscribe token + URL and pass it into `sendWeeklyDigest`.

## Phase 3: Verify and ship
- [ ] **3.1** `npm run type-check` passes
- [ ] **3.2** `npm run lint` passes
- [ ] **3.3** Commit on `audit/round-3-polish`, push to update PR #9

---

## Out of scope (deferred)
- Other email types (book buyer welcome, application alerts) — they should also support opt-out for promotional ones, but this PR is scoped to closing the digest loop.
- A "one-click List-Unsubscribe header" (RFC 8058) — that's the standards-compliant version for inbox providers like Gmail. Adding it would mean setting `List-Unsubscribe` and `List-Unsubscribe-Post` headers in nodemailer/Resend. **Worth a follow-up** but the body link is the user-facing requirement.
- An admin "who opted out of what" dashboard — not needed yet.
