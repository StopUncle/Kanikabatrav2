-- The week clock starts when the member activates, not when they sign.
-- Null = signed but not yet activated: no entries, no scars, no pushes.
ALTER TABLE "Pact" ADD COLUMN "startedAt" TIMESTAMP(3);
