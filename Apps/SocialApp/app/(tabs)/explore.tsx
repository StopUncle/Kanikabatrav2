import { useState, memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { haptics } from '../../lib/haptics';
import { colors, spacing, typography, borderRadius } from '../../lib/theme';

// Static categories for explore tab UI
const categories = [
  { id: 'trending', label: 'Trending', icon: '🔥' },
  { id: 'recent', label: 'Recent', icon: '🕐' },
  { id: 'popular', label: 'Popular', icon: '⭐' },
  { id: 'following', label: 'Following', icon: '👥' },
];

// Static explore topics for UI
const exploreItems = [
  { id: '1', title: 'Psychology', posts: '12.4k', color: '#FF6B6B' },
  { id: '2', title: 'Influence', posts: '8.2k', color: '#4ECDC4' },
  { id: '3', title: 'Tactics', posts: '6.7k', color: '#45B7D1' },
  { id: '4', title: 'Defense', posts: '15.1k', color: '#96CEB4' },
  { id: '5', title: 'Strategy', posts: '4.3k', color: '#FFEAA7' },
  { id: '6', title: 'Insights', posts: '9.8k', color: '#DDA0DD' },
];

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - spacing.md * 3) / 2;

const CategoryChip = memo(function CategoryChip({
  label,
  icon,
  selected,
  onPress,
}: {
  label: string;
  icon: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={[styles.chip, selected && styles.chipSelected]}
      onPress={() => {
        haptics.light();
        onPress();
      }}
    >
      <Text style={styles.chipIcon}>{icon}</Text>
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
        {label}
      </Text>
    </Pressable>
  );
});

const ExploreCard = memo(function ExploreCard({
  title,
  posts,
  color,
}: {
  title: string;
  posts: string;
  color: string;
}) {
  return (
    <View style={[styles.exploreCard, { backgroundColor: color + '20' }]}>
      <View style={[styles.cardAccent, { backgroundColor: color }]} />
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardPosts}>{posts} posts</Text>
    </View>
  );
});

export default function ExploreScreen() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('trending');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={[styles.searchContainer, isFocused && styles.searchFocused]}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search topics, people, posts..."
            placeholderTextColor={colors.tertiary}
            value={search}
            onChangeText={setSearch}
            onFocus={() => {
              haptics.light();
              setIsFocused(true);
            }}
            onBlur={() => setIsFocused(false)}
          />
          {search.length > 0 && (
            <Pressable
              onPress={() => {
                haptics.light();
                setSearch('');
              }}
            >
              <Text style={styles.clearIcon}>✕</Text>
            </Pressable>
          )}
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categories}
        >
          {categories.map(cat => (
            <CategoryChip
              key={cat.id}
              label={cat.label}
              icon={cat.icon}
              selected={selectedCategory === cat.id}
              onPress={() => setSelectedCategory(cat.id)}
            />
          ))}
        </ScrollView>

        {/* Section Title */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Browse Topics</Text>
        </View>

        {/* Grid */}
        <View style={styles.grid}>
          {exploreItems.map(item => (
            <ExploreCard
              key={item.id}
              title={item.title}
              posts={item.posts}
              color={item.color}
            />
          ))}
        </View>

        {/* Trending Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending Now</Text>
        </View>

        <View style={styles.trendingList}>
          {['#BuildInPublic', '#TechTwitter', '#ReactNative', '#Startup'].map(
            (tag, index) => (
              <View key={tag} style={styles.trendingItem}>
                <Text style={styles.trendingRank}>{index + 1}</Text>
                <View style={styles.trendingInfo}>
                  <Text style={styles.trendingTag}>{tag}</Text>
                  <Text style={styles.trendingMeta}>
                    {(Math.random() * 10 + 1).toFixed(1)}k posts today
                  </Text>
                </View>
              </View>
            )
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  searchFocused: {
    borderColor: colors.accent,
  },
  searchIcon: {
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    paddingVertical: spacing.md,
    fontSize: typography.md,
    color: colors.primary,
  },
  clearIcon: {
    fontSize: 14,
    color: colors.tertiary,
    padding: spacing.xs,
  },
  categories: {
    gap: spacing.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipSelected: {
    backgroundColor: colors.accentMuted,
    borderColor: colors.accent,
  },
  chipIcon: {
    fontSize: 14,
  },
  chipText: {
    fontSize: typography.sm,
    color: colors.secondary,
    fontWeight: typography.medium,
  },
  chipTextSelected: {
    color: colors.accent,
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  exploreCard: {
    width: CARD_WIDTH,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    gap: spacing.xs,
  },
  cardAccent: {
    width: 32,
    height: 4,
    borderRadius: 2,
    marginBottom: spacing.xs,
  },
  cardTitle: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  cardPosts: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  trendingList: {
    gap: spacing.sm,
  },
  trendingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
  },
  trendingRank: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.tertiary,
    width: 24,
  },
  trendingInfo: {
    flex: 1,
  },
  trendingTag: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  trendingMeta: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
});
