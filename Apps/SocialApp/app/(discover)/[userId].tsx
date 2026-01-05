import { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import {
  ArrowLeft,
  Crown,
  MessageCircle,
  UserPlus,
  UserMinus,
  BookOpen,
  Target,
  Award,
} from 'lucide-react-native';
import { AvatarWithRewards } from '../../components/avatar';
import { Card } from '../../components/ui/Card';
import { haptics } from '../../lib/haptics';
import { colors, spacing, typography, borderRadius } from '../../lib/theme';
import { userService, MemberWithStats } from '../../services/userService';
import { chatService } from '../../services/chatService';
import { useAuthStore } from '../../stores/authStore';

export default function PublicProfileScreen() {
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const { user } = useAuthStore();
  const currentUserId = user?.id;

  const [profile, setProfile] = useState<MemberWithStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [followLoading, setFollowLoading] = useState(false);

  const loadProfile = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await userService.getFullProfile(userId, currentUserId);
      if (!data) {
        setError('Profile not found');
      }
      setProfile(data);
    } catch (err) {
      setError('Failed to load profile');
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, [userId, currentUserId]);

  useEffect(() => {
    if (userId) {
      void loadProfile();
    }
  }, [userId, loadProfile]);

  const handleMessage = async () => {
    if (!currentUserId || !userId || !profile) return;

    haptics.light();

    // Get or create DM channel
    const channel = await chatService.getOrCreateDmChannel(currentUserId, userId);

    if (channel) {
      router.push({
        pathname: '/(chat)/dm/[channelId]',
        params: {
          channelId: channel.id,
          userName: profile.full_name || 'User',
          userId: userId,
          avatarUrl: profile.avatar_url || '',
          avatarConfig: JSON.stringify(profile.avatar_config || null),
        },
      });
    }
  };

  const handleFollow = async () => {
    if (!currentUserId || !userId || !profile || followLoading) return;

    haptics.medium();
    setFollowLoading(true);

    // Store previous state for rollback
    const previousIsFollowing = profile.isFollowing;
    const previousFollowers = profile.followCounts?.followers ?? 0;

    // Optimistic update
    setProfile(prev => prev ? {
      ...prev,
      isFollowing: !previousIsFollowing,
      followCounts: {
        followers: previousIsFollowing
          ? Math.max(0, previousFollowers - 1)
          : previousFollowers + 1,
        following: prev.followCounts?.following ?? 0,
      },
    } : null);

    try {
      const success = previousIsFollowing
        ? await userService.unfollowUser(currentUserId, userId)
        : await userService.followUser(currentUserId, userId);

      if (!success) {
        // Rollback on failure
        setProfile(prev => prev ? {
          ...prev,
          isFollowing: previousIsFollowing,
          followCounts: {
            followers: previousFollowers,
            following: prev.followCounts?.following ?? 0,
          },
        } : null);
        haptics.error();
      }
    } catch {
      // Rollback on error
      setProfile(prev => prev ? {
        ...prev,
        isFollowing: previousIsFollowing,
        followCounts: {
          followers: previousFollowers,
          following: prev.followCounts?.following ?? 0,
        },
      } : null);
      haptics.error();
    } finally {
      setFollowLoading(false);
    }
  };

  const isOwnProfile = currentUserId === userId;

  const getTierInfo = () => {
    switch (profile?.subscription_tier) {
      case 'vip':
        return {
          label: 'VIP Member',
          color: colors.accent,
          icon: Crown,
          bgColor: colors.accentMuted,
        };
      case 'premium':
        return {
          label: 'Premium Member',
          color: '#9C27B0',
          icon: Award,
          bgColor: 'rgba(156, 39, 176, 0.15)',
        };
      default:
        return {
          label: 'Community Member',
          color: colors.secondary,
          icon: null,
          bgColor: colors.surface,
        };
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => {
              haptics.light();
              router.replace('/(discover)');
            }}
          >
            <ArrowLeft size={22} color={colors.primary} />
          </Pressable>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.accent} />
        </View>
      </SafeAreaView>
    );
  }

  if (!profile || error) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => {
              haptics.light();
              router.replace('/(discover)');
            }}
          >
            <ArrowLeft size={22} color={colors.primary} />
          </Pressable>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>
            {error === 'Failed to load profile' ? 'Unable to load profile' : 'User not found'}
          </Text>
          <Text style={styles.emptyText}>
            {error === 'Failed to load profile'
              ? 'Please check your connection and try again'
              : 'This profile may no longer exist'}
          </Text>
          {error === 'Failed to load profile' && (
            <Pressable
              style={styles.retryButton}
              onPress={() => {
                haptics.light();
                void loadProfile();
              }}
            >
              <Text style={styles.retryText}>Try Again</Text>
            </Pressable>
          )}
        </View>
      </SafeAreaView>
    );
  }

  const tierInfo = getTierInfo();
  const TierIcon = tierInfo.icon;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => {
            haptics.light();
            router.replace('/(discover)');
          }}
        >
          <ArrowLeft size={22} color={colors.primary} />
        </Pressable>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <Card style={styles.profileCard}>
          {/* Avatar */}
          <View style={styles.avatarSection}>
            <View style={[
              styles.avatarWrapper,
              profile.subscription_tier === 'vip' && styles.avatarWrapperVip,
            ]}>
              <AvatarWithRewards
                size={96}
                avatarUrl={profile.avatar_url}
                userAvatarConfig={profile.avatar_config}
              />
            </View>
          </View>

          {/* Name */}
          <Text style={styles.name}>{profile.full_name || 'Anonymous'}</Text>

          {/* Tier Badge */}
          <View style={[styles.tierBadge, { backgroundColor: tierInfo.bgColor }]}>
            {TierIcon && <TierIcon size={14} color={tierInfo.color} />}
            <Text style={[styles.tierText, { color: tierInfo.color }]}>
              {tierInfo.label}
            </Text>
          </View>

          {/* Follower/Following Counts */}
          {profile.followCounts && (
            <View style={styles.followCountsRow}>
              <View style={styles.followCount}>
                <Text style={styles.followCountValue}>
                  {profile.followCounts.followers}
                </Text>
                <Text style={styles.followCountLabel}>Followers</Text>
              </View>
              <View style={styles.followCountDivider} />
              <View style={styles.followCount}>
                <Text style={styles.followCountValue}>
                  {profile.followCounts.following}
                </Text>
                <Text style={styles.followCountLabel}>Following</Text>
              </View>
            </View>
          )}

          {/* Joined Date */}
          <Text style={styles.joinedText}>
            {userService.getJoinedAgo(profile.created_at)}
          </Text>

          {/* Action Buttons (hidden for own profile) */}
          {!isOwnProfile && (
            <View style={styles.actionRow}>
              <Pressable
                style={[styles.actionButton, styles.messageButton]}
                onPress={handleMessage}
              >
                <MessageCircle size={18} color={colors.background} />
                <Text style={styles.messageButtonText}>Message</Text>
              </Pressable>

              <Pressable
                style={[
                  styles.actionButton,
                  profile.isFollowing ? styles.followingButton : styles.followButton,
                ]}
                onPress={handleFollow}
                disabled={followLoading}
              >
                {followLoading ? (
                  <ActivityIndicator size="small" color={profile.isFollowing ? colors.secondary : colors.accent} />
                ) : profile.isFollowing ? (
                  <>
                    <UserMinus size={18} color={colors.secondary} />
                    <Text style={styles.followingButtonText}>Following</Text>
                  </>
                ) : (
                  <>
                    <UserPlus size={18} color={colors.accent} />
                    <Text style={styles.followButtonText}>Follow</Text>
                  </>
                )}
              </Pressable>
            </View>
          )}
        </Card>

        {/* Stats Card */}
        {profile.stats && (
          <View style={styles.statsSection}>
            <Text style={styles.sectionTitle}>Activity</Text>
            <Card style={styles.statsCard}>
              <View style={styles.statItem}>
                <View style={[styles.statIcon, { backgroundColor: colors.accentMuted }]}>
                  <Target size={18} color={colors.accent} />
                </View>
                <View style={styles.statContent}>
                  <Text style={styles.statValue}>{profile.stats.quizzes_taken}</Text>
                  <Text style={styles.statLabel}>Quizzes Taken</Text>
                </View>
              </View>

              <View style={styles.statDivider} />

              <View style={styles.statItem}>
                <View style={[styles.statIcon, { backgroundColor: 'rgba(33, 150, 243, 0.15)' }]}>
                  <BookOpen size={18} color="#2196F3" />
                </View>
                <View style={styles.statContent}>
                  <Text style={styles.statValue}>{profile.stats.courses_started}</Text>
                  <Text style={styles.statLabel}>Courses Started</Text>
                </View>
              </View>

              <View style={styles.statDivider} />

              <View style={styles.statItem}>
                <View style={[styles.statIcon, { backgroundColor: 'rgba(76, 175, 80, 0.15)' }]}>
                  <Award size={18} color={colors.success} />
                </View>
                <View style={styles.statContent}>
                  <Text style={styles.statValue}>{profile.stats.courses_completed}</Text>
                  <Text style={styles.statLabel}>Courses Completed</Text>
                </View>
              </View>
            </Card>
          </View>
        )}
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
  headerTitle: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  placeholder: {
    width: 40,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.xs,
  },
  emptyTitle: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  emptyText: {
    fontSize: typography.md,
    color: colors.secondary,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.accent,
    borderRadius: borderRadius.md,
  },
  retryText: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    gap: spacing.lg,
    paddingBottom: spacing.xl,
  },
  profileCard: {
    padding: spacing.xl,
    alignItems: 'center',
    gap: spacing.md,
  },
  avatarSection: {
    marginBottom: spacing.sm,
  },
  avatarWrapper: {
    borderRadius: 999,
    padding: 4,
    borderWidth: 3,
    borderColor: colors.border,
  },
  avatarWrapperVip: {
    borderColor: colors.accent,
  },
  name: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
    textAlign: 'center',
  },
  tierBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
  },
  tierText: {
    fontSize: typography.sm,
    fontWeight: typography.semibold,
  },
  joinedText: {
    fontSize: typography.sm,
    color: colors.tertiary,
  },
  actionRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.sm,
    width: '100%',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
  },
  messageButton: {
    backgroundColor: colors.accent,
  },
  messageButtonText: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.background,
  },
  followButton: {
    backgroundColor: colors.accentMuted,
  },
  followButtonText: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.accent,
  },
  followingButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  followingButtonText: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.secondary,
  },
  followCountsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  followCount: {
    alignItems: 'center',
  },
  followCountValue: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  followCountLabel: {
    fontSize: typography.xs,
    color: colors.secondary,
  },
  followCountDivider: {
    width: 1,
    height: 24,
    backgroundColor: colors.border,
  },
  statsSection: {
    gap: spacing.sm,
  },
  sectionTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
    paddingHorizontal: spacing.xs,
  },
  statsCard: {
    padding: spacing.md,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  statLabel: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  statDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.xs,
  },
});
