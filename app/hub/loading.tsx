import { Skeleton } from "@/components/app-shell/ui";

/**
 * Shown the instant a tab is tapped, until the server sends the screen.
 *
 * Every screen here is server-rendered, so a navigation is a round trip.
 * Production TTFB sits around 800ms warm while the network connect is
 * only 45ms, which means the wait is the server thinking, not the
 * distance. Until that comes down, the difference between "slow" and
 * "fine" is whether anything happens when you tap.
 *
 * Deliberately not a spinner. A spinner says "wait"; a shape that
 * matches what is coming says "it is on its way", and it stops the
 * layout jumping when the real content lands.
 */
export default function AppLoading() {
  return (
    <div className="px-5 pt-6" aria-busy="true" aria-label="Loading">
      <Skeleton className="h-7 w-40 rounded-lg" />
      <Skeleton className="mt-2 h-3.5 w-56 bg-[var(--app-card)]" />

      <div className="mt-6 flex flex-col gap-2.5">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-[var(--app-line-soft)] bg-[var(--app-card)] px-4 py-[18px]"
          >
            {/* Staggered so it reads as a list arriving rather than one
                block flashing. */}
            <Skeleton
              className="h-3.5 w-1/2"
              style={{ animationDelay: `${i * 90}ms` }}
            />
            <Skeleton
              className="mt-2 h-3 w-3/4"
              style={{ animationDelay: `${i * 90}ms` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
