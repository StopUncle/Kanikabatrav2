import Pusher from 'pusher'

if (!process.env.PUSHER_APP_ID) {
  console.warn('PUSHER_APP_ID not set - real-time features will be disabled')
}

export const pusherServer = new Pusher({
  appId: process.env.PUSHER_APP_ID || '',
  key: process.env.PUSHER_KEY || '',
  secret: process.env.PUSHER_SECRET || '',
  cluster: process.env.PUSHER_CLUSTER || 'us2',
  useTLS: true
})

export async function triggerChatMessage(
  roomSlug: string,
  event: string,
  data: Record<string, unknown>
) {
  if (!process.env.PUSHER_APP_ID) return

  try {
    await pusherServer.trigger(`presence-chat-${roomSlug}`, event, data)
  } catch (error) {
    console.error('Pusher trigger error:', error)
  }
}

export async function triggerPremiumChatMessage(
  roomSlug: string,
  event: string,
  data: Record<string, unknown>
) {
  if (!process.env.PUSHER_APP_ID) return

  try {
    await pusherServer.trigger(`private-premium-${roomSlug}`, event, data)
  } catch (error) {
    console.error('Pusher trigger error:', error)
  }
}

export async function triggerUserNotification(
  userId: string,
  data: Record<string, unknown>
) {
  if (!process.env.PUSHER_APP_ID) return

  try {
    await pusherServer.trigger(`private-user-${userId}`, 'notification', data)
  } catch (error) {
    console.error('Pusher notification error:', error)
  }
}
