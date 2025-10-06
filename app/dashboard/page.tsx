import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { verifyAccessToken } from '@/lib/auth/jwt'
import DashboardClient from '@/components/dashboard/DashboardClient'

export default async function DashboardPage() {
  // Server-side auth check
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  if (!accessToken) {
    redirect('/login')
  }

  try {
    const payload = verifyAccessToken(accessToken)
    
    // Pass user data to client component
    const user = {
      email: payload.email,
      userId: payload.userId
    }

    return <DashboardClient user={user} />
  } catch (_error) {
    // Token is invalid or expired
    redirect('/login')
  }
}

export const metadata = {
  title: 'Dashboard - Kanika Batra',
  description: 'Your dark psychology command center - manage purchases, coaching sessions, and exclusive resources'
}