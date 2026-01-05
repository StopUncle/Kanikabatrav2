import { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Search, X } from 'lucide-react-native';
import { MemberCard, MemberAvatar } from '../../components/community/MemberCard';
import { haptics } from '../../lib/haptics';
import { colors, spacing, typography, borderRadius } from '../../lib/theme';
import { userService, PublicProfile } from '../../services/userService';

export default function DiscoverScreen() {
  const [members, setMembers] = useState<PublicProfile[]>([]);
  const [searchResults, setSearchResults] = useState<PublicProfile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    void loadMembers();
  }, []);

  // Debounced search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setSearching(false);
      return;
    }

    setSearching(true);
    const timeout = setTimeout(() => {
      void (async () => {
        const results = await userService.searchUsers(searchQuery);
        setSearchResults(results);
        setSearching(false);
      })();
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const loadMembers = async () => {
    setLoading(true);
    const data = await userService.getMembers(20, 0);
    setMembers(data);
    setLoading(false);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadMembers();
    setRefreshing(false);
  }, []);

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const displayMembers = searchQuery.trim() ? searchResults : members;
  const recentMembers = members.slice(0, 5); // First 5 for "Active Now" row

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => {
            haptics.light();
            router.replace('/(tabs)/community');
          }}
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <ArrowLeft size={22} color={colors.primary} />
        </Pressable>
        <Text style={styles.title}>Discover Members</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
          <Search size={18} color={colors.tertiary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search members..."
            placeholderTextColor={colors.tertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
            accessibilityLabel="Search members"
            accessibilityHint="Type to search for community members"
          />
          {searchQuery.length > 0 && (
            <Pressable
              onPress={clearSearch}
              accessibilityLabel="Clear search"
              accessibilityRole="button"
            >
              <X size={18} color={colors.tertiary} />
            </Pressable>
          )}
        </View>
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
        {/* Active Now - Horizontal Avatars (only when not searching) */}
        {!searchQuery.trim() && recentMembers.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recently Joined</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.avatarRow}
            >
              {recentMembers.map(member => (
                <MemberAvatar key={member.id} member={member} />
              ))}
            </ScrollView>
          </View>
        )}

        {/* Member List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {searchQuery.trim() ? 'Search Results' : 'All Members'}
          </Text>

          {loading && !refreshing ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.accent} />
            </View>
          ) : searching ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={colors.accent} />
              <Text style={styles.searchingText}>Searching...</Text>
            </View>
          ) : displayMembers.length > 0 ? (
            <View style={styles.memberList}>
              {displayMembers.map(member => (
                <MemberCard key={member.id} member={member} />
              ))}
            </View>
          ) : searchQuery.trim() ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No members found</Text>
              <Text style={styles.emptyText}>
                Try a different search term
              </Text>
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No members yet</Text>
              <Text style={styles.emptyText}>
                Be the first to join the community!
              </Text>
            </View>
          )}
        </View>
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
  title: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  placeholder: {
    width: 40,
  },
  searchContainer: {
    padding: spacing.md,
    paddingTop: spacing.sm,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    fontSize: typography.md,
    color: colors.primary,
    paddingVertical: spacing.xs,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  section: {
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
    paddingHorizontal: spacing.md,
  },
  avatarRow: {
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  memberList: {
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  loadingContainer: {
    padding: spacing.xl,
    alignItems: 'center',
    gap: spacing.sm,
  },
  searchingText: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  emptyState: {
    padding: spacing.xl,
    alignItems: 'center',
    gap: spacing.xs,
  },
  emptyTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  emptyText: {
    fontSize: typography.sm,
    color: colors.secondary,
    textAlign: 'center',
  },
});
