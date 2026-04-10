import { NextRequest, NextResponse } from "next/server";
import type { LogEntry } from "@/lib/logger";

export async function POST(request: NextRequest) {
  try {
    const logEntry: LogEntry = await request.json();

    // Validate the log entry
    if (!logEntry.level || !logEntry.message || !logEntry.timestamp) {
      return NextResponse.json(
        { error: "Invalid log entry format" },
        { status: 400 },
      );
    }

    // Add request metadata
    const enhancedLog = {
      ...logEntry,
      ip:
        request.headers.get("x-forwarded-for") ||
        request.headers.get("x-real-ip") ||
        "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
      url: request.url,
      receivedAt: new Date().toISOString(),
    };

    // Always log to stderr so Railway's log capture can see client errors.
    // In dev mode the extra formatting is helpful; in prod the raw JSON is
    // sufficient for searching/filtering in log aggregation tools.
    console.error(
      "[client-error]",
      JSON.stringify(enhancedLog, null, process.env.NODE_ENV === "development" ? 2 : 0),
    );
    return NextResponse.json({
      success: true,
      message: "Error logged successfully",
    });
  } catch (error: unknown) {
    // Don't use logger here to avoid infinite loops
    console.error("Failed to process error log:", error);

    return NextResponse.json(
      { error: "Failed to process error log" },
      { status: 500 },
    );
  }
}

// Optional: GET endpoint to retrieve recent errors (admin only)
export async function GET(request: NextRequest) {
  try {
    // This would require authentication in a real app
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // In a real app, verify the token and check admin permissions
    // For now, just return empty array
    return NextResponse.json({
      errors: [],
      message: "Error retrieval not implemented",
    });
  } catch (error: unknown) {
    console.error("Failed to retrieve errors:", error);

    return NextResponse.json(
      { error: "Failed to retrieve errors" },
      { status: 500 },
    );
  }
}
