import Image from "next/image";

/**
 * The desktop handoff. The Consilium is built for a phone, so on a wide
 * screen the app keeps working but the page says where it belongs and hands
 * over with a QR code.
 *
 * The code is a committed SVG rather than a runtime dependency: the URL never
 * changes, so there is nothing to generate per request.
 */
export default function PhoneHandoff() {
  return (
    <aside className="hidden max-w-sm pt-16 lg:block">
      <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--app-gold-soft)]">
        Built for your phone
      </p>
      <h2
        className="mt-3.5 text-[32px] font-light leading-tight text-[var(--app-text)]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Take it with you.
      </h2>
      <p className="mt-3 text-[15px] leading-relaxed text-[var(--app-muted)]">
        Scan this and install it on your phone. Your streak, your scenarios,
        and Kanika&apos;s replies land where you actually are. Everything works
        here too.
      </p>

      <div className="mt-7 inline-block rounded-2xl bg-white p-3.5">
        <Image
          src="/images/app-qr.svg"
          alt="QR code linking to kanikarose.com/app"
          width={148}
          height={148}
          unoptimized
        />
      </div>

      <p className="mt-4 text-[13px] text-[var(--app-dim)]">
        kanikarose.com/app
      </p>
    </aside>
  );
}
