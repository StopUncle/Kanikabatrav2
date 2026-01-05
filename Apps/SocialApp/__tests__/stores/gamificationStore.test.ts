import { renderHook, act } from '@testing-library/react-native';
import { useGamificationStore } from '../../stores/gamificationStore';

// Mock Supabase
jest.mock('../../lib/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn(() => Promise.resolve({ data: null, error: null })),
        })),
      })),
      update: jest.fn(() => ({
        eq: jest.fn(() => Promise.resolve({ data: null, error: null })),
      })),
    })),
    rpc: jest.fn(() => Promise.resolve({ data: [], error: null })),
  },
  isSupabaseConfigured: false,
}));

// Mock authStore
jest.mock('../../stores/authStore', () => ({
  useAuthStore: {
    getState: jest.fn(() => ({
      user: null,
    })),
  },
}));

describe('GamificationStore', () => {
  beforeEach(() => {
    // Reset store state between tests
    const { result } = renderHook(() => useGamificationStore());
    act(() => {
      result.current.reset();
    });
  });

  describe('initial state', () => {
    it('should start with default values', () => {
      const { result } = renderHook(() => useGamificationStore());

      expect(result.current.currentStreak).toBe(0);
      expect(result.current.maxStreak).toBe(0);
      expect(result.current.totalXp).toBe(0);
      expect(result.current.currentLevel).toBe(1);
      expect(result.current.xpToNextLevel).toBe(100);
      expect(result.current.earnedBadges).toEqual([]);
      expect(result.current.earnedCards).toEqual([]);
    });
  });

  describe('addXp', () => {
    it('should add XP to total', async () => {
      const { result } = renderHook(() => useGamificationStore());

      await act(async () => {
        await result.current.addXp(50);
      });

      expect(result.current.totalXp).toBe(50);
    });

    it('should accumulate XP across multiple additions', async () => {
      const { result } = renderHook(() => useGamificationStore());

      await act(async () => {
        await result.current.addXp(25);
        await result.current.addXp(30);
        await result.current.addXp(45);
      });

      expect(result.current.totalXp).toBe(100);
    });

    it('should calculate level correctly at level 1', async () => {
      const { result } = renderHook(() => useGamificationStore());

      await act(async () => {
        await result.current.addXp(50);
      });

      expect(result.current.currentLevel).toBe(1);
      expect(result.current.xpToNextLevel).toBe(50); // 100 - 50 = 50
    });

    it('should level up to 2 at 100 XP', async () => {
      const { result } = renderHook(() => useGamificationStore());

      await act(async () => {
        await result.current.addXp(100);
      });

      expect(result.current.currentLevel).toBe(2);
      expect(result.current.xpToNextLevel).toBe(150); // 250 - 100 = 150
    });

    it('should level up to 3 at 250 XP', async () => {
      const { result } = renderHook(() => useGamificationStore());

      await act(async () => {
        await result.current.addXp(250);
      });

      expect(result.current.currentLevel).toBe(3);
      expect(result.current.xpToNextLevel).toBe(250); // 500 - 250 = 250
    });

    it('should level up to 4 at 500 XP', async () => {
      const { result } = renderHook(() => useGamificationStore());

      await act(async () => {
        await result.current.addXp(500);
      });

      expect(result.current.currentLevel).toBe(4);
      expect(result.current.xpToNextLevel).toBe(500); // 1000 - 500 = 500
    });

    it('should level up to 5 at 1000 XP', async () => {
      const { result } = renderHook(() => useGamificationStore());

      await act(async () => {
        await result.current.addXp(1000);
      });

      expect(result.current.currentLevel).toBe(5);
      expect(result.current.xpToNextLevel).toBe(1000); // 2000 - 1000 = 1000
    });

    it('should reach max level (10) at 12000 XP', async () => {
      const { result } = renderHook(() => useGamificationStore());

      await act(async () => {
        await result.current.addXp(12000);
      });

      expect(result.current.currentLevel).toBe(10);
    });
  });

  describe('earnBadge', () => {
    it('should add new badge to earnedBadges', async () => {
      const { result } = renderHook(() => useGamificationStore());

      await act(async () => {
        await result.current.earnBadge('first_quiz');
      });

      expect(result.current.earnedBadges).toContain('first_quiz');
    });

    it('should not add duplicate badges', async () => {
      const { result } = renderHook(() => useGamificationStore());

      await act(async () => {
        await result.current.earnBadge('first_quiz');
        await result.current.earnBadge('first_quiz'); // Try to add again
      });

      expect(result.current.earnedBadges).toEqual(['first_quiz']);
      expect(result.current.earnedBadges.length).toBe(1);
    });

    it('should add multiple different badges', async () => {
      const { result } = renderHook(() => useGamificationStore());

      await act(async () => {
        await result.current.earnBadge('first_quiz');
        await result.current.earnBadge('streak_3');
        await result.current.earnBadge('course_complete');
      });

      expect(result.current.earnedBadges).toContain('first_quiz');
      expect(result.current.earnedBadges).toContain('streak_3');
      expect(result.current.earnedBadges).toContain('course_complete');
      expect(result.current.earnedBadges.length).toBe(3);
    });
  });

  describe('earnCard', () => {
    it('should add new card to earnedCards', async () => {
      const { result } = renderHook(() => useGamificationStore());

      await act(async () => {
        await result.current.earnCard('card-love-bombing');
      });

      expect(result.current.earnedCards).toContain('card-love-bombing');
    });

    it('should not add duplicate cards', async () => {
      const { result } = renderHook(() => useGamificationStore());

      await act(async () => {
        await result.current.earnCard('card-love-bombing');
        await result.current.earnCard('card-love-bombing'); // Try to add again
      });

      expect(result.current.earnedCards).toEqual(['card-love-bombing']);
      expect(result.current.earnedCards.length).toBe(1);
    });

    it('should add multiple different cards', async () => {
      const { result } = renderHook(() => useGamificationStore());

      await act(async () => {
        await result.current.earnCard('card-love-bombing');
        await result.current.earnCard('card-gaslighting');
        await result.current.earnCard('card-mirroring');
      });

      expect(result.current.earnedCards.length).toBe(3);
    });
  });

  describe('reset', () => {
    it('should reset all state to defaults', async () => {
      const { result } = renderHook(() => useGamificationStore());

      // First, add some data
      await act(async () => {
        await result.current.addXp(500);
        await result.current.earnBadge('first_quiz');
        await result.current.earnCard('card-love-bombing');
      });

      // Verify data was added
      expect(result.current.totalXp).toBe(500);
      expect(result.current.earnedBadges.length).toBe(1);
      expect(result.current.earnedCards.length).toBe(1);

      // Reset
      act(() => {
        result.current.reset();
      });

      // Verify all reset to defaults
      expect(result.current.currentStreak).toBe(0);
      expect(result.current.maxStreak).toBe(0);
      expect(result.current.totalXp).toBe(0);
      expect(result.current.currentLevel).toBe(1);
      expect(result.current.xpToNextLevel).toBe(100);
      expect(result.current.earnedBadges).toEqual([]);
      expect(result.current.earnedCards).toEqual([]);
      expect(result.current.streakJustIncreased).toBe(false);
      expect(result.current.streakMilestone).toBeNull();
    });
  });

  describe('checkStreak - local mode', () => {
    it('should start streak at 1 for first check', async () => {
      const { result } = renderHook(() => useGamificationStore());

      await act(async () => {
        await result.current.checkStreak();
      });

      expect(result.current.currentStreak).toBe(1);
      expect(result.current.maxStreak).toBe(1);
    });

    it('should not update streak if already checked today', async () => {
      const { result } = renderHook(() => useGamificationStore());

      await act(async () => {
        await result.current.checkStreak();
      });

      const streakAfterFirst = result.current.currentStreak;

      // Check again on same day
      await act(async () => {
        await result.current.checkStreak();
      });

      // Streak should stay the same
      expect(result.current.currentStreak).toBe(streakAfterFirst);
    });
  });

  describe('level calculation edge cases', () => {
    it('should handle XP between levels correctly', async () => {
      const { result } = renderHook(() => useGamificationStore());

      await act(async () => {
        await result.current.addXp(175); // Between level 2 (100) and level 3 (250)
      });

      expect(result.current.currentLevel).toBe(2);
      expect(result.current.xpToNextLevel).toBe(75); // 250 - 175 = 75
    });

    it('should handle XP exactly at threshold', async () => {
      const { result } = renderHook(() => useGamificationStore());

      await act(async () => {
        await result.current.addXp(100); // Exactly at level 2
      });

      expect(result.current.currentLevel).toBe(2);
    });

    it('should handle XP just below threshold', async () => {
      const { result } = renderHook(() => useGamificationStore());

      await act(async () => {
        await result.current.addXp(99); // Just below level 2
      });

      expect(result.current.currentLevel).toBe(1);
      expect(result.current.xpToNextLevel).toBe(1); // 100 - 99 = 1
    });
  });

  describe('level thresholds', () => {
    const levelTests = [
      { xp: 0, level: 1 },
      { xp: 99, level: 1 },
      { xp: 100, level: 2 },
      { xp: 249, level: 2 },
      { xp: 250, level: 3 },
      { xp: 499, level: 3 },
      { xp: 500, level: 4 },
      { xp: 999, level: 4 },
      { xp: 1000, level: 5 },
      { xp: 1999, level: 5 },
      { xp: 2000, level: 6 },
      { xp: 3499, level: 6 },
      { xp: 3500, level: 7 },
      { xp: 5499, level: 7 },
      { xp: 5500, level: 8 },
      { xp: 7999, level: 8 },
      { xp: 8000, level: 9 },
      { xp: 11999, level: 9 },
      { xp: 12000, level: 10 },
      { xp: 20000, level: 10 },
    ];

    levelTests.forEach(({ xp, level }) => {
      it(`should be level ${level} at ${xp} XP`, async () => {
        const { result } = renderHook(() => useGamificationStore());

        // Reset first to ensure clean state
        act(() => {
          result.current.reset();
        });

        await act(async () => {
          await result.current.addXp(xp);
        });

        expect(result.current.currentLevel).toBe(level);
      });
    });
  });
});
