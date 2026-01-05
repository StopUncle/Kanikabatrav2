import React from 'react';
import { View, Image, Text, StyleSheet, ViewStyle, ImageStyle } from 'react-native';
import { colors, typography } from '../../lib/theme';

interface AvatarProps {
  source?: string | null;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  style?: ViewStyle;
}

const sizes = {
  sm: 32,
  md: 40,
  lg: 56,
  xl: 80,
};

const fontSizes = {
  sm: typography.xs,
  md: typography.sm,
  lg: typography.lg,
  xl: typography.xl,
};

export function Avatar({ source, name, size = 'md', style }: AvatarProps) {
  const dimension = sizes[size];

  const getInitials = (name?: string) => {
    if (!name || name.trim().length === 0) return '?';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2 && parts[0].length > 0 && parts[1].length > 0) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return parts[0]?.[0]?.toUpperCase() || '?';
  };

  const containerStyle = {
    width: dimension,
    height: dimension,
    borderRadius: dimension / 2,
  };

  const accessibilityLabel = name ? `${name}'s avatar` : 'User avatar';

  if (source) {
    return (
      <Image
        source={{ uri: source }}
        style={[styles.image, containerStyle as ImageStyle]}
        accessibilityRole="image"
        accessibilityLabel={accessibilityLabel}
      />
    );
  }

  return (
    <View
      style={[styles.fallback, containerStyle, style]}
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel}
    >
      <Text style={[styles.initials, { fontSize: fontSizes[size] }]}>
        {getInitials(name)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    backgroundColor: colors.surface,
  },
  fallback: {
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: colors.secondary,
    fontWeight: typography.semibold,
  },
});
