/**
 * Consilium session watermark.
 *
 * Renders a small, mundane-looking "SID" string in the bottom-right of every
 * member page. Deliberately disguised as a generic session/trace reference
 * (Stripe/Datadog-style) so a casual reader doesn't register it as a
 * forensic marker. When a member films the Consilium and redistributes the
 * footage, the SID is visible in the recording; an admin pastes it into the
 * /admin/members fingerprint lookup and gets back the exact userId.
 *
 * Subtle enough not to intrude on the UI, large enough to survive typical
 * video compression. Fixed-position and high z-index so it sits over all
 * content regardless of scrolling.
 *
 * Safe-area-inset aware for iPhone notches / home-indicator bars.
 */
export default function SessionWatermark({
  fingerprint,
}: {
  fingerprint: string;
}) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none fixed z-[60]"
      style={{
        bottom: "max(env(safe-area-inset-bottom), 6px)",
        right: "max(env(safe-area-inset-right), 8px)",
      }}
    >
      <span
        style={{
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          fontSize: "9px",
          letterSpacing: "0.08em",
          color: "rgba(180, 174, 165, 0.35)",
          textShadow: "0 1px 0 rgba(0,0,0,0.55)",
          opacity: 0.7,
        }}
      >
        SID·{fingerprint}
      </span>
    </div>
  );
}
