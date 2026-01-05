import { forwardRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Crown, Sparkles, Brain, Shield, Target, Heart, Drama, HeartOff } from 'lucide-react-native';
import { colors, spacing, typography, borderRadius, gradients } from '../../lib/theme';

interface TraitScore {
  name: string;
  score: number;
  icon: 'drama' | 'crown' | 'heartOff' | 'shield' | 'target' | 'heart';
  color: string;
}

interface ShareResultCardProps {
  quizTitle: string;
  overallScore: number;
  traits: TraitScore[];
  percentile?: number;
  comparisonFigure?: {
    name: string;
    match: number;
  };
  userName?: string;
}

const traitIcons = {
  drama: Drama,
  crown: Crown,
  heartOff: HeartOff,
  shield: Shield,
  target: Target,
  heart: Heart,
};

export const ShareResultCard = forwardRef<View, ShareResultCardProps>(({
  quizTitle,
  overallScore,
  traits,
  percentile,
  comparisonFigure,
  userName,
}, ref) => {
  const getScoreCategory = (score: number) => {
    if (score < 40) return { label: 'Low', color: '#4CAF50' };
    if (score < 70) return { label: 'Moderate', color: colors.warning };
    return { label: 'High', color: '#E54545' };
  };

  const category = getScoreCategory(overallScore);

  return (
    <View ref={ref} style={styles.container} collapsable={false}>
      {/* Background gradient */}
      <LinearGradient
        colors={['#0A0A0A', '#1A1A1A', '#0A0A0A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Gold accent line at top */}
      <LinearGradient
        colors={gradients.goldPrimary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.accentLine}
      />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Sparkles size={20} color={colors.accent} strokeWidth={2} />
          <Text style={styles.logoText}>THE DARK MIRROR</Text>
        </View>
        {userName && (
          <Text style={styles.userName}>{userName}'s Results</Text>
        )}
      </View>

      {/* Quiz Title */}
      <Text style={styles.quizTitle}>{quizTitle}</Text>

      {/* Main Score Circle */}
      <View style={styles.scoreSection}>
        <View style={styles.scoreRing}>
          <LinearGradient
            colors={[category.color, category.color + '80']}
            style={styles.scoreRingGradient}
          >
            <View style={styles.scoreInner}>
              <Text style={styles.scoreValue}>{overallScore}</Text>
              <Text style={styles.scoreMax}>/100</Text>
            </View>
          </LinearGradient>
        </View>
        <View style={[styles.categoryBadge, { backgroundColor: category.color + '20' }]}>
          <Text style={[styles.categoryText, { color: category.color }]}>
            {category.label}
          </Text>
        </View>
      </View>

      {/* Percentile (if available) */}
      {percentile && (
        <View style={styles.percentileContainer}>
          <Text style={styles.percentileLabel}>You scored higher than</Text>
          <View style={styles.percentileValue}>
            <Text style={styles.percentileNumber}>{percentile}%</Text>
            <Text style={styles.percentileText}>of all users</Text>
          </View>
        </View>
      )}

      {/* Trait Breakdown */}
      <View style={styles.traitsContainer}>
        {traits.map((trait, index) => {
          const IconComponent = traitIcons[trait.icon];
          return (
            <View key={index} style={styles.traitRow}>
              <View style={[styles.traitIcon, { backgroundColor: trait.color + '20' }]}>
                <IconComponent size={16} color={trait.color} strokeWidth={2} />
              </View>
              <Text style={styles.traitName}>{trait.name}</Text>
              <View style={styles.traitBarContainer}>
                <View
                  style={[
                    styles.traitBar,
                    { width: `${trait.score}%`, backgroundColor: trait.color }
                  ]}
                />
              </View>
              <Text style={[styles.traitScore, { color: trait.color }]}>
                {trait.score}
              </Text>
            </View>
          );
        })}
      </View>

      {/* Famous Figure Comparison (if available) */}
      {comparisonFigure && (
        <View style={styles.comparisonContainer}>
          <View style={styles.comparisonIcon}>
            <Brain size={16} color={colors.accent} strokeWidth={2} />
          </View>
          <View style={styles.comparisonContent}>
            <Text style={styles.comparisonLabel}>Your profile matches</Text>
            <Text style={styles.comparisonFigure}>
              {comparisonFigure.name}
            </Text>
            <Text style={styles.comparisonMatch}>
              {comparisonFigure.match}% similarity
            </Text>
          </View>
        </View>
      )}

      {/* Footer */}
      <View style={styles.footer}>
        <LinearGradient
          colors={gradients.goldSubtle}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.footerGradient}
        >
          <Text style={styles.footerText}>
            Take yours at thedarkmirror.app
          </Text>
        </LinearGradient>
      </View>

      {/* Corner decoration */}
      <View style={styles.cornerDecoration}>
        <View style={styles.cornerLine1} />
        <View style={styles.cornerLine2} />
      </View>
    </View>
  );
});

ShareResultCard.displayName = 'ShareResultCard';

const styles = StyleSheet.create({
  container: {
    width: 380,
    backgroundColor: colors.background,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    padding: spacing.lg,
    gap: spacing.md,
  },
  accentLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
  },
  header: {
    alignItems: 'center',
    gap: spacing.xs,
    paddingTop: spacing.sm,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  logoText: {
    fontSize: 14,
    fontWeight: typography.bold,
    color: colors.accent,
    letterSpacing: 2,
  },
  userName: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  quizTitle: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
    textAlign: 'center',
  },
  scoreSection: {
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  scoreRing: {
    width: 120,
    height: 120,
    borderRadius: 60,
    padding: 4,
  },
  scoreRingGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreInner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreValue: {
    fontSize: 40,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  scoreMax: {
    fontSize: typography.sm,
    color: colors.tertiary,
    marginTop: -4,
  },
  categoryBadge: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.full,
  },
  categoryText: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
  },
  percentileContainer: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
  },
  percentileLabel: {
    fontSize: typography.sm,
    color: colors.tertiary,
  },
  percentileValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.xs,
  },
  percentileNumber: {
    fontSize: typography.xxl,
    fontWeight: typography.bold,
    color: colors.accent,
  },
  percentileText: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  traitsContainer: {
    gap: spacing.sm,
  },
  traitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  traitIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  traitName: {
    width: 100,
    fontSize: typography.sm,
    color: colors.secondary,
  },
  traitBarContainer: {
    flex: 1,
    height: 6,
    backgroundColor: colors.surfaceElevated,
    borderRadius: 3,
    overflow: 'hidden',
  },
  traitBar: {
    height: '100%',
    borderRadius: 3,
  },
  traitScore: {
    width: 30,
    fontSize: typography.sm,
    fontWeight: typography.bold,
    textAlign: 'right',
  },
  comparisonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.accentMuted,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.accent + '30',
  },
  comparisonIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  comparisonContent: {
    flex: 1,
  },
  comparisonLabel: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
  comparisonFigure: {
    fontSize: typography.md,
    fontWeight: typography.bold,
    color: colors.accent,
  },
  comparisonMatch: {
    fontSize: typography.xs,
    color: colors.secondary,
  },
  footer: {
    marginTop: spacing.sm,
    overflow: 'hidden',
    borderRadius: borderRadius.md,
  },
  footerGradient: {
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  footerText: {
    fontSize: typography.sm,
    fontWeight: typography.semibold,
    color: colors.accent,
  },
  cornerDecoration: {
    position: 'absolute',
    bottom: spacing.lg,
    right: spacing.lg,
    width: 24,
    height: 24,
  },
  cornerLine1: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 2,
    backgroundColor: colors.accent + '40',
  },
  cornerLine2: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 2,
    height: 24,
    backgroundColor: colors.accent + '40',
  },
});
