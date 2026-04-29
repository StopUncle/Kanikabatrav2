-- Pipeline fields for content development workflow
-- See docs/content-research/lines-2-3-framework.md
-- and docs/content-research/stakes-and-source-framework.md

ALTER TABLE "ContentIdea"
  ADD COLUMN "line2"            TEXT,
  ADD COLUMN "line3"            TEXT,
  ADD COLUMN "hookType"         TEXT,
  ADD COLUMN "line2Mechanism"   TEXT,
  ADD COLUMN "line3Mechanism"   TEXT,
  ADD COLUMN "frame"            TEXT,
  ADD COLUMN "developmentStage" TEXT NOT NULL DEFAULT 'CONCEPT';

CREATE INDEX "ContentIdea_developmentStage_idx" ON "ContentIdea"("developmentStage");
