"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  X,
  LogOut,
  BookOpen,
  Calendar,
  Home,
  Users,
  Brain,
  GraduationCap,
  Settings,
  CheckCircle,
  ArrowUpRight,
} from "lucide-react";
import SettingsModal from "./SettingsModal";

interface DashboardHeaderProps {
  userEmail: string;
  /** Optional display name for the Settings modal. The dashboard fetches
   *  the canonical name server-side and passes it down; if omitted, the
   *  modal still works but ProfileSettings will start with an empty
   *  field. */
  userName?: string | null;
}

const DashboardHeader = ({ userEmail, userName = null }: DashboardHeaderProps) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState<
    "profile" | "security" | "preferences" | "danger"
  >("profile");
  const [toast, setToast] = useState<string | null>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close the profile dropdown on outside click. Without this it stays
  // open until the user clicks the chip again, which traps the menu
  // open if they navigate to a Link inside it (the Link fires before
  // setIsProfileOpen runs in the same tick).
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    }
    if (isProfileOpen) {
      document.addEventListener("mousedown", onDocClick);
      return () => document.removeEventListener("mousedown", onDocClick);
    }
  }, [isProfileOpen]);

  // Auto-dismiss the toast.
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(t);
  }, [toast]);

  // Consilium is intentionally pulled OUT of the standard nav array and
  // rendered as a distinct gold pill on the right (next to the profile
  // chip) so it's the most visually distinct link in the chrome, every
  // dashboard view has a one-tap shortcut to the member space without
  // needing the user to remember it lives among the secondary links.
  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/quiz", label: "Quiz", icon: Brain },
    { href: "/book", label: "The Book", icon: BookOpen },
    { href: "/courses", label: "Courses", icon: GraduationCap },
    { href: "/coaching", label: "Coaching", icon: Calendar },
  ];

  // Mobile-menu nav. Includes Consilium so the hamburger surface still
  // exposes the shortcut; the desktop layout shows it as the gold pill.
  const mobileMenuLinks = [
    ...navLinks,
    { href: "/consilium/feed", label: "The Consilium", icon: Users },
  ];

  const handleLogout = async () => {
    const response = await fetch("/api/auth/logout", { method: "POST" });
    if (response.ok) {
      window.location.href = "/login";
    }
  };

  const openSettings = (tab: typeof settingsTab) => {
    setSettingsTab(tab);
    setIsSettingsOpen(true);
    setIsProfileOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-deep-black/80 backdrop-blur-md border-b border-warm-gold/10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link
              href="/dashboard"
              className="flex items-center space-x-2 shrink-0"
            >
              <span className="text-xl sm:text-2xl font-light gradient-text-gold">
                Kanika Batra
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-5 lg:space-x-7">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 text-text-gray hover:text-warm-gold transition-colors duration-300 font-light text-sm lg:text-[15px]"
                >
                  <link.icon size={16} strokeWidth={1.5} />
                  {link.label}
                </Link>
              ))}

              {/* The Consilium, distinct gold pill, sits between the
                  standard nav and the profile chip so it's the most
                  visually charged link in the chrome. */}
              <Link
                href="/consilium/feed"
                className="group inline-flex items-center gap-1.5 pl-4 pr-3 py-1.5 rounded-full border border-warm-gold/60 text-warm-gold text-[11px] tracking-[0.22em] uppercase whitespace-nowrap hover:border-warm-gold hover:bg-warm-gold/10 hover:shadow-[0_0_20px_-6px_rgba(212,175,55,0.5)] transition-all duration-300"
              >
                The Consilium
                <ArrowUpRight
                  size={13}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

              {/* Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-deep-black/60 border border-warm-gold/15 hover:border-warm-gold/35 transition-colors"
                  aria-haspopup="menu"
                  aria-expanded={isProfileOpen}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-warm-gold/40 to-deep-burgundy flex items-center justify-center">
                    <span className="text-sm font-medium text-deep-black">
                      {userEmail.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-text-light text-sm hidden lg:inline">
                    {userEmail.split("@")[0]}
                  </span>
                </button>

                {isProfileOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 mt-2 w-60 bg-deep-black/95 backdrop-blur-md rounded-xl shadow-2xl border border-warm-gold/20 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-warm-gold/15">
                      <p className="text-warm-gold/70 text-[10px] uppercase tracking-[0.3em] mb-0.5">
                        Signed in as
                      </p>
                      <p className="text-sm text-text-light truncate">
                        {userEmail}
                      </p>
                    </div>
                    <div className="py-1">
                      <ProfileMenuItem
                        icon={Settings}
                        label="Profile"
                        onClick={() => openSettings("profile")}
                      />
                      <ProfileMenuItem
                        icon={Settings}
                        label="Security"
                        onClick={() => openSettings("security")}
                      />
                      <ProfileMenuItem
                        icon={Settings}
                        label="Notifications"
                        onClick={() => openSettings("preferences")}
                      />
                    </div>
                    <div className="border-t border-warm-gold/15 py-1">
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2.5 text-left text-text-light hover:bg-warm-gold/[0.06] hover:text-warm-gold transition-colors flex items-center gap-2.5 text-sm"
                      >
                        <LogOut size={15} strokeWidth={1.5} />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-text-gray hover:text-warm-gold transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-20 left-0 right-0 bg-deep-black/95 backdrop-blur-md border-b border-warm-gold/15 max-h-[calc(100vh-5rem)] overflow-y-auto">
              <div className="flex flex-col px-4 py-5 gap-1">
                <div className="pb-4 mb-2 border-b border-warm-gold/15">
                  <p className="text-warm-gold/70 text-[10px] uppercase tracking-[0.3em] mb-1">
                    Signed in as
                  </p>
                  <p className="text-sm text-text-light truncate">
                    {userEmail}
                  </p>
                </div>

                {mobileMenuLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 transition-colors py-2.5 px-2 rounded-lg text-[15px] ${
                      link.href === "/consilium/feed"
                        ? "text-warm-gold font-medium hover:bg-warm-gold/[0.06]"
                        : "text-text-light hover:text-warm-gold hover:bg-warm-gold/[0.04]"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <link.icon size={18} strokeWidth={1.5} />
                    {link.label}
                  </Link>
                ))}

                <div className="mt-2 pt-3 border-t border-warm-gold/15">
                  <p className="text-warm-gold/70 text-[10px] uppercase tracking-[0.3em] mb-2 px-2">
                    Account
                  </p>
                  <MobileSettingsButton
                    label="Profile"
                    onClick={() => openSettings("profile")}
                  />
                  <MobileSettingsButton
                    label="Security"
                    onClick={() => openSettings("security")}
                  />
                  <MobileSettingsButton
                    label="Notifications"
                    onClick={() => openSettings("preferences")}
                  />
                  <MobileSettingsButton
                    label="Danger zone"
                    danger
                    onClick={() => openSettings("danger")}
                  />
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 text-red-400 hover:text-red-300 transition-colors py-2.5 px-2 rounded-lg mt-2 pt-4 border-t border-warm-gold/15 text-[15px]"
                >
                  <LogOut size={18} strokeWidth={1.5} />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Settings modal — owned by the header so it's reachable from
          every dashboard surface, not just one in-page card. */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        activeTab={settingsTab}
        onTabChange={setSettingsTab}
        email={userEmail}
        name={userName}
        onProfileUpdate={() => {
          // Re-render the server component so the new name flows back
          // into the dashboard's H1 + everywhere else it's surfaced.
          router.refresh();
        }}
        onPasswordChange={() => {
          // No follow-up state to update on the dashboard for this.
        }}
        onSuccess={(message) => setToast(message)}
      />

      {toast && (
        <div className="fixed top-24 right-4 sm:right-6 z-[60] flex items-center gap-2 bg-deep-black/95 border border-warm-gold/40 rounded-lg px-4 py-3 text-warm-gold shadow-2xl animate-fade-in">
          <CheckCircle className="w-4 h-4" />
          <span className="text-sm">{toast}</span>
        </div>
      )}
    </>
  );
};

function ProfileMenuItem({
  icon: Icon,
  label,
  onClick,
}: {
  icon: typeof Settings;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      role="menuitem"
      className="w-full px-4 py-2.5 text-left text-text-light hover:bg-warm-gold/[0.06] hover:text-warm-gold transition-colors flex items-center gap-2.5 text-sm"
    >
      <Icon size={15} strokeWidth={1.5} />
      {label}
    </button>
  );
}

function MobileSettingsButton({
  label,
  onClick,
  danger = false,
}: {
  label: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 text-left transition-colors py-2.5 px-2 rounded-lg text-[15px] ${
        danger
          ? "text-red-400 hover:bg-red-500/[0.05]"
          : "text-text-light hover:text-warm-gold hover:bg-warm-gold/[0.04]"
      }`}
    >
      <Settings size={18} strokeWidth={1.5} />
      {label}
    </button>
  );
}

export default DashboardHeader;
