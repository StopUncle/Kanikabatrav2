// Advisor Message Bubble Component
import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { colors, spacing, borderRadius, typography, glass } from '../../lib/theme';
import type { AdvisorMessage as MessageType } from '../../services/aiAdvisorService';

interface AdvisorMessageProps {
  message: MessageType;
  isLatest?: boolean;
}

export function AdvisorMessage({ message, isLatest = false }: AdvisorMessageProps) {
  const isUser = message.role === 'user';
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(isUser ? 20 : -20)).current;

  useEffect(() => {
    if (isLatest) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          damping: 15,
          stiffness: 150,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      fadeAnim.setValue(1);
      slideAnim.setValue(0);
    }
  }, [isLatest, fadeAnim, slideAnim]);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Animated.View
      style={[
        styles.container,
        isUser ? styles.userContainer : styles.assistantContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateX: slideAnim }],
        },
      ]}
    >
      <View style={[styles.bubble, isUser ? styles.userBubble : styles.assistantBubble]}>
        {!isUser && (
          <Text style={styles.senderName}>Kanika</Text>
        )}
        <Text style={[styles.messageText, isUser && styles.userMessageText]}>
          {message.content}
        </Text>
        <Text style={[styles.timestamp, isUser && styles.userTimestamp]}>
          {formatTime(message.timestamp)}
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  userContainer: {
    alignItems: 'flex-end',
  },
  assistantContainer: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '85%',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
  },
  userBubble: {
    backgroundColor: colors.accent,
    borderBottomRightRadius: spacing.xs,
  },
  assistantBubble: {
    ...glass.medium,
    borderBottomLeftRadius: spacing.xs,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  senderName: {
    fontSize: typography.xs,
    fontWeight: typography.semibold,
    color: colors.accent,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  messageText: {
    fontSize: typography.md,
    color: colors.primary,
    lineHeight: typography.md * 1.5,
  },
  userMessageText: {
    color: colors.background,
  },
  timestamp: {
    fontSize: typography.xs,
    color: colors.tertiary,
    marginTop: spacing.xs,
    alignSelf: 'flex-end',
  },
  userTimestamp: {
    color: 'rgba(10, 10, 10, 0.6)',
  },
});
