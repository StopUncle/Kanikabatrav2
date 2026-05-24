import { requireServerAuth } from "@/lib/auth/server-auth";
import SpeedDrillClient from "@/components/games/SpeedDrillClient";

export const metadata = {
  title: "Speed Drill · Daily Training | Kanika Batra",
  description:
    "Ten calls. Sixty seconds. Each card is one line. Manipulation or clean? Trust the first instinct.",
};

/**
 * Speed Drill game page. Server component: auth gate only. The game itself
 * is a client component because every interaction is local and the only
 * server round-trip is the final completion POST.
 */
export default async function SpeedDrillPage() {
  await requireServerAuth("/consilium/games/speed-drill");
  return <SpeedDrillClient />;
}
