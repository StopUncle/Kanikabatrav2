// Text Analysis Store
// Manages analysis history and state for the Text Game Analyzer

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FullAnalysisResult } from '../services/textGameAnalyzerService';

const ANALYSIS_HISTORY_KEY = '@dark_mirror_text_analysis_history';
const MAX_HISTORY_FREE = 10;
const MAX_HISTORY_PREMIUM = 50;
const MAX_HISTORY_VIP = 200;

interface TextAnalysisState {
  // Current analysis
  currentAnalysis: FullAnalysisResult | null;
  isAnalyzing: boolean;
  error: string | null;

  // History
  history: FullAnalysisResult[];

  // Input state
  inputText: string;
  yourMessages: string;
  theirMessages: string;

  // Actions
  setCurrentAnalysis: (analysis: FullAnalysisResult) => void;
  clearCurrentAnalysis: () => void;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  setError: (error: string | null) => void;

  // Input actions
  setInputText: (text: string) => void;
  setYourMessages: (text: string) => void;
  setTheirMessages: (text: string) => void;
  clearInputs: () => void;

  // History actions
  addToHistory: (analysis: FullAnalysisResult, tier: 'free' | 'premium' | 'vip') => void;
  removeFromHistory: (id: string) => void;
  clearHistory: () => void;
  getHistoryForTier: (tier: 'free' | 'premium' | 'vip') => FullAnalysisResult[];
}

export const useTextAnalysisStore = create<TextAnalysisState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentAnalysis: null,
      isAnalyzing: false,
      error: null,
      history: [],
      inputText: '',
      yourMessages: '',
      theirMessages: '',

      // Current analysis actions
      setCurrentAnalysis: (analysis) => {
        set({ currentAnalysis: analysis, error: null });
      },

      clearCurrentAnalysis: () => {
        set({ currentAnalysis: null });
      },

      setIsAnalyzing: (isAnalyzing) => {
        set({ isAnalyzing });
      },

      setError: (error) => {
        set({ error, isAnalyzing: false });
      },

      // Input actions
      setInputText: (text) => {
        set({ inputText: text });
      },

      setYourMessages: (text) => {
        set({ yourMessages: text });
      },

      setTheirMessages: (text) => {
        set({ theirMessages: text });
      },

      clearInputs: () => {
        set({ inputText: '', yourMessages: '', theirMessages: '' });
      },

      // History actions
      addToHistory: (analysis, tier) => {
        const maxHistory = tier === 'vip'
          ? MAX_HISTORY_VIP
          : tier === 'premium'
            ? MAX_HISTORY_PREMIUM
            : MAX_HISTORY_FREE;

        set((state) => {
          // Add to beginning, remove duplicates by ID
          const filtered = state.history.filter(a => a.id !== analysis.id);
          const newHistory = [analysis, ...filtered].slice(0, maxHistory);
          return { history: newHistory };
        });
      },

      removeFromHistory: (id) => {
        set((state) => ({
          history: state.history.filter(a => a.id !== id),
        }));
      },

      clearHistory: () => {
        set({ history: [] });
      },

      getHistoryForTier: (tier) => {
        const maxHistory = tier === 'vip'
          ? MAX_HISTORY_VIP
          : tier === 'premium'
            ? MAX_HISTORY_PREMIUM
            : MAX_HISTORY_FREE;

        return get().history.slice(0, maxHistory);
      },
    }),
    {
      name: ANALYSIS_HISTORY_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        history: state.history,
      }),
    }
  )
);

// Selector hooks for common access patterns
export const useCurrentAnalysis = () => useTextAnalysisStore((state) => state.currentAnalysis);
export const useIsAnalyzing = () => useTextAnalysisStore((state) => state.isAnalyzing);
export const useAnalysisError = () => useTextAnalysisStore((state) => state.error);
export const useAnalysisHistory = () => useTextAnalysisStore((state) => state.history);

// Helper to get power balance color
export function getPowerBalanceColor(balance: string): string {
  switch (balance) {
    case 'strong':
      return '#22C55E'; // Green
    case 'equal':
      return '#C9A961'; // Gold
    case 'weak':
      return '#F97316'; // Orange
    case 'submissive':
      return '#EF4444'; // Red
    default:
      return '#9A9A9A'; // Gray
  }
}

// Helper to format date for display
export function formatAnalysisDate(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
}
