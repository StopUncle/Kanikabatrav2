"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Loader2,
  Plus,
  Crown,
  Star,
  Trash2,
  Save,
  Flame,
  X,
  Clock,
} from "lucide-react";

interface Confession {
  id: string;
  category: string;
  text: string;
  tier: string;
  placement: string | null;
  usedCount: number;
  lastUsedAt: string | null;
  notes: string | null;
  createdAt: string;
}

const SEED_CATEGORIES = [
  "LYING_WITHOUT_GUILT",
  "CALCULATED_KINDNESS",
  "EXPLOITING_VULNERABILITY",
  "INDIFFERENCE_TO_HARM",
  "PERFORMING_EMOTIONS",
  "FINDING_VULNERABILITY_BORING",
  "MIMICKING_GRIEF_OR_LOVE",
  "MANIPULATING_LOVED_ONES",
  "TREATING_RELATIONSHIPS_AS_SYSTEMS",
  "NOT_FEELING_EXPECTED_THINGS",
] as const;

const TIERS = [
  { id: "STANDARD", label: "Standard", color: "text-text-gray", bg: "bg-white/[0.02] border-white/10" },
  { id: "STRONG", label: "Strong", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/30" },
  { id: "LEGENDARY", label: "Legendary", color: "text-accent-gold", bg: "bg-accent-gold/10 border-accent-gold/40" },
] as const;

const PLACEMENTS = [
  { id: "HOOK", label: "Hook", blurb: "0–3s opener, loop opens itself" },
  { id: "TAIL", label: "Tail", blurb: "55–60s rewatch trigger" },
  { id: "DEEPENING", label: "Deepening", blurb: "30–45s parasocial dimension" },
] as const;

function formatCategory(cat: string): string {
  return cat
    .split("_")
    .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
    .join(" ");
}

function tierStyle(tier: string) {
  return TIERS.find((t) => t.id === tier) || TIERS[0];
}

export default function ConfessionsTab() {
  const [confessions, setConfessions] = useState<Confession[]>([]);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});
  const [tierCounts, setTierCounts] = useState<Record<string, number>>({});
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [activeTier, setActiveTier] = useState<string>("ALL");
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [savingId, setSavingId] = useState<string | null>(null);

  // Add form state
  const [newText, setNewText] = useState("");
  const [newCategory, setNewCategory] = useState<string>(SEED_CATEGORIES[0]);
  const [customCategory, setCustomCategory] = useState("");
  const [newTier, setNewTier] = useState("STANDARD");
  const [newPlacement, setNewPlacement] = useState<string>("");
  const [newNotes, setNewNotes] = useState("");

  const fetchConfessions = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeCategory !== "ALL") params.set("category", activeCategory);
      if (activeTier !== "ALL") params.set("tier", activeTier);
      const res = await fetch(`/api/admin/content/confessions?${params}`);
      if (!res.ok) throw new Error(`${res.status}`);
      const data = await res.json();
      setConfessions(data.confessions || []);
      setCategoryCounts(data.categoryCounts || {});
      setTierCounts(data.tierCounts || {});
    } catch {
      setConfessions([]);
      setCategoryCounts({});
      setTierCounts({});
    } finally {
      setLoading(false);
    }
  }, [activeCategory, activeTier]);

  useEffect(() => {
    fetchConfessions();
  }, [fetchConfessions]);

  async function addConfession() {
    if (!newText.trim()) return;
    const category = customCategory.trim() || newCategory;
    const body: Record<string, unknown> = {
      category,
      text: newText,
      tier: newTier,
    };
    if (newPlacement) body.placement = newPlacement;
    if (newNotes.trim()) body.notes = newNotes;
    const res = await fetch("/api/admin/content/confessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      setNewText("");
      setCustomCategory("");
      setNewNotes("");
      setNewPlacement("");
      setNewTier("STANDARD");
      setShowAdd(false);
      fetchConfessions();
    }
  }

  async function updateConfession(id: string, patch: Partial<Confession>) {
    setSavingId(id);
    try {
      await fetch(`/api/admin/content/confessions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      await fetchConfessions();
    } finally {
      setSavingId(null);
    }
  }

  async function markUsed(id: string) {
    setSavingId(id);
    try {
      await fetch(`/api/admin/content/confessions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ incrementUse: true }),
      });
      await fetchConfessions();
    } finally {
      setSavingId(null);
    }
  }

  async function deleteConfession(id: string) {
    if (!confirm("Delete this confession?")) return;
    setSavingId(id);
    try {
      await fetch(`/api/admin/content/confessions/${id}`, { method: "DELETE" });
      await fetchConfessions();
    } finally {
      setSavingId(null);
    }
  }

  // Group displayed confessions by category for nicer rendering.
  const grouped = confessions.reduce<Record<string, Confession[]>>(
    (acc, c) => {
      (acc[c.category] ??= []).push(c);
      return acc;
    },
    {},
  );

  // Categories actually present + seed categories with 0 count
  const allCategories = Array.from(
    new Set([...SEED_CATEGORIES, ...Object.keys(categoryCounts)]),
  );

  const total = Object.values(categoryCounts).reduce((s, n) => s + n, 0);
  const legendaryCount = tierCounts["LEGENDARY"] || 0;

  return (
    <div>
      {/* Stats banner */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-extralight text-text-light">{total}</div>
          <div className="text-[10px] uppercase tracking-wider text-text-gray mt-1">
            Total lines
          </div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-extralight text-accent-gold">
            {legendaryCount}
          </div>
          <div className="text-[10px] uppercase tracking-wider text-text-gray mt-1">
            Legendary
          </div>
          <div className="text-[10px] text-text-gray/50 mt-0.5">
            target: 3–4 per 20 videos
          </div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-extralight text-text-light">
            {Object.keys(categoryCounts).length}
          </div>
          <div className="text-[10px] uppercase tracking-wider text-text-gray mt-1">
            Active veins
          </div>
          <div className="text-[10px] text-text-gray/50 mt-0.5">
            target: 8–12 with 5–10 lines each
          </div>
        </div>
      </div>

      {/* Filter row */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <select
          value={activeCategory}
          onChange={(e) => setActiveCategory(e.target.value)}
          className="bg-white/[0.02] border border-white/10 rounded-lg px-3 py-2 text-sm text-text-gray"
        >
          <option value="ALL">All categories</option>
          {allCategories.map((c) => (
            <option key={c} value={c}>
              {formatCategory(c)} ({categoryCounts[c] || 0})
            </option>
          ))}
        </select>
        <div className="flex gap-1">
          {[
            { id: "ALL", label: "All tiers" },
            ...TIERS,
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTier(t.id)}
              className={`px-3 py-2 text-xs rounded-lg transition-all ${
                activeTier === t.id
                  ? "bg-accent-gold/10 text-accent-gold border border-accent-gold/30"
                  : "text-text-gray hover:text-text-light bg-white/[0.02] border border-white/5"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="ml-auto flex items-center gap-1.5 px-3 py-2 text-sm text-accent-gold bg-accent-gold/5 border border-accent-gold/20 rounded-lg hover:bg-accent-gold/10 transition-all"
        >
          <Plus size={14} />
          Add line
        </button>
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="glass-card p-5 mb-6 border-accent-gold/20 space-y-3">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm text-text-light font-medium">New confession</h3>
            <button
              onClick={() => setShowAdd(false)}
              className="text-text-gray/50 hover:text-text-gray"
            >
              <X size={16} />
            </button>
          </div>
          <textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="The line, in its rawest form. End on the sharpest word, no apology, no softening."
            rows={2}
            className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-text-light placeholder-text-gray/40 focus:border-accent-gold/30 focus:outline-none resize-none"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-text-gray mb-1">
                Category
              </div>
              <select
                value={newCategory}
                onChange={(e) => {
                  setNewCategory(e.target.value);
                  setCustomCategory("");
                }}
                disabled={customCategory.length > 0}
                className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-sm text-text-gray disabled:opacity-40"
              >
                {SEED_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {formatCategory(c)}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="…or custom category (overrides above)"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                className="w-full mt-2 bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-xs text-text-light placeholder-text-gray/40 focus:border-accent-gold/30 focus:outline-none"
              />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-text-gray mb-1">
                Tier
              </div>
              <div className="flex gap-1">
                {TIERS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setNewTier(t.id)}
                    className={`flex-1 px-2 py-2 text-xs rounded-lg border transition-all ${
                      newTier === t.id ? t.bg : "bg-white/[0.02] border-white/5 text-text-gray hover:border-white/15"
                    } ${newTier === t.id ? t.color : ""}`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-text-gray mt-3 mb-1">
                Placement (optional)
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => setNewPlacement("")}
                  className={`flex-1 px-2 py-1.5 text-[11px] rounded border ${
                    newPlacement === ""
                      ? "border-accent-gold/40 text-accent-gold bg-accent-gold/5"
                      : "border-white/5 bg-white/[0.02] text-text-gray hover:border-white/15"
                  }`}
                >
                  Any
                </button>
                {PLACEMENTS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setNewPlacement(p.id)}
                    title={p.blurb}
                    className={`flex-1 px-2 py-1.5 text-[11px] rounded border ${
                      newPlacement === p.id
                        ? "border-accent-gold/40 text-accent-gold bg-accent-gold/5"
                        : "border-white/5 bg-white/[0.02] text-text-gray hover:border-white/15"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <textarea
            value={newNotes}
            onChange={(e) => setNewNotes(e.target.value)}
            placeholder="Optional notes, context, derivation, when not to use, etc."
            rows={2}
            className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-xs text-text-gray placeholder-text-gray/40 focus:border-accent-gold/30 focus:outline-none resize-none"
          />
          <div className="flex justify-end">
            <button
              onClick={addConfession}
              disabled={!newText.trim()}
              className="px-4 py-2 text-sm bg-accent-gold text-deep-black rounded-lg font-medium hover:bg-accent-gold/90 transition-all disabled:opacity-30"
            >
              Save line
            </button>
          </div>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-accent-gold" size={24} />
        </div>
      ) : confessions.length === 0 ? (
        <div className="text-center py-20 text-text-gray">
          <Flame size={32} className="mx-auto text-text-gray/30 mb-3" />
          <div>No confessions yet.</div>
          <div className="text-xs mt-2 opacity-60">
            Start with the 10 named categories. Aim for 5–10 lines per category.
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([cat, lines]) => (
            <div key={cat}>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-xs uppercase tracking-wider text-text-gray">
                  {formatCategory(cat)}
                </h3>
                <span className="text-[10px] text-text-gray/50">
                  {lines.length} line{lines.length === 1 ? "" : "s"}
                </span>
              </div>
              <div className="space-y-2">
                {lines.map((line) => {
                  const ts = tierStyle(line.tier);
                  return (
                    <div
                      key={line.id}
                      className={`glass-card p-4 border ${ts.bg.includes("border-") ? ts.bg : ""}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-text-light leading-relaxed">
                            {line.text}
                          </p>
                          <div className="flex items-center gap-3 mt-2 flex-wrap">
                            {/* Tier toggle */}
                            <div className="flex gap-1">
                              {TIERS.map((t) => (
                                <button
                                  key={t.id}
                                  onClick={() =>
                                    updateConfession(line.id, { tier: t.id })
                                  }
                                  className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border transition-all ${
                                    line.tier === t.id
                                      ? t.bg
                                      : "bg-white/[0.02] border-white/5 text-text-gray/60 hover:border-white/15"
                                  } ${line.tier === t.id ? t.color : ""}`}
                                >
                                  {t.id === "LEGENDARY" && (
                                    <Crown
                                      size={9}
                                      className="inline-block mr-1 -mt-px"
                                    />
                                  )}
                                  {t.id === "STRONG" && (
                                    <Star
                                      size={9}
                                      className="inline-block mr-1 -mt-px"
                                    />
                                  )}
                                  {t.label}
                                </button>
                              ))}
                            </div>
                            {/* Placement toggle */}
                            <div className="flex gap-1">
                              {PLACEMENTS.map((p) => (
                                <button
                                  key={p.id}
                                  onClick={() =>
                                    updateConfession(line.id, {
                                      placement:
                                        line.placement === p.id ? null : p.id,
                                    })
                                  }
                                  title={p.blurb}
                                  className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border transition-all ${
                                    line.placement === p.id
                                      ? "bg-accent-gold/10 text-accent-gold border-accent-gold/30"
                                      : "bg-white/[0.02] border-white/5 text-text-gray/60 hover:border-white/15"
                                  }`}
                                >
                                  {p.label}
                                </button>
                              ))}
                            </div>
                            {/* Usage badge */}
                            {line.usedCount > 0 && (
                              <span className="text-[10px] text-text-gray/60 flex items-center gap-1">
                                <Clock size={10} />
                                used {line.usedCount}×
                                {line.lastUsedAt &&
                                  ` · ${new Date(line.lastUsedAt).toLocaleDateString()}`}
                              </span>
                            )}
                          </div>
                          {line.notes && (
                            <p className="text-[11px] text-text-gray/60 mt-2 italic">
                              {line.notes}
                            </p>
                          )}
                        </div>
                        {/* Right-side actions */}
                        <div className="flex flex-col gap-1 shrink-0">
                          <button
                            onClick={() => markUsed(line.id)}
                            disabled={savingId === line.id}
                            className="p-1.5 rounded-lg text-text-gray hover:text-accent-gold hover:bg-accent-gold/5 transition-all disabled:opacity-30"
                            title="Mark as used (increment count + stamp last-used)"
                          >
                            {savingId === line.id ? (
                              <Loader2 size={13} className="animate-spin" />
                            ) : (
                              <Save size={13} />
                            )}
                          </button>
                          <button
                            onClick={() => deleteConfession(line.id)}
                            disabled={savingId === line.id}
                            className="p-1.5 rounded-lg text-text-gray/50 hover:text-red-400 hover:bg-red-500/5 transition-all"
                            title="Delete"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
