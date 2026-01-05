// Text Analyzer History Screen
// View past analysis results

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  ArrowLeft,
  History,
  Trash2,
  ChevronRight,
  Crown,
  AlertTriangle,
  CheckCircle,
  Clock,
} from 'lucide-react-native';
import { Button } from '../../components/ui/Button';
import { GlassCard } from '../../components/ui/GlassCard';
import { CompactFlagBadge } from '../../components/textAnalyzer/FlagCard';
import {
  colors,
  spacing,
  typography,
  borderRadius,
  layout,
} from '../../lib/theme';
import { haptics } from '../../lib/haptics';
import { useAuthStore, useHasAccess } from '../../stores/authStore';
import {
  useTextAnalysisStore,
  getPowerBalanceColor,
  formatAnalysisDate,
} from '../../stores/textAnalysisStore';
import { FullAnalysisResult } from '../../services/textGameAnalyzerService';

export default function TextAnalyzerHistoryScreen() {
  const tier = useAuthStore((state) => state.user?.subscription_tier ?? 'free');
  const hasPremiumAccess = useHasAccess('premium');

  const {
    history,
    removeFromHistory,
    clearHistory,
    setCurrentAnalysis,
    getHistoryForTier,
  } = useTextAnalysisStore();

  const visibleHistory = getHistoryForTier(tier);
  const hiddenCount = history.length - visibleHistory.length;

  const handleBack = () => {
    haptics.light();
    router.replace('/(tools)/text-analyzer');
  };

  const handleSelectAnalysis = (analysis: FullAnalysisResult) => {
    haptics.light();
    setCurrentAnalysis(analysis);
    router.replace('/(tools)/text-analyzer');
  };

  const handleDeleteAnalysis = (id: string) => {
    haptics.medium();
    Alert.alert(
      'Delete Analysis',
      'Are you sure you want to delete this analysis?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => removeFromHistory(id),
        },
      ]
    );
  };

  const handleClearAll = () => {
    haptics.heavy();
    Alert.alert(
      'Clear All History',
      'This will delete all your saved analyses. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: clearHistory,
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Button
          variant="ghost"
          size="sm"
          icon={<ArrowLeft size={20} color={colors.primary} />}
          onPress={handleBack}
        />
        <View style={styles.headerTitle}>
          <History size={22} color={colors.accent} />
          <Text style={styles.title}>Analysis History</Text>
        </View>
        {visibleHistory.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            icon={<Trash2 size={20} color={colors.error} />}
            onPress={handleClearAll}
          />
        )}
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {visibleHistory.length === 0 ? (
          <View style={styles.emptyState}>
            <History size={48} color={colors.tertiary} />
            <Text style={styles.emptyTitle}>No History Yet</Text>
            <Text style={styles.emptyDescription}>
              Your analyzed conversations will appear here
            </Text>
          </View>
        ) : (
          <>
            {/* Tier limit info */}
            {tier === 'free' && (
              <GlassCard variant="gold" style={styles.limitCard}>
                <View style={styles.limitContent}>
                  <Crown size={20} color={colors.accent} />
                  <View style={styles.limitText}>
                    <Text style={styles.limitTitle}>
                      {visibleHistory.length}/10 Analyses Saved
                    </Text>
                    <Text style={styles.limitDescription}>
                      Upgrade to Premium to save up to 50 analyses
                    </Text>
                  </View>
                </View>
              </GlassCard>
            )}

            {/* History List */}
            {visibleHistory.map((analysis) => (
              <HistoryItem
                key={analysis.id}
                analysis={analysis}
                onSelect={handleSelectAnalysis}
                onDelete={handleDeleteAnalysis}
              />
            ))}

            {/* Hidden count */}
            {hiddenCount > 0 && (
              <View style={styles.hiddenContainer}>
                <Text style={styles.hiddenText}>
                  +{hiddenCount} more analyses available with Premium
                </Text>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

interface HistoryItemProps {
  analysis: FullAnalysisResult;
  onSelect: (analysis: FullAnalysisResult) => void;
  onDelete: (id: string) => void;
}

function HistoryItem({ analysis, onSelect, onDelete }: HistoryItemProps) {
  const balanceColor = getPowerBalanceColor(analysis.powerScore.balance);
  const redFlagCount = analysis.redFlags?.length ?? 0;
  const greenFlagCount = analysis.greenFlags?.length ?? 0;
  const maxSeverity = redFlagCount > 0 && analysis.redFlags
    ? Math.max(...analysis.redFlags.map(rf => rf.flag.severity)) as 1 | 2 | 3
    : undefined;

  const previewText = analysis.rawText
    ? analysis.rawText.slice(0, 100) + (analysis.rawText.length > 100 ? '...' : '')
    : analysis.summary.slice(0, 100);

  return (
    <GlassCard variant="medium" style={styles.historyItem}>
      <Pressable
        onPress={() => onSelect(analysis)}
        style={({ pressed }) => [styles.itemContent, pressed && styles.itemPressed]}
      >
        <View style={styles.itemHeader}>
          <View style={styles.itemMeta}>
            <Clock size={14} color={colors.secondary} />
            <Text style={styles.itemDate}>
              {formatAnalysisDate(analysis.analyzedAt)}
            </Text>
          </View>
          <View style={[styles.powerBadge, { borderColor: balanceColor }]}>
            <Text style={[styles.powerScore, { color: balanceColor }]}>
              {analysis.powerScore.you.toFixed(1)} / {analysis.powerScore.them.toFixed(1)}
            </Text>
          </View>
        </View>

        <Text style={styles.itemPreview} numberOfLines={2}>
          {previewText}
        </Text>

        <View style={styles.itemFooter}>
          <View style={styles.flagsRow}>
            {redFlagCount > 0 && (
              <CompactFlagBadge type="red" count={redFlagCount} severity={maxSeverity} />
            )}
            {greenFlagCount > 0 && (
              <CompactFlagBadge type="green" count={greenFlagCount} />
            )}
          </View>
          <View style={styles.itemActions}>
            <Pressable
              onPress={() => onDelete(analysis.id)}
              style={styles.deleteButton}
              hitSlop={8}
            >
              <Trash2 size={16} color={colors.error} />
            </Pressable>
            <ChevronRight size={18} color={colors.tertiary} />
          </View>
        </View>
      </Pressable>
    </GlassCard>
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
    paddingHorizontal: layout.screenPadding,
    paddingVertical: spacing.sm,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: layout.screenPadding,
    paddingBottom: spacing.xxl,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl * 2,
  },
  emptyTitle: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.primary,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  emptyDescription: {
    fontSize: typography.sm,
    color: colors.secondary,
    textAlign: 'center',
  },
  limitCard: {
    marginBottom: spacing.md,
  },
  limitContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  limitText: {
    flex: 1,
  },
  limitTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  limitDescription: {
    fontSize: typography.sm,
    color: colors.secondary,
    marginTop: 2,
  },
  historyItem: {
    marginBottom: spacing.sm,
    padding: 0,
    overflow: 'hidden',
  },
  itemContent: {
    padding: spacing.md,
  },
  itemPressed: {
    opacity: 0.7,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  itemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  itemDate: {
    fontSize: typography.xs,
    color: colors.secondary,
  },
  powerBadge: {
    paddingVertical: 2,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
  },
  powerScore: {
    fontSize: typography.xs,
    fontWeight: typography.semibold,
  },
  itemPreview: {
    fontSize: typography.sm,
    color: colors.secondary,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flagsRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    flex: 1,
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  deleteButton: {
    padding: spacing.xs,
  },
  hiddenContainer: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  hiddenText: {
    fontSize: typography.sm,
    color: colors.accent,
    fontStyle: 'italic',
  },
});
