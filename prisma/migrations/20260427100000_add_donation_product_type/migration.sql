-- Add DONATION as a valid ProductType so Purchase rows from the new
-- /donate flow can be inserted by the Stripe webhook.
ALTER TYPE "ProductType" ADD VALUE IF NOT EXISTS 'DONATION';
