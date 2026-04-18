# Consilium Deep Audit — April 18, 2026

Full top-to-bottom audit of the Consilium surface. All fixes marked
**SHIPPED** landed across commits `73652a5` → `4787ebe`. Items marked
**BACKLOG** are documented findings that didn't auto-fix in this pass.

## Scope covered

- **23 member pages** under `app/consilium/(member)/`
- **15 Consilium API endpoints** under `app/api/consilium/`
- **9 community endpoints** under `app/api/community/` (forum, chat, pusher)
- **28 admin endpoints** under `app/api/admin/`
- **5 cron endpoints** under `app/api/cron/`
- **Auth layer** (`lib/auth/*`, middleware, server-auth, cookie flow)
- **Membership lifecycle** (apply → approve → claim → active → expire)
- **Email pipeline** (gift campaign, welcome, house rules, trial expiry)
- **Payment integration** (Stripe webhook, Purchase rows, refunds)

## Headline numbers (production snapshot, post-gift-campaign)

- **6 ACTIVE members** (5 trial, 1 gift) + **97 outstanding gift invites**
- **0 stuck-expired memberships** (lazy-expiry healthy)
- **0 pending applications** / **0 unresolved reports** / **0 banned users**
- **2 APPROVED comments**, none PENDING
- **~98 real paying book buyers** verified via `scripts/verify-book-buyers.ts`

## ✅ SHIPPED in this audit pass

### Security — ban enforcement across 12 routes
Before: 8 community/feed routes resolved callers via raw `verifyAccessToken`
which skipped `isBanned` + `tokenVersion` checks. A banned user with a
still-valid JWT could read posts, send chat messages, and stay subscribed
to Pusher real-time channels until their cookie expired.
**Fix**: new `lib/auth/resolve-user.ts` that every route calls. Banned
users + revoked `tokenVersion`s now return null → 401 immediately.

Migrated routes:
- `api/community/pusher/auth` (CRITICAL — long-lived channels)
- `api/community/chat/rooms`, `chat/[roomSlug]`, `chat/[roomSlug]/messages`
- `api/community/posts/[postId]`
- `api/consilium/feed/posts`
- `api/consilium/feed/[postId]/comments` + `react` + `comments/[id]/react` + `comments/[id]/report`

### Security — legacy claim-trial endpoint neutered
The old `/api/consilium/claim-trial` GET was an email-scanner-vulnerable,
account-takeover-capable landing. Replaced with a ~40 LOC redirector that
translates legacy trial tokens into current magic-claim JWTs and funnels
them through the hardened `/consilium/claim` flow. ~200 LOC of insecure
code deleted.

### UX — case-insensitive email matching on 3 routes
Purchase rows store email as typed at Stripe checkout (mixed-case). User
rows normalise to lowercase. Three ownership checks were silently missing
matches — would have charged gift recipients AGAIN for books they owned.
Fixed in:
- `/consilium/book` (MemberBookPage)
- `/api/book/resend-download`
- `/api/quiz/my-results`

### UX — error/loading/not-found boundaries
`/consilium/(member)/*` had zero error handling. Server throws surfaced
the default unstyled Next.js error page. Blank screen during SSR. Bad
URLs showed the default 404 wall. Added three new boundary files (error,
loading, not-found) using the brand aesthetic.

### Content — updated welcome post + onboarding modal
Welcome post v2 with full house rules (no sexual talk, no filming, no
insults, no doxxing, no recruiting, no spam, no harassment, no
impersonation, no piracy). Versioned so future updates flow in-place via
`/api/admin/refresh-welcome`. Onboarding modal updated to include the
Dark Mirror Simulator (was missing) and tightened rules language.

### Infrastructure — unified prod health snapshot
New `scripts/prod-health-check.ts` — read-only one-shot inspection of
memberships, comments, reports, applications, feed posts, chat, email
queue, bans, and simulator usage. Used to catch the "82 $0 MANUAL_ rows"
issue before the gift campaign fired.

### Content — leak attribution watermark + admin lookup
Every member page renders a subtle `SID·xxxxxxxx` in the bottom-right
corner (disguised as a session reference). `sha256(userId + JWT_SECRET)`
keyed + slice(0,8). Admin paste-to-lookup panel added to `/admin/members`
reverse-resolves a leaked SID to the exact account in sub-millisecond.

