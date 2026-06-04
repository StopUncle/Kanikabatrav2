/**
 * GrainOverlay — a fixed, ultra-low-opacity film grain over the whole
 * viewport. It sits just above the animated background but below content
 * (z-[1]; content is z-10), so it textures the dark field without ever
 * touching legibility. Static SVG noise, no animation, no main-thread
 * cost, and nothing to do for reduced motion.
 *
 * Server component on purpose: it renders the same bytes every time and
 * needs no interactivity.
 */
const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export default function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] hidden sm:block"
      style={{
        backgroundImage: `url("${NOISE}")`,
        backgroundRepeat: "repeat",
        opacity: 0.035,
        mixBlendMode: "overlay",
      }}
    />
  );
}
