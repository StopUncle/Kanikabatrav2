"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchWithRefresh } from "@/lib/auth/fetch-with-refresh";

/**
 * The intake: four questions, two confirmations, and the Read.
 *
 * The wait after submission is deliberately staged rather than hidden. She
 * is reading what they wrote, and the letter that comes back is the first
 * artefact of the program; a spinner would throw that moment away.
 */

const QUESTIONS = [
  {
    key: "situation",
    label: "What is the situation you keep losing?",
    hint: "The one that repeats. Be specific about where and when.",
  },
  {
    key: "counterpart",
    label: "Who is in it?",
    hint: "Names are fine. She works with your nouns, not categories.",
  },
  {
    key: "lastFailure",
    label: "What happened the last time it went wrong?",
    hint: "The actual last time. What was said, what you did, what you didn't.",
  },
  {
    key: "goal",
    label: "What do you want to be able to do in twelve weeks?",
    hint: "A thing you would do, not a way you would feel.",
  },
] as const;

type Answers = Record<(typeof QUESTIONS)[number]["key"], string>;

export default function IntakeFlow() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Answers>({
    situation: "",
    counterpart: "",
    lastFailure: "",
    goal: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [adult, setAdult] = useState(false);
  const [phase, setPhase] = useState<"form" | "reading" | "letter">("form");
  const [letter, setLetter] = useState("");
  const [error, setError] = useState<string | null>(null);

  const complete =
    QUESTIONS.every((q) => answers[q.key].trim().length > 0) && agreed && adult;

  async function submit() {
    if (!complete || phase !== "form") return;
    setPhase("reading");
    setError(null);
    try {
      const res = await fetchWithRefresh("/api/program/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...answers,
          agreedAiTerms: agreed,
          confirmedAdult: adult,
        }),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok) throw new Error(body?.error ?? "Something went wrong");
      setLetter(body.readLetter);
      setPhase("letter");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setPhase("form");
    }
  }

  if (phase === "reading") {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center px-6 text-center">
        <p className="text-app-eyebrow uppercase tracking-app-label text-[var(--app-gold)]">
          She is reading what you wrote
        </p>
        <p className="mt-3 max-w-[30ch] text-app-body text-[var(--app-muted)]">
          The Read takes a minute. It is written once, for you, and it opens
          the twelve weeks.
        </p>
        <div className="mt-6 h-px w-24 animate-shimmer bg-[var(--app-gold-soft)]" />
      </div>
    );
  }

  if (phase === "letter") {
    return (
      <div className="px-5 pb-10">
        <p className="text-app-eyebrow uppercase tracking-app-label text-[var(--app-gold)]">
          The Read
        </p>
        <div
          className="mt-4 whitespace-pre-wrap text-app-lead font-light leading-relaxed text-[var(--app-text)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {letter}
        </div>
        <p className="mt-4 text-right text-app-body text-[var(--app-gold-soft)]">
          — Kanika
        </p>
        <button
          type="button"
          onClick={() => router.push("/app/program")}
          className="mt-8 w-full rounded-full bg-[var(--app-gold)] px-4 py-3 text-app-caption uppercase tracking-app-wide text-[#0a0908]"
        >
          Open week one
        </button>
      </div>
    );
  }

  return (
    <div className="px-5 pb-10">
      {QUESTIONS.map((q, i) => (
        <div key={q.key} className={i === 0 ? "" : "mt-6"}>
          <label
            htmlFor={q.key}
            className="block text-app-lead font-light text-[var(--app-text)]"
          >
            {q.label}
          </label>
          <p className="mt-1 text-app-caption text-[var(--app-dim)]">{q.hint}</p>
          <textarea
            id={q.key}
            value={answers[q.key]}
            onChange={(e) =>
              setAnswers((a) => ({ ...a, [q.key]: e.target.value }))
            }
            rows={3}
            maxLength={2000}
            className="mt-2.5 w-full resize-none rounded-xl border border-[var(--app-line-soft)] bg-[var(--app-card)] px-3.5 py-3 text-app-body leading-relaxed text-[var(--app-text)] placeholder:text-[var(--app-dim)] focus:border-[var(--app-gold-soft)] focus:outline-none"
          />
        </div>
      ))}

      {/* The disclosure is the door, not a checkbox ritual: the program is
          an AI trained on her writing, and enrolling is the deliberate
          decision to work with that. Stated plainly, agreed once. */}
      <div className="mt-7 rounded-2xl border border-[var(--app-line)] bg-[var(--app-card)] px-4 py-4">
        <p className="text-app-body leading-relaxed text-[var(--app-muted)]">
          The Twelve is written by an AI trained on Kanika&apos;s book and
          voiced as her. It is not Kanika reading your journal, and it is not
          therapy or medical care. It assigns practice; what you do with it
          is yours.
        </p>
        <label className="mt-3.5 flex items-start gap-2.5">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 accent-[var(--app-gold)]"
          />
          <span className="text-app-caption text-[var(--app-text)]">
            I understand what this is, and what it is not.
          </span>
        </label>
        <label className="mt-2 flex items-start gap-2.5">
          <input
            type="checkbox"
            checked={adult}
            onChange={(e) => setAdult(e.target.checked)}
            className="mt-0.5 accent-[var(--app-gold)]"
          />
          <span className="text-app-caption text-[var(--app-text)]">
            I am 18 or older.
          </span>
        </label>
      </div>

      <button
        type="button"
        onClick={submit}
        disabled={!complete}
        className="mt-6 w-full rounded-full bg-[var(--app-gold)] px-4 py-3 text-app-caption uppercase tracking-app-wide text-[#0a0908] disabled:opacity-40"
      >
        Get your Read
      </button>
      {error && (
        <p className="mt-3 text-center text-app-caption text-[var(--app-rose)]">
          {error}
        </p>
      )}
    </div>
  );
}
