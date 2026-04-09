"use client";

import { useState, useEffect, useCallback } from "react";
import { Loader2, Check, X, Clock, UserCheck, Users } from "lucide-react";

interface Application {
  id: string;
  userId: string;
  status: string;
  applicationData: Record<string, string> | null;
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

type FilterTab = "PENDING" | "APPROVED" | "ALL";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
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
    { value: "ALL", label: "All", icon: Users },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-light uppercase tracking-[0.15em] text-text-light mb-8">
        Applications
      </h1>

      <div className="flex gap-2 mb-8">
        {tabs.map(({ value, label, icon: Icon }) => (
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
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-accent-gold" size={32} />
        </div>
      ) : applications.length === 0 ? (
        <div className="glass-card rounded-lg p-12 text-center">
          <p className="text-text-gray font-light">No applications found.</p>
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
                        ? "bg-emerald-500/10 text-emerald-400"
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
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </p>
                        <p className="text-text-light text-sm font-light">{String(value)}</p>
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
