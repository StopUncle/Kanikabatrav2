import { redirect } from "next/navigation";
import { Fraunces, Instrument_Sans } from "next/font/google";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { checkMembership } from "@/lib/community/membership";
import { prisma } from "@/lib/prisma";
import TabBar from "@/components/app-shell/TabBar";
import PhoneHandoff from "@/components/app-shell/PhoneHandoff";
import ServiceWorkerRegister from "@/components/pwa/ServiceWorkerRegister";
import AnalyticsIdentify from "@/components/analytics/AnalyticsIdentify";
import NotificationPrompt from "@/components/pwa/NotificationPrompt";

/**
 * The app shell: the mobile-first member experience at /app. Phone-width
 * column (full-bleed on mobile, framed on desktop), its own type system,
 * bottom tab bar. No marketing chrome, no sidebar.
 *
 * Members arrive here from social links; the old /consilium surfaces
 * stay alive underneath until each feature is rebuilt in this skin.
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
  const { isMember, redirectUrl } = await checkMembership(userId);
  if (!isMember) {
    redirect(redirectUrl || "/consilium");
  }

  const [me, baselineAttempts] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: { initiationAt: true, role: true },
    }),
    prisma.baselineAttempt.count({ where: { userId } }),
  ]);
  if (me && !me.initiationAt && me.role !== "ADMIN") {
    redirect("/consilium/initiation");
  }

  return (
    <div
      data-app-shell
      className={`${fraunces.variable} ${instrument.variable} h-[100dvh] overflow-hidden bg-[#060505]`}
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
        <div className="relative flex h-[100dvh] w-full max-w-[430px] shrink-0 flex-col overflow-hidden bg-[var(--app-black)] text-[var(--app-text)] lg:h-[844px] lg:rounded-[44px] lg:border lg:border-[#262220] lg:shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
          {/* min-h-0 is load-bearing: without it a flex child refuses to
              shrink below its content and the scroll never engages. */}
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
            {children}
          </div>
          <TabBar />
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
      {/* Push permission, asked only once the member has finished a Baseline
          Read. A browser gives you one shot at this prompt, so it is spent
          on someone with a result worth being notified about. */}
      <NotificationPrompt unlocked={baselineAttempts > 0} />
    </div>
  );
}
