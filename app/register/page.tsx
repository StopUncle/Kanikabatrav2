import { Suspense } from "react";
import BackgroundEffects from "@/components/BackgroundEffects";
import Header from "@/components/Header";
import RegisterForm from "@/components/RegisterForm";

export default function RegisterPage() {
  return (
    <>
      <BackgroundEffects />
      <Header />
      <div className="min-h-screen flex items-center justify-center px-4 pt-32 pb-12 relative z-10">
        <Suspense>
          <RegisterForm />
        </Suspense>
      </div>
    </>
  );
}

export const metadata = {
  title: "Register - Kanika Batra",
  description: "Create your account",
  robots: {
    index: false,
    follow: false,
  },
};
