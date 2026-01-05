// Skill Tree Screen
// View and interact with all skill trees

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  ArrowLeft,
  Brain,
  Star,
} from 'lucide-react-native';
import { Button } from '../../components/ui/Button';
import { SkillTree, SkillTreeCard } from '../../components/academy/SkillTree';
import {
  colors,
  spacing,
  typography,
  layout,
} from '../../lib/theme';
import { haptics } from '../../lib/haptics';
import { useAuthStore, useHasAccess } from '../../stores/authStore';
import { useAcademyStore, useSkillPoints } from '../../stores/academyStore';
import { SKILL_TREES, getTreeProgress } from '../../content/academy/skills';
import { SkillTreeId } from '../../content/academy/types';

export default function SkillTreeScreen() {
  const tier = useAuthStore((s) => s.user?.subscription_tier ?? 'free');
  const hasPremiumAccess = useHasAccess('premium');

  const { progress, unlockSkill } = useAcademyStore();
  const skillPoints = useSkillPoints();

  const [selectedTreeId, setSelectedTreeId] = useState<SkillTreeId | null>(null);

  const handleBack = () => {
    if (selectedTreeId) {
      setSelectedTreeId(null);
    } else {
      haptics.light();
      router.replace('/(academy)');
    }
  };

  const handleUnlockSkill = async (skillId: string) => {
    const result = await unlockSkill(skillId);
    if (result.success) {
      haptics.success();
    } else {
      haptics.error();
    }
  };

  const selectedTree = selectedTreeId ? SKILL_TREES[selectedTreeId] : null;

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
          <Brain size={22} color={colors.accent} />
          <Text style={styles.title}>
            {selectedTree ? selectedTree.name : 'Skill Trees'}
          </Text>
        </View>
        <View style={styles.skillPointsBadge}>
          <Star size={14} color="#D4AF37" />
          <Text style={styles.skillPointsText}>{skillPoints}</Text>
        </View>
      </View>

      {selectedTreeId && progress ? (
        // Show selected tree
        <View style={styles.treeContainer}>
          <SkillTree
            treeId={selectedTreeId}
            unlockedSkills={progress.unlockedSkills}
            skillPoints={skillPoints}
            onUnlockSkill={handleUnlockSkill}
          />
        </View>
      ) : (
        // Show tree selector
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.subtitle}>
            Choose a skill tree to begin your journey to mastery
          </Text>

          {Object.values(SKILL_TREES).map((tree) => {
            const isLocked =
              (tree.tier_required === 'premium' && !hasPremiumAccess) ||
              (tree.tier_required === 'vip' && tier !== 'vip');

            const treeProgressValue = getTreeProgress(
              tree.id,
              progress?.unlockedSkills ?? []
            );

            return (
              <SkillTreeCard
                key={tree.id}
                tree={tree}
                progress={treeProgressValue}
                isLocked={isLocked}
                onPress={() => setSelectedTreeId(tree.id)}
              />
            );
          })}
        </ScrollView>
      )}
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
  skillPointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 20,
  },
  skillPointsText: {
    fontSize: typography.sm,
    fontWeight: typography.bold,
    color: '#D4AF37',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: layout.screenPadding,
    paddingBottom: spacing.xxl,
  },
  subtitle: {
    fontSize: typography.md,
    color: colors.secondary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  treeContainer: {
    flex: 1,
    padding: layout.screenPadding,
  },
});
