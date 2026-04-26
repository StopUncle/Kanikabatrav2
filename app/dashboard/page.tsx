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
  // payload (the user may have changed it since login). Includes the
  // membership status + simulator-run count for the first-scenario
  // intercept below.
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      communityMembership: { select: { status: true } },
      _count: { select: { simulatorProgress: true } },
    },
  });
  if (!user) {
    redirect("/login");
  }

  // First-scenario intercept. Data from the 2026-04-26 silent-member
  // audit (scripts/why-they-left.ts): 9 of 11 paid members who went
  // dark in their first week had ZERO recorded activity beyond
  // signup. The dashboard didn't tell them where to go, so they
  // didn't go anywhere. This redirect runs ONCE — the moment they
  // hit /dashboard with an ACTIVE membership and no SimulatorProgress
  // rows. As soon as they click BEGIN on `mission-1-1`, a row is
  // created and the redirect stops firing for them. The `welcome=1`
  // query is consumed by the simulator page to soften the entrance.
  if (
    user.communityMembership?.status === "ACTIVE" &&
    user._count.simulatorProgress === 0
  ) {
    redirect("/consilium/simulator/mission-1-1?welcome=1");
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
