import { useState, useEffect, memo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Trophy, Medal, Crown, ChevronRight } from 'lucide-react-native';
import { Card } from '../ui/Card';
import { AvatarWithRewards } from '../avatar';
import { colors, spacing, typography } from '../../lib/theme';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { useAuthStore } from '../../stores/authStore';
import { haptics } from '../../lib/haptics';
import { UserAvatarConfig } from '../../lib/avatarRewards';

interface LeaderboardEntry {
  userId: string;
  userName: string;
  avatarUrl: string | null;
  avatarConfig: UserAvatarConfig | null;
  xp: number;
  level: number;
  rank: number;
  isCurrentUser: boolean;
}

async function fetchLeaderboard(currentUserId?: string, limit: number = 10): Promise<LeaderboardEntry[]> {
  if (!isSupabaseConfigured) return [];

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, avatar_url, avatar_config, total_xp, current_level')
      .order('total_xp', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching leaderboard:', error);
      return [];
    }

    if (!data) return [];

    return data.map((user, index) => ({
      userId: user.id,
      userName: user.full_name || 'Anonymous',
      avatarUrl: user.avatar_url,
      avatarConfig: user.avatar_config as UserAvatarConfig | null,
      xp: user.total_xp || 0,
      level: user.current_level || 1,
      rank: index + 1,
      isCurrentUser: user.id === currentUserId,
    }));
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
}

async function fetchUserRank(userId: string): Promise<{ rank: number; total: number } | null> {
  if (!isSupabaseConfigured) return null;

  try {
    const { data: userData, error: userError } = await supabase
      .from('profiles')
      .select('total_xp')
      .eq('id', userId)
      .single();

    if (userError) {
      console.error('Error fetching user rank:', userError);
      return null;
    }

    if (!userData) return null;

    const userXp = userData.total_xp || 0;

    const [{ count: usersAbove, error: aboveError }, { count: total, error: totalError }] = await Promise.all([
      supabase.from('profiles').select('*', { count: 'exact', head: true }).gt('total_xp', userXp),
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
    ]);

    if (aboveError || totalError) {
      console.error('Error fetching rank counts:', aboveError || totalError);
      return null;
    }

    return { rank: (usersAbove || 0) + 1, total: total || 0 };
  } catch (error) {
    console.error('Error fetching user rank:', error);
    return null;
  }
}

interface LeaderboardCardProps {
  onViewAll?: () => void;
  limit?: number;
}

export function LeaderboardCard({ onViewAll, limit = 5 }: LeaderboardCardProps) {
  const { user } = useAuthStore();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void loadLeaderboard();
  }, [user?.id]);

  const loadLeaderboard = async () => {
    setLoading(true);
    const data = await fetchLeaderboard(user?.id, limit);
    setEntries(data);
    setLoading(false);
  };

  if (loading || entries.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Trophy size={18} color={colors.accent} />
          <Text style={styles.title}>This Week's Leaders</Text>
        </View>
        {onViewAll && (
          <Pressable style={styles.viewAllButton} onPress={() => { haptics.light(); onViewAll(); }}>
            <Text style={styles.viewAllText}>View All</Text>
            <ChevronRight size={16} color={colors.accent} />
          </Pressable>
        )}
      </View>

      <Card style={styles.card}>
        {entries.map((entry, index) => (
          <View key={entry.userId}>
            <LeaderboardRow entry={entry} />
            {index < entries.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </Card>
    </View>
  );
}

interface LeaderboardRowProps {
  entry: LeaderboardEntry;
}

const LeaderboardRow = memo(function LeaderboardRow({ entry }: LeaderboardRowProps) {
  return (
    <View style={[styles.row, entry.isCurrentUser && styles.currentUserRow]}>
      <View style={styles.rankContainer}>
        {entry.rank === 1 ? (
          <Crown size={20} color="#FFD700" fill="#FFD700" />
        ) : entry.rank === 2 ? (
          <Medal size={20} color="#C0C0C0" />
        ) : entry.rank === 3 ? (
          <Medal size={20} color="#CD7F32" />
        ) : (
          <Text style={styles.rankNumber}>{entry.rank}</Text>
        )}
      </View>

      <AvatarWithRewards
        size={36}
        avatarUrl={entry.avatarUrl}
        userAvatarConfig={entry.avatarConfig}
        isCurrentUser={entry.isCurrentUser}
      />

      <View style={styles.userInfo}>
        <Text style={[styles.userName, entry.isCurrentUser && styles.currentUserName]}>
          {entry.isCurrentUser ? 'You' : entry.userName}
        </Text>
        <Text style={styles.levelText}>Level {entry.level}</Text>
      </View>

      <View style={styles.xpContainer}>
        <Text style={styles.xpValue}>{entry.xp.toLocaleString()}</Text>
        <Text style={styles.xpLabel}>XP</Text>
      </View>
    </View>
  );
});

// Full leaderboard view
export function Leaderboard({ type = 'weekly' }: { type?: 'weekly' | 'allTime' }) {
  const { user } = useAuthStore();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [userRank, setUserRank] = useState<{ rank: number; total: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void loadLeaderboard();
  }, [user?.id, type]);

  const loadLeaderboard = async () => {
    setLoading(true);
    const data = await fetchLeaderboard(user?.id, 20);
    setEntries(data);

    if (user?.id) {
      const rank = await fetchUserRank(user.id);
      setUserRank(rank);
    }

    setLoading(false);
  };

  return (
    <View style={styles.fullContainer}>
      {/* User's rank if not in top 10 */}
      {userRank && userRank.rank > 10 && (
        <Card style={styles.yourRankCard}>
          <Text style={styles.yourRankLabel}>Your Rank</Text>
          <View style={styles.yourRankRow}>
            <Text style={styles.yourRankNumber}>#{userRank.rank}</Text>
            <Text style={styles.yourRankTotal}>of {userRank.total}</Text>
          </View>
        </Card>
      )}

      {/* Leaderboard entries */}
      <Card style={styles.fullCard}>
        {entries.map((entry, index) => (
          <View key={entry.userId}>
            <LeaderboardRow entry={entry} />
            {index < entries.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    fontSize: typography.sm,
    color: colors.accent,
    fontWeight: typography.medium,
  },
  card: {
    padding: 0,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.md,
  },
  currentUserRow: {
    backgroundColor: colors.accentMuted,
  },
  rankContainer: {
    width: 28,
    alignItems: 'center',
  },
  rankNumber: {
    fontSize: typography.md,
    fontWeight: typography.bold,
    color: colors.secondary,
  },
  userInfo: {
    flex: 1,
    gap: 2,
  },
  userName: {
    fontSize: typography.sm,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  currentUserName: {
    color: colors.accent,
  },
  levelText: {
    fontSize: typography.xs,
    color: colors.secondary,
  },
  xpContainer: {
    alignItems: 'flex-end',
  },
  xpValue: {
    fontSize: typography.md,
    fontWeight: typography.bold,
    color: colors.accent,
  },
  xpLabel: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.md,
  },
  fullContainer: {
    gap: spacing.md,
  },
  fullCard: {
    padding: 0,
    overflow: 'hidden',
  },
  yourRankCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.accentMuted,
    borderColor: colors.accent,
    borderWidth: 1,
  },
  yourRankLabel: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  yourRankRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.xs,
  },
  yourRankNumber: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.accent,
  },
  yourRankTotal: {
    fontSize: typography.sm,
    color: colors.tertiary,
  },
});
