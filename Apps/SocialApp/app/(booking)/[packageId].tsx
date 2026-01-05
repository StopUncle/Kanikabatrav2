import { useState } from 'react';
import { logger } from '../../lib/logger';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { ArrowLeft, Check, Clock, Calendar, Shield, Star } from 'lucide-react-native';
import { colors, spacing, typography, borderRadius } from '../../lib/theme';
import { DEEP_LINKS } from '../../lib/constants';
import { haptics } from '../../lib/haptics';
import { bookingService, COACHING_PACKAGES } from '../../services/bookingService';
import { useAuthStore } from '../../stores/authStore';

export default function PackageDetailScreen() {
  const { packageId } = useLocalSearchParams<{ packageId: string }>();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const pkg = COACHING_PACKAGES.find(p => p.id === packageId);

  if (!pkg) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Package not found</Text>
          <Pressable
            style={styles.backButton}
            onPress={() => router.replace('/(tabs)/coach')}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const handlePurchase = async () => {
    if (!user) {
      Alert.alert('Sign In Required', 'Please sign in to purchase a coaching package.');
      return;
    }

    haptics.medium();
    setLoading(true);

    try {
      const result = await bookingService.createBooking(pkg.id, user.id);

      if (result?.approvalUrl) {
        // Open PayPal in browser
        const browserResult = await WebBrowser.openAuthSessionAsync(
          result.approvalUrl,
          DEEP_LINKS.bookingSuccess
        );

        if (browserResult.type === 'success') {
          // Payment approved
          if (result.booking) {
            await bookingService.confirmBooking(result.booking.id, result.orderId!);
          }
          Alert.alert(
            'Success!',
            `You've purchased the ${pkg.name} package! Check your email for next steps.`,
            [{ text: 'OK', onPress: () => router.replace('/(tabs)/coach') }]
          );
        }
      } else {
        // Demo mode
        Alert.alert(
          'Demo Mode',
          `In production, you would be redirected to PayPal to purchase ${pkg.name} for $${pkg.price.toLocaleString()}.`,
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      logger.error('Booking error:', error);
      Alert.alert('Error', 'Failed to process booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={styles.headerBackBtn}
          onPress={() => {
            haptics.light();
            router.replace('/(tabs)/coach');
          }}
        >
          <ArrowLeft size={24} color={colors.primary} />
        </Pressable>
        <Text style={styles.headerTitle}>Package Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Package Hero */}
        <View style={styles.hero}>
          {pkg.is_popular && (
            <View style={styles.popularBadge}>
              <Star size={12} color={colors.background} />
              <Text style={styles.popularText}>MOST POPULAR</Text>
            </View>
          )}
          <Text style={styles.packageName}>{pkg.name}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.currency}>$</Text>
            <Text style={styles.price}>{pkg.price.toLocaleString()}</Text>
          </View>
          <Text style={styles.description}>{pkg.description}</Text>
        </View>

        {/* Package Info */}
        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <Calendar size={24} color={colors.accent} />
            <View style={styles.infoContent}>
              <Text style={styles.infoValue}>{pkg.sessions} Session{pkg.sessions > 1 ? 's' : ''}</Text>
              <Text style={styles.infoLabel}>Total sessions included</Text>
            </View>
          </View>
          <View style={styles.infoCard}>
            <Clock size={24} color={colors.accent} />
            <View style={styles.infoContent}>
              <Text style={styles.infoValue}>{pkg.duration_minutes} Minutes</Text>
              <Text style={styles.infoLabel}>Per session duration</Text>
            </View>
          </View>
        </View>

        {/* Features */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>What's Included</Text>
          <View style={styles.featuresList}>
            {pkg.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={styles.checkIcon}>
                  <Check size={14} color={colors.background} />
                </View>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* What to Expect */}
        <View style={styles.expectSection}>
          <Text style={styles.sectionTitle}>What to Expect</Text>
          <View style={styles.expectCard}>
            <Text style={styles.expectText}>
              After purchase, you'll receive a confirmation email with instructions
              to schedule your first session. Sessions are conducted via secure
              video call and can be scheduled at your convenience.
            </Text>
          </View>
        </View>

        {/* Guarantee */}
        <View style={styles.guaranteeSection}>
          <Shield size={24} color={colors.success} />
          <View style={styles.guaranteeContent}>
            <Text style={styles.guaranteeTitle}>Satisfaction Guaranteed</Text>
            <Text style={styles.guaranteeText}>
              If you're not satisfied after your first session, we'll refund
              your payment in full. No questions asked.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Purchase Button */}
      <View style={styles.footer}>
        <View style={styles.footerPrice}>
          <Text style={styles.footerLabel}>Total Price</Text>
          <Text style={styles.footerAmount}>${pkg.price.toLocaleString()}</Text>
        </View>
        <Pressable
          style={[styles.purchaseButton, loading && styles.purchaseButtonDisabled]}
          onPress={handlePurchase}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.background} />
          ) : (
            <Text style={styles.purchaseButtonText}>Purchase with PayPal</Text>
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
  headerBackBtn: {
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
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  popularBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
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
  packageName: {
    fontSize: typography.xxl,
    fontWeight: typography.bold,
    color: colors.primary,
    textAlign: 'center',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  currency: {
    fontSize: typography.lg,
    color: colors.accent,
    marginTop: 4,
  },
  price: {
    fontSize: 48,
    fontWeight: typography.bold,
    color: colors.accent,
  },
  description: {
    fontSize: typography.md,
    color: colors.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  infoSection: {
    flexDirection: 'row',
    padding: spacing.md,
    gap: spacing.md,
  },
  infoCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
  },
  infoContent: {
    flex: 1,
  },
  infoValue: {
    fontSize: typography.md,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  infoLabel: {
    fontSize: typography.xs,
    color: colors.secondary,
  },
  featuresSection: {
    padding: spacing.md,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  featuresList: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    gap: spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  checkIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    flex: 1,
    fontSize: typography.md,
    color: colors.primary,
  },
  expectSection: {
    padding: spacing.md,
    paddingTop: 0,
  },
  expectCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  expectText: {
    fontSize: typography.sm,
    color: colors.secondary,
    lineHeight: 22,
  },
  guaranteeSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    margin: spacing.md,
    marginTop: 0,
    backgroundColor: colors.surfaceElevated,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.success + '40',
  },
  guaranteeContent: {
    flex: 1,
    gap: spacing.xs,
  },
  guaranteeTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.success,
  },
  guaranteeText: {
    fontSize: typography.sm,
    color: colors.secondary,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: spacing.md,
  },
  footerPrice: {
    gap: 2,
  },
  footerLabel: {
    fontSize: typography.xs,
    color: colors.secondary,
  },
  footerAmount: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  purchaseButton: {
    flex: 1,
    backgroundColor: colors.accent,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  purchaseButtonDisabled: {
    backgroundColor: colors.tertiary,
  },
  purchaseButtonText: {
    fontSize: typography.md,
    fontWeight: typography.bold,
    color: colors.background,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  errorText: {
    fontSize: typography.lg,
    color: colors.secondary,
  },
  backButton: {
    backgroundColor: colors.surface,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
  },
  backButtonText: {
    fontSize: typography.md,
    color: colors.accent,
    fontWeight: typography.medium,
  },
});
