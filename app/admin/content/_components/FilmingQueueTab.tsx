"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Loader2,
  Camera,
  Check,
  Flame,
  ArrowRight,
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
  confession: LinkedConfession | null;
}

const HOOK_TYPE_LABELS: Record<string, string> = {
  FIRST_PERSON_MECHANISM: "First-person mechanism",
  DIAGNOSTIC_CORRECTION: "Diagnostic correction",
  INTERIOR_MONOLOGUE: "Interior monologue",
  METHOD_EXPOSURE: "Method exposure",
};

const MECH_LABELS: Record<string, string> = {
  // L2
  INVALIDATE: "Invalidate",
  SPECIFICITY_ESCALATION: "Specificity escalation",
  PERSONAL_STAKE: "Personal stake",
  REFRAME: "Reframe",
  // payoff
  SPECIFIC_MECHANISM: "Specific mechanism",
  DIAGNOSTIC: "Diagnostic",
  PROTECTIVE_INVERSION: "Protective inversion",
  CONTINUATION: "Continuation",
  // deepening
  SECOND_EXAMPLE: "Second example",
  OBJECTION_HANDLE: "Objection handle",
  PERSONAL_DISCLOSURE: "Personal disclosure",
  ESCALATION: "Escalation",
  // close
  FRAMEWORK_SUMMARY: "Framework summary (saves)",
  PROTECTIVE_HANDOFF: "Protective handoff (shares)",
  DIAGNOSTIC_QUESTION: "Diagnostic question (comments)",
  IMPLIED_CATALOGUE: "Implied catalogue (follows)",
};

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

interface BeatBlockProps {
  number: string;
  label: string;
  window: string;
  mechanism?: string | null;
  text: string | null;
}

function BeatBlock({ number, label, window, mechanism, text }: BeatBlockProps) {
  if (!text) return null;
  return (
    <div className="border-l-2 border-accent-gold/30 pl-3 py-1">
      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
        <span className="text-[10px] uppercase tracking-wider text-accent-gold">
          {number} · {label}
        </span>
        <span className="text-[10px] text-text-gray/50">{window}</span>
        {mechanism && (
          <span className="text-[10px] uppercase tracking-wider text-text-gray">
            · {MECH_LABELS[mechanism] || mechanism}
          </span>
        )}
      </div>
      <p className="text-sm text-text-light leading-relaxed whitespace-pre-wrap">
        {text}
      </p>
    </div>
  );
}

