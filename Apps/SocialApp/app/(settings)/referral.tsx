import { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { logger } from '../../lib/logger';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  Gift,
  Copy,
  Share2,
  Users,
  Crown,
  Check,
  Sparkles,
  Clock,
} from 'lucide-react-native';
import { Card } from '../../components/ui/Card';
import { GradientButton } from '../../components/ui/GradientButton';
import { haptics } from '../../lib/haptics';
import { colors, spacing, typography, borderRadius, gradients, shadows } from '../../lib/theme';
import { TIMINGS } from '../../lib/constants';
import { useAuthStore } from '../../stores/authStore';
import { referralService } from '../../services/referralService';
import * as Clipboard from 'expo-clipboard';

export default function ReferralScreen() {
  const { user } = useAuthStore();
  const [referralCode, setReferralCode] = useState('');
  const [totalReferrals, setTotalReferrals] = useState(0);
  const [rewardDaysRemaining, setRewardDaysRemaining] = useState(0);
  const [isRewardActive, setIsRewardActive] = useState(false);
  const [copied, setCopied] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [applyCode, setApplyCode] = useState('');
  const [applyError, setApplyError] = useState('');
  const [applySuccess, setApplySuccess] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  const loadReferralData = useCallback(async () => {
    if (!user?.id) return;

    try {
      // Register code and get stats
      await referralService.registerReferralCode(user.id);
      const stats = await referralService.getReferralStats(user.id);

      setReferralCode(stats.code);
      setTotalReferrals(stats.totalReferrals);
      setRewardDaysRemaining(stats.rewardDaysRemaining);
      setIsRewardActive(stats.isRewardActive);
    } catch (error) {
      logger.error('Error loading referral data:', error);
    }
  }, [user?.id]);

  useEffect(() => {
    void loadReferralData();
  }, [loadReferralData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadReferralData();
    setRefreshing(false);
  }, [loadReferralData]);

  const handleCopyCode = async () => {
    haptics.light();
    await Clipboard.setStringAsync(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), TIMINGS.copiedFeedbackDuration);
  };

  const handleShare = async () => {
    haptics.medium();
    await referralService.shareReferralCode(referralCode);
  };

  const handleApplyCode = async () => {
    if (!applyCode.trim() || !user?.id) return;

    setIsApplying(true);
    setApplyError('');

    const result = await referralService.applyReferralCode(user.id, applyCode.trim());

    if (result.success) {
      haptics.success();
      setApplySuccess(true);
      setApplyCode('');
      await loadReferralData(); // Refresh stats
    } else {
      haptics.error();
      setApplyError(result.error || 'Failed to apply code');
    }

    setIsApplying(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => {
            haptics.light();
            router.replace('/(tabs)/profile');
          }}
        >
          <ArrowLeft size={24} color={colors.primary} strokeWidth={2} />
        </Pressable>
        <Text style={styles.title}>Refer & Earn</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.accent}
            colors={[colors.accent]}
          />
        }
      >
        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <LinearGradient
            colors={['rgba(201, 169, 97, 0.2)', 'rgba(201, 169, 97, 0.05)']}
            style={StyleSheet.absoluteFill}
          />
          <View style={[styles.heroIconContainer, shadows.glowIntense]}>
            <LinearGradient colors={gradients.goldVertical} style={styles.heroIconGradient}>
              <Gift size={32} color={colors.background} strokeWidth={2} />
            </LinearGradient>
          </View>
          <Text style={styles.heroTitle}>Give 7 Days, Get 7 Days</Text>
          <Text style={styles.heroSubtitle}>
            Share your code with friends. When they sign up, you both get 7 days of Premium free!
          </Text>
        </View>

        {/* Referral Code Card */}
        <Card variant="glassGold" glow style={styles.codeCard}>
          <Text style={styles.codeLabel}>Your Referral Code</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>{referralCode}</Text>
            <Pressable
              style={styles.copyButton}
              onPress={handleCopyCode}
            >
              {copied ? (
                <Check size={20} color={colors.success} strokeWidth={2} />
              ) : (
                <Copy size={20} color={colors.accent} strokeWidth={2} />
              )}
            </Pressable>
          </View>

          <GradientButton
            title="Share Your Code"
            onPress={handleShare}
            icon={<Share2 size={18} color={colors.background} strokeWidth={2} />}
            fullWidth
            glow
          />
        </Card>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <Card style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Users size={20} color={colors.accent} strokeWidth={2} />
            </View>
            <Text style={styles.statValue}>{totalReferrals}</Text>
            <Text style={styles.statLabel}>Referrals</Text>
          </Card>

          <Card style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Crown size={20} color={colors.accent} strokeWidth={2} />
            </View>
            <Text style={styles.statValue}>{totalReferrals * 7}</Text>
            <Text style={styles.statLabel}>Days Earned</Text>
          </Card>
        </View>

        {/* Active Reward Banner */}
        {isRewardActive && (
          <Card style={styles.rewardCard}>
            <LinearGradient
              colors={['rgba(76, 175, 80, 0.15)', 'rgba(76, 175, 80, 0.05)']}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.rewardHeader}>
              <Clock size={18} color={colors.success} strokeWidth={2} />
              <Text style={styles.rewardTitle}>Premium Active</Text>
            </View>
            <Text style={styles.rewardDays}>
              {rewardDaysRemaining} {rewardDaysRemaining === 1 ? 'day' : 'days'} remaining
            </Text>
            <Text style={styles.rewardSubtext}>
              From referral rewards
            </Text>
          </Card>
        )}

        {/* Have a Code Section */}
        <View style={styles.applySection}>
          <Text style={styles.applySectionTitle}>Have a friend's code?</Text>
          <Text style={styles.applySectionSubtitle}>
            Enter it below to get 7 days of Premium free
          </Text>

          {applySuccess ? (
            <Card style={styles.successCard}>
              <Check size={24} color={colors.success} strokeWidth={2} />
              <Text style={styles.successText}>
                Code applied! Enjoy 7 days of Premium
              </Text>
            </Card>
          ) : (
            <>
              <View style={styles.applyInputContainer}>
                <TextInput
                  style={styles.applyInput}
                  placeholder="Enter referral code"
                  placeholderTextColor={colors.tertiary}
                  value={applyCode}
                  onChangeText={setApplyCode}
                  autoCapitalize="characters"
                  maxLength={12}
                />
                <Pressable
                  style={[
                    styles.applyButton,
                    (!applyCode.trim() || isApplying) && styles.applyButtonDisabled
                  ]}
                  onPress={handleApplyCode}
                  disabled={!applyCode.trim() || isApplying}
                >
                  <Text style={styles.applyButtonText}>
                    {isApplying ? 'Applying...' : 'Apply'}
                  </Text>
                </Pressable>
              </View>
              {applyError ? (
                <Text style={styles.errorText}>{applyError}</Text>
              ) : null}
            </>
          )}
        </View>

        {/* How It Works */}
        <View style={styles.howItWorks}>
          <Text style={styles.sectionTitle}>How It Works</Text>

          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Share Your Code</Text>
              <Text style={styles.stepDescription}>
                Send your unique code to friends via text, social media, or email
              </Text>
            </View>
          </View>

          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>They Sign Up</Text>
              <Text style={styles.stepDescription}>
                Your friend downloads the app and enters your code during signup
              </Text>
            </View>
          </View>

          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Both Get Rewarded</Text>
              <Text style={styles.stepDescription}>
                You both receive 7 days of Premium access instantly
              </Text>
            </View>
          </View>
        </View>

        {/* Benefits Preview */}
        <Card style={styles.benefitsCard}>
          <View style={styles.benefitsHeader}>
            <Sparkles size={18} color={colors.accent} strokeWidth={2} />
            <Text style={styles.benefitsTitle}>Premium Benefits</Text>
          </View>
          <View style={styles.benefitsList}>
            <Text style={styles.benefitItem}>• All premium quizzes unlocked</Text>
            <Text style={styles.benefitItem}>• Complete psychological profile</Text>
            <Text style={styles.benefitItem}>• Full community access</Text>
            <Text style={styles.benefitItem}>• All courses available</Text>
            <Text style={styles.benefitItem}>• Percentile rankings</Text>
          </View>
        </Card>
      </ScrollView>
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
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
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
  heroBanner: {
    alignItems: 'center',
    padding: spacing.xl,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.accent + '30',
    overflow: 'hidden',
    gap: spacing.md,
  },
  heroIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
  },
  heroIconGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTitle: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: typography.md,
    color: colors.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  codeCard: {
    gap: spacing.md,
    alignItems: 'center',
  },
  codeLabel: {
    fontSize: typography.sm,
    color: colors.tertiary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.background,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: colors.accent,
    borderStyle: 'dashed',
  },
  codeText: {
    fontSize: typography.xxl,
    fontWeight: typography.bold,
    color: colors.accent,
    letterSpacing: 2,
  },
  copyButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xs,
    padding: spacing.md,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontSize: typography.xxl,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  statLabel: {
    fontSize: typography.sm,
    color: colors.tertiary,
  },
  rewardCard: {
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.success + '30',
    overflow: 'hidden',
    gap: spacing.xs,
  },
  rewardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  rewardTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.success,
  },
  rewardDays: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  rewardSubtext: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  applySection: {
    gap: spacing.sm,
  },
  applySectionTitle: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  applySectionSubtitle: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  applyInputContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  applyInput: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: typography.md,
    color: colors.primary,
    borderWidth: 1,
    borderColor: colors.border,
  },
  applyButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonDisabled: {
    opacity: 0.5,
  },
  applyButtonText: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.background,
  },
  errorText: {
    fontSize: typography.sm,
    color: colors.error,
  },
  successCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.success + '15',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.success + '30',
  },
  successText: {
    flex: 1,
    fontSize: typography.md,
    color: colors.success,
    fontWeight: typography.medium,
  },
  howItWorks: {
    gap: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  step: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    fontSize: typography.sm,
    fontWeight: typography.bold,
    color: colors.background,
  },
  stepContent: {
    flex: 1,
    gap: spacing.xs,
  },
  stepTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  stepDescription: {
    fontSize: typography.sm,
    color: colors.secondary,
    lineHeight: 18,
  },
  benefitsCard: {
    gap: spacing.md,
  },
  benefitsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  benefitsTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.accent,
  },
  benefitsList: {
    gap: spacing.xs,
  },
  benefitItem: {
    fontSize: typography.sm,
    color: colors.secondary,
    lineHeight: 20,
  },
});
