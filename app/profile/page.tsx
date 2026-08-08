import { redirect } from "next/navigation";
import { resolveActiveUserId } from "@/lib/auth/resolve-user";
import { prisma } from "@/lib/prisma";
import ProfilePageClient from "@/components/profile/ProfilePageClient";
import AnalyticsIdentify from "@/components/analytics/AnalyticsIdentify";

/**
 * `?section=emails` marks a visit that came from the unsubscribe link in
 * an email. New links route through /preferences, which resolves the right
 * shell per person; this still honours the section directly so the older
 * links already sitting in inboxes land on the switches too.
 */
export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const raw = params.section;
  const section = Array.isArray(raw) ? raw[0] : raw;
  const wantsEmails = section === "emails";
  const returnTo = wantsEmails ? "/profile?section=emails" : "/profile";

  const userId = await resolveActiveUserId();
  if (!userId) {
    redirect(`/login?returnTo=${encodeURIComponent(returnTo)}`);
  }
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true },
  });
  if (!user) {
    redirect(`/login?returnTo=${encodeURIComponent(returnTo)}`);
  }
  return (
    <>
      <AnalyticsIdentify userId={user.id} email={user.email} />
      <ProfilePageClient
        userId={user.id}
        email={user.email}
        highlightEmails={wantsEmails}
      />
    </>
  );
}

export const metadata = {
  title: "Your Profile. Kanika Batra",
  description: "Your personality profile and account overview",
  robots: { index: false, follow: false },
};
