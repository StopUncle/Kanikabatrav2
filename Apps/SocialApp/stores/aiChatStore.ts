// AI Chat Store - Pocket Kanika conversation state
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  aiAdvisorService,
  type AdvisorMessage,
  type AdvisorSession,
} from '../services/aiAdvisorService';
import { buildUserContext } from '../content/advisor';
import { useAuthStore } from './authStore';
import { useGamificationStore } from './gamificationStore';

interface AIChatState {
  // Current session
  currentSession: AdvisorSession | null;
  isLoading: boolean;
  error: string | null;

  // Rate limiting
  messagesThisHour: number;
  hourResetTime: string | null;

  // Session history (VIP)
  sessionHistory: AdvisorSession[];

  // Actions
  initializeSession: () => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
  startNewSession: () => Promise<void>;
  loadSessionHistory: () => Promise<void>;
  clearCurrentSession: () => Promise<void>;
  restoreSession: (session: AdvisorSession) => Promise<void>;
  clearError: () => void;
}

// XP reward for AI conversation
const AI_CONVERSATION_XP = 5;

export const useAIChatStore = create<AIChatState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentSession: null,
      isLoading: false,
      error: null,
      messagesThisHour: 0,
      hourResetTime: null,
      sessionHistory: [],

      // Initialize or restore session
      initializeSession: async () => {
        try {
          const existingSession = await aiAdvisorService.getCurrentSession();

          if (existingSession) {
            set({ currentSession: existingSession });
          } else {
            const newSession = aiAdvisorService.createNewSession();
            await aiAdvisorService.saveSession(newSession);
            set({ currentSession: newSession });
          }

          // Update rate limit status
          const tier = useAuthStore.getState().tier || 'free';
          const rateLimit = await aiAdvisorService.checkRateLimit(tier);
          set({
            messagesThisHour: rateLimit.remaining,
            hourResetTime: rateLimit.resetAt,
          });
        } catch (error) {
          // Fallback to a new session if initialization fails
          const newSession = aiAdvisorService.createNewSession();
          set({
            currentSession: newSession,
            error: 'Failed to load previous session',
          });
        }
      },

      // Send a message to Kanika
      sendMessage: async (content: string) => {
        const { currentSession, isLoading } = get();

        // Prevent race condition - block concurrent sends
        if (isLoading) {
          return;
        }

        if (!currentSession) {
          set({ error: 'No active session' });
          return;
        }

        // Capture session ID at start to detect if session changes during send
        const sessionIdAtStart = currentSession.id;

        // Check rate limit
        const tier = useAuthStore.getState().tier || 'free';
        const rateLimit = await aiAdvisorService.checkRateLimit(tier);

        if (!rateLimit.allowed) {
          set({
            error: `Rate limit reached. Resets at ${new Date(rateLimit.resetAt).toLocaleTimeString()}`,
          });
          return;
        }

        // Set loading BEFORE any async operations to prevent concurrent sends
        set({ isLoading: true, error: null });

        try {
          // Add user message to session
          const userMessage: AdvisorMessage = {
            id: `user-${Date.now()}`,
            role: 'user',
            content,
            timestamp: new Date().toISOString(),
          };

          const updatedMessages = [...currentSession.messages, userMessage];

          // Update session with user message
          const sessionWithUserMessage = {
            ...currentSession,
            messages: updatedMessages,
            lastMessageAt: new Date().toISOString(),
          };
          set({ currentSession: sessionWithUserMessage });
          await aiAdvisorService.saveSession(sessionWithUserMessage);

          // Get AI response
          const context = buildUserContext();
          const assistantMessage = await aiAdvisorService.sendMessage(
            content,
            currentSession.messages,
            context
          );

          // Verify session hasn't changed during the async operation
          const currentState = get();
          if (currentState.currentSession?.id !== sessionIdAtStart) {
            // Session changed during send - discard this response
            set({ isLoading: false });
            return;
          }

          // Update session with assistant response
          const finalMessages = [...updatedMessages, assistantMessage];
          const finalSession: AdvisorSession = {
            ...currentSession,
            messages: finalMessages,
            lastMessageAt: new Date().toISOString(),
            tokensUsed: currentSession.tokensUsed + 1, // Approximate
          };

          set({ currentSession: finalSession });
          await aiAdvisorService.saveSession(finalSession);

          // Increment rate limit
          await aiAdvisorService.incrementRateLimit();

          // Update rate limit display
          const newRateLimit = await aiAdvisorService.checkRateLimit(tier);
          set({
            messagesThisHour: newRateLimit.remaining,
            hourResetTime: newRateLimit.resetAt,
          });

          // Award XP for conversation (first message only per session)
          if (finalMessages.filter((m) => m.role === 'user').length === 1) {
            useGamificationStore.getState().addXp(AI_CONVERSATION_XP);
          }
        } catch (error) {
          set({ error: 'Failed to get response. Please try again.' });
        } finally {
          set({ isLoading: false });
        }
      },

      // Start a new session
      startNewSession: async () => {
        const { currentSession } = get();

        // Archive current session if it has messages
        if (currentSession && currentSession.messages.length > 0) {
          await aiAdvisorService.archiveSession(currentSession);

          // Update local history
          const history = await aiAdvisorService.getSessionHistory();
          set({ sessionHistory: history });
        }

        // Create new session
        const newSession = aiAdvisorService.createNewSession();
        await aiAdvisorService.saveSession(newSession);
        set({ currentSession: newSession, error: null });
      },

      // Load session history (VIP)
      loadSessionHistory: async () => {
        const history = await aiAdvisorService.getSessionHistory();
        set({ sessionHistory: history });
      },

      // Clear current session
      clearCurrentSession: async () => {
        await aiAdvisorService.clearCurrentSession();
        const newSession = aiAdvisorService.createNewSession();
        await aiAdvisorService.saveSession(newSession);
        set({ currentSession: newSession, error: null });
      },

      // Restore a session from history (VIP)
      restoreSession: async (session: AdvisorSession) => {
        // Archive current session if it has messages
        const { currentSession } = get();
        if (currentSession && currentSession.messages.length > 0) {
          await aiAdvisorService.archiveSession(currentSession);
        }

        // Set the historical session as current
        await aiAdvisorService.saveSession(session);
        set({ currentSession: session, error: null });
      },

      // Clear error
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'ai-chat-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        // Only persist rate limit data, sessions are stored separately
        messagesThisHour: state.messagesThisHour,
        hourResetTime: state.hourResetTime,
      }),
    }
  )
);

// Stable empty array for selectors (prevents infinite loops with useSyncExternalStore)
const EMPTY_MESSAGES: AdvisorMessage[] = [];

// Selectors - must return stable references
export const selectCurrentMessages = (state: AIChatState) =>
  state.currentSession?.messages ?? EMPTY_MESSAGES;

export const selectIsSessionEmpty = (state: AIChatState) =>
  !state.currentSession || state.currentSession.messages.length === 0;

export const selectCanSendMessage = (state: AIChatState) =>
  !state.isLoading && state.messagesThisHour > 0;
