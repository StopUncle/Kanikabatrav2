"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { haptic } from "@/lib/haptics";
import {
  DIFFICULTY_ANCHORS,
  MAX_DIFFICULTY,
  MIN_DIFFICULTY,
  MISS_NOTE_MAX,
  PACT_MISS_REASONS,
  canUndoKeep,
  missReasonLabel,
} from "@/lib/pact/reflection";

/**
 * How a week ends, and what the member says about it.
 *
 * There used to be one button and one silence. You pressed "I kept it", or
 * you said nothing and a cron flipped the row to scarred days later without
 * ever asking. Three things follow from that, and this component is all
 * three:
 *
 * 1. A miss you can OWN. The scar is identical either way, on purpose: the
 *    moment honesty is cheaper than silence the honest answer becomes the
 *    strategic one and the record stops being true. What owning it buys is
 *    that the record shows you faced it.
 * 2. An UNDO on the keep, while the week is still live. Keep is not
 *    destructive, so this is not a safety net; it is that a mis-tapped keep
 *    is a lie in the one artefact whose whole value is that it does not lie.
 * 3. A DIFFICULTY rating on the CHALLENGE, both ways. Never on the member:
 *    a self-score on your own performance turns a binary commitment into a
 *    feeling. Asked on misses too, because the weeks people miss are exactly
 *    the ones worth knowing the difficulty of.
 */

export interface OutcomeEntry {
  status: "open" | "kept" | "scarred";
  difficulty: number | null;
  claimed: boolean;
  missReason: string | null;
}

