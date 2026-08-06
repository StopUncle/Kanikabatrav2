"use client";

import { Suspense, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { capture, capturePageview } from "@/lib/analytics/client";

/**
 * Reports route changes through the singleton initialized at browser startup.
 *
 * App Router does full client-side navigation, so the library's own
 * pageview listener would see the first load and nothing after it. We
 * capture on pathname change instead.
 *
 * The Arrival event is derived from the route rather than fired by the
 * Arrival screen itself. It is the same fact either way, and keeping it
 * here means the funnel needs no instrumentation inside a component
 * somebody else is redesigning.
 */
function AnalyticsRouteReporter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || pathname === lastPath.current) return;
    lastPath.current = pathname;

    const query = searchParams?.toString();
    capturePageview(
      `${window.location.origin}${pathname}${query ? `?${query}` : ""}`,
    );

    if (pathname === "/app/welcome") {
      capture(ANALYTICS_EVENTS.ARRIVAL_VIEWED);
    }

    if (pathname === "/app" || pathname.startsWith("/app/")) {
      try {
        if (!sessionStorage.getItem("kb-app-entered")) {
          sessionStorage.setItem("kb-app-entered", "1");
          capture(ANALYTICS_EVENTS.APP_ENTERED);
        }
      } catch {
        /* private-mode storage refusals should not break navigation */
      }
    }
  }, [pathname, searchParams]);

  return null;
}

/**
 * useSearchParams opts its whole subtree into client rendering unless it
 * sits behind a Suspense boundary, which would drag every static page
 * with it. The reporter renders nothing, so an empty fallback costs
 * nothing and the pages upstream stay static.
 */
export default function AnalyticsProvider() {
  return (
    <Suspense fallback={null}>
      <AnalyticsRouteReporter />
    </Suspense>
  );
}
