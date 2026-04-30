import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin/auth";

async function fetchYouTubeTranscript(videoId: string): Promise<string | null> {
  try {
    // Try fetching captions via YouTube's timedtext API (no API key needed for auto-captions)
    const response = await fetch(
      `https://www.youtube.com/watch?v=${videoId}`,
      { headers: { "User-Agent": "Mozilla/5.0" } },
    );
    const html = await response.text();

    // Extract captions URL from page data
    const captionMatch = html.match(
      /"captionTracks":\[.*?"baseUrl":"(.*?)"/,
    );
    if (!captionMatch) return null;

    const captionUrl = captionMatch[1]
      .replace(/\\u0026/g, "&")
      .replace(/\\"/g, '"');
    const captionResponse = await fetch(captionUrl);
    const captionXml = await captionResponse.text();

    // Parse XML captions to plain text
    const textMatches = Array.from(captionXml.matchAll(/<text[^>]*>(.*?)<\/text>/g));
    const lines: string[] = [];
    for (const match of textMatches) {
      const text = match[1]
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"');
      lines.push(text);
    }

    return lines.join(" ");
  } catch {
    return null;
  }
}

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([^&\s]+)/,
    /(?:youtu\.be\/)([^?\s]+)/,
    /(?:youtube\.com\/shorts\/)([^?\s]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function analyzeTranscript(transcript: string) {
  const words = transcript.split(/\s+/);
  const sentences = transcript.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const first30Words = words.slice(0, 30).join(" ");

  // Hook analysis
  const hookIndicators = {
    question: /^(do|does|did|have|has|is|are|was|were|what|why|how|when|who)\s/i.test(first30Words),
    boldClaim: /never|always|every|no one|nobody|secret|truth|actually|real reason/i.test(first30Words),
    contrarian: /wrong|myth|lie|fake|not what you think|stop|don't/i.test(first30Words),
    personal: /\bI\b.*\b(was|am|did|have|had|felt|learned|realized|discovered)\b/i.test(first30Words),
  };

  // Emotional tone markers
  const toneMarkers = {
    authority: (transcript.match(/\b(research|study|data|evidence|science|diagnosed|clinical)\b/gi) || []).length,
    vulnerability: (transcript.match(/\b(feel|felt|scared|afraid|honest|admit|confess|truth)\b/gi) || []).length,
    provocation: (transcript.match(/\b(wrong|lie|fake|bs|stop|don't|never|nobody)\b/gi) || []).length,
    education: (transcript.match(/\b(means|because|reason|explains|indicates|shows|proves)\b/gi) || []).length,
  };

  const dominantTone = Object.entries(toneMarkers).sort((a, b) => b[1] - a[1])[0][0];

  // Topic extraction
  const topicKeywords = transcript
    .toLowerCase()
    .match(/\b(narcissist|sociopath|manipulation|relationship|dating|psychology|trauma|empathy|love.bomb|gaslight|toxic|abuse|personality.disorder|aspd|npd|attachment|boundary|red.flag)\b/gi) || [];
  const topicCounts: Record<string, number> = {};
  for (const kw of topicKeywords) {
    const normalized = kw.toLowerCase().replace(/\s+/g, " ");
    topicCounts[normalized] = (topicCounts[normalized] || 0) + 1;
  }
  const topTopics = Object.entries(topicCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([topic, count]) => ({ topic, count }));

  // Pacing
  const avgSentenceLength = words.length / Math.max(sentences.length, 1);

  return {
    wordCount: words.length,
    sentenceCount: sentences.length,
    avgSentenceLength: Math.round(avgSentenceLength * 10) / 10,
    hookAnalysis: {
      first30Words,
      indicators: hookIndicators,
      hookStrength:
        Object.values(hookIndicators).filter(Boolean).length >= 2
          ? "strong"
          : Object.values(hookIndicators).filter(Boolean).length >= 1
            ? "moderate"
            : "weak",
    },
    toneMarkers,
    dominantTone,
    topTopics,
    pacing:
      avgSentenceLength < 10
        ? "fast"
        : avgSentenceLength < 18
          ? "medium"
          : "slow",
  };
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const body = await request.json();
  const { url } = body;

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  const videoId = extractVideoId(url);
  if (!videoId) {
    return NextResponse.json(
      { error: "Could not extract video ID from URL" },
      { status: 400 },
    );
  }

  // Fetch video title from YouTube page
  let title = "Unknown";
  try {
    const pageResponse = await fetch(
      `https://www.youtube.com/watch?v=${videoId}`,
      { headers: { "User-Agent": "Mozilla/5.0" } },
    );
    const pageHtml = await pageResponse.text();
    const titleMatch = pageHtml.match(/<title>(.*?)<\/title>/);
    if (titleMatch) {
      title = titleMatch[1].replace(" - YouTube", "").trim();
    }
  } catch {
    // Keep default title
  }

  // Fetch transcript
  const transcript = await fetchYouTubeTranscript(videoId);

  // Analyze
  const analysis = transcript
    ? analyzeTranscript(transcript)
    : { error: "No transcript available, video may not have captions" };

  // Save to database
  const record = await prisma.videoAnalysis.create({
    data: {
      url,
      title,
      platform: "youtube",
      transcript,
      analysis,
    },
  });

  return NextResponse.json({ analysis: record });
}

export async function GET() {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const analyses = await prisma.videoAnalysis.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
    select: {
      id: true,
      url: true,
      title: true,
      platform: true,
      analysis: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ analyses });
}
