import Link from "next/link";
import type { Day0Checklist } from "@/lib/day0/checklist";

/**
 * The first-week checklist card on Today. Three rows, each a door;
 * ticked rows stay visible so progress reads at a glance. The rows come
 * from the data layer, which owns which tier gets which items. The
 * parent only renders this while the Day-0 window is open and something
 * is still unticked.
 */
export default function ChecklistCard({
  checklist,
}: {
  checklist: Day0Checklist;
}) {
  const items = checklist.items;

  return (
    <section
      className="mx-5 mb-6 rounded-[18px] border border-[var(--app-line)] p-[18px]"
      style={{
        background:
          "linear-gradient(140deg, rgba(212,175,55,0.09), rgba(212,175,55,0.02))",
      }}
    >
      <div className="mb-3 flex items-baseline justify-between">
        <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--app-gold-soft)]">
          Your first week
        </p>
        <p className="text-[11px] text-[var(--app-dim)]">
          {checklist.doneCount} of {items.length}
        </p>
      </div>

      <div className="flex flex-col gap-1">
        {items.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className="-mx-2 flex items-center gap-3 rounded-xl px-2 py-2.5"
          >
            <span
              className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border ${
                item.done
                  ? "border-[var(--app-gold)] bg-[rgba(212,175,55,0.15)]"
                  : "border-[var(--app-line)]"
              }`}
            >
              {item.done && (
                <svg viewBox="0 0 12 12" className="h-3 w-3">
                  <path
                    d="M2.5 6.5l2.5 2.5 4.5-5.5"
                    fill="none"
                    stroke="#d4af37"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
            <span className="min-w-0 flex-1">
              <span
                className={`block text-[14.5px] leading-snug ${
                  item.done ? "text-[var(--app-dim)] line-through" : ""
                }`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                {item.title}
              </span>
              {!item.done && (
                <span className="mt-0.5 block text-[12px] text-[var(--app-dim)]">
                  {item.sub}
                </span>
              )}
            </span>
            {!item.done && (
              <span className="shrink-0 text-[11px] tracking-[0.1em] text-[var(--app-gold)]">
                GO →
              </span>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
