"use client";

import { useState } from "react";
import { X, Scroll, AudioLines, Library, Users, ArrowRight } from "lucide-react";
import ConsiliumSeal from "@/components/ConsiliumSeal";

/**
 * First-visit welcome modal for new Consilium members.
 *
 * Shown on /consilium/feed when the server-side page detects that the
 * current user has no onboardingSeenAt timestamp. Clicking "Got it" PATCHes
 * /api/user/onboarding to set the timestamp, which prevents the modal from
 * ever reappearing.
 *
 * Keeping this client-side only (not a server component) so the dismiss
 * action can optimistically hide the modal and persist to the DB in
 * parallel — users don't have to wait for a round-trip to click through.
 */
export default function OnboardingModal() {
  const [visible, setVisible] = useState(true);
  const [dismissing, setDismissing] = useState(false);

  const dismiss = async () => {
    setDismissing(true);
    setVisible(false);
    // Fire-and-forget. If it fails, worst case the modal reappears on
    // next visit — not catastrophic.
    try {
      await fetch("/api/user/onboarding", { method: "POST" });
    } catch {
      // Ignore — modal is already hidden locally
    }
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deep-black/80 backdrop-blur-sm"
      onClick={dismiss}
    >
      <div
        className="relative max-w-md w-full bg-gradient-to-br from-deep-burgundy/20 to-deep-navy/40 backdrop-blur-md border border-accent-gold/30 rounded-2xl shadow-2xl p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 text-text-gray/50 hover:text-text-light transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <ConsiliumSeal size="lg" haloed />
          </div>
          <p className="text-accent-gold text-xs uppercase tracking-[0.25em] mb-2">Welcome In</p>
          <h2 className="text-2xl font-extralight tracking-wider uppercase gradient-text-gold mb-2">
            The Consilium
          </h2>
          <div className="w-12 h-px bg-accent-gold/40 mx-auto" />
        </div>

        <p className="text-text-gray text-sm leading-relaxed mb-6 text-center">
          You&apos;re in. Here&apos;s what this space offers &mdash; take a
          minute to explore each before diving in.
        </p>

        <ul className="space-y-3 mb-8">
          <OnboardingItem
            icon={Scroll}
            title="The Feed"
            body="Posts, discussions, and announcements from Kanika. Comment, react, and build a track record here."
          />
          <OnboardingItem
            icon={AudioLines}
            title="Voice Notes"
            body="Raw, unfiltered audio drops. Check the Voice Notes tab — new ones show up without notice."
          />
          <OnboardingItem
            icon={Library}
            title="The Classroom"
            body="Structured courses on dark psychology, pattern recognition, and career strategy. Start at the top and work down."
          />
          <OnboardingItem
            icon={Users}
            title="Council Guidelines"
            body="Every comment is reviewed. Trolls get removed. This is a safe space — keep it that way and you belong here."
          />
        </ul>

        <button
          onClick={dismiss}
          disabled={dismissing}
          className="w-full inline-flex items-center justify-center gap-2 py-3 bg-accent-gold text-deep-black rounded-full font-medium hover:bg-accent-gold/90 transition-all disabled:opacity-60"
        >
          Got it — let me in
          <ArrowRight size={16} />
        </button>
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
