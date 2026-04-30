"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ChevronDown,
  ChevronUp,
  Save,
  Loader2,
  Sparkles,
  Shield,
  ArrowRight,
  ArrowLeft,
  Zap,
  Flame,
  X,
  Crown,
  Star,
} from "lucide-react";

interface LinkedConfession {
  id: string;
  category: string;
  text: string;
  tier: string;
  placement: string | null;
}

interface ContentIdea {
  id: string;
  title: string;
  hook: string | null;
  format: string | null;
  line2: string | null;
  line3: string | null;
  setup: string | null;
  deepening: string | null;
  closeBeat: string | null;
  tail: string | null;
  hookType: string | null;
  line2Mechanism: string | null;
  line3Mechanism: string | null;
  deepeningMechanism: string | null;
  closeMechanism: string | null;
  frame: string | null;
  videoFormat: string;
  developmentStage: string;
  notes: string | null;
  confessionId: string | null;
  confession: LinkedConfession | null;
  createdAt: string;
}

const STAGES = [
  "CONCEPT",
  "HOOK_DRAFTED",
  "LINES_DRAFTED",
  "READY_TO_FILM",
  "FILMED",
  "PUBLISHED",
] as const;
type Stage = (typeof STAGES)[number];

const STAGE_LABELS: Record<Stage, string> = {
  CONCEPT: "Concept",
  HOOK_DRAFTED: "Hook drafted",
  LINES_DRAFTED: "Script drafted",
  READY_TO_FILM: "Ready to film",
  FILMED: "Filmed",
  PUBLISHED: "Published",
};

const HOOK_TYPES = [
  {
    id: "FIRST_PERSON_MECHANISM",
    label: "First-person mechanism",
    blurb: "When I [normal situation], I'm actually [psychopath-specific process]",
  },
  {
    id: "DIAGNOSTIC_CORRECTION",
    label: "Diagnostic correction",
    blurb: "Most people think X. The truth is Y.",
  },
  {
    id: "INTERIOR_MONOLOGUE",
    label: "Interior monologue",
    blurb: "Here's what's actually going through my head when [situation]",
  },
  {
    id: "METHOD_EXPOSURE",
    label: "Method exposure",
    blurb: "I'll teach you the exact thing I do to [outcome]",
  },
];

const L2_MECHANISMS = [
  {
    id: "INVALIDATE",
    label: "Invalidate the assumed answer",
    blurb: "Pre-empt and dismiss the recycled take. Saturated topics.",
  },
  {
    id: "SPECIFICITY_ESCALATION",
    label: "Specificity escalation",
    blurb: "Raise the stakes, commitment escalation. Strong payoff required.",
  },
  {
    id: "PERSONAL_STAKE",
    label: "Personal stake",
    blurb: "Earn the right to make the claim. Parasocial deepening.",
  },
  {
    id: "REFRAME",
    label: "The reframe",
    blurb: "Promise framework, not tip. Drives saves.",
  },
];

const PAYOFF_MECHANISMS = [
  {
    id: "SPECIFIC_MECHANISM",
    label: "Specific mechanism",
    blurb: "Transmissible knowledge. Saves + shares. Workhorse.",
  },
  {
    id: "DIAGNOSTIC",
    label: "The diagnostic",
    blurb: "Turn audience into the subject. Self-relevant = top engagement.",
  },
  {
    id: "PROTECTIVE_INVERSION",
    label: "Protective inversion",
    blurb: "Predator-coded → protective-coded. Algorithm-safe + shareable.",
  },
  {
    id: "CONTINUATION",
    label: "Implication that demands a follow",
    blurb: "Implicit follow loop. Use selectively.",
  },
];

