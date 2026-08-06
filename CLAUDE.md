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

## 💸 Don't Burn the Usage Budget (token discipline)

Hard-won lesson (2026-06-10): a high-effort `/code-review` fanned out **7 parallel
subagents at once**, each independently re-reading the same large files. That single
review burned ~1M tokens (roughly half a session's budget) in one shot. Avoid it.

Rules for this repo specifically:
- **Do NOT spawn many parallel review/explore subagents on this codebase.** It is large
  (1000+ files, huge scenario prose). Fan-out multiplies reading cost: 7 agents = 7x the
  same files read. For a review, do it inline in the main thread, or cap at 1-2 focused
  subagents with tight file scopes, not a 6-angle sweep.
- **Loading big skills is expensive for the rest of the session.** The `claude-api` skill
  dumps a very large reference into context that inflates every subsequent turn. Only load
  it when actually writing Anthropic SDK calls, and prefer to finish that work before moving
  on. The model IDs you need are usually: Haiku `claude-haiku-4-5`, Sonnet `claude-sonnet-4-6`,
  Opus `claude-opus-4-8` (current).
- **Verify cheaply.** `npm run type-check` + scoped `eslint` catch most issues for ~nothing.
  A single small `tsx` smoke script (a few LLM calls) beats driving a browser or fanning out
  agents. Reach for multi-agent orchestration only when the user explicitly asks for it.
- When unsure whether something is expensive, it probably is if it (a) reads many files,
  (b) runs agents in parallel, or (c) loads a large skill/doc. Ask before doing it at scale.

## 🧪 Ultimate Simulator: deferred review findings (feat/ultimate-simulator)

The LLM-feature branch (`feat/ultimate-simulator`: freeform judge + The Lab + generated
scenarios) passed review; 9 correctness bugs were fixed in commit `02d2788`. These lower-
priority cleanups were deliberately deferred (non-blocking, some need a migration):
- **Shared LLM helpers.** Markdown-fence stripping (4 copies), response-text extraction
  (5 copies), and cost-micros math (3 copies) are duplicated across `lib/simulator/judge.ts`,
  `lib/lab/engine.ts`, `lib/simulator/generated.ts`, and `lib/receipts/anthropic.ts`. Extract
  `extractText()`, `stripCodeFences()`, and `costMicros(model, usage)` into `lib/anthropic.ts`.
- **Validator duplication.** `validateScenarioGraph` in `lib/simulator/generated.ts` reimplements
  `scripts/validate-scenarios.ts`. Make one the source of truth.
- **Admin list over-fetch.** `GET /api/admin/generated-scenarios` selects the full `json` blob
  for up to 60 rows to derive 4 scalars. Persist sceneCount/difficulty/etc. as columns (needs a
  migration) and drop `json` from the list select.
- **Rolling-window quota.** `labQuota` hand-rolls the 24h count that `lib/questions/cooldown.ts`
  already does (and drops `nextAvailableAt`). Generalize one helper.
- **Mid-run unpublish.** Admin rejecting a PUBLISHED generated scenario while a member is mid-run
  makes their `/complete` 404 and silently lose XP. Consider keeping rejected-but-in-progress rows
  resolvable, or block reject when active progress rows exist.

## 🎯 Project Context

Next.js 15 (App Router) + React 19 + TypeScript. Personal brand site for Kanika Batra: dark psychology theme, paid book, paid Inner Circle (Consilium) community, paid 1:1 coaching, paid quiz funnel, dark luxury admin panel.

**Stack:**
- Next.js 15 + React 19 + Tailwind 3 (custom dark luxury theme)
- PostgreSQL on Railway (prod), Prisma 6 ORM
- **Auth (members):** JWT cookie pair (`accessToken` 15m + `refreshToken` 7d), httpOnly + secure + sameSite=lax (all six writers agree; this said `strict` for months and was never true). Session tokens carry no `type` claim and `lib/auth/jwt.ts` **refuses any token that has one**, because the password-reset token is signed with the same `JWT_SECRET` and was otherwise usable as a session cookie.
- **Auth (admin):** 6-digit PIN → JWT `admin_session` cookie (24h, httpOnly). All admin endpoints verify via `requireAdminSession()` from `lib/admin/auth.ts`.
- **Payments:** Stripe (live mode). PayPal removed April 2026.
- **Email:** Resend preferred → Nodemailer SMTP fallback. Sequenced campaigns via `EmailQueue` table, processor at `/api/admin/email-queue/process`, fired every 15 min by `.github/workflows/cron.yml`.
- **Real-time:** Pusher (chat rooms only). Feed is server-rendered.
- **Deployment:** Railway (Nixpacks, `npx prisma generate && npm run build`). Domain `kanikarose.com`. Push to `master` auto-deploys.
- **Storage:** `private/books/` for book files (gitignored, deployed via Railway separately, must NOT be committed). Voice notes + member avatars on Cloudflare R2 (`kanika-media` bucket, S3-compatible, via `lib/storage/r2.ts`).

## 💰 Pricing: $29 CONFIRMED, the monetisation reset is SHELVED (2026-08-06)

**Sam's call, 2026-08-06, on podcast day 1's 50x sales day: the Consilium stays
at $29/mo, $290/yr. The reset (one $19.99 tier replacing $29) does NOT ship.**
The model it assumed is gone: the two-rung ladder is live in prod (Pact
$4.99/wk = training below, Consilium $29 = Kanika's rooms above), and $29 is
the price at which the rungs read correctly ($19.99 inverted them against Pact
annual $149). Full history and closed knock-ons: `docs/LEDGER.md`
(2026-08-06 entry). **Do not ship $19.99 or resurrect the reset without a new
explicit call from Sam.**

Still true from the reset era:
- **Gift memberships land on the free tier when they expire**, not on a paid
  price.
- **Book sales are the primary revenue goal.** The program assigns the book as
  required reading, so selling the program sells books.

**Traps that bite anyone touching pricing:**
- Display prices live in `MEMBERSHIP` (`lib/constants.ts`); if you are about
  to type a dollar sign next to the word Consilium, import it. Legal copy
  (`app/terms/page.tsx`, `app/refund/page.tsx`) and two `content/posts/*.mdx`
  still carry literals.
- Display and Stripe are **decoupled**: `MEMBERSHIP` is display only, the
  charge is the price id in `lib/stripe.ts`. Change one without the other and
  the page advertises a number checkout does not honour.
- `quiz-credit-999` (`lib/stripe-credits.ts`) is a Stripe coupon and
  **`amount_off` is immutable**. A reprice needs a NEW coupon id.
- The $39/$79 book bundles are subscriptions whose trial **auto-renews into
  the $29 INNER_CIRCLE line**.
- Coaching amounts live in three hardcoded places, also decoupled from Stripe.
- `REFERRER_REWARD_CENTS = 2900` is the $29 price as a number.
- `INNER_CIRCLE_NEW_9` / `_ANNUAL_NEW_90` in `STRIPE_PRICES` are orphaned $9
  reset prices, pointed at by nothing; the webhook fulfils nothing for them.

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

## 🎓 The 12 Week Transformation (+ advanced course)

Video program that pairs each week's lessons with assigned reading from the book.

| Doc | What it is |
|---|---|
| `docs/TRANSFORMATION-PLAN.md` | Delivery system: data model, drip, unlock crons, Standing |
| `docs/TRANSFORMATION-CURRICULUM.md` | Content. **Part I** = the 12 week program + reading map. **Part II** = the advanced 6 week course (working title "Advanced Dynamics") |
| `docs/TRANSFORMATION-TALKING-POINTS.md` | Per-lesson filming beats for Part I (3-5 per lesson, not scripts) |

**Rules that govern this content:**
- Part I assigns all 15 chapters + both addendums exactly once, doctrine half only. Part II re-reads the same chapters' deep halves (case files, advanced tactics, drills). Nothing in Part II is a first read, so it is **gated on Week 12 completion**, never sold as an entry point.
- Part II is 50% book / 50% new material (marked `[BOOK]` / `[NEW]` per lesson). The new half covers what the book lacks: being the target, the institutional layer (HR, mediation, courts), legal boundaries, repair, and the cost of the skills.
- **The book's operational sabotage material is taught as recognition, never instruction.** No lesson gives steps for damaging a specific person. Same ethics line as Part I Week 7; also the only version that survives a platform review.
- Part II lesson and module names are deliberately plain and clinical. Nothing in a title or thumbnail should be quotable out of context.
- Chapter titles in the seed cards (`prisma/seeds/book-insights.ts`) are marketing names and **two do not match the book**: real Ch. 5 is "The Predator's Gaze" (weakness detection, not scarcity), real Ch. 6 is "The Architecture of Control". Trust the EPUB, not the cards.

## 🎯 Consilium / Inner Circle ($29/mo)

> Full ops manual: `docs/INNER-CIRCLE.md` (gitignored).

**Application gate removed (2026-04-19).** No PENDING / APPROVED gating, no admin review queue. `/consilium/apply` is now a one-click join page that POSTs to `/api/consilium/subscription/create` and redirects to Stripe. Legacy PENDING / APPROVED rows from before the cutover are treated as "finish joining" via the same checkout path.

**Membership state machine:** ACTIVE → SUSPENDED / CANCELLED / EXPIRED.
- ACTIVE on Stripe `checkout.session.completed` (creates the row if missing).
- SUSPENDED on `subscription.paused`, `payment_failed`, or member-requested pause.
- CANCELLED on `subscription.deleted` or `charge.refunded` (INNER_CIRCLE).
- EXPIRED set lazily on read by `lib/community/membership.ts` when `expiresAt < now`.

Legacy PENDING / APPROVED rows survive in the DB but are not produced by any current code path. `lib/community/membership.ts` redirects them to `/consilium`.

**What's inside** (all member surfaces live under `/consilium/*`; **nav source of truth is `lib/consilium/nav.ts`** — both `InnerCircleSidebar` and `MemberPillNav` render from it; adding a surface = add it to one section there):
- **Feed** (`/consilium/feed`): Kanika posts + cron-driven daily insights / discussion prompts. Members comment + react (markdown renders via react-markdown, cursor pagination), cannot create top-level posts.
- **Simulator** (`/consilium/simulator`): the engagement engine — scenario runs, XP, streaks, leaderboard, plus Adventures (multi-chapter arcs), The Lab (freeform AI roleplay), Games (Speed Drill), Instincts/Tells, daily generated scenarios.
- **Receipts** (`/consilium/receipts`): AI message analysis, member edition.
- **Library surfaces:** The Book, Videos, Voice Notes (admin-only uploads), Previews.
- **Dormant, hidden AND redirected** (2026-04-30 audit; pages 302 to feed since 2026-07-02, APIs/schema intact): Forum, Chat, Classroom.
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
- **Wired senders** (verified 2026-07-02): `lib/questions/notify-asker.ts`, `lib/messages/notify.ts`, `lib/tells/leagues/resolve.ts`, feed post + comment routes, `daily-streak-nudge` and `daily-tell-push` crons.
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

## 🔎 SEO, AI-SEO (GEO) & Content Architecture

> Governing docs (gitignored, local-only, so the durable rules are duplicated here):
> `docs/SEO-PLAYBOOK-KANIKAROSE.md`, `docs/AI-SEO-GEO-PLAN.md`,
> `docs/INTEL/` (Operation Dark Mirror recon), `docs/INTEL/inputs/clinical-positioning.md`.

**Content model = hub-and-spoke.** Pillars live in `content/pillars/*.mdx` (served at
`/guide/[slug]`), posts in `content/posts/*.mdx` (served at `/blog/[slug]`). Both
auto-discover via `getAllPillars()` / `getAllPosts()` (just add the file; it flows to
the blog hub, sitemap, and `/guide` or `/blog` route with no registry edit). The
**dark-psychology umbrella** pillar (`dark-psychology-beginners-guide`, promoted from a
post, 301 from `/blog/...` in `next.config.js`) sits above all clusters. 9 pillars:
aspd-sociopathy, factor-1-vs-factor-2-psychopathy, narcissism, dark-triad,
manipulation-tactics, attachment-styles, cluster-b, high-value-woman, dark-psychology.

**Internal routing = `lib/internal-links.ts`.** `PILLAR_RULES` + `QUIZ_RULES` are
regex->slug, **most-specific-first, NO fallback** (a post matching no rule shows no
pillar, which beats collapsing onto the wrong one). **Adding a cluster = add one rule**,
keyed on specific tokens not generic comorbidity tags. The factor-1 rule sits ABOVE the
aspd rule so factor-specific posts route to the Factor 1 pillar while general
sociopath/psychopath posts stay on the ASPD hub.

**Every post MUST have:** `tldr` (answer-first bullet array, renders atop the post AND
feeds AI extraction), `faq` (frontmatter array + a visible `## Frequently Asked Questions`
that mirrors it), a `coverImage` using the `/api/og?title=...&subtitle=...` generator
(**NEVER `/images/blog/*` — those 404; `public/images/` only holds the logo**), and
`author: "Kanika Batra"`. Optional `youtubeId` + `youtubeTitle` render a `YouTubeEmbed`
(VideoObject schema). Real YouTube IDs + the video->post map are in
`docs/INTEL/B/B1-youtube-to-blog-map.md`. Weekly `content-freshness` cron emails stale
posts; bump `updatedAt` on substantive edits.

**Schema (`lib/schema.ts`):** Article, FAQPage, Person/Organization (`sameAs`),
VideoObject, BreadcrumbList. **Breadcrumb rule:** the last crumb (current page) must NOT
be linked (omit `item`; Google uses the page URL). The `Breadcrumbs` component in
`components/RelatedPosts.tsx` (used by posts) emits visible trail + matching schema and
already does this; `generateBreadcrumbSchema` (used by guides/quizzes/manifesto) was
fixed to match. `KANIKA_AUTHOR_REF` ties every article to her entity (E-E-A-T).

**Psychopath / Factor 1 positioning (DECIDED: co-equal pillar, not a rebrand).** Keep all
ranking "sociopath"/ASPD content; ADD psychopath/Factor 1 alongside. The book stays
"Sociopathic Dating Bible"; quiz axes unchanged. **Clinical rules (hard, governed by
`docs/INTEL/inputs/clinical-positioning.md`):** Kanika is diagnosed ASPD and CLINICALLY
ASSESSED as Factor 1 psychopathy by her psychiatrist. NEVER write "identifies with" /
"self-identifies as" (it is a clinician's assessment). Factor 1/2 = Hare's PCL-R, NOT the
DSM; NEVER claim the DSM renamed sociopath to psychopath Factor 1/2 (DSM diagnosis = ASPD
+ a DSM-5 psychopathy specifier). Do NOT name Dr. Zen Zhang publicly until Sam/Kanika
confirm. True-crime/celebrity analysis is OK for deceased convicted killers (Bundy,
Dahmer); for living people, comment on patterns/behaviour, never assert a diagnosis.

**AI-SEO / GEO (be cited by ChatGPT, Claude, Perplexity, Google AI Overviews).** Goal =
**educational-authority citations, NOT crisis/treatment recommendations** (AI rightly
routes crisis/help to professionals; do not chase that). AI crawlers are ALLOWED and
verified reachable (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot,
Google-Extended, CCBot all 200; robots.txt is a single `*` rule; no Cloudflare AI-block).
Citation mechanics: be reachable (done), extractable (answer-first tldr/FAQ/definitions),
a recognized entity (Wikidata + Person/sameAs), corroborated off-site (Reddit/Quora/press),
and unique (her first-person diagnosed voice). Pending on-page wins: `/llms.txt`, "Key
facts" blocks on pillars, crisis-resource notes (which RAISE citability). Full plan in
`docs/AI-SEO-GEO-PLAN.md`.

**Off-site / entity / press (Tier 4 #15, biggest GEO lever).** Canonical URL is
**non-www `https://kanikarose.com`** (www 301s to it; give journalists the non-www form).
Link targets: homepage or `/about` for profile pieces (entity), the matching `/guide/...`
for topic pieces. Lead press outreach with NEW info (the Factor 1 reframe, the free
Receipts tool, expert commentary, quiz data), not a bare link ask. The **`/manifesto`**
page is a linkable-asset scaffold (PR #44, bracketed placeholders) **awaiting Kanika's real
content — do NOT merge or add to sitemap/nav until she writes it.** Wikidata entity +
press-backlink reclamation (LADbible/UNILAD/Newsweek covered her, linked nothing) are
Sam/Kanika/PR tasks.

**Sitemaps:** `https://kanikarose.com/sitemap.xml` (pages) + `/video-sitemap.xml` (now
declared in robots.txt, real video IDs). Resubmit both in GSC after large content
changes; request-index high-value new pages.

**Operation Dark Mirror build phase (shipped to prod 2026-06-18):** Tier 0 (fixed 46
broken OG covers + fake video data + sitemap), Tier 1 (Factor 1 pillar + true-crime lane
+ comparison harmonization), Tier 2 (free Receipts tool, quiz share card, two-sided
referral — conversion lane), Tier 3 (coaching funnel, email open/click tracking), Tier 4
(quiz front door, umbrella hub, 3 starved clusters de-starved, starved quizzes fed, HPD
post). ~20 new posts + 2 new pillars. Remaining (not built): Tier 3 #11 product quick
wins (blocked on assets: workbook PDF, Honeytrap manuscript+price, ASK voice-pack
pricing), Tier 4 #13 certification tier + #15 off-site (Sam/PR).

## 🩸 The Blood Pact (DEPLOYED DARK 2026-08-03)

The app's hero product: a paid weekly-challenge commitment. Sam approved the
full plan (`~/.claude/plans/parsed-sniffing-plum.md`); phases 1-4 built,
verified, and DEPLOYED to prod 2026-08-03 (commits `6a525cb`..`194930b`,
both migrations applied to prod first). **Gate direction (Sam's call,
supersedes the first dark deploy): the Pact is fully VISIBLE inside the
app (`PACT_LAUNCHED = true`: tab, hub hero, UpgradeSheet). The APP is
what has no entry point: manifest start_url, login and register all land
on the old Consilium/dashboard, and /app is reached by typing the URL
only, until Sam declares the app complete.** Motion/status polish is in
(`docs/PACT-MOTION-PLAN.md`, all five phases; shared WebGL hook now at
`lib/motion/gl.ts`).

**Positioning (Sam's call 2026-08-03, subtitle revised same day):**
tagline "All the benefits of psychopathy, and none of the liabilities.",
subtitle "For those committed to ruthless transformation." (also the
live-pact week-card caption), door CTA "Make the blood pact". Live on
the Pact door + hub hero, fresh-signer state only.
The 36-week content spine is `docs/TRANSFORMATION-36-WEEK.md` (gitignored,
local): three acts of twelve, one reading + one challenge per week, Act
boundaries at weeks 12/24/36, Act III is the old Part II doubled.

**Product:** $4.99/week or $149/year (no monthly). Member picks a preset
(confidence / fear-anxiety / relationships), TICKS the four oath lines
(checkboxes, all required), WRITES three goals (structured slots: the
change / the proof / the cost, per-preset suggestions as placeholders,
stored set-once on `Pact.goals`, rendered on the record and the break
screen), DRAWS a signature (canvas, strokes stored on
`Pact.signatureData`), pays, gets one challenge a week with a private
journal (+ a SEPARATE optional public box, wall ships later). Missed week
= permanent scar. Cancel = pact broken, record sealed read-only, re-sign
creates pact number+1 beside the scars.
**Active Consilium members are pact-entitled for free** (decided
2026-08-02); they sign via `/api/pact/sign` with no checkout.

**Architecture:** `PactMembership` (billing, mirrors CommunityMembership),
`Pact` (covenant, survives re-signing), `PactWeek` (authored challenges per
preset per cycle slot; **weeks 1-4 x 3 presets PUBLISHED to prod
2026-08-06**, weeks 5-12 of the 12-week cycle still unwritten and render
the graceful "being written" fallback, which cannot scar), `PactEntry`
(member-week: status open/kept/scarred, journal). Drip is derived
(`lib/pact/read.ts`, same pattern as `lib/program/read.ts`), lazily
materialised: read scars overdue weeks + opens the current entry, the
daily cron (`/api/cron/pact-week`, 08:20 UTC) does the same for members who
did not look and sends the `pactWeek` push. Crisis classifier
(`lib/program/ai/safety.ts`) runs on every journal write, fails closed.
Webhook lifecycle lives in `lib/pact/billing.ts` (thin fallthrough call
sites in the Stripe webhook when no CommunityMembership matches the sub).

**Pact invariants hardened 2026-08-06 (audit pass; tests pin all of these):**
- `readPact(userId, { entitled })` is **entitlement-passive when false**: no
  scar pass, no entry mint. Every page call site passes
  `access.pactEntitled`; only the already-gated keep/entry API routes use
  the default. A lapsed member browsing must never accumulate scars for
  weeks the write routes 403 them out of.
- **Retro-scar guard:** `PactWeek.publishedAt` (migration 20260806230000)
  and a week only scars if its slot was published BEFORE that member's
  `weekEndsAt`. Publishing weeks 5-12 later is therefore safe forever. The
  seed script stamps publishedAt on `--publish`.
- `/app/pact/record`, `/journal`, `/break` are **auth-only, not
  trainingGated**: the member's own history stays readable after a lapse or
  break (page-gates test records the reasons). `/app/pact/week` stays gated.
- Record wall renders **by week number** (missing rows = unmarked week with
  the number shown), never positionally.
- Billing: `handlePactSubscriptionDeleted` skips the pact break when the
  membership is already CANCELLED (the member's own break cancels Stripe
  and the deletion echo must not kill a re-signed pact);
  `handlePactRefund(userId, purchasedAt)` only breaks covenants signed
  before the refunded purchase (+1h slack).
- Activation never reopens a kept/scarred legacy week 1; migration
  backfilled `startedAt = signedAt` for pre-activation pacts with entries.
- Voice-note UI renders only when `voiceNoteUrl` is set (nothing seeded, so
  nothing shows); the pact-side `aiReply` UI was removed until phase 6
  actually writes replies.

**The app is OPEN again** (Sam's explicit call, supersedes the 2026-08-02
seal): any signed-in account enters `/app`, banned users are refused at the
layout. Cohort routing via `/start` (manifest start_url + shortcuts point
there): active Consilium → `/consilium/feed`, everyone else → `/app`.
Login/register land non-consilium users on `/app`. `/consilium` itself
untouched. `getAccess` tier "member" now = consilium OR live pact
(`Access.pactEntitled`). UpgradeSheet no longer checkouts inline; it routes
to `/app/pact` (the ceremony IS the checkout).

**Before this deploys, in order:**
1. `DATABASE_URL=<prod> npx prisma migrate deploy` (migrations
   `20260803000000_add_blood_pact` + `20260803010000_add_pact_goals`)
   BEFORE the code.
2. Sam runs `STRIPE_SECRET_KEY=sk_live_... npx tsx
   scripts/create-pact-product.ts` (live Stripe write) and pastes the two
   price ids into `STRIPE_PRICES.PACT_WEEKLY/PACT_ANNUAL`. Until then the
   create route returns 503 "The Pact is not open yet".
3. Challenge content: seed `PactWeek` rows (LAST, per Sam; nothing
   announces while unpublished, the week page has a graceful fallback).

**Sharing (supersedes the Phase 5 wall, Sam 2026-08-03):** the optional
public note posts to the FEED as the member's own small `PACT_NOTE`
FeedPost, week-coloured, under their name or Anonymous (choice in
metadata; real `authorId` always stored, masked at serialization via
`lib/pact/note.ts` `maskPactAuthor`, applied in ALL five feed
serializers, old consilium included). `PactEntry.feedPostId` (SetNull
FK) tracks it: edit updates in place, retraction or crisis flag deletes
it. The week screen has a saved view (read-only entry + drawn check +
"Week N updated", Edit reopens the composer).

**Not built yet:** Phase 6 AI replies (reuse the program reply engine),
admin runway view. `/api/user/delete` was FIXED (C10 cookieStore bug) +
extended to cancel pact subs.

## 🎨 Design System

- **Logo:** `KBSpinLogo` (sm/md/lg/xl, optional spin animation).
- **Palette:** `--deep-black: #0a0a0a`, `--accent-gold: #d4af37`, `--accent-burgundy: #722139`, `--deep-burgundy: #4a1426`, `--deep-navy: #0f172a`, `--text-light: #e5e5e5`, `--text-gray: #a0a0a0`.
- **Typography:** Headers uppercase, extra-light to thin, wide tracking. Body light weight. Gold gradient for emphasis.
- Mobile-first, dark mode only.

## 🎞 Motion and character

**Live reference: `/app/dev/motion`** (dev only). Three tiers side by side,
ordered by cost rather than by looks, so a motion decision gets made by
comparing instead of arguing.

**What the stack can do today, unaided:**

| Tier | Tech | Ceiling | Cost |
|---|---|---|---|
| 1 | Pure CSS | Staggered entrances, breathing borders, multi-layer idle flicker, scale-driven fills, asymmetric press curves | Free. Compositor only |
| 2 | `framer-motion@10` (already a dependency) | Shared element transitions, spring counters, SVG `pathLength` draw-on, velocity-aware drag sheets | ~0kb new |
| 3 | Hand-written WebGL2 | Signed-distance-field characters with computed rim light and live state, domain-warped noise cinematics | One triangle, one draw call, no asset |

Rules that hold across all three: **transform and opacity only** (anything
touching width, top, or box-shadow leaves tier 1 and starts costing frames);
**no `filter: blur()` on mobile**; every looping animation gates on
`useReducedMotion()`; WebGL caps DPR at 2 and parks its raf loop off screen.

**Hard limits of tier 3, proven not assumed.** SDFs give form and light, never
features. There is no face, no eye contact, no mouth. Timing derived from sine
waves cannot match a designer's hand-keyed glance. And a shader cannot make the
same character look like themselves twice, which is an asset-pipeline problem
rather than a rendering one.

**DECIDED 2026-08-01: no photoreal faces.** A composite was built and rejected
on sight: a generated portrait as a texture with the shader adding breath,
parallax, a travelling rim light and a channel-split tell. It worked
technically and Sam does not want it, so photographic cast art is off the
table. The direction that survived is drawn, computed, and abstract. Anything
proposing generated headshots for characters is relitigating a settled call.

Two findings worth keeping from the attempt. **Character consistency does not
work yet**: feeding a portrait back through `fal-ai/flux/dev/image-to-image` at
strength 0.42 asking only for a change of expression returns the right
expression on a visibly different person. **And image generation runs over the
fal REST API, not MCP** if it is ever needed for marketing or covers. Both
global MCP image servers are dead ends: `mcp-image` still holds the literal
placeholder `PASTE_GEMINI_KEY_HERE`, and the global `fal-ai` entry runs
`uvx --from fal-mcp-server fal-mcp`, which crashes on import (`'Server' object
has no attribute 'list_tools'`, an MCP SDK version mismatch) and exposes zero
tools. The working key lives in `~/.claude.json` at
`mcpServers['fal-ai'].env.FAL_KEY`; read it from there and POST to
`https://fal.run/<model>` with an `Authorization: Key <key>` header.
`fal-ai/flux-pro/v1.1-ultra` is the model that produced usable results. Never
print the key into a transcript.

**What Sam picked, 2026-08-01.** Two things, from opposite ends of the cost
ladder, which is the useful signal: the **shimmer bar** (tier 1, `ml-fill`
scaleX plus `ml-shimmer` translateX, pure CSS, no JS, no dependency) and the
**manipulation-detected cinematic** (tier 3, domain-warped fBm in a fragment
shader with a framer-motion per-letter stagger on top). Neither ships an asset.
That is the through-line to hold: motion that is computed, not downloaded.

**To raise the ceiling, in value-per-cost order:**

1. **Rive** (`@rive-app/react-canvas`). The single biggest jump. Rigged 2D with
   real state machines, kilobyte files, 60fps on a phone, driven from code by
   one line. This is what turns a silhouette into a character who reacts.
   Needs a licence for commercial use and someone to author the rigs.
2. **A 2D artist, or generated art used as reference for drawn work.** With
   photoreal off the table (see the decision above), the way to a face is
   illustration: stylised, flat, on-brand, and rig-able. Generation is still
   useful upstream as mood and pose reference, never as the shipped pixel.
3. **Character consistency tooling** (a LoRA or a face-reference model),
   only if drawn art ever needs a generated pipeline behind it. Measured, not
   assumed: see the finding above. Forty characters across eight emotions
   each is the real problem, and one good image does not touch it.
4. **A motion designer, or Lottie**. `lottie-web` costs ~250kb but accepts
   After Effects output directly, which is the only way to get performance a
   human keyed rather than a formula derived.
5. **Three.js / React Three Fiber** for real 3D: depth, camera moves, lighting
   rigs. ~150kb and a genuine step up in complexity. Only worth it if the
   product wants scenes rather than portraits.
6. **The existing Blender pipeline** at `Apps/Animation-project` in the
   monorepo. Blender to baked sprite sheets or glTF is the seam between asset
   creation and this runtime, and it is already half built.
7. **A real mid-range Android to test on.** Every performance claim above is
   reasoned from what the property touches, not measured on the device that
   actually struggles.

## 🛠 Development Guidelines

- TypeScript strict, no `any`.
- Tailwind for styling.
- Don't add comments unless explicitly requested.
- Underscore prefix for unused vars (ESLint rule).
- Escape React special characters with HTML entities.
- `const`/`let`, never `var`.

## 🔧 Outstanding High-Value TODO

### Simulator play modes (Story / Gauntlet, built 2026-08-01)

Two per-run modes, toggle on the scenario intro. **Story = the authored
prompts as tappable cards** (no freeform composer anywhere in story).
**Gauntlet = members-only hard mode: the freeform composer alone** (the LLM
judge resolves against authored choices it never shows), tactical reads
withheld until the ending debrief, a 30s clock on every choice (expiry =
"hesitated" = streak break, never auto-picks), and a server-paid +50% XP
bonus. Full design: `docs/SIMULATOR-MODES-PLAN.md`.
Enforcement is server-side in `/api/simulator/complete` (a free account
claiming gauntlet is scored as story). Migration
`20260801120000_add_simulator_play_mode` adds `SimulatorProgress.mode` +
`gauntletClearedAt`; apply to prod BEFORE deploying referencing code.
Phases B-D of the plan (silhouette life, group staging, sound) are designed
but not built.

### Simulator (post-2026-05-08 hardening pass)
- [ ] **Engine unit tests.** `lib/simulator/engine.ts` is 100% pure functions, never exercised by a test. Jest is already wired (`package.json:13`). A ~150-line `engine.test.ts` should cover: `autoAdvance` reaching an ending via direct `nextSceneId`; `autoAdvance` no-op on terminal scenes / self-loops / missing `nextSceneId`; `applyChoice` reaching an ending via `choice.nextSceneId`; `replayXp` draining the auto-advance chain and crediting ending bonus; `replayXp` aborting on stale records and ignoring padding past the abort; `finalizeEnding` stamping `currentSceneId` even when the caller forgets. Locks in the 2026-05-08 hardening pass.
- [ ] **Immersion polish (runner-side).** Surface streak bonus in real-time (pulse on 3rd/5th/7th optimal); subtle audio cue on `DialogTone: "tactical"` lines; verify auto-advance scenes hold long enough to read; on replay, dim already-seen endings in the catalog. All require touching `SimulatorRunner.tsx` and friends, which are large UI files, allocate a dedicated session.
- [ ] **Cosmetic.** `replayXp`'s return field is named `endedAt` but it's actually the final `SimulatorState`. Rename to `state` or `finalState`. Nothing currently depends on the name.

### Infrastructure
- [ ] **Add `prisma migrate deploy` to nixpacks build.** Railway runs `npx prisma db push --skip-generate`, which no-ops on Railway V2 Postgres. New schema must be applied manually with `DATABASE_URL=<prod> npx prisma migrate deploy` BEFORE pushing referencing code. All migrations through `20260516000000_add_user_last_seen_at` are applied as of 2026-05-16 (verified via `prisma migrate status` against prod).

### Bugs
- [ ] **Token refresh race** in `components/dashboard/DashboardClient.tsx:112-131` — concurrent 401s spawn multiple `/api/auth/refresh`. Add singleton refresh promise.
- [ ] **Reset link cancelled by signing out.** `reset-password` enforces single use via `tokenVersion`, which logout also bumps, so signing out invalidates your own unused reset link. The message no longer claims the link was "already used", but the real fix is to persist a per-token id and stop overloading `tokenVersion`. Needs a migration.
- [ ] **Forgot-password timing leak** — make timing-equal between known/unknown emails. Login has the same shape (bcrypt runs only for a known email, so latency answers "does this account exist"); a dummy compare fixes both.
- [ ] **Email template HTML escaping** — sanitize user-supplied strings.
- [ ] **Rate limiting** — `/api/inner-circle/feed/[postId]/comments` is still open. (login, register, forgot-password, reset-password, and admin PIN are all rate-limited via `lib/rate-limit.ts`.)
- [ ] **`fetchWithRefresh` retry contract is dead.** It only retries when a 401 body carries `retry: true`, and `createAuthResponse` (`lib/auth/middleware.ts:125`) never sets it. Harmless today because `authenticateUser` refreshes internally, but the safety net does not exist.

### Engagement (surfaced 2026-04-25)
- [ ] **Feed participation still low** (4% lifetime comment rate as of the April audit; 2026-05-29 pulse: 58 active human members, only 15 seen in 7d — dormancy, not deadness). Seed Kanika's first comment on each prompt to remove "who goes first" friction.
- [x] **Forum + Chat + Classroom dormant** — hidden from nav 2026-04-30, pages redirect to feed since 2026-07-02. Revive only with real content.
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

# The 12 Week Transformation. Unset = each member starts the program on
# their own activation date, which for the existing cohort is months ago
# and would unlock all twelve weeks at once. Set it to the launch date so
# everyone already here begins at week 1 together, while anyone joining
# later still gets their own twelve weeks from their own join date.
PROGRAM_LAUNCH_DATE="2026-08-01T00:00:00Z"

# Web Push
NEXT_PUBLIC_VAPID_PUBLIC_KEY="..."
VAPID_PRIVATE_KEY="..."
VAPID_SUBJECT="mailto:Kanika@kanikarose.com"

# PostHog (funnel analytics). Unset = silent no-op everywhere, which is
# the intended state for local and dev. The project key is write-only and
# already ships in the client bundle, so POSTHOG_KEY exists only for
# setups that want the server half configured separately.
NEXT_PUBLIC_POSTHOG_KEY="phc_..."
NEXT_PUBLIC_POSTHOG_HOST="https://us.i.posthog.com"
POSTHOG_KEY=""                # optional server-side override
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
