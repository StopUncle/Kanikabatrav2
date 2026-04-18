import { redirect } from "next/navigation";
import { resolveActiveUserId } from "@/lib/auth/resolve-user";
import { prisma } from "@/lib/prisma";
import DashboardClient from "@/components/dashboard/DashboardClient";

export default async function DashboardPage() {
  // Ban-aware auth — deleted / banned / tokenVersion-revoked sessions
  // bounce back to login instead of rendering a partially-broken shell
  // against an orphaned userId.
  const userId = await resolveActiveUserId();
  if (!userId) {
    redirect("/login");
  }

  // Pull the canonical email from the DB rather than trusting the JWT
  // payload (the user may have changed it since login).
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true },
  });
  if (!user) {
    redirect("/login");
  }

  return <DashboardClient user={{ email: user.email, userId: user.id }} />;
}

export const metadata = {
  title: "Dashboard - Kanika Batra",
  description:
    "Your dark psychology command center - manage purchases, coaching sessions, and exclusive resources",
  robots: {
    index: false,
    follow: false,
  },
};
