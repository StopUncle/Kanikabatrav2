/**
 * The Twelve's shape: three arcs of three build weeks and a Gauntlet.
 *
 * Build weeks isolate one behaviour. The Gauntlet is the compound rep: no
 * new behaviour, one situation that requires all three of the arc's
 * behaviours at once. This layer sits on top of the existing curriculum and
 * never changes it; week 12 was always the synthesis week, the Gauntlet is
 * its name.
 */

export const GAUNTLET_WEEKS = [4, 8, 12] as const;

export function isGauntletWeek(weekNumber: number): boolean {
  return (GAUNTLET_WEEKS as readonly number[]).includes(weekNumber);
}

/** 1, 2 or 3. Weeks 1-4 are arc 1, 5-8 arc 2, 9-12 arc 3. */
export function arcOf(weekNumber: number): number {
  return Math.ceil(weekNumber / 4);
}

/** The build weeks a Gauntlet compounds: [1,2,3] for week 4, and so on. */
export function buildWeeksOf(gauntletWeek: number): number[] {
  const start = gauntletWeek - 3;
  return [start, start + 1, start + 2];
}
