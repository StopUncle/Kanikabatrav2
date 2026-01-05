// Rotation Store
// Zustand state management for the Rotation Tracker feature

import { create } from 'zustand';
import {
  Prospect,
  ProspectStatus,
  InterestLevel,
  ThreatLevel,
  SmartReminder,
  RotationStats,
  ContactEvent,
} from '../content/rotation/types';
import { rotationTrackerService } from '../services/rotationTrackerService';

interface RotationState {
  // Data
  prospects: Prospect[];
  reminders: SmartReminder[];
  stats: RotationStats;

  // UI State
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
  selectedProspectId: string | null;
  filterStatus: ProspectStatus | 'all';
  sortBy: 'lastContact' | 'interest' | 'name' | 'dateCount';

  // Actions
  initialize: () => Promise<void>;
  refreshData: () => void;

  // Prospect CRUD
  createProspect: (data: CreateProspectData) => Promise<Prospect | null>;
  updateProspect: (id: string, updates: Partial<Prospect>) => Promise<boolean>;
  deleteProspect: (id: string) => Promise<boolean>;
  selectProspect: (id: string | null) => void;

  // Flags & Topics
  addRedFlag: (prospectId: string, text: string, severity: 1 | 2 | 3) => Promise<boolean>;
  addGreenFlag: (prospectId: string, text: string) => Promise<boolean>;
  removeFlag: (prospectId: string, flagId: string, type: 'red' | 'green') => Promise<boolean>;
  addTopic: (prospectId: string, topic: string, details?: string) => Promise<boolean>;
  removeTopic: (prospectId: string, topicId: string) => Promise<boolean>;

  // Contact logging
  logContact: (prospectId: string, type: ContactEvent['type'], initiatedBy: 'you' | 'them', notes?: string) => Promise<boolean>;

  // Photo
  savePhoto: (prospectId: string, uri: string) => Promise<string | null>;

  // Reminders
  refreshReminders: () => void;
  dismissReminder: (reminderId: string) => Promise<void>;

  // Export/Import
  exportData: (password: string) => Promise<string>;
  importData: (data: string, password: string) => Promise<{ success: boolean; count: number; error?: string }>;

  // Filter/Sort
  setFilterStatus: (status: ProspectStatus | 'all') => void;
  setSortBy: (sortBy: RotationState['sortBy']) => void;

  // Computed
  getFilteredProspects: () => Prospect[];
  getProspectById: (id: string) => Prospect | undefined;

  // Clear
  clearAll: () => Promise<void>;
  setError: (error: string | null) => void;
}

export interface CreateProspectData {
  name: string;
  nickname?: string;
  platform: Prospect['platform'];
  platformHandle?: string;
  status?: ProspectStatus;
  interestLevel?: InterestLevel;
  theirInterestLevel?: InterestLevel;
  threatLevel?: ThreatLevel;
  generalNotes?: string;
}

