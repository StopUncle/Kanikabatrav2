"use client";

import { LazyMotion, domAnimation } from "framer-motion";

// LazyMotion + m.* components = ~19 KB instead of the full motion.* at ~34
// KB (saves ~15 KB gzipped from every Framer-Motion-using route). `domAnimation`
// covers animations, variants, exit, and tap/hover/focus gestures, everything
// this site actually uses. If we ever need drag or layoutId, switch to
// `domMax` (+10 KB). Keeping `strict` off so any remaining `motion.*`
// usages outside the migration still render (just without the savings).
// See: https://motion.dev/docs/react-lazy-motion
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
