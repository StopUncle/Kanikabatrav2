import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { WifiOff } from 'lucide-react-native';
import { colors, spacing, typography } from '../../lib/theme';
import { useNetworkStatus } from '../../lib/useNetworkStatus';
import { useEffect, useRef } from 'react';

/**
 * Banner that appears when the device is offline
 * Automatically shows/hides based on network connectivity
 */
export function OfflineBanner() {
  const { isConnected, isInternetReachable } = useNetworkStatus();
  const slideAnim = useRef(new Animated.Value(-50)).current;

  // Show banner when disconnected or internet not reachable
  const isOffline = !isConnected || isInternetReachable === false;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isOffline ? 0 : -50,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOffline, slideAnim]);

  // Don't render if connected (but keep animation running)
  if (!isOffline) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateY: slideAnim }] },
      ]}
    >
      <WifiOff size={16} color={colors.primary} />
      <Text style={styles.text}>No internet connection</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.warning,
  },
  text: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.background,
  },
});
