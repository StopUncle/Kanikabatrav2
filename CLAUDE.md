# Claude Development Notes

## ✍️ Writing Style Rules

- **No em dashes (`—` / `&mdash;`).** They read as "classic AI" and erode the human voice. Use commas, periods, colons, semicolons, or parentheses instead. Allowed only when *absolutely necessary*: signature lines (`— Kanika`) and dictionary-style term/definition pairs (`<strong>Term</strong> &mdash; description`).
- Applies to user-visible content AND code comments (comments leak into PR reviews and signal AI authorship).

## ⚠️ Simulator: Read with Care

Scenario files under `lib/simulator/scenarios/**` are HUGE (600+ lines each, mostly prose dialogue). Reading even a few of them blows out the context window in one turn. Rules:

- **Engine bugs live in `lib/simulator/engine.ts`** (217 lines). The engine fix benefits every scenario automatically. Do NOT open scenario files to fix engine behavior.
- **Audit scenarios structurally, not by reading prose.** Use `Glob` for filenames and `Grep` with `output_mode: "count"` or `"files_with_matches"` for patterns like `isEnding: true`, `nextSceneId:`, `choices:`. That surfaces which files have a given shape with zero prose loaded.
- **Spot-check with tight ranges only.** If you must look inside a scenario, `Read` with `offset` + `limit` (~50 lines around a known scene id), never the whole file.
- **Typecheck validates all scenarios at once.** `npm run type-check` enforces the engine contract across every scenario without loading any of them into context. Use it as the safety net.

## 🚀 Quick Commands

```bash
npm run dev           # Dev server (port 3000)
npm run build         # Production build
npm run type-check    # TypeScript check
npm run lint          # ESLint

# Windows port management
netstat -ano | findstr ":3000"
taskkill //F //PID [PID]
```

## 🎯 Project Context

Next.js 15 (App Router) + React 19 + TypeScript. Personal brand site for Kanika Batra: dark psychology theme, paid book, paid Inner Circle (Consilium) community, paid 1:1 coaching, paid quiz funnel, dark luxury admin panel.

**Stack:**
- Next.js 15 + React 19 + Tailwind 3 (custom dark luxury theme)
- PostgreSQL on Railway (prod), Prisma 6 ORM
- **Auth (members):** JWT cookie pair (`accessToken` 15m + `refreshToken` 7d), httpOnly + secure + sameSite=strict
- **Auth (admin):** 6-digit PIN → JWT `admin_session` cookie (24h, httpOnly). All admin endpoints verify via `requireAdminSession()` from `lib/admin/auth.ts`.
- **Payments:** Stripe (live mode). PayPal removed April 2026.
- **Email:** Resend preferred → Nodemailer SMTP fallback. Sequenced campaigns via `EmailQueue` table, processor at `/api/admin/email-queue/process`, fired every 15 min by `.github/workflows/cron.yml`.
- **Real-time:** Pusher (chat rooms only). Feed is server-rendered.
- **Deployment:** Railway (Nixpacks, `npx prisma generate && npm run build`). Domain `kanikarose.com`. Push to `master` auto-deploys.
- **Storage:** `private/books/` for book files (gitignored, deployed via Railway separately, must NOT be committed). Voice notes + member avatars on Cloudflare R2 (`kanika-media` bucket, S3-compatible, via `lib/storage/r2.ts`).

## 💳 Stripe (live mode)

All products created via Stripe API. productKeys:

| Key | Use | Type |
|---|---|---|
| `BOOK` | Sociopathic Dating Bible ($24.99) | one-time |
| `INNER_CIRCLE` | Consilium membership ($29/mo) | subscription |
| `COACHING_SINGLE` / `_INTENSIVE` / `_CAREER` / `_RETAINER` | Coaching | one-time |
| `ASK_WRITTEN_1Q` / `_3Q` / `ASK_VOICE_1Q` / `_3Q` | Q&A packs | one-time |
| `QUIZ` | Dark Mirror unlock ($9.99, generates Consilium credit) | one-time |
| `DARK_MIRROR` | Legacy standalone unlock | one-time |

