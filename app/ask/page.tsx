import { Metadata } from "next";
import { Suspense } from "react";
import BackgroundEffects from "@/components/BackgroundEffects";
import Header from "@/components/Header";
import AskPageClient from "./AskPageClient";

export const metadata: Metadata = {
  title: "Ask Kanika - Get a Personal Answer | Kanika Batra",
  description:
    "Submit your question and get a personal written or voice answer from Kanika Batra. Relationships, power dynamics, dark psychology, no sugarcoating.",
};

export default function AskPage() {
  return (
    <>
      <BackgroundEffects />
      <Header />
      <main className="relative z-10 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[50vh]">
              <div className="animate-spin w-8 h-8 border-4 border-accent-gold border-t-transparent rounded-full" />
            </div>
          }
        >
          <AskPageClient />
        </Suspense>
      </main>
    </>
  );
}
