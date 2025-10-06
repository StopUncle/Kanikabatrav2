# Library Directory 📚

Utility functions, services, and shared logic for the Kanika Batra website.

## 📂 Directory Structure

```
lib/
├── auth/                   # Authentication system
│   ├── jwt.ts             # JWT token utilities
│   ├── password.ts        # Password hashing
│   ├── database.ts        # User data management
│   ├── middleware.ts      # Auth middleware
│   ├── types.ts           # TypeScript interfaces
│   └── README.md          # Auth documentation
├── constants.ts           # App-wide constants
├── logger.ts              # Error logging system
├── paypal.ts              # PayPal integration
├── social-sharing.ts      # Social media utilities
└── utils.ts               # General utilities
```

## 🔧 Core Utilities

### **`utils.ts`**
General utility functions used throughout the application.

#### Functions
```typescript
// Tailwind CSS class merging
cn(...inputs: ClassValue[]): string

// Price formatting
formatPrice(price: number): string

// Text truncation
truncateText(text: string, maxLength: number): string

// Metadata generation
generateMetadata(title: string, description: string, path?: string): Metadata

// Smooth scrolling
scrollToElement(elementId: string): void

// Function debouncing
debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void
```

### **`constants.ts`**
Application-wide constants and configuration.

#### Exports
```typescript
// Site information
SITE_CONFIG: {
  name: string
  title: string
  description: string
  url: string
  email: string
}

// Book details
BOOK_INFO: {
  title: string
  subtitle: string
  price: number
  wordCount: string
  chapters: number
  description: string
  features: string[]
}

// Coaching packages
COACHING_PACKAGES: Array<{
  id: string
  name: string
  price: number
  duration: string
  description: string
  features: string[]
  popular: boolean
}>

// Testimonials
TESTIMONIALS: Array<{
  id: number
  text: string
  author: string
  rating: number
}>

// Social links
SOCIAL_LINKS: {
  instagram: string
  youtube: string
  tiktok: string
  email: string
}

// PayPal configuration
PAYPAL_CONFIG: {
  clientId: string
  currency: string
  intent: string
}

// Animation settings
ANIMATION_CONFIG: {
  levitate: { duration: number, ease: string, repeat: number }
  aurora: { duration: number, ease: string, repeat: number }
  gradient: { duration: number, ease: string, repeat: number }
  fadeIn: { duration: number, ease: string }
}
```

## 🔐 Authentication System (`/auth`)

Complete JWT-based authentication with refresh tokens.

### Key Features
- **Secure JWT Tokens** - 15-minute access, 7-day refresh
- **Password Hashing** - bcrypt with 12 salt rounds
- **HttpOnly Cookies** - Secure, SameSite strict
- **Middleware Protection** - Route-level authentication
- **In-Memory Database** - Easily replaceable with real DB

### API Integration
```typescript
import { UserDatabase } from '@/lib/auth/database'
import { generateTokenPair, verifyAccessToken } from '@/lib/auth/jwt'
import { hashPassword, verifyPassword } from '@/lib/auth/password'
import { requireAuth } from '@/lib/auth/middleware'
```

See `/lib/auth/README.md` for complete documentation.

## 💳 PayPal Integration (`paypal.ts`)

Complete PayPal service for handling payments.

### Features
- **Order Creation** - Book and coaching purchases
- **Payment Capture** - Secure transaction processing
- **Error Handling** - Comprehensive error management
- **Environment Support** - Sandbox and production modes

### Usage
```typescript
import {
  paypalService,
  createBookOrder,
  createCoachingOrder
} from '@/lib/paypal'

// Create book order
const bookOrder = createBookOrder(34.99, 'The Sociopath\'s Bible')
const response = await paypalService.createOrder(bookOrder)

// Capture payment
const captureResult = await paypalService.captureOrder(orderId)
```

### Order Types
```typescript
// Book purchase order
createBookOrder(price: number, title: string): PayPalOrder

// Coaching session order
createCoachingOrder(
  price: number,
  name: string,
  description?: string
): PayPalOrder
```

## 📊 Error Logging (`logger.ts`)

Comprehensive logging system for production monitoring.

### Features
- **Client/Server Logging** - Universal error capture
- **Structured Logging** - JSON-formatted log entries
- **Performance Tracking** - API response times
- **Payment Logging** - Transaction monitoring
- **Security Events** - Authentication attempts

### Usage
```typescript
import { logger } from '@/lib/logger'

// Basic logging
logger.info('User action completed', { userId: '123' })
logger.warn('Unusual activity detected')
logger.error('Payment failed', error, { orderId: '456' })

// Specialized logging
logger.apiRequest('POST', '/api/auth/login')
logger.apiResponse('POST', '/api/auth/login', 200, 150)
logger.paymentAttempt('book', 34.99, { title: 'Book Name' })
logger.paymentSuccess('paypal_123', 34.99)
logger.authAttempt('user@example.com', true)
```

