import { escapeHtml as esc } from "@/lib/escape-html";
import { marketingFooterByEmailHtml } from "@/lib/email-footer";

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
  metadata: Record<string, string | boolean | number>;
}

/**
 * Bake the standard one-click unsubscribe footer into the rendered
 * HTML body of a drip step. Keyed by recipient email because most
 * drip recipients (mini-quiz subscribers, pre-account book buyers)
 * don't have a User row yet. The /unsubscribe handler resolves the
 * email to a User and/or Subscriber at click time.
 */
function withMarketingFooter(html: string, email: string): string {
  const footer = marketingFooterByEmailHtml(email, "marketing");
  return html.includes("</body>")
    ? html.replace("</body>", `${footer}</body>`)
    : `${html}\n${footer}`;
}

const MARKETING_META = {
  isMarketing: true,
  unsubscribeType: "marketing" as const,
};

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
      Welcome. You just made a decision most people never will, investing in the kind of knowledge that actually changes how you move through the world.
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
                <strong style="color: #d4af37;">2.</strong> Keep a journal as you read. Write down every pattern you recognise from your own life, the awareness alone will shift how you operate.
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
      Take your time with it. This isn&rsquo;t a book you rush through, it&rsquo;s one you live with.
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
      Because you invested in the premium edition, I&rsquo;m giving you something I don&rsquo;t offer publicly, a free month inside The Consilium.
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
                <strong style="color: #d4af37;">Weekly Voice Notes</strong>, raw, unfiltered audio directly from me on psychology, power, and strategy
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6; border-bottom: 1px solid #3d2030;">
                <strong style="color: #d4af37;">Course Library</strong>, structured lessons you won&rsquo;t find on my public channels
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6; border-bottom: 1px solid #3d2030;">
                <strong style="color: #d4af37;">Community Feed</strong>, every comment human-reviewed, troll-free by design
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6;">
                <strong style="color: #d4af37;">Private Community</strong>, a space where you can actually be honest about what you want
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      After the free month, you can subscribe at $29/month or simply let it expire, no obligation, no hidden charges.
    </p>`;

  return emailShell(
    "You&rsquo;ve Been Invited",
    "The Consilium, free month",
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
      Quick reminder, your free month inside The Consilium is still waiting for you, but the invitation won&rsquo;t be open forever.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 15px;">
      The conversations happening inside right now are the ones you won&rsquo;t see on any public platform. Daily psychology drops, voice notes, and the Dark Mirror Simulator (60+ branching scenarios) are all live the moment you join.
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

/**
 * Build a UTM-tagged /consilium link for use inside drip emails.
 * Source + medium are pinned to `email` so admin/traffic groups all
 * email-driven Consilium signups cleanly; campaign + content are
 * passed in per-sequence so we can tell which drip and which step
 * actually drove the click.
 */
function dripConsiliumUrl(campaign: string, content: string): string {
  const params = new URLSearchParams({
    utm_source: "email",
    utm_medium: "email",
    utm_campaign: campaign,
    utm_content: content,
  });
  return `${baseUrl}/consilium?${params.toString()}`;
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
// sendStarterPack, these queue what comes after.
//
// Voice: Kanika, first person, no marketing fluff. Each email
// delivers a piece of standalone value before the soft pivot to
// Consilium in step 3 and the direct ask in step 4.
// ============================================================

const PERSONALITY_HEADLINE: Record<string, { name: string; underStress: string }> = {
  psychopathic: {
    name: "The Predator",
    underStress: "When the stakes climb, you go quieter, not louder. Most people miss this, they assume disengagement is loss of interest. It's the opposite. You're calculating cost.",
  },
  sociopathic: {
    name: "The Wildcard",
    underStress: "When pressure hits, your impulse-to-action gap collapses. The thing that makes you formidable in confrontation is the same thing that burns the bridge a week later.",
  },
  narcissistic: {
    name: "The Mirror",
    underStress: "Under stress, supply demand spikes. Threats to image read as threats to self. You'll either escalate or punish, and both routes feel justified in the moment.",
  },
  borderline: {
    name: "The Storm",
    underStress: "Your stress response runs through the abandonment lens. A delayed text becomes a verdict. You feel the verdict before you can audit it.",
  },
  histrionic: {
    name: "The Stage",
    underStress: "Pressure reads as invisibility. The fix you reach for, bigger emotion, bigger gesture, works socially and costs you privately every time.",
  },
  neurotypical: {
    name: "The Witness",
    underStress: "You're the cohort the others read. Your strength is also your blind spot, you assume good faith longer than the people around you have earned.",
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
      Quick favor first, if this landed in spam or promotions, drag it to your inbox so I can actually reach you next time. The result email is one thing; what comes next is where the real read sits.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      You scored highest on <strong style="color: #d4af37;">${profile.name}</strong>. The result email gave you the surface read. Here&rsquo;s what most people don&rsquo;t see:
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 15px; padding-left: 16px; border-left: 2px solid #d4af37;">
      ${profile.underStress}
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      The mini-quiz can tell you the dominant axis. It can&rsquo;t tell you how high or low you function on it, and that&rsquo;s the question that actually matters in your relationships. A high-functioning version of your axis is a quiet superpower. A low-functioning version is the thing that ends a marriage.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      I&rsquo;ll send you a piece of the framework on Friday. For now, sit with this one: <em>which version are you running?</em>
    </p>`;

  return emailShell(
    `What ${profile.name} looks like under stress`,
    "Mini Dark Mirror, Day 1",
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
      <strong style="color: #d4af37;">Mirror-Bonding</strong> is the one most people get caught in and never get a name for. It&rsquo;s the early-relationship feeling that you&rsquo;ve never been understood like this before, that this person <em>gets</em> you in a way no one else has. It feels like fate. It&rsquo;s actually a tactic.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 15px;">
      The mirror-bonder studies you, performs you back at you, and lets you fall in love with the reflection. By the time you realise the original was never there, you&rsquo;ve invested too much to leave.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      The tell is in the texture, mirror-bonders agree too smoothly. There&rsquo;s no friction, no honest disagreement, no view of theirs that contradicts yours. Real people have edges. Reflections don&rsquo;t.
    </p>`;

  return emailShell(
    "The move you didn't see",
    "Mini Dark Mirror, Day 3",
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
                <strong style="color: #d4af37;">The simulator</strong>, you make the call, the scene unfolds. 60+ scenarios, named tactics, real outcomes.
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6; border-bottom: 1px solid #3d2030;">
                <strong style="color: #d4af37;">Voice notes from me</strong>, the unfiltered version. Things I won&rsquo;t put on Instagram.
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6; border-bottom: 1px solid #3d2030;">
                <strong style="color: #d4af37;">Ask Kanika</strong>, one question per day, my answer in voice or video.
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6;">
                <strong style="color: #d4af37;">Member-exclusive book pricing</strong>, Sociopathic Dating Bible at $9.99 for active members ($24.99 standalone), separate purchase.
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
    "Mini Dark Mirror, Day 5",
    body,
  );
}

function buildMiniDripStep4(name: string): string {
  const consiliumUrl = dripConsiliumUrl("mini-dark-mirror-drip", "step-4-invite");

  const body = `
    <p style="color: #f5f0ed; font-size: 16px; margin: 0 0 20px 0; line-height: 1.7;">
      ${esc(name)},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      Here&rsquo;s the door.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 15px;">
      Membership is $29/month. Members get the Sociopathic Dating Bible at $9.99 instead of $24.99 (separate purchase, not bundled). Cancel any time, one click on the billing page, no email, no friction.
    </p>

    ${goldButton("Join The Consilium", consiliumUrl)}

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      Or don&rsquo;t. The mini-quiz result and these four emails are yours to keep regardless. If pattern recognition is a thing you&rsquo;re going to keep developing, the Consilium is where the practice lives. If it isn&rsquo;t, that&rsquo;s a real answer too.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      Either way, thanks for taking the quiz.
    </p>`;

  return emailShell(
    "Your invitation to The Consilium",
    "Mini Dark Mirror, Day 7",
    body,
  );
}

function buildMiniDripStep5(name: string): string {
  const body = `
    <p style="color: #f5f0ed; font-size: 16px; margin: 0 0 20px 0; line-height: 1.7;">
      ${esc(name)},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      A practice for this week. Pick one conversation, doesn&rsquo;t have to be a hard one, and watch for <strong style="color: #d4af37;">sandbagging</strong>.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      Sandbagging is when someone agrees with you on the surface, then quietly stockpiles the disagreement to use later. The tell is the shape of the agreement: too quick, too smooth, no follow-up question. Real agreement asks something. Sandbag agreement closes the topic.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      Once you can see it once, you can see it everywhere. That&rsquo;s the actual upgrade, naming the move so you stop being surprised by it three weeks later.
    </p>`;

  return emailShell(
    "Sandbagging, the agreement that isn't",
    "Mini Dark Mirror, Day 10",
    body,
  );
}

function buildMiniDripStep6(name: string): string {
  const consiliumUrl = dripConsiliumUrl(
    "mini-dark-mirror-drip",
    "step-6-soft-mention",
  );

  const body = `
    <p style="color: #f5f0ed; font-size: 16px; margin: 0 0 20px 0; line-height: 1.7;">
      ${esc(name)},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      One more reframe. The thing that separates the people who get good at reading dynamics from the people who stay stuck is not raw intelligence. It&rsquo;s reps.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      Most readers of psychology content know more than they apply. The bottleneck isn&rsquo;t information, it&rsquo;s the absence of a place to practice what you read on something other than your own life, which is the worst possible training ground.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 15px;">
      That&rsquo;s the whole reason the <a href="${consiliumUrl}" style="color: #d4af37; text-decoration: underline;">simulator</a> exists. 60+ low-stakes scenes, every one structured around a named pattern. You make the call, the scene resolves on it, you keep the lesson and lose nothing.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      One more from me. Then back to the regular rhythm.
    </p>`;

  return emailShell(
    "Why reading isn't the bottleneck",
    "Mini Dark Mirror, Day 14",
    body,
  );
}

function buildMiniDripStep7(name: string): string {
  const consiliumUrl = dripConsiliumUrl(
    "mini-dark-mirror-drip",
    "step-7-final",
  );

  const body = `
    <p style="color: #f5f0ed; font-size: 16px; margin: 0 0 20px 0; line-height: 1.7;">
      ${esc(name)},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      Last note. Three weeks since you took the mini-quiz.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 15px;">
      If the framework is something you want to keep developing, The Consilium is the room where the work happens. $29 a month, cancel any time. The reason I&rsquo;m sending one more is because the people who join two or three weeks after the quiz tend to be the ones who get the most out of it, they&rsquo;ve had time to notice the patterns showing up in their own life first.
    </p>

    ${goldButton("Step inside", consiliumUrl)}

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      If not, no follow-up after this one. You&rsquo;ll still get the regular newsletter unless you unsubscribe.
    </p>`;

  return emailShell(
    "Three weeks on",
    "Mini Dark Mirror, Day 21",
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
      htmlBody: withMarketingFooter(
        buildMiniDripStep1(recipientName, dominantType),
        recipientEmail,
      ),
      scheduledAt: addDays(now, 1),
      metadata: { ...MARKETING_META, dominantType },
    },
    {
      recipientEmail,
      recipientName,
      sequence: "mini-dark-mirror-drip",
      step: 2,
      subject: "The move you didn't see",
      htmlBody: withMarketingFooter(
        buildMiniDripStep2(recipientName),
        recipientEmail,
      ),
      scheduledAt: addDays(now, 3),
      metadata: { ...MARKETING_META, dominantType },
    },
    {
      recipientEmail,
      recipientName,
      sequence: "mini-dark-mirror-drip",
      step: 3,
      subject: "Where this goes deeper",
      htmlBody: withMarketingFooter(
        buildMiniDripStep3(recipientName),
        recipientEmail,
      ),
      scheduledAt: addDays(now, 5),
      metadata: { ...MARKETING_META, dominantType },
    },
    {
      recipientEmail,
      recipientName,
      sequence: "mini-dark-mirror-drip",
      step: 4,
      subject: "Your invitation to The Consilium",
      htmlBody: withMarketingFooter(
        buildMiniDripStep4(recipientName),
        recipientEmail,
      ),
      scheduledAt: addDays(now, 7),
      metadata: { ...MARKETING_META, dominantType },
    },
    {
      recipientEmail,
      recipientName,
      sequence: "mini-dark-mirror-drip",
      step: 5,
      subject: "Sandbagging, the agreement that isn't",
      htmlBody: withMarketingFooter(
        buildMiniDripStep5(recipientName),
        recipientEmail,
      ),
      scheduledAt: addDays(now, 10),
      metadata: { ...MARKETING_META, dominantType },
    },
    {
      recipientEmail,
      recipientName,
      sequence: "mini-dark-mirror-drip",
      step: 6,
      subject: "Why reading isn't the bottleneck",
      htmlBody: withMarketingFooter(
        buildMiniDripStep6(recipientName),
        recipientEmail,
      ),
      scheduledAt: addDays(now, 14),
      metadata: { ...MARKETING_META, dominantType },
    },
    {
      recipientEmail,
      recipientName,
      sequence: "mini-dark-mirror-drip",
      step: 7,
      subject: "Three weeks on",
      htmlBody: withMarketingFooter(
        buildMiniDripStep7(recipientName),
        recipientEmail,
      ),
      scheduledAt: addDays(now, 21),
      metadata: { ...MARKETING_META, dominantType },
    },
  ];
}

function buildStarterDripStep1(name: string): string {
  const body = `
    <p style="color: #f5f0ed; font-size: 16px; margin: 0 0 8px 0; line-height: 1.7;">
      Hey ${esc(name)},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 24px 0; font-size: 14px; font-style: italic;">
      Quick favor, if this landed in spam or promotions, drag it to your inbox so I can keep reaching you. The pack is one thing; what I send next is where the framework actually starts working.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      Of the five patterns in the pack, <strong style="color: #d4af37;">Mirror-Bonding</strong> is the one almost no one names correctly, and it&rsquo;s the one that does the most damage.
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
      The tell is texture. Real people disagree with you on small things, even early. Mirrors don&rsquo;t. Watch for the absence of friction, not for the presence of red flags.
    </p>`;

  return emailShell(
    "The pattern most people miss",
    "Starter Pack, Day 1",
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
      Naming changes what you can do. <strong style="color: #d4af37;">DARVO</strong>, Deny, Attack, Reverse Victim and Offender, is a defensive scramble; once you can see it as one move instead of a confusing emotional storm, you can answer it as one move. Calmly. Without flinching. Which is the only thing that breaks it.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      The patterns aren&rsquo;t academic. They&rsquo;re a vocabulary that lets you act. That&rsquo;s why I named them.
    </p>`;

  return emailShell(
    "Why naming the move changes everything",
    "Starter Pack, Day 3",
    body,
  );
}

