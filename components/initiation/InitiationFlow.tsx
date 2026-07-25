"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import type { Scenario, SimulatorState } from "@/lib/simulator/types";
import { SITUATIONS, type SituationKey } from "@/lib/checkin/situations";
import SimulatorPageClient from "@/components/simulator/SimulatorPageClient";
import InitiationReading from "./InitiationReading";
import RingEmblem from "@/components/rings/RingEmblem";

/**
 * The Initiation: the mandatory Day-0 flow (plan §4). One route, five
 * steps: The Door, The Reading, The Situation, The First Scenario,
 * The Placement. Veterans at the Rings launch get the short variant:
 * rebuilt-notice door, reading only if they never took the quiz,
 * situation, then straight to placement with their retro-granted ring.
 *
 * Step logic lives here; the server page only computes entry facts
 * (profile gaps, quiz history, veteran status) and resolves the
 * first scenario. Speaks as Kanika or neutrally, never as a "council".
 */

type Step = "door" | "reading" | "situation" | "scenario" | "placement";

type Placement = {
  standing: number;
  ringLevel: number;
  ringName: string;
  ringEpithet: string;
  nextRingName: string | null;
  standingToNext: number | null;
};

type Props = {
  needsDisplayName: boolean;
  needsGender: boolean;
  hasQuizResult: boolean;
  /** Existing member at the Rings launch: skip The First Scenario. */
  veteran: boolean;
  gender: "MALE" | "FEMALE" | null;
  /** The first scenario (mission-1-1). Null for veterans. */
  scenario: Scenario | null;
  scenarioInitialState?: SimulatorState;
  /**
   * Arrived via the gift-claim flow. The Door carries the
   * set-your-password notice the feed banner used to show, since the
   * initiation gate now intercepts that landing.
   */
  justClaimed?: boolean;
};

export default function InitiationFlow({
  needsDisplayName,
  needsGender,
  hasQuizResult,
  veteran,
  gender,
  scenario,
  scenarioInitialState,
  justClaimed = false,
}: Props) {
  const [step, setStep] = useState<Step>("door");

  // The Initiation is a sealed moment: the public site footer (newsletter
  // box, sitemap) must not render under it. Same body-flag mechanism the
  // simulator uses, minus its scroll lock (the Reading can scroll).
  useEffect(() => {
    document.body.dataset.initiationActive = "true";
    return () => {
      delete document.body.dataset.initiationActive;
    };
  }, []);

  const afterDoor = useCallback(() => {
    setStep(hasQuizResult ? "situation" : "reading");
  }, [hasQuizResult]);

  const afterSituation = useCallback(
    (skip: boolean) => {
      setStep(veteran || skip || !scenario ? "placement" : "scenario");
    },
    [veteran, scenario],
  );

  if (step === "scenario" && scenario) {
    return (
      <SimulatorPageClient
        scenario={scenario}
        initialState={scenarioInitialState}
        nextScenarioHref={null}
        exitHref="/consilium/initiation"
        endingCta={
          <button
            type="button"
            onClick={() => setStep("placement")}
            className="w-full inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-warm-gold text-deep-black font-medium hover:bg-warm-gold/90 transition-colors"
          >
            Take your placement <ArrowRight size={16} />
          </button>
        }
      />
    );
  }

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-6 py-12">
      <StepDots step={step} veteran={veteran} hasQuizResult={hasQuizResult} />
      <AnimatePresence mode="wait">
        <m.div
          key={step}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35 }}
          className="w-full flex justify-center"
        >
          {step === "door" && (
            <DoorStep
              veteran={veteran}
              needsDisplayName={needsDisplayName}
              needsGender={needsGender}
              justClaimed={justClaimed}
              onDone={afterDoor}
            />
          )}
          {step === "reading" && (
            <InitiationReading onDone={() => setStep("situation")} />
          )}
          {step === "situation" && (
            <SituationStep
              gender={gender}
              veteran={veteran}
              onDone={afterSituation}
            />
          )}
          {step === "placement" && <PlacementStep />}
        </m.div>
      </AnimatePresence>
    </div>
  );
}

/** Progress dots. The scenario step renders full-screen without them. */
function StepDots({
  step,
  veteran,
  hasQuizResult,
}: {
  step: Step;
  veteran: boolean;
  hasQuizResult: boolean;
}) {
  const steps: Step[] = ["door"];
  if (!hasQuizResult) steps.push("reading");
  steps.push("situation");
  if (!veteran) steps.push("scenario");
  steps.push("placement");
  return (
    <div className="flex items-center gap-2 mb-10">
      {steps.map((s) => (
        <span
          key={s}
          className={`h-1.5 w-1.5 rounded-full transition-colors ${
            s === step ? "bg-warm-gold" : "bg-white/15"
          }`}
        />
      ))}
    </div>
  );
}

