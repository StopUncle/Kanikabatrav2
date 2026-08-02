import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { requireServerAuth } from "@/lib/auth/server-auth";
import TellPlayer from "@/components/tells/TellPlayer";
import InstinctsHex from "@/components/tells/InstinctsHex";
import LeagueCard from "@/components/tells/LeagueCard";
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
  title: "Today's Tell | Train Your Instincts",
  description: "Your daily Tell, score, and streak.",
};

export default async function ConsiliumTellsTodayPage() {
  const userId = await requireServerAuth("/consilium/instincts/today");

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
    <div className="min-h-screen px-4 py-10 sm:py-14">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
        <div>
          <header className="mb-6">
            <p className="text-accent-gold/70 text-[10px] uppercase tracking-[0.4em] mb-3">
              Train Your Instincts
            </p>
            <h1 className="text-3xl sm:text-4xl font-extralight tracking-wider uppercase text-text-light">
              Today
            </h1>
          </header>

          <TellPlayer tell={redactTell(tell)} surface="member" />

          {bonus.length > 0 && (
            <div className="mt-16 pt-10 border-t border-gray-800">
              <div className="max-w-3xl mx-auto px-4">
                <p className="text-accent-gold/70 text-[10px] uppercase tracking-[0.4em] mb-2">
                  Bonus reps
                </p>
                <p className="text-text-gray text-sm font-light leading-relaxed mb-2">
                  Two more Tells you have not seen. Half the rating
                  weight, full streak credit.
                </p>
              </div>
              {bonus.map((b) => (
                <div
                  key={b.id}
                  className="mt-10 pt-10 border-t border-gray-800/50"
                >
                  <TellPlayer tell={redactTell(b)} surface="member" />
                </div>
              ))}
            </div>
          )}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 self-start">
          <div className="rounded-lg border border-gray-800 bg-deep-black/60 p-5">
            <p className="text-[10px] uppercase tracking-[0.4em] text-accent-gold/70 mb-4">
              Your hex
            </p>
            <div className="flex justify-center">
              <InstinctsHex
                score={score}
                size={260}
                showLabels={true}
              />
            </div>
            <Link
              href="/consilium/instincts/score"
              className="mt-5 flex items-center justify-between text-text-light hover:text-accent-gold transition-colors text-sm"
            >
              <span>Full breakdown</span>
              <ChevronRight size={16} />
            </Link>
            <Link
              href="/consilium/instincts/history"
              className="mt-3 flex items-center justify-between text-text-gray hover:text-accent-gold transition-colors text-sm"
            >
              <span>History</span>
              <ChevronRight size={16} />
            </Link>
          </div>

          <LeagueCard />

          <div className="rounded-lg border border-gray-800 bg-deep-black/60 p-5 space-y-3">
            <p className="text-[10px] uppercase tracking-[0.4em] text-accent-gold/70">
              Streak
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl text-accent-gold font-extralight">
                {streak?.currentDays ?? 0}
              </span>
              <span className="text-text-gray text-sm">
                {(streak?.currentDays ?? 0) === 1 ? "day" : "days"}
              </span>
            </div>
            <p className="text-text-gray text-xs">
              Longest: {streak?.longestDays ?? 0} &middot; Freezes left this
              week: {streak?.freezesAvail ?? 1}
            </p>
          </div>

          <div className="rounded-lg border border-gray-800 bg-deep-black/60 p-5 space-y-2">
            <p className="text-[10px] uppercase tracking-[0.4em] text-accent-gold/70">
              Total answered
            </p>
            <p className="text-2xl text-text-light font-extralight">
              {score.totalAnswered}
            </p>
            <p className="text-text-gray text-xs leading-relaxed">
              Each answer adjusts your axis ratings via Elo. The first
              thirty answers move the needle harder, then it stabilises.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
