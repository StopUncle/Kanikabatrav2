import { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useFocusEffect } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  User,
  CreditCard,
  Bell,
  Palette,
  Shield,
  HelpCircle,
  FileText,
  LogOut,
  Crown,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Calendar,
  Target,
  CheckCircle,
  Award,
  Brain,
  Sparkles,
  Flame,
  Gift,
} from 'lucide-react-native';
import { AvatarWithRewards } from '../../components/avatar';
import { Card } from '../../components/ui/Card';
import { GradientButton } from '../../components/ui/GradientButton';
import { XPBar } from '../../components/home/XPBar';
import { BadgeGrid } from '../../components/badges/BadgeCard';
import { FeaturedCards } from '../../components/cards';
import { haptics } from '../../lib/haptics';
import { colors, spacing, typography, borderRadius, shadows, gradients } from '../../lib/theme';
import { useAuthStore } from '../../stores/authStore';
import { useGamificationStore } from '../../stores/gamificationStore';
import { badgeService } from '../../services/badgeService';
import { psychologyCardService } from '../../services/psychologyCardService';
import { activityService, ActivityFeedItem } from '../../services/activityService';
import { BadgeDefinition } from '../../lib/badges';
import { PsychologyCardDefinition, EarnedCard } from '../../lib/psychologyCards';
import { missionService } from '../../services/missionService';

const tierInfo = {
  free: { label: 'Free', color: colors.tertiary },
  premium: { label: 'Premium', color: colors.accent },
  vip: { label: 'VIP', color: colors.accentLight },
};

function SettingsItem({
  icon: Icon,
  label,
  value,
  onPress,
  showArrow = true,
}: {
  icon: React.ComponentType<{ size: number; color: string }>;
  label: string;
  value?: string;
  onPress: () => void;
  showArrow?: boolean;
}) {
  return (
    <Pressable
      style={styles.settingsItem}
      onPress={() => {
        haptics.light();
        onPress();
      }}
    >
      <Icon size={20} color={colors.secondary} />
      <Text style={styles.settingsLabel}>{label}</Text>
      {value && <Text style={styles.settingsValue}>{value}</Text>}
      {showArrow && <ChevronRight size={20} color={colors.tertiary} />}
    </Pressable>
  );
}

interface StatCardProps {
  value: number;
  label: string;
  icon: React.ReactNode;
}