export default function WeekOutcome({
  entry,
  weekEndsAtIso,
  status,
  onStatusChange,
}: {
  entry: OutcomeEntry;
  weekEndsAtIso: string;
  status: "open" | "kept" | "scarred";
  onStatusChange: (next: "open" | "kept" | "scarred") => void;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<"keep" | "undo" | "miss" | "rate" | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [justKept, setJustKept] = useState(false);
  const [difficulty, setDifficulty] = useState<number | null>(entry.difficulty);
  const [claimed, setClaimed] = useState(entry.claimed);
  const [missReason, setMissReason] = useState<string | null>(entry.missReason);
  const [crisisCard, setCrisisCard] = useState<string | null>(null);

  // The miss composer, opened deliberately. Not a dialog: a confirmation
  // that pops over the week is easy to dismiss without reading, and this
  // one is asking for something.
  const [missOpen, setMissOpen] = useState(false);
  const [pickedReason, setPickedReason] = useState<string | null>(null);
  const [note, setNote] = useState("");

  const weekLive = canUndoKeep(new Date(weekEndsAtIso));
  const needsRating = status !== "open" && difficulty === null;

  async function keep() {
    if (busy) return;
    setBusy("keep");
    setError(null);
    try {
      const res = await fetch("/api/pact/keep", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error || "That did not go through.");
        return;
      }
      onStatusChange("kept");
      setJustKept(true);
      window.setTimeout(() => haptic("success"), 350);
      router.refresh();
    } catch {
      setError("Could not reach the server.");
    } finally {
      setBusy(null);
    }
  }

  async function undo() {
    if (busy) return;
    setBusy("undo");
    setError(null);
    try {
      const res = await fetch("/api/pact/keep", { method: "DELETE" });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error || "That did not go through.");
        return;
      }
      onStatusChange("open");
      setJustKept(false);
      setDifficulty(null);
      router.refresh();
    } catch {
      setError("Could not reach the server.");
    } finally {
      setBusy(null);
    }
  }

  async function rate(value: number) {
    setDifficulty(value);
    setBusy("rate");
    haptic("tick");
    try {
      // Ratings ride on whichever route owns the week's outcome. A failure
      // is swallowed on purpose: losing a rating must never look like
      // losing the keep it was attached to.
      await fetch(status === "kept" ? "/api/pact/keep" : "/api/pact/miss", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          status === "kept"
            ? { difficulty: value }
            : { difficulty: value, reason: missReason ?? "life" },
        ),
      });
      router.refresh();
    } catch {
      /* keep the local value; the week is already recorded */
    } finally {
      setBusy(null);
    }
  }

  async function submitMiss() {
    if (busy || !pickedReason) return;
    setBusy("miss");
    setError(null);
    try {
      const res = await fetch("/api/pact/miss", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reason: pickedReason,
          note: note.trim() || undefined,
          difficulty: difficulty ?? undefined,
        }),
      });
      const data = (await res.json()) as {
        error?: string;
        flagged?: boolean;
        card?: string;
      };
      if (!res.ok) {
        setError(data.error || "That did not go through.");
        return;
      }
      if (data.flagged && data.card) setCrisisCard(data.card);
      onStatusChange("scarred");
      setClaimed(true);
      setMissReason(pickedReason);
      setMissOpen(false);
      haptic("fail");
      router.refresh();
    } catch {
      setError("Could not reach the server.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="mt-4">
      {error && (
        <p role="alert" className="mb-3 text-app-caption text-red-300">
          {error}
        </p>
      )}

      {crisisCard && (
        <div className="mb-4 rounded-2xl border border-[var(--app-line)] bg-[var(--app-card-2)] p-4">
          <p className="whitespace-pre-line text-app-caption leading-relaxed text-[var(--app-text)]">
            {crisisCard}
          </p>
        </div>
      )}

      {/* KEPT */}
      {status === "kept" && (
        <>
          <div className="flex items-center gap-3">
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--app-gold-soft)] ${
                justKept ? "pact-mark-in" : ""
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 fill-none stroke-[var(--app-gold)] [stroke-width:2]"
                aria-hidden
              >
                <path
                  d="M5 12.5l4.5 4.5L19 7.5"
                  pathLength={1}
                  className={justKept ? "pact-draw" : undefined}
                  style={justKept ? { animationDelay: "150ms" } : undefined}
                />
              </svg>
            </span>
            <p
              className={`text-[13px] uppercase tracking-[0.16em] text-[var(--app-gold)] ${
                justKept ? "app-rise" : ""
              }`}
              style={justKept ? { animationDelay: "350ms" } : undefined}
            >
              Kept. It is on the record.
            </p>
          </div>
          {weekLive && (
            <button
              type="button"
              onClick={undo}
              disabled={busy !== null}
              className="mt-3 text-app-tiny uppercase tracking-app-label text-[var(--app-dim)] underline underline-offset-4 disabled:opacity-50"
            >
              {busy === "undo" ? "Taking it back" : "That was a mistake"}
            </button>
          )}
        </>
      )}

      {/* SCARRED */}
      {status === "scarred" && (
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--pact-blood-dried)]">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 fill-none stroke-[var(--pact-blood)] [stroke-width:2]"
              aria-hidden
            >
              <path
                d="M6 6l12 12M18 6L6 18"
                pathLength={1}
                className="pact-draw"
                style={{ animationDelay: "200ms", animationDuration: "0.8s" }}
              />
            </svg>
          </span>
          <div className="min-w-0">
            <p className="text-[13px] uppercase tracking-[0.16em] text-[var(--pact-blood)]">
              This week scarred.
            </p>
            {/* The claimed scar reads differently from the one that just
                happened to them. Same mark, and the words are the only
                place the difference shows. */}
            {claimed ? (
              <p className="mt-1 text-app-caption leading-relaxed text-[var(--app-muted)]">
                You said so yourself
                {missReasonLabel(missReason)
                  ? `: ${missReasonLabel(missReason)!.toLowerCase()}.`
                  : "."}{" "}
                That counts for more than the mark does.
              </p>
            ) : (
              <p className="mt-1 text-app-caption leading-relaxed text-[var(--app-muted)]">
                The week ended without a mark.
              </p>
            )}
          </div>
        </div>
      )}

      {/* OPEN: keep, or own the miss */}
      {status === "open" && !missOpen && (
        <>
          <button
            type="button"
            onClick={keep}
            disabled={busy !== null}
            className="w-full rounded-full bg-[var(--pact-blood)] px-5 py-3 text-[12.5px] uppercase tracking-[0.16em] text-[var(--app-text)] transition-transform active:scale-[0.97] disabled:opacity-50"
          >
            {busy === "keep" ? "One moment" : "I kept it"}
          </button>
          <button
            type="button"
            onClick={() => setMissOpen(true)}
            disabled={busy !== null}
            className="mt-3 w-full text-app-caption text-[var(--app-dim)] underline underline-offset-4 disabled:opacity-50"
          >
            No. I didn&apos;t keep it.
          </button>
        </>
      )}

      {/* THE MISS COMPOSER */}
      {status === "open" && missOpen && (
        <div className="rounded-2xl border border-[var(--pact-blood-dried)] bg-[var(--app-card-2)] p-4">
          <p className="text-[13px] uppercase tracking-[0.16em] text-[var(--pact-blood)]">
            The week scars either way
          </p>
          {/* Said plainly and first. If owning it looked like it bought a
              lighter mark, the honest answer would become a tactic. */}
          <p className="mt-1.5 text-app-caption leading-relaxed text-[var(--app-muted)]">
            Saying it out loud does not soften the mark, and it is not meant
            to. It puts on the record that you faced it, and it tells Kanika
            what actually stops people.
          </p>

          <p className="mt-4 text-app-eyebrow uppercase tracking-app-label text-[var(--app-dim)]">
            What happened
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {PACT_MISS_REASONS.map((r) => {
              const on = pickedReason === r.key;
              return (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => {
                    setPickedReason(r.key);
                    haptic("select");
                  }}
                  title={r.hint}
                  className={`rounded-full border px-3.5 py-2 text-app-caption transition-colors ${
                    on
                      ? "border-[var(--pact-blood)] bg-[var(--pact-blood)]/20 text-[var(--app-text)]"
                      : "border-[var(--app-line)] text-[var(--app-muted)]"
                  }`}
                >
                  {r.label}
                </button>
              );
            })}
          </div>
          {pickedReason && (
            <p className="mt-2 text-app-tiny leading-relaxed text-[var(--app-dim)]">
              {PACT_MISS_REASONS.find((r) => r.key === pickedReason)?.hint}
            </p>
          )}

          <label
            htmlFor="pact-miss-note"
            className="mt-4 block text-app-eyebrow uppercase tracking-app-label text-[var(--app-dim)]"
          >
            What was hard about it (optional)
          </label>
          <textarea
            id="pact-miss-note"
            value={note}
            onChange={(e) => setNote(e.target.value.slice(0, MISS_NOTE_MAX))}
            rows={3}
            placeholder="Only if you want to. Nobody else sees this."
            className="mt-2 w-full resize-none rounded-xl border border-[var(--app-line)] bg-[var(--app-card)] p-3 text-app-body leading-relaxed text-[var(--app-text)] placeholder:text-[var(--app-dim)] focus:outline-none"
          />

          <DifficultyScale
            value={difficulty}
            onPick={(v) => {
              setDifficulty(v);
              haptic("tick");
            }}
            label="How hard was the challenge itself?"
          />

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={submitMiss}
              disabled={busy !== null || !pickedReason}
              className="rounded-full bg-[var(--pact-blood)] px-5 py-2.5 text-app-tiny uppercase tracking-app-label text-[var(--app-text)] disabled:opacity-40"
            >
              {busy === "miss" ? "Marking it" : "Mark the week"}
            </button>
            <button
              type="button"
              onClick={() => setMissOpen(false)}
              disabled={busy !== null}
              className="rounded-full border border-[var(--app-line)] px-5 py-2.5 text-app-tiny uppercase tracking-app-label text-[var(--app-muted)]"
            >
              Not yet
            </button>
          </div>
          {!pickedReason && (
            <p className="mt-2 text-app-tiny text-[var(--app-dim)]">
              Pick what happened first.
            </p>
          )}
        </div>
      )}

      {/* THE RATING, once the week has an outcome */}
      {needsRating && (
        <DifficultyScale
          value={difficulty}
          onPick={rate}
          label="How hard was the challenge itself?"
        />
      )}
      {status !== "open" && difficulty !== null && (
        <p className="mt-4 text-app-tiny uppercase tracking-app-wide text-[var(--app-dim)]">
          You rated this week {difficulty}/{MAX_DIFFICULTY}
        </p>
      )}
    </div>
  );
}

