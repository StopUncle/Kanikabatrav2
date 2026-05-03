-- User handle: public-profile slug for /u/[handle].
-- Optional, opted in by claiming. Lowercase a-z, 0-9, hyphens, 3-30 chars.
-- Application validates the format; DB only enforces uniqueness when set.

ALTER TABLE "User" ADD COLUMN "handle" TEXT;
ALTER TABLE "User" ADD COLUMN "profilePublic" BOOLEAN NOT NULL DEFAULT false;

CREATE UNIQUE INDEX "User_handle_key" ON "User"("handle") WHERE "handle" IS NOT NULL;
