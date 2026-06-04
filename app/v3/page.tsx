import { Metadata } from "next";
import { Cinzel, Cormorant_Garamond } from "next/font/google";
import Header from "@/components/Header";
import V3Backdrop from "@/components/v3/V3Backdrop";
import V3Hero from "@/components/v3/V3Hero";
import V3Book from "@/components/v3/V3Book";
import TheTell from "@/components/v3/TheTell";
import V3Consilium from "@/components/v3/V3Consilium";
import V3Proof from "@/components/v3/V3Proof";
import V3Close from "@/components/v3/V3Close";
import { catalogueStats } from "@/lib/simulator/stats";

/**
 * Homepage v3, "Editorial Noir". A standalone exploration at /v3, kept
 * out of the index so it never competes with the live homepage. Every
 * section is bespoke (components/v3/*); only the nav Header and the
 * newsletter capture are reused. Server component; the lone scenario
 * count it needs is read here and passed to the demo as a prop so the
 * scenario files stay off the client.
 *
 * Typography matches the Midnight Penthouse house style: Cinzel for the
 * uppercase inscriptional labels, Cormorant Garamond for the display
 * serif. Both are scoped to the v3 <main> via the `.v3-root` class +
 * CSS variables (see globals.css), so the shared nav stays as-is and the
 * fonts never load on other pages. preload:false keeps them off the
 * critical path for non-v3 routes.
 */
const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
  preload: false,
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
  preload: false,
});
export const metadata: Metadata = {
  title: "v3 · The Psychology of Power",
  robots: { index: false, follow: false },
};

export default function V3Page() {
  return (
    <>
      <V3Backdrop />
      <Header />
      <main
        className={`v3-root ${cinzel.variable} ${cormorant.variable} relative z-10 pt-20`}
      >
        <V3Hero />
        <V3Book />
        <TheTell sceneCount={catalogueStats.scenes} />
        <V3Consilium />
        <V3Proof />
        <V3Close />
      </main>
    </>
  );
}
