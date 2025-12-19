'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, User, LogIn } from 'lucide-react'
import KBSpinLogo from './KBSpinLogo'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch('/api/auth/me')
        setIsLoggedIn(response.ok)
      } catch {
        setIsLoggedIn(false)
      } finally {
        setIsCheckingAuth(false)
      }
    }
    checkAuth()
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/book', label: 'The Book' },
    { href: '/courses', label: 'Courses' },
    { href: '/coaching', label: 'Coaching' },
    { href: '/community', label: 'Community' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-deep-black/90 backdrop-blur-md border-b border-accent-gold/10">
      <nav className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link href="/" className="flex items-center gap-2 group">
              <KBSpinLogo size="md" animate={false} className="transition-transform group-hover:scale-110" />
              <div className="flex flex-col -space-y-1">
                <span className="text-base sm:text-lg lg:text-xl font-extralight tracking-[0.2em] gradient-text-gold uppercase">
                  Kanika
                </span>
                <span className="text-xs sm:text-sm font-thin tracking-[0.3em] text-accent-gold/80 uppercase">
                  Batra
                </span>
              </div>
            </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={isActive
                    ? "gradient-text-gold font-medium"
                    : "text-text-gray hover:text-accent-gold transition-colors duration-300 font-light"}
                >
                  {link.label}
                </Link>
              )
            })}

            {/* Auth Links */}
            {!isCheckingAuth && (
              <div className="flex items-center gap-4 ml-4 pl-4 border-l border-accent-gold/20">
                {isLoggedIn ? (
                  <Link
                    href="/dashboard"
                    className={pathname === '/dashboard'
                      ? "flex items-center gap-2 gradient-text-gold font-medium"
                      : "flex items-center gap-2 text-text-gray hover:text-accent-gold transition-colors duration-300 font-light"}
                  >
                    <User size={18} />
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className={pathname === '/login'
                        ? "flex items-center gap-2 gradient-text-gold font-medium"
                        : "flex items-center gap-2 text-text-gray hover:text-accent-gold transition-colors duration-300 font-light"}
                    >
                      <LogIn size={18} />
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="px-4 py-2 bg-gradient-to-r from-burgundy to-sapphire rounded-lg text-white text-sm font-medium hover:shadow-lg hover:shadow-burgundy/20 transition-all"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-text-gray hover:text-accent-gold transition-colors"
            aria-label="Toggle menu"
            suppressHydrationWarning
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-16 sm:top-20 left-0 right-0 bg-deep-black/95 backdrop-blur-md border-b border-accent-gold/10 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="flex flex-col px-4 py-4 sm:py-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={isActive
                      ? "gradient-text-gold font-medium py-3 text-base sm:text-lg border-b border-accent-gold/5 hover:bg-accent-gold/5"
                      : "text-text-gray hover:text-accent-gold transition-colors duration-300 font-light py-3 text-base sm:text-lg border-b border-accent-gold/5 hover:bg-accent-gold/5"}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              })}

              {/* Mobile Auth Links */}
              {!isCheckingAuth && (
                <div className="mt-4 pt-4 border-t border-accent-gold/20">
                  {isLoggedIn ? (
                    <Link
                      href="/dashboard"
                      className={pathname === '/dashboard'
                        ? "flex items-center gap-2 gradient-text-gold font-medium py-3 text-base sm:text-lg"
                        : "flex items-center gap-2 text-text-gray hover:text-accent-gold transition-colors duration-300 font-light py-3 text-base sm:text-lg"}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User size={20} />
                      Dashboard
                    </Link>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className={pathname === '/login'
                          ? "flex items-center gap-2 gradient-text-gold font-medium py-3 text-base sm:text-lg"
                          : "flex items-center gap-2 text-text-gray hover:text-accent-gold transition-colors duration-300 font-light py-3 text-base sm:text-lg"}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <LogIn size={20} />
                        Login
                      </Link>
                      <Link
                        href="/register"
                        className="mt-3 block text-center px-4 py-3 bg-gradient-to-r from-burgundy to-sapphire rounded-lg text-white font-medium hover:shadow-lg transition-all"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Create Account
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
        </div>
      </nav>
    </header>
  )
}

export default Header