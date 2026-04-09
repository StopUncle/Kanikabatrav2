# Task Plan — Rounding Out (Quiz, Application Flow, Auto-Content)

## Goal
Make quiz results show beautifully in the dashboard with radar chart. Ensure the full application → approval → notification flow works. Auto-generate Inner Circle feed content from book data. Trace and verify every user flow end-to-end.

---

## Phase 1: Quiz Results in Dashboard (Beautiful Display)

- [x] **1.1** QuizDashboardCard rebuilt — inline SVG radar (6 axes, gold polygon, hexagon grid), no chart lib
- [x] **1.2** Score breakdown bars (sorted highest first, primary type highlighted gold, percent of total)
- [x] **1.3** Personality profile summary pulled from PERSONALITY_PROFILES (name + tagline + description)
- [x] **1.4** Expandable card — radar always visible, breakdown + summary collapse behind "Show Score Breakdown"
- [x] **1.5** Confirmed `/api/quiz/my-results` returns scores in unlocked response

## Phase 2: Application → Notification Flow

- [x] **2.1** Admin alert email — `sendAdminApplicationAlert` hooked into `/api/inner-circle/apply` POST. Includes name, email, why-join, what-hope, how-found, "Review Application" CTA.
- [x] **2.2** Applicant confirmation — `sendApplicationConfirmation` fires alongside admin alert. "What happens next" 24h promise.
- [x] **2.3** Approval email — `sendApplicationApproved` hooked into `/api/admin/applications/[id]` approve branch. Lists 4 benefits, "Activate Membership" → /dashboard.
- [x] **2.4** Admin panel already renders applicationData JSON (verified at /admin/applications).

## Phase 3: Book Content → Inner Circle Feed

- [x] **3.1** `prisma/seeds/book-insights.ts` — 15 chapter insights, dayOfYear 61-75, category "book-chapter"
- [x] **3.2** `scripts/seed-insights.ts` extended to seed bookInsights (idempotent)
- [x] **3.3** `prisma/seeds/viral-quote-prompts.ts` — 6 viral quote discussion prompts (Saturday slot)

## Phase 4: End-to-End Flow Verification

- [x] **4.1** Quiz → results → dashboard: working. Quiz submit → /api/quiz/submit stores by email+userId. /api/quiz/my-results unlocks when paid OR hasBookPurchase.
- [x] **4.2** Register → apply → approve → Stripe → active: working. APPROVED state is handled on /inner-circle/apply?status=approved (ApplicationForm.tsx renders Subscribe button → /api/inner-circle/subscription/create → Stripe checkout → webhook flips membership ACTIVE).
- [x] **4.3** Book → success → email → quiz unlock: now working. Webhook fires sendBookDelivery + email sequence enrollment + auto-unlocks any unpaid QuizResult for that email.
- [x] **4.4** Inner Circle daily experience: feed/comments/reactions/classroom/voice-notes routes all exist. No daily-insights→feed cron exists yet (insights are seeded data, not auto-rendered as feed posts) — flagged but not in scope for this session.

### Phase 4 fixes applied
- Approval email CTA now points to /inner-circle/apply?status=approved (was /dashboard, where there's no checkout button — that's only on the apply page)
- Book webhook auto-unlocks QuizResult by email (was previously only fired by /api/quiz/my-results' second-order Purchase lookup)

---

## Implementation Order
1. Phase 2 (notifications) — quick, high impact, catches lost applicants
2. Phase 1 (quiz display) — visual upgrade, makes dashboard look premium  
3. Phase 3 (book content) — fills the feed with more auto-content
4. Phase 4 (verification) — confirm everything works end-to-end
