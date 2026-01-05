import React, { useRef } from 'react';
import {
  StyleSheet,
  Text,
  Pressable,
  Animated,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, borderRadius, gradients, shadows, typography, animations } from '../../lib/theme';
import { haptics } from '../../lib/haptics';

type GradientType = 'primary' | 'subtle';
type ButtonSize = 'sm' | 'md' | 'lg';

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  gradient?: GradientType;
  size?: ButtonSize;
  glow?: boolean;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

const sizeConfig = {
  sm: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    fontSize: typography.sm,
    iconSize: 16,
  },
  md: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    fontSize: typography.md,
    iconSize: 18,
  },
  lg: {
    paddingVertical: spacing.md + 4,
    paddingHorizontal: spacing.xl,
    fontSize: typography.lg,
    iconSize: 20,
  },
};

export function GradientButton({
  title,
  onPress,
  gradient = 'primary',
  size = 'md',
  glow = true,
  loading = false,
  disabled = false,
  icon,
  style,
  textStyle,
  fullWidth = false,
}: GradientButtonProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const config = sizeConfig[size];

  const gradientColors = gradient === 'primary'
    ? gradients.goldPrimary
    : gradients.goldSubtle;

  const handlePressIn = () => {
    if (disabled || loading) return;
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
      ...animations.springBouncy,
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
    if (disabled || loading) return;
    haptics.medium();
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled, busy: loading }}
    >
      <Animated.View
        style={[
          glow && !disabled && shadows.glow,
          { transform: [{ scale: scaleAnim }] },
          fullWidth && styles.fullWidth,
          style,
        ]}
      >
        <LinearGradient
          colors={disabled ? ['#666666', '#555555', '#666666'] : gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.gradient,
            {
              paddingVertical: config.paddingVertical,
              paddingHorizontal: config.paddingHorizontal,
            },
          ]}
        >
          {loading ? (
            <ActivityIndicator color={colors.background} size="small" />
          ) : (
            <>
              {icon}
              <Text
                style={[
                  styles.text,
                  { fontSize: config.fontSize },
                  icon ? styles.textWithIcon : null,
                  textStyle,
                ]}
              >
                {title}
              </Text>
            </>
          )}
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  gradient: {
    borderRadius: borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.background,
    fontWeight: typography.bold,
    textAlign: 'center',
  },
  textWithIcon: {
    marginLeft: spacing.sm,
  },
  fullWidth: {
    width: '100%',
  },
});
