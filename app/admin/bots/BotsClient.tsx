"use client";

import { useState } from "react";

interface Settings {
  enabled: boolean;
  dryRun: boolean;
}
interface Bot {
  id: string;
  displayName: string | null;
  email: string;
  botActive: boolean;
}
interface Action {
  id: string;
  type: string;
  status: string;
  commentText: string | null;
  failureReason: string | null;
  createdAt: string;
  executedAt: string | null;
  bot: { displayName: string | null };
  post: { id: string; title: string };
}

export default function BotsClient({
  initialSettings,
  bots: initialBots,
  initialActions,
}: {
  initialSettings: Settings;
  bots: Bot[];
  initialActions: Action[];
}) {
  const [settings, setSettings] = useState(initialSettings);
  const [bots, setBots] = useState(initialBots);
  const [busy, setBusy] = useState<string | null>(null);

  async function patchSettings(patch: Partial<Settings>) {
    setBusy("settings");
    const r = await fetch("/api/admin/bots/settings", {
      method: "PATCH",
      body: JSON.stringify(patch),
    });
    if (r.ok) {
      const next = await r.json();
      setSettings({ enabled: next.enabled, dryRun: next.dryRun });
    }
    setBusy(null);
  }

  async function toggleBot(botId: string, active: boolean) {
    setBusy(botId);
    await fetch("/api/admin/bots/toggle", {
      method: "PATCH",
      body: JSON.stringify({ botId, active }),
    });
    setBots((bs) => bs.map((b) => (b.id === botId ? { ...b, botActive: active } : b)));
    setBusy(null);
  }

  async function runNow() {
    setBusy("run");
    await fetch("/api/admin/bots/run", { method: "POST" });
    setBusy(null);
    location.reload();
  }

  return (
    <div className="text-text-light">
      <h1 className="text-2xl font-light tracking-wider uppercase mb-6">
        Bot Engagement
      </h1>

      <section className="mb-8 rounded-xl border border-warm-gold/20 bg-deep-black/50 p-5">
        <h2 className="text-lg font-light mb-3">Global controls</h2>
        <label className="flex items-center gap-3 mb-2">
          <input
            type="checkbox"
            checked={settings.enabled}
            onChange={(e) => patchSettings({ enabled: e.target.checked })}
            disabled={busy === "settings"}
          />
          <span>Enabled (cron processes the queue)</span>
        </label>
        <label className="flex items-center gap-3 mb-4">
          <input
            type="checkbox"
            checked={settings.dryRun}
            onChange={(e) => patchSettings({ dryRun: e.target.checked })}
            disabled={busy === "settings"}
          />
          <span>Dry-run (generate text + log, don&apos;t insert FeedComment/Like)</span>
        </label>
        <button
          onClick={runNow}
          disabled={!!busy}
          className="px-3 py-1.5 rounded bg-warm-gold/20 border border-warm-gold/40 text-warm-gold text-sm"
        >
          {busy === "run" ? "Running…" : "Run cron now"}
        </button>
      </section>

      <section className="mb-8 rounded-xl border border-warm-gold/20 bg-deep-black/50 p-5">
        <h2 className="text-lg font-light mb-3">Personas ({bots.length})</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
          {bots.map((b) => (
            <button
              key={b.id}
              onClick={() => toggleBot(b.id, !b.botActive)}
              disabled={busy === b.id}
              className={`px-3 py-2 rounded border text-left ${
                b.botActive
                  ? "border-emerald-400/40 bg-emerald-400/10"
                  : "border-text-gray/30 bg-text-gray/5 text-text-gray"
              }`}
            >
              {b.displayName ?? b.email} · {b.botActive ? "on" : "off"}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-warm-gold/20 bg-deep-black/50 p-5">
        <h2 className="text-lg font-light mb-3">
          Recent actions ({initialActions.length})
        </h2>
        <table className="w-full text-xs">
          <thead className="text-text-gray/70 uppercase tracking-wider">
            <tr>
              <th className="text-left py-2">When</th>
              <th className="text-left">Type</th>
              <th className="text-left">Status</th>
              <th className="text-left">Bot</th>
              <th className="text-left">Post</th>
              <th className="text-left">Text</th>
            </tr>
          </thead>
          <tbody>
            {initialActions.map((a) => (
              <tr key={a.id} className="border-t border-warm-gold/10">
                <td className="py-2 align-top">
                  {new Date(a.createdAt).toLocaleString()}
                </td>
                <td className="align-top">{a.type}</td>
                <td className="align-top">{a.status}</td>
                <td className="align-top">{a.bot.displayName}</td>
                <td className="align-top">{a.post.title.slice(0, 40)}</td>
                <td className="align-top max-w-md text-text-gray">
                  {a.commentText ?? a.failureReason ?? "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
