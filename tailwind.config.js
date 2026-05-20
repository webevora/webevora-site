/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#2563eb',
          secondary: '#3b82f6',
          accent: '#6366f1',
        },
        dark: {
          bg: '#0f172a',
          card: 'rgba(30, 41, 59, 0.5)',
          border: 'rgba(148, 163, 184, 0.1)',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(37, 99, 235, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(37, 99, 235, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
