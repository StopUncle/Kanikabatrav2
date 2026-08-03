import { redirect } from "next/navigation";
import { Fraunces, Instrument_Sans } from "next/font/google";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { getAccess, canAccessMemberOnly } from "@/lib/access/tier";
import { prisma } from "@/lib/prisma";
import TabBar from "@/components/app-shell/TabBar";
import BackBar from "@/components/app-shell/BackBar";
import PhoneHandoff from "@/components/app-shell/PhoneHandoff";
import ServiceWorkerRegister from "@/components/pwa/ServiceWorkerRegister";
import AnalyticsIdentify from "@/components/analytics/AnalyticsIdentify";
import NotificationPrompt from "@/components/pwa/NotificationPrompt";

/**
 * The app shell: the mobile-first member experience at /app. Phone-width
 * column (full-bleed on mobile, framed on desktop), its own type system,
 * bottom tab bar. No marketing chrome, no sidebar.
 *
 * OPEN (2026-08-02, Sam's explicit call, ending the 2026-08-02 seal): any
 * signed-in account may enter. Free accounts get the free tier; the Blood
 * Pact is the app's paid tier; active Consilium members count as Pact
 * members (lib/access/tier.ts) but their product remains /consilium, which
 * this opening does not touch. Cohort routing lives at /start: active
 * Consilium lands on /consilium/feed, everyone else lands here. The
 * previous accidental opening happened because surfaces were ported while
 * /consilium still pointed at them; this one re-points the doors on
 * purpose (manifest start_url, entry redirects) and leaves the consilium
 * crons aimed at /consilium where their audience lives.
 */

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-display",
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ui",
  display: "swap",
});

export const metadata = {
  title: "Consilium",
  description: "The Consilium, on your phone.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0908",
};

export default async function AppShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userId = await requireServerAuth("/app");
  const access = await getAccess(userId);

  const [baselineAttempts, completedRuns] = await Promise.all([
    prisma.baselineAttempt.count({ where: { userId } }),
    prisma.simulatorProgress.count({
      where: { userId, completedAt: { not: null } },
    }),
  ]);

  // The one refusal the shell makes itself. getAccess reports a banned
  // account as tier "free" so it can be told apart from "logged out"; the
  // enforcement is here, per the contract in lib/access/tier.ts. Sent to
  // the public site, not /login: they hold a valid session, and a login
  // redirect would just loop them back.
  if (access.isBanned) {
    redirect("/");
  }

  return (
    <div
      data-app-shell
      className={`${fraunces.variable} ${instrument.variable} h-[100dvh] overflow-hidden bg-[var(--app-void)]`}
      style={{ fontFamily: "var(--font-ui)" }}
    >
      {/* On a wide screen the app sits in its phone column with the handoff
          panel beside it. Below lg the panel is gone and the column is the
          whole screen, which is where this is meant to be used.

          The shell is a fixed-height flex column and the CONTENT scrolls
          inside it, rather than the document scrolling under a fixed tab
          bar. That distinction is the whole reason the bar used to drift:
          a `fixed` element is pinned to the visual viewport, so on iOS it
          slides around as the address bar collapses and expands. As the
          last row of a container that is exactly one viewport tall, it
          cannot move, and the app stops feeling like a web page. */}
      <div className="mx-auto flex h-[100dvh] w-full max-w-[430px] items-start justify-center lg:max-w-5xl lg:gap-14 lg:px-8 lg:py-10">
        <div className="relative flex h-[100dvh] w-full max-w-[430px] shrink-0 flex-col overflow-hidden bg-[var(--app-black)] text-[var(--app-text)] lg:h-[844px] lg:rounded-[44px] lg:border lg:border-[var(--app-frame)] lg:shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
          {/* min-h-0 is load-bearing: without it a flex child refuses to
              shrink below its content and the scroll never engages. */}
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
            <BackBar />
            {children}
          </div>
          {/* Resolved server-side and passed as a plain boolean, so the
              locked state is in the SSR HTML: a member never flashes locks
              and a free account never flashes an open bar. */}
          <TabBar isMember={canAccessMemberOnly(access)} />
          {/* Overlay host for ceremonies and floaters. It lives inside the
              column so portalled content keeps the [data-app-shell] tokens.
              Absolute against the shell now that the shell is a fixed-size
              positioned box, which covers the phone on mobile and stays
              inside the frame on desktop with one rule instead of two.
              z-60 sits above the tab bar, so "the shell dims" means all
              of it. */}
          <div
            id="app-overlay-root"
            className="pointer-events-none absolute inset-0 z-[60] lg:overflow-hidden lg:rounded-[44px]"
          />
        </div>
        <PhoneHandoff />
      </div>
      <AnalyticsIdentify userId={userId} />
      <ServiceWorkerRegister />
      {/* Push permission, asked only after an earned moment. A browser gives
          you one shot at this prompt, so it is spent on someone invested:
          members after their first Baseline Read, free accounts after their
          first completed scenario. Without the free branch a free account
          could never grant push at all (the Baseline is member-only), which
          silently cut the whole free tier off from the streak nudge. */}
      <NotificationPrompt
        unlocked={
          access.isMember ? baselineAttempts > 0 : completedRuns > 0
        }
      />
    </div>
  );
}
