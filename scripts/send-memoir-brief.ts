/**
 * One-off internal-briefing email to Kanika about the memoir option
 * sitting in Phase 1 Weeks 9-12 of the multimillion roadmap. Sends
 * via the existing sendEmail pipeline (Resend on hello@kanikarose.com),
 * styled as an internal memo rather than marketing copy.
 *
 * Run: railway run npx tsx scripts/send-memoir-brief.ts
 *
 * Subject is direct, body is structured. No drag-to-inbox CTA, no
 * upsells. This is operator-to-operator briefing material.
 */

import { config } from "dotenv";
import { sendEmail } from "@/lib/email";

config();

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Memoir option, Phase 1 brief</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #0a0a0a;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="640" cellspacing="0" cellpadding="0" border="0" style="max-width: 640px; width: 100%; background-color: #050511; border-radius: 12px; overflow: hidden; border: 1px solid rgba(212,175,55,0.18);">

          <tr>
            <td style="padding: 36px 40px 24px 40px; border-bottom: 1px solid rgba(212,175,55,0.15);">
              <p style="color: rgba(212,175,55,0.7); font-size: 11px; letter-spacing: 3px; text-transform: uppercase; margin: 0 0 8px 0;">
                Internal brief
              </p>
              <h1 style="color: #d4af37; font-size: 24px; font-weight: 300; letter-spacing: 0.5px; margin: 0;">
                The memoir option
              </h1>
              <p style="color: rgba(214,207,196,0.65); font-size: 13px; margin: 6px 0 0 0;">
                Phase 1 Weeks 9-12
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 32px 40px;">
              <p style="color: #f5f0ed; font-size: 15px; line-height: 1.75; margin: 0 0 22px 0;">
                Hey Kanika,
              </p>

              <p style="color: #d6cfc4; font-size: 15px; line-height: 1.8; margin: 0 0 24px 0;">
                Quick brief on the memoir-vs-prescriptive book decision. This sits in the Phase 1 plan (Weeks 9-12), but the timing has shifted because of the documentary inbound and the tier-1 podcast surge. Worth thinking about before the lawyer calls happen.
              </p>

              <h2 style="color: #d4af37; font-size: 13px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; margin: 32px 0 14px 0;">
                The decision in one line
              </h2>
              <p style="color: #d6cfc4; font-size: 15px; line-height: 1.8; margin: 0 0 24px 0;">
                The next book, the one that goes through a literary agent to a Big-5 publisher, is either a memoir (your story, your diagnosis, your life) or prescriptive (an expansion of the framework, with Mirror-Bonding as the structural spine). Not both. The advance is bigger if you pick correctly for the moment.
              </p>

              <h2 style="color: #d4af37; font-size: 13px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; margin: 32px 0 14px 0;">
                Why memoir is the recommended path
              </h2>
              <p style="color: #d6cfc4; font-size: 15px; line-height: 1.8; margin: 0 0 14px 0;">
                Four reasons specific to right now:
              </p>
              <ol style="color: #d6cfc4; font-size: 15px; line-height: 1.8; margin: 0 0 24px 0; padding-left: 22px;">
                <li style="margin-bottom: 14px;">
                  <strong style="color: #f5f0ed;">The documentary deals are inbound.</strong> Two production companies in diligence. A memoir under contract becomes the documentary's narrative spine. The two assets compound. A prescriptive book doesn't do this.
                </li>
                <li style="margin-bottom: 14px;">
                  <strong style="color: #f5f0ed;">Tier-1 podcasts (Mel Robbins, Diary of a CEO, Joe Rogan) book on the personal story.</strong> Without it you're a guest. With it, you're an episode. Memoir gives producers the structural arc to book around.
                </li>
                <li style="margin-bottom: 14px;">
                  <strong style="color: #f5f0ed;">Your existing book IS the prescriptive.</strong> Sociopathic Dating Bible already covers the framework. A second prescriptive book competes with the first. A memoir complements it: the framework book sells the memoir, the memoir sells the framework book.
                </li>
                <li>
                  <strong style="color: #f5f0ed;">There's no female-voice flagship in the clinically-diagnosed-sociopath memoir genre.</strong> Jennette McCurdy did this for child stardom. Tara Westover for fundamentalist isolation. Lori Gottlieb for therapy. No one has done it for clinical sociopathy as a woman. The category is open.
                </li>
              </ol>

              <h2 style="color: #d4af37; font-size: 13px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; margin: 32px 0 14px 0;">
                The math
              </h2>
              <p style="color: #d6cfc4; font-size: 15px; line-height: 1.8; margin: 0 0 14px 0;">
                Memoirs by viral creators with platform are advancing at the $100-500K range right now. Jennette McCurdy got $1M+ with comparable platform metrics. Your floor (500K IG, 20.6M YouTube views, documentary inbound) sits in that band.
              </p>
              <p style="color: #d6cfc4; font-size: 15px; line-height: 1.8; margin: 0 0 14px 0;">
                Prescriptive psychology books at the same level of platform: $50-300K advances. Lower ceiling, but they sell year after year. Cialdini's Influence still sells 50K copies a year, 40 years after publication.
              </p>
              <p style="color: #d6cfc4; font-size: 15px; line-height: 1.8; margin: 0 0 24px 0;">
                Memoir sells hard at debut. Prescriptive compounds slowly and forever.
              </p>

              <h2 style="color: #d4af37; font-size: 13px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; margin: 32px 0 14px 0;">
                What needs to be done
              </h2>
              <p style="color: #d6cfc4; font-size: 15px; line-height: 1.8; margin: 0 0 14px 0;">
                The actual deliverable to literary agents is a <strong style="color: #f5f0ed;">proposal</strong>, not a manuscript. Big-5 publishers buy memoirs on proposals. Don't write the full book first.
              </p>
              <p style="color: #d6cfc4; font-size: 15px; line-height: 1.8; margin: 0 0 14px 0;">
                The proposal is roughly 50 pages, structured as:
              </p>
              <ol style="color: #d6cfc4; font-size: 14px; line-height: 1.75; margin: 0 0 22px 0; padding-left: 22px;">
                <li style="margin-bottom: 8px;"><strong style="color: #f5f0ed;">The hook</strong> (1 page): why this book, why now, why you. Best writing of the year.</li>
                <li style="margin-bottom: 8px;"><strong style="color: #f5f0ed;">About the book</strong> (2-3 pages): the central argument, structure, voice.</li>
                <li style="margin-bottom: 8px;"><strong style="color: #f5f0ed;">Author platform</strong> (2-3 pages): 500K IG, 20.6M YouTube views, banned-TikTok rebuild, press hits at LADbible / NY Post / NDTV / Yahoo, two documentary deals in diligence. Quantify everything.</li>
                <li style="margin-bottom: 8px;"><strong style="color: #f5f0ed;">The market</strong> (2-3 pages): comp titles (I'm Glad My Mom Died, Educated, Maybe You Should Talk to Someone), trends, why publishers should care.</li>
                <li style="margin-bottom: 8px;"><strong style="color: #f5f0ed;">Audience</strong> (1-2 pages): the specific reader and why they buy.</li>
                <li style="margin-bottom: 8px;"><strong style="color: #f5f0ed;">Marketing plan</strong> (3-5 pages): what you will personally do to drive book sales (this section is huge for memoir/self-help).</li>
                <li style="margin-bottom: 8px;"><strong style="color: #f5f0ed;">Chapter outline</strong> (5-15 pages): each chapter's argument in 200-400 words.</li>
                <li><strong style="color: #f5f0ed;">Sample chapters</strong> (2 chapters, 5,000-15,000 words): the actual writing.</li>
              </ol>

              <p style="color: #d6cfc4; font-size: 15px; line-height: 1.8; margin: 0 0 14px 0;">
                Phase 1 schedule:
              </p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 24px 0; background: rgba(212,175,55,0.04); border-radius: 8px; padding: 0;">
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid rgba(212,175,55,0.10);">
                    <strong style="color: #d4af37;">Week 9</strong>
                    <span style="color: #d6cfc4; margin-left: 12px;">Hook, platform section, comp titles, chapter outline, first sample chapter</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid rgba(212,175,55,0.10);">
                    <strong style="color: #d4af37;">Week 10</strong>
                    <span style="color: #d6cfc4; margin-left: 12px;">Cohort delivery starts (teaching, not writing)</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid rgba(212,175,55,0.10);">
                    <strong style="color: #d4af37;">Week 11</strong>
                    <span style="color: #d6cfc4; margin-left: 12px;">Cohort week 2</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px;">
                    <strong style="color: #d4af37;">Week 12</strong>
                    <span style="color: #d6cfc4; margin-left: 12px;">Submit proposal to first 5 agents</span>
                  </td>
                </tr>
              </table>

              <p style="color: #d6cfc4; font-size: 15px; line-height: 1.8; margin: 0 0 24px 0;">
                Agent shortlist for first wave (tier 2, accessible, public submission guidelines): Park &amp; Fine, Aevitas Creative Management, InkWell Management, P.S. Literary, The Gernert Company. Tier 1 (WME, ICM) doesn't accept unsolicited; those need referrals later.
              </p>

              <h2 style="color: #d4af37; font-size: 13px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; margin: 32px 0 14px 0;">
                The honest test, before you commit
              </h2>
              <p style="color: #d6cfc4; font-size: 15px; line-height: 1.8; margin: 0 0 14px 0;">
                Memoirs require emotional disclosure the brand currently doesn't show. The voice on the website, the simulator, the book: detached, clinical, controlled. That's the brand.
              </p>
              <p style="color: #d6cfc4; font-size: 15px; line-height: 1.8; margin: 0 0 14px 0;">
                The memoir reader wants the moments behind that. Childhood. The diagnosis. The relationships that broke. The version of you before you had the framework.
              </p>
              <p style="color: #d6cfc4; font-size: 15px; line-height: 1.8; margin: 0 0 14px 0;">
                Two questions to sit with:
              </p>
              <ol style="color: #d6cfc4; font-size: 15px; line-height: 1.8; margin: 0 0 14px 0; padding-left: 22px;">
                <li style="margin-bottom: 10px;">
                  Are you willing to write a chapter where you're whatever-age and your mother is in the room and the moment of the diagnosis is happening? In specific, novelistic detail.
                </li>
                <li>
                  Are you willing for that chapter to be read by 100,000 strangers, including the people in it, who may or may not consent to being characters?
                </li>
              </ol>
              <p style="color: #d6cfc4; font-size: 15px; line-height: 1.8; margin: 0 0 24px 0;">
                If yes to both, write a sample chapter and the memoir is the right path. If the answer to either is "I'm not sure," prescriptive is the safer call, and that's a real answer, not a failure mode.
              </p>

              <h2 style="color: #d4af37; font-size: 13px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; margin: 32px 0 14px 0;">
                The cheapest way to decide
              </h2>
              <p style="color: #d6cfc4; font-size: 15px; line-height: 1.8; margin: 0 0 14px 0;">
                Don't hire a literary coach. Don't talk to a ghostwriter. Don't pay for a proposal consultant.
              </p>
              <p style="color: #d6cfc4; font-size: 15px; line-height: 1.8; margin: 0 0 14px 0;">
                Write Chapter 1. First 5,000 words. Over a week. Read it back. If it sounds like Sociopathic Dating Bible with biographical content, you're not in the memoir voice yet. If it sounds like Educated or I'm Glad My Mom Died, you've got it.
              </p>
              <p style="color: #d6cfc4; font-size: 15px; line-height: 1.8; margin: 0 0 30px 0;">
                The decision lives in the chapter. The chapter takes a week. Worth it before the agent shortlist goes live.
              </p>

              <hr style="border: none; border-top: 1px solid rgba(212,175,55,0.15); margin: 32px 0;" />

              <p style="color: rgba(214,207,196,0.7); font-size: 13px; line-height: 1.7; margin: 0;">
                Internal brief, drafted from research/multimillion-roadmap/11-phase-1-detailed.md. Reply if you want a longer brief on the prescriptive path, or want to talk through the chapter test before starting it.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

async function main() {
  console.log("Sending memoir brief to kanika@kanikarose.com...");
  const ok = await sendEmail({
    to: "kanika@kanikarose.com",
    subject: "The memoir option, Phase 1 brief",
    html,
  });
  if (ok) {
    console.log("Sent.");
    process.exit(0);
  }
  console.error("Send failed.");
  process.exit(1);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
