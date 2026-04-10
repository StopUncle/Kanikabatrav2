import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { error: "Download token is required" },
        { status: 400 },
      );
    }

    const purchase = await prisma.purchase.findUnique({
      where: { downloadToken: token },
    });

    if (!purchase) {
      return NextResponse.json(
        { error: "Invalid download token" },
        { status: 404 },
      );
    }

    if (purchase.status !== "COMPLETED") {
      return NextResponse.json(
        { error: "Purchase is not completed" },
        { status: 400 },
      );
    }

    if (purchase.expiresAt && purchase.expiresAt < new Date()) {
      return NextResponse.json(
        { error: "Download link has expired. Please contact Kanika@kanikarose.com for a new link." },
        { status: 410 },
      );
    }

    if (purchase.downloadCount >= purchase.maxDownloads) {
      return NextResponse.json(
        {
          error: `Maximum download limit (${purchase.maxDownloads}) reached. Please contact Kanika@kanikarose.com for help.`,
        },
        { status: 429 },
      );
    }

    if (purchase.type !== "BOOK") {
      return NextResponse.json(
        { error: "This purchase is not for a downloadable book" },
        { status: 400 },
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
      return NextResponse.json(
        { error: "Book file is temporarily unavailable. Please try again in a few minutes or contact Kanika@kanikarose.com" },
        { status: 503 },
      );
    }

    // Read the file BEFORE incrementing download count so a readFile
    // failure doesn't burn one of the user's 10 allowed downloads.
    const fileBuffer = await fs.readFile(bookPath);

    await prisma.purchase.update({
      where: { id: purchase.id },
      data: {
        downloadCount: { increment: 1 },
        lastDownloadAt: new Date(),
      },
    });

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
