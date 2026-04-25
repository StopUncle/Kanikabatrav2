"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

/**
 * Mounts in the root layout. On first paint, reads URL params +
 * referrer and persists to localStorage if any meaningful signal is
 * present (UTM, click ID, or external referrer). Idempotent — won't
 * overwrite an existing stored attribution within its 30-day TTL,
 * preserving first-touch attribution across multi-page visits.
 *
 * Renders nothing.
 */
export default function AttributionTracker() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}
