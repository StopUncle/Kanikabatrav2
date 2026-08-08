import { requireServerAuth } from "@/lib/auth/server-auth";
import { memberGate } from "@/lib/access/guard";
import { prisma } from "@/lib/prisma";
import { PageHeader, PageShell } from "@/components/app-shell/ui";
import { readAskState } from "@/lib/questions/read";
import AskKanikaClient from "@/components/app-shell/ask/AskKanikaClient";

export const metadata = {
  title: "Ask Kanika | Consilium",
  description: "One question a day, straight to Kanika.",
};

// The queue moves, the cooldown is a clock, and both are wrong the moment
// they are cached.
export const dynamic = "force-dynamic";

/**
 * Ask Kanika in the app.
 *
 * The old skin hangs this off a pill above the consilium feed and opens it
 * as a modal. That made sense there, where the feed is the whole surface
 * and the pill row is its chrome. The app has no such row: it navigates,
 * so this is a page with a nav entry, which also means it can be linked,
 * shared and returned to.
 *
 * Member-only, and unusually strictly so. This is direct access to Kanika,
 * which is the one thing in the product that cannot scale, and therefore
 * the thing being sold. The gate runs above the queries so a free account
 * costs no reads.
 */
export default async function AppAskPage() {
  const userId = await requireServerAuth("/app/ask");
  const gate = await memberGate(userId, {
    trigger: "locked-nav",
    surfaceLabel: "Ask Kanika",
  });
  if (gate) return gate;

  const [state, viewer] = await Promise.all([
    readAskState(userId),
    prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    }),
  ]);

  return (
    <PageShell>
      <PageHeader
        title="Ask Kanika"
        lede="One question a day. She reads every one, and the best become voice notes and videos."
      />

      <AskKanikaClient
        initialCooldown={{
          allowed: state.cooldown.allowed,
          nextAvailableAt: state.cooldown.nextAvailableAt?.toISOString() ?? null,
          remainingToday: state.cooldown.remainingToday,
          dailyCap: state.cooldown.dailyCap,
        }}
        initialMine={state.mine.map((q) => ({
          id: q.id,
          content: q.content,
          status: q.status,
          answeredAt: q.answeredAt?.toISOString() ?? null,
          createdAt: q.createdAt.toISOString(),
          answerPost: q.answerPost,
        }))}
        initialQueue={state.queue.map((q) => ({
          id: q.id,
          content: q.content,
          upvoteCount: q.upvoteCount,
          createdAt: q.createdAt.toISOString(),
          hasUpvoted: q.hasUpvoted,
          isMine: q.isMine,
          author: q.author,
        }))}
        // Server-configurable via MemberQuestionSettings. The old modal
        // hardcoded 500, so raising the cap in the database silently did
        // nothing for the client and the server rejected nothing either.
        maxLength={state.settings.maxLength}
        isAdmin={viewer?.role === "ADMIN"}
      />
    </PageShell>
  );
}
