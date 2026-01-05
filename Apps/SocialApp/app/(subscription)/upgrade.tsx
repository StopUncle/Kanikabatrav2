import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { logger } from '../../lib/logger';
import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { usePaymentSheet } from '@stripe/stripe-react-native';
import { X, Check, Crown, Star, Sparkles } from 'lucide-react-native';
import { colors, spacing, typography, borderRadius } from '../../lib/theme';
import { DEEP_LINKS } from '../../lib/constants';
import { haptics } from '../../lib/haptics';
import { paymentService, SUBSCRIPTION_TIERS, SubscriptionTier, PREFERRED_PAYMENT_PROVIDER } from '../../services/paymentService';
import { isStripeConfigured } from '../../services/stripeService';
import { useAuthStore } from '../../stores/authStore';

export default function UpgradeScreen() {
  const { user, refreshProfile } = useAuthStore();
  const currentTier = user?.subscription_tier || 'free';
  const { initPaymentSheet, presentPaymentSheet } = usePaymentSheet();

  const [selectedTier, setSelectedTier] = useState<string>(
    currentTier === 'vip' ? 'vip' : 'premium'
  );
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [loading, setLoading] = useState(false);

  const handleStripeSubscribe = async (tier: SubscriptionTier) => {
    if (!user) {
      Alert.alert('Sign In Required', 'Please sign in to subscribe.');
      return;
    }

    haptics.medium();
    setLoading(true);

    try {
      // Create Stripe subscription
      const isAnnual = billingPeriod === 'annual';
      const result = await paymentService.createStripeSubscription(user.id, tier.id, isAnnual);

      if (!result) {
        throw new Error('Failed to create subscription');
      }

      // Initialize payment sheet
      const { error: initError } = await initPaymentSheet({
        merchantDisplayName: 'The Dark Mirror',
        customerId: result.customerId,
        customerEphemeralKeySecret: result.ephemeralKey,
        paymentIntentClientSecret: result.clientSecret,
        allowsDelayedPaymentMethods: false,
        returnURL: 'darkmirror://subscription/success',
      });

      if (initError) {
        throw new Error(initError.message);
      }

      // Present payment sheet
      const { error: presentError } = await presentPaymentSheet();

      if (presentError) {
        if (presentError.code === 'Canceled') {
          // User cancelled - not an error
          return;
        }
        throw new Error(presentError.message);
      }

      // Payment successful
      await paymentService.handleStripeSubscriptionSuccess(user.id, tier.id, result.subscriptionId);
      await refreshProfile();

      haptics.success();
      Alert.alert(
        'Success!',
        `You're now a ${tier.name} member!`,
        [{ text: 'OK', onPress: () => router.replace('/(tabs)/profile') }]
      );
    } catch (error: unknown) {
      logger.error('Stripe subscription error:', error);
      haptics.error();
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to process subscription. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePayPalSubscribe = async (tier: SubscriptionTier) => {
    if (!user) {
      Alert.alert('Sign In Required', 'Please sign in to subscribe.');
      return;
    }

    haptics.medium();
    setLoading(true);

    try {
      // Create subscription with PayPal
      const result = await paymentService.createSubscription(tier.id, user.id);

      if (result?.approvalUrl) {
        // Open PayPal in browser
        const browserResult = await WebBrowser.openAuthSessionAsync(
          result.approvalUrl,
          DEEP_LINKS.subscriptionSuccess
        );

        if (browserResult.type === 'success') {
          // Payment approved
          await paymentService.updateUserSubscription(user.id, tier.id);
          await refreshProfile();
          Alert.alert(
            'Success!',
            `You're now a ${tier.name} member!`,
            [{ text: 'OK', onPress: () => router.replace('/(tabs)/profile') }]
          );
        }
      } else {
        // Demo mode
        Alert.alert(
          'Demo Mode',
          `In production, you would be redirected to PayPal to subscribe to ${tier.name} for $${tier.price}/month.`,
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      logger.error('Subscription error:', error);
      Alert.alert('Error', 'Failed to process subscription. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (tier: SubscriptionTier) => {
    if (tier.price === 0) {
      router.replace('/(tabs)/profile');
      return;
    }

    // Use Stripe if configured, otherwise fall back to PayPal
    if (isStripeConfigured) {
      await handleStripeSubscribe(tier);
    } else {
      await handlePayPalSubscribe(tier);
    }
  };

  const getTierIcon = (tierId: string) => {
    switch (tierId) {
      case 'vip':
        return <Crown size={24} color={colors.accent} />;
      case 'premium':
        return <Star size={24} color={colors.accent} />;
      default:
        return <Sparkles size={24} color={colors.secondary} />;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={styles.closeBtn}
          onPress={() => {
            haptics.light();
            router.replace('/(tabs)/profile');
          }}
          accessibilityLabel="Close"
          accessibilityRole="button"
        >
          <X size={24} color={colors.primary} />
        </Pressable>
        <Text style={styles.headerTitle}>Upgrade Your Plan</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Unlock Your Full Potential</Text>
          <Text style={styles.heroSubtitle}>
            Get unlimited access to courses, coaching, and exclusive content
          </Text>
        </View>

        {/* Tier Cards */}
        <View style={styles.tierList}>
          {SUBSCRIPTION_TIERS.map((tier) => {
            const isSelected = selectedTier === tier.id;
            const isCurrent = currentTier === tier.id;
            const isPopular = tier.id === 'premium';

            return (
              <Pressable
                key={tier.id}
                style={[
                  styles.tierCard,
                  isSelected && styles.tierCardSelected,
                  isCurrent && styles.tierCardCurrent,
                ]}
                onPress={() => {
                  haptics.light();
                  setSelectedTier(tier.id);
                }}
              >
                {isPopular && (
                  <View style={styles.popularBadge}>
                    <Text style={styles.popularText}>MOST POPULAR</Text>
                  </View>
                )}

                <View style={styles.tierHeader}>
                  <View style={styles.tierIconContainer}>
                    {getTierIcon(tier.id)}
                  </View>
                  <View style={styles.tierInfo}>
                    <Text style={styles.tierName}>{tier.name}</Text>
                    <View style={styles.tierPrice}>
                      <Text style={styles.priceAmount}>
                        ${tier.price}
                      </Text>
                      {tier.price > 0 && (
                        <Text style={styles.priceInterval}>/{tier.interval}</Text>
                      )}
                    </View>
                  </View>
                  <View style={[
                    styles.radioOuter,
                    isSelected && styles.radioOuterSelected,
                  ]}>
                    {isSelected && <View style={styles.radioInner} />}
                  </View>
                </View>

                <View style={styles.featureList}>
                  {tier.features.map((feature, index) => (
                    <View key={index} style={styles.featureItem}>
                      <Check size={16} color={colors.success} />
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>

                {isCurrent && (
                  <View style={styles.currentBadge}>
                    <Text style={styles.currentText}>Current Plan</Text>
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>

        {/* Payment Info */}
        <View style={styles.paymentInfo}>
          <Text style={styles.paymentTitle}>
            {isStripeConfigured ? 'Secure Payment via Stripe' : 'Secure Payment via PayPal'}
          </Text>
          <Text style={styles.paymentText}>
            Cancel anytime. No hidden fees.
          </Text>
        </View>
      </ScrollView>

      {/* Subscribe Button */}
      <View style={styles.footer}>
        <Pressable
          style={[
            styles.subscribeButton,
            loading && styles.subscribeButtonDisabled,
          ]}
          onPress={() => {
            const tier = SUBSCRIPTION_TIERS.find(t => t.id === selectedTier);
            if (tier) void handleSubscribe(tier);
          }}
          disabled={loading || selectedTier === currentTier}
        >
          {loading ? (
            <ActivityIndicator color={colors.background} />
          ) : (
            <Text style={styles.subscribeButtonText}>
              {selectedTier === currentTier
                ? 'Current Plan'
                : selectedTier === 'free'
                ? 'Downgrade to Free'
                : isStripeConfigured
                ? 'Subscribe Now'
                : 'Subscribe with PayPal'}
            </Text>
          )}
        </Pressable>
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
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  closeBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  scroll: {
    flex: 1,
  },
  hero: {
    padding: spacing.lg,
    alignItems: 'center',
    gap: spacing.sm,
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
  tierList: {
    padding: spacing.md,
    gap: spacing.md,
  },
  tierCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: colors.border,
    position: 'relative',
    overflow: 'hidden',
  },
  tierCardSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.accentMuted,
  },
  tierCardCurrent: {
    opacity: 0.7,
  },
  popularBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: colors.accent,
    paddingVertical: 4,
    paddingHorizontal: spacing.sm,
    borderBottomLeftRadius: borderRadius.md,
  },
  popularText: {
    fontSize: 10,
    fontWeight: typography.bold,
    color: colors.background,
  },
  tierHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  tierIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tierInfo: {
    flex: 1,
  },
  tierName: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  tierPrice: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceAmount: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.accent,
  },
  priceInterval: {
    fontSize: typography.sm,
    color: colors.secondary,
    marginLeft: 2,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: colors.accent,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.accent,
  },
  featureList: {
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  featureText: {
    fontSize: typography.sm,
    color: colors.secondary,
    flex: 1,
  },
  currentBadge: {
    position: 'absolute',
    bottom: spacing.md,
    right: spacing.md,
    backgroundColor: colors.surfaceElevated,
    paddingVertical: 4,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  currentText: {
    fontSize: typography.xs,
    color: colors.tertiary,
    fontWeight: typography.medium,
  },
  paymentInfo: {
    padding: spacing.lg,
    alignItems: 'center',
    gap: spacing.xs,
  },
  paymentTitle: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.secondary,
  },
  paymentText: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
  footer: {
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  subscribeButton: {
    backgroundColor: colors.accent,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subscribeButtonDisabled: {
    backgroundColor: colors.tertiary,
  },
  subscribeButtonText: {
    fontSize: typography.md,
    fontWeight: typography.bold,
    color: colors.background,
  },
});
