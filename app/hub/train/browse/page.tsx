import { redirect } from "next/navigation";

/**
 * The old flat catalog, retired 2026-08-01 (Sam's call: the page was a
 * mess). The climb is the one way through the library now; the daily
 * check-in card moved there with it. This stub catches bookmarks and any
 * link still in the wild.
 */
export default function BrowseRedirect() {
  redirect("/app/train/climb");
}
