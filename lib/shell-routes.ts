"use client";

import { usePathname } from "next/navigation";

/**
 * Two shells render the same components: the member skin at /consilium and
 * the app at /app. A component shared by both cannot hardcode either one,
 * because whichever it picks becomes a door out of the other shell. That is
 * exactly how the app leaked into production: components ported to /app kept
 * their new hrefs while still rendering inside /consilium, so a member on the
 * old feed tapped a post and landed in a shell nobody had opened yet.
 *
 * So a shared component asks where it is standing, and gets the matching
 * href. The two shells do not share a URL shape (the simulator is /train in
 * one and /simulator in the other), which is why this is a table per surface
 * rather than a prefix swap.
 */

export type Shell = "app" | "consilium";

export interface ShellRoutes {
  /** Play a single scenario. */
  scenario: (id: string) => string;
  /** The scenario index. Where leaving a run lands. */
  catalog: string;
  /** A preview / blog post rendered inside the member surface. */
  preview: (slug: string) => string;
  /** An adventure's overview page. */
  adventure: (slug: string) => string;
  /** The next step of an in-progress adventure. */
  adventureRun: (slug: string) => string;
  /** A single feed post. */
  feedPost: (id: string) => string;
  /** The Tells score board. */
  instinctsScore: string;
  /** The Tells history list. */
  instinctsHistory: string;
  /** Receipts, member edition. */
  receipts: string;
}

const CONSILIUM: ShellRoutes = {
  scenario: (id) => `/consilium/simulator/${id}`,
  catalog: "/consilium/simulator",
  preview: (slug) => `/consilium/previews/${slug}`,
  adventure: (slug) => `/consilium/adventures/${slug}`,
  adventureRun: (slug) => `/consilium/adventures/${slug}/run`,
  feedPost: (id) => `/consilium/feed/${id}`,
  instinctsScore: "/consilium/instincts/score",
  instinctsHistory: "/consilium/instincts/history",
  receipts: "/consilium/receipts",
};

const APP: ShellRoutes = {
  scenario: (id) => `/app/train/${id}`,
  catalog: "/app/train/climb",
  preview: (slug) => `/app/previews/${slug}`,
  adventure: (slug) => `/app/adventures/${slug}`,
  adventureRun: (slug) => `/app/adventures/${slug}/run`,
  feedPost: (id) => `/app/feed/${id}`,
  instinctsScore: "/app/instincts/score",
  instinctsHistory: "/app/instincts/history",
  receipts: "/app/receipts",
};

export function shellFor(pathname: string | null | undefined): Shell {
  return pathname === "/app" || pathname?.startsWith("/app/")
    ? "app"
    : "consilium";
}

export function routesFor(shell: Shell): ShellRoutes {
  return shell === "app" ? APP : CONSILIUM;
}

/**
 * The routes for the shell this component is rendering inside. Anything not
 * under /app is treated as the member skin, which is the right default: the
 * admin surfaces reuse these components too, and admin is not the app.
 */
export function useShellRoutes(): ShellRoutes {
  return routesFor(shellFor(usePathname()));
}
