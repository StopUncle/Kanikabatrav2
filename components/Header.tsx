"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  User,
  LayoutDashboard,
  Search as SearchIcon,
  ArrowUpRight,
  LogOut,
} from "lucide-react";
import KanikaroseLogo from "./KanikaroseLogo";

/**
 * Header — the main site chrome.
 *
 * Layout hierarchy (desktop):
 *   [Logo]   [primary nav]                [search] [Consilium CTA] [auth]
 *
 * The Consilium is NOT inline in the primary nav — it's a standalone
 * warm-gold CTA on the right. This frees up horizontal space (nav
 * doesn't wrap) and makes the paid destination visually distinct from
 * ordinary navigation.
 *
 * Scroll-shrink: header collapses from 80px to 64px after scrolling
 * 24px. Smooth, pure CSS — nothing re-renders, just a class swap.
 */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Inside the member area the Consilium sidebar owns the mobile nav.
  // Hiding the main Header's hamburger here prevents the stacked-hamburger
  // bug (two toggle buttons, both on the right, both visible).
  const isMemberArea =
    pathname.startsWith("/inner-circle/feed") ||
    pathname.startsWith("/inner-circle/voice-notes") ||
    pathname.startsWith("/inner-circle/classroom") ||
    pathname.startsWith("/inner-circle/forum") ||
    pathname.startsWith("/inner-circle/chat");

  // Primary nav. Home is implicit in the logo click so it's not listed.
  // The Consilium is explicitly NOT in this array — it's a standalone CTA
  // on the right side.
  const navLinks: { href: string; label: string }[] = [
    { href: "/book", label: "Book" },
    { href: "/quiz", label: "Quiz" },
    { href: "/courses", label: "Courses" },
    { href: "/coaching", label: "Coaching" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  const isConsiliumActive = pathname.startsWith("/inner-circle");

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch("/api/auth/me");
        setIsLoggedIn(response.ok);
      } catch {
        setIsLoggedIn(false);
      } finally {
        setIsCheckingAuth(false);
      }
    }
    checkAuth();
  }, []);

  // Shrink the header after a small scroll threshold. The 24px threshold
  // means the full-size header persists on the hero but collapses as
  // soon as the user starts reading — a standard premium pattern.
  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setIsLoggedIn(false);
    setIsMenuOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-deep-black/85 backdrop-blur-xl border-b transition-all duration-300 ${
          isScrolled
            ? "border-warm-gold/20 shadow-[0_4px_24px_-12px_rgba(212,175,55,0.2)]"
            : "border-warm-gold/10"
        }`}
      >
        <nav className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1440px] mx-auto">
            <div
              className={`flex items-center justify-between transition-all duration-300 ${
                isScrolled ? "h-14 sm:h-16" : "h-16 sm:h-20"
              }`}
            >
              {/* Logo */}
              <Link
                href="/"
                className="flex items-center group shrink-0"
                aria-label="Kanikarose — home"
              >
                <KanikaroseLogo
                  size={isScrolled ? "sm" : "md"}
                  className="transition-all duration-300 group-hover:scale-[1.03]"
                />
              </Link>

              {/* Desktop Primary Nav */}
              <div className="hidden lg:flex items-center gap-x-1 xl:gap-x-2">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`relative px-3 xl:px-4 py-2 text-[11px] xl:text-xs tracking-[0.18em] uppercase transition-colors duration-300 ${
                        isActive
                          ? "text-warm-gold"
                          : "text-text-gray/75 hover:text-warm-gold"
                      }`}
                    >
                      {link.label}
                      {/* Active / hover hairline */}
                      <span
                        className={`absolute left-3 xl:left-4 right-3 xl:right-4 bottom-1 h-px transition-all duration-300 ${
                          isActive
                            ? "bg-warm-gold opacity-100"
                            : "bg-warm-gold opacity-0 hover:opacity-60"
                        }`}
                      />
                    </Link>
                  );
                })}
              </div>

              {/* Desktop Right Group: Search · Consilium CTA · Auth */}
              <div className="hidden lg:flex items-center gap-3 shrink-0">
                <Link
                  href="/search"
                  aria-label="Search"
                  className="p-2 text-text-gray/70 hover:text-warm-gold transition-colors rounded-full"
                >
                  <SearchIcon size={16} strokeWidth={1.5} />
                </Link>

                {/* The Consilium — standalone CTA. Warm-gold metallic
                    to match the logo. Small arrow-up-right reinforces
                    "enter a separate space". */}
                <Link
                  href="/inner-circle"
                  className={`group relative inline-flex items-center gap-1.5 pl-4 pr-3 py-1.5 rounded-full border text-[11px] tracking-[0.22em] uppercase transition-all duration-300 whitespace-nowrap ${
                    isConsiliumActive
                      ? "text-deep-black bg-warm-gold border-warm-gold shadow-[0_0_20px_-4px_rgba(212,175,55,0.55)]"
                      : "text-warm-gold border-warm-gold/60 hover:border-warm-gold hover:bg-warm-gold/10 hover:shadow-[0_0_20px_-6px_rgba(212,175,55,0.5)]"
                  }`}
                >
                  <span>The Consilium</span>
                  <ArrowUpRight
                    size={13}
                    strokeWidth={1.5}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>

                {/* Auth */}
                {!isCheckingAuth && (
                  <div className="flex items-center gap-2 pl-3 ml-1 border-l border-warm-gold/15">
                    {isLoggedIn ? (
                      <>
                        <Link
                          href="/profile"
                          aria-label="Profile"
                          className={`p-2 rounded-full transition-colors ${
                            pathname === "/profile"
                              ? "text-warm-gold bg-warm-gold/10"
                              : "text-text-gray/70 hover:text-warm-gold hover:bg-warm-gold/5"
                          }`}
                        >
                          <User size={16} strokeWidth={1.5} />
                        </Link>
                        <Link
                          href="/dashboard"
                          aria-label="Dashboard"
                          className={`p-2 rounded-full transition-colors ${
                            pathname === "/dashboard"
                              ? "text-warm-gold bg-warm-gold/10"
                              : "text-text-gray/70 hover:text-warm-gold hover:bg-warm-gold/5"
                          }`}
                        >
                          <LayoutDashboard size={16} strokeWidth={1.5} />
                        </Link>
                        <button
                          onClick={handleLogout}
                          aria-label="Logout"
                          className="p-2 rounded-full text-text-gray/70 hover:text-warm-gold hover:bg-warm-gold/5 transition-colors"
                        >
                          <LogOut size={16} strokeWidth={1.5} />
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          className={`px-3 py-1.5 text-[11px] tracking-[0.18em] uppercase transition-colors duration-300 ${
                            pathname === "/login"
                              ? "text-warm-gold"
                              : "text-text-gray/80 hover:text-warm-gold"
                          }`}
                        >
                          Login
                        </Link>
                        <Link
                          href="/register"
                          className="px-4 py-1.5 text-[11px] tracking-[0.22em] uppercase rounded-full border border-warm-gold/50 text-warm-gold hover:bg-warm-gold/10 hover:border-warm-gold transition-all duration-300"
                        >
                          Register
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Menu Button — hidden inside the member area so it
                  doesn't stack with the Consilium sidebar's toggle. */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`${isMemberArea ? "hidden" : "lg:hidden"} relative w-10 h-10 flex items-center justify-center`}
                aria-label="Toggle menu"
              >
                <div className="relative w-6 h-5 flex flex-col justify-between">
                  <span
                    className={`block h-px bg-warm-gold transition-all duration-300 origin-center ${
                      isMenuOpen ? "rotate-45 translate-y-2" : ""
                    }`}
                  />
                  <span
                    className={`block h-px bg-warm-gold transition-all duration-300 ${
                      isMenuOpen ? "opacity-0 scale-0" : ""
                    }`}
                  />
                  <span
                    className={`block h-px bg-warm-gold transition-all duration-300 origin-center ${
                      isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay — outside <header> for stacking context */}
      <div
        className={`lg:hidden fixed inset-0 top-16 sm:top-20 z-[100] bg-deep-black/98 backdrop-blur-xl transition-all duration-500 touch-pan-y ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className={`h-full flex flex-col px-6 py-6 overflow-y-auto overscroll-contain transition-all duration-500 delay-100 ${
            isMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0"
          }`}
        >
          {/* Consilium lives at the TOP on mobile — it's the primary
              commercial destination, so it shouldn't be buried under
              seven secondary links. */}
          <Link
            href="/inner-circle"
            onClick={() => setIsMenuOpen(false)}
            className={`group relative flex items-center justify-between px-5 py-4 rounded-full border transition-all duration-300 ${
              isConsiliumActive
                ? "text-deep-black bg-warm-gold border-warm-gold"
                : "text-warm-gold border-warm-gold/60 hover:border-warm-gold"
            }`}
          >
            <span className="text-sm tracking-[0.25em] uppercase font-light">
              The Consilium
            </span>
            <ArrowUpRight
              size={18}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>

          {/* Primary Nav */}
          <div className="flex-1 flex flex-col justify-start pt-6">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group py-3 transition-all duration-300"
                  style={{ transitionDelay: `${index * 40}ms` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xl sm:text-2xl font-extralight tracking-[0.18em] uppercase transition-colors duration-300 ${
                        isActive
                          ? "text-warm-gold"
                          : "text-text-gray/75 group-hover:text-warm-gold"
                      }`}
                    >
                      {link.label}
                    </span>
                    <span
                      className={`w-6 h-px transition-all duration-300 ${
                        isActive
                          ? "bg-warm-gold w-10"
                          : "bg-warm-gold/20 group-hover:bg-warm-gold/60"
                      }`}
                    />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Utility: Search */}
          <Link
            href="/search"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-3 py-3 text-sm tracking-[0.18em] uppercase text-text-gray/70 hover:text-warm-gold transition-colors border-t border-warm-gold/10 mt-2"
          >
            <SearchIcon size={16} strokeWidth={1.5} />
            Search
          </Link>

          {/* Mobile Auth Section */}
          {!isCheckingAuth && (
            <div className="pt-6 mt-2 border-t border-warm-gold/15">
              {isLoggedIn ? (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/profile"
                    className="flex items-center justify-center gap-3 py-3 text-sm tracking-[0.18em] uppercase text-warm-gold transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={18} strokeWidth={1.5} />
                    Profile
                  </Link>
                  <Link
                    href="/dashboard"
                    className="flex items-center justify-center gap-3 py-3 text-sm tracking-[0.18em] uppercase text-warm-gold transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LayoutDashboard size={18} strokeWidth={1.5} />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-3 py-3 text-sm tracking-[0.18em] uppercase text-text-gray/70 hover:text-warm-gold transition-colors"
                  >
                    <LogOut size={18} strokeWidth={1.5} />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="py-3 text-center text-xs tracking-[0.22em] uppercase text-text-gray/80 hover:text-warm-gold border border-warm-gold/20 hover:border-warm-gold/50 rounded-full transition-all duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="py-3 text-center text-xs tracking-[0.22em] uppercase text-warm-gold border border-warm-gold/60 hover:bg-warm-gold/10 hover:border-warm-gold rounded-full transition-all duration-300"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Mobile Footer Accent */}
          <div className="pt-6 pb-2 flex justify-center">
            <KanikaroseLogo size="sm" iconOnly className="opacity-30" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
