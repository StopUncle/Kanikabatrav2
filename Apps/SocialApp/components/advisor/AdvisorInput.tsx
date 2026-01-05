// Advisor Input Component
import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  Animated,
  Keyboard,
} from 'react-native';
import { Send } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography, animations } from '../../lib/theme';
import { haptics } from '../../lib/haptics';

interface AdvisorInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const MAX_CHARS = 500;

export function AdvisorInput({
  onSend,
  disabled = false,
  placeholder = "Ask Kanika anything...",
}: AdvisorInputProps) {
  const [message, setMessage] = useState('');
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const inputRef = useRef<TextInput>(null);

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || disabled) return;

    haptics.medium();
    onSend(trimmedMessage);
    setMessage('');
    Keyboard.dismiss();
  };

  const handlePressIn = () => {
    if (disabled || !message.trim()) return;
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
      ...animations.springBouncy,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      ...animations.spring,
    }).start();
  };

  const canSend = message.trim().length > 0 && !disabled;

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={message}
          onChangeText={(text) => setMessage(text.slice(0, MAX_CHARS))}
          placeholder={placeholder}
          placeholderTextColor={colors.tertiary}
          multiline
          maxLength={MAX_CHARS}
          editable={!disabled}
          returnKeyType="send"
          onSubmitEditing={handleSend}
          blurOnSubmit={false}
        />
        <Pressable
          onPress={handleSend}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={!canSend}
          style={styles.sendButton}
          accessibilityLabel="Send message"
          accessibilityRole="button"
        >
          <Animated.View
            style={[
              styles.sendButtonInner,
              canSend && styles.sendButtonActive,
              { transform: [{ scale: scaleAnim }] },
            ]}
          >
            <Send
              size={20}
              color={canSend ? colors.background : colors.tertiary}
              strokeWidth={2.5}
            />
          </Animated.View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    paddingLeft: spacing.md,
    paddingRight: spacing.xs,
    paddingVertical: spacing.xs,
  },
  input: {
    flex: 1,
    fontSize: typography.md,
    color: colors.primary,
    maxHeight: 100,
    minHeight: 40,
    paddingVertical: spacing.sm,
  },
  sendButton: {
    padding: spacing.xs,
  },
  sendButtonInner: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfaceElevated,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonActive: {
    backgroundColor: colors.accent,
  },
});
