// Advisor Suggestions Component - Conversation starters
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { MessageCircle, Sparkles } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography, glass } from '../../lib/theme';
import { haptics } from '../../lib/haptics';
import { CONVERSATION_STARTERS } from '../../content/advisor';

interface AdvisorSuggestionsProps {
  onSelect: (suggestion: string) => void;
}

export function AdvisorSuggestions({ onSelect }: AdvisorSuggestionsProps) {
  const handleSelect = (suggestion: string) => {
    haptics.light();
    onSelect(suggestion);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Sparkles size={24} color={colors.accent} />
        <Text style={styles.title}>Pocket Kanika</Text>
      </View>

      <Text style={styles.subtitle}>
        Your tactical advisor. Cold logic. Strategic clarity.
      </Text>

      <Text style={styles.promptLabel}>What's on your mind?</Text>

      <ScrollView
        style={styles.suggestionsScroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.suggestionsContent}
      >
        {CONVERSATION_STARTERS.map((suggestion, index) => (
          <Pressable
            key={index}
            onPress={() => handleSelect(suggestion)}
            style={({ pressed }) => [
              styles.suggestionCard,
              pressed && styles.suggestionPressed,
            ]}
          >
            <MessageCircle size={16} color={colors.accent} />
            <Text style={styles.suggestionText}>{suggestion}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <Text style={styles.disclaimer}>
        For entertainment and self-reflection only. Not a substitute for professional advice.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  subtitle: {
    fontSize: typography.sm,
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  promptLabel: {
    fontSize: typography.md,
    fontWeight: typography.medium,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  suggestionsScroll: {
    maxHeight: 300,
    width: '100%',
  },
  suggestionsContent: {
    gap: spacing.sm,
    paddingBottom: spacing.md,
  },
  suggestionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    ...glass.medium,
    borderWidth: 1,
    borderColor: colors.border,
  },
  suggestionPressed: {
    opacity: 0.8,
    borderColor: colors.accent,
  },
  suggestionText: {
    flex: 1,
    fontSize: typography.sm,
    color: colors.primary,
  },
  disclaimer: {
    fontSize: typography.xs,
    color: colors.tertiary,
    textAlign: 'center',
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
});
