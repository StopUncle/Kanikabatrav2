# Claude Development Notes

This file contains development commands and notes for Claude AI assistant.

## 🚀 Quick Commands

```bash
# Development
npm run dev           # Start development server (port 3000)
npm run build         # Build for production
npm run type-check    # TypeScript type checking
npm run lint          # ESLint checking
npm start             # Start production server

# Testing (when implemented)
npm test              # Run tests
npm run test:watch    # Run tests in watch mode

# Port Management (Windows)
netstat -ano | findstr ":3000"     # Check port 3000
taskkill //F //PID [PID]           # Kill process on port
```

## 🎯 Project Context

- **Project Type:** Next.js 15 (App Router) + React 19 + TypeScript personal brand site for Kanika Batra
- **Theme:** Dark psychology branding (book + community + coaching)
- **Live Surfaces:** Marketing site, paid book delivery, paid Inner Circle membership, paid 1:1 coaching, free → paid quiz funnel, dark luxury admin panel
- **Stack:**
  - **Framework:** Next.js 15 App Router, React 19, Tailwind CSS 3 (custom dark luxury theme)
  - **Database:** PostgreSQL on Railway (production), local Postgres for dev. Prisma 6 ORM.
  - **Auth (members):** JWT cookie pair (`accessToken` 15m + `refreshToken` 7d), httpOnly + secure + sameSite=strict
  - **Auth (admin):** Separate 6-digit PIN → JWT cookie (`admin_session`, 24h, httpOnly). All admin API endpoints verify the cookie via `requireAdminSession()` from `lib/admin/auth.ts`.
  - **Payments:** **Stripe** (live mode, account `sk_live_kCEC...`). PayPal was fully removed in April 2026 — there's a PayPal MCP server still in `~/.claude.json` for refund tooling on legacy orders, but no PayPal integration in the live app.
  - **Email transport:** Resend (preferred when `RESEND_API_KEY` set) → Nodemailer SMTP fallback. Microsoft Outlook routing has its own transport. Sequenced campaigns queued in the `EmailQueue` table (processor at `/api/admin/email-queue/process`, triggered every 15 min by `.github/workflows/cron.yml`).
  - **Real-time:** Pusher configured (lib/pusher/server.ts + client.ts), used by chat rooms. Inner Circle feed is currently server-rendered without real-time.
  - **Deployment:** **Railway** (Nixpacks builder, `npx prisma generate && npm run build`). Domain: `kanikarose.com`. Push to `master` auto-deploys.
  - **Storage:** Local filesystem under `private/books/` for book files (gitignored, deployed via git for now). Voice notes and member avatars on **Cloudflare R2** (`kanika-media` bucket, via `lib/storage/r2.ts`, S3-compatible).

## 💳 Payment Processor: Stripe

The whole site runs on Stripe (live mode). PayPal was the original processor, then we tried Lemon Squeezy (rejected — content flagged) and Paddle (rejected — same content triggers), then landed on Stripe in April 2026. All 11 products were created via the Stripe API.

### Stripe products (productKey → use)

| productKey | What | Type |
|---|---|---|
| `BOOK` | Sociopathic Dating Bible (premium download, $24.99) | one-time |
| `INNER_CIRCLE` | Inner Circle community membership ($29/month) | subscription |
| `COACHING_SINGLE` | Single coaching session | one-time |
| `COACHING_INTENSIVE` | Intensive 3-session pack | one-time |
| `COACHING_CAREER` | Career Coaching 4-session pack | one-time |
| `COACHING_RETAINER` | Coaching retainer | one-time |
| `ASK_WRITTEN_1Q` | 1 written question to Kanika | one-time |
| `ASK_WRITTEN_3Q` | 3 written questions | one-time |
| `ASK_VOICE_1Q` | 1 voice-note answer | one-time |
| `ASK_VOICE_3Q` | 3 voice-note answers | one-time |
| `QUIZ` | Dark Mirror quiz unlock ($9.99 — also generates a single-use Consilium credit code) | one-time |
| `DARK_MIRROR` | Standalone Dark Mirror unlock (legacy) | one-time |

### Stripe webhook (`/api/webhooks/stripe`)

Handles `checkout.session.completed` (per-product branches), `invoice.payment_succeeded` (subscription renewal — reads actual `current_period_end` from Stripe, no longer hardcoded +1 month), `invoice.payment_failed` (suspends membership), `customer.subscription.deleted` (cancels), `customer.subscription.paused` (suspends), `charge.refunded` (resolves refund → original session via `payment_intent` linkage, marks Purchase REFUNDED, **and cancels CommunityMembership for INNER_CIRCLE refunds**).

All `checkout.session.completed` branches are now **idempotent** — Stripe retries no longer create duplicate Purchase rows or duplicate emails. Each branch checks `paypalOrderId: ST-${sessionId}` before creating.

The QUIZ branch additionally creates a single-use Stripe promotion code (worth $9.99 off a Consilium first month) via `lib/stripe-credits.ts` and stamps it on the QuizResult row. Non-fatal — Stripe-side failure here doesn't fail the webhook.

### Stripe MCP server

Configured globally in `~/.claude.json`. Uses an OAuth flow with the Stripe account directly. Tools: `list_products`, `list_prices`, `list_subscriptions`, `create_payment_link`, `create_refund`, etc.