### Log Types
```typescript
interface LogEntry {
  level: 'info' | 'warn' | 'error' | 'debug'
  message: string
  timestamp: string
  context?: Record<string, unknown>
  error?: Error
  userId?: string
  sessionId?: string
  userAgent?: string
  ip?: string
  url?: string
  stack?: string
}
```

## 📱 Social Sharing (`social-sharing.ts`)

Social media sharing utilities for content distribution.

### Features
- **Multiple Platforms** - Twitter, Facebook, LinkedIn, Reddit
- **Email Sharing** - Formatted email templates
- **Clipboard Copy** - URL copying with fallback
- **Native Sharing** - Web Share API support

### Usage
```typescript
import {
  shareToTwitter,
  shareToFacebook,
  shareToLinkedIn,
  copyToClipboard,
  shareNatively
} from '@/lib/social-sharing'

const shareOptions = {
  url: 'https://kanikabatra.com',
  title: 'The Beautiful Sociopath',
  description: 'Dark psychology expertise',
  hashtags: ['psychology', 'sociopath', 'darkfeminine']
}

// Share to platforms
shareToTwitter(shareOptions)
shareToFacebook(shareOptions)

// Copy to clipboard
const success = await copyToClipboard(shareOptions.url)
```

## 🛠 Development Guidelines

### TypeScript Standards
- **No `any` Types** - All code must be properly typed
- **Interface Definitions** - Clear contracts for all functions
- **Error Handling** - Proper error types and handling
- **Documentation** - JSDoc comments for complex functions

### Code Organization
```typescript
// Import order
import { externalLibrary } from 'external-package'
import { internalUtil } from '@/lib/utils'
import type { CustomType } from './types'

// Function structure
export function utilityFunction(param: ParamType): ReturnType {
  // Implementation with error handling
  try {
    // Logic here
    return result
  } catch (error) {
    logger.error('Function failed', error, { param })
    throw new Error('User-friendly error message')
  }
}
```

### Testing Utilities
```typescript
// Example test helpers
export const testUtils = {
  createMockUser: (): User => ({
    id: 'test-id',
    email: 'test@example.com',
    createdAt: new Date()
  }),

  createMockPayPalOrder: (): PayPalOrder => ({
    intent: 'CAPTURE',
    purchase_units: [/* mock data */]
  })
}
```

## 🔍 Performance Considerations

### Optimization Strategies
- **Function Memoization** - Cache expensive computations
- **Lazy Loading** - Load utilities only when needed
- **Tree Shaking** - Export functions individually
- **Error Boundaries** - Graceful error handling

### Memory Management
```typescript
// Proper cleanup in utilities
export function createSubscription(callback: Function) {
  const subscription = /* setup */

  return {
    unsubscribe: () => {
      // Cleanup logic
      subscription.cleanup()
    }
  }
}
```

## 🚀 Production Configuration

### Environment Variables
```bash
# Required for authentication
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-refresh-token-secret

# Required for payments
PAYPAL_CLIENT_SECRET=your-paypal-secret
PAYPAL_ENVIRONMENT=production  # or 'sandbox'

# Optional for enhanced features
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
DATABASE_URL=postgresql://user:pass@host/db
```

### Database Migration
The auth system uses in-memory storage by default. For production:

```typescript
// Replace in lib/auth/database.ts
import { PrismaClient } from '@prisma/client'
// or
import mongoose from 'mongoose'
// or
import { createClient } from '@supabase/supabase-js'
```

### Error Monitoring
```typescript
// In lib/logger.ts, configure external service
const errorService = process.env.NODE_ENV === 'production'
  ? new SentryLogger(process.env.SENTRY_DSN)
  : new ConsoleLogger()
```

## 📝 API Reference

### Constants
- `SITE_CONFIG` - Site metadata and contact info
- `BOOK_INFO` - Book details and pricing
- `COACHING_PACKAGES` - Service tier definitions
- `PAYPAL_CONFIG` - Payment configuration

### Utilities
- `cn()` - CSS class merging
- `formatPrice()` - Currency formatting
- `truncateText()` - Text truncation
- `generateMetadata()` - SEO metadata
- `debounce()` - Function rate limiting

### Services
- `paypalService` - Payment processing
- `logger` - Error logging and monitoring
- `UserDatabase` - User management (auth)

### Types
- `LogEntry` - Logging structure
- `PayPalOrder` - Payment order format
- `User` - User data structure
- `ShareOptions` - Social sharing config

## ✅ Quality Assurance

### Code Quality Checks
- **TypeScript Validation** - `npm run type-check`
- **ESLint Rules** - Consistent code style
- **Import Organization** - Sorted imports
- **Error Handling** - All functions have try/catch

### Testing Coverage
```typescript
// Example utility tests
describe('formatPrice', () => {
  it('formats USD currency correctly', () => {
    expect(formatPrice(34.99)).toBe('$34.99')
  })
})

describe('PayPal Service', () => {
  it('creates orders successfully', async () => {
    const order = createBookOrder(34.99, 'Test Book')
    expect(order.intent).toBe('CAPTURE')
  })
})
```

---

**All utilities are production-ready with comprehensive error handling and TypeScript support.**