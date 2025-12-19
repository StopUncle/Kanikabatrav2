'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import BackgroundEffects from '@/components/BackgroundEffects'
import Header from '@/components/Header'
import { MessageSquare, Users, BookOpen, Crown, Lock, ArrowRight, Play } from 'lucide-react'

interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  icon: string | null
  accessTier: string
  postCount: number
  hasAccess: boolean
  accessReason?: string
}

interface ChatRoom {
  id: string
  name: string
  slug: string
  accessTier: string
  memberCount: number
  hasAccess: boolean
}

interface CommunityPageClientProps {
  categories: Category[]
  chatRooms: ChatRoom[]
  isLoggedIn: boolean
  userName: string | null
  hasSubscription: boolean
}

export default function CommunityPageClient({
  categories,
  chatRooms,
  isLoggedIn,
  userName,
  hasSubscription
}: CommunityPageClientProps) {
  return (
    <>
      <BackgroundEffects />
      <Header />
      <div className="min-h-screen pt-20 sm:pt-24 lg:pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4">
              <span className="gradient-text">Community Forum</span>
              {userName && (
                <span className="text-accent-gold">, {userName}</span>
              )}
            </h1>
            <p className="text-text-gray text-lg max-w-2xl mx-auto">
              Connect with fellow students, share insights, and discuss course content
              with like-minded individuals.
            </p>
          </motion.div>

          {!isLoggedIn && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-accent-burgundy/10 border border-accent-burgundy/30 rounded-xl p-6 mb-8"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-medium text-text-light mb-1">
                    Join the conversation
                  </h3>
                  <p className="text-text-muted text-sm">
                    Create an account to post, comment, and chat with other members
                  </p>
                </div>
                <div className="flex gap-3">
                  <Link
                    href="/login"
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 bg-accent-gold text-deep-black rounded-lg font-medium hover:bg-accent-gold/90 transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {isLoggedIn && !hasSubscription && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-r from-accent-burgundy/20 to-accent-sapphire/20 border border-accent-gold/30 rounded-xl p-6 mb-8"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent-gold/10 flex items-center justify-center">
                    <Lock className="w-6 h-6 text-accent-gold" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-text-light mb-1">
                      Unlock Full Forum Access
                    </h3>
                    <p className="text-text-muted text-sm">
                      Subscribe to a course to participate in all discussions
                    </p>
                  </div>
                </div>
                <Link
                  href="/courses"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-burgundy to-accent-sapphire text-white rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  <Play className="w-4 h-4" />
                  View Courses
                </Link>
              </div>
            </motion.div>
          )}

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-light flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-accent-gold" />
                <span className="gradient-text">Forum Categories</span>
              </h2>
            </div>

            {categories.length === 0 ? (
              <div className="text-center py-12 bg-deep-black/40 backdrop-blur-sm border border-accent-gold/20 rounded-xl">
                <MessageSquare className="w-12 h-12 text-text-muted mx-auto mb-4" />
                <p className="text-text-gray">No forum categories yet</p>
                <p className="text-sm text-text-muted mt-2">
                  Check back soon for discussions!
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={category.hasAccess ? `/community/${category.slug}` : '#'}
                    onClick={(e) => !category.hasAccess && e.preventDefault()}
                    className={`block bg-deep-black/40 backdrop-blur-sm border rounded-xl p-5 transition-all ${
                      category.hasAccess
                        ? 'border-accent-gold/20 hover:border-accent-gold/40'
                        : 'border-gray-800/50 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent-burgundy/20 to-accent-sapphire/20 flex items-center justify-center flex-shrink-0">
                        {category.accessTier === 'COURSE_SUBSCRIBER' ? (
                          <Crown className="w-6 h-6 text-accent-gold" />
                        ) : (
                          <MessageSquare className="w-6 h-6 text-accent-gold" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-text-light">
                            {category.name}
                          </h3>
                          {!category.hasAccess && (
                            <Lock className="w-4 h-4 text-text-muted" />
                          )}
                        </div>
                        {category.description && (
                          <p className="text-sm text-text-gray line-clamp-2 mb-2">
                            {category.description}
                          </p>
                        )}
                        <p className="text-xs text-text-muted">
                          {category.postCount} {category.postCount === 1 ? 'post' : 'posts'}
                        </p>
                      </div>
                      {category.hasAccess && (
                        <ArrowRight className="w-5 h-5 text-text-muted" />
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </motion.section>

          {chatRooms.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-12"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-light flex items-center gap-3">
                  <Users className="w-6 h-6 text-accent-gold" />
                  <span className="gradient-text">Chat Rooms</span>
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {chatRooms.map((room) => (
                  <Link
                    key={room.id}
                    href={room.hasAccess ? `/community/chat/${room.slug}` : '#'}
                    onClick={(e) => !room.hasAccess && e.preventDefault()}
                    className={`block bg-deep-black/40 backdrop-blur-sm border rounded-xl p-5 text-center transition-all ${
                      room.hasAccess
                        ? 'border-accent-gold/20 hover:border-accent-gold/40'
                        : 'border-gray-800/50 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-accent-burgundy/20 flex items-center justify-center">
                      {room.accessTier === 'PREMIUM' || room.accessTier === 'COURSE_SUBSCRIBER' ? (
                        <Crown className="w-6 h-6 text-accent-gold" />
                      ) : (
                        <Users className="w-6 h-6 text-accent-gold" />
                      )}
                    </div>
                    <h3 className="font-medium text-text-light mb-1">{room.name}</h3>
                    <p className="text-xs text-text-muted">{room.memberCount} members</p>
                    {!room.hasAccess && (
                      <Lock className="w-4 h-4 text-text-muted mx-auto mt-2" />
                    )}
                  </Link>
                ))}
              </div>
            </motion.section>
          )}

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-accent-burgundy/10 to-accent-sapphire/10 border border-accent-gold/20 rounded-xl p-8"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-light gradient-text mb-2">
                  Unlock Full Access
                </h2>
                <p className="text-text-muted">
                  Subscribe to a course for full forum access, exclusive discussions,
                  and direct interaction with other students.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/book"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-accent-burgundy/30 text-white rounded-lg hover:bg-accent-burgundy/40 transition-colors"
                >
                  <BookOpen className="w-5 h-5" />
                  Get the Book
                </Link>
                <Link
                  href="/courses"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-burgundy to-accent-sapphire text-white rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  <Crown className="w-5 h-5" />
                  View Courses
                </Link>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </>
  )
}
