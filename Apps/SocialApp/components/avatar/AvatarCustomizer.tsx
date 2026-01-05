// Avatar Customizer - Mix and match frames and character avatars

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Pressable,
  Dimensions,
} from 'react-native';
import { Check, Lock, Crown, Frame } from 'lucide-react-native';
import { useGamificationStore } from '../../stores/gamificationStore';
import {
  avatarRewards,
  AvatarReward,
  AvatarRewardTier,
  tierStyles,
  getRewardById,
} from '../../lib/avatarRewards';
import { AvatarWithRewards } from './AvatarWithRewards';
import { AvatarFrame } from './AvatarFrame';

interface AvatarCustomizerProps {
  avatarUrl?: string | null;
}

type TabType = 'frames' | 'characters';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ITEM_SIZE = (SCREEN_WIDTH - 64) / 3;

export function AvatarCustomizer({ avatarUrl }: AvatarCustomizerProps) {
  const [activeTab, setActiveTab] = useState<TabType>('frames');
  const { avatarConfig, earnedAvatarRewards, updateAvatarConfig } =
    useGamificationStore();

  // Get all rewards with earned status
  const frames = avatarRewards.filter((r) => r.type === 'frame');
  const characters = avatarRewards.filter((r) => r.type === 'character');

  const handleSelectFrame = async (reward: AvatarReward) => {
    if (!earnedAvatarRewards.includes(reward.id)) return;

    // Toggle off if already selected
    if (avatarConfig.activeFrame === reward.id) {
      await updateAvatarConfig({ activeFrame: undefined });
    } else {
      await updateAvatarConfig({ activeFrame: reward.id });
    }
  };

  const handleSelectCharacter = async (reward: AvatarReward) => {
    if (!earnedAvatarRewards.includes(reward.id)) return;

    // Toggle off if already selected
    if (avatarConfig.activeCharacter === reward.id) {
      await updateAvatarConfig({ activeCharacter: undefined });
    } else {
      await updateAvatarConfig({ activeCharacter: reward.id });
    }
  };

  const renderRewardItem = (reward: AvatarReward, isSelected: boolean) => {
    const isEarned = earnedAvatarRewards.includes(reward.id);
    const tierStyle = tierStyles[reward.tier];

    return (
      <Pressable
        key={reward.id}
        style={[
          styles.rewardItem,
          isSelected && { borderColor: tierStyle.borderColor, borderWidth: 2 },
          !isEarned && styles.lockedItem,
        ]}
        onPress={() =>
          reward.type === 'frame'
            ? handleSelectFrame(reward)
            : handleSelectCharacter(reward)
        }
        disabled={!isEarned}
      >
        {/* Preview circle */}
        <View
          style={[
            styles.previewCircle,
            { borderColor: isEarned ? tierStyle.borderColor : '#2D2D44' },
          ]}
        >
          {reward.type === 'frame' ? (
            <Frame size={24} color={isEarned ? tierStyle.borderColor : '#4A4A6A'} />
          ) : (
            <Crown size={24} color={isEarned ? tierStyle.borderColor : '#4A4A6A'} />
          )}
        </View>

        {/* Lock overlay for unearned */}
        {!isEarned && (
          <View style={styles.lockOverlay}>
            <Lock size={20} color="#64748B" />
          </View>
        )}

        {/* Selected checkmark */}
        {isSelected && isEarned && (
          <View style={[styles.selectedBadge, { backgroundColor: tierStyle.borderColor }]}>
            <Check size={12} color="#FFFFFF" />
          </View>
        )}

        {/* Tier indicator */}
        <View style={[styles.tierDot, { backgroundColor: tierStyle.borderColor }]} />

        {/* Name */}
        <Text
          style={[styles.rewardName, !isEarned && styles.lockedText]}
          numberOfLines={1}
        >
          {reward.name}
        </Text>
      </Pressable>
    );
  };

  const renderTierSection = (tier: AvatarRewardTier, items: AvatarReward[]) => {
    const tierStyle = tierStyles[tier];
    const tierItems = items.filter((r) => r.tier === tier);

    if (tierItems.length === 0) return null;

    return (
      <View key={tier} style={styles.tierSection}>
        <View style={styles.tierHeader}>
          <View style={[styles.tierBadge, { backgroundColor: tierStyle.badgeColor }]}>
            <Text style={styles.tierLabel}>{tierStyle.label}</Text>
          </View>
          <Text style={styles.tierCount}>
            {tierItems.filter((r) => earnedAvatarRewards.includes(r.id)).length}/
            {tierItems.length}
          </Text>
        </View>

        <View style={styles.rewardGrid}>
          {tierItems.map((reward) =>
            renderRewardItem(
              reward,
              activeTab === 'frames'
                ? avatarConfig.activeFrame === reward.id
                : avatarConfig.activeCharacter === reward.id
            )
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Preview */}
      <View style={styles.previewSection}>
        <AvatarWithRewards size={120} avatarUrl={avatarUrl} />
        <Text style={styles.previewLabel}>Your Avatar</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <Pressable
          style={[styles.tab, activeTab === 'frames' && styles.activeTab]}
          onPress={() => setActiveTab('frames')}
        >
          <Frame size={18} color={activeTab === 'frames' ? '#C9A961' : '#64748B'} />
          <Text
            style={[styles.tabText, activeTab === 'frames' && styles.activeTabText]}
          >
            Frames
          </Text>
        </Pressable>

        <Pressable
          style={[styles.tab, activeTab === 'characters' && styles.activeTab]}
          onPress={() => setActiveTab('characters')}
        >
          <Crown size={18} color={activeTab === 'characters' ? '#C9A961' : '#64748B'} />
          <Text
            style={[
              styles.tabText,
              activeTab === 'characters' && styles.activeTabText,
            ]}
          >
            Characters
          </Text>
        </Pressable>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'frames' ? (
          <>
            {renderTierSection('common', frames)}
            {renderTierSection('rare', frames)}
            {renderTierSection('epic', frames)}
            {renderTierSection('legendary', frames)}
          </>
        ) : (
          <>
            {renderTierSection('legendary', characters)}
            <View style={styles.emptyMessage}>
              <Crown size={32} color="#4A4A6A" />
              <Text style={styles.emptyText}>
                Character avatars are legendary rewards.{'\n'}
                Achieve 100% perfect runs on the hardest scenarios to unlock them.
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D1A',
  },
  previewSection: {
    alignItems: 'center',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#2D2D44',
  },
  previewLabel: {
    color: '#94A3B8',
    fontSize: 14,
    marginTop: 12,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#1A1A2E',
  },
  activeTab: {
    backgroundColor: 'rgba(201, 169, 97, 0.15)',
    borderWidth: 1,
    borderColor: '#C9A961',
  },
  tabText: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#C9A961',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  tierSection: {
    marginBottom: 24,
  },
  tierHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  tierBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tierLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  tierCount: {
    color: '#64748B',
    fontSize: 12,
  },
  rewardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  rewardItem: {
    width: ITEM_SIZE - 8,
    aspectRatio: 1,
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#2D2D44',
  },
  lockedItem: {
    opacity: 0.5,
  },
  previewCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginBottom: 8,
  },
  lockOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  selectedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tierDot: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  rewardName: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  lockedText: {
    color: '#4A4A6A',
  },
  emptyMessage: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    marginTop: 16,
  },
  emptyText: {
    color: '#64748B',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 20,
  },
});

export default AvatarCustomizer;
