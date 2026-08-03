"use client";

import TierOne from "./TierOne";
import TierTwo from "./TierTwo";
import Presence from "./Presence";
import TellField from "./TellField";
import Cinematics from "./Cinematics";
import { Aside, Head, Label } from "./TierOne";

/**
 * Three tiers of motion on one URL, cheapest first.
 *
 * The point of the ordering is that the tiers are not a quality ladder,
 * they are a cost ladder. Tier one is free and most of the app should live
 * there. Tier three is expensive and earns its place two or three times in
 * a whole product, at the moments worth remembering.
 *
 * Never reachable in production.
 */

export default function MotionLab() {
  return (
    <div className="px-5 pb-16 pt-6">
      <p className="text-app-eyebrow uppercase tracking-app-label text-[var(--app-dim)]">
        Dev harness
      </p>
      <h1
        className="mt-1 text-app-hero font-light"
        style={{ fontFamily: "var(--font-display)" }}
      >
        The motion lab
      </h1>
      <p className="mt-2 text-app-body leading-relaxed text-[var(--app-muted)]">
        Everything here is drawn in code. No image, no video, no Lottie file,
        no network request. Tap the things that look tappable.
      </p>

      <Rule />
      <TierOne />

      <Rule />
      <TierTwo />

      <Rule />
      <section>
        <Head
          tier="Tier three"
          title="The ceiling, here"
          note="Hand-written WebGL2. Two shaders, one triangle each. This is as far as the current stack goes without adding a dependency or a pipeline."
        />

        <Label>A character that is not an asset</Label>
        <Presence />
        <Aside>
          The shape is signed distance fields, the light is computed from the
          surface normal, and the state change is one uniform. It weighs
          nothing and it can never be the wrong resolution.
        </Aside>

        <Label>The beat the scenario types already ask for</Label>
        <TellField />
        <Aside>
          `ImmersionTrigger` in `lib/simulator/types.ts` already lists
          &ldquo;manipulation-detected&rdquo;. This is what that value could
          resolve to.
        </Aside>
      </section>

      <Rule />
      <Cinematics />

      <Rule />
      <section>
        <p className="text-app-eyebrow uppercase tracking-app-label text-[var(--app-gold)]">
          Above the ceiling
        </p>
        <h2
          className="mt-1 text-app-title font-light"
          style={{ fontFamily: "var(--font-display)" }}
        >
          What I cannot do from here
        </h2>
        <ul className="mt-3 flex flex-col gap-2.5">
          {[
            "A face. SDFs give you form and light, never features. Eyes that track and a mouth that moves need either drawn artwork or a rig.",
            "A character who looks like the same person twice. Tested against a generator and it failed: the same face asked for a new expression came back as a different woman. An asset pipeline problem, not a rendering one.",
            "Hand-keyed performance. A designer's timing on a walk cycle or a glance beats anything derived from a sine wave, and cannot be written as one.",
            "Real 3D. Lighting, depth, and camera moves need a scene graph, which means a real library rather than a single fragment shader.",
          ].map((line) => (
            <li
              key={line}
              className="rounded-2xl border border-[var(--app-line)] bg-[var(--app-card)] px-4 py-3.5 text-app-caption leading-relaxed text-[var(--app-muted)]"
            >
              {line}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-app-caption leading-relaxed text-[var(--app-dim)]">
          The list of what would lift each of those sits in CLAUDE.md under
          &ldquo;Motion and character&rdquo;.
        </p>
      </section>
    </div>
  );
}

function Rule() {
  return <hr className="my-10 border-0 border-t border-[var(--app-line)]" />;
}
