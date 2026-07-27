import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import { getWelcomeVideoUrl } from "@/lib/welcome-video";
import Arrival from "@/components/app-shell/Arrival";

export const metadata = {
  title: "Welcome | Consilium",
};

/**
 * The Arrival. Shown once, right after joining.
 */
export default async function WelcomePage() {
  const userId = await requireServerAuth("/app/welcome");

  const me = await prisma.user.findUnique({
    where: { id: userId },
    select: { displayName: true, name: true },
  });

  const videoUrl = getWelcomeVideoUrl();
  const rawName = me?.displayName || me?.name || "";
  const firstName = rawName.trim().split(/\s+/)[0] || null;

  // Begin goes to the Baseline Read: the before picture is worth most on
  // the one day a member is guaranteed to be paying attention. The runner
  // carries its own quiet way out for anyone who does not want it now.
  return (
    <Arrival
      videoUrl={videoUrl}
      beginHref="/app/measure/baseline"
      firstName={firstName}
    />
  );
}
