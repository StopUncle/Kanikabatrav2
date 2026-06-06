"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { tierForComposite, tierMeta } from "@/lib/board/tiers";
import { monthYear } from "@/lib/board/format";

/**
 * Admin editor for a single figure: editorial fields + sources (PATCH),
 * and the add-score form that appends to the living re-score timeline
 * (POST). Score history is shown read-only, scores are immutable.
 */

interface SourceInput {
  label: string;
  url: string;
}
interface SectorInput {
  name: string;
  score: number;
}
interface HistoryEntry {
  id: string;
  composite: number;
  factor1: number;
  factor2: number;
  triggerEvent: string | null;
  scoredAt: string;
}

export interface EditorInitial {
  slug: string;
  name: string;
  descriptor: string;
  archetype: string;
  status: string;
  isCalibration: boolean;
  featuredRequest: boolean;
  photoUrl: string;
  sources: SourceInput[];
  history: HistoryEntry[];
}

const DEFAULT_SECTORS: SectorInput[] = [
  { name: "Grandiosity", score: 50 },
  { name: "Empathy markers", score: 50 },
  { name: "Affect / shallowness", score: 50 },
  { name: "Control / manipulation", score: 50 },
  { name: "Image management", score: 50 },
  { name: "Response under criticism", score: 50 },
];

const inputCls =
  "w-full rounded-sm border border-gray-700 bg-white/[0.03] px-3 py-2 text-sm text-text-light outline-none focus:border-accent-gold/40";

