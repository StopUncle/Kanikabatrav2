import BackgroundEffects from "@/components/BackgroundEffects";
import Header from "@/components/Header";
import AboutContent from "@/components/AboutContent";
import JsonLd from "@/components/JsonLd";
import { generatePersonSchema } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kanika Batra: Diagnosed Sociopath, Dark Psychology Educator",
  description:
    "Kanika Batra's real story: diagnosed ASPD, clinically assessed as Factor 1 psychopathy, 37M+ views teaching dark psychology from the inside.",
  keywords:
    "kanika batra, the psychology of power, dark psychology expert, diagnosed sociopath, ASPD, factor 1 psychopathy, strategic psychology",
  openGraph: {
    title: "Kanika Batra: Diagnosed Sociopath, Dark Psychology Educator",
    description:
      "Diagnosed ASPD, clinically assessed as Factor 1 psychopathy. Teaching dark psychology from the inside to 670K+ followers.",
    type: "profile",
    url: "https://kanikarose.com/about",
    images: [{ url: "https://kanikarose.com/api/og" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kanika Batra: Diagnosed Sociopath, Dark Psychology Educator",
    description:
      "Diagnosed ASPD, clinically assessed as Factor 1 psychopathy. Dark psychology from the inside.",
  },
  alternates: {
    canonical: "https://kanikarose.com/about",
  },
};

export default function AboutPage() {
  const personSchema = generatePersonSchema();

  return (
    <>
      <JsonLd data={personSchema} />
      <BackgroundEffects />
      <Header />
      <AboutContent />
    </>
  );
}
