import { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { logger } from '../../../lib/logger';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Play, Lock, Clock, CheckCircle, ChevronDown, ChevronUp, BookOpen } from 'lucide-react-native';
import { colors, spacing, typography, borderRadius } from '../../../lib/theme';
import { haptics } from '../../../lib/haptics';
import { courseService, Course, CourseModule, CourseProgress } from '../../../services/courseService';
import { useAuthStore } from '../../../stores/authStore';
import { UpgradeModal } from '../../../components/ui/UpgradeModal';

export default function CourseDetailScreen() {
  const { courseId } = useLocalSearchParams<{ courseId: string }>();
  const { user } = useAuthStore();
  const userTier = user?.subscription_tier || 'free';

  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [progress, setProgress] = useState<CourseProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    void loadCourse();
  }, [courseId]);

  const loadCourse = async () => {
    if (!courseId) return;

    try {
      setLoading(true);
      setError(null);
      const { course: courseData, modules: moduleData } = await courseService.getCourseWithModules(courseId);
      setCourse(courseData);
      setModules(moduleData);

      // Load user progress if authenticated
      if (user && courseData) {
        const userProgress = await courseService.getUserProgress(user.id, courseData.id);
        setProgress(userProgress);
      }

      // Expand first module by default
      if (moduleData.length > 0) {
        setExpandedModules(new Set([moduleData[0].id]));
      }
    } catch (err) {
      logger.error('Failed to load course:', err);
      setError('Unable to load course. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isLessonCompleted = (lessonId: string) => {
    return progress.some(p => p.lesson_id === lessonId && p.completed);
  };

  const toggleModule = (moduleId: string) => {
    haptics.light();
    setExpandedModules(prev => {
      const next = new Set(prev);
      if (next.has(moduleId)) {
        next.delete(moduleId);
      } else {
        next.add(moduleId);
      }
      return next;
    });
  };

  const canAccessLesson = (isPreview: boolean) => {
    if (!course) return false;
    if (course.is_free || isPreview) return true;

    const tierRank: Record<string, number> = { free: 0, premium: 1, vip: 2 };
    const userRank = tierRank[userTier] ?? 0;
    const requiredRank = tierRank[course.tier_required] ?? 0;
    return userRank >= requiredRank;
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    if (mins < 60) return `${mins}m`;
    const hrs = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    return `${hrs}h ${remainingMins}m`;
  };

  const openLesson = useCallback((lessonId: string, isPreview: boolean) => {
    if (!canAccessLesson(isPreview)) {
      haptics.error();
      setShowUpgradeModal(true);
      return;
    }

    haptics.medium();
    router.push(`/(course)/${courseId}/lesson/${lessonId}`);
  }, [courseId, canAccessLesson]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.accent} />
        </View>
      </SafeAreaView>
    );
  }

  if (!course) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Course not found</Text>
          <Pressable style={styles.backButton} onPress={() => router.replace('/(tabs)/learn')}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const tierColors = {
    free: colors.success,
    premium: colors.accent,
    vip: colors.accentLight,
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={styles.backBtn}
          onPress={() => {
            haptics.light();
            router.replace('/(tabs)/learn');
          }}
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <ArrowLeft size={24} color={colors.primary} />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>{course.title}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Course Hero */}
        <View style={styles.hero}>
          <View style={styles.heroImage}>
            <BookOpen size={64} color={colors.accent} strokeWidth={1.5} />
          </View>

          <View style={styles.heroContent}>
            <View style={[
              styles.tierBadge,
              { backgroundColor: tierColors[course.tier_required] + '20' }
            ]}>
              <Text style={[styles.tierText, { color: tierColors[course.tier_required] }]}>
                {course.tier_required.toUpperCase()}
              </Text>
            </View>

            <Text style={styles.courseTitle}>{course.title}</Text>
            <Text style={styles.courseDescription}>{course.description}</Text>

            <View style={styles.courseMeta}>
              <View style={styles.metaItem}>
                <Play size={16} color={colors.secondary} />
                <Text style={styles.metaText}>{course.lesson_count} lessons</Text>
              </View>
              <View style={styles.metaItem}>
                <Clock size={16} color={colors.secondary} />
                <Text style={styles.metaText}>{formatDuration(course.total_minutes * 60)}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Modules */}
        <View style={styles.modulesSection}>
          <Text style={styles.sectionTitle}>Course Content</Text>

          {modules.map((module, moduleIndex) => (
            <View key={module.id} style={styles.moduleCard}>
              <Pressable
                style={styles.moduleHeader}
                onPress={() => toggleModule(module.id)}
              >
                <View style={styles.moduleInfo}>
                  <Text style={styles.moduleNumber}>Module {moduleIndex + 1}</Text>
                  <Text style={styles.moduleTitle}>{module.title}</Text>
                  <Text style={styles.lessonCount}>{module.lessons.length} lessons</Text>
                </View>
                {expandedModules.has(module.id) ? (
                  <ChevronUp size={20} color={colors.secondary} />
                ) : (
                  <ChevronDown size={20} color={colors.secondary} />
                )}
              </Pressable>

              {expandedModules.has(module.id) && (
                <View style={styles.lessonsList}>
                  {module.lessons.map((lesson, lessonIndex) => {
                    const canAccess = canAccessLesson(lesson.is_preview);
                    const completed = isLessonCompleted(lesson.id);

                    return (
                      <Pressable
                        key={lesson.id}
                        style={[styles.lessonItem, !canAccess && styles.lessonLocked]}
                        onPress={() => openLesson(lesson.id, lesson.is_preview)}
                      >
                        <View style={styles.lessonLeft}>
                          <View style={[
                            styles.lessonIcon,
                            canAccess && styles.lessonIconActive,
                            completed && styles.lessonIconCompleted
                          ]}>
                            {completed ? (
                              <CheckCircle size={14} color={colors.background} />
                            ) : canAccess ? (
                              <Play size={14} color={colors.background} />
                            ) : (
                              <Lock size={14} color={colors.tertiary} />
                            )}
                          </View>
                          <View style={styles.lessonInfo}>
                            <Text style={[
                              styles.lessonTitle,
                              !canAccess && styles.lessonTitleLocked,
                              completed && styles.lessonTitleCompleted
                            ]}>
                              {lesson.title}
                            </Text>
                            <Text style={styles.lessonDuration}>
                              {formatDuration(lesson.duration_seconds)}
                              {lesson.is_preview && ' • Preview'}
                              {completed && ' • Completed'}
                            </Text>
                          </View>
                        </View>
                      </Pressable>
                    );
                  })}
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Upgrade CTA for locked courses */}
        {!course.is_free && userTier === 'free' && (
          <Pressable
            style={styles.upgradeCTA}
            onPress={() => {
              haptics.medium();
              setShowUpgradeModal(true);
            }}
          >
            <Lock size={20} color={colors.accent} />
            <Text style={styles.upgradeText}>
              Upgrade to {course.tier_required} to unlock this course
            </Text>
          </Pressable>
        )}

        <View style={{ height: spacing.xl }} />
      </ScrollView>

      {/* Upgrade Modal */}
      <UpgradeModal
        visible={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        requiredTier={course.tier_required === 'free' ? 'premium' : course.tier_required}
        featureName={course.title}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  errorText: {
    fontSize: typography.lg,
    color: colors.secondary,
  },
  backButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
  },
  backButtonText: {
    color: colors.primary,
    fontWeight: typography.medium,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
    textAlign: 'center',
  },
  scroll: {
    flex: 1,
  },
  hero: {
    backgroundColor: colors.surface,
  },
  heroImage: {
    height: 180,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroContent: {
    padding: spacing.lg,
    gap: spacing.sm,
  },
  tierBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  tierText: {
    fontSize: typography.xs,
    fontWeight: typography.bold,
  },
  courseTitle: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  courseDescription: {
    fontSize: typography.md,
    color: colors.secondary,
    lineHeight: 22,
  },
  courseMeta: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginTop: spacing.sm,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  metaText: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  modulesSection: {
    padding: spacing.md,
    gap: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  moduleCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  moduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  moduleInfo: {
    flex: 1,
    gap: 2,
  },
  moduleNumber: {
    fontSize: typography.xs,
    color: colors.accent,
    fontWeight: typography.semibold,
    textTransform: 'uppercase',
  },
  moduleTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  lessonCount: {
    fontSize: typography.sm,
    color: colors.tertiary,
  },
  lessonsList: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  lessonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  lessonLocked: {
    opacity: 0.6,
  },
  lessonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  lessonIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lessonIconActive: {
    backgroundColor: colors.accent,
  },
  lessonIconCompleted: {
    backgroundColor: colors.success,
  },
  lessonInfo: {
    flex: 1,
    gap: 2,
  },
  lessonTitle: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.primary,
  },
  lessonTitleLocked: {
    color: colors.tertiary,
  },
  lessonTitleCompleted: {
    color: colors.success,
  },
  lessonDuration: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
  upgradeCTA: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginHorizontal: spacing.md,
    padding: spacing.lg,
    backgroundColor: colors.accentMuted,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  upgradeText: {
    fontSize: typography.sm,
    color: colors.accent,
    fontWeight: typography.medium,
  },
});
