import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import { getAccess } from "@/lib/access/tier";
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

  const [me, access] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: { displayName: true, name: true, gender: true },
    }),
    getAccess(userId),
  ]);

  const videoUrl = getWelcomeVideoUrl();
  const rawName = me?.displayName || me?.name || "";
  const firstName = rawName.trim().split(/\s+/)[0] || null;
  const freeTier = !access.isMember;

  // For a member, Begin goes to the Baseline Read: the before picture is
  // worth most on the one day they are guaranteed to be paying attention.
  // A free account cannot take the Baseline, so Begin drops them into
  // their first scenario instead, with the gender ask picking the spine.
  return (
    <Arrival
      videoUrl={videoUrl}
      beginHref="/app/measure/baseline"
      firstName={firstName}
      freeTier={freeTier}
      askGender={freeTier && !me?.gender}
      knownGender={me?.gender ?? null}
    />
  );
}
