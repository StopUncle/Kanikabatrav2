"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Gift } from "lucide-react";
import ConsiliumSeal from "@/components/ConsiliumSeal";
import {
  getAttributionForSubmit,
  type AttributionPayload,
} from "@/lib/attribution";

interface Props {
  token: string;
  name: string;
  email: string;
  /** Server action passed in from the parent server component so the
   *  "use server" boundary stays in page.tsx. */
  action: (formData: FormData) => Promise<void>;
}

/**
 * Client wrapper around the claim form. Reads the localStorage
 * attribution snapshot on mount and emits it as hidden inputs so the
 * server action can stamp the new User row with whichever ad / blog
 * post / email actually drove the gift claim.
 *
 * Without this layer, gift-claim accounts were created in /consilium/
 * claim/page.tsx with no UTM fields and showed up in admin/traffic as
 * (direct) regardless of the email / campaign that triggered them.
 */
export default function ClaimButton({ token, name, email, action }: Props) {
  // Hold the captured attribution in state so React re-renders the
  // hidden inputs once useEffect runs client-side. Empty object is fine
  // as the initial value — server action will treat it as no signal.
  const [attribution, setAttribution] = useState<AttributionPayload>({});

  useEffect(() => {
    setAttribution(getAttributionForSubmit());
  }, []);

  return (
    <div className="rounded-3xl border border-warm-gold/30 bg-gradient-to-br from-deep-black/80 via-deep-burgundy/10 to-deep-black/80 p-10 sm:p-12">
      <div className="flex justify-center mb-6">
        <ConsiliumSeal size="xl" haloed />
      </div>
      <p className="text-warm-gold/90 uppercase tracking-[0.3em] text-xs mb-3 flex items-center justify-center gap-2">
        <Gift size={12} />
        A gift from Kanika
      </p>
      <h1
        className="text-3xl sm:text-4xl font-extralight tracking-wider uppercase mb-4"
        style={{
          background:
            "linear-gradient(135deg, #f3d98a 0%, #d4af37 50%, #9c7a1f 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        30 Days Inside
      </h1>
      <p className="text-text-gray font-light leading-relaxed mb-2">{name},</p>
      <p className="text-text-gray font-light leading-relaxed mb-8">
        Your 30 days begin the moment you claim. No card required. No
        auto-charge when it ends. We&apos;ll email you a week before, then just
        lapse cleanly.
      </p>
      <form action={action}>
        <input type="hidden" name="token" value={token} />
        <AttributionHiddenInputs attribution={attribution} />
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-10 py-4 bg-warm-gold text-deep-black rounded-full font-medium tracking-wider uppercase hover:bg-warm-gold/90 transition-all"
        >
          Claim My Free Month
          <ArrowRight size={16} />
        </button>
      </form>
      <p className="text-text-gray/60 text-xs mt-6">
        Claim for <span className="text-text-gray">{email}</span>
      </p>
    </div>
  );
}

function AttributionHiddenInputs({
  attribution,
}: {
  attribution: AttributionPayload;
}) {
  // Encode the whole payload as a single JSON field — keeps the form
  // payload small (one entry instead of a dozen) and the server action
  // gets a single parse step.
  return (
    <input
      type="hidden"
      name="attribution"
      value={JSON.stringify(attribution)}
    />
  );
}
