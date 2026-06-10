/**
 * Scenario resolution: static catalog first, generated table second.
 *
 * Server-only (touches Prisma). Every server surface that loads a
 * scenario by id should resolve through here so published generated
 * scenarios are playable everywhere static ones are: the play page,
 * complete, replay, progress, freeform, and choice popularity.
 *
 * Static wins on id collision by construction; the generator also
 * rejects colliding ids at write time.
 */

import { cache } from "react";
import { getScenario } from "./scenarios";
import { getGeneratedScenario } from "./generated";
import type { Scenario } from "./types";

/**
 * Wrapped in React cache() so the two resolves the play page does in one
 * render (generateMetadata + the page body) collapse to a single DB read
 * for generated ids. Static ids short-circuit before any query.
 */
export const resolveScenario = cache(
  async (id: string): Promise<Scenario | null> => {
    const fromCatalog = getScenario(id);
    if (fromCatalog) return fromCatalog;
    return getGeneratedScenario(id);
  },
);
