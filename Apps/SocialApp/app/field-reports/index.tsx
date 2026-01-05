import { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Pressable,
} from 'react-native';
import { router, Stack } from 'expo-router';
import { Plus, FileText, TrendingUp } from 'lucide-react-native';
import { Card, PremiumHeader } from '../../components/ui';
import { GradientButton } from '../../components/ui/GradientButton';
import { FieldReportCard } from '../../components/fieldReports/FieldReportCard';
import { colors, spacing, typography, layout } from '../../lib/theme';
import { haptics } from '../../lib/haptics';
import {
  fieldReportService,
  type FieldReport,
} from '../../services/fieldReportService';
import { useAuthStore } from '../../stores/authStore';

export default function FieldReportsScreen() {
  const { user } = useAuthStore();
  const [reports, setReports] = useState<FieldReport[]>([]);
  const [stats, setStats] = useState<{
    totalReports: number;
    averageRating: number;
    thisWeek: number;
    thisMonth: number;
  } | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    void loadData();
  }, [user]);

  const loadData = async () => {
    if (!user) return;

    await fieldReportService.initialize();
    const userReports = await fieldReportService.getUserReports(user.id);
    const userStats = await fieldReportService.getUserStats(user.id);

    setReports(userReports);
    setStats(userStats);
    setIsLoading(false);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, [user]);

  const handleNewReport = () => {
    haptics.medium();
    router.push('/field-reports/new');
  };

  const handleViewReport = (report: FieldReport) => {
    haptics.light();
    // Could navigate to a detail screen
    // router.push(`/field-reports/${report.id}`);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View style={styles.container}>
        <PremiumHeader
          title="Field Reports"
          subtitle="Your tactical debriefs"
          showBackButton
          backRoute="/(tabs)"
          actions={[
            { icon: Plus, onPress: handleNewReport, accessibilityLabel: 'New report' },
          ]}
        />

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
          {/* Stats Overview */}
          {stats && (
            <View style={styles.statsGrid}>
              <Card style={styles.statCard}>
                <FileText size={20} color={colors.accent} />
                <Text style={styles.statValue}>{stats.totalReports}</Text>
                <Text style={styles.statLabel}>Total Reports</Text>
              </Card>
              <Card style={styles.statCard}>
                <TrendingUp size={20} color={colors.success} />
                <Text style={styles.statValue}>{stats.averageRating.toFixed(1)}</Text>
                <Text style={styles.statLabel}>Avg Success</Text>
              </Card>
              <Card style={styles.statCard}>
                <Text style={styles.statValue}>{stats.thisWeek}</Text>
                <Text style={styles.statLabel}>This Week</Text>
              </Card>
              <Card style={styles.statCard}>
                <Text style={styles.statValue}>{stats.thisMonth}</Text>
                <Text style={styles.statLabel}>This Month</Text>
              </Card>
            </View>
          )}

          {/* Reports List */}
          {reports.length === 0 && !isLoading ? (
            <Card style={styles.emptyCard}>
              <FileText size={48} color={colors.tertiary} />
              <Text style={styles.emptyTitle}>No Field Reports Yet</Text>
              <Text style={styles.emptyText}>
                Start logging your real-world application of tactics. Track what works,
                reflect on lessons learned, and watch your progress grow.
              </Text>
              <GradientButton
                title="Create Your First Report"
                onPress={handleNewReport}
                glow
              />
            </Card>
          ) : (
            <View style={styles.reportsList}>
              <Text style={styles.sectionTitle}>Your Reports</Text>
              {reports.map((report) => (
                <FieldReportCard
                  key={report.id}
                  report={report}
                  onPress={() => handleViewReport(report)}
                />
              ))}
            </View>
          )}

          {/* Bottom spacing */}
          <View style={{ height: spacing.xl }} />
        </ScrollView>

        {/* Floating Action Button */}
        {reports.length > 0 && (
          <Pressable style={styles.fab} onPress={handleNewReport}>
            <Plus size={24} color={colors.background} />
          </Pressable>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: layout.screenPadding,
    gap: spacing.lg,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    gap: spacing.xs,
    padding: spacing.md,
  },
  statValue: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  statLabel: {
    fontSize: typography.xs,
    color: colors.secondary,
    textAlign: 'center',
  },
  emptyCard: {
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.xl,
  },
  emptyTitle: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  emptyText: {
    fontSize: typography.sm,
    color: colors.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  reportsList: {
    gap: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  fab: {
    position: 'absolute',
    right: layout.screenPadding,
    bottom: layout.screenPadding,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
