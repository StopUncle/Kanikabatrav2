import { redirect } from "next/navigation";

/**
 * Feed tab placeholder. The feed is the largest surface to port, so until it
 * is rebuilt in the app skin the tab hands members to the existing room
 * rather than showing them a dead screen.
 */
export default function AppFeedPage() {
  redirect("/consilium/feed");
}
