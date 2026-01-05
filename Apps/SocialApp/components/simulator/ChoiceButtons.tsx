// Choice Buttons Component
// Enhanced with selection glow, pulse effects, and consequence hints
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  withDelay,
  Easing,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { ChevronRight } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography, glass } from '../../lib/theme';
import { haptics } from '../../lib/haptics';
import type { Choice } from '../../content/simulator';

interface ChoiceButtonsProps {
  choices: Choice[];
  onSelect: (choice: Choice) => void;
  disabled?: boolean;
  hideHeader?: boolean;
}

export function ChoiceButtons({ choices, onSelect, disabled, hideHeader }: ChoiceButtonsProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectionTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Reset selection when choices change and cleanup timeout
  useEffect(() => {
    setSelectedId(null);
    return () => {
      if (selectionTimeoutRef.current) {
        clearTimeout(selectionTimeoutRef.current);
        selectionTimeoutRef.current = null;
      }
    };
  }, [choices]);

  const handleSelect = (choice: Choice) => {
    if (disabled || selectedId) return;
    setSelectedId(choice.id);

    // Clear any existing timeout
    if (selectionTimeoutRef.current) {
      clearTimeout(selectionTimeoutRef.current);
    }

    // Delay actual selection to prevent spam clicking (1.5s)
    selectionTimeoutRef.current = setTimeout(() => {
      selectionTimeoutRef.current = null;
      onSelect(choice);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      {!hideHeader && (
        <View style={styles.header}>
          <Text style={styles.headerText}>What do you do?</Text>
        </View>
      )}
      <View style={styles.choicesContainer}>
        {choices.map((choice, index) => (
          <ChoiceButton
            key={choice.id}
            choice={choice}
            index={index}
            onSelect={handleSelect}
            disabled={disabled || (selectedId !== null && selectedId !== choice.id)}
            isSelected={selectedId === choice.id}
            totalChoices={choices.length}
          />
        ))}
      </View>
    </View>
  );
}

interface ChoiceButtonProps {
  choice: Choice;
  index: number;
  onSelect: (choice: Choice) => void;
  disabled?: boolean;
  isSelected: boolean;
  totalChoices: number;
}

function ChoiceButton({
  choice,
  index,
  onSelect,
  disabled,
  isSelected,
  totalChoices,
}: ChoiceButtonProps) {
  // Animation values
  const slideX = useSharedValue(50);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(1);
  const glowOpacity = useSharedValue(0);
  const pulseScale = useSharedValue(1);
  const borderGlow = useSharedValue(0);

  // Determine consequence hint (subtle visual cue)
  const isOptimal = choice.isOptimal === true;
  const hasXpBonus = (choice.xpBonus || 0) > 0;

  // Staggered entrance animation
  useEffect(() => {
    const delay = index * 100;

    slideX.value = withDelay(delay, withTiming(0, { duration: 300, easing: Easing.out(Easing.ease) }));
    opacity.value = withDelay(delay, withTiming(1, { duration: 300 }));

    // Subtle shimmer for optimal choices
    if (isOptimal || hasXpBonus) {
      borderGlow.value = withDelay(
        delay + 300,
        withSequence(
          withTiming(0.5, { duration: 600 }),
          withTiming(0.2, { duration: 600 })
        )
      );
    }
  }, [index, slideX, opacity, borderGlow, isOptimal, hasXpBonus]);

  // Selection animation (haptic handled by parent SimulatorScene)
  useEffect(() => {
    if (isSelected) {
      // Glow appears
      glowOpacity.value = withTiming(1, { duration: 150 });

      // Pulse outward
      pulseScale.value = withSequence(
        withSpring(1.02, { damping: 8, stiffness: 200 }),
        withTiming(1, { duration: 100 })
      );
    }
  }, [isSelected, glowOpacity, pulseScale]);

  // Fade out non-selected choices
  useEffect(() => {
    if (disabled && !isSelected) {
      opacity.value = withTiming(0.3, { duration: 200 });
      scale.value = withTiming(0.98, { duration: 200 });
    }
  }, [disabled, isSelected, opacity, scale]);

  const handlePressIn = () => {
    if (disabled) return;
    scale.value = withSpring(0.98, { damping: 15, stiffness: 200 });
    glowOpacity.value = withTiming(0.5, { duration: 100 });
  };

  const handlePressOut = () => {
    if (disabled) return;
    scale.value = withSpring(1, { damping: 15, stiffness: 200 });
    if (!isSelected) {
      glowOpacity.value = withTiming(0, { duration: 150 });
    }
  };

  const handlePress = () => {
    if (disabled) return;
    onSelect(choice);
  };

  // Animated styles
  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateX: slideX.value },
      { scale: scale.value * pulseScale.value },
    ],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const borderStyle = useAnimatedStyle(() => {
    // Subtle shimmer for optimal choices
    const shimmer = interpolate(borderGlow.value, [0, 0.5, 1], [0, 0.6, 0.3]);

    return {
      shadowOpacity: shimmer,
      borderColor: isOptimal
        ? `rgba(201, 169, 97, ${0.6 + shimmer * 0.4})`
        : colors.accent,
    };
  });

  return (
    <Animated.View style={[styles.buttonWrapper, containerStyle]}>
      {/* Selection glow background */}
      <Animated.View style={[styles.glowBackground, glowStyle]} />

      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
      >
        <Animated.View
          style={[
            styles.button,
            borderStyle,
            isSelected && styles.buttonSelected,
            disabled && !isSelected && styles.buttonDisabled,
          ]}
        >
          <View style={styles.buttonContent}>
            {/* Optimal choice indicator (subtle) */}
            {(isOptimal || hasXpBonus) && (
              <View style={styles.hintDot} />
            )}

            <Text
              style={[
                styles.buttonText,
                isSelected && styles.buttonTextSelected,
              ]}
            >
              {choice.text}
            </Text>

            <ChevronRight
              size={20}
              color={isSelected ? colors.accentLight : colors.accent}
            />
          </View>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: spacing.sm,
  },
  header: {
    marginBottom: spacing.sm,
  },
  headerText: {
    fontSize: typography.sm,
    fontWeight: typography.semibold,
    color: colors.accent,
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
  },
  choicesContainer: {
    gap: 6,
  },
  buttonWrapper: {
    width: '100%',
  },
  glowBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.accent,
    borderRadius: borderRadius.lg,
    opacity: 0,
    // Blur effect
    transform: [{ scale: 1.05 }],
  },
  button: {
    ...glass.gold,
    borderRadius: borderRadius.lg,
    padding: 12,
    borderWidth: 1.5,
    borderColor: colors.accent,
    // Shadow for shimmer effect
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 12,
  },
  buttonSelected: {
    backgroundColor: 'rgba(201, 169, 97, 0.2)',
    borderColor: colors.accentLight,
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hintDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
    marginRight: spacing.sm,
    opacity: 0.6,
  },
  buttonText: {
    flex: 1,
    fontSize: typography.md,
    color: colors.primary,
    marginRight: spacing.sm,
    lineHeight: typography.md * 1.5,
  },
  buttonTextSelected: {
    color: colors.accentLight,
  },
});
