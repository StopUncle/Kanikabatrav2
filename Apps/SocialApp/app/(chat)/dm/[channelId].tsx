import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Send } from 'lucide-react-native';
import { colors, spacing, typography, borderRadius } from '../../../lib/theme';
import { haptics } from '../../../lib/haptics';
import { chatService, DirectMessage } from '../../../services/chatService';
import { useAuthStore } from '../../../stores/authStore';
import { AvatarWithRewards } from '../../../components/avatar';

export default function DmChatScreen() {
  const { channelId, userName, userId: otherUserId, avatarUrl, avatarConfig } = useLocalSearchParams<{
    channelId: string;
    userName: string;
    userId: string;
    avatarUrl: string;
    avatarConfig: string;
  }>();
  const { user } = useAuthStore();

  // Parse avatar config from JSON string (with error handling)
  let parsedAvatarConfig = null;
  try {
    parsedAvatarConfig = avatarConfig ? JSON.parse(avatarConfig) : null;
  } catch {
    // Malformed JSON - use null
  }

  const [messages, setMessages] = useState<DirectMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const currentUserId = user?.id;
  const isAuthenticated = !!currentUserId;

  useEffect(() => {
    if (channelId) {
      void loadMessages();
      void markAsRead();
    }

    // Initialize cleanup function to prevent undefined errors
    let unsubscribe: (() => void) | undefined;

    // Subscribe to real-time updates
    if (currentUserId && channelId) {
      unsubscribe = chatService.subscribeToDmChannel(channelId, (message) => {
        // Don't add own messages (they're added optimistically)
        if (message.sender_id !== currentUserId) {
          setMessages((prev) => [...prev, message]);
          setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
          }, 100);
        }
      });
    }

    return () => {
      unsubscribe?.();
    };
  }, [channelId, currentUserId]);

  const loadMessages = async () => {
    if (!channelId) return;

    try {
      setLoading(true);
      const data = await chatService.getDmMessages(channelId);
      setMessages(data);

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: false });
      }, 100);
    } catch (error) {
      console.error('Failed to load DM messages:', error);
      // Keep existing messages if reload fails
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async () => {
    if (channelId && currentUserId) {
      await chatService.markDmAsRead(channelId, currentUserId);
    }
  };

  const handleSend = async () => {
    if (!newMessage.trim() || sending || !currentUserId || !channelId) return;

    haptics.light();
    setSending(true);

    const message = await chatService.sendDmMessage(channelId, currentUserId, newMessage.trim());

    if (message) {
      setMessages((prev) => [...prev, message]);
      setNewMessage('');

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }

    setSending(false);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessage = ({ item }: { item: DirectMessage }) => {
    const isOwnMessage = item.sender_id === currentUserId;

    return (
      <View style={[styles.messageRow, isOwnMessage && styles.messageRowOwn]}>
        {!isOwnMessage && (
          <AvatarWithRewards
            size={32}
            avatarUrl={item.sender?.avatar_url}
            userAvatarConfig={item.sender?.avatar_config}
          />
        )}

        <View style={[styles.messageBubble, isOwnMessage && styles.messageBubbleOwn]}>
          <Text style={[styles.messageText, isOwnMessage && styles.messageTextOwn]}>
            {item.content}
          </Text>
          <Text style={[styles.messageTime, isOwnMessage && styles.messageTimeOwn]}>
            {formatTime(item.created_at)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={styles.backBtn}
          onPress={() => {
            haptics.light();
            router.replace('/(tabs)/community');
          }}
        >
          <ArrowLeft size={24} color={colors.primary} />
        </Pressable>

        <Pressable
          style={styles.headerInfo}
          onPress={() => {
            if (otherUserId) {
              haptics.light();
              router.push({
                pathname: '/(discover)/[userId]',
                params: { userId: otherUserId },
              });
            }
          }}
        >
          <AvatarWithRewards
            size={48}
            avatarUrl={avatarUrl || undefined}
            userAvatarConfig={parsedAvatarConfig}
            showFrame={false}
          />
          <View>
            <Text style={styles.userName}>{userName || 'User'}</Text>
            <Text style={styles.statusText}>Direct Message</Text>
          </View>
        </Pressable>

        <View style={{ width: 40 }} />
      </View>

      {/* Messages */}
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.accent} />
          </View>
        ) : messages.length === 0 ? (
          <View style={styles.emptyContainer}>
            <AvatarWithRewards
              size={80}
              avatarUrl={avatarUrl || undefined}
              userAvatarConfig={parsedAvatarConfig}
              showFrame={false}
            />
            <Text style={styles.emptyTitle}>Start a conversation</Text>
            <Text style={styles.emptyText}>
              Say hello to {userName?.split(' ')[0] || 'them'}!
            </Text>
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderMessage}
            contentContainerStyle={styles.messagesList}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
          />
        )}

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type a message..."
            placeholderTextColor={colors.tertiary}
            multiline
            maxLength={500}
          />
          <Pressable
            style={[styles.sendButton, (!newMessage.trim() || !isAuthenticated) && styles.sendButtonDisabled]}
            onPress={handleSend}
            disabled={!newMessage.trim() || sending || !isAuthenticated}
          >
            {sending ? (
              <ActivityIndicator size="small" color={colors.background} />
            ) : (
              <Send size={20} color={colors.background} />
            )}
          </Pressable>
        </View>
      </KeyboardAvoidingView>
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
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  userName: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  statusText: {
    fontSize: typography.xs,
    color: colors.secondary,
  },
  keyboardAvoid: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.md,
  },
  emptyTitle: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.primary,
    marginTop: spacing.md,
  },
  emptyText: {
    fontSize: typography.md,
    color: colors.secondary,
    textAlign: 'center',
  },
  messagesList: {
    padding: spacing.md,
    gap: spacing.md,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  messageRowOwn: {
    flexDirection: 'row-reverse',
  },
  messageBubble: {
    maxWidth: '75%',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderBottomLeftRadius: borderRadius.sm,
    padding: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  messageBubbleOwn: {
    backgroundColor: colors.accent,
    borderBottomLeftRadius: borderRadius.lg,
    borderBottomRightRadius: borderRadius.sm,
  },
  messageText: {
    fontSize: typography.sm,
    color: colors.primary,
    lineHeight: 20,
  },
  messageTextOwn: {
    color: colors.background,
  },
  messageTime: {
    fontSize: 10,
    color: colors.tertiary,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  messageTimeOwn: {
    color: 'rgba(0,0,0,0.5)',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: spacing.md,
    gap: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  input: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.sm,
    color: colors.primary,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: colors.tertiary,
  },
});
