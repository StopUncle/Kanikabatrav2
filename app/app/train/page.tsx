import Move from "@/components/app-shell/Move";

export const metadata = {
  title: "Train | Consilium",
};

/**
 * Train: every way to practice, one door each. The doors open into the
 * existing surfaces; each gets rebuilt in the app skin over time.
 */

const DOORS = [
  {
    href: "/consilium/simulator",
    title: "Scenarios",
    sub: "Live conversations. Your choices score.",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7z" />
      </svg>
    ),
  },
  {
    href: "/consilium/adventures",
    title: "Adventures",
    sub: "Multi-chapter arcs. Long games.",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M4 19V6l6-2 4 2 6-2v13l-6 2-4-2z" />
        <path d="M10 4v13m4-11v13" />
      </svg>
    ),
  },
  {
    href: "/consilium/instincts/today",
    title: "Daily tell",
    sub: "Read the moment, spot the tell.",
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3.5" />
      </svg>
    ),
  },
  {
    href: "/consilium/games",
    title: "Speed drill",
    sub: "Pattern recognition against the clock.",
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="13" r="8" />
        <path d="M12 9v4l2.5 2.5M9 2h6" />
      </svg>
    ),
  },
  {
    href: "/consilium/lab",
    title: "The Lab",
    sub: "Freeform roleplay. Say anything.",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M10 2v7l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V2" />
        <path d="M8.5 2h7" />
      </svg>
    ),
  },
  {
    href: "/consilium/receipts",
    title: "Receipts",
    sub: "Paste the messages. Get the read.",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M6 2h12v20l-3-2-3 2-3-2-3 2z" />
        <path d="M9 8h6m-6 4h6" />
      </svg>
    ),
  },
];

export default function TrainPage() {
  return (
    <div className="px-5 pt-6">
      <h1
        className="text-[28px] font-light"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Train
      </h1>
      <p className="mb-6 mt-1 text-[13px] text-[var(--app-muted)]">
        Practice reads people faster than theory ever will.
      </p>
      <div className="flex flex-col gap-2.5">
        {DOORS.map((d) => (
          <Move key={d.href} href={d.href} title={d.title} sub={d.sub} cta="OPEN" icon={d.icon} />
        ))}
      </div>
    </div>
  );
}
