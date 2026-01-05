import { useState, useEffect, useRef, useCallback } from 'react';
import { logger } from '../../lib/logger';
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
import { colors, spacing, typography, borderRadius } from '../../lib/theme';
import { haptics } from '../../lib/haptics';
import { chatService, ChatMessage, TypingUser } from '../../services/chatService';
import { AvatarWithRewards } from '../../components/avatar';
import { useAuthStore } from '../../stores/authStore';
import { useThrottledCallback } from '../../lib/hooks';

export default function ChatRoomScreen() {
  const { roomId, roomName, roomIcon } = useLocalSearchParams<{
    roomId: string;
    roomName: string;
    roomIcon: string;
  }>();
  const { user } = useAuthStore();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);
  const flatListRef = useRef<FlatList>(null);

  // Only allow real authenticated users to send messages
  const currentUserId = user?.id;
  const currentUserName = user?.full_name || 'Anonymous';
  const isAuthenticated = !!currentUserId;

  // Create stable refs for throttled callback to avoid stale closures
  const roomIdRef = useRef(roomId);
  const currentUserIdRef = useRef(currentUserId);
  const currentUserNameRef = useRef(currentUserName);

  // Update refs when values change
  useEffect(() => {
    roomIdRef.current = roomId;
    currentUserIdRef.current = currentUserId;
    currentUserNameRef.current = currentUserName;
  }, [roomId, currentUserId, currentUserName]);

  // Throttle typing broadcasts - uses refs to avoid stale closures
  const broadcastTypingCallback = useCallback(
    (isTyping: boolean) => {
      if (currentUserIdRef.current && roomIdRef.current) {
        chatService.broadcastTyping(
          roomIdRef.current,
          currentUserIdRef.current,
          currentUserNameRef.current,
          isTyping
        );
      }
    },
    [] // Empty deps - uses refs for current values
  );
  const throttledBroadcastTyping = useThrottledCallback(broadcastTypingCallback, 300);

  useEffect(() => {
    void loadMessages();

    // Initialize cleanup functions to no-op to prevent undefined errors
    let unsubscribeMessages: (() => void) | undefined;
    let unsubscribeTyping: (() => void) | undefined;

    // Only subscribe to real-time updates if authenticated
    if (currentUserId && roomId) {
      // Subscribe to real-time updates
      unsubscribeMessages = chatService.subscribeToRoom(roomId, (message) => {
        // Don't add own messages (they're added optimistically in handleSend)
        if (message.user_id === currentUserId) {
          return;
        }
        setMessages((prev) => [...prev, message]);
        // Scroll to bottom on new message
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
      });

      // Subscribe to typing indicators
      unsubscribeTyping = chatService.subscribeToTyping(
        roomId,
        currentUserId,
        setTypingUsers
      );
    }

    return () => {
      unsubscribeMessages?.();
      unsubscribeTyping?.();
    };
  }, [roomId, currentUserId]);

  const loadMessages = async () => {
    if (!roomId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await chatService.getMessages(roomId);
      setMessages(data);

      // Scroll to bottom after loading
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: false });
      }, 100);
    } catch (err) {
      logger.error('Failed to load messages:', err);
      setError('Unable to load messages. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTextChange = (text: string) => {
    setNewMessage(text);

    // Broadcast typing status (throttled to prevent excessive updates)
    if (text.trim()) {
      throttledBroadcastTyping(true);
    }
  };

  const handleSend = useCallback(async () => {
    if (!newMessage.trim() || sending || !currentUserId || !roomId) return;

    haptics.light();
    setSending(true);

    // Stop typing indicator
    chatService.broadcastTyping(roomId, currentUserId, currentUserName, false);

    const messageText = newMessage.trim();
    setNewMessage(''); // Clear optimistically

    const message = await chatService.sendMessage(roomId, currentUserId, messageText);

    if (message) {
      // Check for duplicates before adding
      setMessages((prev) => {
        if (prev.some(m => m.id === message.id)) return prev;
        return [...prev, message];
      });

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } else {
      // Restore message on failure
      setNewMessage(messageText);
    }

    setSending(false);
  }, [newMessage, sending, currentUserId, roomId, currentUserName]);

  const getTypingText = () => {
    if (typingUsers.length === 0) return null;
    if (typingUsers.length === 1) {
      return `${typingUsers[0].userName} is typing...`;
    }
    if (typingUsers.length === 2) {
      return `${typingUsers[0].userName} and ${typingUsers[1].userName} are typing...`;
    }
    return `${typingUsers[0].userName} and ${typingUsers.length - 1} others are typing...`;
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    const isOwnMessage = item.user_id === currentUserId;

    return (
      <View style={[styles.messageRow, isOwnMessage && styles.messageRowOwn]}>
        {!isOwnMessage && (
          <AvatarWithRewards
            size={32}
            avatarUrl={item.user?.avatar_url}
            userAvatarConfig={item.user?.avatar_config}
          />
        )}

        <View style={[styles.messageBubble, isOwnMessage && styles.messageBubbleOwn]}>
          {!isOwnMessage && (
            <Text style={styles.senderName}>{item.user?.full_name || 'Anonymous'}</Text>
          )}
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
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <ArrowLeft size={24} color={colors.primary} />
        </Pressable>

        <View style={styles.headerInfo}>
          <Text style={styles.roomIcon}>{roomIcon || '💬'}</Text>
          <View>
            <Text style={styles.roomName}>{roomName || 'Chat Room'}</Text>
            <Text style={styles.memberCount}>Online now</Text>
          </View>
        </View>

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
        ) : error ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <Pressable style={styles.retryButton} onPress={loadMessages}>
              <Text style={styles.retryText}>Retry</Text>
            </Pressable>
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

        {/* Typing Indicator */}
        {typingUsers.length > 0 && (
          <View style={styles.typingContainer}>
            <View style={styles.typingDots}>
              <View style={[styles.typingDot, styles.typingDot1]} />
              <View style={[styles.typingDot, styles.typingDot2]} />
              <View style={[styles.typingDot, styles.typingDot3]} />
            </View>
            <Text style={styles.typingText}>{getTypingText()}</Text>
          </View>
        )}

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={handleTextChange}
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
  roomIcon: {
    fontSize: 28,
  },
  roomName: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  memberCount: {
    fontSize: typography.xs,
    color: colors.success,
  },
  keyboardAvoid: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  errorText: {
    fontSize: typography.sm,
    color: colors.secondary,
    textAlign: 'center',
  },
  retryButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.accent,
    borderRadius: borderRadius.md,
  },
  retryText: {
    fontSize: typography.sm,
    color: colors.background,
    fontWeight: typography.semibold,
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
  senderName: {
    fontSize: typography.xs,
    fontWeight: typography.semibold,
    color: colors.accent,
    marginBottom: 2,
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
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    gap: spacing.sm,
  },
  typingDots: {
    flexDirection: 'row',
    gap: 3,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.tertiary,
  },
  typingDot1: {
    opacity: 0.4,
  },
  typingDot2: {
    opacity: 0.6,
  },
  typingDot3: {
    opacity: 0.8,
  },
  typingText: {
    fontSize: typography.xs,
    color: colors.tertiary,
    fontStyle: 'italic',
  },
});
