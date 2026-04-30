/**
 * Consilium service worker.
 *
 * Phase 1 (this file): registration only, with stubs for the push
 * event handler so Phase 2 can wire web-push into a working notify
 * flow. We intentionally do NOT cache pages or assets here yet —
 * cache strategy interacts with Next.js's own cache/ISR layer in
 * subtle ways and warrants a separate, deliberate decision after
 * push is shipping. For now: pass-through fetch handler, no offline.
 *
 * Phase 2 will add:
 *   - self.addEventListener("push", ...) with notification rendering
 *   - self.addEventListener("notificationclick", ...) for tap-through
 *   - subscriber resync on activate (for VAPID key rotation safety)
 */

self.addEventListener("install", () => {
  // Activate the new worker immediately on install instead of
  // waiting for all tabs to close. Avoids the "old worker still
  // running, new one queued" footgun on deploys.
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // Take control of all open clients (tabs) the moment we activate.
  // Without this, the page that triggered the install keeps using
  // the previous worker (or none) until the next navigation.
  event.waitUntil(self.clients.claim());
});

// Pass-through fetch. We register the handler so the worker counts
// as "controlling" the page (required by the install-prompt flow on
// Chrome). No actual caching happens here in Phase 1.
self.addEventListener("fetch", () => {
  // Intentionally empty.
});

// Push event handler — Phase 2 fills this in.
self.addEventListener("push", (event) => {
  if (!event.data) return;
  let payload;
  try {
    payload = event.data.json();
  } catch {
    payload = { title: "Consilium", body: event.data.text() };
  }
  const title = payload.title || "Consilium";
  const options = {
    body: payload.body || "",
    icon: payload.icon || "/images/kanikarose-logo.png",
    badge: payload.badge || "/images/kanikarose-logo.png",
    data: payload.data || {},
    tag: payload.tag,
    requireInteraction: payload.requireInteraction || false,
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = (event.notification.data && event.notification.data.url) || "/consilium/feed";
  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        // Focus an existing tab if we already have the app open.
        for (const client of clientList) {
          if (client.url.includes(targetUrl) && "focus" in client) {
            return client.focus();
          }
        }
        // Otherwise open a new one.
        if (self.clients.openWindow) {
          return self.clients.openWindow(targetUrl);
        }
      }),
  );
});
