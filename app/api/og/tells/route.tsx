import { ImageResponse } from "next/og";

export const runtime = "edge";

/**
 * Share card for the daily Tell.
 *
 * Two modes, driven by query params so a shared result link renders a
 * brag card and the bare /tells URL renders the evergreen landing card:
 *   ?n=003&track=Red+Flags&r=correct  -> "Correct read" result card
 *   (no params)                       -> "Today's Tell" landing card
 *
 * r=correct|missed only encodes whether the SHARER got it right. It does
 * not reveal which choice was correct, so no answer-key leak.
 *
 * satori (next/og) quirks: every container needs explicit display:flex,
 * and it flattens React fragments into an inline row, so each element is
 * a direct, individually-guarded child of the flex column.
 */
export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const n = searchParams.get("n");
  const track = searchParams.get("track");
  const r = searchParams.get("r");
  const isResult = r === "correct" || r === "missed";
  const correct = r === "correct";

  const verdict = correct ? "Correct read" : "Missed it";
  const verdictColor = correct ? "#34d399" : "#e6788f";

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
          gap: "24px",
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
          Train Your Instincts
        </div>

        {isResult && (
          <div
            style={{
              display: "flex",
              fontSize: "92px",
              fontWeight: 200,
              color: verdictColor,
            }}
          >
            {verdict}
          </div>
        )}
        {isResult && (
          <div style={{ display: "flex", fontSize: "30px", color: "#e5e5e5" }}>
            {`Tell ${n ?? ""}${track ? ` · ${track}` : ""}`}
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
            Today&rsquo;s Tell
          </div>
        )}
        {!isResult && (
          <div
            style={{
              display: "flex",
              fontSize: "28px",
              color: "#a0a0a0",
              textAlign: "center",
              maxWidth: "760px",
            }}
          >
            Sixty seconds. One artifact, one question, one read.
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
          kanikarose.com/tells
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
