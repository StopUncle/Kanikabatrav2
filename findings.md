# Findings — Rounding Out Session (April 2026)

## Quiz → Dashboard Flow

**Current state:**
- QuizResult model has `userId` — results ARE linked to users
- `/api/quiz/my-results` fetches user's latest quiz result, checks if unlocked (paid or has book purchase)
- `QuizDashboardCard` shows primary/secondary type + "View Full Profile" link
- **Missing:** No radar chart on dashboard. No scores breakdown. Just text labels.
- **Missing:** The `completedAt` field in the QuizPreview interface is never populated by the API
- The quiz card is functional but visually basic — just text, no chart, no visual personality breakdown

## Application → Admin Notification Flow

**Current state:**
- Application POST at `/api/inner-circle/apply/route.ts` creates PENDING membership
- Application data stored: whyJoin, whatHope, howFound, agreeToGuidelines
- **NO email notification to admin** when someone applies
- Admin must manually check `/admin/applications` to find new applications
- No email to the applicant confirming receipt either
- Application review in admin panel works (approve/reject buttons)
- APPROVED state now shows payment button (fixed earlier)

## Book Content Available for Feed Posts

**From lib/constants.ts + BookPageClient.tsx:**
- 15 chapter titles with descriptions (The Doctrine of Cold, Love Bombing Mastery, etc.)
- 6+ viral quotes rotating in the hero
- Each chapter could become a "Book Insight" automated post in the feed
- Chapter descriptions are 1-2 sentences — perfect length for feed cards

## Auto-Posting from Book Purchases

**Current state:**
- Book buyer email sequence exists (Welcome → Free Month → Reminder)
- New purchases auto-enroll in the sequence via capture-order webhook
- **Missing:** No automated content generation from book data
- Could auto-post "chapter insights" to the Inner Circle feed from book chapter data

## Key Gaps Identified

1. Dashboard quiz card has no visual radar chart — just text
2. No admin email notification on new applications
3. No applicant confirmation email
4. Book chapter data not being used as feed content
5. The quiz scores are returned by the API but the dashboard card doesn't display them
