-- The Arrival gets a server-side completion stamp, every tier.
ALTER TABLE "User" ADD COLUMN "arrivalAt" TIMESTAMP(3);