## 📚 Sociopathic Dating Bible — LIVE

- **Title:** Sociopathic Dating Bible — A Cure For Empathy
- **Format:** 70k words, 15 chapters + 2 addendum bonus chapters (Narcissists / Avoidants)
- **Delivery:** EPUB + PDF, 30-day download window, max 10 downloads per buyer
- **Price:** $24.99 (Stripe one-time, productKey `BOOK`)
- **Webhook flow:** `BOOK` checkout → Purchase row created → `sendBookDelivery` email with EPUB + PDF + addendum links → email sequence enrollment (`book-buyer-welcome`) → quiz auto-unlock for that email → done
- **Status:** Live, has been selling. ~71 buyers received fresh download links after the addendum-fix re-send in April 2026.
- **Files:** `private/books/EVENBETTERBOOK/*` (main book), `private/books/Addendums/*` (bonus chapters). The whole `private/` tree is gitignored — files are deployed via Railway separately and must NOT be committed.

## 🎯 The Inner Circle (paid community)

> **Full operations manual:** `docs/INNER-CIRCLE.md` (gitignored — covers membership lifecycle, Stripe integration, email flows, admin panel, content pipeline, cron jobs, security model, and key files)

- **Price:** $29/month (Stripe subscription, productKey `INNER_CIRCLE`)
- **Application required:** Every signup goes through PENDING → APPROVED → ACTIVE. Kanika reviews each application personally at `/admin/applications`.
- **Membership state machine:** PENDING → APPROVED → ACTIVE → SUSPENDED / CANCELLED / EXPIRED. State transitions:
  - PENDING set on form submit (`/api/inner-circle/apply`)
  - APPROVED set when admin clicks approve (`/api/admin/applications/[id]`)
  - ACTIVE set by Stripe webhook on `checkout.session.completed`
  - SUSPENDED set by `customer.subscription.paused`, `invoice.payment_failed`, or member-requested pause
  - CANCELLED set by `customer.subscription.deleted` or by `charge.refunded` for INNER_CIRCLE
  - EXPIRED set lazily on read by `lib/community/membership.ts` when `expiresAt` < now
- **What's inside:**
  - **Feed** (`/inner-circle/feed`): Kanika's posts + cron-driven daily insights and discussion prompts. Members can comment + react. Members CANNOT create top-level feed posts.
  - **Voice Notes** (`/inner-circle/voice-notes`): Admin-only audio uploads, members listen.
  - **Classroom** (`/inner-circle/classroom`): Courses → Modules → Lessons → CourseEnrollment → LessonProgress.
  - **Forum** (`/community/forum/*`): Member-authored threads with replies, likes. Bidirectional.
  - **Chat** (`/community/chat`): Pusher-backed real-time rooms with `accessTier` gating.
  - **Premium book bundled** with the membership.
- **Daily auto-content:** 60 psychology cards (`prisma/seeds/daily-insights.ts`) + 28 weekday discussion prompts (`prisma/seeds/discussion-prompts.ts`) + 15 book chapter cards (`prisma/seeds/book-insights.ts`) + 6 viral quote prompts (`prisma/seeds/viral-quote-prompts.ts`). All 109 rows were seeded to prod on 2026-04-24 via `DATABASE_URL=<prod> npx tsx scripts/seed-insights.ts` (idempotent — re-runs skip existing rows). Cron routes at `/api/cron/daily-insight` (09:00 UTC daily) and `/api/cron/discussion-prompt` (10:00 UTC daily) create FeedPost rows from these. Schedule lives in `.github/workflows/cron.yml`; manual trigger via `gh workflow run cron.yml -f target=daily-insight`.
- **Email queue:** EmailQueue table holds queued sequence emails. `/api/admin/email-queue/process` is the processor — triggered every 15 minutes by GitHub Actions (`.github/workflows/cron.yml` → `email-queue` job). Verified working end-to-end; multi-step book-buyer-welcome sequence (s1 immediate, s2 +48h, s3 +96h) is firing on schedule.

## 🤖 Bot Engagement (Project B)

> **Spec:** `docs/superpowers/specs/2026-04-25-consilium-engagement-seeding-design.md`
> **Plan:** `docs/superpowers/plans/2026-04-25-consilium-engagement-seeding.md`

20 bot User rows (`isBot: true`) post LLM-generated comments + likes on every Kanika feed post on a front-loaded curve (~70% in first 90 min, rest dripped over 48–72h). Used to keep the $29/mo Consilium feed feeling alive instead of dead.

- **Cron:** `/api/cron/bot-actions` — POST, every 5 min, GitHub Actions (`bot-actions` job in `cron.yml`)
- **Queue:** `BotAction` table — auditable per-action log (PENDING → EXECUTED / FAILED / SKIPPED)
- **Settings:** `BotEngagementSettings` (singleton row, id `"singleton"`) — `enabled` + `dryRun` flags. Both default to safe values (`enabled=false, dryRun=true`)
- **Admin:** `/admin/bots` — toggle enabled/dryRun, per-bot kill switch, recent action log, manual "Run cron now"
- **LLM:** Anthropic Haiku (`claude-haiku-4-5-20251001`), ~$0.18/mo at projected volume
- **Bots ARE Users**: `User.isBot = true` is the sole differentiator; existing FK constraints (FeedComment.authorId, FeedPostLike.userId) just work. Admin metrics filter `isBot: false` so dashboards stay honest.