function buildStarterDripStep3(name: string): string {
  const body = `
    <p style="color: #f5f0ed; font-size: 16px; margin: 0 0 20px 0; line-height: 1.7;">
      ${esc(name)},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      The Starter Pack is recognition. Most people stop there and that&rsquo;s a real result, spotting the move is half the work.
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
                <strong style="color: #d4af37;">The simulator</strong>, 60+ scenarios where you make the call and the scene unfolds. The pack&rsquo;s patterns, in motion.
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6; border-bottom: 1px solid #3d2030;">
                <strong style="color: #d4af37;">Voice notes</strong>, the unfiltered version of what I think, weekly. Not a podcast. Closer to a letter.
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6; border-bottom: 1px solid #3d2030;">
                <strong style="color: #d4af37;">Ask Kanika</strong>, one question per day, my answer in voice or video.
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6;">
                <strong style="color: #d4af37;">Member book pricing</strong>, $9.99 for the Sociopathic Dating Bible (vs $24.99 standalone), bought separately whenever you want.
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
    "Starter Pack, Day 5",
    body,
  );
}

function buildStarterDripStep4(name: string): string {
  const consiliumUrl = dripConsiliumUrl("starter-pack-drip", "step-4-invite");

  const body = `
    <p style="color: #f5f0ed; font-size: 16px; margin: 0 0 20px 0; line-height: 1.7;">
      ${esc(name)},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      Here&rsquo;s the door.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 15px;">
      $29/month, cancel any time. The simulator is where you practice the patterns from the pack at full clinical depth. The voice notes are for the parts I won&rsquo;t put on Instagram. The book is sold separately, $9.99 for members vs $24.99 standalone.
    </p>

    ${goldButton("Join The Consilium", consiliumUrl)}

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      If you&rsquo;re going to keep working on pattern recognition, this is where the practice happens. If you&rsquo;ve got what you needed from the pack, honestly, that&rsquo;s a real outcome too. Either way I&rsquo;m glad you&rsquo;re reading.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
     , Kanika
    </p>`;

  return emailShell(
    "Your invitation to The Consilium",
    "Starter Pack, Day 7",
    body,
  );
}

function buildStarterDripStep5(name: string): string {
  const body = `
    <p style="color: #f5f0ed; font-size: 16px; margin: 0 0 20px 0; line-height: 1.7;">
      ${esc(name)},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      A sixth pattern for the pack, the one I held back because it&rsquo;s the most uncomfortable: <strong style="color: #d4af37;">future-faking</strong>.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      Future-faking is when someone paints a vivid, detailed picture of a future with you, the house, the trip, the names of children, then never moves toward any of it. The vivid detail is the tell. Real plans have edges, friction, dates. Future-fakes are smooth, untouchable, and always six months away.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      The defense is one question, asked early and lightly: <em>what&rsquo;s the next concrete step on that?</em> Real planners answer. Future-fakers reframe the question.
    </p>`;

  return emailShell(
    "The sixth pattern",
    "Starter Pack, Day 10",
    body,
  );
}

function buildStarterDripStep6(name: string): string {
  const consiliumUrl = dripConsiliumUrl(
    "starter-pack-drip",
    "step-6-soft-mention",
  );

  const body = `
    <p style="color: #f5f0ed; font-size: 16px; margin: 0 0 20px 0; line-height: 1.7;">
      ${esc(name)},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      Here&rsquo;s the thing about patterns. Once you have five of them named, you start seeing every dynamic in your life through that lens, which is half-helpful and half-dangerous. The dangerous half is mistaking pattern-matching for diagnosis. The helpful half is the speed of recognition.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 15px;">
      The next move, if you&rsquo;re going to keep going, is to practice the patterns against scenes you didn&rsquo;t write yourself. That&rsquo;s what the <a href="${consiliumUrl}" style="color: #d4af37; text-decoration: underline;">simulator</a> inside The Consilium is for. 60+ scenes, each one structured around one of the named tactics, all with branching outcomes you can&rsquo;t pre-solve from the title.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      One more from me at the three-week mark. Then back to the standard rhythm.
    </p>`;

  return emailShell(
    "Pattern recognition has a failure mode",
    "Starter Pack, Day 14",
    body,
  );
}

function buildStarterDripStep7(name: string): string {
  const consiliumUrl = dripConsiliumUrl(
    "starter-pack-drip",
    "step-7-final",
  );

  const body = `
    <p style="color: #f5f0ed; font-size: 16px; margin: 0 0 20px 0; line-height: 1.7;">
      ${esc(name)},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      Last note in this thread. Three weeks since the pack.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 15px;">
      The Consilium is where this work lives at depth. $29 a month, cancel one click. Members who got the most out of it tended to join two to three weeks after the pack, after the patterns had started showing up in their own life and the question shifted from <em>is this useful</em> to <em>where do I practice this</em>.
    </p>

    ${goldButton("Step inside", consiliumUrl)}

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      If not, no follow-up after this one. You&rsquo;ll still get the regular newsletter unless you unsubscribe.
    </p>`;

  return emailShell(
    "Three weeks on",
    "Starter Pack, Day 21",
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
      htmlBody: withMarketingFooter(
        buildStarterDripStep1(recipientName),
        recipientEmail,
      ),
      scheduledAt: addDays(now, 1),
      metadata: { ...MARKETING_META },
    },
    {
      recipientEmail,
      recipientName,
      sequence: "starter-pack-drip",
      step: 2,
      subject: "Why naming the move changes everything",
      htmlBody: withMarketingFooter(
        buildStarterDripStep2(recipientName),
        recipientEmail,
      ),
      scheduledAt: addDays(now, 3),
      metadata: { ...MARKETING_META },
    },
    {
      recipientEmail,
      recipientName,
      sequence: "starter-pack-drip",
      step: 3,
      subject: "Recognition vs response",
      htmlBody: withMarketingFooter(
        buildStarterDripStep3(recipientName),
        recipientEmail,
      ),
      scheduledAt: addDays(now, 5),
      metadata: { ...MARKETING_META },
    },
    {
      recipientEmail,
      recipientName,
      sequence: "starter-pack-drip",
      step: 4,
      subject: "Your invitation to The Consilium",
      htmlBody: withMarketingFooter(
        buildStarterDripStep4(recipientName),
        recipientEmail,
      ),
      scheduledAt: addDays(now, 7),
      metadata: { ...MARKETING_META },
    },
    {
      recipientEmail,
      recipientName,
      sequence: "starter-pack-drip",
      step: 5,
      subject: "The sixth pattern",
      htmlBody: withMarketingFooter(
        buildStarterDripStep5(recipientName),
        recipientEmail,
      ),
      scheduledAt: addDays(now, 10),
      metadata: { ...MARKETING_META },
    },
    {
      recipientEmail,
      recipientName,
      sequence: "starter-pack-drip",
      step: 6,
      subject: "Pattern recognition has a failure mode",
      htmlBody: withMarketingFooter(
        buildStarterDripStep6(recipientName),
        recipientEmail,
      ),
      scheduledAt: addDays(now, 14),
      metadata: { ...MARKETING_META },
    },
    {
      recipientEmail,
      recipientName,
      sequence: "starter-pack-drip",
      step: 7,
      subject: "Three weeks on",
      htmlBody: withMarketingFooter(
        buildStarterDripStep7(recipientName),
        recipientEmail,
      ),
      scheduledAt: addDays(now, 21),
      metadata: { ...MARKETING_META },
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
      htmlBody: withMarketingFooter(
        buildWelcomeHtml(recipientName),
        recipientEmail,
      ),
      scheduledAt: now,
      metadata: { ...MARKETING_META, type: "welcome", trialToken },
    },
    {
      recipientEmail,
      recipientName,
      sequence: "book-buyer-welcome",
      step: 2,
      subject: "You've been invited, The Consilium (free month)",
      htmlBody: withMarketingFooter(
        buildTrialOfferHtml(recipientName, trialToken),
        recipientEmail,
      ),
      scheduledAt: addDays(now, 3),
      metadata: { ...MARKETING_META, type: "trial-offer", trialToken },
    },
    {
      recipientEmail,
      recipientName,
      sequence: "book-buyer-welcome",
      step: 3,
      subject: "Your free month expires soon, The Consilium",
      htmlBody: withMarketingFooter(
        buildReminderHtml(recipientName, trialToken),
        recipientEmail,
      ),
      scheduledAt: addDays(now, 7),
      metadata: { ...MARKETING_META, type: "trial-reminder", trialToken },
    },
  ];
}

// ============================================================
// Quiz-buyer drip.
//
// Fires on QUIZ ($9.99) checkout. Mirror of book-buyer-welcome but
// for a much hotter cohort: this person just paid for personality
// results and the webhook minted them a single-use $9.99 promo code
// off their first Consilium month, valid 14 days.
//
// Cadence is shaped by the credit clock, not by drip best practice:
//   Day 1, results recap + credit code surfaced.
//   Day 5, midpoint nudge, ~9 days left.
//   Day 12, last-call, 48 hours before expiry.
//
// Pre-2026-05-08 there was NO drip on this cohort. Code generation
// rate was 9 in 30 days, redemption rate was 0/9. The only Consilium
// pitch a quiz buyer saw was the moment of unlock; if they didn't
// click "Apply My Credit" right there, the code expired silently.
// ============================================================

interface QuizBuyerCreditArgs {
  quizResultId: string;
  creditCode: string;
  creditAmount: number;
  creditExpiresAt: Date;
}

function formatCreditExpiry(d: Date): string {
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function creditCodeBlock(
  args: QuizBuyerCreditArgs,
  stepLabel: string,
): string {
  const consiliumUrl = dripConsiliumUrl("quiz-buyer-welcome", stepLabel);
  const expiry = formatCreditExpiry(args.creditExpiresAt);
  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 25px 0;">
      <tr>
        <td bgcolor="#1a0d11" style="padding: 28px; border-radius: 10px; border: 1px solid #d4af37;">
          <p style="color: #d4af37; margin: 0 0 10px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; text-align: center; font-weight: 600;">
            Your Consilium credit
          </p>
          <h3 style="color: #ffffff; margin: 0 0 12px 0; font-size: 20px; font-weight: 300; text-align: center; letter-spacing: 0.5px;">
            $${args.creditAmount.toFixed(2)} off your first Consilium month
          </h3>
          <div style="background: #050511; border: 1px dashed #d4af37; border-radius: 8px; padding: 18px 20px; text-align: center; margin: 0 0 16px 0;">
            <p style="color: #94a3b8; margin: 0 0 6px 0; font-size: 10px; text-transform: uppercase; letter-spacing: 2px;">
              Your code
            </p>
            <p style="color: #d4af37; margin: 0; font-family: 'Courier New', monospace; font-size: 22px; font-weight: 700; letter-spacing: 2px;">
              ${esc(args.creditCode)}
            </p>
          </div>
          <p style="color: #666; margin: 0 0 18px 0; font-size: 11px; text-align: center;">
            Expires ${expiry} · Single use · Applies to your first month
          </p>
          <div style="text-align: center;">
            <a href="${consiliumUrl}" style="display: inline-block; background: #d4af37; color: #0a0a0a; padding: 14px 32px; text-decoration: none; border-radius: 50px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
              Apply My Credit
            </a>
          </div>
        </td>
      </tr>
    </table>
  `;
}

function buildQuizDripStep1(name: string, args: QuizBuyerCreditArgs): string {
  const resultsUrl = `${baseUrl}/quiz/results/${args.quizResultId}`;

  const body = `
    <p style="color: #f5f0ed; font-size: 16px; margin: 0 0 8px 0; line-height: 1.7;">
      Hey ${esc(name)},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      Your full clinical results are unlocked. The radar chart, the trait stack, the blind-spot list, the strengths, the diagnosis, all of it.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      Read your results once. Then read them again in two days. The second read is where the actual recognition happens, the parts you skimmed over because they felt slightly too accurate to sit with.
    </p>

    ${goldButton("Reopen My Results", resultsUrl)}

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      One more thing. Because you paid for the unlock, your $${args.creditAmount.toFixed(2)} comes back to you as a credit toward The Consilium, the place where the patterns you just scored on get drilled into instinct.
    </p>

    ${creditCodeBlock(args, "step-1-recap")}

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      The code expires in two weeks. I'll remind you once before then. After that, results are still yours, but the credit isn't.
    </p>`;

  return emailShell(
    "Your unlocked results are inside",
    "Dark Mirror, Day 1",
    body,
  );
}

function buildQuizDripStep2(name: string, args: QuizBuyerCreditArgs): string {
  const body = `
    <p style="color: #f5f0ed; font-size: 16px; margin: 0 0 20px 0; line-height: 1.7;">
      ${esc(name)},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      The quiz tells you which axis you're on. It can't tell you what you do under pressure on that axis, when the stakes climb and the easy version of you stops working. That second question is the one that actually changes outcomes.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 15px;">
      That's what the Dark Mirror Simulator is for. 60+ branching scenarios on the same axes you just scored on, each one in a real-world artefact: a text exchange, a workplace conflict, a first date, a family dinner. You make the call. The scene resolves on it. You see what move you ran without knowing you ran it.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      Plus voice notes, the classroom, daily psychology drops, and member pricing on the book ($9.99 instead of $24.99, separate purchase).
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      Your credit still works. Roughly nine days left.
    </p>

    ${creditCodeBlock(args, "step-2-midpoint")}`;

  return emailShell(
    "What the quiz can't tell you",
    "Dark Mirror, Day 5",
    body,
  );
}

function buildQuizDripStep3(name: string, args: QuizBuyerCreditArgs): string {
  const body = `
    <p style="color: #f5f0ed; font-size: 16px; margin: 0 0 20px 0; line-height: 1.7;">
      ${esc(name)},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      Last call. Your $${args.creditAmount.toFixed(2)} Consilium credit expires in 48 hours.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 15px;">
      If you're going to use it, this is the window. Apply it on your first month and you're in for $${(29 - args.creditAmount).toFixed(2)}. Cancel any time, one click on the billing page.
    </p>

    ${creditCodeBlock(args, "step-3-last-call")}

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      Either way, thank you for taking the quiz. Your results stay unlocked regardless.
    </p>`;

  return emailShell(
    "48 hours, your Consilium credit",
    "Dark Mirror, Day 12",
    body,
  );
}

