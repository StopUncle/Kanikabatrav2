import {
  SITE_CONFIG,
  BOOK_INFO,
  COACHING_PACKAGES,
  SOCIAL_LINKS,
} from "./constants";

const BASE_URL = "https://kanikarose.com";

// Brand logo for schema.org logo fields (needs a real, square-ish logo image).
const LOGO_URL = `${BASE_URL}/images/kanikarose-logo.png`;
// Dynamic 1200x630 social card, reused as the image fallback across schemas.
const OG_IMAGE_URL = `${BASE_URL}/api/og`;

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: BASE_URL,
    logo: LOGO_URL,
    description: SITE_CONFIG.description,
    sameAs: [SOCIAL_LINKS.instagram, SOCIAL_LINKS.youtube, SOCIAL_LINKS.tiktok],
    contactPoint: {
      "@type": "ContactPoint",
      email: SITE_CONFIG.email,
      contactType: "customer service",
    },
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: BASE_URL,
    description: SITE_CONFIG.description,
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
    },
  };
}

// Canonical "Kanika Batra" entity reference, reused by Person, Book, and
// Article schema so Google resolves every mention to ONE author entity.
// This is the E-E-A-T spine: a consistent, richly-described, real-person
// author whose first-hand experience (clinically diagnosed with ASPD) is
// the differentiator search now rewards. The `@id` anchors the node so
// other schema can reference it instead of duplicating a thin copy.
const KANIKA_ID = `${BASE_URL}/about#kanika`;

// Sub-set of credentials suitable for schema.org `award` (the pageant
// honours). The ASPD diagnosis is the experience anchor and lives in the
// description, not as an "award".
const KANIKA_AWARDS = SITE_CONFIG.credentials.filter(
  (c) => !/diagnos/i.test(c),
);

const KANIKA_SAME_AS = [
  SOCIAL_LINKS.instagram,
  SOCIAL_LINKS.youtube,
  SOCIAL_LINKS.tiktok,
  BOOK_INFO.kdpLink, // Amazon author/book page ties her to a published work
  "https://www.goodreads.com/author/show/4197833.Kanika_Batra", // Goodreads author profile (E-E-A-T: published author)
];

/** Thin author reference for embedding in Book/Article schema. */
export const KANIKA_AUTHOR_REF = {
  "@type": "Person",
  "@id": KANIKA_ID,
  name: SITE_CONFIG.name,
  url: `${BASE_URL}/about`,
  sameAs: KANIKA_SAME_AS,
};

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": KANIKA_ID,
    name: SITE_CONFIG.name,
    alternateName: ["The Psychology of Power", SITE_CONFIG.fullName],
    description: SITE_CONFIG.description,
    url: `${BASE_URL}/about`,
    mainEntityOfPage: `${BASE_URL}/about`,
    image: OG_IMAGE_URL,
    jobTitle: "Author & Psychology of Power Expert",
    nationality: { "@type": "Country", name: "Australia" },
    homeLocation: { "@type": "Place", name: SITE_CONFIG.location },
    knowsAbout: [
      "Dark Psychology",
      "Antisocial Personality Disorder",
      "Narcissism",
      "Manipulation Psychology",
      "Dating Strategy",
      "Power Dynamics",
      "Reading People",
      "Personal Branding",
    ],
    award: KANIKA_AWARDS,
    sameAs: KANIKA_SAME_AS,
  };
}

export function generateBookSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    name: BOOK_INFO.title,
    alternateName: BOOK_INFO.subtitle,
    description: BOOK_INFO.description,
    // Reference the canonical Kanika entity so Google links the book to
    // its author's full credential/experience graph (authoritativeness).
    author: KANIKA_AUTHOR_REF,
    url: `${BASE_URL}/book`,
    bookFormat: "https://schema.org/EBook",
    numberOfPages: 250,
    genre: ["Self-Help", "Psychology", "Dating"],
    inLanguage: "en",
    offers: [
      {
        "@type": "Offer",
        price: BOOK_INFO.kdpPrice,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: BOOK_INFO.kdpLink,
        name: "Amazon Kindle Edition",
      },
      {
        "@type": "Offer",
        price: BOOK_INFO.price,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: `${BASE_URL}/book`,
        name: "Premium Website Edition",
      },
    ],
  };
}

export function generateProductSchema(
  productType: "book" | "coaching",
  coachingId?: string,
) {
  if (productType === "book") {
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      name: BOOK_INFO.title,
      description: BOOK_INFO.description,
      image: OG_IMAGE_URL,
      brand: {
        "@type": "Brand",
        name: SITE_CONFIG.name,
      },
      offers: {
        "@type": "AggregateOffer",
        lowPrice: BOOK_INFO.kdpPrice,
        highPrice: BOOK_INFO.price,
        priceCurrency: "USD",
        offerCount: 2,
      },
    };
  }

  const coaching =
    COACHING_PACKAGES.find((p) => p.id === coachingId) || COACHING_PACKAGES[0];
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: coaching.name,
    description: coaching.description,
    image: OG_IMAGE_URL,
    brand: {
      "@type": "Brand",
      name: SITE_CONFIG.name,
    },
    offers: {
      "@type": "Offer",
      price: coaching.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };
}

export function generateServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Coaching",
    provider: {
      "@type": "Person",
      name: SITE_CONFIG.name,
    },
    url: `${BASE_URL}/coaching`,
    description:
      "Premium strategic psychology coaching sessions for personal transformation",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Coaching Packages",
      itemListElement: COACHING_PACKAGES.map((pkg) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: pkg.name,
          description: pkg.description,
        },
        price: pkg.price,
        priceCurrency: "USD",
      })),
    },
  };
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      // Google: the last crumb is the current page and should omit `item`
      // (Google falls back to the page URL). Linking the current page is a
      // known SEO and UX mistake, so only earlier crumbs carry a link. This
      // mirrors the Breadcrumbs component in components/RelatedPosts.tsx.
      ...(index === items.length - 1 ? {} : { item: item.url }),
    })),
  };
}

export function generateArticleSchema(article: {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author?: string;
  slug: string;
  coverImage?: string;
  category?: string;
  tags?: string[];
  wordCount?: number;
}) {
  const coverImage = article.coverImage
    ? article.coverImage.startsWith("http")
      ? article.coverImage
      : `${BASE_URL}${article.coverImage}`
    : OG_IMAGE_URL;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: coverImage,
    thumbnailUrl: coverImage,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    ...(article.wordCount ? { wordCount: article.wordCount } : {}),
    ...(article.category ? { articleSection: article.category } : {}),
    ...(article.tags && article.tags.length > 0
      ? { keywords: article.tags.join(", ") }
      : {}),
    // Tie posts authored by Kanika to her canonical entity (E-E-A-T:
    // every article inherits the author's experience + authority). A
    // guest byline falls back to a plain Person.
    author:
      !article.author || article.author === SITE_CONFIG.name
        ? KANIKA_AUTHOR_REF
        : {
            "@type": "Person",
            name: article.author,
          },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${article.slug}`,
    },
  };
}
