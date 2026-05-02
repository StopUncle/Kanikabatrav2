/**
 * GET /api/tells/[id]/og
 *
 * Server-rendered Open Graph image for a Tell. 1200x630, dark luxury
 * palette, shows the question + Tell number + track. Used by /tells
 * and /tells/[slug] in OG meta tags so a shared link previews as a
 * proper card on Twitter, Slack, iMessage, IG DMs.
 *
 * Node runtime (not edge) because we read from Prisma. Cached for
 * an hour at the CDN since Tell content rarely changes after publish.
 */

import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { TRACK_LABELS, type InstinctTrack } from "@/lib/tells/types";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  // Look up by id OR slug, so /api/tells/<slug>/og also works.
  const tell = await prisma.tell.findFirst({
    where: { OR: [{ id }, { slug: id }] },
    select: {
      number: true,
      track: true,
      question: true,
      status: true,
    },
  });

  if (!tell || tell.status !== "PUBLISHED") {
    return new Response("Not found", { status: 404 });
  }

  const numberLabel = String(tell.number).padStart(3, "0");
  const trackLabel = TRACK_LABELS[tell.track as InstinctTrack];

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#050511",
          backgroundImage:
            "linear-gradient(135deg, #050511 0%, #1a0d11 60%, #0a1628 100%)",
          padding: "80px",
          color: "#f5f0ed",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        {/* Dusty rose accent glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 80% 20%, rgba(183, 110, 121, 0.18) 0%, transparent 55%)",
          }}
        />

        {/* Top eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            fontSize: 22,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "rgba(183, 110, 121, 0.85)",
            fontFamily: "system-ui, sans-serif",
            fontWeight: 300,
          }}
        >
          <span>Tell {numberLabel}</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>{trackLabel}</span>
        </div>

        {/* Question, the headline */}
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            fontSize: 56,
            lineHeight: 1.2,
            fontWeight: 300,
            color: "#f5f0ed",
            marginTop: 32,
            marginBottom: 32,
            paddingRight: 20,
          }}
        >
          {tell.question}
        </div>

        {/* Bottom rule */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            paddingTop: 32,
            borderTop: "1px solid rgba(245, 240, 237, 0.15)",
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 300,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "rgba(245, 240, 237, 0.95)",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Train Your Instincts
          </div>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(245, 240, 237, 0.5)",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            kanikarose.com
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    },
  );
}
