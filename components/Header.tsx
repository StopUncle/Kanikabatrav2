'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { User } from 'lucide-react'
import DoubleEchoLogo from './DoubleEchoLogo'

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

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/book', label: 'The Book' },
    { href: '/quiz', label: 'Quiz' },
    { href: '/courses', label: 'Courses' },
    { href: '/coaching', label: 'Coaching' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 bg-deep-black/95 backdrop-blur-xl border-b border-accent-gold/10">
      <nav className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <DoubleEchoLogo size="md" className="transition-transform duration-500 group-hover:scale-105" />
              <span className="text-base sm:text-lg font-light tracking-[0.2em] text-accent-gold uppercase">
                Kanika Batra
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-sm tracking-[0.1em] uppercase transition-all duration-300 group ${
                      isActive
                        ? 'text-accent-gold'
                        : 'text-text-gray/80 hover:text-accent-gold'
                    }`}
                  >
                    {link.label}
                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-accent-gold to-transparent transition-all duration-300 ${
                      isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-60'
                    }`} />
                  </Link>
                )
              })}

              {/* Auth Section */}
              {!isCheckingAuth && (
                <div className="flex items-center gap-3 ml-6 pl-6 border-l border-accent-gold/20">
                  {isLoggedIn ? (
                    <Link
                      href="/dashboard"
                      className={`flex items-center gap-2 px-4 py-2 text-sm tracking-[0.1em] uppercase transition-all duration-300 ${
                        pathname === '/dashboard'
                          ? 'text-accent-gold'
                          : 'text-text-gray/80 hover:text-accent-gold'
                      }`}
                    >
                      <User size={16} strokeWidth={1.5} />
                      Dashboard
                    </Link>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className={`px-4 py-2 text-sm tracking-[0.1em] uppercase transition-all duration-300 ${
                          pathname === '/login'
                            ? 'text-accent-gold'
                            : 'text-text-gray/80 hover:text-accent-gold'
                        }`}
                      >
                        Login
                      </Link>
                      <Link
                        href="/register"
                        className="px-5 py-2 text-sm tracking-[0.1em] uppercase border border-accent-gold/40 text-accent-gold hover:bg-accent-gold/10 hover:border-accent-gold/60 transition-all duration-300 rounded"
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-5 flex flex-col justify-between">
                <span className={`block h-px bg-accent-gold transition-all duration-300 origin-center ${
                  isMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`} />
                <span className={`block h-px bg-accent-gold transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0 scale-0' : ''
                }`} />
                <span className={`block h-px bg-accent-gold transition-all duration-300 origin-center ${
                  isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`} />
              </div>
            </button>
          </div>
        </div>
      </nav>
    </header>

    {/* Mobile Menu Overlay - Outside header for proper z-index */}
    <div className={`lg:hidden fixed inset-0 top-16 sm:top-20 z-[100] bg-deep-black/98 backdrop-blur-xl transition-all duration-500 touch-pan-y ${
        isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <div className={`h-full flex flex-col px-6 py-8 overflow-y-auto overscroll-contain transition-all duration-500 delay-100 ${
          isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
        }`}>
          {/* Mobile Nav Links */}
          <div className="flex-1 flex flex-col justify-start pt-4">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group py-4 transition-all duration-300`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-2xl sm:text-3xl font-extralight tracking-[0.15em] uppercase transition-colors duration-300 ${
                      isActive
                        ? 'text-accent-gold'
                        : 'text-text-gray/70 group-hover:text-accent-gold'
                    }`}>
                      {link.label}
                    </span>
                    <div className={`w-8 h-px transition-all duration-300 ${
                      isActive
                        ? 'bg-accent-gold'
                        : 'bg-transparent group-hover:bg-accent-gold/50'
                    }`} />
                  </div>
                  <div className={`mt-2 h-px bg-gradient-to-r from-accent-gold/20 via-accent-gold/5 to-transparent ${
                    isActive ? 'opacity-100' : 'opacity-50'
                  }`} />
                </Link>
              )
            })}
          </div>

          {/* Mobile Auth Section */}
          {!isCheckingAuth && (
            <div className="pt-8 border-t border-accent-gold/20">
              {isLoggedIn ? (
                <Link
                  href="/dashboard"
                  className="flex items-center justify-center gap-3 py-4 text-lg tracking-[0.15em] uppercase text-accent-gold transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={20} strokeWidth={1.5} />
                  Dashboard
                </Link>
              ) : (
                <div className="flex flex-col gap-4">
                  <Link
                    href="/login"
                    className="py-4 text-center text-lg tracking-[0.15em] uppercase text-text-gray/70 hover:text-accent-gold transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="py-4 text-center text-lg tracking-[0.15em] uppercase border border-accent-gold/40 text-accent-gold hover:bg-accent-gold/10 hover:border-accent-gold/60 transition-all duration-300 rounded"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Create Account
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Mobile Footer Accent */}
          <div className="pt-8 flex justify-center">
            <DoubleEchoLogo size="sm" className="opacity-30" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
