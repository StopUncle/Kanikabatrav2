// Scenario Outcome Screen
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  StatusBar,
  ScrollView,
  Share,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Home, RotateCcw, ChevronRight, Share2, Crown, AlertTriangle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  colors,
  spacing,
  borderRadius,
  typography,
  glass,
} from '../../../lib/theme';
import { haptics } from '../../../lib/haptics';
import { useSimulatorStore } from '../../../stores/simulatorStore';
import { simulatorService } from '../../../services/simulatorService';
import { OutcomeCard } from '../../../components/simulator';
import { CardUnlockAnimation } from '../../../components/cards';
import { RewardUnlockAnimation } from '../../../components/avatar/RewardUnlockAnimation';
import { getCardById } from '../../../lib/psychologyCards';
import { getRewardById } from '../../../lib/avatarRewards';
import type { AvatarReward } from '../../../lib/avatarRewards';

export default function ScenarioOutcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { scenarioId } = useLocalSearchParams<{ scenarioId: string }>();
  const [showCardUnlock, setShowCardUnlock] = useState(false);
  const [showAvatarReward, setShowAvatarReward] = useState(false);
  const [pendingAvatarRewards, setPendingAvatarRewards] = useState<AvatarReward[]>([]);
  const [currentAvatarReward, setCurrentAvatarReward] = useState<AvatarReward | null>(null);
  const [avatarRewardsEarned, setAvatarRewardsEarned] = useState(false);

  const { activeScenario, outcomeAnalysis, restartScenario, exitScenario } =
    useSimulatorStore();

  // Get the earned card definition if any
  const earnedCard = outcomeAnalysis?.cardEarned
    ? getCardById(outcomeAnalysis.cardEarned)
    : null;

  // Build queue of avatar rewards to show
  useEffect(() => {
    if (!outcomeAnalysis) return;

    const rewards: AvatarReward[] = [];

    // Add scenario-specific avatar reward
    if (outcomeAnalysis.avatarRewardEarned) {
      const reward = getRewardById(outcomeAnalysis.avatarRewardEarned);
      if (reward) rewards.push(reward);
    }

    if (rewards.length > 0) {
      setPendingAvatarRewards(rewards);
      setAvatarRewardsEarned(true);
    }
  }, [outcomeAnalysis]);

  // Guard - redirect if no outcome
  useEffect(() => {
    if (!outcomeAnalysis && !activeScenario) {
      router.replace('/(simulator)');
    }
  }, [outcomeAnalysis, activeScenario, router]);

  // Show animations in sequence: Card first, then avatar rewards
  useEffect(() => {
    const startDelay = 800; // Let outcome screen render first

    if (earnedCard) {
      // Show card unlock first
      const timer = setTimeout(() => {
        setShowCardUnlock(true);
      }, startDelay);
      return () => clearTimeout(timer);
    } else if (pendingAvatarRewards.length > 0) {
      // No card, show avatar rewards directly
      const timer = setTimeout(() => {
        showNextAvatarReward();
      }, startDelay);
      return () => clearTimeout(timer);
    }
  }, [earnedCard, pendingAvatarRewards]);

  // Show next avatar reward from queue
  const showNextAvatarReward = () => {
    if (pendingAvatarRewards.length > 0) {
      const [next, ...remaining] = pendingAvatarRewards;
      setCurrentAvatarReward(next);
      setPendingAvatarRewards(remaining);
      setShowAvatarReward(true);
    }
  };

  // Handle card unlock close - chain to avatar rewards
  const handleCardUnlockClose = () => {
    setShowCardUnlock(false);
    // Small delay then show avatar rewards if any
    if (pendingAvatarRewards.length > 0) {
      setTimeout(showNextAvatarReward, 300);
    }
  };

  // Handle avatar reward close - chain to next or finish
  const handleAvatarRewardClose = () => {
    setShowAvatarReward(false);
    setCurrentAvatarReward(null);
    // Small delay then show next avatar reward if any
    if (pendingAvatarRewards.length > 0) {
      setTimeout(showNextAvatarReward, 300);
    }
  };

  const handleReplay = async () => {
    haptics.medium();
    await restartScenario();
    router.replace(`/(simulator)/${scenarioId}/play`);
  };

  const handleHome = () => {
    haptics.light();
    exitScenario();
    router.replace('/(simulator)');
  };

  const handleNextScenario = () => {
    haptics.medium();
    exitScenario();

    // University level progression - navigate to next level in sequence
    const levelProgression: Record<string, string | null> = {
      'university-level-1': 'university-level-2',
      'university-level-2': 'university-level-3',
      'university-level-3': 'university-level-4',
      'university-level-4': null, // Level 5 coming soon
    };

    const nextLevel = scenarioId ? levelProgression[scenarioId] : null;

    if (nextLevel) {
      router.replace(`/(simulator)/${nextLevel}`);
    } else {
      // No next level or not a university scenario - go to selection
      router.replace('/(simulator)');
    }
  };

  const handleShareVictory = async () => {
    haptics.light();
    try {
      await Share.share({
        message: `I just completed "${activeScenario?.title}" in The Dark Mirror simulator! 🎯`,
        title: 'Mission Complete',
      });
    } catch (error) {
      // User cancelled or share failed silently
    }
  };

  const handleCustomizeAvatar = () => {
    haptics.light();
    exitScenario();
    router.push('/(profile)/avatar-customizer');
  };

  if (!outcomeAnalysis || !activeScenario) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.loadingText}>Loading results...</Text>
      </View>
    );
  }

  // Check if this is a failure outcome (binary pass/fail)
  const isFailure = outcomeAnalysis.outcome === 'failed';
  const isSuccess = outcomeAnalysis.outcome === 'passed';

  // Background color based on outcome
  const outcomeGradient: readonly [string, string] =
    isSuccess
      ? (['rgba(76, 175, 80, 0.15)', 'transparent'] as const)
      : (['rgba(229, 69, 69, 0.15)', 'transparent'] as const);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Background gradient based on outcome */}
      <LinearGradient
        colors={outcomeGradient}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.5 }}
      />

      <View style={[styles.content, { paddingTop: insets.top + spacing.md }]}>
        {/* Outcome card */}
        <OutcomeCard
          analysis={outcomeAnalysis}
          scenarioTitle={activeScenario.title}
        />
      </View>

      {/* Action buttons */}
      <View
        style={[styles.actionBar, { paddingBottom: insets.bottom + spacing.md }]}
      >
        {/* Failure message - shown when outcome is bad */}
        {isFailure && (
          <View style={styles.failureMessage}>
            <AlertTriangle size={18} color="#E54545" />
            <Text style={styles.failureMessageText}>
              Master this challenge to unlock the next one
            </Text>
          </View>
        )}

        <View style={styles.buttonRow}>
          {/* Home button */}
          <Pressable
            onPress={handleHome}
            style={({ pressed }) => [
              styles.iconButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Home size={20} color={colors.secondary} />
          </Pressable>

          {/* On failure: Try Again is primary, no Next button */}
          {isFailure ? (
            <Pressable
              onPress={handleReplay}
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <RotateCcw size={18} color={colors.background} />
              <Text style={styles.primaryButtonText}>Try Again</Text>
            </Pressable>
          ) : (
            <>
              {/* Replay button (secondary) */}
              <Pressable
                onPress={handleReplay}
                style={({ pressed }) => [
                  styles.secondaryButton,
                  pressed && styles.buttonPressed,
                ]}
              >
                <RotateCcw size={18} color={colors.accent} />
                <Text style={styles.secondaryButtonText}>Replay</Text>
              </Pressable>

              {/* Next scenario button */}
              <Pressable
                onPress={handleNextScenario}
                style={({ pressed }) => [
                  styles.primaryButton,
                  pressed && styles.buttonPressed,
                ]}
              >
                <Text style={styles.primaryButtonText}>Next</Text>
                <ChevronRight size={18} color={colors.background} />
              </Pressable>
            </>
          )}
        </View>

        {/* Share encouragement for good outcomes */}
        {isSuccess && (
          <Pressable
            onPress={handleShareVictory}
            style={({ pressed }) => [
              styles.shareButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Share2 size={16} color={colors.accent} />
            <Text style={styles.shareText}>Share your victory</Text>
          </Pressable>
        )}

        {/* Customize avatar hint when avatar rewards were earned */}
        {avatarRewardsEarned && !showAvatarReward && !showCardUnlock && (
          <Pressable
            onPress={handleCustomizeAvatar}
            style={({ pressed }) => [
              styles.customizeHint,
              pressed && styles.buttonPressed,
            ]}
          >
            <Crown size={16} color={colors.accent} />
            <Text style={styles.customizeText}>Customize your avatar</Text>
            <ChevronRight size={16} color={colors.accent} />
          </Pressable>
        )}
      </View>

      {/* Card unlock animation modal */}
      <CardUnlockAnimation
        card={earnedCard}
        accuracy={100} // Pass 100 for passed outcomes (accuracy removed)
        visible={showCardUnlock}
        onClose={handleCardUnlockClose}
      />

      {/* Avatar reward unlock animation modal */}
      <RewardUnlockAnimation
        reward={currentAvatarReward}
        visible={showAvatarReward}
        onClose={handleAvatarRewardClose}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: typography.md,
    color: colors.secondary,
  },
  content: {
    flex: 1,
  },
  actionBar: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  failureMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: 'rgba(229, 69, 69, 0.1)',
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(229, 69, 69, 0.3)',
  },
  failureMessageText: {
    fontSize: typography.sm,
    color: '#E54545',
    fontWeight: typography.medium as any,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: 'transparent',
    paddingVertical: spacing.md,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  secondaryButtonText: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.accent,
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.accent,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.full,
  },
  primaryButtonText: {
    fontSize: typography.md,
    fontWeight: typography.bold,
    color: colors.background,
  },
  buttonPressed: {
    opacity: 0.9,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
  },
  shareText: {
    fontSize: typography.sm,
    color: colors.accent,
  },
  customizeHint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    backgroundColor: colors.accentMuted,
    borderRadius: borderRadius.md,
    marginTop: spacing.md,
  },
  customizeText: {
    fontSize: typography.sm,
    color: colors.accent,
    fontWeight: typography.medium,
  },
});