// ============================================================
// Newsletter drip.
//
// Fires after the welcome email sent inline by /api/newsletter.
// Newsletter subs have no quiz axis to personalise off, so this
// sequence carries its own standalone-value emails. Same shape
// as the mini and starter drips: deliver insight first, name the
// move, then invite into the Consilium on the final step.
// ============================================================

function buildNewsletterStep1(name: string): string {
  const body = `
    <p style="color: #f5f0ed; font-size: 16px; margin: 0 0 8px 0; line-height: 1.7;">
      Hey ${esc(name)},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 24px 0; font-size: 14px; font-style: italic;">
      Quick favor first, if this landed in spam or promotions, drag it to your inbox so I can keep reaching you. The welcome was the door. This is the part where the framework actually starts working.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      The single biggest predictor of whether someone gets out of a manipulative relationship cleanly is one variable: <strong style="color: #d4af37;">whether they have a name for the move being run on them.</strong>
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      Not a feeling. Not a vibe. A name.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      The gap between "something is off" and "this is DARVO and the next move is to bring receipts to the next conversation" is the difference between leaving a bad relationship in three weeks and leaving in three years.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      Naming changes what you can do. That's what these emails are for. I'll send you a piece of the framework on Friday.
    </p>`;

  return emailShell(
    "The single biggest predictor",
    "Newsletter, Day 2",
    body,
  );
}

function buildNewsletterStep2(name: string): string {
  const body = `
    <p style="color: #f5f0ed; font-size: 16px; margin: 0 0 20px 0; line-height: 1.7;">
      ${esc(name)},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      <strong style="color: #d4af37;">Mirror-Bonding</strong> is the move most people get caught in and never get a name for.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      It's the early-relationship feeling that you've never been understood like this before, that this person <em>gets</em> you in a way no one else has. It feels like fate. It's actually a tactic.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      A mirror-bonder studies you for the first three to six weeks. They watch what you light up at. They listen to which stories you tell with the most heat. Then they perform a version of you back at you, with the spiky bits sanded off, and let you fall in love with the reflection.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 15px;">
      You leave the relationship two years later thinking <em>they changed</em>. They didn't. The mirror just stopped being held up.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      The tell is texture. Real people disagree with you on small things, even early. Mirrors don't. Watch for the absence of friction, not for the presence of red flags.
    </p>`;

  return emailShell(
    "The move you didn't see",
    "Newsletter, Day 4",
    body,
  );
}

function buildNewsletterStep3(name: string): string {
  const consiliumUrl = dripConsiliumUrl("newsletter-drip", "step-3-invite");

  const body = `
    <p style="color: #f5f0ed; font-size: 16px; margin: 0 0 20px 0; line-height: 1.7;">
      ${esc(name)},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      Recognition is half the work. Response is the other half. What do you actually <em>say</em> when DARVO hits in a conversation you can't walk out of? What does a clean exit look like when you've been mirror-bonded for two years and you're still in love with the reflection?
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 15px;">
      That's what the <strong style="color: #d4af37;">Consilium</strong> is for. $29/month, cancel any time. Inside:
    </p>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 25px 0;">
      <tr>
        <td bgcolor="#1a0d11" style="padding: 25px; border-radius: 10px; border: 1px solid #d4af37;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td style="padding: 10px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6; border-bottom: 1px solid #3d2030;">
                <strong style="color: #d4af37;">The simulator</strong>, 60+ branching scenarios where you make the call and the scene resolves on it. Mirror-bonding, DARVO, and the rest, in motion.
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6; border-bottom: 1px solid #3d2030;">
                <strong style="color: #d4af37;">Voice notes</strong>, the unfiltered version of what I think, weekly. Not a podcast. Closer to a letter.
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6; border-bottom: 1px solid #3d2030;">
                <strong style="color: #d4af37;">Ask Kanika</strong>, one question per day, my answer in voice or video.
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6;">
                <strong style="color: #d4af37;">Member book pricing</strong>, $9.99 for the Sociopathic Dating Bible (vs $24.99 standalone), bought separately.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    ${goldButton("Step Inside", consiliumUrl)}

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      Or don't, the newsletter keeps coming either way. If pattern recognition is something you're going to keep developing, the Consilium is where the practice lives.
    </p>`;

  return emailShell(
    "Recognition vs response",
    "Newsletter, Day 7",
    body,
  );
}

export function buildNewsletterDrip(
  recipientEmail: string,
  recipientName: string,
): EmailQueueEntry[] {
  const now = new Date();

  return [
    {
      recipientEmail,
      recipientName,
      sequence: "newsletter-drip",
      step: 1,
      subject: "The single biggest predictor",
      htmlBody: withMarketingFooter(
        buildNewsletterStep1(recipientName),
        recipientEmail,
      ),
      scheduledAt: addDays(now, 2),
      metadata: { ...MARKETING_META },
    },
    {
      recipientEmail,
      recipientName,
      sequence: "newsletter-drip",
      step: 2,
      subject: "The move you didn't see",
      htmlBody: withMarketingFooter(
        buildNewsletterStep2(recipientName),
        recipientEmail,
      ),
      scheduledAt: addDays(now, 4),
      metadata: { ...MARKETING_META },
    },
    {
      recipientEmail,
      recipientName,
      sequence: "newsletter-drip",
      step: 3,
      subject: "Recognition vs response",
      htmlBody: withMarketingFooter(
        buildNewsletterStep3(recipientName),
        recipientEmail,
      ),
      scheduledAt: addDays(now, 7),
      metadata: { ...MARKETING_META },
    },
  ];
}

// ============================================================
// Book-buyer Consilium re-engagement push.
//
// Targets the cohort the audit on 2026-05-15 surfaced:
// book buyers who have a site account but never joined Consilium,
// and whose original book-buyer-welcome trial-offer either expired
// or was ignored. Independent of book-buyer-welcome. Soft, no
// pricing tricks, no fake urgency. The wedge is honesty: you read
// the book, this is the place where the book gets practiced.
//
// Cadence: Day 1 / 5 / 12. Naming distinct from book-buyer-welcome
// so the enroll script can skip-detect cleanly.
// ============================================================

function consiliumLink(stepLabel: string): string {
  const params = new URLSearchParams({
    utm_source: "email",
    utm_medium: "email",
    utm_campaign: "book-buyer-consilium-push",
    utm_content: stepLabel,
  });
  return `${baseUrl}/consilium?${params.toString()}`;
}

function buildBookConsiliumPushStep1(name: string): string {
  const body = `
    <p style="color: #f5f0ed; font-size: 16px; margin: 0 0 8px 0; line-height: 1.7;">
      Hey ${esc(name)},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      You bought the book a while back. I'm not writing to ask if you finished it, that part's your business. I'm writing because most readers hit the same wall at the same place, and almost no one names it out loud.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      The wall is this: <strong style="color: #d4af37;">recognition is not response.</strong>
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      The book gives you the framework. Mirror-bonding, DARVO, the investment ladder, the predator's gaze, all of it. After two or three chapters you can <em>see</em> the moves being run on you. That's real. That's the first half of the work.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      The second half is this: when DARVO is being run on you in a conversation you can't walk out of, what do you actually <em>say</em>? When a mirror-bonder is two years in and you're still in love with the reflection, what does a clean exit look like? When your boss runs the same supply pattern your last partner ran, do you call it out or do you starve it?
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      Recognition is a book. Response is a practice. I'll tell you where the practice lives in a few days.
    </p>`;

  return emailShell(
    "Recognition is not response",
    "Book buyer, note 1",
    body,
  );
}

function buildBookConsiliumPushStep2(name: string): string {
  const body = `
    <p style="color: #f5f0ed; font-size: 16px; margin: 0 0 20px 0; line-height: 1.7;">
      ${esc(name)},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      The scene most book readers replay first, when they get inside the simulator, is a workplace one. Not a relationship one. Almost everyone expects it to be the other way around.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      The reason: workplace covert-narcissism is what you live with five days a week. The boss who claims your win in front of the room. The peer who runs DARVO when you flag the missed deadline. The mentor who supplies you on the days you're useful and ghosts you on the days you aren't. The book named those patterns. The simulator drops you into them with a real conversation and asks you to pick the line.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 15px;">
      You make the call. The scene resolves on it. You see the move you ran without knowing you ran it. Then you replay it with a different call. Over 60 scenarios. That's how response gets built.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 15px;">
      The simulator is one piece of <strong style="color: #d4af37;">the Consilium</strong>. $29 a month, cancel any time. Voice notes weekly, daily psychology drops, Ask Kanika, the forum where members run their actual situations through each other before they make the move. Members buy the book at $9.99 instead of $24.99 if you ever want a spare or a gift copy.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      One more note from me before I let it sit.
    </p>`;

  return emailShell(
    "The scene readers replay first",
    "Book buyer, note 2",
    body,
  );
}

