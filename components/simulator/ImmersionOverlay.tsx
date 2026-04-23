"use client";

import { useEffect, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import type { Scene } from "@/lib/simulator/types";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

/**
 * Renders cinematic full-screen effects when a scene declares
 * `immersionTrigger`. The effect plays once on scene entry and fades
 * out. Pointer-events are disabled so gameplay isn't blocked.
 *
 * Trigger vocabulary (from Scene.immersionTrigger):
 *   - manipulation-detected  gold-rim pulse (the "I see what you're doing")
 *   - red-flag-revealed      red vignette pulse
 *   - cold-moment            brief desaturation + cool overlay
 *   - intimate-moment        warm gold vignette
 *   - shock                  white flash (high-impact reveal)
 *   - victory                gold radial burst
 *   - defeat                 dark vignette closing in
 */

type TriggerKey = NonNullable<Scene["immersionTrigger"]>;

type Effect = {
  durationMs: number;
  render: () => React.ReactNode;
};

const EFFECTS: Record<TriggerKey, Effect> = {
  "manipulation-detected": {
    durationMs: 1400,
    render: () => (
      <m.div
        key="manip"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.85, 0] }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow:
            "inset 0 0 120px 20px rgba(212,175,55,0.6), inset 0 0 200px 40px rgba(212,175,55,0.2)",
        }}
      />
    ),
  },
  "red-flag-revealed": {
    durationMs: 1600,
    render: () => (
      <m.div
        key="redflag"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.8, 0.3, 0] }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.4, times: [0, 0.25, 0.55, 1] }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(180,30,50,0.65) 95%)",
        }}
      />
    ),
  },
  "cold-moment": {
    durationMs: 2000,
    render: () => (
      <m.div
        key="cold"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.55, 0.2] }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none backdrop-saturate-50"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(100,140,190,0.15) 0%, rgba(20,30,50,0.35) 80%)",
        }}
      />
    ),
  },
  "intimate-moment": {
    durationMs: 1800,
    render: () => (
      <m.div
        key="intimate"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.55, 0.3] }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 55%, rgba(212,150,100,0.25) 0%, rgba(80,30,40,0.35) 80%)",
        }}
      />
    ),
  },
  shock: {
    durationMs: 650,
    render: () => (
      <m.div
        key="shock"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45, times: [0, 0.1, 1] }}
        className="absolute inset-0 pointer-events-none bg-white"
      />
    ),
  },
  victory: {
    durationMs: 1800,
    render: () => (
      <m.div
        key="victory"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: [0, 0.9, 0.3, 0], scale: [0.7, 1.4, 1.8] }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
      >
        <div
          className="w-96 h-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(212,175,55,0.65) 0%, rgba(212,175,55,0.15) 50%, transparent 80%)",
          }}
        />
      </m.div>
    ),
  },
  defeat: {
    durationMs: 2200,
    render: () => (
      <m.div
        key="defeat"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.75, 0.45] }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2.0, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 15%, rgba(0,0,0,0.85) 90%)",
        }}
      />
    ),
  },
};

/**
 * Plays the effect keyed to `trigger` once, then clears. Changing the
 * `sceneId` (re-entering the scene or playing a new one) restarts the
 * effect cleanly.
 */
export default function ImmersionOverlay({
  sceneId,
  trigger,
}: {
  sceneId: string;
  trigger?: Scene["immersionTrigger"];
}) {
  const [active, setActive] = useState<TriggerKey | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    // Vestibular/accessibility: the full-screen flashes (especially
    // `shock` white-flash and `victory` radial burst) are the worst
    // offenders for motion sensitivity. Suppress all overlays when
    // the user has prefers-reduced-motion set.
    if (reduceMotion) {
      setActive(null);
      return;
    }
    if (!trigger) {
      setActive(null);
      return;
    }
    setActive(trigger);
    const effect = EFFECTS[trigger];
    if (!effect) return;
    const timer = setTimeout(() => setActive(null), effect.durationMs);
    return () => clearTimeout(timer);
  }, [sceneId, trigger, reduceMotion]);

  return (
    <AnimatePresence>{active && EFFECTS[active]?.render()}</AnimatePresence>
  );
}
