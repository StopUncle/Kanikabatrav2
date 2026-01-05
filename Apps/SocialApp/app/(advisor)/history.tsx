// Pocket Kanika AI - Conversation History (VIP Only)
import React, { useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, MessageCircle, Clock, Lock } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography, glass } from '../../lib/theme';
import { useAIChatStore } from '../../stores/aiChatStore';
import { useAuthStore } from '../../stores/authStore';
import { haptics } from '../../lib/haptics';
import type { AdvisorSession } from '../../services/aiAdvisorService';

export default function HistoryScreen() {
  const router = useRouter();
  const { sessionHistory, loadSessionHistory, restoreSession } = useAIChatStore();
  const { tier } = useAuthStore();

  const [refreshing, setRefreshing] = React.useState(false);

  // Load history on mount
  useEffect(() => {
    void loadSessionHistory();
  }, [loadSessionHistory]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadSessionHistory();
    setRefreshing(false);
  }, [loadSessionHistory]);

  const handleBack = () => {
    haptics.light();
    router.replace('/(advisor)');
  };

  const handleSelectSession = async (session: AdvisorSession) => {
    haptics.medium();
    // Restore the selected session as the current conversation
    await restoreSession(session);
    // Navigate back to the chat screen
    router.replace('/(advisor)');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const getSessionPreview = (session: AdvisorSession) => {
    const lastUserMessage = [...session.messages]
      .reverse()
      .find((m) => m.role === 'user');
    return lastUserMessage?.content.slice(0, 80) || 'No messages';
  };

  // VIP gate
  if (tier !== 'vip') {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <Pressable onPress={handleBack} style={styles.backButton}>
            <ChevronLeft size={24} color={colors.primary} />
          </Pressable>
          <Text style={styles.headerTitle}>Conversation History</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.vipGate}>
          <Lock size={48} color={colors.accent} />
          <Text style={styles.vipTitle}>VIP Feature</Text>
          <Text style={styles.vipDescription}>
            Access your full conversation history with Pocket Kanika.
            Upgrade to VIP to unlock this feature.
          </Text>
          <Pressable
            onPress={() => {
              haptics.light();
              router.push('/(subscription)');
            }}
            style={styles.upgradeButton}
          >
            <Text style={styles.upgradeButtonText}>Upgrade to VIP</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const renderSession = ({ item }: { item: AdvisorSession }) => (
    <Pressable
      onPress={() => handleSelectSession(item)}
      style={({ pressed }) => [
        styles.sessionCard,
        pressed && styles.sessionCardPressed,
      ]}
    >
      <View style={styles.sessionHeader}>
        <MessageCircle size={16} color={colors.accent} />
        <Text style={styles.sessionDate}>{formatDate(item.createdAt)}</Text>
        <Text style={styles.messageCount}>
          {item.messages.length} messages
        </Text>
      </View>
      <Text style={styles.sessionPreview} numberOfLines={2}>
        {getSessionPreview(item)}
      </Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <ChevronLeft size={24} color={colors.primary} />
        </Pressable>
        <Text style={styles.headerTitle}>Conversation History</Text>
        <View style={{ width: 40 }} />
      </View>

      {sessionHistory.length === 0 ? (
        <View style={styles.emptyState}>
          <Clock size={48} color={colors.tertiary} />
          <Text style={styles.emptyTitle}>No History Yet</Text>
          <Text style={styles.emptyDescription}>
            Your past conversations with Pocket Kanika will appear here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={sessionHistory}
          renderItem={renderSession}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.accent}
            />
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: spacing.xs,
  },
  headerTitle: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  list: {
    padding: spacing.md,
    gap: spacing.sm,
  },
  sessionCard: {
    ...glass.medium,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sessionCardPressed: {
    opacity: 0.8,
    borderColor: colors.accent,
  },
  sessionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  sessionDate: {
    flex: 1,
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.accent,
  },
  messageCount: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
  sessionPreview: {
    fontSize: typography.sm,
    color: colors.secondary,
    lineHeight: typography.sm * 1.4,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyTitle: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.primary,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  emptyDescription: {
    fontSize: typography.sm,
    color: colors.secondary,
    textAlign: 'center',
  },
  vipGate: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  vipTitle: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  vipDescription: {
    fontSize: typography.sm,
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  upgradeButton: {
    backgroundColor: colors.accent,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.full,
  },
  upgradeButtonText: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.background,
  },
});
