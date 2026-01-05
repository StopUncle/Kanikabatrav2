import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, CheckCircle, ChevronLeft, ChevronRight, BookOpen, Lightbulb, AlertTriangle, Target, Quote, List, XCircle, RotateCcw, ArrowRight, GraduationCap } from 'lucide-react-native';
import { colors, spacing, typography, borderRadius } from '../../../../lib/theme';
import { haptics } from '../../../../lib/haptics';
import { useAuthStore } from '../../../../stores/authStore';
import { activityService } from '../../../../services/activityService';
import { gamificationService } from '../../../../services/gamificationService';
import { challengeService } from '../../../../services/challengeService';
import { Card } from '../../../../components/ui/Card';
import { courses, getCourse } from '../../../../content/courses';
import type { Lesson, LessonContent, QuizQuestion } from '../../../../content/courses';

export default function LessonScreen() {
  const { courseId, lessonId } = useLocalSearchParams<{ courseId: string; lessonId: string }>();
  const scrollViewRef = useRef<ScrollView>(null);
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [readProgress, setReadProgress] = useState(0);

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  // Get course and lesson from static content
  const course = courseId ? getCourse(courseId) : null;
  const lessons: Lesson[] = course?.lessons || [];
  const currentIndex = lessons.findIndex(l => l.id === lessonId);
  const lesson: Lesson | null = currentIndex >= 0 ? lessons[currentIndex] : null;
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

  useEffect(() => {
    setLoading(false);
  }, [lessonId, courseId]);

  const handleScroll = (event: { nativeEvent: { contentOffset: { y: number }; contentSize: { height: number }; layoutMeasurement: { height: number } } }) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const scrollPercentage = contentOffset.y / (contentSize.height - layoutMeasurement.height);
    setReadProgress(Math.min(1, Math.max(0, scrollPercentage)));

    // Auto-complete when scrolled 90% or more
    if (scrollPercentage >= 0.9 && !isComplete) {
      void markComplete();
    }
  };

  const markComplete = async () => {
    if (isComplete) return;

    haptics.success();
    setIsComplete(true);

    if (user && lessonId && courseId) {
      // Track lesson completion activity
      await activityService.trackActivity(
        user.id,
        'lesson_completed',
        lessonId,
        course?.title || 'a course'
      );

      // Award XP and check for badges
      await gamificationService.handleLessonCompleted(lessonId, courseId, user.id);

      // Update daily challenge progress
      await challengeService.updateProgress('lesson');

      // Check if this was the last lesson (course completed)
      if (!nextLesson && courseId) {
        await activityService.trackActivity(
          user.id,
          'course_completed',
          courseId,
          course?.title || ''
        );

        // Award course completion XP and badges
        await gamificationService.handleCourseCompleted(courseId, user.id);
      }
    }
  };

  const navigateToLesson = (targetLessonId: string) => {
    haptics.light();
    setIsComplete(false);
    setReadProgress(0);
    // Reset quiz state
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
    setQuizCompleted(false);
    setCorrectAnswers(0);
    router.replace({
      pathname: '/(course)/[courseId]/lesson/[lessonId]',
      params: { courseId: courseId!, lessonId: targetLessonId },
    });
    scrollViewRef.current?.scrollTo({ y: 0, animated: false });
  };

  // Quiz handlers
  const quiz = lesson?.quiz;
  const currentQuestion = quiz?.questions[currentQuestionIndex];
  const totalQuestions = quiz?.questions.length || 0;

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    haptics.light();
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || !currentQuestion) return;
    haptics.medium();

    const correct = selectedAnswer === currentQuestion.correctIndex;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      haptics.success();
      setCorrectAnswers(prev => prev + 1);
    } else {
      haptics.error();
    }
  };

  const handleTryAgain = () => {
    haptics.light();
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
  };

  const handleNextQuestion = () => {
    haptics.light();

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setIsCorrect(false);
    } else {
      // Quiz completed
      setQuizCompleted(true);
      if (!isComplete) {
        void markComplete();
      }
    }
  };

  const handleBackToCourses = () => {
    haptics.light();
    router.push('/(tabs)/learn');
  };

  const handleBackToCourse = () => {
    haptics.light();
    router.push(`/(course)/${courseId}`);
  };

  const renderContentBlock = (block: LessonContent, index: number) => {
    switch (block.type) {
      case 'text':
        return (
          <Text key={index} style={styles.textBlock}>
            {block.content}
          </Text>
        );

      case 'quote':
        return (
          <View key={index} style={styles.quoteBlock}>
            <Quote size={20} color={colors.accent} style={styles.quoteIcon} />
            <Text style={styles.quoteText}>{block.content}</Text>
          </View>
        );

      case 'list':
        return (
          <View key={index} style={styles.listBlock}>
            {block.items?.map((item, i) => (
              <View key={i} style={styles.listItem}>
                <View style={styles.listBullet} />
                <Text style={styles.listItemText}>{item}</Text>
              </View>
            ))}
          </View>
        );

      case 'warning':
        return (
          <View key={index} style={styles.warningBlock}>
            <AlertTriangle size={20} color={colors.warning} />
            <Text style={styles.warningText}>{block.content}</Text>
          </View>
        );

      case 'insight':
        return (
          <View key={index} style={styles.insightBlock}>
            <Lightbulb size={20} color={colors.accent} />
            <Text style={styles.insightText}>{block.content}</Text>
          </View>
        );

      case 'tactic':
        return (
          <View key={index} style={styles.tacticBlock}>
            <Target size={20} color={colors.success} />
            <Text style={styles.tacticText}>{block.content}</Text>
          </View>
        );

      default:
        return (
          <Text key={index} style={styles.textBlock}>
            {block.content}
          </Text>
        );
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.accent} />
        </View>
      </SafeAreaView>
    );
  }

  if (!lesson || !course) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Lesson not found</Text>
          <Pressable style={styles.backButton} onPress={() => router.replace(`/(course)/${courseId}`)}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={styles.headerBackButton}
          onPress={() => {
            haptics.light();
            router.replace(`/(course)/${courseId}`);
          }}
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <ArrowLeft size={24} color={colors.primary} />
        </Pressable>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle} numberOfLines={1}>{lesson.title}</Text>
          <Text style={styles.headerSubtitle}>{course.title}</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      {/* Reading Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBarFill, { width: `${readProgress * 100}%` }]} />
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Lesson Header */}
        <View style={styles.lessonHeader}>
          <Text style={styles.lessonTitle}>{lesson.title}</Text>
          <View style={styles.lessonMeta}>
            <BookOpen size={14} color={colors.tertiary} />
            <Text style={styles.lessonMetaText}>
              {lesson.duration} • Lesson {currentIndex + 1} of {lessons.length}
            </Text>
          </View>
        </View>

        {/* Lesson Content */}
        <View style={styles.contentContainer}>
          {lesson.content.map((block, index) => renderContentBlock(block, index))}
        </View>

        {/* Key Takeaways */}
        {lesson.keyTakeaways && lesson.keyTakeaways.length > 0 && (
          <View style={styles.takeawaysSection}>
            <Text style={styles.sectionTitle}>Key Takeaways</Text>
            {lesson.keyTakeaways.map((takeaway, index) => (
              <View key={index} style={styles.takeawayItem}>
                <CheckCircle size={16} color={colors.success} />
                <Text style={styles.takeawayText}>{takeaway}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Exercise */}
        {lesson.exercise && (
          <View style={styles.exerciseSection}>
            <Text style={styles.sectionTitle}>Field Exercise</Text>
            <Card style={styles.exerciseCard}>
              <Text style={styles.exerciseTitle}>{lesson.exercise.title}</Text>
              <Text style={styles.exerciseDescription}>{lesson.exercise.description}</Text>
              {lesson.exercise.steps && (
                <View style={styles.exerciseSteps}>
                  {lesson.exercise.steps.map((step, index) => (
                    <View key={index} style={styles.exerciseStep}>
                      <View style={styles.exerciseStepNumber}>
                        <Text style={styles.exerciseStepNumberText}>{index + 1}</Text>
                      </View>
                      <Text style={styles.exerciseStepText}>{step}</Text>
                    </View>
                  ))}
                </View>
              )}
            </Card>
          </View>
        )}

        {/* Quiz Section */}
        {quiz && quiz.questions.length > 0 && !quizCompleted && (
          <View style={styles.quizSection}>
            <Text style={styles.sectionTitle}>Knowledge Check</Text>
            <Text style={styles.quizProgress}>
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </Text>

            <Card style={styles.quizCard}>
              <Text style={styles.quizQuestion}>{currentQuestion?.question}</Text>

              <View style={styles.quizOptions}>
                {currentQuestion?.options.map((option: string, index: number) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrectAnswer = showResult && index === currentQuestion.correctIndex;
                  const isWrongAnswer = showResult && isSelected && !isCorrect;

                  return (
                    <Pressable
                      key={index}
                      style={[
                        styles.quizOption,
                        isSelected && !showResult && styles.quizOptionSelected,
                        isCorrectAnswer && styles.quizOptionCorrect,
                        isWrongAnswer && styles.quizOptionWrong,
                      ]}
                      onPress={() => handleAnswerSelect(index)}
                      disabled={showResult}
                    >
                      <View style={[
                        styles.quizOptionRadio,
                        isSelected && !showResult && styles.quizOptionRadioSelected,
                        isCorrectAnswer && styles.quizOptionRadioCorrect,
                        isWrongAnswer && styles.quizOptionRadioWrong,
                      ]}>
                        {isCorrectAnswer && <CheckCircle size={16} color={colors.success} />}
                        {isWrongAnswer && <XCircle size={16} color={colors.error} />}
                      </View>
                      <Text style={[
                        styles.quizOptionText,
                        isCorrectAnswer && styles.quizOptionTextCorrect,
                        isWrongAnswer && styles.quizOptionTextWrong,
                      ]}>
                        {option}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              {/* Result Feedback */}
              {showResult && (
                <View style={[
                  styles.quizFeedback,
                  isCorrect ? styles.quizFeedbackCorrect : styles.quizFeedbackWrong,
                ]}>
                  {isCorrect ? (
                    <CheckCircle size={20} color={colors.success} />
                  ) : (
                    <XCircle size={20} color={colors.error} />
                  )}
                  <View style={styles.quizFeedbackContent}>
                    <Text style={[
                      styles.quizFeedbackTitle,
                      isCorrect ? styles.quizFeedbackTitleCorrect : styles.quizFeedbackTitleWrong,
                    ]}>
                      {isCorrect ? 'Correct!' : 'Not quite'}
                    </Text>
                    <Text style={styles.quizFeedbackExplanation}>
                      {currentQuestion?.explanation}
                    </Text>
                  </View>
                </View>
              )}

              {/* Action Buttons */}
              <View style={styles.quizActions}>
                {!showResult ? (
                  <Pressable
                    style={[
                      styles.quizSubmitButton,
                      selectedAnswer === null && styles.quizSubmitButtonDisabled,
                    ]}
                    onPress={handleSubmitAnswer}
                    disabled={selectedAnswer === null}
                  >
                    <Text style={styles.quizSubmitButtonText}>Submit Answer</Text>
                  </Pressable>
                ) : (
                  <View style={styles.quizResultActions}>
                    {!isCorrect && (
                      <Pressable
                        style={styles.quizTryAgainButton}
                        onPress={handleTryAgain}
                      >
                        <RotateCcw size={18} color={colors.primary} />
                        <Text style={styles.quizTryAgainButtonText}>Try Again</Text>
                      </Pressable>
                    )}
                    <Pressable
                      style={[
                        styles.quizNextButton,
                        isCorrect && styles.quizNextButtonFull,
                      ]}
                      onPress={handleNextQuestion}
                    >
                      <Text style={styles.quizNextButtonText}>
                        {currentQuestionIndex < totalQuestions - 1 ? 'Next Question' : 'Finish Quiz'}
                      </Text>
                      <ArrowRight size={18} color={colors.background} />
                    </Pressable>
                  </View>
                )}
              </View>
            </Card>
          </View>
        )}

        {/* Quiz Completed */}
        {quizCompleted && quiz && (
          <Card style={styles.quizCompleteCard}>
            <GraduationCap size={40} color={colors.accent} />
            <Text style={styles.quizCompleteTitle}>Quiz Complete!</Text>
            <Text style={styles.quizCompleteScore}>
              You got {correctAnswers} of {totalQuestions} correct
            </Text>
            <Text style={styles.quizCompletePercentage}>
              {Math.round((correctAnswers / totalQuestions) * 100)}%
            </Text>
          </Card>
        )}

        {/* Completion State */}
        {isComplete && (
          <Card style={styles.completionCard}>
            <CheckCircle size={32} color={colors.success} />
            <Text style={styles.completionTitle}>Lesson Complete!</Text>
            {nextLesson ? (
              <Text style={styles.completionText}>
                Continue to the next lesson below.
              </Text>
            ) : (
              <Text style={styles.completionText}>
                You've finished this course!
              </Text>
            )}

            {/* Back to Courses Navigation */}
            <View style={styles.completionActions}>
              <Pressable
                style={styles.backToCoursesButton}
                onPress={handleBackToCourse}
              >
                <BookOpen size={18} color={colors.primary} />
                <Text style={styles.backToCoursesText}>Back to Course</Text>
              </Pressable>
              <Pressable
                style={styles.allCoursesButton}
                onPress={handleBackToCourses}
              >
                <GraduationCap size={18} color={colors.background} />
                <Text style={styles.allCoursesText}>All Courses</Text>
              </Pressable>
            </View>
          </Card>
        )}

        {/* Navigation */}
        <View style={styles.navigation}>
          <Pressable
            style={[styles.navButton, !prevLesson && styles.navButtonDisabled]}
            onPress={() => prevLesson && navigateToLesson(prevLesson.id)}
            disabled={!prevLesson}
            accessibilityLabel={prevLesson ? `Previous lesson: ${prevLesson.title}` : 'No previous lesson'}
            accessibilityRole="button"
            accessibilityState={{ disabled: !prevLesson }}
          >
            <ChevronLeft size={20} color={prevLesson ? colors.primary : colors.tertiary} />
            <View style={styles.navButtonContent}>
              <Text style={[styles.navButtonLabel, !prevLesson && styles.navButtonLabelDisabled]}>
                Previous
              </Text>
              {prevLesson && (
                <Text style={styles.navButtonTitle} numberOfLines={1}>
                  {prevLesson.title}
                </Text>
              )}
            </View>
          </Pressable>

          <Pressable
            style={[styles.navButton, styles.navButtonRight, !nextLesson && styles.navButtonDisabled]}
            onPress={() => nextLesson && navigateToLesson(nextLesson.id)}
            disabled={!nextLesson}
            accessibilityLabel={nextLesson ? `Next lesson: ${nextLesson.title}` : 'No next lesson'}
            accessibilityRole="button"
            accessibilityState={{ disabled: !nextLesson }}
          >
            <View style={styles.navButtonContent}>
              <Text style={[styles.navButtonLabel, styles.navButtonLabelRight, !nextLesson && styles.navButtonLabelDisabled]}>
                Next
              </Text>
              {nextLesson && (
                <Text style={[styles.navButtonTitle, styles.navButtonTitleRight]} numberOfLines={1}>
                  {nextLesson.title}
                </Text>
              )}
            </View>
            <ChevronRight size={20} color={nextLesson ? colors.primary : colors.tertiary} />
          </Pressable>
        </View>

        {/* Action Button */}
        {!isComplete && (
          <View style={styles.actions}>
            <Pressable
              style={styles.completeButton}
              onPress={markComplete}
              accessibilityLabel="Mark lesson as complete"
              accessibilityRole="button"
            >
              <CheckCircle size={20} color={colors.background} />
              <Text style={styles.completeButtonText}>Mark as Complete</Text>
            </Pressable>
          </View>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>
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
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerBackButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  headerSubtitle: {
    fontSize: typography.xs,
    color: colors.tertiary,
    marginTop: 2,
  },
  headerSpacer: {
    width: 44,
  },
  progressBarContainer: {
    height: 3,
    backgroundColor: colors.border,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.accent,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  lessonHeader: {
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  lessonTitle: {
    fontSize: typography.xxl,
    fontWeight: typography.bold,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  lessonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  lessonMetaText: {
    fontSize: typography.sm,
    color: colors.tertiary,
  },
  contentContainer: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  textBlock: {
    fontSize: typography.md,
    color: colors.secondary,
    lineHeight: 26,
  },
  quoteBlock: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
    padding: spacing.md,
    gap: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  quoteIcon: {
    marginTop: 2,
  },
  quoteText: {
    flex: 1,
    fontSize: typography.md,
    fontStyle: 'italic',
    color: colors.primary,
    lineHeight: 24,
  },
  listBlock: {
    gap: spacing.sm,
    paddingLeft: spacing.sm,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  listBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
    marginTop: 9,
  },
  listItemText: {
    flex: 1,
    fontSize: typography.md,
    color: colors.secondary,
    lineHeight: 24,
  },
  warningBlock: {
    flexDirection: 'row',
    backgroundColor: colors.warning + '15',
    borderWidth: 1,
    borderColor: colors.warning + '40',
    padding: spacing.md,
    gap: spacing.sm,
    borderRadius: borderRadius.md,
  },
  warningText: {
    flex: 1,
    fontSize: typography.sm,
    color: colors.warning,
    lineHeight: 22,
  },
  insightBlock: {
    flexDirection: 'row',
    backgroundColor: colors.accent + '15',
    borderWidth: 1,
    borderColor: colors.accent + '40',
    padding: spacing.md,
    gap: spacing.sm,
    borderRadius: borderRadius.md,
  },
  insightText: {
    flex: 1,
    fontSize: typography.sm,
    color: colors.primary,
    lineHeight: 22,
  },
  tacticBlock: {
    flexDirection: 'row',
    backgroundColor: colors.success + '15',
    borderWidth: 1,
    borderColor: colors.success + '40',
    padding: spacing.md,
    gap: spacing.sm,
    borderRadius: borderRadius.md,
  },
  tacticText: {
    flex: 1,
    fontSize: typography.sm,
    color: colors.primary,
    lineHeight: 22,
  },
  takeawaysSection: {
    padding: spacing.lg,
    paddingTop: 0,
    gap: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  takeawayItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  takeawayText: {
    flex: 1,
    fontSize: typography.md,
    color: colors.secondary,
    lineHeight: 24,
  },
  exerciseSection: {
    padding: spacing.lg,
    paddingTop: 0,
  },
  exerciseCard: {
    backgroundColor: colors.surface,
    gap: spacing.md,
  },
  exerciseTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  exerciseDescription: {
    fontSize: typography.sm,
    color: colors.secondary,
    lineHeight: 22,
  },
  exerciseSteps: {
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  exerciseStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  exerciseStepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseStepNumberText: {
    fontSize: typography.xs,
    fontWeight: typography.bold,
    color: colors.background,
  },
  exerciseStepText: {
    flex: 1,
    fontSize: typography.sm,
    color: colors.secondary,
    lineHeight: 22,
  },
  completionCard: {
    margin: spacing.lg,
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.success + '15',
    borderColor: colors.success,
    borderWidth: 1,
  },
  completionTitle: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.success,
  },
  completionText: {
    fontSize: typography.sm,
    color: colors.secondary,
    textAlign: 'center',
  },
  completionActions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
    width: '100%',
  },
  backToCoursesButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surfaceElevated,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  backToCoursesText: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.primary,
  },
  allCoursesButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm,
    backgroundColor: colors.accent,
    borderRadius: borderRadius.md,
  },
  allCoursesText: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.background,
  },
  // Quiz Styles
  quizSection: {
    padding: spacing.lg,
    paddingTop: 0,
  },
  quizProgress: {
    fontSize: typography.sm,
    color: colors.tertiary,
    marginBottom: spacing.sm,
  },
  quizCard: {
    backgroundColor: colors.surface,
    gap: spacing.lg,
  },
  quizQuestion: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.primary,
    lineHeight: 26,
  },
  quizOptions: {
    gap: spacing.sm,
  },
  quizOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  quizOptionSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.accent + '10',
  },
  quizOptionCorrect: {
    borderColor: colors.success,
    backgroundColor: colors.success + '15',
  },
  quizOptionWrong: {
    borderColor: colors.error,
    backgroundColor: colors.error + '15',
  },
  quizOptionRadio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quizOptionRadioSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.accent,
  },
  quizOptionRadioCorrect: {
    borderColor: colors.success,
    backgroundColor: colors.success + '20',
  },
  quizOptionRadioWrong: {
    borderColor: colors.error,
    backgroundColor: colors.error + '20',
  },
  quizOptionText: {
    flex: 1,
    fontSize: typography.md,
    color: colors.secondary,
    lineHeight: 22,
  },
  quizOptionTextCorrect: {
    color: colors.success,
    fontWeight: typography.medium,
  },
  quizOptionTextWrong: {
    color: colors.error,
  },
  quizFeedback: {
    flexDirection: 'row',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  quizFeedbackCorrect: {
    backgroundColor: colors.success + '15',
  },
  quizFeedbackWrong: {
    backgroundColor: colors.error + '15',
  },
  quizFeedbackContent: {
    flex: 1,
    gap: spacing.xs,
  },
  quizFeedbackTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
  },
  quizFeedbackTitleCorrect: {
    color: colors.success,
  },
  quizFeedbackTitleWrong: {
    color: colors.error,
  },
  quizFeedbackExplanation: {
    fontSize: typography.sm,
    color: colors.secondary,
    lineHeight: 20,
  },
  quizActions: {
    marginTop: spacing.sm,
  },
  quizSubmitButton: {
    backgroundColor: colors.accent,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quizSubmitButtonDisabled: {
    backgroundColor: colors.tertiary,
    opacity: 0.5,
  },
  quizSubmitButtonText: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.background,
  },
  quizResultActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  quizTryAgainButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.md,
    backgroundColor: colors.surfaceElevated,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  quizTryAgainButtonText: {
    fontSize: typography.md,
    fontWeight: typography.medium,
    color: colors.primary,
  },
  quizNextButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.md,
    backgroundColor: colors.accent,
    borderRadius: borderRadius.md,
  },
  quizNextButtonFull: {
    flex: 1,
  },
  quizNextButtonText: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.background,
  },
  quizCompleteCard: {
    margin: spacing.lg,
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.accent + '15',
    borderColor: colors.accent,
    borderWidth: 1,
  },
  quizCompleteTitle: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  quizCompleteScore: {
    fontSize: typography.md,
    color: colors.secondary,
  },
  quizCompletePercentage: {
    fontSize: typography.xxl,
    fontWeight: typography.bold,
    color: colors.accent,
  },
  navigation: {
    flexDirection: 'row',
    padding: spacing.md,
    gap: spacing.sm,
  },
  navButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  navButtonRight: {
    justifyContent: 'flex-end',
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonContent: {
    flex: 1,
  },
  navButtonLabel: {
    fontSize: typography.xs,
    color: colors.tertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  navButtonLabelRight: {
    textAlign: 'right',
  },
  navButtonLabelDisabled: {
    color: colors.tertiary,
  },
  navButtonTitle: {
    fontSize: typography.sm,
    color: colors.primary,
    fontWeight: typography.medium,
    marginTop: 2,
  },
  navButtonTitleRight: {
    textAlign: 'right',
  },
  actions: {
    padding: spacing.lg,
    paddingTop: 0,
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.accent,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
  },
  completeButtonText: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.background,
  },
  bottomSpacer: {
    height: spacing.xl,
  },
});
