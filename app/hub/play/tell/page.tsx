import Link from "next/link";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { getTodaysTellRow } from "@/lib/tells/db";
import { redactTell } from "@/lib/tells/types";
import TellScreen from "@/components/app-shell/play/TellScreen";

export const metadata = {
  title: "Daily Tell | Consilium",
};

/**
 * The Tell is redacted before it reaches the client: no reveal, no
 * per-choice isCorrect or why. Those arrive only in the response to a
 * recorded answer, so the answer key is never in the page source.
 *
 * When nothing is published, this says so plainly. The legacy page falls back
 * to a seed pool whose ids have no DB row, which produces a button that
 * always fails to submit. A calm empty state beats a dead control.
 */
export default async function TellPage() {
  await requireServerAuth("/app/play/tell");
  const tell = await getTodaysTellRow();

  if (!tell) {
    return (
      <div className="px-5 pb-8 pt-6">
        <p className="text-[11px] uppercase tracking-[0.26em] text-[var(--app-gold-soft)]">
          Daily tell
        </p>
        <h1
          className="mt-1 text-[26px] font-light leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Being prepared.
        </h1>
        <p className="mt-3 text-[13.5px] leading-relaxed text-[var(--app-muted)]">
          There is no Tell published for today yet. Nothing you did. Check back
          later, or go and run the drill.
        </p>
        <Link
          href="/app/play/drill"
          className="mt-6 inline-block rounded-full bg-[var(--app-gold)] px-6 py-3 text-[12.5px] font-semibold uppercase tracking-[0.16em] text-[#0a0908]"
        >
          Run the drill
        </Link>
      </div>
    );
  }

  return <TellScreen tell={redactTell(tell)} />;
}
