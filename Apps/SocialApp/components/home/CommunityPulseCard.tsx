import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { router } from 'expo-router';
import { MessageCircle, ChevronRight } from 'lucide-react-native';
import { Card } from '../ui/Card';
import { GradientButton } from '../ui/GradientButton';
import { haptics } from '../../lib/haptics';
import { colors, spacing, typography, borderRadius } from '../../lib/theme';

interface CommunityPulseCardProps {
  onlineCount?: number;
  activeRoom?: string;
}

export function CommunityPulseCard({
  onlineCount = 42,
  activeRoom = 'General Discussion'
}: CommunityPulseCardProps) {
  // Animated typing dots
  const dot1 = useRef(new Animated.Value(0.3)).current;
  const dot2 = useRef(new Animated.Value(0.3)).current;
  const dot3 = useRef(new Animated.Value(0.3)).current;

  // Pulsing LIVE dot
  const livePulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animations: Animated.CompositeAnimation[] = [];
    const timeouts: NodeJS.Timeout[] = [];
    const duration = 400;
    const delay = 150;

    // Create and store dot animations
    const dot1Anim = Animated.loop(
      Animated.sequence([
        Animated.timing(dot1, { toValue: 1, duration, useNativeDriver: true }),
        Animated.timing(dot1, { toValue: 0.3, duration, useNativeDriver: true }),
      ])
    );
    animations.push(dot1Anim);
    dot1Anim.start();

    timeouts.push(setTimeout(() => {
      const dot2Anim = Animated.loop(
        Animated.sequence([
          Animated.timing(dot2, { toValue: 1, duration, useNativeDriver: true }),
          Animated.timing(dot2, { toValue: 0.3, duration, useNativeDriver: true }),
        ])
      );
      animations.push(dot2Anim);
      dot2Anim.start();
    }, delay));

    timeouts.push(setTimeout(() => {
      const dot3Anim = Animated.loop(
        Animated.sequence([
          Animated.timing(dot3, { toValue: 1, duration, useNativeDriver: true }),
          Animated.timing(dot3, { toValue: 0.3, duration, useNativeDriver: true }),
        ])
      );
      animations.push(dot3Anim);
      dot3Anim.start();
    }, delay * 2));

    // Create and store LIVE pulse animation
    const pulseAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(livePulse, {
          toValue: 1.3,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(livePulse, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animations.push(pulseAnim);
    pulseAnim.start();

    // Cleanup: stop all animations and clear timeouts
    return () => {
      timeouts.forEach(clearTimeout);
      animations.forEach(anim => anim.stop());
    };
  }, [dot1, dot2, dot3, livePulse]);

  const handlePress = () => {
    haptics.medium();
    router.push('/(tabs)/community');
  };

  return (
    <Card variant="glass" glow style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.liveIndicator}>
          <Animated.View
            style={[
              styles.liveDot,
              { transform: [{ scale: livePulse }] }
            ]}
          />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
        <Text style={styles.roomName}>{activeRoom}</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <MessageCircle size={18} color={colors.accent} strokeWidth={2} />
          <Text style={styles.statText}>
            <Text style={styles.statNumber}>{onlineCount}</Text> members online
          </Text>
        </View>
      </View>

      {/* Typing indicator */}
      <View style={styles.typingRow}>
        <View style={styles.typingDots}>
          <Animated.View style={[styles.typingDot, { opacity: dot1 }]} />
          <Animated.View style={[styles.typingDot, { opacity: dot2 }]} />
          <Animated.View style={[styles.typingDot, { opacity: dot3 }]} />
        </View>
        <Text style={styles.typingText}>Someone is typing...</Text>
      </View>

      {/* CTA */}
      <GradientButton
        title="Join the Conversation"
        onPress={handlePress}
        glow
        fullWidth
        icon={<ChevronRight size={18} color={colors.background} />}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: 'rgba(76, 175, 80, 0.15)',
    paddingVertical: 4,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.full,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
  },
  liveText: {
    fontSize: 10,
    fontWeight: typography.bold,
    color: colors.success,
    letterSpacing: 1,
  },
  roomName: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  statText: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  statNumber: {
    fontWeight: typography.bold,
    color: colors.accent,
  },
  typingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  typingDots: {
    flexDirection: 'row',
    gap: 4,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
  },
  typingText: {
    fontSize: typography.sm,
    color: colors.tertiary,
    fontStyle: 'italic',
  },
});
