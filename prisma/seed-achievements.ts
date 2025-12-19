import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const achievements = [
  // Session milestones
  {
    slug: 'first-session',
    name: 'First Step',
    description: 'Complete your first coaching session',
    icon: 'Star',
    tier: 'bronze',
    criteria: { type: 'sessions_completed', count: 1 },
    sortOrder: 1
  },
  {
    slug: 'session-3',
    name: 'Building Momentum',
    description: 'Complete 3 coaching sessions',
    icon: 'Zap',
    tier: 'silver',
    criteria: { type: 'sessions_completed', count: 3 },
    sortOrder: 2
  },
  {
    slug: 'session-10',
    name: 'Dedicated Student',
    description: 'Complete 10 coaching sessions',
    icon: 'Crown',
    tier: 'gold',
    criteria: { type: 'sessions_completed', count: 10 },
    sortOrder: 3
  },

  // Course milestones
  {
    slug: 'first-lesson',
    name: 'Knowledge Seeker',
    description: 'Complete your first lesson',
    icon: 'BookOpen',
    tier: 'bronze',
    criteria: { type: 'lessons_completed', count: 1 },
    sortOrder: 4
  },
  {
    slug: 'lessons-10',
    name: 'Committed Learner',
    description: 'Complete 10 lessons',
    icon: 'Brain',
    tier: 'silver',
    criteria: { type: 'lessons_completed', count: 10 },
    sortOrder: 5
  },
  {
    slug: 'course-complete',
    name: 'Course Graduate',
    description: 'Complete an entire course',
    icon: 'GraduationCap',
    tier: 'gold',
    criteria: { type: 'course_completed', count: 1 },
    sortOrder: 6
  },

  // Engagement milestones
  {
    slug: 'day-7',
    name: 'Week One',
    description: 'Be a member for 7 days',
    icon: 'Calendar',
    tier: 'bronze',
    criteria: { type: 'days_active', count: 7 },
    sortOrder: 7
  },
  {
    slug: 'day-30',
    name: 'Monthly Devotee',
    description: 'Be a member for 30 days',
    icon: 'CalendarDays',
    tier: 'silver',
    criteria: { type: 'days_active', count: 30 },
    sortOrder: 8
  },
  {
    slug: 'day-90',
    name: 'Quarterly Master',
    description: 'Be a member for 90 days',
    icon: 'Trophy',
    tier: 'gold',
    criteria: { type: 'days_active', count: 90 },
    sortOrder: 9
  },

  // Feedback milestones
  {
    slug: 'feedback-given',
    name: 'Voice Heard',
    description: 'Leave your first session feedback',
    icon: 'MessageSquare',
    tier: 'bronze',
    criteria: { type: 'feedback_given', count: 1 },
    sortOrder: 10
  },

  // Purchase milestones
  {
    slug: 'first-purchase',
    name: 'Taking Action',
    description: 'Make your first purchase',
    icon: 'ShoppingBag',
    tier: 'bronze',
    criteria: { type: 'purchases_made', count: 1 },
    sortOrder: 11
  },
  {
    slug: 'book-owner',
    name: 'Book Owner',
    description: 'Purchase the Sociopathic Dating Bible',
    icon: 'Book',
    tier: 'silver',
    criteria: { type: 'book_purchased', count: 1 },
    sortOrder: 12
  }
]

async function main() {
  console.log('Seeding achievements...')

  for (const achievement of achievements) {
    await prisma.achievement.upsert({
      where: { slug: achievement.slug },
      update: achievement,
      create: achievement
    })
    console.log(`  Created/updated: ${achievement.name}`)
  }

  console.log(`\nSeeded ${achievements.length} achievements`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