const DEEPENING_MECHANISMS = [
  {
    id: "SECOND_EXAMPLE",
    label: "Second example",
    blurb: "Prove the framework is generative. Drives saves of the system.",
  },
  {
    id: "OBJECTION_HANDLE",
    label: "Objection handle",
    blurb: "Pre-empt the smart viewer's objection. Adds depth, not breadth.",
  },
  {
    id: "PERSONAL_DISCLOSURE",
    label: "Personal disclosure",
    blurb: "Tactical → confessional. Highest follow-conversion move. ~1 in 5 videos.",
  },
  {
    id: "ESCALATION",
    label: "Escalation",
    blurb: "Reframe video as one piece of a larger puzzle. Funnels to broader work.",
  },
];

const CLOSE_MECHANISMS = [
  {
    id: "FRAMEWORK_SUMMARY",
    label: "Framework summary",
    target: "saves",
    blurb: "Restate the 3 signals so viewers can save + return.",
  },
  {
    id: "PROTECTIVE_HANDOFF",
    label: "Protective handoff",
    target: "shares",
    blurb: "Give the viewer a reason to forward as a warning.",
  },
  {
    id: "DIAGNOSTIC_QUESTION",
    label: "Diagnostic question",
    target: "comments",
    blurb: "Specific low-friction prompt. Inter-viewer reply threads.",
  },
  {
    id: "IMPLIED_CATALOGUE",
    label: "Implied catalogue",
    target: "follows",
    blurb: "\"30 things I do\", positions video as part of unfolding series.",
  },
];

const FRAMES = [
  {
    id: "PROTECTIVE",
    label: "Protective",
    blurb: "Viewer = protagonist. Shareable. Algorithm-safe.",
  },
  {
    id: "NEUTRAL",
    label: "Neutral",
    blurb: "Educational. General psychology content.",
  },
  {
    id: "PREDATORY",
    label: "Predatory",
    blurb: "Use sparingly. Platforms suppress.",
  },
];

const VIDEO_FORMATS = [
  {
    id: "LONG",
    label: "Long (45–60s)",
    blurb: "Full 7-beat architecture. Where depth lives.",
  },
  {
    id: "SHORT",
    label: "Short (15–25s)",
    blurb: "Hook → payoff → tail. One-liners, single quotes, reactions.",
  },
];

// Pairing matrix from middle-end-architecture.md + lines-2-3-framework.md
const RECOMMENDED_L2: Record<string, string> = {
  FIRST_PERSON_MECHANISM: "PERSONAL_STAKE",
  DIAGNOSTIC_CORRECTION: "INVALIDATE",
  INTERIOR_MONOLOGUE: "REFRAME",
  METHOD_EXPOSURE: "SPECIFICITY_ESCALATION",
};

const RECOMMENDED_PAYOFF: Record<string, string[]> = {
  FIRST_PERSON_MECHANISM: ["DIAGNOSTIC", "PROTECTIVE_INVERSION"],
  DIAGNOSTIC_CORRECTION: ["SPECIFIC_MECHANISM"],
  INTERIOR_MONOLOGUE: ["DIAGNOSTIC"],
  METHOD_EXPOSURE: ["SPECIFIC_MECHANISM", "PROTECTIVE_INVERSION"],
};

type EditPatch = Partial<{
  hook: string;
  line2: string;
  line3: string;
  setup: string;
  deepening: string;
  closeBeat: string;
  tail: string;
  hookType: string;
  line2Mechanism: string;
  line3Mechanism: string;
  deepeningMechanism: string;
  closeMechanism: string;
  frame: string;
  videoFormat: string;
  confessionId: string | null;
}>;

interface ConfessionLite {
  id: string;
  category: string;
  text: string;
  tier: string;
  placement: string | null;
  usedCount: number;
  lastUsedAt: string | null;
}

function tierIcon(tier: string) {
  if (tier === "LEGENDARY")
    return <Crown size={11} className="inline text-accent-gold" />;
  if (tier === "STRONG")
    return <Star size={11} className="inline text-amber-400" />;
  return null;
}

