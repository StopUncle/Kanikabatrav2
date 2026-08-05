import { Suspense } from "react";
import { redirect } from "next/navigation";
import { Fraunces, Instrument_Sans } from "next/font/google";
import { optionalServerAuth } from "@/lib/auth/server-auth";
import { safeRedirect } from "@/lib/auth/safe-redirect";
import EnterClient from "@/components/app-shell/EnterClient";

/**
 * The app's front door, outside the guarded /app layout on purpose: the
 * shell requires auth, and the page that grants it cannot live behind
 * it. Wears the app skin (data-app-shell plus the shell's fonts) so the
 * hand-off from marketing to app feels like arriving, not detouring
 * through the website. Already signed in? /start routes you home.
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
  title: "Enter | Consilium",
  robots: { index: false, follow: false },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0908",
};

export default async function EnterPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const userId = await optionalServerAuth();
  if (userId) {
    // Already signed in: honour the destination they arrived with rather
    // than dropping it. A deep link opened in a stale tab used to lose
    // where it was going and land on the cohort home instead. Validated,
    // because this value is attacker-supplied.
    const params = await searchParams;
    const first = (key: string) => {
      const v = params[key];
      return Array.isArray(v) ? v[0] : v;
    };
    redirect(safeRedirect(first("redirect") ?? first("returnTo")) ?? "/start");
  }

  return (
    <div
      data-app-shell
      className={`${fraunces.variable} ${instrument.variable} min-h-[100dvh] bg-[var(--app-void)]`}
    >
      <div className="mx-auto min-h-[100dvh] w-full max-w-[430px] bg-[var(--app-black)] text-[var(--app-text)]">
        <Suspense>
          <EnterClient />
        </Suspense>
      </div>
    </div>
  );
}
