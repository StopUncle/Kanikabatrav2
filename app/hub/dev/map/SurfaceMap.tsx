"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { APP_SURFACES, type AppSurface, type Placement } from "@/lib/app/nav";

/**
 * The whole app, laid out by where each surface lives, inside the real shell.
 *
 * Not a mockup: this renders at the shell's own width, in its own type and
 * colours, from the same config the tab bar and More sheet read. If a row
 * looks wrong here it is wrong in the product, and moving it means editing
 * one line in lib/app/nav.ts rather than hunting two components.
 *
 * What it is for: deciding placement on purpose. Depth answers "how many taps
 * from Today", which is the number that actually decides whether a surface
 * gets used. Anything at depth 3 or more is, in practice, hidden.
 */

const GROUPS: { key: Placement; title: string; blurb: string }[] = [
  { key: "tab", title: "The bar", blurb: "Four routes plus More. No more slots exist." },
  { key: "more", title: "The More sheet", blurb: "One tap deeper. Grouped." },
  { key: "nested", title: "Inside another surface", blurb: "Reached from a parent, on purpose." },
  { key: "unlisted", title: "Unlisted", blurb: "Runners, one-shots and dev harnesses." },
];

const MATURITY_COLOR: Record<AppSurface["maturity"], string> = {
  "app-native": "var(--app-green)",
  ported: "var(--app-rose)",
  stub: "var(--app-dim)",
  dev: "var(--app-dim)",
};

/** How many taps from Today. Depth 3+ is hidden in all but name. */
function depthOf(surface: AppSurface, all: AppSurface[]): number {
  if (surface.href === "/app") return 0;
  if (surface.placement === "tab") return 1;
  if (surface.placement === "more") return 2;
  if (surface.placement === "unlisted") return 99;
  let depth = 1;
  let cursor: AppSurface | undefined = surface;
  const seen = new Set<string>();
  while (cursor?.parent && !seen.has(cursor.href)) {
    seen.add(cursor.href);
    const parent: AppSurface | undefined = all.find((s) => s.href === cursor!.parent);
    if (!parent) break;
    depth += parent.placement === "more" ? 2 : 1;
    cursor = parent;
    if (parent.placement === "tab" || parent.placement === "more") break;
  }
  return depth;
}

export default function SurfaceMap() {
  const [showNotes, setShowNotes] = useState(true);

  const rows = useMemo(
    () =>
      APP_SURFACES.map((s) => ({
        surface: s,
        depth: depthOf(s, APP_SURFACES),
      })),
    [],
  );

  /**
   * Markers can sit anywhere in the note, not just at the front. Matching on
   * the start missed the Kanika tab, which is the single biggest open
   * placement question in the app.
   */
  const flagged = rows.filter(({ surface }) =>
    ["ORPHAN", "OVERLAPS", "UNDER REVIEW"].some((m) =>
      surface.note.includes(m),
    ),
  );

  return (
    <div className="pb-10 pt-6">
      <div className="px-5">
        <h1
          className="text-[28px] font-light"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Surface map
        </h1>
        <p className="mt-1 text-[13px] text-[var(--app-muted)]">
          {APP_SURFACES.length} surfaces, rendered from the same config the bar
          and the sheet read.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Legend color="var(--app-green)" label="app-native" />
          <Legend color="var(--app-rose)" label="old skin" />
          <button
            type="button"
            onClick={() => setShowNotes((v) => !v)}
            className="rounded-full border border-[var(--app-line)] px-3 py-1 text-[10.5px] uppercase tracking-[0.16em] text-[var(--app-dim)]"
          >
            {showNotes ? "Hide why" : "Show why"}
          </button>
        </div>
      </div>

      {flagged.length > 0 && (
        <div className="mx-5 mt-6 rounded-2xl border border-[var(--app-rose)] p-4">
          <p className="text-[10.5px] uppercase tracking-[0.22em] text-[var(--app-rose)]">
            Needs a decision · {flagged.length}
          </p>
          <ul className="mt-2 space-y-2">
            {flagged.map(({ surface }) => (
              <li key={surface.href} className="text-[12.5px] leading-relaxed">
                <span className="text-[var(--app-gold)]">{surface.label}</span>
                <span className="text-[var(--app-muted)]"> — {surface.note}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {GROUPS.map((group) => {
        const groupRows = rows.filter((r) => r.surface.placement === group.key);
        if (groupRows.length === 0) return null;
        return (
          <section key={group.key} className="mt-8">
            <div className="px-5">
              <p className="text-[11px] uppercase tracking-[0.26em] text-[var(--app-dim)]">
                {group.title} · {groupRows.length}
              </p>
              <p className="mt-1 text-[11.5px] text-[var(--app-muted)]">
                {group.blurb}
              </p>
            </div>

            <div className="mx-5 mt-3 overflow-hidden rounded-2xl border border-[var(--app-line-soft)]">
              {groupRows.map(({ surface, depth }, i) => (
                <div
                  key={surface.href}
                  className={`px-4 py-3 ${
                    i > 0 ? "border-t border-[var(--app-line-soft)]" : ""
                  }`}
                >
                  <div className="flex items-baseline gap-2">
                    <span
                      aria-hidden
                      className="h-[7px] w-[7px] shrink-0 rounded-full"
                      style={{ background: MATURITY_COLOR[surface.maturity] }}
                    />
                    <span className="min-w-0 flex-1 truncate text-[14px]">
                      {surface.label}
                    </span>
                    {depth < 99 && (
                      <span
                        className="shrink-0 text-[10px] tabular-nums"
                        style={{
                          color:
                            depth >= 3
                              ? "var(--app-rose)"
                              : "var(--app-dim)",
                        }}
                      >
                        {depth} tap{depth === 1 ? "" : "s"}
                      </span>
                    )}
                  </div>

                  <div className="mt-1 flex items-baseline gap-2 pl-[15px]">
                    {surface.href.includes("[") ? (
                      <span className="text-[11px] text-[var(--app-dim)]">
                        {surface.href}
                      </span>
                    ) : (
                      <Link
                        href={surface.href}
                        className="text-[11px] text-[var(--app-gold-soft)] underline-offset-2 hover:underline"
                      >
                        {surface.href}
                      </Link>
                    )}
                    {surface.section && (
                      <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--app-dim)]">
                        {surface.section}
                      </span>
                    )}
                  </div>

                  {showNotes && surface.note && (
                    <p className="mt-1.5 pl-[15px] text-[11.5px] leading-relaxed text-[var(--app-muted)]">
                      {surface.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--app-line-soft)] px-3 py-1">
      <span
        aria-hidden
        className="h-[7px] w-[7px] rounded-full"
        style={{ background: color }}
      />
      <span className="text-[10.5px] uppercase tracking-[0.14em] text-[var(--app-dim)]">
        {label}
      </span>
    </span>
  );
}
