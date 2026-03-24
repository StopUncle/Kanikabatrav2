import BackgroundEffects from "@/components/BackgroundEffects";
import Header from "@/components/Header";
import { UserPlus } from "lucide-react";

export default function RegisterPage() {
  return (
    <>
      <BackgroundEffects />
      <Header />
      <div className="min-h-screen flex items-center justify-center px-4 pt-32 pb-12 relative z-10">
        <div className="w-full max-w-md">
          <div className="bg-deep-black/50 backdrop-blur-sm rounded-2xl border border-accent-gold/20 p-12 shadow-2xl text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-deep-burgundy to-accent-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <UserPlus className="w-8 h-8 text-accent-gold" />
            </div>
            <h1 className="text-3xl font-extralight tracking-widest uppercase text-text-light mb-3">
              Coming Soon
            </h1>
            <div className="w-12 h-px bg-accent-gold/40 mx-auto mb-6" />
            <p className="text-text-gray font-light leading-relaxed">
              Member registration is being built. Follow{" "}
              <a
                href="https://instagram.com/kanikabatra"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-gold hover:text-accent-gold/80 transition-colors"
              >
                @kanikabatra
              </a>{" "}
              for updates.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = {
  title: "Register - Kanika Batra",
  description: "Member registration coming soon",
  robots: {
    index: false,
    follow: false,
  },
};
