import type { ReactNode } from "react";
import { cn } from "./cn";

/**
 * The outer wrapper every surface repeats.
 *
 * Fifteen pages spelled `px-5 pb-8 pt-6` by hand before this existed. The
 * gutter is a decision, not a habit, so it lives here once. `pad="none"` is
 * for full-bleed screens (the runner, the drill) that own their own edges.
 */

export interface PageShellProps {
  children: ReactNode;
  pad?: "default" | "none";
  className?: string;
}

export default function PageShell({
  children,
  pad = "default",
  className = "",
}: PageShellProps) {
  return (
    <div className={cn(pad === "default" && "px-5 pb-8 pt-6", className)}>
      {children}
    </div>
  );
}