/**
 * The scale. Ten taps, three labels.
 *
 * Only the ends and the middle are named: labelling all ten invites people
 * to calibrate against our wording instead of their week, and the number is
 * only useful if it means what they meant.
 */
function DifficultyScale({
  value,
  onPick,
  label,
}: {
  value: number | null;
  onPick: (v: number) => void;
  label: string;
}) {
  return (
    <div className="mt-4">
      <p className="text-app-eyebrow uppercase tracking-app-label text-[var(--app-dim)]">
        {label}
      </p>
      <p className="mt-1 text-app-tiny leading-relaxed text-[var(--app-dim)]">
        The week, not you. It tells Kanika which challenges land and which
        are pitched wrong.
      </p>
      <div
        role="radiogroup"
        aria-label={label}
        className="mt-2.5 flex flex-wrap gap-1.5"
      >
        {Array.from(
          { length: MAX_DIFFICULTY - MIN_DIFFICULTY + 1 },
          (_, i) => i + MIN_DIFFICULTY,
        ).map((n) => {
          const on = value === n;
          return (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={on}
              aria-label={
                DIFFICULTY_ANCHORS[n] ? `${n}, ${DIFFICULTY_ANCHORS[n]}` : `${n}`
              }
              onClick={() => onPick(n)}
              className={`h-9 w-9 rounded-lg border text-app-caption tabular-nums transition-colors ${
                on
                  ? "border-[var(--app-gold-soft)] bg-[var(--app-gold)]/20 text-[var(--app-gold)]"
                  : "border-[var(--app-line)] text-[var(--app-muted)]"
              }`}
            >
              {n}
            </button>
          );
        })}
      </div>
      <div className="mt-1.5 flex justify-between text-app-tiny text-[var(--app-dim)]">
        <span>{DIFFICULTY_ANCHORS[MIN_DIFFICULTY]}</span>
        <span>{DIFFICULTY_ANCHORS[MAX_DIFFICULTY]}</span>
      </div>
    </div>
  );
}
