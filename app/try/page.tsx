import { notFound } from "next/navigation";
import { getScenario } from "@/lib/simulator/scenarios";
import PublicSimulatorClient from "@/components/simulator/PublicSimulatorClient";

/**
 * Free, unauth playable demo of the Dark Mirror Simulator.
 *
 * Runs mission-1-1 ("The Morning After"), a full Level 1 scenario,
 * ~10 minutes, real branching, real endings. Lives at /try so it's
 * short enough to share in a TikTok bio, a DM, or a link-in-bio.
 *
 * Nothing server-side to do here: the engine is client-authoritative,
 * and we intentionally skip all persistence. The goal is to give a
 * cold visitor the dopamine of one complete scenario and convert them
 * on the ending screen.
 */

const DEMO_SCENARIO_ID = "mission-1-1";

export const metadata = {
  title: "Try the Dark Mirror. Free | Kanika Batra",
  description:
    "Play a full scenario of the Dark Mirror Simulator, free. No signup. Ten minutes inside the game, branching choices, real tactics, real consequences. The Duolingo for dark psychology.",
  alternates: {
    canonical: "https://kanikarose.com/try",
  },
  openGraph: {
    title: "Try the Dark Mirror. Free",
    description:
      "A full scenario of the Dark Mirror Simulator, free. No signup. Ten minutes, real branching choices, real consequences.",
    url: "https://kanikarose.com/try",
    type: "website",
  },
};

export default function TryDemoPage() {
  const scenario = getScenario(DEMO_SCENARIO_ID);
  if (!scenario) notFound();

  return <PublicSimulatorClient scenario={scenario} />;
}
