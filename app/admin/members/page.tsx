"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Loader2,
  Search,
  Ban,
  Shield,
  ShieldCheck,
  ShieldAlert,
  MoreVertical,
  UserX,
  UserCheck,
  VolumeX,
  MessageSquare,
  Fingerprint,
} from "lucide-react";

interface Member {
  id: string;
  email: string;
  name: string | null;
  displayName: string | null;
  role: string;
  isBanned: boolean;
  banReason: string | null;
  messagingRestricted: boolean;
  messagingRestrictedReason: string | null;
  createdAt: string;
  membershipStatus: string | null;
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const data = await res.json();
        setMembers(data.users || []);
      }
    } catch (err) {
      console.error("Failed to fetch members:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  async function handleAction(
    userId: string,
    action:
      | "ban"
      | "unban"
      | "set-role"
      | "restrict-messaging"
      | "unrestrict-messaging",
    role?: string,
  ) {
    setActionLoading(userId);
    setOpenMenu(null);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, role }),
      });
      if (res.ok) {
        fetchMembers();
      }
    } catch (err) {
      console.error(`Failed to ${action} user:`, err);
    } finally {
      setActionLoading(null);
    }
  }

  const filtered = members.filter((m) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      m.email.toLowerCase().includes(q) ||
      (m.name || "").toLowerCase().includes(q) ||
      (m.displayName || "").toLowerCase().includes(q)
    );
  });

  function getRoleIcon(role: string) {
    if (role === "ADMIN") return <ShieldAlert size={14} className="text-accent-gold" />;
    if (role === "MODERATOR") return <ShieldCheck size={14} className="text-accent-sapphire" />;
    return <Shield size={14} className="text-text-gray/50" />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-light uppercase tracking-[0.15em] text-text-light mb-8">
        Members
      </h1>

      <FingerprintLookup />

      <div className="relative mb-6">
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-text-gray/50"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by email or name..."
          className="w-full bg-white/[0.03] border border-white/10 rounded pl-11 pr-4 py-3 text-text-light text-sm font-light focus:border-accent-gold/40 focus:outline-none transition-colors"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-accent-gold" size={32} />
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass-card rounded-lg p-12 text-center">
          <p className="text-text-gray font-light">
            {searchQuery ? "No matching members." : "No members found."}
          </p>
        </div>
      ) : (
        <div className="glass-card rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 text-left text-xs font-light uppercase tracking-wider text-text-gray">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-light uppercase tracking-wider text-text-gray">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-light uppercase tracking-wider text-text-gray">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-light uppercase tracking-wider text-text-gray">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-light uppercase tracking-wider text-text-gray">
                  Membership
                </th>
                <th className="px-6 py-4 text-left text-xs font-light uppercase tracking-wider text-text-gray">
                  Joined
                </th>
                <th className="px-6 py-4 text-right text-xs font-light uppercase tracking-wider text-text-gray">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((member) => (
                <tr
                  key={member.id}
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-text-light font-light">
                    {member.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-text-light/80 font-light">
                    {member.displayName || member.name || "--"}
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-xs uppercase tracking-wider">
                      {getRoleIcon(member.role)}
                      <span className="text-text-gray">{member.role}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      {member.isBanned ? (
                        <span className="inline-flex items-center gap-1 text-xs text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full w-fit">
                          <Ban size={10} /> Banned
                        </span>
                      ) : (
                        <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full w-fit">
                          Active
                        </span>
                      )}
                      {member.messagingRestricted && (
                        <span
                          className="inline-flex items-center gap-1 text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full w-fit"
                          title={member.messagingRestrictedReason || undefined}
                        >
                          <VolumeX size={10} /> Muted
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {member.membershipStatus ? (
                      <span
                        className={`text-xs uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          member.membershipStatus === "ACTIVE"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : member.membershipStatus === "PENDING"
                              ? "bg-amber-500/10 text-amber-400"
                              : "bg-zinc-500/10 text-zinc-400"
                        }`}
                      >
                        {member.membershipStatus}
                      </span>
                    ) : (
                      <span className="text-xs text-text-gray/40">--</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-text-gray/60 font-light">
                    {new Date(member.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right relative">
                    {actionLoading === member.id ? (
                      <Loader2 size={16} className="animate-spin text-accent-gold ml-auto" />
                    ) : (
                      <div className="relative inline-block">
                        <button
                          onClick={() =>
                            setOpenMenu(openMenu === member.id ? null : member.id)
                          }
                          className="p-1.5 text-text-gray hover:text-text-light transition-colors rounded"
                        >
                          <MoreVertical size={16} />
                        </button>

                        {openMenu === member.id && (
                          <div className="absolute right-0 top-full mt-1 w-48 bg-[#0a0a1a] border border-white/10 rounded-lg shadow-xl z-10 py-1">
                            {member.isBanned ? (
                              <button
                                onClick={() => handleAction(member.id, "unban")}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left text-emerald-400 hover:bg-white/[0.03] transition-colors"
                              >
                                <UserCheck size={14} /> Unban
                              </button>
                            ) : (
                              <button
                                onClick={() => handleAction(member.id, "ban")}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left text-red-400 hover:bg-white/[0.03] transition-colors"
                              >
                                <UserX size={14} /> Ban User
                              </button>
                            )}
                            {member.messagingRestricted ? (
                              <button
                                onClick={() =>
                                  handleAction(member.id, "unrestrict-messaging")
                                }
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left text-emerald-400 hover:bg-white/[0.03] transition-colors"
                              >
                                <MessageSquare size={14} /> Unmute Messaging
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  handleAction(member.id, "restrict-messaging")
                                }
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left text-amber-400 hover:bg-white/[0.03] transition-colors"
                              >
                                <VolumeX size={14} /> Mute Messaging
                              </button>
                            )}
                            <div className="border-t border-white/5 my-1" />
                            <button
                              onClick={() => handleAction(member.id, "set-role", "MEMBER")}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left text-text-gray hover:bg-white/[0.03] transition-colors"
                            >
                              <Shield size={14} /> Set Member
                            </button>
                            <button
                              onClick={() =>
                                handleAction(member.id, "set-role", "MODERATOR")
                              }
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left text-accent-sapphire hover:bg-white/[0.03] transition-colors"
                            >
                              <ShieldCheck size={14} /> Set Moderator
                            </button>
                            <button
                              onClick={() => handleAction(member.id, "set-role", "ADMIN")}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left text-accent-gold hover:bg-white/[0.03] transition-colors"
                            >
                              <ShieldAlert size={14} /> Set Admin
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/**
 * Leak-attribution tool. Pastes an 8-hex SID found in an external video or
 * screenshot, returns the exact member whose dashboard was filmed. Sits at
 * the top of the Members page so it's the first thing an admin sees when a
 * leak is reported.
 */
function FingerprintLookup() {
  const [sid, setSid] = useState("");
  const [loading, setLoading] = useState(false);
  const [match, setMatch] = useState<null | {
    id: string;
    email: string;
    name: string | null;
    displayName: string | null;
    role: string;
    isBanned: boolean;
    fingerprint: string;
  }>(null);
  const [noMatch, setNoMatch] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function lookup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMatch(null);
    setNoMatch(false);
    setError(null);
    try {
      const res = await fetch("/api/admin/fingerprint-lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fingerprint: sid.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Lookup failed");
      } else if (data.match) {
        setMatch(data.match);
      } else {
        setNoMatch(true);
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glass-card rounded-lg p-5 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Fingerprint size={14} className="text-accent-gold" />
        <h2 className="text-sm font-light uppercase tracking-[0.15em] text-text-light">
          Leak Attribution
        </h2>
      </div>
      <p className="text-text-gray/70 text-xs font-light mb-4 leading-relaxed">
        Every member page watermarks a hidden 8-character session ID in the
        bottom-right. If content from inside the Consilium appears externally,
        paste the SID from the footage here to identify the account that
        filmed it.
      </p>
      <form onSubmit={lookup} className="flex gap-2 flex-wrap">
        <input
          type="text"
          value={sid}
          onChange={(e) => setSid(e.target.value)}
          placeholder="e.g. A1b2c3d4"
          maxLength={16}
          className="flex-1 min-w-[180px] bg-white/[0.03] border border-white/10 rounded px-4 py-2.5 text-text-light text-sm font-mono tracking-wider focus:border-accent-gold/40 focus:outline-none transition-colors"
        />
        <button
          type="submit"
          disabled={loading || !sid.trim()}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-light tracking-wide bg-accent-gold/10 text-accent-gold border border-accent-gold/30 rounded hover:bg-accent-gold/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
          Look Up
        </button>
      </form>

      {error && (
        <p className="mt-3 text-xs text-red-400">{error}</p>
      )}
      {noMatch && (
        <p className="mt-3 text-xs text-text-gray">
          No member matches that SID. Check the characters, it&apos;s case-insensitive, 8 hex chars.
        </p>
      )}
      {match && (
        <div className="mt-4 p-4 rounded-lg border border-red-500/30 bg-red-500/[0.04]">
          <p className="text-[10px] uppercase tracking-[0.2em] text-red-400/70 mb-2">
            Match · {match.fingerprint}
          </p>
          <p className="text-text-light font-light">
            {match.displayName || match.name || "(no display name)"}
            <span className="text-text-gray text-sm ml-2">
              {match.email}
            </span>
          </p>
          <p className="text-text-gray text-xs mt-1">
            Role: {match.role}
            {match.isBanned ? " · ALREADY BANNED" : ""}
          </p>
          <p className="text-text-gray/50 text-[10px] mt-2 font-mono">
            ID: {match.id}
          </p>
        </div>
      )}
    </div>
  );
}
