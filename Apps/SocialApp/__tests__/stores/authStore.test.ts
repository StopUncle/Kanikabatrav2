// Auth Store Tests
// Tests for authentication state management

import { renderHook, act } from '@testing-library/react-native';
import { useAuthStore, useHasAccess } from '../../stores/authStore';

describe('AuthStore', () => {
  beforeEach(() => {
    // Reset store state between tests
    const { result } = renderHook(() => useAuthStore());
    act(() => {
      result.current.signOut();
    });
  });

  describe('initial state', () => {
    it('should start with no authenticated user', () => {
      const { result } = renderHook(() => useAuthStore());

      expect(result.current.user).toBeNull();
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('continueAsGuest', () => {
    it('should set guest user correctly', () => {
      const { result } = renderHook(() => useAuthStore());

      act(() => {
        result.current.continueAsGuest();
      });

      expect(result.current.isGuest).toBe(true);
      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.tier).toBe('free');
      expect(result.current.user?.id).toContain('guest-');
    });
  });

  describe('markWelcomeSeen', () => {
    it('should update hasSeenWelcome flag', () => {
      const { result } = renderHook(() => useAuthStore());

      expect(result.current.hasSeenWelcome).toBe(false);

      act(() => {
        result.current.markWelcomeSeen();
      });

      expect(result.current.hasSeenWelcome).toBe(true);
    });
  });

  describe('tier access', () => {
    it('should correctly check tier access with useHasAccess', () => {
      // Set up a guest user (free tier)
      const { result: authResult } = renderHook(() => useAuthStore());
      act(() => {
        authResult.current.continueAsGuest();
      });

      // Check access
      const { result: freeAccess } = renderHook(() => useHasAccess('free'));
      expect(freeAccess.current).toBe(true);

      const { result: premiumAccess } = renderHook(() => useHasAccess('premium'));
      expect(premiumAccess.current).toBe(false);
    });
  });
});
