import { View, Text, StyleSheet, Pressable, Modal, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Crown, X, Check, Sparkles, Lock, Zap } from 'lucide-react-native';
import { Card } from '../ui/Card';
import { GradientButton } from '../ui/GradientButton';
import { haptics } from '../../lib/haptics';
import { colors, spacing, typography, borderRadius, gradients } from '../../lib/theme';
import { QUIZ_PRICE_USD } from '../../services/paymentService';

interface QuizPaywallProps {
  visible: boolean;
  onClose: () => void;
  quizTitle: string;
  quizId: string;
  onPurchase: () => void;
  onSubscribe: () => void;
  isLoading?: boolean;
}

const PREMIUM_FEATURES = [
  'All premium quizzes unlocked',
  'Comprehensive personality insights',
  'Book-powered analysis from Kanika',
  'Overall Dark Psychology Profile',
  'Percentile rankings vs. all users',
  'Monthly live Q&A sessions',
];

const QUIZ_FEATURES = [
  '25-40 deep questions',
  'Detailed trait breakdown',
  '8-12 personalized insights',
  'Book chapter recommendations',
  'Contributes to overall profile',
];

export function QuizPaywall({
  visible,
  onClose,
  quizTitle,
  quizId,
  onPurchase,
  onSubscribe,
  isLoading = false,
}: QuizPaywallProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <LinearGradient
          colors={['rgba(201, 169, 97, 0.1)', 'rgba(10, 10, 10, 1)']}
          style={StyleSheet.absoluteFill}
        />

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <LinearGradient colors={gradients.goldVertical} style={StyleSheet.absoluteFill} />
            <Lock size={24} color={colors.background} strokeWidth={2} />
          </View>
          <Text style={styles.headerTitle}>Premium Quiz</Text>
          <Pressable
            style={styles.closeButton}
            onPress={() => {
              haptics.light();
              onClose();
            }}
            accessibilityLabel="Close"
            accessibilityRole="button"
          >
            <X size={24} color={colors.primary} strokeWidth={2} />
          </Pressable>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Quiz Preview */}
          <Card variant="glassGold" glow style={styles.previewCard}>
            <View style={styles.previewIcon}>
              <Sparkles size={32} color={colors.accent} strokeWidth={1.5} />
            </View>
            <Text style={styles.quizTitle}>{quizTitle}</Text>
            <Text style={styles.previewText}>
              This premium assessment provides comprehensive psychological insights using Kanika's proprietary analysis framework.
            </Text>

            {/* Blurred preview */}
            <View style={styles.blurredPreview}>
              <View style={styles.blurOverlay}>
                <Lock size={20} color={colors.accent} />
                <Text style={styles.blurText}>Unlock to reveal insights</Text>
              </View>
            </View>
          </Card>

          {/* What You Get */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What's Included</Text>
            <View style={styles.featureList}>
              {QUIZ_FEATURES.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <View style={styles.featureCheck}>
                    <Check size={14} color={colors.background} strokeWidth={3} />
                  </View>
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Purchase Options */}
          <View style={styles.optionsContainer}>
            {/* One-time Purchase */}
            <Pressable
              style={({ pressed }) => [
                styles.optionCard,
                pressed && styles.optionCardPressed,
              ]}
              onPress={() => {
                haptics.medium();
                onPurchase();
              }}
              disabled={isLoading}
            >
              <View style={styles.optionHeader}>
                <Text style={styles.optionTitle}>Unlock This Quiz</Text>
                <View style={styles.priceBadge}>
                  <Text style={styles.priceValue}>${QUIZ_PRICE_USD}</Text>
                </View>
              </View>
              <Text style={styles.optionDescription}>
                One-time payment • Lifetime access to this quiz
              </Text>
              <View style={styles.optionButton}>
                <Zap size={16} color={colors.accent} strokeWidth={2} />
                <Text style={styles.optionButtonText}>Purchase Now</Text>
              </View>
            </Pressable>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Subscription */}
            <Pressable
              style={({ pressed }) => [
                styles.optionCard,
                styles.optionCardPremium,
                pressed && styles.optionCardPressed,
              ]}
              onPress={() => {
                haptics.medium();
                onSubscribe();
              }}
              disabled={isLoading}
            >
              <LinearGradient
                colors={['rgba(201, 169, 97, 0.15)', 'rgba(201, 169, 97, 0.05)']}
                style={StyleSheet.absoluteFill}
              />
              <View style={styles.bestValueBadge}>
                <Crown size={10} color={colors.background} />
                <Text style={styles.bestValueText}>BEST VALUE</Text>
              </View>
              <View style={styles.optionHeader}>
                <Text style={styles.optionTitle}>Premium Subscription</Text>
                <View style={[styles.priceBadge, styles.priceBadgePremium]}>
                  <Text style={styles.priceValue}>$19.99</Text>
                  <Text style={styles.priceInterval}>/mo</Text>
                </View>
              </View>
              <Text style={styles.optionDescription}>
                All quizzes + full profile + exclusive content
              </Text>

              {/* Premium features preview */}
              <View style={styles.premiumFeatures}>
                {PREMIUM_FEATURES.slice(0, 3).map((feature, index) => (
                  <View key={index} style={styles.premiumFeatureItem}>
                    <Check size={12} color={colors.accent} strokeWidth={2} />
                    <Text style={styles.premiumFeatureText}>{feature}</Text>
                  </View>
                ))}
              </View>

              <GradientButton
                title="Subscribe Now"
                onPress={() => {
                  haptics.medium();
                  onSubscribe();
                }}
                icon={<Crown size={16} color={colors.background} />}
                fullWidth
                disabled={isLoading}
              />
            </Pressable>
          </View>

          {/* Guarantee */}
          <View style={styles.guarantee}>
            <Text style={styles.guaranteeText}>
              30-day money-back guarantee • Cancel anytime
            </Text>
          </View>
        </ScrollView>
      </View>
    </Modal>
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
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginRight: spacing.sm,
  },
  headerTitle: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
    flex: 1,
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    gap: spacing.lg,
  },
  previewCard: {
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.xl,
  },
  previewIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quizTitle: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
    textAlign: 'center',
  },
  previewText: {
    fontSize: typography.sm,
    color: colors.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  blurredPreview: {
    width: '100%',
    height: 80,
    backgroundColor: colors.surfaceElevated,
    borderRadius: borderRadius.md,
    marginTop: spacing.sm,
    overflow: 'hidden',
  },
  blurOverlay: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: 'rgba(201, 169, 97, 0.1)',
  },
  blurText: {
    fontSize: typography.sm,
    color: colors.accent,
    fontWeight: typography.medium,
  },
  section: {
    gap: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  featureList: {
    gap: spacing.sm,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  featureCheck: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    fontSize: typography.md,
    color: colors.secondary,
  },
  optionsContainer: {
    gap: spacing.md,
  },
  optionCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
    overflow: 'hidden',
  },
  optionCardPremium: {
    borderColor: colors.accent,
    position: 'relative',
  },
  optionCardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  bestValueBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.accent,
    paddingVertical: 3,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  bestValueText: {
    fontSize: 9,
    fontWeight: typography.bold,
    color: colors.background,
    letterSpacing: 0.5,
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  priceBadge: {
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: colors.surfaceElevated,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.md,
  },
  priceBadgePremium: {
    backgroundColor: colors.accentMuted,
  },
  priceValue: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.accent,
  },
  priceInterval: {
    fontSize: typography.xs,
    color: colors.secondary,
    marginLeft: 2,
  },
  optionDescription: {
    fontSize: typography.sm,
    color: colors.tertiary,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    backgroundColor: colors.accentMuted,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    marginTop: spacing.sm,
  },
  optionButtonText: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.accent,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    fontSize: typography.sm,
    color: colors.tertiary,
    fontWeight: typography.medium,
  },
  premiumFeatures: {
    gap: spacing.xs,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  premiumFeatureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  premiumFeatureText: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  guarantee: {
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  guaranteeText: {
    fontSize: typography.xs,
    color: colors.tertiary,
    textAlign: 'center',
  },
});
