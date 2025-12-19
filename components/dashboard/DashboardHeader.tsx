'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, LogOut, BookOpen, Calendar, Home, Users } from 'lucide-react'

interface DashboardHeaderProps {
  userEmail: string
}

const DashboardHeader = ({ userEmail }: DashboardHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/book', label: 'The Book', icon: BookOpen },
    { href: '/coaching', label: 'Coaching', icon: Calendar },
    { href: '/community', label: 'Community', icon: Users },
  ]

  const handleLogout = async () => {
    const response = await fetch('/api/auth/logout', { method: 'POST' })
    if (response.ok) {
      window.location.href = '/login'
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-deep-black/80 backdrop-blur-md border-b border-accent-gold/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <span className="text-2xl font-light gradient-text-gold">
              Kanika Batra
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 text-text-gray hover:text-accent-gold transition-colors duration-300 font-light"
              >
                <link.icon size={18} />
                {link.label}
              </Link>
            ))}
            
            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-burgundy to-sapphire flex items-center justify-center">
                  <span className="text-sm font-bold text-white">
                    {userEmail.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-text-light text-sm">{userEmail.split('@')[0]}</span>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-gray-900 rounded-lg shadow-xl border border-gray-800 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-800">
                    <p className="text-xs text-text-muted">Signed in as</p>
                    <p className="text-sm text-text-light truncate">{userEmail}</p>
                  </div>
                  <div className="py-2">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-text-light hover:bg-gray-800 transition-colors flex items-center gap-2"
                    >
                      <LogOut size={16} />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-text-muted hover:text-gold transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-deep-black/95 backdrop-blur-md border-b border-gold/10">
            <div className="flex flex-col space-y-2 px-4 py-6">
              <div className="pb-3 mb-3 border-b border-gray-800">
                <p className="text-xs text-text-muted">Signed in as</p>
                <p className="text-sm text-text-light">{userEmail}</p>
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 text-text-muted hover:text-gold transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <link.icon size={18} />
                  {link.label}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors py-2 mt-3 pt-3 border-t border-gray-800"
              >
                <LogOut size={18} />
                Sign out
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default DashboardHeader