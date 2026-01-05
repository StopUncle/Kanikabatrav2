import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface NotificationSettings {
  pushEnabled: boolean;
  messages: boolean;
  courseUpdates: boolean;
  coachingReminders: boolean;
  promotions: boolean;
  announcements: boolean;
  dailyTacticalBrief: boolean;
  streakReminders: boolean;
}

export interface AppearanceSettings {
  theme: 'dark' | 'light' | 'system';
  hapticFeedback: boolean;
  reducedMotion: boolean;
}

export interface SimulatorSettings {
  innerVoiceEnabled: boolean;
}

interface SettingsState {
  notifications: NotificationSettings;
  appearance: AppearanceSettings;
  simulator: SimulatorSettings;

  // Actions
  updateNotificationSetting: <K extends keyof NotificationSettings>(
    key: K,
    value: NotificationSettings[K]
  ) => void;
  updateAppearanceSetting: <K extends keyof AppearanceSettings>(
    key: K,
    value: AppearanceSettings[K]
  ) => void;
  updateSimulatorSetting: <K extends keyof SimulatorSettings>(
    key: K,
    value: SimulatorSettings[K]
  ) => void;
  resetSettings: () => void;
}

const defaultNotifications: NotificationSettings = {
  pushEnabled: true,
  messages: true,
  courseUpdates: true,
  coachingReminders: true,
  promotions: false,
  announcements: true,
  dailyTacticalBrief: true,
  streakReminders: true,
};

const defaultAppearance: AppearanceSettings = {
  theme: 'dark',
  hapticFeedback: true,
  reducedMotion: false,
};

const defaultSimulator: SimulatorSettings = {
  innerVoiceEnabled: true,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      notifications: defaultNotifications,
      appearance: defaultAppearance,
      simulator: defaultSimulator,

      updateNotificationSetting: (key, value) =>
        set((state) => ({
          notifications: {
            ...state.notifications,
            [key]: value,
          },
        })),

      updateAppearanceSetting: (key, value) =>
        set((state) => ({
          appearance: {
            ...state.appearance,
            [key]: value,
          },
        })),

      updateSimulatorSetting: (key, value) =>
        set((state) => ({
          simulator: {
            ...state.simulator,
            [key]: value,
          },
        })),

      resetSettings: () =>
        set({
          notifications: defaultNotifications,
          appearance: defaultAppearance,
          simulator: defaultSimulator,
        }),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Selector hooks for convenience
export const useNotificationSettings = () =>
  useSettingsStore((state) => state.notifications);

export const useAppearanceSettings = () =>
  useSettingsStore((state) => state.appearance);

export const useSimulatorSettings = () =>
  useSettingsStore((state) => state.simulator ?? { innerVoiceEnabled: true });
