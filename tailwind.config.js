/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: '#060608',
          900: '#0b0b0d',
          850: '#101015',
          800: '#14141c',
          700: '#1e1e29',
          600: '#2a2a3b',
        },
        copper: {
          300: '#f8a88a',
          400: '#f08e6c',
          500: '#e8805a',
          600: '#d16a44',
          700: '#b2512f',
        },
        electric: {
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        signal: {
          green: '#1fb573',
          emerald: '#10b981',
          amber: '#f59e0b',
          rose: '#ef4444',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Space Mono"', 'monospace'],
        sans: ['"Inter"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-copper': '0 0 25px rgba(232, 128, 90, 0.35)',
        'glow-electric': '0 0 25px rgba(59, 130, 246, 0.4)',
        'glow-ok': '0 0 26px 4px #1fb573, 0 0 62px 18px rgba(31, 181, 115, 0.35)',
        'glow-declined': '0 0 26px 4px #ef4444, 0 0 62px 18px rgba(239, 68, 68, 0.35)',
        'glass-panel': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
