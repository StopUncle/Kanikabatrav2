import { FEATURED_VIDEOS, SITE_CONFIG } from "@/lib/constants";

export async function GET() {
  const baseUrl = SITE_CONFIG.url;
  // The featured-video grid lives on /content, so that is the canonical page that
  // hosts every video. Pointing each entry there fixes the old bug of using the bare
  // homepage as the loc for all videos.
  const hostPage = `${baseUrl}/content`;

  const videoEntries = FEATURED_VIDEOS.videos
    .map((video) => {
      const thumbnailUrl = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
      const contentUrl = `https://www.youtube.com/watch?v=${video.id}`;
      const playerUrl = `https://www.youtube.com/embed/${video.id}`;

      const durationSeconds = video.duration
        ? parseDuration(video.duration)
        : null;
      const durationTag =
        durationSeconds && durationSeconds > 0
          ? `\n        <video:duration>${durationSeconds}</video:duration>`
          : "";
      const publicationTag = video.uploadDate
        ? `\n        <video:publication_date>${video.uploadDate}T00:00:00+00:00</video:publication_date>`
        : "";

      return `
    <url>
      <loc>${hostPage}</loc>
      <video:video>
        <video:thumbnail_loc>${thumbnailUrl}</video:thumbnail_loc>
        <video:title><![CDATA[${video.title}]]></video:title>
        <video:description><![CDATA[${video.description}]]></video:description>
        <video:content_loc>${contentUrl}</video:content_loc>
        <video:player_loc>${playerUrl}</video:player_loc>${durationTag}${publicationTag}
        <video:family_friendly>yes</video:family_friendly>
        <video:live>no</video:live>
        <video:uploader info="${baseUrl}">${SITE_CONFIG.name}</video:uploader>
      </video:video>
    </url>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${videoEntries}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}

function parseDuration(duration: string): number {
  const parts = duration.split(":");
  if (parts.length === 2) {
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
  }
  return 0;
}
