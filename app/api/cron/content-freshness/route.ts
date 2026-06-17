import { NextRequest, NextResponse } from "next/server";
import { verifyCronSecret } from "@/lib/cron-auth";
import { getAllPosts } from "@/lib/mdx";
import { sendEmail } from "@/lib/email";
import { SITE_CONFIG } from "@/lib/constants";

/**
 * Cron: content-freshness report.
 *
 * Google rewards pages that stay current and quietly decays pages that
 * go stale. Refreshing a post that already ranks keeps the trust and
 * history it has built, a brand-new post on the same topic just splits
 * that strength in two (cannibalisation). So the highest-ROI SEO chore
 * is not "write more", it is "refresh what already ranks before it
 * slips". See docs/SEO-PLAYBOOK-KANIKAROSE.md and the luxe-v2 reference
 * "refresh > new for ranked pages" finding.
 *
 * The blog is MDX-in-git, so a cron cannot rewrite a post on its own
 * (and should not, content needs Kanika's voice and human review). This
 * job is therefore a REPORT, not an action: once a week it scans every
 * published post, flags any whose last-touched date (updatedAt, else
 * publishedAt) is older than the staleness window, and emails Kanika a
 * ranked refresh list. She bumps updatedAt + freshens the stalest few.
 *
 * Idempotent and side-effect-free apart from the single summary email,
 * safe to re-fire by hand from the Actions UI.
 *
 * Schedule: weekly (Monday 06:00 UTC), set in .github/workflows/cron.yml.
 */

const STALENESS_DAYS = 90;
const MAX_LISTED = 25;

export async function POST(request: NextRequest) {
  if (!verifyCronSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = Date.now();
    const cutoff = now - STALENESS_DAYS * 24 * 60 * 60 * 1000;

    const stale = getAllPosts()
      .map((post) => {
        const touchedRaw =
          post.frontmatter.updatedAt || post.frontmatter.publishedAt;
        const touched = new Date(touchedRaw).getTime();
        return {
          slug: post.slug,
          title: post.frontmatter.title,
          category: post.frontmatter.category,
          touched,
          ageDays: Math.floor((now - touched) / (24 * 60 * 60 * 1000)),
        };
      })
      .filter((p) => Number.isFinite(p.touched) && p.touched < cutoff)
      .sort((a, b) => a.touched - b.touched); // stalest first

    const totalStale = stale.length;

    if (totalStale === 0) {
      return NextResponse.json({ success: true, stale: 0, emailed: false });
    }

    const rows = stale
      .slice(0, MAX_LISTED)
      .map((p) => {
        const url = `${SITE_CONFIG.url}/blog/${p.slug}`;
        return `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;color:#e5e5e5;">
            <a href="${url}" style="color:#d4af37;text-decoration:none;">${p.title}</a>
            <div style="color:#a0a0a0;font-size:12px;margin-top:2px;">${p.category}</div>
          </td>
          <td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;color:#a0a0a0;text-align:right;white-space:nowrap;">${p.ageDays} days</td>
        </tr>`;
      })
      .join("");

    const overflow =
      totalStale > MAX_LISTED
        ? `<p style="color:#a0a0a0;font-size:13px;">...and ${totalStale - MAX_LISTED} more not shown.</p>`
        : "";

    const html = `
      <div style="background:#0a0a0a;padding:24px;font-family:Arial,Helvetica,sans-serif;">
        <h2 style="color:#ffffff;font-weight:300;">Content freshness report</h2>
        <p style="color:#a0a0a0;font-size:14px;">
          ${totalStale} published post${totalStale === 1 ? "" : "s"} have not been
          updated in over ${STALENESS_DAYS} days. Refreshing the stalest few
          (bump a stat, add a recent angle, set <code>updatedAt</code> to today)
          protects rankings they already hold. Stalest first:
        </p>
        <table style="width:100%;border-collapse:collapse;margin-top:12px;">
          <tbody>${rows}</tbody>
        </table>
        ${overflow}
        <p style="color:#666;font-size:12px;margin-top:24px;">
          Automated weekly. To refresh a post, edit its <code>.mdx</code> file in
          <code>content/posts/</code> and set <code>updatedAt</code> to today.
        </p>
      </div>
    `;

    const to = process.env.ADMIN_EMAIL || "Kanika@kanikarose.com";
    const emailed = await sendEmail({
      to,
      subject: `Content freshness: ${totalStale} post${totalStale === 1 ? "" : "s"} due for a refresh`,
      html,
    });

    return NextResponse.json({
      success: true,
      stale: totalStale,
      listed: Math.min(totalStale, MAX_LISTED),
      emailed,
    });
  } catch (error) {
    console.error("[cron/content-freshness] error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
