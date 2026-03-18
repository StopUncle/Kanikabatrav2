"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { MANIPULATION_QUIZ, getResult } from "@/lib/quiz-manipulation";
import type { QuizResult } from "@/lib/quiz-manipulation";

// ─── Analytics ─────────────────────────────────────────────
function trackEvent(name: string, params?: Record<string, string>) {
  try {
    const w = window as unknown as {
      gtag?: (...args: unknown[]) => void;
      fbq?: (...args: unknown[]) => void;
    };
    w.gtag?.("event", name, params);
    w.fbq?.("trackCustom", name, params);
  } catch {
    /* analytics should never break the page */
  }
}

function withUtm(url: string, campaign: string) {
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}utm_source=kanikarose&utm_medium=linkinbio&utm_campaign=${campaign}`;
}

// ─── Main Page ─────────────────────────────────────────────
export default function LinksPage() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [landingVideoPlaying, setLandingVideoPlaying] = useState(false);
  const landingVideoRef = useRef<HTMLVideoElement>(null);
  const landingVideoContainerRef = useRef<HTMLDivElement>(null);

  // Autoplay muted on scroll into view
  useEffect(() => {
    const video = landingVideoRef.current;
    const container = landingVideoContainerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.muted = true;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-[#f5f0ed]">
      <style jsx>{`
        @keyframes miniFloat {
          0%,
          100% {
            transform: rotateY(-8deg) translateY(0);
          }
          50% {
            transform: rotateY(-8deg) translateY(-4px);
          }
        }
      `}</style>
      {/* ── HERO ── */}
      <section className="px-5 pt-14 pb-8 text-center">
        <h1
          className="text-[2rem] font-light tracking-[0.35em] uppercase"
          style={{
            fontFamily: "Didot, 'Bodoni MT', 'GFS Didot', Georgia, serif",
          }}
        >
          Kanika Batra
        </h1>
        <p className="mt-3 text-[#d4af37] text-base tracking-wide italic">
          I see what you can&apos;t.
        </p>
        <p className="mt-2 text-[#6b7280] text-xs tracking-[0.12em] uppercase">
          Diagnosed ASPD &middot; Author &middot; Coloratura Soprano
        </p>
      </section>

      {/* ── OPTIONS ── */}
      <section className="px-5 pb-8 max-w-md mx-auto">
        {/* BOOK — Primary CTA with golden glow + floating mini book */}
        <a
          href="#books"
          onClick={() => trackEvent("book_click")}
          className="group block w-full mb-4 relative overflow-hidden rounded-2xl bg-[#0a0a14] p-5 active:scale-[0.98] transition-all"
          style={{
            border: "1px solid rgba(212, 175, 55, 0.3)",
            boxShadow:
              "0 0 20px rgba(212, 175, 55, 0.08), 0 0 40px rgba(212, 175, 55, 0.04), inset 0 1px 0 rgba(212, 175, 55, 0.1)",
          }}
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#d4af37]/[0.03] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative flex items-center gap-4">
            {/* Mini floating book */}
            <div
              className="w-14 h-[72px] shrink-0 relative"
              style={{ perspective: "200px" }}
            >
              <div
                className="w-full h-full rounded-sm shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg, #1a0d11 0%, #2a0f18 50%, #1a0d11 100%)",
                  border: "1px solid rgba(212, 175, 55, 0.2)",
                  transform: "rotateY(-8deg)",
                  animation: "miniFloat 4s ease-in-out infinite",
                }}
              >
                <div className="h-full flex flex-col items-center justify-center p-1.5">
                  <p className="text-[#f5f0ed] text-[6px] font-light tracking-wider text-center leading-tight uppercase">
                    Sociopathic
                    <br />
                    Dating
                    <br />
                    Bible
                  </p>
                  <div className="w-5 h-px bg-[#d4af37]/40 my-1" />
                  <p className="text-[#d4af37] text-[5px] tracking-widest uppercase">
                    KB
                  </p>
                </div>
              </div>
              {/* Book spine */}
              <div
                className="absolute left-0 top-0 w-[5px] h-full rounded-l-sm"
                style={{
                  background: "linear-gradient(to right, #0a0608, #1a0d11)",
                  transform: "rotateY(90deg) translateZ(2px)",
                }}
              />
            </div>
            <div>
              <p className="text-[#f5f0ed] font-semibold text-base leading-tight group-hover:text-[#d4af37] transition-colors">
                Get the Books
              </p>
              <p className="text-[#d4af37]/60 text-xs mt-1">
                Honeytrap &middot; Sociopathic Dating Bible
              </p>
            </div>
            <svg
              className="w-5 h-5 text-[#d4af37]/40 ml-auto shrink-0 group-hover:translate-x-0.5 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </a>

        {/* Secondary options — stacked list */}
        <div className="space-y-2">
          <button
            onClick={() => {
              trackEvent("quiz_start");
              setShowQuiz(true);
            }}
            className="w-full flex items-center gap-3.5 rounded-xl bg-[#0a0a14] border border-[#1a1a2e] hover:border-[#d4af37]/20 p-3.5 text-left active:scale-[0.98] transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-[#720921]/20 border border-[#720921]/30 flex items-center justify-center shrink-0">
              <svg
                className="w-4.5 h-4.5 text-[#d4af37]/80"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-[#f5f0ed] font-medium text-sm">
                How Easily Can You Be Manipulated?
              </p>
              <p className="text-[#6b7280] text-[11px] mt-0.5">
                Free quiz &middot; 2 minutes
              </p>
            </div>
            <svg
              className="w-4 h-4 text-[#6b7280]/40 ml-auto shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>

          <a
            href={withUtm("/ask", "ama")}
            onClick={() => trackEvent("qa_click")}
            className="flex items-center gap-3.5 rounded-xl bg-[#0a0a14] border border-[#1a1a2e] hover:border-[#d4af37]/20 p-3.5 active:scale-[0.98] transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-[#720921]/20 border border-[#720921]/30 flex items-center justify-center shrink-0">
              <svg
                className="w-4.5 h-4.5 text-[#d4af37]/80"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-[#f5f0ed] font-medium text-sm">
                Ask Me Anything
              </p>
              <p className="text-[#6b7280] text-[11px] mt-0.5">
                Written or voice answer &middot; From $39.99
              </p>
            </div>
            <svg
              className="w-4 h-4 text-[#6b7280]/40 ml-auto shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </a>

          <a
            href={withUtm("/coaching", "coaching")}
            onClick={() => trackEvent("coaching_click")}
            className="flex items-center gap-3.5 rounded-xl bg-[#0a0a14] border border-[#1a1a2e] hover:border-[#d4af37]/20 p-3.5 active:scale-[0.98] transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-[#720921]/20 border border-[#720921]/30 flex items-center justify-center shrink-0">
              <svg
                className="w-4.5 h-4.5 text-[#d4af37]/80"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-[#f5f0ed] font-medium text-sm">
                Book a Private Session
              </p>
              <p className="text-[#6b7280] text-[11px] mt-0.5">
                1:1 coaching &middot; Limited spots
              </p>
            </div>
            <svg
              className="w-4 h-4 text-[#6b7280]/40 ml-auto shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </a>

          <a
            href={withUtm("/", "homepage")}
            onClick={() => trackEvent("homepage_click")}
            className="flex items-center gap-3.5 rounded-xl bg-[#0a0a14] border border-[#1a1a2e] hover:border-[#d4af37]/20 p-3.5 active:scale-[0.98] transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-[#720921]/20 border border-[#720921]/30 flex items-center justify-center shrink-0">
              <svg
                className="w-4.5 h-4.5 text-[#d4af37]/80"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 003 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-[#f5f0ed] font-medium text-sm">
                Explore the Full Site
              </p>
              <p className="text-[#6b7280] text-[11px] mt-0.5">
                Blog, courses, community &amp; more
              </p>
            </div>
            <svg
              className="w-4 h-4 text-[#6b7280]/40 ml-auto shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </a>
        </div>

        {/* Edit AI — polished recommendation card */}
        <a
          href={withUtm("https://edit2ai.com", "editai")}
          onClick={() => trackEvent("editai_click")}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-4 rounded-xl bg-gradient-to-r from-[#d4af37]/5 to-[#d4af37]/10 border border-[#d4af37]/15 hover:border-[#d4af37]/30 p-4 active:scale-[0.98] transition-all"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center shrink-0">
              <svg
                className="w-5 h-5 text-[#d4af37]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-[#d4af37] font-medium text-sm">Edit AI</p>
              <p className="text-[#94a3b8] text-[11px] mt-0.5">
                The tool I use to edit my Reels &middot; Try it free
              </p>
            </div>
            <svg
              className="w-4 h-4 text-[#d4af37]/30 ml-auto shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </div>
        </a>
      </section>

      {/* ── VIDEO ── */}
      <section className="px-5 py-10" ref={landingVideoContainerRef}>
        <div className="relative max-w-[640px] mx-auto rounded-xl overflow-hidden border border-[#d4af37]/10 bg-[#0a0a18] aspect-video">
          <video
            ref={landingVideoRef}
            poster="/images/video-poster-landing.webp"
            preload="metadata"
            playsInline
            muted
            className="w-full h-full object-cover"
            onPlay={() => setLandingVideoPlaying(true)}
            onPause={() => setLandingVideoPlaying(false)}
            onEnded={() => setLandingVideoPlaying(false)}
          >
            <source src="/videos/landing-intro.mp4" type="video/mp4" />
            <track
              kind="captions"
              src="/videos/landing-captions.vtt"
              srcLang="en"
              label="English"
            />
          </video>

          {!landingVideoPlaying && (
            <button
              onClick={() => {
                const v = landingVideoRef.current;
                if (v) {
                  v.muted = false;
                  v.play();
                  trackEvent("video_play_landing");
                }
              }}
              className="absolute inset-0 flex items-center justify-center bg-black/30 group cursor-pointer"
              aria-label="Play video with sound"
            >
              <div className="w-14 h-14 rounded-full bg-[#d4af37]/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-[#d4af37]/20">
                <svg
                  className="w-5 h-5 text-[#050505] ml-0.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          )}
        </div>
        <p className="text-center text-[#6b7280]/60 text-[11px] mt-3 tracking-wider">
          Watch the full introduction
        </p>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className="px-5 py-5 border-t border-b border-[#1a1a2e]">
        <div className="flex items-center justify-center gap-3 text-[#6b7280] text-[11px] tracking-wider uppercase flex-wrap text-center">
          <span>278K+ Instagram</span>
          <span className="text-[#2a2a3e]">&middot;</span>
          <span>157K+ YouTube</span>
          <span className="text-[#2a2a3e]">&middot;</span>
          <span>Author of 2 books</span>
          <span className="text-[#2a2a3e]">&middot;</span>
          <span>As seen on LADbible</span>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="px-5 py-12 max-w-md mx-auto text-center">
        <div className="w-24 h-24 rounded-full mx-auto mb-6 bg-gradient-to-br from-[#720921] to-[#0a1628] border-2 border-[#d4af37]/20 flex items-center justify-center">
          <span
            className="text-[#d4af37] text-2xl font-light tracking-[0.2em]"
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}
          >
            KB
          </span>
        </div>
        <p className="text-[#94a3b8] text-sm leading-relaxed">
          Diagnosed with Antisocial Personality Disorder at 21. Former Miss
          Universe and Miss World finalist. I&apos;ve spent years learning to
          read people — now I teach you how.
        </p>
        <button
          onClick={() => {
            trackEvent("quiz_start", { source: "about" });
            setShowQuiz(true);
          }}
          className="mt-6 px-6 py-3 rounded-full bg-gradient-to-r from-[#720921] to-[#4a0616] text-[#f5f0ed] text-sm font-medium tracking-wider uppercase active:scale-[0.97] transition-transform"
        >
          Take the Quiz
        </button>
      </section>

      {/* ── BOOKS ── */}
      <section id="books" className="px-5 py-12 max-w-md mx-auto">
        <h2
          className="text-center text-xs tracking-[0.3em] uppercase text-[#6b7280] mb-8"
          style={{ fontFamily: "Inter, system-ui, sans-serif" }}
        >
          The Books
        </h2>
        <div className="space-y-4">
          <div
            className="p-5 rounded-xl bg-[#0d0d1a]"
            style={{
              border: "1px solid rgba(212, 175, 55, 0.2)",
              boxShadow:
                "0 0 20px rgba(212, 175, 55, 0.06), 0 0 40px rgba(212, 175, 55, 0.03)",
            }}
          >
            <h3 className="text-[#f5f0ed] font-medium mb-1">
              Sociopathic Dating Bible
            </h3>
            <p className="text-[#6b7280] text-sm mb-3">
              The field guide to never being blindsided again.
            </p>
            <p className="text-[#d4af37]/60 text-xs mb-4">
              Includes bonus chapter + exclusive addendum
            </p>
            <a
              href={withUtm("/book", "sdb")}
              onClick={() => trackEvent("book_click", { book: "sdb" })}
              className="inline-block px-5 py-2.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] text-sm font-medium active:scale-[0.97] transition-transform"
            >
              Get it
            </a>
          </div>

          <div
            className="p-5 rounded-xl bg-[#0d0d1a]"
            style={{
              border: "1px solid rgba(212, 175, 55, 0.2)",
              boxShadow:
                "0 0 20px rgba(212, 175, 55, 0.06), 0 0 40px rgba(212, 175, 55, 0.03)",
            }}
          >
            <h3 className="text-[#f5f0ed] font-medium mb-1">Honeytrap</h3>
            <p className="text-[#6b7280] text-sm mb-4">
              A thriller about the games people play — written by someone who
              plays them.
            </p>
            <span className="inline-block px-5 py-2.5 rounded-full bg-[#1a1a2e]/50 border border-[#1a1a2e] text-[#6b7280] text-sm font-medium">
              Coming Soon
            </span>
          </div>
        </div>
      </section>

      {/* ── EDIT AI ── */}
      <section className="px-5 py-10 max-w-md mx-auto">
        <div className="p-5 rounded-xl border border-dashed border-[#d4af37]/10 text-center">
          <p
            className="text-[11px] tracking-[0.3em] uppercase text-[#6b7280] mb-3"
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}
          >
            For Creators
          </p>
          <p className="text-[#94a3b8] text-sm leading-relaxed mb-4">
            I use Edit AI to turn my raw footage into polished Reels in one
            click. If you make content, try it.
          </p>
          <a
            href={withUtm("https://edit2ai.com", "editai_section")}
            onClick={() => trackEvent("editai_click", { source: "section" })}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-5 py-2.5 rounded-full border border-[#d4af37]/20 text-[#d4af37]/70 text-sm font-medium active:scale-[0.97] transition-transform"
          >
            Try Edit AI
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-5 py-12 border-t border-[#1a1a2e] max-w-md mx-auto">
        {/* Social Icons */}
        <div className="flex justify-center gap-5 mb-8">
          <a
            href={withUtm("https://instagram.com/kanikabatra", "social")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6b7280] hover:text-[#d4af37] transition-colors"
            aria-label="Instagram"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a
            href={withUtm("https://www.youtube.com/@KanikaBatra", "social")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6b7280] hover:text-[#d4af37] transition-colors"
            aria-label="YouTube"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
          <a
            href={withUtm("https://tiktok.com/@ogkanikabatra", "social")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6b7280] hover:text-[#d4af37] transition-colors"
            aria-label="TikTok"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
            </svg>
          </a>
        </div>

        {/* Email Capture */}
        <FooterEmailCapture />

        <p className="text-center text-[#3a3a4e] text-[10px] mt-8 tracking-wider">
          &copy; 2026 Kanika Batra. All rights reserved.
        </p>
      </footer>

      {/* ── QUIZ OVERLAY ── */}
      {showQuiz && <QuizOverlay onClose={() => setShowQuiz(false)} />}
    </div>
  );
}

// ─── Footer Email Capture ──────────────────────────────────
function FooterEmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;

    setStatus("sending");
    trackEvent("email_signup", { source: "footer" });

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "linkinbio-footer" }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <p className="text-center text-[#d4af37] text-sm">
        You&apos;re in. Check your inbox.
      </p>
    );
  }

  return (
    <div className="text-center">
      <p className="text-[#94a3b8] text-sm mb-4">
        Get insights most people pay for — free.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-xs mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 min-w-0 px-4 py-2.5 rounded-full bg-[#0d0d1a] border border-[#1a1a2e] text-[#f5f0ed] text-sm placeholder:text-[#3a3a4e] focus:outline-none focus:border-[#d4af37]/30"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="px-5 py-2.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] text-sm font-medium disabled:opacity-50 active:scale-[0.97] transition-transform"
        >
          {status === "sending" ? "..." : "Join"}
        </button>
      </form>
      {status === "error" && (
        <p className="text-red-400/70 text-xs mt-2">
          Something went wrong. Try again.
        </p>
      )}
    </div>
  );
}

// ─── Quiz Overlay ──────────────────────────────────────────
function QuizOverlay({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<"intro" | "questions" | "email" | "results">(
    "intro",
  );
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);

  const totalQuestions = MANIPULATION_QUIZ.length;
  const question = MANIPULATION_QUIZ[currentQ];

  const handleAnswer = useCallback(
    (points: number) => {
      const newAnswers = [...answers, points];
      setAnswers(newAnswers);

      if (currentQ < totalQuestions - 1) {
        setCurrentQ(currentQ + 1);
      } else {
        setStep("email");
      }
    },
    [answers, currentQ, totalQuestions],
  );

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;

    setSubmitting(true);
    const score = answers.reduce((sum, a) => sum + a, 0);
    const quizResult = getResult(score);
    setResult(quizResult);

    trackEvent("quiz_complete", {
      score: String(score),
      type: quizResult.type,
    });

    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: name || undefined,
          source: "manipulation-quiz",
          tags: [`quiz-${quizResult.type}`, `quiz-score-${score}`],
        }),
      });
    } catch {
      /* email capture failed silently — still show results */
    }

    setSubmitting(false);
    setStep("results");
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#050505] flex items-center justify-center p-5">
      <div className="w-full max-w-md">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#6b7280] text-2xl leading-none"
          aria-label="Close quiz"
        >
          &times;
        </button>

        {/* Intro */}
        {step === "intro" && (
          <div className="text-center">
            <p className="text-[#d4af37] text-xs tracking-[0.3em] uppercase mb-4">
              The Manipulation Test
            </p>
            <h2
              className="text-2xl font-light text-[#f5f0ed] mb-3 leading-tight"
              style={{ fontFamily: "Inter, system-ui, sans-serif" }}
            >
              How Easily Can You
              <br />
              Be Manipulated?
            </h2>
            <p className="text-[#6b7280] text-sm mb-8">
              7 questions &middot; Takes 2 minutes &middot; Free
            </p>
            <button
              onClick={() => setStep("questions")}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#720921] to-[#4a0616] text-[#f5f0ed] text-sm font-medium tracking-wider uppercase active:scale-[0.97] transition-transform"
            >
              Start
            </button>
          </div>
        )}

        {/* Questions */}
        {step === "questions" && question && (
          <div>
            {/* Progress bar */}
            <div className="mb-8">
              <div className="flex justify-between text-[10px] text-[#6b7280] uppercase tracking-wider mb-2">
                <span>
                  Question {currentQ + 1} of {totalQuestions}
                </span>
                <span>
                  {Math.round(((currentQ + 1) / totalQuestions) * 100)}%
                </span>
              </div>
              <div className="w-full h-0.5 bg-[#1a1a2e] rounded-full">
                <div
                  className="h-full bg-[#d4af37] rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentQ + 1) / totalQuestions) * 100}%`,
                  }}
                />
              </div>
            </div>

            <p className="text-[#f5f0ed] text-[15px] leading-relaxed mb-6">
              {question.question}
            </p>

            <div className="space-y-3">
              {question.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(option.points)}
                  className="w-full text-left p-4 rounded-xl bg-[#0d0d1a] border border-[#1a1a2e] text-[#94a3b8] text-sm leading-relaxed active:bg-[#720921]/20 active:border-[#720921]/30 active:text-[#f5f0ed] transition-colors"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Email Gate */}
        {step === "email" && (
          <div className="text-center">
            <p className="text-[#d4af37] text-xs tracking-[0.3em] uppercase mb-4">
              Your Results Are Ready
            </p>
            <h2
              className="text-xl font-light text-[#f5f0ed] mb-2"
              style={{ fontFamily: "Inter, system-ui, sans-serif" }}
            >
              Where should we send them?
            </h2>
            <p className="text-[#6b7280] text-sm mb-8">
              Enter your email to see your manipulation vulnerability score.
            </p>
            <form onSubmit={handleEmailSubmit} className="space-y-3 text-left">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name (optional)"
                className="w-full px-4 py-3 rounded-xl bg-[#0d0d1a] border border-[#1a1a2e] text-[#f5f0ed] text-sm placeholder:text-[#3a3a4e] focus:outline-none focus:border-[#d4af37]/30"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#0d0d1a] border border-[#1a1a2e] text-[#f5f0ed] text-sm placeholder:text-[#3a3a4e] focus:outline-none focus:border-[#d4af37]/30"
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#720921] to-[#4a0616] text-[#f5f0ed] text-sm font-medium tracking-wider uppercase disabled:opacity-50 active:scale-[0.97] transition-transform"
              >
                {submitting ? "Loading..." : "See My Results"}
              </button>
            </form>
          </div>
        )}

        {/* Results */}
        {step === "results" && result && (
          <div className="text-center">
            <p className="text-[#d4af37] text-xs tracking-[0.3em] uppercase mb-4">
              Your Result
            </p>
            <h2
              className="text-2xl font-light text-[#f5f0ed] mb-2"
              style={{ fontFamily: "Inter, system-ui, sans-serif" }}
            >
              {result.title}
            </h2>
            <div className="inline-block px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] text-xs mb-6">
              Score: {answers.reduce((s, a) => s + a, 0)} / {totalQuestions * 3}
            </div>
            <p className="text-[#94a3b8] text-sm leading-relaxed mb-8">
              {result.description}
            </p>
            <div className="space-y-3">
              <a
                href={
                  result.cta.href.startsWith("http")
                    ? withUtm(result.cta.href, "quiz_result")
                    : result.cta.href
                }
                onClick={() =>
                  trackEvent("quiz_cta_click", { type: result.type })
                }
                className="block w-full py-3.5 rounded-full bg-gradient-to-r from-[#720921] to-[#4a0616] text-[#f5f0ed] text-sm font-medium tracking-wider uppercase text-center active:scale-[0.97] transition-transform"
              >
                {result.cta.label}
              </a>
              <button
                onClick={onClose}
                className="block w-full py-3 text-[#6b7280] text-sm"
              >
                Back to page
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
