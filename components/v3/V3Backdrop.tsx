/**
 * V3Backdrop — the ambient field behind the /v3 page. My own take, built
 * to feel like a dark room with one cold light source: a deep
 * black-to-navy base, a high "moonlight" bloom (the mirror), a low warm
 * burgundy ember, a vignette to pull the eye to centre, and a film of
 * grain over the top. All static CSS, so it costs nothing and needs no
 * reduced-motion handling.
 *
 * Server component: deterministic output, no interactivity.
 */
const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export default function V3Backdrop() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(125% 90% at 50% -12%, #0c1424 0%, #070710 46%, #050509 100%)",
        }}
      />
      {/* Moonlight bloom, the cold mirror light. */}
      <div
        className="absolute left-1/2 top-[-12%] h-[62vh] w-[64vw] -translate-x-1/2 rounded-full blur-[130px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(148,163,184,0.11), transparent)",
        }}
      />
      {/* Low warm ember. */}
      <div
        className="absolute bottom-[-12%] left-[8%] h-[52vh] w-[52vw] rounded-full blur-[150px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(114,9,33,0.16), transparent)",
        }}
      />
      {/* Vignette. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 38%, transparent 55%, rgba(0,0,0,0.62) 100%)",
        }}
      />
      {/* Grain. */}
      <div
        className="absolute inset-0 mix-blend-overlay"
        style={{ backgroundImage: `url("${NOISE}")`, opacity: 0.045 }}
      />
    </div>
  );
}
