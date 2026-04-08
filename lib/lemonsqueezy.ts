import {
  lemonSqueezySetup,
  createCheckout,
  getSubscription,
  cancelSubscription,
  type NewCheckout,
} from "@lemonsqueezy/lemonsqueezy.js";

lemonSqueezySetup({ apiKey: process.env.LEMONSQUEEZY_API_KEY! });

export const LS_VARIANTS = {
  BOOK: "1502988",
  QUIZ: "1503001",
  INNER_CIRCLE: "1503007",
  COACHING_SINGLE: "1503016",
  COACHING_INTENSIVE: "1503021",
  COACHING_CAREER: "1503024",
  COACHING_RETAINER: "1503027",
  ASK_WRITTEN_1Q: "1503028",
  ASK_WRITTEN_3Q: "1503033",
  ASK_VOICE_1Q: "1503035",
  ASK_VOICE_3Q: "1503042",
} as const;

export const LS_STORE_ID = "339553";

export async function createLemonCheckout(
  variantId: string,
  options?: {
    email?: string;
    name?: string;
    customData?: Record<string, string>;
    redirectUrl?: string;
  },
) {
  const checkoutOptions: NewCheckout = {
    checkoutData: {
      email: options?.email,
      name: options?.name,
      custom: options?.customData
        ? Object.entries(options.customData).reduce(
            (acc, [k, v]) => {
              acc[k] = v;
              return acc;
            },
            {} as Record<string, string>,
          )
        : undefined,
    },
    checkoutOptions: {
      embed: true,
      media: false,
      desc: false,
    },
    productOptions: {
      redirectUrl:
        options?.redirectUrl ||
        `${process.env.NEXT_PUBLIC_BASE_URL || "https://kanikarose.com"}/success`,
    },
  };

  return await createCheckout(LS_STORE_ID, variantId, checkoutOptions);
}

export async function getLemonSubscription(subscriptionId: string) {
  return await getSubscription(subscriptionId);
}

export async function cancelLemonSubscription(subscriptionId: string) {
  return await cancelSubscription(subscriptionId);
}
