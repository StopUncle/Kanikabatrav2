// Avatar With Rewards - Displays avatar with earned frames and character avatars

import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { User } from 'lucide-react-native';
import { useGamificationStore } from '../../stores/gamificationStore';
import { getRewardById, AvatarReward, UserAvatarConfig } from '../../lib/avatarRewards';
import { AvatarFrame } from './AvatarFrame';

interface AvatarWithRewardsProps {
  size?: number;
  avatarUrl?: string | null;
  showFrame?: boolean;
  // For displaying OTHER users (bypass store):
  userAvatarConfig?: UserAvatarConfig | null;
  // If true, use current user from store (default behavior)
  isCurrentUser?: boolean;
}

export function AvatarWithRewards({
  size = 64,
  avatarUrl,
  showFrame = true,
  userAvatarConfig,
  isCurrentUser = false,
}: AvatarWithRewardsProps) {
  // Get current user's config from store (only used if isCurrentUser or no userAvatarConfig)
  const storeConfig = useGamificationStore((state) => state.avatarConfig);

  // Determine which config to use:
  // - If userAvatarConfig is provided, use it (other user)
  // - If isCurrentUser is true, use store config (current user)
  // - Otherwise, no rewards shown (basic avatar)
  const config = userAvatarConfig ?? (isCurrentUser ? storeConfig : null);

  // Get active frame if any
  const activeFrame = config?.activeFrame
    ? getRewardById(config.activeFrame)
    : undefined;

  // Get active character if any
  const activeCharacter = config?.activeCharacter
    ? getRewardById(config.activeCharacter)
    : undefined;

  // Determine what to display as the avatar content
  const renderAvatarContent = () => {
    // If user has an active character avatar, use that
    if (activeCharacter) {
      return (
        <Image
          source={{ uri: activeCharacter.assetPath }}
          style={[styles.avatarImage, { width: size * 0.9, height: size * 0.9 }]}
        />
      );
    }

    // Otherwise use their photo or default
    if (avatarUrl) {
      return (
        <Image
          source={{ uri: avatarUrl }}
          style={[styles.avatarImage, { width: size * 0.9, height: size * 0.9 }]}
        />
      );
    }

    // Default avatar icon
    return (
      <View
        style={[
          styles.defaultAvatar,
          { width: size * 0.9, height: size * 0.9, borderRadius: (size * 0.9) / 2 },
        ]}
      >
        <User size={size * 0.5} color="#64748B" />
      </View>
    );
  };

  // If we have an active frame and showFrame is true, wrap content in frame
  if (activeFrame && showFrame) {
    return (
      <AvatarFrame frame={activeFrame} size={size}>
        {renderAvatarContent()}
      </AvatarFrame>
    );
  }

  // No frame - just render avatar with basic styling
  return (
    <View
      style={[
        styles.basicContainer,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    >
      {renderAvatarContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  basicContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1A2E',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#2D2D44',
  },
  avatarImage: {
    borderRadius: 999,
  },
  defaultAvatar: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2D2D44',
  },
});

export default AvatarWithRewards;
