import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Trophy, Calendar, Clock } from 'lucide-react-native';
import { Leaderboard } from '../../components/community/LeaderboardCard';
import { PremiumHeader } from '../../components/ui';
import { haptics } from '../../lib/haptics';
import { colors, spacing, typography, borderRadius } from '../../lib/theme';

type LeaderboardType = 'weekly' | 'allTime';

export default function LeaderboardScreen() {
  const [activeTab, setActiveTab] = useState<LeaderboardType>('weekly');

  const handleTabChange = (tab: LeaderboardType) => {
    if (tab !== activeTab) {
      haptics.light();
      setActiveTab(tab);
    }
  };

  return (
    <View style={styles.container}>
      <PremiumHeader
        title="Leaderboard"
        titleIcon={Trophy}
        showBackButton
        backRoute="/(tabs)/community"
      />

      {/* Tab Toggle */}
      <View style={styles.tabContainer}>
        <Pressable
          style={[styles.tab, activeTab === 'weekly' && styles.tabActive]}
          onPress={() => handleTabChange('weekly')}
        >
          <Calendar size={16} color={activeTab === 'weekly' ? colors.background : colors.secondary} />
          <Text style={[styles.tabText, activeTab === 'weekly' && styles.tabTextActive]}>
            This Week
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'allTime' && styles.tabActive]}
          onPress={() => handleTabChange('allTime')}
        >
          <Clock size={16} color={activeTab === 'allTime' ? colors.background : colors.secondary} />
          <Text style={[styles.tabText, activeTab === 'allTime' && styles.tabTextActive]}>
            All Time
          </Text>
        </Pressable>
      </View>

      {/* Leaderboard Content */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Leaderboard type={activeTab} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.xs,
    gap: spacing.xs,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  tabActive: {
    backgroundColor: colors.accent,
  },
  tabText: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.secondary,
  },
  tabTextActive: {
    color: colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
  },
});
