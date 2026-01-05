import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, RefreshControl, Animated, ScrollView, ListRenderItem } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { logger } from '../../lib/logger';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, Clock, Lock, Crown, BookOpen, Zap, Sparkles, ChevronRight } from 'lucide-react-native';
import { Card } from '../../components/ui/Card';
import { GradientButton } from '../../components/ui/GradientButton';
import { SkeletonCourseCard } from '../../components/ui/Skeleton';
import { UpgradePromptCard } from '../../components/upgrade/UpgradePromptCard';
import { BookPurchaseCard } from '../../components/book/BookPurchaseCard';
import { haptics } from '../../lib/haptics';
import { colors, spacing, typography, borderRadius, shadows, gradients, animations } from '../../lib/theme';
import { courseService, Course } from '../../services/courseService';
import { useAuthStore } from '../../stores/authStore';

const CourseCard = React.memo(function CourseCard({ course, userTier }: { course: Course; userTier: string }) {
  const tierColors = {
    free: colors.success,
    premium: colors.accent,
    vip: colors.accentLight,
  };

  const tierOrder = { free: 0, premium: 1, vip: 2 };
  const isLocked = tierOrder[course.tier_required] > tierOrder[userTier as keyof typeof tierOrder];

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hrs}h ${mins}m` : `${hrs}h`;
  };

  const handlePress = () => {
    haptics.medium();
    if (isLocked) {
      router.push('/(settings)/subscription');
    } else {
      router.push(`/(course)/${course.slug || course.id}`);
    }
  };

  const accessibilityLabel = `${course.title}, ${course.tier_required} tier, ${course.lesson_count} lessons${isLocked ? ', locked' : ''}`;
  const accessibilityHint = isLocked ? 'Tap to unlock with subscription' : 'Tap to start learning';

  return (
    <Card
      variant={course.tier_required === 'vip' ? 'glassGold' : 'glass'}
      glow={course.tier_required === 'vip' && !isLocked}
      style={StyleSheet.flatten(isLocked ? [styles.courseCard, styles.courseCardLocked] : styles.courseCard)}
      onPress={handlePress}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
    >
      {/* Course image placeholder */}
      <View style={styles.courseImage}>
        <BookOpen size={40} color={colors.accent} strokeWidth={1.5} />
        {isLocked && (
          <View style={styles.lockedOverlay}>
            <LinearGradient
              colors={gradients.darkFade}
              style={StyleSheet.absoluteFill}
            />
            <View style={[styles.lockedBadge, shadows.glow]}>
              <Lock size={14} color={colors.background} />
            </View>
          </View>
        )}
      </View>

      <View style={styles.courseContent}>
        <View style={styles.courseHeader}>
          <View style={[styles.tierBadgeContainer, { backgroundColor: tierColors[course.tier_required] + '20' }]}>
            {course.tier_required === 'vip' && <Crown size={10} color={tierColors[course.tier_required]} />}
            <Text style={[styles.tierBadge, { color: tierColors[course.tier_required] }]}>
              {course.tier_required.toUpperCase()}
            </Text>
          </View>
          {isLocked && (
            <View style={styles.unlockHint}>
              <Text style={styles.unlockText}>Tap to unlock</Text>
            </View>
          )}
        </View>

        <Text style={[styles.courseTitle, isLocked && styles.lockedText]}>{course.title}</Text>
        <Text style={[styles.courseDescription, isLocked && styles.lockedText]} numberOfLines={2}>
          {course.description}
        </Text>

        <View style={styles.courseMeta}>
          <Play size={14} color={colors.tertiary} />
          <Text style={styles.metaText}>{course.lesson_count} lessons</Text>
          <Text style={styles.metaDot}>•</Text>
          <Clock size={14} color={colors.tertiary} />
          <Text style={styles.metaText}>{formatDuration(course.total_minutes)}</Text>
          <Text style={styles.metaDot}>•</Text>
          <Zap size={14} color={colors.accent} />
          <Text style={styles.xpText}>+{course.lesson_count * 25 + 200} XP</Text>
        </View>
      </View>
    </Card>
  );
}, (prevProps, nextProps) => {
  return prevProps.course.id === nextProps.course.id &&
         prevProps.userTier === nextProps.userTier;
});

const FilterChip = React.memo(function FilterChip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      ...animations.springBouncy,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      ...animations.spring,
    }).start();
  };

  return (
    <Pressable
      onPress={() => {
        haptics.light();
        onPress();
      }}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={[
          styles.filterChip,
          active && styles.filterChipActive,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        {active ? (
          <LinearGradient
            colors={gradients.goldSubtle}
            style={StyleSheet.absoluteFill}
          />
        ) : null}
        <Text style={[styles.filterText, active && styles.filterTextActive]}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
});

export default function LearnScreen() {
  const { user } = useAuthStore();
  const userTier = user?.subscription_tier || 'free';

  const [courses, setCourses] = useState<Course[]>([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'free' | 'premium' | 'progress'>('all');

  useEffect(() => {
    void loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const [coursesData, enrolledIds] = await Promise.all([
        courseService.getCourses(),
        user?.id ? courseService.getUserEnrolledCourseIds(user.id) : Promise.resolve([]),
      ]);
      setCourses(coursesData);
      setEnrolledCourseIds(enrolledIds);
    } catch (err) {
      logger.error('Failed to load courses:', err);
      setError('Unable to load courses. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      setError(null);
      const [coursesData, enrolledIds] = await Promise.all([
        courseService.getCourses(),
        user?.id ? courseService.getUserEnrolledCourseIds(user.id) : Promise.resolve([]),
      ]);
      setCourses(coursesData);
      setEnrolledCourseIds(enrolledIds);
    } catch (err) {
      logger.error('Failed to refresh courses:', err);
      setError('Unable to load courses. Pull to retry.');
    } finally {
      setRefreshing(false);
    }
  }, [user?.id]);

  const filteredCourses = useMemo(() => courses.filter(course => {
    if (filter === 'all') return true;
    if (filter === 'free') return course.is_free;
    if (filter === 'premium') return course.tier_required === 'premium';
    if (filter === 'progress') return enrolledCourseIds.includes(course.id);
    return true;
  }), [courses, filter, enrolledCourseIds]);

  const renderCourseItem: ListRenderItem<Course> = useCallback(({ item }) => (
    <CourseCard course={item} userTier={userTier} />
  ), [userTier]);

  const keyExtractor = useCallback((item: Course) => item.id, []);

  const ListHeader = useMemo(() => (
    <>
      {/* Transformation Programs Link */}
      <Pressable
        style={styles.programsLink}
        onPress={() => {
          haptics.light();
          router.push('/programs');
        }}
        accessibilityRole="button"
        accessibilityLabel="Transformation Programs"
        accessibilityHint="View 8-week structured journeys"
      >
        <View style={styles.programsIconContainer}>
          <Sparkles size={24} color={colors.accent} />
        </View>
        <View style={styles.programsContent}>
          <Text style={styles.programsTitle}>Transformation Programs</Text>
          <Text style={styles.programsSubtitle}>8-week structured journeys</Text>
        </View>
        <ChevronRight size={20} color={colors.secondary} />
      </Pressable>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filters}
      >
        <FilterChip label="All" active={filter === 'all'} onPress={() => setFilter('all')} />
        <FilterChip label="Free" active={filter === 'free'} onPress={() => setFilter('free')} />
        <FilterChip label="Premium" active={filter === 'premium'} onPress={() => setFilter('premium')} />
        <FilterChip label="In Progress" active={filter === 'progress'} onPress={() => setFilter('progress')} />
      </ScrollView>

      {/* Trial Prompt for Free Users */}
      {userTier === 'free' && (
        <UpgradePromptCard
          variant="trial"
          customTitle="Unlock All Courses Free"
          customSubtitle="Start your 7-day Premium trial and access everything"
        />
      )}

      {/* Trial Active Status */}
      {userTier === 'free' && (
        <UpgradePromptCard variant="trial-active" />
      )}

      {/* Loading State */}
      {loading && (
        <View style={styles.courseList}>
          <SkeletonCourseCard />
          <SkeletonCourseCard />
          <SkeletonCourseCard />
        </View>
      )}
    </>
  ), [filter, userTier, loading]);

  const ListFooter = useMemo(() => (
    <>
      {filteredCourses.length === 0 && !loading && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No courses found</Text>
        </View>
      )}

      {/* Book Purchase Card */}
      <View style={styles.bookSection}>
        <BookPurchaseCard />
      </View>

      {/* Upgrade Banner - Enhanced */}
      {userTier === 'free' && (
        <View style={[styles.upgradeBanner, shadows.glow]}>
          <LinearGradient
            colors={['rgba(201, 169, 97, 0.15)', 'rgba(201, 169, 97, 0.05)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <View style={[styles.upgradeIconContainer, shadows.glowIntense]}>
            <LinearGradient
              colors={gradients.goldVertical}
              style={styles.upgradeIconGradient}
            >
              <Crown size={28} color={colors.background} />
            </LinearGradient>
          </View>
          <Text style={styles.upgradeTitle}>Unlock All Courses</Text>
          <Text style={styles.upgradeText}>
            Get unlimited access to premium content
          </Text>
          <GradientButton
            title="Upgrade to Premium"
            onPress={() => {
              haptics.medium();
              router.push('/(settings)/subscription');
            }}
            glow
            size="md"
          />
        </View>
      )}
    </>
  ), [filteredCourses.length, userTier, loading]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Learn</Text>
        <Text style={styles.subtitle}>Master dark psychology</Text>
      </View>

      {error && !loading && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable style={styles.retryButton} onPress={loadCourses}>
            <Text style={styles.retryText}>Retry</Text>
          </Pressable>
        </View>
      )}

      <FlatList
        data={loading ? [] : filteredCourses}
        renderItem={renderCourseItem}
        keyExtractor={keyExtractor}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={5}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.accent}
            colors={[colors.accent]}
          />
        }
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  subtitle: {
    fontSize: typography.sm,
    color: colors.secondary,
    marginTop: spacing.xs,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.errorMuted,
  },
  errorText: {
    fontSize: typography.sm,
    color: colors.error,
  },
  retryButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.error,
    borderRadius: borderRadius.sm,
  },
  retryText: {
    fontSize: typography.sm,
    color: colors.primary,
    fontWeight: typography.semibold,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    gap: spacing.lg,
  },
  programsLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.accentMuted,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  programsIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  programsContent: {
    flex: 1,
    gap: 2,
  },
  programsTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  programsSubtitle: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  filters: {
    gap: spacing.sm,
  },
  filterChip: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  filterChipActive: {
    backgroundColor: 'transparent',
    borderColor: colors.accent,
  },
  filterText: {
    fontSize: typography.sm,
    color: colors.secondary,
    fontWeight: typography.medium,
  },
  filterTextActive: {
    color: colors.accent,
  },
  courseList: {
    gap: spacing.md,
  },
  courseCard: {
    padding: 0,
    overflow: 'hidden',
  },
  courseCardLocked: {
    opacity: 0.85,
  },
  courseImage: {
    height: 120,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  lockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockedBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockedText: {
    opacity: 0.7,
  },
  courseContent: {
    padding: spacing.md,
    gap: spacing.sm,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tierBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 2,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  tierBadge: {
    fontSize: typography.xs,
    fontWeight: typography.bold,
  },
  unlockHint: {
    backgroundColor: colors.accentMuted,
    paddingVertical: 2,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  unlockText: {
    fontSize: typography.xs,
    color: colors.accent,
    fontWeight: typography.medium,
  },
  courseTitle: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  courseDescription: {
    fontSize: typography.sm,
    color: colors.secondary,
    lineHeight: 20,
  },
  courseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  metaText: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
  metaDot: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
  xpText: {
    fontSize: typography.xs,
    color: colors.accent,
    fontWeight: typography.semibold,
  },
  upgradeBanner: {
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.accent,
    overflow: 'hidden',
  },
  upgradeIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    marginBottom: spacing.xs,
  },
  upgradeIconGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  upgradeTitle: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.accent,
  },
  upgradeText: {
    fontSize: typography.sm,
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  emptyState: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: typography.md,
    color: colors.tertiary,
  },
  bookSection: {
    marginTop: spacing.lg,
  },
});
