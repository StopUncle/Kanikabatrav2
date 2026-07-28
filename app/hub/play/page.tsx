import { redirect } from "next/navigation";

/**
 * The Arcade was a second menu for what Train already is, so it moved onto
 * the Train tab. The games it launched still live under this path, only the
 * room they were listed in has gone.
 */
export default function ArcadePage() {
  redirect("/app/train");
}
