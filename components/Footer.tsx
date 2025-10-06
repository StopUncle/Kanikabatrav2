'use client'

import Link from 'next/link'
import { Instagram, Youtube, Mail, Heart } from 'lucide-react'
import { FaTiktok } from 'react-icons/fa'
import KBSpinLogo from './KBSpinLogo'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    explore: [
      { name: 'About', href: '/about' },
      { name: 'The Book', href: '/#book' },
      { name: 'Coaching', href: '/coaching' },
      { name: 'Contact', href: '/contact' },
    ],
    legal: [
      { name: 'Terms & Conditions', href: '/terms' },
    ],
    social: [
      { name: 'Instagram', href: 'https://instagram.com/kanikabatra', icon: Instagram },
      { name: 'YouTube', href: 'https://www.youtube.com/@KanikaBatra', icon: Youtube },
      { name: 'TikTok', href: 'https://tiktok.com/@ogkanikabatra', icon: FaTiktok },
      { name: 'Email', href: 'mailto:Kanika@kanikarose.com', icon: Mail },
    ],
  }

  return (
    <footer className="relative z-20 bg-gradient-to-b from-deep-black to-burgundy-dark/10 border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand Section */}
          <div className="space-y-3 sm:space-y-4 col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <KBSpinLogo size="lg" animate={false} />
              <div>
                <h3 className="text-xl sm:text-2xl font-light tracking-wide sm:tracking-wider text-text-light">
                  KANIKA BATRA
                </h3>
              </div>
            </div>
            <p className="text-text-muted text-xs sm:text-sm">
              Diagnosed Sociopath. Beauty Queen. Dark Psychology Expert.
            </p>
            <p className="text-gold text-xs">
              Transform your darkness into power.
            </p>
          </div>

          {/* Explore Links */}
          <div className="col-span-1">
            <h4 className="text-gold text-xs sm:text-sm font-medium tracking-wider mb-3 sm:mb-4">EXPLORE</h4>
            <ul className="space-y-1 sm:space-y-2">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-text-muted hover:text-gold transition-colors duration-300 text-xs sm:text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="col-span-1">
            <h4 className="text-gold text-xs sm:text-sm font-medium tracking-wider mb-3 sm:mb-4">LEGAL</h4>
            <ul className="space-y-1 sm:space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-text-muted hover:text-gold transition-colors duration-300 text-xs sm:text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <h4 className="text-gold text-xs sm:text-sm font-medium tracking-wider mb-3 sm:mb-4">CONNECT</h4>
            <div className="flex space-x-3 sm:space-x-4">
              {footerLinks.social.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-muted hover:text-gold transition-colors duration-300"
                    aria-label={link.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gold/10">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <p className="text-text-muted text-xs sm:text-sm text-center sm:text-left">
              © {currentYear} Kanika Batra. All rights reserved.
            </p>
            <p className="text-text-muted text-xs sm:text-sm flex items-center">
              Crafted with <Heart className="w-3 h-3 sm:w-4 sm:h-4 mx-1 text-burgundy" /> and darkness
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer