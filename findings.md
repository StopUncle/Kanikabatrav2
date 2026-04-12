# Findings — Community + Inner Circle Merge

## Current architecture (two separate sections)

### Inner Circle (/inner-circle/*)
- **Layout:** No wrapper. Each page renders Header + BackgroundEffects + InnerCircleNav independently.
- **Nav:** `InnerCircleNav.tsx` — 3 pill tabs (Feed, Voice Notes, Classroom). Inline, not persistent.
- **Pages:** feed, feed/[postId], voice-notes, classroom
- **Access:** `requireServerAuth` → `checkMembership` → must be ACTIVE
- **Feel:** Functional but sparse. No sidebar, no community feel.

### Community (/community/*)
- **Layout:** `CommunityLayout` wraps all pages. Persistent sidebar via `CommunitySidebar.tsx`.
- **Nav:** Full sidebar with forum categories, chat rooms, lock icons for access tiers.
- **Pages:** hub landing, forum index, forum/[category], forum/[category]/new, forum/[category]/post/[id], chat index, chat/[room]
- **Access:** `checkAccessTier` with PUBLIC/REGISTERED/BOOK_OWNER/COACHING_CLIENT/PREMIUM tiers.
- **Feel:** Better UX, persistent navigation, clear structure.

## Why the community sidebar looks better
1. Persistent — always visible, user knows where they are
2. Shows all sections at once — no guessing what's available
3. Active state highlighting via `usePathname`
4. Mobile hamburger overlay (already responsive)
5. Categories and rooms fetched dynamically with access indicators

## What to adopt from community
- Sidebar layout pattern (persistent desktop, hamburger mobile)
- Dynamic nav fetching (forum categories, chat rooms)
- Active state highlighting

## What to keep from inner circle
- Feed with cursor pagination + gender filter
- Voice notes filtered feed view
- Classroom with enrollment + progress tracking
- Onboarding modal (first visit)
- Admin preview bypass

## Shared components after merge
- One sidebar component: `InnerCircleSidebar.tsx`
- One layout: `/app/inner-circle/(member)/layout.tsx` (route group for member-only pages)
- Membership check once in layout, not per-page
- Forum + chat components stay the same, just moved under new routes

## Rose gold applied
- `accent-gold` changed from `#d4af37` to `#B76E79` (Pantone rose gold)
- Gradient text: rose-to-champagne (`#B76E79` → `#E8C4B8`)
- All Tailwind `accent-gold` classes + CSS variables auto-updated
