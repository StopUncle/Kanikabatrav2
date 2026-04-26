"use client";

import { useState, useEffect } from "react";
import { Send, Users, UserMinus, Loader2, Check, AlertCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Campaign {
  id: string;
  label: string;
  hook: string;
}

interface Stats {
  audience: { total: number; optedIn: number; optedOut: number };
  campaigns: Record<string, Record<string, number>>;
}

interface SendResult {
  campaignId: string;
  enqueued: number;
  skipped: { reason: string; count: number }[];
}

export default function MarketingClient({ campaigns }: { campaigns: Campaign[] }) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [sendingId, setSendingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<SendResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function loadStats() {
    fetch("/api/admin/marketing/stats")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setStats(data));
  }

  useEffect(() => {
    loadStats();
  }, []);

  async function send(campaignId: string) {
    setSendingId(campaignId);
    setError(null);
    setLastResult(null);
    try {
      const r = await fetch("/api/admin/marketing/send-campaign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ campaignId }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.error || "Send failed");
      setLastResult(data as SendResult);
      loadStats();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Send failed");
    } finally {
      setSendingId(null);
      setConfirmId(null);
    }
  }

  return (
    <main className="min-h-screen bg-deep-black text-text-light pt-20 pb-16 lg:pt-6">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-extralight tracking-[0.18em] uppercase text-accent-gold mb-2">
          Marketing
        </h1>
        <p className="text-text-gray text-sm mb-10 max-w-2xl">
          Send a campaign to every opted-in registered user. Each row is queued
          into the email queue (staggered 30s apart) and delivered by the cron
          processor. Re-running a campaign skips users who already received it.
        </p>

        {/* Audience tile */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-10">
          <Tile
            icon={Users}
            label="Total registered"
            value={stats?.audience.total}
            tone="default"
          />
          <Tile
            icon={Send}
            label="Marketing-opted-in"
            value={stats?.audience.optedIn}
            tone="gold"
          />
          <Tile
            icon={UserMinus}
            label="Opted out"
            value={stats?.audience.optedOut}
            tone="muted"
          />
        </div>

        {/* Campaign cards */}
        <div className="space-y-3">
          {campaigns.map((c) => {
            const counts = stats?.campaigns?.[c.id] ?? {};
            const sent = counts.SENT ?? 0;
            const pending = counts.PENDING ?? 0;
            const cancelled = counts.CANCELLED ?? 0;
            const isSending = sendingId === c.id;
            const isConfirming = confirmId === c.id;
            return (
              <div
                key={c.id}
                className="border border-accent-gold/15 bg-deep-black/50 rounded-xl p-5"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-[0.22em] text-accent-gold/80 font-light">
                      {c.label}
                    </p>
                    <p className="text-lg font-light text-text-light mt-1.5 leading-snug">
                      {c.hook}
                    </p>
                  </div>
                  {isConfirming ? (
                    <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                      <button
                        onClick={() => send(c.id)}
                        disabled={isSending}
                        className="px-4 py-2 rounded-full bg-accent-gold text-deep-black text-xs font-bold tracking-[0.15em] uppercase hover:bg-accent-gold/90 disabled:opacity-50 inline-flex items-center gap-2"
                      >
                        {isSending ? (
                          <Loader2 size={13} className="animate-spin" />
                        ) : (
                          <Send size={13} />
                        )}
                        Confirm send
                      </button>
                      <button
                        onClick={() => setConfirmId(null)}
                        disabled={isSending}
                        className="px-4 py-2 rounded-full border border-text-gray/30 text-text-gray text-xs tracking-wide hover:text-text-light hover:border-text-gray/60"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmId(c.id)}
                      disabled={isSending}
                      className="shrink-0 px-4 py-2 rounded-full border border-accent-gold/40 text-accent-gold text-xs tracking-[0.15em] uppercase hover:bg-accent-gold/10 hover:border-accent-gold/70 inline-flex items-center gap-2"
                    >
                      <Send size={13} />
                      Send to {stats?.audience.optedIn ?? "—"}
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-text-gray">
                  <span>
                    Sent: <span className="text-emerald-400/90 tabular-nums">{sent}</span>
                  </span>
                  <span>
                    Queued: <span className="text-accent-gold/90 tabular-nums">{pending}</span>
                  </span>
                  <span>
                    Cancelled (opt-out): <span className="text-text-gray tabular-nums">{cancelled}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Result + error toasts */}
        {lastResult && (
          <div className="mt-6 p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 text-sm flex items-start gap-3">
            <Check className="text-emerald-400 shrink-0 mt-0.5" size={16} />
            <div>
              <p className="text-emerald-300 font-light">
                Queued {lastResult.enqueued} email{lastResult.enqueued === 1 ? "" : "s"} for{" "}
                <span className="text-accent-gold">{lastResult.campaignId}</span>.
              </p>
              {lastResult.skipped.length > 0 && (
                <p className="text-text-gray text-xs mt-1">
                  Skipped:{" "}
                  {lastResult.skipped
                    .filter((s) => s.count > 0)
                    .map((s) => `${s.count} ${s.reason}`)
                    .join(" · ") || "0"}
                </p>
              )}
              <p className="text-text-gray/70 text-xs mt-1">
                Cron processor sends ~50 every 15 min — full delivery time depends on
                opted-in count.
              </p>
            </div>
          </div>
        )}
        {error && (
          <div className="mt-6 p-4 rounded-xl border border-red-500/30 bg-red-500/5 text-sm flex items-start gap-3">
            <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={16} />
            <p className="text-red-300 font-light">{error}</p>
          </div>
        )}
      </div>
    </main>
  );
}

interface TileProps {
  icon: LucideIcon;
  label: string;
  value: number | undefined;
  tone: "default" | "gold" | "muted";
}

function Tile({ icon: Icon, label, value, tone }: TileProps) {
  const colorClass =
    tone === "gold"
      ? "text-accent-gold"
      : tone === "muted"
        ? "text-text-gray/70"
        : "text-text-light";
  return (
    <div className="border border-accent-gold/10 bg-deep-black/50 rounded-xl p-4">
      <Icon size={16} className={colorClass} />
      <p className={`text-2xl font-light tabular-nums mt-2 ${colorClass}`}>
        {value === undefined ? "—" : value}
      </p>
      <p className="text-[10px] uppercase tracking-[0.22em] text-text-gray/70 mt-1">
        {label}
      </p>
    </div>
  );
}