### Storage — voice-note delete chains R2 cleanup
Deleting a VOICE_NOTE post left the R2 audio orphaned forever. The DELETE
endpoint now best-effort deletes the R2 object after the DB row is gone.

### Operational — 97 gift invites shipped
Full audit of `Purchase` rows filtered 12 test/backfill/mislabeled rows
out of the original 109 candidates. 97 clean paying-customer emails fired
through the magic-claim pipeline with 0 failures.

### UX — gift-claim welcome banner (`?claimed=1`)
Fresh claims land on `/consilium/feed?claimed=1` with a one-off
burgundy-gold banner that tells them to check their email for the
set-password link so they don't get locked out from a different device
later. Non-dismissible on purpose — it goes away the moment they
navigate away.

### UX — classroom hides empty courses
Was rendering "0 lessons / 0%" cards for partially-populated courses,
which looked broken. Now filters to courses with ≥ 1 lesson. Admin panel
still manages the empty ones via `/admin/courses`.

### UX — feed "NEW" indicator since last visit
Posts created after the viewer's previous visit paint a subtle emerald
pip. Per-device localStorage — no schema migration, no round trip,
works offline. Threshold frozen at mount so stamping the new timestamp
mid-render doesn't instantly kill every highlight.

### Security — full ban-aware auth migration (10 more routes)
Swept every remaining server component and API endpoint on the
consilium/community surface that resolved the caller via raw
`verifyAccessToken`. Converted to `resolveActiveUserId` /
`resolveActiveUserIdFromRequest`. Affected: outer `/consilium/layout`
(trial banner), chat list page, chat room page, forum index, forum
category, forum post detail, community category list + detail APIs,
forum reply list API. No active vulnerability — downstream guards
already caught banned users — but the revocation story is now
uniformly enforced at the session-resolution layer.

### Security — broader ban-aware sweep outside consilium (6 more routes)
Followed the consilium pass with the last six non-consilium call sites:
`/api/purchases`, `/api/user/delete`, `/api/user/settings`,
`/api/quiz/results/[id]`, `/dashboard` (server component), `/profile`
(server component). After this the `app/` tree is **zero** raw
`verifyAccessToken` calls — every auth path enforces `isBanned`,
`tokenVersion`, and "account still exists" at the session layer.

