import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin/auth";

export async function POST() {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const queries = [
    "kanika batra tiktok viral recent",
    "kanika batra youtube views",
    '"kanika batra" press coverage sociopath',
  ];

  const results: Array<{ query: string; findings: string[] }> = [];

  for (const query of queries) {
    try {
      const response = await fetch(
        `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}&count=5&freshness=pm`,
        {
          headers: {
            Accept: "application/json",
            "Accept-Encoding": "gzip",
            "X-Subscription-Token": process.env.BRAVE_API_KEY || "",
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        const findings = (data.web?.results || []).map(
          (r: { title: string; description: string; url: string }) =>
            `${r.title} — ${r.description?.slice(0, 120)}... (${r.url})`,
        );
        results.push({ query, findings });
      } else {
        results.push({
          query,
          findings: [`Search failed: ${response.status}`],
        });
      }
    } catch (error) {
      results.push({
        query,
        findings: [
          `Search error: ${error instanceof Error ? error.message : "Unknown"}`,
        ],
      });
    }
  }

  const scanSummary = results
    .map(
      (r) =>
        `**${r.query}**\n${r.findings.map((f) => `- ${f}`).join("\n")}`,
    )
    .join("\n\n");

  const note = await prisma.researchNote.create({
    data: {
      content: scanSummary,
      source: "brave-search-scan",
      tags: ["auto-scan", new Date().toISOString().split("T")[0]],
    },
  });

  return NextResponse.json({ note, results });
}
