"use client";

import { useEffect } from "react";
import Link from "next/link";
import { MORE_SECTIONS } from "@/lib/app/nav";
import {
  Route,
  User,
  Trophy,
  Brain,
  BookOpen,
  Video,
  Mic,
  Settings,
  CalendarCheck,
  X,
} from "lucide-react";

/**
 * The More sheet: everything that earns a place in the app but not a place on
 * the tab bar. Slides up from the bottom, closes on backdrop, Escape, or any
 * navigation.
 */

/**
 * Icons keyed by route. The nav config owns what is in this sheet and which
 * group it sits in; this owns how each row looks.
 */
const ICONS: Record<string, React.ReactNode> = {
  "/app/program": <CalendarCheck size={17} />,
  "/app/path": <Route size={17} />,
  "/app/you": <User size={17} />,
  "/app/ranks": <Trophy size={17} />,
  "/app/quizzes": <Brain size={17} />,
  "/app/book": <BookOpen size={17} />,
  "/app/videos": <Video size={17} />,
  "/app/voice-notes": <Mic size={17} />,
  "/app/profile": <Settings size={17} />,
};

export default function MoreSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
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
            <p className="mb-2 text-[10.5px] uppercase tracking-[0.24em] text-[var(--app-dim)]">
              {section.title}
            </p>
            <div className="overflow-hidden rounded-2xl border border-[var(--app-line-soft)] bg-[var(--app-card)]">
              {section.items.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3.5 px-4 py-3.5 ${
                    i > 0 ? "border-t border-[var(--app-line-soft)]" : ""
                  }`}
                >
                  <span className="text-[var(--app-gold)]">{ICONS[item.href]}</span>
                  <span className="flex-1 text-[14.5px]">{item.label}</span>
                  <span className="text-[var(--app-dim)]">›</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
