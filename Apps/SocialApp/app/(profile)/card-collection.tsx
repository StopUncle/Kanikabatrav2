// Card Collection Screen
// Full gallery of psychology cards

import React, { useState, useEffect, useCallback } from 'react';
import { logger } from '../../lib/logger';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  RefreshControl,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Filter, Sparkles } from 'lucide-react-native';
import { colors, spacing, typography, borderRadius } from '../../lib/theme';
import { haptics } from '../../lib/haptics';
import { PsychologyCard, CardGrid } from '../../components/cards';
import { psychologyCardService } from '../../services/psychologyCardService';
import {
  PsychologyCardDefinition,
  EarnedCard,
  CardRarity,
  CollectionStats,
  RARITY_CONFIG,
} from '../../lib/psychologyCards';

type FilterType = 'all' | 'earned' | 'locked' | CardRarity;

export default function CardCollectionScreen() {
  const [cards, setCards] = useState<Array<PsychologyCardDefinition & { earned: boolean; earnedData?: EarnedCard }>>([]);
  const [stats, setStats] = useState<CollectionStats | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedCard, setSelectedCard] = useState<PsychologyCardDefinition | null>(null);

  useEffect(() => {
    void loadCards();
  }, []);

  const loadCards = async () => {
    try {
      const allCards = await psychologyCardService.getCardsWithStatus();
      setCards(allCards);
      const collectionStats = await psychologyCardService.getStats();
      setStats(collectionStats);
    } catch (error) {
      logger.error('Failed to load cards:', error);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadCards();
    setRefreshing(false);
  }, []);

  const filteredCards = cards.filter((card) => {
    switch (filter) {
      case 'earned':
        return card.earned;
      case 'locked':
        return !card.earned;
      case 'common':
      case 'rare':
      case 'epic':
      case 'legendary':
        return card.rarity === filter;
      default:
        return true;
    }
  });

  const handleCardPress = (card: PsychologyCardDefinition) => {
    haptics.light();
    setSelectedCard(card);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => {
            haptics.light();
            router.replace('/(tabs)/profile');
          }}
        >
          <ArrowLeft size={24} color={colors.primary} />
        </Pressable>
        <Text style={styles.title}>Card Collection</Text>
        <View style={styles.placeholder} />
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
          />
        }
      >
        {/* Collection Stats */}
        {stats && (
          <View style={styles.statsContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${stats.percentage}%` },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {stats.earned} / {stats.total} Cards Collected ({stats.percentage}%)
            </Text>

            {/* Rarity breakdown */}
            <View style={styles.rarityRow}>
              {(['common', 'rare', 'epic', 'legendary'] as const).map((rarity) => (
                <View key={rarity} style={styles.rarityItem}>
                  <View
                    style={[
                      styles.rarityDot,
                      { backgroundColor: RARITY_CONFIG[rarity].labelColor },
                    ]}
                  />
                  <Text style={styles.rarityText}>
                    {stats.byRarity[rarity].earned}/{stats.byRarity[rarity].total}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterContent}
        >
          {[
            { key: 'all', label: 'All' },
            { key: 'earned', label: 'Earned' },
            { key: 'locked', label: 'Locked' },
            { key: 'legendary', label: 'Legendary' },
            { key: 'epic', label: 'Epic' },
            { key: 'rare', label: 'Rare' },
            { key: 'common', label: 'Common' },
          ].map(({ key, label }) => (
            <Pressable
              key={key}
              style={[
                styles.filterChip,
                filter === key && styles.filterChipActive,
              ]}
              onPress={() => {
                haptics.light();
                setFilter(key as FilterType);
              }}
            >
              <Text
                style={[
                  styles.filterChipText,
                  filter === key && styles.filterChipTextActive,
                ]}
              >
                {label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Cards Grid */}
        <View style={styles.gridContainer}>
          {filteredCards.length === 0 ? (
            <View style={styles.emptyState}>
              <Sparkles size={32} color={colors.tertiary} />
              <Text style={styles.emptyTitle}>No cards found</Text>
              <Text style={styles.emptyText}>
                {filter === 'earned'
                  ? 'Complete simulator scenarios to earn cards'
                  : 'Try a different filter'}
              </Text>
            </View>
          ) : (
            <CardGrid
              cards={filteredCards}
              columns={3}
              onCardPress={handleCardPress}
            />
          )}
        </View>
      </ScrollView>

      {/* Card Detail Modal */}
      <Modal
        visible={!!selectedCard}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedCard(null)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setSelectedCard(null)}
        >
          <View style={styles.modalContent}>
            {selectedCard && (
              <PsychologyCard
                card={selectedCard}
                earned={cards.find((c) => c.id === selectedCard.id)?.earned || false}
                earnedData={cards.find((c) => c.id === selectedCard.id)?.earnedData}
                size="large"
                showStats
                animated
              />
            )}
            <Text style={styles.modalHint}>Tap anywhere to close</Text>
          </View>
        </Pressable>
      </Modal>
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    gap: spacing.lg,
  },
  statsContainer: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.surfaceElevated,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 4,
  },
  progressText: {
    fontSize: typography.sm,
    color: colors.secondary,
    textAlign: 'center',
  },
  rarityRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing.xs,
  },
  rarityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  rarityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  rarityText: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
  filterScroll: {
    marginHorizontal: -spacing.md,
  },
  filterContent: {
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  filterChipText: {
    fontSize: typography.sm,
    color: colors.secondary,
    fontWeight: typography.medium,
  },
  filterChipTextActive: {
    color: colors.background,
  },
  gridContainer: {
    minHeight: 200,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.sm,
  },
  emptyTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  emptyText: {
    fontSize: typography.sm,
    color: colors.tertiary,
    textAlign: 'center',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    alignItems: 'center',
    gap: spacing.lg,
  },
  modalHint: {
    fontSize: typography.sm,
    color: colors.tertiary,
  },
});
