"use client";

import dynamic from "next/dynamic";

// Client-side dynamic wrapper so the Vercel Speed Insights script doesn't
// sit on the initial JS bundle. Monitoring only, no render contribution.
const SpeedInsights = dynamic(
  () => import("@vercel/speed-insights/next").then((m) => m.SpeedInsights),
  { ssr: false },
);

export default function LazySpeedInsights() {
  return <SpeedInsights />;
}
