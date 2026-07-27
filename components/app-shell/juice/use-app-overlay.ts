"use client";

import { useEffect, useState } from "react";

/**
 * The app shell's overlay host, mounted as the last child of the phone column
 * in `app/hub/layout.tsx`.
 *
 * Portalling to `document.body` would put the overlay outside
 * `[data-app-shell]`, where every `var(--app-*)` token resolves to nothing and
 * the result renders black on black. It would also escape the framed phone
 * column on desktop and cover the whole window. So this resolves that one
 * element and nothing else: there is deliberately no way to pass an arbitrary
 * portal target.
 *
 * Returns null on the server and on the first client render, which is the
 * correct answer both times: an overlay has nothing to show before mount.
 */

export const APP_OVERLAY_ROOT_ID = "app-overlay-root";

export function useAppOverlay(): HTMLElement | null {
  const [host, setHost] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setHost(document.getElementById(APP_OVERLAY_ROOT_ID));
  }, []);

  return host;
}
