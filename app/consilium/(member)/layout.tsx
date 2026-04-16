import { redirect } from "next/navigation";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { checkMembership } from "@/lib/community/membership";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import InnerCircleSidebar from "@/components/consilium/InnerCircleSidebar";
import { prisma } from "@/lib/prisma";

export default async function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userId = await requireServerAuth("/consilium/feed");
  const { isMember, redirectUrl } = await checkMembership(userId);

  if (!isMember) {
    redirect(redirectUrl || "/consilium");
  }

  // Count members active in the last 5 minutes for "online" indicator
  const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000);
  const onlineCount = await prisma.user.count({
    where: {
      communityMembership: { status: "ACTIVE" },
      updatedAt: { gte: fiveMinAgo },
    },
  });

  return (
    <div className="min-h-screen bg-deep-black text-text-light">
      <BackgroundEffects />
      <Header />
      <div className="relative z-10 lg:flex pt-16 sm:pt-20">
        <InnerCircleSidebar onlineCount={onlineCount} />
        <main className="flex-1 min-w-0 pt-10 lg:pt-0">
          {children}
        </main>
      </div>
    </div>
  );
}
