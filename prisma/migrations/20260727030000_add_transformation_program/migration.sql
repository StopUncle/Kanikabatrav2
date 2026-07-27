-- The 12 Week Transformation.
--
-- Hand-written: this repo's shadow-database diff fails on a pre-existing older
-- migration, so generated SQL is not available here.
--
-- No per-member unlock table by design. A week's availability is derived from
-- the member's own start date, so there is nothing to backfill and nothing that
-- can drift.

-- CreateTable
CREATE TABLE "TransformationWeek" (
    "id" TEXT NOT NULL,
    "weekNumber" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "lede" TEXT NOT NULL,
    "challenge" TEXT NOT NULL,
    "readingLabel" TEXT,
    "readingWhy" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TransformationWeek_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransformationLesson" (
    "id" TEXT NOT NULL,
    "weekId" TEXT NOT NULL,
    "orderIndex" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "videoUrl" TEXT,
    "videoDurationSeconds" INTEGER,
    "posterUrl" TEXT,
    "notes" TEXT,

    CONSTRAINT "TransformationLesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeekCompletion" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "weekNumber" INTEGER NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reflection" TEXT,

    CONSTRAINT "WeekCompletion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LessonView" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "viewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LessonView_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TransformationWeek_weekNumber_key" ON "TransformationWeek"("weekNumber");

-- CreateIndex
CREATE INDEX "TransformationLesson_weekId_idx" ON "TransformationLesson"("weekId");

-- CreateIndex
CREATE UNIQUE INDEX "TransformationLesson_weekId_orderIndex_key" ON "TransformationLesson"("weekId", "orderIndex");

-- CreateIndex
CREATE INDEX "WeekCompletion_weekNumber_completedAt_idx" ON "WeekCompletion"("weekNumber", "completedAt");

-- CreateIndex
CREATE UNIQUE INDEX "WeekCompletion_userId_weekNumber_key" ON "WeekCompletion"("userId", "weekNumber");

-- CreateIndex
CREATE INDEX "LessonView_userId_idx" ON "LessonView"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "LessonView_userId_lessonId_key" ON "LessonView"("userId", "lessonId");

-- AddForeignKey
ALTER TABLE "TransformationLesson" ADD CONSTRAINT "TransformationLesson_weekId_fkey" FOREIGN KEY ("weekId") REFERENCES "TransformationWeek"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeekCompletion" ADD CONSTRAINT "WeekCompletion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeekCompletion" ADD CONSTRAINT "WeekCompletion_weekNumber_fkey" FOREIGN KEY ("weekNumber") REFERENCES "TransformationWeek"("weekNumber") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonView" ADD CONSTRAINT "LessonView_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonView" ADD CONSTRAINT "LessonView_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "TransformationLesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;
