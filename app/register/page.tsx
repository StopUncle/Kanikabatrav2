import RegisterForm from '@/components/RegisterForm'
import BackgroundEffects from '@/components/BackgroundEffects'
import Header from '@/components/Header'

export default function RegisterPage() {
  return (
    <>
      <BackgroundEffects />
      <Header />
      <div className="min-h-screen flex items-center justify-center px-4 pt-32 pb-12 relative z-10">
        <div className="w-full max-w-md">
          <RegisterForm />
        </div>
      </div>
    </>
  )
}

export const metadata = {
  title: 'Register - Kanika Batra',
  description: 'Create your account to access exclusive dark psychology content',
  robots: {
    index: false,
    follow: false,
  },
}