export default function AdminFigureEditor({ initial }: { initial: EditorInitial }) {
  const router = useRouter();

  // --- Figure fields ---
  const [name, setName] = useState(initial.name);
  const [descriptor, setDescriptor] = useState(initial.descriptor);
  const [archetype, setArchetype] = useState(initial.archetype);
  const [status, setStatus] = useState(initial.status);
  const [isCalibration, setIsCalibration] = useState(initial.isCalibration);
  const [featuredRequest, setFeaturedRequest] = useState(initial.featuredRequest);
  const [photoUrl, setPhotoUrl] = useState(initial.photoUrl);
  const [sources, setSources] = useState<SourceInput[]>(
    initial.sources.length ? initial.sources : [],
  );
  const [savingFields, setSavingFields] = useState(false);
  const [fieldMsg, setFieldMsg] = useState<string | null>(null);

  // --- Add score ---
  const [composite, setComposite] = useState(50);
  const [factor1, setFactor1] = useState(50);
  const [factor2, setFactor2] = useState(50);
  const [verdict, setVerdict] = useState("");
  const [triggerEvent, setTriggerEvent] = useState("");
  const [sectors, setSectors] = useState<SectorInput[]>(DEFAULT_SECTORS);
  const [savingScore, setSavingScore] = useState(false);
  const [scoreMsg, setScoreMsg] = useState<string | null>(null);

  async function saveFields() {
    setSavingFields(true);
    setFieldMsg(null);
    try {
      const res = await fetch(`/api/admin/board/${initial.slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          descriptor: descriptor.trim() || null,
          archetype: archetype || null,
          status,
          isCalibration,
          featuredRequest,
          photoUrl: photoUrl.trim() || null,
          sources: sources.filter((s) => s.label.trim() && s.url.trim()),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Could not save");
      }
      setFieldMsg("Saved");
      router.refresh();
    } catch (e) {
      setFieldMsg(e instanceof Error ? e.message : "Error");
    } finally {
      setSavingFields(false);
    }
  }

  async function saveScore() {
    if (!verdict.trim()) {
      setScoreMsg("Verdict is required");
      return;
    }
    setSavingScore(true);
    setScoreMsg(null);
    try {
      const res = await fetch(`/api/admin/board/${initial.slug}/score`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          composite,
          factor1,
          factor2,
          verdict: verdict.trim(),
          triggerEvent: triggerEvent.trim() || null,
          sectors: sectors.filter((s) => s.name.trim()),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Could not save score");
      }
      setScoreMsg("Score added");
      setVerdict("");
      setTriggerEvent("");
      router.refresh();
    } catch (e) {
      setScoreMsg(e instanceof Error ? e.message : "Error");
    } finally {
      setSavingScore(false);
    }
  }

  const previewTier = tierMeta(tierForComposite(composite));

  return (
    <div className="max-w-3xl">
      <Link href="/admin/board" className="mb-6 inline-block text-[11px] uppercase tracking-[0.25em] text-text-gray/60 hover:text-text-light">
        &larr; Figures
      </Link>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-extralight uppercase tracking-wider text-text-light">
          {initial.name}
        </h1>
        <Link href={`/board/${initial.slug}`} target="_blank" className="text-[11px] uppercase tracking-[0.2em] text-accent-gold/70 hover:text-accent-gold">
          View public &rarr;
        </Link>
      </div>

      {/* Add score */}
      <section className="mb-10 rounded-lg border border-gray-800 p-5">
        <h2 className="mb-4 text-[11px] uppercase tracking-[0.25em] text-accent-gold/70">
          Add a {initial.history.length === 0 ? "debut" : "re"}-score
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Composite", value: composite, set: setComposite },
            { label: "Factor 1", value: factor1, set: setFactor1 },
            { label: "Factor 2", value: factor2, set: setFactor2 },
          ].map((f) => (
            <label key={f.label} className="block">
              <span className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-text-gray/60">{f.label}</span>
              <input
                type="number"
                min={0}
                max={100}
                value={f.value}
                onChange={(e) => f.set(Math.max(0, Math.min(100, Number(e.target.value))))}
                className={inputCls}
              />
            </label>
          ))}
        </div>
        <p className="mt-2 text-[11px] uppercase tracking-[0.15em] text-text-gray/50">
          Tier: <span className="text-warm-gold/80">{previewTier.label}</span>
        </p>

        <div className="mt-4">
          <span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-text-gray/60">Sector reads</span>
          <div className="space-y-2">
            {sectors.map((s, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={s.name}
                  onChange={(e) => {
                    const next = [...sectors];
                    next[i] = { ...next[i], name: e.target.value };
                    setSectors(next);
                  }}
                  className={`${inputCls} flex-1`}
                />
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={s.score}
                  onChange={(e) => {
                    const next = [...sectors];
                    next[i] = { ...next[i], score: Math.max(0, Math.min(100, Number(e.target.value))) };
                    setSectors(next);
                  }}
                  className={`${inputCls} w-20`}
                />
              </div>
            ))}
          </div>
        </div>

        <label className="mt-4 block">
          <span className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-text-gray/60">Verdict</span>
          <textarea value={verdict} onChange={(e) => setVerdict(e.target.value)} rows={4} className={inputCls} placeholder="Kanika's written read..." />
        </label>
        <label className="mt-4 block">
          <span className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-text-gray/60">
            Trigger event (re-scores only)
          </span>
          <input value={triggerEvent} onChange={(e) => setTriggerEvent(e.target.value)} className={inputCls} placeholder="deposition transcripts released" />
        </label>

        <div className="mt-4 flex items-center gap-4">
          <button onClick={saveScore} disabled={savingScore} className="rounded-full bg-accent-gold px-6 py-2.5 text-xs font-medium uppercase tracking-wider text-deep-black hover:bg-accent-gold/90 disabled:opacity-50">
            {savingScore ? "Saving..." : "Add score"}
          </button>
          {scoreMsg && <span className="text-xs text-text-gray">{scoreMsg}</span>}
        </div>
      </section>

      {/* History */}
      {initial.history.length > 0 && (
        <section className="mb-10 rounded-lg border border-gray-800 p-5">
          <h2 className="mb-4 text-[11px] uppercase tracking-[0.25em] text-text-gray/70">
            Score history
          </h2>
          <ul className="space-y-2 text-sm">
            {initial.history.map((h) => (
              <li key={h.id} className="flex items-center justify-between border-b border-gray-800/60 pb-2">
                <span className="font-serif text-warm-gold tabular-nums">{h.composite}</span>
                <span className="text-xs text-text-gray">F1 {h.factor1} · F2 {h.factor2}</span>
                <span className="text-xs text-text-gray/60">{h.triggerEvent ?? "debut"}</span>
                <span className="text-[11px] uppercase tracking-[0.15em] text-text-gray/40">{monthYear(h.scoredAt)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Figure fields */}
      <section className="rounded-lg border border-gray-800 p-5">
        <h2 className="mb-4 text-[11px] uppercase tracking-[0.25em] text-text-gray/70">
          Figure details
        </h2>
        <div className="space-y-4">
          <label className="block">
            <span className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-text-gray/60">Name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
          </label>
          <label className="block">
            <span className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-text-gray/60">Descriptor</span>
            <input value={descriptor} onChange={(e) => setDescriptor(e.target.value)} className={inputCls} />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-text-gray/60">Archetype</span>
              <select value={archetype} onChange={(e) => setArchetype(e.target.value)} className={inputCls}>
                <option value="" className="bg-deep-black">None</option>
                <option value="OPERATOR" className="bg-deep-black">Operator</option>
                <option value="TRAINWRECK" className="bg-deep-black">Trainwreck</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-text-gray/60">Status</span>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className={inputCls}>
                <option value="ON_BOARD" className="bg-deep-black">On board</option>
                <option value="RESCORE_PENDING" className="bg-deep-black">Re-score pending</option>
                <option value="MOST_REQUESTED" className="bg-deep-black">Most requested</option>
              </select>
            </label>
          </div>
          <label className="block">
            <span className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-text-gray/60">Photo URL</span>
            <input value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} className={inputCls} placeholder="https://..." />
          </label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm text-text-gray">
              <input type="checkbox" checked={isCalibration} onChange={(e) => setIsCalibration(e.target.checked)} className="accent-warm-gold" />
              Calibration anchor
            </label>
            <label className="flex items-center gap-2 text-sm text-text-gray">
              <input type="checkbox" checked={featuredRequest} onChange={(e) => setFeaturedRequest(e.target.checked)} className="accent-warm-gold" />
              Pin to Most Requested
            </label>
          </div>

          {/* Sources */}
          <div>
            <span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-text-gray/60">Sources</span>
            <div className="space-y-2">
              {sources.map((s, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    value={s.label}
                    placeholder="2024 interview"
                    onChange={(e) => {
                      const next = [...sources];
                      next[i] = { ...next[i], label: e.target.value };
                      setSources(next);
                    }}
                    className={`${inputCls} flex-1`}
                  />
                  <input
                    value={s.url}
                    placeholder="https://..."
                    onChange={(e) => {
                      const next = [...sources];
                      next[i] = { ...next[i], url: e.target.value };
                      setSources(next);
                    }}
                    className={`${inputCls} flex-1`}
                  />
                  <button onClick={() => setSources(sources.filter((_, j) => j !== i))} className="px-2 text-text-gray/60 hover:text-accent-burgundy">
                    ×
                  </button>
                </div>
              ))}
              <button onClick={() => setSources([...sources, { label: "", url: "" }])} className="text-xs uppercase tracking-[0.15em] text-accent-gold/70 hover:text-accent-gold">
                + Add source
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={saveFields} disabled={savingFields} className="rounded-full border border-gray-600 px-6 py-2.5 text-xs font-medium uppercase tracking-wider text-text-light hover:border-accent-gold/40 disabled:opacity-50">
              {savingFields ? "Saving..." : "Save details"}
            </button>
            {fieldMsg && <span className="text-xs text-text-gray">{fieldMsg}</span>}
          </div>
        </div>
      </section>
    </div>
  );
}
