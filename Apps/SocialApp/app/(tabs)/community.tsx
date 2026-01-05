import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, RefreshControl, ListRenderItem, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { logger } from '../../lib/logger';
import { router } from 'expo-router';
import { Crown, Users, Lock, Edit3, ClipboardList, ChevronRight, Search } from 'lucide-react-native';
import { Card } from '../../components/ui/Card';
import { AvatarWithRewards } from '../../components/avatar';
import { SkeletonChatRoom } from '../../components/ui/Skeleton';
import { LeaderboardCard } from '../../components/community/LeaderboardCard';
import { UpgradePromptCard } from '../../components/upgrade/UpgradePromptCard';
import { haptics } from '../../lib/haptics';
import { colors, spacing, typography, borderRadius } from '../../lib/theme';
import { chatService, ChatRoom, DmChannel } from '../../services/chatService';
import { useAuthStore } from '../../stores/authStore';

type UserTier = 'free' | 'premium' | 'vip';

const ChatRoomCard = React.memo(function ChatRoomCard({ room, userTier }: { room: ChatRoom; userTier: UserTier }) {
  const isLocked = room.is_vip_only && userTier !== 'vip';

  const handlePress = () => {
    haptics.medium();
    if (isLocked) {
      router.push('/(settings)/subscription');
    } else {
      router.push({
        pathname: '/(chat)/[roomId]',
        params: {
          roomId: room.id,
          roomName: room.name,
          roomIcon: room.icon,
        },
      });
    }
  };

  const accessibilityLabel = `${room.name} chat room, ${room.member_count} members${isLocked ? ', VIP only' : ''}`;
  const accessibilityHint = isLocked ? 'Tap to unlock with VIP subscription' : 'Tap to join chat';

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
    >
      <Card style={StyleSheet.flatten(isLocked ? [styles.roomCard, styles.roomCardLocked] : styles.roomCard)}>
        <View style={StyleSheet.flatten(isLocked ? [styles.roomIcon, styles.roomIconLocked] : styles.roomIcon)}>
          <Text style={styles.roomEmoji}>{room.icon}</Text>
          {isLocked && (
            <View style={styles.lockIconOverlay}>
              <Lock size={14} color={colors.accent} />
            </View>
          )}
        </View>

        <View style={styles.roomContent}>
          <View style={styles.roomHeader}>
            <Text style={[styles.roomName, isLocked && styles.lockedText]}>{room.name}</Text>
            {room.is_vip_only && (
              <View style={styles.vipBadge}>
                <Crown size={10} color={colors.background} />
                <Text style={styles.vipText}>VIP</Text>
              </View>
            )}
          </View>
          <Text style={[styles.roomDescription, isLocked && styles.lockedText]} numberOfLines={2}>
            {room.description}
          </Text>
          <View style={styles.roomMeta}>
            <Users size={12} color={colors.secondary} />
            <Text style={styles.memberCount}>{room.member_count} members</Text>
          </View>
        </View>

        <View style={styles.roomRight}>
          {isLocked ? (
            <Text style={styles.unlockText}>Unlock</Text>
          ) : (
            <>
              <View style={styles.onlineDot} />
              <Text style={styles.onlineText}>Live</Text>
            </>
          )}
        </View>
      </Card>
    </Pressable>
  );
}, (prevProps, nextProps) => {
  return prevProps.room.id === nextProps.room.id &&
         prevProps.userTier === nextProps.userTier;
});

