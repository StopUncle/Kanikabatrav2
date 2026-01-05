import { memo } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles, BookOpen, Play, Clock, Crown, TrendingUp } from 'lucide-react-native';
import { Card } from '../ui/Card';
import { haptics } from '../../lib/haptics';
import { colors, spacing, typography, borderRadius, shadows, gradients } from '../../lib/theme';
import { Quiz } from '../../services/quizService';
import { Course } from '../../services/courseService';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.75;
const CARD_GAP = spacing.lg;

interface FeaturedCarouselProps {
  quiz?: Quiz | null;
  courses?: Course[];
}

const CompactQuizCard = memo(function CompactQuizCard({ quiz }: { quiz: Quiz }) {
  return (
    <Pressable
      style={styles.carouselCard}
      onPress={() => {
        haptics.medium();
        router.push(`/(quiz)/${quiz.id}`);
      }}
    >
      <Card variant="glassGold" glow style={styles.cardInner}>
        {/* Badge */}
        <View style={styles.badge}>
          <TrendingUp size={10} color={colors.accent} />
          <Text style={styles.badgeText}>FEATURED</Text>
        </View>

        {/* Icon */}
        <View style={[styles.iconContainer, shadows.sm]}>
          <LinearGradient colors={gradients.goldSubtle} style={StyleSheet.absoluteFill} />
          <Sparkles size={30} color={colors.accent} strokeWidth={1.5} />
        </View>

        {/* Content */}
        <Text style={styles.cardTitle} numberOfLines={2}>{quiz.title}</Text>
        <Text style={styles.cardDescription} numberOfLines={3}>{quiz.description}</Text>

        {/* Meta */}
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Play size={12} color={colors.tertiary} />
            <Text style={styles.metaText}>{quiz.question_count} questions</Text>
          </View>
          <View style={styles.metaItem}>
            <Clock size={12} color={colors.tertiary} />
            <Text style={styles.metaText}>{quiz.estimated_minutes} min</Text>
          </View>
        </View>
      </Card>
    </Pressable>
  );
});

const CompactCourseCard = memo(function CompactCourseCard({ course }: { course: Course }) {
  const isLocked = course.tier_required !== 'free';

  return (
    <Pressable
      style={styles.carouselCard}
      onPress={() => {
        haptics.medium();
        if (isLocked) {
          router.push('/(settings)/subscription');
        } else {
          router.push(`/(course)/${course.slug || course.id}`);
        }
      }}
    >
      <Card variant="glass" style={styles.cardInner}>
        {/* Badge */}
        {isLocked ? (
          <View style={[styles.badge, styles.premiumBadge]}>
            <Crown size={10} color={colors.background} />
            <Text style={[styles.badgeText, styles.premiumBadgeText]}>PREMIUM</Text>
          </View>
        ) : (
          <View style={[styles.badge, styles.freeBadge]}>
            <Text style={[styles.badgeText, styles.freeBadgeText]}>FREE</Text>
          </View>
        )}

        {/* Icon */}
        <View style={[styles.iconContainer, styles.courseIcon, shadows.sm]}>
          <BookOpen size={30} color={colors.accent} strokeWidth={1.5} />
        </View>

        {/* Content */}
        <Text style={styles.cardTitle} numberOfLines={2}>{course.title}</Text>
        <Text style={styles.cardDescription} numberOfLines={3}>{course.description}</Text>

        {/* Meta */}
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Play size={12} color={colors.tertiary} />
            <Text style={styles.metaText}>{course.lesson_count} lessons</Text>
          </View>
          <View style={styles.metaItem}>
            <Clock size={12} color={colors.tertiary} />
            <Text style={styles.metaText}>{Math.floor(course.total_minutes / 60)}h</Text>
          </View>
        </View>
      </Card>
    </Pressable>
  );
});

export function FeaturedCarousel({ quiz, courses = [] }: FeaturedCarouselProps) {
  // Build carousel items
  const items: React.ReactNode[] = [];

  if (quiz) {
    items.push(<CompactQuizCard key="quiz" quiz={quiz} />);
  }

  courses.slice(0, 3).forEach((course) => {
    items.push(<CompactCourseCard key={course.id} course={course} />);
  });

  if (items.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionAccent} />
        <Text style={styles.sectionTitle}>Discover</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH + CARD_GAP}
        snapToAlignment="start"
      >
        {items}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  sectionAccent: {
    width: 3,
    height: 20,
    borderRadius: 2,
    backgroundColor: colors.accent,
  },
  sectionTitle: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    gap: CARD_GAP,
  },
  carouselCard: {
    width: CARD_WIDTH,
  },
  cardInner: {
    gap: spacing.md,
    height: 220,
    padding: spacing.lg,
  },
  badge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 3,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.accentMuted,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: typography.bold,
    color: colors.accent,
    letterSpacing: 0.5,
  },
  premiumBadge: {
    backgroundColor: colors.accent,
  },
  premiumBadgeText: {
    color: colors.background,
  },
  freeBadge: {
    backgroundColor: 'rgba(76, 175, 80, 0.15)',
  },
  freeBadgeText: {
    color: colors.success,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  courseIcon: {
    backgroundColor: colors.surfaceElevated,
  },
  cardTitle: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.primary,
    lineHeight: 22,
  },
  cardDescription: {
    fontSize: typography.sm,
    color: colors.secondary,
    lineHeight: 20,
    flex: 1,
  },
  metaRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
});
