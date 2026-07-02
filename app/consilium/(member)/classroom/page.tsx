import { redirect } from "next/navigation";

// Classroom hidden from nav 2026-04-30 (multimillion-roadmap audit: zero
// enrollments) and the routable page retired 2026-07-02 so stale bookmarks
// land somewhere alive. Course/module/lesson APIs and schema are untouched;
// entry returns once the certification curriculum (Phase 3-4) gives it
// real content. To revive, restore this page from git history.
export default function ClassroomRedirect() {
  redirect("/consilium/feed");
}
