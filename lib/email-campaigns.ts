/**
 * Marketing-email campaign templates + enrollment.
 *
 * Five evergreen emails covering the five products in Kanika's
 * catalogue (quiz, book, simulator, Consilium, coaching). Each is a
 * pure function that takes a recipient and returns subject + html.
 * Enrollment: queue the email into EmailQueue with a small
 * staggered scheduledAt so a 1k-recipient blast lands over ~10 min
 * rather than hitting transport rate limits.
 *
 * Every send funnels through sendMarketingEmail at delivery time
 * (see app/api/admin/email-queue/process — this enrollment just
 * queues rows; the processor reads emailPreferences.marketing AT
 * SEND TIME so a user who opts out between enqueue and delivery is
 * respected).
 */
import { prisma } from "@/lib/prisma";
import { marketingFooterHtml } from "@/lib/email-marketing";
import type { UnsubscribeType } from "@/lib/unsubscribe-token";

export type CampaignId =
  | "drip-quiz"
  | "drip-book"
  | "drip-simulator"
  | "drip-consilium"
  | "drip-coaching"
  | "drip-ask-kanika";

interface RecipientCtx {
  userId: string;
  email: string;
  firstName: string;
}

interface CampaignDef {
  id: CampaignId;
  /** Pref key gating delivery + driving the unsub link. */
  type: UnsubscribeType;
  /** Short label for the admin UI. */
  label: string;
  /** Headline for the admin UI. */
  hook: string;
  /** Returns the subject line. */
  subject: (r: RecipientCtx) => string;
  /** Returns the inner HTML body (footer is appended at send time). */
  html: (r: RecipientCtx) => string;
}

// ---- Shared shell ----
function shell(headline: string, kicker: string, body: string, ctaUrl: string, ctaLabel: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>${kicker}</title></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,'Segoe UI',Roboto,Helvetica,sans-serif;color:#efe7d6;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0a0a0a;">
    <tr><td align="center" style="padding:40px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:#13100b;border:1px solid #d4af3722;border-radius:12px;">
        <tr><td style="padding:36px 32px 28px 32px;">
          <p style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#d4af37;margin:0 0 18px 0;font-weight:600;">${kicker}</p>
          <h1 style="font-size:24px;font-weight:300;color:#f5efe2;margin:0 0 24px 0;letter-spacing:0.5px;line-height:1.25;">${headline}</h1>
          ${body}
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:8px auto 28px auto;">
            <tr><td align="center" bgcolor="#d4af37" style="background:#d4af37;border-radius:999px;">
              <a href="${ctaUrl}" style="display:inline-block;padding:15px 36px;color:#0d0d0d;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">${ctaLabel} &rarr;</a>
            </td></tr>
          </table>
          <p style="font-size:14px;line-height:1.6;color:#f3d98a;margin:18px 0 0 0;font-style:italic;">&mdash; Kanika</p>
        </td></tr>
      </table>
      <p style="margin:18px 0 0 0;font-size:11px;color:#665a4f;letter-spacing:1px;">kanikarose.com</p>
    </td></tr>
  </table>
</body>
</html>`;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://kanikarose.com";

// UTM tag every CTA so we can attribute revenue back to the campaign
// without relying on memory or referer headers (Gmail strips them).
function withUtm(path: string, campaign: CampaignId): string {
  const sep = path.includes("?") ? "&" : "?";
  return `${BASE_URL}${path}${sep}utm_source=email&utm_medium=marketing&utm_campaign=${campaign}`;
}

// ---- Campaign 1: Quiz ----
const quiz: CampaignDef = {
  id: "drip-quiz",
  type: "marketing",
  label: "1. Quiz — Dark Mirror",
  hook: "What's actually looking back at you?",
  subject: () => "What's actually looking back at you?",
  html: (r) =>
    shell(
      `${r.firstName}, you've never been clinically read before.`,
      "The Dark Mirror",
      `
        <p style="font-size:15.5px;line-height:1.7;color:#efe7d6;margin:0 0 18px 0;">
          Most personality tests are flattering nonsense. Mine isn't. The Dark Mirror is a 20-question clinical assessment — Cluster B traits, functioning level, the patterns you actually live in.
        </p>
        <p style="font-size:15.5px;line-height:1.7;color:#efe7d6;margin:0 0 18px 0;">
          You'll see your dominant type and your secondary, scored across six axes: <strong style="color:#f3d98a;">psychopathic, sociopathic, narcissistic, borderline, histrionic, neurotypical.</strong> Whichever ones you score high on — that's the conversation you've been avoiding having with yourself.
        </p>
        <p style="font-size:15.5px;line-height:1.7;color:#efe7d6;margin:0 0 28px 0;">
          Five to seven minutes. $9.99 to unlock the full read. Refundable if it doesn't tell you something you didn't already know.
        </p>
      `,
      withUtm("/quiz", "drip-quiz"),
      "Take the assessment",
    ),
};