function DoorStep({
  veteran,
  needsDisplayName,
  needsGender,
  justClaimed,
  onDone,
}: {
  veteran: boolean;
  needsDisplayName: boolean;
  needsGender: boolean;
  justClaimed: boolean;
  onDone: () => void;
}) {
  const needsProfile = needsDisplayName || needsGender;
  const [displayName, setDisplayName] = useState("");
  const [gender, setGender] = useState<"MALE" | "FEMALE" | "">("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const begin = async () => {
    setError(null);
    if (needsDisplayName && displayName.trim().length < 2) {
      setError("Pick a display name (2-30 characters).");
      return;
    }
    if (needsGender && !gender) {
      setError("Pick one. It decides which content you see.");
      return;
    }
    if (!needsProfile) {
      onDone();
      return;
    }
    setBusy(true);
    try {
      const body: Record<string, string> = {};
      if (needsDisplayName) body.displayName = displayName.trim();
      if (needsGender && gender) body.gender = gender;
      const res = await fetch("/api/user/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setError(j.error || "Couldn't save. Try again.");
        return;
      }
      onDone();
    } catch {
      setError("Network error. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="w-full max-w-md text-center">
      <RingEmblem level={7} size={110} className="mx-auto mb-8" />
      <p className="text-warm-gold text-[10px] uppercase tracking-[0.35em] mb-3">
        {veteran ? "The Consilium has been rebuilt" : "You're in"}
      </p>
      <h1 className="text-2xl sm:text-3xl font-extralight tracking-wider uppercase text-text-light mb-4">
        {veteran ? "The Rings" : "The Initiation"}
      </h1>
      <p className="text-text-gray text-sm leading-relaxed mb-8 max-w-sm mx-auto">
        {veteran
          ? "One rank now runs through everything: the Rings, counted inward. Your history already placed you. Two quick questions, then see where you stand."
          : "Before we start, I need to know how you read. A few minutes, then your first scenario. Everything in here is earned, starting now."}
      </p>

      {justClaimed && (
        <div className="mb-6 rounded-lg border border-warm-gold/30 bg-warm-gold/[0.05] px-4 py-3 text-left">
          <p className="text-warm-gold text-[10px] uppercase tracking-[0.25em] mb-1">
            Your gift is claimed
          </p>
          <p className="text-text-gray text-xs leading-relaxed">
            30 days start now. Check your email for a set-your-password
            link so you can log back in from any device later.
          </p>
        </div>
      )}

      {needsDisplayName && (
        <div className="mb-5 text-left">
          <label className="block text-text-gray text-[10px] uppercase tracking-[0.2em] mb-2">
            Display name
          </label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="What other members will call you"
            maxLength={30}
            className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-text-light text-sm font-light focus:border-warm-gold/40 focus:outline-none transition-colors"
          />
          <p className="text-text-gray/50 text-[10px] mt-1.5">
            Your real name is never shown to other members.
          </p>
        </div>
      )}

      {needsGender && (
        <div className="mb-5 text-left">
          <label className="block text-text-gray text-[10px] uppercase tracking-[0.2em] mb-2">
            I am
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {(["FEMALE", "MALE"] as const).map((g) => {
              const active = gender === g;
              return (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGender(g)}
                  className={`px-4 py-3 rounded-lg border text-sm font-light tracking-[0.1em] uppercase transition-all ${
                    active
                      ? "border-warm-gold bg-warm-gold/10 text-warm-gold"
                      : "border-white/10 bg-white/[0.02] text-text-gray hover:border-warm-gold/30"
                  }`}
                >
                  {g === "FEMALE" ? "Woman" : "Man"}
                </button>
              );
            })}
          </div>
          <p className="text-text-gray/50 text-[10px] mt-1.5">
            Decides the content track. Changing it later needs help.
          </p>
        </div>
      )}

      {error && <p className="text-red-400 text-xs mb-3">{error}</p>}

      <button
        type="button"
        onClick={begin}
        disabled={busy}
        className="w-full inline-flex items-center justify-center gap-2 py-3 bg-warm-gold text-deep-black rounded-full font-medium hover:bg-warm-gold/90 transition-all disabled:opacity-60"
      >
        {busy ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <>
            Begin <ArrowRight size={16} />
          </>
        )}
      </button>
    </div>
  );
}

