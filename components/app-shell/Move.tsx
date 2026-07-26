import Link from "next/link";

/**
 * A single actionable row in the app shell: icon tile, title, one-line
 * detail, and the go/done state on the right. The workhorse list item
 * across Today, Train, and You.
 */

type Props = {
  href: string;
  title: string;
  sub: string;
  cta?: string;
  done?: boolean;
  icon: React.ReactNode;
};

export default function Move({ href, title, sub, cta = "GO", done, icon }: Props) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3.5 rounded-2xl border border-[var(--app-line-soft)] bg-[var(--app-card)] px-4 py-[15px] transition-colors active:bg-[var(--app-card-2)] ${
        done ? "opacity-55" : ""
      }`}
    >
      <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-xl bg-[rgba(212,175,55,0.08)] text-[var(--app-gold)] [&>svg]:h-[18px] [&>svg]:w-[18px] [&>svg]:fill-none [&>svg]:stroke-current [&>svg]:[stroke-width:1.6]">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[14.5px] font-medium">{title}</span>
        <span className="mt-0.5 block truncate text-xs text-[var(--app-dim)]">
          {sub}
        </span>
      </span>
      <span
        className={`shrink-0 text-xs tracking-[0.1em] ${
          done ? "text-[var(--app-green)]" : "text-[var(--app-gold)]"
        }`}
      >
        {done ? "✓ DONE" : `${cta} →`}
      </span>
    </Link>
  );
}
