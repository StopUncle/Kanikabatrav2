# Components Directory 🧩

React components for the Kanika Batra website, built with TypeScript, Tailwind CSS, and Framer Motion.

## 📂 Component Structure

```
components/
├── ui/                     # Reusable UI components
│   ├── Button.tsx         # Interactive button with variants
│   ├── Card.tsx           # Container with dark theme
│   ├── GradientText.tsx   # Gold gradient text effect
│   └── SectionTitle.tsx   # Consistent section headers
├── BackgroundEffects.tsx  # Animated background elements
├── BookShowcase.tsx       # Book display with PayPal
├── CoachingTiers.tsx      # Service pricing tiers
├── Footer.tsx             # Site footer with links
├── Hero.tsx               # Landing page hero section
├── LoginForm.tsx          # User authentication form
├── Navigation.tsx         # Site navigation bar
├── PayPalButton.tsx       # Payment integration
├── RegisterForm.tsx       # User registration form
└── Testimonial.tsx        # Customer testimonials
```

## 🎨 Core Components

### Page Components

#### **`Hero.tsx`**
Landing page hero section with main branding and call-to-action.

**Features:**
- Gradient text effects
- Animated background
- Responsive typography
- Dark psychology themed copy

#### **`BookShowcase.tsx`**
Featured book display with PayPal integration.

**Features:**
- 3D book visualization
- PayPal payment flow
- Feature list with checkmarks
- Responsive grid layout
- Interactive purchase states

#### **`CoachingTiers.tsx`**
Service pricing tiers with detailed packages.

**Features:**
- Three coaching packages
- Hover effects and animations
- Responsive cards
- CTA buttons for each tier

#### **`Navigation.tsx`**
Site navigation with mobile menu.

**Features:**
- Mobile hamburger menu
- Auth links (Login/Sign Up)
- Smooth scroll navigation
- Backdrop blur effects

#### **`Testimonial.tsx`**
Customer testimonials carousel.

**Features:**
- Star ratings
- Rotating testimonials
- Smooth transitions
- Social proof elements

### Form Components

#### **`LoginForm.tsx`**
User authentication form with validation.

**Features:**
- Form validation with error states
- Loading states
- Password visibility toggle
- Responsive design

#### **`RegisterForm.tsx`**
User registration with email validation.

**Features:**
- Real-time validation
- Password strength indicators
- Error handling
- Success states

#### **`PayPalButton.tsx`**
Complete PayPal payment integration.

**Features:**
- Dynamic PayPal SDK loading
- Order creation and capture
- Error handling and retries
- Payment success/failure states
- Mobile-optimized

**Props:**
```typescript
interface PayPalButtonProps {
  type: 'book' | 'coaching'
  itemId?: string
  amount: number
  itemName: string
  onSuccess?: (details: PayPalCaptureDetails) => void
  onError?: (error: string) => void
  onCancel?: () => void
  disabled?: boolean
  className?: string
}
```

### Utility Components

#### **`Footer.tsx`**
Site footer with social links and legal pages.

**Features:**
- Social media links
- Newsletter signup
- Legal page links
- Contact information

#### **`BackgroundEffects.tsx`**
Animated background elements for visual appeal.

**Features:**
- Subtle particle effects
- Gradient overlays
- Performance optimized
- Dark theme integration

## 🔧 UI Components (`/ui`)

### **`Button.tsx`**
Versatile button component with multiple variants.

**Variants:**
- `primary` - Gold gradient with hover effects
- `secondary` - Secondary gold styling
- `outline` - Transparent with gold border
- `ghost` - Minimal transparent styling

**Sizes:**
- `sm` - Small padding and text
- `md` - Medium (default)
- `lg` - Large padding and text

**Props:**
```typescript
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
  animated?: boolean
}
```

### **`Card.tsx`**
Container component with consistent dark theme styling.

**Features:**
- Backdrop blur effects
- Gold accent borders
- Responsive padding
- Hover effects

### **`GradientText.tsx`**
Text component with gold gradient effect.

**Features:**
- CSS gradient background
- Text clipping
- Responsive sizing
- Custom className support

### **`SectionTitle.tsx`**
Consistent section headers across pages.

**Features:**
- Animated entrance
- Optional subtitle
- Centered/left alignment options
- Consistent typography

**Props:**
```typescript
interface SectionTitleProps {
  label?: string
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}
```

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--deep-black: #0a0a0a        /* Main background */
--text-light: #f8f9fa        /* Primary text */
--text-muted: #94a3b8        /* Secondary text */

/* Accent Colors */
--gold: #d4af37              /* Primary accent */
--gold-dark: #b8941f         /* Gold variant */
--burgundy: #722139          /* Secondary accent */
--sapphire: #0f4c75          /* Tertiary accent */

