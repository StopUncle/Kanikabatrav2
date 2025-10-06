export interface ShareOptions {
  url: string
  title: string
  description?: string
  hashtags?: string[]
  via?: string
}

export function shareToTwitter(options: ShareOptions): void {
  const { url, title, hashtags, via } = options
  let tweetText = title

  if (hashtags && hashtags.length > 0) {
    tweetText += ' ' + hashtags.map(tag => `#${tag}`).join(' ')
  }

  const params = new URLSearchParams({
    url,
    text: tweetText,
    ...(via && { via })
  })

  window.open(`https://twitter.com/intent/tweet?${params.toString()}`, '_blank')
}

export function shareToFacebook(options: ShareOptions): void {
  const { url } = options
  const params = new URLSearchParams({ u: url })
  window.open(`https://www.facebook.com/sharer/sharer.php?${params.toString()}`, '_blank')
}

export function shareToLinkedIn(options: ShareOptions): void {
  const { url, title, description } = options
  const params = new URLSearchParams({
    url,
    title,
    ...(description && { summary: description })
  })
  window.open(`https://www.linkedin.com/sharing/share-offsite/?${params.toString()}`, '_blank')
}

export function shareToReddit(options: ShareOptions): void {
  const { url, title } = options
  const params = new URLSearchParams({ url, title })
  window.open(`https://www.reddit.com/submit?${params.toString()}`, '_blank')
}

export function shareViaEmail(options: ShareOptions): void {
  const { url, title, description } = options
  const subject = encodeURIComponent(title)
  const body = encodeURIComponent(`${description || title}\n\n${url}`)
  window.open(`mailto:?subject=${subject}&body=${body}`)
}

export function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text).then(() => true).catch(() => false)
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.opacity = '0'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    try {
      document.execCommand('copy')
      document.body.removeChild(textArea)
      return Promise.resolve(true)
    } catch (_err) {
      document.body.removeChild(textArea)
      return Promise.resolve(false)
    }
  }
}

export function shareNatively(options: ShareOptions): Promise<boolean> {
  if (navigator.share) {
    return navigator.share({
      title: options.title,
      text: options.description,
      url: options.url
    }).then(() => true).catch(() => false)
  }
  return Promise.resolve(false)
}