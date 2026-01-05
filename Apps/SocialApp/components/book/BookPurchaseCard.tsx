import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Linking, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BookOpen, ExternalLink, Crown, Sparkles } from 'lucide-react-native';
import { Card } from '../ui/Card';
import { GradientButton } from '../ui/GradientButton';
import { haptics } from '../../lib/haptics';
import { colors, spacing, typography, borderRadius, gradients, shadows } from '../../lib/theme';
import { BOOK_INFO } from '../../lib/constants';
import { useAuthStore } from '../../stores/authStore';
import { bookPurchaseService } from '../../services/bookPurchaseService';
import { analytics } from '../../services/analyticsService';

interface BookPurchaseCardProps {
  contextMessage?: string;
  compact?: boolean;
}

export function BookPurchaseCard({ contextMessage, compact = false }: BookPurchaseCardProps) {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const handleAmazonPress = async () => {
    haptics.light();
    analytics.track('book_amazon_clicked', { price: BOOK_INFO.amazonPrice });

    try {
      await Linking.openURL(BOOK_INFO.amazonLink);
    } catch {
      Alert.alert('Error', 'Could not open Amazon link');
    }
  };

  const handlePremiumPurchase = async () => {
    if (!user?.id) {
      Alert.alert(
        'Sign In Required',
        'Please sign in to purchase the Premium Edition with your free month of Premium subscription.',
        [{ text: 'OK' }]
      );
      return;
    }

    haptics.medium();
    analytics.track('book_premium_clicked', { price: BOOK_INFO.premiumPrice });

    setLoading(true);
    try {
      const result = await bookPurchaseService.initiateBookPurchase(user.id);

      if (result.approvalUrl) {
        await Linking.openURL(result.approvalUrl);
      }
    } catch (error) {
      Alert.alert('Error', 'Could not start purchase. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (compact) {
    return (
      <Card variant="glassGold" glow style={styles.compactCard}>
        <View style={styles.compactContent}>
          <View style={styles.compactLeft}>
            <BookOpen size={24} color={colors.accent} />
            <View style={styles.compactText}>
              <Text style={styles.compactTitle}>Get the Book</Text>
              <Text style={styles.compactSubtitle}>From ${BOOK_INFO.amazonPrice}</Text>
            </View>
          </View>
          <Pressable style={styles.compactButton} onPress={handleAmazonPress}>
            <ExternalLink size={18} color={colors.accent} />
          </Pressable>
        </View>
      </Card>
    );
  }

  return (
    <Card variant="glassGold" glow style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <BookOpen size={28} color={colors.accent} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.label}>THE BOOK</Text>
          <Text style={styles.title}>{BOOK_INFO.title}</Text>
        </View>
      </View>

      {/* Subtitle */}
      <Text style={styles.subtitle}>{BOOK_INFO.subtitle}</Text>

      {/* Context message if provided */}
      {contextMessage && (
        <Text style={styles.contextMessage}>{contextMessage}</Text>
      )}

      {/* Description */}
      <Text style={styles.description}>{BOOK_INFO.description}</Text>

      {/* Purchase Options */}
      <View style={styles.purchaseOptions}>
        {/* Amazon Option */}
        <Pressable
          style={styles.amazonButton}
          onPress={handleAmazonPress}
          accessibilityRole="button"
          accessibilityLabel={`Buy on Amazon for $${BOOK_INFO.amazonPrice}`}
        >
          <View style={styles.amazonContent}>
            <ExternalLink size={18} color={colors.secondary} />
            <View style={styles.amazonText}>
              <Text style={styles.amazonLabel}>Amazon Kindle</Text>
              <Text style={styles.amazonPrice}>${BOOK_INFO.amazonPrice}</Text>
            </View>
          </View>
        </Pressable>

        {/* Premium Option */}
        <View style={styles.premiumOption}>
          <GradientButton
            title={`Premium Edition - $${BOOK_INFO.premiumPrice}`}
            onPress={handlePremiumPurchase}
            loading={loading}
            fullWidth
            icon={<Crown size={18} color={colors.background} />}
          />
          <View style={styles.bonusBadge}>
            <LinearGradient
              colors={gradients.goldSubtle}
              style={styles.bonusGradient}
            >
              <Sparkles size={12} color={colors.accent} />
              <Text style={styles.bonusText}>
                + {BOOK_INFO.premiumBonusMonths} Month Premium Free
              </Text>
            </LinearGradient>
          </View>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  compactCard: {
    padding: spacing.md,
  },
  compactContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  compactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  compactText: {
    gap: 2,
  },
  compactTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  compactSubtitle: {
    fontSize: typography.sm,
    color: colors.accent,
  },
  compactButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    flex: 1,
    gap: 2,
  },
  label: {
    fontSize: typography.xs,
    fontWeight: typography.bold,
    color: colors.accent,
    letterSpacing: 1,
  },
  title: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  subtitle: {
    fontSize: typography.md,
    fontStyle: 'italic',
    color: colors.secondary,
  },
  contextMessage: {
    fontSize: typography.sm,
    color: colors.accent,
    fontWeight: typography.medium,
  },
  description: {
    fontSize: typography.sm,
    color: colors.secondary,
    lineHeight: 20,
  },
  purchaseOptions: {
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  amazonButton: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  amazonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  amazonText: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  amazonLabel: {
    fontSize: typography.md,
    fontWeight: typography.medium,
    color: colors.primary,
  },
  amazonPrice: {
    fontSize: typography.md,
    fontWeight: typography.bold,
    color: colors.secondary,
  },
  premiumOption: {
    gap: spacing.xs,
  },
  bonusBadge: {
    alignItems: 'center',
  },
  bonusGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  bonusText: {
    fontSize: typography.xs,
    fontWeight: typography.semibold,
    color: colors.accent,
  },
});
