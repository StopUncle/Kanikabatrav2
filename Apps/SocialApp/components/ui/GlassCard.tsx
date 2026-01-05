import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Pressable,
  Animated,
  Platform,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { spacing, borderRadius, glass, shadows, animations } from '../../lib/theme';
import { haptics } from '../../lib/haptics';

type GlassVariant = 'light' | 'medium' | 'dark' | 'gold';

interface GlassCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  variant?: GlassVariant;
  glow?: boolean;
  blurIntensity?: number;
}

export function GlassCard({
  children,
  style,
  onPress,
  variant = 'medium',
  glow = false,
  blurIntensity = 40,
}: GlassCardProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const glassStyle = glass[variant];

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
      ...animations.spring,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      ...animations.spring,
    }).start();
  };

  const handlePress = () => {
    haptics.light();
    onPress?.();
  };

  const cardStyle = [
    styles.card,
    glow && (variant === 'gold' ? shadows.glowIntense : shadows.glow),
    style,
  ];

  // On Android, BlurView performance can be poor, so we use a solid fallback
  const useBlur = Platform.OS === 'ios';

  const content = (
    <Animated.View style={[cardStyle, { transform: [{ scale: scaleAnim }] }]}>
      {useBlur ? (
        <BlurView
          intensity={blurIntensity}
          tint="dark"
          style={[
            StyleSheet.absoluteFill,
            styles.blur,
            {
              borderColor: glassStyle.borderColor,
              borderWidth: glassStyle.borderWidth,
            },
          ]}
        />
      ) : (
        <View
          style={[
            StyleSheet.absoluteFill,
            styles.blur,
            {
              backgroundColor: glassStyle.backgroundColor,
              borderColor: glassStyle.borderColor,
              borderWidth: glassStyle.borderWidth,
            },
          ]}
        />
      )}
      <View style={styles.content}>{children}</View>
    </Animated.View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {content}
      </Pressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    position: 'relative',
  },
  blur: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  content: {
    padding: spacing.md,
    position: 'relative',
    zIndex: 1,
  },
});
