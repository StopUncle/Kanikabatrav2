import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { buildNewsletterDrip } from "@/lib/email-sequences";
import { marketingFooterByEmailHtml } from "@/lib/email-footer";
import { logger } from "@/lib/logger";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://kanikarose.com";

/**
 * Direct subscriber capture for server-side callers.
 *
 * The free Receipts tool used to capture leads by POSTing to its own
 * /api/newsletter endpoint. Every one of those internal requests reached
 * the rate limiter from the app's own egress IP, so all visitors shared
 * ONE 10/min bucket: past ten captures a minute, real podcast leads were
 * silently dropped while the read was still served. Calling this instead
 * skips HTTP entirely, so the public route's limiter only ever meters
 * real browsers.
 *
 * Upserts the Subscriber, enrolls brand-new addresses in the generic
 * drip, and sends a welcome that acknowledges what the visitor actually
 * came for. Returning subscribers get the welcome too, when this source
 * is new for them; only the drip is first-time-only. Never throws; a
 * capture hiccup must not deny the feature the visitor just earned.
 */
export async function captureSubscriber(opts: {
  email: string;
  name?: string | null;
  source: string;
  tags: string[];
}): Promise<void> {
  try {
    const normalized = opts.email.toLowerCase();
    const existing = await prisma.subscriber.findUnique({
      where: { email: normalized },
    });
    const isNew = !existing;
    // A returning subscriber gets the welcome only when this capture adds
    // a tag they did not already have. Without this, every re-run of the
    // Receipts tool re-sent the same welcome to the same address.
    const addsNewTag = existing
      ? opts.tags.some((t) => !(existing.tags || []).includes(t))
      : true;

    if (existing) {
      await prisma.subscriber.update({
        where: { email: normalized },
        data: {
          tags: Array.from(new Set([...(existing.tags || []), ...opts.tags])),
        },
      });
    } else {
      await prisma.subscriber.create({
        data: {
          email: normalized,
          name: opts.name || null,
          source: opts.source,
          tags: opts.tags,
          verified: true,
        },
      });
    }

    if (isNew) {
      const dripDisplayName =
        opts.name || normalized.split("@")[0] || "you";
      try {
        const existingDrip = await prisma.emailQueue.findFirst({
          where: { recipientEmail: normalized, sequence: "newsletter-drip" },
          select: { id: true },
        });
        if (!existingDrip) {
          const entries = buildNewsletterDrip(normalized, dripDisplayName);
          await prisma.emailQueue.createMany({ data: entries });
        }
      } catch (dripErr) {
        logger.error("[capture] drip enqueue failed", dripErr as Error, {
          email: normalized,
        });
      }
    }

    if (!addsNewTag) return;

    // Source-aware opener: the Receipts capture happens because the
    // visitor just traded their email for a message read. A welcome that
    // ignores that reads like it went to the wrong person.
    const isReceipts = opts.source.toLowerCase().includes("receipt");
    const opener = isReceipts
      ? `<p style="color: #94a3b8; line-height: 1.6;">
              Your Receipts read is on its screen; take your time with it. This email is the other half of the trade: you're on the inside now.
            </p>`
      : `<p style="color: #94a3b8; line-height: 1.6;">
              Thanks for subscribing. You're now on the inside.
            </p>`;

    const welcomeHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1a0d11 0%, #0a1628 100%); padding: 30px; border-radius: 10px 10px 0 0;">
            <h1 style="color: #d4af37; margin: 0; font-size: 24px;">Welcome</h1>
          </div>
          <div style="background: #050511; padding: 30px; border: 1px solid #d4af37; border-top: none; border-radius: 0 0 10px 10px;">
            <p style="color: #f5f0ed; font-size: 16px; line-height: 1.6;">Hey,</p>
            ${opener}
            <p style="color: #94a3b8; line-height: 1.6;">
              I'll be sharing insights on power dynamics, strategic psychology, and the patterns most people miss, directly to your inbox.
            </p>
            <p style="color: #94a3b8; line-height: 1.6;">
              While you're here, two places worth starting:
            </p>
            <p style="color: #94a3b8; line-height: 1.6;">
              <a href="${baseUrl}/quiz" style="color: #d4af37; text-decoration: none; font-weight: 600;">The Dark Mirror Assessment</a>, free, five minutes, six personality axes.<br>
              <a href="${baseUrl}/book" style="color: #d4af37; text-decoration: none; font-weight: 600;">The Sociopathic Dating Bible</a>, the playbook everything here is built on.
            </p>
            <p style="color: #d4af37; font-style: italic; margin-top: 30px;">
              Kanika Batra<br>
              <span style="color: #666; font-size: 12px;">The Psychology of Power</span>
            </p>
          </div>
        </div>
        ${marketingFooterByEmailHtml(normalized, "marketing")}
      `;

    sendEmail({
      to: normalized,
      subject: "Welcome to The Psychology of Power",
      html: welcomeHtml,
    }).catch((err) =>
      logger.error("[capture] welcome email failed", err as Error, {
        email: normalized,
      }),
    );
  } catch (err) {
    logger.error(
      "[capture] subscriber capture failed",
      err instanceof Error ? err : new Error(String(err)),
    );
  }
}
