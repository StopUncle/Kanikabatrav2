import { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, Stack } from 'expo-router';
import { ArrowLeft, Sparkles } from 'lucide-react-native';
import { Card } from '../../components/ui/Card';
import { ProgramCard } from '../../components/programs/ProgramCard';
import { colors, spacing, typography, layout } from '../../lib/theme';
import { haptics } from '../../lib/haptics';
import { programService } from '../../services/programService';
import type {
  TransformationProgram,
  ProgramProgress,
} from '../../content/programs';
import { useAuthStore } from '../../stores/authStore';

type ProgramWithStatus = {
  program: TransformationProgram;
  status: 'locked' | 'available' | 'enrolled' | 'completed';
  progress?: ProgramProgress;
  lockReason?: string;
};

export default function ProgramsScreen() {
  const { user } = useAuthStore();
  const [programs, setPrograms] = useState<ProgramWithStatus[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const userTier = user?.subscription_tier || 'free';

  useEffect(() => {
    void loadPrograms();
  }, [user]);

  const loadPrograms = async () => {
    await programService.initialize();
    const allPrograms = await programService.getAllProgramsWithStatus(userTier);
    setPrograms(allPrograms);
    setIsLoading(false);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadPrograms();
    setRefreshing(false);
  }, [userTier]);

  const handleProgramPress = (program: TransformationProgram, status: string) => {
    haptics.light();
    router.push({
      pathname: '/programs/[slug]',
      params: { slug: program.slug },
    });
  };

  // Separate enrolled programs for priority display
  const enrolledPrograms = programs.filter((p) => p.status === 'enrolled');
  const otherPrograms = programs.filter((p) => p.status !== 'enrolled');

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <SafeAreaView style={styles.container} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => {
              haptics.light();
              router.replace('/(tabs)');
            }}
          >
            <ArrowLeft size={24} color={colors.primary} />
          </Pressable>
          <View style={styles.headerContent}>
            <Text style={styles.title}>Transformation Programs</Text>
            <Text style={styles.subtitle}>8-week structured journeys</Text>
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
            />
          }
        >
          {/* Hero */}
          <Card variant="glassGold" style={styles.heroCard}>
            <Sparkles size={32} color={colors.accent} />
            <Text style={styles.heroTitle}>Your Transformation Awaits</Text>
            <Text style={styles.heroText}>
              Each program is an 8-week structured journey. Complete weekly missions,
              log field reports, and track your psychological evolution.
            </Text>
          </Card>

          {/* Enrolled Programs (if any) */}
          {enrolledPrograms.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Active Programs</Text>
              {enrolledPrograms.map(({ program, status, progress }) => (
                <ProgramCard
                  key={program.id}
                  program={program}
                  status={status}
                  progress={progress}
                  onPress={() => handleProgramPress(program, status)}
                />
              ))}
            </View>
          )}

          {/* All Programs */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {enrolledPrograms.length > 0 ? 'All Programs' : 'Available Programs'}
            </Text>
            {otherPrograms.map(({ program, status, progress, lockReason }) => (
              <ProgramCard
                key={program.id}
                program={program}
                status={status}
                progress={progress}
                lockReason={lockReason}
                onPress={() => handleProgramPress(program, status)}
              />
            ))}
          </View>

          {/* Bottom spacing */}
          <View style={{ height: spacing.xl }} />
        </ScrollView>
      </SafeAreaView>
    </>
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
    paddingHorizontal: layout.screenPadding,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: colors.surface,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  subtitle: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: layout.screenPadding,
    gap: spacing.lg,
  },
  heroCard: {
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
  },
  heroTitle: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.primary,
    textAlign: 'center',
  },
  heroText: {
    fontSize: typography.sm,
    color: colors.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  section: {
    gap: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
});
