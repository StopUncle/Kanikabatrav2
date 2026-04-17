"use client";

import { useEffect, useState } from "react";
import { m } from "framer-motion";
import type { Scene } from "@/lib/simulator/types";

/**
 * Screen-shake wrapper. Applies a brief shake animation whenever the
 * scene changes AND the new scene declares `shakeOnEntry`. Preset
 * intensities:
 *   - shock       sharp, brief, horizontal+vertical
 *   - threat      slower, low-amplitude, horizontal only (menacing)
 *   - revelation  one hard bounce (punctuation for a big reveal)
 */

type Preset = NonNullable<Scene["shakeOnEntry"]>;

const PRESETS: Record<
  Preset,
  {
    durationMs: number;
    keyframes: {
      x: number[];
      y: number[];
    };
  }
> = {
  shock: {
    durationMs: 400,
    keyframes: { x: [0, -8, 8, -6, 6, -3, 0], y: [0, 4, -4, 2, -2, 1, 0] },
  },
  threat: {
    durationMs: 700,
    keyframes: { x: [0, -3, 3, -2, 2, -1, 0], y: [0, 0, 0, 0, 0, 0, 0] },
  },
  revelation: {
    durationMs: 500,
    keyframes: { x: [0, 0, 0], y: [0, -10, 0] },
  },
};

export default function SceneShake({
  sceneId,
  shake,
  children,
}: {
  sceneId: string;
  shake?: Scene["shakeOnEntry"];
  children: React.ReactNode;
}) {
  const [version, setVersion] = useState(0);

  useEffect(() => {
    if (!shake) return;
    setVersion((v) => v + 1);
    // Auto-reset: Framer handles the tween; no cleanup needed.
  }, [sceneId, shake]);

  if (!shake) {
    return <div className="absolute inset-0">{children}</div>;
  }

  const preset = PRESETS[shake];

  return (
    <m.div
      key={version}
      animate={preset.keyframes}
      transition={{
        duration: preset.durationMs / 1000,
        ease: "easeOut",
      }}
      className="absolute inset-0"
    >
      {children}
    </m.div>
  );
}
