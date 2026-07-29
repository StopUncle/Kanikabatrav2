import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "./cn";

/**
 * A tappable row: a label, optionally a line under it, and whatever sits on
 * the right.
 *
 * Renders a link or a button depending on which handler it is given, and the
 * union type means it cannot be given both or neither. That distinction is
 * not pedantry: a link can be opened in a new tab, restores on back, and is
 * announced as a destination, and a button that navigates quietly loses all
 * three.
 *
 * The padding clears a 44px tap target, which the hand-rolled versions of
 * this row did only by accident.
 */

interface BaseProps {
  label: string;
  sublabel?: string;
  /** Right-hand slot. Defaults to a chevron for links, nothing otherwise. */
  right?: ReactNode;
  tone?: "default" | "raised";
  className?: string;
}

type PressableRowProps = BaseProps &
  (
    | { href: string; onClick?: never }
    | { onClick: () => void; href?: never }
  );

const Chevron = (
  <svg
    aria-hidden
    viewBox="0 0 24 24"
    className="h-3.5 w-3.5 shrink-0 fill-none stroke-current stroke-[1.5] text-[var(--app-dim)]"
  >
    <path d="M9 5l7 7-7 7" />
  </svg>
);

export default function PressableRow({
  label,
  sublabel,
  right,
  tone = "default",
  className = "",
  href,
  onClick,
}: PressableRowProps) {
  const shell = cn(
    "flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 text-left transition-colors hover:border-[var(--app-gold-soft)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--app-gold-soft)]",
    tone === "raised"
      ? "border-[var(--app-line)] bg-[var(--app-card-2)]"
      : "border-[var(--app-line-soft)] bg-[var(--app-card)]",
    className,
  );

  const body = (
    <>
      <span className="min-w-0">
        <span className="block truncate text-app-body text-[var(--app-text)]">
          {label}
        </span>
        {sublabel && (
          <span className="mt-0.5 block truncate text-app-caption text-[var(--app-dim)]">
            {sublabel}
          </span>
        )}
      </span>
      {right ?? (href ? Chevron : null)}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={shell}>
        {body}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={shell}>
      {body}
    </button>
  );
}
