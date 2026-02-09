'use client'

import Link from 'next/link'
import { Instagram, Youtube, Mail, Heart } from 'lucide-react'
import DoubleEchoLogo from './DoubleEchoLogo'

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
)

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
      { name: 'TikTok', href: 'https://tiktok.com/@ogkanikabatra', icon: TikTokIcon },
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
              <DoubleEchoLogo size="lg" />
              <span className="text-lg font-light tracking-[0.2em] text-accent-gold uppercase">
                Kanika Batra
              </span>
            </div>
            <p className="text-text-muted text-xs sm:text-sm">
              Diagnosed Sociopath. Author. Psychology of Power Expert.
            </p>
            <p className="text-gold text-xs">
              Stop being the victim. Start being the villain.
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
                    rel="me noopener noreferrer"
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
              Crafted with <Heart className="w-3 h-3 sm:w-4 sm:h-4 mx-1 text-burgundy" /> and strategy
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer