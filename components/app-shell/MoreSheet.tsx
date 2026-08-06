"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  MORE_SECTIONS,
  surfaceLocked,
  requiresLabel,
  type AppSurface,
  type ViewerTier,
} from "@/lib/app/nav";
import {
  Activity,
  BookOpen,
  CalendarCheck,
  ClipboardList,
  Compass,
  Crown,
  Ear,
  Eye,
  FlaskConical,
  GraduationCap,
  HelpCircle,
  Hexagon,
  History,
  Mail,
  Map,
  Medal,
  Mic,
  PenLine,
  Route,
  ScanLine,
  ScrollText,
  Settings,
  Sparkles,
  TrendingUp,
  Trophy,
  User,
  Video,
  X,
  Zap,
} from "lucide-react";

/**
 * The More sheet: the index of the app.
 *
 * It used to hold three rows, because everything else "was on Home". That
 * left Home's rails as the only road to Quizzes, Leaderboards, the Lab and
 * the rest, so a member who did not scroll never found them. It now lists
 * every surface the tab bar does not carry, grouped by the same sections
 * Home uses. Slides up from the bottom, closes on backdrop, Escape, or any
 * navigation.
 */

/**
 * Icons keyed by route. The nav config owns what is in this sheet and which
 * group it sits in; this owns how each row looks. A surface with no icon
 * still renders: the fallback keeps the row's alignment rather than letting
 * the label jump left.
 */
const ICONS: Record<string, React.ReactNode> = {
  // Train
  "/app/train/climb": <TrendingUp size={17} />,
  "/app/play/drill": <Zap size={17} />,
  "/app/play/tell": <Ear size={17} />,
  "/app/adventures": <Map size={17} />,
  "/app/lab": <FlaskConical size={17} />,
  "/app/receipts": <ScanLine size={17} />,
  // Test yourself
  "/app/quizzes": <HelpCircle size={17} />,
  "/app/measure/baseline": <Activity size={17} />,
  "/app/instincts/today": <Eye size={17} />,
  "/app/instincts/score": <Hexagon size={17} />,
  "/app/instincts/history": <History size={17} />,
  // The Pact
  "/app/pact/week": <CalendarCheck size={17} />,
  "/app/pact/record": <ScrollText size={17} />,
  "/app/pact/journal": <PenLine size={17} />,
  // From Kanika
  "/app/kanika": <Mail size={17} />,
  "/app/book": <BookOpen size={17} />,
  "/app/videos": <Video size={17} />,
  "/app/voice-notes": <Mic size={17} />,
  "/app/previews": <Sparkles size={17} />,
  // Your standing
  "/app/you": <User size={17} />,
  "/app/ranks": <Trophy size={17} />,
  "/app/path": <Route size={17} />,
  "/app/program": <GraduationCap size={17} />,
  "/app/program/intake": <ClipboardList size={17} />,
  "/app/train/achievements": <Medal size={17} />,
  // Account
  "/app/upgrade": <Crown size={17} />,
  "/app/profile": <Settings size={17} />,
};

const FALLBACK_ICON = <Compass size={17} />;

export default function MoreSheet({
  open,
  onClose,
  viewerTier,
  onLockedTap,
}: {
  open: boolean;
  onClose: () => void;
  viewerTier: ViewerTier;
  onLockedTap: (surface: AppSurface) => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="More">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"
      />
      <div className="absolute inset-x-0 bottom-0 mx-auto max-h-[80dvh] w-full max-w-[430px] overflow-y-auto rounded-t-3xl border-t border-[var(--app-line)] bg-[var(--app-card-2)] pb-[max(20px,env(safe-area-inset-bottom))] shadow-[0_-20px_60px_rgba(0,0,0,0.6)]">
        <div className="sticky top-0 flex items-center justify-between bg-[var(--app-card-2)] px-5 pb-2 pt-4">
          <span className="mx-auto h-1 w-10 rounded-full bg-[var(--app-dim)] opacity-50" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-3 flex h-8 w-8 items-center justify-center rounded-full text-[var(--app-dim)]"
          >
            <X size={17} />
          </button>
        </div>

        {MORE_SECTIONS.map((section) => (
          <div key={section.title} className="px-5 pt-4">
            <p className="mb-2 text-app-tiny uppercase tracking-app-label text-[var(--app-dim)]">
              {section.title}
            </p>
            <div className="overflow-hidden rounded-2xl border border-[var(--app-line-soft)] bg-[var(--app-card)]">
              {section.items.map((item, i) => {
                const locked = surfaceLocked(item, viewerTier);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={
                      locked
                        ? (e) => {
                            e.preventDefault();
                            onClose();
                            onLockedTap(item);
                          }
                        : onClose
                    }
                    aria-label={
                      locked
                        ? `${item.label}, ${requiresLabel(item)} only`
                        : undefined
                    }
                    className={`flex items-center gap-3.5 px-4 py-3.5 ${
                      i > 0 ? "border-t border-[var(--app-line-soft)]" : ""
                    }`}
                  >
                    {/* The icon keeps its gold on a locked row. The lock is
                        information, not a punishment; the row should still
                        look worth wanting. */}
                    <span className="text-[var(--app-gold)]">
                      {ICONS[item.href] ?? FALLBACK_ICON}
                    </span>
                    <span className={`flex-1 text-app-lead ${locked ? "opacity-60" : ""}`}>
                      {item.label}
                    </span>
                    {locked ? (
                      <span className="rounded-full border border-[var(--app-gold-soft)] px-1.5 py-0.5 text-app-micro uppercase tracking-app-wide text-[var(--app-gold-soft)]">
                        {requiresLabel(item)}
                      </span>
                    ) : (
                      <span className="text-[var(--app-dim)]">›</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
