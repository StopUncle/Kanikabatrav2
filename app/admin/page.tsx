"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Loader2,
  ArrowRight,
  AlertTriangle,
  Check,
  Smartphone,
} from "lucide-react";

/**
 * Admin home: what needs Kanika, then how the place is doing.
 *
 * The old version was four stat tiles, which meant anything actually
 * waiting on a human was discoverable only by remembering to visit the
 * right page. This inverts it: the top of the page is a list of things
 * needing her, ordered by what it costs to leave undone, and it is empty
 * when nothing does. Numbers come second, because a number is not a task.
 */

interface NeedsItem {
  key: string;
  count: number;
  label: string;
  detail: string;
  href: string;
}

interface Overview {
  needsYou: NeedsItem[];
  runway: {
    leadingWeek: number;
    publishedThrough: number;
    weeksAhead: number;
    lowRunway: boolean;
    totalWeeks: number;
  };
  health: {
    activeMembers: number;
    seenThisWeek: number;
    newThisWeek: number;
    dormant: number;
  };
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<Overview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/overview")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setData(d))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-accent-gold" size={32} />
      </div>
    );
  }

  if (!data) {
    return (
      <p className="text-sm font-light text-text-gray">
        Could not load the overview.
      </p>
    );
  }

  const { needsYou, runway, health } = data;

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="mb-8 text-2xl font-light uppercase tracking-[0.15em] text-text-light">
        Today
      </h1>

      {/* Open the member app from here.
          The admin_session cookie is enough on its own: requireServerAuth
          falls back to it and checkMembership treats an admin as ACTIVE, so
          this works on a phone with only the PIN login and no member
          account. It renders as the real ADMIN user, which means anything
          done in there (Standing, streaks, completions) lands on that
          account rather than on a test one.

          A plain anchor, not next/link, on purpose: /app is a rewrite onto
          /hub with its own root layout, and a full load is what gets the
          app shell and its PWA manifest initialised cleanly. */}
      <a
        href="/app"
        className="glass-card group mb-8 flex items-center gap-4 rounded-lg p-5 transition-all duration-300 hover:border-accent-gold/40"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-gold/10 text-accent-gold">
          <Smartphone size={20} strokeWidth={1.5} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-light text-text-light">Open the app</span>
          <span className="mt-0.5 block text-sm font-light text-text-gray">
            The member app as you. Best on a phone, and installable from the
            browser share menu.
          </span>
        </span>
        <ArrowRight
          size={16}
          className="shrink-0 text-text-gray opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        />
      </a>

      {/* Needs you */}
      <section className="mb-10">
        <h2 className="mb-3 text-[11px] uppercase tracking-[0.22em] text-accent-gold">
          Needs you
        </h2>

        {needsYou.length === 0 ? (
          <div className="glass-card flex items-center gap-3 rounded-lg px-5 py-6">
            <Check size={18} className="shrink-0 text-emerald-400" />
            <p className="text-sm font-light text-text-gray">
              Nothing is waiting. Everything anyone sent you has an answer.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {needsYou.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="glass-card group flex items-center gap-4 rounded-lg px-5 py-4 transition-all duration-300 hover:border-accent-gold/30"
              >
                <span className="w-9 shrink-0 text-2xl font-light text-accent-gold">
                  {item.count}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-light text-text-light">
                    {item.label}
                  </span>
                  <span className="mt-0.5 block text-xs text-text-gray">
                    {item.detail}
                  </span>
                </span>
                <ArrowRight
                  size={16}
                  className="shrink-0 text-text-gray opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                />
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* The 12 Weeks runway: the one number that decides whether the
          program keeps its promise, so it sits above the vanity metrics. */}
      <section className="mb-10">
        <h2 className="mb-3 text-[11px] uppercase tracking-[0.22em] text-accent-gold">
          The 12 Weeks
        </h2>
        <Link
          href="/admin/transformation"
          className={`glass-card group flex items-center gap-4 rounded-lg px-5 py-4 transition-all duration-300 hover:border-accent-gold/30 ${
            runway.lowRunway ? "border-amber-500/40" : ""
          }`}
        >
          {runway.lowRunway && (
            <AlertTriangle size={18} className="shrink-0 text-amber-400" />
          )}
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-light text-text-light">
              {runway.publishedThrough === 0
                ? "No weeks open yet"
                : runway.weeksAhead < 0
                  ? `Someone is past the last open week`
                  : `${runway.weeksAhead} ${runway.weeksAhead === 1 ? "week" : "weeks"} of runway`}
            </span>
            <span className="mt-0.5 block text-xs text-text-gray">
              Open through {runway.publishedThrough} of {runway.totalWeeks}.
              Furthest member on week {runway.leadingWeek || "none yet"}.
            </span>
          </span>
          <ArrowRight
            size={16}
            className="shrink-0 text-text-gray opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          />
        </Link>
      </section>

      {/* Health */}
      <section>
        <h2 className="mb-3 text-[11px] uppercase tracking-[0.22em] text-accent-gold">
          The room
        </h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            { label: "Active members", value: health.activeMembers },
            { label: "Seen this week", value: health.seenThisWeek },
            { label: "Dormant", value: health.dormant },
            { label: "Joined this week", value: health.newThisWeek },
          ].map((s) => (
            <div key={s.label} className="glass-card rounded-lg px-4 py-4">
              <p className="text-2xl font-light text-text-light">{s.value}</p>
              <p className="mt-1 text-xs font-light text-text-gray">
                {s.label}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs font-light text-text-gray">
          Dormant is active members who have not opened the app in seven days.
          It is the number this whole build exists to move.
        </p>
      </section>
    </div>
  );
}
