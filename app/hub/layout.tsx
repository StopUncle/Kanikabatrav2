import { redirect } from "next/navigation";
import { Fraunces, Instrument_Sans } from "next/font/google";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { getAccess, canAccessMemberOnly } from "@/lib/access/tier";
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
 * Open to free accounts as well as members. The shell itself gates on
 * nothing but a session and a ban; what a given tier can actually reach is
 * decided per surface, so a free account sees the app rather than a wall
 * where the app used to be.
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
  // requireServerAuth already sends anonymous visitors to login, so by here
  // the caller is either `free` or `member`. The shell renders for both:
  // this used to be the single gate that made /app member-only, and moving
  // it is what turns the app into the free tier's home.
  const userId = await requireServerAuth("/app");
  const access = await getAccess(userId);

  // A ban is the one thing that still refuses the shell outright. It has to
  // be checked explicitly: `checkMembership` reports a ban and a failed
  // payment identically as SUSPENDED, and a failed payment is precisely who
  // the free tier is for. Serving a banned account the free tier would read
  // as an unban. Same destination as before, so nothing changes for them.
  if (access.isBanned) {
    redirect("/consilium");
  }

  const [me, baselineAttempts, completedRuns] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: { initiationAt: true, role: true },
    }),
    prisma.baselineAttempt.count({ where: { userId } }),
    prisma.simulatorProgress.count({
      where: { userId, completedAt: { not: null } },
    }),
  ]);
  // Initiation is a MEMBER ceremony and `/consilium/initiation` enforces
  // membership itself, so sending a free account there would bounce it
  // straight back out to the sales page and the free tier would be
  // unreachable. Members keep the ritual exactly as before; free accounts
  // land in the app with no onboarding, which is a real gap and needs its
  // own app-native flow rather than a redirect into the old funnel.
  if (access.isMember && me && !me.initiationAt && me.role !== "ADMIN") {
    redirect("/consilium/initiation");
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
