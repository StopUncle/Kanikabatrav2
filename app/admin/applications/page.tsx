"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Loader2,
  Check,
  X,
  Clock,
  UserCheck,
  Users,
  ShieldCheck,
} from "lucide-react";

interface Application {
  id: string;
  userId: string;
  status: string;
  applicationData: Record<string, string | boolean> | null;
  appliedAt: string;
  approvedAt: string | null;
  activatedAt: string | null;
  billingCycle: string;
  user: {
    id: string;
    email: string;
    name: string | null;
    displayName: string | null;
  };
}

// Age calculator for the dateOfBirth field. Shown next to the DOB in the
// admin view so reviewers don't have to do the math themselves.
function calculateAgeFromIso(isoDate: string): number | null {
  const birth = new Date(isoDate);
  if (isNaN(birth.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const hadBirthdayThisYear =
    now.getMonth() > birth.getMonth() ||
    (now.getMonth() === birth.getMonth() && now.getDate() >= birth.getDate());
  if (!hadBirthdayThisYear) age--;
  return age;
}

// Humanises a camelCase key into Title Case: "dateOfBirth" → "Date Of Birth".
function humaniseKey(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();
}

// Pretty-prints a single applicationData value. Booleans become ✓/✗,
// ISO dates are rendered with age, everything else is rendered as-is.
function renderValue(key: string, value: string | boolean): React.ReactNode {
  if (typeof value === "boolean") {
    return value ? (
      <span className="text-emerald-400">✓ Yes</span>
    ) : (
      <span className="text-red-400">✗ No</span>
    );
  }
  if (key === "dateOfBirth" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const age = calculateAgeFromIso(value);
    const formatted = new Date(value).toLocaleDateString();
    return (
      <>
        {formatted}
        {age !== null && (
          <span className="text-text-gray/60 ml-2">
            (age {age})
          </span>
        )}
      </>
    );
  }
  return String(value);
}

type FilterTab = "PENDING" | "APPROVED" | "ACTIVE" | "ALL";

type TabCounts = Record<FilterTab, number>;

const EMPTY_COUNTS: TabCounts = {
  PENDING: 0,
  APPROVED: 0,
  ACTIVE: 0,
  ALL: 0,
};

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [counts, setCounts] = useState<TabCounts>(EMPTY_COUNTS);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<FilterTab>("PENDING");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchApplications = useCallback(async (status: FilterTab) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/applications?status=${status}`);
      if (res.ok) {
        const data = await res.json();
        setApplications(data.applications || []);
        // The API returns fresh per-tab counts on every request. We
        // update them unconditionally so the badges reflect the current
        // DB state regardless of which tab the admin opens first.
        if (data.counts) {
          setCounts({
            PENDING: data.counts.PENDING ?? 0,
            APPROVED: data.counts.APPROVED ?? 0,
            ACTIVE: data.counts.ACTIVE ?? 0,
            ALL: data.counts.ALL ?? 0,
          });
        }
      }
    } catch (err) {
      console.error("Failed to fetch applications:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications(activeTab);
  }, [activeTab, fetchApplications]);

  async function handleAction(id: string, action: "approve" | "reject") {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (res.ok) {
        fetchApplications(activeTab);
      }
    } catch (err) {
      console.error(`Failed to ${action} application:`, err);
    } finally {
      setActionLoading(null);
    }
  }

  const tabs: { value: FilterTab; label: string; icon: typeof Clock }[] = [
    { value: "PENDING", label: "Pending", icon: Clock },
    { value: "APPROVED", label: "Approved", icon: UserCheck },
    // Active = approved + paid. Previously these vanished from the
    // admin view entirely since they weren't PENDING or APPROVED and
    // "All" was the only place they surfaced.
    { value: "ACTIVE", label: "Active", icon: ShieldCheck },
    { value: "ALL", label: "All", icon: Users },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-light uppercase tracking-[0.15em] text-text-light mb-1">
          Applications
        </h1>
        {/* Gift claims + manual comps don't have an apply form, so they
            never show here. This note makes that explicit instead of
            leaving the admin wondering why their member count elsewhere
            doesn't match the count on this page. */}
        <p className="text-text-gray/60 text-xs font-light">
          Only shows members who submitted the apply form. Gift claims and
          manual memberships are in Admin &rsaquo; Members.
        </p>
      </div>

      <div className="flex gap-2 mb-8 flex-wrap">
        {tabs.map(({ value, label, icon: Icon }) => {
          const count = counts[value];
          return (
            <button
              key={value}
              onClick={() => setActiveTab(value)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-light tracking-wide rounded transition-all duration-200 ${
                activeTab === value
                  ? "bg-accent-gold/10 text-accent-gold border border-accent-gold/30"
                  : "text-text-gray border border-white/10 hover:text-text-light hover:border-white/20"
              }`}
            >
              <Icon size={16} strokeWidth={1.5} />
              {label}
              <span
                className={`ml-1 px-1.5 py-0.5 rounded text-[10px] tabular-nums tracking-normal ${
                  activeTab === value
                    ? "bg-accent-gold/20 text-accent-gold"
                    : "bg-white/5 text-text-gray/70"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-accent-gold" size={32} />
        </div>
      ) : applications.length === 0 ? (
        <div className="glass-card rounded-lg p-12 text-center">
          <p className="text-text-gray font-light">
            {activeTab === "PENDING"
              ? "No applications waiting for review."
              : activeTab === "APPROVED"
                ? "No approved applications awaiting payment."
                : activeTab === "ACTIVE"
                  ? "No active members from the apply flow yet."
                  : "No applications found."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="glass-card rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-text-light font-light text-lg">
                    {app.user.displayName || app.user.name || "Unnamed"}
                  </p>
                  <p className="text-text-gray text-sm">{app.user.email}</p>
                  <p className="text-text-gray/60 text-xs mt-1">
                    Applied {new Date(app.appliedAt).toLocaleDateString()} &middot;{" "}
                    {app.billingCycle}
                  </p>
                </div>
                <span
                  className={`text-xs uppercase tracking-wider px-3 py-1 rounded-full ${
                    app.status === "PENDING"
                      ? "bg-amber-500/10 text-amber-400"
                      : app.status === "APPROVED"
                        ? "bg-sky-500/10 text-sky-300"
                        : app.status === "ACTIVE"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : app.status === "SUSPENDED"
                            ? "bg-orange-500/10 text-orange-300"
                            : app.status === "EXPIRED"
                              ? "bg-white/5 text-text-gray"
                              : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {app.status}
                </span>
              </div>

              {app.applicationData && (
                <div className="bg-white/[0.02] rounded-md p-4 mb-4 space-y-2">
                  {Object.entries(app.applicationData).map(([key, value]) => {
                    if (key === "rejectionNote" || key === "rejectedAt") return null;
                    return (
                      <div key={key}>
                        <p className="text-text-gray text-xs uppercase tracking-wider mb-0.5">
                          {humaniseKey(key)}
                        </p>
                        <p className="text-text-light text-sm font-light">
                          {renderValue(key, value)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}

              {app.status === "PENDING" && (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleAction(app.id, "approve")}
                    disabled={actionLoading === app.id}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-light tracking-wide bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded hover:bg-emerald-500/20 transition-all duration-200 disabled:opacity-50"
                  >
                    {actionLoading === app.id ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Check size={14} />
                    )}
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(app.id, "reject")}
                    disabled={actionLoading === app.id}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-light tracking-wide bg-red-500/10 text-red-400 border border-red-500/30 rounded hover:bg-red-500/20 transition-all duration-200 disabled:opacity-50"
                  >
                    <X size={14} />
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
