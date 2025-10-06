'use client'

import { useState } from 'react'
import { BookOpen, Calendar, Download, Settings, Plus, ArrowRight } from 'lucide-react'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import DashboardCard from '@/components/dashboard/DashboardCard'
import PurchaseItem from '@/components/dashboard/PurchaseItem'
import CoachingSession from '@/components/dashboard/CoachingSession'
import QuickStats from '@/components/dashboard/QuickStats'
import ResourceItem from '@/components/dashboard/ResourceItem'

interface DashboardClientProps {
  user: {
    email: string
    userId: string
  }
}

export default function DashboardClient({ user }: DashboardClientProps) {
  const [_activeTab, _setActiveTab] = useState('overview')
  
  // Mock data - In production, this would come from your database
  const purchases = [
    {
      type: 'book' as const,
      title: "Sociopathic Dating Bible",
      description: 'Master the art of psychological manipulation and dark influence',
      purchaseDate: '2024-01-15',
      status: 'active' as const,
      downloadUrl: '#'
    }
  ]

  const coachingSessions: Array<{
    title: string
    date: string
    time: string
    duration: string
    type: 'individual' | 'group'
    status: 'upcoming' | 'completed'
    meetingUrl?: string
    notes?: string
  }> = [
    {
      title: 'Power Dynamics Mastery',
      date: '2024-02-15',
      time: '2:00 PM EST',
      duration: '60 minutes',
      type: 'individual',
      status: 'upcoming',
      meetingUrl: '#',
      notes: 'Focus on workplace manipulation techniques'
    }
  ]

  const resources = [
    {
      title: 'Dark Psychology Workbook',
      description: 'Interactive exercises to develop your psychological edge',
      type: 'pdf' as const,
      isLocked: false,
      fileSize: '2.4 MB',
      downloadUrl: '#'
    },
    {
      title: 'Manipulation Mastery Video Series',
      description: 'Advanced techniques for influence and control',
      type: 'video' as const,
      isLocked: true,
      fileSize: '450 MB'
    },
    {
      title: 'Power Dynamics Worksheet',
      description: 'Map and analyze power structures in your environment',
      type: 'worksheet' as const,
      isLocked: false,
      fileSize: '1.1 MB',
      downloadUrl: '#'
    }
  ]

  // Calculate stats
  const stats = {
    totalPurchases: purchases.length,
    upcomingSessions: coachingSessions.filter(s => s.status === 'upcoming').length,
    completedSessions: coachingSessions.filter(s => s.status === 'completed').length,
    daysActive: 30 // Calculate from user creation date in production
  }

  return (
    <>
      <DashboardHeader userEmail={user.email} />
      
      <main className="min-h-screen bg-deep-black pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-light gradient-text mb-2">
              Welcome back, {user.email.split('@')[0]}
            </h1>
            <p className="text-text-gray">
              Your journey into dark psychology continues here
            </p>
          </div>

          {/* Quick Stats */}
          <div className="mb-8">
            <QuickStats {...stats} />
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Purchases & Coaching */}
            <div className="lg:col-span-2 space-y-8">
              {/* Purchases Section */}
              <DashboardCard
                title="My Purchases"
                subtitle="Your books and content"
                icon={BookOpen}
                headerAction={
                  <button className="text-gold hover:text-gold-dark transition-colors">
                    <Plus size={20} />
                  </button>
                }
              >
                {purchases.length > 0 ? (
                  <div className="space-y-3">
                    {purchases.map((purchase, index) => (
                      <PurchaseItem key={index} {...purchase} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BookOpen size={48} className="mx-auto text-gray-700 mb-3" />
                    <p className="text-text-muted">No purchases yet</p>
                    <button 
                      onClick={() => window.location.href = '/#book'}
                      className="mt-4 px-6 py-2 bg-gradient-to-r from-burgundy to-sapphire rounded-lg text-white font-medium hover:shadow-lg transition-all inline-flex items-center gap-2"
                    >
                      Browse Books
                      <ArrowRight size={16} />
                    </button>
                  </div>
                )}
              </DashboardCard>

              {/* Coaching Section */}
              <DashboardCard
                title="Coaching Sessions"
                subtitle="Your transformation sessions"
                icon={Calendar}
                headerAction={
                  <button 
                    onClick={() => window.location.href = '/coaching'}
                    className="px-4 py-1.5 bg-gold/10 hover:bg-gold/20 rounded-lg text-gold text-sm font-medium transition-colors"
                  >
                    Book Session
                  </button>
                }
              >
                {coachingSessions.length > 0 ? (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {coachingSessions.map((session, index) => (
                      <CoachingSession key={index} {...session} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar size={48} className="mx-auto text-gray-700 mb-3" />
                    <p className="text-text-muted">No sessions scheduled</p>
                    <button 
                      onClick={() => window.location.href = '/coaching'}
                      className="mt-4 px-6 py-2 bg-gradient-to-r from-burgundy to-sapphire rounded-lg text-white font-medium hover:shadow-lg transition-all inline-flex items-center gap-2"
                    >
                      Book Your First Session
                      <ArrowRight size={16} />
                    </button>
                  </div>
                )}
              </DashboardCard>
            </div>

            {/* Right Column - Resources & Account */}
            <div className="space-y-8">
              {/* Resources Section */}
              <DashboardCard
                title="Resources"
                subtitle="Exclusive materials"
                icon={Download}
              >
                <div className="space-y-3">
                  {resources.map((resource, index) => (
                    <ResourceItem key={index} {...resource} />
                  ))}
                </div>
                <div className="mt-6 p-4 bg-gold/10 rounded-lg border border-gold/20">
                  <p className="text-sm text-gold">
                    🔓 Unlock more resources by purchasing courses and coaching packages
                  </p>
                </div>
              </DashboardCard>

              {/* Account Settings */}
              <DashboardCard
                title="Account"
                subtitle="Manage your profile"
                icon={Settings}
              >
                <div className="space-y-4">
                  <div className="pb-4 border-b border-gray-800">
                    <label className="text-text-muted text-sm">Email</label>
                    <p className="text-text-light font-medium">{user.email}</p>
                  </div>
                  
                  <div className="pb-4 border-b border-gray-800">
                    <label className="text-text-muted text-sm">User ID</label>
                    <p className="text-text-light font-mono text-xs">{user.userId}</p>
                  </div>
                  
                  <div className="pb-4 border-b border-gray-800">
                    <label className="text-text-muted text-sm">Member Since</label>
                    <p className="text-text-light">{new Date().toLocaleDateString()}</p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <button className="w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-text-light text-sm font-medium transition-colors">
                      Update Profile
                    </button>
                    <button className="w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-text-light text-sm font-medium transition-colors">
                      Change Password
                    </button>
                    <form action="/api/auth/logout" method="POST">
                      <button
                        type="submit"
                        className="w-full px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-600/50 rounded-lg text-red-400 text-sm font-medium transition-colors"
                      >
                        Sign Out
                      </button>
                    </form>
                  </div>
                </div>
              </DashboardCard>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}