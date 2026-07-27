"use client";

import { Suspense, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { capture, capturePageview, initAnalytics } from "@/lib/analytics/client";

/**
 * Boots PostHog and reports route changes.
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
    void initAnalytics();
  }, []);

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
