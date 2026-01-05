// Credit Display Component
// Shows current credit balance with optional daily claim button

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Gem, Gift } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../lib/theme';
import { useCreditStore } from '../../stores/creditStore';
import { haptics } from '../../lib/haptics';

interface CreditDisplayProps {
  showClaimButton?: boolean;
  onClaim?: (amount: number) => void;
}

export function CreditDisplay({ showClaimButton = false, onClaim }: CreditDisplayProps) {
  const credits = useCreditStore((s) => s.credits);
  const lastDailyClaimDate = useCreditStore((s) => s.lastDailyClaimDate);
  const claimDailyCredits = useCreditStore((s) => s.claimDailyCredits);

  const today = new Date().toISOString().split('T')[0];
  const canClaim = lastDailyClaimDate !== today;

  const handleClaim = async () => {
    haptics.success();
    const result = await claimDailyCredits();
    if (result.claimed && onClaim) {
      onClaim(result.amount);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.creditBadge}>
        <Gem size={16} color={colors.accent} />
        <Text style={styles.creditText}>{credits}</Text>
      </View>

      {showClaimButton && canClaim && (
        <Pressable style={styles.claimButton} onPress={handleClaim}>
          <Gift size={14} color={colors.success} />
          <Text style={styles.claimText}>Claim Daily</Text>
        </Pressable>
      )}
    </View>
  );
}

// Compact version for headers
export function CreditBadge() {
  const credits = useCreditStore((s) => s.credits);

  return (
    <View style={styles.badge}>
      <Gem size={14} color={colors.accent} />
      <Text style={styles.badgeText}>{credits}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  creditBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.surface,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.accent + '40',
  },
  creditText: {
    fontSize: typography.sm,
    color: colors.accent,
    fontWeight: '600',
  },
  claimButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.success + '20',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.success + '40',
  },
  claimText: {
    fontSize: typography.xs,
    color: colors.success,
    fontWeight: '600',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surface,
    paddingVertical: 4,
    paddingHorizontal: spacing.xs,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.accent + '30',
  },
  badgeText: {
    fontSize: typography.xs,
    color: colors.accent,
    fontWeight: '600',
  },
});