/* UI Colors */
--gray-800: #1f2937          /* Card backgrounds */
--gray-700: #374151          /* Borders */
```

### Typography
```css
/* Font Sizes (Tailwind) */
text-xs: 12px     /* Fine print */
text-sm: 14px     /* Body text */
text-base: 16px   /* Default */
text-lg: 18px     /* Emphasized */
text-xl: 20px     /* Headings */
text-2xl: 24px    /* Section titles */
text-4xl: 36px    /* Page titles */
```

### Spacing
```css
/* Consistent spacing scale */
gap-4: 1rem       /* Small gaps */
gap-8: 2rem       /* Medium gaps */
gap-12: 3rem      /* Large gaps */
gap-16: 4rem      /* Section spacing */
```

## 🔄 Animation Guidelines

### Framer Motion Patterns
```typescript
// Entrance animations
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

// Stagger children
const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Hover effects
const hoverScale = {
  whileHover: { scale: 1.05 },
  transition: { type: "spring", stiffness: 300 }
}
```

### Performance Guidelines
- Use `viewport={{ once: true }}` for scroll animations
- Prefer `transform` and `opacity` for animations
- Use `will-change` sparingly
- Debounce scroll and resize events

## 📱 Responsive Design

### Breakpoints (Tailwind)
```css
sm: 640px    /* Small tablets */
md: 768px    /* Tablets */
lg: 1024px   /* Small laptops */
xl: 1280px   /* Laptops */
2xl: 1536px  /* Large screens */
```

### Mobile-First Approach
```tsx
// Mobile-first responsive classes
<div className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
  Responsive Text
</div>

// Grid responsive patterns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
  {/* Content */}
</div>
```

## 🧪 Component Testing

### Testing Guidelines
```typescript
// Example component test structure
describe('Button Component', () => {
  it('renders primary variant correctly', () => {
    render(<Button variant="primary">Click me</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-gradient-to-r')
  })

  it('handles loading state', () => {
    render(<Button loading>Loading</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

## 🔧 Development Guidelines

### Component Creation Checklist
- [ ] TypeScript interface for props
- [ ] Mobile-responsive design
- [ ] Accessibility attributes
- [ ] Error handling
- [ ] Loading states (if applicable)
- [ ] Framer Motion animations
- [ ] Dark theme colors
- [ ] Proper semantic HTML

### Code Quality
- **TypeScript:** All props must be properly typed
- **Accessibility:** Include ARIA labels and keyboard navigation
- **Performance:** Use React.memo() for expensive components
- **Consistency:** Follow established patterns and naming conventions

### Import Organization
```typescript
// External libraries
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

// Internal utilities
import { cn } from '@/lib/utils'

// UI components
import Button from '@/components/ui/Button'

// Local types
interface ComponentProps {
  // props
}
```

## 🚀 Usage Examples

### Basic Button Usage
```tsx
import Button from '@/components/ui/Button'

// Primary button
<Button variant="primary" onClick={handleClick}>
  Get Started
</Button>

// Loading state
<Button loading disabled>
  Processing...
</Button>

// Full width
<Button variant="secondary" fullWidth>
  Continue
</Button>
```

### PayPal Integration
```tsx
import PayPalButton from '@/components/PayPalButton'

<PayPalButton
  type="book"
  amount={34.99}
  itemName="The Sociopath's Bible"
  onSuccess={(details) => {
    console.log('Payment successful:', details)
    // Redirect to success page
  }}
  onError={(error) => {
    console.error('Payment failed:', error)
    // Show error message
  }}
/>
```

### Form with Validation
```tsx
import LoginForm from '@/components/LoginForm'

// Already includes validation and error handling
<LoginForm
  onSuccess={(user) => router.push('/dashboard')}
  onError={(error) => setErrorMessage(error)}
/>
```

## 🔍 Component Status

✅ **Production Ready**
- All components fully typed
- Mobile responsive
- Accessibility compliant
- Error handling implemented
- Consistent dark theme
- Framer Motion animations

✅ **Integration Complete**
- PayPal payment processing
- Form validation
- Authentication flows
- Social sharing
- Error logging

## 🎯 Best Practices

1. **Always use TypeScript** - No `any` types allowed
2. **Mobile-first design** - Start with mobile, enhance for desktop
3. **Accessibility first** - Include proper ARIA labels
4. **Performance optimization** - Use React.memo() and lazy loading
5. **Consistent styling** - Follow the design system
6. **Error boundaries** - Handle errors gracefully
7. **Testing coverage** - Write tests for complex components

---

**All components are production-ready and follow modern React patterns with TypeScript.**