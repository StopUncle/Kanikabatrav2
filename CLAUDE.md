# Claude Development Notes

This file contains development commands and notes for Claude AI assistant.

## 🚀 Quick Commands

```bash
# Development
npm run dev           # Start development server (port 3000)
npm run build         # Build for production
npm run type-check    # TypeScript type checking
npm run lint          # ESLint checking
npm start             # Start production server

# Testing (when implemented)
npm test              # Run tests
npm run test:watch    # Run tests in watch mode

# Port Management (Windows)
netstat -ano | findstr ":3000"     # Check port 3000
taskkill //F //PID [PID]           # Kill process on port
```

## 🎯 Project Context

- **Project Type:** Next.js 14 + TypeScript personal brand website
- **Theme:** Dark psychology/sociopath branding for Kanika Batra
- **Key Features:** Book showcase, testimonials, coaching tiers, PayPal integration
- **Architecture:** App Router with component-based structure
- **Styling:** Tailwind CSS with custom dark theme configuration
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** JWT-based with refresh tokens
- **Deployment:** Vercel-ready with environment configuration

## 📚 Book Presale Strategy (Hybrid Model)

### Pricing Structure

- **Amazon KDP Version:** $17.99
  - Standard edition on Kindle & paperback
  - 70% royalty rate (optimal pricing range)
  - Leverages Amazon's massive reach and trust

- **Premium Website Version:** $34.99
  - Direct sales through website (97% profit after PayPal fees)
  - Includes exclusive bonuses:
    - Bonus chapter: Advanced Dark Triad Tactics
    - Video masterclass: Reading Micro-expressions
    - Email templates for psychological warfare
    - $100 consultation discount
    - Private Telegram group access

### Book Details

