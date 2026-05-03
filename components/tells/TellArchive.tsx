import Link from "next/link";
import { TRACK_LABELS, type InstinctTrack } from "@/lib/tells/types";

interface ArchiveItem {
  id: string;
  slug: string;
  number: number;
  track: InstinctTrack;
  question: string;
  scheduleDate: Date | null;
}

/**
 * Horizontal archive of past Tells beneath the daily-reveal. Server
 * component, no client interaction beyond Link clicks. Each card is
 * a question stub; clicking opens the full Tell at /tells/[slug].
 *
 * Visible only when archive has >0 items, so the first day of the
 * platform does not render an empty section.
 */
export default function TellArchive({ items }: { items: ArchiveItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className="max-w-5xl mx-auto px-4 mt-20 pt-10 border-t border-gray-800/60">
      <header className="mb-6 max-w-3xl mx-auto">
        <p className="text-accent-gold/70 text-[10px] uppercase tracking-[0.4em] mb-2">
          Past Tells
        </p>
        <h2 className="text-text-light text-xl sm:text-2xl font-extralight tracking-wider uppercase">
          The archive
        </h2>
      </header>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((t) => (
          <li key={t.id}>
            <Link
              href={`/tells/${t.slug}`}
              className="block h-full rounded-lg border border-gray-800 bg-deep-black/40 p-5 hover:border-accent-gold/50 transition-colors"
            >
              <div className="flex items-baseline justify-between mb-3">
                <span className="text-accent-gold/70 text-[10px] uppercase tracking-[0.3em]">
                  Tell {String(t.number).padStart(3, "0")}
                </span>
                <span className="text-text-gray/60 text-[10px] uppercase tracking-[0.2em]">
                  {TRACK_LABELS[t.track]}
                </span>
              </div>
              <p
                className="text-text-light font-light text-sm sm:text-base leading-relaxed line-clamp-3"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {t.question}
              </p>
              {t.scheduleDate && (
                <p className="text-text-gray/50 text-[10px] uppercase tracking-[0.3em] mt-3">
                  {t.scheduleDate.toISOString().slice(0, 10)}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