function formatCategory(cat: string): string {
  return cat
    .split("_")
    .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
    .join(" ");
}

interface MechanismOption {
  id: string;
  label: string;
  blurb: string;
  target?: string;
}

interface MechanismGridProps {
  options: MechanismOption[];
  selected: string;
  recommended: string[];
  onSelect: (id: string) => void;
  cols?: number;
}

function MechanismGrid({
  options,
  selected,
  recommended,
  onSelect,
  cols = 2,
}: MechanismGridProps) {
  const gridClass = cols === 4
    ? "grid grid-cols-2 md:grid-cols-4 gap-2"
    : "grid grid-cols-1 md:grid-cols-2 gap-2";
  return (
    <div className={gridClass}>
      {options.map((m) => {
        const isSelected = selected === m.id;
        const isRecommended = recommended.includes(m.id);
        return (
          <button
            key={m.id}
            onClick={() => onSelect(m.id)}
            className={`text-left p-2.5 rounded-lg border transition-all relative ${
              isSelected
                ? "border-accent-gold/40 bg-accent-gold/5"
                : isRecommended
                  ? "border-amber-500/30 bg-amber-500/5"
                  : "border-white/5 bg-white/[0.02] hover:border-white/15"
            }`}
          >
            {isRecommended && !isSelected && (
              <Sparkles
                size={10}
                className="absolute top-2 right-2 text-amber-400"
              />
            )}
            {m.target && (
              <div className="text-[9px] uppercase tracking-wider text-text-gray/60 mb-0.5">
                For {m.target}
              </div>
            )}
            <div
              className={`text-xs font-medium ${
                isSelected
                  ? "text-accent-gold"
                  : isRecommended
                    ? "text-amber-300"
                    : "text-text-light"
              }`}
            >
              {m.label}
            </div>
            <div className="text-[10px] text-text-gray/70 mt-0.5 leading-snug">
              {m.blurb}
            </div>
          </button>
        );
      })}
    </div>
  );
}

interface BeatTextareaProps {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  rows?: number;
}

function BeatTextarea({
  value,
  onChange,
  placeholder,
  rows = 2,
}: BeatTextareaProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-sm text-text-light placeholder-text-gray/40 focus:border-accent-gold/30 focus:outline-none resize-none"
    />
  );
}

