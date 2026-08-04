import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { requireServerAuth } from "@/lib/auth/server-auth";
import TellPlayer from "@/components/tells/TellPlayer";
import InstinctsHex from "@/components/tells/InstinctsHex";
import LeagueCard from "@/components/tells/LeagueCard";
import { PageHeader, PageShell } from "@/components/app-shell/ui";
import {
  getBonusTells,
  getInstinctScore,
  getTellStreak,
  getTodaysTellRow,
} from "@/lib/tells/db";
import { getTodaysTell as getTodaysSeed } from "@/lib/tells/seed-tells";
import { redactTell } from "@/lib/tells/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Today's Tell | Consilium",
  description: "Your daily Tell, score, and streak.",
};

export default async function ConsiliumTellsTodayPage() {
  const userId = await requireServerAuth("/app/instincts/today");

  const [tell, score, streak] = await Promise.all([
    getTodaysTellRow().then((row) => row ?? getTodaysSeed()),
    getInstinctScore(userId),
    getTellStreak(userId),
  ]);

  // Bonus Tells: up to 2 published Tells the user has not completed.
  // Skipped on the seed-fallback path (no DB rows = no bonus pool).
  const bonus =
    tell.id.startsWith("tell-")
      ? await getBonusTells({
          excludeId: tell.id,
          excludeUserId: userId,
          limit: 2,
        })
      : [];

  return (
    <PageShell>
      <PageHeader title="Today's Tell" />

      <TellPlayer tell={redactTell(tell)} surface="member" />

      <div className="mt-8 flex flex-col gap-3">
        <div className="rounded-2xl border border-[var(--app-line-soft)] bg-[var(--app-card)] p-4">
          <p className="mb-3 text-app-tiny uppercase tracking-app-label text-[var(--app-gold)] opacity-70">
            Your hex
          </p>
          <div className="flex justify-center">
            <InstinctsHex score={score} size={280} showLabels={true} />
          </div>
          <Link
            href="/app/instincts/score"
            className="mt-4 flex items-center justify-between text-app-body text-[var(--app-text)] active:text-[var(--app-gold)]"
          >
            <span>Full breakdown</span>
            <ChevronRight size={16} />
          </Link>
          <Link
            href="/app/instincts/history"
            className="mt-2.5 flex items-center justify-between text-app-body text-[var(--app-muted)] active:text-[var(--app-gold)]"
          >
            <span>History</span>
            <ChevronRight size={16} />
          </Link>
        </div>

        <LeagueCard />

        <div className="rounded-2xl border border-[var(--app-line-soft)] bg-[var(--app-card)] p-4">
          <p className="mb-2 text-app-tiny uppercase tracking-app-label text-[var(--app-gold)] opacity-70">
            Streak
          </p>
          <div className="flex items-baseline gap-2">
            <span
              className="text-app-hero font-light text-[var(--app-gold)] tabular-nums"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {streak?.currentDays ?? 0}
            </span>
            <span className="text-app-body text-[var(--app-muted)]">
              {(streak?.currentDays ?? 0) === 1 ? "day" : "days"}
            </span>
          </div>
          <p className="mt-1.5 text-app-caption text-[var(--app-dim)]">
            Longest: {streak?.longestDays ?? 0} &middot; Freezes left this
            week: {streak?.freezesAvail ?? 1}
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--app-line-soft)] bg-[var(--app-card)] p-4">
          <p className="mb-2 text-app-tiny uppercase tracking-app-label text-[var(--app-gold)] opacity-70">
            Total answered
          </p>
          <p
            className="text-app-title font-light text-[var(--app-text)] tabular-nums"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {score.totalAnswered}
          </p>
          <p className="mt-1.5 text-app-caption leading-relaxed text-[var(--app-dim)]">
            Each answer adjusts your axis ratings via Elo. The first thirty
            answers move the needle harder, then it stabilises.
          </p>
        </div>
      </div>

      {bonus.length > 0 && (
        <div className="mt-8 border-t border-[var(--app-line-soft)] pt-6">
          <p className="mb-1 text-app-tiny uppercase tracking-app-label text-[var(--app-gold)] opacity-70">
            Bonus reps
          </p>
          <p className="mb-2 text-app-body text-[var(--app-muted)]">
            Two more Tells you have not seen. Half the rating weight, full
            streak credit.
          </p>
          {bonus.map((b) => (
            <div
              key={b.id}
              className="mt-6 border-t border-[var(--app-line-soft)] pt-6"
            >
              <TellPlayer tell={redactTell(b)} surface="member" />
            </div>
          ))}
        </div>
      )}
    </PageShell>
  );
}
