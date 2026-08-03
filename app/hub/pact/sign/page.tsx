import { redirect } from "next/navigation";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { getAccess } from "@/lib/access/tier";
import { readPact } from "@/lib/pact/read";
import { isPactPreset } from "@/lib/pact/presets";
import SignCeremony from "@/components/app-shell/pact/SignCeremony";

export const metadata = {
  title: "Sign the pact | Consilium",
};

/**
 * The signing ceremony, full screen (no tab bar; it is on the
 * FULL_SCREEN_ROUTES list). Choices arrive as query params from the door;
 * anything malformed goes back to the door rather than guessing.
 */
export default async function PactSignPage({
  searchParams,
}: {
  searchParams: Promise<{ preset?: string; cycle?: string }>;
}) {
  const userId = await requireServerAuth("/app/pact/sign");
  const params = await searchParams;

  const preset = params.preset ?? "";
  if (!isPactPreset(preset)) {
    redirect("/app/pact");
  }
  const cycle = params.cycle === "annual" ? "annual" : "weekly";

  const [access, read] = await Promise.all([
    getAccess(userId),
    readPact(userId),
  ]);
  if (read.pact) {
    redirect("/app/pact/week");
  }

  return (
    <SignCeremony preset={preset} cycle={cycle} entitled={access.pactEntitled} />
  );
}
