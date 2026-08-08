import { redirect } from "next/navigation";
import { optionalServerAuth } from "@/lib/auth/server-auth";
import { checkMembership } from "@/lib/community/membership";
import { prisma } from "@/lib/prisma";

/**
 * The email-preferences door. One URL for every "manage your emails" link
 * in every email we send, which then lands each person on the toggles
 * inside the product they actually use.
 *
 * It exists because the alternative is choosing a shell in the footer of a
 * message that outlives the choice. Links sit in inboxes for months: a
 * hardcoded /profile would have to stay correct past the app cutover, and
 * a hardcoded /app/profile drops today's Consilium members into a shell
 * they do not use. This resolves at click time instead, the same way
 * /start does for the PWA.
 *
 * Signed out, it sends people through the login door and back here, so the
 * cohort question is answered once they are someone we can route.
 */
export const dynamic = "force-dynamic";

const TARGET = {
  app: "/app/profile?section=emails",
  consilium: "/consilium/profile?section=emails",
} as const;

export default async function PreferencesPage() {
  const userId = await optionalServerAuth();

  if (!userId) {
    // Round trip through the door. `safeRedirect` preserves the query, so
    // the section survives the login and they land on the switches.
    redirect(`/login?redirect=${encodeURIComponent("/preferences")}`);
  }

  // Role first: checkMembership's admin-cookie bypass reports admins as
  // members, which would misroute them to the consilium profile.
  const me = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });
  if (me?.role === "ADMIN") {
    redirect(TARGET.app);
  }

  const check = await checkMembership(userId);
  redirect(check.isMember ? TARGET.consilium : TARGET.app);
}
