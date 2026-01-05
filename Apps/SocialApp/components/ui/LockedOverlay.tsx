import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Lock, Crown, Star } from 'lucide-react-native';
import { colors, spacing, typography, borderRadius } from '../../lib/theme';
import { haptics } from '../../lib/haptics';

interface LockedOverlayProps {
  tier: 'premium' | 'vip';
  message?: string;
  compact?: boolean;
}

export function LockedOverlay({ tier, message, compact = false }: LockedOverlayProps) {
  const tierConfig = {
    premium: {
      icon: Star,
      label: 'Premium',
      color: colors.accent,
      defaultMessage: 'Upgrade to Premium to unlock this content',
    },
    vip: {
      icon: Crown,
      label: 'VIP',
      color: colors.accentLight,
      defaultMessage: 'VIP members only',
    },
  };

  const config = tierConfig[tier];
  const Icon = config.icon;

  const handleUpgrade = () => {
    haptics.medium();
    router.push('/(subscription)/upgrade');
  };

  if (compact) {
    return (
      <Pressable style={styles.compactContainer} onPress={handleUpgrade}>
        <View style={[styles.compactBadge, { backgroundColor: config.color + '20' }]}>
          <Lock size={12} color={config.color} />
          <Text style={[styles.compactText, { color: config.color }]}>
            {config.label}
          </Text>
        </View>
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.backdrop} />
      <View style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: config.color + '20' }]}>
          <Lock size={24} color={config.color} />
        </View>
        <Text style={styles.message}>{message || config.defaultMessage}</Text>
        <Pressable
          style={[styles.upgradeButton, { backgroundColor: config.color }]}
          onPress={handleUpgrade}
        >
          <Icon size={16} color={colors.background} />
          <Text style={styles.upgradeText}>Upgrade to {config.label}</Text>
        </Pressable>
      </View>
    </View>
  );
}

interface LockedContentProps {
  children: React.ReactNode;
  isLocked: boolean;
  tier: 'premium' | 'vip';
  message?: string;
}

export function LockedContent({ children, isLocked, tier, message }: LockedContentProps) {
  if (!isLocked) {
    return <>{children}</>;
  }

  return (
    <View style={styles.lockedWrapper}>
      <View style={styles.blurredContent}>{children}</View>
      <LockedOverlay tier={tier} message={message} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.background,
    opacity: 0.85,
  },
  content: {
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontSize: typography.sm,
    color: colors.secondary,
    textAlign: 'center',
    maxWidth: 200,
  },
  upgradeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
  },
  upgradeText: {
    fontSize: typography.sm,
    fontWeight: typography.semibold,
    color: colors.background,
  },
  compactContainer: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    zIndex: 10,
  },
  compactBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: 4,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  compactText: {
    fontSize: typography.xs,
    fontWeight: typography.bold,
  },
  lockedWrapper: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: borderRadius.lg,
  },
  blurredContent: {
    opacity: 0.4,
  },
});
