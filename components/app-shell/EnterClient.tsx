"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { getAttributionForSubmit } from "@/lib/attribution";
import { migrateLocalStreakIfPresent } from "@/lib/tells/migrate-streak-client";
import { identify } from "@/lib/analytics/client";
import { readSafeRedirect } from "@/lib/auth/safe-redirect";

type Mode = "signin" | "create";

/**
 * The app's front door: sign in and create account on one screen, in
 * the app's own skin. Posts to the same /api/auth endpoints as the
 * website forms, so one account works everywhere; only the clothes
 * differ. After auth, members land on their feed and everyone else in
 * the app, unless a ?redirect brought them here for somewhere specific.
 */
export default function EnterClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = readSafeRedirect(searchParams);

  /**
   * Sign-in is the default whenever something sent them here with a
   * destination in hand, because only a returning user has one: an
   * expired session lands on /enter?redirect=<where they were going>
   * (lib/auth/server-auth.ts). Defaulting those people to Create account
   * meant they typed their real credentials into the register endpoint
   * and got told the email already exists.
   *
   * A stranger arriving from a marketing CTA carries no redirect and
   * still gets Create account first, which is the deliberate default.
   */
  const [mode, setMode] = useState<Mode>(redirectTo ? "signin" : "create");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const cleanEmail = email.trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(cleanEmail)) {
      setError("That email does not look right.");
      return;
    }
    if (password.length < 8) {
      setError("Password needs at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      const isCreate = mode === "create";
      const response = await fetch(
        isCreate ? "/api/auth/register" : "/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            isCreate
              ? {
                  email: cleanEmail,
                  password,
                  attribution: getAttributionForSubmit(),
                }
              : { email: cleanEmail, password },
          ),
        },
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(
          result.error || (isCreate ? "Could not create the account" : "Sign in failed"),
        );
      }

      // Carry an anonymous Tells streak onto the account, and merge the
      // browser's anonymous analytics person. Neither blocks the redirect.
      migrateLocalStreakIfPresent();
      if (result.user?.id) {
        identify(result.user.id, { email: result.user.email });
      }

      // Resolve the destination to its real first screen so the landing
      // is one paint: a fresh create can never be a member, and /app
      // would only bounce it on to the Arrival.
      let destination =
        redirectTo || (result.isActiveMember ? "/consilium/feed" : "/app");
      if (
        isCreate &&
        (destination === "/app" || destination === "/start")
      ) {
        destination = "/app/welcome";
      }
      router.push(destination);
      // The app shell has no marketing chrome to refresh, and refreshing
      // re-suspends the screen that just landed.
      if (!destination.startsWith("/app")) {
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-[var(--app-line)] bg-[var(--app-surface)] px-4 py-3.5 text-[15px] text-[var(--app-text)] placeholder:text-[var(--app-dim)] outline-none focus:border-[var(--app-gold-soft)] transition-colors";

  return (
    <div className="flex min-h-[100dvh] flex-col px-5 pb-10 pt-5">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-[var(--app-dim)]"
      >
        <span aria-hidden>&larr;</span> kanikarose.com
      </Link>

      <div className="flex flex-1 flex-col justify-center">
        <p className="mb-2 text-[11px] uppercase tracking-[0.3em] text-[var(--app-gold-soft)]">
          The Consilium
        </p>
        <h1
          className="mb-1.5 text-[32px] font-light leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {mode === "create" ? "Take a seat." : "Welcome back."}
        </h1>
        <p className="mb-7 text-[14px] font-light leading-relaxed text-[var(--app-muted)]">
          {mode === "create"
            ? "One account for the app and the site. Free to start."
            : "Your seat is where you left it."}
        </p>

        {/* Mode toggle */}
        <div className="mb-6 grid grid-cols-2 rounded-full border border-[var(--app-line)] bg-[var(--app-surface)] p-1 text-[12px] uppercase tracking-[0.14em]">
          {(
            [
              ["create", "Create account"],
              ["signin", "Sign in"],
            ] as [Mode, string][]
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => {
                setMode(value);
                setError("");
              }}
              className={`rounded-full py-2.5 transition-colors ${
                mode === value
                  ? "bg-[var(--app-gold)] text-[var(--app-on-gold)]"
                  : "text-[var(--app-muted)]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <form onSubmit={submit} className="flex flex-col gap-3">
          {error && (
            <p className="rounded-xl border border-[var(--pact-blood)]/50 bg-[var(--pact-blood)]/10 px-4 py-3 text-[13px] text-[var(--app-text)]">
              {error}
            </p>
          )}

          <input
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              autoComplete={mode === "create" ? "new-password" : "current-password"}
              placeholder={mode === "create" ? "Choose a password" : "Password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${inputClass} pr-16`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] uppercase tracking-[0.14em] text-[var(--app-dim)]"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-full bg-[var(--app-gold)] py-3.5 text-[13px] font-medium uppercase tracking-[0.16em] text-[var(--app-on-gold)] transition-opacity disabled:opacity-50"
          >
            {loading
              ? "One moment"
              : mode === "create"
                ? "Enter the app"
                : "Sign in"}
          </button>
        </form>

        {mode === "signin" && (
          <Link
            href="/forgot-password"
            className="mt-5 text-center text-[13px] font-light text-[var(--app-muted)]"
          >
            Forgot your password?
          </Link>
        )}

        <p className="mt-8 text-center text-[12px] font-light leading-relaxed text-[var(--app-dim)]">
          The simulator, drills, Receipts, and your Mark. Train before you
          spend a dollar.
        </p>
      </div>
    </div>
  );
}