To disable instantly: PATCH `/api/admin/bots/settings` with `{ enabled: false }` (or use the toggle in `/admin/bots`).

Bot User emails follow the pattern `{slug}-bot@consilium.local` so the cron can resolve persona slug → User id.

**Per-type comment volumes** (drawn uniformly):
- AUTOMATED (Today's Dark Insight): 3–5
- ANNOUNCEMENT (Kanika essays): 5–9 (pinned: 2–4)
- DISCUSSION_PROMPT: 7–12
- VOICE_NOTE / VIDEO: 6–10

**Per-post likes:** 10–20 (lower for AUTOMATED + pinned, higher for DISCUSSION_PROMPT)

**Bot bypass:** comments insert with `status: APPROVED` directly — Kanika never sees them in the moderation queue. The output guard (`lib/bots/output-guard.ts`) rejects AI self-reveals, lurker-coded openers ("great post"), emoji-leading lines, dupes.

**Rollout state:** to deploy fresh, follow tasks 17–19 in the plan: apply migration to prod → run `npm run seed:bots` → deploy with `enabled=false` → flip `enabled=true, dryRun=true` → run `npm run backfill:bots` → observe 24h → flip `dryRun=false`.

## 💼 Coaching Packages (Stripe one-time)

| productKey | Package | Sessions |
|---|---|---|
| `COACHING_SINGLE` | Single Session | 1 |
| `COACHING_INTENSIVE` | Intensive | 3 |
| `COACHING_CAREER` | Career Coaching | 4 |
| `COACHING_RETAINER` | Coaching Retainer | 4 |

After purchase, the webhook creates a `Purchase` + `CoachingSession` row in a transaction. `sendCoachingQuestionnaire` is sent so Kanika gets the client's intake info. Scheduling is currently manual.

## 🧠 Dark Mirror Quiz

- 6 personality axes (Psychopathic, Sociopathic, Narcissistic, Borderline, Histrionic, Neurotypical) — see `lib/quiz-data.ts`
- Anyone can take the quiz; results are stored in `QuizResult` (linked to `userId` if logged in, else email-only)
- **Price:** $9.99 (`QUIZ_INFO.price` in `lib/quiz-data.ts`, productKey `QUIZ`)
- Results are paywalled — full unlock requires either a quiz purchase OR a book purchase (auto-unlocked via the webhook) OR an active Consilium membership
- Dashboard card at `components/dashboard/QuizDashboardCard.tsx` shows an inline SVG radar chart + expandable score breakdown for unlocked users
- Full results page at `/quiz/results/[id]` — gated by ownership for logged-in viewers; anonymous viewers can see the result but the email is redacted
- **Quiz → Consilium credit:** every paid quiz unlock auto-generates a single-use Stripe promotion code worth $9.99 (the quiz price) off the buyer's first Consilium month. 14-day expiry. Code shape `QUIZ-XXXXXXXX`. Generated by `lib/stripe-credits.ts` against the master `quiz-credit-999` coupon (auto-provisioned on first use). Surfaced on the unlocked results page + in the quiz delivery email. Stripe checkout has `allow_promotion_codes: true`, so users enter the code at the Stripe-hosted checkout — no special routing needed.

## 📊 Marketing & Attribution

### UTM conventions

**Always tag campaign URLs.** The site captures UTMs at every landing and stamps them on `User` (at registration) and `QuizResult` (at quiz creation), so source-level ROI is queryable in the DB. Without UTM tags on the link, only referrer + click ID survive — campaign attribution is empty.

**URL format:**
```
https://kanikarose.com/<path>?utm_source=<platform>&utm_medium=<how>&utm_campaign=<what>&utm_content=<variant>
```

**Convention:**

| Param | What | Examples |
|---|---|---|
| `utm_source` | Platform | `instagram`, `tiktok`, `youtube`, `email`, `twitter` |
| `utm_medium` | How they got there | `ad`, `social`, `email`, `bio`, `organic` |
| `utm_campaign` | What it's promoting | `apr-2026-darkmirror`, `book-launch`, `consilium-q2` |
| `utm_content` | Ad/post variant | `video-v1`, `static-a`, `carousel-3` |
| `utm_term` | Keyword (paid search only) | `dark psychology`, `narcissist quiz` |

**Lowercase + dashes only** — keeps groupBy queries clean (no `Instagram`/`instagram`/`INSTAGRAM` splits).

**Quick templates** for the most-used surfaces:
- Quiz funnel from IG ad: `?utm_source=instagram&utm_medium=ad&utm_campaign=<campaign>&utm_content=<creative>`
- Book funnel from IG bio: `?utm_source=instagram&utm_medium=bio&utm_campaign=evergreen-book`
- Email blast: `?utm_source=email&utm_medium=newsletter&utm_campaign=<send-name>`
- TikTok: `?utm_source=tiktok&utm_medium=organic&utm_campaign=<post-name>`

### What's captured per landing

Stamped on `User` (at register) and `QuizResult` (at quiz creation). All nullable; legacy rows null.

- **UTMs:** `utmSource`, `utmMedium`, `utmCampaign`, `utmContent`, `utmTerm`
- **Click IDs** (survive when UTMs are stripped by the platform): `gclid` (Google Ads), `fbclid` (Meta/Instagram), `ttclid` (TikTok)
- **Path:** `referrer` (document.referrer), `landingPage` (first path on the site)
- **Device:** `userAgent`, `language`, `timezone`
- **Geo:** `ipCountry` — derived server-side from `cf-ipcountry` / `x-vercel-ip-country` / `fly-client-ip-country` headers (clients can spoof; headers are source of truth)

### How it works

- `<AttributionTracker />` mounts in the root layout. On first paint, reads URL params + `document.referrer`. If any UTM, click ID, or external referrer is present, persists the snapshot to `localStorage` (`kb-attribution-v1`) with a 30-day TTL.
- **First-touch wins** — once stored, later visits don't overwrite. Click IG ad → take quiz → register a week later → still attributed to Instagram.
- `getAttributionForSubmit()` reads the stored snapshot and is wired into:
  - `/api/auth/register` — stamps on the new User row
  - `/api/quiz/save` (auth'd save) — stamps on QuizResult on CREATE only (never overwrites)
  - `/api/quiz/submit` (anonymous) — stamps on QuizResult
- Server merges client payload + header-derived `ipCountry` + `userAgent` (server is source of truth for the latter two).
- Helpers: `lib/attribution.ts` (capture/persist/extract), `components/AttributionTracker.tsx` (mounted in root layout).

### Admin surface

- **Admin dashboard tile:** "Traffic Sources" → links to `/admin/traffic`
- **Admin page:** `/admin/traffic` — pick 1d / 7d / 30d window, see source / campaign / country breakdowns for both Users (registrations) and QuizResults, with attributed-vs-untagged ratio.
- **API:** `GET /api/admin/traffic-sources?days=N` returns the raw aggregations as JSON. Admin-auth gated.

### Anonymous traffic

There is **no server-side capture of unauthenticated page views**. GA4 (`G-DTNLQQ321K` in `app/layout.tsx`) is the source of anonymous-visitor source data. The DB attribution covers the cohort that matters most — anyone who registered or took the quiz — and is joinable against revenue + retention.

## 🎨 Design System

### Logo Components

- **KBSpinLogo:** Primary logo with spinning circles and KB monogram
  - Sizes: sm, md, lg, xl
  - Animation option for loading states
  - Used in Header, Footer, Loading screens, 404 page

### Color Palette

```css
--deep-black: #0a0a0a --accent-gold: #d4af37 --accent-burgundy: #722139
  --deep-burgundy: #4a1426 --deep-navy: #0f172a --text-light: #e5e5e5
  --text-gray: #a0a0a0;
```

### Typography

- **Headers:** Uppercase, extra-light to thin weights, wide letter spacing
- **Body:** Light weight, good readability on dark backgrounds
- **Gradient Text:** Gold gradient for emphasis

### Navigation

- **Active Link Highlighting:** Uses usePathname hook for current page detection
- **Mobile Menu:** Full-screen overlay with animation
- **Header Style:** Split name display (KANIKA / BATRA) with different weights

## ✅ Current Status

### Completed Features:

- ✅ All ESLint errors fixed (90+ violations resolved)
- ✅ TypeScript type safety improved (no `any` types)
- ✅ Header navigation with active link highlighting
- ✅ KBSpinLogo implementation across all pages
- ✅ Mobile-responsive design
- ✅ Footer with social media links
- ✅ Book page with full content
- ✅ About page with AboutContent component
- ✅ Loading states with animated logo
- ✅ 404 page with custom design
- ✅ PayPal integration scaffolded
- ✅ Contact form API route
- ✅ Presale email collection system
- ✅ Newsletter subscription UI
- ✅ Production environment configuration

### Pages Implemented:

- `/` - Homepage with hero, book showcase, testimonials
- `/book` - Dedicated book page with chapters preview
- `/about` - About Kanika with philosophy and credentials
- `/coaching` - Three-tier coaching packages
- `/contact` - Contact form with validation
- `/login` - User authentication
- `/register` - New user registration
- `/dashboard` - Protected user dashboard
- `/success` - Payment success confirmation
- `/cancel` - Payment cancellation handling
- `/terms` - Terms and conditions
- `/not-found` - Custom 404 page

## 🛠 Development Guidelines

- Follow existing TypeScript patterns
- Use Tailwind CSS for styling with the dark theme
- Maintain responsive design principles (mobile-first)
- Test PayPal integration carefully in development
- Don't add comments unless explicitly requested
- Use ESLint rule for underscore-prefixed unused variables
- Always escape React special characters with HTML entities
- Use `const/let` instead of `var` (except in global declarations)

## 📁 Project Structure

```
app/
├── page.tsx          # Homepage with Header component
├── layout.tsx        # Root layout with Footer
├── loading.tsx       # Global loading state with KBSpinLogo
├── about/           # About page
├── book/            # Book showcase page
├── coaching/        # Coaching services page
├── contact/         # Contact form page
├── dashboard/       # User dashboard (protected)
├── login/          # Authentication pages
├── register/
├── success/        # Payment success page
├── cancel/         # Payment cancel page
├── terms/          # Terms & conditions
├── not-found.tsx   # Custom 404 page
└── api/
    ├── auth/       # Authentication endpoints
    ├── booking/    # Session booking
    ├── contact/    # Contact form handler
    ├── download/   # Book download endpoint
    ├── orders/     # Order management
    ├── paypal/     # PayPal integration
    ├── presale/    # Email collection for book presale
    └── webhooks/   # PayPal webhooks

components/
├── Header.tsx       # Main navigation with KBSpinLogo
├── Footer.tsx       # Site footer with social links
├── Hero.tsx         # Hero section with animations
├── BookShowcase.tsx # Book display with presale
├── PresaleModal.tsx # Email collection modal
├── CoachingTiers.tsx # Coaching packages display
├── Testimonial.tsx  # Client testimonials carousel
├── PayPalButton.tsx # PayPal checkout integration
├── KBLogo.tsx       # Original seal logo (deprecated)
├── KBSpinLogo.tsx   # New spinning logo (active)
├── AboutContent.tsx # About page content component
├── BackgroundEffects.tsx # Visual effects (aurora, orbs)
├── LoginForm.tsx    # Authentication form
├── RegisterForm.tsx # Registration form
├── BookingModal.tsx # Coaching session booking
└── ui/              # Reusable UI components
    ├── Button.tsx
    ├── Card.tsx
    ├── GradientText.tsx
    └── Input.tsx

lib/
├── auth/           # Authentication utilities
│   ├── jwt.ts     # Token generation/validation
│   ├── password.ts # Password hashing
│   ├── database.ts # User database operations
│   └── middleware.ts # Auth middleware
├── constants.ts    # Site-wide constants
├── email.ts       # Email service configuration
├── paypal.ts      # PayPal service integration
├── prisma.ts      # Database client
├── logger.ts      # Logging utilities
├── social-sharing.ts # Social media sharing
└── utils.ts       # Utility functions

data/
└── presale-list.json # Presale email storage (gitignored)

prisma/
├── schema.prisma   # Database schema
└── migrations/     # Database migrations

public/
├── images/        # Static images
├── fonts/         # Custom fonts
└── og-image.jpg   # Open Graph image
```

## 🔧 Outstanding High-Value TODO

These came out of the April 2026 audit. Critical/high items only — see `findings.md` for the full punch list.

### Infrastructure (need decisions)
- [x] **Cron triggers for `/api/cron/*` — DONE** (2026-04-24). Running on GitHub Actions via `.github/workflows/cron.yml`. Schedules: email-queue every 15 min, retry-emails every 30 min, daily-insight 09:00 UTC, discussion-prompt 10:00 UTC, trial-expiry 09:30 UTC, weekly-digest Sunday 08:00 UTC. All jobs authed via `x-cron-secret` (set as a repo secret on GitHub and as env var on Railway — values must match). Manual trigger: `gh workflow run cron.yml -f target=<job-name>`. Watch runs at `https://github.com/StopUncle/Kanikabatrav2/actions/workflows/cron.yml`.
  - **Prod seeding requirement noted:** `scripts/seed-insights.ts` must be run against the prod DB before daily-insight / discussion-prompt crons have anything to post. First seed happened 2026-04-24 (109 rows). Pool auto-resets when all insights are used, so a one-time seed is sufficient.
- [x] **Voice notes cloud storage** — DONE. Uses Cloudflare R2 (`kanika-media` bucket) via `lib/storage/r2.ts`. All R2 env vars configured on Railway. Files persist across redeploys.
- [ ] **Add `prisma migrate deploy` to nixpacks build** — Railway runs `npx prisma db push --skip-generate` on deploy, which has been observed to no-op against Railway V2 Postgres. New schema changes must be applied manually with `DATABASE_URL=<prod> npx prisma migrate deploy` BEFORE pushing the code that references them. Outstanding migrations to apply manually as of 2026-04-25: `20260425000000_add_simulator_completion_count`, `20260425120000_add_quiz_consilium_credit`, `20260425130000_add_attribution_capture`.

### Outstanding bugs (April 2026 audit punch list)
- [ ] **Token refresh race condition** in `components/dashboard/DashboardClient.tsx:112-131` — concurrent 401s spawn multiple `/api/auth/refresh` calls. Add a singleton refresh promise.
- [ ] **Password reset tokens never invalidated** — once used, they can be replayed until JWT expiry. Add a single-use tracking mechanism.
- [ ] **Forgot-password leaks account existence** — message "If an account exists" is fine but the surrounding behavior may differ for known vs unknown emails. Make it timing-equal.
- [ ] **Markdown in feed posts not rendered** — `**bold**` shows as literal asterisks. Use `react-markdown` or similar.
- [ ] **Feed pagination missing** — `findMany({ take: 20 })` with no cursor. Post #21+ is invisible.
- [ ] **Email template HTML escaping** — customer names interpolated raw into email HTML. Use a sanitizer for any user-supplied string.
- [ ] **Rate limiting** — none on `/api/auth/login`, `/api/auth/forgot-password`, `/api/admin/auth`, `/api/inner-circle/feed/[postId]/comments`. (Register IS rate-limited.) Add one.

### Engagement issues surfaced 2026-04-25
- [ ] **Mission-1-1 50% bounce rate** — half of all simulator starters quit on the entry scenario before completing it. Content/UX issue — not a bug.
- [ ] **Feed has 4% lifetime participation** — 25 active members, 1 has ever commented. Discussion prompts get 0 comments. Worth seeding Kanika's first comment on every prompt to remove "who goes first" friction.
- [ ] **Forum + Chat + Classroom are dormant** — 0 posts/messages/enrollments in 7d (and nearly all-time). Either light a fire under one or hide them from the member nav. Empty rooms erode the premium feel.
- [ ] **Gift conversion is unmeasured** — 14 of 25 active memberships are gifts. None have hit `expiresAt` yet, so the conversion question is open. Re-run `scripts/engagement-deep-dive.ts` once the first batch expires.

### Nice-to-have
- [ ] **Sentry error tracking** — currently only console.error
- [ ] **Email change flow** — users can't change their email
- [ ] **Account deletion** — no GDPR delete endpoint
- [ ] **"Membership expiring soon" emails** — no warning before EXPIRED state
- [ ] **Admin audit log** — no record of who approved/rejected/banned

## ✅ April 2026 audit fixes (already shipped or in this commit)

- 🔴 **Admin secret leak fixed** — `lib/admin.ts` exposed `NEXT_PUBLIC_ADMIN_SECRET` in the client bundle. Replaced with `lib/admin/auth.ts` `requireAdminSession()` (verifies the existing httpOnly `admin_session` cookie). All 18 admin API endpoints + 6 admin client pages migrated.
- 🔴 **Quiz IDOR fixed** — `/api/quiz/results/[id]` GET + PATCH now require ownership. Previously had zero auth.
- 🔴 **Stripe webhook idempotent** — all 4 product branches now check for an existing Purchase before creating, preventing duplicate rows / double emails on Stripe retry.
- 🔴 **Refund handler fixed** — uses `payment_intent` linkage instead of fragile 50-row loop, AND now cancels the CommunityMembership for INNER_CIRCLE refunds (previously refunded users kept access).
- 🔴 **`invoice.payment_failed` handler added** — declined card renewals now suspend the membership immediately.
- 🔴 **Subscription renewal reads actual period** — was hardcoded `+1 month`, would have shortchanged annual subscribers by 11 months on every renewal. Now reads `current_period_end` from Stripe.
- 🔴 **INNER_CIRCLE auto-created users get a welcome email** — previously the webhook created an account with a random temp password and no email; users had no idea they had an account. Now `sendInnerCircleWelcomeNewUser` fires with a 7-day password-reset token.
- 🟠 **Pause/resume actually call Stripe** — was flipping local DB only; Stripe kept charging. Now uses `pause_collection`.
- 🟠 **Dashboard API returns membership status** — UI can finally render subscription state.
- 🟠 **Email login case-sensitivity fixed** — login + forgot-password now lowercase the email to match register.
- 🟠 **`ADMIN_PIN` default `"000000"` removed** — auth refuses to authenticate if env var is unset in production.
- 🟠 **Comment moderation no longer silent** — author can now see their own PENDING_REVIEW comments with an "Awaiting approval" badge.

## 🔐 Environment Variables

### Required for Development

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/kanikabatra?schema=public"

# JWT Secrets
JWT_SECRET="development-secret-change-in-production"
JWT_REFRESH_SECRET="development-refresh-secret-change-in-production"

# Stripe (LIVE — payments)
STRIPE_SECRET_KEY="sk_live_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Stripe price IDs — created via Stripe API, store in env so the checkout
# route doesn't have to look them up. See lib/stripe.ts STRIPE_PRICES.
STRIPE_PRICE_BOOK="price_..."
STRIPE_PRICE_INNER_CIRCLE="price_..."
STRIPE_PRICE_COACHING_SINGLE="price_..."
# ...etc per product

# Admin auth (server-side only — never expose to client)
ADMIN_PIN="123456"           # 6-digit PIN for /admin/login
ADMIN_SECRET="random-string" # legacy fallback for cron secret
CRON_SECRET="random-string"  # for /api/cron/* endpoints

# Email — Resend preferred, SMTP fallback
RESEND_API_KEY="re_..."
RESEND_FROM_EMAIL="Kanika <hello@kanikarose.com>"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="..."
SMTP_PASS="..."
ADMIN_EMAIL="Kanika@kanikarose.com"

# Email (Development)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_SECURE="false"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"
EMAIL_FROM="\"Kanika Batra\" <your-email@gmail.com>"
ADMIN_EMAIL="admin@example.com"

# Application
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
NODE_ENV="development"
ADMIN_SECRET="your-admin-secret-for-presale-stats"
```

### Production Configuration

See `.env.production.example` for complete production setup with:

- PostgreSQL with SSL
- SendGrid/AWS SES for email
- PayPal live credentials
- Security headers
- CDN configuration
- Monitoring setup

## 📈 Marketing Strategy Notes

### Presale Benefits Messaging:

- **KDP buyers:** Emphasize accessibility, Amazon reviews, instant delivery
- **Premium buyers:** Focus on exclusivity, bonuses, direct author connection
- **Launch urgency:** Limited-time pricing, first 100 buyers bonus

### Content Strategy:

- Create countdown content for social media
- Prepare email swipe copy for affiliates
- Design Instagram/TikTok teasers highlighting controversial quotes
- Plan Valentine's Day launch campaign (perfect timing for dating book)

### Social Media Presence:

- **TikTok:** @ogkanikabatra (5.9M+ likes)
- **Instagram:** @kanikabatra (500K+ followers)
- **YouTube:** @KanikaBatra (20.6M+ views)

## 🚀 Deployment Checklist

See `DEPLOYMENT-CHECKLIST.md` for complete deployment guide including:

1. Environment setup
2. Database migrations
3. PayPal configuration
4. Email service setup
5. SSL certificates
6. Monitoring setup
7. Backup configuration
8. Security headers

## 📝 Code Quality

### ESLint Configuration

```json
{
  "@typescript-eslint/no-unused-vars": [
    "error",
    {
      "argsIgnorePattern": "^_",
      "varsIgnorePattern": "^_",
      "caughtErrorsIgnorePattern": "^_"
    }
  ]
}
```

### TypeScript Configuration

- Strict mode enabled
- No implicit any
- Strict null checks
- Module resolution: bundler

## 💳 PayPal MCP Server (LEGACY — for refunds on pre-Stripe orders only)

PayPal was fully removed from the live app in April 2026 (commit `b62dd0f`). The MCP server is kept around purely for refund/transaction tooling on legacy orders that were captured before the cutover. **No live code path uses PayPal anymore.**

The PayPal MCP server is configured in `~/.claude.json` under `mcpServers.paypal`.

### How It Works

The PayPal MCP uses an **access token** that expires every ~9 hours. When the token expires, tools will return `401` or `"Access Token not found in cache"`.

### Regenerating the Token

When the PayPal MCP returns auth errors, regenerate the token using credentials from `.env`:

```javascript
// Run this in Node.js to get a fresh token:
// Reads PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET from .env
node -e "
const https = require('https');
require('dotenv').config();
const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
const auth = Buffer.from(clientId + ':' + clientSecret).toString('base64');
const data = 'grant_type=client_credentials';
const req = https.request({
  hostname: 'api-m.paypal.com', port: 443, path: '/v1/oauth2/token', method: 'POST',
  headers: { 'Authorization': 'Basic ' + auth, 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': data.length }
}, (res) => { let body = ''; res.on('data', c => body += c); res.on('end', () => console.log(body)); });
req.write(data); req.end();
"
```

Then update the token in `~/.claude.json` under `mcpServers.paypal.env.PAYPAL_ACCESS_TOKEN` and **restart Claude Code**.

### MCP Config Location

- **File:** `C:\Users\SDMat\.claude.json` (user-level config, NOT `~/.claude/mcp.json`)
- **Key:** `mcpServers.paypal`
- **Important:** The `"type": "stdio"` field is required — without it, the server won't load

### Available Tools

| Tool | Purpose |
|------|---------|
| `list_transactions` | View transactions (31-day window, filter by status) |
| `get_order` | Get full order details by order ID |
| `create_refund` | Refund a captured payment |
| `list_disputes` | View all disputes |
| `get_dispute` | Get dispute details |
| `list_invoices` | List invoices |
| `create_invoice` | Create and send invoices |
| `list_products` | List catalog products |
| `show_subscription_details` | View subscription status |

### PayPal Info

- **Credentials:** Stored in `.env` (PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET) — NEVER commit these
- **Environment:** PRODUCTION (live, real money)
- **Merchant Email:** `Kanika@kanikarose.com`
- **App Name:** Kanika Batra v2

### Production Database (Railway)

Connection details are in Railway service variables (Postgres-Bzm4 service). The Railway MCP server is unreliable (frequent disconnects); the dependable path is the Railway CLI:

```bash
npm i -g @railway/cli            # if not installed
railway login
railway link --project f5ad660c-3afc-4ccd-b8b3-23f4dc47d190 \
  --environment production --service Postgres-Bzm4
railway variables --kv | grep -E "^DATABASE_(PUBLIC_)?URL="
```

Use `DATABASE_PUBLIC_URL` from off-Railway hosts (your local machine), `DATABASE_URL` from inside Railway's network. **NEVER commit database credentials to the repo.**

```javascript
// Quick Prisma query example using Railway public URL:
// Get the DATABASE_PUBLIC_URL from Railway variables first
const prisma = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL });
```

### Admin API Authentication

**As of April 2026:** Admin API endpoints verify the `admin_session` httpOnly cookie via `requireAdminSession()` from `lib/admin/auth.ts`. The cookie is set by `/api/admin/auth/route.ts` after a successful 6-digit PIN login.

The earlier `x-admin-secret` header pattern was a critical vulnerability — `lib/admin.ts` exposed `NEXT_PUBLIC_ADMIN_SECRET` to the client bundle, meaning any visitor could extract the secret from devtools and call any admin endpoint. That code is gone. `lib/admin.ts` no longer exists. There is no `NEXT_PUBLIC_ADMIN_SECRET` env var anymore.

The `ADMIN_SECRET` env var (server-side, not exposed) is still used as a fallback for `CRON_SECRET` in `app/api/cron/retry-emails/route.ts`. That's a server-only env var so it's safe — but cron and admin secrets should ideally be split.

**To set up admin auth on a fresh deploy:**
1. Set `ADMIN_PIN` on Railway to a 6-digit numeric string
2. Set `JWT_SECRET` (used to sign the admin session JWT)
3. Visit `/admin/login`, enter the PIN, you're in

### Email System

- **SMTP config:** Stored in `.env` (SMTP_HOST, SMTP_USER, SMTP_PASS)
- **TLS note:** When sending from local machine, add `tls: { rejectUnauthorized: false }` to nodemailer config

## 🔄 Recent Updates

### April 2026 (25th) — quiz-credit upsell + attribution + admin fixes

- **Quiz → Consilium credit** (commit `7f3336f` and earlier). Every paid quiz unlock now generates a single-use Stripe promotion code worth $9.99 off a Consilium first month. 14-day expiry. Generated by `lib/stripe-credits.ts` against the auto-provisioned `quiz-credit-999` master coupon. Surfaced on the quiz email + the unlocked results page.
- **Attribution capture** (commit `7f3336f`). Full UTM + click-ID + device + geo capture at registration AND quiz creation. New library at `lib/attribution.ts`, root-mounted `<AttributionTracker />`, admin breakdown at `/admin/traffic`. Migration `20260425130000_add_attribution_capture` adds 14 nullable columns + indexes to User and QuizResult. See "Marketing & Attribution" section above for UTM URL conventions.
- **Simulator engine bug fix** (commit `a9abd22`). `autoAdvance()` was missing the "next-scene-is-ending → finalize" check that `applyChoice()` already had — no-choice scenes that pointed at an ending (e.g. `mission-2-2` → `ending-proxy-neutralized`) moved the cursor without stamping `outcome` + `endedAt`, leaving rows stuck as in-progress forever. Three pre-existing stuck rows in prod still need a one-off backfill.
- **Admin "Total Members" tile fix** (commit `50d5947`). Two bugs: tile was capped at 100 (because `take: 100` LIMIT in the user list endpoint, then `count: formatted.length`); and even uncapped it was counting Users not Memberships. Endpoint now returns both `count` (true user count) and `memberCount` (ACTIVE memberships); dashboard tile binds to `memberCount`.
- **Lint unblock** (commit `6dc51cd`). 6 unescaped apostrophes in daughter quiz pages (`react/no-unescaped-entities`) were failing Railway's deploy lint pass.
- **Engagement deep-dive scripts added** (`scripts/engagement-deep-dive.ts`, `scripts/traffic-pulse.ts`). Read-only diagnostics for funnel + drop-off + traffic-source analysis. Run with `DATABASE_URL=<prod-url> npx tsx scripts/<name>.ts`.

### April 2026 (24th) — simulator voice + cron infra + seed data
- L1-1 through L5-2 narrative voice pass — 10 scenarios rewritten for Kanika-voice inner monologue (named tactics, physical-beat scene endings, old-money softeners). Reference voice: L11-1 / L11-2. See `reference/KANIKA-VOICE.md`.
- Simulator UX polish: length-aware typewriter pacing, `prefers-reduced-motion` support across MoodBackground / ImmersionOverlay / SceneShake / DialogBox, mood-keyed particle motion (danger fast, peaceful slow, cold lateral), StreakIndicator threshold fix, Passed/Failed verdict pill on ending screen, last-line echo above choice cards so players can see what they're replying to.
- Build unblock: `scripts/measure-path-lengths.ts` `[...Set]` spread was failing Railway's TS check, silently breaking deploys for 7 commits. Fixed with `Array.from()`.
- Recommended-reading CTA on ending screen routed from `/blog/<slug>` to `/consilium/previews/<slug>` — the public blog route 404s on future-dated posts, the member preview route handles them correctly.
- Cron validated end-to-end (GitHub Actions workflow was running fine — the actual problem was empty seed tables). `scripts/seed-insights.ts` executed against prod DB: 60 DailyInsight + 28 DiscussionPrompt + 15 BookInsight + 6 ViralQuotePrompt rows. Daily-insight post verified firing correctly.

### April 2026 — audit + payment hardening
- 5-agent end-to-end audit (auth, membership, member experience, Stripe+email, security) — see `findings.md`
- All P0 audit fixes shipped (admin secret leak, quiz IDOR, webhook idempotency, refund-cancels-membership, payment_failed handler, renewal period from Stripe, welcome email for auto-created users, pause/resume hits Stripe, dashboard membership status, login email case)
- Quiz dashboard card rebuilt with inline SVG radar chart (6 axes, no chart library)
- Application notification emails: applicant confirmation + admin alert + approval email
- 109 auto-content rows seeded into DailyInsight + DiscussionPrompt for the feed cron rotation
- Inner Circle gender-split work in progress (`User.gender` field, application form selector, gender-filtered comments/forum/replies) — pending production DB migration

### April 2026 — Stripe migration
- Full PayPal → Stripe swap (commit `b62dd0f`)
- 11 Stripe products created via API
- Stripe webhook handles all product types + subscription lifecycle
- Lazy-init Stripe SDK (`lib/stripe.ts`) to fix Railway build crash
- Success page race condition fixed (polls `/api/stripe/session` for download token)
- Addendum download bug fixed + 71 buyers got fresh links

### Earlier
- Admin panel at `/admin` with PIN login (6-digit code → JWT cookie)
- Email automation system (3-step sequence with free Inner Circle trial offer)
- Password reset flow (forgot + reset pages with JWT token email)
- Login/Register activated
- 17 community files uplifted to luxury design system
- Book download bug fixed (bonus chapter PDFs + limit increased to 10)
- Security hardening: books moved to /private, CORS removed, dev bypass guarded
- Payment integrity: amount verification, cancel grace period, webhook sync
- Dashboard bugs fixed: session data, token refresh, loading locks
