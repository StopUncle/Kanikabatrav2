'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import KBSpinLogo from './KBSpinLogo'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/book', label: 'The Book' },
    { href: '/coaching', label: 'Coaching' },
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
            </div>
          </div>
        )}
        </div>
      </nav>
    </header>
  )
}

export default Header