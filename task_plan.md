# Task Plan — Community + Inner Circle Merge

## Goal
Merge the separate `/community` (forum + chat) and `/inner-circle` (feed + voice notes + classroom) sections into one unified paid member experience under `/inner-circle`. Adopt the community's superior sidebar layout, unify access control under membership, and redirect all `/community/*` routes.

---

## Phase 1: Unified sidebar layout
- [ ] **1.1** Create `/app/inner-circle/layout.tsx` that wraps ALL inner-circle pages in the sidebar layout (adapted from `CommunitySidebar`)
- [ ] **1.2** Sidebar nav items: Feed, Voice Notes, Classroom, Forum, Chat — all under one roof
- [ ] **1.3** Remove standalone `InnerCircleNav` pill tabs from feed/voice-notes/classroom pages (sidebar replaces them)
- [ ] **1.4** Rose gold accent on sidebar active states + borders
- [ ] **1.5** Mobile hamburger menu (same pattern as admin sidebar)
- [ ] **1.6** Membership check in the layout (not per-page) — single gate for all child routes

## Phase 2: Move forum + chat into Inner Circle
- [ ] **2.1** Move forum pages from `/app/community/forum/*` → `/app/inner-circle/forum/*`
- [ ] **2.2** Move chat pages from `/app/community/chat/*` → `/app/inner-circle/chat/*`
- [ ] **2.3** Update all internal links in forum/chat components to use `/inner-circle/` prefix
- [ ] **2.4** Switch forum/chat access control from `checkAccessTier` to `checkMembership`
- [ ] **2.5** Update the community hub page (`/app/community/page.tsx`) — either delete or convert to redirect

## Phase 3: Redirects + cleanup
- [ ] **3.1** Add 301 redirects: `/community` → `/inner-circle/feed`, `/community/forum/*` → `/inner-circle/forum/*`, `/community/chat/*` → `/inner-circle/chat/*`
- [ ] **3.2** Delete the old `CommunitySidebar` and `CommunityLayout` components (merged into IC layout)
- [ ] **3.3** Remove the `AccessTier` / `checkAccessTier` system (no longer needed — everything is membership-gated)
- [ ] **3.4** Update Header nav links if any point to `/community`
- [ ] **3.5** Update any internal cross-links in blog posts, email templates, etc.

## Phase 4: Who's online + polish
- [ ] **4.1** Add "last active" tracking — update a `User.lastActiveAt` timestamp on feed/forum page loads
- [ ] **4.2** Add "X members online" indicator to the sidebar (users active in last 5 min)
- [ ] **4.3** Consistent card styling across feed posts, forum posts, and chat messages
- [ ] **4.4** Typecheck + lint + test
- [ ] **4.5** Commit + push + deploy

---

## Key decisions
- **No free tier** — everything inside `/inner-circle/*` requires ACTIVE membership. The landing page at `/inner-circle` remains public (marketing).
- **Forum categories stay** — they just move under the membership gate instead of using access tiers.
- **Chat rooms stay** — Pusher-backed real-time chat moves into the IC sidebar. Premium/public room distinction removed (all rooms are for members).
- **Sidebar replaces pill tabs** — one persistent nav for desktop, hamburger overlay for mobile.
