import { YoutubeTranscript } from 'youtube-transcript'
import * as fs from 'fs'
import * as path from 'path'

const VIDEOS = [
  { id: 'kVWjPrRLzws', title: 'Interview with a Sociopath' },
  { id: 'YZOOhB7rf4M', title: 'Sociopath Answers UNHINGED Questions From Social Media' },
  { id: 'g1HoELm4-xA', title: 'Sociopath Can I Control My Rage and Anger' },
  { id: 'R-SsbAUdgKk', title: 'Its Your Fault The Narcissist Cheated' },
  { id: 'fHydrkCyDSU', title: 'Sociopath Discusses Narcissistic Hoovering' },
  { id: 'b2cvX8bvF5k', title: 'Get Over A Breakup QUICK Like A Sociopath' },
]

async function fetchTranscript(videoId: string, title: string) {
  try {
    console.log(`Fetching transcript for: ${title} (${videoId})`)
    const transcript = await YoutubeTranscript.fetchTranscript(videoId)

    console.log(`Got ${transcript.length} segments`)

    if (transcript.length === 0) {
      console.log('No transcript segments found')
      return null
    }

    const text = transcript
      .map(item => item.text)
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim()

    console.log(`Text length: ${text.length}`)
    console.log(`First 200 chars: ${text.substring(0, 200)}`)

    const outputDir = path.join(process.cwd(), 'transcripts')
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    const filename = `${videoId}.txt`
    fs.writeFileSync(path.join(outputDir, filename), text, 'utf8')
    console.log(`Saved: ${filename}`)

    return text
  } catch (error) {
    console.error(`Error fetching ${videoId}:`, error)
    return null
  }
}

async function main() {
  for (const video of VIDEOS) {
    await fetchTranscript(video.id, video.title)
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
}

main()