function StatCard({ value, label, icon }: StatCardProps) {
  return (
    <View style={styles.statCard}>
      <View style={styles.statIconContainer}>{icon}</View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

interface CollapsibleSectionHeaderProps {
  title: string;
  count: number;
  total: number;
  expanded: boolean;
  onToggle: () => void;
}

function CollapsibleSectionHeader({ title, count, total, expanded, onToggle }: CollapsibleSectionHeaderProps) {
  return (
    <Pressable
      style={styles.collapsibleHeader}
      onPress={() => {
        haptics.light();
        onToggle();
      }}
    >
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.collapsibleRight}>
        <Text style={styles.badgeCount}>{count} / {total}</Text>
        {expanded ? (
          <ChevronUp size={18} color={colors.tertiary} />
        ) : (
          <ChevronDown size={18} color={colors.tertiary} />
        )}
      </View>
    </Pressable>
  );
}

export default function ProfileScreen() {
  const { user, signOut, isLoading } = useAuthStore();
  const { currentStreak } = useGamificationStore();
  const [badges, setBadges] = useState<Array<BadgeDefinition & { earned: boolean; earnedAt?: string }>>([]);
  const [cards, setCards] = useState<Array<PsychologyCardDefinition & { earned: boolean; earnedData?: EarnedCard }>>([]);
  const [stats, setStats] = useState({ quizzes: 0, completed: 0, inProgress: 0 });
  const [refreshing, setRefreshing] = useState(false);
  const [highestMissionWeek, setHighestMissionWeek] = useState(0);
  const [badgesExpanded, setBadgesExpanded] = useState(false);
  const [cardsExpanded, setCardsExpanded] = useState(false);

  const displayName = user?.full_name || 'User';
  const displayEmail = user?.email || '';
  const tier = user?.subscription_tier || 'free';

  const loadProfileData = useCallback(async () => {
    // Load mission badge (highest completed week)
    try {
      await missionService.initialize();
      setHighestMissionWeek(missionService.getHighestCompletedWeek());
    } catch {
      // Keep default 0 on error
    }

    // Load badges (only if user is authenticated)
    try {
      if (user?.id) {
        const allBadges = await badgeService.getBadgesWithStatus(user.id);
        setBadges(allBadges);
      }
    } catch {
      // Keep empty badges on error
    }

    // Load psychology cards
    try {
      const allCards = await psychologyCardService.getCardsWithStatus();
      setCards(allCards);
    } catch {
      // Keep empty cards on error
    }

    // Load activity stats
    try {
      const activities = await activityService.getRecentActivity(100);
      const userActivities = user?.id
        ? activities.filter((a: ActivityFeedItem) => a.user_id === user.id)
        : activities;

      const quizzes = userActivities.filter((a: ActivityFeedItem) => a.type === 'quiz_completed').length;
      const coursesCompleted = userActivities.filter((a: ActivityFeedItem) => a.type === 'course_completed').length;
      const coursesStarted = userActivities.filter((a: ActivityFeedItem) => a.type === 'course_started').length;
      const inProgress = Math.max(0, coursesStarted - coursesCompleted);

      setStats({ quizzes, completed: coursesCompleted, inProgress });
    } catch {
      // Keep default stats
    }
  }, [user?.id]);

  // Load badges and stats on mount
  useEffect(() => {
    void loadProfileData();
  }, [loadProfileData]);

  // Reload badges when screen is focused (after completing quizzes, etc.)
  useFocusEffect(
    useCallback(() => {
      // Clear badge cache to ensure fresh data
      badgeService.clearCache();
      void loadProfileData();
    }, [loadProfileData])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadProfileData();
    setRefreshing(false);
  }, [loadProfileData]);

  const formatJoinedDate = (dateStr: string | undefined) => {
    if (!dateStr) return 'Recently';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const handleSignOut = () => {
    haptics.warning();
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: () => {
            void signOut().then(() => {
              router.replace('/(auth)/login');
            });
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
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
        {/* Profile Card - Glass with Avatar Glow */}
        <Card variant="glass" style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={[styles.avatarGlow, tier !== 'free' && shadows.glowIntense]}>
              <AvatarWithRewards
                size={80}
                avatarUrl={user?.avatar_url}
                isCurrentUser={true}
              />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{displayName}</Text>
              <Text style={styles.profileEmail}>{displayEmail}</Text>
              {tier !== 'free' ? (
                <LinearGradient
                  colors={tier === 'vip' ? ['#E0C47A', '#C9A961'] : gradients.goldSubtle}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.tierBadge}
                >
                  <Crown size={10} color={tier === 'vip' ? colors.background : colors.accent} />
                  <Text style={[styles.tierText, { color: tier === 'vip' ? colors.background : colors.accent }]}>
                    {tierInfo[tier].label}
                  </Text>
                </LinearGradient>
              ) : (
                <View style={[styles.tierBadge, { backgroundColor: tierInfo[tier].color + '20' }]}>
                  <Text style={[styles.tierText, { color: tierInfo[tier].color }]}>
                    {tierInfo[tier].label}
                  </Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.joinedRow}>
            <Calendar size={14} color={colors.tertiary} strokeWidth={2} />
            <Text style={styles.joinedText}>Joined {formatJoinedDate(user?.created_at)}</Text>
          </View>

          {tier === 'free' && (
            <GradientButton
              title="Upgrade to Premium"
              onPress={() => {
                haptics.medium();
                router.push('/(settings)/subscription');
              }}
              icon={<Crown size={18} color={colors.background} strokeWidth={2.5} />}
              glow
              fullWidth
            />
          )}
        </Card>

        {/* XP & Level Progress */}
        <Card variant="glass" style={styles.xpCard}>
          <XPBar showLevel={true} compact={false} />
        </Card>

        {/* Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Progress</Text>
          <View style={styles.statsRow}>
            <StatCard
              icon={<Target size={20} color={colors.warning} strokeWidth={2} />}
              value={stats.quizzes}
              label="Quizzes"
            />
            <StatCard
              icon={<CheckCircle size={20} color={colors.success} strokeWidth={2} />}
              value={stats.completed}
              label="Completed"
            />
            <StatCard
              icon={<Flame size={20} color={colors.error} strokeWidth={2} />}
              value={currentStreak}
              label="Day Streak"
            />
          </View>
        </View>

        {/* Badges - Collapsible */}
        {badges.length > 0 && (
          <View style={styles.section}>
            <CollapsibleSectionHeader
              title="Your Badges"
              count={badges.filter(b => b.earned).length}
              total={badges.length}
              expanded={badgesExpanded}
              onToggle={() => setBadgesExpanded(!badgesExpanded)}
            />
            <Card variant="glass" style={styles.badgesCard}>
              <BadgeGrid
                badges={badgesExpanded ? badges : badges.slice(0, 4)}
                columns={4}
              />
            </Card>
          </View>
        )}

        {/* Psychology Cards - Collapsible */}
        {cards.length > 0 && (
          <View style={styles.section}>
            <CollapsibleSectionHeader
              title="Psychology Cards"
              count={cards.filter(c => c.earned).length}
              total={cards.length}
              expanded={cardsExpanded}
              onToggle={() => setCardsExpanded(!cardsExpanded)}
            />
            {cardsExpanded && (
              <Card variant="glass" style={styles.cardsCard}>
                <FeaturedCards
                  cards={cards}
                  title=""
                  onCardPress={() => {
                    haptics.light();
                    router.push('/(profile)/card-collection');
                  }}
                />
                {cards.filter(c => c.earned).length === 0 && (
                  <View style={styles.emptyCards}>
                    <Sparkles size={24} color={colors.tertiary} />
                    <Text style={styles.emptyCardsText}>
                      Complete simulator scenarios to collect cards
                    </Text>
                  </View>
                )}
              </Card>
            )}
          </View>
        )}

        {/* Dark Psychology Profile - Featured CTA */}
        <Pressable
          style={({ pressed }) => [
            styles.psychProfileCard,
            pressed && styles.psychProfileCardPressed,
          ]}
          onPress={() => {
            haptics.medium();
            router.push('/(profile)/psych-profile');
          }}
        >
          <LinearGradient
            colors={['rgba(201, 169, 97, 0.15)', 'rgba(201, 169, 97, 0.05)']}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.psychProfileIcon}>
            <Brain size={28} color={colors.accent} strokeWidth={1.5} />
          </View>
          <View style={styles.psychProfileContent}>
            <View style={styles.psychProfileHeader}>
              <Text style={styles.psychProfileTitle}>Dark Psychology Profile</Text>
              <View style={styles.psychProfileBadge}>
                <Sparkles size={10} color={colors.background} />
                <Text style={styles.psychProfileBadgeText}>NEW</Text>
              </View>
            </View>
            <Text style={styles.psychProfileDesc}>
              View your aggregate personality analysis across all traits
            </Text>
          </View>
          <ChevronRight size={20} color={colors.accent} strokeWidth={2} />
        </Pressable>

        {/* Quiz Results */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quiz Results</Text>
          <Card
            variant="glassGold"
            style={styles.quizResultCard}
            onPress={() => haptics.light()}
          >
            <View style={[styles.quizResultIcon, shadows.glow]}>
              <Award size={24} color={colors.accent} strokeWidth={2} />
            </View>
            <View style={styles.quizResultInfo}>
              <Text style={styles.quizResultTitle}>Dark Triad Assessment</Text>
              <Text style={styles.quizResultScore}>Score: 65/100</Text>
            </View>
            <ChevronRight size={18} color={colors.tertiary} strokeWidth={2} />
          </Card>
        </View>

        {/* Referral Card */}
        <Pressable
          style={({ pressed }) => [
            styles.referralCard,
            pressed && styles.referralCardPressed,
          ]}
          onPress={() => {
            haptics.medium();
            router.push('/(settings)/referral');
          }}
        >
          <LinearGradient
            colors={['rgba(201, 169, 97, 0.15)', 'rgba(201, 169, 97, 0.05)']}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.referralIcon}>
            <Gift size={24} color={colors.accent} strokeWidth={2} />
          </View>
          <View style={styles.referralContent}>
            <Text style={styles.referralTitle}>Refer Friends</Text>
            <Text style={styles.referralDesc}>
              Give 7 days free, get 7 days free
            </Text>
          </View>
          <ChevronRight size={20} color={colors.accent} strokeWidth={2} />
        </Pressable>

        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <Card variant="glass" style={styles.settingsCard}>
            <SettingsItem
              icon={User}
              label="Edit Profile"
              onPress={() => router.push('/(settings)/edit-profile')}
            />
            <SettingsItem
              icon={CreditCard}
              label="Subscription"
              value={tierInfo[tier].label}
              onPress={() => router.push('/(settings)/subscription')}
            />
            <SettingsItem
              icon={Bell}
              label="Notifications"
              onPress={() => router.push('/(settings)/notifications')}
            />
          </Card>
        </View>

        {/* App Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App</Text>
          <Card variant="glass" style={styles.settingsCard}>
            <SettingsItem
              icon={Palette}
              label="Appearance"
              value="Dark"
              onPress={() => router.push('/(settings)/appearance')}
            />
            <SettingsItem
              icon={Shield}
              label="Privacy"
              onPress={() => router.push('/(settings)/privacy')}
            />
            <SettingsItem
              icon={HelpCircle}
              label="Help & Support"
              onPress={() => router.push('/(settings)/help')}
            />
            <SettingsItem
              icon={FileText}
              label="Terms of Service"
              onPress={() => router.push('/(settings)/terms')}
            />
          </Card>
        </View>

        {/* Sign Out */}
        <Pressable
          style={styles.signOutButton}
          onPress={handleSignOut}
        >
          <LogOut size={20} color={colors.error} />
          <Text style={styles.signOutText}>Sign Out</Text>
        </Pressable>

        <Text style={styles.version}>The Dark Mirror v1.0.0</Text>
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    gap: spacing.lg,
  },
  profileCard: {
    gap: spacing.md,
  },
  xpCard: {
    padding: spacing.md,
  },
  badgesCard: {
    padding: spacing.sm,
  },
  cardsCard: {
    padding: spacing.sm,
    minHeight: 100,
  },
  emptyCards: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    gap: spacing.sm,
  },
  emptyCardsText: {
    fontSize: typography.sm,
    color: colors.tertiary,
    textAlign: 'center',
  },
  badgeCount: {
    fontSize: typography.sm,
    color: colors.accent,
    fontWeight: typography.medium,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  avatarGlow: {
    borderRadius: 48,
  },
  profileInfo: {
    flex: 1,
    gap: spacing.xs,
  },
  profileName: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  profileEmail: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  tierBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 3,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.sm,
    marginTop: spacing.xs,
    overflow: 'hidden',
  },
  tierText: {
    fontSize: typography.xs,
    fontWeight: typography.bold,
  },
  joinedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  joinedText: {
    fontSize: typography.sm,
    color: colors.tertiary,
  },
  section: {
    gap: spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  collapsibleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  collapsibleRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  sectionTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.secondary,
  },
  seeAll: {
    fontSize: typography.sm,
    color: colors.accent,
    fontWeight: typography.medium,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  statLabel: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
  quizResultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
  },
  quizResultIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quizResultInfo: {
    flex: 1,
  },
  quizResultTitle: {
    fontSize: typography.md,
    fontWeight: typography.medium,
    color: colors.primary,
  },
  quizResultScore: {
    fontSize: typography.sm,
    color: colors.accent,
  },
  settingsCard: {
    padding: 0,
    overflow: 'hidden',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingsLabel: {
    flex: 1,
    fontSize: typography.md,
    color: colors.primary,
  },
  settingsValue: {
    fontSize: typography.sm,
    color: colors.tertiary,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
  },
  signOutText: {
    fontSize: typography.md,
    fontWeight: typography.medium,
    color: colors.error,
  },
  version: {
    textAlign: 'center',
    fontSize: typography.xs,
    color: colors.tertiary,
    paddingVertical: spacing.md,
  },
  psychProfileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.accent,
    overflow: 'hidden',
  },
  psychProfileCardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  psychProfileIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  psychProfileContent: {
    flex: 1,
    gap: spacing.xs,
  },
  psychProfileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  psychProfileTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  psychProfileBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: colors.accent,
    paddingVertical: 2,
    paddingHorizontal: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  psychProfileBadgeText: {
    fontSize: 9,
    fontWeight: typography.bold,
    color: colors.background,
    letterSpacing: 0.5,
  },
  psychProfileDesc: {
    fontSize: typography.sm,
    color: colors.secondary,
    lineHeight: 18,
  },
  referralCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.accent + '40',
    overflow: 'hidden',
  },
  referralCardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  referralIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  referralContent: {
    flex: 1,
    gap: spacing.xs,
  },
  referralTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  referralDesc: {
    fontSize: typography.sm,
    color: colors.accent,
  },
});
