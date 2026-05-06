import { escapeHtml as esc } from "@/lib/escape-html";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://kanikarose.com";

export interface EmailQueueEntry {
  recipientEmail: string;
  recipientName: string;
  sequence: string;
  step: number;
  subject: string;
  htmlBody: string;
  scheduledAt: Date;
  metadata: Record<string, string>;
}

function emailShell(title: string, subtitle: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Kanika Batra</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #0a0a0a;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; width: 100%; background-color: #050511; border-radius: 12px; overflow: hidden;">

          <tr>
            <td bgcolor="#3d0f1a" style="padding: 40px 30px; text-align: center;">
              <h1 style="color: #d4af37; margin: 0 0 10px 0; font-size: 28px; font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">
                ${title}
              </h1>
              <p style="color: #94a3b8; margin: 0; font-size: 14px; letter-spacing: 1px;">
                ${subtitle}
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 40px 30px; border-left: 1px solid #d4af37; border-right: 1px solid #d4af37; border-bottom: 1px solid #d4af37;">
              ${body}

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 30px 0 0 0; padding: 25px 0 0 0; border-top: 1px solid #333;">
                <tr>
                  <td style="text-align: center;">
                    <p style="color: #d4af37; margin: 0 0 5px 0; font-size: 16px; font-style: italic; font-weight: 500;">
                      Embrace your power,
                    </p>
                    <p style="color: #d4af37; margin: 0; font-size: 18px; font-weight: 600; letter-spacing: 1px;">
                      Kanika Batra
                    </p>
                    <p style="color: #666; margin: 5px 0 0 0; font-size: 12px; letter-spacing: 0.5px;">
                      The Psychology of Power
                    </p>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 25px 0 0 0;">
                <tr>
                  <td bgcolor="#1a0d11" style="text-align: center; padding: 20px; border-radius: 8px;">
                    <p style="color: #94a3b8; margin: 0; font-size: 13px; line-height: 1.6;">
                      Issues? Contact us at <a href="mailto:Kanika@kanikarose.com" style="color: #d4af37; text-decoration: none; font-weight: 600;">Kanika@kanikarose.com</a>
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function goldButton(text: string, href: string): string {
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 25px 0;">
  <tr>
    <td align="center">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td bgcolor="#d4af37" style="border-radius: 50px; border: 2px solid #d4af37;" align="center">
            <a href="${href}" target="_blank" style="display: inline-block; color: #050511; background-color: #d4af37; padding: 18px 50px; text-decoration: none; font-weight: 700; font-size: 16px; letter-spacing: 1px; text-transform: uppercase; border-radius: 50px;">${text}</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

function buildWelcomeHtml(name: string): string {
  const body = `
    <p style="color: #f5f0ed; font-size: 18px; margin: 0 0 20px 0; line-height: 1.6;">
      Dear ${esc(name)},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      Welcome. You just made a decision most people never will &mdash; investing in the kind of knowledge that actually changes how you move through the world.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 15px;">
      I wrote the Sociopathic Dating Bible to hand you the playbook I wish I had years ago. Here are three tips to get the absolute most from it:
    </p>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 25px 0;">
      <tr>
        <td bgcolor="#1a0d11" style="padding: 25px; border-radius: 10px; border: 1px solid #d4af37;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td style="padding: 12px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6; border-bottom: 1px solid #3d2030;">
                <strong style="color: #d4af37;">1.</strong> Start with Chapter 3. It lays the psychological foundation everything else builds on. Read it first, even before Chapter 1.
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6; border-bottom: 1px solid #3d2030;">
                <strong style="color: #d4af37;">2.</strong> Keep a journal as you read. Write down every pattern you recognise from your own life &mdash; the awareness alone will shift how you operate.
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6;">
                <strong style="color: #d4af37;">3.</strong> After you finish the main chapters, go back and read the addendums. They hit differently once you have the full framework.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      Take your time with it. This isn&rsquo;t a book you rush through &mdash; it&rsquo;s one you live with.
    </p>`;

  return emailShell("Welcome to the Dark Side", "Your journey begins now", body);
}

function buildTrialOfferHtml(name: string, trialToken: string): string {
  const claimUrl = `${baseUrl}/api/consilium/claim-trial?token=${trialToken}`;

  const body = `
    <p style="color: #f5f0ed; font-size: 18px; margin: 0 0 20px 0; line-height: 1.6;">
      ${esc(name)},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      Because you invested in the premium edition, I&rsquo;m giving you something I don&rsquo;t offer publicly &mdash; a free month inside The Consilium.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 15px;">
      No payment required. No card on file. Just claim it.
    </p>

    ${goldButton("Claim Your Free Month", claimUrl)}

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 25px 0;">
      <tr>
        <td bgcolor="#1a0d11" style="padding: 25px; border-radius: 10px; border: 1px solid #d4af37;">
          <h3 style="color: #d4af37; margin: 0 0 20px 0; font-size: 18px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; text-align: center;">
            What&rsquo;s Inside The Consilium
          </h3>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td style="padding: 12px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6; border-bottom: 1px solid #3d2030;">
                <strong style="color: #d4af37;">Weekly Voice Notes</strong> &mdash; raw, unfiltered audio directly from me on psychology, power, and strategy
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6; border-bottom: 1px solid #3d2030;">
                <strong style="color: #d4af37;">Course Library</strong> &mdash; structured lessons you won&rsquo;t find on my public channels
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6; border-bottom: 1px solid #3d2030;">
                <strong style="color: #d4af37;">Community Feed</strong> &mdash; women-only, troll-free space for real conversations
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6;">
                <strong style="color: #d4af37;">Private Community</strong> &mdash; a space where you can actually be honest about what you want
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      After the free month, you can subscribe at $29/month or simply let it expire &mdash; no obligation, no hidden charges.
    </p>`;

  return emailShell(
    "You&rsquo;ve Been Invited",
    "The Consilium &mdash; free month",
    body,
  );
}

function buildReminderHtml(name: string, trialToken: string): string {
  const claimUrl = `${baseUrl}/api/consilium/claim-trial?token=${trialToken}`;

  const body = `
    <p style="color: #f5f0ed; font-size: 18px; margin: 0 0 20px 0; line-height: 1.6;">
      ${esc(name)},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      Quick reminder &mdash; your free month inside The Consilium is still waiting for you, but the invitation won&rsquo;t be open forever.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 15px;">
      Over 2,000 women are already inside. The conversations happening right now are the ones you won&rsquo;t see on any public platform.
    </p>

    ${goldButton("Claim Your Free Month", claimUrl)}

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      No payment needed. No card required. One click and you&rsquo;re in for 30 days.
    </p>`;

  return emailShell(
    "Your Free Month Expires Soon",
    "The Consilium invitation",
    body,
  );
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

// ============================================================
// Mini Dark Mirror + Starter Pack drip sequences.
//
// Both target the same destination (Consilium $29/mo) but enter
// from different acquisition surfaces:
//   - mini-dark-mirror-drip: visitor took the free 7-question quiz
//   - starter-pack-drip: visitor downloaded the 5-pattern reference
//
// Cadence: Day 1 / 3 / 5 / 7 after capture. The immediate result
// email goes out from the API route via sendMiniDarkMirrorResult /
// sendStarterPack — these queue what comes after.
//
// Voice: Kanika, first person, no marketing fluff. Each email
// delivers a piece of standalone value before the soft pivot to
// Consilium in step 3 and the direct ask in step 4.
// ============================================================

const PERSONALITY_HEADLINE: Record<string, { name: string; underStress: string }> = {
  psychopathic: {
    name: "The Predator",
    underStress: "When the stakes climb, you go quieter, not louder. Most people miss this — they assume disengagement is loss of interest. It's the opposite. You're calculating cost.",
  },
  sociopathic: {
    name: "The Wildcard",
    underStress: "When pressure hits, your impulse-to-action gap collapses. The thing that makes you formidable in confrontation is the same thing that burns the bridge a week later.",
  },
  narcissistic: {
    name: "The Mirror",
    underStress: "Under stress, supply demand spikes. Threats to image read as threats to self. You'll either escalate or punish — and both routes feel justified in the moment.",
  },
  borderline: {
    name: "The Storm",
    underStress: "Your stress response runs through the abandonment lens. A delayed text becomes a verdict. You feel the verdict before you can audit it.",
  },
  histrionic: {
    name: "The Stage",
    underStress: "Pressure reads as invisibility. The fix you reach for — bigger emotion, bigger gesture — works socially and costs you privately every time.",
  },
  neurotypical: {
    name: "The Witness",
    underStress: "You're the cohort the others read. Your strength is also your blind spot — you assume good faith longer than the people around you have earned.",
  },
};

function buildMiniDripStep1(name: string, dominantType: string): string {
  const profile =
    PERSONALITY_HEADLINE[dominantType] ?? PERSONALITY_HEADLINE.neurotypical;

  const body = `
    <p style="color: #f5f0ed; font-size: 16px; margin: 0 0 8px 0; line-height: 1.7;">
      Hey ${esc(name)},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 24px 0; font-size: 14px; font-style: italic;">
      Quick favor first &mdash; if this landed in spam or promotions, drag it to your inbox so I can actually reach you next time. The result email is one thing; what comes next is where the real read sits.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      You scored highest on <strong style="color: #d4af37;">${profile.name}</strong>. The result email gave you the surface read. Here&rsquo;s what most people don&rsquo;t see:
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 15px; padding-left: 16px; border-left: 2px solid #d4af37;">
      ${profile.underStress}
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      The mini-quiz can tell you the dominant axis. It can&rsquo;t tell you how high or low you function on it &mdash; and that&rsquo;s the question that actually matters in your relationships. A high-functioning version of your axis is a quiet superpower. A low-functioning version is the thing that ends a marriage.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      I&rsquo;ll send you a piece of the framework on Friday. For now, sit with this one: <em>which version are you running?</em>
    </p>`;

  return emailShell(
    `What ${profile.name} looks like under stress`,
    "Mini Dark Mirror — Day 1",
    body,
  );
}

function buildMiniDripStep2(name: string): string {
  const body = `
    <p style="color: #f5f0ed; font-size: 16px; margin: 0 0 20px 0; line-height: 1.7;">
      ${esc(name)},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      The single biggest predictor of whether someone gets out of a manipulative relationship cleanly is one variable: <strong style="color: #d4af37;">whether they have a name for the move being run on them.</strong>
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      Not a feeling. Not a vibe. A name.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      <strong style="color: #d4af37;">Mirror-Bonding</strong> is the one most people get caught in and never get a name for. It&rsquo;s the early-relationship feeling that you&rsquo;ve never been understood like this before &mdash; that this person <em>gets</em> you in a way no one else has. It feels like fate. It&rsquo;s actually a tactic.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 15px;">
      The mirror-bonder studies you, performs you back at you, and lets you fall in love with the reflection. By the time you realise the original was never there, you&rsquo;ve invested too much to leave.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      The tell is in the texture &mdash; mirror-bonders agree too smoothly. There&rsquo;s no friction, no honest disagreement, no view of theirs that contradicts yours. Real people have edges. Reflections don&rsquo;t.
    </p>`;

  return emailShell(
    "The move you didn't see",
    "Mini Dark Mirror — Day 3",
    body,
  );
}

function buildMiniDripStep3(name: string): string {
  const body = `
    <p style="color: #f5f0ed; font-size: 16px; margin: 0 0 20px 0; line-height: 1.7;">
      ${esc(name)},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      I built something for the people who took the mini-quiz and then thought <em>okay, but where does this actually get applied?</em>
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 15px;">
      It&rsquo;s called <strong style="color: #d4af37;">The Consilium</strong>. $29 a month. Inside:
    </p>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 25px 0;">
      <tr>
        <td bgcolor="#1a0d11" style="padding: 25px; border-radius: 10px; border: 1px solid #d4af37;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td style="padding: 10px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6; border-bottom: 1px solid #3d2030;">
                <strong style="color: #d4af37;">The simulator</strong> &mdash; you make the call, the scene unfolds. 60+ scenarios, named tactics, real outcomes.
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6; border-bottom: 1px solid #3d2030;">
                <strong style="color: #d4af37;">Voice notes from me</strong> &mdash; the unfiltered version. Things I won&rsquo;t put on Instagram.
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6; border-bottom: 1px solid #3d2030;">
                <strong style="color: #d4af37;">Ask Kanika</strong> &mdash; one question per day, my answer in voice or video.
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6;">
                <strong style="color: #d4af37;">Member-exclusive book pricing</strong> &mdash; Sociopathic Dating Bible at $9.99 for active members ($24.99 standalone), separate purchase.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      It&rsquo;s the place where the framework gets practiced, not just read. I&rsquo;ll send you the door on Sunday.
    </p>`;

  return emailShell(
    "Where this goes deeper",
    "Mini Dark Mirror — Day 5",
    body,
  );
}

function buildMiniDripStep4(name: string): string {
  const consiliumUrl = `${baseUrl}/consilium`;

  const body = `
    <p style="color: #f5f0ed; font-size: 16px; margin: 0 0 20px 0; line-height: 1.7;">
      ${esc(name)},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      Here&rsquo;s the door.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 15px;">
      Membership is $29/month. The book is bundled in (that&rsquo;s $24.99 of the price right there). You can cancel any time &mdash; one click on the billing page, no email, no friction.
    </p>

    ${goldButton("Join The Consilium", consiliumUrl)}

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      Or don&rsquo;t. The mini-quiz result and these four emails are yours to keep regardless. If pattern recognition is a thing you&rsquo;re going to keep developing, the Consilium is where the practice lives. If it isn&rsquo;t, that&rsquo;s a real answer too.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      Either way &mdash; thanks for taking the quiz.
    </p>`;

  return emailShell(
    "Your invitation to The Consilium",
    "Mini Dark Mirror — Day 7",
    body,
  );
}

export function buildMiniDarkMirrorDrip(
  recipientEmail: string,
  recipientName: string,
  dominantType: string,
): EmailQueueEntry[] {
  const now = new Date();

  return [
    {
      recipientEmail,
      recipientName,
      sequence: "mini-dark-mirror-drip",
      step: 1,
      subject: "What your axis looks like under stress",
      htmlBody: buildMiniDripStep1(recipientName, dominantType),
      scheduledAt: addDays(now, 1),
      metadata: { dominantType },
    },
    {
      recipientEmail,
      recipientName,
      sequence: "mini-dark-mirror-drip",
      step: 2,
      subject: "The move you didn't see",
      htmlBody: buildMiniDripStep2(recipientName),
      scheduledAt: addDays(now, 3),
      metadata: { dominantType },
    },
    {
      recipientEmail,
      recipientName,
      sequence: "mini-dark-mirror-drip",
      step: 3,
      subject: "Where this goes deeper",
      htmlBody: buildMiniDripStep3(recipientName),
      scheduledAt: addDays(now, 5),
      metadata: { dominantType },
    },
    {
      recipientEmail,
      recipientName,
      sequence: "mini-dark-mirror-drip",
      step: 4,
      subject: "Your invitation to The Consilium",
      htmlBody: buildMiniDripStep4(recipientName),
      scheduledAt: addDays(now, 7),
      metadata: { dominantType },
    },
  ];
}

function buildStarterDripStep1(name: string): string {
  const body = `
    <p style="color: #f5f0ed; font-size: 16px; margin: 0 0 8px 0; line-height: 1.7;">
      Hey ${esc(name)},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 24px 0; font-size: 14px; font-style: italic;">
      Quick favor &mdash; if this landed in spam or promotions, drag it to your inbox so I can keep reaching you. The pack is one thing; what I send next is where the framework actually starts working.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      Of the five patterns in the pack, <strong style="color: #d4af37;">Mirror-Bonding</strong> is the one almost no one names correctly &mdash; and it&rsquo;s the one that does the most damage.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      The reason: it doesn&rsquo;t feel like a tactic. It feels like fate.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      A mirror-bonder studies you for the first three to six weeks. They watch what you light up at. They listen to which stories you tell with the most heat. Then they perform a version of you back at you, with the spiky bits sanded off, and let you fall in love with the reflection.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 15px;">
      You leave the relationship two years later thinking <em>they changed</em>. They didn&rsquo;t. The mirror just stopped being held up.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      The tell is texture. Real people disagree with you on small things, even early. Mirrors don&rsquo;t. Watch for the absence of friction &mdash; not for the presence of red flags.
    </p>`;

  return emailShell(
    "The pattern most people miss",
    "Starter Pack — Day 1",
    body,
  );
}

function buildStarterDripStep2(name: string): string {
  const body = `
    <p style="color: #f5f0ed; font-size: 16px; margin: 0 0 20px 0; line-height: 1.7;">
      ${esc(name)},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      I get asked this a lot: <em>why bother naming the patterns? Isn&rsquo;t the gut feeling enough?</em>
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      No. Not even close.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      The gut tells you something is off. It can&rsquo;t tell you what. And the gap between &ldquo;something is off&rdquo; and &ldquo;this is DARVO and the next move is to bring receipts to the next conversation&rdquo; is the difference between leaving a bad relationship in three weeks and leaving in three years.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      Naming changes what you can do. <strong style="color: #d4af37;">DARVO</strong> &mdash; Deny, Attack, Reverse Victim and Offender &mdash; is a defensive scramble; once you can see it as one move instead of a confusing emotional storm, you can answer it as one move. Calmly. Without flinching. Which is the only thing that breaks it.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      The patterns aren&rsquo;t academic. They&rsquo;re a vocabulary that lets you act. That&rsquo;s why I named them.
    </p>`;

  return emailShell(
    "Why naming the move changes everything",
    "Starter Pack — Day 3",
    body,
  );
}

function buildStarterDripStep3(name: string): string {
  const body = `
    <p style="color: #f5f0ed; font-size: 16px; margin: 0 0 20px 0; line-height: 1.7;">
      ${esc(name)},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      The Starter Pack is recognition. Most people stop there and that&rsquo;s a real result &mdash; spotting the move is half the work.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 15px;">
      The other half is response. What do you actually <em>say</em> when DARVO hits in a conversation you can&rsquo;t walk out of? What does a clean exit look like when you&rsquo;ve been mirror-bonded for two years and you&rsquo;re still in love with the reflection? That&rsquo;s the part the pack can&rsquo;t do in five PDF pages.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 15px;">
      <strong style="color: #d4af37;">The Consilium</strong> is where that part lives. $29/month, cancel any time. Inside:
    </p>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 25px 0;">
      <tr>
        <td bgcolor="#1a0d11" style="padding: 25px; border-radius: 10px; border: 1px solid #d4af37;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td style="padding: 10px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6; border-bottom: 1px solid #3d2030;">
                <strong style="color: #d4af37;">The simulator</strong> &mdash; 60+ scenarios where you make the call and the scene unfolds. The pack&rsquo;s patterns, in motion.
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6; border-bottom: 1px solid #3d2030;">
                <strong style="color: #d4af37;">Voice notes</strong> &mdash; the unfiltered version of what I think, weekly. Not a podcast. Closer to a letter.
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6; border-bottom: 1px solid #3d2030;">
                <strong style="color: #d4af37;">Ask Kanika</strong> &mdash; one question per day, my answer in voice or video.
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6;">
                <strong style="color: #d4af37;">The book</strong> &mdash; Sociopathic Dating Bible, full text + addendums, bundled.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      I&rsquo;ll send you the door on Sunday.
    </p>`;

  return emailShell(
    "Recognition vs response",
    "Starter Pack — Day 5",
    body,
  );
}

function buildStarterDripStep4(name: string): string {
  const consiliumUrl = `${baseUrl}/consilium`;

  const body = `
    <p style="color: #f5f0ed; font-size: 16px; margin: 0 0 20px 0; line-height: 1.7;">
      ${esc(name)},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      Here&rsquo;s the door.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 15px;">
      $29/month, cancel any time. The book is bundled in. The simulator is where you practice the patterns from the pack at full clinical depth. The voice notes are for the parts I won&rsquo;t put on Instagram.
    </p>

    ${goldButton("Join The Consilium", consiliumUrl)}

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      If you&rsquo;re going to keep working on pattern recognition, this is where the practice happens. If you&rsquo;ve got what you needed from the pack &mdash; honestly, that&rsquo;s a real outcome too. Either way I&rsquo;m glad you&rsquo;re reading.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      &mdash; Kanika
    </p>`;

  return emailShell(
    "Your invitation to The Consilium",
    "Starter Pack — Day 7",
    body,
  );
}

export function buildStarterPackDrip(
  recipientEmail: string,
  recipientName: string,
): EmailQueueEntry[] {
  const now = new Date();

  return [
    {
      recipientEmail,
      recipientName,
      sequence: "starter-pack-drip",
      step: 1,
      subject: "The pattern most people miss",
      htmlBody: buildStarterDripStep1(recipientName),
      scheduledAt: addDays(now, 1),
      metadata: {},
    },
    {
      recipientEmail,
      recipientName,
      sequence: "starter-pack-drip",
      step: 2,
      subject: "Why naming the move changes everything",
      htmlBody: buildStarterDripStep2(recipientName),
      scheduledAt: addDays(now, 3),
      metadata: {},
    },
    {
      recipientEmail,
      recipientName,
      sequence: "starter-pack-drip",
      step: 3,
      subject: "Recognition vs response",
      htmlBody: buildStarterDripStep3(recipientName),
      scheduledAt: addDays(now, 5),
      metadata: {},
    },
    {
      recipientEmail,
      recipientName,
      sequence: "starter-pack-drip",
      step: 4,
      subject: "Your invitation to The Consilium",
      htmlBody: buildStarterDripStep4(recipientName),
      scheduledAt: addDays(now, 7),
      metadata: {},
    },
  ];
}

export function buildBookBuyerSequence(
  recipientEmail: string,
  recipientName: string,
  trialToken: string,
): EmailQueueEntry[] {
  const now = new Date();

  return [
    {
      recipientEmail,
      recipientName,
      sequence: "book-buyer-welcome",
      step: 1,
      subject: `Welcome to the dark side, ${recipientName}`,
      htmlBody: buildWelcomeHtml(recipientName),
      scheduledAt: now,
      metadata: { type: "welcome", trialToken },
    },
    {
      recipientEmail,
      recipientName,
      sequence: "book-buyer-welcome",
      step: 2,
      subject: "You've been invited \u2014 The Consilium (free month)",
      htmlBody: buildTrialOfferHtml(recipientName, trialToken),
      scheduledAt: addDays(now, 3),
      metadata: { type: "trial-offer", trialToken },
    },
    {
      recipientEmail,
      recipientName,
      sequence: "book-buyer-welcome",
      step: 3,
      subject: "Your free month expires soon \u2014 The Consilium",
      htmlBody: buildReminderHtml(recipientName, trialToken),
      scheduledAt: addDays(now, 7),
      metadata: { type: "trial-reminder", trialToken },
    },
  ];
}
