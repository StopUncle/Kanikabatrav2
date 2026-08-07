-- One download counter covers all six files behind a book token (the book
-- as PDF and EPUB, plus both addendums in both formats). A buyer taking
-- everything once already spent 6 of the old cap of 10, so honest readers
-- were told they had exhausted 10 downloads they never made.
--
-- Raise the cap for new purchases, and lift everyone already sitting on
-- the old limit so existing buyers stop hitting it too.

ALTER TABLE "Purchase" ALTER COLUMN "maxDownloads" SET DEFAULT 30;

UPDATE "Purchase" SET "maxDownloads" = 30 WHERE "maxDownloads" = 10;
