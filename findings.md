# Findings — Weekly Digest Opt-Out

## What already exists (and is wired)

### Schema
- `prisma/schema.prisma:27` — `emailPreferences Json?` on User model
- Migration applied: `prisma/migrations/20260330000001_add_missing_columns/migration.sql:7`

### API
- `app/api/user/settings/route.ts`
  - `GET` returns `{ emailPreferences }`. Falls back to `DEFAULT_PREFERENCES = { marketing: true, productUpdates: true, sessionReminders: true, weeklyDigest: false }` when null.
  - `PUT` accepts `{ emailPreferences }` and writes via raw SQL `UPDATE "User" SET "emailPreferences" = $1::jsonb`.
  - Both gated behind the `accessToken` cookie + `verifyAccessToken`.

### UI
- `components/dashboard/settings/PreferencesSettings.tsx` — full toggle component, 4 keys, save button, error state, optimistic state.
- `components/dashboard/SettingsModal.tsx` — hosts PreferencesSettings on the "Notifications" tab (line 25, 123).
- `components/dashboard/AccountSection.tsx` — opens the modal from the dashboard.

### Cron (the gap)
- `app/api/cron/weekly-digest/route.ts`
  - Loops `prisma.communityMembership.findMany({ where: { status: "ACTIVE" } })`
  - Sends `sendWeeklyDigest()` to **every** active member
  - **Does NOT check `user.emailPreferences.weeklyDigest`**
  - Comment on line 27 even claims "members can opt out via email preferences" — aspirational, not actually wired

### Email template
- `lib/email.ts` `sendWeeklyDigest` — composes the dark luxury shell, no unsubscribe link in the footer.

---

## The contradictions

| What user sees | What actually happens |
|---|---|
| Settings modal toggle "Weekly Digest" defaults to OFF | Cron sends digest to everyone |
| User toggles OFF and saves | Cron still sends digest to them |
| User toggles ON | Cron behavior identical |
| New user with no saved prefs | API says "off", cron sends anyway |

So the toggle is purely cosmetic right now. Fix is to either (a) flip the default to ON to match reality, or (b) honor the existing OFF default and skip sends. The plan picks **(a) + honor OFF when explicitly set** because we just shipped the digest and want active members on it by default, but explicit opt-outs should always win.

---

## Unsubscribe token design

**Goal:** A link in the digest email that, when clicked, immediately opts the user out without requiring login.

**Threat model:**
- An attacker who guesses or forges the token could opt other users out of emails. Annoying, but not catastrophic. HMAC-SHA256 with `JWT_SECRET` makes guessing infeasible.
- An attacker who intercepts the email (mailbox compromise) already has worse problems than digest opt-out.
- Token replay (clicking the same link twice) is a no-op since it just sets `weeklyDigest: false`.

**Format:**
```
<base64url(JSON({userId, type, exp}))>.<base64url(HMAC-SHA256(payload, JWT_SECRET))>
```
- `type` is the EmailPreferences key (e.g. `"weeklyDigest"`) — keeps the same helper reusable for future per-type opt-outs.
- `exp` is unix-seconds, set to ~1 year out (unsubscribe links must work on old emails — 30 days is too short).
- URL: `https://kanikarose.com/api/unsubscribe?token=<token>`

**Why not just signed JWTs via `jsonwebtoken`?**
- Already in the codebase (`lib/auth/jwt.ts`) — could reuse `signAccessToken` shape, but that ties the unsubscribe lifetime to the auth secret rotation. Acceptable trade-off; using `jsonwebtoken` directly is simpler than rolling our own HMAC and matches the rest of the code.

**Decision: use `jsonwebtoken` with a dedicated `aud: "unsubscribe"` claim** so unsubscribe tokens cannot be confused with auth tokens, and lifetime is independent.

---

## CAN-SPAM and GDPR notes
- CAN-SPAM §316.5 requires a clear, conspicuous unsubscribe mechanism in commercial emails, processed within 10 business days. One-click satisfies this.
- GDPR Recital 32 + Art. 7(3) requires withdrawal of consent be as easy as giving it. Toggle in settings + one-click in email both satisfy this.
- The "weeklyDigest" digest is **promotional**, not transactional. It needs opt-out. The existing `sendBookDelivery`, password resets, and application status emails are **transactional** and do NOT need opt-out (and shouldn't have one).

---

## Risk: existing toggle behavior
After this change, anyone who has explicitly toggled `weeklyDigest: false` in the past will be skipped by the cron. If the cron has already run once and sent to people with `weeklyDigest: false` in the DB, those people may have been confused — but since the cron is brand new (just shipped this week), the realistic blast radius is zero. Worth confirming via a one-shot SQL count of users with `emailPreferences->>'weeklyDigest' = 'false'` after deploy, but not blocking.
