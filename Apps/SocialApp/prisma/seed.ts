import { PrismaClient } from '../lib/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // ============================================
  // QUIZZES
  // ============================================
  const darkTriadQuiz = await prisma.quiz.upsert({
    where: { slug: 'dark-triad' },
    update: {},
    create: {
      slug: 'dark-triad',
      title: 'Dark Triad Assessment',
      description: 'Measure your levels of Machiavellianism, Narcissism, and Psychopathy',
      icon: '🪞',
      color: '#C9A961',
      questionCount: 12,
      estimatedMinutes: 8,
      isPremium: false,
      isActive: true,
    },
  });

  await prisma.quiz.upsert({
    where: { slug: 'manipulation-iq' },
    update: {},
    create: {
      slug: 'manipulation-iq',
      title: 'Manipulation IQ Test',
      description: 'Discover your vulnerability to common manipulation tactics',
      icon: '🎯',
      color: '#E54545',
      questionCount: 20,
      estimatedMinutes: 6,
      isPremium: false,
      isActive: true,
    },
  });

  await prisma.quiz.upsert({
    where: { slug: 'emotional-armor' },
    update: {},
    create: {
      slug: 'emotional-armor',
      title: 'Emotional Armor Score',
      description: 'Assess your emotional boundaries and resilience',
      icon: '🛡️',
      color: '#4CAF50',
      questionCount: 15,
      estimatedMinutes: 5,
      isPremium: true,
      isActive: true,
    },
  });

  await prisma.quiz.upsert({
    where: { slug: 'shadow-self' },
    update: {},
    create: {
      slug: 'shadow-self',
      title: 'Shadow Self Analysis',
      description: 'Uncover hidden aspects of your personality',
      icon: '🌑',
      color: '#9C27B0',
      questionCount: 18,
      estimatedMinutes: 10,
      isPremium: true,
      isActive: true,
    },
  });

  // Dark Triad Questions
  const machiavellianismQuestions = [
    'I tend to manipulate others to get my way.',
    'I have used deceit or lied to get my way.',
    'I have used flattery to get my way.',
    'I tend to exploit others towards my own end.',
  ];

  const psychopathyQuestions = [
    'I tend to lack remorse.',
    'I tend to be unconcerned with the morality of my actions.',
    'I tend to be callous or insensitive.',
    'I tend to be cynical.',
  ];

  const narcissismQuestions = [
    'I tend to want others to admire me.',
    'I tend to want others to pay attention to me.',
    'I tend to seek prestige or status.',
    'I tend to expect special favors from others.',
  ];

  const options = [
    { text: 'Strongly Disagree', score: 1 },
    { text: 'Disagree', score: 2 },
    { text: 'Neutral', score: 3 },
    { text: 'Agree', score: 4 },
    { text: 'Strongly Agree', score: 5 },
  ];

  let orderIndex = 1;

  for (const questionText of machiavellianismQuestions) {
    const question = await prisma.quizQuestion.create({
      data: {
        quizId: darkTriadQuiz.id,
        questionText,
        trait: 'machiavellianism',
        orderIndex: orderIndex++,
      },
    });

    for (let i = 0; i < options.length; i++) {
      await prisma.quizOption.create({
        data: {
          questionId: question.id,
          optionText: options[i].text,
          scoreValue: options[i].score,
          orderIndex: i + 1,
        },
      });
    }
  }

  for (const questionText of psychopathyQuestions) {
    const question = await prisma.quizQuestion.create({
      data: {
        quizId: darkTriadQuiz.id,
        questionText,
        trait: 'psychopathy',
        orderIndex: orderIndex++,
      },
    });

    for (let i = 0; i < options.length; i++) {
      await prisma.quizOption.create({
        data: {
          questionId: question.id,
          optionText: options[i].text,
          scoreValue: options[i].score,
          orderIndex: i + 1,
        },
      });
    }
  }

  for (const questionText of narcissismQuestions) {
    const question = await prisma.quizQuestion.create({
      data: {
        quizId: darkTriadQuiz.id,
        questionText,
        trait: 'narcissism',
        orderIndex: orderIndex++,
      },
    });

    for (let i = 0; i < options.length; i++) {
      await prisma.quizOption.create({
        data: {
          questionId: question.id,
          optionText: options[i].text,
          scoreValue: options[i].score,
          orderIndex: i + 1,
        },
      });
    }
  }

  // ============================================
  // COURSES
  // ============================================
  await prisma.course.upsert({
    where: { slug: 'dark-psychology-101' },
    update: {},
    create: {
      slug: 'dark-psychology-101',
      title: 'Dark Psychology 101',
      description: 'Master the fundamentals of understanding human behavior',
      isFree: true,
      tierRequired: 'FREE',
      isPublished: true,
      lessonCount: 12,
      totalMinutes: 165,
    },
  });

  await prisma.course.upsert({
    where: { slug: 'art-of-influence' },
    update: {},
    create: {
      slug: 'art-of-influence',
      title: 'The Art of Influence',
      description: 'Learn ethical persuasion techniques that actually work',
      tierRequired: 'PREMIUM',
      isPublished: true,
      lessonCount: 18,
      totalMinutes: 260,
    },
  });

  await prisma.course.upsert({
    where: { slug: 'emotional-armor' },
    update: {},
    create: {
      slug: 'emotional-armor',
      title: 'Emotional Armor',
      description: 'Protect yourself from manipulation and toxic patterns',
      tierRequired: 'PREMIUM',
      isPublished: true,
      lessonCount: 15,
      totalMinutes: 210,
    },
  });

  await prisma.course.upsert({
    where: { slug: 'reading-between-lines' },
    update: {},
    create: {
      slug: 'reading-between-lines',
      title: 'Reading Between Lines',
      description: 'Decode body language and hidden intentions',
      tierRequired: 'VIP',
      isPublished: true,
      lessonCount: 10,
      totalMinutes: 135,
    },
  });

  // ============================================
  // CHAT ROOMS
  // ============================================
  await prisma.chatRoom.upsert({
    where: { id: 'general-discussion' },
    update: {},
    create: {
      id: 'general-discussion',
      name: 'General Discussion',
      description: 'Talk about anything dark psychology',
      icon: '💬',
      isVipOnly: false,
      memberCount: 178,
    },
  });

  await prisma.chatRoom.upsert({
    where: { id: 'book-club' },
    update: {},
    create: {
      id: 'book-club',
      name: 'Book Club',
      description: 'Discuss Honeytrap and upcoming releases',
      icon: '📚',
      isVipOnly: false,
      memberCount: 94,
    },
  });

  await prisma.chatRoom.upsert({
    where: { id: 'success-stories' },
    update: {},
    create: {
      id: 'success-stories',
      name: 'Success Stories',
      description: 'Share your transformation journey',
      icon: '🌟',
      isVipOnly: false,
      memberCount: 52,
    },
  });

  await prisma.chatRoom.upsert({
    where: { id: 'ask-kanika' },
    update: {},
    create: {
      id: 'ask-kanika',
      name: 'Ask Kanika',
      description: 'Q&A with Kanika (VIP only)',
      icon: '👑',
      isVipOnly: true,
      memberCount: 31,
    },
  });

  // ============================================
  // COACHING PACKAGES
  // ============================================
  await prisma.coachingPackage.upsert({
    where: { slug: 'insight-call' },
    update: {},
    create: {
      slug: 'insight-call',
      name: 'Insight Call',
      description: 'One powerful session to gain clarity on your situation',
      priceCents: 50000,
      sessionCount: 1,
      sessionDurationMinutes: 30,
      features: ['Personal assessment', '30-minute video call', 'Action plan PDF', 'Email follow-up'],
      isPopular: false,
    },
  });

  await prisma.coachingPackage.upsert({
    where: { slug: 'deep-dive' },
    update: {},
    create: {
      slug: 'deep-dive',
      name: 'Deep Dive',
      description: 'Transform your understanding over three intensive sessions',
      priceCents: 200000,
      sessionCount: 3,
      sessionDurationMinutes: 60,
      features: [
        'Comprehensive assessment',
        '3x 60-minute sessions',
        'Personalized workbook',
        'Priority email support',
        'Session recordings',
      ],
      isPopular: true,
    },
  });

  await prisma.coachingPackage.upsert({
    where: { slug: 'vip-transformation' },
    update: {},
    create: {
      slug: 'vip-transformation',
      name: 'VIP Transformation',
      description: 'The ultimate deep transformation experience',
      priceCents: 500000,
      sessionCount: 6,
      sessionDurationMinutes: 90,
      features: [
        'Full psychological profile',
        '6x 90-minute sessions',
        'Custom strategy blueprint',
        'Unlimited email support',
        'Private community access',
        'All course materials included',
      ],
      isPopular: false,
    },
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
