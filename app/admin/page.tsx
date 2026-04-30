"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  UserCheck,
  MessageSquare,
  Users,
  Mail,
  Loader2,
  ArrowRight,
  Compass,
} from "lucide-react";

interface Stats {
  pendingApplications: number;
  pendingComments: number;
  totalMembers: number;
  emailQueue: { pending: number; sent: number; failed: number };
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const [appsRes, commentsRes, usersRes, emailRes] = await Promise.allSettled([
        fetch("/api/admin/applications?status=PENDING"),
        fetch("/api/admin/comments?status=PENDING_REVIEW"),
        fetch("/api/admin/users"),
        fetch("/api/admin/email-queue/status"),
      ]);

      const apps = appsRes.status === "fulfilled" && appsRes.value.ok
        ? await appsRes.value.json()
        : { count: 0 };
      const comments = commentsRes.status === "fulfilled" && commentsRes.value.ok
        ? await commentsRes.value.json()
        : { count: 0 };
      const users = usersRes.status === "fulfilled" && usersRes.value.ok
        ? await usersRes.value.json()
        : { count: 0, memberCount: 0 };
      const email = emailRes.status === "fulfilled" && emailRes.value.ok
        ? await emailRes.value.json()
        : { pending: 0, sent: 0, failed: 0 };

      setStats({
        pendingApplications: apps.count || 0,
        pendingComments: comments.count || 0,
        // The "Total Members" tile means active Consilium members, not
        // registered users. Endpoint returns both: memberCount is the
        // membership table count, count is the user table count.
        totalMembers: users.memberCount ?? 0,
        emailQueue: {
          pending: email.pending || 0,
          sent: email.sent || 0,
          failed: email.failed || 0,
        },
      });
      setLoading(false);
    }

    fetchStats();
  }, []);

  const cards = [
    {
      label: "Pending Applications",
      value: stats?.pendingApplications ?? 0,
      icon: UserCheck,
      href: "/admin/applications",
      accent: "text-amber-400",
    },
    {
      label: "Pending Comments",
      value: stats?.pendingComments ?? 0,
      icon: MessageSquare,
      href: "/admin/comments",
      accent: "text-accent-sapphire",
    },
    {
      label: "Total Members",
      value: stats?.totalMembers ?? 0,
      icon: Users,
      href: "/admin/members",
      accent: "text-emerald-400",
    },
    {
      label: "Email Queue",
      value: stats?.emailQueue.pending ?? 0,
      icon: Mail,
      href: "/admin/email-queue",
      accent: "text-accent-gold",
    },
    {
      label: "Traffic Sources",
      // Value omitted on the tile, the destination page renders the
      // full source/campaign/country breakdown for the chosen window.
      value: "—",
      icon: Compass,
      href: "/admin/traffic",
      accent: "text-accent-sapphire",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-light uppercase tracking-[0.15em] text-text-light mb-8">
        Dashboard Overview
      </h1>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-accent-gold" size={32} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map(({ label, value, icon: Icon, href, accent }) => (
            <Link
              key={href}
              href={href}
              className="glass-card rounded-lg p-6 hover:border-accent-gold/30 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon size={24} strokeWidth={1.5} className={accent} />
                <ArrowRight
                  size={16}
                  className="text-text-gray opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                />
              </div>
              <p className="text-3xl font-light text-text-light mb-1">{value}</p>
              <p className="text-sm font-light text-text-gray tracking-wide">{label}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
