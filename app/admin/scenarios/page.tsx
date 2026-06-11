"use client";

import { useCallback, useEffect, useState } from "react";
import { RefreshCw, Sparkles } from "lucide-react";

type Item = {
  id: string;
  scenarioId: string;
  title: string;
  tagline: string;
  status: "DRAFT" | "PUBLISHED" | "REJECTED";
  briefKey: string;
  model: string;
  costMicros: number;
  notes: string | null;
  createdAt: string;
  publishedAt: string | null;
  sceneCount: number;
  description: string;
  difficulty: string;
  estimatedMinutes: number;
};

const STATUS_STYLE: Record<Item["status"], string> = {
  DRAFT: "text-accent-gold border-accent-gold/40",
  PUBLISHED: "text-emerald-300 border-emerald-300/40",
  REJECTED: "text-red-300 border-red-300/40",
};

export default function GeneratedScenariosAdmin() {
  const [items, setItems] = useState<Item[] | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/generated-scenarios");
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to load");
        return;
      }
      setItems(data.items);
      setError(null);
    } catch {
      setError("Failed to load");
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const act = useCallback(
    async (id: string, action: "publish" | "reject") => {
      setBusy(id);
      setError(null);
      try {
        const res = await fetch(`/api/admin/generated-scenarios/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(
            data.failures?.join("; ") ?? data.error ?? "Action failed",
          );
        }
        await load();
      } finally {
        setBusy(null);
      }
    },
    [load],
  );

  const generate = useCallback(async () => {
    setGenerating(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/generated-scenarios", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) setError(data.error ?? "Generation failed");
      await load();
    } finally {
      setGenerating(false);
    }
  }, [load]);

  return (
    <div className="p-6 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white font-extralight text-2xl uppercase tracking-wide">
            Generated Scenarios
          </h1>
          <p className="text-text-gray/60 font-light text-sm mt-1">
            The daily drip. Drafts publish into the member Fresh Files shelf;
            nothing goes live without your eyes on it.
          </p>
        </div>
        <button
          onClick={() => void generate()}
          disabled={generating}
          className="inline-flex items-center gap-2 text-accent-gold text-xs uppercase tracking-[0.2em] font-light border border-accent-gold/40 rounded-lg px-4 py-2.5 hover:border-accent-gold transition-colors disabled:opacity-50"
        >
          {generating ? (
            <RefreshCw size={13} className="animate-spin" aria-hidden />
          ) : (
            <Sparkles size={13} aria-hidden />
          )}
          {generating ? "Writing..." : "Generate now"}
        </button>
      </div>

      {error && (
        <p className="text-red-400/90 text-sm font-light mb-4">{error}</p>
      )}

      {items === null ? (
        <p className="text-text-gray/60 font-light animate-pulse">Loading</p>
      ) : items.length === 0 ? (
        <p className="text-text-gray/60 font-light">
          Nothing generated yet. The daily cron fills this, or hit Generate
          now.
        </p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-white/10 bg-deep-black/60 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-white font-light truncate">
                      {item.title}
                    </h2>
                    <span
                      className={`text-[9px] uppercase tracking-[0.2em] font-light border rounded-full px-2.5 py-0.5 ${STATUS_STYLE[item.status]}`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="text-text-gray/70 font-light text-sm mt-1">
                    {item.tagline}
                  </p>
                  <p className="text-text-gray/40 font-light text-xs mt-2">
                    {item.scenarioId} · {item.sceneCount} scenes ·{" "}
                    {item.difficulty || "?"} · ~{item.estimatedMinutes}m · brief:{" "}
                    {item.briefKey} · ${(item.costMicros / 1_000_000).toFixed(2)}{" "}
                    · {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                  {item.notes && (
                    <pre className="text-red-300/80 text-xs font-light mt-2 whitespace-pre-wrap">
                      {item.notes}
                    </pre>
                  )}
                  {expanded === item.id && item.description && (
                    <p className="text-white/70 font-light text-sm mt-3 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  {item.status === "DRAFT" && (
                    <>
                      <button
                        onClick={() => void act(item.id, "publish")}
                        disabled={busy === item.id}
                        className="text-emerald-300 text-xs uppercase tracking-[0.15em] font-light border border-emerald-300/40 rounded-lg px-3 py-1.5 hover:border-emerald-300 transition-colors disabled:opacity-50"
                      >
                        Publish
                      </button>
                      <button
                        onClick={() => void act(item.id, "reject")}
                        disabled={busy === item.id}
                        className="text-red-300/80 text-xs uppercase tracking-[0.15em] font-light border border-red-300/30 rounded-lg px-3 py-1.5 hover:border-red-300 transition-colors disabled:opacity-50"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {item.status === "PUBLISHED" && (
                    <>
                      <a
                        href={`/consilium/simulator/${item.scenarioId}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-accent-gold/90 text-xs uppercase tracking-[0.15em] font-light border border-accent-gold/30 rounded-lg px-3 py-1.5 hover:border-accent-gold transition-colors text-center"
                      >
                        Play
                      </a>
                      <button
                        onClick={() => void act(item.id, "reject")}
                        disabled={busy === item.id}
                        className="text-red-300/80 text-xs uppercase tracking-[0.15em] font-light border border-red-300/30 rounded-lg px-3 py-1.5 hover:border-red-300 transition-colors disabled:opacity-50"
                      >
                        Unpublish
                      </button>
                    </>
                  )}
                  <button
                    onClick={() =>
                      setExpanded(expanded === item.id ? null : item.id)
                    }
                    className="text-text-gray/60 text-xs font-light hover:text-white transition-colors"
                  >
                    {expanded === item.id ? "Less" : "More"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
