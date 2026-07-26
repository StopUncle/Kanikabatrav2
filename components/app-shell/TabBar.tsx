"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * The app shell's bottom tab bar. Four doors, fixed to the bottom of
 * the phone frame, active tab lit gold. A Sessions tab slots in here
 * once the weekly-video pipeline exists.
 */

const TABS = [
  {
    href: "/app",
    label: "Today",
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    href: "/app/path",
    label: "Path",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M5 20V10m7 10V4m7 16v-7" />
      </svg>
    ),
  },
  {
    href: "/app/train",
    label: "Train",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7z" />
      </svg>
    ),
  },
  {
    href: "/app/you",
    label: "You",
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="8.5" r="3.5" />
        <path d="M5 20c1.2-3.5 3.8-5 7-5s5.8 1.5 7 5" />
      </svg>
    ),
  },
];

export default function TabBar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="App navigation"
      className="fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 border-t border-[var(--app-line-soft)] bg-[rgba(10,9,8,0.92)] backdrop-blur-md"
    >
      <div className="flex items-center justify-around px-2 pt-2.5 pb-[max(14px,env(safe-area-inset-bottom))]">
        {TABS.map((tab) => {
          const active =
            tab.href === "/app"
              ? pathname === "/app"
              : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={active ? "page" : undefined}
              className={`flex w-[62px] flex-col items-center gap-1.5 text-[10px] tracking-[0.06em] transition-colors ${
                active ? "text-[var(--app-gold)]" : "text-[var(--app-dim)]"
              }`}
            >
              <span className="h-[21px] w-[21px] [&>svg]:h-full [&>svg]:w-full [&>svg]:fill-none [&>svg]:stroke-current [&>svg]:[stroke-width:1.5]">
                {tab.icon}
              </span>
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
