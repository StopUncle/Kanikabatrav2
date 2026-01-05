import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import {
  Crown,
  Clock,
  Sparkles,
  Lock,
  ChevronRight,
  Gift,
  Target,
  Users,
} from 'lucide-react-native';
import { GradientButton } from '../ui/GradientButton';
import { haptics } from '../../lib/haptics';
import { colors, spacing, typography, borderRadius, shadows, gradients } from '../../lib/theme';
import { trialService } from '../../services/trialService';
import { useAuthStore } from '../../stores/authStore';

type PromptVariant =
  | 'trial'           // Start free trial
  | 'trial-active'    // Show trial status
  | 'profile'         // Complete your profile
  | 'premium-quiz'    // Unlock premium quizzes
  | 'community'       // Join the community
  | 'compact';        // Minimal upgrade CTA

interface UpgradePromptCardProps {
  variant: PromptVariant;
  onAction?: () => void;
  profileCompletion?: number;
  customTitle?: string;
  customSubtitle?: string;
}

export function UpgradePromptCard({
  variant,
  onAction,
  profileCompletion = 0,
  customTitle,
  customSubtitle,
}: UpgradePromptCardProps) {
  const { user } = useAuthStore();
  const [canStartTrial, setCanStartTrial] = useState(false);
  const [trialDaysRemaining, setTrialDaysRemaining] = useState(0);
  const [isTrialActive, setIsTrialActive] = useState(false);

  // Animated pulse for trial variant
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const checkTrialStatus = async () => {
      if (!user?.id) return;

      const canStart = await trialService.canStartTrial(user.id);
      setCanStartTrial(canStart);

      const hasActive = await trialService.hasActiveTrial(user.id);
      setIsTrialActive(hasActive);

      if (hasActive) {
        const days = await trialService.getDaysRemaining(user.id);
        setTrialDaysRemaining(days);
      }
    };

    checkTrialStatus();
  }, [user?.id]);

  useEffect(() => {
    if (variant === 'trial' && canStartTrial) {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.02, duration: 1500, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 1500, useNativeDriver: true }),
        ])
      );
      animation.start();
      return () => animation.stop();
    }
  }, [variant, canStartTrial, pulseAnim]);

  const handlePress = () => {
    haptics.medium();
    if (onAction) {
      onAction();
    } else {
      router.push('/(settings)/subscription');
    }
  };

  const handleStartTrial = async () => {
    haptics.success();
    if (user?.id) {
      await trialService.startTrial(user.id, 'premium');
      router.push('/(settings)/subscription');
    }
  };

  // Don't show trial prompts if already subscribed
  if (user?.subscription_tier !== 'free' && (variant === 'trial' || variant === 'trial-active')) {
    return null;
  }

  // Trial variant - show if user can start trial
  if (variant === 'trial') {
    if (!canStartTrial) return null;

    return (
      <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
        <Pressable onPress={handleStartTrial}>
          <LinearGradient
            colors={['rgba(201, 169, 97, 0.2)', 'rgba(201, 169, 97, 0.08)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.trialCard, shadows.glow]}
          >
            <View style={styles.trialIconContainer}>
              <LinearGradient colors={gradients.goldVertical} style={styles.trialIconGradient}>
                <Gift size={24} color={colors.background} strokeWidth={2} />
              </LinearGradient>
            </View>

            <View style={styles.trialContent}>
              <View style={styles.trialHeader}>
                <Text style={styles.trialTitle}>
                  {customTitle || 'Try Premium Free'}
                </Text>
                <View style={styles.trialBadge}>
                  <Text style={styles.trialBadgeText}>7 DAYS</Text>
                </View>
              </View>
              <Text style={styles.trialSubtitle}>
                {customSubtitle || 'Unlock all quizzes, courses & community access'}
              </Text>
            </View>

            <ChevronRight size={20} color={colors.accent} strokeWidth={2} />
          </LinearGradient>
        </Pressable>
      </Animated.View>
    );
  }

  // Trial active variant
  if (variant === 'trial-active') {
    if (!isTrialActive) return null;

    return (
      <View style={styles.trialActiveCard}>
        <LinearGradient
          colors={['rgba(76, 175, 80, 0.15)', 'rgba(76, 175, 80, 0.05)']}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.trialActiveIcon}>
          <Clock size={18} color={colors.success} strokeWidth={2} />
        </View>
        <View style={styles.trialActiveContent}>
          <Text style={styles.trialActiveTitle}>Premium Trial Active</Text>
          <Text style={styles.trialActiveSubtitle}>
            {trialDaysRemaining} {trialDaysRemaining === 1 ? 'day' : 'days'} remaining
          </Text>
        </View>
        <Pressable
          style={styles.trialActiveButton}
          onPress={handlePress}
        >
          <Text style={styles.trialActiveButtonText}>Upgrade</Text>
        </Pressable>
      </View>
    );
  }

  // Profile completion variant
  if (variant === 'profile') {
    const remaining = 100 - profileCompletion;

    return (
      <Pressable onPress={handlePress}>
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.profileIconContainer}>
              <Target size={18} color={colors.accent} strokeWidth={2} />
            </View>
            <View style={styles.profileContent}>
              <Text style={styles.profileTitle}>
                {customTitle || 'Complete Your Profile'}
              </Text>
              <Text style={styles.profileSubtitle}>
                {customSubtitle || `Take ${remaining > 50 ? 'more quizzes' : 'the remaining quizzes'} to unlock your full psychological profile`}
              </Text>
            </View>
          </View>

          <View style={styles.profileProgressContainer}>
            <View style={styles.profileProgressBar}>
              <LinearGradient
                colors={gradients.goldPrimary}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.profileProgressFill, { width: `${profileCompletion}%` }]}
              />
            </View>
            <Text style={styles.profileProgressText}>{profileCompletion}%</Text>
          </View>

          {profileCompletion < 50 && user?.subscription_tier === 'free' && (
            <View style={styles.profileUpgradeHint}>
              <Lock size={12} color={colors.accent} strokeWidth={2} />
              <Text style={styles.profileUpgradeText}>
                Upgrade to unlock premium quizzes
              </Text>
            </View>
          )}
        </View>
      </Pressable>
    );
  }

  // Premium quiz unlock variant
  if (variant === 'premium-quiz') {
    return (
      <Pressable onPress={handlePress}>
        <View style={[styles.premiumQuizCard, shadows.glow]}>
          <LinearGradient
            colors={['rgba(201, 169, 97, 0.12)', 'rgba(201, 169, 97, 0.04)']}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.premiumQuizIcon}>
            <Crown size={20} color={colors.accent} strokeWidth={2} />
          </View>
          <View style={styles.premiumQuizContent}>
            <Text style={styles.premiumQuizTitle}>
              {customTitle || 'Unlock All Quizzes'}
            </Text>
            <Text style={styles.premiumQuizSubtitle}>
              {customSubtitle || 'Get complete access with Premium'}
            </Text>
          </View>
          <GradientButton
            title="Upgrade"
            onPress={handlePress}
            size="sm"
          />
        </View>
      </Pressable>
    );
  }

  // Community variant
  if (variant === 'community') {
    return (
      <Pressable onPress={handlePress}>
        <View style={styles.communityCard}>
          <LinearGradient
            colors={['rgba(201, 169, 97, 0.15)', 'rgba(10, 10, 10, 0.95)']}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.communityLockOverlay}>
            <Lock size={24} color={colors.accent} strokeWidth={2} />
          </View>
          <View style={styles.communityContent}>
            <Users size={18} color={colors.secondary} strokeWidth={2} />
            <Text style={styles.communityTitle}>
              {customTitle || 'Join the Discussion'}
            </Text>
            <Text style={styles.communitySubtitle}>
              {customSubtitle || 'Upgrade to send messages and connect with members'}
            </Text>
          </View>
          <GradientButton
            title="Unlock Community"
            onPress={handlePress}
            size="sm"
            glow
          />
        </View>
      </Pressable>
    );
  }

  // Compact variant
  if (variant === 'compact') {
    return (
      <Pressable onPress={handlePress} style={styles.compactCard}>
        <Sparkles size={16} color={colors.accent} strokeWidth={2} />
        <Text style={styles.compactText}>
          {customTitle || 'Upgrade to Premium'}
        </Text>
        <ChevronRight size={16} color={colors.accent} strokeWidth={2} />
      </Pressable>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  // Trial variant styles
  trialCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  trialIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
  },
  trialIconGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trialContent: {
    flex: 1,
    gap: spacing.xs,
  },
  trialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  trialTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.accent,
  },
  trialBadge: {
    backgroundColor: colors.success,
    paddingVertical: 2,
    paddingHorizontal: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  trialBadgeText: {
    fontSize: 9,
    fontWeight: typography.bold,
    color: colors.background,
    letterSpacing: 0.5,
  },
  trialSubtitle: {
    fontSize: typography.sm,
    color: colors.secondary,
  },

  // Trial active variant styles
  trialActiveCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.success + '30',
    overflow: 'hidden',
  },
  trialActiveIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.success + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trialActiveContent: {
    flex: 1,
  },
  trialActiveTitle: {
    fontSize: typography.sm,
    fontWeight: typography.semibold,
    color: colors.success,
  },
  trialActiveSubtitle: {
    fontSize: typography.xs,
    color: colors.secondary,
  },
  trialActiveButton: {
    backgroundColor: colors.success + '20',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
  },
  trialActiveButtonText: {
    fontSize: typography.sm,
    fontWeight: typography.semibold,
    color: colors.success,
  },

  // Profile variant styles
  profileCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  profileIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContent: {
    flex: 1,
    gap: spacing.xs,
  },
  profileTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  profileSubtitle: {
    fontSize: typography.sm,
    color: colors.secondary,
    lineHeight: 18,
  },
  profileProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  profileProgressBar: {
    flex: 1,
    height: 6,
    backgroundColor: colors.surfaceElevated,
    borderRadius: 3,
    overflow: 'hidden',
  },
  profileProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  profileProgressText: {
    fontSize: typography.sm,
    fontWeight: typography.semibold,
    color: colors.accent,
    minWidth: 36,
    textAlign: 'right',
  },
  profileUpgradeHint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingTop: spacing.xs,
  },
  profileUpgradeText: {
    fontSize: typography.xs,
    color: colors.accent,
  },

  // Premium quiz variant styles
  premiumQuizCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.accent + '40',
    overflow: 'hidden',
  },
  premiumQuizIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  premiumQuizContent: {
    flex: 1,
  },
  premiumQuizTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  premiumQuizSubtitle: {
    fontSize: typography.sm,
    color: colors.secondary,
  },

  // Community variant styles
  communityCard: {
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.accent + '30',
    overflow: 'hidden',
  },
  communityLockOverlay: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  communityContent: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  communityTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  communitySubtitle: {
    fontSize: typography.sm,
    color: colors.secondary,
    textAlign: 'center',
    lineHeight: 18,
  },

  // Compact variant styles
  compactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.accentMuted,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.accent + '40',
  },
  compactText: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.accent,
  },
});
