import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Crown, ChevronRight } from 'lucide-react-native';
import { AvatarWithRewards } from '../avatar';
import { Card } from '../ui/Card';
import { haptics } from '../../lib/haptics';
import { colors, spacing, typography, borderRadius } from '../../lib/theme';
import { PublicProfile, userService } from '../../services/userService';

interface MemberCardProps {
  member: PublicProfile;
  showJoinDate?: boolean;
}

export function MemberCard({ member, showJoinDate = true }: MemberCardProps) {
  const handlePress = () => {
    haptics.light();
    router.push({
      pathname: '/(discover)/[userId]',
      params: { userId: member.id },
    });
  };

  const getTierBadge = () => {
    switch (member.subscription_tier) {
      case 'vip':
        return (
          <View style={[styles.tierBadge, styles.vipBadge]}>
            <Crown size={10} color={colors.background} />
            <Text style={styles.vipText}>VIP</Text>
          </View>
        );
      case 'premium':
        return (
          <View style={[styles.tierBadge, styles.premiumBadge]}>
            <Text style={styles.premiumText}>PREMIUM</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <Pressable onPress={handlePress}>
      <Card style={styles.card}>
        <AvatarWithRewards
          size={48}
          avatarUrl={member.avatar_url}
          userAvatarConfig={member.avatar_config}
        />

        <View style={styles.content}>
          <View style={styles.nameRow}>
            <Text style={styles.name} numberOfLines={1}>
              {member.full_name || 'Anonymous'}
            </Text>
            {getTierBadge()}
          </View>
          {showJoinDate && (
            <Text style={styles.joinDate}>
              {userService.getJoinedAgo(member.created_at)}
            </Text>
          )}
        </View>

        <ChevronRight size={18} color={colors.tertiary} />
      </Card>
    </Pressable>
  );
}

// Compact avatar for "Active Now" horizontal row
interface MemberAvatarProps {
  member: PublicProfile;
  size?: 'sm' | 'md';
}

export function MemberAvatar({ member, size = 'md' }: MemberAvatarProps) {
  const handlePress = () => {
    haptics.light();
    router.push({
      pathname: '/(discover)/[userId]',
      params: { userId: member.id },
    });
  };

  const avatarSize = size === 'sm' ? 48 : 56;
  const isVip = member.subscription_tier === 'vip';

  return (
    <Pressable onPress={handlePress} style={styles.avatarContainer}>
      <View style={[
        styles.avatarWrapper,
        isVip && styles.avatarWrapperVip,
        { width: avatarSize + 4, height: avatarSize + 4 },
      ]}>
        <AvatarWithRewards
          size={avatarSize}
          avatarUrl={member.avatar_url}
          userAvatarConfig={member.avatar_config}
        />
      </View>
      <Text style={styles.avatarName} numberOfLines={1}>
        {member.full_name?.split(' ')[0] || 'User'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
  },
  content: {
    flex: 1,
    gap: 2,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  name: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
    flexShrink: 1,
  },
  joinDate: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  tierBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingVertical: 2,
    paddingHorizontal: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  vipBadge: {
    backgroundColor: colors.accent,
  },
  vipText: {
    fontSize: 9,
    fontWeight: typography.bold,
    color: colors.background,
    letterSpacing: 0.5,
  },
  premiumBadge: {
    backgroundColor: 'rgba(156, 39, 176, 0.15)',
  },
  premiumText: {
    fontSize: 9,
    fontWeight: typography.bold,
    color: '#9C27B0',
    letterSpacing: 0.5,
  },
  // Avatar styles for horizontal row
  avatarContainer: {
    alignItems: 'center',
    gap: spacing.xs,
    width: 70,
  },
  avatarWrapper: {
    borderRadius: 999,
    padding: 2,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
  },
  avatarWrapperVip: {
    borderColor: colors.accent,
  },
  avatarName: {
    fontSize: typography.xs,
    color: colors.secondary,
    textAlign: 'center',
  },
});
