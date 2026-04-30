import { redirect } from "next/navigation";
import { resolveActiveUserId } from "@/lib/auth/resolve-user";
import { prisma } from "@/lib/prisma";
import ProfilePageClient from "@/components/profile/ProfilePageClient";

export default async function ProfilePage() {
  const userId = await resolveActiveUserId();
  if (!userId) {
    redirect("/login?returnTo=/profile");
  }
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true },
  });
  if (!user) {
    redirect("/login?returnTo=/profile");
  }
  return <ProfilePageClient userId={user.id} email={user.email} />;
}

export const metadata = {
  title: "Your Profile. Kanika Batra",
  description: "Your personality profile and account overview",
  robots: { index: false, follow: false },
};
