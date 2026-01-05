import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Avatar } from './Avatar';
import { MissionBadge, MissionBadgeSize } from './MissionBadge';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

interface AvatarWithBadgeProps {
  source?: string | null;
  name?: string;
  size?: AvatarSize;
  style?: ViewStyle;
  highestCompletedWeek?: number; // 0 = no badge, 1-12 = show badge
  showBadge?: boolean;
}

// Map avatar sizes to badge sizes
const AVATAR_TO_BADGE_SIZE: Record<AvatarSize, MissionBadgeSize> = {
  sm: 'xs',
  md: 'sm',
  lg: 'md',
  xl: 'lg',
};

// Map avatar sizes to pixel dimensions for positioning
const AVATAR_DIMENSIONS: Record<AvatarSize, number> = {
  sm: 32,
  md: 40,
  lg: 56,
  xl: 80,
};

// Badge offset from corner (proportional to avatar size)
const BADGE_OFFSETS: Record<AvatarSize, number> = {
  sm: -2,
  md: -2,
  lg: -3,
  xl: -4,
};

export function AvatarWithBadge({
  source,
  name,
  size = 'md',
  style,
  highestCompletedWeek = 0,
  showBadge = true,
}: AvatarWithBadgeProps) {
  const dimension = AVATAR_DIMENSIONS[size];
  const badgeSize = AVATAR_TO_BADGE_SIZE[size];
  const offset = BADGE_OFFSETS[size];

  const shouldShowBadge = showBadge && highestCompletedWeek > 0 && highestCompletedWeek <= 12;

  return (
    <View
      style={[
        styles.container,
        { width: dimension, height: dimension },
        style,
      ]}
    >
      <Avatar source={source} name={name} size={size} />
      {shouldShowBadge && (
        <View style={[styles.badgePosition, { right: offset, bottom: offset }]}>
          <MissionBadge weekNumber={highestCompletedWeek} size={badgeSize} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  badgePosition: {
    position: 'absolute',
  },
});
