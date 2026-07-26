-- Collapse the 7-ring ladder into 4 ranks (Initiate 4, Analyst 3,
-- Profiler 2, IC 1). Thresholds mirror lib/standing/config.ts.
ALTER TABLE "User" ALTER COLUMN "ringLevel" SET DEFAULT 4;

UPDATE "User" SET "ringLevel" = CASE
  WHEN "standing" >= 10000 THEN 1
  WHEN "standing" >= 2500 THEN 2
  WHEN "standing" >= 250 THEN 3
  ELSE 4
END;
