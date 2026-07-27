import { notFound } from "next/navigation";
import JuiceGallery from "./JuiceGallery";

/**
 * Every juice primitive, in every state, on one URL.
 *
 * This exists for the screenshot loop: comparing a ring at 0%, 40% and 100%
 * side by side catches arc-direction and rounding bugs that are invisible one
 * screen at a time. Never reachable in production.
 */

export const metadata = {
  title: "Juice gallery (dev)",
};

export default function JuiceGalleryPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <JuiceGallery />;
}
