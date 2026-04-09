"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Loader2,
  Mail,
  Play,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw,
} from "lucide-react";

interface QueueStats {
  pending: number;
  sent: number;
  failed: number;
}

interface QueueEmail {
  id: string;
  recipientEmail: string;
  recipientName: string;
  sequence: string;
  step: number;
  subject: string;
  scheduledAt: string;
  sentAt: string | null;
  status: string;
}

export default function EmailQueuePage() {
  const [stats, setStats] = useState<QueueStats>({ pending: 0, sent: 0, failed: 0 });
  const [upcoming, setUpcoming] = useState<QueueEmail[]>([]);
  const [recent, setRecent] = useState<QueueEmail[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [confirmSend, setConfirmSend] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/email-queue/status");
      if (res.ok) {
        const data = await res.json();
        setStats({
          pending: data.pending || 0,
          sent: data.sent || 0,
          failed: data.failed || 0,
        });
        setUpcoming(data.upcoming || []);
        setRecent(data.recent || []);
      }
    } catch (err) {
      console.error("Failed to fetch email queue:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function handleAction(endpoint: string, label: string, body?: Record<string, unknown>) {
    setActionLoading(label);
    try {
      const res = await fetch(`/api/admin/email-queue/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
      });
      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      console.error(`Failed: ${label}`, err);
    } finally {
      setActionLoading(null);
      setConfirmSend(false);
    }
  }

  const statCards = [
    {
      label: "Pending",
      value: stats.pending,
      icon: Clock,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
    {
      label: "Sent",
      value: stats.sent,
      icon: CheckCircle,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Failed",
      value: stats.failed,
      icon: XCircle,
      color: "text-red-400",
      bg: "bg-red-500/10",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-light uppercase tracking-[0.15em] text-text-light mb-8">
        Email Queue
      </h1>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-accent-gold" size={32} />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-4 mb-8">
            {statCards.map(({ label, value, icon: Icon, color, bg }) => (
              <div key={label} className="glass-card rounded-lg p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded ${bg}`}>
                    <Icon size={18} className={color} />
                  </div>
                  <span className="text-text-gray text-sm font-light">{label}</span>
                </div>
                <p className={`text-2xl font-light ${color}`}>{value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={() => handleAction("enroll-buyers", "enroll")}
              disabled={actionLoading !== null}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-light tracking-wide bg-accent-sapphire/10 text-accent-sapphire border border-accent-sapphire/30 rounded hover:bg-accent-sapphire/20 transition-all duration-200 disabled:opacity-50"
            >
              {actionLoading === "enroll" ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Mail size={16} />
              )}
              Enroll Book Buyers
            </button>

            <button
              onClick={() => handleAction("process", "dry-run", { dryRun: true })}
              disabled={actionLoading !== null}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-light tracking-wide bg-accent-gold/10 text-accent-gold border border-accent-gold/30 rounded hover:bg-accent-gold/20 transition-all duration-200 disabled:opacity-50"
            >
              {actionLoading === "dry-run" ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <RefreshCw size={16} />
              )}
              Process Queue (Dry Run)
            </button>

            {!confirmSend ? (
              <button
                onClick={() => setConfirmSend(true)}
                disabled={actionLoading !== null}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-light tracking-wide bg-red-500/10 text-red-400 border border-red-500/30 rounded hover:bg-red-500/20 transition-all duration-200 disabled:opacity-50"
              >
                <Play size={16} />
                Send Now
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleAction("process", "send", { dryRun: false })}
                  disabled={actionLoading !== null}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-light tracking-wide bg-red-600/20 text-red-300 border border-red-500/40 rounded hover:bg-red-600/30 transition-all duration-200 disabled:opacity-50"
                >
                  {actionLoading === "send" ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <AlertTriangle size={16} />
                  )}
                  Confirm Send
                </button>
                <button
                  onClick={() => setConfirmSend(false)}
                  className="px-3 py-2.5 text-sm text-text-gray hover:text-text-light transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {upcoming.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-light uppercase tracking-[0.1em] text-text-light mb-4">
                Upcoming Emails
              </h2>
              <div className="glass-card rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-4 py-3 text-left text-xs font-light uppercase tracking-wider text-text-gray">
                        Recipient
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-light uppercase tracking-wider text-text-gray">
                        Subject
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-light uppercase tracking-wider text-text-gray">
                        Sequence
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-light uppercase tracking-wider text-text-gray">
                        Scheduled
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {upcoming.map((email) => (
                      <tr
                        key={email.id}
                        className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="px-4 py-3 text-sm text-text-light font-light">
                          {email.recipientEmail}
                        </td>
                        <td className="px-4 py-3 text-sm text-text-light/80 font-light">
                          {email.subject}
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs text-accent-sapphire/70 bg-accent-sapphire/10 px-2 py-0.5 rounded">
                            {email.sequence} #{email.step}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-text-gray/60 font-light">
                          {new Date(email.scheduledAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {recent.length > 0 && (
            <div>
              <h2 className="text-lg font-light uppercase tracking-[0.1em] text-text-light mb-4">
                Recently Sent
              </h2>
              <div className="glass-card rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-4 py-3 text-left text-xs font-light uppercase tracking-wider text-text-gray">
                        Recipient
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-light uppercase tracking-wider text-text-gray">
                        Subject
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-light uppercase tracking-wider text-text-gray">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-light uppercase tracking-wider text-text-gray">
                        Sent At
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recent.map((email) => (
                      <tr
                        key={email.id}
                        className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="px-4 py-3 text-sm text-text-light font-light">
                          {email.recipientEmail}
                        </td>
                        <td className="px-4 py-3 text-sm text-text-light/80 font-light">
                          {email.subject}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`text-xs uppercase tracking-wider px-2 py-0.5 rounded-full ${
                              email.status === "SENT"
                                ? "bg-emerald-500/10 text-emerald-400"
                                : "bg-red-500/10 text-red-400"
                            }`}
                          >
                            {email.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-text-gray/60 font-light">
                          {email.sentAt
                            ? new Date(email.sentAt).toLocaleString()
                            : "--"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {upcoming.length === 0 && recent.length === 0 && (
            <div className="glass-card rounded-lg p-12 text-center">
              <Mail size={32} className="text-text-gray/30 mx-auto mb-3" />
              <p className="text-text-gray font-light">Email queue is empty.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
