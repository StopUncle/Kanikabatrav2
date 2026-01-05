import React, { useRef } from 'react';
import { View, StyleSheet, ViewStyle, Pressable, Animated, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { colors, spacing, borderRadius, shadows, glass, animations } from '../../lib/theme';
import { haptics } from '../../lib/haptics';

type CardVariant = 'default' | 'elevated' | 'glass' | 'glassGold';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  elevated?: boolean;
  variant?: CardVariant;
  glow?: boolean;
  animated?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export function Card({
  children,
  style,
  onPress,
  elevated = false,
  variant = 'default',
  glow = false,
  animated = true,
  accessibilityLabel,
  accessibilityHint,
}: CardProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Handle variant - elevated prop takes precedence for backwards compatibility
  const effectiveVariant = elevated ? 'elevated' : variant;
  const isGlass = effectiveVariant === 'glass' || effectiveVariant === 'glassGold';
  const glassStyle = effectiveVariant === 'glassGold' ? glass.gold : glass.medium;

  const handlePressIn = () => {
    if (!animated) return;
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
      ...animations.spring,
    }).start();
  };

  const handlePressOut = () => {
    if (!animated) return;
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      ...animations.spring,
    }).start();
  };

  const cardStyle = [
    styles.card,
    effectiveVariant === 'elevated' && styles.elevated,
    effectiveVariant === 'elevated' && shadows.md,
    isGlass && styles.glass,
    glow && (effectiveVariant === 'glassGold' ? shadows.glowIntense : shadows.glow),
    style,
  ];

  // Use blur only on iOS for performance
  const useBlur = isGlass && Platform.OS === 'ios';

  const renderContent = () => {
    if (isGlass) {
      return (
        <>
          {useBlur ? (
            <BlurView
              intensity={40}
              tint="dark"
              style={[
                StyleSheet.absoluteFill,
                styles.blurView,
                { borderColor: glassStyle.borderColor, borderWidth: glassStyle.borderWidth },
              ]}
            />
          ) : (
            <View
              style={[
                StyleSheet.absoluteFill,
                styles.blurView,
                {
                  backgroundColor: glassStyle.backgroundColor,
                  borderColor: glassStyle.borderColor,
                  borderWidth: glassStyle.borderWidth,
                },
              ]}
            />
          )}
          <View style={styles.glassContent}>{children}</View>
        </>
      );
    }
    return children;
  };

  if (onPress) {
    return (
      <Pressable
        onPress={() => {
          haptics.light();
          onPress();
        }}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
      >
        <Animated.View style={[...cardStyle, { transform: [{ scale: scaleAnim }] }]}>
          {renderContent()}
        </Animated.View>
      </Pressable>
    );
  }

  return (
    <Animated.View style={[...cardStyle, animated && { transform: [{ scale: scaleAnim }] }]}>
      {renderContent()}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  elevated: {
    backgroundColor: colors.surfaceElevated,
    borderWidth: 0,
  },
  glass: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    overflow: 'hidden',
    position: 'relative',
  },
  blurView: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  glassContent: {
    position: 'relative',
    zIndex: 1,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
});
