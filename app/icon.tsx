import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#050511",
        borderRadius: "6px",
      }}
    >
      <span
        style={{
          fontSize: 22,
          fontFamily: "Georgia, serif",
          fontWeight: 400,
          letterSpacing: "-1px",
          color: "#d4af37",
        }}
      >
        K
      </span>
    </div>,
    {
      ...size,
    },
  );
}
