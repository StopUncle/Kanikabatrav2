import Link from "next/link";
import AppQr from "@/components/AppQr";

/**
 * The corner chip on the hero: the install QR at scannable size and one
 * line. Desktop only; phones cannot scan their own screen, and the
 * download section under the book carries the mobile install button.
 * Clicking it jumps to that section.
 */
export default function HeroAppQr() {
  return (
    <Link
      href="#app"
      className="hidden md:flex absolute right-6 top-4 z-10 flex-col items-center gap-1.5"
    >
      <span className="rounded-lg bg-[#f3ecdb] p-1.5 ring-1 ring-accent-gold/40">
        <AppQr className="h-16 w-16" />
      </span>
      <span className="text-text-gray/70 text-[10px] uppercase tracking-[0.18em]">
        Scan for the app
      </span>
    </Link>
  );
}
