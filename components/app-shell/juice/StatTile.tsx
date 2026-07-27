"use client";

import Link from "next/link";
import { useCountUp } from "@/lib/hooks/use-count-up";
import ProgressRing from "./ProgressRing";

/**
 * One number, counted up, with its label underneath. The unit the Arcade and
 * the progression page both build their tallies out of.
 *
 * Matches the existing three-up grid on the You page rather than inventing a
 * second card language.
 */

export interface StatTileProps {
  value: number;
  label: string;
  /** Rendered tight against the number, e.g. "%" or "/10". */
  suffix?: string;
  /** Default true. */
  countUp?: boolean;
  /** Stagger across a row. Applies to both the count and the ring. */
  delayMs?: number;
  tone?: "gold" | "rose" | "green" | "muted";
  /** A quieter second line, e.g. "best 14". */
  hint?: string;
  /** Wraps the number in a progress ring. `value` here is 0 to 1. */
  ring?: { value: number };
  /** Makes the whole tile tappable. */
  href?: string;
  decimals?: number;
}

const TONE: Record<NonNullable<StatTileProps["tone"]>, string> = {
  gold: "var(--app-gold)",
  rose: "var(--app-rose)",
  green: "var(--app-green)",
  muted: "var(--app-muted)",
};

export default function StatTile({
  value,
  label,
  suffix,
  countUp = true,
  delayMs = 0,
  tone = "gold",
  hint,
  ring,
  href,
  decimals = 0,
}: StatTileProps) {
  const shown = useCountUp(value, { enabled: countUp, delayMs, decimals });
  const color = TONE[tone];

  const number = (
    <p
      className="text-[24px] font-light tabular-nums"
      style={{ fontFamily: "var(--font-display)", color }}
    >
      {shown.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix && (
        <span className="text-[15px] text-[var(--app-dim)]">{suffix}</span>
      )}
    </p>
  );

  const body = (
    <>
      {ring ? (
        <ProgressRing
          value={ring.value}
          size={62}
          strokeWidth={2.5}
          color={color}
          delayMs={delayMs}
          className="mx-auto"
        >
          {number}
        </ProgressRing>
      ) : (
        number
      )}
      <p className="mt-1 text-[11px] leading-tight text-[var(--app-dim)]">
        {label}
      </p>
      {hint && (
        <p className="mt-0.5 text-[10px] leading-tight text-[var(--app-dim)] opacity-70">
          {hint}
        </p>
      )}
    </>
  );

  const shell =
    "rounded-2xl border border-[var(--app-line-soft)] bg-[var(--app-card)] px-3 py-4 text-center";

  if (href) {
    return (
      <Link
        href={href}
        className={`${shell} block transition-colors active:bg-[var(--app-card-2)]`}
      >
        {body}
      </Link>
    );
  }

  return <div className={shell}>{body}</div>;
}
