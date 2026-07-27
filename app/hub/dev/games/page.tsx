import { notFound } from "next/navigation";
import GamesGallery from "./GamesGallery";

/**
 * Five ways of telling the games apart, on one URL, so they can be
 * compared against each other rather than imagined one at a time.
 *
 * Same reason the juice gallery exists: a treatment that looks fine on
 * its own often disappears next to the others, and that is only visible
 * side by side. Never reachable in production.
 */

export const metadata = {
  title: "Games gallery (dev)",
};

export default function GamesGalleryPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <GamesGallery />;
}