**Webhook (`/api/webhooks/stripe`)** handles `checkout.session.completed` (idempotent per branch via `paypalOrderId: ST-${sessionId}` check), `invoice.payment_succeeded` (renewal, reads `current_period_end` from Stripe), `invoice.payment_failed` (suspends), `customer.subscription.deleted/paused`, `charge.refunded` (resolves via `payment_intent` linkage, marks Purchase REFUNDED, cancels CommunityMembership for INNER_CIRCLE refunds).

**QUIZ branch** also generates a single-use Stripe promotion code worth $9.99 off Consilium first month via `lib/stripe-credits.ts` (master coupon `quiz-credit-999`, 14-day expiry). Stripe-side failure here is non-fatal.

## 📚 Sociopathic Dating Bible

70k words, 15 chapters + 2 addendum bonus chapters. EPUB + PDF, 30-day download window, max 10 downloads. $24.99. Webhook flow: BOOK checkout → Purchase → `sendBookDelivery` email → `book-buyer-welcome` email sequence → quiz auto-unlock for buyer's email.

Files at `private/books/EVENBETTERBOOK/*` (main) and `private/books/Addendums/*` (bonus). Whole `private/` tree gitignored.

## 🎯 Consilium / Inner Circle ($29/mo)

> Full ops manual: `docs/INNER-CIRCLE.md` (gitignored).

**Application gate removed (2026-04-19).** No PENDING / APPROVED gating, no admin review queue. `/consilium/apply` is now a one-click join page that POSTs to `/api/consilium/subscription/create` and redirects to Stripe. Legacy PENDING / APPROVED rows from before the cutover are treated as "finish joining" via the same checkout path.

**Membership state machine:** ACTIVE → SUSPENDED / CANCELLED / EXPIRED.
- ACTIVE on Stripe `checkout.session.completed` (creates the row if missing).
- SUSPENDED on `subscription.paused`, `payment_failed`, or member-requested pause.
- CANCELLED on `subscription.deleted` or `charge.refunded` (INNER_CIRCLE).
- EXPIRED set lazily on read by `lib/community/membership.ts` when `expiresAt < now`.

Legacy PENDING / APPROVED rows survive in the DB but are not produced by any current code path. `lib/community/membership.ts` redirects them to `/consilium`.

**What's inside:**
- **Feed** (`/inner-circle/feed`): Kanika posts + cron-driven daily insights / discussion prompts. Members comment + react, cannot create top-level posts.
- **Voice Notes** (`/inner-circle/voice-notes`): Admin-only uploads.
- **Classroom** (`/inner-circle/classroom`): Courses → Modules → Lessons → CourseEnrollment → LessonProgress.
- **Forum** (`/community/forum/*`): Member-authored threads.
- **Chat** (`/community/chat`): Pusher-backed rooms with `accessTier` gating.
- **Member-exclusive book pricing** ($9.99 for active members, $24.99 standalone). The Sociopathic Dating Bible is NOT bundled into the $29/mo Consilium; the only bundles that include the book are the one-time `BOOK_CONSILIUM_1MO` ($39, 30 days access) and `BOOK_CONSILIUM_3MO` ($79, 90 days access) SKUs sold from the book page.

**Daily auto-content:** 60 psychology cards + 28 discussion prompts + 15 book chapter cards + 6 viral quote prompts (seeded 2026-04-24 to prod, 109 rows total via `scripts/seed-insights.ts`, idempotent). Crons at `/api/cron/daily-insight` (09:00 UTC) and `/api/cron/discussion-prompt` (10:00 UTC) create FeedPosts. Pool auto-resets when exhausted.

**Email queue** at `/api/admin/email-queue/process` fires every 15 min via GitHub Actions.

## ❓ Ask Kanika

Daily Q&A retention loop. Members submit one question per rolling 24h, upvote others, get email + green-dot pill when Kanika answers in a new voice note or video.

- **Member surface:** Pill in `MemberPillNav` at top of `/consilium/feed`. States: idle gold pulse / cooldown / 🟢 answered.
- **Admin surface:** `/admin/questions` (PENDING / ANSWERING / ANSWERED / REJECTED tabs, sorted by upvote). Identity hidden until "Show identity" button (separate `/reveal` endpoint).
- **Linkage:** Voice-note + video uploaders include `<AnswerQuestionPicker>`. Selecting a question PATCHes `/api/admin/questions/[id]` with `answerPostId` → status flips to ANSWERED → `sendQuestionAnswered` email + push fire.
- **Rate limit:** Rolling 24h, configurable via `MemberQuestionSettings` singleton (`dailyCap` default 1, 60s cache). Server-enforced, client countdown cosmetic.
- **Anonymity:** `MemberQuestion.userId` always stored; public + default admin views show "Anonymous" when `isAnonymous=true`.
- **Schema:** `MemberQuestion` (with `answerPostId` FK to FeedPost), `QuestionUpvote` (composite UQ on questionId+userId), `MemberQuestionSettings` singleton.

To raise daily cap: `UPDATE "MemberQuestionSettings" SET "dailyCap" = 3`.

## 📱 PWA + Web Push

**Phase 1 + 2 shipped.** Installable PWA + end-to-end web push via VAPID.

- **Server helper:** `lib/push/index.ts` — `sendPushToUser(userId, category, payload)` and `sendPushToUsers`. Per-user fan-out across multiple device subs, auto-prunes 404/410 endpoints, per-category opt-in gate against `User.pushPreferences`. **No-ops cleanly when env vars missing.**
- **Categories:** `questionAnswered`, `voiceNote`, `forumReply`, `mention`, `broadcast`. All default-on except `broadcast` (opt-in only).
- **API:** `/api/push/{subscribe,unsubscribe,preferences}`.
- **Client:** `components/pwa/{ServiceWorkerRegister,InstallPrompt,NotificationPrompt}.tsx`, mounted member-side only.
- **Wired sender:** `lib/questions/notify-asker.ts` (questionAnswered). Others not yet wired: voiceNote, forumReply, mention, broadcast.
- **Schema:** `PushSubscription` (endpoint UNIQUE) + `User.pushPreferences Json?`.
- **Deps:** `web-push@3.6.7`.

**Required env vars** (Railway):
```env
NEXT_PUBLIC_VAPID_PUBLIC_KEY="<public>"   # NEXT_PUBLIC_ prefix mandatory for client bundle inlining
VAPID_PRIVATE_KEY="<private>"             # server-only, treat like STRIPE_SECRET_KEY
VAPID_SUBJECT="mailto:Kanika@kanikarose.com"
```

Generate once: `npx web-push generate-vapid-keys`. Rotating invalidates all subs (silent re-subscribe handles it).

**Deploy order matters** (see Prisma rule below): apply migration `20260430000000_add_push_subscriptions` BEFORE pushing code that references `prisma.pushSubscription` or `User.pushPreferences`.

**iOS:** Web push requires Add-to-Home-Screen install + iOS 16.4+. `NotificationPrompt` detects and stays hidden in plain Safari.

## 💼 Coaching

| productKey | Sessions |
|---|---|
| `COACHING_SINGLE` | 1 |
| `COACHING_INTENSIVE` | 3 |
| `COACHING_CAREER` | 4 |
| `COACHING_RETAINER` | 4 |

Webhook creates Purchase + CoachingSession in a transaction. `sendCoachingQuestionnaire` for intake. Scheduling manual.

## 🧠 Dark Mirror Quiz

- 6 axes (Psychopathic, Sociopathic, Narcissistic, Borderline, Histrionic, Neurotypical) — `lib/quiz-data.ts`
- Anyone can take; results stored in `QuizResult` (linked to `userId` if logged in, else email-only)
- $9.99 unlock; full results paywalled (unlocked by quiz purchase OR book purchase OR active Consilium membership)
- Inline SVG radar chart on dashboard (`components/dashboard/QuizDashboardCard.tsx`)
- Full results at `/quiz/results/[id]` — gated by ownership for logged-in viewers; anonymous viewers see redacted email
- **Consilium credit:** Every paid quiz unlock generates a single-use $9.99 Stripe promo code (shape `QUIZ-XXXXXXXX`, 14d expiry). Surfaced on results page + email. Stripe checkout has `allow_promotion_codes: true`.

## 📊 UTM + Attribution

Always tag campaign URLs. Format:
```
https://kanikarose.com/<path>?utm_source=<platform>&utm_medium=<how>&utm_campaign=<what>&utm_content=<variant>
```

