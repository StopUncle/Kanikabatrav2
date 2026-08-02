import Link from "next/link";
import { HOME_SECTIONS, type AppSurface } from "@/lib/app/nav";
import {
  BookOpen,
  Brain,
  CalendarCheck,
  Eye,
  FlaskConical,
  Map,
  Mic,
  Mountain,
  Receipt,
  Route,
  Timer,
  Trophy,
  User,
  Video,
} from "lucide-react";

/**
 * Home's explore zone: everything the app owns, browsable without a menu.
 * Renders below the action zone on Home, one section per Home rail in the
 * nav config. The config owns what appears and in which section; this owns
 * how a card looks.
 *
 * A section with one card renders it full width (Quizzes, deliberately);
 * everything else is a horizontal rail, the sideways-swipe row that lets a
 * section hold six things in the vertical space of one.
 */

const ICONS: Record<string, React.ReactNode> = {
  "/app/quizzes": <Brain size={19} />,
  "/app/train/climb": <Mountain size={19} />,
  "/app/play/drill": <Timer size={19} />,
  "/app/play/tell": <Eye size={19} />,
  "/app/adventures": <Map size={19} />,
  "/app/lab": <FlaskConical size={19} />,
  "/app/receipts": <Receipt size={19} />,
  "/app/videos": <Video size={19} />,
  "/app/voice-notes": <Mic size={19} />,
  "/app/book": <BookOpen size={19} />,
  "/app/program": <CalendarCheck size={19} />,
  "/app/path": <Route size={19} />,
  "/app/you": <User size={19} />,
  "/app/ranks": <Trophy size={19} />,
};

/**
 * One accent per card, from the Arcade's game palette, so the rails read as
 * distinct doors rather than a run of identical gold tiles. The Train cards
 * use their game's exact colour; everything else borrows from the same six
 * so the page stays one system.
 */
const ACCENT: Record<string, string> = {
  "/app/train/climb": "var(--game-scenario)",
  "/app/play/drill": "var(--game-drill)",
  "/app/play/tell": "var(--game-tell)",
  "/app/adventures": "var(--game-adventures)",
  "/app/lab": "var(--game-lab)",
  "/app/receipts": "var(--game-receipts)",
  "/app/videos": "var(--app-rose)",
  "/app/voice-notes": "var(--game-lab)",
  "/app/book": "var(--game-adventures)",
  "/app/program": "var(--app-gold)",
  "/app/path": "var(--game-scenario)",
  "/app/you": "var(--game-receipts)",
  "/app/ranks": "var(--app-gold)",
};

function FeatureCard({ surface }: { surface: AppSurface }) {
  return (
    <Link
      href={surface.href}
      className="mx-5 flex items-center gap-3.5 rounded-[18px] border border-[var(--app-line)] px-[18px] py-[18px] transition-colors active:bg-[var(--app-card-2)]"
      style={{
        background:
          "linear-gradient(140deg, rgba(212,175,55,0.09), rgba(212,175,55,0.02))",
      }}
    >
      <span className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl bg-[rgba(212,175,55,0.1)] text-[var(--app-gold)]">
        {ICONS[surface.href]}
      </span>
      <span className="min-w-0 flex-1">
        <span
          className="block text-[17px]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {surface.label}
        </span>
        <span className="mt-0.5 block text-[12.5px] leading-snug text-[var(--app-muted)]">
          {surface.home?.hook}
        </span>
      </span>
      <span className="shrink-0 text-[13px] tracking-[0.1em] text-[var(--app-gold)]">
        OPEN →
      </span>
    </Link>
  );
}

function RailCard({ surface }: { surface: AppSurface }) {
  const accent = ACCENT[surface.href] ?? "var(--app-gold)";
  return (
    <Link
      href={surface.href}
      className="flex w-[152px] shrink-0 snap-start flex-col rounded-[18px] border border-[var(--app-line-soft)] bg-[var(--app-card)] p-4 transition-colors active:bg-[var(--app-card-2)]"
    >
      <span
        className="mb-3 flex h-[38px] w-[38px] items-center justify-center rounded-xl"
        style={{
          color: accent,
          background: `color-mix(in srgb, ${accent} 9%, transparent)`,
        }}
      >
        {ICONS[surface.href]}
      </span>
      <span
        className="block text-[15.5px] leading-tight"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {surface.label}
      </span>
      <span className="mt-1 block text-[11.5px] leading-snug text-[var(--app-dim)]">
        {surface.home?.hook}
      </span>
    </Link>
  );
}

export default function HomeExplore() {
  return (
    <div className="mt-8 flex flex-col gap-7">
      {HOME_SECTIONS.map((section) => (
        <section key={section.title}>
          <p className="mx-5 mb-2.5 text-[11px] uppercase tracking-[0.26em] text-[var(--app-dim)]">
            {section.title}
          </p>
          {section.items.length === 1 ? (
            <FeatureCard surface={section.items[0]} />
          ) : (
            <div className="scrollbar-hide flex snap-x gap-2.5 overflow-x-auto px-5">
              {section.items.map((surface) => (
                <RailCard key={surface.href} surface={surface} />
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
