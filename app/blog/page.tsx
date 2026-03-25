import { Metadata } from "next";
import { getAllPosts, getAllCategories } from "@/lib/mdx";
import BlogClient from "./BlogClient";
import { SITE_CONFIG } from "@/lib/constants";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Dark Psychology Blog | Kanika Batra",
  description:
    "Dark psychology, manipulation tactics, and power dynamics. Learn to read people, spot narcissists, and understand the psychology they don't teach you.",
  keywords:
    "dark psychology, manipulation tactics, power dynamics, narcissistic abuse, dark feminine energy, how to read people, dark triad, sociopath, ASPD, psychological manipulation",
  alternates: {
    canonical: `${SITE_CONFIG.url}/blog`,
  },
  openGraph: {
    title: "Dark Psychology Blog | Kanika Batra",
    description:
      "Dark psychology and strategic manipulation from a clinically diagnosed sociopath with 670K+ followers.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dark Psychology Blog | Kanika Batra",
    description:
      "Dark psychology and strategic manipulation from a clinically diagnosed sociopath.",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Dark Psychology Blog",
    description:
      "Dark psychology, manipulation tactics, and power dynamics by Kanika Batra.",
    url: `${SITE_CONFIG.url}/blog`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: posts.length,
      itemListElement: posts.slice(0, 10).map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_CONFIG.url}/blog/${post.slug}`,
        name: post.frontmatter.title,
      })),
    },
  };

  return (
    <>
      <JsonLd data={collectionSchema} />
      <BlogClient initialPosts={posts} categories={categories} />
    </>
  );
}
