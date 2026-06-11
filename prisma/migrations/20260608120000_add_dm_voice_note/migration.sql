-- Voice messages in 1-on-1 direct messages. Additive nullable column; a
-- message is a voice note when this URL is set (content may be empty).

-- AlterTable
ALTER TABLE "DirectMessage" ADD COLUMN "voiceNoteUrl" TEXT;