**Convention** (lowercase + dashes only):
- `utm_source`: `instagram`, `tiktok`, `youtube`, `email`, `twitter`
- `utm_medium`: `ad`, `social`, `email`, `bio`, `organic`
- `utm_campaign`: e.g. `apr-2026-darkmirror`, `book-launch`
- `utm_content`: ad/post variant
- `utm_term`: paid search keyword

**What's captured** on User (at register) + QuizResult (at create only, never overwrites): UTMs, click IDs (`gclid`, `fbclid`, `ttclid`), `referrer`, `landingPage`, `userAgent`, `language`, `timezone`, `ipCountry` (server-derived from `cf-ipcountry` / `x-vercel-ip-country` / `fly-client-ip-country` headers).

**First-touch wins.** `<AttributionTracker />` mounts in root layout, persists snapshot to `localStorage` (`kb-attribution-v1`, 30d TTL) on first paint with attribution signal.

**Admin:** `/admin/traffic` (1d / 7d / 30d windows). API: `GET /api/admin/traffic-sources?days=N`.

**Anonymous traffic:** GA4 (`G-DTNLQQ321K` in `app/layout.tsx`). DB attribution covers registered + quiz cohorts only.

## 🎨 Design System

- **Logo:** `KBSpinLogo` (sm/md/lg/xl, optional spin animation).
- **Palette:** `--deep-black: #0a0a0a`, `--accent-gold: #d4af37`, `--accent-burgundy: #722139`, `--deep-burgundy: #4a1426`, `--deep-navy: #0f172a`, `--text-light: #e5e5e5`, `--text-gray: #a0a0a0`.
- **Typography:** Headers uppercase, extra-light to thin, wide tracking. Body light weight. Gold gradient for emphasis.
- Mobile-first, dark mode only.

## 🛠 Development Guidelines

- TypeScript strict, no `any`.
- Tailwind for styling.
- Don't add comments unless explicitly requested.
- Underscore prefix for unused vars (ESLint rule).
- Escape React special characters with HTML entities.
- `const`/`let`, never `var`.

## 🔧 Outstanding High-Value TODO

### Simulator (post-2026-05-08 hardening pass)
- [ ] **Engine unit tests.** `lib/simulator/engine.ts` is 100% pure functions, never exercised by a test. Jest is already wired (`package.json:13`). A ~150-line `engine.test.ts` should cover: `autoAdvance` reaching an ending via direct `nextSceneId`; `autoAdvance` no-op on terminal scenes / self-loops / missing `nextSceneId`; `applyChoice` reaching an ending via `choice.nextSceneId`; `replayXp` draining the auto-advance chain and crediting ending bonus; `replayXp` aborting on stale records and ignoring padding past the abort; `finalizeEnding` stamping `currentSceneId` even when the caller forgets. Locks in the 2026-05-08 hardening pass.
- [ ] **Immersion polish (runner-side).** Surface streak bonus in real-time (pulse on 3rd/5th/7th optimal); subtle audio cue on `DialogTone: "tactical"` lines; verify auto-advance scenes hold long enough to read; on replay, dim already-seen endings in the catalog. All require touching `SimulatorRunner.tsx` and friends, which are large UI files, allocate a dedicated session.
- [ ] **Cosmetic.** `replayXp`'s return field is named `endedAt` but it's actually the final `SimulatorState`. Rename to `state` or `finalState`. Nothing currently depends on the name.

### Infrastructure
- [ ] **Add `prisma migrate deploy` to nixpacks build.** Railway runs `npx prisma db push --skip-generate`, which no-ops on Railway V2 Postgres. New schema must be applied manually with `DATABASE_URL=<prod> npx prisma migrate deploy` BEFORE pushing referencing code. Outstanding migrations to apply manually as of 2026-04-25: `20260425000000_add_simulator_completion_count`, `20260425120000_add_quiz_consilium_credit`, `20260425130000_add_attribution_capture`.

### Bugs
- [ ] **Token refresh race** in `components/dashboard/DashboardClient.tsx:112-131` — concurrent 401s spawn multiple `/api/auth/refresh`. Add singleton refresh promise.
- [ ] **Password reset tokens** never invalidated; replayable until JWT expiry. Add single-use tracking.
- [ ] **Forgot-password timing leak** — make timing-equal between known/unknown emails.
- [ ] **Markdown not rendered** in feed posts. Use `react-markdown`.
- [ ] **Feed pagination missing** — `findMany({ take: 20 })` no cursor. Posts #21+ invisible.
- [ ] **Email template HTML escaping** — sanitize user-supplied strings.
- [ ] **Rate limiting** — none on `/api/auth/login`, `/api/auth/forgot-password`, `/api/admin/auth`, `/api/inner-circle/feed/[postId]/comments`. (Register IS rate-limited.)

