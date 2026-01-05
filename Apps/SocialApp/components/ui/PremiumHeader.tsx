/**
 * PremiumHeader - Elegant header with gold accents
 *
 * Flexible header supporting multiple configurations:
 * - Standard: back button + title + optional actions
 * - Greeting mode: time-based greeting + name + badges
 * - Glass/gradient variants for premium feel
 */
import { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Crown, type LucideIcon } from 'lucide-react-native';
import { colors, spacing, typography, borderRadius, glass, gradients } from '../../lib/theme';
import { haptics } from '../../lib/haptics';
import { StreakBadgeInline } from '../home/StreakBadge';
import { useAuthStore } from '../../stores/authStore';

// ============================================
// Types
// ============================================

interface HeaderAction {
  icon: LucideIcon;
  onPress: () => void;
  accessibilityLabel: string;
}

type StatusBadgeType = 'tier' | 'streak';

interface PremiumHeaderProps {
  // Content
  title?: string;
  subtitle?: string;
  titleIcon?: LucideIcon;

  // Navigation
  showBackButton?: boolean;
  backRoute?: string;
  onBackPress?: () => void;

  // Right side
  actions?: HeaderAction[];
  statusBadges?: StatusBadgeType[];

  // Greeting mode (overrides title)
  greeting?: {
    timeBasedGreeting: boolean;
    userName: string;
  };

  // Styling
  variant?: 'default' | 'glass' | 'gradient';
  showAccentLine?: boolean;

  // Layout
  style?: ViewStyle;
}

// ============================================
// Sub-components
// ============================================

function BackButton({
  onPress,
  scaleAnim,
}: {
  onPress: () => void;
  scaleAnim: Animated.Value;
}) {
  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        style={({ pressed }) => [
          styles.backButton,
          pressed && styles.backButtonPressed,
        ]}
        onPressIn={() => {
          Animated.spring(scaleAnim, {
            toValue: 0.92,
            useNativeDriver: true,
          }).start();
        }}
        onPressOut={() => {
          Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
          }).start();
        }}
        onPress={onPress}
        accessibilityLabel="Go back"
        accessibilityRole="button"
      >
        <ArrowLeft size={20} color={colors.primary} strokeWidth={2} />
      </Pressable>
    </Animated.View>
  );
}

function TierBadge() {
  const { user } = useAuthStore();
  const tier = user?.subscription_tier || 'free';

  return (
    <View style={styles.tierBadge}>
      {tier !== 'free' && <Crown size={12} color={colors.accent} />}
      <Text style={styles.tierText}>{tier.toUpperCase()}</Text>
    </View>
  );
}

function ActionButton({
  action,
  scaleAnim,
}: {
  action: HeaderAction;
  scaleAnim: Animated.Value;
}) {
  const Icon = action.icon;

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        style={({ pressed }) => [
          styles.actionButton,
          pressed && styles.actionButtonPressed,
        ]}
        onPressIn={() => {
          Animated.spring(scaleAnim, {
            toValue: 0.92,
            useNativeDriver: true,
          }).start();
        }}
        onPressOut={() => {
          Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
          }).start();
        }}
        onPress={() => {
          haptics.light();
          action.onPress();
        }}
        accessibilityLabel={action.accessibilityLabel}
        accessibilityRole="button"
      >
        <Icon size={20} color={colors.secondary} />
      </Pressable>
    </Animated.View>
  );
}

// ============================================
// Main Component
// ============================================

