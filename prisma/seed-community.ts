import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedCommunity() {
  console.log('Seeding community data...')

  // Create forum categories
  const categories = await Promise.all([
    prisma.forumCategory.upsert({
      where: { slug: 'general-discussion' },
      update: {},
      create: {
        name: 'General Discussion',
        slug: 'general-discussion',
        description: 'Open discussions about psychology, relationships, and personal development',
        icon: '💬',
        sortOrder: 1,
        accessTier: 'PUBLIC'
      }
    }),
    prisma.forumCategory.upsert({
      where: { slug: 'dark-psychology' },
      update: {},
      create: {
        name: 'Dark Psychology',
        slug: 'dark-psychology',
        description: 'Deep dives into manipulation, persuasion, and psychological influence',
        icon: '🧠',
        sortOrder: 2,
        accessTier: 'REGISTERED'
      }
    }),
    prisma.forumCategory.upsert({
      where: { slug: 'dating-strategy' },
      update: {},
      create: {
        name: 'Dating Strategy',
        slug: 'dating-strategy',
        description: 'Tactical approaches to modern dating and attraction',
        icon: '💘',
        sortOrder: 3,
        accessTier: 'REGISTERED'
      }
    }),
    prisma.forumCategory.upsert({
      where: { slug: 'book-club' },
      update: {},
      create: {
        name: 'Book Club',
        slug: 'book-club',
        description: 'Exclusive discussions for Sociopathic Dating Bible readers',
        icon: '📚',
        sortOrder: 4,
        accessTier: 'BOOK_OWNER'
      }
    }),
    prisma.forumCategory.upsert({
      where: { slug: 'inner-circle' },
      update: {},
      create: {
        name: 'Inner Circle',
        slug: 'inner-circle',
        description: 'Premium content and advanced strategies for coaching clients',
        icon: '👑',
        sortOrder: 5,
        accessTier: 'COACHING_CLIENT'
      }
    })
  ])

  console.log(`Created ${categories.length} forum categories`)

  // Create chat rooms
  const chatRooms = await Promise.all([
    prisma.chatRoom.upsert({
      where: { slug: 'lobby' },
      update: {},
      create: {
        name: 'The Lobby',
        slug: 'lobby',
        description: 'Main community chat - everyone welcome',
        accessTier: 'REGISTERED',
        categoryId: categories[0].id,
        isActive: true
      }
    }),
    prisma.chatRoom.upsert({
      where: { slug: 'dark-arts' },
      update: {},
      create: {
        name: 'Dark Arts Lounge',
        slug: 'dark-arts',
        description: 'Real-time discussions on psychological tactics',
        accessTier: 'REGISTERED',
        categoryId: categories[1].id,
        isActive: true
      }
    }),
    prisma.chatRoom.upsert({
      where: { slug: 'book-owners' },
      update: {},
      create: {
        name: 'Book Owners Only',
        slug: 'book-owners',
        description: 'Exclusive chat for Sociopathic Dating Bible purchasers',
        accessTier: 'BOOK_OWNER',
        categoryId: categories[3].id,
        isActive: true
      }
    }),
    prisma.chatRoom.upsert({
      where: { slug: 'vip-lounge' },
      update: {},
      create: {
        name: 'VIP Lounge',
        slug: 'vip-lounge',
        description: 'Private space for coaching clients to connect',
        accessTier: 'COACHING_CLIENT',
        categoryId: categories[4].id,
        isActive: true
      }
    })
  ])

  console.log(`Created ${chatRooms.length} chat rooms`)

  console.log('Community seeding complete!')
}

seedCommunity()
  .catch((e) => {
    console.error('Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
