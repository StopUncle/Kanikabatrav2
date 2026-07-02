import { redirect } from "next/navigation";

// Chat hidden from nav 2026-04-30 (multimillion-roadmap audit: 0 messages,
// empty rooms erode the premium feel) and the routable page retired
// 2026-07-02 so stale bookmarks and old emails land somewhere alive.
// APIs, Pusher wiring and schema are untouched; to revive, restore this
// page from git history.
export default function ChatRedirect() {
  redirect("/consilium/feed");
}