function buildBookConsiliumPushStep3(name: string): string {
  const body = `
    <p style="color: #f5f0ed; font-size: 16px; margin: 0 0 20px 0; line-height: 1.7;">
      ${esc(name)},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      Last one from me on this. Then I stop.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      You already did the hardest part. You bought a book whose cover most people will not touch, with a title most people will not Google in their work browser, written by a clinically diagnosed sociopath. You're past the polite-society version of this conversation.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 15px;">
      The Consilium is where the rest of the conversation happens. $29 a month. Cancel any time, one click on the billing page, no email, no friction. Inside:
    </p>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 25px 0;">
      <tr>
        <td bgcolor="#1a0d11" style="padding: 25px; border-radius: 10px; border: 1px solid #d4af37;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td style="padding: 10px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6; border-bottom: 1px solid #3d2030;">
                <strong style="color: #d4af37;">The Dark Mirror Simulator</strong>, 60+ branching scenarios. Recognition becomes response.
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6; border-bottom: 1px solid #3d2030;">
                <strong style="color: #d4af37;">Voice notes from me</strong>, weekly. The unfiltered version. Things I won't put on Instagram.
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6; border-bottom: 1px solid #3d2030;">
                <strong style="color: #d4af37;">Ask Kanika</strong>, one question per day, my answer in voice or video.
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6; border-bottom: 1px solid #3d2030;">
                <strong style="color: #d4af37;">The Council</strong>, the forum, the chat rooms, the women who think like this. Every comment human-reviewed.
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6;">
                <strong style="color: #d4af37;">Member-only book pricing</strong>, $9.99 for the Sociopathic Dating Bible (vs $24.99 standalone). For your spare or your gift copy.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    ${goldButton("Join the Consilium", consiliumLink("step-3-primary"))}

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      Or don't. The book is yours. The framework is yours. If reading was enough, that's a real outcome. If it wasn't, the door is open.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      Either way, thank you for picking it up.
    </p>`;

  return emailShell(
    "The door, one last time",
    "Book buyer, note 3",
    body,
  );
}

export function buildBookBuyerConsiliumPush(
  recipientEmail: string,
  recipientName: string,
): EmailQueueEntry[] {
  const now = new Date();

  return [
    {
      recipientEmail,
      recipientName,
      sequence: "book-buyer-consilium-push",
      step: 1,
      subject: "Recognition is not response",
      htmlBody: withMarketingFooter(
        buildBookConsiliumPushStep1(recipientName),
        recipientEmail,
      ),
      scheduledAt: addDays(now, 1),
      metadata: { ...MARKETING_META },
    },
    {
      recipientEmail,
      recipientName,
      sequence: "book-buyer-consilium-push",
      step: 2,
      subject: "The scene readers replay first",
      htmlBody: withMarketingFooter(
        buildBookConsiliumPushStep2(recipientName),
        recipientEmail,
      ),
      scheduledAt: addDays(now, 5),
      metadata: { ...MARKETING_META },
    },
    {
      recipientEmail,
      recipientName,
      sequence: "book-buyer-consilium-push",
      step: 3,
      subject: "The door, one last time",
      htmlBody: withMarketingFooter(
        buildBookConsiliumPushStep3(recipientName),
        recipientEmail,
      ),
      scheduledAt: addDays(now, 12),
      metadata: { ...MARKETING_META },
    },
  ];
}

// ============================================================
// Book-buyer Consilium push, account-less cohort.
//
// Targets the ~100 buyers (per 2026-05-15 audit) who paid for the
// book but never registered a site account. They received the
// original book-buyer-welcome series, which included a trial-offer
// email. The legacy trial JWTs they were issued may now be expired
// (90d TTL), and the welcome copy pre-dates the simulator, so the
// value-prop has improved since they last looked.
//
// Mechanism: each email carries a fresh `consilium-gift` JWT that
// links to /consilium/claim. The claim flow creates the account,
// signs them in, and activates a 30-day gift membership in one
// button press. No card required.
//
// Cadence: Day 1 / 5 / 12. The gift CTA appears in every step so
// an early decider can act immediately.
// ============================================================

interface AccountlessGiftArgs {
  /** A fresh `consilium-gift` JWT signed by the enroll script with
   *  the recipient's email + name baked in. Must verify against
   *  JWT_SECRET on the server. 90-day TTL. */
  claimToken: string;
}

function claimLink(token: string, stepLabel: string): string {
  // UTMs ride alongside the gift JWT so the localStorage capture on
  // /consilium/claim picks them up; the server action then stamps the
  // new User row with the source (email) + the specific drip step
  // that landed the click. Without this, every gift-claim member shows
  // (direct) in admin/traffic regardless of which campaign drove them.
  const params = new URLSearchParams({
    token,
    utm_source: "email",
    utm_medium: "email",
    utm_campaign: "book-buyer-no-account-push",
    utm_content: stepLabel,
  });
  return `${baseUrl}/consilium/claim?${params.toString()}`;
}

