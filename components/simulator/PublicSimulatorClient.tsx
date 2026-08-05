"use client";

import type { Scenario } from "@/lib/simulator/types";
import SimulatorRunner from "./SimulatorRunner";
import SimulatorErrorBoundary from "./SimulatorErrorBoundary";
import TrySimulatorEnding from "@/components/try/TrySimulatorEnding";

type Props = {
  scenario: Scenario;
};

/**
 * Unauth wrapper for SimulatorRunner used by /try.
 *
 * No persistence callbacks, cold visitors don't have accounts, so we
 * deliberately drop every progress / completion API call. The engine is
 * authoritative client-side, so the whole scenario plays end-to-end with
 * zero network traffic.
 *
 * At the ending screen we swap the "Next Scenario" link for a conversion
 * CTA: the visitor just felt the loop click in; this is the highest-intent
 * moment to sell them on joining. The button sends them to the Consilium
 * apply flow with a subtle source tag so we can attribute conversions.
 *
 * The exit button (top-right X) is pointed back to the homepage instead
 * of /consilium/simulator, that path requires auth and would 404 / redirect
 * to login for a cold visitor.
 */
export default function PublicSimulatorClient({ scenario }: Props) {
  return (
    <SimulatorErrorBoundary scenarioId={scenario.id} exitHref="/">
      <SimulatorRunner
        scenario={scenario}
        exitHref="/"
        endingCta={<TrySimulatorEnding />}
        /* Hide the failure-blog "Understand what happened" CTA on the
           public demo. Cold visitors on the free demo should see exactly
           one thing on the loss screen, the conversion CTA. Pulling
           them into a blog tangent splits the moment of highest intent
           and drops conversion. */
        hideFailureBlog
      />
    </SimulatorErrorBoundary>
  );
}
