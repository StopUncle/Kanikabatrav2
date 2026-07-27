"use client";

/**
 * One Tell, headless: restore any prior answer, submit a pick, hold the
 * reveal.
 *
 * The answer key is deliberately not in the page. `redactTell` strips
 * `reveal`, `isCorrect` and `why` before a Tell reaches the client, and they
 * only arrive in the response to a recorded answer. Nothing here may weaken
 * that: the reveal is server-sent or absent.
 *
 * The anonymous localStorage streak in lib/tells/streak.ts is not used. The
 * app shell is always authenticated, so the server TellStreak row is the only
 * truthful source.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import type { PublicTell, TellChoice } from "./types";
import { fetchWithRefresh } from "@/lib/auth/fetch-with-refresh";

export type TellRunPhase = "restoring" | "asking" | "revealed";

export interface TellRevealPayload {
  choices: TellChoice[];
  reveal: string;
}

export interface TellRunOutcome {
  correct: boolean;
  countedStreak: boolean;
  isReplay: boolean;
  streak: {
    currentDays: number;
    longestDays: number;
    freezesAvail: number;
    freezeUsed: boolean;
  } | null;
  standing: {
    amount: number;
    newStanding: number;
    rangUp: { fromLevel: number; toLevel: number; ringName: string } | null;
  } | null;
}

export interface TellRunState {
  phase: TellRunPhase;
  /** The choice this member picked, once they have picked one. */
  pickedId: string | null;
  reveal: TellRevealPayload | null;
  outcome: TellRunOutcome | null;
  submitting: boolean;
  error: string | null;
  pick: (choiceId: string) => void;
}

export function useTellRun(tell: PublicTell): TellRunState {
  const [phase, setPhase] = useState<TellRunPhase>("restoring");
  const [pickedId, setPickedId] = useState<string | null>(null);
  const [reveal, setReveal] = useState<TellRevealPayload | null>(null);
  const [outcome, setOutcome] = useState<TellRunOutcome | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startedAt = useRef<number>(Date.now());
  /** Latched so a double tap cannot post the same Tell twice. */
  const postedRef = useRef(false);

  // Restore a prior answer, so reopening the Tell shows the reveal rather
  // than inviting an answer that the server will reject as a replay.
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const res = await fetch(`/api/tells/${tell.id}/my-response`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("restore failed");
        const body = await res.json();
        if (cancelled) return;
        if (body?.response && body?.reveal) {
          postedRef.current = true;
          setPickedId(body.response.choiceId ?? null);
          setReveal(body.reveal);
          setOutcome({
            correct: Boolean(body.response.isCorrect),
            countedStreak: Boolean(body.response.countedStreak),
            isReplay: true,
            streak: null,
            standing: null,
          });
          setPhase("revealed");
        } else {
          startedAt.current = Date.now();
          setPhase("asking");
        }
      } catch {
        // A restore failure must not block play: worst case the server
        // rejects the answer as a replay, which the reveal handles.
        if (!cancelled) {
          startedAt.current = Date.now();
          setPhase("asking");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [tell.id]);

  const pick = useCallback(
    (choiceId: string) => {
      if (postedRef.current || submitting || phase !== "asking") return;
      postedRef.current = true;
      setSubmitting(true);
      setPickedId(choiceId);
      setError(null);

      void (async () => {
        try {
          const res = await fetchWithRefresh(`/api/tells/${tell.id}/answer`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              choiceId,
              answerMs: Date.now() - startedAt.current,
            }),
          });
          if (!res.ok) throw new Error(`answer failed: ${res.status}`);
          const body = await res.json();
          setReveal(body.reveal ?? null);
          setOutcome({
            correct: Boolean(body.correct),
            countedStreak: Boolean(body.countedStreak),
            isReplay: Boolean(body.isReplay),
            streak: body.streak ?? null,
            standing: body.standing ?? null,
          });
          setPhase("revealed");
        } catch {
          // Let them try again rather than stranding them on a dead screen.
          postedRef.current = false;
          setPickedId(null);
          setError("That did not send. Try again.");
        } finally {
          setSubmitting(false);
        }
      })();
    },
    [tell.id, submitting, phase],
  );

  return { phase, pickedId, reveal, outcome, submitting, error, pick };
}