function giftClaimBlock(
  name: string,
  claimUrl: string,
  blurb: string,
): string {
  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 25px 0;">
      <tr>
        <td bgcolor="#1a0d11" style="padding: 28px; border-radius: 10px; border: 1px solid #d4af37;">
          <p style="color: #d4af37; margin: 0 0 10px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; text-align: center; font-weight: 600;">
            A gift from Kanika
          </p>
          <h3 style="color: #ffffff; margin: 0 0 14px 0; font-size: 22px; font-weight: 300; text-align: center; letter-spacing: 0.5px;">
            30 days inside the Consilium
          </h3>
          <p style="color: #94a3b8; margin: 0 0 18px 0; font-size: 13px; line-height: 1.7; text-align: center;">
            ${blurb}
          </p>
          <div style="text-align: center;">
            <a href="${claimUrl}" style="display: inline-block; background: #d4af37; color: #0a0a0a; padding: 14px 32px; text-decoration: none; border-radius: 50px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
              Claim My 30 Days
            </a>
          </div>
          <p style="color: #666; margin: 14px 0 0 0; font-size: 11px; text-align: center;">
            For ${esc(name)} &middot; one click &middot; no payment required
          </p>
        </td>
      </tr>
    </table>
  `;
}

function buildNoAccountStep1(name: string, args: AccountlessGiftArgs): string {
  const url = claimLink(args.claimToken, "step-1-intro");
  const body = `
    <p style="color: #f5f0ed; font-size: 16px; margin: 0 0 8px 0; line-height: 1.7;">
      ${esc(name)},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      You bought the Sociopathic Dating Bible a while back. I'm writing because the world I was building when you bought it isn't the same world anymore, and you've been on the outside of all of it.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      Since you read the book, I built <strong style="color: #d4af37;">the Dark Mirror Simulator</strong>. 60+ branching scenarios on the same axes the book names. You make the call, the scene resolves on it, you see the move you ran without knowing you ran it. Then you replay it with a different call.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      I also started recording weekly voice notes, things I won't put on Instagram. Members ask me one question per day and I answer the best one on voice or video. There's a private forum where members run their actual situations through each other before they make the move.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 15px;">
      The whole thing is called <strong style="color: #d4af37;">the Consilium</strong>. I'm giving you 30 days, my treat, because you already paid for the framework. The 30 days don't require a card. They don't auto-charge. When they end, they lapse cleanly.
    </p>

    ${giftClaimBlock(name, url, "Creates your account, activates the gift, signs you in. About 30 seconds.")}

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      I'll send you a piece of what's inside in a few days. Even if you don't claim, the email will be worth reading.
    </p>`;

  return emailShell(
    "What's been built since you bought the book",
    "Book buyer, note 1",
    body,
  );
}

function buildNoAccountStep2(name: string, args: AccountlessGiftArgs): string {
  const url = claimLink(args.claimToken, "step-2-scene");
  const body = `
    <p style="color: #f5f0ed; font-size: 16px; margin: 0 0 20px 0; line-height: 1.7;">
      ${esc(name)},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      Here's one scene from the simulator. You don't need to be a member to read this. You'd need to be a member to play it.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px; padding-left: 16px; border-left: 2px solid #d4af37;">
      <em>You're in a one-on-one with your manager. A project you led got shipped. In the room with two senior people, your manager describes the work in the first person, "I", "my call", "I shipped it on the timeline I set." Your name doesn't come up. You feel the heat in your face. You have about three seconds to decide what you do.</em>
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      The book gives you the framework for what's happening, supply-mining, the credit-claim move, the soft-narcissism playbook. The simulator gives you the four-choice fork. Each choice plays the scene forward to a different consequence. You see what you'd actually do, and you see the move you didn't see.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 15px;">
      That's one scene. There are 60+. They cover dating, workplace, family, friendship. The first time you play one is where it clicks that this isn't a book anymore, it's a practice.
    </p>

    ${giftClaimBlock(name, url, "30 days, all 60+ scenarios, the voice notes, the council. No card on file.")}

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      One more note from me before I stop.
    </p>`;

  return emailShell(
    "The scene I'd play first",
    "Book buyer, note 2",
    body,
  );
}

function buildNoAccountStep3(name: string, args: AccountlessGiftArgs): string {
  const url = claimLink(args.claimToken, "step-3-last-call");
  const body = `
    <p style="color: #f5f0ed; font-size: 16px; margin: 0 0 20px 0; line-height: 1.7;">
      ${esc(name)},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      Last note. Then I stop, I promise.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      You bought a book whose cover most people will not touch, with a title most people will not Google in their work browser, written by a clinically diagnosed sociopath. That part already happened. The expensive part of the decision is behind you.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      The cheap part is on the other side of one button. The 30 days are real, they're a gift, no card, no auto-charge. The account-creation step is folded into the same click, you don't have to do a separate registration. The whole flow is about thirty seconds end to end.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 15px;">
      What you get for the 30 days:
    </p>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 25px 0;">
      <tr>
        <td bgcolor="#1a0d11" style="padding: 25px; border-radius: 10px; border: 1px solid #d4af37;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td style="padding: 10px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6; border-bottom: 1px solid #3d2030;">
                <strong style="color: #d4af37;">The Dark Mirror Simulator</strong>, 60+ scenes. Recognition becomes response.
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6; border-bottom: 1px solid #3d2030;">
                <strong style="color: #d4af37;">Voice notes from me</strong>, weekly. The unfiltered version.
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6; border-bottom: 1px solid #3d2030;">
                <strong style="color: #d4af37;">Ask Kanika</strong>, one question per day, my answer.
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6;">
                <strong style="color: #d4af37;">The Council</strong>, forum, chat, every comment human-reviewed.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    ${giftClaimBlock(name, url, "Last opportunity to claim from this thread. The gift link expires in the next few weeks.")}

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      Or don't. The book is yours. The framework is yours. If reading was enough, that's a real outcome. If it wasn't, the door is open until it isn't.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      Thank you for picking it up.
    </p>`;

  return emailShell(
    "The door, one last time",
    "Book buyer, note 3",
    body,
  );
}

export function buildBookBuyerNoAccountPush(
  recipientEmail: string,
  recipientName: string,
  args: AccountlessGiftArgs,
): EmailQueueEntry[] {
  const now = new Date();

  const sharedMeta = { claimToken: args.claimToken, isGiftWedge: true };

  return [
    {
      recipientEmail,
      recipientName,
      sequence: "book-buyer-no-account-push",
      step: 1,
      subject: "What's been built since you bought the book",
      htmlBody: withMarketingFooter(
        buildNoAccountStep1(recipientName, args),
        recipientEmail,
      ),
      scheduledAt: addDays(now, 1),
      metadata: { ...MARKETING_META, ...sharedMeta, type: "novelty" },
    },
    {
      recipientEmail,
      recipientName,
      sequence: "book-buyer-no-account-push",
      step: 2,
      subject: "The scene I'd play first",
      htmlBody: withMarketingFooter(
        buildNoAccountStep2(recipientName, args),
        recipientEmail,
      ),
      scheduledAt: addDays(now, 5),
      metadata: { ...MARKETING_META, ...sharedMeta, type: "specific-value" },
    },
    {
      recipientEmail,
      recipientName,
      sequence: "book-buyer-no-account-push",
      step: 3,
      subject: "The door, one last time",
      htmlBody: withMarketingFooter(
        buildNoAccountStep3(recipientName, args),
        recipientEmail,
      ),
      scheduledAt: addDays(now, 12),
      metadata: { ...MARKETING_META, ...sharedMeta, type: "last-call" },
    },
  ];
}

export function buildQuizBuyerSequence(
  recipientEmail: string,
  recipientName: string,
  args: QuizBuyerCreditArgs,
): EmailQueueEntry[] {
  const now = new Date();

  const sharedMeta = {
    quizResultId: args.quizResultId,
    creditCode: args.creditCode,
  };

  return [
    {
      recipientEmail,
      recipientName,
      sequence: "quiz-buyer-welcome",
      step: 1,
      subject: "Your unlocked results are inside",
      htmlBody: withMarketingFooter(
        buildQuizDripStep1(recipientName, args),
        recipientEmail,
      ),
      scheduledAt: addDays(now, 1),
      metadata: { ...MARKETING_META, ...sharedMeta, type: "results-recap" },
    },
    {
      recipientEmail,
      recipientName,
      sequence: "quiz-buyer-welcome",
      step: 2,
      subject: "9 days on your Consilium credit",
      htmlBody: withMarketingFooter(
        buildQuizDripStep2(recipientName, args),
        recipientEmail,
      ),
      scheduledAt: addDays(now, 5),
      metadata: { ...MARKETING_META, ...sharedMeta, type: "midpoint" },
    },
    {
      recipientEmail,
      recipientName,
      sequence: "quiz-buyer-welcome",
      step: 3,
      subject: "48 hours, your Consilium credit",
      htmlBody: withMarketingFooter(
        buildQuizDripStep3(recipientName, args),
        recipientEmail,
      ),
      scheduledAt: addDays(now, 12),
      metadata: { ...MARKETING_META, ...sharedMeta, type: "last-call" },
    },
  ];
}

// ============================================================
// Consilium cart-abandonment drip.
//
// Triggered when a logged-in user POSTs to
// /api/consilium/subscription/create and is redirected to Stripe
// Checkout. Two recovery emails:
//   +1h: light touch, "saw you almost joined"
//   +24h: clean ask, with the join link
//
// Cancelled in the Stripe webhook when checkout.session.completed
// fires for INNER_CIRCLE, so completers never get the recovery
// emails. Idempotent at enqueue time: skipped if a PENDING entry
// already exists for the same email + sequence.
// ============================================================

function addHours(date: Date, hours: number): Date {
  return new Date(date.getTime() + hours * 60 * 60 * 1000);
}

function buildCartAbandonStep1(name: string): string {
  const consiliumUrl = dripConsiliumUrl(
    "consilium-cart-abandonment",
    "step-1-soft",
  );

  const body = `
    <p style="color: #f5f0ed; font-size: 16px; margin: 0 0 20px 0; line-height: 1.7;">
      Hey ${esc(name)},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      Saw you opened the door to The Consilium and didn&rsquo;t finish. No pitch, just a quick check, was something missing?
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      The most common reason people stall on join is a totally fair one: they want to know what they&rsquo;re actually walking into. So here&rsquo;s the honest answer.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      <strong style="color: #d4af37;">Inside</strong>, the feed runs daily with one psychology card and one discussion prompt I write or hand-pick. The simulator has 60+ branching scenarios, you make the call, the scene resolves on it. Ask Kanika gives you one question per day, my answer back in voice or video.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      It&rsquo;s $29 a month. Cancel any time from the billing page, no email, no friction.
    </p>

    ${goldButton("Pick up where you left off", consiliumUrl)}

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      If something else is in the way, hit reply and tell me. I read everything.
    </p>`;

  return emailShell(
    "You almost stepped inside",
    "The Consilium",
    body,
  );
}

function buildCartAbandonStep2(name: string): string {
  const consiliumUrl = dripConsiliumUrl(
    "consilium-cart-abandonment",
    "step-2-close",
  );

  const body = `
    <p style="color: #f5f0ed; font-size: 16px; margin: 0 0 20px 0; line-height: 1.7;">
      ${esc(name)},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      One more, then I&rsquo;ll stop.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      The single highest-leverage thing inside The Consilium isn&rsquo;t the cards or the simulator. It&rsquo;s the daily reps. Three minutes a day reading one card, two minutes running one scene, and within a month the pattern recognition starts firing in real conversations without you asking it to.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 15px;">
      That&rsquo;s the whole pitch. If five minutes a day for $29 a month is the right ratio, the door is below.
    </p>

    ${goldButton("Join The Consilium", consiliumUrl)}

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      Or don&rsquo;t. Either way is a clean answer.
    </p>`;

  return emailShell(
    "Last note on this",
    "The Consilium",
    body,
  );
}

export function buildConsiliumAbandonmentDrip(
  recipientEmail: string,
  recipientName: string,
): EmailQueueEntry[] {
  const now = new Date();

  return [
    {
      recipientEmail,
      recipientName,
      sequence: "consilium-cart-abandonment",
      step: 1,
      subject: "You almost stepped inside",
      htmlBody: withMarketingFooter(
        buildCartAbandonStep1(recipientName),
        recipientEmail,
      ),
      scheduledAt: addHours(now, 1),
      metadata: { ...MARKETING_META, type: "soft-touch" },
    },
    {
      recipientEmail,
      recipientName,
      sequence: "consilium-cart-abandonment",
      step: 2,
      subject: "Last note on this",
      htmlBody: withMarketingFooter(
        buildCartAbandonStep2(recipientName),
        recipientEmail,
      ),
      scheduledAt: addHours(now, 24),
      metadata: { ...MARKETING_META, type: "close" },
    },
  ];
}

// ============================================================
// Consilium post-join welcome series.
//
// Triggered when a Stripe INNER_CIRCLE checkout completes. Runs
// alongside (not instead of) the immediate sendInnerCircleWelcomeNewUser
// credentials email for auto-created accounts. Goal: turn paying
// members into engaged members during the first 14 days, where most
// SaaS churn happens.
//
// Cadence:
//   Day 0  - first scene to run today
//   Day 1  - your council is filling up
//   Day 3  - voice notes, the unfiltered version
//   Day 7  - first-week check-in
//   Day 14 - two-week marker, retention prompt
//
// Voice: assumes they're already inside. Every link points to a
// specific surface, never back to /consilium itself.
// ============================================================

function memberUrl(path: string, content: string): string {
  const params = new URLSearchParams({
    utm_source: "email",
    utm_medium: "email",
    utm_campaign: "inner-circle-welcome",
    utm_content: content,
  });
  return `${baseUrl}${path}?${params.toString()}`;
}

function buildWelcomeSeriesStep1(name: string): string {
  const simulatorUrl = memberUrl(
    "/consilium/simulator",
    "step-1-first-scene",
  );

  const body = `
    <p style="color: #f5f0ed; font-size: 16px; margin: 0 0 20px 0; line-height: 1.7;">
      ${esc(name)}, welcome inside.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      Skip the orientation. The fastest way to see why The Consilium exists is to run one scene in the simulator. Three minutes, one call you make, one scene that resolves on it.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 15px;">
      Pick anything from the catalog. The popular ones on the leaderboard are popular because they&rsquo;re the ones that catch people clean.
    </p>

    ${goldButton("Run your first scene", simulatorUrl)}

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      That&rsquo;s it for today. Tomorrow I&rsquo;ll point you at the council.
    </p>`;

  return emailShell(
    "Run one scene",
    "Day 1 inside The Consilium",
    body,
  );
}

function buildWelcomeSeriesStep2(name: string): string {
  const feedUrl = memberUrl("/consilium/feed", "step-2-council");

  const body = `
    <p style="color: #f5f0ed; font-size: 16px; margin: 0 0 20px 0; line-height: 1.7;">
      ${esc(name)},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      The feed is where the daily reps happen. One psychology card lands at 9am, one discussion prompt at 10am, and member-only conversations build under both.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 15px;">
      The members who get the most out of this place do one small thing: they leave a comment on the prompt before they read other comments. Even one sentence. That&rsquo;s the move that flips you from reader to council.
    </p>

    ${goldButton("Open today's prompt", feedUrl)}

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      Friday: voice notes. The version of me I won&rsquo;t put on Instagram.
    </p>`;

  return emailShell(
    "Your council is filling up",
    "Day 2 inside The Consilium",
    body,
  );
}

function buildWelcomeSeriesStep3(name: string): string {
  const voiceUrl = memberUrl(
    "/consilium/voice-notes",
    "step-3-voice-notes",
  );

  const body = `
    <p style="color: #f5f0ed; font-size: 16px; margin: 0 0 20px 0; line-height: 1.7;">
      ${esc(name)},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      Voice notes are the surface where I say the things I won&rsquo;t put on a public feed. The reasoning behind a take, not just the take. The case study with the name filed off, not the redacted screenshot.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 15px;">
      Most members listen while they walk or drive. Three to seven minutes each, drop in mid-week.
    </p>

    ${goldButton("Listen to the latest", voiceUrl)}

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      Next week: Ask Kanika, the daily lever most members forget exists.
    </p>`;

  return emailShell(
    "Where the unfiltered version lives",
    "Day 4 inside The Consilium",
    body,
  );
}

function buildWelcomeSeriesStep4(name: string): string {
  const feedUrl = memberUrl(
    "/consilium/feed",
    "step-4-ask-kanika",
  );

  const body = `
    <p style="color: #f5f0ed; font-size: 16px; margin: 0 0 20px 0; line-height: 1.7;">
      ${esc(name)},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      One week in. The single most-underused thing inside The Consilium is the Ask Kanika pill at the top of the feed.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      One question per 24 hours, anything you want. When I answer it, I do it in a voice note or video and the asker gets a green dot in their nav. The questions that get the most upvotes from other members are the ones I answer first.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 15px;">
      If you&rsquo;ve been carrying a question that doesn&rsquo;t have a clean answer anywhere else, this is the place to drop it.
    </p>

    ${goldButton("Ask your question", feedUrl)}

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      One more from me at the two-week mark. After that, you&rsquo;re on the regular feed-and-prompt cadence with everyone else.
    </p>`;

  return emailShell(
    "The lever most members forget",
    "Day 7 inside The Consilium",
    body,
  );
}

function buildWelcomeSeriesStep5(name: string): string {
  const simulatorUrl = memberUrl(
    "/consilium/simulator",
    "step-5-two-week",
  );
  const feedUrl = memberUrl(
    "/consilium/feed",
    "step-5-two-week-feed",
  );

  const body = `
    <p style="color: #f5f0ed; font-size: 16px; margin: 0 0 20px 0; line-height: 1.7;">
      ${esc(name)},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      Two weeks in. Quick read on what high-engagement looks like, in case you want to know what the members getting the most out of this place actually do.
    </p>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 25px 0;">
      <tr>
        <td bgcolor="#1a0d11" style="padding: 22px; border-radius: 10px; border: 1px solid #d4af37;">
          <p style="color: #f5f0ed; margin: 0 0 12px 0; font-size: 14px; line-height: 1.7;">
            <strong style="color: #d4af37;">Daily:</strong> one card read, one prompt commented on. Three to five minutes total.
          </p>
          <p style="color: #f5f0ed; margin: 0 0 12px 0; font-size: 14px; line-height: 1.7;">
            <strong style="color: #d4af37;">Weekly:</strong> one or two simulator scenes, one voice note listened to.
          </p>
          <p style="color: #f5f0ed; margin: 0; font-size: 14px; line-height: 1.7;">
            <strong style="color: #d4af37;">Whenever it&rsquo;s relevant:</strong> drop your question in Ask Kanika.
          </p>
        </td>
      </tr>
    </table>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      That ratio is what turns pattern reading from a thing you study into a thing you do without thinking.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      <a href="${simulatorUrl}" style="color: #d4af37; text-decoration: underline;">The simulator catalog</a> is here when you want it. <a href="${feedUrl}" style="color: #d4af37; text-decoration: underline;">Today&rsquo;s prompt</a> is here.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      That&rsquo;s the last of these onboarding notes. Glad you&rsquo;re inside.
    </p>`;

  return emailShell(
    "Two weeks in",
    "Day 14 inside The Consilium",
    body,
  );
}

export function buildConsiliumWelcomeSeries(
  recipientEmail: string,
  recipientName: string,
): EmailQueueEntry[] {
  const now = new Date();

  return [
    {
      recipientEmail,
      recipientName,
      sequence: "inner-circle-welcome",
      step: 1,
      subject: "Run one scene",
      htmlBody: withMarketingFooter(
        buildWelcomeSeriesStep1(recipientName),
        recipientEmail,
      ),
      scheduledAt: now,
      metadata: { ...MARKETING_META, type: "first-scene" },
    },
    {
      recipientEmail,
      recipientName,
      sequence: "inner-circle-welcome",
      step: 2,
      subject: "Your council is filling up",
      htmlBody: withMarketingFooter(
        buildWelcomeSeriesStep2(recipientName),
        recipientEmail,
      ),
      scheduledAt: addDays(now, 1),
      metadata: { ...MARKETING_META, type: "council" },
    },
    {
      recipientEmail,
      recipientName,
      sequence: "inner-circle-welcome",
      step: 3,
      subject: "Where the unfiltered version lives",
      htmlBody: withMarketingFooter(
        buildWelcomeSeriesStep3(recipientName),
        recipientEmail,
      ),
      scheduledAt: addDays(now, 3),
      metadata: { ...MARKETING_META, type: "voice-notes" },
    },
    {
      recipientEmail,
      recipientName,
      sequence: "inner-circle-welcome",
      step: 4,
      subject: "The lever most members forget",
      htmlBody: withMarketingFooter(
        buildWelcomeSeriesStep4(recipientName),
        recipientEmail,
      ),
      scheduledAt: addDays(now, 7),
      metadata: { ...MARKETING_META, type: "ask-kanika" },
    },
    {
      recipientEmail,
      recipientName,
      sequence: "inner-circle-welcome",
      step: 5,
      subject: "Two weeks in",
      htmlBody: withMarketingFooter(
        buildWelcomeSeriesStep5(recipientName),
        recipientEmail,
      ),
      scheduledAt: addDays(now, 14),
      metadata: { ...MARKETING_META, type: "two-week-marker" },
    },
  ];
}

// ============================================================
// Quiz-unlock abandonment drip.
//
// Fires when a quiz taker submits answers WITH an email but does
// not pay $9.99 to unlock the full results. Cancelled when:
//   - The QuizResult.paid flag flips to true (Stripe QUIZ webhook)
//   - The user joins Consilium via any path (the $9.99 ask becomes
//     moot because they have access via membership)
//
// Cadence is tight, the unlock decision tends to be impulsive:
//   +3h  - "you stopped one click short"
//   +24h - what the unlock actually contains
//   +3d  - last call
//
// Anonymous (no-email) quiz takes get no drip. They show up in the
// admin/traffic dashboard but we have no way to reach them.
// ============================================================

function buildQuizUnlockStep1(name: string, quizResultId: string): string {
  const params = new URLSearchParams({
    utm_source: "email",
    utm_medium: "email",
    utm_campaign: "quiz-unlock-abandonment",
    utm_content: "step-1-3h",
  });
  const resultsUrl = `${baseUrl}/quiz/results/${quizResultId}?${params.toString()}`;

  const body = `
    <p style="color: #f5f0ed; font-size: 16px; margin: 0 0 20px 0; line-height: 1.7;">
      Hey ${esc(name)},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      You took the Dark Mirror and stopped one click short of the full read. No pressure, just flagging it in case it slipped, the unlock is $9.99 and gives you the radar chart, the trait stack, the blind-spot list, and the full diagnosis.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 15px;">
      Most takers report the second read (a couple of days after the first) is when the pattern actually clicks. Worth having it sit in your inbox.
    </p>

    ${goldButton("Unlock my full results", resultsUrl)}

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      The $9.99 also comes back to you as a credit toward Consilium membership, if you ever decide to go further with this.
    </p>`;

  return emailShell(
    "You stopped one click short",
    "Dark Mirror, +3h",
    body,
  );
}

function buildQuizUnlockStep2(name: string, quizResultId: string): string {
  const params = new URLSearchParams({
    utm_source: "email",
    utm_medium: "email",
    utm_campaign: "quiz-unlock-abandonment",
    utm_content: "step-2-24h",
  });
  const resultsUrl = `${baseUrl}/quiz/results/${quizResultId}?${params.toString()}`;

  const body = `
    <p style="color: #f5f0ed; font-size: 16px; margin: 0 0 20px 0; line-height: 1.7;">
      ${esc(name)},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      Quick note on what&rsquo;s behind the unlock, in case that&rsquo;s the missing piece.
    </p>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 25px 0;">
      <tr>
        <td bgcolor="#1a0d11" style="padding: 22px; border-radius: 10px; border: 1px solid #d4af37;">
          <p style="color: #f5f0ed; margin: 0 0 10px 0; font-size: 14px; line-height: 1.6;">
            <strong style="color: #d4af37;">Radar chart</strong>, six axes, your score against each.
          </p>
          <p style="color: #f5f0ed; margin: 0 0 10px 0; font-size: 14px; line-height: 1.6;">
            <strong style="color: #d4af37;">Trait stack</strong>, the rank-ordered list of which traits are loudest in your profile.
          </p>
          <p style="color: #f5f0ed; margin: 0 0 10px 0; font-size: 14px; line-height: 1.6;">
            <strong style="color: #d4af37;">Blind spots</strong>, the patterns you&rsquo;re most likely to miss in others because they don&rsquo;t resemble you.
          </p>
          <p style="color: #f5f0ed; margin: 0; font-size: 14px; line-height: 1.6;">
            <strong style="color: #d4af37;">Diagnosis</strong>, a written read on what your axis combination tends to look like under pressure.
          </p>
        </td>
      </tr>
    </table>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      The quiz is one of the more honest mirrors most people have looked into. The free preview gives you the headline. The unlock gives you the read.
    </p>

    ${goldButton("Unlock my full results", resultsUrl)}`;

  return emailShell(
    "What's actually behind the unlock",
    "Dark Mirror, +24h",
    body,
  );
}

function buildQuizUnlockStep3(name: string, quizResultId: string): string {
  const params = new URLSearchParams({
    utm_source: "email",
    utm_medium: "email",
    utm_campaign: "quiz-unlock-abandonment",
    utm_content: "step-3-3d",
  });
  const resultsUrl = `${baseUrl}/quiz/results/${quizResultId}?${params.toString()}`;

  const body = `
    <p style="color: #f5f0ed; font-size: 16px; margin: 0 0 20px 0; line-height: 1.7;">
      ${esc(name)},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 15px;">
      Last note on the unlock. $9.99, single payment, results stay yours, $9.99 credit toward Consilium membership if you ever join. After this, no more reminders.
    </p>

    ${goldButton("Unlock my full results", resultsUrl)}

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      Either way, thanks for taking the quiz.
    </p>`;

  return emailShell(
    "Last note on your Dark Mirror",
    "Dark Mirror, +3d",
    body,
  );
}

export function buildQuizUnlockAbandonmentDrip(
  recipientEmail: string,
  recipientName: string,
  quizResultId: string,
): EmailQueueEntry[] {
  const now = new Date();

  return [
    {
      recipientEmail,
      recipientName,
      sequence: "quiz-unlock-abandonment",
      step: 1,
      subject: "You stopped one click short",
      htmlBody: withMarketingFooter(
        buildQuizUnlockStep1(recipientName, quizResultId),
        recipientEmail,
      ),
      scheduledAt: addHours(now, 3),
      metadata: { ...MARKETING_META, quizResultId, type: "3h-touch" },
    },
    {
      recipientEmail,
      recipientName,
      sequence: "quiz-unlock-abandonment",
      step: 2,
      subject: "What's actually behind the unlock",
      htmlBody: withMarketingFooter(
        buildQuizUnlockStep2(recipientName, quizResultId),
        recipientEmail,
      ),
      scheduledAt: addHours(now, 24),
      metadata: { ...MARKETING_META, quizResultId, type: "24h-detail" },
    },
    {
      recipientEmail,
      recipientName,
      sequence: "quiz-unlock-abandonment",
      step: 3,
      subject: "Last note on your Dark Mirror",
      htmlBody: withMarketingFooter(
        buildQuizUnlockStep3(recipientName, quizResultId),
        recipientEmail,
      ),
      scheduledAt: addDays(now, 3),
      metadata: { ...MARKETING_META, quizResultId, type: "last-call" },
    },
  ];
}

// ============================================================
// Post-cancellation winback drip.
//
// Fires when a Stripe subscription is deleted (member-initiated
// cancel or terminal billing failure). Three touches across 30
// days, the standard SaaS recovery shape. Cancelled if the user
// re-joins.
//
// Cadence:
//   Day 1  - clean acknowledgement, no pressure
//   Day 7  - what they're missing, soft door
//   Day 30 - explicit re-join ask
//
// Strict rule: do NOT enrol members whose cancellation reason is
// abuse / refund-for-fraud. Those get suppressed at enqueue time
// by checking for membership.suspendReason or refund metadata.
// ============================================================

function buildWinbackStep1(name: string): string {
  const body = `
    <p style="color: #f5f0ed; font-size: 16px; margin: 0 0 20px 0; line-height: 1.7;">
      ${esc(name)},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      Confirming your Consilium membership is cancelled. No further charges, your card&rsquo;s clean, you keep access until the end of your current billing period.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      No pitch in this one. If there&rsquo;s a specific reason you left, reply and tell me, I read everything and I take the patterns from this kind of feedback more seriously than almost anything else.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      Thanks for the time you spent inside.
    </p>`;

  return emailShell(
    "Cancellation confirmed",
    "The Consilium",
    body,
  );
}

function buildWinbackStep2(name: string): string {
  const consiliumUrl = dripConsiliumUrl(
    "consilium-winback",
    "step-2-soft-door",
  );

  const body = `
    <p style="color: #f5f0ed; font-size: 16px; margin: 0 0 20px 0; line-height: 1.7;">
      ${esc(name)},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      Week one without the feed. Not a check-in, just a flag, here&rsquo;s what dropped in the council since you left.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      Seven psychology cards, six discussion prompts, one voice note covering the thing I would not normally put on Instagram. The simulator added two new scenes this week.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 15px;">
      No re-join ask in this email. Door is below if it matters; if not, ignore it. One more from me at the four-week mark, then I stop.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      <a href="${consiliumUrl}" style="color: #d4af37; text-decoration: underline;">If you want back in.</a>
    </p>`;

  return emailShell(
    "What dropped this week",
    "The Consilium, week one out",
    body,
  );
}

function buildWinbackStep3(name: string): string {
  const consiliumUrl = dripConsiliumUrl(
    "consilium-winback",
    "step-3-direct",
  );

  const body = `
    <p style="color: #f5f0ed; font-size: 16px; margin: 0 0 20px 0; line-height: 1.7;">
      ${esc(name)},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      Last note. A month out.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 15px;">
      Members who come back tend to come back at the four-week mark. There&rsquo;s usually a specific moment, a conversation that made them realise they missed the pattern, a relationship they want to read more cleanly, a thing they would have said differently if they had named the move. If that&rsquo;s where you are, the door&rsquo;s open. Same $29, cancel any time.
    </p>

    ${goldButton("Rejoin The Consilium", consiliumUrl)}

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      If not, no more from me on this. You&rsquo;ll still get the regular newsletter unless you unsubscribe.
    </p>`;

  return emailShell(
    "A month out",
    "The Consilium, last note",
    body,
  );
}

export function buildConsiliumWinbackDrip(
  recipientEmail: string,
  recipientName: string,
): EmailQueueEntry[] {
  const now = new Date();

  return [
    {
      recipientEmail,
      recipientName,
      sequence: "consilium-winback",
      step: 1,
      subject: "Cancellation confirmed",
      htmlBody: withMarketingFooter(
        buildWinbackStep1(recipientName),
        recipientEmail,
      ),
      scheduledAt: addDays(now, 1),
      metadata: { ...MARKETING_META, type: "ack" },
    },
    {
      recipientEmail,
      recipientName,
      sequence: "consilium-winback",
      step: 2,
      subject: "What dropped this week",
      htmlBody: withMarketingFooter(
        buildWinbackStep2(recipientName),
        recipientEmail,
      ),
      scheduledAt: addDays(now, 7),
      metadata: { ...MARKETING_META, type: "soft-door" },
    },
    {
      recipientEmail,
      recipientName,
      sequence: "consilium-winback",
      step: 3,
      subject: "A month out",
      htmlBody: withMarketingFooter(
        buildWinbackStep3(recipientName),
        recipientEmail,
      ),
      scheduledAt: addDays(now, 30),
      metadata: { ...MARKETING_META, type: "direct-ask" },
    },
  ];
}

// ============================================================
// Dormant-member re-engagement, single-shot.
//
// Triggered by /api/cron/dormant-member when a member's
// User.lastSeenAt is older than 14 days (or null + activated >14d
// ago). Sends one "what you've missed" email. Idempotent per
// member per 30 days via applicationData.dormantReminderSentAt.
//
// Goal: prevent silent churn. Members who go dark for 14+ days
// tend to cancel without warning. A single re-engagement email
// catches the recoverable ones before they hit the cancel button.
// ============================================================

function buildDormantReengagementEmail(name: string): string {
  const feedUrl = memberUrl("/consilium/feed", "dormant-feed");
  const simulatorUrl = memberUrl(
    "/consilium/simulator",
    "dormant-simulator",
  );

  const body = `
    <p style="color: #f5f0ed; font-size: 16px; margin: 0 0 20px 0; line-height: 1.7;">
      ${esc(name)},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      Haven&rsquo;t seen you inside in a bit. No guilt-trip, life has rhythms; just a flag in case the council has slipped off your radar.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      The shortest path back in is one of these:
    </p>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 25px 0;">
      <tr>
        <td bgcolor="#1a0d11" style="padding: 22px; border-radius: 10px; border: 1px solid #d4af37;">
          <p style="color: #f5f0ed; margin: 0 0 12px 0; font-size: 14px; line-height: 1.7;">
            <strong style="color: #d4af37;"><a href="${feedUrl}" style="color: #d4af37; text-decoration: none;">Today&rsquo;s prompt &rarr;</a></strong> Three-minute read, drop one sentence of your read in the comments.
          </p>
          <p style="color: #f5f0ed; margin: 0; font-size: 14px; line-height: 1.7;">
            <strong style="color: #d4af37;"><a href="${simulatorUrl}" style="color: #d4af37; text-decoration: none;">One scene &rarr;</a></strong> Whichever one&rsquo;s top of the catalog. Three minutes.
          </p>
        </td>
      </tr>
    </table>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      Either one drops you straight back into the rhythm. If the timing&rsquo;s just bad, that&rsquo;s a real answer too, the membership keeps holding the door.
    </p>`;

  return emailShell(
    "The council noticed you stepped out",
    "The Consilium",
    body,
  );
}

export function buildDormantReengagementEmailEntry(
  recipientEmail: string,
  recipientName: string,
): EmailQueueEntry {
  return {
    recipientEmail,
    recipientName,
    sequence: "dormant-member-reengagement",
    step: 1,
    subject: "The council noticed you stepped out",
    htmlBody: withMarketingFooter(
      buildDormantReengagementEmail(recipientName),
      recipientEmail,
    ),
    scheduledAt: new Date(),
    metadata: { ...MARKETING_META, type: "dormant-reengage" },
  };
}
