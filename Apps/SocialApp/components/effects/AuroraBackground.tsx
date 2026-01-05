import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../lib/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface AuroraBackgroundProps {
  children?: React.ReactNode;
  style?: ViewStyle;
  intensity?: 'subtle' | 'medium' | 'strong';
}

export function AuroraBackground({
  children,
  style,
  intensity = 'medium',
}: AuroraBackgroundProps) {
  const translateX1 = useRef(new Animated.Value(0)).current;
  const translateY1 = useRef(new Animated.Value(0)).current;
  const translateX2 = useRef(new Animated.Value(0)).current;
  const translateY2 = useRef(new Animated.Value(0)).current;
  const opacity1 = useRef(new Animated.Value(0.5)).current;
  const opacity2 = useRef(new Animated.Value(0.3)).current;

  const intensityConfig = {
    subtle: { opacity: 0.3, scale: 0.8 },
    medium: { opacity: 0.5, scale: 1 },
    strong: { opacity: 0.7, scale: 1.2 },
  };

  const config = intensityConfig[intensity];

  useEffect(() => {
    // Animate first gradient blob
    const animate1 = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(translateX1, {
            toValue: 30,
            duration: 8000,
            useNativeDriver: true,
          }),
          Animated.timing(translateY1, {
            toValue: -20,
            duration: 8000,
            useNativeDriver: true,
          }),
          Animated.timing(opacity1, {
            toValue: config.opacity + 0.2,
            duration: 8000,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(translateX1, {
            toValue: -30,
            duration: 8000,
            useNativeDriver: true,
          }),
          Animated.timing(translateY1, {
            toValue: 20,
            duration: 8000,
            useNativeDriver: true,
          }),
          Animated.timing(opacity1, {
            toValue: config.opacity - 0.2,
            duration: 8000,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(translateX1, {
            toValue: 0,
            duration: 8000,
            useNativeDriver: true,
          }),
          Animated.timing(translateY1, {
            toValue: 0,
            duration: 8000,
            useNativeDriver: true,
          }),
          Animated.timing(opacity1, {
            toValue: config.opacity,
            duration: 8000,
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    // Animate second gradient blob (different timing)
    const animate2 = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(translateX2, {
            toValue: -25,
            duration: 10000,
            useNativeDriver: true,
          }),
          Animated.timing(translateY2, {
            toValue: 25,
            duration: 10000,
            useNativeDriver: true,
          }),
          Animated.timing(opacity2, {
            toValue: config.opacity,
            duration: 10000,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(translateX2, {
            toValue: 25,
            duration: 10000,
            useNativeDriver: true,
          }),
          Animated.timing(translateY2, {
            toValue: -15,
            duration: 10000,
            useNativeDriver: true,
          }),
          Animated.timing(opacity2, {
            toValue: config.opacity - 0.15,
            duration: 10000,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(translateX2, {
            toValue: 0,
            duration: 10000,
            useNativeDriver: true,
          }),
          Animated.timing(translateY2, {
            toValue: 0,
            duration: 10000,
            useNativeDriver: true,
          }),
          Animated.timing(opacity2, {
            toValue: config.opacity - 0.2,
            duration: 10000,
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    animate1.start();
    animate2.start();

    return () => {
      animate1.stop();
      animate2.stop();
    };
  }, [intensity]);

  return (
    <View style={[styles.container, style]}>
      {/* First Aurora Blob */}
      <Animated.View
        style={[
          styles.gradientBlob,
          styles.blob1,
          {
            opacity: opacity1,
            transform: [
              { translateX: translateX1 },
              { translateY: translateY1 },
              { scale: config.scale },
            ],
          },
        ]}
      >
        <LinearGradient
          colors={[
            'rgba(201, 169, 97, 0.4)',
            'rgba(201, 169, 97, 0.15)',
            'transparent',
          ]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
      </Animated.View>

      {/* Second Aurora Blob */}
      <Animated.View
        style={[
          styles.gradientBlob,
          styles.blob2,
          {
            opacity: opacity2,
            transform: [
              { translateX: translateX2 },
              { translateY: translateY2 },
              { scale: config.scale * 0.8 },
            ],
          },
        ]}
      >
        <LinearGradient
          colors={[
            'rgba(224, 196, 122, 0.3)',
            'rgba(201, 169, 97, 0.1)',
            'transparent',
          ]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0.3, y: 0 }}
          end={{ x: 0.7, y: 1 }}
        />
      </Animated.View>

      {/* Content */}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: colors.background,
  },
  gradientBlob: {
    position: 'absolute',
    borderRadius: SCREEN_WIDTH,
  },
  blob1: {
    width: SCREEN_WIDTH * 1.5,
    height: SCREEN_WIDTH * 1.5,
    top: -SCREEN_WIDTH * 0.5,
    left: -SCREEN_WIDTH * 0.25,
  },
  blob2: {
    width: SCREEN_WIDTH * 1.2,
    height: SCREEN_WIDTH * 1.2,
    top: -SCREEN_WIDTH * 0.2,
    right: -SCREEN_WIDTH * 0.4,
  },
  content: {
    position: 'relative',
    zIndex: 1,
  },
});
