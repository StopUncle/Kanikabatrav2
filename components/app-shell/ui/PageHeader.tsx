import type { ReactNode } from "react";
import { cn } from "./cn";

/**
 * The title block at the top of a surface.
 *
 * Twelve pages hand-rolled the same h1 and lede before this existed, and they
 * had already begun to drift (two lede margins, two leadings). The display
 * font stays an inline style: the font variable is set per shell, not in the
 * Tailwind config, and one inline style inside one primitive beats twelve.
 */

export interface PageHeaderProps {
  title: string;
  lede?: string;
  action?: ReactNode;
  className?: string;
}

export default function PageHeader({
  title,
  lede,
  action,
  className = "",
}: PageHeaderProps) {
  const heading = (
    <h1
      className="text-app-hero font-light text-[var(--app-text)]"
      style={{ fontFamily: "var(--font-display)" }}
    >
      {title}
    </h1>
  );
  return (
    <div className={cn(className)}>
      {action ? (
        <div className="flex items-baseline justify-between gap-3">
          {heading}
          {action}
        </div>
      ) : (
        heading
      )}
      {lede && (
        <p className="mb-5 mt-1 text-app-body text-[var(--app-muted)]">{lede}</p>
      )}
    </div>
  );
}
