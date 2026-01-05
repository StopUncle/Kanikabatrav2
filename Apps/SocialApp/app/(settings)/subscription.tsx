import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { Check, Crown, Zap, Sparkles, AlertCircle, Clock, Gift } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GradientButton } from '../../components/ui/GradientButton';
import { Card } from '../../components/ui/Card';
import { SettingsHeader } from '../../components/ui/SettingsHeader';
import { haptics } from '../../lib/haptics';
import { colors, spacing, typography, borderRadius } from '../../lib/theme';
import { useAuthStore } from '../../stores/authStore';
import { paymentService } from '../../services/paymentService';
import { trialService, TrialState } from '../../services/trialService';
import { analytics } from '../../services/analyticsService';
import { BookPurchaseCard } from '../../components/book/BookPurchaseCard';

type PlanType = 'free' | 'premium' | 'vip';
type BillingPeriod = 'monthly' | 'annual';

interface PlanPricing {
  monthly: { price: string; priceValue: number };
  annual: { price: string; priceValue: number; savings: string };
}

interface Plan {
  id: PlanType;
  name: string;
  tagline: string;
  pricing: PlanPricing;
  features: string[];
  icon: React.ReactNode;
  popular?: boolean;
}

const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    tagline: 'Take the test. See what you\'re made of.',
    pricing: {
      monthly: { price: '$0', priceValue: 0 },
      annual: { price: '$0', priceValue: 0, savings: '' },
    },
    icon: <Sparkles size={24} color={colors.tertiary} strokeWidth={2} />,
    features: [
      'Dark Triad Assessment',
      'Manipulation IQ Test',
      'Dark Psychology 101 course',
      'Community access (read-only)',
      'Basic gamification',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    tagline: 'Know thyself. Know thy enemy.',
    pricing: {
      monthly: { price: '$19.99', priceValue: 19.99 },
      annual: { price: '$149.99', priceValue: 149.99, savings: 'Save 4 months' },
    },
    icon: <Crown size={24} color={colors.accent} strokeWidth={2} />,
    popular: true,
    features: [
      'All free quizzes + premium quizzes',
      'Complete psychological profile',
      'Percentile rankings vs. all users',
      'All courses unlocked',
      'Book-powered insights',
      'Full community access & DMs',
      'Weekly live Q&A sessions',
    ],
  },
  {
    id: 'vip',
    name: 'VIP',
    tagline: 'Learn from a master. Become one.',
    pricing: {
      monthly: { price: '$49.99', priceValue: 49.99 },
      annual: { price: '$399.99', priceValue: 399.99, savings: 'Save 2 months' },
    },
    icon: <Zap size={24} color={colors.accentLight} strokeWidth={2} />,
    features: [
      'Everything in Premium',
      'Direct access to Kanika',
      'VIP-only courses',
      'Monthly 1:1 coaching session',
      'Priority response',
      'Early access to new content',
      'Private VIP community',
    ],
  },
];

export default function SubscriptionScreen() {
  const { user, refreshProfile } = useAuthStore();
  const currentPlan: PlanType = (user?.subscription_tier as PlanType) || 'free';
  const subscriptionStatus = user?.subscription_status;

  const [selectedPlan, setSelectedPlan] = useState<PlanType>(
    currentPlan === 'vip' ? 'vip' : 'premium'
  );
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('annual');
  const [isLoading, setIsLoading] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [trialState, setTrialState] = useState<TrialState | null>(null);
  const [canStartTrial, setCanStartTrial] = useState(false);

  // Load trial state
  useEffect(() => {
    const loadTrialState = async () => {
      if (user?.id) {
        const state = await trialService.getTrialData(user.id);
        setTrialState(state);
        const canTrial = await trialService.canStartTrial(user.id);
        setCanStartTrial(canTrial);
      }
    };
    void loadTrialState();
  }, [user?.id]);

  // Track subscription page view
  useEffect(() => {
    analytics.trackSubscriptionViewed(currentPlan);
  }, [currentPlan]);

  const handleStartTrial = async () => {
    if (!user?.id) return;

    setIsLoading(true);
    haptics.medium();
    analytics.trackUpgradeClicked('subscription_screen', 'premium_trial');

    try {
      const state = await trialService.startTrial(user.id, 'premium');
      setTrialState(state);
      setCanStartTrial(false);
      analytics.trackSubscriptionStarted('premium', true);
      haptics.success();
      Alert.alert(
        'Trial Started!',
        'Enjoy 7 days of Premium access. All features are now unlocked!',
      );
      await refreshProfile();
    } catch (error) {
      haptics.error();
      Alert.alert('Error', 'Failed to start trial. Please try again.');
    }

    setIsLoading(false);
  };

  const handleSubscribe = async () => {
    if (selectedPlan === currentPlan || selectedPlan === 'free') return;

    setIsLoading(true);
    haptics.medium();
    analytics.trackUpgradeClicked('subscription_screen', selectedPlan);

    // Simulate API call (replace with actual PayPal integration)
    await new Promise(resolve => setTimeout(resolve, 1500));

    analytics.trackSubscriptionStarted(selectedPlan, false);
    haptics.success();
    setIsLoading(false);
    Alert.alert(
      'Success!',
      `You're now subscribed to ${plans.find(p => p.id === selectedPlan)?.name}!`,
    );
  };

  const handleCancelSubscription = () => {
    haptics.warning();
    Alert.alert(
      'Cancel Subscription',
      'Are you sure you want to cancel your subscription? You will continue to have access until the end of your billing period.',
      [
        { text: 'Keep Subscription', style: 'cancel' },
        {
          text: 'Cancel Subscription',
          style: 'destructive',
          onPress: () => void confirmCancellation(),
        },
      ]
    );
  };

  const confirmCancellation = async () => {
    if (!user) return;

    setIsCancelling(true);
    haptics.warning();

    try {
      const result = await paymentService.cancelSubscription(user.id);

      if (result.success) {
        haptics.success();
        await refreshProfile();
        Alert.alert(
          'Subscription Cancelled',
          'Your subscription has been cancelled. You will have access until the end of your current billing period.',
          [{ text: 'OK' }]
        );
      } else {
        haptics.error();
        Alert.alert('Error', result.error || 'Failed to cancel subscription. Please try again.');
      }
    } catch (error) {
      haptics.error();
      Alert.alert('Error', 'Failed to cancel subscription. Please try again.');
    } finally {
      setIsCancelling(false);
    }
  };

  const getDisplayPrice = (plan: Plan) => {
    return billingPeriod === 'annual' ? plan.pricing.annual : plan.pricing.monthly;
  };

  return (
    <View style={styles.container}>
      <SettingsHeader title="Subscription" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Trial Banner */}
        {canStartTrial && currentPlan === 'free' && (
          <Card style={styles.trialBanner}>
            <LinearGradient
              colors={['rgba(201, 169, 97, 0.15)', 'rgba(201, 169, 97, 0.05)']}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.trialIconContainer}>
              <Gift size={24} color={colors.accent} strokeWidth={2} />
            </View>
            <View style={styles.trialContent}>
              <Text style={styles.trialTitle}>Try Premium Free for 7 Days</Text>
              <Text style={styles.trialDescription}>
                Unlock all quizzes, courses, and your complete psychological profile
              </Text>
            </View>
            <GradientButton
              title="Start Free Trial"
              onPress={handleStartTrial}
              loading={isLoading}
              glow
            />
          </Card>
        )}

        {/* Active Trial Banner */}
        {trialState?.isActive && (
          <Card style={styles.activeTrialBanner}>
            <View style={styles.trialActiveHeader}>
              <Clock size={20} color={colors.accent} strokeWidth={2} />
              <Text style={styles.trialActiveTitle}>Premium Trial Active</Text>
            </View>
            <Text style={styles.trialActiveText}>
              {trialService.formatTrialExpiration(trialState.expiresAt!)} - Subscribe now to keep your access
            </Text>
          </Card>
        )}

        {/* Billing Period Toggle */}
        <View style={styles.billingToggle}>
          <Pressable
            style={[
              styles.billingOption,
              billingPeriod === 'monthly' && styles.billingOptionActive,
            ]}
            onPress={() => {
              haptics.selection();
              setBillingPeriod('monthly');
            }}
          >
            <Text
              style={[
                styles.billingOptionText,
                billingPeriod === 'monthly' && styles.billingOptionTextActive,
              ]}
            >
              Monthly
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.billingOption,
              billingPeriod === 'annual' && styles.billingOptionActive,
            ]}
            onPress={() => {
              haptics.selection();
              setBillingPeriod('annual');
            }}
          >
            <Text
              style={[
                styles.billingOptionText,
                billingPeriod === 'annual' && styles.billingOptionTextActive,
              ]}
            >
              Annual
            </Text>
            <View style={styles.savingsBadge}>
              <Text style={styles.savingsText}>Best Value</Text>
            </View>
          </Pressable>
        </View>

        {/* Plans */}
        {plans.map((plan) => {
          const pricing = getDisplayPrice(plan);
          return (
            <Pressable
              key={plan.id}
              onPress={() => {
                haptics.selection();
                setSelectedPlan(plan.id);
              }}
            >
              <Card
                style={StyleSheet.flatten([
                  styles.planCard,
                  selectedPlan === plan.id && styles.planCardSelected,
                  plan.popular && styles.planCardPopular,
                ])}
              >
                {plan.popular && (
                  <View style={styles.popularBadge}>
                    <Text style={styles.popularText}>Most Popular</Text>
                  </View>
                )}

                <View style={styles.planHeader}>
                  <View style={styles.planIconContainer}>
                    {plan.icon}
                  </View>
                  <View style={styles.planInfo}>
                    <Text style={styles.planName}>{plan.name}</Text>
                    <Text style={styles.planTagline}>{plan.tagline}</Text>
                  </View>
                  <View style={styles.planPricing}>
                    <Text style={styles.planPrice}>{pricing.price}</Text>
                    {plan.id !== 'free' && (
                      <Text style={styles.planPeriod}>
                        /{billingPeriod === 'annual' ? 'year' : 'month'}
                      </Text>
                    )}
                    {billingPeriod === 'annual' && plan.pricing.annual.savings && (
                      <Text style={styles.planSavings}>{plan.pricing.annual.savings}</Text>
                    )}
                  </View>
                </View>

                <View style={styles.featuresContainer}>
                  {plan.features.map((feature, index) => (
                    <View key={index} style={styles.featureRow}>
                      <Check
                        size={16}
                        color={selectedPlan === plan.id ? colors.accent : colors.tertiary}
                        strokeWidth={2.5}
                      />
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>

                {currentPlan === plan.id && (
                  <View style={styles.currentBadge}>
                    <Text style={styles.currentText}>Current Plan</Text>
                  </View>
                )}
              </Card>
            </Pressable>
          );
        })}

        {/* Subscribe Button */}
        {selectedPlan !== 'free' && (
          <GradientButton
            title={
              currentPlan === selectedPlan
                ? 'Current Plan'
                : `Subscribe to ${plans.find(p => p.id === selectedPlan)?.name}`
            }
            onPress={handleSubscribe}
            disabled={currentPlan === selectedPlan}
            loading={isLoading}
            fullWidth
            glow={currentPlan !== selectedPlan}
          />
        )}

        {/* Book Purchase Section */}
        <View style={styles.bookSection}>
          <Text style={styles.sectionLabel}>COMPLETE YOUR LIBRARY</Text>
          <BookPurchaseCard
            contextMessage="Get the complete source material behind all our courses"
          />
        </View>

        {/* Cancel Subscription Section */}
        {currentPlan !== 'free' && subscriptionStatus === 'active' && (
          <Card style={styles.cancelCard}>
            <View style={styles.cancelHeader}>
              <AlertCircle size={20} color={colors.tertiary} />
              <Text style={styles.cancelTitle}>Manage Subscription</Text>
            </View>
            <Text style={styles.cancelDescription}>
              Your {currentPlan === 'vip' ? 'VIP' : 'Premium'} subscription is active.
              Cancel anytime to stop future charges.
            </Text>
            <Pressable
              style={styles.cancelButton}
              onPress={handleCancelSubscription}
              disabled={isCancelling}
            >
              <Text style={styles.cancelButtonText}>
                {isCancelling ? 'Cancelling...' : 'Cancel Subscription'}
              </Text>
            </Pressable>
          </Card>
        )}

        {/* Cancelled Status */}
        {subscriptionStatus === 'cancelled' && (
          <Card style={styles.cancelledCard}>
            <View style={styles.cancelHeader}>
              <AlertCircle size={20} color={colors.warning} />
              <Text style={styles.cancelledTitle}>Subscription Cancelled</Text>
            </View>
            <Text style={styles.cancelDescription}>
              Your subscription has been cancelled. You'll have access to {currentPlan === 'vip' ? 'VIP' : 'Premium'} features until the end of your billing period.
            </Text>
          </Card>
        )}

        <Text style={styles.disclaimer}>
          Cancel anytime. 30-day money-back guarantee.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    gap: spacing.md,
  },
  // Trial Banner
  trialBanner: {
    gap: spacing.md,
    borderColor: colors.accent,
    borderWidth: 1,
    overflow: 'hidden',
  },
  trialIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trialContent: {
    gap: spacing.xs,
  },
  trialTitle: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.accent,
  },
  trialDescription: {
    fontSize: typography.sm,
    color: colors.secondary,
    lineHeight: 20,
  },
  activeTrialBanner: {
    backgroundColor: colors.accentMuted,
    borderColor: colors.accent,
    borderWidth: 1,
    gap: spacing.sm,
  },
  trialActiveHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  trialActiveTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.accent,
  },
  trialActiveText: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  // Billing Toggle
  billingToggle: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.full,
    padding: 4,
  },
  billingOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  billingOptionActive: {
    backgroundColor: colors.accent,
  },
  billingOptionText: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.secondary,
  },
  billingOptionTextActive: {
    color: colors.background,
  },
  savingsBadge: {
    backgroundColor: colors.success,
    paddingVertical: 2,
    paddingHorizontal: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  savingsText: {
    fontSize: 9,
    fontWeight: typography.bold,
    color: colors.background,
  },
  // Plan Cards
  planCard: {
    gap: spacing.md,
    position: 'relative',
    overflow: 'visible',
  },
  planCardSelected: {
    borderColor: colors.accent,
    borderWidth: 2,
  },
  planCardPopular: {
    marginTop: spacing.md,
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    alignSelf: 'center',
    backgroundColor: colors.accent,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
  },
  popularText: {
    fontSize: typography.xs,
    fontWeight: typography.bold,
    color: colors.background,
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  planIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  planInfo: {
    flex: 1,
    gap: 2,
  },
  planName: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  planTagline: {
    fontSize: typography.xs,
    color: colors.secondary,
    fontStyle: 'italic',
  },
  planPricing: {
    alignItems: 'flex-end',
  },
  planPrice: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  planPeriod: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
  planSavings: {
    fontSize: typography.xs,
    fontWeight: typography.medium,
    color: colors.success,
    marginTop: 2,
  },
  featuresContainer: {
    gap: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  featureText: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  currentBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accentMuted,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  currentText: {
    fontSize: typography.xs,
    fontWeight: typography.medium,
    color: colors.accent,
  },
  disclaimer: {
    fontSize: typography.xs,
    color: colors.tertiary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  // Cancel subscription styles
  cancelCard: {
    marginTop: spacing.md,
    borderColor: colors.border,
    borderWidth: 1,
  },
  cancelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  cancelTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  cancelDescription: {
    fontSize: typography.sm,
    color: colors.secondary,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  cancelButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceElevated,
    alignSelf: 'flex-start',
  },
  cancelButtonText: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.error,
  },
  cancelledCard: {
    marginTop: spacing.md,
    borderColor: colors.warning,
    borderWidth: 1,
    backgroundColor: colors.warning + '10',
  },
  cancelledTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.warning,
  },
  // Book section styles
  bookSection: {
    marginTop: spacing.xl,
    gap: spacing.md,
  },
  sectionLabel: {
    fontSize: typography.xs,
    fontWeight: typography.bold,
    color: colors.accent,
    letterSpacing: 1,
  },
});