const DMCard = React.memo(function DMCard({ channel }: { channel: DmChannel }) {
  const formatTimeAgo = (dateString?: string) => {
    if (!dateString) return '';
    const now = new Date();
    const date = new Date(dateString);
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const handlePress = () => {
    haptics.light();
    router.push({
      pathname: '/(chat)/dm/[channelId]',
      params: {
        channelId: channel.id,
        userName: channel.other_user?.full_name || 'User',
        userId: channel.other_user?.id || '',
        avatarUrl: channel.other_user?.avatar_url || '',
        avatarConfig: JSON.stringify(channel.other_user?.avatar_config || null),
      },
    });
  };

  const userName = channel.other_user?.full_name || 'User';
  const unreadCount = channel.unread_count || 0;
  const accessibilityLabel = `Message from ${userName}${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`;

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint="Tap to open conversation"
    >
      <Card style={styles.dmCard}>
        <View style={styles.dmAvatar}>
          <AvatarWithRewards
            size={48}
            avatarUrl={channel.other_user?.avatar_url}
            userAvatarConfig={channel.other_user?.avatar_config}
          />
        </View>

        <View style={styles.dmContent}>
          <Text style={styles.dmName}>{userName}</Text>
          <Text style={styles.dmMessage} numberOfLines={1}>
            {channel.last_message?.content || 'No messages yet'}
          </Text>
        </View>

        <View style={styles.dmRight}>
          <Text style={styles.dmTime}>
            {formatTimeAgo(channel.last_message?.created_at)}
          </Text>
          {(channel.unread_count || 0) > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{channel.unread_count}</Text>
            </View>
          )}
        </View>
      </Card>
    </Pressable>
  );
}, (prevProps, nextProps) => {
  return prevProps.channel.id === nextProps.channel.id &&
         prevProps.channel.last_message?.created_at === nextProps.channel.last_message?.created_at &&
         prevProps.channel.unread_count === nextProps.channel.unread_count;
});

