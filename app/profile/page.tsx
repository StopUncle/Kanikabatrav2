import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyAccessToken } from "@/lib/auth/jwt";
import ProfilePageClient from "@/components/profile/ProfilePageClient";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    redirect("/login?returnTo=/profile");
  }

  try {
    const payload = verifyAccessToken(accessToken);
    return <ProfilePageClient userId={payload.userId} email={payload.email} />;
  } catch {
    redirect("/login?returnTo=/profile");
  }
}

export const metadata = {
  title: "Your Profile — Kanika Batra",
  description: "Your personality profile and account overview",
  robots: { index: false, follow: false },
};
