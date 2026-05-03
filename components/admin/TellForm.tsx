"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AXIS_KEYS,
  AXIS_LABELS,
  TRACK_LABELS,
  type InstinctAxis,
  type InstinctTrack,
  type TellArtifact,
} from "@/lib/tells/types";

/**
 * Admin authoring form for Tells.
 *
 * Spike-level UX: one big page form. No live preview yet, the page
 * shows the saved Tell after submit so the author sees exactly what
 * /tells will render. Diagnose format only at MVP, the four other
 * formats add fields here when wired.
 */

type FormChoice = {
  id: string;
  text: string;
  isCorrect: boolean;
  why: string;
};

interface Props {
  initial?: {
    id: string;
    number: number;
    slug: string;
    track: InstinctTrack;
    axes: InstinctAxis[];
    difficulty: number;
    artifact: TellArtifact;
    question: string;
    choices: FormChoice[];
    reveal: string;
    scheduleDate: string | null;
    status: string;
  };
  /** "new" or the Tell id when editing. */
  mode: "new" | "edit";
  tellId?: string;
}

const ARTIFACT_KINDS = [
  "voicemail",
  "text-exchange",
  "paragraph",
  "scene",
] as const;
type ArtifactKind = (typeof ARTIFACT_KINDS)[number];

export default function TellForm({ initial, mode, tellId }: Props) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [number, setNumber] = useState(initial?.number ?? 0);
  const [track, setTrack] = useState<InstinctTrack>(
    initial?.track ?? "DARK_PSYCH",
  );
  const [axes, setAxes] = useState<InstinctAxis[]>(
    initial?.axes ?? ["READ"],
  );
  const [difficulty, setDifficulty] = useState(initial?.difficulty ?? 3);
  const [artifactKind, setArtifactKind] = useState<ArtifactKind>(
    (initial?.artifact.kind as ArtifactKind | undefined) ?? "voicemail",
  );
  const [artifactJson, setArtifactJson] = useState<string>(
    JSON.stringify(
      initial?.artifact ?? {
        kind: "voicemail",
        speakerLabel: "Her, 11:47 p.m.",
        durationLabel: "1:42",
        transcript: "",
      },
      null,
      2,
    ),
  );
  const [question, setQuestion] = useState(initial?.question ?? "");
  const [choices, setChoices] = useState<FormChoice[]>(
    initial?.choices ?? [
      { id: "a", text: "", isCorrect: true, why: "" },
      { id: "b", text: "", isCorrect: false, why: "" },
      { id: "c", text: "", isCorrect: false, why: "" },
      { id: "d", text: "", isCorrect: false, why: "" },
    ],
  );
  const [reveal, setReveal] = useState(initial?.reveal ?? "");
  const [scheduleDate, setScheduleDate] = useState<string>(
    initial?.scheduleDate ?? "",
  );
  const [status, setStatus] = useState<string>(initial?.status ?? "DRAFT");

  function toggleAxis(axis: InstinctAxis) {
    setAxes((prev) =>
      prev.includes(axis)
        ? prev.filter((a) => a !== axis)
        : prev.length < 2
          ? [...prev, axis]
          : prev,
    );
  }

  function setChoice(i: number, patch: Partial<FormChoice>) {
    setChoices((prev) =>
      prev.map((c, idx) => (idx === i ? { ...c, ...patch } : c)),
    );
  }

  function setOnlyCorrect(i: number) {
    setChoices((prev) =>
      prev.map((c, idx) => ({ ...c, isCorrect: idx === i })),
    );
  }

  async function submit() {
    setError(null);
    if (axes.length === 0) {
      setError("Pick at least one axis.");
      return;
    }
    if (choices.filter((c) => c.isCorrect).length !== 1) {
      setError("Exactly one choice must be marked correct.");
      return;
    }
    // A PUBLISHED Tell without a scheduleDate is a footgun: it would
    // immediately surface on /tells (scheduleDate <= now uses a NULL
    // comparison that the DB treats as never-true, but the public-facing
    // logic expects a real date for archival ordering and OG images).
    if (status === "PUBLISHED" && !scheduleDate) {
      setError(
        "A published Tell needs a schedule date. Pick one or save as Draft.",
      );
      return;
    }
    let artifactValue: unknown;
    try {
      artifactValue = JSON.parse(artifactJson);
    } catch {
      setError("Artifact JSON is invalid.");
      return;
    }

    setSubmitting(true);
    try {
      const url =
        mode === "new" ? "/api/admin/tells" : `/api/admin/tells/${tellId}`;
      const method = mode === "new" ? "POST" : "PATCH";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          number,
          track,
          axes,
          difficulty,
          artifact: artifactValue,
          question,
          choices,
          reveal,
          scheduleDate: scheduleDate || null,
          status,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Save failed.");
        setSubmitting(false);
        return;
      }
      router.push("/admin/tells");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed.");
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-8 max-w-3xl">
      {error && (
        <div className="rounded-lg border border-accent-burgundy/60 bg-accent-burgundy/10 px-4 py-3 text-sm text-text-light">
          {error}
        </div>
      )}

      <Section title="Identity">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Number">
            <input
              type="number"
              value={number}
              onChange={(e) => setNumber(Number(e.target.value))}
              className="input"
            />
          </Field>
          <Field label="Difficulty (1-5)">
            <input
              type="number"
              min={1}
              max={5}
              value={difficulty}
              onChange={(e) => setDifficulty(Number(e.target.value))}
              className="input"
            />
          </Field>
        </div>
      </Section>

      <Section title="Track + Axes">
        <Field label="Track">
          <select
            value={track}
            onChange={(e) => setTrack(e.target.value as InstinctTrack)}
            className="input"
          >
            {(Object.keys(TRACK_LABELS) as InstinctTrack[]).map((t) => (
              <option key={t} value={t}>
                {TRACK_LABELS[t]}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Axes (1-2)">
          <div className="flex flex-wrap gap-2">
            {AXIS_KEYS.map((a) => {
              const selected = axes.includes(a);
              return (
                <button
                  key={a}
                  type="button"
                  onClick={() => toggleAxis(a)}
                  className={`px-3 py-1.5 rounded text-xs uppercase tracking-[0.2em] border transition-all ${
                    selected
                      ? "border-accent-gold/60 bg-accent-gold/10 text-accent-gold"
                      : "border-gray-800 text-text-gray hover:border-accent-gold/30"
                  }`}
                >
                  {AXIS_LABELS[a]}
                </button>
              );
            })}
          </div>
        </Field>
      </Section>

      <Section title="Artifact">
        <Field label="Kind">
          <select
            value={artifactKind}
            onChange={(e) => setArtifactKind(e.target.value as ArtifactKind)}
            className="input"
          >
            {ARTIFACT_KINDS.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Artifact JSON (must match the kind shape)">
          <textarea
            value={artifactJson}
            onChange={(e) => setArtifactJson(e.target.value)}
            rows={10}
            className="input font-mono text-xs"
          />
        </Field>
      </Section>

      <Section title="Question">
        <Field label="The question shown above the choices">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="input"
          />
        </Field>
      </Section>

      <Section title="Choices (exactly one correct)">
        {choices.map((c, i) => (
          <div
            key={i}
            className="rounded-lg border border-gray-800 p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.3em] text-text-gray">
                Choice {String.fromCharCode(65 + i)}
              </span>
              <label className="flex items-center gap-2 text-xs text-text-gray">
                <input
                  type="radio"
                  name="correct"
                  checked={c.isCorrect}
                  onChange={() => setOnlyCorrect(i)}
                />
                Correct
              </label>
            </div>
            <Field label="Choice text">
              <input
                type="text"
                value={c.text}
                onChange={(e) => setChoice(i, { text: e.target.value })}
                className="input"
              />
            </Field>
            <Field label="Why this choice (shown on reveal)">
              <textarea
                value={c.why}
                onChange={(e) => setChoice(i, { why: e.target.value })}
                rows={2}
                className="input"
              />
            </Field>
          </div>
        ))}
      </Section>

      <Section title="Reveal">
        <Field label="Kanika voice teach (60-100 words)">
          <textarea
            value={reveal}
            onChange={(e) => setReveal(e.target.value)}
            rows={6}
            className="input"
          />
          <p className="text-[10px] text-text-gray mt-1">
            {reveal.split(/\s+/).filter(Boolean).length} words
          </p>
        </Field>
      </Section>

      <Section title="Schedule + Status">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Publish date (UTC)">
            <input
              type="date"
              value={scheduleDate ? scheduleDate.slice(0, 10) : ""}
              onChange={(e) => setScheduleDate(e.target.value)}
              className="input"
            />
          </Field>
          <Field label="Status">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="input"
            >
              <option value="DRAFT">Draft</option>
              <option value="REVIEW">Review</option>
              <option value="SCHEDULED">Scheduled</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </Field>
        </div>
      </Section>

      <div className="flex gap-3 pt-4">
        <button
          onClick={submit}
          disabled={submitting}
          className="px-7 py-3 rounded-full bg-accent-gold text-deep-black font-medium tracking-wider uppercase text-xs hover:bg-accent-gold/90 transition-all disabled:opacity-50"
        >
          {submitting ? "Saving…" : mode === "new" ? "Create" : "Save"}
        </button>
        <button
          onClick={() => router.push("/admin/tells")}
          className="px-7 py-3 rounded-full border border-gray-700 text-text-light font-medium tracking-wider uppercase text-xs hover:border-accent-gold/40"
        >
          Cancel
        </button>
      </div>

      <style jsx>{`
        :global(.input) {
          width: 100%;
          background: rgb(5 5 17 / 0.6);
          border: 1px solid rgb(75 85 99 / 0.5);
          border-radius: 6px;
          padding: 0.6rem 0.8rem;
          color: rgb(245 240 237);
          font-size: 0.875rem;
        }
        :global(.input:focus) {
          border-color: rgb(183 110 121 / 0.6);
          outline: none;
        }
      `}</style>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-[10px] uppercase tracking-[0.4em] text-accent-gold/70 pb-2 border-b border-gray-800">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-[0.3em] text-text-gray mb-1.5">
        {label}
      </span>
      {children}
    </label>
  );
}
