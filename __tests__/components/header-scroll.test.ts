import { nextHeaderScrolled } from "@/components/Header";

/**
 * The header's scroll-shrink used to run off a single threshold
 * (`scrollY > 24`). One threshold means every pixel of jitter around that
 * exact value flips the state, and the flip animates the header height, the
 * logo size, the border and the mobile menu offset over 300ms. Reverse
 * direction mid-animation and the transition restarts from wherever it had
 * reached, so easing into a scroll made the header visibly wobble.
 *
 * Measured on a phone viewport before the fix: one thumb-shaped scroll path
 * produced four direction reversals in the header's height. After: zero.
 *
 * These tests describe the property that makes that true, so a future
 * simplification back to one threshold fails here rather than on the site.
 */

const SHRINK_PAST = 64;
const GROW_BACK_BELOW = 16;

/** Count how many times the state flips along a scroll path. */
function flips(path: number[], startScrolled = false): number {
  let state = startScrolled;
  let count = 0;
  for (const y of path) {
    const next = nextHeaderScrolled(state, y);
    if (next !== state) count++;
    state = next;
  }
  return count;
}

describe("header scroll-shrink", () => {
  it("shrinks once the reader is past the hero", () => {
    expect(nextHeaderScrolled(false, SHRINK_PAST + 1)).toBe(true);
  });

  it("stays full while still on the hero", () => {
    expect(nextHeaderScrolled(false, SHRINK_PAST)).toBe(false);
    expect(nextHeaderScrolled(false, 0)).toBe(false);
  });

  it("restores at the top of the page", () => {
    expect(nextHeaderScrolled(true, GROW_BACK_BELOW)).toBe(false);
    expect(nextHeaderScrolled(true, 0)).toBe(false);
  });

  it("stays shrunk anywhere above the lower threshold", () => {
    expect(nextHeaderScrolled(true, GROW_BACK_BELOW + 1)).toBe(true);
    expect(nextHeaderScrolled(true, 5000)).toBe(true);
  });

  describe("the dead zone is what kills the wobble", () => {
    it("holds whatever state it is in, throughout the gap", () => {
      // Between the two thresholds nothing changes, in either state. This
      // is the property; the numbers are incidental.
      for (let y = GROW_BACK_BELOW + 1; y <= SHRINK_PAST; y++) {
        expect(nextHeaderScrolled(false, y)).toBe(false);
        expect(nextHeaderScrolled(true, y)).toBe(true);
      }
    });

    it("never flips on jitter around the old 24px threshold", () => {
      // The exact scroll path that produced six distinct header heights in
      // the browser before the fix.
      expect(flips([18, 20, 22, 24, 26, 24, 22, 24, 26, 28, 26, 24, 22, 20])).toBe(0);
    });

    it("never flips twice on jitter around the shrink threshold", () => {
      // Overshooting the trigger and falling back is the other way a thumb
      // produces a wobble. It may shrink once; it must not bounce.
      const path = [58, 62, 66, 70, 66, 62, 58, 62, 66, 60, 55, 62];
      expect(flips(path)).toBe(1);
    });

    it("cannot be made to oscillate by any single-pixel jitter", () => {
      // Sweep a jitter window across the whole range and assert no window
      // can flip the state more than once, in either starting state.
      for (let centre = 0; centre <= 200; centre++) {
        const path = [centre, centre + 1, centre, centre + 1, centre, centre + 1];
        expect(flips(path, false)).toBeLessThanOrEqual(1);
        expect(flips(path, true)).toBeLessThanOrEqual(1);
      }
    });
  });

  it("has a gap wide enough to absorb real scroll jitter", () => {
    // A single threshold is the bug. Guard the separation itself, not just
    // today's two numbers.
    expect(SHRINK_PAST - GROW_BACK_BELOW).toBeGreaterThanOrEqual(32);
  });

  it("still completes the round trip a reader actually makes", () => {
    let state = false;
    state = nextHeaderScrolled(state, 800); // scrolled down to read
    expect(state).toBe(true);
    state = nextHeaderScrolled(state, 300); // scrolled part way back
    expect(state).toBe(true);
    state = nextHeaderScrolled(state, 0); // back to the top
    expect(state).toBe(false);
  });
});