### Engagement (surfaced 2026-04-25)
- [ ] **Feed 4% lifetime participation** (1 of 25 active members has commented). Seed Kanika's first comment on each prompt to remove "who goes first" friction.
- [ ] **Forum + Chat + Classroom dormant** — 0 posts/messages/enrollments in 7d. Either light a fire under one or hide them. Empty rooms erode premium feel.
- [ ] **Gift conversion unmeasured** — 14 of 25 active memberships are gifts. Re-run `scripts/engagement-deep-dive.ts` once first batch hits `expiresAt`.

### Nice-to-have
- [ ] Sentry error tracking
- [ ] Email change flow
- [ ] Account deletion (GDPR)
- [ ] "Membership expiring soon" emails
- [ ] Admin audit log

## 🔐 Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/kanikabatra?schema=public"

# JWT
JWT_SECRET="..."
JWT_REFRESH_SECRET="..."

# Stripe (LIVE)
STRIPE_SECRET_KEY="sk_live_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PRICE_BOOK="price_..."
STRIPE_PRICE_INNER_CIRCLE="price_..."
# ...etc per product (see lib/stripe.ts STRIPE_PRICES)

# Admin
ADMIN_PIN="123456"           # 6-digit PIN for /admin/login
CRON_SECRET="..."            # for /api/cron/* endpoints
ADMIN_SECRET="..."           # legacy fallback for cron secret

# Email
RESEND_API_KEY="re_..."
RESEND_FROM_EMAIL="Kanika <hello@kanikarose.com>"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="..."
SMTP_PASS="..."
ADMIN_EMAIL="Kanika@kanikarose.com"

# App
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
NODE_ENV="development"

# Web Push
NEXT_PUBLIC_VAPID_PUBLIC_KEY="..."
VAPID_PRIVATE_KEY="..."
VAPID_SUBJECT="mailto:Kanika@kanikarose.com"
```

When sending SMTP from local: add `tls: { rejectUnauthorized: false }` to nodemailer config.

## 🚦 Production Database (Railway)

Railway MCP server is unreliable. Use Railway CLI:

```bash
npm i -g @railway/cli
railway login
railway link --project f5ad660c-3afc-4ccd-b8b3-23f4dc47d190 \
  --environment production --service Postgres-Bzm4
railway variables --kv | grep -E "^DATABASE_(PUBLIC_)?URL="
```

Use `DATABASE_PUBLIC_URL` from off-Railway hosts, `DATABASE_URL` inside Railway. **Never commit DB credentials.**

## 🔐 Admin Auth Setup (fresh deploy)

1. Set `ADMIN_PIN` on Railway (6-digit numeric)
2. Set `JWT_SECRET` (signs admin session JWT)
3. Visit `/admin/login`, enter PIN

Admin endpoints verify the `admin_session` httpOnly cookie via `requireAdminSession()`. The earlier `NEXT_PUBLIC_ADMIN_SECRET` pattern was removed (it leaked the secret to the client bundle). `lib/admin.ts` no longer exists.

## 💳 PayPal MCP (LEGACY — refunds only)

PayPal removed from live app April 2026 (commit `b62dd0f`). MCP server kept for refunds on pre-Stripe orders. **No live code path uses PayPal.**

Configured in `~/.claude.json` under `mcpServers.paypal` (`"type": "stdio"` required). Access token expires every ~9 hours; on `401` / `"Access Token not found in cache"`, regenerate using `PAYPAL_CLIENT_ID` + `PAYPAL_CLIENT_SECRET` from `.env`, update `mcpServers.paypal.env.PAYPAL_ACCESS_TOKEN`, restart Claude Code.

Tools: `list_transactions`, `get_order`, `create_refund`, `list_disputes`, `get_dispute`, `list_invoices`.

Merchant: `Kanika@kanikarose.com`. Live/production mode.
