// Advisor Header Component
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Sparkles, RotateCcw, Clock } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../lib/theme';
import { haptics } from '../../lib/haptics';
import type { SubscriptionTier } from '../../stores/authStore';

interface AdvisorHeaderProps {
  tier: SubscriptionTier;
  messagesRemaining: number;
  onNewSession: () => void;
  showHistory?: boolean;
}

export function AdvisorHeader({
  tier,
  messagesRemaining,
  onNewSession,
  showHistory = false,
}: AdvisorHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    haptics.light();
    router.replace('/(tabs)');
  };

  const handleNewSession = () => {
    haptics.medium();
    onNewSession();
  };

  const handleHistory = () => {
    haptics.light();
    router.push('/(advisor)/history');
  };

  const getRateLimitColor = () => {
    if (messagesRemaining <= 0) return colors.error;
    if (messagesRemaining <= 2) return colors.warning;
    return colors.accent;
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleBack} style={styles.backButton}>
        <ChevronLeft size={24} color={colors.primary} />
      </Pressable>

      <View style={styles.titleContainer}>
        <View style={styles.titleRow}>
          <Sparkles size={20} color={colors.accent} />
          <Text style={styles.title}>Pocket Kanika</Text>
        </View>
        {tier !== 'vip' && (
          <View style={styles.limitContainer}>
            <Clock size={12} color={getRateLimitColor()} />
            <Text style={[styles.limitText, { color: getRateLimitColor() }]}>
              {messagesRemaining} left this hour
            </Text>
          </View>
        )}
      </View>

      <View style={styles.actions}>
        {tier === 'vip' && showHistory && (
          <Pressable onPress={handleHistory} style={styles.actionButton}>
            <Clock size={20} color={colors.secondary} />
          </Pressable>
        )}
        <Pressable onPress={handleNewSession} style={styles.actionButton}>
          <RotateCcw size={20} color={colors.secondary} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: spacing.xs,
    marginRight: spacing.xs,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  title: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  limitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs / 2,
    marginTop: spacing.xs / 2,
  },
  limitText: {
    fontSize: typography.xs,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  actionButton: {
    padding: spacing.sm,
  },
});
