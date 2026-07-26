import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import Arrival from "@/components/app-shell/Arrival";

export const metadata = {
  title: "Welcome | Consilium",
};

/**
 * The Arrival. Shown once, right after joining.
 *
 * The welcome video is read from an env var for now. When the admin-managed
 * setting lands, this single line becomes the call to that getter and nothing
 * else on the screen changes.
 */
export default async function WelcomePage() {
  const userId = await requireServerAuth("/app/welcome");

  const me = await prisma.user.findUnique({
    where: { id: userId },
    select: { displayName: true, name: true },
  });

  const videoUrl = process.env.NEXT_PUBLIC_WELCOME_VIDEO_URL || null;
  const rawName = me?.displayName || me?.name || "";
  const firstName = rawName.trim().split(/\s+/)[0] || null;

  return (
    <Arrival videoUrl={videoUrl} beginHref="/app" firstName={firstName} />
  );
}
