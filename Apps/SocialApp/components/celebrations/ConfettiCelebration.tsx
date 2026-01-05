import { useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { haptics } from '../../lib/haptics';
import { colors } from '../../lib/theme';

const { width, height } = Dimensions.get('window');

interface ConfettiCelebrationProps {
  trigger?: boolean;
  onComplete?: () => void;
  count?: number;
  origin?: { x: number; y: number };
  autoStart?: boolean;
}

export function ConfettiCelebration({
  trigger = true,
  onComplete,
  count = 100,
  origin = { x: width / 2, y: -20 },
  autoStart = true,
}: ConfettiCelebrationProps) {
  const confettiRef = useRef<ConfettiCannon>(null);

  useEffect(() => {
    if (trigger && autoStart) {
      // Trigger haptic when confetti starts
      haptics.success();
    }
  }, [trigger, autoStart]);

  if (!trigger) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      <ConfettiCannon
        ref={confettiRef}
        count={count}
        origin={origin}
        autoStart={autoStart}
        fadeOut
        fallSpeed={2500}
        explosionSpeed={350}
        colors={[
          colors.accent,      // Gold
          '#FFD700',          // Pure gold
          '#FFA500',          // Orange
          '#9C27B0',          // Purple (premium)
          '#4CAF50',          // Green (success)
          '#2196F3',          // Blue
        ]}
        onAnimationEnd={onComplete}
      />
    </View>
  );
}

// Double burst from both corners for epic celebrations
export function DoubleConfetti({
  trigger = true,
  onComplete,
}: {
  trigger?: boolean;
  onComplete?: () => void;
}) {
  if (!trigger) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      <ConfettiCannon
        count={60}
        origin={{ x: 0, y: height }}
        autoStart
        fadeOut
        fallSpeed={3000}
        explosionSpeed={400}
        colors={[colors.accent, '#FFD700', '#FFA500', '#9C27B0']}
      />
      <ConfettiCannon
        count={60}
        origin={{ x: width, y: height }}
        autoStart
        fadeOut
        fallSpeed={3000}
        explosionSpeed={400}
        colors={[colors.accent, '#FFD700', '#4CAF50', '#2196F3']}
        onAnimationEnd={onComplete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
  },
});
