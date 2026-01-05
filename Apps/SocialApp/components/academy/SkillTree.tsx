// Skill Tree Component
// Interactive visualization of a skill tree

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, Pressable } from 'react-native';
import { SkillTree as SkillTreeType, Skill, SkillTreeId } from '../../content/academy/types';
import { Lock } from 'lucide-react-native';
import { getIcon } from '../../lib/icons';
import { SKILL_TREES, canUnlockSkill, getTreeProgress, getMissingPrerequisites } from '../../content/academy/skills';
import { SkillNode, SkillDetailCard } from './SkillNode';
import { GlassCard } from '../ui/GlassCard';
import { colors, spacing, typography, borderRadius } from '../../lib/theme';
import { haptics } from '../../lib/haptics';

interface SkillTreeProps {
  treeId: SkillTreeId;
  unlockedSkills: string[];
  skillPoints: number;
  onUnlockSkill: (skillId: string) => void;
}

export function SkillTree({
  treeId,
  unlockedSkills,
  skillPoints,
  onUnlockSkill,
}: SkillTreeProps) {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const tree = SKILL_TREES[treeId];
  const progress = getTreeProgress(treeId, unlockedSkills);

  // Clean up modal on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      setSelectedSkill(null);
    };
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedSkill(null);
  }, []);

  if (!tree) return null;

  // Group skills by tier
  const skillsByTier: Record<number, Skill[]> = {};
  tree.skills.forEach(skill => {
    if (!skillsByTier[skill.tier]) {
      skillsByTier[skill.tier] = [];
    }
    skillsByTier[skill.tier].push(skill);
  });

  const IconComponent = getIcon(tree.icon);

  const handleSkillPress = (skill: Skill) => {
    haptics.light();
    setSelectedSkill(skill);
  };

  const handleUnlock = () => {
    if (selectedSkill) {
      onUnlockSkill(selectedSkill.id);
      setSelectedSkill(null);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={[styles.headerIcon, { backgroundColor: `${tree.color}20` }]}>
          <IconComponent size={24} color={tree.color} />
        </View>
        <View style={styles.headerText}>
          <Text style={[styles.treeName, { color: tree.color }]}>{tree.name}</Text>
          <Text style={styles.treeDescription}>{tree.description}</Text>
        </View>
      </View>

      {/* Progress bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${progress}%`, backgroundColor: tree.color },
            ]}
          />
        </View>
        <Text style={styles.progressText}>{Math.round(progress)}% Mastered</Text>
      </View>

      {/* Skill Tree */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.treeContainer}
      >
        <View style={styles.treeContent}>
          {[1, 2, 3, 4, 5].map(tier => {
            const skills = skillsByTier[tier] || [];
            if (skills.length === 0) return null;

            return (
              <View key={tier} style={styles.tierColumn}>
                <Text style={styles.tierLabel}>Tier {tier}</Text>
                <View style={styles.tierSkills}>
                  {skills.map(skill => {
                    const isUnlocked = unlockedSkills.includes(skill.id);
                    const { canUnlock } = canUnlockSkill(
                      skill.id,
                      unlockedSkills,
                      skillPoints
                    );

                    return (
                      <View key={skill.id} style={styles.skillWrapper}>
                        {/* Connection line to prerequisites */}
                        {skill.prerequisites.length > 0 && (
                          <View
                            style={[
                              styles.connectionLine,
                              { backgroundColor: isUnlocked ? tree.color : colors.border },
                            ]}
                          />
                        )}
                        <SkillNode
                          skill={skill}
                          isUnlocked={isUnlocked}
                          canUnlock={canUnlock}
                          treeColor={tree.color}
                          onPress={() => handleSkillPress(skill)}
                        />
                      </View>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Skill Detail Modal */}
      <Modal
        visible={selectedSkill !== null}
        animationType="fade"
        transparent
        onRequestClose={handleCloseModal}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={handleCloseModal}
        >
          <Pressable onPress={e => e.stopPropagation()}>
            {selectedSkill && (
              <SkillDetailCard
                skill={selectedSkill}
                isUnlocked={unlockedSkills.includes(selectedSkill.id)}
                canUnlock={
                  canUnlockSkill(selectedSkill.id, unlockedSkills, skillPoints).canUnlock
                }
                skillPoints={skillPoints}
                treeColor={tree.color}
                onUnlock={handleUnlock}
                onClose={handleCloseModal}
                missingPrerequisites={getMissingPrerequisites(selectedSkill.id, unlockedSkills)}
              />
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

// Tree selector card
export function SkillTreeCard({
  tree,
  progress,
  isLocked,
  onPress,
}: {
  tree: SkillTreeType;
  progress: number;
  isLocked: boolean;
  onPress: () => void;
}) {
  const IconComponent = getIcon(tree.icon);

  return (
    <GlassCard
      variant="medium"
      style={[styles.treeCard, isLocked ? styles.treeCardLocked : undefined]}
    >
      <Pressable
        onPress={() => {
          if (!isLocked) {
            haptics.light();
            onPress();
          }
        }}
        style={styles.treeCardContent}
      >
        <View style={[styles.treeCardIcon, { backgroundColor: `${tree.color}20` }]}>
          <IconComponent size={28} color={isLocked ? colors.tertiary : tree.color} />
          {isLocked && (
            <View style={styles.lockOverlay}>
              <Lock size={14} color={colors.tertiary} />
            </View>
          )}
        </View>

        <View style={styles.treeCardText}>
          <Text
            style={[
              styles.treeCardName,
              { color: isLocked ? colors.tertiary : tree.color },
            ]}
          >
            {tree.name}
          </Text>
          <Text style={styles.treeCardDesc} numberOfLines={1}>
            {tree.description}
          </Text>
        </View>

        {!isLocked && (
          <View style={styles.treeCardProgress}>
            <View style={styles.miniProgress}>
              <View
                style={[
                  styles.miniProgressFill,
                  { width: `${progress}%`, backgroundColor: tree.color },
                ]}
              />
            </View>
            <Text style={styles.progressPercent}>{Math.round(progress)}%</Text>
          </View>
        )}

        {isLocked && (
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumText}>
              {tree.tier_required === 'premium' ? 'Premium' : 'VIP'}
            </Text>
          </View>
        )}
      </Pressable>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  treeName: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
  },
  treeDescription: {
    fontSize: typography.sm,
    color: colors.secondary,
    marginTop: 2,
  },
  progressContainer: {
    marginBottom: spacing.lg,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: typography.xs,
    color: colors.secondary,
    marginTop: spacing.xs,
    textAlign: 'right',
  },
  treeContainer: {
    paddingVertical: spacing.md,
  },
  treeContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.lg,
  },
  tierColumn: {
    alignItems: 'center',
    minWidth: 100,
  },
  tierLabel: {
    fontSize: typography.xs,
    fontWeight: typography.medium,
    color: colors.tertiary,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  tierSkills: {
    alignItems: 'center',
    gap: spacing.md,
  },
  skillWrapper: {
    alignItems: 'center',
  },
  connectionLine: {
    position: 'absolute',
    top: -spacing.md,
    left: '50%',
    width: 2,
    height: spacing.md,
    marginLeft: -1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    padding: spacing.md,
  },
  // Tree Card styles
  treeCard: {
    marginBottom: spacing.sm,
  },
  treeCardLocked: {
    opacity: 0.6,
  },
  treeCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  treeCardIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  lockOverlay: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 2,
  },
  treeCardText: {
    flex: 1,
  },
  treeCardName: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
  },
  treeCardDesc: {
    fontSize: typography.sm,
    color: colors.secondary,
    marginTop: 2,
  },
  treeCardProgress: {
    alignItems: 'flex-end',
    gap: 4,
  },
  miniProgress: {
    width: 60,
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  miniProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressPercent: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
  premiumBadge: {
    backgroundColor: colors.accentMuted,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  premiumText: {
    fontSize: typography.xs,
    fontWeight: typography.medium,
    color: colors.accent,
  },
});
