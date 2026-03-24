import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(145deg, #080814, #0d0a12)",
        borderRadius: "40px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "140px",
          height: "140px",
          borderRadius: "50%",
          border: "1.5px solid rgba(212, 175, 55, 0.3)",
        }}
      >
        <span
          style={{
            fontSize: 72,
            fontFamily: "Georgia, serif",
            fontWeight: 400,
            color: "#d4af37",
            letterSpacing: "-3px",
          }}
        >
          K
        </span>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
