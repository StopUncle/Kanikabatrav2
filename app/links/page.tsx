"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { MANIPULATION_QUIZ, getResult } from "@/lib/quiz-manipulation";
import type { QuizResult } from "@/lib/quiz-manipulation";
import PayPalButton from "@/components/PayPalButton";
import { BOOK_INFO } from "@/lib/constants";

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

// ─── Countdown Timer ───────────────────────────────────────
function SaleTimer() {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    function tick() {
      const now = new Date();
      const end = new Date(now);
      end.setHours(23, 59, 59, 999);
      const diff = end.getTime() - now.getTime();
      if (diff <= 0) return;
      setTime({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="flex items-center justify-center gap-1.5">
      <span className="text-[#94a3b8] text-xs">Sale ends in</span>
      <div className="flex gap-1">
        {[time.h, time.m, time.s].map((v, i) => (
          <span key={i} className="inline-block bg-[#1a1210] border border-[#d4af37]/20 rounded px-1.5 py-0.5 text-[#d4af37] text-xs font-mono font-medium min-w-[28px] text-center">
            {pad(v)}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────
export default function LinksPage() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [showPayPal, setShowPayPal] = useState(false);
  const [landingVideoPlaying, setLandingVideoPlaying] = useState(false);
  const landingVideoRef = useRef<HTMLVideoElement>(null);
  const landingVideoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = landingVideoRef.current;
    const container = landingVideoContainerRef.current;
    if (!video || !container) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { video.muted = true; video.play().catch(() => {}); }
        else { video.pause(); }
      },
      { threshold: 0.5 },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f0ed]">
      <style jsx>{`
        @keyframes levitate {
          0%, 100% { transform: translateY(0) rotateY(-15deg); }
          25% { transform: translateY(-15px) rotateY(-10deg); }
          50% { transform: translateY(-25px) rotateY(-5deg); }
          75% { transform: translateY(-15px) rotateY(-10deg); }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* ━━━━━ BOOK HERO ━━━━━ */}
      <section className="px-5 pt-14 pb-10 max-w-md mx-auto">
        {/* Name */}
        <div className="text-center mb-10">
          <h1
            className="text-[1.75rem] font-light tracking-[0.35em] uppercase"
            style={{ fontFamily: "Didot, 'Bodoni MT', 'GFS Didot', Georgia, serif" }}
          >
            Kanika Batra
          </h1>
          <p className="mt-2 text-[#6b7280] text-[10px] tracking-[0.15em] uppercase">
            Author &middot; As seen on LADbible &middot; 400K+ followers
          </p>
        </div>

        {/* Floating Book */}
        <div className="flex justify-center mb-8">
          <div style={{ perspective: "1500px", transformStyle: "preserve-3d" }}>
            <div
              className="relative w-52 h-[310px]"
              style={{ animation: "levitate 8s ease-in-out infinite" }}
            >
              {/* Cover */}
              <div
                className="absolute inset-0 rounded-lg shadow-2xl flex flex-col justify-between p-6"
                style={{
                  background: "linear-gradient(145deg, #172a3a 0%, #0a1628 50%, #050511 100%)",
                  boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 30px rgba(212,175,55,0.08)",
                }}
              >
                <div>
                  <p className="text-[#d4af37] text-[8px] uppercase tracking-[0.25em] mb-3">
                    The Controversial Bestseller
                  </p>
                  <p
                    className="text-2xl font-light leading-tight"
                    style={{
                      background: "linear-gradient(135deg, #720921, #d4af37)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    SOCIOPATHIC
                  </p>
                  <p
                    className="text-2xl font-light leading-tight"
                    style={{
                      background: "linear-gradient(135deg, #720921, #6366f1)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    DATING
                  </p>
                  <p
                    className="text-2xl font-light leading-tight"
                    style={{
                      background: "linear-gradient(135deg, #720921, #d4af37)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    BIBLE
                  </p>
                </div>
                <div>
                  <p className="text-[#6b7280] text-xs italic mb-2">A Cure For Empathy</p>
                  <p className="text-[#d4af37] text-sm tracking-[0.2em] uppercase">Kanika Batra</p>
                </div>
              </div>
              {/* Spine */}
              <div
                className="absolute -right-3 top-0 bottom-0 w-8 rounded-r-lg"
                style={{ background: "linear-gradient(to right, #0a1628, #050511)" }}
              />
            </div>
          </div>
        </div>

        {/* Copy */}
        <div className="text-center mb-6">
          <p className="text-[#f5f0ed] text-lg font-light leading-snug mb-2"
            style={{ fontFamily: "Didot, 'Bodoni MT', 'GFS Didot', Georgia, serif" }}
          >
            The playbook you were never<br />meant to see.
          </p>
          <p className="text-[#6b7280] text-xs">
            Written by a clinically diagnosed sociopath.
          </p>
        </div>

        {/* Price + Timer */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-[#6b7280] text-sm line-through">$34.99</span>
            <span className="text-[#d4af37] text-2xl font-light">$24.99</span>
            <span className="text-[8px] uppercase tracking-wider text-[#0a0a0a] bg-[#d4af37] rounded-full px-2 py-0.5 font-bold">
              Save 29%
            </span>
          </div>
          <SaleTimer />
        </div>

        {/* CTA */}
        <div className="space-y-3">
          {showPayPal ? (
            <div>
              <PayPalButton
                type="book"
                amount={BOOK_INFO.price}
                itemName={BOOK_INFO.title}
                onSuccess={(details) => {
                  trackEvent("purchase_complete", { version: "premium" });
                  window.location.href = `/success?payment_id=${details.id}&type=book&amount=${BOOK_INFO.price}`;
                }}
                onError={(err) => console.error("Payment failed:", err)}
                onCancel={() => setShowPayPal(false)}
              />
              <button
                onClick={() => setShowPayPal(false)}
                className="block w-full text-center mt-3 text-[#6b7280] text-xs hover:text-[#94a3b8] transition-colors"
              >
                &larr; Back
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => { trackEvent("book_click", { version: "premium" }); setShowPayPal(true); }}
                className="block w-full text-center py-4 rounded-full font-medium text-sm tracking-wider uppercase active:scale-[0.97] transition-transform cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #d4af37 0%, #b8962e 100%)",
                  color: "#0a0a0a",
                  boxShadow: "0 0 20px rgba(212,175,55,0.2), 0 4px 15px rgba(0,0,0,0.3)",
                }}
              >
                Buy Now — $24.99
              </button>
              <a
                href="https://www.amazon.com/dp/B0FWKJLT6F"
                onClick={() => trackEvent("book_click", { version: "kindle" })}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-3.5 rounded-full text-sm font-medium text-[#94a3b8] border border-[#1e1915] hover:border-[#d4af37]/30 active:scale-[0.97] transition-all"
              >
                Or get on Kindle — $9.99
              </a>
            </>
          )}
        </div>

        {/* Premium includes */}
        <div className="mt-6 pt-5 border-t border-[#1e1915]">
          <p className="text-[#d4af37] text-[9px] uppercase tracking-[0.2em] mb-3 text-center">Premium includes</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {[
              "15 chapters + 2 bonus",
              "Understanding Narcissists",
              "The Avoidant Playbook",
              "Uncensored addendum",
            ].map((item) => (
              <div key={item} className="flex items-start gap-1.5">
                <span className="text-[#d4af37] text-[10px] mt-px">&#10003;</span>
                <span className="text-[#94a3b8] text-[11px] leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━ SCROLLING TESTIMONIALS ━━━━━ */}
      <section className="py-6 border-t border-b border-[#1e1915] overflow-hidden">
        <div
          className="flex gap-8 whitespace-nowrap"
          style={{ animation: "marquee 30s linear infinite", width: "max-content" }}
        >
          {[
            { quote: "This book transformed my life.", by: "Verified Reader" },
            { quote: "Important for all women to read. Teaches you to navigate relationships with respect for yourself.", by: "Amazon Review" },
            { quote: "Within 3 weeks I went from being overlooked to being pursued.", by: "Sarah K." },
            { quote: "Finally, dating advice that treats attraction as a skill to master.", by: "Priya M." },
            { quote: "Strategic, practical, powerful. Not feel-good fluff — a tactical manual.", by: "Daniel R." },
            { quote: "The Rotation System alone is worth ten times the price.", by: "Jessica T." },
            { quote: "This book transformed my life.", by: "Verified Reader" },
            { quote: "Important for all women to read. Teaches you to navigate relationships with respect for yourself.", by: "Amazon Review" },
            { quote: "Within 3 weeks I went from being overlooked to being pursued.", by: "Sarah K." },
            { quote: "Finally, dating advice that treats attraction as a skill to master.", by: "Priya M." },
            { quote: "Strategic, practical, powerful. Not feel-good fluff — a tactical manual.", by: "Daniel R." },
            { quote: "The Rotation System alone is worth ten times the price.", by: "Jessica T." },
          ].map((t, i) => (
            <div key={i} className="inline-flex items-center gap-2 shrink-0">
              <span className="text-[#d4af37] text-sm">&ldquo;</span>
              <span className="text-[#c4b5a0] text-sm italic">{t.quote}</span>
              <span className="text-[#6b7280] text-xs">— {t.by}</span>
              <span className="text-[#1e1915] mx-2">|</span>
            </div>
          ))}
        </div>
      </section>

      {/* ━━━━━ VIDEO ━━━━━ */}
      <section className="px-5 py-10 max-w-md mx-auto" ref={landingVideoContainerRef}>
        <div className="relative rounded-xl overflow-hidden border border-[#d4af37]/10 bg-[#0f0d0c] aspect-video">
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
            <track kind="captions" src="/videos/landing-captions.vtt" srcLang="en" label="English" />
          </video>
          {!landingVideoPlaying && (
            <button
              onClick={() => {
                const v = landingVideoRef.current;
                if (v) { v.muted = false; v.play(); trackEvent("video_play_landing"); }
              }}
              className="absolute inset-0 flex items-center justify-center bg-black/30 group cursor-pointer"
              aria-label="Play video with sound"
            >
              <div className="w-14 h-14 rounded-full bg-[#d4af37]/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-[#d4af37]/20">
                <svg className="w-5 h-5 text-[#0a0a0a] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          )}
        </div>
      </section>

      {/* ━━━━━ MORE FROM KANIKA ━━━━━ */}
      <section className="px-5 pb-10 max-w-md mx-auto">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#6b7280] text-center mb-5"
          style={{ fontFamily: "Inter, system-ui, sans-serif" }}
        >
          More
        </p>

        <div className="space-y-2.5">
          {/* Coaching */}
          <a
            href={withUtm("/coaching", "coaching")}
            onClick={() => trackEvent("coaching_click")}
            className="group flex items-center justify-between p-4 rounded-xl border border-[#1e1915] hover:border-[#d4af37]/20 active:scale-[0.98] transition-all"
            style={{ background: "linear-gradient(135deg, rgba(114,9,33,0.08) 0%, #0f0d0c 100%)" }}
          >
            <div>
              <p className="text-[#f5f0ed] text-sm font-medium group-hover:text-[#d4af37] transition-colors">Private Coaching</p>
              <p className="text-[#6b7280] text-[11px] mt-0.5">1:1 video call &middot; From $247</p>
            </div>
            <svg className="w-4 h-4 text-[#6b7280]/40 shrink-0 group-hover:text-[#d4af37]/60 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </a>

          {/* Quiz */}
          <button
            onClick={() => { trackEvent("quiz_start"); setShowQuiz(true); }}
            className="group w-full flex items-center justify-between p-4 rounded-xl border border-[#1e1915] hover:border-[#d4af37]/20 active:scale-[0.98] transition-all text-left"
          >
            <div>
              <p className="text-[#f5f0ed] text-sm font-medium group-hover:text-[#d4af37] transition-colors">How Easily Can You Be Manipulated?</p>
              <p className="text-[#6b7280] text-[11px] mt-0.5">Free quiz &middot; 2 minutes</p>
            </div>
            <svg className="w-4 h-4 text-[#6b7280]/40 shrink-0 group-hover:text-[#d4af37]/60 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* AMA */}
          <a
            href={withUtm("/ask", "ama")}
            onClick={() => trackEvent("qa_click")}
            className="group flex items-center justify-between p-4 rounded-xl border border-[#1e1915] hover:border-[#d4af37]/20 active:scale-[0.98] transition-all"
          >
            <div>
              <p className="text-[#f5f0ed] text-sm font-medium group-hover:text-[#d4af37] transition-colors">Ask Me Anything</p>
              <p className="text-[#6b7280] text-[11px] mt-0.5">Written or voice answer &middot; From $39.99</p>
            </div>
            <svg className="w-4 h-4 text-[#6b7280]/40 shrink-0 group-hover:text-[#d4af37]/60 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </a>

          {/* Full Site */}
          <a
            href={withUtm("/", "homepage")}
            onClick={() => trackEvent("homepage_click")}
            className="group flex items-center justify-between p-4 rounded-xl border border-[#1e1915] hover:border-[#d4af37]/20 active:scale-[0.98] transition-all"
          >
            <div>
              <p className="text-[#f5f0ed] text-sm font-medium group-hover:text-[#d4af37] transition-colors">Explore the Full Site</p>
              <p className="text-[#6b7280] text-[11px] mt-0.5">Blog, community &amp; more</p>
            </div>
            <svg className="w-4 h-4 text-[#6b7280]/40 shrink-0 group-hover:text-[#d4af37]/60 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </a>
        </div>

        {/* Edit AI */}
        <div className="mt-4 text-center">
          <a
            href={withUtm("https://edit2ai.com", "editai")}
            onClick={() => trackEvent("editai_click")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6b7280] hover:text-[#d4af37] text-[11px] transition-colors"
          >
            I edit my Reels with Edit AI &middot; Try it free &rarr;
          </a>
        </div>
      </section>

      {/* ━━━━━ FOOTER ━━━━━ */}
      <footer className="px-5 py-10 border-t border-[#1e1915] max-w-md mx-auto">
        <div className="flex justify-center gap-5 mb-6">
          <a href={withUtm("https://instagram.com/kanikabatra", "social")} target="_blank" rel="noopener noreferrer" className="text-[#6b7280] hover:text-[#d4af37] transition-colors" aria-label="Instagram">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href={withUtm("https://www.youtube.com/@KanikaBatra", "social")} target="_blank" rel="noopener noreferrer" className="text-[#6b7280] hover:text-[#d4af37] transition-colors" aria-label="YouTube">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
          <a href={withUtm("https://tiktok.com/@ogkanikabatra", "social")} target="_blank" rel="noopener noreferrer" className="text-[#6b7280] hover:text-[#d4af37] transition-colors" aria-label="TikTok">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
          </a>
        </div>

        <FooterEmailCapture />

        <p className="text-center text-[#2a2420] text-[10px] mt-8 tracking-wider">
          &copy; 2026 Kanika Batra. All rights reserved.
        </p>
      </footer>

      {showQuiz && <QuizOverlay onClose={() => setShowQuiz(false)} />}
    </div>
  );
}

// ─── Footer Email Capture ──────────────────────────────────
function FooterEmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

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
    return <p className="text-center text-[#d4af37] text-sm">You&apos;re in. Check your inbox.</p>;
  }

  return (
    <div className="text-center">
      <p className="text-[#6b7280] text-xs mb-3">Get insights most people pay for — free.</p>
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-xs mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 min-w-0 px-4 py-2.5 rounded-full bg-[#121010] border border-[#1e1915] text-[#f5f0ed] text-sm placeholder:text-[#3a3530] focus:outline-none focus:border-[#d4af37]/30"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="px-5 py-2.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] text-sm font-medium disabled:opacity-50 active:scale-[0.97] transition-transform"
        >
          {status === "sending" ? "..." : "Join"}
        </button>
      </form>
      {status === "error" && <p className="text-red-400/70 text-xs mt-2">Something went wrong. Try again.</p>}
    </div>
  );
}

// ─── Quiz Overlay ──────────────────────────────────────────
function QuizOverlay({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<"intro" | "questions" | "email" | "results">("intro");
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
      if (currentQ < totalQuestions - 1) { setCurrentQ(currentQ + 1); }
      else { setStep("email"); }
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
    trackEvent("quiz_complete", { score: String(score), type: quizResult.type });
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: name || undefined, source: "manipulation-quiz", tags: [`quiz-${quizResult.type}`, `quiz-score-${score}`] }),
      });
    } catch { /* still show results */ }
    setSubmitting(false);
    setStep("results");
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0a] flex items-center justify-center p-5">
      <div className="w-full max-w-md">
        <button onClick={onClose} className="absolute top-5 right-5 text-[#6b7280] text-2xl leading-none" aria-label="Close quiz">&times;</button>

        {step === "intro" && (
          <div className="text-center">
            <p className="text-[#d4af37] text-xs tracking-[0.3em] uppercase mb-4">The Manipulation Test</p>
            <h2 className="text-2xl font-light text-[#f5f0ed] mb-3 leading-tight" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>How Easily Can You<br />Be Manipulated?</h2>
            <p className="text-[#6b7280] text-sm mb-8">7 questions &middot; Takes 2 minutes &middot; Free</p>
            <button onClick={() => setStep("questions")} className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#720921] to-[#4a0616] text-[#f5f0ed] text-sm font-medium tracking-wider uppercase active:scale-[0.97] transition-transform">Start</button>
          </div>
        )}

        {step === "questions" && question && (
          <div>
            <div className="mb-8">
              <div className="flex justify-between text-[10px] text-[#6b7280] uppercase tracking-wider mb-2">
                <span>Question {currentQ + 1} of {totalQuestions}</span>
                <span>{Math.round(((currentQ + 1) / totalQuestions) * 100)}%</span>
              </div>
              <div className="w-full h-0.5 bg-[#1e1915] rounded-full">
                <div className="h-full bg-[#d4af37] rounded-full transition-all duration-300" style={{ width: `${((currentQ + 1) / totalQuestions) * 100}%` }} />
              </div>
            </div>
            <p className="text-[#f5f0ed] text-[15px] leading-relaxed mb-6">{question.question}</p>
            <div className="space-y-3">
              {question.options.map((option, i) => (
                <button key={i} onClick={() => handleAnswer(option.points)} className="w-full text-left p-4 rounded-xl bg-[#121010] border border-[#1e1915] text-[#94a3b8] text-sm leading-relaxed active:bg-[#720921]/20 active:border-[#720921]/30 active:text-[#f5f0ed] transition-colors">
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === "email" && (
          <div className="text-center">
            <p className="text-[#d4af37] text-xs tracking-[0.3em] uppercase mb-4">Your Results Are Ready</p>
            <h2 className="text-xl font-light text-[#f5f0ed] mb-2" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>Where should we send them?</h2>
            <p className="text-[#6b7280] text-sm mb-8">Enter your email to see your manipulation vulnerability score.</p>
            <form onSubmit={handleEmailSubmit} className="space-y-3 text-left">
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name (optional)" className="w-full px-4 py-3 rounded-xl bg-[#121010] border border-[#1e1915] text-[#f5f0ed] text-sm placeholder:text-[#3a3530] focus:outline-none focus:border-[#d4af37]/30" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required className="w-full px-4 py-3 rounded-xl bg-[#121010] border border-[#1e1915] text-[#f5f0ed] text-sm placeholder:text-[#3a3530] focus:outline-none focus:border-[#d4af37]/30" />
              <button type="submit" disabled={submitting} className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#720921] to-[#4a0616] text-[#f5f0ed] text-sm font-medium tracking-wider uppercase disabled:opacity-50 active:scale-[0.97] transition-transform">{submitting ? "Loading..." : "See My Results"}</button>
            </form>
          </div>
        )}

        {step === "results" && result && (
          <div className="text-center">
            <p className="text-[#d4af37] text-xs tracking-[0.3em] uppercase mb-4">Your Result</p>
            <h2 className="text-2xl font-light text-[#f5f0ed] mb-2" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>{result.title}</h2>
            <div className="inline-block px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] text-xs mb-6">Score: {answers.reduce((s, a) => s + a, 0)} / {totalQuestions * 3}</div>
            <p className="text-[#94a3b8] text-sm leading-relaxed mb-8">{result.description}</p>
            <div className="space-y-3">
              <a href={result.cta.href.startsWith("http") ? withUtm(result.cta.href, "quiz_result") : result.cta.href} onClick={() => trackEvent("quiz_cta_click", { type: result.type })} className="block w-full py-3.5 rounded-full bg-gradient-to-r from-[#720921] to-[#4a0616] text-[#f5f0ed] text-sm font-medium tracking-wider uppercase text-center active:scale-[0.97] transition-transform">{result.cta.label}</a>
              <button onClick={onClose} className="block w-full py-3 text-[#6b7280] text-sm">Back to page</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
