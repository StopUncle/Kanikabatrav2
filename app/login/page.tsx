import LoginForm from '@/components/LoginForm'
import BackgroundEffects from '@/components/BackgroundEffects'
import Header from '@/components/Header'

export default function LoginPage() {
  return (
    <>
      <BackgroundEffects />
      <Header />
      <div className="min-h-screen flex items-center justify-center px-4 pt-32 pb-12 relative z-10">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    </>
  )
}

export const metadata = {
  title: 'Login - Kanika Batra',
  description: 'Sign in to your account'
}