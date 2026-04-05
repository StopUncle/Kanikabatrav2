import BackgroundEffects from "@/components/BackgroundEffects";
import Header from "@/components/Header";
import ResetPasswordForm from "@/components/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <>
      <BackgroundEffects />
      <Header />
      <div className="min-h-screen flex items-center justify-center px-4 pt-32 pb-12 relative z-10">
        <ResetPasswordForm />
      </div>
    </>
  );
}

export const metadata = {
  title: "Reset Password - Kanika Batra",
  description: "Set a new password",
  robots: {
    index: false,
    follow: false,
  },
};
