import { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, X } from 'lucide-react-native';
import { FieldReportForm } from '../../components/fieldReports/FieldReportForm';
import { colors, spacing, typography, layout } from '../../lib/theme';
import { haptics } from '../../lib/haptics';
import {
  fieldReportService,
  type FieldReportDraft,
} from '../../services/fieldReportService';
import { missionService } from '../../services/missionService';
import { useAuthStore } from '../../stores/authStore';

export default function NewFieldReportScreen() {
  const { user } = useAuthStore();
  const params = useLocalSearchParams<{ missionId?: string }>();

  const handleSubmit = async (draft: FieldReportDraft) => {
    if (!user) return;

    // Add mission week if linked to a mission
    const draftWithMission = { ...draft };
    if (draft.missionId) {
      const progress = missionService.getMissionProgress(draft.missionId);
      if (progress) {
        (draftWithMission as FieldReportDraft & { missionWeek?: number }).missionWeek =
          progress.weekNumber;
      }
      // Increment field reports count for mission
      await missionService.incrementFieldReports(draft.missionId);
    }

    await fieldReportService.createReport(user.id, draftWithMission);

    // Navigate back
    router.replace('/field-reports');
  };

  const handleCancel = () => {
    haptics.light();
    router.replace('/field-reports');
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
      <SafeAreaView style={styles.container} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.closeButton} onPress={handleCancel}>
            <X size={24} color={colors.primary} />
          </Pressable>
          <Text style={styles.title}>New Field Report</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Form */}
        <FieldReportForm
          missionId={params.missionId}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
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
    justifyContent: 'space-between',
    paddingHorizontal: layout.screenPadding,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  headerSpacer: {
    width: 40,
  },
});
