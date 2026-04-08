// Payhip integration for kanikarose.com
// Products are created in Payhip dashboard with clean names
// Checkout uses redirect to payhip.com/buy?link=[code]

import crypto from "crypto";

// Product link codes — fill these in after creating products in Payhip
export const PAYHIP_PRODUCTS: Record<string, string> = {
  BOOK: "", // Dating Psychology Masterclass
  QUIZ: "", // Personality Type Assessment
  INNER_CIRCLE: "", // Premium Membership — Monthly
  COACHING_SINGLE: "", // Psychology Consultation — Single
  COACHING_INTENSIVE: "", // Psychology Consultation — Intensive
  COACHING_CAREER: "", // Career Strategy Consultation
  COACHING_RETAINER: "", // Consultation Retainer
  ASK_WRITTEN_1Q: "", // Written Q&A — 1 Question
  ASK_WRITTEN_3Q: "", // Written Q&A — 3 Questions
  ASK_VOICE_1Q: "", // Voice Q&A — 1 Question
  ASK_VOICE_3Q: "", // Voice Q&A — 3 Questions
};

export type PayhipProductKey = keyof typeof PAYHIP_PRODUCTS;

/**
 * Get the checkout URL for a Payhip product.
 * Redirects user to Payhip's hosted checkout page.
 */
export function getPayhipCheckoutUrl(
  productCode: string,
  options?: { email?: string },
): string {
  let url = `https://payhip.com/buy?link=${productCode}`;
  if (options?.email) {
    url += `&email=${encodeURIComponent(options.email)}`;
  }
  return url;
}

/**
 * Get the product page URL for a Payhip product.
 */
export function getPayhipProductUrl(productCode: string): string {
  return `https://payhip.com/b/${productCode}`;
}

/**
 * Verify a Payhip webhook signature.
 * Payhip signs webhooks using SHA256 HMAC with your API key.
 */
export function verifyPayhipWebhook(
  payload: string,
  signature: string,
  apiKey: string,
): boolean {
  const hmac = crypto.createHmac("sha256", apiKey);
  const digest = hmac.update(payload).digest("hex");

  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
  } catch {
    return false;
  }
}
