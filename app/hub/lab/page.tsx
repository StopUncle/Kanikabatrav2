import { requireServerAuth } from "@/lib/auth/server-auth";
import { memberGate } from "@/lib/access/guard";
import LabClient from "@/components/lab/LabClient";

export const metadata = {
  title: "The Lab | Kanika Batra",
  description:
    "Live sparring against manipulator archetypes. One session a day. Hold the line.",
};

/**
 * Member-only. The Lab is the freeform half of the Simulator; a free
 * account gets Rehearsal, never The Room.
 *
 * This page had no auth call of its own and leaned entirely on the shell
 * layout, which was a member-only gate until the free tier opened it. The
 * Lab's API is gated separately, but without this the page itself would
 * render for a free account and only fail once it called out.
 */
export default async function LabPage() {
  const userId = await requireServerAuth("/app/lab");
  const gate = await memberGate(userId);
  if (gate) return gate;

  return <LabClient />;
}
