"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  UserCheck,
  MessageSquare,
  FileText,
  Mic,
  BookOpen,
  Users,
  Mail,
  BarChart3,
  ArrowLeft,
  LogOut,
  Loader2,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/metrics", label: "Metrics", icon: BarChart3 },
  { href: "/admin/applications", label: "Applications", icon: UserCheck },
  { href: "/admin/comments", label: "Comments", icon: MessageSquare },
  { href: "/admin/posts", label: "Posts", icon: FileText },
  { href: "/admin/voice-notes", label: "Voice Notes", icon: Mic },
  { href: "/admin/courses", label: "Courses", icon: BookOpen },
  { href: "/admin/members", label: "Members", icon: Users },
  { href: "/admin/email-queue", label: "Email Queue", icon: Mail },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin-login");
    } catch {
      setLoggingOut(false);
    }
  }

  return (
    <aside className="w-64 min-h-screen bg-[#050511] border-r border-accent-gold/10 flex flex-col">
      <div className="px-6 py-6 border-b border-accent-gold/10">
        <h1 className="text-lg font-light uppercase tracking-[0.2em] text-accent-gold">
          Admin Panel
        </h1>
      </div>

      <nav className="flex-1 py-4">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-6 py-3 text-sm font-light tracking-wide transition-all duration-200 ${
              isActive(href)
                ? "text-accent-gold bg-accent-gold/5 border-r-2 border-accent-gold"
                : "text-text-gray hover:text-text-light hover:bg-white/[0.02]"
            }`}
          >
            <Icon size={18} strokeWidth={1.5} />
            {label}
          </Link>
        ))}
      </nav>

      <div className="px-6 py-4 border-t border-accent-gold/10 space-y-3">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 text-sm font-light tracking-wide text-text-gray hover:text-accent-gold transition-colors duration-200"
        >
          <ArrowLeft size={18} strokeWidth={1.5} />
          Back to Site
        </Link>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex items-center gap-3 text-sm font-light tracking-wide text-text-gray hover:text-red-400 transition-colors duration-200 disabled:opacity-50"
        >
          {loggingOut ? (
            <Loader2 size={18} strokeWidth={1.5} className="animate-spin" />
          ) : (
            <LogOut size={18} strokeWidth={1.5} />
          )}
          Logout
        </button>
      </div>
    </aside>
  );
}
