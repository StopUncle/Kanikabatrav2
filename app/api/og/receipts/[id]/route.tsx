import { ImageResponse } from "next/og";
import { getPublicReceipt } from "@/lib/receipts/public";

// Node runtime (not edge) so the Prisma read is reliable.
export const runtime = "nodejs";

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * Pull the body of the first section ("What they are doing") as the share
 * hook. It is the punchiest line of the read, and a teaser earns the click
 * better than cramming the full 250-word read onto a card.
 */
function extractHook(read: string): string {
  const afterFirstHeading = read.replace(/^[\s\S]*?##[^\n]*\n/, "");
  const body = afterFirstHeading.split(/\n##\s/)[0] ?? read;
  const cleaned = body.replace(/\s+/g, " ").trim();
  if (cleaned.length <= 240) return cleaned;
  return `${cleaned.slice(0, 237).trimEnd()}...`;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;

  try {
    const receipt = await getPublicReceipt(id);
    const hook = receipt
      ? extractHook(receipt.response)
      : "Paste a text. Get the read nobody around you will give you.";

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background:
              "linear-gradient(135deg, #0a0a0a 0%, #0f172a 55%, #1a0a14 100%)",
            fontFamily: "system-ui",
            padding: "70px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontSize: "26px",
                color: "#d4af37",
                textTransform: "uppercase",
                letterSpacing: "6px",
              }}
            >
              The Receipt
            </div>
            <div
              style={{
                fontSize: "16px",
                color: "#a0a0a0",
                textTransform: "uppercase",
                letterSpacing: "3px",
                marginTop: "8px",
              }}
            >
              Read in Kanika&apos;s voice
            </div>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "44px",
              lineHeight: "1.3",
              fontWeight: "300",
              color: "#f5f0ed",
              borderLeft: "4px solid #d4af37",
              paddingLeft: "32px",
            }}
          >
            {hook}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div
              style={{
                fontSize: "22px",
                color: "#d4af37",
              }}
            >
              Get your own read, free
            </div>
            <div
              style={{
                fontSize: "20px",
                color: "#a0a0a0",
                letterSpacing: "1px",
              }}
            >
              kanikarose.com/receipts
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch {
    return new Response("Error generating image", { status: 500 });
  }
}
