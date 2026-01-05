import React, { useRef } from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  Animated,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, borderRadius, typography, gradients, shadows, animations } from '../../lib/theme';
import { haptics } from '../../lib/haptics';

interface ButtonProps {
  title?: string;
  children?: React.ReactNode;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'gradient' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  glow?: boolean;
  icon?: React.ReactNode;
}

export function Button({
  title,
  children,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  glow = false,
  icon,
}: ButtonProps) {
  const buttonText = title || (typeof children === 'string' ? children : null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

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

  const isGradient = variant === 'gradient';

  const buttonStyles = [
    styles.base,
    !isGradient && styles[variant],
    styles[`size_${size}`],
    disabled && styles.disabled,
    glow && !disabled && shadows.glow,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`text_${variant}`],
    styles[`text_${size}`],
    disabled && styles.textDisabled,
  ];

  const renderContent = () => (
    <>
      {loading ? (
        <ActivityIndicator
          color={variant === 'gradient' || variant === 'primary' ? colors.background : colors.primary}
          size="small"
        />
      ) : (
        <View style={styles.contentRow}>
          {icon}
          {buttonText && (
            <Text style={[textStyles, icon ? styles.textWithIcon : null]}>{buttonText}</Text>
          )}
          {!buttonText && typeof children !== 'string' && children}
        </View>
      )}
    </>
  );

  if (isGradient) {
    return (
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        accessibilityRole="button"
        accessibilityLabel={buttonText || 'Button'}
        accessibilityState={{ disabled, busy: loading }}
      >
        <Animated.View
          style={[
            glow && !disabled && shadows.glow,
            { transform: [{ scale: scaleAnim }] },
            style,
          ]}
        >
          <LinearGradient
            colors={disabled ? ['#666666', '#555555', '#666666'] : gradients.goldPrimary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.base, styles[`size_${size}`], styles.gradientContainer]}
          >
            {renderContent()}
          </LinearGradient>
        </Animated.View>
      </Pressable>
    );
  }

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
      <Animated.View style={[...buttonStyles, { transform: [{ scale: scaleAnim }] }]}>
        {renderContent()}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.md,
  },

  // Variants
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.accent,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  gradient: {
    // Handled by LinearGradient
  },
  gradientContainer: {
    flexDirection: 'row',
  },

  // Content layout
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWithIcon: {
    marginLeft: spacing.sm,
  },

  // Sizes
  size_sm: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    minHeight: 36,
  },
  size_md: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    minHeight: 48,
  },
  size_lg: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    minHeight: 56,
  },

  // States
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.5,
  },

  // Text styles
  text: {
    fontWeight: typography.semibold,
  },
  text_primary: {
    color: colors.background,
  },
  text_secondary: {
    color: colors.primary,
  },
  text_outline: {
    color: colors.accent,
  },
  text_ghost: {
    color: colors.primary,
  },
  text_gradient: {
    color: colors.background,
    fontWeight: typography.bold,
  },
  text_sm: {
    fontSize: typography.sm,
  },
  text_md: {
    fontSize: typography.md,
  },
  text_lg: {
    fontSize: typography.lg,
  },
  textDisabled: {
    opacity: 0.7,
  },
});
