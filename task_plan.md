# Task Plan — Site Polish & Enhancement

## Goal
Make the site beautiful, functional, and something people enjoy using. Fix every broken thing, polish every rough edge, add high-value features that don't require content.

---

## Phase 1: Fix What's Broken (Bugs shipping to production)

- [ ] **1.1** Create Inner Circle apply API endpoint — UI exists at /inner-circle/apply but the POST route is missing on master. Users literally cannot apply.
- [ ] **1.2** Remove `alert("Demo mode...")` from success page — ships to production, looks amateur
- [ ] **1.3** Fix coaching page anchor scroll — `#${pkg.id}` links but tier cards have no `id` attributes
- [ ] **1.4** Fix locked quiz results — authenticated-but-locked state shows empty blurred div instead of real radar chart data
- [ ] **1.5** Strip all console.log/console.error from production code — especially PayPalButton (20+ statements)
- [ ] **1.6** Remove Plus button from dashboard purchases header (no onClick handler)
- [ ] **1.7** Fix first book testimonial — "Verified Reader / This book transformed my life" looks fake. Move strongest testimonials first.

## Phase 2: Navigation & Discoverability

- [ ] **2.1** Add Dashboard link to nav (alongside Profile) or make Profile page the hub with clearer Dashboard access
- [ ] **2.2** Add Ask Kanika to main nav or footer Explore section
- [ ] **2.3** Update Footer: add Quiz, Inner Circle, Ask Kanika, Courses to Explore section
- [ ] **2.4** Add Privacy Policy to footer (currently only Terms)
- [ ] **2.5** Connect /content page — either add to nav or integrate videos elsewhere
- [ ] **2.6** Add quiz back button — users can't correct misclicks on 20-question assessment

## Phase 3: Cross-Sells & Funnel Continuity (No dead ends)

- [ ] **3.1** Success page after book purchase: mention quiz unlock ("Your purchase includes free Dark Mirror results"), add Inner Circle CTA
- [ ] **3.2** Quiz results (all states): add Inner Circle mention alongside book/coaching recommendations
- [ ] **3.3** Coaching page: add "Not ready for 1:1? Start with Inner Circle — $29/mo" after pricing
- [ ] **3.4** Donate page: add next action (not just "Back to Home")
- [ ] **3.5** Inner Circle landing: add coaching upgrade mention for members wanting more

## Phase 4: Design Polish (Premium feel, no content needed)

- [ ] **4.1** Branded loading sequence — KB spin logo with tagline reveal on first visit (1.5s)
- [ ] **4.2** Scroll-triggered entrance animations — fade-up sections on viewport entry (Framer Motion, already used across site)
- [ ] **4.3** Film grain texture overlay — subtle noise on dark backgrounds for tactile depth
- [ ] **4.4** Horizontal scroll testimonial strip — screenshot DMs and quotes in editorial format
- [ ] **4.5** Quiz social share buttons — "Share your type" with pre-generated OG images (system already exists at /api/og/quiz/[id])

## Phase 5: Engagement Features (Keep people coming back)

- [ ] **5.1** Membership pause option — when cancelling Inner Circle, offer 1-month pause instead (reduces churn 20-30%)
- [ ] **5.2** Annual pricing for Inner Circle — $249/year (save 2 months). Locks commitment.
- [ ] **5.3** Quiz result sharing — shareable URL per result type, Instagram-optimized card download
- [ ] **5.4** Welcome post auto-created for new Inner Circle members — seed the feed so it's never empty
- [ ] **5.5** Content calendar preview — show upcoming releases in classroom/voice-notes so members know what's coming

## Phase 6: Future (Needs content or bigger build)

- [ ] **6.1** 30-day challenges with streak tracking
- [ ] **6.2** Custom branded reactions (crown, knife, chess piece)
- [ ] **6.3** Member directory with archetype badges
- [ ] **6.4** Dark Mirror AI chatbot (Claude-powered)
- [ ] **6.5** Transformation story showcase section
- [ ] **6.6** Video hero with dark color grading on homepage

---

## Implementation Order

**Immediate (Phase 1):** Fix broken things — these are bugs that hurt real users NOW
**This week (Phase 2):** Navigation fixes — low effort, high impact on discoverability
**Next (Phase 3):** Cross-sells — turns dead ends into revenue
**Then (Phase 4):** Design polish — makes the site feel expensive
**When ready (Phase 5):** Engagement features — keeps members subscribed
**Later (Phase 6):** Big features that need content or significant build time

## Decisions for You

- **4.1 Loading sequence:** Do you want a branded entrance animation? Some people find them annoying.
- **4.3 Film grain:** Subtle noise texture — adds depth but increases complexity. Worth it?
- **4.4 Horizontal testimonials:** Need real testimonial content or DM screenshots from Kanika.
- **5.2 Annual pricing:** $249/year (2 months free)? Or different amount?
- **5.5 Content calendar:** Need Kanika's planned content schedule to show.
- **6.2 Custom reactions:** Which ones? Crown, knife, chess piece, flame, eye?
