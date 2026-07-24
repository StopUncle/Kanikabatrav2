import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

// People click these links from an email, so a dead link must land on a
// page with a way forward (the /resend self-serve form), not a raw JSON
// blob. Browsers advertise text/html in Accept; API clients keep JSON.
function friendlyFail(
  request: NextRequest,
  reason: "invalid" | "expired" | "limit" | "unavailable",
  jsonBody: { error: string },
  status: number,
): NextResponse {
  const wantsHtml = request.headers
    .get("accept")
    ?.toLowerCase()
    .includes("text/html");
  if (wantsHtml) {
    return NextResponse.redirect(
      new URL(`/resend?reason=${reason}`, request.url),
      302,
    );
  }
  return NextResponse.json(jsonBody, { status });
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get("token");

    if (!token) {
      return friendlyFail(
        request,
        "invalid",
        { error: "Download token is required" },
        400,
      );
    }

    const purchase = await prisma.purchase.findUnique({
      where: { downloadToken: token },
    });

    if (!purchase) {
      return friendlyFail(
        request,
        "invalid",
        { error: "Invalid download token" },
        404,
      );
    }

    if (purchase.status !== "COMPLETED") {
      return friendlyFail(
        request,
        "invalid",
        { error: "Purchase is not completed" },
        400,
      );
    }

    if (purchase.expiresAt && purchase.expiresAt < new Date()) {
      return friendlyFail(
        request,
        "expired",
        { error: "Download link has expired. Please contact Kanika@kanikarose.com for a new link." },
        410,
      );
    }

    if (purchase.downloadCount >= purchase.maxDownloads) {
      return friendlyFail(
        request,
        "limit",
        {
          error: `Maximum download limit (${purchase.maxDownloads}) reached. Please contact Kanika@kanikarose.com for help.`,
        },
        429,
      );
    }

    if (purchase.type !== "BOOK") {
      return friendlyFail(
        request,
        "invalid",
        { error: "This purchase is not for a downloadable book" },
        400,
      );
    }

    const format = searchParams.get("format") || "pdf";

    let bookFilename: string;
    let displayName: string;
    let contentType = "application/pdf";

    switch (format) {
      case "epub":
        bookFilename = "FINAL_BOOK.epub";
        displayName = "Sociopathic_Dating_Bible_Kanika_Batra.epub";
        contentType = "application/epub+zip";
        break;
      case "bonus-narcissists":
        bookFilename = "Addendum_Narcissists.epub";
        displayName = "Addendum_Understanding_Narcissists_Kanika_Batra.epub";
        contentType = "application/epub+zip";
        break;
      case "bonus-narcissists-pdf":
        bookFilename = "Addendum_Narcissists.pdf";
        displayName = "Addendum_Understanding_Narcissists_Kanika_Batra.pdf";
        break;
      case "bonus-avoidants":
        bookFilename = "Addendum_Avoidants.epub";
        displayName = "Addendum_The_Avoidant_Playbook_Kanika_Batra.epub";
        contentType = "application/epub+zip";
        break;
      case "bonus-avoidants-pdf":
        bookFilename = "Addendum_Avoidants.pdf";
        displayName = "Addendum_The_Avoidant_Playbook_Kanika_Batra.pdf";
        break;
      default:
        bookFilename = "FINAL_BOOK.pdf";
        displayName = "Sociopathic_Dating_Bible_Kanika_Batra.pdf";
    }

    const bookPath = path.join(process.cwd(), "private", "books", bookFilename);

    try {
      await fs.access(bookPath);
    } catch {
      console.error(`[download] file not found: ${bookFilename}`);
      return friendlyFail(
        request,
        "unavailable",
        { error: "Book file is temporarily unavailable. Please try again in a few minutes or contact Kanika@kanikarose.com" },
        503,
      );
    }

    // Atomically claim a download slot. The guard inside the WHERE is the
    // real enforcement of maxDownloads: the earlier read-then-check above
    // gives a friendly 429 message but can't stop concurrent requests that
    // all read the same stale count. This conditional update can.
    const claimed = await prisma.purchase.updateMany({
      where: {
        id: purchase.id,
        downloadCount: { lt: purchase.maxDownloads },
      },
      data: {
        downloadCount: { increment: 1 },
        lastDownloadAt: new Date(),
      },
    });

    if (claimed.count === 0) {
      return friendlyFail(
        request,
        "limit",
        {
          error: `Maximum download limit (${purchase.maxDownloads}) reached. Please contact Kanika@kanikarose.com for help.`,
        },
        429,
      );
    }

    let fileBuffer: Buffer;
    try {
      fileBuffer = await fs.readFile(bookPath);
    } catch (readError) {
      // Refund the claimed slot so a disk failure doesn't burn one of the
      // user's 10 allowed downloads.
      try {
        await prisma.purchase.update({
          where: { id: purchase.id },
          data: { downloadCount: { decrement: 1 } },
        });
      } catch (refundError) {
        console.error("[download] failed to refund download slot:", refundError);
      }
      console.error(`[download] readFile failed for ${bookFilename}:`, readError);
      return friendlyFail(
        request,
        "unavailable",
        { error: "Book file is temporarily unavailable. Please try again in a few minutes or contact Kanika@kanikarose.com" },
        503,
      );
    }

    return new NextResponse(fileBuffer as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${displayName}"`,
        "Content-Length": fileBuffer.length.toString(),
        "Cache-Control": "private, no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json(
      { error: "Failed to process download request" },
      { status: 500 },
    );
  }
}
