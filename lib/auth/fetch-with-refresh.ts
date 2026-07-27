"use client";

import { authClient } from "@/lib/utils/auth-client";

/**
 * fetch, plus one silent recovery from an expired accessToken.
 *
 * The member cookie pair is a 15-minute accessToken and a 7-day
 * refreshToken. Anyone who leaves a tab open longer than fifteen minutes
 * and then acts will send a dead token on that first request, which is
 * the common case rather than the rare one.
 *
 * On a 401 carrying `retry: true` this refreshes once and resends. The
 * refresh is singleton-guarded inside authClient, so several requests
 * failing at once share one refresh instead of racing and rotating each
 * other's cookies.
 *
 * Retried once, never twice: if the resend also 401s the refreshToken is
 * genuinely gone and the caller should surface a real sign-in prompt.
 */
export async function fetchWithRefresh(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  const first = await fetch(input, init);
  if (first.status !== 401) return first;

  // Only retry when the server said the request is worth resending.
  // A plain 401 means "you are not allowed", which a refresh cannot fix.
  let retryable = false;
  try {
    retryable = (await first.clone().json())?.retry === true;
  } catch {
    retryable = false;
  }
  if (!retryable) return first;

  const refreshed = await authClient.refreshToken();
  if (!refreshed) return first;

  return fetch(input, init);
}
