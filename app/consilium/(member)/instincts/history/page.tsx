import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Check, X } from "lucide-react";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { getResponseHistory } from "@/lib/tells/db";
import { TRACK_LABELS, type InstinctTrack } from "@/lib/tells/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your History | Train Your Instincts",
  description: "Every Tell you have answered, with your score per axis.",
};

export default async function InstinctsHistoryPage() {
  const userId = await requireServerAuth("/consilium/instincts/history");
  const responses = await getResponseHistory(userId, { limit: 60 });

  return (
    <div className="min-h-screen px-4 py-10 sm:py-14">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/consilium/instincts/today"
          className="inline-flex items-center gap-2 text-text-gray hover:text-accent-gold transition-colors text-sm mb-8"
        >
          <ArrowLeft size={14} /> Today
        </Link>

        <header className="mb-10">
          <p className="text-accent-gold/70 text-[10px] uppercase tracking-[0.4em] mb-3">
            History
          </p>
          <h1 className="text-3xl sm:text-4xl font-extralight tracking-wider uppercase text-text-light mb-2">
            Every Tell, every answer
          </h1>
          <p className="text-text-gray text-sm sm:text-base font-light max-w-2xl">
            Most recent first. Re-reading the misses is where the rating moves.
          </p>
        </header>

        {responses.length === 0 ? (
          <div className="rounded-lg border border-gray-800 bg-deep-black/40 p-10 text-center">
            <p className="text-text-gray font-light text-sm">
              No answers yet. Today&rsquo;s Tell is sitting at the top of
              the dashboard.
            </p>
            <Link
              href="/consilium/instincts/today"
              className="inline-block mt-6 px-5 py-2.5 rounded-full bg-accent-gold text-deep-black font-medium tracking-wider uppercase text-xs hover:bg-accent-gold/90"
            >
              Today&rsquo;s Tell
            </Link>
          </div>
        ) : (
          <div className="rounded-lg border border-gray-800 overflow-hidden">
            <ul className="divide-y divide-gray-800">
              {responses.map((r) => (
                <li
                  key={r.id}
                  className="flex items-center gap-4 px-4 py-3.5 hover:bg-deep-black/40"
                >
                  <span className="flex-shrink-0">
                    {r.isCorrect ? (
                      <Check size={16} className="text-emerald-400" />
                    ) : (
                      <X size={16} className="text-accent-burgundy" />
                    )}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-text-light text-sm font-light truncate">
                      {r.tell.question}
                    </p>
                    <p className="text-text-gray text-xs mt-0.5">
                      Tell {String(r.tell.number).padStart(3, "0")} &middot;{" "}
                      {TRACK_LABELS[r.tell.track as InstinctTrack]} &middot;{" "}
                      {r.answeredAt.toISOString().slice(0, 10)}
                    </p>
                  </div>
                  <span
                    className={`text-xs uppercase tracking-[0.3em] ${
                      r.scoreImpact > 0
                        ? "text-emerald-400"
                        : r.scoreImpact < 0
                          ? "text-accent-burgundy"
                          : "text-text-gray/60"
                    }`}
                  >
                    {r.scoreImpact > 0 ? "+" : ""}
                    {r.scoreImpact}
                  </span>
                  <Link
                    href={`/tells/${r.tell.slug}`}
                    className="text-[10px] uppercase tracking-[0.3em] text-text-gray hover:text-accent-gold"
                  >
                    Open
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="text-text-gray/50 text-xs mt-6">
          Showing the last {responses.length} scored response
          {responses.length === 1 ? "" : "s"}. Replays do not appear here.
        </p>
      </div>
    </div>
  );
}
