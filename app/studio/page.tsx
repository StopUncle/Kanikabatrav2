import Link from "next/link";
import { getInbox } from "@/lib/studio/inbox";
import StudioInstall from "@/components/studio/StudioInstall";

/**
 * The inbox. One list, oldest-waiting first, nothing else on screen.
 *
 * Server-rendered on every request: this is a two-query page behind a PIN,
 * and a stale inbox is worse than a slow one.
 */
export const dynamic = "force-dynamic";

function timeAgo(date: Date): string {
  const mins = Math.floor((Date.now() - date.getTime()) / 60000);
  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d`;
  return `${Math.floor(days / 7)}w`;
}

export default async function StudioPage() {
  const { items, waitingCount } = await getInbox();
  const waiting = items.filter((i) => i.waiting);
  const handled = items.filter((i) => !i.waiting);

  return (
    <main className="px-5 pb-16 pt-[max(1.5rem,env(safe-area-inset-top))]">
      <header className="mb-7 flex items-baseline justify-between">
        <h1 className="text-[26px] font-light tracking-tight text-[#f5f0ed]">
          Studio
        </h1>
        {waitingCount > 0 && (
          <span className="rounded-full bg-[#d4af37] px-2.5 py-1 text-xs font-semibold text-[#0a0908]">
            {waitingCount}
          </span>
        )}
      </header>

      <StudioInstall />

      {waiting.length === 0 && (
        <div className="rounded-2xl border border-[#d4af37]/15 bg-[#4a1426]/10 px-5 py-10 text-center">
          <p className="text-[15px] font-light text-[#d6cfc4]">
            Nothing waiting.
          </p>
          <p className="mt-1.5 text-[13px] font-light text-[#7a6f60]">
            You are completely caught up.
          </p>
        </div>
      )}

      {waiting.length > 0 && (
        <ul className="space-y-2.5">
          {waiting.map((item) => (
            <li key={`${item.kind}-${item.id}`}>
              <Link
                href={
                  item.kind === "question"
                    ? `/studio/q/${item.id}`
                    : `/studio/m/${item.id}`
                }
                className="block rounded-2xl border border-[#d4af37]/20 bg-[#141110] px-4 py-3.5 transition-colors active:bg-[#1d1917]"
              >
                <div className="mb-1.5 flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#d4af37]">
                    {item.kind === "question" ? "Question" : "Message"}
                  </span>
                  <span className="truncate text-[12px] font-light text-[#7a6f60]">
                    {item.from}
                  </span>
                  <span className="ml-auto shrink-0 text-[12px] font-light text-[#7a6f60]">
                    {timeAgo(item.createdAt)}
                  </span>
                </div>
                <p className="line-clamp-3 text-[15px] font-light leading-relaxed text-[#f5f0ed]">
                  {item.preview}
                </p>
                {(item.upvotes > 0 || item.unread > 1) && (
                  <p className="mt-2 text-[12px] font-light text-[#d4af37]/80">
                    {item.upvotes > 0
                      ? `${item.upvotes} member${item.upvotes === 1 ? "" : "s"} want this answered`
                      : `${item.unread} unread`}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {handled.length > 0 && (
        <>
          <h2 className="mb-3 mt-10 text-[10px] uppercase tracking-[0.22em] text-[#7a6f60]">
            Handled
          </h2>
          <ul className="space-y-1.5">
            {handled.slice(0, 25).map((item) => (
              <li key={`${item.kind}-${item.id}`}>
                <Link
                  href={
                    item.kind === "question"
                      ? `/studio/q/${item.id}`
                      : `/studio/m/${item.id}`
                  }
                  className="block rounded-xl px-4 py-2.5 transition-colors active:bg-[#141110]"
                >
                  <p className="truncate text-[14px] font-light text-[#7a6f60]">
                    {item.preview}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