### Revenue — killed live PayPal paths
/links page was still running a live PayPal checkout for the premium
book even though the rest of the site had been Stripe-only since April
2026. Bypass silently skipped webhook → Purchase row → delivery email →
email sequence → gift-campaign eligibility → member-discount swap.
Rewired the "Buy Now — \$24.99" linkinbio button to hit
`/api/stripe/checkout` with `priceKey: "BOOK"` so the path matches the
homepage and `/book`. `/donate` redirects to `/book` (variable-amount
donations aren't in the Stripe catalogue; rebuild on demand). Removed
from footer.

### Infrastructure — `microphone=()` header was blocking VoiceRecorder
`next.config.js` set `Permissions-Policy: camera=(), microphone=(),
geolocation=()`. The `microphone=()` empty allowlist makes
Chrome/Safari silently deny `getUserMedia` **even on same-origin**,
which means the admin VoiceRecorder's MediaRecorder path would reject
with `NotAllowedError` and the admin would have no idea why. Relaxed to
`microphone=(self)`; camera and geolocation stay empty-allowlist since
nothing on the site needs them.

### Ops — deleted Lemon Squeezy dead code (590 LOC)
LS was the short-lived intermediate processor between PayPal and Stripe
and got cut in April 2026 when LS flagged the book content. Four files
were still sitting in the tree: `/api/lemonsqueezy/checkout`,
`/api/webhooks/lemonsqueezy`, `components/LemonSqueezyButton.tsx`,
`lib/lemonsqueezy.ts`. The checkout route was still publicly POST-able;
no live code path hit it but leaving a live payment handler in a tree
you believe is Stripe-only is an audit trap. All gone.

### Ops — robots.txt tightening
Added `/admin`, `/admin/`, `/reset-password`, `/forgot-password`,
`/consilium/claim`, `/consilium/success`, `/consilium/book`,
`/consilium/quiz`, `/consilium/badges`, and `/quiz/results` to the
disallow list. `/consilium/claim` especially matters — the URL carries
a magic-claim JWT in the query string and we don't want search engines
archiving inbound referrers with it attached.

## ⚠️ BACKLOG — documented but not shipped

### B1. Forum post/reply API ban-enforcement gap
Some community POST routes (forum post create, forum reply create) still
use `requireAuth` without downstream `enforceMessagingGuard`. Banned
users are caught because `requireAuth` → `authenticateUser` returns null
for them, but it's defensive to have two layers. **Priority: low** —
the auth middleware catches them first.

### B2. No IP-block layer
The welcome post threatens "IP-level blocks" for leakers but the
enforcement is still account-level only. An IP-block table + middleware
check would close this gap. VPN bypass is trivial so the value is
reputational more than technical. **Effort: ~50 LOC + Redis/DB table.**

### B3. No comment edit endpoint
Members can create / report comments but can't edit their own. Standard
expectation from forum UX. **Effort: ~30 LOC — PATCH at
`/api/consilium/feed/[postId]/comments/[commentId]` with owner check.**

### B4. ~~Classroom pages don't have error boundary coverage for missing lesson content~~ **SHIPPED**

### B5. ~~Chat room page uses raw `verifyAccessToken` in a server component~~ **SHIPPED**
Plus all other server components and community APIs — see "full
ban-aware auth migration" in the SHIPPED section.

### B6. No admin audit log
Ban, unban, role change, refund — none of these record who performed
the action. Would be useful for accountability. **Effort: ~80 LOC —
new `AdminAuditLog` table + writes from each admin mutation route.**

### B7. ~~Gift-claim → password-set flow~~ **SHIPPED**

### B8. ~~No read-receipts / unread state on feed~~ **SHIPPED**
Implemented client-side via localStorage instead of a DB column, which
skips the Railway manual-migrate-deploy dance and is enough signal for
a "what's new since last time" hint.

### B9. Simulator is invisible to non-members
Non-members visiting the site can't even preview the simulator — it's
entirely behind the member wall. Given it's the strongest differentiator
vs. Dr. Ramani, a locked-with-preview version on the public landing page
would convert better. **Effort: ~100 LOC — render L1-1 public, lock
choices behind CTA.**

### B10. Presence rooms leak last-seen timing
Pusher presence channels broadcast member online/offline state to every
subscriber. Members can tell who's on at any moment. If that's
intentional (community vibe), ignore — if it's a privacy concern for
members who value discretion, switch to anonymous counts only. **Policy
decision, not a bug.**

---

## What's provably clean

- **All 28 admin endpoints** use `requireAdminSession` — no
  `NEXT_PUBLIC_*` secret leaks remain.
- **Rate limits** active on login / register / forgot-password / admin
  PIN / feed comments / quiz submit.
- **Cookie `secure` flag** is production-gated on every auth cookie.
- **`sameSite: lax`** on all auth cookies (iOS Safari compatible).
- **JWT algorithm pinned** to HS256 on both signing + verification
  paths — no `alg: none` forgery risk.
- **Quiz results owner-only** — `/api/quiz/results/[id]` GET + PATCH
  require auth + ownership; anonymous viewer path removed.
- **GitHub Actions cron** is scheduled + running — trial-expiry,
  daily-insight, discussion-prompt, retry-emails, email-queue, and
  weekly-digest all fire on cadence.
- **Voice-note upload** handles iOS Safari MIME variants + magic-byte
  sniff as source of truth + iOS-native capture="user" button.
- **Simulator** — 20 scenarios, 342 scenes, 129 endings, 83 unique
  tactics, 79 unique red flags. Auditor reports 0 errors, 0 warnings.
- **Email templates** — bulletproof Outlook-desktop button (bgcolor +
  inline bg) + burgundy palette that degrades on-brand when Outlook
  iOS auto-lightens dark fills.

## Quick-run ops

- `npx tsx scripts/prod-health-check.ts` — read-only snapshot
- `npx tsx scripts/verify-book-buyers.ts` — verify gift-campaign
  targets before send
- `npx tsx scripts/gift-consilium-to-book-buyers.ts --dry-run` — show
  who'd get emailed
- `npx tsx scripts/send-test-gift-email.ts <email> [name]` — send a
  single test invite
