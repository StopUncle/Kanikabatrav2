import Image from "next/image";

/**
 * FloatingBookV3 — the real cover art, floating.
 *
 * Uses the actual book cover (/books/book-cover) rather than a CSS
 * recreation. The cover hangs on a slow 3D float, a cold specular
 * highlight rakes across it, and a warm halo glows behind. All CSS (see
 * .v3-book-float / .v3-specular), so it renders identically on server and
 * client and stands still under reduced motion. No framer-motion, by
 * design (an earlier scroll-tilt tripped a hydration mismatch).
 */
export default function FloatingBookV3() {
  return (
    <div
      className="flex justify-center"
      style={{ perspective: 1400, position: "relative" }}
    >
      {/* Halo glow behind the book. */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[400px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(212,175,55,0.2), transparent)",
        }}
      />

      <div className="v3-book-float relative">
        <div className="v3-specular relative overflow-hidden rounded-[4px] border border-warm-gold/25 shadow-[0_40px_90px_-25px_rgba(0,0,0,0.92)]">
          <Image
            src="/books/book-cover.webp"
            alt="Sociopathic Dating Bible by Kanika Batra"
            width={300}
            height={450}
            sizes="(max-width: 640px) 240px, 300px"
            className="block h-auto w-[240px] sm:w-[300px]"
          />
        </div>
      </div>
    </div>
  );
}
