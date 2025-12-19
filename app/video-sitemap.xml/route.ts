import { FEATURED_VIDEOS, SITE_CONFIG } from '@/lib/constants'

export async function GET() {
  const baseUrl = SITE_CONFIG.url

  const videoEntries = FEATURED_VIDEOS.videos
    .map((video) => {
      const thumbnailUrl = `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`
      const contentUrl = `https://www.youtube.com/watch?v=${video.id}`
      const playerUrl = `https://www.youtube.com/embed/${video.id}`

      return `
    <url>
      <loc>${baseUrl}</loc>
      <video:video>
        <video:thumbnail_loc>${thumbnailUrl}</video:thumbnail_loc>
        <video:title><![CDATA[${video.title}]]></video:title>
        <video:description><![CDATA[${video.description}]]></video:description>
        <video:content_loc>${contentUrl}</video:content_loc>
        <video:player_loc>${playerUrl}</video:player_loc>
        <video:duration>${parseDuration(video.duration)}</video:duration>
        <video:publication_date>2024-01-01T00:00:00+00:00</video:publication_date>
        <video:family_friendly>yes</video:family_friendly>
        <video:live>no</video:live>
        <video:uploader info="${SITE_CONFIG.url}">${SITE_CONFIG.name}</video:uploader>
      </video:video>
    </url>`
    })
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${videoEntries}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}

function parseDuration(duration: string): number {
  const parts = duration.split(':')
  if (parts.length === 2) {
    return parseInt(parts[0]) * 60 + parseInt(parts[1])
  }
  return 0
}
