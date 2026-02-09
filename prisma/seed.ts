import { PrismaClient, AccessTier } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create Forum Categories
  const categories = await Promise.all([
    prisma.forumCategory.upsert({
      where: { slug: 'general-discussion' },
      update: {},
      create: {
        name: 'General Discussion',
        slug: 'general-discussion',
        description: 'Open discussions about dark psychology, strategy, and social dynamics.',
        icon: '💬',
        sortOrder: 1,
        accessTier: AccessTier.PUBLIC,
      },
    }),
    prisma.forumCategory.upsert({
      where: { slug: 'dating-strategy' },
      update: {},
      create: {
        name: 'Dating Strategy',
        slug: 'dating-strategy',
        description: 'Tactical approaches to dating, attraction, and relationship dynamics.',
        icon: '💘',
        sortOrder: 2,
        accessTier: AccessTier.REGISTERED,
      },
    }),
    prisma.forumCategory.upsert({
      where: { slug: 'strategic-psychology' },
      update: {},
      create: {
        name: 'Strategic Psychology',
        slug: 'strategic-psychology',
        description: 'Master the art of power, influence, and strategic thinking.',
        icon: '🖤',
        sortOrder: 3,
        accessTier: AccessTier.REGISTERED,
      },
    }),
    prisma.forumCategory.upsert({
      where: { slug: 'book-discussion' },
      update: {},
      create: {
        name: 'Sociopathic Dating Bible',
        slug: 'book-discussion',
        description: 'Exclusive discussions for book owners. Dive deep into the chapters.',
        icon: '📖',
        sortOrder: 4,
        accessTier: AccessTier.BOOK_OWNER,
      },
    }),
    prisma.forumCategory.upsert({
      where: { slug: 'coaching-circle' },
      update: {},
      create: {
        name: 'Coaching Circle',
        slug: 'coaching-circle',
        description: 'Private space for coaching clients. Share progress and insights.',
        icon: '👑',
        sortOrder: 5,
        accessTier: AccessTier.COACHING_CLIENT,
      },
    }),
    prisma.forumCategory.upsert({
      where: { slug: 'inner-sanctum' },
      update: {},
      create: {
        name: 'Inner Sanctum',
        slug: 'inner-sanctum',
        description: 'The most exclusive content. Premium members only.',
        icon: '🔐',
        sortOrder: 6,
        accessTier: AccessTier.PREMIUM,
      },
    }),
  ])

  console.log(`✅ Created ${categories.length} forum categories`)

  // Create Chat Rooms
  const chatRooms = await Promise.all([
    prisma.chatRoom.upsert({
      where: { slug: 'lobby' },
      update: {},
      create: {
        name: 'Lobby',
        slug: 'lobby',
        description: 'Welcome to the community. Introduce yourself here.',
        accessTier: AccessTier.PUBLIC,
        categoryId: categories[0].id,
      },
    }),
    prisma.chatRoom.upsert({
      where: { slug: 'strategy-room' },
      update: {},
      create: {
        name: 'Strategy Room',
        slug: 'strategy-room',
        description: 'Real-time tactical discussions for members.',
        accessTier: AccessTier.REGISTERED,
        categoryId: categories[1].id,
      },
    }),
    prisma.chatRoom.upsert({
      where: { slug: 'strategy-lounge' },
      update: {},
      create: {
        name: 'Strategy Lounge',
        slug: 'strategy-lounge',
        description: 'Connect with other practitioners of strategic psychology.',
        accessTier: AccessTier.REGISTERED,
        categoryId: categories[2].id,
      },
    }),
    prisma.chatRoom.upsert({
      where: { slug: 'book-readers' },
      update: {},
      create: {
        name: 'Book Readers',
        slug: 'book-readers',
        description: 'Live chat for Sociopathic Dating Bible owners.',
        accessTier: AccessTier.BOOK_OWNER,
        categoryId: categories[3].id,
      },
    }),
    prisma.chatRoom.upsert({
      where: { slug: 'coaching-clients' },
      update: {},
      create: {
        name: 'Coaching Clients',
        slug: 'coaching-clients',
        description: 'Private chat for active coaching participants.',
        accessTier: AccessTier.COACHING_CLIENT,
        categoryId: categories[4].id,
      },
    }),
    prisma.chatRoom.upsert({
      where: { slug: 'premium-vault' },
      update: {},
      create: {
        name: 'Premium Vault',
        slug: 'premium-vault',
        description: 'Exclusive real-time access for premium members.',
        accessTier: AccessTier.PREMIUM,
        categoryId: categories[5].id,
      },
    }),
  ])

  console.log(`✅ Created ${chatRooms.length} chat rooms`)

  console.log('🎉 Seed completed successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Seed failed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
