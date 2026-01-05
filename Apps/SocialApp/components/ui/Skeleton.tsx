import { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, ViewStyle } from 'react-native';
import { colors, borderRadius, spacing } from '../../lib/theme';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export function Skeleton({
  width = '100%',
  height = 16,
  borderRadius: radius = borderRadius.md,
  style,
}: SkeletonProps) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width: width as number,
          height,
          borderRadius: radius,
          opacity: opacity as unknown as number,
        },
        style,
      ]}
    />
  );
}

// Pre-built skeleton components for common patterns
export function SkeletonText({ lines = 1, lastLineWidth = '60%' }: { lines?: number; lastLineWidth?: string }) {
  return (
    <View style={styles.textContainer}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height={14}
          width={i === lines - 1 ? lastLineWidth : '100%'}
          style={{ marginBottom: i < lines - 1 ? 8 : 0 }}
        />
      ))}
    </View>
  );
}

export function SkeletonAvatar({ size = 40 }: { size?: number }) {
  return <Skeleton width={size} height={size} borderRadius={size / 2} />;
}

export function SkeletonCard() {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <SkeletonAvatar size={48} />
        <View style={styles.cardHeaderText}>
          <Skeleton height={16} width="70%" />
          <Skeleton height={12} width="50%" style={{ marginTop: 8 }} />
        </View>
      </View>
      <SkeletonText lines={2} />
    </View>
  );
}

export function SkeletonCourseCard() {
  return (
    <View style={styles.courseCard}>
      <Skeleton height={120} borderRadius={0} />
      <View style={styles.courseContent}>
        <Skeleton height={20} width={60} style={{ marginBottom: 8 }} />
        <Skeleton height={18} width="80%" style={{ marginBottom: 8 }} />
        <SkeletonText lines={2} />
        <View style={styles.courseMeta}>
          <Skeleton height={14} width={80} />
          <Skeleton height={14} width={60} />
        </View>
      </View>
    </View>
  );
}

export function SkeletonChatRoom() {
  return (
    <View style={styles.chatRoom}>
      <Skeleton width={48} height={48} borderRadius={borderRadius.md} />
      <View style={styles.chatContent}>
        <Skeleton height={16} width="60%" style={{ marginBottom: 6 }} />
        <Skeleton height={12} width="80%" style={{ marginBottom: 6 }} />
        <Skeleton height={10} width="40%" />
      </View>
      <View style={styles.chatRight}>
        <Skeleton width={8} height={8} borderRadius={4} />
        <Skeleton height={10} width={30} />
      </View>
    </View>
  );
}

export function SkeletonCoachingPackage() {
  return (
    <View style={styles.packageCard}>
      <View style={styles.packageHeader}>
        <Skeleton height={24} width="50%" style={{ marginBottom: 8 }} />
        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          <Skeleton height={32} width={80} />
        </View>
      </View>
      <Skeleton height={14} width="100%" style={{ marginBottom: 8 }} />
      <View style={styles.packageMeta}>
        <Skeleton height={12} width={80} />
        <Skeleton height={12} width={80} />
      </View>
      <View style={styles.packageFeatures}>
        {[1, 2, 3].map(i => (
          <View key={i} style={styles.featureRow}>
            <Skeleton width={14} height={14} borderRadius={7} />
            <Skeleton height={12} width="70%" />
          </View>
        ))}
      </View>
      <Skeleton height={44} borderRadius={borderRadius.md} style={{ marginTop: spacing.md }} />
    </View>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: colors.surfaceElevated,
  },
  textContainer: {
    gap: 4,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    gap: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  cardHeaderText: {
    flex: 1,
    justifyContent: 'center',
  },
  courseCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  courseContent: {
    padding: spacing.md,
  },
  courseMeta: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  chatRoom: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  chatContent: {
    flex: 1,
  },
  chatRight: {
    alignItems: 'flex-end',
    gap: spacing.xs,
  },
  packageCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  packageHeader: {
    gap: spacing.xs,
  },
  packageMeta: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginTop: spacing.sm,
  },
  packageFeatures: {
    gap: spacing.sm,
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
});
