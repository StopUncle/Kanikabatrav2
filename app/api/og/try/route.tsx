import { ImageResponse } from "next/og";

export const runtime = "edge";

/**
 * Share card for the free /try Simulator demo.
 *
 * Result mode (?title=The+Morning+After&stars=3&xp=120) renders a brag
 * card with the ending and the star verdict; the bare /try URL renders
 * the evergreen "play free" landing card.
 *
 * satori (next/og) quirks handled here: every container needs explicit
 * display:flex; it has no glyph for unicode stars (inline SVG instead);
 * and it flattens React fragments into an inline row, so each element is
 * a direct, individually-guarded child of the flex column (no fragments).
 */
function Star({ filled }: { filled: boolean }) {
  return (
    <svg width="52" height="52" viewBox="0 0 24 24" style={{ display: "flex" }}>
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01L12 2z"
        fill={filled ? "#d4af37" : "transparent"}
        stroke="#d4af37"
        strokeWidth="1"
        opacity={filled ? 1 : 0.35}
      />
    </svg>
  );
}

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  const starsRaw = Number(searchParams.get("stars"));
  const stars = Number.isFinite(starsRaw)
    ? Math.max(0, Math.min(3, Math.round(starsRaw)))
    : null;
  const xp = searchParams.get("xp");
  const isResult = title !== null || stars !== null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "26px",
          background:
            "linear-gradient(135deg, #0a0a0a 0%, #0f172a 55%, #1a0a14 100%)",
          fontFamily: "system-ui",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: "24px",
            color: "#d4af37",
            textTransform: "uppercase",
            letterSpacing: "8px",
          }}
        >
          The Dark Mirror Simulator
        </div>

        {isResult && (
          <div
            style={{
              display: "flex",
              fontSize: "70px",
              fontWeight: 200,
              color: "#ffffff",
              textAlign: "center",
              maxWidth: "960px",
            }}
          >
            {title ?? "Scene complete"}
          </div>
        )}
        {isResult && stars !== null && (
          <div style={{ display: "flex", gap: "16px" }}>
            <Star filled={stars > 0} />
            <Star filled={stars > 1} />
            <Star filled={stars > 2} />
          </div>
        )}
        {isResult && xp && (
          <div style={{ display: "flex", fontSize: "30px", color: "#d4af37" }}>
            {`+${xp} XP`}
          </div>
        )}

        {!isResult && (
          <div
            style={{
              display: "flex",
              fontSize: "84px",
              fontWeight: 200,
              color: "#ffffff",
            }}
          >
            Try the Dark Mirror
          </div>
        )}
        {!isResult && (
          <div
            style={{
              display: "flex",
              fontSize: "28px",
              color: "#a0a0a0",
              textAlign: "center",
              maxWidth: "820px",
            }}
          >
            A full scenario, free. Real branching choices, real consequences.
          </div>
        )}

        <div
          style={{
            display: "flex",
            fontSize: "20px",
            color: "#d4af37",
            letterSpacing: "2px",
          }}
        >
          kanikarose.com/try
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
