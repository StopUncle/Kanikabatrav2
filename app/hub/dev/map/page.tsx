import { notFound } from "next/navigation";
import SurfaceMap from "./SurfaceMap";

export const metadata = {
  title: "Surface map | Dev",
};

/**
 * Dev-only: every surface in the app and where it lives, rendered inside the
 * real shell from lib/app/nav.ts. Never linked from member navigation.
 *
 * Not linked is not the same as not reachable. This page prints the `note`
 * field of every surface verbatim, which includes what is dying, what is
 * becoming a paid upsell, and which surfaces are unfinished. Guarded like the
 * other dev galleries so a guessed URL cannot read the roadmap.
 */
export default function SurfaceMapPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <SurfaceMap />;
}
