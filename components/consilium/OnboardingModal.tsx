"use client";

import { useState } from "react";
import {
  X,
  Scroll,
  AudioLines,
  Library,
  Users,
  ArrowRight,
  Gamepad2,
  Loader2,
} from "lucide-react";
import ConsiliumSeal from "@/components/ConsiliumSeal";

/**
 * First-visit welcome modal for new Consilium members.
 *
 * Two phases:
 *   1. (Optional, only if needed) Capture gender + display name. The
 *      application form used to collect these; now that the gate is
 *      removed, we capture them here on first feed visit. Members who
 *      already have both filled in (legacy applicants, gift recipients
 *      who set them) skip phase 1 entirely.
 *   2. Welcome tour — the chambers and the house rules.
 *
 * The modal can't be dismissed in phase 1 — gender drives the content
 * filter and displayName is the only name other members ever see, so
 * neither can be blank. Once both are submitted, the same dismiss
 * action stamps onboardingSeenAt and the modal never reappears.
 */
interface OnboardingModalProps {
  needsDisplayName?: boolean;
  needsGender?: boolean;
}

export default function OnboardingModal({
  needsDisplayName = false,
  needsGender = false,
}: OnboardingModalProps) {
  const requiresProfileStep = needsDisplayName || needsGender;
  const [phase, setPhase] = useState<"profile" | "tour">(
    requiresProfileStep ? "profile" : "tour",
  );

  const [visible, setVisible] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [displayName, setDisplayName] = useState("");
  const [gender, setGender] = useState<"MALE" | "FEMALE" | "">("");

  // Submit profile fields and advance to the tour. Server stamps
  // onboardingSeenAt as a side effect; we'll re-call it on dismiss
  // anyway, which is idempotent.
  const submitProfile = async () => {
    setError(null);
    if (needsDisplayName && displayName.trim().length < 2) {
      setError("Pick a display name (2-30 characters).");
      return;
    }
    if (needsGender && !gender) {
      setError("Pick one — drives which content the feed shows you.");
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
        setBusy(false);
        return;
      }
      setPhase("tour");
    } catch {
      setError("Network error. Try again.");
    } finally {
      setBusy(false);
    }
  };

  const dismiss = async () => {
    setVisible(false);
    // Fire-and-forget. If the profile step ran, this is just a re-stamp;
    // if it didn't, this stamps onboardingSeenAt for the first time.
    try {
      await fetch("/api/user/onboarding", { method: "POST" });
    } catch {
      // Modal already closed locally — non-critical.
    }
  };

  if (!visible) return null;

  // Overlay click closes the modal ONLY in tour phase. In profile
  // phase the user has to fill the fields first — accidental click-out
  // would land them in the feed without a name or gender, which then
  // gates content + makes them anonymous to other members.
  const handleOverlayClick = () => {
    if (phase === "tour") dismiss();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deep-black/85 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div
        className="relative max-w-md w-full bg-gradient-to-br from-deep-burgundy/20 to-deep-navy/40 backdrop-blur-md border border-accent-gold/30 rounded-2xl shadow-2xl p-8 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {phase === "tour" && (
          <button
            onClick={dismiss}
            className="absolute top-4 right-4 text-text-gray/50 hover:text-text-light transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        )}

        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <ConsiliumSeal size="lg" haloed />
          </div>
          <p className="text-accent-gold text-xs uppercase tracking-[0.25em] mb-2">
            Welcome In
          </p>
          <h2 className="text-2xl font-extralight tracking-wider uppercase gradient-text-gold mb-2">
            The Consilium
          </h2>
          <div className="w-12 h-px bg-accent-gold/40 mx-auto" />
        </div>

        {phase === "profile" ? (
          <>
            <p className="text-text-gray text-sm leading-relaxed mb-6 text-center">
              Quick setup. Two things, then you&apos;re in.
            </p>

            {needsDisplayName && (
              <div className="mb-5">
                <label className="block text-text-gray text-[10px] uppercase tracking-[0.2em] mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="What other members will call you"
                  maxLength={30}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-text-light text-sm font-light focus:border-accent-gold/40 focus:outline-none transition-colors"
                />
                <p className="text-text-gray/50 text-[10px] mt-1.5">
                  Your real name is never shown to other members.
                </p>
              </div>
            )}

            {needsGender && (
              <div className="mb-5">
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
                            ? "border-accent-gold bg-accent-gold/10 text-accent-gold"
                            : "border-white/10 bg-white/[0.02] text-text-gray hover:border-accent-gold/30"
                        }`}
                      >
                        {g === "FEMALE" ? "Woman" : "Man"}
                      </button>
                    );
                  })}
                </div>
                <p className="text-text-gray/50 text-[10px] mt-1.5">
                  Personalises the content track. You can&apos;t change this later without help.
                </p>
              </div>
            )}

            {error && (
              <p className="text-red-400 text-xs mb-3 text-center">{error}</p>
            )}

            <button
              onClick={submitProfile}
              disabled={busy}
              className="w-full inline-flex items-center justify-center gap-2 py-3 bg-accent-gold text-deep-black rounded-full font-medium hover:bg-accent-gold/90 transition-all disabled:opacity-60"
            >
              {busy ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <>
                  Continue <ArrowRight size={16} />
                </>
              )}
            </button>
          </>
        ) : (
          <>
            <p className="text-text-gray text-sm leading-relaxed mb-6 text-center">
              You&apos;re in. Here&apos;s what this space offers — take a
              minute to explore each before diving in.
            </p>

            <ul className="space-y-3 mb-8">
              <OnboardingItem
                icon={Scroll}
                title="The Feed"
                body="Posts, discussions, and announcements from Kanika. The pinned post at the top has the house rules — read it."
              />
              <OnboardingItem
                icon={Gamepad2}
                title="The Dark Mirror Simulator"
                body="Interactive scenarios that teach manipulation + defense through play. Ten levels, twenty scenarios. Start at Level 1."
              />
              <OnboardingItem
                icon={AudioLines}
                title="Voice Notes"
                body="Raw audio from Kanika — nothing she posts publicly. New drops appear without notice."
              />
              <OnboardingItem
                icon={Library}
                title="The Classroom"
                body="Structured courses on dark psychology, pattern recognition, and career strategy. Work top-down."
              />
              <OnboardingItem
                icon={Users}
                title="House Rules"
                body="Every comment is reviewed. Every page is watermarked. Leaking content or attacking members = permanent ban."
              />
            </ul>

            <button
              onClick={dismiss}
              className="w-full inline-flex items-center justify-center gap-2 py-3 bg-accent-gold text-deep-black rounded-full font-medium hover:bg-accent-gold/90 transition-all"
            >
              Got it — let me in
              <ArrowRight size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function OnboardingItem({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Scroll;
  title: string;
  body: string;
}) {
  return (
    <li className="flex gap-3">
      <div className="w-8 h-8 rounded-full bg-accent-gold/10 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-accent-gold" />
      </div>
      <div>
        <p className="text-text-light text-sm font-medium">{title}</p>
        <p className="text-text-gray/70 text-xs leading-relaxed">{body}</p>
      </div>
    </li>
  );
}
