// Pocket Kanika AI - Main Chat Screen
import React, { useEffect, useRef, useCallback } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Lock } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../lib/theme';
import { useAIChatStore, selectCurrentMessages, selectIsSessionEmpty } from '../../stores/aiChatStore';
import { useAuthStore } from '../../stores/authStore';
import {
  AdvisorMessage,
  AdvisorInput,
  AdvisorTypingIndicator,
  AdvisorHeader,
  AdvisorSuggestions,
} from '../../components/advisor';
import { haptics } from '../../lib/haptics';

export default function AdvisorScreen() {
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);

  // Store state
  const {
    currentSession,
    isLoading,
    error,
    messagesThisHour,
    initializeSession,
    sendMessage,
    startNewSession,
    clearError,
  } = useAIChatStore();

  const { user, isAuthenticated, tier } = useAuthStore();

  const messages = useAIChatStore(selectCurrentMessages);
  const isSessionEmpty = useAIChatStore(selectIsSessionEmpty);

  // Initialize session on mount
  useEffect(() => {
    void initializeSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages.length]);

  // Clear error after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(clearError, 3000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const handleSendMessage = useCallback(
    async (content: string) => {
      await sendMessage(content);
    },
    [sendMessage]
  );

  const handleNewSession = useCallback(() => {
    void startNewSession();
  }, [startNewSession]);

  const handleSuggestionSelect = useCallback(
    (suggestion: string) => {
      void handleSendMessage(suggestion);
    },
    [handleSendMessage]
  );

  const handleUpgrade = () => {
    haptics.light();
    router.push('/(subscription)');
  };

  // Check if user needs to upgrade
  const needsUpgrade = !isAuthenticated || tier === 'free';
  const isRateLimited = messagesThisHour <= 0;

  // Render message item
  const renderMessage = useCallback(
    ({ item, index }: { item: typeof messages[0]; index: number }) => (
      <AdvisorMessage
        message={item}
        isLatest={index === messages.length - 1}
      />
    ),
    [messages.length]
  );

  // Key extractor
  const keyExtractor = useCallback(
    (item: typeof messages[0]) => item.id,
    []
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <AdvisorHeader
          tier={tier}
          messagesRemaining={messagesThisHour}
          onNewSession={handleNewSession}
          showHistory={tier === 'vip'}
        />

        {/* Error banner */}
        {error && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* Main content */}
        <View style={styles.content}>
          {isSessionEmpty ? (
            <AdvisorSuggestions onSelect={handleSuggestionSelect} />
          ) : (
            <FlatList
              ref={flatListRef}
              data={messages}
              renderItem={renderMessage}
              keyExtractor={keyExtractor}
              contentContainerStyle={styles.messagesList}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={
                <AdvisorTypingIndicator visible={isLoading} />
              }
            />
          )}
        </View>

        {/* Rate limit / upgrade prompts */}
        {isRateLimited && tier !== 'vip' && (
          <View style={styles.rateLimitBanner}>
            <Lock size={16} color={colors.warning} />
            <Text style={styles.rateLimitText}>
              Hourly limit reached. Upgrade for more.
            </Text>
            <Pressable onPress={handleUpgrade} style={styles.upgradeButton}>
              <Text style={styles.upgradeButtonText}>Upgrade</Text>
            </Pressable>
          </View>
        )}

        {/* Input */}
        <AdvisorInput
          onSend={handleSendMessage}
          disabled={isLoading || isRateLimited}
          placeholder={
            isRateLimited
              ? 'Rate limit reached...'
              : 'Ask Kanika anything...'
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  messagesList: {
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  errorBanner: {
    backgroundColor: colors.errorMuted,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.error,
  },
  errorText: {
    fontSize: typography.sm,
    color: colors.error,
    textAlign: 'center',
  },
  rateLimitBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  rateLimitText: {
    fontSize: typography.sm,
    color: colors.warning,
  },
  upgradeButton: {
    backgroundColor: colors.accent,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
  },
  upgradeButtonText: {
    fontSize: typography.sm,
    fontWeight: typography.semibold,
    color: colors.background,
  },
});
