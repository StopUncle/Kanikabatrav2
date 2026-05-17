-- Testimonials, the social-proof wall at /consilium/voices.
-- Supports both video (videoUrl + transcript) and text-only (quoteText)
-- testimonials so the wall can populate from quotes Kanika already has
-- while video collection ramps up.

CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "videoUrl" TEXT,
    "posterUrl" TEXT,
    "durationSeconds" INTEGER,
    "quoteText" TEXT,
    "transcript" TEXT,
    "authorName" TEXT NOT NULL,
    "authorRole" TEXT,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Testimonial_published_displayOrder_idx" ON "Testimonial"("published", "displayOrder");
