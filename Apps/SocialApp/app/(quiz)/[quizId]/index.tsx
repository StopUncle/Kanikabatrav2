import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { haptics } from '../../../lib/haptics';
import { colors, spacing, typography, borderRadius } from '../../../lib/theme';

// Quiz data (would come from API in production)
const quizData: Record<string, {
  title: string;
  description: string;
  icon: string;
  color: string;
  questions: number;
  duration: string;
  features: string[];
}> = {
  'dark-triad': {
    title: 'Dark Triad Assessment',
    description: 'The Dark Triad consists of three personality traits: Machiavellianism (manipulation and exploitation), Narcissism (egotism and self-obsession), and Psychopathy (lack of empathy and antisocial behavior). This quiz measures your tendencies in each area.',
    icon: '🪞',
    color: colors.accent,
    questions: 27,
    duration: '8 minutes',
    features: [
      'Detailed breakdown of all three traits',
      'Personalized insights and analysis',
      'Comparison to average scores',
      'Recommendations for self-improvement',
    ],
  },
  'manipulation-iq': {
    title: 'Manipulation IQ Test',
    description: 'This assessment evaluates your ability to recognize and resist common manipulation tactics. Understanding these patterns can help protect you from toxic relationships and professional exploitation.',
    icon: '🎯',
    color: '#E54545',
    questions: 20,
    duration: '6 minutes',
    features: [
      'Vulnerability assessment',
      'Manipulation pattern recognition',
      'Defense strategies',
      'Red flag awareness training',
    ],
  },
  'emotional-armor': {
    title: 'Emotional Armor Score',
    description: 'Measure the strength of your emotional boundaries. This quiz assesses your resilience to criticism, ability to maintain composure under pressure, and capacity to protect your mental energy.',
    icon: '🛡️',
    color: '#4CAF50',
    questions: 15,
    duration: '5 minutes',
    features: [
      'Boundary strength analysis',
      'Stress resilience score',
      'Energy protection tips',
      'Personalized armor-building plan',
    ],
  },
  'attachment-style': {
    title: 'Attachment Style Quiz',
    description: 'Discover your attachment style based on attachment theory. Understanding whether you have secure, anxious, avoidant, or disorganized attachment can transform your relationships.',
    icon: '💔',
    color: '#9C27B0',
    questions: 18,
    duration: '7 minutes',
    features: [
      'Primary attachment style identification',
      'Origin pattern analysis',
      'Relationship impact assessment',
      'Healing pathway recommendations',
    ],
  },
};

export default function QuizIntroScreen() {
  const { quizId } = useLocalSearchParams<{ quizId: string }>();
  const quiz = quizData[quizId];

  if (!quiz) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>❓</Text>
          <Text style={styles.errorTitle}>Quiz Not Found</Text>
          <Text style={styles.errorText}>The quiz you're looking for doesn't exist.</Text>
          <Pressable
            style={styles.errorButton}
            onPress={() => {
              haptics.light();
              router.replace('/(quiz)');
            }}
          >
            <Text style={styles.errorButtonText}>Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => {
            haptics.light();
            router.replace('/(quiz)');
          }}
        >
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={styles.hero}>
          <View style={[styles.iconContainer, { backgroundColor: quiz.color + '20' }]}>
            <Text style={styles.heroIcon}>{quiz.icon}</Text>
          </View>
          <Text style={styles.heroTitle}>{quiz.title}</Text>
        </View>

        {/* Description */}
        <Text style={styles.description}>{quiz.description}</Text>

        {/* Meta */}
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Text style={styles.metaIcon}>❓</Text>
            <Text style={styles.metaValue}>{quiz.questions}</Text>
            <Text style={styles.metaLabel}>Questions</Text>
          </View>
          <View style={styles.metaDivider} />
          <View style={styles.metaItem}>
            <Text style={styles.metaIcon}>⏱️</Text>
            <Text style={styles.metaValue}>{quiz.duration}</Text>
            <Text style={styles.metaLabel}>Duration</Text>
          </View>
        </View>

        {/* Features */}
        <Card style={styles.featuresCard}>
          <Text style={styles.featuresTitle}>What You'll Learn</Text>
          {quiz.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Text style={[styles.featureCheck, { color: quiz.color }]}>✓</Text>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </Card>

        {/* Instructions */}
        <Card style={styles.instructionsCard}>
          <Text style={styles.instructionsTitle}>Instructions</Text>
          <Text style={styles.instructionsText}>
            • Answer each question honestly{'\n'}
            • Go with your first instinct{'\n'}
            • There are no right or wrong answers{'\n'}
            • Your results are completely private
          </Text>
        </Card>
      </ScrollView>

      {/* Start Button */}
      <View style={styles.footer}>
        <Button
          title="Begin Assessment"
          onPress={() => {
            haptics.medium();
            router.push(`/(quiz)/${quizId}/question`);
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 32,
    color: colors.primary,
  },
  placeholder: {
    width: 40,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    gap: spacing.lg,
  },
  hero: {
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroIcon: {
    fontSize: 56,
  },
  heroTitle: {
    fontSize: typography.xxl,
    fontWeight: typography.bold,
    color: colors.primary,
    textAlign: 'center',
  },
  description: {
    fontSize: typography.md,
    color: colors.secondary,
    lineHeight: 26,
    textAlign: 'center',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
  metaItem: {
    alignItems: 'center',
    flex: 1,
    gap: spacing.xs,
  },
  metaIcon: {
    fontSize: 24,
  },
  metaValue: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  metaLabel: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
  metaDivider: {
    width: 1,
    height: 50,
    backgroundColor: colors.border,
  },
  featuresCard: {
    gap: spacing.md,
  },
  featuresTitle: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  featureCheck: {
    fontSize: typography.md,
    fontWeight: typography.bold,
  },
  featureText: {
    fontSize: typography.md,
    color: colors.secondary,
  },
  instructionsCard: {
    backgroundColor: colors.surfaceElevated,
    gap: spacing.sm,
  },
  instructionsTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  instructionsText: {
    fontSize: typography.sm,
    color: colors.secondary,
    lineHeight: 24,
  },
  footer: {
    padding: spacing.md,
    paddingBottom: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.md,
  },
  errorIcon: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  errorTitle: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  errorText: {
    fontSize: typography.md,
    color: colors.secondary,
    textAlign: 'center',
  },
  errorButton: {
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  errorButtonText: {
    fontSize: typography.md,
    fontWeight: typography.medium,
    color: colors.primary,
  },
});
