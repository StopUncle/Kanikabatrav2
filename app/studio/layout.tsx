import type { Metadata, Viewport } from "next";
import { redirect } from "next/navigation";
import { verifyAdminSession } from "@/lib/admin/auth";
import ServiceWorkerRegister from "@/components/pwa/ServiceWorkerRegister";
import NotificationPrompt from "@/components/pwa/NotificationPrompt";
import StudioBadge from "@/components/studio/StudioBadge";

/**
 * Studio: Kanika's own installable app.
 *
 * Deliberately separate from everything else. It links its own manifest,
 * so it installs beside the member Consilium icon as a second home-screen
 * app with its own name and its own gold-bubble icon, and it renders none
 * of the site chrome: no Header, no Footer, no marketing. The only thing
 * on screen is what a member is waiting on.
 *
 * Gated on the admin session, the same 6-digit PIN that guards /admin, and
 * noindex because an inbox must never be crawlable.
 */

export const metadata: Metadata = {
  title: "Studio",
  manifest: "/studio.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Studio",
  },
  icons: { apple: "/icons/studio-apple-touch.png" },
  // An inbox in the index would be a data leak and a ranking embarrassment.
  robots: { index: false, follow: false, nocache: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0908",
  // The composer is a text field: letting iOS zoom on focus shifts the
  // whole app and never quite shifts back.
  maximumScale: 1,
  width: "device-width",
  initialScale: 1,
};

export default async function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ok = await verifyAdminSession();
  if (!ok) redirect("/admin-login?next=/studio");

  return (
    <div className="min-h-[100dvh] bg-[#0a0908] text-[#f5f0ed] antialiased">
      {/* Registers /sw.js, which is what lets a push wake the worker and
          set the home-screen badge while the app is closed. */}
      <ServiceWorkerRegister />
      {/* Keeps the icon badge honest while the app is open and focused. */}
      <StudioBadge />
      {/* Subscribes this device to push, which is what makes the badge move
          while the app is closed. `unlocked` with no condition because the
          earned moment already happened: she installed an app whose whole
          purpose is being told. /api/push/subscribe resolves the admin
          session through optionalServerAuth, so the PIN alone is enough
          and no member login is involved. */}
      <NotificationPrompt
        unlocked
        message="Turn on notifications so the unread count reaches your home screen when Studio is closed."
      />
      <div className="mx-auto w-full max-w-2xl">{children}</div>
    </div>
  );
}
