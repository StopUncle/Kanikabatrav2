"use client";

import { useEffect } from "react";
import { identify } from "@/lib/analytics/client";

/**
 * Ties the browser to a User id.
 *
 * Mounted from the member layouts, which already know who is logged in.
 * Without it the server events (signup, checkout, baseline) and the
 * browser events (arrival, install) describe two different people and
 * every funnel reads as though nobody ever completes it.
 */
export default function AnalyticsIdentify({
  userId,
  email,
}: {
  userId: string;
  email?: string;
}) {
  useEffect(() => {
    identify(userId, email ? { email } : {});
  }, [email, userId]);

  return null;
}
