import Link from "next/link";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import {
  BASELINE_ITEMS,
  redactBaselineItem,
} from "@/lib/mark/baseline-items";
import BaselineRunner from "@/components/mark/BaselineRunner";
import { memberGate } from "@/lib/access/guard";

export const metadata = {
  title: "The Baseline Read | Consilium",
};

/**
 * The Baseline Read, full screen. Sits above the tab bar on purpose:
 * a test with four escape hatches along the bottom is not a test.
 *
 * Items are redacted here, on the server, so the answer key never
 * reaches the browser before the sitting is submitted.
 */

/** Kept in step with RETAKE_COOLDOWN_DAYS in the submit route. */
const RETAKE_COOLDOWN_DAYS = 21;

export default async function BaselineReadPage() {
  const userId = await requireServerAuth("/app/measure/baseline");
  // Member-only surface. The shell no longer gates for us (A2), and this
  // page reads its data straight from Prisma, so the gate has to be here
  // and above the queries.
  const gate = await memberGate(userId);
  if (gate) return gate;

  const last = await prisma.baselineAttempt.findFirst({
    where: { userId },
    orderBy: { takenAt: "desc" },
    select: { takenAt: true },
  });

  const nextAvailableAt = last
    ? new Date(
        last.takenAt.getTime() + RETAKE_COOLDOWN_DAYS * 24 * 60 * 60 * 1000,
      )
    : null;
  const locked = Boolean(nextAvailableAt && nextAvailableAt > new Date());

  return (
    <div className="absolute inset-0 z-50 overflow-y-auto bg-[var(--app-black)]">
      {locked && nextAvailableAt ? (
        <Locked nextAvailableAt={nextAvailableAt} />
      ) : (
        <BaselineRunner items={BASELINE_ITEMS.map(redactBaselineItem)} />
      )}
    </div>
  );
}

function Locked({ nextAvailableAt }: { nextAvailableAt: Date }) {
  const when = nextAvailableAt.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
  });
  return (
    <div className="flex min-h-full flex-col px-6 pb-10 pt-16">
      <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--app-gold-soft)]">
        The Baseline Read
      </p>
      <h1
        className="mt-3 text-[28px] font-light leading-tight"
        style={{ fontFamily: "var(--font-display)" }}
      >
        You have already read this one.
      </h1>
      <p className="mt-4 text-[15px] leading-relaxed text-[var(--app-muted)]">
        The same twelve rooms open again on {when}. Taking it more often
        than that measures how well you remember twelve items, which is
        not the thing worth knowing.
      </p>
      <p className="mt-3.5 text-[15px] leading-relaxed text-[var(--app-muted)]">
        Between now and then, the daily reps are what move it.
      </p>

      <div className="mt-auto flex flex-col gap-3 pt-10">
        <Link
          href="/app/measure"
          className="w-full rounded-full bg-[var(--app-gold)] py-[16px] text-center text-[15px] font-semibold text-[#17130a]"
        >
          See The Mark
        </Link>
        <Link
          href="/app/train"
          className="w-full text-center text-[13px] text-[var(--app-dim)]"
        >
          Train instead
        </Link>
      </div>
    </div>
  );
}
