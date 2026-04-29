"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Loader2,
  TrendingUp,
  Crown,
  Star,
  Save,
  Share2,
  MessageCircle,
  UserPlus,
  Camera,
} from "lucide-react";

interface ShippedReport {
  days: number;
  total: number;
  filmed: number;
  published: number;
  byCloseMechanism: Record<string, number>;
  byHookType: Record<string, number>;
  byFrame: Record<string, number>;
  byVideoFormat: Record<string, number>;
  byDeepening: Record<string, number>;
  confessionsUsed: number;
  confessionTierBreakdown: Record<string, number>;
  confessionCategoryBreakdown: Record<string, number>;
  disclosureRatio: number;
  disclosureCount: number;
  longShippedCount: number;
  recent: Array<{
    id: string;
    title: string;
    videoFormat: string;
    hookType: string | null;
    closeMechanism: string | null;
    deepeningMechanism: string | null;
    frame: string | null;
    developmentStage: string;
    updatedAt: string;
    confessionTier: string | null;
  }>;
}

const CLOSE_TARGET_LABEL: Record<string, { label: string; icon: typeof Save; color: string }> = {
  FRAMEWORK_SUMMARY: { label: "Saves", icon: Save, color: "text-amber-400" },
  PROTECTIVE_HANDOFF: { label: "Shares", icon: Share2, color: "text-emerald-400" },
  DIAGNOSTIC_QUESTION: { label: "Comments", icon: MessageCircle, color: "text-cyan-400" },
  IMPLIED_CATALOGUE: { label: "Follows", icon: UserPlus, color: "text-purple-400" },
};

const HOOK_TYPE_LABELS: Record<string, string> = {
  FIRST_PERSON_MECHANISM: "First-person mechanism",
  DIAGNOSTIC_CORRECTION: "Diagnostic correction",
  INTERIOR_MONOLOGUE: "Interior monologue",
  METHOD_EXPOSURE: "Method exposure",
};

function formatCategory(cat: string): string {
  return cat
    .split("_")
    .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
    .join(" ");
}

