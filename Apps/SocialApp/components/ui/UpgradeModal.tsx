import { View, Text, StyleSheet, Modal, Pressable } from 'react-native';
import { Crown, X, Check, Sparkles } from 'lucide-react-native';
import { colors, spacing, typography, borderRadius } from '../../lib/theme';
import { haptics } from '../../lib/haptics';
import { router } from 'expo-router';

interface UpgradeModalProps {
  visible: boolean;
  onClose: () => void;
  requiredTier: 'premium' | 'vip';
  featureName?: string;
}

const tierFeatures = {
  premium: [
    'Access all courses',
    'Premium chat rooms',
    'Exclusive quizzes',
    'Priority support',
  ],
  vip: [
    'Everything in Premium',
    'VIP-only content',
    '1-on-1 coaching sessions',
    'Direct message Kanika',
    'Early access to new features',
  ],
};

const tierPricing = {
  premium: { price: 29, period: 'month' },
  vip: { price: 99, period: 'month' },
};

export function UpgradeModal({ visible, onClose, requiredTier, featureName }: UpgradeModalProps) {
  const features = tierFeatures[requiredTier];
  const pricing = tierPricing[requiredTier];

  const handleUpgrade = () => {
    haptics.medium();
    onClose();
    router.push('/(settings)/subscription');
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Close button */}
          <Pressable
            style={styles.closeButton}
            onPress={() => {
              haptics.light();
              onClose();
            }}
            accessibilityLabel="Close"
            accessibilityRole="button"
          >
            <X size={20} color={colors.secondary} />
          </Pressable>

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              {requiredTier === 'vip' ? (
                <Sparkles size={32} color={colors.accent} />
              ) : (
                <Crown size={32} color={colors.accent} />
              )}
            </View>
            <Text style={styles.title}>
              {requiredTier === 'vip' ? 'VIP Access Required' : 'Premium Access Required'}
            </Text>
            {featureName && (
              <Text style={styles.subtitle}>
                Unlock "{featureName}" and more
              </Text>
            )}
          </View>

          {/* Features */}
          <View style={styles.features}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Check size={16} color={colors.accent} strokeWidth={2.5} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>

          {/* Pricing */}
          <View style={styles.pricing}>
            <Text style={styles.priceLabel}>Starting at</Text>
            <View style={styles.priceRow}>
              <Text style={styles.priceCurrency}>$</Text>
              <Text style={styles.priceAmount}>{pricing.price}</Text>
              <Text style={styles.pricePeriod}>/{pricing.period}</Text>
            </View>
          </View>

          {/* CTA */}
          <Pressable
            style={styles.upgradeButton}
            onPress={handleUpgrade}
            accessibilityRole="button"
            accessibilityLabel={`Upgrade to ${requiredTier === 'vip' ? 'VIP' : 'Premium'}`}
          >
            <Crown size={18} color={colors.background} />
            <Text style={styles.upgradeButtonText}>
              Upgrade to {requiredTier === 'vip' ? 'VIP' : 'Premium'}
            </Text>
          </Pressable>

          <Pressable
            style={styles.learnMoreButton}
            onPress={handleUpgrade}
            accessibilityRole="button"
            accessibilityLabel="Compare all plans"
          >
            <Text style={styles.learnMoreText}>Compare all plans</Text>
          </Pressable>
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
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.md,
    color: colors.secondary,
    textAlign: 'center',
  },
  features: {
    width: '100%',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  featureText: {
    fontSize: typography.md,
    color: colors.primary,
    flex: 1,
  },
  pricing: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  priceLabel: {
    fontSize: typography.sm,
    color: colors.tertiary,
    marginBottom: spacing.xs,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  priceCurrency: {
    fontSize: typography.lg,
    color: colors.accent,
    marginTop: 4,
  },
  priceAmount: {
    fontSize: 48,
    fontWeight: typography.bold,
    color: colors.accent,
  },
  pricePeriod: {
    fontSize: typography.md,
    color: colors.secondary,
    alignSelf: 'flex-end',
    marginBottom: 8,
  },
  upgradeButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.accent,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
  },
  upgradeButtonText: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.background,
  },
  learnMoreButton: {
    marginTop: spacing.md,
    padding: spacing.sm,
  },
  learnMoreText: {
    fontSize: typography.sm,
    color: colors.accent,
    fontWeight: typography.medium,
  },
});
