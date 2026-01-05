// Card Unlock Animation
// Simple reveal when earning a new psychology card

import React from 'react';
import { View, Text, StyleSheet, Modal, Dimensions, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles } from 'lucide-react-native';
import { colors, spacing, typography } from '../../lib/theme';
import { PsychologyCard } from './PsychologyCard';
import {
  type PsychologyCardDefinition,
  RARITY_CONFIG,
} from '../../lib/psychologyCards';
import { haptics } from '../../lib/haptics';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface CardUnlockAnimationProps {
  card: PsychologyCardDefinition | null;
  accuracy?: number;
  visible: boolean;
  onClose: () => void;
}

export function CardUnlockAnimation({
  card,
  accuracy = 0,
  visible,
  onClose,
}: CardUnlockAnimationProps) {
  const handleClose = () => {
    haptics.light();
    onClose();
  };

  if (!card) return null;

  const rarityConfig = RARITY_CONFIG[card.rarity];
  const isPerfect = accuracy === 100;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      <Pressable style={styles.container} onPress={handleClose}>
        {/* Backdrop */}
        <LinearGradient
          colors={['rgba(0,0,0,0.95)', 'rgba(0,0,0,0.90)', 'rgba(0,0,0,0.95)']}
          style={StyleSheet.absoluteFill}
        />

        {/* Center content */}
        <View style={styles.content}>
          {/* Glow behind card */}
          <View
            style={[
              styles.glowContainer,
              {
                shadowColor: rarityConfig.glowColor,
                shadowOpacity: rarityConfig.glowIntensity,
                shadowRadius: 60,
                backgroundColor: rarityConfig.glowColor,
              },
            ]}
          />

          {/* Title */}
          <View style={styles.titleContainer}>
            <View style={styles.titleRow}>
              <Sparkles size={20} color={rarityConfig.labelColor} />
              <Text style={[styles.title, { color: rarityConfig.labelColor }]}>
                NEW CARD UNLOCKED
              </Text>
              <Sparkles size={20} color={rarityConfig.labelColor} />
            </View>
          </View>

          {/* Card */}
          <View style={styles.cardContainer}>
            <PsychologyCard
              card={card}
              earned
              earnedData={{
                cardId: card.id,
                earnedAt: new Date().toISOString(),
                accuracy,
                isPerfect,
              }}
              size="large"
              showStats
              animated={false}
            />
          </View>

          {/* Details */}
          <View style={styles.detailsContainer}>
            <Text style={styles.accuracyLabel}>
              Scenario Accuracy: {accuracy}%
              {isPerfect && ' - PERFECT!'}
            </Text>
            <Text style={styles.tapHint}>Tap anywhere to continue</Text>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  glowContainer: {
    position: 'absolute',
    width: SCREEN_WIDTH * 0.5,
    height: SCREEN_WIDTH * 0.5,
    borderRadius: SCREEN_WIDTH * 0.25,
    opacity: 0.3,
  },
  titleContainer: {
    marginBottom: spacing.lg,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    letterSpacing: 2,
  },
  cardContainer: {
    alignItems: 'center',
  },
  detailsContainer: {
    marginTop: spacing.lg,
    alignItems: 'center',
    gap: spacing.sm,
  },
  accuracyLabel: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  tapHint: {
    fontSize: typography.sm,
    color: colors.tertiary,
  },
});
