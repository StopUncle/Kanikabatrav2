import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { readPact } from "@/lib/pact/read";

/**
 * "I kept it." Self-reported on purpose: the signature is a commitment to
 * honesty, and the product's whole bet is that a promise to yourself with
 * your name on it is worth more than a checkbox someone verifies. Only the
 * current, still-open week can be kept; a week that has ended is a scar
 * and stays one.
 */
export async function POST(request: NextRequest) {
  return requireAuth(request, async (_req, user) => {
    const read = await readPact(user.id);
    if (!read.pact || !read.entry) {
      return NextResponse.json({ error: "No pact to keep" }, { status: 404 });
    }
    if (read.entry.status === "kept") {
      return NextResponse.json({ success: true, status: "kept" });
    }
    if (read.entry.status !== "open") {
      return NextResponse.json(
        { error: "That week has already closed" },
        { status: 409 },
      );
    }

    // Guarded on status so a racing scar pass cannot be overwritten after
    // the week has ended.
    const updated = await prisma.pactEntry.updateMany({
      where: { id: read.entry.id, status: "open" },
      data: { status: "kept" },
    });
    if (updated.count === 0) {
      return NextResponse.json(
        { error: "That week has already closed" },
        { status: 409 },
      );
    }
    return NextResponse.json({ success: true, status: "kept" });
  });
}
