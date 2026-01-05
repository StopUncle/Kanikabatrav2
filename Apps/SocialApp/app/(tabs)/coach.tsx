import { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, Clock, Check, Star, HelpCircle, ChevronRight, Sparkles } from 'lucide-react-native';
import { Card } from '../../components/ui/Card';
import { GradientButton } from '../../components/ui/GradientButton';
import { AuroraBackground } from '../../components/effects/AuroraBackground';
import { haptics } from '../../lib/haptics';
import { colors, spacing, typography, borderRadius, shadows, gradients } from '../../lib/theme';
import { bookingService, COACHING_PACKAGES, CoachingPackage, CoachingSession } from '../../services/bookingService';
import { useAuthStore } from '../../stores/authStore';

function PackageCard({ pkg }: { pkg: CoachingPackage }) {
  const handlePress = () => {
    haptics.medium();
    router.push({
      pathname: '/(booking)/[packageId]',
      params: { packageId: pkg.id },
    });
  };

  return (
    <Card
      variant={pkg.is_popular ? 'glassGold' : 'glass'}
      glow={pkg.is_popular}
      style={StyleSheet.flatten([styles.packageCard, pkg.is_popular && styles.packageCardPopular])}
      onPress={handlePress}
    >
      {pkg.is_popular && (
        <LinearGradient
          colors={gradients.goldPrimary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.popularBadge}
        >
          <Star size={10} color={colors.background} />
          <Text style={styles.popularText}>MOST POPULAR</Text>
        </LinearGradient>
      )}

      <View style={styles.packageHeader}>
        <Text style={styles.packageName}>{pkg.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.priceCurrency}>$</Text>
          <Text style={styles.priceAmount}>{pkg.price.toLocaleString()}</Text>
        </View>
      </View>

      <Text style={styles.packageDescription}>{pkg.description}</Text>

      <View style={styles.packageMeta}>
        <View style={styles.metaItem}>
          <Calendar size={14} color={colors.secondary} />
          <Text style={styles.metaText}>{pkg.sessions} session{pkg.sessions > 1 ? 's' : ''}</Text>
        </View>
        <View style={styles.metaItem}>
          <Clock size={14} color={colors.secondary} />
          <Text style={styles.metaText}>{pkg.duration_minutes} min each</Text>
        </View>
      </View>

      <View style={styles.featureList}>
        {pkg.features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <Check size={14} color={colors.accent} />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>

      {pkg.is_popular ? (
        <GradientButton
          title="Book Now"
          onPress={handlePress}
          glow
          fullWidth
          icon={<ChevronRight size={18} color={colors.background} />}
        />
      ) : (
        <View style={styles.bookButton}>
          <Text style={styles.bookButtonText}>View Details</Text>
          <ChevronRight size={18} color={colors.accent} />
        </View>
      )}
    </Card>
  );
}

export default function CoachScreen() {
  const { user } = useAuthStore();
  const [upcomingSessions, setUpcomingSessions] = useState<CoachingSession[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const packages = COACHING_PACKAGES;

  const loadUpcomingSessions = useCallback(async () => {
    if (!user) return;
    const sessions = await bookingService.getUpcomingSessions(user.id);
    setUpcomingSessions(sessions);
  }, [user]);

  useEffect(() => {
    if (user) {
      void loadUpcomingSessions();
    }
  }, [user, loadUpcomingSessions]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadUpcomingSessions();
    setRefreshing(false);
  }, [loadUpcomingSessions]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Coach</Text>
        <Text style={styles.subtitle}>Work directly with Kanika</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section with Aurora Effect */}
        <View style={[styles.heroCard, shadows.glow]}>
          <AuroraBackground style={styles.heroAurora} intensity="strong">
            <View style={styles.heroContent}>
              <View style={[styles.heroIconContainer, shadows.glowIntense]}>
                <LinearGradient
                  colors={gradients.goldVertical}
                  style={styles.heroIconGradient}
                >
                  <Sparkles size={40} color={colors.background} strokeWidth={1.5} />
                </LinearGradient>
              </View>
              <Text style={styles.heroTitle}>Private Coaching</Text>
              <Text style={styles.heroText}>
                Go beyond the surface. In these one-on-one sessions, we'll decode
                your patterns, unmask hidden dynamics, and build your personal
                strategy for authentic power.
              </Text>
            </View>
          </AuroraBackground>
        </View>

        {/* Upcoming Sessions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Sessions</Text>
          {upcomingSessions.length > 0 ? (
            upcomingSessions.map(session => (
              <Card key={session.id} style={styles.sessionCard}>
                <View style={styles.sessionInfo}>
                  <Calendar size={20} color={colors.accent} />
                  <View style={styles.sessionDetails}>
                    <Text style={styles.sessionTitle}>Session {session.session_number}</Text>
                    <Text style={styles.sessionTime}>
                      {new Date(session.scheduled_at!).toLocaleDateString()} at{' '}
                      {new Date(session.scheduled_at!).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                  </View>
                </View>
                <Clock size={16} color={colors.secondary} />
                <Text style={styles.sessionDuration}>{session.duration_minutes}m</Text>
              </Card>
            ))
          ) : (
            <Card style={styles.emptyCard}>
              <Calendar size={36} color={colors.tertiary} />
              <Text style={styles.emptyTitle}>No upcoming sessions</Text>
              <Text style={styles.emptyText}>
                Book a coaching package to start your transformation
              </Text>
            </Card>
          )}
        </View>

        {/* Packages Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Coaching Packages</Text>
          <View style={styles.packageList}>
            {packages.map(pkg => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </View>
        </View>

        {/* Testimonial - Glass Gold Card */}
        <Card variant="glassGold" style={styles.testimonialCard}>
          <Text style={styles.testimonialQuote}>
            "Working with Kanika changed everything. I finally understand the
            patterns that kept me stuck. The investment paid for itself within
            weeks."
          </Text>
          <View style={styles.testimonialAuthor}>
            <Text style={styles.authorName}>— Sarah M.</Text>
            <Text style={styles.authorTitle}>VIP Transformation Client</Text>
          </View>
        </Card>

        {/* FAQ Link */}
        <Pressable
          style={styles.faqLink}
          onPress={() => {
            haptics.light();
            router.push('/(settings)/help');
          }}
        >
          <HelpCircle size={20} color={colors.secondary} />
          <Text style={styles.faqText}>Have questions? Read our FAQ</Text>
          <ChevronRight size={20} color={colors.tertiary} />
        </Pressable>
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
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  subtitle: {
    fontSize: typography.sm,
    color: colors.secondary,
    marginTop: spacing.xs,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    gap: spacing.lg,
  },
  heroCard: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.accent,
  },
  heroAurora: {
    borderRadius: borderRadius.xl,
  },
  heroContent: {
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.lg,
  },
  heroIconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
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
    color: colors.accent,
  },
  heroText: {
    fontSize: typography.md,
    color: colors.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  section: {
    gap: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  sessionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
  },
  sessionInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  sessionDetails: {
    gap: 2,
  },
  sessionTitle: {
    fontSize: typography.md,
    fontWeight: typography.medium,
    color: colors.primary,
  },
  sessionTime: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  sessionDuration: {
    fontSize: typography.sm,
    color: colors.secondary,
    marginLeft: spacing.xs,
  },
  emptyCard: {
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xl,
  },
  emptyTitle: {
    fontSize: typography.md,
    fontWeight: typography.medium,
    color: colors.secondary,
  },
  emptyText: {
    fontSize: typography.sm,
    color: colors.tertiary,
    textAlign: 'center',
  },
  packageList: {
    gap: spacing.md,
  },
  packageCard: {
    gap: spacing.md,
    position: 'relative',
    overflow: 'hidden',
  },
  packageCardPopular: {
    borderColor: colors.accent,
    borderWidth: 2,
  },
  popularBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderBottomLeftRadius: borderRadius.md,
    zIndex: 10,
  },
  popularText: {
    fontSize: 10,
    fontWeight: typography.bold,
    color: colors.background,
  },
  packageHeader: {
    gap: spacing.xs,
  },
  packageName: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  priceCurrency: {
    fontSize: typography.md,
    color: colors.accent,
    marginTop: 4,
  },
  priceAmount: {
    fontSize: typography.xxl,
    fontWeight: typography.bold,
    color: colors.accent,
  },
  packageDescription: {
    fontSize: typography.sm,
    color: colors.secondary,
    lineHeight: 20,
  },
  packageMeta: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  metaIcon: {
    fontSize: 14,
  },
  metaText: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  featureList: {
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
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
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  bookButtonText: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.accent,
  },
  testimonialCard: {
    backgroundColor: colors.surfaceElevated,
    gap: spacing.md,
  },
  testimonialQuote: {
    fontSize: typography.md,
    color: colors.primary,
    fontStyle: 'italic',
    lineHeight: 24,
  },
  testimonialAuthor: {
    gap: 2,
  },
  authorName: {
    fontSize: typography.sm,
    fontWeight: typography.semibold,
    color: colors.accent,
  },
  authorTitle: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
  faqLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  faqText: {
    flex: 1,
    fontSize: typography.md,
    color: colors.primary,
  },
});
