// Rotation Tracker - Main List Screen
// Local-only prospect CRM

import React, { useEffect, useState } from 'react';
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
  Users,
  Plus,
  Download,
  TrendingUp,
  Heart,
  Clock,
  Lock,
} from 'lucide-react-native';
import { Button } from '../../../components/ui/Button';
import { GlassCard } from '../../../components/ui/GlassCard';
import { ProspectCard, ExportModal, ReminderSummary } from '../../../components/rotation';
import {
  colors,
  spacing,
  typography,
  borderRadius,
  layout,
} from '../../../lib/theme';
import { haptics } from '../../../lib/haptics';
import { useAuthStore, useHasAccess } from '../../../stores/authStore';
import { useRotationStore, useRotationStats, useReminders } from '../../../stores/rotationStore';
import { ProspectStatus } from '../../../content/rotation/types';
import { STATUS_INFO } from '../../../content/rotation/suggestions';

const STATUS_FILTERS: (ProspectStatus | 'all')[] = ['all', 'active', 'on_hold', 'archived'];

export default function RotationListScreen() {
  const tier = useAuthStore((s) => s.user?.subscription_tier ?? 'free');
  const hasPremiumAccess = useHasAccess('premium');
  const [showExportModal, setShowExportModal] = useState(false);

  const {
    isInitialized,
    isLoading,
    filterStatus,
    setFilterStatus,
    initialize,
    getFilteredProspects,
    refreshReminders,
    dismissReminder,
  } = useRotationStore();

  const stats = useRotationStats();
  const reminders = useReminders();
  const prospects = getFilteredProspects();

  // Free tier limit
  const MAX_FREE_PROSPECTS = 3;
  const canAddMore = hasPremiumAccess || prospects.length < MAX_FREE_PROSPECTS;

  useEffect(() => {
    if (!isInitialized) {
      void initialize();
    }
  }, [isInitialized, initialize]);

  useEffect(() => {
    if (isInitialized) {
      refreshReminders();
    }
  }, [isInitialized, refreshReminders]);

  const handleBack = () => {
    haptics.light();
    router.replace('/(tabs)');
  };

  const handleAddProspect = () => {
    if (!canAddMore) {
      Alert.alert(
        'Limit Reached',
        'Free users can track up to 3 prospects. Upgrade to Premium for unlimited tracking.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Upgrade', onPress: () => router.push('/(subscription)/upgrade') },
        ]
      );
      return;
    }

    haptics.light();
    router.push('/(tools)/rotation/add');
  };

  const handleProspectPress = (id: string) => {
    router.push(`/(tools)/rotation/${id}`);
  };

  const handleExport = () => {
    haptics.light();
    setShowExportModal(true);
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
          <Users size={22} color={colors.accent} />
          <Text style={styles.title}>Rotation</Text>
        </View>
        <Button
          variant="ghost"
          size="sm"
          icon={<Download size={20} color={colors.primary} />}
          onPress={handleExport}
        />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Cards */}
        <View style={styles.statsGrid}>
          <StatCard
            icon={<Users size={18} color={colors.accent} />}
            label="Active"
            value={stats.active}
          />
          <StatCard
            icon={<Heart size={18} color="#EF4444" />}
            label="Hot"
            value={stats.hotProspects}
          />
          <StatCard
            icon={<Clock size={18} color="#F59E0B" />}
            label="Need Attention"
            value={stats.needsAttention}
          />
          <StatCard
            icon={<TrendingUp size={18} color="#22C55E" />}
            label="Total Dates"
            value={prospects.reduce((sum, p) => sum + p.dateCount, 0)}
          />
        </View>

        {/* Reminders */}
        <ReminderSummary
          reminders={reminders}
          onViewAll={() => {
            // Future: navigate to reminders list screen
          }}
          onReminderPress={(reminder) => {
            router.push(`/(tools)/rotation/${reminder.prospectId}`);
          }}
          onDismiss={(reminderId) => {
            haptics.light();
            void dismissReminder(reminderId);
          }}
        />

        {/* Filter Tabs */}
        <View style={styles.filterRow}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.filterTabs}>
              {STATUS_FILTERS.map((status) => (
                <Pressable
                  key={status}
                  onPress={() => {
                    haptics.light();
                    setFilterStatus(status);
                  }}
                  style={[
                    styles.filterTab,
                    filterStatus === status && styles.filterTabActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterTabText,
                      filterStatus === status && styles.filterTabTextActive,
                    ]}
                  >
                    {status === 'all' ? 'All' : STATUS_INFO[status].label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Tier limit warning */}
        {!hasPremiumAccess && prospects.length >= MAX_FREE_PROSPECTS && (
          <GlassCard variant="medium" style={styles.limitCard}>
            <View style={styles.limitContent}>
              <Lock size={18} color={colors.accent} />
              <View style={styles.limitText}>
                <Text style={styles.limitTitle}>Free Limit Reached</Text>
                <Text style={styles.limitDescription}>
                  Upgrade to Premium for unlimited prospects
                </Text>
              </View>
            </View>
          </GlassCard>
        )}

        {/* Prospect List */}
        {prospects.length === 0 ? (
          <View style={styles.emptyState}>
            <Users size={48} color={colors.tertiary} />
            <Text style={styles.emptyTitle}>No Prospects Yet</Text>
            <Text style={styles.emptyDescription}>
              Start tracking your dating prospects to gain strategic insight
            </Text>
            <Button
              variant="gradient"
              icon={<Plus size={20} color={colors.background} />}
              onPress={handleAddProspect}
              style={styles.emptyButton}
            >
              Add First Prospect
            </Button>
          </View>
        ) : (
          <View style={styles.prospectList}>
            {prospects.map((prospect) => (
              <ProspectCard
                key={prospect.id}
                prospect={prospect}
                onPress={() => handleProspectPress(prospect.id)}
              />
            ))}
          </View>
        )}
      </ScrollView>

      {/* FAB */}
      {prospects.length > 0 && (
        <Pressable
          onPress={handleAddProspect}
          style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
        >
          <Plus size={24} color={colors.background} />
        </Pressable>
      )}

      {/* Export Modal */}
      <ExportModal
        visible={showExportModal}
        onClose={() => setShowExportModal(false)}
      />
    </SafeAreaView>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <View style={styles.statCard}>
      {icon}
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
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
    paddingBottom: 100,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statValue: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
    marginTop: spacing.xs,
  },
  statLabel: {
    fontSize: typography.xs,
    color: colors.secondary,
    marginTop: 2,
  },
  filterRow: {
    marginBottom: spacing.md,
  },
  filterTabs: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  filterTab: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterTabActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  filterTabText: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.secondary,
  },
  filterTabTextActive: {
    color: colors.background,
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
  prospectList: {},
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
    marginBottom: spacing.lg,
    maxWidth: 250,
  },
  emptyButton: {
    marginTop: spacing.sm,
  },
  fab: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabPressed: {
    transform: [{ scale: 0.95 }],
    opacity: 0.9,
  },
});
