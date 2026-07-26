import { redirect } from "next/navigation";
import { Fraunces, Instrument_Sans } from "next/font/google";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { checkMembership } from "@/lib/community/membership";
import { prisma } from "@/lib/prisma";
import TabBar from "@/components/app-shell/TabBar";
import ServiceWorkerRegister from "@/components/pwa/ServiceWorkerRegister";

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

  const me = await prisma.user.findUnique({
    where: { id: userId },
    select: { initiationAt: true, role: true },
  });
  if (me && !me.initiationAt && me.role !== "ADMIN") {
    redirect("/consilium/initiation");
  }

  return (
    <div
      data-app-shell
      className={`${fraunces.variable} ${instrument.variable} min-h-[100dvh] bg-[#060505]`}
      style={{ fontFamily: "var(--font-ui)" }}
    >
      {/* Pages own their bottom padding (`pb-28` on scrolling screens) so a
          full-height screen like the Kanika thread can pin its composer
          directly above the tab bar. */}
      <div className="relative mx-auto min-h-[100dvh] w-full max-w-[430px] bg-[var(--app-black)] text-[var(--app-text)]">
        {children}
        <TabBar />
      </div>
      <ServiceWorkerRegister />
    </div>
  );
}
