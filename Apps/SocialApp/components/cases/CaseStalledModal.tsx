// Case Stalled Modal Component
// Shows when user fails a scenario and needs to study before retry

import React from 'react';
import { View, Text, StyleSheet, Modal, Pressable } from 'react-native';
import { AlertCircle, BookOpen, RefreshCw, X } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GradientButton } from '../ui/GradientButton';
import { colors, spacing, typography, borderRadius, glass, gradients } from '../../lib/theme';
import { haptics } from '../../lib/haptics';
import type { CaseFile, CaseProgress } from '../../content/cases/types';
import { getCourse } from '../../content/courses';

interface CaseStalledModalProps {
  visible: boolean;
  caseFile: CaseFile | null;
  progress: CaseProgress | null;
  onClose: () => void;
  onGoToLesson: (lessonId: string) => void;
  onRetry: () => void;
}

export function CaseStalledModal({
  visible,
  caseFile,
  progress,
  onClose,
  onGoToLesson,
  onRetry,
}: CaseStalledModalProps) {
  if (!caseFile || !progress) return null;

  const stalledChapter = caseFile.chapters.find(
    (c) => c.chapterNumber === progress.stalledAt
  );
  const requiredLesson = progress.requiredLesson || stalledChapter?.lessonOnFail;
  const course = requiredLesson ? getCourse(requiredLesson) : null;
  const canRetry = progress.lessonCompleted === true;

  const handleGoToLesson = () => {
    haptics.medium();
    if (requiredLesson) {
      onGoToLesson(requiredLesson);
    }
  };

  const handleRetry = () => {
    haptics.medium();
    onRetry();
  };

  const handleClose = () => {
    haptics.light();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Glass background */}
          <View style={[StyleSheet.absoluteFill, styles.glassBackground]} />

          {/* Close button */}
          <Pressable
            style={styles.closeButton}
            onPress={handleClose}
            accessibilityLabel="Close"
            accessibilityRole="button"
          >
            <X size={20} color={colors.secondary} />
          </Pressable>

          {/* Warning icon */}
          <View style={styles.iconContainer}>
            <AlertCircle size={48} color={colors.warning} strokeWidth={1.5} />
          </View>

          {/* Title */}
          <Text style={styles.title}>Case Stalled</Text>
          <Text style={styles.subtitle}>
            Chapter {progress.stalledAt}: {stalledChapter?.title || 'Unknown'}
          </Text>

          {/* Message */}
          <Text style={styles.message}>
            You fell for a manipulation pattern. Study the lesson below to understand
            what happened and unlock retry.
          </Text>

          {/* Required lesson card */}
          {course && (
            <Pressable
              onPress={handleGoToLesson}
              style={({ pressed }) => [
                styles.lessonCard,
                pressed && styles.lessonCardPressed,
              ]}
            >
              <LinearGradient
                colors={['rgba(201, 169, 97, 0.1)', 'transparent']}
                style={StyleSheet.absoluteFill}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />
              <View style={styles.lessonIcon}>
                <BookOpen size={24} color={colors.accent} />
              </View>
              <View style={styles.lessonContent}>
                <Text style={styles.lessonLabel}>REQUIRED STUDY</Text>
                <Text style={styles.lessonTitle}>{course.title}</Text>
                <Text style={styles.lessonDescription} numberOfLines={2}>
                  {course.description}
                </Text>
              </View>
              {progress.lessonCompleted && (
                <View style={styles.completedBadge}>
                  <Text style={styles.completedText}>Done</Text>
                </View>
              )}
            </Pressable>
          )}

          {/* Action buttons */}
          <View style={styles.actions}>
            {canRetry ? (
              <GradientButton
                title="Retry Chapter"
                onPress={handleRetry}
                fullWidth
                glow
                icon={<RefreshCw size={18} color={colors.background} />}
              />
            ) : (
              <GradientButton
                title="Go to Lesson"
                onPress={handleGoToLesson}
                fullWidth
                icon={<BookOpen size={18} color={colors.background} />}
              />
            )}
          </View>

          {/* Skip hint */}
          {!canRetry && (
            <Text style={styles.hint}>
              Complete the lesson to unlock retry
            </Text>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  container: {
    width: '100%',
    maxWidth: 360,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    alignItems: 'center',
    overflow: 'hidden',
  },
  glassBackground: {
    ...glass.medium,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  closeButton: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.warning,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.sm,
    color: colors.secondary,
    textAlign: 'center',
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  message: {
    fontSize: typography.sm,
    color: colors.secondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
  lessonCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.accent,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    marginBottom: spacing.lg,
  },
  lessonCardPressed: {
    opacity: 0.8,
  },
  lessonIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lessonContent: {
    flex: 1,
  },
  lessonLabel: {
    fontSize: typography.xs,
    fontWeight: typography.bold,
    color: colors.accent,
    letterSpacing: 1,
    marginBottom: 2,
  },
  lessonTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  lessonDescription: {
    fontSize: typography.xs,
    color: colors.secondary,
    marginTop: 2,
  },
  completedBadge: {
    backgroundColor: colors.success,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  completedText: {
    fontSize: typography.xs,
    fontWeight: typography.bold,
    color: colors.background,
  },
  actions: {
    width: '100%',
  },
  hint: {
    fontSize: typography.xs,
    color: colors.tertiary,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});
