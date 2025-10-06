/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'deep-black': '#050511',
        'deep-burgundy': '#1a0d11',
        'deep-navy': '#0a1628',
        'accent-burgundy': '#720921',
        'accent-sapphire': '#6366f1',
        'accent-gold': '#d4af37',
        'text-light': '#f5f0ed',
        'text-purple': '#a5b4fc',
        'text-gray': '#94a3b8',
        'burgundy-dark': '#400614',
      },
      fontFamily: {
        'serif': ['Didot', 'Bodoni MT', 'Georgia', 'serif'],
        'sans': ['Helvetica Neue', 'Arial', 'sans-serif'],
      },
      animation: {
        'aurora': 'aurora-shift 12s ease-in-out infinite',
        'float-element': 'float-element 25s infinite ease-in-out',
        'levitate': 'levitate-rotate 8s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'gradient-flow': 'gradient-flow 5s linear infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        'aurora-shift': {
          '0%, 100%': { 
            transform: 'rotate(0deg) scale(1)',
            filter: 'hue-rotate(0deg)',
          },
          '50%': { 
            transform: 'rotate(3deg) scale(1.05)',
            filter: 'hue-rotate(20deg)',
          },
        },
        'float-element': {
          '0%, 100%': {
            transform: 'translate(0, 0) scale(1)',
            opacity: '0.2',
          },
          '25%': {
            transform: 'translate(150px, -100px) scale(1.2)',
            opacity: '0.4',
          },
          '50%': {
            transform: 'translate(-100px, 150px) scale(0.8)',
            opacity: '0.3',
          },
          '75%': {
            transform: 'translate(50px, 50px) scale(1.1)',
            opacity: '0.2',
          },
        },
        'levitate-rotate': {
          '0%, 100%': {
            transform: 'translateY(0) rotateY(-15deg)',
          },
          '25%': {
            transform: 'translateY(-15px) rotateY(-10deg)',
          },
          '50%': {
            transform: 'translateY(-25px) rotateY(-5deg)',
          },
          '75%': {
            transform: 'translateY(-15px) rotateY(-10deg)',
          },
        },
        'glow-pulse': {
          '0%, 100%': { 
            opacity: '0.6',
          },
          '50%': { 
            opacity: '1',
          },
        },
        'gradient-flow': {
          'to': {
            'background-position': '200% center',
          },
        },
        'shimmer': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}