export const useRotationStore = create<RotationState>((set, get) => ({
  // Initial state
  prospects: [],
  reminders: [],
  stats: {
    total: 0,
    active: 0,
    onHold: 0,
    archived: 0,
    averageInterest: 0,
    hotProspects: 0,
    needsAttention: 0,
  },
  isLoading: false,
  isInitialized: false,
  error: null,
  selectedProspectId: null,
  filterStatus: 'all',
  sortBy: 'lastContact',

  // Initialize
  initialize: async () => {
    if (get().isInitialized) return;

    set({ isLoading: true });

    try {
      await rotationTrackerService.initialize();

      set({
        prospects: rotationTrackerService.getProspects(),
        stats: rotationTrackerService.getStats(),
        reminders: rotationTrackerService.getReminders(),
        isInitialized: true,
        isLoading: false,
      });
    } catch (error: unknown) {
      set({
        error: error instanceof Error ? error.message : 'Failed to initialize',
        isLoading: false,
        isInitialized: true,
      });
    }
  },

  // Refresh data from service
  refreshData: () => {
    set({
      prospects: rotationTrackerService.getProspects(),
      stats: rotationTrackerService.getStats(),
    });
  },

  // Create prospect
  createProspect: async (data) => {
    const { isInitialized, initialize } = get();
    if (!isInitialized) await initialize();

    set({ isLoading: true, error: null });

    try {
      const prospect = await rotationTrackerService.createProspect({
        name: data.name,
        nickname: data.nickname,
        platform: data.platform,
        platformHandle: data.platformHandle,
        status: data.status || 'active',
        interestLevel: data.interestLevel || 3,
        theirInterestLevel: data.theirInterestLevel,
        threatLevel: data.threatLevel || 'green',
        generalNotes: data.generalNotes,
        lastContact: new Date().toISOString(),
        dateCount: 0,
      });

      set({
        prospects: rotationTrackerService.getProspects(),
        stats: rotationTrackerService.getStats(),
        isLoading: false,
      });

      return prospect;
    } catch (error: unknown) {
      set({ error: error instanceof Error ? error.message : 'Failed to create prospect', isLoading: false });
      return null;
    }
  },

  // Update prospect
  updateProspect: async (id, updates) => {
    const { isInitialized, initialize } = get();
    if (!isInitialized) await initialize();

    try {
      const result = await rotationTrackerService.updateProspect(id, updates);
      if (result) {
        set({
          prospects: rotationTrackerService.getProspects(),
          stats: rotationTrackerService.getStats(),
        });
        return true;
      }
      return false;
    } catch (error: unknown) {
      set({ error: error instanceof Error ? error.message : 'Failed to update prospect' });
      return false;
    }
  },

  // Delete prospect
  deleteProspect: async (id) => {
    const { isInitialized, initialize } = get();
    if (!isInitialized) await initialize();

    try {
      const success = await rotationTrackerService.deleteProspect(id);
      if (success) {
        set({
          prospects: rotationTrackerService.getProspects(),
          stats: rotationTrackerService.getStats(),
          selectedProspectId: get().selectedProspectId === id ? null : get().selectedProspectId,
        });
      }
      return success;
    } catch (error: unknown) {
      set({ error: error instanceof Error ? error.message : 'Failed to delete prospect' });
      return false;
    }
  },

  // Select prospect
  selectProspect: (id) => {
    set({ selectedProspectId: id });
  },

  // Add red flag
  addRedFlag: async (prospectId, text, severity) => {
    try {
      const flag = await rotationTrackerService.addRedFlag(prospectId, text, severity);
      if (flag) {
        set({ prospects: rotationTrackerService.getProspects() });
        return true;
      }
      return false;
    } catch {
      return false;
    }
  },

  // Add green flag
  addGreenFlag: async (prospectId, text) => {
    try {
      const flag = await rotationTrackerService.addGreenFlag(prospectId, text);
      if (flag) {
        set({ prospects: rotationTrackerService.getProspects() });
        return true;
      }
      return false;
    } catch {
      return false;
    }
  },

  // Remove flag
  removeFlag: async (prospectId, flagId, type) => {
    try {
      const success = await rotationTrackerService.removeFlag(prospectId, flagId, type);
      if (success) {
        set({ prospects: rotationTrackerService.getProspects() });
      }
      return success;
    } catch {
      return false;
    }
  },

  // Add topic
  addTopic: async (prospectId, topic, details) => {
    try {
      const result = await rotationTrackerService.addTopic(prospectId, topic, details);
      if (result) {
        set({ prospects: rotationTrackerService.getProspects() });
        return true;
      }
      return false;
    } catch {
      return false;
    }
  },

  // Remove topic
  removeTopic: async (prospectId, topicId) => {
    try {
      const success = await rotationTrackerService.removeTopic(prospectId, topicId);
      if (success) {
        set({ prospects: rotationTrackerService.getProspects() });
      }
      return success;
    } catch {
      return false;
    }
  },

  // Log contact
  logContact: async (prospectId, type, initiatedBy, notes) => {
    try {
      const event = await rotationTrackerService.logContact(prospectId, type, initiatedBy, notes);
      if (event) {
        set({
          prospects: rotationTrackerService.getProspects(),
          stats: rotationTrackerService.getStats(),
        });
        return true;
      }
      return false;
    } catch {
      return false;
    }
  },

  // Save photo
  savePhoto: async (prospectId, uri) => {
    try {
      const savedUri = await rotationTrackerService.savePhoto(prospectId, uri);
      if (savedUri) {
        set({ prospects: rotationTrackerService.getProspects() });
      }
      return savedUri;
    } catch {
      return null;
    }
  },

  // Refresh reminders
  refreshReminders: () => {
    const reminders = rotationTrackerService.generateSmartReminders();
    set({ reminders });
  },

  // Dismiss reminder
  dismissReminder: async (reminderId) => {
    await rotationTrackerService.dismissReminder(reminderId);
    set({ reminders: rotationTrackerService.getReminders() });
  },

  // Export
  exportData: async (password) => {
    return rotationTrackerService.exportData(password);
  },

  // Import
  importData: async (data, password) => {
    const result = await rotationTrackerService.importData(data, password);
    if (result.success) {
      set({
        prospects: rotationTrackerService.getProspects(),
        stats: rotationTrackerService.getStats(),
      });
    }
    return result;
  },

  // Filter
  setFilterStatus: (status) => {
    set({ filterStatus: status });
  },

  // Sort
  setSortBy: (sortBy) => {
    set({ sortBy });
  },

  // Get filtered and sorted prospects
  getFilteredProspects: () => {
    const { prospects, filterStatus, sortBy } = get();

    let filtered = filterStatus === 'all'
      ? prospects
      : prospects.filter(p => p.status === filterStatus);

    // Sort
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'lastContact':
          return new Date(b.lastContact).getTime() - new Date(a.lastContact).getTime();
        case 'interest':
          return b.interestLevel - a.interestLevel;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'dateCount':
          return b.dateCount - a.dateCount;
        default:
          return 0;
      }
    });

    return filtered;
  },

  // Get prospect by ID
  getProspectById: (id) => {
    return get().prospects.find(p => p.id === id);
  },

  // Clear all
  clearAll: async () => {
    await rotationTrackerService.clearAllData();
    set({
      prospects: [],
      reminders: [],
      stats: {
        total: 0,
        active: 0,
        onHold: 0,
        archived: 0,
        averageInterest: 0,
        hotProspects: 0,
        needsAttention: 0,
      },
      selectedProspectId: null,
    });
  },

  // Set error
  setError: (error) => {
    set({ error });
  },
}));

// Selector hooks
export const useProspects = () => useRotationStore((s) => s.getFilteredProspects());
export const useRotationStats = () => useRotationStore((s) => s.stats);
export const useReminders = () => useRotationStore((s) => s.reminders);
export const useSelectedProspect = () => {
  const id = useRotationStore((s) => s.selectedProspectId);
  const prospects = useRotationStore((s) => s.prospects);
  return prospects.find(p => p.id === id);
};

// Helper to format last contact
export function formatLastContact(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 14) return '1 week ago';
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
