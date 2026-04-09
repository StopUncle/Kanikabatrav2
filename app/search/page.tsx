import SearchPageClient from "@/components/search/SearchPageClient";

export const metadata = {
  title: "Search — Kanika Batra",
  description: "Search blog posts, courses, and community discussions",
  robots: { index: false, follow: false },
};

export default function SearchPage() {
  return <SearchPageClient />;
}
