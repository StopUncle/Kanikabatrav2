import SurfaceMap from "./SurfaceMap";

export const metadata = {
  title: "Surface map | Dev",
};

/**
 * Dev-only: every surface in the app and where it lives, rendered inside the
 * real shell from lib/app/nav.ts. Never linked from member navigation.
 */
export default function SurfaceMapPage() {
  return <SurfaceMap />;
}