function SituationStep({
  gender,
  veteran,
  onDone,
}: {
  gender: "MALE" | "FEMALE" | null;
  veteran: boolean;
  onDone: (skip: boolean) => void;
}) {
  const [picked, setPicked] = useState<SituationKey | null>(null);
  const [saving, setSaving] = useState(false);

  const situation = picked
    ? SITUATIONS.find((s) => s.key === picked) ?? null
    : null;

  const pick = async (key: SituationKey) => {
    setPicked(key);
    setSaving(true);
    try {
      await fetch("/api/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ situation: key }),
      });
    } catch {
      // Non-fatal: the recommendation still shows; the check-in row
      // just won't exist until their next daily check-in.
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full max-w-md text-center">
      <p className="text-warm-gold text-[10px] uppercase tracking-[0.35em] mb-3">
        The Situation
      </p>
      <h2 className="text-xl sm:text-2xl font-extralight tracking-wider uppercase text-text-light mb-6">
        What brought you here?
      </h2>

      {!situation ? (
        <div className="space-y-2.5 text-left">
          {SITUATIONS.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => pick(s.key)}
              className="w-full text-left px-4 py-3 rounded-lg border border-white/10 bg-white/[0.02] text-text-gray text-sm font-light hover:border-warm-gold/30 hover:text-text-light transition-all"
            >
              {s.label}
            </button>
          ))}
        </div>
      ) : (
        <div>
          <p className="text-text-light text-sm font-light mb-2">
            {situation.label}
          </p>
          <p className="text-text-gray text-sm leading-relaxed mb-8 max-w-sm mx-auto">
            {situation.reasonFor(gender)}
          </p>
          <button
            type="button"
            onClick={() => onDone(false)}
            disabled={saving}
            className="w-full inline-flex items-center justify-center gap-2 py-3 bg-warm-gold text-deep-black rounded-full font-medium hover:bg-warm-gold/90 transition-all disabled:opacity-60"
          >
            {veteran ? "See your placement" : "Begin your first scenario"}{" "}
            <ArrowRight size={16} />
          </button>
          {!veteran && (
            <button
              type="button"
              onClick={() => onDone(true)}
              className="mt-4 text-text-gray/50 hover:text-text-gray text-xs tracking-wide transition-colors"
            >
              Skip for now
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function PlacementStep() {
  const router = useRouter();
  const [placement, setPlacement] = useState<Placement | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/initiation/complete", { method: "POST" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: Placement) => {
        if (!cancelled) setPlacement(data);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (failed) {
    return (
      <div className="text-center">
        <p className="text-text-gray text-sm mb-6">
          Couldn&apos;t load your placement. Your progress is safe.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="px-8 py-3 rounded-full border border-warm-gold/40 text-warm-gold uppercase tracking-[0.3em] text-xs hover:bg-warm-gold/10 transition-colors"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!placement) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-6 h-6 text-warm-gold/60 animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-md text-center">
      <m.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <RingEmblem
          level={placement.ringLevel}
          size={190}
          className="mx-auto"
        />
      </m.div>
      <m.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-8 text-text-gray uppercase tracking-[0.4em] text-[10px]"
      >
        Your placement
      </m.p>
      <m.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.0 }}
        className="mt-3 text-3xl font-extralight uppercase tracking-[0.25em] text-warm-gold"
        style={{ textShadow: "0 0 24px rgba(212,175,55,0.35)" }}
      >
        {placement.ringName}
      </m.h2>
      <m.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.3 }}
        className="mt-2 text-text-gray italic text-sm"
      >
        {placement.ringEpithet}
      </m.p>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.8 }}
        className="mt-8 flex flex-col items-center gap-6"
      >
        {placement.nextRingName && placement.standingToNext !== null && (
          <p className="text-text-gray text-xs">
            {placement.standing.toLocaleString()} Standing.{" "}
            {placement.standingToNext.toLocaleString()} to{" "}
            {placement.nextRingName}.
          </p>
        )}
        <span className="block h-px w-12 bg-warm-gold/40" />
        <p className="text-text-gray text-sm">
          Every ring inward is earned. Day one starts now.
        </p>
        <button
          type="button"
          onClick={() => {
            router.push("/consilium/chamber");
            router.refresh();
          }}
          className="px-8 py-3 rounded-full bg-warm-gold text-deep-black font-medium hover:bg-warm-gold/90 transition-colors"
        >
          Enter the Consilium
        </button>
      </m.div>
    </div>
  );
}
