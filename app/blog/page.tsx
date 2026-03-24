import { Metadata } from "next";
import { getAllPosts, getAllCategories } from "@/lib/mdx";
import BlogClient from "./BlogClient";
import { SITE_CONFIG } from "@/lib/constants";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Dating Psychology Blog | Kanika Batra",
  description:
    "Dating psychology, relationship red flags, and strategic power dynamics. Learn to read people, set boundaries, and never lose yourself in a relationship again.",
  keywords:
    "dating psychology, relationship red flags, narcissistic abuse, dark feminine energy, dating strategy, how to read people, toxic relationship signs, manipulation tactics",
  alternates: {
    canonical: `${SITE_CONFIG.url}/blog`,
  },
  openGraph: {
    title: "Dating Psychology Blog | Kanika Batra",
    description:
      "Dating psychology and relationship strategy from a clinically diagnosed sociopath with 670K+ followers.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dating Psychology Blog | Kanika Batra",
    description:
      "Dating psychology and relationship strategy from a clinically diagnosed sociopath.",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Dating Psychology Blog",
    description:
      "Dating psychology, relationship red flags, and strategic power dynamics by Kanika Batra.",
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