export default function ShippedReportTab() {
  const [days, setDays] = useState<number>(7);
  const [report, setReport] = useState<ShippedReport | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchReport = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/content/shipped-report?days=${days}`);
      if (!res.ok) throw new Error(`${res.status}`);
      const data = await res.json();
      setReport(data);
    } catch {
      setReport(null);
    } finally {
      setLoading(false);
    }
  }, [days]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  function pct(n: number, d: number): string {
    if (!d) return "0%";
    return `${Math.round((n / d) * 100)}%`;
  }

  return (
    <div>
      {/* Window toggle */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xs uppercase tracking-wider text-text-gray">
          Window:
        </span>
        {[7, 14, 30, 60, 90].map((d) => (
          <button
            key={d}
            onClick={() => setDays(d)}
            className={`px-3 py-1.5 text-xs rounded-lg transition-all ${
              days === d
                ? "bg-accent-gold/10 text-accent-gold border border-accent-gold/30"
                : "text-text-gray hover:text-text-light bg-white/[0.02] border border-white/5"
            }`}
          >
            Last {d}d
          </button>
        ))}
      </div>

      {loading || !report ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-accent-gold" size={24} />
        </div>
      ) : report.total === 0 ? (
        <div className="text-center py-20 text-text-gray">
          <Camera size={32} className="mx-auto text-text-gray/30 mb-3" />
          <div>Nothing shipped in the last {days} days.</div>
          <div className="text-xs mt-2 opacity-60">
            Mark videos as <span className="text-text-light">Filmed</span> or{" "}
            <span className="text-text-light">Published</span> to populate this.
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Headline numbers */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="glass-card p-4 text-center">
              <div className="text-3xl font-extralight text-text-light">
                {report.total}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-text-gray mt-1">
                Total shipped
              </div>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="text-3xl font-extralight text-purple-400">
                {report.filmed}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-text-gray mt-1">
                Filmed (not yet published)
              </div>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="text-3xl font-extralight text-emerald-400">
                {report.published}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-text-gray mt-1">
                Published
              </div>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="text-3xl font-extralight text-accent-gold">
                {report.confessionsUsed}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-text-gray mt-1">
                Shock-and-awe lines used
              </div>
              <div className="text-[10px] text-text-gray/50 mt-0.5">
                target: ~1 in 3–4
              </div>
            </div>
          </div>

          {/* Engagement target distribution (the most strategic chart) */}
          <div className="glass-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={16} className="text-accent-gold" />
              <h3 className="text-sm uppercase tracking-wider text-text-light">
                Engagement-target mix (close mechanism)
              </h3>
            </div>
            <div className="space-y-2">
              {Object.entries(CLOSE_TARGET_LABEL).map(([key, meta]) => {
                const count = report.byCloseMechanism[key] ?? 0;
                const ratio = report.total ? count / report.total : 0;
                const Icon = meta.icon;
                return (
                  <div key={key} className="flex items-center gap-3">
                    <div className="w-32 flex items-center gap-2">
                      <Icon size={14} className={meta.color} />
                      <span className="text-xs text-text-gray">
                        {meta.label}
                      </span>
                    </div>
                    <div className="flex-1 h-2 rounded-full bg-white/[0.04] overflow-hidden">
                      <div
                        className={`h-full rounded-full ${meta.color.replace("text", "bg")}/40`}
                        style={{ width: `${ratio * 100}%` }}
                      />
                    </div>
                    <div className="w-16 text-right text-xs text-text-light">
                      {count} <span className="text-text-gray/50">({pct(count, report.total)})</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-[11px] text-text-gray/60 mt-3 leading-relaxed">
              Look for balance over time. If shares dominate but follows are 0,
              the brand is being shared but not subscribed-to. Flip the close
              mix on the next batch.
            </p>
          </div>

          {/* Personal disclosure ratio — the framework's "1 in 5" check */}
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm uppercase tracking-wider text-text-light">
                Personal-disclosure ratio
              </h3>
              <span
                className={`text-2xl font-extralight ${
                  report.disclosureRatio > 0.3
                    ? "text-red-400"
                    : report.disclosureRatio > 0.15
                      ? "text-emerald-400"
                      : "text-text-gray"
                }`}
              >
                {Math.round(report.disclosureRatio * 100)}%
              </span>
            </div>
            <div className="text-xs text-text-gray">
              {report.disclosureCount} of {report.longShippedCount} long videos
              used personal-disclosure deepening.{" "}
              <span className="text-text-light">Framework target: ~20%</span>
              {report.disclosureRatio > 0.3 && (
                <span className="text-red-400">
                  {" "}
                  · OVERUSED — disclosure devalues at this frequency.
                </span>
              )}
              {report.disclosureRatio < 0.1 && report.longShippedCount > 5 && (
                <span className="text-amber-400">
                  {" "}
                  · UNDERUSED — disclosure is the highest-leverage move for follow growth.
                </span>
              )}
            </div>
          </div>

          {/* Hook type breakdown */}
          <div className="glass-card p-5">
            <h3 className="text-sm uppercase tracking-wider text-text-light mb-3">
              Hook types shipped
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(report.byHookType)
                .sort((a, b) => b[1] - a[1])
                .map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-center justify-between p-2 rounded bg-white/[0.02]"
                  >
                    <span className="text-xs text-text-gray">
                      {HOOK_TYPE_LABELS[k] || k}
                    </span>
                    <span className="text-sm text-text-light">{v}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Confession bank usage */}
          {report.confessionsUsed > 0 && (
            <div className="glass-card p-5 border-amber-500/20 bg-amber-500/5">
              <h3 className="text-sm uppercase tracking-wider text-amber-300 mb-3 flex items-center gap-2">
                <Crown size={14} /> Shock-and-awe drawn from bank
              </h3>
              <div className="grid grid-cols-3 gap-3 mb-3">
                {["LEGENDARY", "STRONG", "STANDARD"].map((tier) => {
                  const count = report.confessionTierBreakdown[tier] ?? 0;
                  return (
                    <div key={tier} className="text-center">
                      <div className="text-2xl font-extralight text-text-light">
                        {count}
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-text-gray flex items-center justify-center gap-1 mt-1">
                        {tier === "LEGENDARY" && (
                          <Crown size={10} className="text-accent-gold" />
                        )}
                        {tier === "STRONG" && (
                          <Star size={10} className="text-amber-400" />
                        )}
                        {tier}
                      </div>
                    </div>
                  );
                })}
              </div>
              {Object.keys(report.confessionCategoryBreakdown).length > 0 && (
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-text-gray mb-1.5">
                    Categories drawn from
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {Object.entries(report.confessionCategoryBreakdown)
                      .sort((a, b) => b[1] - a[1])
                      .map(([cat, count]) => (
                        <span
                          key={cat}
                          className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20"
                        >
                          {formatCategory(cat)} · {count}
                        </span>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Recent list */}
          <div>
            <h3 className="text-sm uppercase tracking-wider text-text-light mb-3">
              Recently shipped
            </h3>
            <div className="space-y-1.5">
              {report.recent.map((idea) => (
                <div
                  key={idea.id}
                  className="glass-card p-3 flex items-center gap-3"
                >
                  <span
                    className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border shrink-0 ${
                      idea.developmentStage === "PUBLISHED"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-purple-500/10 text-purple-400 border-purple-500/20"
                    }`}
                  >
                    {idea.developmentStage}
                  </span>
                  <span
                    className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border shrink-0 ${
                      idea.videoFormat === "SHORT"
                        ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                        : "bg-purple-500/10 text-purple-400 border-purple-500/20"
                    }`}
                  >
                    {idea.videoFormat}
                  </span>
                  {idea.confessionTier && (
                    <span className="shrink-0 text-amber-300" title="Used a shock-and-awe line">
                      {idea.confessionTier === "LEGENDARY" ? (
                        <Crown size={11} />
                      ) : (
                        <Star size={11} />
                      )}
                    </span>
                  )}
                  <span className="text-sm text-text-light flex-1 min-w-0 truncate">
                    {idea.title}
                  </span>
                  <span className="text-[10px] text-text-gray/50 shrink-0">
                    {new Date(idea.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
