# Task Plan — Dark Mirror Assessment Redesign

## Goal
Transform the quiz into an account-tied, two-tier personality assessment. Quiz forces account creation, results live in dashboard. Book buyers auto-unlock quick results. Extensive assessment ($19.99) is the premium upsell. Quiz becomes the #1 registration driver.

---

## Architecture Decision: Account-Based Results

Quiz results are tied to user accounts, not emails or sessionStorage.
- Taking the quiz → forces registration/login to see results
- Results persist in dashboard forever
- Book buyers auto-unlock (matched by email on account)
- Personality type data feeds email sequences and product recommendations
- Dashboard becomes the central hub

### User Access Matrix
| State | Take Quiz | See Results | Extensive |
|-------|-----------|-------------|-----------|
| Anonymous | Yes | Must register | No |
| Registered (no purchase) | Yes | Preview only ($9.99 or buy book) | $19.99 |
| Book buyer | Yes | Full quick results (auto-unlocked) | $19.99 |
| Extensive buyer | Yes | Full clinical report + PDF | Included |

---

## Phase 1: Account-Gated Quiz Flow (Infrastructure)
**No new content needed — rewire existing quiz to use accounts.**

- [ ] **1.1** Quiz completion → redirect to register/login with quiz data in URL params or temp storage
- [ ] **1.2** After auth → save QuizResult linked to userId (add userId field to QuizResult model)
- [ ] **1.3** Auto-unlock logic: on results page, check if user has a completed BOOK purchase → if yes, show full quick results free
- [ ] **1.4** Dashboard quiz section: show quiz results card with radar chart thumbnail, primary type, "Take the assessment" CTA if not taken
- [ ] **1.5** Remove sessionStorage dependency — results load from DB via userId
- [ ] **1.6** Update QuizResult schema: add `userId String?` field + relation to User

## Phase 2: Quick Assessment Upgrade
**Improve existing 15 questions + scoring.**

- [ ] **2.1** Rewrite questions to be more discriminating (use clinical research insights)
- [ ] **2.2** Add question weighting (not all questions equal)
- [ ] **2.3** Improve scoring algorithm: weighted sums → normalized 0-100 per axis
- [ ] **2.4** Add validity check questions (social desirability, consistency)
- [ ] **2.5** Write Kanika-voice question intros ("Not what you'd tell your therapist — the real thing")

## Phase 3: Extensive Assessment (New Product — $19.99)
**45 questions, clinically grounded, comprehensive report.**

- [ ] **3.1** Write 48 questions (8 per axis × 6 axes) + 3 validity checks
  - Mix: 30 Likert + 12 scenario + 6 forced-choice
  - Grounded in PCL-R, DSM-5, LSRP, Dark Triad, NPI, MACH-IV
  - 25-30% reverse-scored
  - Indirect/low face-validity items (hard to game)
- [ ] **3.2** Build scoring engine: weighted, normalized, cross-axis interaction detection
- [ ] **3.3** Build results report page:
  - Clinical assessment summary (primary, secondary, functioning, cross-axis patterns)
  - 6-axis radar chart (animated)
  - Per-axis deep dive (top 3 axes): percentile, behavioral description, relationship impact, career implications, growth edge
  - Cross-axis interaction analysis
  - Population comparison ("higher than X% of takers")
  - Personalized recommendations
- [ ] **3.4** PDF report generation (downloadable)
- [ ] **3.5** PayPal integration for $19.99 extensive unlock
- [ ] **3.6** Email delivery of full report

## Phase 4: Success Page Upsell + Conversion Flow
**Turn the dead-end success page into a funnel.**

- [ ] **4.1** Book success page: add "Take the Dark Mirror Assessment" CTA (free for buyers)
- [ ] **4.2** Quick quiz results page: add "Get Your Full Clinical Profile — $19.99" upsell
- [ ] **4.3** Extensive results page: add Inner Circle + coaching CTAs based on personality type
- [ ] **4.4** Post-quiz email sequence (personality-type targeted):
  - Day 0: "Your type explained deeper" (value)
  - Day 3: Product recommendation based on type (book/coaching/Inner Circle)
  - Day 7: "People with your profile..." + second CTA

## Phase 5: Dashboard Integration
**Quiz results become a first-class dashboard citizen.**

- [ ] **5.1** Quiz results card in dashboard: radar chart, primary type, "Retake" option
- [ ] **5.2** If no quiz taken: prominent "Discover Your Type" CTA
- [ ] **5.3** If quick only: "Upgrade to Extensive Assessment" upsell
- [ ] **5.4** Extensive results: full report viewable in dashboard + PDF download

---

## Implementation Order
1. **Phase 1** (infrastructure) — account-gated flow, schema update, auto-unlock
2. **Phase 4.1** (quick win) — book success page upsell
3. **Phase 5.1-5.2** (dashboard) — quiz card in dashboard
4. **Phase 2** (content) — upgrade quick assessment questions
5. **Phase 3** (big build) — extensive assessment
6. **Phase 4.2-4.4** (conversion) — upsells + email sequences

## Pricing
- Quick quiz: Free to take, free results for book buyers, $9.99 for others
- Extensive assessment: $19.99 standalone
- Book + quiz: $24.99 (book price unchanged, quiz unlock is a bonus)

## Decisions Confirmed
- Account-based, not email-based ✓
- Book buyers get free quick unlock ✓ 
- Dashboard is the results hub ✓
- Two tiers: quick ($9.99/free) + extensive ($19.99) ✓