export default function DevelopTab() {
  const [ideas, setIdeas] = useState<ContentIdea[]>([]);
  const [stageCounts, setStageCounts] = useState<Record<string, number>>({});
  const [stage, setStage] = useState<Stage>("CONCEPT");
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);
  const [edits, setEdits] = useState<Record<string, EditPatch>>({});
  const [confessions, setConfessions] = useState<ConfessionLite[]>([]);
  const [confessionsLoaded, setConfessionsLoaded] = useState(false);
  const [pickerOpenFor, setPickerOpenFor] = useState<string | null>(null);

  const ensureConfessionsLoaded = useCallback(async () => {
    if (confessionsLoaded) return;
    try {
      const res = await fetch("/api/admin/content/confessions");
      if (res.ok) {
        const data = await res.json();
        setConfessions(data.confessions || []);
      }
    } finally {
      setConfessionsLoaded(true);
    }
  }, [confessionsLoaded]);

  const fetchIdeas = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ status: "APPROVED", stage });
      const res = await fetch(`/api/admin/content/ideas?${params}`);
      if (!res.ok) throw new Error(`${res.status}`);
      const data = await res.json();
      setIdeas(data.ideas || []);
      setStageCounts(data.stageCounts || {});
    } catch {
      setIdeas([]);
      setStageCounts({});
    } finally {
      setLoading(false);
    }
  }, [stage]);

  useEffect(() => {
    fetchIdeas();
  }, [fetchIdeas]);

  function getValue<K extends keyof EditPatch>(
    idea: ContentIdea,
    field: K,
  ): string {
    const e = edits[idea.id]?.[field];
    if (e !== undefined) return e ?? "";
    const v = idea[field as keyof ContentIdea];
    return typeof v === "string" ? v : "";
  }

  function setEdit<K extends keyof EditPatch>(
    id: string,
    field: K,
    value: EditPatch[K],
  ) {
    setEdits((prev) => ({ ...prev, [id]: { ...prev[id], [field]: value } }));
  }

  function hasUnsavedEdits(id: string): boolean {
    return !!edits[id] && Object.keys(edits[id]).length > 0;
  }

  async function save(idea: ContentIdea, advanceTo?: Stage) {
    setSaving(idea.id);
    const e = edits[idea.id] || {};
    const body: Record<string, unknown> = { ...e };
    if (advanceTo) body.developmentStage = advanceTo;
    try {
      const res = await fetch(`/api/admin/content/ideas/${idea.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`${res.status}`);
      setEdits((prev) => {
        const next = { ...prev };
        delete next[idea.id];
        return next;
      });
      await fetchIdeas();
      if (advanceTo && advanceTo !== stage) setExpanded(null);
    } catch (err) {
      console.error("Failed to save idea:", err);
    } finally {
      setSaving(null);
    }
  }

  function isShort(idea: ContentIdea): boolean {
    return getValue(idea, "videoFormat") === "SHORT";
  }

  function canAdvanceTo(idea: ContentIdea, target: Stage): boolean {
    const hook = getValue(idea, "hook").trim();
    const line2 = getValue(idea, "line2").trim();
    const line3 = getValue(idea, "line3").trim();
    const ht = getValue(idea, "hookType");
    const frame = getValue(idea, "frame");
    if (target === "HOOK_DRAFTED") return hook.length > 5 && !!ht;
    if (target === "LINES_DRAFTED") {
      // Short videos only need hook + payoff. Long needs the middle too.
      if (isShort(idea)) return hook.length > 5 && line3.length > 5;
      return hook.length > 5 && line2.length > 5 && line3.length > 5;
    }
    if (target === "READY_TO_FILM") {
      const baseOk =
        hook.length > 5 && line3.length > 5 && !!ht && !!frame;
      if (isShort(idea)) return baseOk;
      return baseOk && line2.length > 5;
    }
    return true;
  }

  function getNextStage(current: Stage): Stage | null {
    const i = STAGES.indexOf(current);
    return i < STAGES.length - 1 ? STAGES[i + 1] : null;
  }

  function getPrevStage(current: Stage): Stage | null {
    const i = STAGES.indexOf(current);
    return i > 0 ? STAGES[i - 1] : null;
  }

  function advanceTooltip(target: Stage): string {
    if (target === "HOOK_DRAFTED") return "Need hook + hook type";
    if (target === "LINES_DRAFTED") return "Need hook + payoff (line 3), line 2 too if long format";
    if (target === "READY_TO_FILM") return "Need hook + payoff + hook type + frame (and line 2 if long)";
    return "";
  }

  return (
    <div>
      {/* Stage tabs */}
      <div className="flex gap-1.5 mb-6 flex-wrap">
        {STAGES.map((s) => (
          <button
            key={s}
            onClick={() => setStage(s)}
            className={`px-3 py-2 text-xs uppercase tracking-wider rounded-lg transition-all ${
              stage === s
                ? "bg-accent-gold/10 text-accent-gold border border-accent-gold/30"
                : "text-text-gray hover:text-text-light bg-white/[0.02] border border-white/5"
            }`}
          >
            {STAGE_LABELS[s]}{" "}
            <span className="opacity-60">({stageCounts[s] || 0})</span>
          </button>
        ))}
      </div>

      {/* Help banner */}
      {stage === "CONCEPT" && ideas.length > 0 && (
        <div className="glass-card p-4 mb-4 border-accent-gold/20">
          <div className="flex items-start gap-3">
            <Sparkles size={18} className="text-accent-gold shrink-0 mt-0.5" />
            <div className="text-xs text-text-gray leading-relaxed">
              <span className="text-text-light font-medium">
                7-beat 60-second pipeline
              </span>
              <br />
              hook → re-energize → setup → payoff → deepening → close → tail.
              Pick a hook type and the framework will highlight the recommended
              line 2 + payoff mechanisms. See{" "}
              <span className="text-accent-gold">
                Research Hub → Middle-end architecture
              </span>{" "}
              for the full reasoning.
            </div>
          </div>
        </div>
      )}

      {/* Idea list */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-accent-gold" size={24} />
        </div>
      ) : ideas.length === 0 ? (
        <div className="text-center py-20 text-text-gray">
          No APPROVED ideas at{" "}
          <span className="text-text-light">{STAGE_LABELS[stage]}</span> stage.
          {stage === "CONCEPT" && (
            <div className="text-xs mt-2 opacity-60">
              Approve ideas in the Ideas Triage tab, they land here.
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {ideas.map((idea) => {
            const isOpen = expanded === idea.id;
            const ht = getValue(idea, "hookType");
            const recL2 = ht ? [RECOMMENDED_L2[ht]].filter(Boolean) : [];
            const recPayoff = ht ? RECOMMENDED_PAYOFF[ht] || [] : [];
            const dirty = hasUnsavedEdits(idea.id);
            const nextStage = getNextStage(idea.developmentStage as Stage);
            const prevStage = getPrevStage(idea.developmentStage as Stage);
            const canAdvance = nextStage
              ? canAdvanceTo(idea, nextStage)
              : false;
            const short = isShort(idea);

            return (
              <div key={idea.id} className="glass-card overflow-hidden">
                {/* Collapsed header */}
                <button
                  onClick={() => setExpanded(isOpen ? null : idea.id)}
                  className="w-full p-4 flex items-start gap-3 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span
                        className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                          short
                            ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                            : "bg-purple-500/10 text-purple-400 border-purple-500/20"
                        }`}
                      >
                        {short ? "Short" : "Long"}
                      </span>
                      {idea.format && (
                        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-text-gray border border-white/10">
                          {idea.format}
                        </span>
                      )}
                      {idea.frame && (
                        <span
                          className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                            idea.frame === "PROTECTIVE"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : idea.frame === "PREDATORY"
                                ? "bg-red-500/10 text-red-400 border-red-500/20"
                                : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                          }`}
                        >
                          {idea.frame}
                        </span>
                      )}
                      {dirty && (
                        <span className="text-[10px] uppercase tracking-wider text-amber-400">
                          unsaved
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-medium text-text-light leading-snug">
                      {idea.title}
                    </h3>
                    {idea.hook && !isOpen && (
                      <p className="text-xs text-text-gray mt-1 line-clamp-1">
                        {idea.hook}
                      </p>
                    )}
                  </div>
                  {isOpen ? (
                    <ChevronUp
                      size={16}
                      className="text-text-gray/50 shrink-0 mt-1"
                    />
                  ) : (
                    <ChevronDown
                      size={16}
                      className="text-text-gray/50 shrink-0 mt-1"
                    />
                  )}
                </button>

                {/* Expanded editor */}
                {isOpen && (
                  <div className="border-t border-white/5 p-4 space-y-6">
                    {/* FORMAT TOGGLE */}
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-accent-gold mb-2">
                        Video format
                      </h4>
                      <MechanismGrid
                        options={VIDEO_FORMATS}
                        selected={getValue(idea, "videoFormat") || "LONG"}
                        recommended={[]}
                        onSelect={(id) => setEdit(idea.id, "videoFormat", id)}
                      />
                    </div>

                    {/* CONFESSION PICKER (shock-and-awe slot) */}
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-accent-gold mb-2 flex items-center gap-1.5">
                        <Flame size={12} /> Shock-and-awe line (optional)
                      </h4>
                      {idea.confession ? (
                        <div className="glass-card p-3 border-amber-500/20 bg-amber-500/5">
                          <div className="flex items-start gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                <span className="text-[10px] uppercase tracking-wider text-amber-300">
                                  {tierIcon(idea.confession.tier)}{" "}
                                  {idea.confession.tier}
                                </span>
                                <span className="text-[10px] uppercase tracking-wider text-text-gray">
                                  {formatCategory(idea.confession.category)}
                                </span>
                                {idea.confession.placement && (
                                  <span className="text-[10px] uppercase tracking-wider text-accent-gold">
                                    → {idea.confession.placement}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-text-light italic leading-relaxed">
                                &ldquo;{idea.confession.text}&rdquo;
                              </p>
                            </div>
                            <button
                              onClick={() => {
                                setEdit(idea.id, "confessionId", null);
                              }}
                              className="p-1.5 text-text-gray/50 hover:text-red-400 transition-colors"
                              title="Unlink"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <button
                            onClick={async () => {
                              await ensureConfessionsLoaded();
                              setPickerOpenFor(
                                pickerOpenFor === idea.id ? null : idea.id,
                              );
                            }}
                            className="text-xs px-3 py-2 text-amber-300 bg-amber-500/5 border border-amber-500/20 rounded-lg hover:bg-amber-500/10 transition-all flex items-center gap-1.5"
                          >
                            <Flame size={12} />
                            Pull from confession bank
                          </button>
                          {pickerOpenFor === idea.id && (
                            <div className="mt-2 glass-card p-3 max-h-72 overflow-y-auto">
                              {confessions.length === 0 ? (
                                <div className="text-xs text-text-gray text-center py-4">
                                  Bank is empty. Add lines in the Confessions tab.
                                </div>
                              ) : (
                                <div className="space-y-1.5">
                                  {/* Sort: legendary first, then by usedCount asc (least-used first) */}
                                  {[...confessions]
                                    .sort((a, b) => {
                                      const tierOrder = {
                                        LEGENDARY: 0,
                                        STRONG: 1,
                                        STANDARD: 2,
                                      };
                                      const ta =
                                        tierOrder[
                                          a.tier as keyof typeof tierOrder
                                        ] ?? 3;
                                      const tb =
                                        tierOrder[
                                          b.tier as keyof typeof tierOrder
                                        ] ?? 3;
                                      if (ta !== tb) return ta - tb;
                                      return a.usedCount - b.usedCount;
                                    })
                                    .map((c) => (
                                      <button
                                        key={c.id}
                                        onClick={() => {
                                          setEdit(
                                            idea.id,
                                            "confessionId",
                                            c.id,
                                          );
                                          setPickerOpenFor(null);
                                        }}
                                        className="w-full text-left p-2.5 rounded-lg border border-white/5 bg-white/[0.02] hover:border-amber-500/30 hover:bg-amber-500/5 transition-all"
                                      >
                                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                                          {tierIcon(c.tier)}
                                          <span className="text-[10px] uppercase tracking-wider text-text-gray">
                                            {formatCategory(c.category)}
                                          </span>
                                          {c.placement && (
                                            <span className="text-[10px] uppercase tracking-wider text-accent-gold/80">
                                              → {c.placement}
                                            </span>
                                          )}
                                          {c.usedCount > 0 && (
                                            <span className="text-[10px] text-text-gray/60 ml-auto">
                                              used {c.usedCount}×
                                            </span>
                                          )}
                                        </div>
                                        <p className="text-xs text-text-light line-clamp-2 leading-snug">
                                          {c.text}
                                        </p>
                                      </button>
                                    ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* 1 · HOOK */}
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-accent-gold mb-2">
                        1 · Hook (0–3s), open the loop
                      </h4>
                      <BeatTextarea
                        value={getValue(idea, "hook")}
                        onChange={(v) => setEdit(idea.id, "hook", v)}
                        placeholder="Front-load Kanika-as-source. Open the loop with specificity."
                      />
                      <div className="mt-3">
                        <div className="text-[10px] uppercase tracking-wider text-text-gray mb-2">
                          Hook type
                        </div>
                        <MechanismGrid
                          options={HOOK_TYPES}
                          selected={getValue(idea, "hookType")}
                          recommended={[]}
                          onSelect={(id) => setEdit(idea.id, "hookType", id)}
                        />
                      </div>
                    </div>

                    {/* 2 · RE-ENERGIZE, only for long format */}
                    {!short && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-xs uppercase tracking-wider text-accent-gold">
                            2 · Re-energize (3–8s), extend the willingness to wait
                          </h4>
                          {recL2.length > 0 && (
                            <span className="text-[10px] text-amber-400 flex items-center gap-1">
                              <Sparkles size={10} /> recommended
                            </span>
                          )}
                        </div>
                        <MechanismGrid
                          options={L2_MECHANISMS}
                          selected={getValue(idea, "line2Mechanism")}
                          recommended={recL2}
                          onSelect={(id) => setEdit(idea.id, "line2Mechanism", id)}
                        />
                        <div className="mt-2">
                          <BeatTextarea
                            value={getValue(idea, "line2")}
                            onChange={(v) => setEdit(idea.id, "line2", v)}
                            placeholder="Line 2, extend willingness to wait."
                          />
                        </div>
                      </div>
                    )}

                    {/* 3 · SETUP, only for long format */}
                    {!short && (
                      <div>
                        <h4 className="text-xs uppercase tracking-wider text-accent-gold mb-2">
                          3 · Setup (8–15s), orient to the framework
                        </h4>
                        <BeatTextarea
                          value={getValue(idea, "setup")}
                          onChange={(v) => setEdit(idea.id, "setup", v)}
                          placeholder="Briefly establish the situation, the stakes, what the viewer is about to learn."
                          rows={3}
                        />
                      </div>
                    )}

                    {/* 4 · PAYOFF (was line3) */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs uppercase tracking-wider text-accent-gold">
                          {short ? "2" : "4"} · Payoff ({short ? "2–18s" : "15–30s"}), deliver the insight
                        </h4>
                        {recPayoff.length > 0 && (
                          <span className="text-[10px] text-amber-400 flex items-center gap-1">
                            <Sparkles size={10} />{" "}
                            {recPayoff.length === 2 ? "two recommended" : "recommended"}
                          </span>
                        )}
                      </div>
                      <MechanismGrid
                        options={PAYOFF_MECHANISMS}
                        selected={getValue(idea, "line3Mechanism")}
                        recommended={recPayoff}
                        onSelect={(id) => setEdit(idea.id, "line3Mechanism", id)}
                      />
                      <div className="mt-2">
                        <BeatTextarea
                          value={getValue(idea, "line3")}
                          onChange={(v) => setEdit(idea.id, "line3", v)}
                          placeholder="Payoff, the promised insight, transmissible and specific."
                        />
                      </div>
                    </div>

                    {/* 5 · DEEPENING, only for long format */}
                    {!short && (
                      <div>
                        <h4 className="text-xs uppercase tracking-wider text-accent-gold mb-2">
                          5 · Deepening (30–45s), the part most creators skip
                        </h4>
                        <MechanismGrid
                          options={DEEPENING_MECHANISMS}
                          selected={getValue(idea, "deepeningMechanism")}
                          recommended={[]}
                          onSelect={(id) =>
                            setEdit(idea.id, "deepeningMechanism", id)
                          }
                        />
                        <div className="mt-2">
                          <BeatTextarea
                            value={getValue(idea, "deepening")}
                            onChange={(v) => setEdit(idea.id, "deepening", v)}
                            placeholder="Convert engaged watch into something more, second example, objection handle, personal disclosure, or escalation."
                            rows={3}
                          />
                        </div>
                      </div>
                    )}

                    {/* 6 · CLOSE, only for long format */}
                    {!short && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-xs uppercase tracking-wider text-accent-gold flex items-center gap-1.5">
                            <Zap size={12} /> 6 · Close (45–55s), trigger secondary action
                          </h4>
                          <span className="text-[10px] text-text-gray/60">
                            pick by which signal you want
                          </span>
                        </div>
                        <MechanismGrid
                          options={CLOSE_MECHANISMS}
                          selected={getValue(idea, "closeMechanism")}
                          recommended={[]}
                          onSelect={(id) =>
                            setEdit(idea.id, "closeMechanism", id)
                          }
                          cols={4}
                        />
                        <div className="mt-2">
                          <BeatTextarea
                            value={getValue(idea, "closeBeat")}
                            onChange={(v) => setEdit(idea.id, "closeBeat", v)}
                            placeholder="Close, the line that converts the engaged viewer into a save / share / comment / follow."
                          />
                        </div>
                      </div>
                    )}

                    {/* 7 · TAIL, optional, both formats */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs uppercase tracking-wider text-accent-gold">
                          {short ? "3" : "7"} · Tail ({short ? "18–25s" : "55–60s"}), rewatch trigger
                        </h4>
                        <span className="text-[10px] text-text-gray/60">
                          optional, only if you have a real second-order observation
                        </span>
                      </div>
                      <BeatTextarea
                        value={getValue(idea, "tail")}
                        onChange={(v) => setEdit(idea.id, "tail", v)}
                        placeholder="A line that recontextualizes everything before it. E.g. I asked my fiancé this on our first date. He took six seconds. That's why I married him."
                      />
                    </div>

                    {/* 8 · FRAME */}
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-accent-gold mb-2 flex items-center gap-1.5">
                        <Shield size={12} /> Frame
                      </h4>
                      <MechanismGrid
                        options={FRAMES}
                        selected={getValue(idea, "frame")}
                        recommended={[]}
                        onSelect={(id) => setEdit(idea.id, "frame", id)}
                        cols={4}
                      />
                    </div>

                    {/* ACTION ROW */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <div className="flex gap-2">
                        {prevStage && (
                          <button
                            onClick={() => save(idea, prevStage)}
                            disabled={saving === idea.id}
                            className="flex items-center gap-1.5 px-3 py-2 text-xs text-text-gray bg-white/[0.02] border border-white/10 rounded-lg hover:bg-white/5 transition-all disabled:opacity-50"
                          >
                            <ArrowLeft size={12} />
                            {STAGE_LABELS[prevStage]}
                          </button>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => save(idea)}
                          disabled={saving === idea.id || !dirty}
                          className="flex items-center gap-1.5 px-3 py-2 text-xs text-text-light bg-white/[0.02] border border-white/10 rounded-lg hover:bg-white/5 transition-all disabled:opacity-30"
                        >
                          {saving === idea.id ? (
                            <Loader2 size={12} className="animate-spin" />
                          ) : (
                            <Save size={12} />
                          )}
                          Save
                        </button>
                        {nextStage && (
                          <button
                            onClick={() => save(idea, nextStage)}
                            disabled={saving === idea.id || !canAdvance}
                            className={`flex items-center gap-1.5 px-3 py-2 text-xs rounded-lg transition-all ${
                              canAdvance
                                ? "bg-accent-gold text-deep-black hover:bg-accent-gold/90 font-medium"
                                : "bg-white/[0.02] text-text-gray/40 border border-white/5 cursor-not-allowed"
                            } disabled:opacity-50`}
                            title={canAdvance ? `Advance to ${STAGE_LABELS[nextStage]}` : advanceTooltip(nextStage)}
                          >
                            {STAGE_LABELS[nextStage]}
                            <ArrowRight size={12} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
