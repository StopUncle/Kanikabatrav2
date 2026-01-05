// Avatar Frame Component - Renders frame overlays on avatars

import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AvatarReward, tierStyles } from '../../lib/avatarRewards';

interface AvatarFrameProps {
  frame: AvatarReward;
  size: number;
  children: React.ReactNode;
}

export function AvatarFrame({ frame, size, children }: AvatarFrameProps) {
  const tierStyle = tierStyles[frame.tier];
  const borderWidth = size * 0.06;
  const glowSize = size * 0.08;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Outer glow effect */}
      <View
        style={[
          styles.glow,
          {
            width: size + glowSize * 2,
            height: size + glowSize * 2,
            borderRadius: (size + glowSize * 2) / 2,
            backgroundColor: tierStyle.glowColor,
            left: -glowSize,
            top: -glowSize,
          },
        ]}
      />

      {/* Frame border */}
      <LinearGradient
        colors={[tierStyle.borderColor, adjustBrightness(tierStyle.borderColor, 0.7)]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.frameBorder,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}
      >
        {/* Inner content area */}
        <View
          style={[
            styles.innerContent,
            {
              width: size - borderWidth * 2,
              height: size - borderWidth * 2,
              borderRadius: (size - borderWidth * 2) / 2,
            },
          ]}
        >
          {children}
        </View>
      </LinearGradient>

      {/* Legendary sparkle effect */}
      {frame.tier === 'legendary' && (
        <View style={styles.sparkleContainer}>
          <View style={[styles.sparkle, { backgroundColor: tierStyle.borderColor }]} />
          <View style={[styles.sparkle, styles.sparkle2, { backgroundColor: tierStyle.borderColor }]} />
        </View>
      )}
    </View>
  );
}

// Helper to adjust color brightness
function adjustBrightness(hex: string, factor: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  const newR = Math.min(255, Math.round(r * factor));
  const newG = Math.min(255, Math.round(g * factor));
  const newB = Math.min(255, Math.round(b * factor));

  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  glow: {
    position: 'absolute',
    opacity: 0.6,
  },
  frameBorder: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  innerContent: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1A2E',
  },
  sparkleContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  sparkle: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    top: '10%',
    right: '15%',
    opacity: 0.8,
  },
  sparkle2: {
    top: '80%',
    right: '20%',
  },
});

export default AvatarFrame;
