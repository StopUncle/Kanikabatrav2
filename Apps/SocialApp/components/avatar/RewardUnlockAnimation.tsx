// Reward Unlock Animation - Celebratory modal when earning a new avatar reward

import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Animated,
  Pressable,
  Dimensions,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Crown, Sparkles, Star, X } from 'lucide-react-native';
import { AvatarReward, tierStyles } from '../../lib/avatarRewards';

interface RewardUnlockAnimationProps {
  reward: AvatarReward | null;
  visible: boolean;
  onClose: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export function RewardUnlockAnimation({
  reward,
  visible,
  onClose,
}: RewardUnlockAnimationProps) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const particleAnims = useRef(
    Array(8)
      .fill(0)
      .map(() => ({
        translateY: new Animated.Value(0),
        translateX: new Animated.Value(0),
        opacity: new Animated.Value(0),
      }))
  ).current;

  useEffect(() => {
    if (visible && reward) {
      // Reset animations
      scaleAnim.setValue(0);
      rotateAnim.setValue(0);
      glowAnim.setValue(0);
      particleAnims.forEach((anim) => {
        anim.translateY.setValue(0);
        anim.translateX.setValue(0);
        anim.opacity.setValue(0);
      });

      // Main scale animation
      Animated.sequence([
        Animated.spring(scaleAnim, {
          toValue: 1.2,
          friction: 4,
          tension: 100,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 6,
          useNativeDriver: true,
        }),
      ]).start();

      // Glow pulse animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0.5,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Particle burst animation
      const particleAnimations = particleAnims.map((anim, index) => {
        const angle = (index / 8) * Math.PI * 2;
        const distance = 100 + Math.random() * 50;

        return Animated.parallel([
          Animated.timing(anim.translateX, {
            toValue: Math.cos(angle) * distance,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(anim.translateY, {
            toValue: Math.sin(angle) * distance,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(anim.opacity, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(anim.opacity, {
              toValue: 0,
              duration: 600,
              delay: 200,
              useNativeDriver: true,
            }),
          ]),
        ]);
      });

      Animated.stagger(50, particleAnimations).start();
    }
  }, [visible, reward]);

  if (!reward) return null;

  const tierStyle = tierStyles[reward.tier];
  const isLegendary = reward.tier === 'legendary';
  const isCharacter = reward.type === 'character';

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <BlurView intensity={40} style={styles.container}>
        <Pressable style={styles.backdrop} onPress={onClose} />

        <Animated.View
          style={[
            styles.card,
            {
              transform: [{ scale: scaleAnim }],
              borderColor: tierStyle.borderColor,
            },
          ]}
        >
          {/* Close button */}
          <Pressable style={styles.closeButton} onPress={onClose}>
            <X size={24} color="#94A3B8" />
          </Pressable>

          {/* Particles */}
          {particleAnims.map((anim, index) => (
            <Animated.View
              key={index}
              style={[
                styles.particle,
                {
                  backgroundColor: tierStyle.borderColor,
                  transform: [
                    { translateX: anim.translateX },
                    { translateY: anim.translateY },
                  ],
                  opacity: anim.opacity,
                },
              ]}
            />
          ))}

          {/* Tier badge */}
          <View style={[styles.tierBadge, { backgroundColor: tierStyle.badgeColor }]}>
            <Text style={styles.tierText}>{tierStyle.label.toUpperCase()}</Text>
          </View>

          {/* Unlock text */}
          <View style={styles.unlockHeader}>
            <Sparkles size={20} color={tierStyle.borderColor} />
            <Text style={styles.unlockText}>
              {isCharacter ? 'CHARACTER UNLOCKED' : 'FRAME UNLOCKED'}
            </Text>
            <Sparkles size={20} color={tierStyle.borderColor} />
          </View>

          {/* Reward preview */}
          <Animated.View
            style={[
              styles.rewardPreview,
              {
                borderColor: tierStyle.borderColor,
                opacity: glowAnim.interpolate({
                  inputRange: [0.5, 1],
                  outputRange: [0.8, 1],
                }),
              },
            ]}
          >
            {isCharacter ? (
              <Crown size={80} color={tierStyle.borderColor} />
            ) : (
              <View
                style={[
                  styles.framePreview,
                  { borderColor: tierStyle.borderColor },
                ]}
              >
                <Star size={40} color={tierStyle.borderColor} />
              </View>
            )}
          </Animated.View>

          {/* Reward name and description */}
          <Text style={[styles.rewardName, { color: tierStyle.borderColor }]}>
            {reward.name}
          </Text>
          <Text style={styles.rewardDescription}>{reward.description}</Text>

          {/* Legendary extra flair */}
          {isLegendary && (
            <View style={styles.legendaryBanner}>
              <Text style={styles.legendaryText}>
                Only the most skilled earn this reward
              </Text>
            </View>
          )}

          {/* Apply button */}
          <Pressable
            style={[styles.applyButton, { backgroundColor: tierStyle.borderColor }]}
            onPress={onClose}
          >
            <Text style={styles.applyButtonText}>Amazing!</Text>
          </Pressable>
        </Animated.View>
      </BlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  card: {
    width: SCREEN_WIDTH * 0.85,
    backgroundColor: '#1A1A2E',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    overflow: 'visible',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
  tierBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
  },
  tierText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
  },
  unlockHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  unlockText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
  },
  rewardPreview: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginBottom: 24,
  },
  framePreview: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  rewardName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  rewardDescription: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  legendaryBanner: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 24,
  },
  legendaryText: {
    color: '#F59E0B',
    fontSize: 12,
    fontStyle: 'italic',
  },
  applyButton: {
    paddingHorizontal: 48,
    paddingVertical: 14,
    borderRadius: 12,
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  particle: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    top: '50%',
    left: '50%',
  },
});

export default RewardUnlockAnimation;
