-- AlterTable: Add missing columns to CoachingSession
ALTER TABLE "CoachingSession" ADD COLUMN IF NOT EXISTS "userNotes" TEXT;

-- AlterTable: Add missing columns to User
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "displayName" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "avatarUrl" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "emailPreferences" JSONB;

-- CreateEnum (if not exists)
DO $$ BEGIN
    CREATE TYPE "public"."UserRole" AS ENUM ('MEMBER', 'MODERATOR', 'ADMIN');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- AlterTable: Add role column to User
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "role" "public"."UserRole" NOT NULL DEFAULT 'MEMBER';

-- CreateEnum (if not exists)
DO $$ BEGIN
    CREATE TYPE "public"."ProductType" AS ENUM ('BOOK', 'COURSE', 'COACHING', 'QUIZ');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Add QUIZ to ProductType if it doesn't exist
DO $$ BEGIN
    ALTER TYPE "public"."ProductType" ADD VALUE IF NOT EXISTS 'QUIZ';
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- CreateTable: SessionFeedback (if not exists)
CREATE TABLE IF NOT EXISTS "public"."SessionFeedback" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "feedback" TEXT,
    "goals" TEXT,
    "outcomes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "SessionFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex (if not exists)
CREATE UNIQUE INDEX IF NOT EXISTS "SessionFeedback_sessionId_key" ON "public"."SessionFeedback"("sessionId");
CREATE INDEX IF NOT EXISTS "SessionFeedback_sessionId_idx" ON "public"."SessionFeedback"("sessionId");

-- AddForeignKey (if not exists)
DO $$ BEGIN
    ALTER TABLE "public"."SessionFeedback" ADD CONSTRAINT "SessionFeedback_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "public"."CoachingSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;
