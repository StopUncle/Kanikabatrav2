"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUp, ArrowDown, X, Plus, Trash2 } from "lucide-react";

export type AdventureFormInitial = {
  id?: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  scenarioIds: string[];
  tier: "free" | "premium" | "vip";
  estimatedMinutes: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  coverArt: string | null;
  endingRecap: string;
  isNew: boolean;
  publishedAt: string | null;
};

type ScenarioOption = {
  id: string;
  title: string;
  track: string;
};

type Props = {
  mode: "new" | "edit";
  initial: AdventureFormInitial;
  scenarios: ScenarioOption[];
};

const EMPTY_INITIAL: AdventureFormInitial = {
  slug: "",
  title: "",
  tagline: "",
  description: "",
  scenarioIds: [],
  tier: "free",
  estimatedMinutes: 30,
  difficulty: "intermediate",
  coverArt: null,
  endingRecap: "",
  isNew: true,
  publishedAt: null,
};

export { EMPTY_INITIAL };

export default function AdventureForm({ mode, initial, scenarios }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<AdventureFormInitial>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingScenarioId, setPendingScenarioId] = useState<string>("");

  const isPublished = !!form.publishedAt;

  const scenariosByTrack = useMemo(() => {
    const grouped: Record<string, ScenarioOption[]> = {};
    for (const s of scenarios) {
      if (!grouped[s.track]) grouped[s.track] = [];
      grouped[s.track].push(s);
    }
    return grouped;
  }, [scenarios]);

  const scenarioById = useMemo(() => {
    const m = new Map<string, ScenarioOption>();
    for (const s of scenarios) m.set(s.id, s);
    return m;
  }, [scenarios]);

  function addScenario() {
    if (!pendingScenarioId) return;
    if (form.scenarioIds.includes(pendingScenarioId)) return;
    setForm({ ...form, scenarioIds: [...form.scenarioIds, pendingScenarioId] });
    setPendingScenarioId("");
  }

  function removeScenario(idx: number) {
    setForm({
      ...form,
      scenarioIds: form.scenarioIds.filter((_, i) => i !== idx),
    });
  }

  function move(idx: number, delta: number) {
    const next = [...form.scenarioIds];
    const target = idx + delta;
    if (target < 0 || target >= next.length) return;
    [next[idx], next[target]] = [next[target], next[idx]];
    setForm({ ...form, scenarioIds: next });
  }

  async function submit(publish: boolean) {
    setError(null);
    setSubmitting(true);
    try {
      const payload = {
        slug: form.slug,
        title: form.title,
        tagline: form.tagline,
        description: form.description,
        scenarioIds: form.scenarioIds,
        tier: form.tier,
        estimatedMinutes: form.estimatedMinutes,
        difficulty: form.difficulty,
        coverArt: form.coverArt || null,
        endingRecap: form.endingRecap,
        isNew: form.isNew,
        publish,
      };
      const url =
        mode === "new"
          ? "/api/admin/adventures"
          : `/api/admin/adventures/${initial.id}`;
      const method = mode === "new" ? "POST" : "PATCH";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
          detail?: string;
        };
        throw new Error(data.detail || data.error || `Save failed (${res.status})`);
      }
      router.push("/admin/adventures");
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  async function deleteAdventure() {
    if (!initial.id) return;
    if (!confirm("Delete this adventure? This cannot be undone.")) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/adventures/${initial.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      router.push("/admin/adventures");
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      className="space-y-6 max-w-3xl"
      onSubmit={(e) => {
        e.preventDefault();
        submit(isPublished);
      }}
    >
      {error && (
        <div className="p-3 rounded border border-red-500/50 bg-red-500/10 text-red-300 text-sm">
          {error}
        </div>
      )}

      <Field label="Title">
        <input
          type="text"
          required
          maxLength={120}
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className={inputClass}
        />
      </Field>

      <Field label="Slug" hint="URL path, lowercase letters / numbers / hyphens">
        <input
          type="text"
          required
          pattern="[a-z0-9-]+"
          maxLength={80}
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          className={`${inputClass} font-mono`}
        />
      </Field>

      <Field label="Tagline">
        <input
          type="text"
          required
          maxLength={200}
          value={form.tagline}
          onChange={(e) => setForm({ ...form, tagline: e.target.value })}
          className={inputClass}
        />
      </Field>

      <Field label="Description">
        <textarea
          required
          maxLength={4000}
          rows={4}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className={`${inputClass} resize-y`}
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Field label="Tier">
          <select
            value={form.tier}
            onChange={(e) =>
              setForm({ ...form, tier: e.target.value as typeof form.tier })
            }
            className={inputClass}
          >
            <option value="free">Free</option>
            <option value="premium">Premium</option>
            <option value="vip">VIP</option>
          </select>
        </Field>
        <Field label="Difficulty">
          <select
            value={form.difficulty}
            onChange={(e) =>
              setForm({
                ...form,
                difficulty: e.target.value as typeof form.difficulty,
              })
            }
            className={inputClass}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </Field>
        <Field label="Estimated minutes">
          <input
            type="number"
            required
            min={1}
            max={600}
            value={form.estimatedMinutes}
            onChange={(e) =>
              setForm({
                ...form,
                estimatedMinutes: Number(e.target.value) || 0,
              })
            }
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Ending recap" hint="Shown on the completion page after the final chapter">
        <textarea
          required
          maxLength={8000}
          rows={5}
          value={form.endingRecap}
          onChange={(e) => setForm({ ...form, endingRecap: e.target.value })}
          className={`${inputClass} resize-y`}
        />
      </Field>

      <Field label="Cover art URL" hint="Optional. Leave blank for none.">
        <input
          type="url"
          maxLength={500}
          value={form.coverArt ?? ""}
          onChange={(e) =>
            setForm({ ...form, coverArt: e.target.value || null })
          }
          className={inputClass}
        />
      </Field>

      <div className="flex items-center gap-2">
        <input
          id="isNew"
          type="checkbox"
          checked={form.isNew}
          onChange={(e) => setForm({ ...form, isNew: e.target.checked })}
        />
        <label htmlFor="isNew" className="text-text-light text-sm">
          Mark as new (shows a &ldquo;NEW&rdquo; pill on the catalog card)
        </label>
      </div>

      <fieldset className="space-y-3">
        <legend className="text-accent-gold/70 text-[10px] uppercase tracking-[0.3em] mb-2">
          Scenarios in this arc
        </legend>

        <div className="rounded border border-gray-800 bg-deep-black/40">
          {form.scenarioIds.length === 0 ? (
            <p className="p-4 text-text-gray text-sm italic">
              No scenarios added. Pick one below and click Add.
            </p>
          ) : (
            <ol className="divide-y divide-gray-800">
              {form.scenarioIds.map((sid, idx) => {
                const s = scenarioById.get(sid);
                return (
                  <li
                    key={`${sid}-${idx}`}
                    className="flex items-center gap-3 p-3"
                  >
                    <span className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-gold/15 text-accent-gold text-[10px] tabular-nums">
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-text-light text-sm font-light truncate">
                        {s?.title ?? sid}
                      </p>
                      <p className="text-text-gray text-[10px] uppercase tracking-[0.25em]">
                        {s?.track ?? "missing"} . {sid}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => move(idx, -1)}
                        disabled={idx === 0}
                        className="p-1.5 rounded text-text-gray hover:text-accent-gold disabled:opacity-30 disabled:hover:text-text-gray"
                        aria-label="Move up"
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => move(idx, 1)}
                        disabled={idx === form.scenarioIds.length - 1}
                        className="p-1.5 rounded text-text-gray hover:text-accent-gold disabled:opacity-30 disabled:hover:text-text-gray"
                        aria-label="Move down"
                      >
                        <ArrowDown size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeScenario(idx)}
                        className="p-1.5 rounded text-text-gray hover:text-red-400"
                        aria-label="Remove"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
        </div>

        <div className="flex gap-2 items-stretch">
          <select
            value={pendingScenarioId}
            onChange={(e) => setPendingScenarioId(e.target.value)}
            className={`${inputClass} flex-1`}
          >
            <option value="">Pick a scenario to add</option>
            {Object.entries(scenariosByTrack).map(([track, list]) => (
              <optgroup key={track} label={track}>
                {list.map((s) => (
                  <option
                    key={s.id}
                    value={s.id}
                    disabled={form.scenarioIds.includes(s.id)}
                  >
                    {s.title}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <button
            type="button"
            onClick={addScenario}
            disabled={!pendingScenarioId}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-accent-gold/15 border border-accent-gold/40 text-accent-gold text-xs uppercase tracking-[0.2em] hover:bg-accent-gold/25 disabled:opacity-30 disabled:hover:bg-accent-gold/15"
          >
            <Plus size={14} /> Add
          </button>
        </div>
      </fieldset>

      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-800">
        {isPublished ? (
          <>
            <button
              type="button"
              disabled={submitting || form.scenarioIds.length === 0}
              onClick={() => submit(true)}
              className="px-5 py-2.5 rounded-full bg-accent-gold text-deep-black font-medium tracking-wider uppercase text-xs hover:bg-accent-gold/90 disabled:opacity-40"
            >
              Save
            </button>
            <button
              type="button"
              disabled={submitting}
              onClick={() => submit(false)}
              className="px-5 py-2.5 rounded-full border border-gray-700 text-text-light font-medium tracking-wider uppercase text-xs hover:border-accent-gold/40 disabled:opacity-40"
            >
              Unpublish
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              disabled={submitting || form.scenarioIds.length === 0}
              onClick={() => submit(false)}
              className="px-5 py-2.5 rounded-full border border-gray-700 text-text-light font-medium tracking-wider uppercase text-xs hover:border-accent-gold/40 disabled:opacity-40"
            >
              Save as draft
            </button>
            <button
              type="button"
              disabled={submitting || form.scenarioIds.length === 0}
              onClick={() => submit(true)}
              className="px-5 py-2.5 rounded-full bg-accent-gold text-deep-black font-medium tracking-wider uppercase text-xs hover:bg-accent-gold/90 disabled:opacity-40"
            >
              Publish
            </button>
          </>
        )}
        {mode === "edit" && initial.id && (
          <button
            type="button"
            onClick={deleteAdventure}
            disabled={submitting}
            className="ml-auto inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-red-500/40 text-red-300 text-xs uppercase tracking-[0.2em] hover:bg-red-500/10"
          >
            <Trash2 size={14} /> Delete
          </button>
        )}
      </div>
    </form>
  );
}

const inputClass =
  "w-full px-3 py-2 rounded border border-gray-700 bg-deep-black/60 text-text-light text-sm focus:outline-none focus:border-accent-gold/60";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-accent-gold/70 text-[10px] uppercase tracking-[0.3em] mb-1.5">
        {label}
      </span>
      {children}
      {hint && (
        <span className="block text-text-gray text-[11px] mt-1">{hint}</span>
      )}
    </label>
  );
}
