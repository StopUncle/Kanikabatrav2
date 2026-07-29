import { notFound } from "next/navigation";
import LogoGallery from "./LogoGallery";

/**
 * Header logo concepts on one URL, judged side by side inside a mock
 * header bar. Never reachable in production.
 */

export const metadata = {
  title: "Logo gallery (dev)",
};

export default function LogoGalleryPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <LogoGallery />;
}