export function PremiumHeader({
  title,
  subtitle,
  titleIcon: TitleIcon,
  showBackButton = false,
  backRoute = '/(tabs)',
  onBackPress,
  actions,
  statusBadges,
  greeting,
  variant = 'default',
  showAccentLine = true,
  style,
}: PremiumHeaderProps) {
  const backScaleAnim = useRef(new Animated.Value(1)).current;
  const actionScaleAnims = useRef(
    actions?.map(() => new Animated.Value(1)) || []
  ).current;

  // Time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const handleBack = () => {
    haptics.light();
    if (onBackPress) {
      onBackPress();
    } else {
      router.replace(backRoute as any);
    }
  };

  // Render status badges
  const renderStatusBadges = () => {
    if (!statusBadges?.length) return null;

    return (
      <View style={styles.badgeContainer}>
        {statusBadges.map((badge, index) => {
          if (badge === 'streak') {
            return <StreakBadgeInline key={`badge-${index}`} />;
          }
          if (badge === 'tier') {
            return <TierBadge key={`badge-${index}`} />;
          }
          return null;
        })}
      </View>
    );
  };

  // Determine background style
  const getBackgroundStyle = (): ViewStyle => {
    switch (variant) {
      case 'glass':
        return {
          backgroundColor: glass.light.backgroundColor,
          borderBottomColor: glass.light.borderColor,
          borderBottomWidth: glass.light.borderWidth,
        };
      case 'gradient':
        return {};
      default:
        return {
          backgroundColor: colors.background,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        };
    }
  };

  const headerContent = (
    <View style={[styles.header, getBackgroundStyle(), style]}>
      {/* Left side: Back button or spacer */}
      {showBackButton ? (
        <BackButton onPress={handleBack} scaleAnim={backScaleAnim} />
      ) : (
        <View style={styles.leftSpacer} />
      )}

      {/* Center: Title/Subtitle or Greeting */}
      {greeting ? (
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingTime}>
            {greeting.timeBasedGreeting ? getGreeting() : ''}
          </Text>
          <Text style={styles.greetingName}>{greeting.userName}</Text>
        </View>
      ) : (
        <View style={styles.titleContainer}>
          <View style={styles.titleRow}>
            {TitleIcon && (
              <TitleIcon size={20} color={colors.accent} style={styles.titleIcon} />
            )}
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
          </View>
          {subtitle && (
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>
      )}

      {/* Right side: Badges and/or Actions */}
      <View style={styles.rightContainer}>
        {renderStatusBadges()}
        {actions?.map((action, index) => (
          <ActionButton
            key={`action-${index}`}
            action={action}
            scaleAnim={actionScaleAnims[index]}
          />
        ))}
        {/* Spacer if no right content */}
        {!actions?.length && !statusBadges?.length && (
          <View style={styles.rightSpacer} />
        )}
      </View>

      {/* Gold accent line */}
      {showAccentLine && (
        <LinearGradient
          colors={['transparent', colors.accent, 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.accentLine}
        />
      )}
    </View>
  );

  // Wrap with gradient background for gradient variant
  if (variant === 'gradient') {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <LinearGradient
          colors={gradients.aurora}
          style={StyleSheet.absoluteFillObject}
        />
        {headerContent}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {headerContent}
    </SafeAreaView>
  );
}

// ============================================
// Styles
// ============================================

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    minHeight: 56,
    position: 'relative',
  },

  // Back button
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  backButtonPressed: {
    backgroundColor: colors.surfaceElevated,
  },

  // Spacers
  leftSpacer: {
    width: 8,
  },
  rightSpacer: {
    width: 40,
  },

  // Title (centered mode)
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  titleIcon: {
    marginRight: 4,
  },
  title: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.primary,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: typography.xs,
    color: colors.secondary,
    marginTop: 2,
    letterSpacing: 0.3,
  },

  // Greeting (left-aligned mode)
  greetingContainer: {
    flex: 1,
  },
  greetingTime: {
    fontSize: typography.xs,
    color: colors.tertiary,
    fontWeight: typography.medium,
    letterSpacing: 0.5,
  },
  greetingName: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
    letterSpacing: 0.3,
  },

  // Right side
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },

  // Badges
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  tierBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.accentMuted,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs - 2,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(201, 169, 97, 0.3)',
  },
  tierText: {
    fontSize: typography.xs,
    fontWeight: typography.bold,
    color: colors.accent,
    letterSpacing: 1,
  },

  // Action buttons
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonPressed: {
    backgroundColor: colors.surfaceElevated,
  },

  // Gold accent line
  accentLine: {
    position: 'absolute',
    bottom: 0,
    left: spacing.xl,
    right: spacing.xl,
    height: 2,
    opacity: 0.4,
  },
});

export default PremiumHeader;
