// TacticGrid Component - 2x2 choice grid for tactic selection
// Player selects approach, then watches execution
// Enhanced with immersion toolkit: breathing animations, press feedback, staggered entry

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Pressable,
} from 'react-native';
import { colors, spacing, borderRadius, typography, glass, shadows } from '../../lib/theme';
import type { TacticChoice, TacticType } from '../../content/simulator/types';
import { TACTIC_INFO } from '../../content/simulator/types';
import { immersiveHaptics } from '../../lib/immersion';

interface TacticGridProps {
  tactics: TacticChoice[];
  onSelect: (tactic: TacticChoice) => void;
  disabled?: boolean;
  selectedId?: string;
  showConfirm?: boolean;
}

export function TacticGrid({
  tactics,
  onSelect,
  disabled = false,
  selectedId,
  showConfirm = true,
}: TacticGridProps) {
  const [selected, setSelected] = useState<string | null>(selectedId || null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnims = useRef(tactics.map(() => new Animated.Value(1))).current;

  // Staggered entry animations for each cell
  const entryAnims = useRef(tactics.map(() => new Animated.Value(0))).current;

  // Breathing/pulse animation for cells
  const pulseAnims = useRef(tactics.map(() => new Animated.Value(1))).current;

  // Entry animation with stagger
  useEffect(() => {
    // Main fade
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    // Staggered cell entries
    const staggerDelay = 80;
    entryAnims.forEach((anim, index) => {
      Animated.sequence([
        Animated.delay(index * staggerDelay),
        Animated.spring(anim, {
          toValue: 1,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    });

    // Start subtle pulse animation on all cells
    pulseAnims.forEach((anim, index) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(index * 200), // Offset each cell
          Animated.timing(anim, {
            toValue: 1.02,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });

    return () => {
      pulseAnims.forEach((anim) => anim.stopAnimation());
    };
  }, [fadeAnim, entryAnims, pulseAnims]);

  const handleSelect = async (tactic: TacticChoice, index: number) => {
    if (disabled) return;

    // Haptic feedback
    await immersiveHaptics.choiceSelect();

    // Animate selection with bounce
    Animated.sequence([
      Animated.timing(scaleAnims[index], {
        toValue: 0.92,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnims[index], {
        toValue: 1,
        tension: 200,
        friction: 10,
        useNativeDriver: true,
      }),
    ]).start();

    if (showConfirm) {
      setSelected(tactic.id);
    } else {
      onSelect(tactic);
    }
  };

  const handleConfirm = async () => {
    const tactic = tactics.find((t) => t.id === selected);
    if (tactic) {
      // Haptic on confirm
      await immersiveHaptics.tap();
      onSelect(tactic);
    }
  };

  const getTacticColor = (tacticType: TacticType): string => {
    return TACTIC_INFO[tacticType]?.color || colors.accent;
  };

  // Ensure we have exactly 4 tactics for the grid
  const gridTactics = tactics.slice(0, 4);
  while (gridTactics.length < 4) {
    gridTactics.push({
      id: `empty-${gridTactics.length}`,
      tactic: 'strategic-empathy',
      label: '',
      description: '',
      execution: '',
      innerVoice: '',
      feedback: '',
      controlDelta: 0,
      nextSceneId: '',
    });
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.grid}>
        {/* Top Row */}
        <View style={styles.row}>
          {gridTactics.slice(0, 2).map((tactic, index) => (
            <TacticCell
              key={tactic.id}
              tactic={tactic}
              isSelected={selected === tactic.id}
              isDisabled={disabled || !tactic.label}
              color={getTacticColor(tactic.tactic)}
              scaleAnim={scaleAnims[index]}
              entryAnim={entryAnims[index]}
              pulseAnim={pulseAnims[index]}
              onPress={() => handleSelect(tactic, index)}
            />
          ))}
        </View>

        {/* Bottom Row */}
        <View style={styles.row}>
          {gridTactics.slice(2, 4).map((tactic, index) => (
            <TacticCell
              key={tactic.id}
              tactic={tactic}
              isSelected={selected === tactic.id}
              isDisabled={disabled || !tactic.label}
              color={getTacticColor(tactic.tactic)}
              scaleAnim={scaleAnims[index + 2]}
              entryAnim={entryAnims[index + 2]}
              pulseAnim={pulseAnims[index + 2]}
              onPress={() => handleSelect(tactic, index + 2)}
            />
          ))}
        </View>
      </View>

      {/* Confirm Button */}
      {showConfirm && selected && (
        <Animated.View style={styles.confirmContainer}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirm}
            activeOpacity={0.8}
          >
            <Text style={styles.confirmText}>CONFIRM</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </Animated.View>
  );
}

interface TacticCellProps {
  tactic: TacticChoice;
  isSelected: boolean;
  isDisabled: boolean;
  color: string;
  scaleAnim: Animated.Value;
  entryAnim: Animated.Value;
  pulseAnim: Animated.Value;
  onPress: () => void;
}

function TacticCell({
  tactic,
  isSelected,
  isDisabled,
  color,
  scaleAnim,
  entryAnim,
  pulseAnim,
  onPress,
}: TacticCellProps) {
  const tacticInfo = TACTIC_INFO[tactic.tactic];

  if (!tactic.label) {
    return <View style={[styles.cell, styles.cellEmpty, { flex: 1, height: 120 }]} />;
  }

  // Combine scale animations: entry -> pulse -> press
  const combinedScale = Animated.multiply(
    Animated.multiply(scaleAnim, entryAnim),
    pulseAnim
  );

  // Entry opacity from entry animation
  const entryOpacity = entryAnim;

  return (
    <Animated.View
      style={{
        transform: [{ scale: combinedScale }],
        opacity: entryOpacity,
        flex: 1,
        height: 120,
      }}
    >
      <Pressable
        style={({ pressed }) => [
          styles.cell,
          { flex: 1 },
          isSelected && styles.cellSelected,
          isSelected && { borderColor: color },
          isDisabled && styles.cellDisabled,
          pressed && !isDisabled && styles.cellPressed,
        ]}
        onPress={onPress}
        disabled={isDisabled}
      >
        {/* Subtle glow overlay when selected */}
        {isSelected && (
          <View style={[styles.selectedGlow, { backgroundColor: `${color}15` }]} />
        )}

        {/* Tactic Name */}
        <Text
          style={[
            styles.tacticName,
            isSelected && { color },
          ]}
          numberOfLines={1}
        >
          {tacticInfo?.name || tactic.tactic}
        </Text>

        {/* Short Label */}
        <Text style={styles.tacticLabel} numberOfLines={1}>
          {tactic.label || tacticInfo?.shortLabel}
        </Text>

        {/* Divider */}
        <View style={[styles.divider, isSelected && { backgroundColor: color }]} />

        {/* Description Hint */}
        <Text style={styles.tacticHint} numberOfLines={2}>
          {tactic.description || tacticInfo?.description}
        </Text>

        {/* Selection Indicator with pulse */}
        {isSelected && (
          <Animated.View
            style={[
              styles.selectedIndicator,
              { backgroundColor: color },
            ]}
          >
            <Text style={styles.selectedCheck}>✓</Text>
          </Animated.View>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
  },
  grid: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  cell: {
    ...glass.medium,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  cellSelected: {
    borderWidth: 2,
    backgroundColor: 'rgba(201, 169, 97, 0.1)',
  },
  cellDisabled: {
    opacity: 0.5,
  },
  cellEmpty: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  cellPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  selectedGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: borderRadius.md,
  },
  tacticName: {
    fontSize: 11,
    fontWeight: typography.bold,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    marginBottom: 2,
  },
  tacticLabel: {
    fontSize: 12,
    color: colors.secondary,
    marginBottom: spacing.xs,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: spacing.xs,
  },
  tacticHint: {
    fontSize: 10,
    color: colors.tertiary,
    fontStyle: 'italic',
    lineHeight: 14,
  },
  selectedIndicator: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCheck: {
    color: colors.background,
    fontSize: 12,
    fontWeight: typography.bold,
  },
  confirmContainer: {
    marginTop: spacing.md,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: colors.accent,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.full,
    ...shadows.glow,
  },
  confirmText: {
    color: colors.background,
    fontSize: typography.sm,
    fontWeight: typography.bold,
    letterSpacing: 1,
  },
});

export default TacticGrid;
