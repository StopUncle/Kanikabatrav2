// Outcome Card Component - Shows results after completing a scenario
import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, ScrollView } from 'react-native';
import {
  CheckCircle,
  XCircle,
  Star,
  Award,
  Sparkles,
} from 'lucide-react-native';
import { colors, spacing, borderRadius, typography, glass } from '../../lib/theme';
import type { OutcomeAnalysis, OutcomeType } from '../../content/simulator';

interface OutcomeCardProps {
  analysis: OutcomeAnalysis;
  scenarioTitle: string;
}

const OUTCOME_CONFIG: Record<OutcomeType, {
  icon: typeof CheckCircle;
  color: string;
  title: string;
}> = {
  passed: {
    icon: CheckCircle,
    color: colors.success,
    title: 'Mission Complete',
  },
  failed: {
    icon: XCircle,
    color: colors.error,
    title: 'Mission Failed',
  },
};

export function OutcomeCard({ analysis, scenarioTitle }: OutcomeCardProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  const config = OUTCOME_CONFIG[analysis.outcome];
  const Icon = config.icon;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        damping: 15,
        stiffness: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: config.color + '20' }]}>
            <Icon size={48} color={config.color} />
          </View>
          <Text style={[styles.title, { color: config.color }]}>{config.title}</Text>
          <Text style={styles.scenarioTitle}>{scenarioTitle}</Text>
        </View>

        {/* XP Earned (only show if passed) */}
        {analysis.outcome === 'passed' && analysis.xpEarned > 0 && (
          <View style={styles.statsRow}>
            <StatPill
              icon={Star}
              value={`+${analysis.xpEarned}`}
              label="XP Earned"
            />
          </View>
        )}

        {/* Ending Summary */}
        {analysis.endingSummary && (
          <View style={styles.summarySection}>
            <Text style={styles.summaryText}>{analysis.endingSummary}</Text>
          </View>
        )}

        {/* Badge earned */}
        {analysis.badgeEarned && (
          <View style={styles.badgeSection}>
            <View style={styles.badgeContainer}>
              <Award size={24} color={colors.accent} />
              <Text style={styles.badgeText}>Badge Earned!</Text>
            </View>
          </View>
        )}

        {/* Card earned */}
        {analysis.cardEarned && (
          <View style={styles.badgeSection}>
            <View style={styles.cardEarnedContainer}>
              <Sparkles size={24} color="#C9A961" />
              <Text style={styles.cardEarnedText}>Psychology Card Unlocked!</Text>
            </View>
          </View>
        )}

        {/* Lessons learned */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Takeaways</Text>
          {analysis.lessonsLearned.length > 0 ? (
            analysis.lessonsLearned.map((lesson, index) => (
              <View key={index} style={styles.listItem}>
                <View style={[styles.bullet, { backgroundColor: colors.accent }]} />
                <Text style={styles.listText}>{lesson}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noLessonsText}>
              Try to find the optimal choices to unlock key insights!
            </Text>
          )}
        </View>
      </ScrollView>
    </Animated.View>
  );
}

interface StatPillProps {
  icon: typeof Star;
  value: string;
  label: string;
}

function StatPill({ icon: Icon, value, label }: StatPillProps) {
  return (
    <View style={styles.statPill}>
      <Icon size={16} color={colors.accent} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    marginBottom: spacing.xs,
  },
  scenarioTitle: {
    fontSize: typography.md,
    color: colors.secondary,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.lg,
    ...glass.medium,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
  },
  statPill: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.primary,
    marginTop: spacing.xs,
  },
  statLabel: {
    fontSize: typography.xs,
    color: colors.secondary,
  },
  badgeSection: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.accentMuted,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
  },
  badgeText: {
    fontSize: typography.sm,
    fontWeight: typography.semibold,
    color: colors.accent,
  },
  cardEarnedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: 'rgba(201, 169, 97, 0.15)',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(201, 169, 97, 0.3)',
  },
  cardEarnedText: {
    fontSize: typography.sm,
    fontWeight: typography.semibold,
    color: '#C9A961',
  },
  summarySection: {
    marginBottom: spacing.lg,
    padding: spacing.md,
    ...glass.medium,
    borderRadius: borderRadius.lg,
  },
  summaryText: {
    fontSize: typography.md,
    color: colors.secondary,
    lineHeight: typography.md * 1.6,
    textAlign: 'center',
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.sm,
    fontWeight: typography.semibold,
    color: colors.accent,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 6,
    marginRight: spacing.sm,
  },
  listText: {
    flex: 1,
    fontSize: typography.sm,
    color: colors.secondary,
    lineHeight: typography.sm * 1.5,
  },
  noLessonsText: {
    fontSize: typography.sm,
    color: colors.tertiary,
    fontStyle: 'italic',
  },
});
