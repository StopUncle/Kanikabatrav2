/**
 * GET /api/u/[handle]/og
 *
 * Server-rendered Open Graph image for a public profile. 1200x630.
 * Shows the display name, composite rating, and a simple SVG hex
 * silhouette so the share card communicates "this person trains".
 *
 * Returns a generic placeholder card for missing or private profiles
 * (404-with-image rather than 404-without is friendlier in iMessage
 * previews).
 */

import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { AXIS_KEYS, AXIS_LABELS } from "@/lib/tells/types";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ handle: string }> },
) {
  const { handle } = await params;

  const user = await prisma.user.findUnique({
    where: { handle: handle.toLowerCase() },
    select: {
      handle: true,
      displayName: true,
      profilePublic: true,
      instinctScore: true,
      tellStreak: { select: { currentDays: true } },
    },
  });

  if (!user || !user.profilePublic) {
    return new Response("Not found", { status: 404 });
  }

  const score = user.instinctScore ?? {
    read: 1000,
    spot: 1000,
    reply: 1000,
    refuse: 1000,
    calibrate: 1000,
    hold: 1000,
    totalAnswered: 0,
  };

  const ratings: Record<string, number> = {
    READ: score.read,
    SPOT: score.spot,
    REPLY: score.reply,
    REFUSE: score.refuse,
    CALIBRATE: score.calibrate,
    HOLD: score.hold,
  };
  const composite = Math.round(
    AXIS_KEYS.reduce((sum, a) => sum + ratings[a], 0) / AXIS_KEYS.length,
  );
  const displayName = user.displayName ?? `@${user.handle}`;

  // Build the hex silhouette in SVG. We inline this as a data URL the
  // way next/og does best.
  const cx = 300;
  const cy = 315;
  const radius = 200;
  const min = 800;
  const max = 2200;

  const tip = (i: number, r: number) => {
    const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
    return {
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
    };
  };

  const polygon = AXIS_KEYS.map((axis, i) => {
    const v = ratings[axis];
    const norm = (Math.max(min, Math.min(max, v)) - min) / (max - min);
    const t = tip(i, radius * norm);
    return `${t.x.toFixed(0)},${t.y.toFixed(0)}`;
  }).join(" ");

  // Background hex ring (ghost guide).
  const ringPolygon = AXIS_KEYS.map((_, i) => {
    const t = tip(i, radius);
    return `${t.x.toFixed(0)},${t.y.toFixed(0)}`;
  }).join(" ");

  const labels = AXIS_KEYS.map((axis, i) => {
    const t = tip(i, radius * 1.18);
    return { axis, x: t.x, y: t.y, value: ratings[axis] };
  });

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          backgroundColor: "#050511",
          backgroundImage:
            "linear-gradient(135deg, #050511 0%, #1a0d11 60%, #0a1628 100%)",
          color: "#f5f0ed",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 30% 50%, rgba(183, 110, 121, 0.18) 0%, transparent 55%)",
          }}
        />

        {/* Left column: hex SVG (rendered as inline svg) */}
        <div
          style={{
            display: "flex",
            width: 600,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width={600} height={630} viewBox={`0 0 600 630`}>
            <polygon
              points={ringPolygon}
              fill="none"
              stroke="rgba(120,120,130,0.25)"
              strokeWidth={1}
            />
            <polygon
              points={polygon}
              fill="rgba(183,110,121,0.18)"
              stroke="rgba(183,110,121,0.85)"
              strokeWidth={2}
              strokeLinejoin="round"
            />
            {labels.map((l, i) => (
              <text
                key={i}
                x={l.x}
                y={l.y + 5}
                textAnchor="middle"
                fontSize={16}
                fill="rgba(245,240,237,0.85)"
                fontFamily="system-ui, sans-serif"
                style={{ letterSpacing: 3 }}
              >
                {AXIS_LABELS[l.axis]}
              </text>
            ))}
          </svg>
        </div>

        {/* Right column: text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            paddingRight: 80,
          }}
        >
          <p
            style={{
              fontSize: 18,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "rgba(183, 110, 121, 0.85)",
              fontFamily: "system-ui, sans-serif",
              fontWeight: 300,
              marginBottom: 16,
            }}
          >
            Train Your Instincts
          </p>
          <p
            style={{
              fontSize: 56,
              fontWeight: 300,
              lineHeight: 1.1,
              color: "#f5f0ed",
              marginBottom: 16,
            }}
          >
            {displayName}
          </p>
          <p
            style={{
              fontSize: 22,
              color: "rgba(245,240,237,0.55)",
              fontFamily: "system-ui, sans-serif",
              marginBottom: 36,
            }}
          >
            @{user.handle}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 18,
              borderTop: "1px solid rgba(245,240,237,0.15)",
              paddingTop: 24,
            }}
          >
            <span
              style={{
                fontSize: 90,
                fontWeight: 300,
                color: "#f5f0ed",
              }}
            >
              {composite}
            </span>
            <span
              style={{
                fontSize: 22,
                letterSpacing: 6,
                textTransform: "uppercase",
                color: "rgba(183, 110, 121, 0.85)",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              composite
            </span>
          </div>
          <p
            style={{
              fontSize: 18,
              color: "rgba(245,240,237,0.55)",
              fontFamily: "system-ui, sans-serif",
              marginTop: 24,
            }}
          >
            {user.tellStreak?.currentDays ?? 0} day streak &middot;{" "}
            {score.totalAnswered} answers
          </p>
          <p
            style={{
              fontSize: 16,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(245,240,237,0.4)",
              fontFamily: "system-ui, sans-serif",
              marginTop: 60,
            }}
          >
            kanikarose.com
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, max-age=600, s-maxage=600",
      },
    },
  );
}
