import BackgroundEffects from "@/components/BackgroundEffects";
import Header from "@/components/Header";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <>
      <BackgroundEffects />
      <Header />
      <div className="min-h-screen flex items-center justify-center px-4 pt-32 pb-12 relative z-10">
        <ForgotPasswordForm />
      </div>
    </>
  );
}

export const metadata = {
  title: "Forgot Password - Kanika Batra",
  description: "Reset your password",
  robots: {
    index: false,
    follow: false,
  },
};