export default function FilmingQueueTab() {
  const [longIdeas, setLongIdeas] = useState<ContentIdea[]>([]);
  const [shortIdeas, setShortIdeas] = useState<ContentIdea[]>([]);
  const [loading, setLoading] = useState(true);
  const [advancing, setAdvancing] = useState<string | null>(null);

  const fetchIdeas = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        status: "APPROVED",
        stage: "READY_TO_FILM",
      });
      const res = await fetch(`/api/admin/content/ideas?${params}`);
      if (!res.ok) throw new Error(`${res.status}`);
      const data = await res.json();
      const all: ContentIdea[] = data.ideas || [];
      setLongIdeas(all.filter((i) => i.videoFormat !== "SHORT"));
      setShortIdeas(all.filter((i) => i.videoFormat === "SHORT"));
    } catch {
      setLongIdeas([]);
      setShortIdeas([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIdeas();
  }, [fetchIdeas]);

  async function markFilmed(id: string) {
    setAdvancing(id);
    try {
      await fetch(`/api/admin/content/ideas/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ developmentStage: "FILMED" }),
      });
      await fetchIdeas();
    } finally {
      setAdvancing(null);
    }
  }

  function renderIdea(idea: ContentIdea, isShort: boolean) {
    return (
      <div key={idea.id} className="glass-card p-4 mb-3">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span
                className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                  isShort
                    ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                    : "bg-purple-500/10 text-purple-400 border-purple-500/20"
                }`}
              >
                {isShort ? "Short · 15–25s" : "Long · 45–60s"}
              </span>
              {idea.hookType && (
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-text-gray border border-white/10">
                  {HOOK_TYPE_LABELS[idea.hookType] || idea.hookType}
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
            </div>
            <h3 className="text-base font-medium text-text-light leading-snug">
              {idea.title}
            </h3>
          </div>
          <button
            onClick={() => markFilmed(idea.id)}
            disabled={advancing === idea.id}
            className="flex items-center gap-1.5 px-3 py-2 text-xs bg-accent-gold/10 text-accent-gold border border-accent-gold/30 rounded-lg hover:bg-accent-gold/20 transition-all disabled:opacity-50 shrink-0"
          >
            {advancing === idea.id ? (
              <Loader2 size={12} className="animate-spin" />
            ) : (
              <Check size={12} />
            )}
            Mark filmed
            <ArrowRight size={12} />
          </button>
        </div>

        {/* Linked confession */}
        {idea.confession && (
          <div className="mb-3 p-2.5 rounded-lg border border-amber-500/20 bg-amber-500/5">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <Flame size={11} className="text-amber-300" />
              <span className="text-[10px] uppercase tracking-wider text-amber-300">
                Shock-and-awe {tierIcon(idea.confession.tier)}{" "}
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
        )}

        {/* Beats, only show those with text */}
        <div className="space-y-2.5">
          {!isShort ? (
            <>
              <BeatBlock
                number="1"
                label="Hook"
                window="0–3s"
                mechanism={idea.hookType}
                text={idea.hook}
              />
              <BeatBlock
                number="2"
                label="Re-energize"
                window="3–8s"
                mechanism={idea.line2Mechanism}
                text={idea.line2}
              />
              <BeatBlock
                number="3"
                label="Setup"
                window="8–15s"
                text={idea.setup}
              />
              <BeatBlock
                number="4"
                label="Payoff"
                window="15–30s"
                mechanism={idea.line3Mechanism}
                text={idea.line3}
              />
              <BeatBlock
                number="5"
                label="Deepening"
                window="30–45s"
                mechanism={idea.deepeningMechanism}
                text={idea.deepening}
              />
              <BeatBlock
                number="6"
                label="Close"
                window="45–55s"
                mechanism={idea.closeMechanism}
                text={idea.closeBeat}
              />
              <BeatBlock
                number="7"
                label="Tail"
                window="55–60s"
                text={idea.tail}
              />
            </>
          ) : (
            <>
              <BeatBlock
                number="1"
                label="Hook"
                window="0–2s"
                mechanism={idea.hookType}
                text={idea.hook}
              />
              <BeatBlock
                number="2"
                label="Payoff"
                window="2–18s"
                mechanism={idea.line3Mechanism}
                text={idea.line3}
              />
              <BeatBlock
                number="3"
                label="Tail"
                window="18–25s"
                text={idea.tail}
              />
            </>
          )}
        </div>

        {idea.notes && (
          <div className="mt-3 pt-3 border-t border-white/5">
            <p className="text-[11px] text-text-gray/70 italic whitespace-pre-wrap">
              {idea.notes}
            </p>
          </div>
        )}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-accent-gold" size={24} />
      </div>
    );
  }

  if (longIdeas.length === 0 && shortIdeas.length === 0) {
    return (
      <div className="text-center py-20 text-text-gray">
        <Camera size={32} className="mx-auto text-text-gray/30 mb-3" />
        <div>Nothing in the filming queue yet.</div>
        <div className="text-xs mt-2 opacity-60">
          Advance ideas to <span className="text-text-light">Ready to film</span>{" "}
          in the Develop tab, they show up here grouped by format.
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Stats banner */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="glass-card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
            <Camera size={16} className="text-purple-400" />
          </div>
          <div>
            <div className="text-xl font-extralight text-text-light">
              {longIdeas.length}
            </div>
            <div className="text-[10px] uppercase tracking-wider text-text-gray">
              Long videos to shoot
            </div>
          </div>
        </div>
        <div className="glass-card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
            <Camera size={16} className="text-cyan-400" />
          </div>
          <div>
            <div className="text-xl font-extralight text-text-light">
              {shortIdeas.length}
            </div>
            <div className="text-[10px] uppercase tracking-wider text-text-gray">
              Shorts to shoot
            </div>
          </div>
        </div>
      </div>

      {/* Long block */}
      {longIdeas.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm uppercase tracking-wider text-text-gray mb-3">
            Long format (45–60s)
          </h2>
          {longIdeas.map((i) => renderIdea(i, false))}
        </div>
      )}

      {/* Short block */}
      {shortIdeas.length > 0 && (
        <div>
          <h2 className="text-sm uppercase tracking-wider text-text-gray mb-3">
            Short format (15–25s)
          </h2>
          {shortIdeas.map((i) => renderIdea(i, true))}
        </div>
      )}
    </div>
  );
}