export default function CommunityScreen() {
  const { user } = useAuthStore();
  const userTier: UserTier = (user?.subscription_tier as UserTier) || 'free';
  const currentUserId = user?.id;

  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [dmChannels, setDmChannels] = useState<DmChannel[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      const [rooms, dms] = await Promise.all([
        chatService.getChatRooms(),
        currentUserId ? chatService.getDmChannels(currentUserId) : Promise.resolve([]),
      ]);
      setChatRooms(rooms);
      setDmChannels(dms);
    } catch (err) {
      logger.error('Failed to load community data:', err);
      setError('Unable to load community. Please try again.');
    }
  }, [currentUserId]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchData();
      setLoading(false);
    };
    void loadData();
  }, [fetchData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, [fetchData]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Community</Text>
        <Pressable
          style={styles.newMessageButton}
          onPress={() => {
            haptics.light();
            router.push('/(discover)');
          }}
        >
          <Edit3 size={18} color={colors.accent} />
        </Pressable>
      </View>

      {error && !loading && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable style={styles.retryButton} onPress={fetchData}>
            <Text style={styles.retryText}>Retry</Text>
          </Pressable>
        </View>
      )}

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
        {/* Chat Rooms Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Chat Rooms</Text>
          {loading ? (
            <View style={styles.roomList}>
              <SkeletonChatRoom />
              <SkeletonChatRoom />
              <SkeletonChatRoom />
            </View>
          ) : chatRooms.length > 0 ? (
            <View style={styles.roomList}>
              {chatRooms.map(room => (
                <ChatRoomCard key={room.id} room={room} userTier={userTier} />
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No chat rooms available</Text>
            </View>
          )}
        </View>

        {/* Discover Members */}
        <Pressable
          style={styles.discoverCard}
          onPress={() => {
            haptics.light();
            router.push('/(discover)');
          }}
        >
          <View style={styles.discoverIconContainer}>
            <Search size={20} color={colors.accent} strokeWidth={2} />
          </View>
          <View style={styles.discoverContent}>
            <Text style={styles.discoverTitle}>Discover Members</Text>
            <Text style={styles.discoverText}>
              Browse and connect with the community
            </Text>
          </View>
          <ChevronRight size={18} color={colors.accent} strokeWidth={2} />
        </Pressable>

        {/* Weekly Leaderboard */}
        <LeaderboardCard
          onViewAll={() => {
            haptics.light();
            router.push('/(leaderboard)');
          }}
        />

        {/* Direct Messages Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Messages</Text>
          {userTier === 'free' ? (
            <UpgradePromptCard
              variant="community"
              customTitle="Connect with Members"
              customSubtitle="Upgrade to Premium to send direct messages and join discussions"
            />
          ) : dmChannels.length > 0 ? (
            <View style={styles.dmList}>
              {dmChannels.slice(0, 3).map(channel => (
                <DMCard key={channel.id} channel={channel} />
              ))}
            </View>
          ) : (
            <Card style={styles.emptyDmCard}>
              <Text style={styles.emptyDmText}>
                No messages yet. Discover members and start a conversation!
              </Text>
            </Card>
          )}
        </View>

        {/* Community Guidelines */}
        <Pressable
          style={styles.guidelinesCard}
          onPress={() => {
            haptics.light();
            router.push('/(settings)/terms');
          }}
        >
          <View style={styles.guidelinesIconContainer}>
            <ClipboardList size={20} color={colors.primary} strokeWidth={2} />
          </View>
          <View style={styles.guidelinesContent}>
            <Text style={styles.guidelinesTitle}>Community Guidelines</Text>
            <Text style={styles.guidelinesText}>
              Learn how to engage respectfully
            </Text>
          </View>
          <ChevronRight size={18} color={colors.tertiary} strokeWidth={2} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  newMessageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.errorMuted,
  },
  errorText: {
    fontSize: typography.sm,
    color: colors.error,
  },
  retryButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.error,
    borderRadius: borderRadius.sm,
  },
  retryText: {
    fontSize: typography.sm,
    color: colors.primary,
    fontWeight: typography.semibold,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    gap: spacing.xl,
  },
  section: {
    gap: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  seeAll: {
    fontSize: typography.sm,
    color: colors.accent,
    fontWeight: typography.medium,
  },
  roomList: {
    gap: spacing.sm,
  },
  roomCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
  },
  roomCardLocked: {
    opacity: 0.85,
    borderColor: colors.accent + '40',
  },
  roomIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  roomIconLocked: {
    backgroundColor: colors.surfaceElevated,
  },
  lockIconOverlay: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.background,
  },
  lockedText: {
    opacity: 0.6,
  },
  unlockText: {
    fontSize: typography.xs,
    color: colors.accent,
    fontWeight: typography.semibold,
  },
  roomEmoji: {
    fontSize: 24,
  },
  roomContent: {
    flex: 1,
    gap: 2,
  },
  roomHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  roomName: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  vipBadge: {
    backgroundColor: colors.accent,
    paddingVertical: 1,
    paddingHorizontal: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  vipText: {
    fontSize: 10,
    fontWeight: typography.bold,
    color: colors.background,
  },
  roomDescription: {
    fontSize: typography.xs,
    color: colors.tertiary,
    lineHeight: 16,
  },
  roomMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: 2,
  },
  memberCount: {
    fontSize: typography.xs,
    color: colors.secondary,
  },
  lastMessage: {
    fontSize: typography.xs,
    color: colors.tertiary,
    flex: 1,
  },
  roomRight: {
    alignItems: 'flex-end',
    gap: spacing.xs,
  },
  roomTime: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
  },
  onlineText: {
    fontSize: typography.xs,
    color: colors.success,
    fontWeight: typography.medium,
  },
  unreadBadge: {
    backgroundColor: colors.accent,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xs,
  },
  unreadText: {
    fontSize: 11,
    fontWeight: typography.bold,
    color: colors.background,
  },
  dmList: {
    gap: spacing.sm,
  },
  dmCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
  },
  dmAvatar: {
    position: 'relative',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.success,
    borderWidth: 2,
    borderColor: colors.surface,
  },
  dmContent: {
    flex: 1,
    gap: 2,
  },
  dmName: {
    fontSize: typography.md,
    fontWeight: typography.medium,
    color: colors.primary,
  },
  dmMessage: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  dmRight: {
    alignItems: 'flex-end',
    gap: spacing.xs,
  },
  dmTime: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
  guidelinesCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  guidelinesIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guidelinesContent: {
    flex: 1,
  },
  guidelinesTitle: {
    fontSize: typography.md,
    fontWeight: typography.medium,
    color: colors.primary,
  },
  guidelinesText: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  emptyState: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: typography.md,
    color: colors.tertiary,
  },
  discoverCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.accentMuted,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.accent + '30',
  },
  discoverIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  discoverContent: {
    flex: 1,
  },
  discoverTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  discoverText: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  emptyDmCard: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  emptyDmText: {
    fontSize: typography.sm,
    color: colors.tertiary,
    textAlign: 'center',
  },
});