- **Title:** Sociopathic Dating Bible
- **Subtitle:** A Cure For Empathy
- **Word Count:** 70,000 words
- **Chapters:** 15
- **Launch Date:** February 14, 2025 (Valentine's Day)
- **Status:** Currently in presale phase

### Presale Implementation

1. **Email Collection System**
   - Modal with 3 options: KDP only, Premium only, or Both
   - Stores emails in `/data/presale-list.json`
   - Tracks customer preferences for targeted launch emails

2. **Launch Communication Plan**
   - 3 emails per subscriber:
     - Launch announcement
     - 24-hour reminder
     - Final notice
   - Different messaging for KDP vs Premium customers

3. **Admin Access**
   - View presale stats at `/api/presale` with admin auth
   - Tracks total signups and version preferences

## 💼 Coaching Packages

### Three Tiers Available:

1. **Mind Architecture** - $297/session or $797/3 sessions
   - Psychological framework rebuilding
   - Dark triad personality optimization

2. **Dark Feminine Mastery** - $447/session or $1197/3 sessions (POPULAR)
   - Femme fatale transformation
   - Seduction psychology and obsession creation

3. **Empire Building** - $597/session or $1597/3 sessions
   - Controversy monetization
   - Personal brand development

## 🎨 Design System

### Logo Components

- **KBSpinLogo:** Primary logo with spinning circles and KB monogram
  - Sizes: sm, md, lg, xl
  - Animation option for loading states
  - Used in Header, Footer, Loading screens, 404 page

### Color Palette

```css
--deep-black: #0a0a0a --accent-gold: #d4af37 --accent-burgundy: #722139
  --deep-burgundy: #4a1426 --deep-navy: #0f172a --text-light: #e5e5e5
  --text-gray: #a0a0a0;
```

### Typography

- **Headers:** Uppercase, extra-light to thin weights, wide letter spacing
- **Body:** Light weight, good readability on dark backgrounds
- **Gradient Text:** Gold gradient for emphasis

### Navigation

- **Active Link Highlighting:** Uses usePathname hook for current page detection
- **Mobile Menu:** Full-screen overlay with animation
- **Header Style:** Split name display (KANIKA / BATRA) with different weights

## ✅ Current Status

### Completed Features:

- ✅ All ESLint errors fixed (90+ violations resolved)
- ✅ TypeScript type safety improved (no `any` types)
- ✅ Header navigation with active link highlighting
- ✅ KBSpinLogo implementation across all pages
- ✅ Mobile-responsive design
- ✅ Footer with social media links
- ✅ Book page with full content
- ✅ About page with AboutContent component
- ✅ Loading states with animated logo
- ✅ 404 page with custom design
- ✅ PayPal integration scaffolded
- ✅ Contact form API route
- ✅ Presale email collection system
- ✅ Newsletter subscription UI
- ✅ Production environment configuration

### Pages Implemented:

- `/` - Homepage with hero, book showcase, testimonials
- `/book` - Dedicated book page with chapters preview
- `/about` - About Kanika with philosophy and credentials
- `/coaching` - Three-tier coaching packages
- `/contact` - Contact form with validation
- `/login` - User authentication
- `/register` - New user registration
- `/dashboard` - Protected user dashboard
- `/success` - Payment success confirmation
- `/cancel` - Payment cancellation handling
- `/terms` - Terms and conditions
- `/not-found` - Custom 404 page

## 🛠 Development Guidelines

- Follow existing TypeScript patterns
- Use Tailwind CSS for styling with the dark theme
- Maintain responsive design principles (mobile-first)
- Test PayPal integration carefully in development
- Don't add comments unless explicitly requested
- Use ESLint rule for underscore-prefixed unused variables
- Always escape React special characters with HTML entities
- Use `const/let` instead of `var` (except in global declarations)

## 📁 Project Structure

```
app/
├── page.tsx          # Homepage with Header component
├── layout.tsx        # Root layout with Footer
├── loading.tsx       # Global loading state with KBSpinLogo
├── about/           # About page
├── book/            # Book showcase page
├── coaching/        # Coaching services page
├── contact/         # Contact form page
├── dashboard/       # User dashboard (protected)
├── login/          # Authentication pages
├── register/
├── success/        # Payment success page
├── cancel/         # Payment cancel page
├── terms/          # Terms & conditions
├── not-found.tsx   # Custom 404 page
└── api/
    ├── auth/       # Authentication endpoints
    ├── booking/    # Session booking
    ├── contact/    # Contact form handler
    ├── download/   # Book download endpoint
    ├── orders/     # Order management
    ├── paypal/     # PayPal integration
    ├── presale/    # Email collection for book presale
    └── webhooks/   # PayPal webhooks

components/
├── Header.tsx       # Main navigation with KBSpinLogo
├── Footer.tsx       # Site footer with social links
├── Hero.tsx         # Hero section with animations
├── BookShowcase.tsx # Book display with presale
├── PresaleModal.tsx # Email collection modal
├── CoachingTiers.tsx # Coaching packages display
├── Testimonial.tsx  # Client testimonials carousel
├── PayPalButton.tsx # PayPal checkout integration
├── KBLogo.tsx       # Original seal logo (deprecated)
├── KBSpinLogo.tsx   # New spinning logo (active)
├── AboutContent.tsx # About page content component
├── BackgroundEffects.tsx # Visual effects (aurora, orbs)
├── LoginForm.tsx    # Authentication form
├── RegisterForm.tsx # Registration form
├── BookingModal.tsx # Coaching session booking
└── ui/              # Reusable UI components
    ├── Button.tsx
    ├── Card.tsx
    ├── GradientText.tsx
    └── Input.tsx

lib/
├── auth/           # Authentication utilities
│   ├── jwt.ts     # Token generation/validation
│   ├── password.ts # Password hashing
│   ├── database.ts # User database operations
│   └── middleware.ts # Auth middleware
├── constants.ts    # Site-wide constants
├── email.ts       # Email service configuration
├── paypal.ts      # PayPal service integration
├── prisma.ts      # Database client
├── logger.ts      # Logging utilities
├── social-sharing.ts # Social media sharing
└── utils.ts       # Utility functions

data/
└── presale-list.json # Presale email storage (gitignored)

prisma/
├── schema.prisma   # Database schema
└── migrations/     # Database migrations

public/
├── images/        # Static images
├── fonts/         # Custom fonts
└── og-image.jpg   # Open Graph image
```

## 🔧 TODO Items

- [ ] Implement email sending in `/app/api/contact/route.ts`
- [ ] Complete PayPal order capture in `/app/api/paypal/capture-order/route.ts`
- [ ] Add dashboard content placeholders
- [ ] Set up email automation for presale launch
- [ ] Configure ADMIN_SECRET environment variable for presale stats
- [ ] Add KDP presale link when available from Amazon
- [ ] Implement rate limiting for API routes
- [ ] Add Sentry error tracking
- [ ] Set up automated backups

## 🔐 Environment Variables

### Required for Development

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/kanikabatra?schema=public"

# JWT Secrets
JWT_SECRET="development-secret-change-in-production"
JWT_REFRESH_SECRET="development-refresh-secret-change-in-production"

# PayPal (Sandbox)
NEXT_PUBLIC_PAYPAL_CLIENT_ID="sandbox-client-id"
PAYPAL_CLIENT_ID="sandbox-client-id"
PAYPAL_CLIENT_SECRET="sandbox-secret"
PAYPAL_WEBHOOK_ID="sandbox-webhook-id"

# Email (Development)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_SECURE="false"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"
EMAIL_FROM="\"Kanika Batra\" <your-email@gmail.com>"
ADMIN_EMAIL="admin@example.com"

# Application
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
NODE_ENV="development"
ADMIN_SECRET="your-admin-secret-for-presale-stats"
```

### Production Configuration

See `.env.production.example` for complete production setup with:

- PostgreSQL with SSL
- SendGrid/AWS SES for email
- PayPal live credentials
- Security headers
- CDN configuration
- Monitoring setup

## 📈 Marketing Strategy Notes

### Presale Benefits Messaging:

- **KDP buyers:** Emphasize accessibility, Amazon reviews, instant delivery
- **Premium buyers:** Focus on exclusivity, bonuses, direct author connection
- **Launch urgency:** Limited-time pricing, first 100 buyers bonus

### Content Strategy:

- Create countdown content for social media
- Prepare email swipe copy for affiliates
- Design Instagram/TikTok teasers highlighting controversial quotes
- Plan Valentine's Day launch campaign (perfect timing for dating book)

### Social Media Presence:

- **TikTok:** @ogkanikabatra (5.9M+ likes)
- **Instagram:** @kanikabatra (500K+ followers)
- **YouTube:** @KanikaBatra (20.6M+ views)

## 🚀 Deployment Checklist

See `DEPLOYMENT-CHECKLIST.md` for complete deployment guide including:

1. Environment setup
2. Database migrations
3. PayPal configuration
4. Email service setup
5. SSL certificates
6. Monitoring setup
7. Backup configuration
8. Security headers

## 📝 Code Quality

### ESLint Configuration

```json
{
  "@typescript-eslint/no-unused-vars": [
    "error",
    {
      "argsIgnorePattern": "^_",
      "varsIgnorePattern": "^_",
      "caughtErrorsIgnorePattern": "^_"
    }
  ]
}
```

### TypeScript Configuration

- Strict mode enabled
- No implicit any
- Strict null checks
- Module resolution: bundler

## 🔄 Recent Updates

- Fixed 90+ ESLint violations
- Replaced all `any` types with proper TypeScript types
- Implemented dynamic navigation highlighting
- Created KBSpinLogo component for consistent branding
- Updated header typography for sleeker appearance
- Added production environment configuration
- Created deployment checklist and documentation