// ---- Campaign 2: Book ----
const book: CampaignDef = {
  id: "drip-book",
  type: "marketing",
  label: "2. Book — Sociopathic Dating Bible",
  hook: "The strategy they don't teach you",
  subject: () => "The dating book they don't want you reading",
  html: (r) =>
    shell(
      `${r.firstName}, this isn't a self-help book.`,
      "The Sociopathic Dating Bible",
      `
        <p style="font-size:15.5px;line-height:1.7;color:#efe7d6;margin:0 0 18px 0;">
          Seventy-thousand words. Fifteen chapters. Two bonus addenda on narcissists and avoidants. Written by a clinically diagnosed sociopath — the only person you've ever read on this topic who isn't <em>describing</em> the predator from outside but writing as one.
        </p>
        <p style="font-size:15.5px;line-height:1.7;color:#efe7d6;margin:0 0 18px 0;">
          You learn the moves they use on you. The tells you've been missing. How to stop being the person who gets played and start being the person who controls the frame.
        </p>
        <p style="font-size:15.5px;line-height:1.7;color:#efe7d6;margin:0 0 28px 0;">
          <strong style="color:#f3d98a;">$24.99.</strong> EPUB + PDF, instant download. Members of the Consilium read it for free.
        </p>
      `,
      withUtm("/book", "drip-book"),
      "Read the book",
    ),
};

// ---- Campaign 3: Simulator ----
const simulator: CampaignDef = {
  id: "drip-simulator",
  type: "marketing",
  label: "3. Simulator — Practice scenarios",
  hook: "Practice the conversation you've been avoiding",
  subject: () => "Practice the conversation you've been avoiding",
  html: (r) =>
    shell(
      `${r.firstName}, you can practice manipulation without consequence.`,
      "The Dark Mirror Simulator",
      `
        <p style="font-size:15.5px;line-height:1.7;color:#efe7d6;margin:0 0 18px 0;">
          Fifty-nine branching scenarios. Eight tracks. The narcissist boss, the framer ex, the guy who moves you around without you noticing. Every choice has a tactical consequence. You either read the room or you don't.
        </p>
        <p style="font-size:15.5px;line-height:1.7;color:#efe7d6;margin:0 0 18px 0;">
          Most members tell me the first scenario is the one they replay. Three minutes. You'll see exactly which moves you naturally reach for — and which ones cost you.
        </p>
        <p style="font-size:15.5px;line-height:1.7;color:#efe7d6;margin:0 0 28px 0;">
          The first scenario is free, no signup. Try it. If it changes how you'd reply to the next text you get, you'll know what the rest is worth.
        </p>
      `,
      withUtm("/try", "drip-simulator"),
      "Try the simulator",
    ),
};

// ---- Campaign 4: Consilium ----
const consilium: CampaignDef = {
  id: "drip-consilium",
  type: "marketing",
  label: "4. Consilium — Inner Circle",
  hook: "A private council of people done being played",
  subject: () => "A private council — for people done being played",
  html: (r) =>
    shell(
      `${r.firstName}, the Consilium is the room you've been looking for.`,
      "The Consilium",
      `
        <p style="font-size:15.5px;line-height:1.7;color:#efe7d6;margin:0 0 18px 0;">
          A private community for people who are done getting blindsided. Daily psychology drops. Voice notes from me — raw, unedited. The full simulator. The full course library. Live chat with people who think the way you've been afraid to admit you think.
        </p>
        <p style="font-size:15.5px;line-height:1.7;color:#efe7d6;margin:0 0 18px 0;">
          The book comes free with the membership. So if you were thinking about the book — the maths is obvious. <strong style="color:#f3d98a;">$29/month, cancel anytime.</strong>
        </p>
        <p style="font-size:15.5px;line-height:1.7;color:#efe7d6;margin:0 0 28px 0;">
          Twenty-nine people in there right now. The vibe is "smart, slightly feral, refuses to be polite about being lied to." If that's you, step inside.
        </p>
      `,
      withUtm("/consilium", "drip-consilium"),
      "Step inside",
    ),
};

// ---- Campaign 5: Coaching ----
const coaching: CampaignDef = {
  id: "drip-coaching",
  type: "marketing",
  label: "5. Coaching — 1:1 with Kanika",
  hook: "I tell you what I see",
  subject: () => "When you're ready for someone to tell you the truth",
  html: (r) =>
    shell(
      `${r.firstName}, this is for when you're done pretending you can figure it out alone.`,
      "Private Coaching",
      `
        <p style="font-size:15.5px;line-height:1.7;color:#efe7d6;margin:0 0 18px 0;">
          I work with men and women. This is not therapy &mdash; I'm not a licensed therapist and I don't treat mental-health conditions. This is for when you can name the pattern but can't break it. When you keep ending up in the same room with the same kind of person and you're sick of pretending you don't know why.
        </p>
        <p style="font-size:15.5px;line-height:1.7;color:#efe7d6;margin:0 0 18px 0;">
          I tell you what I see. Whether you like it or not. Most people leave the first session knowing something they didn't want to know about themselves. That's the work.
        </p>
        <p style="font-size:15.5px;line-height:1.7;color:#efe7d6;margin:0 0 28px 0;">
          Single session, intensive (3), career (4), or retainer. Limited spots. Apply when you're ready.
        </p>
      `,
      withUtm("/coaching", "drip-coaching"),
      "See the packages",
    ),
};

// ---- Campaign 6: Ask Kanika (NEW feature → Consilium pitch) ----
// Anchored on the just-shipped Ask Kanika feature as the news hook.
// Body pivots the news into the Consilium pitch — "this lives inside
// the membership, here's why now is the time to join." Targeted at
// non-members; opt-out check still happens at send time so members
// (who should already see the pill) don't get re-pitched their own
// product. We may want a hasActiveMembership filter later — for now,
// the broad blast is OK because the email reads as exciting news,
// not a hard sell, even to existing members.
const askKanika: CampaignDef = {
  id: "drip-ask-kanika",
  type: "marketing",
  label: "6. Ask Kanika — direct access (NEW)",
  hook: "You can ask me anything now — and I'll answer in voice",
  subject: () => "You can ask me anything now",
  html: (r) =>
    shell(
      `${r.firstName}, this is new. I want you in for it.`,
      "Ask Kanika · just shipped",
      `
        <p style="font-size:15.5px;line-height:1.7;color:#efe7d6;margin:0 0 18px 0;">
          As of today, members of the Consilium can ask me one question every twenty-four hours, and I answer the top-voted ones in voice or on video. Direct. No middleman, no filter, no DM you'll have to scroll past.
        </p>
        <p style="font-size:15.5px;line-height:1.7;color:#efe7d6;margin:0 0 18px 0;">
          You write the question. The community upvotes the ones that resonate. I work my way down the queue and answer the ones that make me think. When yours gets answered, you get an email and a green-dot notification on your pill.
        </p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 0 0 24px 0;">
          <tr>
            <td bgcolor="#22151a" style="background:#22151a;border-left:3px solid #d4af37;border-radius:6px;padding:16px 18px;">
              <p style="color:#f3d98a;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;margin:0 0 8px 0;font-weight:600;">Who actually uses this</p>
              <p style="color:#efe7d6;font-size:14px;line-height:1.65;margin:0;">
                The questions in the queue right now: <em>"How do I read someone who refuses to be read?"</em> · <em>"What's the tell when an apology is performance?"</em> · <em>"How do you stop a smear campaign before it starts?"</em>
              </p>
            </td>
          </tr>
        </table>
        <p style="font-size:15.5px;line-height:1.7;color:#efe7d6;margin:0 0 18px 0;">
          This isn't a coaching call. It's not a course module. It's the closest thing to <strong style="color:#f3d98a;">unfiltered access</strong> I'm willing to give &mdash; and it lives inside the Consilium for the same reason the simulator does: the room has to stay tight.
        </p>
        <p style="font-size:15.5px;line-height:1.7;color:#efe7d6;margin:0 0 28px 0;">
          <strong style="color:#f3d98a;">$29/month.</strong> Cancel anytime. The book comes free with it. The simulator, the courses, the daily psychology drops, and now this.
        </p>
      `,
      withUtm("/consilium", "drip-ask-kanika"),
      "Step inside",
    ),
};

export const CAMPAIGNS: Record<CampaignId, CampaignDef> = {
  "drip-quiz": quiz,
  "drip-book": book,
  "drip-simulator": simulator,
  "drip-consilium": consilium,
  "drip-coaching": coaching,
  "drip-ask-kanika": askKanika,
};

export function listCampaigns(): CampaignDef[] {
  return Object.values(CAMPAIGNS);
}

interface EnqueueResult {
  campaignId: CampaignId;
  enqueued: number;
  skipped: { reason: string; count: number }[];
}

/**
 * Queue a campaign to every eligible user. Eligibility = registered,
 * not banned, not a bot, marketing pref ≠ false. The actual opt-out
 * recheck happens AT SEND TIME in the queue processor, so no race.
 *
 * @param scheduledAt earliest send time. Each row is staggered +30s
 *   from the prior one so 1k recipients spread over ~8 hours,
 *   sidestepping per-second SMTP / Resend rate limits without the
 *   processor having to know about pacing.
 */
export async function enqueueCampaignToAllOptedIn(
  campaignId: CampaignId,
  scheduledAt: Date = new Date(),
): Promise<EnqueueResult> {
  const def = CAMPAIGNS[campaignId];
  if (!def) throw new Error(`Unknown campaign: ${campaignId}`);

  const candidates = await prisma.user.findMany({
    where: {
      isBanned: false,
      isBot: false,
    },
    select: {
      id: true,
      email: true,
      name: true,
      displayName: true,
      emailPreferences: true,
    },
  });

  const tally = { sent: 0, optedOut: 0, alreadyQueued: 0 };

  // Pre-fetch any existing PENDING / SENT rows for this campaign so we
  // don't double-queue if the admin clicks "send" twice. Identifying
  // by sequence + recipientEmail.
  const existing = await prisma.emailQueue.findMany({
    where: {
      sequence: campaignId,
      recipientEmail: { in: candidates.map((c) => c.email.toLowerCase()) },
      status: { in: ["PENDING", "SENT"] },
    },
    select: { recipientEmail: true },
  });
  const alreadyQueuedSet = new Set(
    existing.map((e) => e.recipientEmail.toLowerCase()),
  );

  const STAGGER_SECONDS = 30;
  const rows: Array<{
    recipientEmail: string;
    recipientName: string;
    sequence: string;
    step: number;
    subject: string;
    htmlBody: string;
    scheduledAt: Date;
    status: string;
    metadata: object;
  }> = [];

  for (const u of candidates) {
    const lower = u.email.toLowerCase();
    if (alreadyQueuedSet.has(lower)) {
      tally.alreadyQueued++;
      continue;
    }
    const prefs = u.emailPreferences as { marketing?: boolean } | null;
    if (prefs && prefs.marketing === false) {
      tally.optedOut++;
      continue;
    }

    const firstName = u.displayName || u.name || "there";
    const ctx: RecipientCtx = { userId: u.id, email: lower, firstName };
    const subject = def.subject(ctx);
    // The footer needs to be baked in NOW because the queue
    // processor calls plain sendEmail. This keeps the unsubscribe
    // link correct (signed for the right userId).
    const inner = def.html(ctx);
    const footer = marketingFooterHtml(u.id, def.type, lower);
    const html = inner.includes("</body>")
      ? inner.replace("</body>", `${footer}</body>`)
      : `${inner}\n${footer}`;

    rows.push({
      recipientEmail: lower,
      recipientName: firstName,
      sequence: campaignId,
      step: 1,
      subject,
      htmlBody: html,
      scheduledAt: new Date(scheduledAt.getTime() + tally.sent * STAGGER_SECONDS * 1000),
      status: "PENDING",
      metadata: {
        isMarketing: true,
        unsubscribeType: def.type,
        campaign: campaignId,
      },
    });
    tally.sent++;
  }

  if (rows.length > 0) {
    await prisma.emailQueue.createMany({ data: rows });
  }

  return {
    campaignId,
    enqueued: tally.sent,
    skipped: [
      { reason: "opted-out", count: tally.optedOut },
      { reason: "already-queued", count: tally.alreadyQueued },
    ],
  };
}
