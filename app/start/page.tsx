import { redirect } from "next/navigation";
import { optionalServerAuth } from "@/lib/auth/server-auth";
import { checkMembership } from "@/lib/community/membership";
import { prisma } from "@/lib/prisma";

/**
 * The cohort router. One URL that always lands you in YOUR product, so
 * every surface that cannot branch per user (the PWA manifest's start_url,
 * its shortcuts, printed links) points here instead of guessing.
 *
 * Active Consilium members belong on /consilium, which the app opening
 * deliberately did not touch; everyone else (free accounts, Pact members,
 * the logged-out) belongs in the app. Admins also land in the app: it is
 * their surface too, and the /admin door still exists for the panel.
 */
export const dynamic = "force-dynamic";

export default async function StartPage() {
  const userId = await optionalServerAuth();
  if (!userId) {
    redirect(`/login?redirect=${encodeURIComponent("/start")}`);
  }

  // Role first: checkMembership's admin-cookie bypass reports admins as
  // members, which would misroute them to the consilium feed.
  const me = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });
  if (me?.role === "ADMIN") {
    redirect("/app");
  }

  const check = await checkMembership(userId);
  if (check.isMember) {
    redirect("/consilium/feed");
  }
  redirect("/app");
}
