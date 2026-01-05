import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Star, Zap } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography, borderRadius, gradients } from '../../lib/theme';
import { useGamificationStore } from '../../stores/gamificationStore';
import { gamificationService } from '../../services/gamificationService';

interface XPBarProps {
  showLevel?: boolean;
  compact?: boolean;
}

export function XPBar({ showLevel = true, compact = false }: XPBarProps) {
  const { totalXp, currentLevel } = useGamificationStore();
  const progressAnim = useRef(new Animated.Value(0)).current;

  const levelInfo = gamificationService.getLevelInfo();

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: levelInfo.progress,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [levelInfo.progress, progressAnim]);

  if (compact) {
    return (
      <View style={styles.compactContainer}>
        <View style={styles.compactLevel}>
          <Zap size={14} color={colors.accent} fill={colors.accent} />
          <Text style={styles.compactLevelText}>Lvl {currentLevel}</Text>
        </View>
        <View style={styles.compactBarContainer}>
          <Animated.View
            style={[
              styles.compactBar,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>
        <Text style={styles.compactXp}>{totalXp} XP</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {showLevel && (
        <View style={styles.levelContainer}>
          <View style={styles.levelBadge}>
            <LinearGradient
              colors={gradients.goldVertical}
              style={styles.levelGradient}
            >
              <Text style={styles.levelNumber}>{currentLevel}</Text>
            </LinearGradient>
          </View>
          <View style={styles.levelInfo}>
            <Text style={styles.levelLabel}>LEVEL</Text>
            <Text style={styles.levelTitle}>{getLevelTitle(currentLevel)}</Text>
          </View>
        </View>
      )}

      <View style={styles.progressSection}>
        <View style={styles.xpInfo}>
          <Star size={14} color={colors.accent} />
          <Text style={styles.xpText}>
            {totalXp} / {levelInfo.xpForNextLevel} XP
          </Text>
        </View>

        <View style={styles.progressBarContainer}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          >
            <LinearGradient
              colors={gradients.goldPrimary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFill}
            />
          </Animated.View>
        </View>

        <Text style={styles.xpRemaining}>
          {levelInfo.xpForNextLevel - totalXp} XP to Level {currentLevel + 1}
        </Text>
      </View>
    </View>
  );
}

function getLevelTitle(level: number): string {
  const titles = [
    'Novice',           // 1
    'Apprentice',       // 2
    'Student',          // 3
    'Scholar',          // 4
    'Adept',            // 5
    'Expert',           // 6
    'Master',           // 7
    'Grandmaster',      // 8
    'Legend',           // 9
    'Mastermind',       // 10+
  ];

  return titles[Math.min(level - 1, titles.length - 1)];
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  levelBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
  },
  levelGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelNumber: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.background,
  },
  levelInfo: {
    gap: 2,
  },
  levelLabel: {
    fontSize: typography.xs,
    fontWeight: typography.bold,
    color: colors.tertiary,
    letterSpacing: 1,
  },
  levelTitle: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  progressSection: {
    gap: spacing.xs,
  },
  xpInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  xpText: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.accent,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: colors.surfaceElevated,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
    overflow: 'hidden',
  },
  xpRemaining: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
  // Compact styles
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.full,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  compactLevel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  compactLevelText: {
    fontSize: typography.xs,
    fontWeight: typography.bold,
    color: colors.accent,
  },
  compactBarContainer: {
    flex: 1,
    height: 4,
    backgroundColor: colors.surfaceElevated,
    borderRadius: 2,
    overflow: 'hidden',
  },
  compactBar: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 2,
  },
  compactXp: {
    fontSize: typography.xs,
    color: colors.secondary,
  },
});
